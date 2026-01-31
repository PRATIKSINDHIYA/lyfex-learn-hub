import { Badge } from "@/components/ui/badge";
import { Palette, FileText, Globe, Clock, IndianRupee } from "lucide-react";

const supportItems = [
  {
    title: "Create a Logo",
    description: "Professional logo design for your brand identity",
    icon: Palette,
    budget: "₹5k - ₹15k",
    timeline: "1-2 weeks",
  },
  {
    title: "Write a Thesis",
    description: "Academic writing assistance and research support",
    icon: FileText,
    budget: "₹10k - ₹25k",
    timeline: "2-4 weeks",
  },
  {
    title: "Create a Webpage",
    description: "Custom website development and design",
    icon: Globe,
    budget: "₹15k - ₹50k",
    timeline: "2-3 weeks",
  },
];

const SupportSection = () => {
  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-3 mb-2">
          <Badge className="gradient-orange text-primary-foreground border-none">
            📍 SUPPORT
          </Badge>
        </div>
        
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
          Get Help, <span className="gradient-orange-text">Give Help</span>
        </h2>
        <p className="text-muted-foreground mb-8">Connect with skilled professionals</p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {supportItems.map((item, index) => (
            <div
              key={index}
              className="card-glass rounded-2xl p-6 hover:border-primary/50 transition-all duration-300 group cursor-pointer"
            >
              <div className="w-14 h-14 rounded-xl gradient-orange flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <item.icon className="text-primary-foreground" size={28} />
              </div>
              
              <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                {item.title}
              </h3>
              
              <p className="text-muted-foreground text-sm mb-6">{item.description}</p>
              
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-1 text-muted-foreground">
                  <IndianRupee size={14} className="text-primary" />
                  <span>{item.budget}</span>
                </div>
                <div className="flex items-center gap-1 text-muted-foreground">
                  <Clock size={14} className="text-primary" />
                  <span>{item.timeline}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SupportSection;
