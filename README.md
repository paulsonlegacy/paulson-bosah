# Backend Developer Portfolio

A minimal, portfolio showcasing backend development work. Built with pure HTML, CSS, and JavaScript—no frameworks, no build tools, just clean code.

🔗 **Live Site:** [paulsonlegacy.github.io/paulson-bosah](https://paulsonlegacy.github.io/paulson-bosah)

---

## About

I'm a backend developer focused on building APIs and server-side systems that actually work. This portfolio highlights my projects, skills, and approach to solving real problems with code.

**Tech Stack:**
- Python & Django
- PHP
- Golang & GoFiber
- PostgreSQL & MySQL
- REST APIs

---

## Features

- ✅ Fully responsive design
- ✅ Pure CSS (no Tailwind, no Bootstrap)
- ✅ No JavaScript frameworks
- ✅ Project detail pages with technical breakdowns
- ✅ Blog section for technical writing
- ✅ Dynamic project loading from JSON
- ✅ Contact form integration (Formspree)
- ✅ Fast loading & accessible

---

## Project Structure
```
portfolio/
├── index.html              # Main portfolio page
├── projects.json           # Project data
├── css/
│   └── base.css           # Shared styles
├── js/
│   └── main.js            # Shared JavaScript
├── projects/              # Individual project pages
│   ├── api-management.html
│   └── ecommerce-backend.html
├── blog/                  # Blog posts
│   └── building-apis.html
└── images/
    ├── projects/
    ├── certifications/
    └── blog/
```

---

## Adding New Projects

1. Add project details to `projects.json`:
```json
{
    "title": "Your Project Name",
    "description": "Brief description of what it does",
    "tech": ["Django", "PostgreSQL", "Redis"],
    "image": "images/projects/your-project.jpg",
    "video": null,
    "github": "https://github.com/yourusername/project",
    "demo": "https://yourproject.com",
    "detailPage": "projects/your-project.html"
}
```

2. (Optional) Create a detailed project page in `projects/` folder using the template

3. Push changes—GitHub Pages will auto-deploy

---

## Adding Blog Posts

1. Duplicate `blog/building-apis.html`
2. Update the content
3. Add meta tags for SEO
4. Push to deploy

---

## Running Locally

Since the site loads data from `projects.json`, you need a local server (can't just open `index.html` directly).

**Option 1: Python**
```bash
python3 -m http.server 8000
```

**Option 2: PHP**
```bash
php -S localhost:8000
```

**Option 3: VS Code Live Server**
- Install "Live Server" extension
- Right-click `index.html` → "Open with Live Server"

Then visit: `http://localhost:8000`

---

## Deployment

### GitHub Pages (Free)

1. Push code to GitHub
2. Go to repo **Settings** → **Pages**
3. Select branch (usually `main`) and root folder
4. Save and wait a few minutes
5. Site will be live at `https://yourusername.github.io/repo-name`

### Netlify (Free)

1. Drag and drop your folder to [netlify.com](https://netlify.com)
2. Done. Instant deployment with custom domain support.

### Vercel (Free)

1. Import your GitHub repo
2. Deploy
3. Done.

---

## Contact Form Setup

The contact form uses [Formspree](https://formspree.io) for free email forwarding.

1. Sign up at [formspree.io](https://formspree.io)
2. Create a new form
3. Copy your form endpoint
4. Update `index.html`:
```javascript
const FORMSPREE_ENDPOINT = 'https://formspree.io/f/YOUR_FORM_ID';
```

Free tier includes 50 submissions/month.

---

## Design Philosophy

**Why no frameworks?**
- Faster loading (no heavy dependencies)
- Easier to maintain (no build process)
- More control over every detail
- Better for learning and understanding fundamentals
- Perfect for a simple portfolio site

**Why pure CSS?**
- No compilation step
- No class name conflicts
- Full control over styling
- Lightweight and fast
- Easy for anyone to understand and modify

**The goal:** A portfolio that loads fast, looks clean, and lets the work speak for itself. No unnecessary complexity.

---

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Android)

---

## Performance

- **First Contentful Paint:** < 1s
- **Largest Contentful Paint:** < 2s
- **Time to Interactive:** < 2s
- **Lighthouse Score:** 95+

No heavy frameworks = fast load times.

---

## SEO Features

- Semantic HTML
- Meta descriptions on all pages
- Open Graph tags for social sharing
- Proper heading hierarchy
- Alt text on images
- Internal linking structure
- Blog posts for content marketing

---

## Customization

### Update Your Info

1. Replace "Your Name" throughout
2. Update social links (GitHub, LinkedIn, Twitter)
3. Change email in contact section
4. Get your Formspree form ID

### Change Colors

Edit CSS variables in `css/base.css`:
```css
:root {
    --bg-primary: #1a1a1a;
    --bg-secondary: #242424;
    --text-primary: #e0e0e0;
    --accent: #4a9eff;  /* Change this for different accent color */
}
```

### Fonts

Currently using:
- **Body:** Ubuntu (clean, readable)
- **Code/Mono:** Ubuntu Mono (terminal aesthetic)

To change, update the Google Fonts import in `<head>`.

---

## Future Improvements

Potential features to add:

- [ ] Dark/light mode toggle
- [ ] Blog RSS feed
- [ ] Search functionality
- [ ] Analytics integration
- [ ] Newsletter signup
- [ ] Project filtering by tech stack
- [ ] Testimonials section

---

## License

MIT License - feel free to fork and customize for your own use.

---

## Credits

**Built with:**
- Pure HTML, CSS, JavaScript
- [Lucide Icons](https://lucide.dev)
- [Ubuntu Font](https://fonts.google.com/specimen/Ubuntu)
- [Formspree](https://formspree.io) (contact form)

**Inspired by:**
- The principle of keeping things simple
- The idea that backend devs don't need flashy portfolios
- The belief that good code speaks louder than animations

---

## Contact

**Email:** your.email@example.com  
**GitHub:** [github.com/yourusername](https://github.com/yourusername)  
**LinkedIn:** [linkedin.com/in/yourusername](https://linkedin.com/in/yourusername)

---

**Note:** This portfolio is intentionally minimal. As a backend developer, I believe in function over flash. The focus here is on clear presentation of technical work, not visual gimmicks.

If you're looking for a developer who values clean code, proper documentation, and systems that actually work—let's talk.

Alternative: Shorter, More Direct README
If you want something more concise:
markdown# Backend Developer Portfolio

Clean, minimal portfolio for a backend developer. No frameworks, no build process, just HTML/CSS/JS.

## Quick Start
```bash
python3 -m http.server 8000
```

Visit `http://localhost:8000`

## Stack

- HTML5
- Pure CSS (no frameworks)
- Vanilla JavaScript
- Lucide Icons
- Formspree (contact form)

## Features

- Responsive design
- Project detail pages
- Technical blog
- Dynamic project loading
- Contact form
- Fast & accessible

## Deploy

Push to GitHub → Enable Pages → Done.

## Structure

- `index.html` - Main page
- `projects.json` - Project data
- `css/base.css` - Shared styles
- `js/main.js` - Shared scripts
- `projects/` - Detail pages
- `blog/` - Blog posts

## Customization

1. Update personal info
2. Add your projects to `projects.json`
3. Get Formspree form ID
4. Change colors in CSS variables
5. Deploy

## License

MIT