import { Badge } from "@/components/ui/badge";
import { Eye } from "lucide-react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

const pauseItems = [
  {
    title: "Meditation for Focus",
    views: 5600,
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400&h=300&fit=crop",
  },
  {
    title: "Nature Sounds",
    views: 8200,
    image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=300&fit=crop",
  },
  {
    title: "Breathing Exercises",
    views: 4300,
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=300&fit=crop",
  },
  {
    title: "Calming Music",
    views: 9100,
    image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400&h=300&fit=crop",
  },
];

const PauseSection = () => {
  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-3 mb-2">
          <Badge className="gradient-orange text-primary-foreground border-none">
            📍 PAUSE
          </Badge>
        </div>
        
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
          Refresh, Relax, and <span className="gradient-orange-text">Reset</span>
        </h2>
        <p className="text-muted-foreground mb-8">Take a moment for yourself</p>

        <Carousel opts={{ align: "start", loop: true }} className="w-full">
          <CarouselContent className="-ml-4">
            {pauseItems.map((item, index) => (
              <CarouselItem key={index} className="pl-4 md:basis-1/2 lg:basis-1/3">
                <div className="relative rounded-2xl overflow-hidden group cursor-pointer h-64">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
                  
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <div className="flex items-center gap-1 text-sm text-foreground/80 mb-2">
                      <Eye size={14} />
                      <span>{(item.views / 1000).toFixed(1)}k views</span>
                    </div>
                    <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                      {item.title}
                    </h3>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden md:flex -left-4 bg-primary text-primary-foreground hover:bg-primary/90" />
          <CarouselNext className="hidden md:flex -right-4 bg-primary text-primary-foreground hover:bg-primary/90" />
        </Carousel>
      </div>
    </section>
  );
};

export default PauseSection;
