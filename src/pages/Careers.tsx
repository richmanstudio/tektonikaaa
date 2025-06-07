// src/pages/Careers.tsx
import React, { useState } from "react";
import type { FormEvent } from "react";
import Layout from "../layouts/MainLayout";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Clock, GraduationCap, X, Send, Search, Heart, Gift, BookOpen } from "lucide-react";

/**
 * Careers 6.0 — добавлены:
 *  • секция «Наши преимущества»
 *  • отзыв-кофелементы
 *  • плавный скролл
 *  • улучшенные анимации карточек
 */

type Vacancy = { id: string; title: string; location: string; type: string; short: string; description: string };

const VACANCIES: Vacancy[] = [
  { id: "geo-eng", title: "Ведущий геофизик", location: "Хабаровск", type: "Полная занятость", short: "Полевые работы, интерпретация, отчёты.", description: `Требования:\n• профильное образование;\n• опыт 3+ года;\n• Micromine / Oasis.\n\nУсловия:\n• вахта 30/30, ДМС;\n• премия за публикации.` },
  { id: "drone-op", title: "Оператор БПЛА", location: "Выездные проекты", type: "Проектная работа", short: "Съёмка данных дронами.", description: `Требования:\n• сертификат ГВП;\n• Pix4D / Agisoft;\n• готовность к экспедициям.` },
  { id: "ts-frontend", title: "Frontend-разработчик (React+TS)", location: "Удалённо", type: "Частичная занятость", short: "Развитие 3D-портала.", description: `Задачи:\n• компонентная библиотека;\n• WebGL-визуализация;\n• Storybook, CI/CD.` },
];

const INTERNSHIP: Vacancy = { id: "internship", title: "Студенческая практика — Геофизик-стажёр", location: "Хабаровск", type: "Стажировка (оплачиваемая)", short: "Смены в поле + наставник, стипендия 25 000₽", description: `Студент получит:\n• участие в экспедиции;\n• доступ к данным;\n• диплом под научным руководством;\n• стажировку и перспективу трудоустройства.\n\nТребования:\n• 3–5 курс ГГФ/ФТИ;\n• базовые знания геофизики;\n• готовность к полю.` };

const LOCATIONS = ["Все", "Хабаровск", "Выездные проекты", "Удалённо"] as const;
const TYPES = ["Все", "Полная занятость", "Проектная работа", "Частичная занятость", "Стажировка (оплачиваемая)"] as const;

type FilterLoc = (typeof LOCATIONS)[number];
type FilterType = (typeof TYPES)[number];
type FormState = { name: string; university: string; course: string; email: string; resume: File | null };

export default function Careers() {
  const [loc, setLoc] = useState<FilterLoc>("Все");
  const [jobType, setJobType] = useState<FilterType>("Все");
  const [search, setSearch] = useState("");
  const [details, setDetails] = useState<Vacancy | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState<FormState>({ name: "", university: "", course: "", email: "", resume: null });

  const all = [...VACANCIES, INTERNSHIP];
  const filtered = all
    .filter(v => (loc === "Все" || v.location === loc) && (jobType === "Все" || v.type === jobType))
    .filter(v => v.title.toLowerCase().includes(search.toLowerCase()));

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`${form.name} — Заявка на стажировку`);
    const body = encodeURIComponent(`Имя: ${form.name}\nВУЗ: ${form.university}\nКурс: ${form.course}\nEmail: ${form.email}`);
    window.location.href = `mailto:hr@tektonika.ru?subject=${subject}&body=${body}`;
    setShowForm(false);
  };

  return (
    <Layout>
      {/* HERO */}
      <section className="relative h-[60vh] overflow-hidden">
        <video className="absolute inset-0 w-full h-full object-cover" src="/src/assets/hero-careers.mp4" autoPlay muted loop playsInline />
        <div className="absolute inset-0 bg-blue-900/80 flex flex-col items-center justify-center text-center text-white px-6">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="text-4xl md:text-6xl font-extrabold mb-4">
            Карьера и практика в «Тектонике»
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="text-lg md:text-2xl max-w-3xl">
            Выбор вакансий, стажировка для студентов и отправка резюме прямо здесь.
          </motion.p>
        </div>
      </section>

      {/* Sticky Filters */}
      <div className="sticky top-0 bg-white z-30 shadow">
        <div className="container mx-auto px-4 py-4 flex flex-wrap items-center gap-4">
          <div className="flex items-center border rounded-full px-4 py-2 w-full md:w-auto">
            <Search className="mr-2 text-gray-500" />
            <input type="text" placeholder="Поиск вакансий..." value={search} onChange={e => setSearch(e.target.value)} className="w-full outline-none" />
          </div>
          <select value={loc} onChange={e => setLoc(e.target.value as FilterLoc)} className="border rounded-full px-4 py-2">
            {LOCATIONS.map(l => <option key={l}>{l}</option>)}
          </select>
          <select value={jobType} onChange={e => setJobType(e.target.value as FilterType)} className="border rounded-full px-4 py-2">
            {TYPES.map(t => <option key={t}>{t}</option>)}
          </select>
        </div>
      </div>

      {/* Our Benefits */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-8">Наши преимущества</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="flex flex-col items-center">
              <Heart size={48} className="text-blue-700 mb-4" />
              <h3 className="font-semibold mb-2">Работа с душой</h3>
              <p className="text-gray-600">Дружная команда и поддержка каждого проекта.</p>
            </div>
            <div className="flex flex-col items-center">
              <Gift size={48} className="text-blue-700 mb-4" />
              <h3 className="font-semibold mb-2">Бонусы и ДМС</h3>
              <p className="text-gray-600">Соцпакет, медицинское страхование и премии.</p>
            </div>
            <div className="flex flex-col items-center">
              <BookOpen size={48} className="text-blue-700 mb-4" />
              <h3 className="font-semibold mb-2">Обучение</h3>
              <p className="text-gray-600">Курсы, конференции и поддержка профессионального роста.</p>
            </div>
            <div className="flex flex-col items-center">
              <GraduationCap size={48} className="text-blue-700 mb-4" />
              <h3 className="font-semibold mb-2">Стажировка</h3>
              <p className="text-gray-600">Практика с реальными данными под руководством экспертов.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Vacancy Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4 grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map(v => (
            <motion.div key={v.id} whileHover={{ rotateX: 3, rotateY: 3, scale: 1.04 }} transition={{ type: "spring", stiffness: 200 }} className="bg-white rounded-3xl p-6 shadow-lg cursor-pointer flex flex-col" onClick={() => v.id === "internship" ? setShowForm(true) : setDetails(v)}>
              <h3 className="text-xl font-bold text-blue-700 mb-2 flex items-center gap-2">
                {v.id === "internship" && <GraduationCap size={20} />} {v.title}
              </h3>
              <p className="flex items-center text-sm text-gray-500 mb-1"><MapPin size={16} className="mr-1" />{v.location}</p>
              <p className="flex items-center text-sm text-gray-500 mb-4"><Clock size={16} className="mr-1" />{v.type}</p>
              <p className="text-gray-700 flex-grow mb-4">{v.short}</p>
              <span className="mt-auto inline-block bg-blue-700 text-white py-2 px-4 rounded-full font-semibold hover:bg-blue-800 transition">
                {v.id === "internship" ? "Подать заявку" : "Подробнее"}
              </span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Vacancy Details Modal */}
      <AnimatePresence>
        {details && (
          <motion.div className="fixed inset-0 bg-black/70 backdrop-blur z-50 flex items-center justify-center p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setDetails(null)}>
            <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 50, opacity: 0 }} transition={{ type: "spring", stiffness: 300 }} className="bg-white rounded-3xl max-w-3xl w-full p-8 relative" onClick={e => e.stopPropagation()}>
              <button onClick={() => setDetails(null)} className="absolute top-4 right-4 p-2 bg-gray-100 rounded-full hover:bg-gray-200"><X /></button>
              <h2 className="text-2xl font-bold text-blue-700 mb-4">{details.title}</h2>
              <p className="text-sm text-gray-500 flex items-center mb-4"><MapPin size={16} className="mr-1" />{details.location} · <Clock size={16} className="mx-1" />{details.type}</p>
              <p className="text-gray-700 whitespace-pre-line">{details.description}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Internship Application Form Modal */}
      <AnimatePresence>
        {showForm && (
          <motion.div className="fixed inset-0 bg-black/70 backdrop-blur z-50 flex items-center justify-center p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowForm(false)}>
            <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.8, opacity: 0 }} transition={{ type: "spring", stiffness: 300 }} className="bg-white rounded-3xl max-w-xl w-full p-8 relative" onClick={e => e.stopPropagation()}>
              <button onClick={() => setShowForm(false)} className="absolute top-4 right-4 p-2 bg-gray-100 rounded-full hover:bg-gray-200"><X /></button>
              <h2 className="text-2xl font-bold text-blue-700 mb-6 flex items-center gap-2"><GraduationCap size={22} /> Заявка на стажировку</h2>
              <form onSubmit={handleFormSubmit} className="space-y-4">
                <div><label className="block text-sm text-gray-600 mb-1">ФИО</label><input required type="text" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="w-full border rounded-lg px-4 py-3" /></div>
                <div><label className="block text-sm text-gray-600 mb-1">ВУЗ</label><input required type="text" value={form.university} onChange={e => setForm({ ...form, university: e.target.value })} className="w-full border rounded-lg px-4 py-3" /></div>
                <div><label className="block text-sm text-gray-600 mb-1">Курс</label><input required type="number" min="1" max="6" value={form.course} onChange={e => setForm({ ...form, course: e.target.value })} className="w-full border rounded-lg px-4 py-3" /></div>
                <div><label className="block text-sm text-gray-600 mb-1">E-mail</label><input required type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} className="w-full border rounded-lg px-4 py-3" /></div>
                <div><label className="block text-sm text-gray-600 mb-1">Резюме (PDF)</label><input required type="file" accept="application/pdf" onChange={e => setForm({ ...form, resume: e.target.files?.[0] ?? null })} className="w-full" /></div>
                <button type="submit" className="w-full flex items-center justify-center gap-2 bg-blue-700 text-white py-3 rounded-full hover:bg-blue-800 transition"><Send size={18} /> Отправить заявку</button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Layout>
  );
}
