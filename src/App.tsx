import { BrowserRouter, Routes, Route, Link, useNavigate } from "react-router-dom"
import { useState } from "react"

// Composant réutilisable = exigence prof
function EventCard({ nom, date, participants }: { nom: string, date: string, participants: number }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow hover:shadow-xl transition">
      <h3 className="font-bold text-xl mb-2 text-blue-600">{nom}</h3>
      <p className="text-gray-600">📅 {date}</p>
      <p className="text-gray-600">👥 {participants} participants</p>
    </div>
  )
}

function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white p-4">
      <div className="text-center max-w-2xl">
        <h1 className="text-5xl md:text-6xl font-bold mb-4">Gestion Événements</h1>
        <p className="text-xl md:text-2xl mb-8">Créez, gérez et suivez vos événements en toute simplicité</p>
        <div className="flex flex-col space-y-4 items-center">
          <Link to="/auth" className="bg-white text-blue-600 px-8 py-4 rounded-lg font-bold w-64 text-center text-lg hover:bg-gray-100">Se connecter</Link>
          <Link to="/dashboard" className="border-2 border-white px-8 py-4 rounded-lg font-bold w-64 text-center text-lg hover:bg-white hover:text-blue-600">Voir Dashboard</Link>
        </div>
      </div>
    </div>
  )
}

function Auth() {
  const [connecte, setConnecte] = useState(false)
  const [email, setEmail] = useState("")
  const navigate = useNavigate()

  const handleLogin = () => {
    if(email) {
      setConnecte(true)
      setTimeout(() => navigate("/dashboard"), 1000)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-center text-blue-600">Connexion</h2>
        {connecte? (
          <p className="text-green-600 font-bold text-center text-xl">✅ Redirection...</p>
        ) : (
          <>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border-2 rounded mb-4 focus:border-blue-600 outline-none"
              placeholder="Email"
            />
            <input
              type="password"
              className="w-full p-3 border-2 rounded mb-4 focus:border-blue-600 outline-none"
              placeholder="Mot de passe"
            />
            <button onClick={handleLogin} className="w-full bg-blue-600 text-white p-3 rounded font-bold hover:bg-blue-700">
              Login
            </button>
          </>
        )}
        <Link to="/" className="block mt-4 text-blue-600 text-center underline">Retour Accueil</Link>
      </div>
    </div>
  )
}

function Dashboard() {
  // State = exigence prof
  const [events] = useState([
    {id: 1, nom: "Conférence Tech Dakar", date: "20 Juin 2026", participants: 120},
    {id: 2, nom: "Workshop React", date: "25 Juin 2026", participants: 45},
    {id: 3, nom: "Meetup Design", date: "30 Juin 2026", participants: 80},
  ])

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8 flex-wrap gap-4">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800">Tableau de bord</h1>
          <Link to="/" className="bg-red-500 text-white px-4 py-2 rounded font-bold hover:bg-red-600">Déconnexion</Link>
        </div>

        <div className="bg-blue-600 text-white p-6 rounded-lg mb-8">
          <h2 className="text-2xl font-bold">Total Événements : {events.length}</h2>
          <p className="text-lg">Participants totaux : {events.reduce((a, b) => a + b.participants, 0)}</p>
        </div>

        <h2 className="text-2xl font-bold mb-4">Mes Événements</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map(e => (
            <EventCard key={e.id} nom={e.nom} date={e.date} participants={e.participants} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  )
}