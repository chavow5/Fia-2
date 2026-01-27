import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { supabase } from "../lib/supabase"

export default function EditarDeuda() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [descripcion, setDescripcion] = useState("")
  const [monto, setMonto] = useState("")
  const [fecha, setFecha] = useState("")
  const [clienteId, setClienteId] = useState(null)

  useEffect(() => {
    cargarDeuda()
  }, [])

  const cargarDeuda = async () => {
    const { data, error } = await supabase
      .from("deudas")
      .select("*")
      .eq("id", id)
      .single()

    if (error) {
      alert("Error cargando deuda")
      return
    }

    setDescripcion(data.descripcion)
    setMonto(data.monto)
    setFecha(data.fecha)
    setClienteId(data.cliente_id)
  }

  const guardar = async (e) => {
    e.preventDefault()

    if (!descripcion || !monto) {
      alert("Completa todos los campos")
      return
    }

    const { error } = await supabase
      .from("deudas")
      .update({
        descripcion,
        monto: parseFloat(monto),
        fecha
      })
      .eq("id", id)

    if (error) {
      alert("Error al guardar")
      return
    }

    navigate(`/clientes/${clienteId}`)
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

        <h2 className="text-xl font-bold mb-4">Editar deuda</h2>

        <input
          className="w-full p-2 border rounded mb-3"
          placeholder="Descripción"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
        />

        <input
          type="number"
          className="w-full p-2 border rounded mb-3"
          placeholder="Monto"
          value={monto}
          onChange={(e) => setMonto(e.target.value)}
        />

        <input
          type="date"
          className="w-full p-2 border rounded mb-4"
          value={fecha}
          onChange={(e) => setFecha(e.target.value)}
        />

        <button className="w-full bg-blue-500 text-white py-2 rounded">
          Guardar cambios
        </button>
      </form>
    </div>
  )
}
