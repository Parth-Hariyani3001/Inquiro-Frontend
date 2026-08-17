import type { ComponentProps } from 'react'
import { BrainCircuit, Compass } from 'lucide-react'
import { useNavigate, useRouterState } from '@tanstack/react-router'

import { NavUser } from '@/components/nav-user'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from '@/components/ui/sidebar'

export function AppSidebar(props: ComponentProps<typeof Sidebar>) {
  const navigate = useNavigate()
  const pathname = useRouterState({ select: (s) => s.location.pathname })
  const exploreActive = pathname.startsWith('/dashboard/explore')

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              tooltip="Inquiro"
              onPress={() => navigate({ to: '/' })}
            >
              <BrainCircuit />
              <span className="font-serif">Inquiro</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  isActive={exploreActive}
                  tooltip="Explore"
                  onPress={() => navigate({ to: '/dashboard/explore' })}
                >
                  <Compass />
                  <span>Explore</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
