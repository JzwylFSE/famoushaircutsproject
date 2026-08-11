"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { FaHeart, FaRegHeart, FaInstagram } from "react-icons/fa";
import Button2 from "./../../Components/Button2";

const galleryItems = [
  // categories: All, Transformation, Beard, Coloring, Fade, Design, Kids, Service
  {
    id: 1,
    src: "/images/transform1.jpg",
    alt: "Hair Transformation",
    description: "Complete style makeover with precision cutting",
    category: "transformation",
  },
  {
    id: 2,
    src: "/images/transform2.jpg",
    alt: "Style Makeover",
    description: "From rusty to fresh in one session",
    category: "transformation",
  },
  {
    id: 3,
    src: "/images/beardtrim.jpg",
    alt: "Haircut & Beard Sculpting",
    description: "Professional beard shaping and grooming",
    category: "beard",
  },
  {
    id: 4,
    src: "/images/eight.jpg",
    alt: "Roundcut Masterpiece",
    description: "Skin fade with sharp line up",
    category: "fade",
  },
  {
    id: 5,
    src: "/images/22.main.jpg",
    alt: "Taper fade",
    description: "Taper fade with sharp line up",
    category: "fade",
  },
  {
    id: 6,
    src: "/images/22.2.jpg",
    alt: "Taper fade backview",
    description: "High level taper fade",
    category: "fade",
  },
  {
    id: 7,
    src: "/images/eighteen.jpg",
    alt: "Low hair roundcut fade",
    description: "Skin fade with sharp line up",
    category: "fade",
  },
  {
    id: 8,
    src: "/images/eleven.jpg",
    alt: "High taper fade",
    description: "Taper fade with sharp line up and a lil beard trim",
    category: "fade",
  },
  {
    id: 9,
    src: "/images/fifteen.jpg",
    alt: "Low hair roundcut fade",
    description: "Skin fade with sharp line up and beard trim",
    category: "fade",
  },
  {
    id: 10,
    src: "/images/five.jpg",
    alt: "Low taper on high hair",
    description: "Low fade with sharp line up",
    category: "fade",
  },
  {
    id: 11,
    src: "/images/four(copy).jpg",
    alt: "Low taper fade",
    description: "Low taper fade with sharp line up ",
    category: "other",
  },
  {
    id: 12,
    src: "/images/fourteen.jpg",
    alt: "Classic roundcut on low hair",
    description: "Roundcut with sharp line up and moustache trim",
    category: "fade",
  },
  {
    id: 13,
    src: "/images/hairdesign.jpg",
    alt: "Creative Design",
    description: "Artistic hair patterning and detailing",
    category: "design",
  },
  {
    id: 14,
    src: "/images/homeservice.jpg",
    alt: "Classic low roundcut",
    description: "Premium cuts in the comfort of your home",
    category: ["fade", "service"],
  },
  {
    id: 15,
    src: "/images/nine.jpg",
    alt: "Roundcut",
    description: "low hair roundcut with sharp line up",
    category: "other",
  },
  {
    id: 16,
    src: "/images/one.2.jpg",
    alt: "Roundcut",
    description: "neat lowhair roundcut with sharp line up",
    category: "fade",
  },
  {
    id: 17,
    src: "/images/lineup.jpg",
    alt: "Hair trim and line up",
    description: "Precision line up and hair trim for a polished look",
    category: "other",
  },
  {
    id: 18,
    src: "/images/seven.jpg",
    alt: "Full hair & beard cut",
    description: "Professional grooming and beard shaping",
    category: ["transformation", "beard"],
  },
  {
    id: 19,
    src: "/images/seventeen.jpg",
    alt: "Classic roundcut",
    description: "high roundcut fade",
    category: "fade",
  },
  {
    id: 20,
    src: "/images/homeservice3.jpg",
    alt: "Taper fade",
    description: "Premium cuts in the comfort of your home",
    category: "service",
  },
  {
    id: 21,
    src: "/images/six.jpg",
    alt: "Taper fade backview",
    description: "taper fade",
    category: "fade",
  },
  {
    id: 22,
    src: "/images/ten.jpg",
    alt: "Haircut and beard trim",
    description: "full grooming and beard trim",
    category: "other",
  },
  {
    id: 23,
    src: "/images/thirteen.2.jpg",
    alt: "Taper fade backview",
    description: "taper fade",
    category: "fade",
  },
  {
    id: 24,
    src: "/images/thirteen.jpg",
    alt: "Taper fade",
    description: "low taper fade with sharp line up and beard trim",
    category: "fade",
  },
  {
    id: 25,
    src: "/images/three.jpg",
    alt: "Taper fade",
    description: "Low taper fade",
    category: "fade",
  },
  {
    id: 26,
    src: "/images/twelve.jpg",
    alt: "Taper fade",
    description: "low taper fade with beard line up",
    category: "fade",
  },
  {
    id: 27,
    src: "/images/twenty.jpg",
    alt: "Roundcut",
    description: "classic roundcut with sharp line up",
    category: "fade",
  },
  {
    id: 28,
    src: "/images/twentyone.2.jpg",
    alt: "Low roundcut",
    description: "low roundcut backview",
    category: "fade",
  },
  {
    id: 29,
    src: "/images/twentyone.3.jpg",
    alt: "Low roundcut",
    description: "low roundcut with beard trim sideview",
    category: "fade",
  },
  {
    id: 30,
    src: "/images/two.jpg",
    alt: "Low taper fade",
    description: "low taper fade with sharp line up",
    category: "fade",
  },
  {
    id: 31,
    src: "/images/two.2.jpg",
    alt: "Low taper fade",
    description: "Low taper fade sideview",
    category: "fade",
  },
  {
    id: 32,
    src: "/images/two.3.jpg",
    alt: "Taper fade",
    description: "Low taper fade with moustache trim, frontview",
    category: "fade",
  },
  {
    id: 33,
    src: "/images/homeservice2.front.jpg",
    alt: "Classic Roundcut",
    description: "Premium cuts in the comfort of your home",
    category: "service",
  },
];

export default function GalleryPage() {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const [gallery, setGallery] = useState(galleryItems);
  const [activeFilter, setActiveFilter] = useState("All");

  const toggleLike = (id) => {
    setGallery(
      gallery.map((item) =>
        item.id === id ? { ...item, liked: !item.liked } : item,
      ),
    );
  };

  const filteredItems =
    activeFilter === "All"
      ? gallery
      : gallery.filter((item) =>
          Array.isArray(item.category)
            ? item.category.includes(activeFilter.toLowerCase())
            : item.category === activeFilter.toLowerCase(),
        );

  return (
    <div className="min-h-screen bg-background text-textmain">
      {/* --- Hero Header --- */}
      <motion.section
        className="pt-32 pb-12 px-4 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <motion.h1
          className="text-4xl md:text-6xl font-serif font-bold mb-4 text-textmain tracking-wider uppercase"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          Gallery
        </motion.h1>
        <motion.p
          className="text-xs sm:text-sm md:text-base max-w-2xl mx-auto text-textmuted uppercase tracking-[0.2em] font-medium"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          Witness the artistry and precision of Famous Haircuts
        </motion.p>
      </motion.section>

      {/* --- Filter Buttons --- */}
      <div className="flex flex-wrap justify-center gap-4 md:gap-8 px-4 pb-12 max-w-5xl mx-auto">
        {[
          "All",
          "Transformation",
          "Beard",
          "Coloring",
          "Fade",
          "Design",
          "Kids",
          "Service",
        ].map((cat) => (
          <button
            key={cat}
            className={`text-xs md:text-sm uppercase tracking-widest pb-1 transition-all duration-300 border-b-2 font-bold ${
              activeFilter === cat
                ? "text-primary border-primary"
                : "text-textmuted border-transparent hover:text-textmain hover:border-gray-300"
            }`}
            onClick={() => setActiveFilter(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* --- Gallery Grid (3 Columns on Mobile) --- */}
      <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 md:gap-4 px-2 md:px-4 max-w-[1400px] mx-auto mb-24">
        {filteredItems.map((item, idx) => (
          <motion.div
            key={item.id}
            className="relative group cursor-pointer aspect-square bg-surface border border-gray-100 overflow-hidden rounded-md shadow-sm"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: (idx % 10) * 0.05 }}
            viewport={{ once: true, margin: "50px" }}
            onClick={() => {
              setIndex(idx);
              setOpen(true);
            }}
          >
            <Image
              src={item.src}
              alt={item.alt}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
              sizes="(max-width: 768px) 33vw, (max-width: 1200px) 25vw, 20vw"
            />

            {/* Hover Glass Overlay */}
            <div className="absolute inset-0 bg-background/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center items-center p-2 md:p-4 text-center">
              <h3 className="text-xs md:text-lg font-serif font-bold text-textmain line-clamp-2 md:line-clamp-none">
                {item.alt}
              </h3>
              <span className="hidden md:block text-primary font-bold text-[10px] md:text-xs uppercase tracking-widest mt-2">
                #
                {Array.isArray(item.category)
                  ? item.category[0]
                  : item.category}
              </span>

              {/* Like Button */}
              <button
                className="absolute bottom-2 right-2 md:bottom-4 md:right-4 text-textmuted hover:scale-110 transition-transform"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleLike(item.id);
                }}
              >
                {item.liked ? (
                  <FaHeart className="text-red-500 text-sm md:text-xl" />
                ) : (
                  <FaRegHeart className="text-sm md:text-xl" />
                )}
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* --- Lightbox --- */}
      <Lightbox
        open={open}
        close={() => setOpen(false)}
        index={index}
        slides={filteredItems.map((item) => ({
          src: item.src,
          alt: item.alt,
          description: item.description,
        }))}
        styles={{
          container: { backgroundColor: "rgba(255, 255, 255, 0.98)" },
          icon: { color: "#333333" },
        }}
        render={{
          slide: ({ slide }) => (
            <div className="relative w-full h-full flex items-center justify-center p-4 md:p-10">
              <div className="relative w-full max-w-4xl h-full shadow-2xl rounded-lg overflow-hidden">
                <Image
                  src={slide.src}
                  alt={slide.alt}
                  fill
                  className="object-contain"
                  sizes="100vw"
                  priority
                />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6 text-center bg-gradient-to-t from-white to-transparent">
                <h3 className="text-xl md:text-2xl font-serif font-bold text-primary mb-2">
                  {slide.alt}
                </h3>
                <p className="text-textmuted font-semibold text-sm md:text-base tracking-wide uppercase">
                  {slide.description}
                </p>
              </div>
            </div>
          ),
          iconNext: () => (
            <div className="p-3 rounded-full bg-surface shadow-md hover:bg-primary transition-colors border border-gray-200 hover:border-primary group">
              <svg
                viewBox="0 0 24 24"
                width="24"
                height="24"
                className="fill-textmain group-hover:fill-white"
              >
                <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z" />
              </svg>
            </div>
          ),
          iconPrev: () => (
            <div className="p-3 rounded-full bg-surface shadow-md hover:bg-primary transition-colors border border-gray-200 hover:border-primary group">
              <svg
                viewBox="0 0 24 24"
                width="24"
                height="24"
                className="fill-textmain group-hover:fill-white"
              >
                <path d="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41z" />
              </svg>
            </div>
          ),
          iconClose: () => (
            <div className="p-3 rounded-full bg-surface shadow-md hover:bg-red-500 transition-colors border border-gray-200 hover:border-red-500 group">
              <svg
                viewBox="0 0 24 24"
                width="24"
                height="24"
                className="fill-textmain group-hover:fill-white"
              >
                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
              </svg>
            </div>
          ),
        }}
      />

      {/* --- Instagram CTA --- */}
      <motion.section
        className="py-24 px-4 text-center bg-surface border-t border-gray-200"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="container mx-auto max-w-4xl">
          <FaInstagram className="text-5xl mx-auto mb-6 text-primary" />
          <h2 className="text-3xl md:text-5xl font-serif text-textmain font-bold mb-6">
            Show Us Your Cut
          </h2>
          <p className="text-textmuted text-sm md:text-base font-semibold uppercase tracking-widest mb-10 max-w-2xl mx-auto">
            Tag <span className="text-primary font-bold">@Famous_Haircut01</span> to be
            featured in our gallery!
          </p>
          <Button2
            href="https://www.instagram.com/famous_haircut01/"
            className="inline-flex items-center gap-3"
            target="_blank"
            rel="noopener noreferrer"
          >
            Follow Us <FaInstagram className="text-lg" />
          </Button2>
        </div>
      </motion.section>
    </div>
  );
}
