import React, { useState } from "react";
import Layout from "../layouts/MainLayout";

export default function Contacts() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Интеграция с API для отправки данных
    console.log("Отправлено сообщение:", form);
    setSubmitted(true);
  };

  return (
    <Layout>
      <section className="py-16">
        <h1 className="text-4xl font-bold mb-6 text-center">Контакты</h1>
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-8">
          {/* Информация о компании */}
          <div>
            <h2 className="text-2xl font-semibold mb-4">Наши контакты</h2>
            <p className="mb-2">
              <strong>Телефон:</strong>{" "}
              <a
                href="tel:+74212223344"
                className="text-blue-600 hover:underline"
              >
                +7 (4212) 222-3344
              </a>
            </p>
            <p className="mb-2">
              <strong>Email:</strong>{" "}
              <a
                href="mailto:info@tectonika.ru"
                className="text-blue-600 hover:underline"
              >
                info@tectonika.ru
              </a>
            </p>
            <p className="mb-2">
              <strong>Адрес:</strong> ул. Примерная, 12, г. Хабаровск
            </p>
          </div>

          {/* Форма обратной связи */}
          <div>
            {submitted ? (
              <div className="p-6 bg-green-100 text-green-800 rounded-lg">
                Спасибо! Ваше сообщение отправлено.
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block mb-1 font-medium" htmlFor="name">
                    Имя
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={form.name}
                    onChange={handleChange}
                    className="w-full border rounded px-3 py-2 focus:outline-none focus:ring"
                    required
                  />
                </div>
                <div>
                  <label className="block mb-1 font-medium" htmlFor="email">
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    className="w-full border rounded px-3 py-2 focus:outline-none focus:ring"
                    required
                  />
                </div>
                <div>
                  <label className="block mb-1 font-medium" htmlFor="message">
                    Сообщение
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={form.message}
                    onChange={handleChange}
                    className="w-full border rounded px-3 py-2 focus:outline-none focus:ring"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded transition"
                >
                  Отправить
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </Layout>
  );
}
