'use client';

import { type LucideIcon } from 'lucide-react';
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem
} from '@/components/ui/sidebar';
import MainItemWithItems from '@/components/sidebar/main-item-with-items';

export function NavMain({ items }: { items: { title: string; url: string; icon?: LucideIcon; isActive?: boolean; items?: { title: string; url: string }[] }[] }) {
    return (
        <SidebarGroup>
            <SidebarGroupLabel>
                Мой дневник
            </SidebarGroupLabel>
            <SidebarMenu>
                {items.map((item) => {
                    if (item.items && item.items.length > 0) {
                        return (
                            <MainItemWithItems item={item} />
                        );
                    }
                    return (
                        <SidebarMenuItem key={item.title}>
                            <SidebarMenuButton asChild tooltip={item.title}>
                                <a href={item.url}>
                                    {item.icon && <item.icon />}
                                    <span>{item.title}</span>
                                </a>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    );
                })}
            </SidebarMenu>
        </SidebarGroup>
    );
}
