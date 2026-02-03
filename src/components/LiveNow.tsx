import { Users } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const liveRooms = [
  {
    title: "Python",
    subtitle: "Coding",
    host: "Sarah Chen",
    users: 124,
    mode: "Discussion",
    gradient: "from-[#E6B800] via-[#E89A3C] to-[#D66B6B]",
  },
  {
    title: "UI Design",
    subtitle: "Workshop",
    host: "Alex Rivera",
    users: 89,
    mode: "Learning",
    gradient: "from-[#7F00FF] via-[#9F44FF] to-[#C77DFF]",
  },
  {
    title: "Public",
    subtitle: "Speaking",
    host: "Priya Sharma",
    users: 156,
    mode: "Practice",
    gradient: "from-[#FF512F] via-[#F09819] to-[#FFD200]",
  },
  {
    title: "Android Dev",
    subtitle: "Live Coding",
    host: "David Kim",
    users: 98,
    mode: "Observe",
    gradient: "from-[#FF512F] via-[#F09819] to-[#FFD200]",
  },
];

export default function LiveNow() {
  return (
    <section className="py-20 bg-[#070B24]">
      <div className="container mx-auto px-6">

        {/* HEADER */}
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-4xl font-bold text-white">
              Live <span className="text-orange-400">Now</span>
            </h2>
            <p className="text-white/60 mt-2">
              People talking. Ideas flowing. No scripts.
            </p>
          </div>

          <button className="px-6 py-2 rounded-full bg-orange-500 text-black font-semibold">
            View all
          </button>
        </div>

        {/* SLIDER */}
        <Carousel opts={{ align: "start", loop: true }}>
          <CarouselContent>
            {liveRooms.map((room, i) => (
              <CarouselItem key={i} className="md:basis-1/2 lg:basis-1/3 px-4">
                <div
                  className={`h-[140px] rounded-full px-[2px]
                  bg-gradient-to-r ${room.gradient}
                  flex items-center justify-between shadow-xl`}
                >
                  {/* LEFT */}
                  <div className="flex items-center gap-6">
                    {/* LIVE */}
                    <span className="flex items-center gap-1 text-sm bg-black/30 px-4 py-1 rounded-full text-white">
                      <span className="w-2 h-2 bg-yellow-300 rounded-full" />
                      LIVE
                    </span>

                    {/* TITLE */}
                    <div>
                      <h3 className="text-white text-xl font-semibold leading-tight">
                        {room.title}
                        <br />
                        {room.subtitle}
                      </h3>
                      <p className="text-blue-200 text-sm mt-1">
                        with {room.host}
                      </p>
                    </div>
                  </div>

                  {/* RIGHT */}
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-2 bg-[#6B4A2D] text-white px-4 py-2 rounded-full text-sm">
                      <Users size={16} /> {room.users}
                    </span>

                    <span className="bg-orange-400/90 text-white px-6 py-2 rounded-full text-sm font-medium">
                      {room.mode}
                    </span>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          <CarouselPrevious className="-left-6 bg-orange-500 text-black" />
          <CarouselNext className="-right-6 bg-orange-500 text-black" />
        </Carousel>
      </div>
    </section>
  );
}
