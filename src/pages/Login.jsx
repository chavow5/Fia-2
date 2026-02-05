import { useState } from "react"
import { supabase } from "../lib/supabase"
import { useNavigate, Link } from "react-router-dom"

export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) setError(error.message)
    else navigate("/")
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">
      <div className="bg-white p-8 rounded-lg w-96 shadow text-center space-y-4">

        <h1 className="text-2xl font-bold">Fia-2</h1>
        <p className="text-sm text-gray-600">
          Hola, soy <b>David Ramírez</b> 👋
          Desarrollé esta app para ayudar a controlar clientes y deudas
          de forma simple y rápida.
        </p>

        <div className="flex justify-center gap-4 text-sm">
          <a
            href="https://wa.me/5493804201334"
            target="_blank"
            className="text-green-600 hover:underline font-semibold"
          >
            💬 WhatsApp
          </a>

          <a
            href="https://www.instagram.com/davidramirez_651/"
            target="_blank"
            className="text-pink-600 hover:underline font-semibold"
          >
            📸 Instagram
          </a>
        </div>

        <hr />
        <div className="bg-blue-50 border border-blue-200 rounded p-3 text-sm text-blue-800">
          <p className="font-semibold mb-1">🔓 Versión de prueba</p>
          <p>Podés ingresar con este usuario demo:</p>

          <div className="mt-2 bg-white border rounded p-2 text-xs text-left">
            <p><b>Email:</b> Pruebas@fia2.com</p>
            <p><b>Contraseña:</b> pruebasfia2</p>
          </div>

          <button
            type="button"
            onClick={() => {
              setEmail("Pruebas@fia2.com")
              setPassword("pruebasfia2")
            }}
            className="mt-2 w-full text-xs bg-blue-600 text-white py-1 rounded hover:bg-blue-700"
          >
            Usar cuenta demo
          </button>
        </div>


        <form onSubmit={handleLogin} className="space-y-3">

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <input
            className="w-full border p-2 rounded"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              className="w-full border p-2 rounded"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button
              type="button"
              aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
              onClick={() => setShowPassword((s) => !s)}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-600"
            >
              {showPassword ? "👁‍🗨" : "👁️"}
            </button>
          </div>

          <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
            Ingresar
          </button>

        </form>

        <p className="text-xs text-gray-500">
          ¿Querés usar Fia-2? Escribime por WhatsApp
        </p>

      </div>
    </div>
  )

}
