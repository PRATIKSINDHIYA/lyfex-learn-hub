import { useState } from "react";
import { Palette, FileText, Globe, Plus, ArrowLeft, Loader } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { collection, addDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { motion } from "framer-motion";
import Header from "@/components/Header";

const supportItems = [
  { title: "Create a Logo", description: "Need a visual identity? Let's figure it out together.", icon: Palette, budget: "₹5k - ₹20k", timeline: "2–3 weeks" },
  { title: "Write a Thesis", description: "Structured writing with clarity & originality.", icon: FileText, budget: "₹5k - ₹20k", timeline: "2–3 weeks" },
  { title: "Create a Webpage", description: "Simple, fast & modern web presence.", icon: Globe, budget: "₹5k - ₹20k", timeline: "2–3 weeks" },
  { title: "UI Review", description: "Get expert feedback on your product design.", icon: Palette, budget: "₹3k - ₹10k", timeline: "1 week" },
];

export default function SupportPage() {
  const { userProfile } = useAuth();
  const navigate = useNavigate();
  const [showCreate, setShowCreate] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ title: "", description: "", budget: "", deadline: "" });

  const canCreate = userProfile?.role === "CREATE";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userProfile) return;
    try {
      setLoading(true);
      await addDoc(collection(db, "supportWork"), {
        ...form,
        publishedBy: userProfile.fullName,
        publisherUid: userProfile.uid,
        status: "open",
        applicants: 0,
        createdAt: new Date().toISOString(),
      });
      alert("Work published successfully!");
      setForm({ title: "", description: "", budget: "", deadline: "" });
      setShowCreate(false);
    } catch (err) {
      console.error("Error publishing work:", err);
      alert("Failed to publish. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0F2D]">
      <Header />
      <div className="pt-24 pb-16 max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-4">
            <button onClick={() => navigate("/homepage")} className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition">
              <ArrowLeft className="w-5 h-5 text-white" />
            </button>
            <div>
              <h1 className="text-3xl font-bold text-white">📍 Support Work</h1>
              <p className="text-white/60 mt-1">Get help, give help</p>
            </div>
          </div>
          {canCreate ? (
            <button onClick={() => setShowCreate(!showCreate)} className="px-6 py-3 rounded-full bg-gradient-to-r from-orange-400 to-pink-500 text-white font-semibold flex items-center gap-2 hover:opacity-90 transition">
              <Plus size={18} /> Publish Work
            </button>
          ) : (
            <button onClick={() => navigate("/subscription")} className="px-6 py-3 rounded-full bg-white/10 border border-orange-400/30 text-orange-400 font-semibold flex items-center gap-2 hover:bg-white/20 transition">
              🔒 Upgrade to Publish
            </button>
          )}
        </div>

        {showCreate && canCreate && (
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-12 bg-white/5 border border-white/10 rounded-2xl p-8">
            <h2 className="text-xl font-bold text-white mb-6">Publish Work Requirement</h2>
            <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="text-sm text-white/70 mb-1 block">Work Title</label>
                <Input name="title" value={form.title} onChange={handleChange} required placeholder="e.g. Create a Logo for my Brand" className="bg-white/5 border-white/10 text-white" />
              </div>
              <div className="md:col-span-2">
                <label className="text-sm text-white/70 mb-1 block">Description</label>
                <textarea name="description" value={form.description} onChange={handleChange} required placeholder="Describe the work..." className="w-full bg-white/5 border border-white/10 text-white rounded-lg p-3 min-h-[80px] placeholder:text-white/40" />
              </div>
              <div>
                <label className="text-sm text-white/70 mb-1 block">Budget (₹)</label>
                <Input name="budget" value={form.budget} onChange={handleChange} required placeholder="e.g. ₹5k - ₹20k" className="bg-white/5 border-white/10 text-white" />
              </div>
              <div>
                <label className="text-sm text-white/70 mb-1 block">Deadline</label>
                <Input type="date" name="deadline" value={form.deadline} onChange={handleChange} required className="bg-white/5 border-white/10 text-white" />
              </div>
              <div className="md:col-span-2">
                <Button type="submit" disabled={loading} className="w-full gradient-orange text-primary-foreground rounded-full py-3 flex items-center justify-center gap-2">
                  {loading && <Loader className="w-4 h-4 animate-spin" />}
                  {loading ? "Publishing..." : "Publish Work"}
                </Button>
              </div>
            </form>
          </motion.div>
        )}

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {supportItems.map((item, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
              className="h-[300px] rounded-[32px] p-6 bg-gradient-to-b from-[#9B5E33] via-[#A8683A] to-[#C87A2F] flex flex-col justify-between"
            >
              <div className="w-14 h-14 rounded-xl bg-[#D8754A] flex items-center justify-center">
                <item.icon size={26} className="text-white" />
              </div>
              <div>
                <h3 className="text-white text-xl font-semibold">{item.title}</h3>
                <p className="text-white/70 text-sm mt-2 leading-relaxed">{item.description}</p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm text-white/80">
                  <span>Budget</span>
                  <span className="text-yellow-300 font-medium">{item.budget}</span>
                </div>
                <div className="flex items-center justify-between text-sm text-white/80">
                  <span>Timeline</span>
                  <span>{item.timeline}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}