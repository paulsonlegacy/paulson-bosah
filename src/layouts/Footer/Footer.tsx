import { FaGithub, FaLinkedinIn, FaXTwitter, FaWhatsapp } from 'react-icons/fa6'
import './Footer.css';

const footerLinks = [
  { href: 'https://github.com/paulsonlegacy', label: 'GitHub', icon: FaGithub },
  { href: 'https://www.linkedin.com/in/paulson-bosah', label: 'LinkedIn', icon: FaLinkedinIn },
  { href: 'https://x.com/paulsonlegacy', label: 'X', icon: FaXTwitter },
  { href: 'https://wa.link/5iy3zb', label: 'WhatsApp', icon: FaWhatsapp },
]

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__container">
        <p className="footer__text">2025 Paulson Bosah. Built with Love.</p>
        <div className="footer__links">
          {footerLinks.map(({ href, label, icon: Icon }) => (
            <a
              href={href}
              className="footer__link"
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              key={href}
            >
              <Icon />
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}

export default Footer
