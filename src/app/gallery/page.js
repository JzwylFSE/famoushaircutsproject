"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { FaHeart, FaRegHeart, FaInstagram } from "react-icons/fa";

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
    alt: "Taper fade backvieww",
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
        item.id === id ? { ...item, liked: !item.liked } : item
      )
    );
  };

  const filteredItems =
    activeFilter === "All"
      ? gallery
      : gallery.filter((item) =>
          Array.isArray(item.category)
            ? item.category.includes(activeFilter.toLowerCase())
            : item.category === activeFilter.toLowerCase()
        );

  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: "var(--background)" }}
    >
      {/* Hero Header */}
      <motion.section
        className="py-20 px-4 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <motion.h1
          className="text-4xl md:text-5xl font-bold mb-4"
          style={{ color: "var(--secondary)" }}
          initial={{ y: -20 }}
          animate={{ y: 0 }}
        >
          Gallery
        </motion.h1>
        <motion.p
          className="text-lg max-w-2xl mx-auto mb-6"
          style={{ color: "var(--primary)" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Witness the <b>artistry</b> of Famous Haircuts through our
          transformations and haircuts
        </motion.p>
      </motion.section>

      {/* Filter Buttons */}
      <div className="flex flex-wrap justify-center gap-3 px-4 pb-8">
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
          <motion.button
            key={cat}
            className={`px-4 py-2 rounded-full text-sm font-medium ${
              activeFilter === cat ? "active-filter" : ""
            }`}
            style={{
              backgroundColor:
                activeFilter === cat ? "var(--secondary)" : "transparent",
              color:
                activeFilter === cat ? "var(--background)" : "var(--primary)",
              border: `1px solid var(--${
                activeFilter === cat ? "secondary" : "primary"
              })`,
            }}
            whileHover={{
              backgroundColor: "var(--secondary)",
              color: "var(--background)",
            }}
            onClick={() => setActiveFilter(cat)}
          >
            {cat}
          </motion.button>
        ))}
      </div>

      {/* Gallery Grid */}
      <div className="columns-1 md:columns-2 lg:columns-4 gap-3 px-4">
        {filteredItems.map((item, idx) => (
          <motion.div
            key={item.id}
            className="mb-3 relative group break-inside-avoid"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div
              className="rounded-lg overflow-hidden relative cursor-zoom-in"
              onClick={() => {
                setIndex(idx);
                setOpen(true);
              }}
            >
              <div className="aspect-[4/5] relative">
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>

              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                <h3 className="text-xl font-bold mb-2 text-white line-clamp-2">
                  {item.alt}
                </h3>
                <div className="flex justify-between items-center">
                  <span className="text-xs px-2 py-1 rounded text-white bg-black/50">
                    #{item.category}
                  </span>
                  <button
                    className="text-white"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleLike(item.id);
                    }}
                  >
                    {item.liked ? (
                      <FaHeart className="text-red-500" />
                    ) : (
                      <FaRegHeart />
                    )}
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Lightbox */}
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
          container: { backgroundColor: "rgba(0, 0, 0, 0.9)" },
          icon: { color: "var(--background)" },
        }}
        render={{
          slide: ({ slide }) => (
            <div className="relative w-full h-full">
              <Image
                src={slide.src}
                alt={slide.alt}
                fill
                className="w-full h-full object-contain"
                sizes="100vw"
                priority
              />
              <div className="absolute bottom-0 left-0 right-0 p-6 text-center bg-gradient-to-t from-black/80 to-transparent">
                <h3 className="text-xl font-bold text-white">{slide.alt}</h3>
                <p className="text-white/80">{slide.description}</p>
              </div>
            </div>
          ),
          iconNext: () => (
            <div className="p-2 rounded-full bg-black/50 hover:bg-black/70 transition">
              <svg
                viewBox="0 0 24 24"
                width="24"
                height="24"
                fill="var(--background)"
              >
                <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z" />
              </svg>
            </div>
          ),
          iconPrev: () => (
            <div className="p-2 rounded-full bg-black/50 hover:bg-black/70 transition">
              <svg
                viewBox="0 0 24 24"
                width="24"
                height="24"
                fill="var(--background)"
              >
                <path d="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41z" />
              </svg>
            </div>
          ),
          iconClose: () => (
            <div className="p-2 rounded-full bg-black/50 hover:bg-black/70 transition">
              <svg
                viewBox="0 0 24 24"
                width="24"
                height="24"
                fill="var(--background)"
              >
                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
              </svg>
            </div>
          ),
        }}
      />

      {/* Instagram CTA */}
      <motion.section
        className="py-16 px-4 text-center"
        style={{ backgroundColor: "var(--accent)" }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="container mx-auto max-w-4xl">
          <FaInstagram
            className="text-4xl mx-auto mb-6"
            style={{ color: "var(--secondary)" }}
          />
          <motion.h2
            className="text-3xl font-bold mb-4"
            style={{ color: "var(--primary)" }}
          >
            Show Us Your Cut
          </motion.h2>
          <motion.p
            className="text-lg mb-8 max-w-2xl mx-auto"
            style={{ color: "var(--primary)" }}
          >
            Tag @FamousHaircuts to be featured in our gallery!
          </motion.p>
          <motion.a
            href="https://www.instagram.com/famous_haircut01/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-3 rounded-md font-bold text-lg inline-flex items-center gap-2"
            style={{
              backgroundColor: "var(--secondary)",
              color: "var(--background)",
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Follow Us <FaInstagram />
          </motion.a>
        </div>
      </motion.section>
    </div>
  );
}
