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
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { defineUserRole, profileInfoMb } from '@/utils/header';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import SupportModal from '@/components/modals/support-modal';


export default function UserButtonMb({ profile }: { profile: Profile; }) {
    const profileComponents = profileInfoMb();
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <Drawer>
                <DrawerTrigger className="outline-none">
                    <span className="flex items-center rounded-full bg-white group py-1 outline-none">
                        <UserAvatar className="ml-2.5" profile={profile} />
                        <span className="ml-2 text-sm font-medium text-gray-700 transition duration-200 ease-in-out">{profile.name}</span>
                    </span>
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
                        <UserAvatar className="h-[60px] w-[60px]" profile={profile}/>
                        <div>
                            <p className="text-lg font-medium">{profile.name + ' ' + profile.surname}</p>
                            <p className="text-sm text-muted-foreground">{defineUserRole(profile.role)}</p>
                        </div>
                    </div>
                    <nav className="pl-2 grid">
                        {profileComponents.map((item, index) => (
                            <Button
                                variant="ghost"
                                className="w-full justify-between h-14"
                                onClick={item.onClick}
                                key={index}
                            >
                                <DrawerClose asChild>
                                    {item.title === 'Задать вопрос' ? (
                                        <span className="flex items-center w-full" onClick={() => setIsOpen(true)}>
                                            <div className={`flex items-center gap-3`}>
                                                <div className="bg-primary/10 p-2 rounded-lg">
                                                    {item.svg}
                                                </div>
                                                <span>{item.title}</span>
                                            </div>
                                            <ChevronRight className="absolute right-0 mr-4 w-4 h-4 text-muted-foreground" />
                                        </span>
                                    ) : (
                                        <Link className="flex items-center w-full" href={item.href}>
                                            <div className={`flex items-center gap-3 ${item.title === 'Выйти из аккаунта' ? 'text-red-600' : ''}`}>
                                                <div className="bg-primary/10 p-2 rounded-lg">
                                                    {item.svg}
                                                </div>
                                                <span>{item.title}</span>
                                            </div>
                                            <ChevronRight className="absolute right-0 mr-4 w-4 h-4 text-muted-foreground" />
                                        </Link>
                                    )}
                                </DrawerClose>
                            </Button>
                        ))}
                    </nav>
                </DrawerContent>
            </Drawer>
            <SupportModal setOpen={setIsOpen} open={isOpen} withoutText={true} />
        </>
    );
}