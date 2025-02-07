'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    Briefcase,
    CheckSquare,
    LayoutGrid,
    School,
    Star
} from 'lucide-react';

function NavItem({ icon, label, href, active = false }: { icon: React.ReactNode; label: string; href:string; active?: boolean }) {
    return (
        <Link href={href} key={href}>
            <button className="flex flex-col items-center">
                <div className={active ? "text-black" : "text-gray-400"}>{icon}</div>
                <span className={`text-xs mt-1 ${active ? "text-black" : "text-gray-400"}`}>{label}</span>
            </button>
        </Link>
    )
}


export default function MainLinks() {
    const pathname = usePathname();

    return (
        <div className="flex items-center justify-evenly w-full transition-transform duration-500 ease-in-out">
            <NavItem icon={<LayoutGrid className="w-5 h-5" />} label="Расписание" href="/diary/schedule" active={pathname === '/diary/schedule'} />
            <NavItem icon={<Star className="w-5 h-5" />} label="Оценки" href="/diary/marks" active={pathname === '/diary/marks'} />
            <NavItem icon={<CheckSquare className="w-5 h-5" />} label="Задания" href="/diary/tasks" active={pathname === '/diary/tasks'} />
            <NavItem icon={<School className="w-5 h-5" />} label="Школа" href="/diary/school/about" active={pathname === '/diary/school/about'} />
            <NavItem icon={<Briefcase className="w-5 h-5" />} label="Портфолио" href="/portfolio" active={pathname === '/portfolio'} />
        </div>
    );
}