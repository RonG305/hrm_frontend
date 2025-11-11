"use client"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useState } from "react"

export function ThemeToggle() {
  const { setTheme } = useTheme()
   const [uiTheme, setUiTheme] = useState<string>("light")

   const handleThemeChange = () => {
        setTheme(uiTheme === "light" ? "dark" : "light")
        setUiTheme((prevTheme: string) => (prevTheme === "light" ? "dark" : "light"))
    }
  

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button onClick={handleThemeChange} variant="outline" className="rounded-full" size="icon">
          <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
    </DropdownMenu>
  )
}
