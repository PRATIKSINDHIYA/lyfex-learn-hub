import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";

const avatarImages = [
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&h=150&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&h=150&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=150&h=150&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=150&h=150&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=150&h=150&fit=crop&crop=face",
];

const words = ["Observe", "Learn", "Discuss", "Support", "Pause"];

const Hero = () => {
  const [activeWord, setActiveWord] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveWord((prev) => (prev + 1) % words.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="min-h-screen pt-24 pb-16 relative overflow-hidden">
      {/* Background Glow Effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Avatar Grid */}
        <div className="grid grid-cols-4 md:grid-cols-6 gap-3 md:gap-4 mb-12 max-w-4xl mx-auto">
          {avatarImages.map((src, index) => (
            <div
              key={index}
              className="relative group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-full aspect-square rounded-2xl overflow-hidden border-2 border-border/50 group-hover:border-primary/50 transition-all duration-300 group-hover:scale-105">
                <img
                  src={src}
                  alt={`Student ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
              {index % 3 === 0 && (
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-background" />
              )}
            </div>
          ))}
        </div>

        {/* Main Content */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="text-primary w-6 h-6" />
            <span className="text-primary text-sm font-medium">Welcome to the future of learning</span>
            <Sparkles className="text-primary w-6 h-6" />
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6">
            Welcome to Your{" "}
            <span className="gradient-orange-text">Online Space</span>
          </h1>

          <div className="flex flex-wrap items-center justify-center gap-2 md:gap-4 text-lg md:text-2xl text-muted-foreground mb-8">
            {words.map((word, index) => (
              <span
                key={word}
                className={`transition-all duration-500 ${
                  index === activeWord
                    ? "text-primary font-semibold scale-110 text-shadow-glow"
                    : ""
                }`}
              >
                {word}
              </span>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              variant="outline"
              size="lg"
              className="border-primary text-primary hover:bg-primary hover:text-primary-foreground px-8"
            >
              Start a Discussion
            </Button>
            <Button
              size="lg"
              className="gradient-orange text-primary-foreground hover:opacity-90 px-8 animate-pulse-glow"
            >
              Explore Now
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
