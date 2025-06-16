// src/pages/Home.tsx
import React from "react";
import { Link } from "react-router-dom";
import Layout from "../layouts/MainLayout";
import { motion } from "framer-motion";
import CountUp from "react-countup";

/**
 * Главная 3.0 — видео-фон, glass-карточки услуг, анимации CountUp,
 * testimonial и зрелый дизайн.
 */

const SERVICES = [
  { icon: "🛰️", title: "Геофизика", desc: "Сейсмо-, магнито- и электроразведка" },
  { icon: "⛏️", title: "Геология", desc: "Полевые партии, QA/QC-контроль" },
  { icon: "📊", title: "3-D модели", desc: "Единая геолого-геофизическая модель" },
  { icon: "🚁", title: "Дроны / БПЛА", desc: "Высотная аэрофотосъёмка" },
  { icon: "📐", title: "Топография", desc: "Лазерное сканирование рельефа" },
  { icon: "📑", title: "Отчётность", desc: "GKZ, JORC, PERC, аудит" },
];

const STATS = [
  { label: "проектов", value: 220 },
  { label: "клиентов", value: 130 },
  { label: "лет опыта", value: 3 },
];

export default function Home() {
  return (
    <Layout>
      {/* HERO: video background */}
      <section className="relative h-screen overflow-hidden text-white">
        <video
          className="absolute inset-0 w-full h-full object-cover"
          src="/src/assets/hero-video.mp4" // добавьте файл
          autoPlay
          muted
          loop
          playsInline
        />
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/70 via-blue-800/60 to-blue-700/50" />
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4"
        >
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight drop-shadow-lg">
            Открываем недра <span className="text-yellow-300">цифровыми</span> методами
          </h1>
          <p className="text-lg md:text-2xl max-w-3xl mb-10 font-light drop-shadow">
            От первого измерения на площадке до зрелищной 3-D модели в браузере — полный цикл геофизики.
            <p>Под эгидой "Института тектоники и геофизики имени Ю. А. Косыгина ДВО РАН"</p>
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/services"
              className="bg-yellow-300 text-blue-900 font-semibold py-3 px-10 rounded-full hover:bg-yellow-200 transition shadow-lg"
            >
              Наши услуги
            </Link>
            <Link
              to="/about"
              className="bg-white/10 backdrop-blur border border-white/30 text-white font-semibold py-3 px-10 rounded-full hover:bg-white/20 transition"
            >
              О компании
            </Link>
          </div>
        </motion.div>
      </section>

      {/* STATS */}
      <section className="py-24 bg-blue-50">
        <div className="container mx-auto px-4 grid md:grid-cols-3 gap-12 text-center">
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <span className="text-6xl font-extrabold text-blue-700">
                <CountUp end={s.value} duration={2} />+
              </span>
              <p className="mt-4 text-xl uppercase tracking-wide text-blue-900/90">
                {s.label}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* SERVICES: glass cards */}
      <section className="py-24 bg-white relative">
        <svg className="absolute top-0 left-0 w-full -z-10" viewBox="0 0 1440 90" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0 90L1440 0V90H0Z" fill="#F8FAFC"/></svg>
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16">
            Наши <span className="text-blue-700">компетенции</span>
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {SERVICES.map((s, i) => (
              <motion.div
                key={s.title}
                className="group relative p-8 rounded-3xl bg-white/30 backdrop-blur shadow-xl flex flex-col items-center text-center border border-white/50 hover:scale-105 transition"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <span className="text-5xl mb-4 drop-shadow-md">{s.icon}</span>
                <h3 className="text-2xl font-semibold mb-2">{s.title}</h3>
                <p className="text-gray-700 leading-relaxed min-h-[60px]">
                  {s.desc || <em className="text-gray-400">Скоро на сайте</em>}
                </p>
                <span className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-0 h-1 rounded-full bg-blue-700 group-hover:w-20 transition-all" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIAL */}
      <section className="py-24 bg-gradient-to-br from-blue-700 to-blue-800 text-white text-center">
        <div className="container mx-auto px-4 max-w-3xl">
          <motion.blockquote
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-xl md:text-2xl font-light leading-relaxed"
          >
            «Партнёрство с Тектоникой позволило нам сократить сроки
            разведки участка в два раза и на 30% уменьшить буровой метраж»
            <footer className="mt-6 text-lg font-semibold">— АО «Полиметалл»</footer>
          </motion.blockquote>
        </div>
      </section>

      {/* CONTACTS */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
          <iframe
            src="https://yandex.ru/map-widget/v1/?ll=135.077783%2C48.488285&z=17&pt=135.077783,48.488285,pm2rdl"
            width="100%"
            height="320"
            frameBorder={0}
            allowFullScreen
            title="Офис Тектоники"
            className="rounded-xl shadow-xl"
          />
          <div>
            <h2 className="text-3xl font-bold mb-6">Контакты</h2>
            <p className="mb-3"><strong>Адрес:</strong> г. Хабаровск, ул. Ким Ю Чена, 65, офис. 326</p>
            <p className="mb-3"><strong>Телефон:</strong> <a href="tel:+79842626115" className="text-blue-700 hover:underline">+7 984 262-61-15</a></p>
            <p className="mb-8"><strong>E-mail:</strong> <a href="mailto:tektonikayur16@gmail.com" className="text-blue-700 hover:underline">tektonikayur16@gmail.com</a></p>
            <Link to="/contacts" className="bg-blue-700 hover:bg-blue-800 text-white py-3 px-10 rounded-full font-semibold shadow-lg transition">Полные контакты</Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}