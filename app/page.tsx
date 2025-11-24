"use client";
import React, { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Facebook,
  Twitter,
  Linkedin,
  Youtube,
  Instagram,
  Phone,
  MapPin,
  Printer,
} from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import SearchBar from "@/components/search/SearchBar";
import { useRouter } from "next/navigation";

type TravelDeal = {
  name: string;
  price: string;
  duration: string;
  validity: string;
  image: string;
};

type FeaturedTrip = {
  title: string;
  image: string;
  subtitle?: string;
};

const TRAVEL_DEALS: TravelDeal[] = [
  {
    name: "Sylhet",
    price: "8000",
    duration: "2h 52m direct",
    validity: "Thu 1st Jun-1/8",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400",
  },
  {
    name: "Panch",
    price: "5000",
    duration: "2h 10m direct",
    validity: "Thu 1st Jun-1/8",
    image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400",
  },
  {
    name: "Cox Bazar",
    price: "6000",
    duration: "2h 10m direct",
    validity: "Thu 1st Jun-1/8",
    image: "https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=400",
  },
  {
    name: "Rangamati",
    price: "7500",
    duration: "2h 10m direct",
    validity: "Thu 1st Jun-1/8",
    image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400",
  },
];

const FEATURED_TRIPS: FeaturedTrip[] = [
  {
    title: "Dhaka → Sylhet",
    subtitle: "Track Station",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400",
  },
  {
    title: "Dhaka → Sylhet",
    image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400",
  },
  {
    title: "Dhaka → Sylhet",
    image: "https://images.unsplash.com/photo-1593642532400-2682810df593?w=400",
  },
  {
    title: "Dhaka → Sylhet",
    subtitle: "Historic House",
    image: "https://images.unsplash.com/photo-1518684079-3c830dcef090?w=400",
  },
  {
    title: "Dhaka → Sylhet",
    image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=400",
  },
  {
    title: "Dhaka → 23",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400",
  },
];

const TRAIN_ROUTES = [
  "Dhaka to Cox Bazar train",
  "Sri Mangal to Dhaka train",
  "Rangpur to Dhaka train",
  "Dhaka to Saidpur train",
  "Dhaka to Bogura train",
  "Rajshahi to Syleth train",
  "Dhaka to Dinajpur train",
];

const BUS_ROUTES = [
  "Dhaka to Cox Bazar bus",
  "Sri Mangal to Dhaka bus",
  "Rangpur to Dhaka bus",
  "Dhaka to Saidpur bus",
  "Dhaka to Bogura bus",
  "Rajshahi to Syleth bus",
  "Dhaka to Dinajpur bus",
];

const PLANE_ROUTES = [
  "Dhaka to Cox Bazar plane",
  "Sri Mangal to Dhaka plane",
  "Rangpur to Dhaka plane",
  "Dhaka to Saidpur plane",
  "Dhaka to Bogura plane",
  "Rajshahi to Syleth plane",
  "Dhaka to Dinajpur plane",
];

function DealCard({ deal }: { deal: TravelDeal }) {
  return (
    <div className="bg-white rounded-3xl overflow-hidden shadow-md">
      <div className="aspect-4/3 overflow-hidden">
        <img
          src={deal.image}
          alt={deal.name}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
        />
      </div>

      <div className="p-4 text-[#002B7A]">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-base md:text-lg">{deal.name}</h3>
          <span className="text-sm md:text-lg">from tk {deal.price}</span>
        </div>
        <p className="text-xs md:text-sm font-inter">{deal.duration}</p>
        <p className="text-[11px] md:text-xs mt-1">{deal.validity}</p>
      </div>
    </div>
  );
}


function TripCard({
  trip,
  className,
  titleClass = "text-lg",
}: {
  trip: FeaturedTrip;
  className?: string;
  titleClass?: string;
}) {
  return (
    <div className={`relative rounded-2xl overflow-hidden cursor-pointer group ${className ?? ""}`}>
      <img
        src={trip.image}
        alt={trip.title}
        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
      />
      <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />
      <div className="absolute bottom-4 left-4 text-white">
        {trip.subtitle && <p className="text-xs md:text-sm opacity-90">{trip.subtitle}</p>}
        <h3 className={`${titleClass} font-bold`}>{trip.title}</h3>
      </div>
    </div>
  );
}

export default function EkTicketHomepage() {
  const [tripType, setTripType] = useState("One way");
  const [from, setFrom] = useState("Dhaka");
  const [to, setTo] = useState("London");
  const [date, setDate] = useState("Tue, July 8th");
  const [passengers, setPassengers] = useState("2 People Onboard");
  const [activeTab, setActiveTab] = useState("");
  const [activeAction, setActiveAction] = useState("");
  const router = useRouter();
  const travelDeals = TRAVEL_DEALS;
  const featuredTrips = FEATURED_TRIPS;
  const trainRoutes = TRAIN_ROUTES;
  const busRoutes = BUS_ROUTES;
  const planeRoutes = PLANE_ROUTES;

  return (
    <div className="min-h-screen bg-gray-50y">
      <section className="relative h-[500px] md:h-[550px] lg:h-[600px]  overflow-hidden pb-10">
        <div
          className="absolute  w-full h-full bg-cover bg-center"
          style={{ backgroundImage: "url('/images/Rectangle.png')" }}
        />

        <div className="relative z-50 max-w-7xl mx-auto pt-4 sm:pt-6 px-4 sm:px-6 lg:px-17">
          <nav className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 py-4">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8">
              <div className="text-white text-xl sm:text-2xl font-bold">Ek Ticket.com</div>
              <div className="flex flex-wrap gap-6 font-inter">
                {["All", "Buses", "Trains", "Flights"].map((label) => (
                  <button
                    key={label}
                    onClick={() => setActiveTab(label)}
                    className={`
                px-4 sm:px-10 py-2 rounded-full text-xs sm:text-sm font-medium transition
                  ${activeTab === label ? "bg-orange-400 text-white" : "bg-white text-[#002B7A]"}
                        `}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap gap-2 sm:gap-3 font-inter">
              {["Your Bookings", "Sign in"].map((label) => (
                <button
                  key={label}
                  onClick={() => {
                    setActiveAction(label);
                    if (label === "Sign in") {
                      router.push("/register");
                    }
                  }}
                  className={`
               px-4 sm:px-6 py-2 rounded-full text-xs sm:text-sm font-medium transition
             ${activeAction === label ? "bg-orange-400 text-white" : "bg-white text-[#002B7A]"}
               `}
                >
                  {label}
                </button>
              ))}
            </div>
          </nav>

          <div className="mt-10 md:mt-16 lg:mt-24 text-left max-w-xl pb-10 sm:pb-16 md:pb-24">
            <h1 className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Discover how to <br /> get anywhere
            </h1>
            <p className="text-orange-300 text-lg sm:text-xl md:text-2xl mt-2 font-semibold">
              By planes, trains and buses
            </p>
          </div>
        </div>
      </section>

      <div className="relative z-50 -mt-10 md:-mt-16  lg:-mt-25 flex justify-center font-inter">
        <div className="w-full max-w-[1240px] mx-auto  md:px-14 sm:px-6">
          <SearchBar onSearch={(payload) => console.log("search", payload)} />
        </div>
      </div>

      <section className="w-full sm:py-16 bg-[#F9FAFB] -mt-10 pt-24">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
            <div>
              <h2 className="text-2xl sm:text-3xl text-[#002B7A]">
                Travel deals under <span className="text-orange-500">Tk 50,879</span>
              </h2>
              <p className="text-[#002B7A] mt-1 text-sm sm:text-base">
                One app for every step of your journey—travel planning has never been easier!
              </p>
            </div>

            {/* Swiper navigation buttons */}
            <div className="flex gap-2 self-end md:self-auto">
              <button className="swiper-button-prev-custom p-2 border border-gray-300 rounded-full hover:bg-gray-50">
                <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
              <button className="swiper-button-next-custom p-2 border border-gray-300 rounded-full hover:bg-gray-50">
                <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>
          </div>

          <Swiper
            modules={[Navigation]}
            navigation={{
              nextEl: ".swiper-button-next-custom",
              prevEl: ".swiper-button-prev-custom",
            }}
            spaceBetween={16}
            slidesPerView={1.1}
            className="pb-2"
            breakpoints={{
              480: { slidesPerView: 1.5 },
              640: { slidesPerView: 2 },
              768: { slidesPerView: 3 },
              1024: { slidesPerView: 4 },
            }}
          >
            {[...travelDeals, ...travelDeals].map((deal, idx) => (
              <SwiperSlide key={`${deal.name}-${idx}`}>
                <div className="pb-2">
                  <DealCard deal={deal} />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      {/* FEATURED TRIPS */}
      <section className="w-full bg-white py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 ">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6 sm:mb-8">
            Featured Trips
          </h2>
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative h-64 sm:h-80 md:h-[400px] rounded-2xl overflow-hidden cursor-pointer group">
                <img
                  src={featuredTrips[0].image}
                  alt={featuredTrips[0].title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4 text-white">
                  <span className="inline-block mb-2 px-3 py-1 rounded-full bg-white/30 backdrop-blur text-[10px] sm:text-xs">
                    Glass Button
                  </span>
                  {featuredTrips[0].subtitle && (
                    <p className="text-xs sm:text-sm opacity-90">{featuredTrips[0].subtitle}</p>
                  )}
                  <h3 className="text-lg sm:text-xl font-bold">{featuredTrips[0].title}</h3>
                </div>
              </div>
            </div>

            <div className="flex-1 flex flex-col gap-4">
              <div className="flex flex-col sm:flex-row gap-4">
                {[1, 3].map((idx) => (
                  <TripCard
                    key={idx}
                    trip={featuredTrips[idx]}
                    className="h-40 sm:h-48 md:h-[200px] flex-1"
                    titleClass="text-base sm:text-xl"
                  />
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                {[2, 4, 5].map((idx) => (
                  <TripCard
                    key={idx}
                    trip={featuredTrips[idx]}
                    className="h-36 sm:h-44 md:h-[180px] flex-1"
                    titleClass="text-sm sm:text-lg"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full bg-gray-100 py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-24 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-8 sm:mb-12">
            Popular train, bus, flight and ferry connections
          </h2>
          <div className="flex flex-wrap justify-center gap-10 sm:gap-16">
            {[
              { title: "Train Tickets", routes: trainRoutes },
              { title: "Bus Tickets", routes: busRoutes },
              { title: "Plane Tickets", routes: planeRoutes },
            ].map((category, i) => (
              <div key={i} className="w-64 max-w-full text-left">
                <div className="flex items-center gap-2 mb-4 sm:mb-6 justify-center">
                  <div className="w-5 h-5 bg-orange-100 rounded flex items-center justify-center">
                    <div className="w-2 h-2 bg-orange-500 rounded-full" />
                  </div>
                  <h3 className="font-bold text-gray-800 text-sm sm:text-base">{category.title}</h3>
                </div>
                <div className="flex flex-col gap-2 sm:gap-3">
                  {category.routes.map((route, idx) => (
                    <a
                      key={idx}
                      href="#"
                      className="text-[#002B7A] hover:underline text-xs sm:text-sm text-center block"
                    >
                      {route}
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="w-full bg-gray-50 py-12 sm:py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 items-start">
            {/* Newsletter */}
            <div>
              <h2 className="text-sm sm:text-md text-left font-inter font-black text-[#0A142F] mb-3 sm:mb-4">
                Newsletter
              </h2>
              <div className="flex items-center">
                <div className="flex-1 h-12 rounded-full bg-[#F8F4F0] flex items-center justify-between px-2 w-full md:w-[280px]">
                  <input
                    type="email"
                    placeholder="Your email"
                    className="flex-1 ml-2 bg-transparent text-gray-700 placeholder:text-gray-400 focus:outline-none text-sm"
                  />
                  <button className="ml-2 rounded-full flex items-center justify-center shadow">
                    <img
                      src="/icon/Send.png"
                      alt="Send"
                      className="size-9 sm:size-11 object-contain"
                    />
                  </button>
                </div>
              </div>
            </div>

            {/* Contact */}
            <div>
              <div className="flex flex-col gap-3 text-[#0A142F] text-sm sm:text-base">
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 mt-1" />
                  <span>345 Faulconer Drive, Suite 4 • Charlottesville, CA, 12345</span>
                </div>
                <div className="flex flex-wrap items-center gap-4 sm:gap-8">
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    <span>(123) 456-7890)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Printer className="w-4 h-4" />
                    <span>(123) 456-7890)</span>
                  </div>
                </div>
                <div className="mt-2">
                  <span className="text-xs sm:text-sm text-gray-500">Social Media</span>
                  <div className="mt-2 flex items-center gap-3 sm:gap-4 text-[#002B7A]">
                    {[Facebook, Twitter, Linkedin, Youtube, Instagram].map((Icon, i) => (
                      <a key={i} href="#" className="hover:opacity-80">
                        <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="my-6 sm:my-8 h-px bg-gray-200 opacity-70" />

          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <nav className="flex flex-wrap justify-center gap-4 sm:gap-6 text-xs sm:text-sm text-[#0A142F]">
              {["ABOUT US", "CONTACT US", "HELP", "PRIVACY POLICY", "DISCLAIMER"].map((item) => (
                <a key={item} href="#" className="hover:text-gray-900">
                  {item}
                </a>
              ))}
            </nav>
            <p className="text-gray-600 text-xs sm:text-sm text-center md:text-right">
              Copyright © 2018 • Lift Media Inc.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
