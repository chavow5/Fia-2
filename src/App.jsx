import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { AuthProvider, useAuth } from "./context/AuthContext"

import Header from "./components/Header"
import Footer from "./components/Footer"

import Login from "./pages/Login"
import Register from "./pages/Register"
import Clientes from "./pages/Clientes"
import ClienteDetalle from "./pages/ClienteDetalle"
import EditarCliente from "./pages/EditarCliente"
import NuevaDeuda from "./pages/NuevaDeuda"
import EditarDeuda from "./pages/EditarDeuda"
import RegistrarPago from "./pages/RegistrarPago"
import NuevoCliente from "./pages/NuevoCliente"




function PrivateRoute({ children }) {
  const { user } = useAuth()
  return user ? children : <Navigate to="/login" />
}

function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-slate-100 dark:bg-slate-900 transition-colors">
      <Header />

      <main className="flex-1 pt-16 pb-14">
        {children}
      </main>

      <Footer />
    </div>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route
            path="/"
            element={
              <PrivateRoute>
                <Layout>
                  <Clientes />
                </Layout>
              </PrivateRoute>
            }
          />

          <Route
            path="/clientes/:id"
            element={
              <PrivateRoute>
                <Layout>
                  <ClienteDetalle />
                </Layout>
              </PrivateRoute>
            }
          />

          <Route
            path="/clientes/:id/editar"
            element={
              <PrivateRoute>
                <Layout>
                  <EditarCliente />
                </Layout>
              </PrivateRoute>
            }
          />

          <Route
            path="/clientes/:id/nueva-deuda"
            element={
              <PrivateRoute>
                <Layout>
                  <NuevaDeuda />
                </Layout>
              </PrivateRoute>
            }
          />

          <Route
            path="/deudas/:id/editar"
            element={
              <PrivateRoute>
                <Layout>
                  <EditarDeuda />
                </Layout>
              </PrivateRoute>
            }
          />

          <Route
            path="/deudas/:id/pago"
            element={
              <PrivateRoute>
                <Layout>
                  <RegistrarPago />
                </Layout>
              </PrivateRoute>
            }
          />
          <Route
            path="/clientes/nuevo"
            element={
              <PrivateRoute>
                <Layout>
                  <NuevoCliente />
                </Layout>
              </PrivateRoute>
            }
          />

        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}
