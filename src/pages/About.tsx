// src/pages/About.tsx
import React, { useEffect } from "react";
import Layout from "../layouts/MainLayout";
import { motion } from "framer-motion";
import heroImg from "../assets/abouthero-bg.jpg";
import logo from "../assets/logo.png";
import { GraduationCap, MapPin, Phone, Clock, Heart, BookOpen, Gift } from "lucide-react";

const stats = [
  { id: 1, label: "Год основания", value: "2023" },
  { id: 2, label: "Уставный капитал", value: "16 000 ₽" },
  { id: 3, label: "Основной ОКВЭД", value: "71.12.3" },
  { id: 4, label: "Видов деятельности", value: "23" },
];

const timeline = [
  { year: "2023", title: "Основание компании", desc: "Регистрация ООО «Тектоника» в Хабаровске." },
  { year: "2024", title: "Первый успешный проект", desc: "Завершили полевые геофизические исследования для крупного заказчика." },
  { year: "2025", title: "Открытие своего портала", desc: "Открыли свой корпоративный сайт для быстрого доступа ко всему необходимому и устройству к нам" },
];

export default function About() {
  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const fadeIn = { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.6 } };

  return (
    <Layout>
      {/* Breadcrumbs */}
      <nav className="bg-gray-50 px-6 py-3 rounded-md text-sm mb-8">
        <ol className="list-reset flex text-gray-600">
          <li><a href="/" className="hover:text-blue-600">Главная</a></li>
          <li><span className="mx-2">/</span></li>
          <li className="text-gray-800 font-semibold">О нас</li>
        </ol>
      </nav>

      {/* Hero */}
      <section className="relative bg-white overflow-hidden rounded-lg shadow-md mb-16">
        <img src={heroImg} alt="Полевые работы Тектроники" className="w-full h-96 object-cover" />
        <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-center text-center p-4">
          <img src={logo} alt="Логотип Тектроника" className="w-24 h-24 mb-4" />
          <motion.h1 {...fadeIn} className="text-4xl md:text-5xl font-bold text-white mb-2">
            О компании ООО «Тектоника»
          </motion.h1>
          <motion.p {...{ ...fadeIn, transition: { delay: 0.2 } }} className="text-lg md:text-xl text-gray-200 max-w-2xl">
            Мы — ведущий эксперт в области геофизических исследований и инженерных изысканий на Дальнем Востоке. 
            Наши технологии раскрывают недра планеты, гарантируя безопасность и точность.
          </motion.p>
        </div>
      </section>

      {/* Stats */}
      <section className="container mx-auto px-4 py-12 grid grid-cols-2 sm:grid-cols-4 gap-8 text-center">
        {stats.map((s, i) => (
          <motion.div key={s.id} {...{ ...fadeIn, transition: { delay: i * 0.2 } }} className="bg-white p-6 rounded-lg shadow">
            <div className="text-3xl font-bold text-blue-600">{s.value}</div>
            <div className="mt-2 text-gray-600">{s.label}</div>
          </motion.div>
        ))}
      </section>

      {/* Timeline */}
      <section className="bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-8">Наши вехи развития</h2>
          <div className="relative border-l-2 border-blue-200 pl-8">
            {timeline.map((item, idx) => (
              <motion.div key={idx} {...{ ...fadeIn, transition: { delay: idx * 0.3 } }} className="mb-8">
                <div className="absolute -left-4 top-0 bg-blue-600 w-8 h-8 rounded-full flex items-center justify-center text-white">
                  <Clock size={20} />
                </div>
                <span className="inline-block bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm mb-2">
                  {item.year}
                </span>
                <h3 className="text-xl font-semibold">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="container mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold text-center mb-8">Наши ценности</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <motion.div {...{ ...fadeIn, transition: { delay: 0.1 } }} className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow">
            <Heart className="w-12 h-12 text-blue-600 mb-4" />
            <h3 className="font-semibold mb-2">Работа с душой</h3>
            <p className="text-gray-600">Дружная команда и поддержка каждого проекта.</p>
          </motion.div>
          <motion.div {...{ ...fadeIn, transition: { delay: 0.2 } }} className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow">
            <Gift className="w-12 h-12 text-blue-600 mb-4" />
            <h3 className="font-semibold mb-2">Бонусы и ДМС</h3>
            <p className="text-gray-600">Соцпакет, медицинское страхование и премии.</p>
          </motion.div>
          <motion.div {...{ ...fadeIn, transition: { delay: 0.3 } }} className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow">
            <BookOpen className="w-12 h-12 text-blue-600 mb-4" />
            <h3 className="font-semibold mb-2">Обучение</h3>
            <p className="text-gray-600">Курсы, конференции и поддержка профессионального роста.</p>
          </motion.div>
          <motion.div {...{ ...fadeIn, transition: { delay: 0.4 } }} className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow">
            <GraduationCap className="w-12 h-12 text-blue-600 mb-4" />
            <h3 className="font-semibold mb-2">Стажировка</h3>
            <p className="text-gray-600">Практика с реальными данными под руководством экспертов.</p>
          </motion.div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-gradient-to-r from-purple-700 to-pink-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Хотите узнать больше о нас?</h2>
          <p className="mb-6">Заполните простую форму, и мы свяжемся с вами для подробной презентации возможностей компании.</p>
          <a
            href="#contacts"
            className="inline-block bg-white text-purple-700 font-semibold py-3 px-8 rounded-full hover:bg-gray-100 transition"
          >
            Связаться с нами
          </a>
        </div>
      </section>
    </Layout>
  );
}
