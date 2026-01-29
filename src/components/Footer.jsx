export default function Footer() {
  return (
    <footer className="fixed bottom-0 left-0 w-full h-12 bg-white dark:bg-slate-800 shadow-inner z-50 flex items-center justify-center text-xs text-slate-500 dark:text-slate-300">
      © {new Date().getFullYear()} - Sistema de Deudas
    </footer>
  )
}
