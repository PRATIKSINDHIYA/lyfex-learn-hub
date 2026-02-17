import { useState } from "react";
import { Eye, Plus, ArrowLeft, Loader } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { collection, addDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { motion } from "framer-motion";
import Header from "@/components/Header";

const pauseItems = [
  { title: "Meditation for Focus", views: 5600, image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&auto=format" },
  { title: "Nature Sounds", views: 8200, image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&auto=format" },
  { title: "Breathing Exercises", views: 4300, image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&auto=format" },
  { title: "Calming Music", views: 9100, image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&auto=format" },
];

export default function PausePage() {
  const { userProfile } = useAuth();
  const navigate = useNavigate();
  const [showCreate, setShowCreate] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ title: "", description: "", type: "", imageUrl: "" });

  const canCreate = userProfile?.role === "CREATE";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userProfile) return;
    try {
      setLoading(true);
      await addDoc(collection(db, "pauseContent"), {
        ...form,
        createdBy: userProfile.fullName,
        creatorUid: userProfile.uid,
        views: 0,
        createdAt: new Date().toISOString(),
      });
      alert("Pause content created successfully!");
      setForm({ title: "", description: "", type: "", imageUrl: "" });
      setShowCreate(false);
    } catch (err) {
      console.error("Error creating pause content:", err);
      alert("Failed to create. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#070B24]">
      <Header />
      <div className="pt-24 pb-16 max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-4">
            <button onClick={() => navigate("/homepage")} className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition">
              <ArrowLeft className="w-5 h-5 text-white" />
            </button>
            <div>
              <h1 className="text-3xl font-bold text-white">📍 Pause & Relax</h1>
              <p className="text-white/60 mt-1">Refresh, relax & reset your mind</p>
            </div>
          </div>
          {canCreate ? (
            <button onClick={() => setShowCreate(!showCreate)} className="px-6 py-3 rounded-full bg-gradient-to-r from-orange-400 to-pink-500 text-white font-semibold flex items-center gap-2 hover:opacity-90 transition">
              <Plus size={18} /> Create Pause Content
            </button>
          ) : (
            <button onClick={() => navigate("/subscription")} className="px-6 py-3 rounded-full bg-white/10 border border-orange-400/30 text-orange-400 font-semibold flex items-center gap-2 hover:bg-white/20 transition">
              🔒 Upgrade to Create
            </button>
          )}
        </div>

        {showCreate && canCreate && (
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-12 bg-white/5 border border-white/10 rounded-2xl p-8">
            <h2 className="text-xl font-bold text-white mb-6">Create Pause Content</h2>
            <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="text-sm text-white/70 mb-1 block">Title</label>
                <Input name="title" value={form.title} onChange={handleChange} required placeholder="e.g. Meditation for Focus" className="bg-white/5 border-white/10 text-white" />
              </div>
              <div>
                <label className="text-sm text-white/70 mb-1 block">Type</label>
                <Input name="type" value={form.type} onChange={handleChange} required placeholder="e.g. Meditation, Music" className="bg-white/5 border-white/10 text-white" />
              </div>
              <div className="md:col-span-2">
                <label className="text-sm text-white/70 mb-1 block">Description</label>
                <textarea name="description" value={form.description} onChange={handleChange} required placeholder="Describe the content..." className="w-full bg-white/5 border border-white/10 text-white rounded-lg p-3 min-h-[80px] placeholder:text-white/40" />
              </div>
              <div className="md:col-span-2">
                <label className="text-sm text-white/70 mb-1 block">Image URL (optional)</label>
                <Input name="imageUrl" value={form.imageUrl} onChange={handleChange} placeholder="https://..." className="bg-white/5 border-white/10 text-white" />
              </div>
              <div className="md:col-span-2">
                <Button type="submit" disabled={loading} className="w-full gradient-orange text-primary-foreground rounded-full py-3 flex items-center justify-center gap-2">
                  {loading && <Loader className="w-4 h-4 animate-spin" />}
                  {loading ? "Creating..." : "Create Pause Content"}
                </Button>
              </div>
            </form>
          </motion.div>
        )}

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {pauseItems.map((item, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
              className="relative h-[260px] rounded-[28px] overflow-hidden group cursor-pointer"
            >
              <img src={item.image} alt={item.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="flex items-center gap-2 text-sm text-white/80 mb-2">
                  <Eye size={14} /> <span>{(item.views / 1000).toFixed(1)}k views</span>
                </div>
                <h3 className="text-xl font-semibold text-white leading-snug">{item.title}</h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}