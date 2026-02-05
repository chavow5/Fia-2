import { useEffect, useState } from "react"
import { supabase } from "../lib/supabase"
import { useAuth } from "../context/AuthContext"
import { useNavigate } from "react-router-dom"


export default function Clientes() {
  const { user, logout } = useAuth()
  const [clientes, setClientes] = useState([])
  const navigate = useNavigate()
  const [busqueda, setBusqueda] = useState("")


  useEffect(() => {
    loadClientes()
  }, [])

  const handleLogout = async () => {
    if (logout) {
      await logout()
    }
    navigate('/login')
  }

  const loadClientes = async () => {
    const { data } = await supabase
      .from("clientes")
      .select(`
        id, nombre, dni,
        deudas(monto)
      `)

    setClientes(data || [])
  }

  const totalDeuda = (deudas) =>
    deudas.reduce((sum, d) => sum + d.monto, 0)

  const clientesFiltrados = clientes.filter(c =>
    c.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
    (c.dni && c.dni.toString().includes(busqueda))
  )


  return (
    <div className="min-h-screen bg-slate-100 p-8">
      <button
        onClick={() => navigate('/')}
        className="mb-4 text-blue-600 hover:underline"
      >
        ← Volver
      </button>
      <div className="flex justify-between mb-8">
        <h1 className="text-2xl font-bold text-slate-800">
          👋 Bienvenido,{" "}
          <span className="text-blue-600">
            {user?.user_metadata?.nombre || user?.email}
          </span>
        </h1>

        <div className="flex gap-3">
          <button
            onClick={() => navigate("/clientes/nuevo")}
            className="bg-green-500 text-white px-4 py-2 rounded font-semibold mb-4"
          >
            ➕ Nuevo Cliente
          </button>

          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded font-semibold mb-4"
          >
            Cerrar Sesión
          </button>
        </div>

      </div>
      <input
        type="text"
        placeholder="Buscar por Nombre o DNI..."
        className="w-full p-2 border rounded mb-6"
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
      />
      {clientesFiltrados.length === 0 && busqueda && (
        <p className="text-center text-gray-500 mb-6">
          Nombre o DNI no encontrado
        </p>
      )}



      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {clientesFiltrados.map((c) => {
          const deuda = totalDeuda(c.deudas || [])

          return (
            <div
              key={c.id}
              onClick={() => navigate(`/clientes/${c.id}`)}
              className="bg-white p-6 rounded-xl shadow cursor-pointer hover:shadow-lg transition"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center font-bold">
                  {c.nombre[0]}
                </div>
                <div>
                  <h2 className="font-semibold">{c.nombre}</h2>
                  <p className="text-sm text-gray-500">DNI: {c.dni}</p>
                </div>
              </div>

              <p className="text-sm text-gray-500">Deuda Total</p>
              <p className={`text-2xl font-bold ${deuda > 0 ? "text-red-500" : "text-black"}`}>
                ${deuda}
              </p>
            </div>
          )
        })}
      </div>
    </div>
  )
}
