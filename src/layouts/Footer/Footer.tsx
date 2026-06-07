import './Footer.css';

const footerLinks = [
  { href: 'https://github.com/paulsonlegacy', label: 'GitHub' },
  { href: 'https://www.linkedin.com/in/paulson-bosah', label: 'LinkedIn' },
  { href: 'https://x.com/paulsonlegacy', label: 'X' },
  { href: 'https://wa.link/5iy3zb', label: 'Phone' },
]

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__container">
        <p className="footer__text">2025 Paulson Bosah. Built with React.</p>
        <div className="footer__links">
          {footerLinks.map((link) => (
            <a
              href={link.href}
              className="footer__link"
              target="_blank"
              rel="noopener noreferrer"
              key={link.href}
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}

export default Footer
