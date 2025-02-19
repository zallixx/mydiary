'use client';

import * as React from 'react';
import { NavMain } from '@/components/sidebar/nav-main';
import { NavServices } from '@/components/sidebar/nav-services';
import { NavUser } from '@/components/sidebar/nav-user';
import { NavSecondary } from '@/components/sidebar/nav-secondary';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarRail
} from '@/components/ui/sidebar';
import { Profile } from '@prisma/client';
import { StudentSidebarData, TeacherSidebarData } from '@/utils/sidebar';
import { useState } from 'react';

export function AppSidebar({profile, ...props}: { profile: Profile; } & React.ComponentProps<typeof Sidebar>) {
    const [data, setData] = useState(profile.role === 'STUDENT' ? StudentSidebarData : TeacherSidebarData);

    return (
        <Sidebar collapsible="icon" {...props}>
            <SidebarContent>
                <NavMain items={data.navMain} />
                <NavServices projects={data.ourServices} />
                <NavSecondary items={data.navSecondary} className="mt-auto" />
            </SidebarContent>
            <SidebarFooter>
                <NavUser profile={profile} />
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    );
}