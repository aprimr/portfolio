import { Outlet } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import siteData from '../content/site.json'

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col font-sans">
      <Header nav={siteData.nav} brand={siteData.brand} />
      <main className="flex-1 w-full max-w-content mx-auto px-6 md:px-8 py-16 md:py-24">
        <Outlet />
      </main>
      <Footer footer={siteData.footer} />
    </div>
  )
}