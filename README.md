# Sarthak Sharma / Sumit Aggarwal — Premium 3D Developer Portfolio

A dark-aesthetic, editorial 3D personal portfolio engineered with React 18, Vite, Tailwind CSS, Motion, Three.js, React Three Fiber, Lenis smooth scroll, and custom GLSL shaders.

## Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Run local development server
npm run dev

# 3. Production build
npm run build
```

The application runs locally at `http://localhost:5173`.

---

## How to Edit Content

All portfolio content is decoupled from components and managed under `src/content/`:

- `src/content/biography.js`: Name, designation, taglines, summary, location, availability badge text, and portrait path.
- `src/content/navigation.js`: Header anchor links and section order.
- `src/content/milestones.js`: Numerical benchmarks (LeetCode problems, overall DSA count, AWS certification, and difficulty breakdown).
- `src/content/academicJourney.js`: 10th, 12th, and B.Tech timeline chapters, CGPA/marks, institutions, and achievements.
- `src/content/selectedWork.js`: Projects with descriptions, categories, tech tags, GitHub links, and live demos.
- `src/content/credentials.js`: Industry certifications, validation IDs, and direct verification URLs.
- `src/content/connectChannels.js`: WhatsApp link with prefilled message, email, GitHub, LinkedIn, LeetCode, and resume download.

---

## Deploy to Vercel

1. Push your code to a GitHub repository:
   ```bash
   git init
   git add .
   git commit -m "feat: initial commit of 3d portfolio"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<repo-name>.git
   git push -u origin main
   ```
2. Import the project on [Vercel](https://vercel.com).
3. Framework Preset: **Vite**.
4. Root Directory: `./`.
5. Build Command: `npm run build`.
6. Output Directory: `dist`.
7. Click **Deploy**.
