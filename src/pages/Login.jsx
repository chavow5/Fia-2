import { useState } from "react"
import { supabase } from "../lib/supabase"
import { useNavigate, Link } from "react-router-dom"

export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
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
      <form onSubmit={handleLogin} className="bg-white p-8 rounded-lg w-96 shadow">
        <h1 className="text-2xl font-bold mb-6 text-center">Bienvenidos a Fia-2</h1>

        {error && <p className="text-red-500 mb-3">{error}</p>}

        <input
          className="w-full border p-2 mb-3"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="w-full border p-2 mb-4"
          placeholder="Contraseña"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="w-full bg-blue-600 text-white py-2 rounded">
          Ingresar
        </button>

        <p className="text-sm mt-4 text-center">
           ¿No tenés cuenta? Contactame 3804201334 {/* <Link className="text-blue-600" to="/register">Registrarse</Link> */}
        </p>
      </form>
    </div>
  )
}
