import { NavLink, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard.jsx";
import Developers from "./pages/Developers.jsx";

const App = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-display">
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950" />
        <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-teal/30 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-72 w-72 rounded-full bg-amber/20 blur-3xl" />

        <div className="relative z-10">
          <header className="px-6 py-6 md:px-12">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Code Quality Intelligence</p>
                <h1 className="text-3xl font-semibold text-white md:text-4xl">Quality Command Center</h1>
              </div>
              <nav className="flex items-center gap-4">
                {[
                  { to: "/", label: "Dashboard" },
                  { to: "/developers", label: "Developers" }
                ].map((item) => (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    className={({ isActive }) =>
                      `rounded-full border border-slate-700 px-4 py-2 text-sm transition ${
                        isActive
                          ? "bg-white text-slate-900"
                          : "text-slate-200 hover:border-slate-500"
                      }`
                    }
                  >
                    {item.label}
                  </NavLink>
                ))}
              </nav>
            </div>
          </header>

          <main className="px-6 pb-16 md:px-12">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/developers" element={<Developers />} />
            </Routes>
          </main>
        </div>
      </div>
    </div>
  );
};

export default App;
