// src/pages/Media.tsx
import React, { useState } from 'react';
import Layout from '../layouts/MainLayout';
import { Newspaper, Image, FileText, X } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import heroImg from '../assets/abouthero-bg.jpg';

interface NewsItem {
  id: string;
  title: string;
  date: string;
  summary: string;
  image: string;
  link: string;
}

interface DocumentItem {
  id: string;
  title: string;
  url: string;
}

const NEWS: NewsItem[] = [
  {
    id: 'news-1',
    title: 'Открытие нашего портала!',
    date: '01.07.2025',
    summary:
      'Мы разработали качественный детализированный веб-сайт для ваших удобств.',
    image: heroImg,
    link: '/media/news/expedition-launch',
  },
];

const DOCUMENTS: DocumentItem[] = [
  {
    id: 'doc-1',
    title: 'Здесь будет документ',
    url: '/assets/docs/field-methods.pdf',
  },
];

// Vite import.meta.glob with proper generic typing:
const photoModules = import.meta.glob<{ default: string }>(
  '../assets/photos/season-2024/*.{jpg,JPG,png,PNG}',
  { eager: true }
);

const PHOTOS: string[] = Object.values(photoModules).map((m) => m.default);

export default function Media() {
  const [activeTab, setActiveTab] = useState<'news' | 'photos' | 'docs'>(
    'photos'
  );
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);

  return (
    <Layout>
      {/* Hero */}
      <section className="relative h-80 overflow-hidden flex items-center justify-center text-white">
        <img
          src={heroImg}
          alt="Медиа центр"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-blue-900/60" />
        <div className="relative z-10 text-center px-4">
          <h1 className="text-4xl font-bold mb-2">Медиа-центр</h1>
          <p className="text-lg">
            Все новости, фото и документы о работе «Тектоники» в одном месте
          </p>
        </div>
      </section>

      {/* Tabs */}
      <section className="container mx-auto px-4 py-8 text-center">
        <nav className="inline-flex rounded-full bg-white shadow">
          <button
            onClick={() => setActiveTab('news')}
            className={`px-6 py-2 rounded-full font-semibold transition ${
              activeTab === 'news'
                ? 'bg-blue-700 text-white'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <Newspaper className="inline-block w-5 h-5 mr-2 align-middle" />
            Новости
          </button>
          <button
            onClick={() => setActiveTab('photos')}
            className={`px-6 py-2 rounded-full font-semibold transition ${
              activeTab === 'photos'
                ? 'bg-blue-700 text-white'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <Image className="inline-block w-5 h-5 mr-2 align-middle" />
            Фото
          </button>
          <button
            onClick={() => setActiveTab('docs')}
            className={`px-6 py-2 rounded-full font-semibold transition ${
              activeTab === 'docs'
                ? 'bg-blue-700 text-white'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <FileText className="inline-block w-5 h-5 mr-2 align-middle" />
            Документы
          </button>
        </nav>
      </section>

      {/* Content */}
      <section className="container mx-auto px-4 pb-12">
        <AnimatePresence mode="wait">
          {activeTab === 'news' && (
            <motion.div
              key="news"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {NEWS.map((item) => (
                  <article
                    key={item.id}
                    className="bg-white rounded-xl shadow overflow-hidden flex flex-col"
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-40 object-cover"
                    />
                    <div className="p-6 flex flex-col flex-grow">
                      <h3 className="text-xl font-semibold text-blue-700 mb-2">
                        {item.title}
                      </h3>
                      <p className="text-gray-500 text-sm mb-4">{item.date}</p>
                      <p className="text-gray-700 mb-4 flex-grow">{item.summary}</p>
                      <a
                        href={item.link}
                        className="text-blue-700 font-medium hover:underline mt-auto"
                      >
                        Читать далее →
                      </a>
                    </div>
                  </article>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === 'photos' && (
            <motion.div
              key="photos"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
                {PHOTOS.map((src, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedPhoto(src)}
                    className="overflow-hidden rounded-lg shadow focus:outline-none"
                  >
                    <img
                      src={src}
                      alt={`Фотография ${idx + 1}`}
                      className="object-cover w-full h-48 hover:scale-105 transition-transform"
                      loading="lazy"
                    />
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === 'docs' && (
            <motion.div
              key="docs"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <ul className="space-y-4">
                {DOCUMENTS.map((doc) => (
                  <li key={doc.id}>
                    <a
                      href={doc.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-blue-700 font-medium hover:underline"
                    >
                      <FileText className="mr-2 w-5 h-5" />
                      {doc.title}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* Photo lightbox */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            className="fixed inset-0 bg-black/70 backdrop-blur flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="relative"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
            >
              <button
                onClick={() => setSelectedPhoto(null)}
                className="absolute top-0 right-0 m-2 bg-white rounded-full p-1 shadow"
                aria-label="Закрыть"
              >
                <X className="w-5 h-5" />
              </button>
              <img src={selectedPhoto} alt="Фотография" className="max-h-screen max-w-full rounded-lg" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Layout>
  );
}
