# Portfolio

A minimalist, high-performance developer portfolio built with a focus on speed, clean typography, and a developer-first aesthetic. Designed specifically for backend software engineers.

## 🚀 Features & Specifications

* **Tech Stack:** Built with a modern static site setup, utilizing clean semantic markup and modern tooling.
* **Dynamic Configuration:** Nearly the entire site is centrally managed via a single configuration file (`src/content/site.json`).
* **Command Palette (`Ctrl/Cmd + K`):** Quick-switcher navigation allowing visitors to search pages, articles, projects, and execute actions instantly.
* **Theme Customization:** Native support for system-preferred, light, and dark appearance modes with customizable accent colors.
* **Content Management:**
  * **Blog Posts:** Markdown-driven blog engine (`src/content/blogs/*.md`) featuring automatic reading progress indicators and author metadata blocks.
  * **Projects:** Structured project showcase configuration (`src/content/projects.md`).
* **Interactive Elements:** Smooth marquee tech stack layout, section scroll-reveal transitions, and a built-in interactive Gopher hero element.
* **SEO Optimized:** Fully integrated canonical URLs, custom Open Graph share cards, structured job title data, and auto-generated XML sitemaps.

---

## 📂 Project Structure

| What | Where |
| --- | --- |
| Site Configuration | `src/content/site.json` |
| Blog Posts | `src/content/blogs/*.md` |
| Projects | `src/content/projects.md` |
| Resume PDF | `public/files/` |
| Share Card / Images | `public/images/` |
| Configuration Guide | `docs/CONFIGURATION.md` |

---

## ⚙️ Configuration

For a comprehensive breakdown of all settings—including SEO fields, color palettes, motion effects, navigation toggles, and home page section ordering—please refer to the [Portfolio Configuration Guide](CONFIGURATION.md).

---

## 🛠️ Getting Started

1. **Clone the repository:**
  ```bash
  git clone [https://github.com/aprimr/portfolio.git](https://github.com/aprimr/portfolio.git)
  cd portfolio
  ```
2. **Run the development server:**
  ```Bash
  npm run dev
  ```

3. **Build for production:**
  ```Bash
  npm run build
  ```