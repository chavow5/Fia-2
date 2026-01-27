import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { supabase } from "../lib/supabase"

export default function RegistrarPago() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [deuda, setDeuda] = useState(null)
  const [pago, setPago] = useState("")

  useEffect(() => {
    load()
  }, [])

  const load = async () => {
    const { data } = await supabase
      .from("deudas")
      .select("*")
      .eq("id", id)
      .single()

    setDeuda(data)
  }

  const guardar = async (e) => {
    e.preventDefault()

    const montoPago = parseFloat(pago)
    if (montoPago <= 0) return alert("Monto inválido")

    const nuevoMonto = deuda.monto - montoPago

    if (nuevoMonto < 0) {
      return alert("El pago no puede ser mayor que la deuda")
    }

    // Si queda en 0 → borramos la deuda
    if (nuevoMonto === 0) {
      await supabase.from("deudas").delete().eq("id", id)
    } else {
      await supabase
        .from("deudas")
        .update({ monto: nuevoMonto })
        .eq("id", id)
    }

    navigate(-1)
  }

  if (!deuda) return null

  return (
    <div className="min-h-screen bg-slate-100 flex justify-center items-center">
      <form onSubmit={guardar} className="bg-white p-6 rounded-xl shadow w-full max-w-md">
        <button
           type="button"
           onClick={() => navigate('/')}
          className="mb-4 text-blue-600 hover:underline"
        >
          ← Volver
        </button>

        <h2 className="text-xl font-bold mb-4">Registrar pago</h2>

        <p className="mb-2">{deuda.descripcion}</p>
        <p className="mb-4 text-red-500 font-bold">
          Deuda: ${deuda.monto}
        </p>

        <input
          type="number"
          className="w-full p-2 border rounded mb-4"
          placeholder="Monto que paga"
          value={pago}
          onChange={(e) => setPago(e.target.value)}
        />

        <button className="w-full bg-green-500 text-white py-2 rounded">
          Registrar pago
        </button>
      </form>
    </div>
  )
}
