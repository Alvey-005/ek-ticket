"use client";
import React, { useState } from "react";
import {
  ArrowLeftRight,
  ChevronLeft,
  ChevronRight,
  Facebook,
  Twitter,
  Linkedin,
  Youtube,
  Instagram,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

export default function EkTicketHomepage() {
  const [tripType, setTripType] = useState("One way");
  const [from, setFrom] = useState("Dhaka");
  const [to, setTo] = useState("London");
  const [date, setDate] = useState("Tue, July 8th");
  const [passengers, setPassengers] = useState("2 People Onboard");

  const travelDeals = [
    {
      name: "Sylhet",
      price: "8000",
      duration: "2h 52m direct",
      validity: "Thu 1st Jun-1/8",
      image:
        "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400",
    },
    {
      name: "Panchapadh",
      price: "5000",
      duration: "2h 10m direct",
      validity: "Thu 1st Jun-1/8",
      image:
        "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400",
    },
    {
      name: "Cox Bazar",
      price: "6000",
      duration: "2h 10m direct",
      validity: "Thu 1st Jun-1/8",
      image:
        "https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=400",
    },
    {
      name: "Rangamati",
      price: "7500",
      duration: "2h 10m direct",
      validity: "Thu 1st Jun-1/8",
      image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400",
    },
  ];

  const featuredTrips = [
    {
      title: "Dhaka → Sylhet",
      subtitle: "Track Station",
      image:
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400",
    },
    {
      title: "Dhaka → Sylhet",
      image:
        "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400",
    },
    {
      title: "Dhaka → Sylhet",
      image:
        "https://images.unsplash.com/photo-1593642532400-2682810df593?w=400",
    },
    {
      title: "Dhaka → Sylhet",
      subtitle: "Historic House",
      image: "https://images.unsplash.com/photo-1518684079-3c830dcef090?w=400",
    },
    {
      title: "Dhaka → Sylhet",
      image:
        "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=400",
    },
    {
      title: "Dhaka → 23",
      image:
        "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400",
    },
  ];

  const trainRoutes = [
    "Dhaka to Cox Bazar train",
    "Sri Mangal to Dhaka train",
    "Rangpur to Dhaka train",
    "Dhaka to Saidpur train",
    "Dhaka to Bogura train",
    "Rajshahi to Syleth train",
    "Dhaka to Dinajpur train",
  ];

  const busRoutes = [
    "Dhaka to Cox Bazar bus",
    "Sri Mangal to Dhaka bus",
    "Rangpur to Dhaka bus",
    "Dhaka to Saidpur bus",
    "Dhaka to Bogura bus",
    "Rajshahi to Syleth bus",
    "Dhaka to Dinajpur bus",
  ];

  const planeRoutes = [
    "Dhaka to Cox Bazar plane",
    "Sri Mangal to Dhaka plane",
    "Rangpur to Dhaka plane",
    "Dhaka to Saidpur plane",
    "Dhaka to Bogura plane",
    "Rajshahi to Syleth plane",
    "Dhaka to Dinajpur plane",
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 🟦 HERO SECTION */}
      <section className="relative h-[500px] overflow-hidden">
        <div
          className="absolute top-0 left-0 w-full h-full bg-cover bg-center"
          style={{ backgroundImage: "url('/images/Rectangle.png')" }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-17">
          {/* NAVIGATION */}
          <nav className="flex items-center justify-between py-4">
            <div className="flex gap-7">
              <div className="text-white text-2xl font-bold">Ek Ticket.com</div>
              <div className="flex gap-2">
                {["All", "Buses", "Trains"].map((label) => (
                  <button
                    key={label}
                    className="px-6 py-2 bg-white rounded-full text-sm font-medium"
                  >
                    {label}
                  </button>
                ))}
                <button className="px-6 py-2 bg-orange-400 text-white rounded-full text-sm font-medium">
                  Flights
                </button>
              </div>
            </div>
            <div className="flex gap-3">
              <button className="px-6 py-2 bg-white rounded-full text-sm font-medium">
                Your Bookings
              </button>
              <button className="px-6 py-2 bg-orange-400 text-white rounded-full text-sm font-medium">
                Sign in
              </button>
            </div>
          </nav>

          {/* HERO CONTENT */}
          <div className="mt-24 text-left max-w-lg">
            <h1 className="text-white text-6xl font-bold leading-tight">
              Discover how to <br /> get anywhere
            </h1>
            <p className="text-orange-400 text-2xl mt-2 font-medium">
              by planes, trains and buses
            </p>
          </div>

          {/* SEARCH BOX */}
          <div className="relative z-10 mt-8 bg-white rounded-lg p-6 shadow-xl max-w-4xl mx-auto">
            <div className="mb-4">
              <select
                value={tripType}
                onChange={(e) => setTripType(e.target.value)}
                className="border-none bg-transparent text-sm font-medium focus:outline-none"
              >
                <option>One way</option>
                <option>Round trip</option>
              </select>
            </div>

            <div className="flex gap-4 items-center">
              <div className="flex-1">
                <label className="text-xs text-gray-500 block mb-1">
                  From:
                </label>
                <input
                  type="text"
                  value={from}
                  onChange={(e) => setFrom(e.target.value)}
                  className="w-full text-lg font-medium border-none focus:outline-none"
                />
              </div>

              <button className="p-2 bg-gray-100 rounded-full">
                <ArrowLeftRight className="w-5 h-5" />
              </button>

              <div className="flex-1">
                <label className="text-xs text-gray-500 block mb-1">To:</label>
                <input
                  type="text"
                  value={to}
                  onChange={(e) => setTo(e.target.value)}
                  className="w-full text-lg font-medium border-none focus:outline-none"
                />
              </div>

              <div className="flex-1">
                <input
                  type="text"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full text-sm border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-orange-500"
                />
              </div>

              <div className="flex-1">
                <input
                  type="text"
                  value={passengers}
                  readOnly
                  className="w-full text-sm border border-gray-300 rounded px-3 py-2 focus:outline-none"
                />
              </div>

              <button className="px-8 py-3 bg-orange-500 text-white rounded-lg font-medium hover:bg-orange-600 transition">
                Search
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 🟨 TRAVEL DEALS */}
      <section className="w-full bg-[#F9FAFB] py-16">
        <div className="max-w-7xl mx-auto px-17">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl text-[#002B7A]">
                Travel deals under{" "}
                <span className="text-orange-500">Tk 50,879</span>
              </h2>
              <p className="text-[#002B7A] mt-1">
                One app for every step of your journey—travel planning has never
                been easier!
              </p>
            </div>
            <div className="flex gap-2">
              <button className="p-2 border border-gray-300 rounded-full hover:bg-gray-50">
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button className="p-2 border border-gray-300 rounded-full hover:bg-gray-50">
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="flex gap-6">
            {travelDeals.map((deal, idx) => (
              <div
                key={idx}
                className="flex-1 bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition cursor-pointer"
              >
                <div className="h-48 overflow-hidden">
                  <img
                    src={deal.image}
                    alt={deal.name}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-bold">{deal.name}</h3>
                    <span className="text-lg font-bold">
                      from tk {deal.price}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">{deal.duration}</p>
                  <p className="text-xs text-gray-500 mt-1">{deal.validity}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

   
      <section className="w-full bg-white py-16">
        <div className="max-w-7xl mx-auto px-17">
          <h2 className="text-3xl font-bold text-gray-800 mb-8">
            Featured Trips
          </h2>
          <div className="flex gap-4">
          
            <div className="flex-1">
              <div className="relative h-[400px] rounded-lg overflow-hidden cursor-pointer group">
                <img
                  src={featuredTrips[0].image}
                  alt={featuredTrips[0].title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <p className="text-sm opacity-90">
                    {featuredTrips[0].subtitle}
                  </p>
                  <h3 className="text-xl font-bold">
                    {featuredTrips[0].title}
                  </h3>
                </div>
              </div>
            </div>

       
            <div className="flex-1 flex flex-col gap-4">
              {[1, 5].map((idx) => (
                <div
                  key={idx}
                  className="relative h-[192px] rounded-lg overflow-hidden cursor-pointer group"
                >
                  <img
                    src={featuredTrips[idx].image}
                    alt={featuredTrips[idx].title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="text-xl font-bold">
                      {featuredTrips[idx].title}
                    </h3>
                  </div>
                </div>
              ))}
            </div>

          
            <div className="flex-1 flex flex-col gap-4">
              {[2, 3, 4].map((idx) => (
                <div
                  key={idx}
                  className="relative flex-1 rounded-lg overflow-hidden cursor-pointer group"
                >
                  <img
                    src={featuredTrips[idx].image}
                    alt={featuredTrips[idx].title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 text-white">
                    {featuredTrips[idx].subtitle && (
                      <p className="text-sm opacity-90">
                        {featuredTrips[idx].subtitle}
                      </p>
                    )}
                    <h3 className="text-lg font-bold">
                      {featuredTrips[idx].title}
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

    
      <section className="w-full bg-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-17 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-12">
            Popular train, bus, flight and ferry connections
          </h2>
          <div className="flex flex-wrap justify-center gap-16">
            {[
              { title: "Train Tickets", routes: trainRoutes },
              { title: "Bus Tickets", routes: busRoutes },
              { title: "Plane Tickets", routes: planeRoutes },
            ].map((category, i) => (
              <div key={i} className="w-64 text-left">
                <div className="flex items-center gap-2 mb-6 justify-center">
                  <div className="w-5 h-5 bg-orange-100 rounded flex items-center justify-center">
                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  </div>
                  <h3 className="font-bold text-gray-800">{category.title}</h3>
                </div>
                <div className="flex flex-col gap-3">
                  {category.routes.map((route, idx) => (
                    <a
                      key={idx}
                      href="#"
                      className="text-blue-600 hover:underline text-sm text-center block"
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

      
      <section className="w-full bg-gray-50 py-16 text-center">
        <div className="max-w-2xl mx-auto px-17">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Newsletter</h2>
          <div className="flex gap-2 justify-center">
            <input
              type="email"
              placeholder="Your email"
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
            />
            <button className="px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition">
              <Mail className="w-5 h-5" />
            </button>
          </div>

          <div className="mt-8 flex flex-col gap-3 items-center">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <MapPin className="w-4 h-4 flex-shrink-0" />
              <span>
                345 Faulconer Drive, Suite 4 • Charlottesville, CA, 12345
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Phone className="w-4 h-4 flex-shrink-0" />
              <span>(123) 456-7890</span>
            </div>
            <div className="mt-6 flex gap-3">
              {[Facebook, Twitter, Linkedin, Youtube, Instagram].map(
                (Icon, i) => (
                  <a
                    key={i}
                    href="#"
                    className="text-gray-600 hover:text-orange-500"
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                )
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ⚫ FOOTER */}
      <footer className="w-full border-t bg-white border-gray-200 py-8">
        <div className="max-w-7xl mx-auto px-17 flex items-center justify-between">
          <div className="flex gap-8 text-sm">
            {[
              "ABOUT US",
              "CONTACT US",
              "HELP",
              "PRIVACY POLICY",
              "DISCLAIMER",
            ].map((link) => (
              <a
                key={link}
                href="#"
                className="text-gray-600 hover:text-gray-800"
              >
                {link}
              </a>
            ))}
          </div>
          <p className="text-sm text-gray-500">
            Copyright © 2025. All Rights Inc.
          </p>
        </div>
      </footer>
    </div>
  );
}
