import { Badge } from "@/components/ui/badge";
import { Eye } from "lucide-react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

const observeItems = [
  {
    title: "My Journey to UX Design",
    instructor: "Alex Turner",
    views: 12400,
    category: "UX UI Design",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=250&fit=crop",
  },
  {
    title: "Breaking into Data Science",
    instructor: "Priya Sharma",
    views: 8900,
    category: "Data Science",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=250&fit=crop",
  },
  {
    title: "Creating AI Animations",
    instructor: "Jordan Lee",
    views: 15200,
    category: "Animation with AI",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=250&fit=crop",
  },
  {
    title: "From Code to Career",
    instructor: "Ryan Mitchell",
    views: 7800,
    category: "Development",
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&h=250&fit=crop",
  },
];

const ObserveSection = () => {
  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-3 mb-2">
          <Badge className="gradient-orange text-primary-foreground border-none">
            📍 OBSERVE
          </Badge>
        </div>
        
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
          Sit back & observe <span className="gradient-orange-text">real journeys</span>
        </h2>
        <p className="text-muted-foreground mb-8">Watch how others navigate their paths</p>

        <Carousel opts={{ align: "start", loop: true }} className="w-full">
          <CarouselContent className="-ml-4">
            {observeItems.map((item, index) => (
              <CarouselItem key={index} className="pl-4 md:basis-1/2 lg:basis-1/3">
                <div className="card-glass rounded-2xl overflow-hidden hover:border-primary/50 transition-all duration-300 group cursor-pointer">
                  <div className="relative">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <Badge className="absolute top-3 left-3 bg-background/80 text-foreground border-none">
                      {item.category}
                    </Badge>
                    <div className="absolute bottom-3 right-3 flex items-center gap-1 bg-background/80 rounded-full px-2 py-1 text-sm">
                      <Eye size={14} className="text-primary" />
                      <span className="text-foreground">{(item.views / 1000).toFixed(1)}k</span>
                    </div>
                  </div>
                  
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-muted-foreground text-sm">{item.instructor}</p>
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

export default ObserveSection;
