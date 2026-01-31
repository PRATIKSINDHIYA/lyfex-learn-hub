import { Code, Palette, Briefcase, TrendingUp, Users, Star, Music, Sparkles, Cpu } from "lucide-react";

const categories = [
  { name: "Development", icon: Code, trending: true },
  { name: "Design", icon: Palette, trending: false },
  { name: "Business", icon: Briefcase, trending: false },
  { name: "Marketing", icon: TrendingUp, trending: true },
  { name: "Leadership", icon: Users, trending: false },
  { name: "Featured", icon: Star, trending: false },
  { name: "Music & Art", icon: Music, trending: true },
  { name: "Trending", icon: Sparkles, trending: true },
  { name: "Technology", icon: Cpu, trending: false },
];

const CategoriesSection = () => {
  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2 text-center">
          What's on your <span className="gradient-orange-text">Mind</span>?
        </h2>
        <p className="text-muted-foreground text-center mb-12">Explore skills across diverse categories</p>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 max-w-5xl mx-auto">
          {categories.map((category, index) => (
            <div
              key={index}
              className="card-glass rounded-xl p-6 flex flex-col items-center gap-3 hover:border-primary/50 transition-all duration-300 group cursor-pointer relative"
            >
              {category.trending && (
                <div className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full animate-pulse" />
              )}
              
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <category.icon className="text-primary" size={24} />
              </div>
              
              <span className="text-foreground font-medium text-center group-hover:text-primary transition-colors">
                {category.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;
