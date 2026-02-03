import { useRef } from "react";
import Autoplay from "embla-carousel-autoplay";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import avatar1 from "@/assets/avatar-1.jpg";
import avatar2 from "@/assets/avatar-2.jpg";
import avatar3 from "@/assets/avatar-3.jpg";
import avatar4 from "@/assets/avatar-4.jpg";
import avatar5 from "@/assets/avatar-5.jpg";

const avatars = [
  avatar1,
  avatar2,
  avatar3,
  avatar4,
  avatar5,
];

export default function OnlineSpaceSection() {
  const autoplay = useRef(
    Autoplay({
      delay: 2500,        // speed (ms)
      stopOnInteraction: false,
      stopOnMouseEnter: true,
    })
  );

  return (
    <section className="py-12 sm:py-20 bg-navy overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative">

        {/* HEADER */}
        <div className="flex items-center justify-between mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground">
            In the <span className="text-orange">Online Space</span>
          </h2>

          <button className="px-5 py-2 sm:px-7 sm:py-2.5 rounded-full bg-orange text-black font-medium hover:opacity-90 transition">
            View all
          </button>
        </div>

        {/* SLIDER */}
        <Carousel
          opts={{ align: "center", loop: true }}
          plugins={[autoplay.current]}
          onMouseEnter={autoplay.current.stop}
          onMouseLeave={autoplay.current.reset}
        >
          <CarouselContent className="gap-14">

            {avatars.map((src, i) => (
              <CarouselItem key={i} className="basis-1/3 sm:basis-[260px] flex justify-center">
                <div
                  className={`relative w-56 sm:w-60 md:w-64 h-72 sm:h-80 rounded-xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.55)] transition-all duration-500 ${
                    i % 2 === 0 ? "sm:-rotate-6" : "sm:rotate-6"
                  } rotate-0`}
                >
                  <img src={src} alt="avatar" className="w-full h-full object-cover" />

                  {/* GOLD EDGE */}
                  <div className="absolute inset-0 ring-1 ring-orange/40 rounded-xl" />
                </div>
              </CarouselItem>
            ))}

          </CarouselContent>

          {/* ARROWS */}
          <CarouselPrevious className="left-6 bg-orange-500 text-black hover:bg-orange-400" />
          <CarouselNext className="right-6 bg-orange-500 text-black hover:bg-orange-400" />
        </Carousel>

      </div>
    </section>
  );
}
