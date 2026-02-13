import { Link } from "react-router-dom";

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow px-6 py-4 flex gap-6">
        <Link to="/" className="font-medium hover:text-blue-600">
          Home
        </Link>
        <Link to="/Dashboard" className="font-medium hover:text-blue-600">
          Dashboard
        </Link>
      </nav>

      <main className="p-6">{children}</main>
    </div>
  );
}
