# For You — a small personal site

## 1. Add your photos
Drop 6 photos into the `images/` folder, named:

```
photo-1.jpg
photo-2.jpg
photo-3.jpg
photo-4.jpg
photo-5.jpg
photo-6.jpg
```

(Have more or fewer than 6? Open `index.html`, copy or delete a whole
`<section class="story-item">...</section>` block for each photo you add
or remove.)

If your files are `.png` or `.jpeg` instead of `.jpg`, update the matching
`src="images/photo-1.jpg"` in `index.html` to match.

## 2. Personalize the words
Open `index.html` in any text editor and search for `EDIT:` — every one
marks a line meant for you to change: the hero line, each photo caption,
the six notes, and the closing message + your name.

## 3. Host it for free
**Easiest — GitHub Pages (since you're already using a repo):**
1. Push this folder to a GitHub repository.
2. Go to the repo's **Settings → Pages**.
3. Under "Build and deployment", set **Source** to "Deploy from a branch",
   pick your main branch and the `/ (root)` folder, then save.
4. GitHub gives you a live link within a minute or two, usually
   `https://yourusername.github.io/repo-name/`.

**Also free, and just drag-and-drop:**
- [Netlify Drop](https://app.netlify.com/drop) — drag the whole folder in,
  get a link instantly.
- [Vercel](https://vercel.com) — import the repo, no config needed.

No build step, no dependencies — it's just the three files
(`index.html`, `style.css`, `script.js`) plus your images.
