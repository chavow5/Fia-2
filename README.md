# Gestor de Deudas - Fia 2

Aplicación web para gestionar clientes y deudas. Creada para llevar un control organizado de quien le debe a quien.

## 📦 Instalación

```bash
npm install
npm run dev
```

## 🚀 Funcionalidades Actuales

```markdown
- ✅ Autenticación de usuarios (Login/Registro)
- ✅ Listado de clientes
- ✅ Ver detalles de cliente
- ✅ Crear nuevo cliente
- ✅ Editar datos del cliente
- ✅ Registrar deudas por cliente
- ✅ Ver historial de deudas
- ✅ Editar deudas existentes
- ✅ Eliminar deudas y clientes
- ✅ Enlace directo a WhatsApp del cliente
- ✅ Cálculo automático de deuda total

## 📝 Cosas a Mejorar

- [ ] Agregar búsqueda de clientes
- [ ] Filtrado de deudas por período
- [ ] Reportes de deudas impagas
- [ ] Exportar datos a CSV/PDF
- [ ] Panel de estadísticas
- [ ] Validación mejorada en formularios
- [ ] Confirmación de pago de deudas
- [ ] Historial de cambios en deudas
- [ ] Notas adicionales por cliente
- [ ] Sistema de recordatorios de deudas
- [ ] Mejoras en diseño responsivo mobile
- [ ] Agregar icono y branding propio

## 📁 Estructura del Proyecto

```
src/
├── pages/          # Componentes de páginas
├── context/        # Context API (Auth)
├── lib/           # Configuración de servicios
├── App.jsx
├── main.jsx
└── index.css
```

## 👤 Autor

Hecho con ❤️ durante Full Stack La Rioja

```
Fia-2
├─ eslint.config.js
├─ index.html
├─ package-lock.json
├─ package.json
├─ postcss.config.js
├─ README.md
├─ SQL
├─ src
│  ├─ App.jsx
│  ├─ components
│  │  ├─ Footer.jsx
│  │  └─ Header.jsx
│  ├─ context
│  │  └─ AuthContext.jsx
│  ├─ index.css
│  ├─ lib
│  │  └─ supabase.js
│  ├─ main.jsx
│  └─ pages
│     ├─ ClienteDetalle.jsx
│     ├─ Clientes.jsx
│     ├─ EditarCliente.jsx
│     ├─ EditarDeuda.jsx
│     ├─ Login.jsx
│     ├─ NuevaDeuda.jsx
│     ├─ NuevoCliente.jsx
│     ├─ Register.jsx
│     └─ RegistrarPago.jsx
├─ tailwind.config.js
└─ vite.config.js

```