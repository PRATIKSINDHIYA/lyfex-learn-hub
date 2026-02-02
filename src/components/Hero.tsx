import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

// Import Ghibli-style avatar images
import avatar1 from "@/assets/avatar-1.jpg";
import avatar2 from "@/assets/avatar-2.jpg";
import avatar3 from "@/assets/avatar-3.jpg";
import avatar4 from "@/assets/avatar-4.jpg";
import avatar5 from "@/assets/avatar-5.jpg";
import avatar6 from "@/assets/avatar-6.jpg";
import avatar7 from "@/assets/avatar-7.jpg";
import avatar8 from "@/assets/avatar-8.jpg";
import avatar9 from "@/assets/avatar-9.jpg";
import avatar10 from "@/assets/avatar-10.jpg";
import avatar11 from "@/assets/avatar-11.jpg";
import avatar12 from "@/assets/avatar-12.jpg";

const leftAvatars = [avatar1, avatar2, avatar3, avatar4, avatar5, avatar6];
const rightAvatars = [avatar7, avatar8, avatar9, avatar10, avatar11, avatar12];
const centerAvatars = [avatar3, avatar7, avatar5, avatar10];

const words = [
  { text: "Observe", color: "text-foreground" },
  { text: "Learn", color: "text-gold" },
  { text: "Discuss", color: "text-orange" },
  { text: "Support", color: "text-gold" },
  { text: "Pause", color: "text-foreground" },
];

const Hero = () => {
  const [activeWord, setActiveWord] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveWord((prev) => (prev + 1) % words.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="min-h-screen pt-20 relative overflow-hidden bg-background">
      {/* Central Gradient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-gradient-radial from-orange/20 via-orange/5 to-transparent rounded-full blur-3xl" />
      
      <div className="relative z-10 min-h-screen flex items-center">
        {/* Left Avatar Column */}
        <div className="hidden lg:flex flex-col gap-3 absolute left-0 top-1/2 -translate-y-1/2 w-[280px]">
          <div className="grid grid-cols-2 gap-3">
            {leftAvatars.map((src, index) => (
              <div
                key={`left-${index}`}
                className="avatar-card group"
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                <div className="relative overflow-hidden rounded-2xl border-2 border-orange/30 transition-all duration-500 group-hover:border-orange/60 group-hover:scale-105">
                  <div className="absolute inset-0 bg-gradient-to-t from-orange/40 via-transparent to-transparent opacity-60" />
                  <img
                    src={src}
                    alt={`Student ${index + 1}`}
                    className="w-full aspect-square object-cover"
                  />
                  <div className="absolute inset-0 shadow-[inset_0_0_30px_rgba(249,115,22,0.3)]" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Center Content */}
        <div className="flex-1 flex flex-col items-center justify-center px-4 lg:px-[300px]">
          {/* Top Center Avatars - visible on larger screens */}
          <div className="hidden md:flex justify-center gap-4 mb-8">
            {centerAvatars.slice(0, 2).map((src, index) => (
              <div
                key={`center-top-${index}`}
                className="w-32 h-32 lg:w-40 lg:h-40 relative group"
              >
                <div className="relative overflow-hidden rounded-2xl border-2 border-orange/40 transition-all duration-500 group-hover:border-orange/70">
                  <div className="absolute inset-0 bg-gradient-to-t from-orange/50 via-orange/20 to-transparent" />
                  <img
                    src={src}
                    alt={`Featured student ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 shadow-[inset_0_0_40px_rgba(249,115,22,0.4)]" />
                </div>
              </div>
            ))}
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-foreground text-center mb-2">
            Welcome to Your
          </h1>
          <div className="flex items-center gap-3 mb-6">
            <h2 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold gradient-orange-text italic">
              Online Space
            </h2>
            <div className="flex gap-1">
              <svg className="w-6 h-6 md:w-8 md:h-8 text-gold animate-pulse" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2L14.09 8.26L20 9.27L15.55 13.97L16.91 20L12 16.9L7.09 20L8.45 13.97L4 9.27L9.91 8.26L12 2Z" />
              </svg>
              <svg className="w-5 h-5 md:w-6 md:h-6 text-gold animate-pulse" style={{ animationDelay: '0.5s' }} viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2L14.09 8.26L20 9.27L15.55 13.97L16.91 20L12 16.9L7.09 20L8.45 13.97L4 9.27L9.91 8.26L12 2Z" />
              </svg>
            </div>
          </div>

          {/* Subtitle with colored words */}
          <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4 text-lg md:text-xl lg:text-2xl mb-10 italic">
            {words.map((word, index) => (
              <span
                key={word.text}
                className={`transition-all duration-500 font-medium ${word.color} ${
                  index === activeWord ? "scale-110 text-shadow-glow" : ""
                }`}
              >
                {word.text}
              </span>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              size="lg"
              className="gradient-orange text-primary-foreground hover:opacity-90 px-8 py-6 text-lg rounded-full font-semibold shadow-lg shadow-orange/30"
            >
              Start a Discussion
            </Button>
            <Button
              size="lg"
              className="gradient-orange text-primary-foreground hover:opacity-90 px-8 py-6 text-lg rounded-full font-semibold shadow-lg shadow-orange/30"
            >
              Explore Now
            </Button>
          </div>

          {/* Bottom Center Avatars */}
          <div className="hidden md:flex justify-center gap-4 mt-8">
            {centerAvatars.slice(2, 4).map((src, index) => (
              <div
                key={`center-bottom-${index}`}
                className="w-32 h-32 lg:w-40 lg:h-40 relative group"
              >
                <div className="relative overflow-hidden rounded-2xl border-2 border-orange/40 transition-all duration-500 group-hover:border-orange/70">
                  <div className="absolute inset-0 bg-gradient-to-t from-orange/50 via-orange/20 to-transparent" />
                  <img
                    src={src}
                    alt={`Featured student ${index + 3}`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 shadow-[inset_0_0_40px_rgba(249,115,22,0.4)]" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Avatar Column */}
        <div className="hidden lg:flex flex-col gap-3 absolute right-0 top-1/2 -translate-y-1/2 w-[280px]">
          <div className="grid grid-cols-2 gap-3">
            {rightAvatars.map((src, index) => (
              <div
                key={`right-${index}`}
                className="avatar-card group"
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                <div className="relative overflow-hidden rounded-2xl border-2 border-orange/30 transition-all duration-500 group-hover:border-orange/60 group-hover:scale-105">
                  <div className="absolute inset-0 bg-gradient-to-t from-orange/40 via-transparent to-transparent opacity-60" />
                  <img
                    src={src}
                    alt={`Student ${index + 7}`}
                    className="w-full aspect-square object-cover"
                  />
                  <div className="absolute inset-0 shadow-[inset_0_0_30px_rgba(249,115,22,0.3)]" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Avatar Grid */}
      <div className="lg:hidden grid grid-cols-4 gap-2 px-4 mt-8 pb-8">
        {[...leftAvatars.slice(0, 4), ...rightAvatars.slice(0, 4)].map((src, index) => (
          <div
            key={`mobile-${index}`}
            className="relative overflow-hidden rounded-xl border border-orange/30"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-orange/40 via-transparent to-transparent opacity-60" />
            <img
              src={src}
              alt={`Student ${index + 1}`}
              className="w-full aspect-square object-cover"
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default Hero;
