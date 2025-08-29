import Header from './Header'
import BottomNav from './BottomNav'

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="pb-16"> {/* Bottom nav spacing */}
        {children}
      </main>
      <BottomNav />
    </div>
  )
}