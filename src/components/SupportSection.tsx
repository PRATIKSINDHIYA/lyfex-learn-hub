import { Palette, FileText, Globe } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const supportItems = [
  {
    title: "Create a Logo",
    description: "Need a visual identity? Let's figure it out together.",
    icon: Palette,
    budget: "₹5k - ₹20k",
    timeline: "2-3 weeks",
  },
  {
    title: "Write a Thesis",
    description: "Need a visual identity? Let's figure it out together.",
    icon: FileText,
    budget: "₹5k - ₹20k",
    timeline: "2-3 weeks",
  },
  {
    title: "Create a Webpage",
    description: "Need a visual identity? Let's figure it out together.",
    icon: Globe,
    budget: "₹5k - ₹20k",
    timeline: "2-3 weeks",
  },
  {
    title: "UI Review",
    description: "Get expert feedback on your product design.",
    icon: Palette,
    budget: "₹3k - ₹10k",
    timeline: "1 week",
  },
];

export default function SupportSection() {
  return (
    <section className="py-12 sm:py-20 bg-navy overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative">

        {/* HEADER */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 sm:mb-16 gap-6">
          <div>
            <span className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-[#2A1E14] border border-orange/30 text-orange font-semibold text-sm">
              📍 SUPPORT 🤝
            </span>

            <p className="text-foreground/80 mt-4 text-lg">
              Get Help, Give Help
            </p>
          </div>

          <button className="btn-primary self-start hidden sm:inline-flex">
            View all
          </button>
        </div>

        {/* SLIDER */}
        <Carousel opts={{ align: "start", loop: true }}>
          <CarouselContent className="gap-6 sm:gap-8">
            {supportItems.map((item, i) => (
              <CarouselItem
                key={i}
                className="basis-full sm:basis-1/2 lg:basis-1/3"
              >
                {/* CARD (RESPONSIVE DESIGN) */}
                <div
                  className="
                    h-[280px] sm:h-[320px]
                    rounded-2xl sm:rounded-[48px]
                    p-6 sm:p-8
                    bg-gradient-to-b from-[#9B5E33] via-[#A8683A] to-[#C87A2F]
                    flex flex-col justify-between
                    card card-hover
                  "
                >
                  {/* ICON */}
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-[#D8754A] flex items-center justify-center">
                    <item.icon size={24} className="text-white" />
                  </div>

                  {/* TEXT */}
                  <div>
                    <h3 className="text-white text-lg sm:text-xl font-semibold">
                      {item.title}
                    </h3>
                    <p className="text-white/70 text-sm mt-2">
                      {item.description}
                    </p>
                  </div>

                  {/* META */}
                  <div className="flex items-center justify-between text-sm text-white/80">
                    <span>Budget</span>
                    <span className="text-yellow-300">{item.budget}</span>
                  </div>

                  <div className="flex items-center justify-between text-sm text-white/80">
                    <span>Timeline</span>
                    <span>{item.timeline}</span>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          {/* ARROWS */}
          <CarouselPrevious className="-left-6 sm:-left-10 bg-orange text-black hover:opacity-90" />
          <CarouselNext className="-right-6 sm:-right-10 bg-orange text-black hover:opacity-90" />
        </Carousel>
      </div>
    </section>
  );
}
