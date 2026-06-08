import { useState } from 'react'
import type { FormEvent } from 'react'
import backendEngineeringImage from '@/assets/images/Fundamentals_Of_Backend_Engineering.jpg'
import databaseEngineeringImage from '@/assets/images/Fundamentals_Of_Database_Engineering.jpg'
import conexiaImage from '@/assets/images/conexia.png'
import projectsData from '@/assets/json/projects.json'
import Footer from '@/layouts/Footer/Footer'
import Header from '@/layouts/Header/Header'
import './Home.css'

type Project = {
  title: string
  description: string
  tech: string[]
  image: string | null
  video: string | null
  github: string | null
  demo: string | null
  detailPage: string | null
}

type FormStatus = {
  type: 'idle' | 'success' | 'error'
  message: string
}

const formspreeEndpoint = 'https://formspree.io/f/xkognpzl'
const projects = projectsData as Project[]

const skills = [
  'Python',
  'Django',
  'PHP',
  'Golang',
  'GoFiber',
  'REST APIs',
  'PostgreSQL',
  'MySQL',
  'Git',
]

const projectImages: Record<string, string> = {
  'images/conexia.png': conexiaImage,
}

function resolveProjectImage(path: string | null) {
  if (!path) return null

  if (/^https?:\/\//.test(path)) {
    return path
  }

  return projectImages[path] ?? null
}

function Home() {
  const [isSending, setIsSending] = useState(false)
  const [formStatus, setFormStatus] = useState<FormStatus>({
    type: 'idle',
    message: '',
  })

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const form = event.currentTarget
    const formData = new FormData(form)

    setIsSending(true)
    setFormStatus({ type: 'idle', message: '' })

    try {
      const response = await fetch(formspreeEndpoint, {
        method: 'POST',
        body: formData,
        headers: {
          Accept: 'application/json',
        },
      })

      if (!response.ok) {
        throw new Error('Form submission failed')
      }

      setFormStatus({
        type: 'success',
        message: "Message sent successfully! I'll get back to you soon.",
      })
      form.reset()
    } catch (error) {
      console.error('Error sending message:', error)
      setFormStatus({
        type: 'error',
        message: 'Failed to send message. Please try again or email me directly.',
      })
    } finally {
      setIsSending(false)
    }
  }

  return (
    <>
      <Header />

      <main>
        <section className="hero">
          <div className="container">
            <div className="hero__terminal" aria-label="Terminal introduction">
              <div className="terminal__line">
                <span className="terminal__prompt">paulson@portfolio:~$</span>
                <span className="terminal__command"> ./introduce.sh</span>
              </div>
              <div className="terminal__line">
                <span className="terminal__output">
                  Initializing backend developer profile...
                </span>
              </div>
              <div className="terminal__line">
                <span className="terminal__output">
                  Loading skills: [Python, Django, Golang, PHP]
                </span>
              </div>
              <div className="terminal__line">
                <span className="terminal__output">Status: Available for work</span>
              </div>
            </div>

            <div className="hero__intro">
              <h1 className="hero__title">Backend Developer</h1>
              <p className="hero__subtitle">
                I build APIs and reliable server-side systems and backend APIs. I
                focus on writing clean, maintainable code and solving real problems.
                No frontend drama, just solid backend work.
              </p>
              <a href="#contact" className="hero__cta">
                Get in touch
              </a>
            </div>
          </div>
        </section>

        <section className="section" id="about">
          <div className="container">
            <div className="section__header">
              <h2 className="section__title">About</h2>
              <p className="section__description">Who I am and what I do</p>
            </div>
            <div className="about__content">
              <p>
                I'm a backend developer focusing on building systems that actually
                work. I handle APIs, databases, and server-side logic. My thing is to
                write code other developers can understand and maintain without
                stress.
              </p>
              <p>
                I work mainly with Python (Django), PHP, and Golang. I solve
                problems around data processing, API design, system architecture and
                AI integration. I'm that person can debug your production issues and
                make sure the server doesn't crash at 3 AM.
              </p>
              <p>
                When I don't code, I either plan and work on my SaaS projects or take
                courses to learn more. I believe in building useful things, not just
                coding for vibes.
              </p>
            </div>
          </div>
        </section>

        <section className="section" id="skills">
          <div className="container">
            <div className="section__header">
              <h2 className="section__title">Skills</h2>
              <p className="section__description">Tools and stacks I use</p>
            </div>
            <div className="skills__list">
              {skills.map((skill) => (
                <div className="skill__item" key={skill}>
                  {skill}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section" id="certifications">
          <div className="container">
            <div className="section__header">
              <h2 className="section__title">Certifications</h2>
            </div>
            <div className="certifications__grid">
              <article className="certification__card">
                <div className="certification__image">
                  <img
                    src={backendEngineeringImage}
                    alt="Fundamentals Of Backend Engineering"
                  />
                </div>
                <div className="certification__content">
                  <h3 className="certification__title">
                    Fundamentals Of Backend Engineering
                  </h3>
                  <p className="certification__issuer">Hussein Nasser (UDEMY)</p>
                  <div className="certification__meta">
                    <span className="certification__date">Nov 2024</span>
                    <a
                      href="https://www.udemy.com/certificate/UC-ff75ea52-f7f3-46ae-8a1f-8f5fd0846e8a/"
                      className="certification__link"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Verify
                    </a>
                  </div>
                </div>
              </article>

              <article className="certification__card">
                <div className="certification__image">
                  <img
                    src={databaseEngineeringImage}
                    alt="Fundamentals Of Database Engineering"
                  />
                </div>
                <div className="certification__content">
                  <h3 className="certification__title">
                    Fundamentals Of Database Engineering
                  </h3>
                  <p className="certification__issuer">Hussein Nasser (UDEMY)</p>
                  <div className="certification__meta">
                    <span className="certification__date">Dec 2024</span>
                    <a
                      href="https://www.udemy.com/certificate/UC-91dab23f-d4d6-4fb0-9398-6169da963bcd/"
                      className="certification__link"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Verify
                    </a>
                  </div>
                </div>
              </article>
            </div>
          </div>
        </section>

        <section className="section" id="projects">
          <div className="container">
            <div className="section__header">
              <h2 className="section__title">Projects</h2>
              <p className="section__description">Things I've build</p>
            </div>
            <div className="projects__container" id="projectsContainer">
              {projects.length === 0 && (
                <div className="projects__error">No projects found.</div>
              )}

              {projects.map((project) => {
                const image = resolveProjectImage(project.image)

                return (
                  <article className="project__item" key={project.title}>
                    <div className="project__header">
                      <h3 className="project__title">{project.title}</h3>
                      <div className="project__links">
                        {project.github && (
                          <a
                            href={project.github}
                            className="project__link"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            code
                          </a>
                        )}
                        {project.demo && (
                          <a
                            href={project.demo}
                            className="project__link"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            demo
                          </a>
                        )}
                      </div>
                    </div>
                    <p className="project__description">{project.description}</p>
                    <div className="project__tech">
                      {project.tech.map((tech) => (
                        <span className="tech__badge" key={tech}>
                          {tech}
                        </span>
                      ))}
                    </div>
                    <div className="project__media">
                      {project.video ? (
                        <iframe
                          src={project.video}
                          title={`${project.title} demo video`}
                          allowFullScreen
                        />
                      ) : image ? (
                        <img src={image} alt={project.title} />
                      ) : (
                        <span className="project__placeholder">
                          [ no screenshot available ]
                        </span>
                      )}
                    </div>
                  </article>
                )
              })}
            </div>
          </div>
        </section>

        <section className="section" id="contact">
          <div className="container">
            <div className="section__header">
              <h2 className="section__title">Contact</h2>
              <p className="section__description">Let's link up</p>
            </div>
            <div className="contact__grid">
              <div className="contact__info">
                <p>
                  I'm available for collaborations, contract projects, gigs or
                  full-time opportunities. If you have project that needs solid
                  backend work, feel free to hit me up.
                </p>
                <ul className="contact__list">
                  <li className="contact__item">
                    <span aria-hidden="true">@</span>
                    <a
                      href="mailto:paulsonbosah@gmail.com"
                      className="contact__link"
                    >
                      paulsonbosah@gmail.com
                    </a>
                  </li>
                  <li className="contact__item">
                    <span aria-hidden="true">git</span>
                    <a
                      href="https://github.com/paulsonlegacy"
                      className="contact__link"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      github.com/paulsonlegacy
                    </a>
                  </li>
                  <li className="contact__item">
                    <span aria-hidden="true">in</span>
                    <a
                      href="https://linkedin.com/in/paulson-bosah"
                      className="contact__link"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      linkedin.com/in/paulson-bosah
                    </a>
                  </li>
                  <li className="contact__item">
                    <span aria-hidden="true">x</span>
                    <a
                      href="https://x.com/paulsonlegacy"
                      className="contact__link"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      @paulsonlegacy
                    </a>
                  </li>
                </ul>
              </div>
              <div className="contact__form__wrapper">
                <form className="contact__form" onSubmit={handleSubmit}>
                  <div className="form__group">
                    <label className="form__label" htmlFor="name">
                      name:
                    </label>
                    <input
                      className="form__input"
                      type="text"
                      id="name"
                      name="name"
                      required
                    />
                  </div>
                  <div className="form__group">
                    <label className="form__label" htmlFor="email">
                      email:
                    </label>
                    <input
                      className="form__input"
                      type="email"
                      id="email"
                      name="email"
                      required
                    />
                  </div>
                  <div className="form__group">
                    <label className="form__label" htmlFor="message">
                      message:
                    </label>
                    <textarea
                      className="form__textarea"
                      id="message"
                      name="message"
                      required
                    />
                  </div>
                  <button className="form__button" type="submit" disabled={isSending}>
                    {isSending ? 'sending...' : 'send_message()'}
                  </button>
                  {formStatus.type !== 'idle' && (
                    <div className={`form__message ${formStatus.type}`}>
                      {formStatus.message}
                    </div>
                  )}
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}

export default Home
