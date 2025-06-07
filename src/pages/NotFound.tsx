
import { Link } from "react-router-dom";
import Layout from "../layouts/MainLayout";

export default function NotFound() {
  return (
    <Layout>
      <section className="flex flex-col items-center justify-center py-32">
        <h1 className="text-6xl font-bold mb-6">404</h1>
        <p className="text-2xl mb-8">Страница не найдена</p>
        <Link
          to="/"
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition"
        >
          Вернуться на главную
        </Link>
      </section>
    </Layout>
  );
}
