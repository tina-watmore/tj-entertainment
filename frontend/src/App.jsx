import { Routes, Route } from 'react-router';
import { Home, Upcoming, Favourites, Maybes, Watched } from './pages';
import { Header, Footer, GoToTopBtn } from './component';
import { MovieProvider } from './context/MovieContext';
import '../src/css/global.scss';
import '../src/css/resets.scss';

function App() {
  return (
    <MovieProvider>
      <div className='pageWrapper'>
        <Header />
        <main className='mainContent'>
          <Routes>
            <Route path='/' element={<Home />}></Route>
            <Route path='/favourites' element={<Favourites />}></Route>
            <Route path='/upcoming' element={<Upcoming />}></Route>
            <Route path='/maybes' element={<Maybes />}></Route>
            <Route path='/watched' element={<Watched />}></Route>
          </Routes>
        </main>
        <Footer />
        <GoToTopBtn />
      </div>
    </MovieProvider>
  )
}

export default App
