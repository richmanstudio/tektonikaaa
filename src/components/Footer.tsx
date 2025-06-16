// src/components/Footer.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-100 text-gray-700 pt-12">
      <div className="container mx-auto px-6 lg:px-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {/* О компании */}
          <div>
            <h4 className="text-xl font-semibold mb-4">ООО «Тектоника»</h4>
            <p className="text-sm leading-relaxed">
              Ведущий эксперт в области геофизических исследований. От фундамента к звёздам — наши технологии открывают недра планеты.
            </p>
          </div>

          {/* Основная навигация */}
          <div>
            <h4 className="text-xl font-semibold mb-4">Навигация</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="hover:text-blue-600 transition-colors">
                  Главная
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-blue-600 transition-colors">
                  Услуги
                </Link>
              </li>
              <li>
                <Link to="/projects" className="hover:text-blue-600 transition-colors">
                  Проекты
                </Link>
              </li>
              <li>
                <Link to="/careers" className="hover:text-blue-600 transition-colors">
                  Карьера
                </Link>
              </li>
              <li>
                <Link to="/media" className="hover:text-blue-600 transition-colors">
                  Медиа
                </Link>
              </li>
              <li>
                <Link to="/contacts" className="hover:text-blue-600 transition-colors">
                  Контакты
                </Link>
              </li>
            </ul>
          </div>

          {/* Правовая навигация */}
          <div>
            <h4 className="text-xl font-semibold mb-4">Право</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/privacy" className="hover:text-blue-600 transition-colors">
                  Политика конфиденциальности
                </Link>
              </li>
              <li>
                <Link to="/agreement" className="hover:text-blue-600 transition-colors">
                  Пользовательское соглашение
                </Link>
              </li>
            </ul>
          </div>

          {/* Контакты */}
          <div>
            <h4 className="text-xl font-semibold mb-4">Контакты</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start">
                <MapPin className="w-5 h-5 flex-shrink-0 text-blue-600 mt-1" />
                <span className="ml-3">
                  г. Хабаровск, ул. Ким Ю Чена, 65, офис 326
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="w-5 h-5 text-blue-600" />
                <a href="tel:+79842626115" className="ml-3 hover:text-blue-600 transition-colors">
                  +7 (984) 262-61-15
                </a>
              </li>
              <li className="flex items-center">
                <Mail className="w-5 h-5 text-blue-600" />
                <a
                  href="mailto:info@tektonika.ru"
                  className="ml-3 hover:text-blue-600 transition-colors"
                >
                  info@tektonika.ru
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-300 mt-8 pt-6 text-center text-xs text-gray-500">
          © {new Date().getFullYear()} ООО «Тектоника». Все права защищены.
        </div>
      </div>
    </footer>
  );
}
