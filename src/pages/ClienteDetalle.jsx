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
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-2xl font-bold">{cliente.nombre}</h1>
          <p className="text-gray-500">DNI: {cliente.dni}</p>
          <p className="text-gray-500">📞 {cliente.telefono || "Sin teléfono"}</p>
        </div>


        <div className="flex flex-col gap-2">

          <button
            onClick={eliminarCliente}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded font-semibold border-2 border-red-700 shadow-md"
          >
            ⚠️ Eliminar Cliente
          </button>
          
          <button
            onClick={() => navigate(`/clientes/${id}/editar`)}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Editar Cliente
          </button>


          <button
            onClick={() => navigate(`/clientes/${id}/nueva-deuda`)}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Nueva Deuda
          </button>

        </div>

      </div>

      <div className="bg-white p-6 rounded-xl shadow mb-6">
        <p className="text-sm text-gray-500 font-bold">Deuda Total</p>
        <p className="text-3xl font-bold text-red-600">
          ${total.toLocaleString()}
        </p>

      </div>

      <div className="bg-white rounded-xl shadow overflow-hidden border">
        <table className="w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Fecha</th>
              <th className="p-3 text-left">Descripción</th>
              <th className="p-3 text-right">Monto</th>
              <th className="p-3 text-right">Acciones</th>
            </tr>
          </thead>


          <tbody>
            {deudas.length === 0 && (
              <tr>
                <td colSpan="4" className="p-6 text-center text-gray-400">
                  Este cliente no tiene deudas
                </td>
              </tr>
            )}

            {deudas.map((d) => (
              <tr key={d.id} className="border-t hover:bg-gray-50">
                <td className="p-3">{d.fecha}</td>
                <td className="p-3">{d.descripcion}</td>
                <td className="p-3 text-right text-red-600 font-bold">${d.monto.toLocaleString()}</td>
                <td className="p-3 flex flex-col gap-2 items-end">
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
