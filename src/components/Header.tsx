// src/components/Header.tsx
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import logo from "../assets/logo.png";

type NavItem = {
  to: string;
  label: string;
  isButton?: boolean;
};

const navItems: NavItem[] = [
  { to: "/", label: "Главная" },
  { to: "/services", label: "Услуги" },
  { to: "/projects", label: "Проекты" },
  { to: "/about", label: "О нас" },
  { to: "/media", label: "Медиа" },
  { to: "/research", label: "Научная деятельность" },
  { to: "/careers", label: "Карьера", isButton: true },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  return (
    <header className="fixed top-0 left-0 w-full z-50 backdrop-blur bg-white/70 shadow-md">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        {/* Логотип */}
        <Link to="/" className="flex items-center space-x-3">
          <img src={logo} alt="ТЕКТОНИКА" className="h-12 w-auto" />
          <span className="text-xl font-bold text-blue-700">ТЕКТОНИКА</span>
        </Link>

        {/* Десктоп — навигация */}
        <nav className="hidden lg:flex items-center space-x-6">
          {navItems.map(({ to, label, isButton }) => {
            const active = pathname === to;
            return (
              <Link
                key={to}
                to={to}
                className={
                  `relative px-1 py-2 text-gray-800 hover:text-blue-700 transition ${
                    active ? "text-blue-700 font-semibold" : ""
                  } ${
                    isButton
                      ? "ml-4 border border-blue-700 text-blue-700 rounded-lg px-4 py-2 hover:bg-blue-700 hover:text-white"
                      : ""
                  }`
                }
              >
                {label}
                {/* подчеркивающая анимация */}
                {!isButton && (
                  <span
                    className="absolute bottom-0 left-0 h-0.5 bg-blue-700"
                    style={{ width: active ? "100%" : 0 }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Мобильный бургер */}
        <button
          onClick={() => setOpen(o => !o)}
          className="lg:hidden p-2 focus:outline-none"
          aria-label="Toggle menu"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Мобильное меню */}
      {open && (
        <nav className="lg:hidden bg-white/90 backdrop-blur border-t border-gray-200">
          <div className="flex flex-col px-6 py-4 space-y-4">
            {navItems.map(({ to, label, isButton }) => {
              const active = pathname === to;
              return (
                <Link
                  key={to}
                  to={to}
                  onClick={() => setOpen(false)}
                  className={
                    `block px-2 py-2 text-gray-800 hover:text-blue-700 transition ${
                      active ? "font-semibold text-blue-700" : ""
                    } ${
                      isButton
                        ? "mt-2 border border-blue-700 text-blue-700 rounded-lg text-center py-2"
                        : ""
                    }`
                  }
                >
                  {label}
                </Link>
              );
            })}
          </div>
        </nav>
      )}
    </header>
  );
}
