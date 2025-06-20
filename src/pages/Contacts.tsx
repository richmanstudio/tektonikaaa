// src/pages/Contacts.tsx
import React, { useState, useRef, type ChangeEvent, type FormEvent } from 'react';
import emailjs from '@emailjs/browser';
import Layout from '../layouts/MainLayout';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Send } from 'lucide-react';

export default function Contacts() {
  // Ссылка на форму для emailjs
  const formRef = useRef<HTMLFormElement>(null);

  // Данные формы
  const [formData, setFormData] = useState<{
    name: string;
    email: string;
    subject: string;
    message: string;
  }>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  // Статусы отправки
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitResult, setSubmitResult] = useState<{
    success: boolean;
    error?: string;
  } | null>(null);

  // Обработчик изменения полей
  function handleChange(
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  // Отправка формы через EmailJS
  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!formRef.current) return;

    setIsSubmitting(true);
    setSubmitResult(null);

    try {
      const serviceId = 'service_labg6pe';
      const templateId = 'template_pf48q3m';
      const publicKey = 'm4DT1MN15nyCSdWzE';

      const result = await emailjs.sendForm(
        serviceId,
        templateId,
        formRef.current,
        publicKey
      );
      console.log('EmailJS result:', result.text);

      setSubmitResult({ success: true });
      // очистка формы
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error: unknown) {
      console.error('EmailJS Error:', error);
      // если это Error, возьмём message, иначе — общий текст
      const errorMsg =
        error instanceof Error
          ? error.message
          : 'Неизвестная ошибка при отправке';

      setSubmitResult({ success: false, error: errorMsg });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Layout>
      {/* Hero-блок */}
      <motion.section
        className="bg-gradient-to-r from-blue-700 to-purple-600 text-white py-20"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-extrabold mb-4">
            Свяжитесь с нами
          </h1>
          <p className="text-xl max-w-2xl mx-auto">
            Остались вопросы? Напишите нам — мы ответим в течение рабочего дня.
          </p>
        </div>
      </motion.section>

      {/* Контакты */}
      <motion.section
        className="container mx-auto px-4 py-12 grid gap-8 md:grid-cols-3 text-gray-700"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        <div className="flex items-start space-x-4">
          <MapPin className="w-6 h-6 text-blue-700 mt-1" />
          <div>
            <h3 className="font-semibold text-lg mb-1">Адрес офиса</h3>
            <p>г. Хабаровск, ул. Ким Ю Чена, 65, оф. 326</p>
          </div>
        </div>
        <div className="flex items-start space-x-4">
          <Phone className="w-6 h-6 text-blue-700 mt-1" />
          <div>
            <h3 className="font-semibold text-lg mb-1">Телефон</h3>
            <a href="tel:+79842626115" className="hover:underline">
              +7 984 262-61-15
            </a>
          </div>
        </div>
        <div className="flex items-start space-x-4">
          <Mail className="w-6 h-6 text-blue-700 mt-1" />
          <div>
            <h3 className="font-semibold text-lg mb-1">E-mail</h3>
            <a href="mailto:tektonikayur16@gmail.com" className="hover:underline">
              tektonikayur16@gmail.com
            </a>
          </div>
        </div>
      </motion.section>

      {/* Форма обратной связи */}
      <section className="bg-gray-50 py-12">
        <div className="container mx-auto px-4 max-w-xl">
          <motion.form
            ref={formRef}
            onSubmit={handleSubmit}
            className="bg-white p-8 rounded-xl shadow-lg space-y-6"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {submitResult?.success && (
              <div className="bg-green-100 border border-green-300 text-green-800 px-4 py-3 rounded-md">
                Спасибо! Ваше сообщение отправлено.
              </div>
            )}
            {submitResult?.success === false && (
              <div className="bg-red-100 border border-red-300 text-red-800 px-4 py-3 rounded-md">
                Ошибка отправки: {submitResult.error}
              </div>
            )}

            {/* Имя */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium mb-1"
              >
                Ваше имя
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                disabled={isSubmitting}
                value={formData.name}
                onChange={handleChange}
                placeholder="Иван Иванов"
                className="w-full border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium mb-1"
              >
                E-mail
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                disabled={isSubmitting}
                value={formData.email}
                onChange={handleChange}
                placeholder="example@mail.com"
                className="w-full border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Тема */}
            <div>
              <label
                htmlFor="subject"
                className="block text-sm font-medium mb-1"
              >
                Тема сообщения
              </label>
              <input
                id="subject"
                name="subject"
                type="text"
                required
                disabled={isSubmitting}
                value={formData.subject}
                onChange={handleChange}
                placeholder="Вопрос по проекту"
                className="w-full border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Сообщение */}
            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium mb-1"
              >
                Сообщение
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                required
                disabled={isSubmitting}
                value={formData.message}
                onChange={handleChange}
                placeholder="Опишите ваш запрос"
                className="w-full border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              />
            </div>

            {/* Кнопка отправки */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex items-center justify-center space-x-2 bg-blue-700 text-white font-semibold py-3 rounded-lg hover:bg-blue-800 disabled:opacity-50 transition"
            >
              <Send className="w-5 h-5" />
              <span>{isSubmitting ? 'Отправка...' : 'Отправить'}</span>
            </button>
          </motion.form>
        </div>
      </section>
    </Layout>
  );
}
