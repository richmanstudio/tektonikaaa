import React from 'react';
import Layout from '../../layouts/MainLayout';
import hero from '../../assets/abouthero-bg.jpg';

const ARTICLE = {
  title: 'Открытие нашего портала!',
  date: '01.07.2025',
  hero,
  paragraphs: [
    'Мы рады представить обновлённый корпоративный сайт компании «Тектоника». На нём собрана вся информация об услугах, реализованных проектах и нашей научной деятельности.',
    'Запуская портал, мы стремились сделать его максимально удобным для заказчиков. Теперь вы можете быстро получить сведения о наших компетенциях и оставить заявку на консультацию прямо на сайте.',
    'Сайт будет регулярно пополняться новыми материалами. Следите за обновлениями и присоединяйтесь к нам в путешествии по миру геофизики.',
  ],
} as const;

export default function ExpeditionLaunch() {
  return (
    <Layout>
      <section className="relative overflow-hidden rounded-lg shadow mb-10">
        <img src={ARTICLE.hero} alt="Обложка новости" className="w-full h-96 object-cover" />
        <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-center text-white p-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-2">{ARTICLE.title}</h1>
          <p className="text-sm">{ARTICLE.date}</p>
        </div>
      </section>
      <section className="container mx-auto px-4 pb-16">
        {ARTICLE.paragraphs.map((text, idx) => (
          <p key={idx} className="text-lg leading-relaxed mb-4">
            {text}
          </p>
        ))}
      </section>
    </Layout>
  );
}
