// src/pages/Services.tsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Layout from "../layouts/MainLayout";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

/**
 * «Услуги 3.0» — градиентный hero-блок, интерактивные
 * табы категорий, «glass»-аккордеоны услуг и CTA-секция.
 */

// Категории и услуги
const CATEGORIES = [
  {
    slug: "geophysics",
    title: "Геофизика",
    services: [
      {
        name: "Сейсморазведка 2D / 3D / 4D",
        desc: "Полный комплекс полевых работ и интерпретация. Оптимизация бурения и оценка структур.",
      },
      {
        name: "Магниторазведка",
        desc: "Низкоточная и высокоточная съёмка с наземных и воздушных платформ.",
      },
      {
        name: "Электроразведка (ВЭЗ, IP)",
        desc: "Зондирование до 1,5 км со сверхнизким уровнем шума.",
      },
    ],
  },
  {
    slug: "geology",
    title: "Геология",
    services: [
      {
        name: "Картирование и опробование",
        desc: "Определение литотипа, коры выветривания и QA/QC-контроль.",
      },
      {
        name: "Керновой отбор",
        desc: "Удалённый ВОМ-зонд для непрерывного каротажа и описания керна.",
      },
    ],
  },
  {
    slug: "modelling",
    title: "3-D модели и отчёты",
    services: [
      {
        name: "Интеграция данных",
        desc: "Сводная модель Micromine — Leapfrog с веб-доступом.",
      },
      {
        name: "Отчёты GKZ / JORC / PERC",
        desc: "Полная документация, готовая к защите в госкомиссиях и банках.",
      },
    ],
  },
] as const;

export default function Services() {
  const [active, setActive] = useState<string>(CATEGORIES[0].slug);

  return (
    <Layout>
      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-900 to-blue-600 py-24 text-white text-center">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl md:text-6xl font-extrabold mb-6"
        >
          Услуги ООО «Тектоника»
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-lg md:text-2xl max-w-xl mx-auto"
        >
          От полевых измерений до 3-D интерпретации — полный геофизический цикл
        </motion.p>

        {/* декоративные круги */}
        <div className="absolute -top-16 -left-32 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-16 -right-24 w-72 h-72 bg-white/10 rounded-full blur-2xl" />
      </section>

      {/* CATEGORY TABS */}
      <section className="py-16 bg-blue-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {CATEGORIES.map(cat => (
              <button
                key={cat.slug}
                onClick={() => setActive(cat.slug)}
                className={`px-6 py-3 rounded-full font-semibold transition ${
                  active === cat.slug
                    ? "bg-blue-700 text-white shadow-lg"
                    : "bg-white text-blue-700 shadow hover:bg-white/90"
                }`}
              >
                {cat.title}
              </button>
            ))}
          </div>

          {/* SERVICES LIST */}
          <AnimatePresence mode="wait" initial={false}>
            {CATEGORIES.filter(c => c.slug === active).map(cat => (
              <motion.div
                key={cat.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="max-w-4xl mx-auto space-y-6"
              >
                {cat.services.map(srv => (
                  <details
                    key={srv.name}
                    className="group bg-white/70 backdrop-blur p-6 rounded-2xl shadow relative open:shadow-lg"
                  >
                    <summary className="flex items-center justify-between cursor-pointer list-none">
                      <span className="text-xl font-semibold text-blue-900">
                        {srv.name}
                      </span>
                      <ChevronDown className="text-blue-700 group-open:rotate-180 transition" />
                    </summary>
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: "auto" }}
                      className="overflow-hidden"
                    >
                      <p className="mt-4 text-gray-700 leading-relaxed">
                        {srv.desc}
                      </p>
                    </motion.div>
                  </details>
                ))}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-gradient-to-r from-blue-700 to-purple-600 text-white text-center">
        <div className="container mx-auto px-4 max-w-2xl">
          <h2 className="text-3xl font-bold mb-6">Нужна консультация?</h2>
          <p className="mb-8 text-lg">
            Отправьте заявку, и мы подготовим техническое предложение в течение
            24 часов.
          </p>
          <Link
            to="/contacts"
            className="inline-block bg-white text-blue-700 font-semibold py-4 px-10 rounded-full shadow-lg hover:bg-gray-100 transition"
          >
            Связаться с нами
          </Link>
        </div>
      </section>
    </Layout>
  );
}
