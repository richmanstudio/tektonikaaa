// src/pages/About.tsx
import React from "react";
import Layout from "../layouts/MainLayout";
import { motion } from "framer-motion";

/**
 * Данные из открытых источников (ЕГРЮЛ / СПАРК):
 *  • ИНН 2700023021, ОГРН 1232700019860
 *  • Дата регистрации: 18.12.2023
 *  • Адрес: 680000, Хабаровский край, г. Хабаровск, ул. Ким Ю Чена, 65, помещ. 11
 *  • Уставный капитал: 16 000 ₽
 *  • Руководитель / учредитель: Юрчук Антон Юрьевич
 *  • Основной ОКВЭД 71.12.3 — геофизические работы при изучении недр
 */

const DESCRIPTION =
  "ООО «Тектоника» — молодая геофизическая компания из Хабаровска. Мы выполняем геолого-разведочные, геофизические и геохимические работы, обеспечивая заказчиков достоверными данными о недрах.";

const FACTS = [
  { label: "Год основания", value: "2023" },
  { label: "Уставный капитал", value: "16 000 ₽" },
  { label: "Основной ОКВЭД", value: "71.12.3" },
  { label: "Видов деятельности", value: "23" },
] as const;

const MILESTONES = [
  {
    year: 2023,
    text: "Регистрация компании в ЕГРЮЛ и получение первого геофизического контракта",
  },
];

export default function About() {
  return (
    <Layout>
      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-r from-blue-800 to-blue-600 py-24 text-white">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-extrabold mb-6"
          >
            ООО «Тектоника»
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-lg md:text-xl leading-relaxed"
          >
            {DESCRIPTION}
          </motion.p>
        </div>
        {/* декоративные круги */}
        <div className="absolute -top-10 -left-24 w-80 h-80 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-16 -right-24 w-60 h-60 bg-white/10 rounded-full blur-2xl" />
      </section>

      {/* ФАКТЫ */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 grid sm:grid-cols-2 lg:grid-cols-4 gap-12 text-center">
          {FACTS.map((f, i) => (
            <motion.div
              key={f.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <span className="text-3xl font-extrabold text-blue-700">{f.value}</span>
              <p className="mt-2 text-gray-600 uppercase tracking-wide text-sm">{f.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* КОМПЕТЕНЦИИ */}
      <section className="py-20">
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-10 items-center">
          <motion.img
            src="/src/assets/photos/season-2024/IMG_6114.jpg"
            alt="Полевые работы Тектоники"
            className="rounded-3xl shadow-2xl"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          />
          <div>
            <h2 className="text-3xl font-bold mb-6">Чем мы занимаемся</h2>
            <ul className="space-y-3 text-gray-700 list-disc list-inside">
              <li>Полевые геофизические работы (сейсмо-, магнито- и электроразведка)</li>
              <li>Геохимические исследования</li>
              <li>3-D интерпретация и моделирование</li>
              <li>Отчётность по российским и международным стандартам</li>
            </ul>
          </div>
        </div>
      </section>

      {/* ВЕХИ */}
      <section className="py-20 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Вехи развития</h2>
          <div className="relative border-l border-blue-600/30 pl-8 max-w-2xl mx-auto">
            {MILESTONES.map((ms, i) => (
              <motion.div
                key={ms.year}
                className="mb-10 relative"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <span className="absolute -left-4 top-1.5 w-3 h-3 bg-blue-600 rounded-full" />
                <h3 className="text-xl font-semibold text-blue-700">{ms.year}</h3>
                <p className="mt-1 text-gray-600">{ms.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-blue-700 to-purple-600 text-white text-center">
        <div className="container mx-auto px-4 max-w-2xl">
          <h2 className="text-3xl font-bold mb-6">Свяжитесь с нами</h2>
          <p className="mb-8 text-lg">
            Готовы обсудить геофизическую задачу любой сложности — мы ответим
            в ближайший рабочий день.
          </p>
          <a
            href="/contacts"
            className="inline-block bg-white text-blue-700 font-semibold py-4 px-10 rounded-full shadow-lg hover:bg-gray-100 transition"
          >
            Контакты
          </a>
        </div>
      </section>
    </Layout>
  );
}