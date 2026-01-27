import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { AuthProvider, useAuth } from "./context/AuthContext"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Clientes from "./pages/Clientes"
import ClienteDetalle from "./pages/ClienteDetalle"
import EditarCliente from "./pages/EditarCliente"
import NuevaDeuda from "./pages/NuevaDeuda"
import EditarDeuda from "./pages/EditarDeuda"
import RegistrarPago from "./pages/RegistrarPago"



function PrivateRoute({ children }) {
  const { user } = useAuth()
  return user ? children : <Navigate to="/login" />
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/clientes/:id/editar" element={<EditarCliente />} />
          <Route path="/clientes/:id/nueva-deuda" element={<NuevaDeuda />} />

          <Route
            path="/deudas/:id/editar"
            element={
              <PrivateRoute>
                <EditarDeuda />
              </PrivateRoute>
            }
          />

          <Route
            path="/"
            element={
              <PrivateRoute>
                <Clientes />
              </PrivateRoute>
            }
          />

          <Route
            path="/deudas/:id/pago"
            element={
              <PrivateRoute>
                <RegistrarPago />
              </PrivateRoute>
            }
          />

          <Route
            path="/clientes/:id"
            element={
              <PrivateRoute>
                <ClienteDetalle />
              </PrivateRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}
