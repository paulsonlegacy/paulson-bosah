import { useState } from 'react'
import './ProjectCarousel.css'

type Props = {
  images: string[]
  alt: string
}

function ProjectCarousel({ images, alt }: Props) {
  const [index, setIndex] = useState(0)

  if (images.length === 0) return null

  const prev = () => setIndex((i) => (i - 1 + images.length) % images.length)
  const next = () => setIndex((i) => (i + 1) % images.length)

  return (
    <div className="carousel">
      <div className="carousel__frame">
        <img
          src={images[index]}
          alt={`${alt} screenshot ${index + 1}`}
          className="carousel__image"
        />
      </div>
      {images.length > 1 && (
        <div className="carousel__controls">
          <button className="carousel__btn" onClick={prev} type="button" aria-label="Previous image">
            ←
          </button>
          <span className="carousel__counter">
            {index + 1} / {images.length}
          </span>
          <button className="carousel__btn" onClick={next} type="button" aria-label="Next image">
            →
          </button>
        </div>
      )}
    </div>
  )
}

export default ProjectCarousel
