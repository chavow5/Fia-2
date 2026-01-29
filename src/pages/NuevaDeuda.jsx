import { useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { supabase } from "../lib/supabase"

export default function NuevaDeuda() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [descripcion, setDescripcion] = useState("")
  const [monto, setMonto] = useState("")
  // const [fecha, setFecha] = useState(
  //   new Date().toISOString().split("T")[0]
  // )


  const guardar = async (e) => {
    e.preventDefault()

    if (!descripcion || !monto) {
      alert("Completa todos los campos")
      return
    }

    // 🔥 obtener usuario logueado
    const {
      data: { user },
      error: userError
    } = await supabase.auth.getUser()

    if (userError || !user) {
      alert("No hay usuario logueado")
      return
    }

    const { error } = await supabase.from("deudas").insert([
      {
        cliente_id: id,
        user_id: user.id,
        descripcion,
        monto: parseFloat(monto),
        fecha: new Date().toISOString() // fecha + hora de hoy
      }
    ])

    if (error) {
      alert(error.message)
      return
    }

    navigate(`/clientes/${id}`)
  }

  return (
    <div className="min-h-screen bg-slate-100 flex justify-center items-center">
      <form
        onSubmit={guardar}
        className="bg-white p-6 rounded-xl shadow w-full max-w-md"
      >
        <button
          type="button"
          onClick={() => navigate('/')}
          className="mb-4 text-blue-600 hover:underline"
        >
          ← Volver
        </button>

        <h2 className="text-xl font-bold mb-4">Nueva Deuda</h2>

        <input
          className="w-full p-2 border rounded mb-3"
          placeholder="Producto (ej: Coca 2.25L)"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
        />

        <input
          className="w-full p-2 border rounded mb-3"
          placeholder="Monto"
          type="number"
          value={monto}
          onChange={(e) => setMonto(e.target.value)}
        />

        {/* <input
          type="date"
          className="w-full p-2 border rounded mb-4"
          value={fecha}
          onChange={(e) => setFecha(e.target.value)}
        /> */}

        <button className="w-full bg-green-500 text-white py-2 rounded">
          Guardar deuda
        </button>
      </form>
    </div>
  )
}
