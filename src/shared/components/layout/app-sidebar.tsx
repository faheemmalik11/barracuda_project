import { useLocation, Link } from "react-router-dom"
import {
  ChevronRight,
  ChevronLeft,
  Star,
  MoreHorizontal,
} from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@shared/components/ui/sidebar"
import { useState, useEffect, memo } from "react"
import { cn } from "@shared/lib/utils"
import { usePinnedItems } from "@shared/components/ui/hooks/use-pinned-items"
import type { NavItem, NavSubItem } from "@shared/types/navigation"
import { navigationConfig } from "@shared/lib/configs/navigation-config"

// Sub-components for better readability and performance

const SidebarNavLink = memo(
  ({
    item,
    isActive,
    isFavorite = false,
    isPinned,
    togglePin,
  }: {
    item: NavItem
    isActive: boolean
    isFavorite?: boolean
    isPinned: boolean
    togglePin: (item: NavItem) => void
  }) => {
    const { open } = useSidebar()

    return (
      <SidebarMenuItem className="relative group/menuitem">
        <SidebarMenuButton asChild isActive={isActive} tooltip={item.title}>
          <Link to={item.url} className="flex items-center gap-2 w-full">
            <item.icon className="h-4 w-4 shrink-0" />
            <span className="group-data-[collapsible=icon]:hidden truncate">
              {item.title}
            </span>
          </Link>
        </SidebarMenuButton>
        {item.pinnable && !isFavorite && open && (
          <button
            onClick={() => togglePin(item)}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded opacity-0 group-hover/menuitem:opacity-100 hover:bg-muted transition-opacity duration-200 group-data-[collapsible=icon]:hidden"
            title={isPinned ? "Unpin" : "Pin"}
          >
            <Star
              size={14}
              className={
                isPinned
                  ? "text-accent fill-accent"
                  : "text-muted-foreground"
              }
            />
          </button>
        )}
      </SidebarMenuItem>
    )
  }
)

const SubmenuTooltip = memo(
  ({ item }: { item: Pick<NavItem, "title" | "children"> }) => (
    <div className="flex flex-col">
      <div className="px-3 py-2 text-xs font-semibold text-muted-foreground">
        {item.title}
      </div>
      <div className="flex flex-col">
        {item.children?.map(child => (
          <Link
            key={child.url}
            to={child.url}
            className="px-3 py-1.5 text-sm text-muted-foreground hover:bg-muted hover:text-foreground"
          >
            {child.title}
          </Link>
        ))}
      </div>
    </div>
  )
)

const SidebarCollapsibleMenu = memo(
  ({
    item,
    pathname,
  }: {
    item: NavItem & { children: NavSubItem[] }
    pathname: string
  }) => {
    const { open } = useSidebar()
    const [isOpen, setIsOpen] = useState(false)

    useEffect(() => {
      if (item.children?.some(child => child.url === pathname)) {
        setIsOpen(true)
      }
    }, [pathname, item.children])

    const handleToggle = () => setIsOpen(prev => !prev)

    return (
      <SidebarMenuItem>
        <SidebarMenuButton
          tooltip={
            !open
              ? {
                  children: <SubmenuTooltip item={item} />,
                  className: "p-0",
                  side: "right",
                  align: "start",
                  alignOffset: -8,
                }
              : item.title
          }
          onClick={handleToggle}
        >
          <item.icon className="h-4 w-4 shrink-0" />
          <span className="group-data-[collapsible=icon]:hidden truncate">
            {item.title}
          </span>
          <ChevronRight
            className={cn(
              "ml-auto h-4 w-4 transition-transform duration-200 group-data-[collapsible=icon]:hidden",
              isOpen && "rotate-90"
            )}
          />
        </SidebarMenuButton>
        {isOpen && open && (
          <div className="pl-5 mt-1 space-y-0 group-data-[collapsible=icon]:hidden">
            {item.children?.map(child => {
              const isChildActive = pathname === child.url
              return (
                <Link
                  key={child.title}
                  to={child.url}
                  className={cn(
                    "block px-2 py-1 text-sm rounded transition-colors duration-150 hover:bg-muted",
                    isChildActive
                      ? "text-primary font-medium"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {child.title}
                </Link>
              )
            })}
          </div>
        )}
      </SidebarMenuItem>
    )
  }
)

const BusinessToolsMenu = memo(
  ({
    items,
    pathname,
    isItemPinned,
    togglePin,
  }: {
    items: NavItem[]
    pathname: string
    isItemPinned: (item: NavItem) => boolean
    togglePin: (item: NavItem) => void
  }) => {
    const { open } = useSidebar()

    if (!open) {
      return (
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  tooltip={{
                    children: (
                      <SubmenuTooltip
                        item={{ title: "Business Tools", children: items }}
                      />
                    ),
                    className: "p-0",
                    side: "right",
                    align: "start",
                    alignOffset: -8,
                  }}
                >
                  <MoreHorizontal className="h-4 w-4 shrink-0" />
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      )
    }

    return (
      <SidebarGroup>
        <SidebarGroupLabel>Business tools</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            {items
              .filter(item => !isItemPinned(item))
              .map(item => (
                <SidebarNavLink
                  key={item.url}
                  item={item}
                  isActive={pathname === item.url}
                  isPinned={isItemPinned(item)}
                  togglePin={togglePin}
                />
              ))}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    )
  }
)

export function AppSidebar() {
  const { pathname } = useLocation()
  const { pinnedItems, togglePin, isItemPinned } = usePinnedItems(
    navigationConfig.allPinnable
  )
  const { open, setOpen } = useSidebar()

  const renderItem = (item: NavItem, isFavorite = false) => {
    if (item.children?.length) {
      return (
        <SidebarCollapsibleMenu
          key={item.url}
          item={item as NavItem & { children: NavSubItem[] }}
          pathname={pathname}
        />
      )
    }
    return (
      <SidebarNavLink
        key={item.url}
        item={item}
        isActive={pathname === item.url}
        isFavorite={isFavorite}
        isPinned={isItemPinned(item)}
        togglePin={togglePin}
      />
    )
  }

  return (
    <Sidebar
      className="transition-all duration-300 ease-in-out"
      collapsible="icon"
    >
      <SidebarHeader className="p-3">
        <div className="flex items-center gap-2 group-data-[collapsible=icon]:justify-center relative">
          <img
            src="/images/vinr-dark.svg"
            alt="Vinr logo"
            className="w-10 h-10"
          />
          <button
            onClick={() => setOpen(!open)}
            className="absolute right-0 top-1/2 -translate-y-1/2 p-1 rounded-md hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors duration-200 group-data-[collapsible=icon]:hidden"
            title="Toggle sidebar"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
        </div>
      </SidebarHeader>

      <SidebarContent className="overflow-auto pt-4">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationConfig.main.map(item => renderItem(item))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {pinnedItems.length > 0 && (
          <SidebarGroup>
            <SidebarGroupLabel>Favourites</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {pinnedItems.map(item => renderItem(item, true))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}

        <SidebarGroup>
          <SidebarGroupLabel>Services</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationConfig.services
                .filter(item => !isItemPinned(item))
                .map(item => renderItem(item))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <BusinessToolsMenu
          items={navigationConfig.businessTools}
          pathname={pathname}
          isItemPinned={isItemPinned}
          togglePin={togglePin}
        />
      </SidebarContent>
    </Sidebar>
  )
}
