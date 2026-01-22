import { useState } from "react"
import { supabase } from "../lib/supabase"
import { useNavigate, Link } from "react-router-dom"

export default function Register() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()

  const handleRegister = async (e) => {
    e.preventDefault()

    const { error } = await supabase.auth.signUp({
      email,
      password,
    })

    if (!error) navigate("/")
    else alert(error.message)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">
      <form onSubmit={handleRegister} className="bg-white p-8 rounded-lg w-96 shadow">
        <h1 className="text-2xl font-bold mb-6 text-center">Crear cuenta</h1>

        <input className="w-full border p-2 mb-3" placeholder="Email"
          onChange={(e) => setEmail(e.target.value)} />

        <input type="password" className="w-full border p-2 mb-4" placeholder="Contraseña"
          onChange={(e) => setPassword(e.target.value)} />

        <button className="w-full bg-blue-600 text-white py-2 rounded">
          Registrarse
        </button>

        <p className="text-sm mt-4 text-center">
          <Link className="text-blue-600" to="/login">Volver al login</Link>
        </p>
      </form>
    </div>
  )
}
