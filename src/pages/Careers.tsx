// src/pages/Careers.tsx
import React, { useState, useRef, type ChangeEvent, type FormEvent } from "react";
import emailjs from "@emailjs/browser";
import Layout from "../layouts/MainLayout";
import { motion, AnimatePresence } from "framer-motion";
import {
  Heart,
  Gift,
  BookOpen,
  GraduationCap,
  Phone,
  Mail,
  MapPin,
  X
} from "lucide-react";

interface Vacancy {
  id: string;
  title: string;
  location: string;
  type: string;
  short: string;
  description: string;
}

const VACANCIES: Vacancy[] = [
  {
    id: "lead-geo",
    title: "Ведущий геофизик",
    location: "Хабаровск",
    type: "Полная занятость",
    short: "Полевые работы, интерпретация, отчёты.",
    description: `Мы ищем опытного геофизика для проведения полевых исследований,
составления отчётов и интерпретации данных. Требуется профильное
образование и опыт работы от 3 лет.`
  },
  {
    id: "drone-op",
    title: "Оператор БПЛА",
    location: "Выездные проекты",
    type: "Проектная работа",
    short: "Съёмка данных дронами.",
    description: `В задачи входит управление беспилотниками для аэросъёмки,
обработка полученных изображений и передача данных в аналитический отдел.`
  },
  {
    id: "frontend-dev",
    title: "Frontend-разработчик (React+TS)",
    location: "Удалённо",
    type: "Частичная занятость",
    short: "Развитие 3D-портала.",
    description: `Разработка клиентской части интерактивного 3D-портала
с применением React, TypeScript и WebGL. Опыт работы с 3D-библиотеками — плюс.`
  },
  {
    id: "internship",
    title: "Студенческая практика — Геофизик-стажёр",
    location: "Хабаровск",
    type: "Стажировка (оплачиваемая)",
    short: "Смены в поле + наставник, стипендия 25 000 ₽",
    description: `Участие в настоящих полевых экспедициях под руководством
опытного геофизика, обработка и интерпретация данных, оформление отчётов.`
  }
];

type FormData = {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  university: string;
  faculty: string;
  course: string;
  gradYear: string;
  objective: string;
  experience: string;
  skills: string;
  languages: string;
  additional: string;
};

export default function Careers() {
  const TOTAL_STEPS = 5;
  const formRef = useRef<HTMLFormElement>(null);

  // для модалки описания вакансии
  const [details, setDetails] = useState<Vacancy | null>(null);
  // для модалки формы стажировки
  const [showForm, setShowForm] = useState(false);

  // фильтры и поиск
  const [search, setSearch] = useState("");
  const [locFilter, setLocFilter] = useState("Все");
  const [typeFilter, setTypeFilter] = useState("Все");

  // шаги многостраничной формы
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    university: "",
    faculty: "",
    course: "",
    gradYear: "",
    objective: "",
    experience: "",
    skills: "",
    languages: "",
    additional: ""
  });
  const [submitted, setSubmitted] = useState(false);

  const isIntern = (v: Vacancy) => v.id === "internship";

  // открытие модалки формы: сброс состояния и поднятие флага
  const openForm = () => {
    setShowForm(true);
    setCurrentStep(1);
    setSubmitted(false);
    setDetails(null);
  };
  const closeForm = () => setShowForm(false);

  // отфильтрованный список вакансий
  const filtered = VACANCIES.filter(v =>
    (locFilter === "Все" || v.location === locFilter) &&
    (typeFilter === "Все" || v.type === typeFilter) &&
    v.title.toLowerCase().includes(search.trim().toLowerCase())
  );

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const nextStep = () => setCurrentStep(s => Math.min(s + 1, TOTAL_STEPS));
  const prevStep = () => setCurrentStep(s => Math.max(s - 1, 1));

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const params = {
      vacancy: VACANCIES.find(isIntern)?.title,
      ...formData
    };
    emailjs
      .send("service_labg6pe", "template_tusbpp5", params, "m4DT1MN15nyCSdWzE")
      .then(() => setSubmitted(true))
      .catch(err => console.error("EmailJS Error:", err));
  };

  // анимация шагов
  const variants = {
    initial: { opacity: 0, y: 20 },
    in: { opacity: 1, y: 0 },
    out: { opacity: 0, y: -20 }
  };
  const transition = { type: "tween", ease: "easeInOut", duration: 0.4 };

  return (
    <Layout>
      {/* Hero */}
      <section className="bg-blue-700 text-white text-center py-24">
        <h1 className="text-4xl font-bold mb-2">
          Карьера и практика в «Тектонике»
        </h1>
        <p className="text-lg">
          Выбор вакансий, стажировка для студентов и отправка резюме прямо здесь.
        </p>
      </section>

      {/* Фильтры */}
      <section className="container mx-auto px-4 py-8 flex flex-col md:flex-row gap-4">
        <input
          type="text"
          placeholder="Поиск вакансий..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="flex-1 border rounded-full px-4 py-2"
        />
        <select
          value={locFilter}
          onChange={e => setLocFilter(e.target.value)}
          className="border rounded-full px-4 py-2"
        >
          {["Все", ...new Set(VACANCIES.map(v => v.location))].map(loc => (
            <option key={loc}>{loc}</option>
          ))}
        </select>
        <select
          value={typeFilter}
          onChange={e => setTypeFilter(e.target.value)}
          className="border rounded-full px-4 py-2"
        >
          {["Все", ...new Set(VACANCIES.map(v => v.type))].map(t => (
            <option key={t}>{t}</option>
          ))}
        </select>
      </section>

      {/* Преимущества */}
      <section className="container mx-auto px-4 py-12 text-center">
        <h2 className="text-2xl font-bold mb-8">Наши преимущества</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="flex flex-col items-center">
            <Heart className="w-10 h-10 text-blue-600 mb-2" />
            <h3 className="font-semibold">Работа с душой</h3>
            <p className="text-gray-600 text-sm">
              Дружная команда и поддержка каждого проекта.
            </p>
          </div>
          <div className="flex flex-col items-center">
            <Gift className="w-10 h-10 text-blue-600 mb-2" />
            <h3 className="font-semibold">Бонусы и ДМС</h3>
            <p className="text-gray-600 text-sm">
              Соцпакет, медицинское страхование и премии.
            </p>
          </div>
          <div className="flex flex-col items-center">
            <BookOpen className="w-10 h-10 text-blue-600 mb-2" />
            <h3 className="font-semibold">Обучение</h3>
            <p className="text-gray-600 text-sm">
              Курсы, конференции и поддержка профессионального роста.
            </p>
          </div>
          <div className="flex flex-col items-center">
            <GraduationCap className="w-10 h-10 text-blue-600 mb-2" />
            <h3 className="font-semibold">Стажировка</h3>
            <p className="text-gray-600 text-sm">
              Практика с реальными данными под руководством экспертов.
            </p>
          </div>
        </div>
      </section>

      {/* Список вакансий */}
      <section className="container mx-auto px-4 py-12">
        <div className="grid gap-8 lg:grid-cols-3">
          {filtered.map(v => (
            <motion.div
              key={v.id}
              className="bg-white rounded-2xl shadow p-6 flex flex-col"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <h3 className="text-xl font-bold text-blue-700 mb-2 flex items-center gap-2">
                {isIntern(v) && <GraduationCap size={20} />}
                {v.title}
              </h3>
              <p className="text-gray-500 text-sm mb-4 flex items-center gap-2">
                <MapPin size={16} /> {v.location}
                <span className="mx-2">·</span>
                <Phone size={16} /> {v.type}
              </p>
              <p className="text-gray-700 flex-grow">{v.short}</p>
              <button
                onClick={() => (isIntern(v) ? openForm() : setDetails(v))}
                className="mt-6 bg-blue-600 text-white rounded-full py-2 font-semibold hover:bg-blue-700 transition"
              >
                {isIntern(v) ? "Подать заявку" : "Подробнее"}
              </button>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Модальные окна */}
      <AnimatePresence>
        {/* Описание вакансии */}
        {details && (
          <motion.div
            className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setDetails(null)}
          >
            <motion.div
              className="bg-white rounded-xl max-w-2xl w-full p-8 relative"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300 }}
              onClick={e => e.stopPropagation()}
            >
              <button
                onClick={() => setDetails(null)}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              >
                <X size={20} />
              </button>
              <h2 className="text-2xl font-bold mb-4">{details.title}</h2>
              <p className="text-gray-700 whitespace-pre-line">
                {details.description}
              </p>
            </motion.div>
          </motion.div>
        )}

        {/* Форма стажировки */}
        {showForm && (
          <motion.div
            className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeForm}
          >
            <motion.div
              className="bg-white rounded-2xl max-w-xl w-full p-6 relative"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300 }}
              onClick={e => e.stopPropagation()}
            >
              <button
                onClick={closeForm}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              >
                <X size={24} />
              </button>
              <h2 className="text-2xl font-bold text-blue-700 mb-2 flex items-center gap-2">
                <GraduationCap size={24} /> Заявка на стажировку
              </h2>
              <p className="text-gray-600 mb-4">
                {VACANCIES.find(isIntern)?.short}
              </p>

              {/* Прогресс-бар */}
              <div className="mb-6">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full"
                    style={{
                      width: `${(currentStep / TOTAL_STEPS) * 100}%`
                    }}
                  />
                </div>
                <p className="text-sm text-gray-600 mt-1">
                  Шаг {currentStep} из {TOTAL_STEPS}
                </p>
              </div>

              {submitted ? (
                <div className="text-center py-8">
                  <h3 className="text-xl font-bold mb-2">
                    Спасибо за вашу заявку!
                  </h3>
                  <p className="text-gray-600">
                    Мы свяжемся с вами в ближайшее время.
                  </p>
                </div>
              ) : (
                <form
                  ref={formRef}
                  onSubmit={handleSubmit}
                  className="space-y-4"
                >
                  <AnimatePresence mode="wait">
                    {currentStep === 1 && (
                      <motion.div
                        key="step1"
                        initial="initial"
                        animate="in"
                        exit="out"
                        variants={variants}
                        transition={transition}
                        className="space-y-4"
                      >
                        <label className="block">
                          <span className="text-sm font-semibold">
                            Полное имя
                          </span>
                          <input
                            type="text"
                            name="fullName"
                            required
                            value={formData.fullName}
                            onChange={handleChange}
                            className="w-full border rounded px-3 py-2"
                          />
                        </label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <label className="block relative">
                            <span className="text-sm font-semibold">
                              E-mail
                            </span>
                            <Mail className="absolute left-3 top-8 text-gray-400" size={16} />
                            <input
                              type="email"
                              name="email"
                              required
                              value={formData.email}
                              onChange={handleChange}
                              className="w-full border rounded pl-10 pr-3 py-2"
                            />
                          </label>
                          <label className="block relative">
                            <span className="text-sm font-semibold">
                              Телефон
                            </span>
                            <Phone className="absolute left-3 top-8 text-gray-400" size={16} />
                            <input
                              type="tel"
                              name="phone"
                              required
                              value={formData.phone}
                              onChange={handleChange}
                              className="w-full border rounded pl-10 pr-3 py-2"
                            />
                          </label>
                        </div>
                      </motion.div>
                    )}

                    {currentStep === 2 && (
                      <motion.div
                        key="step2"
                        initial="initial"
                        animate="in"
                        exit="out"
                        variants={variants}
                        transition={transition}
                        className="space-y-4"
                      >
                        <label className="block">
                          <span className="text-sm font-semibold">
                            Адрес проживания
                          </span>
                          <input
                            type="text"
                            name="address"
                            required
                            value={formData.address}
                            onChange={handleChange}
                            className="w-full border rounded px-3 py-2"
                          />
                        </label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <label className="block">
                            <span className="text-sm font-semibold">
                              ВУЗ
                            </span>
                            <input
                              type="text"
                              name="university"
                              required
                              value={formData.university}
                              onChange={handleChange}
                              className="w-full border rounded px-3 py-2"
                            />
                          </label>
                          <label className="block">
                            <span className="text-sm font-semibold">
                              Факультет
                            </span>
                            <input
                              type="text"
                              name="faculty"
                              required
                              value={formData.faculty}
                              onChange={handleChange}
                              className="w-full border rounded px-3 py-2"
                            />
                          </label>
                        </div>
                      </motion.div>
                    )}

                    {currentStep === 3 && (
                      <motion.div
                        key="step3"
                        initial="initial"
                        animate="in"
                        exit="out"
                        variants={variants}
                        transition={transition}
                        className="space-y-4"
                      >
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <label className="block">
                            <span className="text-sm font-semibold">
                              Курс
                            </span>
                            <input
                              type="text"
                              name="course"
                              required
                              value={formData.course}
                              onChange={handleChange}
                              className="w-full border rounded px-3 py-2"
                            />
                          </label>
                          <label className="block">
                            <span className="text-sm font-semibold">
                              Год выпуска
                            </span>
                            <input
                              type="text"
                              name="gradYear"
                              required
                              value={formData.gradYear}
                              onChange={handleChange}
                              className="w-full border rounded px-3 py-2"
                            />
                          </label>
                        </div>
                        <label className="block">
                          <span className="text-sm font-semibold">
                            Цель / Профиль
                          </span>
                          <textarea
                            name="objective"
                            required
                            value={formData.objective}
                            onChange={handleChange}
                            className="w-full border rounded px-3 py-2 h-24"
                          />
                        </label>
                      </motion.div>
                    )}

                    {currentStep === 4 && (
                      <motion.div
                        key="step4"
                        initial="initial"
                        animate="in"
                        exit="out"
                        variants={variants}
                        transition={transition}
                        className="space-y-4"
                      >
                        <label className="block">
                          <span className="text-sm font-semibold">
                            Опыт работы
                          </span>
                          <textarea
                            name="experience"
                            required
                            value={formData.experience}
                            onChange={handleChange}
                            className="w-full border rounded px-3 py-2 h-24"
                          />
                        </label>
                        <label className="block">
                          <span className="text-sm font-semibold">
                            Навыки
                          </span>
                          <textarea
                            name="skills"
                            required
                            value={formData.skills}
                            onChange={handleChange}
                            className="w-full border rounded px-3 py-2 h-24"
                          />
                        </label>
                      </motion.div>
                    )}

                    {currentStep === 5 && (
                      <motion.div
                        key="step5"
                        initial="initial"
                        animate="in"
                        exit="out"
                        variants={variants}
                        transition={transition}
                        className="space-y-4"
                      >
                        <label className="block">
                          <span className="text-sm font-semibold">
                            Языки
                          </span>
                          <input
                            type="text"
                            name="languages"
                            required
                            placeholder="Русский, Английский (B2)"
                            value={formData.languages}
                            onChange={handleChange}
                            className="w-full border rounded px-3 py-2"
                          />
                        </label>
                        <label className="block">
                          <span className="text-sm font-semibold">
                            Доп. информация
                          </span>
                          <textarea
                            name="additional"
                            value={formData.additional}
                            onChange={handleChange}
                            className="w-full border rounded px-3 py-2 h-24"
                          />
                        </label>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div className="flex justify-between mt-4">
                    {currentStep > 1 ? (
                      <button
                        type="button"
                        onClick={prevStep}
                        className="px-4 py-2 border rounded-full text-gray-700"
                      >
                        Назад
                      </button>
                    ) : (
                      <div />
                    )}

                    {currentStep < TOTAL_STEPS ? (
                      <button
                        type="button"
                        onClick={nextStep}
                        className="px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700"
                      >
                        Далее
                      </button>
                    ) : (
                      <button
                        type="submit"
                        className="px-6 py-2 bg-blue-700 text-white rounded-full hover:bg-blue-800"
                      >
                        Отправить заявку
                      </button>
                    )}
                  </div>
                </form>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Layout>
  );
}
