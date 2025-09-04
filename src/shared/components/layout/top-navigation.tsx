import { Button } from "@shared/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@shared/components/ui/dropdown-menu"
import { Bell, Check, Monitor, Moon, Sun, User } from "lucide-react"
import { useTheme } from "@shared/components/ui/hooks/use-theme"
import type { Theme } from "@shared/components/ui/hooks/use-theme"
import { useAuthStore } from "@features/auth/hooks/useAuthStore"
import { useNavigate } from "react-router-dom"
interface TopNavigationProps {
  className?: string
}
const themeOptions: { value: Theme; label: string; icon: React.ElementType }[] = [
  { value: "light", label: "Light", icon: Sun },
  { value: "dark", label: "Dark", icon: Moon },
  { value: "system", label: "System", icon: Monitor },
]

export function TopNavigation({ className }: TopNavigationProps) {
  const { theme, setTheme } = useTheme()
  const { logout } = useAuthStore();
  const navigate = useNavigate();

  function handleSignOut() {
    logout();
    navigate("/login");
  }

  function handleProfile() {
    // Profile handling to be implemented
  }

  function handleSettings() {
    // Settings handling to be implemented
  }

  function handleNotifications() {
    // Notifications handling to be implemented
  }

  const ThemeIcon =
    themeOptions.find(option => option.value === theme)?.icon || Monitor

  return (
    <header
      className={`flex h-14 items-center justify-end border-b bg-background px-6 ${
        className || ""
      }`}
    >
      {/* Right side controls */}
      <div className="flex items-center gap-4">
        {/* Theme switcher */}
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-9 w-9">
              <ThemeIcon className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {themeOptions.map(option => (
              <DropdownMenuItem
                key={option.value}
                onClick={() => setTheme(option.value)}
              >
                <option.icon className="mr-2 h-4 w-4" />
                {option.label}
                {theme === option.value && <Check className="ml-auto h-4 w-4" />}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Notifications */}
        <Button
          variant="ghost"
          size="icon"
          className="h-9 w-9 relative"
          onClick={handleNotifications}
        >
          <Bell className="h-4 w-4" />
          <span className="absolute -top-1 -right-1 h-2 w-2 bg-destructive rounded-full" />
        </Button>

        {/* User menu */}
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-9 w-9">
              <User className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={handleProfile}>Profile</DropdownMenuItem>
            <DropdownMenuItem onClick={handleSettings}>
              Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={handleSignOut}
              className="text-destructive"
            >
              Sign out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
