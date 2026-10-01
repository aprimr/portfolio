# Portfolio Configuration Guide

Almost everything on the site is controlled from **one file**: `src/content/site.json`.
Keys that start with `_` (like `_help`) are notes for you and are ignored.

Content that is not in `site.json`:

| What | Where |
| --- | --- |
| Blog posts | `src/content/blogs/*.md` |
| Projects | `src/content/projects.md` |
| Resume PDF | `public/files/` |
| Images (share card, etc.) | `public/images/` |


---

## 1. `seo`: search and social previews

| Key | What it does |
| --- | --- |
| `siteUrl` | **Your real domain**, e.g. `https://example.com.np`. Used for canonical URLs, sitemap, and share cards. No trailing slash. |
| `title` | Title of the home page in Google (aim for under 60 characters). |
| `titleTemplate` | Title pattern for other pages. `%s` is replaced by the page title. |
| `description` | Home page description in Google (120 to 155 characters). |
| `jobTitle` | Shown in structured data (helps Google understand who you are). |
| `ogImage` | Default share image (1200x630) in `public/images/`. |
| `twitterHandle` | Your X/Twitter handle for share cards. |
| `locale` | Language/region, e.g. `en_US`. |

---

## 2. Top-level basics

| Key | What it does |
| --- | --- |
| `brand` | Your name in the header and structured data. |
| `openToWork` | `true` shows "Open to work" on Herosection. |
| `currentCompanyRole` | Optional text next to the pill. Empty hides it. |

---

## 3. `theme`: colours

Any CSS colour works (`#hex`, `rgb()`, `hsl()`). Delete a key to use its default.

| Key | Used for |
| --- | --- |
| `defaultMode` | `"system"` (visitor's OS preference), `"light"`, or `"dark"`. |
| `accent.light` / `accent.dark` | Highlight colour (focus rings, active link underline, highlights). |
| `light` / `dark` | Two palettes containing `background`, `foreground`, `muted`, `border`, and `surface`. |

---

## 4. `effects`: motion

Set any to `false` to switch it off. Visitors with "reduce motion" enabled in their OS never see animations.

| Key | Effect |
| --- | --- |
| `heroIntro` | Hero text fades up one line at a time on load. |
| `scrollReveal` | Sections fade in as you scroll to them. |
| `skillsMarquee` | Enables the scrolling skills row. |
| `readingProgress` | Thin progress line at the top of blog posts. |

---

## 5. `header`

| Key | What it does |
| --- | --- |
| `enabled` | Show or hide the whole header. |
| `sticky` | Header stays at the top while scrolling. |
| `showSearchButton` | Search button (opens the command palette). |
| `showThemeToggle` | Light/dark mode button toggle. |
| `nav` | Navigation links array. Use `{ "label": "Blogs", "url": "/blogs" }` or add `"external": true` for outside links. |

---

## 6. `commandPalette`: Ctrl/Cmd + K

| Key | What it does |
| --- | --- |
| `enabled` | Turn the whole feature on/off. |
| `placeholder` | Text displayed inside the search box. |
| `includeSections`, `includeArticles`, `includeProjects`, `includeLinks`, `includeActions` | Toggle search coverage across different categories. |

---

## 7. `hero`

| Key | What it does |
| --- | --- |
| `headline` | Main heading. Put `>>` right before the word that turns into the Gopher image (e.g., `with >>Go`). |
| `secondaryHeadline` | Sub-headline line directly under the heading. |
| `availabilityLabel` | Text inside the green availability pill. |
| `resumeUrl` / `resumeFileName` | Resume file path and download file name. |
| `githubUrl` | GitHub button link URL. |

---

## 8. Home page sections (`homeSectionOrder`)

Controls the sequence of sections on the home page: `["skills", "about", "experience", "projects", "latestBlogs", "contact"]`.

* **`skills`**: Controls the `marquee` or `grid` layout and the tech stack item strings.
* **`about`**: Contains the `heading` and an array of `paragraphs` for your bio.
* **`experience`**: Timeline items (newest first). Each item includes `period`, `role`, `company`, `description`, `tags`, and an optional `url`.
* **`projects`**: Configures the section header; project entries themselves live in `src/content/projects.md`.
* **`latestBlogs`**: Sets `count` for how many recent posts display and the `viewAllLabel`.
* **`contact`**: Configures the `prompt`, big `headline`, and email destination.

---

## 9. `blog`

| Key | What it does |
| --- | --- |
| `heading` | Title displayed on the `/blogs` page. |
| `seoTitle` | What Google shows for the blog index page. |
| `author.enabled` | Displays an author footer box at the end of every post. |
| `author.email` | Contact email linked in the author card. |

---

## 10. `footer`

| Key | What it does |
| --- | --- |
| `enabled` | Show or hide the footer. |
| `name` | Brand name string. |
| `showBackToTop` | "Back to top" helper button. |
| `links` | Social channels object (`github`, `linkedin`, `x`, `email`), each with `enabled` and `url`. |

---

## Blog post format (`src/content/blogs/*.md`)

```json
---
{
  "id": "url-slug-for-the-post",
  "enabled": true,
  "title": "Clear, specific title",
  "description": "120 to 155 characters shown in Google.",
  "tags": ["Go", "Backend"],
  "createdAt": "2026-08-16",
  "updatedAt": "2026-09-01",
  "image": "/images/optional-share-image.png"
}
---

# First section
Text content...