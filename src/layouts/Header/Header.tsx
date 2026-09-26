import { useState } from 'react';
import { LuMenu, LuX } from 'react-icons/lu';
import './Header.css';

const navLinks = [
  { href: '/#about', label: 'about' },
  { href: '/#skills', label: 'skills' },
  { href: '/#projects', label: 'projects' },
  { href: '/#contact', label: 'contact' },
]

function Header() {
  const [isNavOpen, setIsNavOpen] = useState(false)

  const closeNav = () => setIsNavOpen(false)

  return (
    <header className="header">
      <div className="header__container">
        <a href="/" className="header__logo" onClick={closeNav}>
          $ <span>Paulson Bosah</span>
        </a>

        <nav className="nav" aria-label="Primary navigation">
          <ul className={`nav__list ${isNavOpen ? 'active' : ''}`} id="navList">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="nav__link" onClick={closeNav}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <button
          type="button"
          className={`nav__toggle${isNavOpen ? ' nav__toggle--open' : ''}`}
          aria-controls="navList"
          aria-expanded={isNavOpen}
          aria-label="Toggle navigation"
          onClick={() => setIsNavOpen((open) => !open)}
        >
          {isNavOpen ? <LuX size={22} /> : <LuMenu size={22} />}
        </button>
      </div>
    </header>
  )
}

export default Header
