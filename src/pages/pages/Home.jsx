import { site } from '../util/content.js'
import { homePage } from '../util/seo.js'
import { homeSections } from '../util/sections.js'
import Seo from '../components/Seo'
import Hero from '../components/sections/Hero'
import About from '../components/sections/About'
import Skills from '../components/sections/Skills'
import Experience from '../components/sections/Experience'
import Projects from '../components/sections/Projects'
import LatestBlogs from '../components/sections/LatestBlogs'
import Contact from '../components/sections/Contact'

const SECTIONS = { about: About, skills: Skills, experience: Experience, projects: Projects, latestBlogs: LatestBlogs, contact: Contact }

export default function Home() {
  return (
    <div className="space-y-24 md:space-y-32">
      <Seo page={homePage(site)} />
      <Hero />
      {homeSections(site).map(({ key, id }) => {
        const Section = SECTIONS[key]
        return <Section key={key} id={id} />
      })}
    </div>
  )
}
