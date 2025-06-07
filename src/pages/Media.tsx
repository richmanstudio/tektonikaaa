// src/pages/Media.tsx
import React, { useState } from "react";
import Layout from "../layouts/MainLayout";
import { motion, AnimatePresence } from "framer-motion";
import { Image as ImageIcon, Newspaper, FileText, X } from "lucide-react";
import { Link } from "react-router-dom";

/**
 * «Медиа-центр 3.0» — новости, фотогалерея с лайтбоксом и документы.
 * Реализовано на чистом React + Framer Motion (без сторонних lightbox-библиотек).
 */

// Фэйковые данные — заменить на API / CMS
const NEWS = Array.from({ length: 5 }).map((_, i) => ({
  id: i + 1,
  title: `Заголовок новости №${i + 1}`,
  date: "12.03.2025",
  desc: "Краткое описание новости. Оно не слишком длинное, но информативное.",
  link: "#",
}));

const PHOTOS = Array.from({ length: 12 }).map((_, i) => ({
  id: i + 1,
  src: `/src/assets/photos/season-2024/IMG_61${10 + i}.JPG`,
  alt: `Фотография ${i + 1}`,
}));

const DOCS = [
  { name: "Годовой отчёт 2024.pdf", url: "/docs/report-2024.pdf" },
  { name: "Презентация компании.pptx", url: "/docs/presentation.pptx" },
];

const TABS = [
  { key: "news", label: "Новости", icon: <Newspaper size={18} /> },
  { key: "photo", label: "Фото", icon: <ImageIcon size={18} /> },
  { key: "docs", label: "Документы", icon: <FileText size={18} /> },
] as const;

type TabKey = (typeof TABS)[number]["key"];

type Photo = (typeof PHOTOS)[number];

export default function Media() {
  const [active, setActive] = useState<TabKey>("news");
  const [lightbox, setLightbox] = useState<Photo | null>(null);

  return (
    <Layout>
      {/* HERO */}
      <section className="relative py-24 text-center bg-gradient-to-br from-blue-900 to-blue-600 text-white overflow-hidden">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl md:text-6xl font-extrabold mb-4"
        >
          Медиа-центр
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-lg md:text-2xl max-w-xl mx-auto"
        >
          Новости, галерея и полезные материалы о работе «Тектоники»
        </motion.p>
        {/* декор */}
        <div className="absolute -top-20 -left-24 w-72 h-72 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-16 -right-32 w-80 h-80 bg-white/10 rounded-full blur-2xl" />
      </section>

      {/* TABS */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {TABS.map(t => (
              <button
                key={t.key}
                onClick={() => setActive(t.key)}
                className={`flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition ${
                  active === t.key
                    ? "bg-blue-700 text-white shadow-lg"
                    : "bg-white text-blue-700 shadow hover:bg-white/90"
                }`}
              >
                {t.icon}
                {t.label}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait" initial={false}>
            {active === "news" && (
              <motion.div
                key="news"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {NEWS.map(n => (
                  <article
                    key={n.id}
                    className="bg-white rounded-2xl p-6 shadow hover:shadow-lg transition flex flex-col"
                  >
                    <h3 className="text-xl font-semibold mb-2 text-blue-700">
                      {n.title}
                    </h3>
                    <p className="text-sm text-gray-500 mb-4">{n.date}</p>
                    <p className="text-gray-700 flex-grow">{n.desc}</p>
                    <Link
                      to={n.link}
                      className="mt-4 text-blue-700 font-semibold hover:underline"
                    >
                      Читать далее →
                    </Link>
                  </article>
                ))}
              </motion.div>
            )}

            {active === "photo" && (
              <motion.div
                key="photo"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
              >
                {PHOTOS.map(ph => (
                  <motion.img
                    key={ph.id}
                    src={ph.src}
                    alt={ph.alt}
                    className="w-full h-48 object-cover rounded-xl cursor-pointer hover:scale-105 transition"
                    onClick={() => setLightbox(ph)}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                  />
                ))}
              </motion.div>
            )}

            {active === "docs" && (
              <motion.div
                key="docs"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="max-w-2xl mx-auto"
              >
                <ul className="space-y-4">
                  {DOCS.map(d => (
                    <li
                      key={d.url}
                      className="bg-white shadow rounded-xl p-4 flex items-center justify-between"
                    >
                      <span className="text-gray-800">{d.name}</span>
                      <a
                        href={d.url}
                        className="text-blue-700 font-semibold hover:underline"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Скачать
                      </a>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            className="fixed inset-0 bg-black/80 backdrop-blur z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightbox(null)}
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
              className="relative"
              onClick={e => e.stopPropagation()}
            >
              <button
                onClick={() => setLightbox(null)}
                className="absolute -top-4 -right-4 bg-white rounded-full p-2 shadow hover:bg-gray-100"
              >
                <X />
              </button>
              <img
                src={lightbox.src}
                alt={lightbox.alt}
                className="max-h-[80vh] rounded-xl shadow-lg"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Layout>
  );
}