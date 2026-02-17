import { useState } from "react";
import { Calendar, Clock, Plus, ArrowLeft, Loader } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { collection, addDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { motion } from "framer-motion";
import Header from "@/components/Header";

const discussItems = [
  { title: "Will AI-Powered Robots Replace Human Jobs?", speaker: "Dr. James Martinez", category: "Robotics", date: "Today", time: "6 PM" },
  { title: "Is AI-Generated Art the Future of Creativity?", speaker: "Emma Thompson", category: "Art & AI", date: "Today", time: "6 PM" },
  { title: "Why Communication Skills Matter More Than Technical Skills", speaker: "Sarah Chen", category: "Career", date: "Tomorrow", time: "5 PM" },
];

export default function DiscussPage() {
  const { userProfile } = useAuth();
  const navigate = useNavigate();
  const [showCreate, setShowCreate] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ title: "", category: "", description: "", date: "", time: "" });

  const canCreate = userProfile?.role === "CREATE";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userProfile) return;
    try {
      setLoading(true);
      await addDoc(collection(db, "discussions"), {
        ...form,
        speaker: userProfile.fullName,
        hostUid: userProfile.uid,
        status: "scheduled",
        members: 0,
        createdAt: new Date().toISOString(),
      });
      alert("Discussion room created successfully!");
      setForm({ title: "", category: "", description: "", date: "", time: "" });
      setShowCreate(false);
    } catch (err) {
      console.error("Error creating discussion:", err);
      alert("Failed to create discussion. Try again.");
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
              <h1 className="text-3xl font-bold text-white">📍 Discussion Rooms</h1>
              <p className="text-white/60 mt-1">Talk, ask & share freely</p>
            </div>
          </div>
          {canCreate ? (
            <button onClick={() => setShowCreate(!showCreate)} className="px-6 py-3 rounded-full bg-gradient-to-r from-orange-400 to-pink-500 text-white font-semibold flex items-center gap-2 hover:opacity-90 transition">
              <Plus size={18} /> Create Discussion
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
            <h2 className="text-xl font-bold text-white mb-6">Create a New Discussion Room</h2>
            <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="text-sm text-white/70 mb-1 block">Discussion Topic</label>
                <Input name="title" value={form.title} onChange={handleChange} required placeholder="e.g. Will AI Replace Jobs?" className="bg-white/5 border-white/10 text-white" />
              </div>
              <div>
                <label className="text-sm text-white/70 mb-1 block">Category</label>
                <Input name="category" value={form.category} onChange={handleChange} required placeholder="e.g. Technology, Career" className="bg-white/5 border-white/10 text-white" />
              </div>
              <div className="md:col-span-2">
                <label className="text-sm text-white/70 mb-1 block">Description</label>
                <textarea name="description" value={form.description} onChange={handleChange} required placeholder="What will be discussed..." className="w-full bg-white/5 border border-white/10 text-white rounded-lg p-3 min-h-[80px] placeholder:text-white/40" />
              </div>
              <div>
                <label className="text-sm text-white/70 mb-1 block">Date</label>
                <Input type="date" name="date" value={form.date} onChange={handleChange} required className="bg-white/5 border-white/10 text-white" />
              </div>
              <div>
                <label className="text-sm text-white/70 mb-1 block">Time</label>
                <Input type="time" name="time" value={form.time} onChange={handleChange} required className="bg-white/5 border-white/10 text-white" />
              </div>
              <div className="md:col-span-2">
                <Button type="submit" disabled={loading} className="w-full gradient-orange text-primary-foreground rounded-full py-3 flex items-center justify-center gap-2">
                  {loading && <Loader className="w-4 h-4 animate-spin" />}
                  {loading ? "Creating..." : "Create Discussion Room"}
                </Button>
              </div>
            </form>
          </motion.div>
        )}

        {/* DISCUSSION CARDS */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {discussItems.map((item, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
              className="relative w-full aspect-square max-w-[340px] mx-auto rounded-full border-[4px] bg-[conic-gradient(from_90deg,_#fb923c_0deg_180deg,_#ec4899_180deg_360deg)] flex items-center justify-center"
            >
              <div className="w-[85%] aspect-square rounded-full bg-[#0f172a] p-6 flex flex-col justify-between">
                <div className="flex justify-center">
                  <span className="px-3 py-1 rounded-full bg-pink-500 text-white text-xs font-medium">{item.category}</span>
                </div>
                <div className="text-center">
                  <h3 className="text-white text-base font-semibold leading-snug">{item.title}</h3>
                  <p className="text-white/60 mt-2 text-xs">with {item.speaker}</p>
                </div>
                <div className="flex items-center justify-center gap-3">
                  <span className="flex items-center gap-1 px-3 py-1 rounded-full bg-orange-500 text-black text-xs">
                    <Calendar size={12} /> {item.date}
                  </span>
                  <span className="flex items-center gap-1 px-3 py-1 rounded-full bg-orange-500 text-black text-xs">
                    <Clock size={12} /> {item.time}
                  </span>
                </div>
                <button className="w-full px-4 py-2 rounded-full bg-pink-500 text-white font-medium text-sm hover:opacity-90 transition">
                  Join Discussion →
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}