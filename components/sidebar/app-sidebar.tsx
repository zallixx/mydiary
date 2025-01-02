'use client';

import * as React from 'react';
import {
    Briefcase,
    Calendar,
    CheckCircle,
    GraduationCapIcon,
    LibraryBig,
    Medal,
    NotebookPen,
    School,
    Send,
    Star,
} from 'lucide-react';
import { NavMain } from '@/components/sidebar/nav-main';
import { NavProjects } from '@/components/sidebar/nav-projects';
import { NavUser } from '@/components/sidebar/nav-user';
import { NavSecondary } from '@/components/sidebar/nav-secondary';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarRail,
} from '@/components/ui/sidebar';
import { Profile } from '@prisma/client';


const data = {
    navMain: [
        {
            title: "Расписание",
            url: "/diary/schedule",
            icon: Calendar,
            isActive: true,
        },
        {
            title: "Задания",
            url: "/diary/tasks",
            icon: CheckCircle,
        },
        {
            title: "Оценки",
            url: "/diary/marks",
            icon: Star,
            items: [
                {
                    title: "Оценки",
                    url: "/diary/marks",
                },
                {
                    title: "Рейтинг",
                    url: "/diary/marks/rating",
                },
                {
                    title: "Архив оценок",
                    url: "/diary/marks/archive",
                },
            ],
        },
        {
            title: "Учеба",
            url: "/diary/study",
            icon: GraduationCapIcon,
            items: [
                {
                    title: "Предметы",
                    url: "/diary/study/subjects",
                },
                {
                    title: "Экзамены",
                    url: "/diary/study/exams",
                },
                {
                    title: "Академ. задолженности",
                    url: "/diary/study/debts",
                },
            ],
        },
        {
            title: "Школа",
            url: "/diary/study",
            icon: School,
            items: [
                {
                    title: "Посещаемость",
                    url: "/diary/school/attendance",
                },
                {
                    title: "Кружки",
                    url: "/diary/school/circles",
                },
                {
                    title: "Академ. задолженности",
                    url: "/diary/study/debts",
                },
            ],
        },
    ],
    ourServices: [
        {
            name: "Дневник",
            url: "/diary/schedule",
            icon: NotebookPen,
        },
        {
            name: "Библиотека",
            url: "/library",
            icon: LibraryBig,
        },
        {
            name: "Портфолио",
            url: "/portfolio",
            icon: Briefcase,
        },
        {
            name: "Олимпиады",
            url: "/olympiads",
            icon: Medal,
        },
    ],
    navSecondary: [
        {
            title: "Поддержка",
            url: "/support",
            icon: Send,
        },
    ],
    }

export function AppSidebar({profile, ...props}: { profile: Profile; } & React.ComponentProps<typeof Sidebar>) {
    return (
        <Sidebar collapsible="icon" {...props}>
            <SidebarContent>
                <NavMain items={data.navMain} />
                <NavProjects projects={data.ourServices} />
                <NavSecondary items={data.navSecondary} className="mt-auto" />
            </SidebarContent>
            <SidebarFooter>
                <NavUser profile={profile} />
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    );
}