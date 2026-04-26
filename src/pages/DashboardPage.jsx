import { Link } from "react-router-dom";

export default function DashboardPage({ session }) {
  const cards = [
    {
      title: "Jobs",
      description: "Create and manage open positions.",
      href: "/jobs",
      icon: "💼",
    },
    {
      title: "Candidates",
      description: "Add candidate profiles and connect them to jobs.",
      href: "/candidates",
      icon: "👤",
    },
    {
      title: "Kanban",
      description: "Track candidates through the hiring pipeline.",
      href: "/kanban",
      icon: "📊",
    },
  ];

  return (
    <div>
      <div className="mb-8">
        <p className="text-sm font-medium text-blue-600 mb-2">
          Welcome back
        </p>
        <h1 className="text-4xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-500 mt-2">
          Logged in as {session?.user?.email}
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {cards.map((card) => (
          <Link
            key={card.title}
            to={card.href}
            className="group bg-white rounded-3xl p-6 shadow-md border border-gray-100 hover:-translate-y-1 hover:shadow-xl transition"
          >
            <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center text-2xl mb-5">
              {card.icon}
            </div>

            <h2 className="text-xl font-semibold text-gray-900 group-hover:text-blue-700">
              {card.title}
            </h2>

            <p className="text-gray-500 mt-2 leading-relaxed">
              {card.description}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}