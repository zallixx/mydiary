import { Profile } from '@prisma/client';
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from '@/components/ui/drawer';
import { UserAvatar } from '@/components/user-avatar';
import { ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';
import * as React from 'react';
import { defineUserRole, profileInfoMb } from '@/components/header/functions';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';
import { Button } from '@/components/ui/button';


export default function UserButtonMb({ profile }: { profile: Profile; }) {
    const profileComponents = profileInfoMb();

    return (
        <>
            <Drawer>
                <DrawerTrigger className="outline-none">
                    <button type="button" className="flex items-center rounded-full bg-white group py-1 outline-none">
                        <UserAvatar className="ml-2.5" profile={profile} />
                        <span className="ml-2 text-sm font-medium text-gray-700 transition duration-200 ease-in-out">{profile.name}</span>
                        <ChevronDown className="ml-1 h-5 w-5 text-gray-400 transition duration-200 ease-in-out max-lg:hidden" aria-hidden="true"/>
                    </button>
                </DrawerTrigger>
                <DrawerContent className="h-full">
                    <DrawerHeader>
                        <DrawerTitle className="flex items-center justify-center relative h-16">
                            <DrawerClose asChild>
                                <ChevronLeft className="absolute left-0 ml-2 h-6 w-6 cursor-pointer"/>
                            </DrawerClose>
                            <span className="text-lg text-black">Мой профиль</span>
                        </DrawerTitle>
                    </DrawerHeader>
                    <Separator/>
                    <div className="flex items-center gap-4 px-4 py-4">
                        <UserAvatar className="h-12 w-12" profile={profile}/>
                        <div>
                            <p className="text-lg font-medium">{profile.name}</p>
                            <p className="text-sm text-muted-foreground">{defineUserRole(profile.role)}</p>
                        </div>
                    </div>
                    <nav className="pl-2 grid">
                        {profileComponents.map((item) => (
                            <Button
                                variant="ghost"
                                className="w-full justify-between h-14"
                                onClick={item.onClick}
                            >
                                <DrawerClose asChild>
                                    <Link className="flex items-center w-full" href={item.href}>
                                        <div className={`flex items-center gap-3 ${item.title === 'Выйти из аккаунта' ? 'text-red-600' : ''}`}>
                                            <div className="bg-primary/10 p-2 rounded-lg">
                                                {item.svg}
                                            </div>
                                            <span>{item.title}</span>
                                        </div>
                                        <ChevronRight className="absolute right-0 mr-4 w-4 h-4 text-muted-foreground" />
                                    </Link>
                                </DrawerClose>
                            </Button>
                        ))}
                    </nav>
                </DrawerContent>
            </Drawer>
        </>
    );
}