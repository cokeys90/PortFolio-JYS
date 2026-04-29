function App() {
  return (
    <main className="min-h-screen flex items-center justify-center font-sans">
      <div className="text-center px-6">
        <h1 className="font-pixel text-2xl md:text-3xl text-accent tracking-wider">Coke.YS</h1>
        <p className="font-terminal text-xl text-text-secondary mt-3">
          $ portfolio --status=bootstrapping
          <span className="inline-block w-2.5 h-5 bg-accent ml-2 align-middle animate-blink" />
        </p>
        <p className="text-text-muted mt-4 text-sm">
          Vite + React + Tailwind v4 — design tokens wired
        </p>
      </div>
    </main>
  )
}

export default App
