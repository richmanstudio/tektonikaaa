// src/pages/Research.tsx
import React, { useState } from "react";
import Layout from "../layouts/MainLayout";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, FileText, Award, X } from "lucide-react";
import { Link } from "react-router-dom";

/**
 * Research page — blue theme to match "Медиа".
 */

const PATENTS = [
  {
    id: "pat-1",
    title: "Патент №1234567: способ высокоточного картирования",
    date: "15.10.2024",
    desc: "Методика комплексной обработки данных сейсмо‑ и электроразведки.",
    file: "/docs/patent-1.pdf",
  },
  {
    id: "pat-2",
    title: "Патент №7654321: система IP‑томографии",
    date: "07.01.2025",
    desc: "Инверсия с обратной связью по блок‑модели.",
    file: "/docs/patent-2.pdf",
  },
];

const ARTICLES = [
  {
    id: "art-1",
    title: "Новые подходы к IP‑томографии",
    date: "20.08.2024",
    journal: "Geophysics Today",
    file: "/docs/article-ip.pdf",
  },
  {
    id: "art-2",
    title: "3‑D моделирование коренных руд",
    date: "11.11.2024",
    journal: "Mining Magazine",
    file: "/docs/article-rud.pdf",
  },
];

const REPORTS = [
  {
    id: "rep-1",
    title: "Отчёт по сейсморазведке 2023",
    date: "30.06.2023",
    desc: "Комплексный отчёт по полевым работам в Хабаровском крае.",
    file: "/docs/report-seis.pdf",
  },
  {
    id: "rep-2",
    title: "Отчёт по гравиметрическим исследованиям",
    date: "15.12.2023",
    desc: "Результаты мониторинга гравполя.",
    file: "/docs/report-grav.pdf",
  },
];

const TABS = [
  { key: "patents", label: "Патенты", icon: <Award size={18} /> },
  { key: "articles", label: "Статьи", icon: <BookOpen size={18} /> },
  { key: "reports", label: "Отчёты", icon: <FileText size={18} /> },
] as const;

type TabKey = (typeof TABS)[number]["key"];
interface Doc { id:string; title:string; date:string; file:string; desc?:string; journal?:string; }

export default function Research() {
  const [active,setActive]=useState<TabKey>("patents");
  const [viewer,setViewer]=useState<Doc|null>(null);
  const datasets:Record<TabKey,Doc[]>={patents:PATENTS,articles:ARTICLES,reports:REPORTS};

  return (
    <Layout>
      {/* HERO – blue gradient */}
      <section className="relative py-24 text-center bg-gradient-to-br from-blue-900 to-blue-600 text-white overflow-hidden">
        <motion.h1 initial={{opacity:0,y:40}} animate={{opacity:1,y:0}} transition={{duration:0.6}} className="text-5xl md:text-6xl font-extrabold mb-4">Научная деятельность</motion.h1>
        <motion.p initial={{opacity:0,y:40}} animate={{opacity:1,y:0}} transition={{duration:0.8}} className="text-lg md:text-2xl max-w-2xl mx-auto">Патенты, статьи и отчёты специалистов «Тектоники»</motion.p>
        <div className="absolute -top-20 -left-24 w-72 h-72 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-16 -right-32 w-80 h-80 bg-white/10 rounded-full blur-2xl" />
      </section>

      {/* TABS */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {TABS.map(t=> (
              <button key={t.key} onClick={()=>setActive(t.key)} className={`flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition ${active===t.key?"bg-blue-700 text-white shadow-lg":"bg-white text-blue-700 shadow hover:bg-white/90"}`}>{t.icon}{t.label}</button>
            ))}
          </div>

          <AnimatePresence mode="wait" initial={false}>
            <motion.div key={active} initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-20}} transition={{duration:0.3}} className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {datasets[active].map(doc=>(
                <article key={doc.id} onClick={()=>setViewer(doc)} className="bg-white rounded-2xl p-6 shadow hover:shadow-lg transition flex flex-col cursor-pointer">
                  <h3 className="text-lg font-semibold text-blue-700 mb-1">{doc.title}</h3>
                  <p className="text-sm text-gray-500 mb-2">{doc.date}{doc.journal&&` · ${doc.journal}`}</p>
                  <p className="text-gray-700 flex-grow line-clamp-3">{doc.desc||"Аннотация будет добавлена"}</p>
                  <span className="mt-4 text-blue-700 font-semibold hover:underline">Открыть →</span>
                </article>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* PDF Lightbox */}
      <AnimatePresence>
        {viewer && (
          <motion.div className="fixed inset-0 bg-black/80 backdrop-blur z-50 flex items-center justify-center p-4" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onClick={()=>setViewer(null)}>
            <motion.div initial={{scale:0.8}} animate={{scale:1}} exit={{scale:0.8}} transition={{type:"spring",stiffness:400,damping:30}} className="relative w-full max-w-4xl h-[80vh] bg-white rounded-xl overflow-hidden" onClick={e=>e.stopPropagation()}>
              <button onClick={()=>setViewer(null)} className="absolute top-4 right-4 bg-white rounded-full p-2 shadow hover:bg-gray-100"><X/></button>
              <iframe src={viewer.file} title={viewer.title} className="w-full h-full" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CTA */}
      <section className="py-24 bg-gradient-to-r from-blue-700 to-blue-500 text-white text-center">
        <div className="container mx-auto px-4 max-w-2xl">
          <h2 className="text-3xl font-bold mb-6">Есть предложение для сотрудничества?</h2>
          <p className="mb-8 text-lg">Мы открыты к совместным исследованиям и публикациям.</p>
          <Link to="#contacts" className="inline-block bg-white text-blue-700 font-semibold py-4 px-10 rounded-full shadow-lg hover:bg-gray-100 transition">Связаться с нами</Link>
        </div>
      </section>
    </Layout>
  );
}
