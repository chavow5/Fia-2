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

    navigate("/")
  }

  const total = deudas.reduce((s, d) => s + d.monto, 0)

  if (!cliente) return null

  const borrarDeuda = async (deudaId) => {
    if (!confirm("¿Eliminar esta deuda?")) return

    await supabase.from("deudas").delete().eq("id", deudaId)
    loadData()
  }


  const formatFecha = (fecha) => {
    if (!fecha) return { fecha: "", hora: "" }
    const dt = new Date(fecha)
    const fechaFormato = dt.toLocaleString("es-AR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    })
    const horaFormato = dt.toLocaleString("es-AR", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    })
    return { fecha: fechaFormato, hora: horaFormato }
  }


  return (
    <div className="min-h-screen bg-slate-100 p-8">
      <button
        onClick={() => navigate('/')}
        className="mb-4 text-blue-600 hover:underline"
      >
        ← Volver
      </button>
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-2xl font-bold">{cliente.nombre}</h1>
          <p className="text-gray-500">DNI: {cliente.dni}</p>
          <a
            href={cliente.telefono ? `https://wa.me/${cliente.telefono.replace(/\D/g, '')}` : '#'}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-green-500 hover:underline cursor-pointer inline-block"
          >
            📞 {cliente.telefono || "Sin teléfono"}
          </a>
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
            className="bg-blue-500 text-white px-4 py-2 rounded font-semibold"
          >
            Editar Cliente
          </button>


          <button
            onClick={() => navigate(`/clientes/${id}/nueva-deuda`)}
            className="bg-green-400 text-white px-4 py-2 rounded font-semibold"
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

      <div className="flex flex-col gap-5 mb-4 md:flex-row md:justify-between md:items-center">

      </div>

      <div className="bg-white rounded-xl shadow overflow-x-auto border">
        <table className="w-full text-sm md:text-base">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 md:p-3 text-left">Fecha</th>
              <th className="p-2 md:p-3 text-left">Descripción</th>
              <th className="p-2 md:p-3 text-right">Monto</th>
              <th className="p-2 md:p-3 text-center">Acciones</th>
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
                <td className="p-2 md:p-3 text-xs md:text-sm">
                  <div className="font-semibold">{formatFecha(d.fecha).fecha}</div>
                  <div className="text-gray-500 text-xs">{formatFecha(d.fecha).hora}</div>
                </td>
                <td className="p-2 md:p-3 text-xs md:text-sm max-w-[160px] md:max-w-md whitespace-normal break-words">
                  {d.descripcion}
                </td>

                <td className="p-2 md:p-3 text-right text-red-600 font-bold text-xs md:text-sm whitespace-nowrap">${d.monto.toLocaleString()}</td>
                <td className="p-2 md:p-3 flex flex-row gap-1 md:gap-2 justify-center items-center flex-wrap">
                  <button
                    onClick={() => navigate(`/deudas/${d.id}/editar`)}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-2 md:px-3 py-1 rounded text-xs md:text-sm flex items-center gap-1"
                    title="Editar"
                  >
                    ✏ <span className="hidden md:inline">Editar</span>
                  </button>
                  <button
                    onClick={() => navigate(`/deudas/${d.id}/pago`)}
                    className="bg-green-500 hover:bg-green-600 text-white px-2 md:px-3 py-1 rounded text-xs md:text-sm flex items-center gap-1"
                    title="Registrar pago"
                  >
                    💵 <span className="hidden md:inline">Pagar</span>
                  </button>
                  <button
                    onClick={() => borrarDeuda(d.id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-2 md:px-3 py-1 rounded text-xs md:text-sm flex items-center gap-1"
                    title="Eliminar"
                  >
                    🗑 <span className="hidden md:inline">Borrar</span>
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
