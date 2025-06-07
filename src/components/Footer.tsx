// src/components/Footer.tsx
import React from "react";
import { Link } from "react-router-dom";
import { MapPin, Phone, Mail } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white text-gray-700 py-12 border-t border-gray-200 transition-colors">
      <div className="container mx-auto px-4 grid md:grid-cols-3 gap-8">
        {/* About */}
        <div>
          <h4 className="text-lg font-bold mb-4">ООО «Тектоника»</h4>
          <p className="mb-4">
            Ведущий эксперт в области геофизических исследований. От фундамента
            к звёздам — наши технологии открывают недра планеты.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-lg font-bold mb-4">Навигация</h4>
          <ul className="space-y-2">
            <li>
              <Link to="/" className="hover:underline">
                Главная
              </Link>
            </li>
            <li>
              <Link to="/services" className="hover:underline">
                Услуги
              </Link>
            </li>
            <li>
              <Link to="/projects" className="hover:underline">
                Проекты
              </Link>
            </li>
            <li>
              <Link to="/careers" className="hover:underline">
                Карьера
              </Link>
            </li>
            <li>
              <Link to="/contacts" className="hover:underline">
                Контакты
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h4 className="text-lg font-bold mb-4">Контакты</h4>
          <ul className="space-y-3">
            <li className="flex items-center gap-2">
              <MapPin size={18} />
             г. Хабаровск, ул. Ким Ю Чена, 65, офис. 326
            </li>
            <li className="flex items-center gap-2">
              <Phone size={18} />
              <a href="tel:+78001234567" className="hover:underline">
                +7 984 262-61-15
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Mail size={18} />
              <a href="mailto:info@tektonika.ru" className="hover:underline">
                info@tektonika.ru
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Copyright */}
      <div className="container mx-auto px-4 mt-8 text-center text-sm text-gray-500">
        © {currentYear} ООО «Тектоника». Все права защищены.
      </div>
    </footer>
  );
}
