import {
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem
} from '@/components/ui/sidebar';
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger
} from '@/components/ui/collapsible';
import { ChevronRight, type LucideIcon } from 'lucide-react';

export default function MainItemWithItems({ item }: { item: { title: string; url: string; icon?: LucideIcon; isActive?: boolean; items?: { title: string; url: string }[] }}) {
    return (
        <>
            <Collapsible
                key={item.title}
                asChild
                defaultOpen={item.isActive}
                className="group/collapsible"
            >
                <SidebarMenuItem>
                    <CollapsibleTrigger asChild>
                        <SidebarMenuButton tooltip={item.title}>
                            {item.icon && <item.icon />}
                            <span>{item.title}</span>
                            <ChevronRight className={`ml-auto transition-transform duration-200 ${item.items? "" : "hidden"} group-data-[state=open]/collapsible:rotate-90`} />
                        </SidebarMenuButton>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                        <SidebarMenuSub>
                            {item.items?.map((subItem) => (
                                <SidebarMenuSubItem key={subItem.title}>
                                    <SidebarMenuSubButton asChild>
                                        <a href={subItem.url}>
                                            <span>{subItem.title}</span>
                                        </a>
                                    </SidebarMenuSubButton>
                                </SidebarMenuSubItem>
                            ))}
                        </SidebarMenuSub>
                    </CollapsibleContent>
                </SidebarMenuItem>
            </Collapsible>
        </>
    );
}