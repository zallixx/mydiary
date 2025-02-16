'use client';

import {
    ChevronsUpDown,
    LogOut,
    Settings,
    User
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem
} from '@/components/ui/sidebar';
import { Profile } from '@prisma/client';
import { UserAvatar } from '@/components/user-avatar';
import { logout } from '@/lib/auth/auth';

export function NavUser({ profile }: { profile: Profile }) {
    return (
        <SidebarMenu>
            <SidebarMenuItem>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <SidebarMenuButton
                            size="lg"
                            className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                        >
                            <UserAvatar profile={profile} className="h-8 w-8 rounded-lg" />
                            <div className="grid flex-1 text-left text-sm leading-tight">
                                <span className="truncate font-semibold">{profile.name + ' ' + profile.surname}</span>
                                <span className="truncate text-xs">{profile.email}</span>
                            </div>
                            <ChevronsUpDown className="ml-auto size-4" />
                        </SidebarMenuButton>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                        className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                        side={"right"}
                        align="end"
                        sideOffset={4}
                    >
                        <DropdownMenuLabel className="p-0 font-normal">
                            <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                                <UserAvatar profile={profile} className="h-8 w-8 rounded-lg" />
                                <div className="grid flex-1 text-left text-sm leading-tight">
                                    <span className="truncate font-semibold">{profile.name + ' ' + profile.surname}</span>
                                    <span className="truncate text-xs">{profile.email}</span>
                                </div>
                            </div>
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                            <DropdownMenuItem className="cursor-pointer">
                                <User />
                                Профиль
                            </DropdownMenuItem>
                            <DropdownMenuItem className="cursor-pointer">
                                <Settings />
                                Настройки
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="cursor-pointer" onClick={() => logout()}>
                            <LogOut />
                            Выйти из аккаунта
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </SidebarMenuItem>
        </SidebarMenu>
    );
}
