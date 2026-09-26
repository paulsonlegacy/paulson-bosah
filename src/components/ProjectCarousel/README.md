# ProjectCarousel

A simple image carousel for project detail pages. Shows one image at a time with prev/next navigation and a counter. Returns `null` if the images array is empty.

## Import

```tsx
import ProjectCarousel from '@/components/ProjectCarousel/ProjectCarousel';
```

## Props

| Prop | Type | Description |
|------|------|-------------|
| `images` | `string[]` | Array of image URLs (can be local resolved paths or Cloudinary URLs) |
| `alt` | `string` | Alt text prefix — each image gets `"[alt] screenshot [n]"` |

---

## Usage

### Basic

```tsx
<ProjectCarousel
  images={['https://res.cloudinary.com/.../screen1.png', 'https://res.cloudinary.com/.../screen2.png']}
  alt="QuickAir"
/>
```

### From project data

```tsx
import projectsData from '@/assets/json/projects.json';
import { resolveProjectImage } from '@/utils/general';

const project = projectsData.find(p => p.title === 'QuickAir')!;

// resolveProjectImage handles local filenames and passes through URLs unchanged
const images = project.images.map(img => resolveProjectImage(img)).filter(Boolean) as string[];

<ProjectCarousel images={images} alt={project.title} />
```

### Single image (no controls shown)

```tsx
// When images.length === 1, the prev/next controls and counter are hidden.
<ProjectCarousel images={[singleUrl]} alt="Preview" />
```

### Side by side with a video

```tsx
<div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
  <video src={project.video} poster={images[0]} controls preload="metadata" />
  <ProjectCarousel images={images} alt={project.title} />
</div>
```

---

## Notes

- Navigation wraps around — pressing prev on the first image goes to the last.
- If `images` is an empty array the component renders nothing.
- The 16:9 aspect-ratio frame (`carousel__frame`) crops images with `object-fit: cover`. Portrait images will be centre-cropped; use landscape screenshots for best results.
- To add more screenshots to a project, add their Cloudinary URLs to the `images` array in `src/assets/json/projects.json`. The carousel picks them up automatically.
