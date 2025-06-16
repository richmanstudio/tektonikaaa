// src/pages/Projects.tsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Layout from "../layouts/MainLayout";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

/**
 * «Проекты 3.0» — hero с полупрозрачной картой, фильтр по годам,
 * анимированные карточки и модальное окно с галереей.
 */

// Демо‑проекты (замените на реальные данные)
const PROJECTS = [
  {
    id: "solar",
    image: "/src/assets/projects/solar.jpg",
    title: "В будущем будет название проекта",
    region: "Название региона",
    year: 2025,
    short: "Короткое",
    desc: "Подробное описание",
  },
  {
    id: "tiger",
    image: "/src/assets/projects/tiger.jpg",
    title: "В будущем будет название проекта",
    region: "Название региона",
    year: 2024,
    short: "Короткое",
    desc: "Подробное описание",
  },
  {
    id: "orlina",
    image: "/src/assets/projects/orlina.jpg",
    title: "В будущем будет название проекта",
    region: "Название региона",
    year: 2023,
    short: "Короткое",
    desc: "Подробное описание",
  },
] as const;

const YEARS = ["Все", 2025, 2024, 2023] as const;

type Project = (typeof PROJECTS)[number];

export default function Projects() {
  const [filterYear, setFilterYear] = useState<(typeof YEARS)[number]>("Все");
  const [active, setActive] = useState<Project | null>(null);

  const visible = PROJECTS.filter(p =>
    filterYear === "Все" ? true : p.year === filterYear
  );

  return (
    <Layout>
      {/* HERO */}
      <section className="relative h-[60vh] overflow-hidden text-white flex items-center justify-center">
        <img
          src="/src/assets/hero-map.jpg"
          alt="Карта проектов"
          className="absolute inset-0 w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/80 to-blue-600/60" />
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-5xl md:text-6xl font-extrabold"
        >
          Наши проекты
        </motion.h1>
      </section>

      {/* FILTER */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {YEARS.map(y => (
              <button
                key={y}
                onClick={() => setFilterYear(y)}
                className={`px-5 py-2 rounded-full font-semibold transition ${
                  filterYear === y
                    ? "bg-blue-700 text-white shadow-lg"
                    : "bg-white text-blue-700 shadow hover:bg-white/90"
                }`}
              >
                {y}
              </button>
            ))}
          </div>

          {/* GRID */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {visible.map((p, i) => (
              <motion.div
                key={p.id}
                className="relative group cursor-pointer rounded-3xl overflow-hidden shadow-lg hover:shadow-xl"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                onClick={() => setActive(p)}
              >
                <img
                  src={p.image}
                  alt={p.title}
                  className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-xl font-semibold drop-shadow">{p.title}</h3>
                  <p className="text-sm drop-shadow">{p.region}, {p.year}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* MODAL */}
      <AnimatePresence>
        {active && (
          <motion.div
            className="fixed inset-0 bg-black/70 backdrop-blur z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-3xl max-w-3xl w-full overflow-hidden shadow-xl relative"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
            >
              <button
                onClick={() => setActive(null)}
                className="absolute top-4 right-4 bg-white rounded-full p-2 shadow hover:bg-gray-100"
              >
                <X />
              </button>
              <img src={active.image} alt={active.title} className="w-full h-72 object-cover" />
              <div className="p-8 space-y-4">
                <h2 className="text-2xl font-bold text-blue-700">{active.title}</h2>
                <p className="text-gray-500 text-sm">{active.region}, {active.year}</p>
                <p className="text-gray-700 leading-relaxed">{active.desc}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CTA */}
      <section className="py-24 bg-gradient-to-r from-blue-700 to-purple-600 text-white text-center">
        <div className="container mx-auto px-4 max-w-2xl">
          <h2 className="text-3xl font-bold mb-6">Хотите такой же результат?</h2>
          <p className="mb-8 text-lg">
            Мы подберём технологию под ваш участок и бюджет.
          </p>
          <Link
            to="#contacts"
            className="inline-block bg-white text-blue-700 font-semibold py-4 px-10 rounded-full shadow-lg hover:bg-gray-100 transition"
          >
            Связаться с нами
          </Link>
        </div>
      </section>
    </Layout>
  );
}
