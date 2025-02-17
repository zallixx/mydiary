import { useState, ComponentPropsWithoutRef } from 'react';
import type { LucideIcon } from 'lucide-react';

import {
    SidebarGroup,
    SidebarGroupContent,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import SupportModal from '@/components/modals/support-modal';

export function NavSecondary({ items, ...props }: { items: { title: string; url: string; icon: LucideIcon }[] } & ComponentPropsWithoutRef<typeof SidebarGroup>) {
    const [open, setOpen] = useState(false);
    return (
        <>
            <SidebarGroup {...props}>
                <SidebarGroupContent>
                    <SidebarMenu>
                        {items.map((item) => (
                            <SidebarMenuItem key={item.title}>
                                <SidebarMenuButton asChild size="sm">
                                <span onClick={() => setOpen(true)} className='cursor-pointer'>
                                    <item.icon />
                                    <span>{item.title}</span>
                                </span>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        ))}
                    </SidebarMenu>
                </SidebarGroupContent>
            </SidebarGroup>
            <SupportModal withoutText={true} open={open} setOpen={setOpen} />
        </>
    )
}
