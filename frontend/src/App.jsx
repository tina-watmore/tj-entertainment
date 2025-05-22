import { Routes, Route } from 'react-router-dom';
import { Home, Upcoming, Favourites, Maybes, Watched, Login } from './pages';
import { Header, Footer, GoToTopBtn } from './component';
import { MovieProvider } from './context/MovieContext';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './component/ProtectedRoute';
import '../src/css/global.scss';
import '../src/css/resets.scss';

function App() {
  return (
    <AuthProvider>
        <MovieProvider>
          <div className='pageWrapper'>
            <Header />
            <main className='mainContent'>
              <Routes>
                <Route path='/login' element={<Login />}></Route>
                <Route path='/' element={<ProtectedRoute><Home /></ProtectedRoute>}></Route>
                <Route path='/favourites' element={<ProtectedRoute><Favourites /></ProtectedRoute>}></Route>
                <Route path='/upcoming' element={<ProtectedRoute><Upcoming /></ProtectedRoute>}></Route>
                <Route path='/maybes' element={<ProtectedRoute><Maybes /></ProtectedRoute>}></Route>
                <Route path='/watched' element={<ProtectedRoute><Watched /></ProtectedRoute>}></Route>
              </Routes>
            </main>
            <Footer />
            <GoToTopBtn />
          </div>
        </MovieProvider>
    </AuthProvider>
  )
}

export default App
