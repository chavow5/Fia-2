import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { supabase } from "../lib/supabase"

export default function ClienteDetalle() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [cliente, setCliente] = useState(null)
  const [deudas, setDeudas] = useState([])

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    const { data: clienteData } = await supabase
      .from("clientes")
      .select("*")
      .eq("id", id)
      .single()

    const { data: deudasData } = await supabase
      .from("deudas")
      .select("*")
      .eq("cliente_id", id)
      .order("fecha", { ascending: false })

    setCliente(clienteData)
    setDeudas(deudasData || [])
  }

  const eliminarCliente = async () => {
    if (!confirm("¿Eliminar este cliente y todas sus deudas?")) return

    await supabase.from("deudas").delete().eq("cliente_id", id)
    await supabase.from("clientes").delete().eq("id", id)

    navigate("/dashboard")
  }

  const total = deudas.reduce((s, d) => s + d.monto, 0)

  if (!cliente) return null

  const borrarDeuda = async (deudaId) => {
    if (!confirm("¿Eliminar esta deuda?")) return

    await supabase.from("deudas").delete().eq("id", deudaId)
    loadData()
  }


  return (
    <div className="min-h-screen bg-slate-100 p-8">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 text-blue-600 hover:underline"
      >
        ← Volver
      </button>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">{cliente.nombre}</h1>
          <p className="text-gray-500">DNI: {cliente.dni}</p>
          <p className="text-gray-500">📞 {cliente.telefono || "Sin teléfono"}</p>
        </div>


        <div className="flex gap-2">
          <button
            onClick={() => navigate(`/clientes/${id}/nueva-deuda`)}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            + Deuda
          </button>

          <button
            onClick={() => navigate(`/clientes/${id}/editar`)}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Editar
          </button>

          <button
            onClick={eliminarCliente}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Eliminar
          </button>
        </div>

      </div>

      <div className="bg-white p-6 rounded-xl shadow mb-6">
        <p className="text-sm text-gray-500">Deuda Total</p>
        <p className="text-3xl font-bold text-red-500">${total}</p>
      </div>

      <div className="bg-white rounded-xl shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="p-3">Fecha</th>
              <th className="p-3">Descripción</th>
              <th className="p-3">Monto</th>
              <th className="p-3">Acciones</th>
            </tr>
          </thead>

          <tbody>
            {deudas.map((d) => (
              <tr key={d.id} className="border-t">
                <td className="p-3">{d.fecha}</td>
                <td className="p-3">{d.descripcion}</td>
                <td className="p-3 text-red-500 font-semibold">
                  ${d.monto}
                </td>
                <td className="p-3 flex gap-2">
                  <button
                    onClick={() => navigate(`/deudas/${d.id}/editar`)}
                    className="bg-blue-500 text-white px-2 py-1 rounded text-sm"
                  >
                    ✏
                  </button>

                  <button
                    onClick={() => borrarDeuda(d.id)}
                    className="bg-red-500 text-white px-2 py-1 rounded text-sm"
                  >
                    🗑
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  )
}
