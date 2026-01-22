import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { supabase } from "../lib/supabase"

export default function EditarCliente() {
    const { id } = useParams()
    const navigate = useNavigate()
    const [telefono, setTelefono] = useState("")


    const [nombre, setNombre] = useState("")
    const [dni, setDni] = useState("")

    useEffect(() => {
        cargar()
    }, [])

    const cargar = async () => {
        const { data } = await supabase
            .from("clientes")
            .select("*")
            .eq("id", id)
            .single()

        setNombre(data.nombre)
        setDni(data.dni)
        setTelefono(data.telefono || "")

    }

    const guardar = async (e) => {
        e.preventDefault()

        await supabase
            .from("clientes")
            .update({ nombre, dni, telefono })
            .eq("id", id)

        navigate(`/clientes/${id}`)
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-100">
            <form

                onSubmit={guardar}
                className="bg-white p-6 rounded-xl shadow w-full max-w-md"
            >
                <button
                    onClick={() => navigate(-1)}
                    className="mb-4 text-blue-600 hover:underline"
                >
                    ← Volver
                </button>
                <h2 className="text-xl font-bold mb-4">Editar Cliente</h2>

                <input
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    placeholder="Nombre"
                    className="w-full p-2 border rounded mb-3"
                />

                <input
                    value={dni}
                    onChange={(e) => setDni(e.target.value)}
                    placeholder="DNI"
                    className="w-full p-2 border rounded mb-4"
                />
                <input
                    value={telefono}
                    onChange={(e) => setTelefono(e.target.value)}
                    placeholder="Teléfono"
                    className="w-full p-2 border rounded mb-3"
                />

                <button className="w-full bg-blue-500 text-white py-2 rounded">
                    Guardar
                </button>
            </form>
        </div>
    )
}
