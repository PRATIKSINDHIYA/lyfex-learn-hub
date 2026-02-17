import { useState } from "react";
import { Users, Plus, ArrowLeft, Loader } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { collection, addDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import Header from "@/components/Header";

const liveRooms = [
  { title: "Python", subtitle: "Coding", host: "Sarah Chen", users: 124, mode: "Discussion", gradient: "from-[#E6B800] via-[#E89A3C] to-[#D66B6B]" },
  { title: "UI Design", subtitle: "Workshop", host: "Alex Rivera", users: 89, mode: "Learning", gradient: "from-[#7F00FF] via-[#9F44FF] to-[#C77DFF]" },
  { title: "Public", subtitle: "Speaking", host: "Priya Sharma", users: 156, mode: "Practice", gradient: "from-[#FF512F] via-[#F09819] to-[#FFD200]" },
  { title: "Android Dev", subtitle: "Live Coding", host: "David Kim", users: 98, mode: "Observe", gradient: "from-[#FF512F] via-[#F09819] to-[#FFD200]" },
];

export default function LiveSessionsPage() {
  const { userProfile } = useAuth();
  const navigate = useNavigate();
  const [showCreate, setShowCreate] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ title: "", subject: "", description: "", date: "", time: "", duration: "" });

  const canCreate = userProfile?.role === "CREATE";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userProfile) return;
    try {
      setLoading(true);
      await addDoc(collection(db, "liveSessions"), {
        ...form,
        hostName: userProfile.fullName,
        hostUid: userProfile.uid,
        status: "scheduled",
        viewers: 0,
        createdAt: new Date().toISOString(),
      });
      alert("Live session created successfully!");
      setForm({ title: "", subject: "", description: "", date: "", time: "", duration: "" });
      setShowCreate(false);
    } catch (err) {
      console.error("Error creating live session:", err);
      alert("Failed to create session. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#070B24]">
      <Header />
      <div className="pt-24 pb-16 max-w-7xl mx-auto px-6">
        {/* TOP BAR */}
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-4">
            <button onClick={() => navigate("/homepage")} className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition">
              <ArrowLeft className="w-5 h-5 text-white" />
            </button>
            <div>
              <h1 className="text-3xl font-bold text-white">🔴 Live Sessions</h1>
              <p className="text-white/60 mt-1">People talking. Ideas flowing. No scripts.</p>
            </div>
          </div>
          {canCreate ? (
            <button onClick={() => setShowCreate(!showCreate)} className="px-6 py-3 rounded-full bg-gradient-to-r from-orange-400 to-pink-500 text-white font-semibold flex items-center gap-2 hover:opacity-90 transition">
              <Plus size={18} /> Create Live Session
            </button>
          ) : (
            <button onClick={() => navigate("/subscription")} className="px-6 py-3 rounded-full bg-white/10 border border-orange-400/30 text-orange-400 font-semibold flex items-center gap-2 hover:bg-white/20 transition">
              🔒 Upgrade to Create
            </button>
          )}
        </div>

        {/* CREATE FORM */}
        {showCreate && canCreate && (
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-12 bg-white/5 border border-white/10 rounded-2xl p-8">
            <h2 className="text-xl font-bold text-white mb-6">Create a New Live Session</h2>
            <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="text-sm text-white/70 mb-1 block">Session Title</label>
                <Input name="title" value={form.title} onChange={handleChange} required placeholder="e.g. Python Masterclass" className="bg-white/5 border-white/10 text-white" />
              </div>
              <div>
                <label className="text-sm text-white/70 mb-1 block">Subject / Topic</label>
                <Input name="subject" value={form.subject} onChange={handleChange} required placeholder="e.g. Web Development" className="bg-white/5 border-white/10 text-white" />
              </div>
              <div className="md:col-span-2">
                <label className="text-sm text-white/70 mb-1 block">Description</label>
                <textarea name="description" value={form.description} onChange={handleChange} required placeholder="What will you teach..." className="w-full bg-white/5 border border-white/10 text-white rounded-lg p-3 min-h-[80px] placeholder:text-white/40" />
              </div>
              <div>
                <label className="text-sm text-white/70 mb-1 block">Date</label>
                <Input type="date" name="date" value={form.date} onChange={handleChange} required className="bg-white/5 border-white/10 text-white" />
              </div>
              <div>
                <label className="text-sm text-white/70 mb-1 block">Time</label>
                <Input type="time" name="time" value={form.time} onChange={handleChange} required className="bg-white/5 border-white/10 text-white" />
              </div>
              <div>
                <label className="text-sm text-white/70 mb-1 block">Duration</label>
                <Input name="duration" value={form.duration} onChange={handleChange} required placeholder="e.g. 1.5 hours" className="bg-white/5 border-white/10 text-white" />
              </div>
              <div className="flex items-end">
                <Button type="submit" disabled={loading} className="w-full gradient-orange text-primary-foreground rounded-full py-3 flex items-center justify-center gap-2">
                  {loading && <Loader className="w-4 h-4 animate-spin" />}
                  {loading ? "Creating..." : "Create Live Session"}
                </Button>
              </div>
            </form>
          </motion.div>
        )}

        {/* LIVE ROOMS GRID */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {liveRooms.map((room, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
              <div className={`h-24 rounded-full px-5 bg-gradient-to-r ${room.gradient} flex items-center justify-between shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 cursor-pointer`}>
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <span className="flex items-center gap-1 text-xs bg-black/30 px-3 py-1 rounded-full text-white font-medium">
                    <span className="w-1.5 h-1.5 bg-yellow-300 rounded-full animate-pulse" />
                    LIVE
                  </span>
                  <div className="min-w-0 flex-1">
                    <h3 className="text-white text-lg font-bold leading-tight truncate">{room.title}</h3>
                    <p className="text-white/80 text-xs truncate">{room.subtitle}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <span className="flex items-center gap-1 bg-[#6B4A2D] text-white px-3 py-1 rounded-full text-xs font-medium">
                    <Users size={12} /> {room.users}
                  </span>
                  <span className="bg-orange-400/90 text-white px-3 py-1 rounded-full text-xs font-medium">{room.mode}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}