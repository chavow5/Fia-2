import { useEffect, useState } from "react"

export default function Header() {
  const [dark, setDark] = useState(
    localStorage.getItem("theme") === "dark"
  )

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark")
      localStorage.setItem("theme", "dark")
    } else {
      document.documentElement.classList.remove("dark")
      localStorage.setItem("theme", "light")
    }
  }, [dark])

  return (
    <header className="fixed top-0 left-0 w-full h-14 bg-white dark:bg-slate-800 shadow z-50 flex items-center justify-between px-4">
      <h1 className="font-bold text-lg text-slate-800 dark:text-white">
        Fia - 2 Sistema de Deudas
      </h1>
      <div className="flex items-center gap-2">
        <button
          onClick={() => navigate("/")}
          className="text-sm px-3 py-1 rounded bg-blue-500 text-white hover:bg-blue-600"
        >
          Inicio
        </button>

        <button
          onClick={() => setDark(!dark)}
          className="bg-slate-200 dark:bg-slate-700 px-3 py-1 rounded text-sm"
        >
          {dark ? "☀️ Claro" : "🌙 Oscuro"}
        </button>
      </div>
    </header>
  )
}
