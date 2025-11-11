import React, { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { assets } from '../assets/assets'
import { Menu, X, Search, TicketPlus } from 'lucide-react'
import { useClerk, useUser, UserButton } from '@clerk/clerk-react'

const NavBar = () => {
  const [open, setOpen] = useState(false)
  const { user } = useUser()
  const { openSignIn } = useClerk()
  const navigate = useNavigate()
  const location = useLocation()

  // Navigate to Theaters and force reload if already on the page
  const goToTheaters = () => {
    if (location.pathname.startsWith('/theaters')) {
      navigate('/theaters?reload=' + Date.now())
    } else {
      navigate('/theaters')
    }
    setOpen(false)
  }

  return (
    <div className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-6 md:px-16 lg:px-36 py-5 bg-black/70 backdrop-blur-md">
      
      <Link to="/" onClick={() => setOpen(false)}>
        <img src={assets.logo} alt="QuickShow" className="w-36 h-auto" />
      </Link>

      <div
        className={`${
          open ? 'flex' : 'hidden'
        } md:flex flex-col md:flex-row items-center gap-8 font-medium
          bg-black/70 md:bg-white/10 border border-gray-300/20
          rounded-full px-8 py-3 backdrop-blur-md
          absolute md:static top-0 left-0 h-screen md:h-auto w-full md:w-auto justify-center
          transition-all duration-300`}
      >
        <X
          onClick={() => setOpen(false)}
          className="absolute top-6 right-6 w-6 h-6 cursor-pointer md:hidden"
        />
        <Link to="/" className="hover:text-primary">Home</Link>
        <Link to="/movies" className="hover:text-primary">Movies</Link>
        <button
          onClick={goToTheaters}
          className="hover:text-primary bg-transparent border-none cursor-pointer font-medium"
        >
          Trailers
        </button>
        <Link to="/releases" className="hover:text-primary">Gaming</Link>
        <Link to="/favorite" className="hover:text-primary">Favorites</Link>
      </div>

      <div className="flex items-center gap-6">
        <Search className="w-6 h-6 cursor-pointer max-md:hidden" />
        {!user ? (
          <button
            onClick={openSignIn} 
            className="px-5 py-2 bg-[#ff0040] hover:bg-[#ff3366] text-white transition rounded-full font-medium"
          >
            Login
          </button>
        ) : (
          <UserButton>
            <UserButton.MenuItems>
              <UserButton.Action
                label="My Bookings"
                labelIcon={<TicketPlus width={15} />}
                onClick={() => navigate('/my-bookings')}
              />
            </UserButton.MenuItems>
          </UserButton>
        )}
        <Menu
          onClick={() => setOpen(true)}
          className="w-8 h-8 cursor-pointer md:hidden"
        />
      </div>
    </div>
  )
}

export default NavBar
