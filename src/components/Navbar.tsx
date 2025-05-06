import React, { useState } from "react"
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink, navigationMenuTriggerStyle } from "@/components/ui/navigation-menu"
import { Link } from "react-router-dom"

const Navbar = () => {
  const [open, setOpen] = useState(false)
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault()
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setOpen(false)
  }
  return (
    <>
      <header className="fixed top-0 left-0 z-40 w-full backdrop-blur-lg bg-white/80 border-b shadow-sm">
        <div className="container flex items-center justify-between h-16 mx-auto px-2 sm:px-4 md:px-8">
          <div className="flex items-center gap-2">
            <img src="/images/logo.png" alt="Memory Lab Logo" className="h-12 w-12" />
            <span className="font-semibold text-xl text-secondary">Memory Lab</span>
          </div>

          <button className="md:hidden p-2" onClick={() => setOpen(!open)} aria-label="Toggle menu">
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <div className="hidden md:flex flex-1 overflow-x-auto justify-end">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuLink asChild className={navigationMenuTriggerStyle() + " bg-transparent text-sm md:text-base transition-all duration-300 hover:text-primary"}>
                    <Link to="#gallery" onClick={(e) => handleNavClick(e, 'gallery')}>作品展示</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink asChild className={navigationMenuTriggerStyle() + " bg-transparent text-sm md:text-base transition-all duration-300 hover:text-primary"}>
                    <Link to="#services" onClick={(e) => handleNavClick(e, 'services')}>服務方案</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink asChild className={navigationMenuTriggerStyle() + " bg-transparent text-sm md:text-base transition-all duration-300 hover:text-primary"}>
                    <Link to="#pricing" onClick={(e) => handleNavClick(e, 'pricing')}>價格與優惠</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink asChild className={navigationMenuTriggerStyle() + " bg-transparent text-sm md:text-base transition-all duration-300 hover:text-primary"}>
                    <Link to="#contact" onClick={(e) => handleNavClick(e, 'contact')}>預約聯絡</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        </div>
      </header>
      <div className="h-16"></div>
      {open && (
        <div className="md:hidden fixed top-16 left-0 w-full bg-white border-b shadow-md z-30">
          <ul className="flex flex-col p-4 space-y-2">
            <li><Link to="#gallery" className="block text-base hover:text-primary" onClick={(e) => handleNavClick(e, 'gallery')}>作品展示</Link></li>
            <li><Link to="#services" className="block text-base hover:text-primary" onClick={(e) => handleNavClick(e, 'services')}>服務方案</Link></li>
            <li><Link to="#pricing" className="block text-base hover:text-primary" onClick={(e) => handleNavClick(e, 'pricing')}>價格與優惠</Link></li>
            <li><Link to="#contact" className="block text-base hover:text-primary" onClick={(e) => handleNavClick(e, 'contact')}>預約聯絡</Link></li>
          </ul>
        </div>
      )}
    </>
  )
}

export default Navbar
