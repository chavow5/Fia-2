import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { supabase } from "../lib/supabase"

export default function NuevoCliente() {
  const navigate = useNavigate()

  const [nombre, setNombre] = useState("")
  const [dni, setDni] = useState("")
  const [telefono, setTelefono] = useState("")

  const guardar = async (e) => {
    e.preventDefault()

    if (!nombre) {
      alert("El nombre es obligatorio")
      return
    }

    const {
      data: { user }
    } = await supabase.auth.getUser()

    const { error } = await supabase.from("clientes").insert([
      {
        nombre,
        dni,
        telefono,
        user_id: user.id
      }
    ])

    if (error) {
      alert(error.message)
      return
    }

    navigate("/")
  }

  return (
    <div className="flex justify-center items-center">
      <form
        onSubmit={guardar}
        className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow w-full max-w-md"
      >
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="mb-4 text-blue-600 hover:underline"
        >
          ← Volver
        </button>

        <h2 className="text-xl font-bold mb-4">Nuevo Cliente</h2>

        <input
          className="w-full p-2 border rounded mb-3"
          placeholder="Nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />

        <input
          className="w-full p-2 border rounded mb-3"
          placeholder="DNI"
          value={dni}
          onChange={(e) => setDni(e.target.value)}
        />

        <input
          className="w-full p-2 border rounded mb-4"
          placeholder="Teléfono"
          value={telefono}
          onChange={(e) => setTelefono(e.target.value)}
        />

        <button className="w-full bg-green-500 text-white py-2 rounded">
          Guardar Cliente
        </button>
      </form>
    </div>
  )
}
