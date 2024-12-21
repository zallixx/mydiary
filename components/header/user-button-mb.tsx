import { Profile } from '@prisma/client';
import { profileComponentProps } from '@/components/header/interfaces';
import {
    Drawer,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from '@/components/ui/drawer';
import { UserAvatar } from '@/components/user-avatar';
import {ChevronDown, ChevronLeft} from 'lucide-react';
import * as React from "react";

export default function UserButtonMb({ profile, profileComponents }: { profile: Profile; profileComponents: profileComponentProps[] }) {
    const [isOpen, setIsOpen] = React.useState(false);
    return (
        <>
            <Drawer open={isOpen} onOpenChange={setIsOpen}>
                <DrawerTrigger className="outline-none">
                    <button type="button" className="flex items-center rounded-full bg-white group py-1 outline-none">
                        <UserAvatar profile={profile}/>
                        <span
                            className="ml-2 text-sm font-medium text-gray-700 transition duration-200 ease-in-out">{profile.name}</span>
                        <ChevronDown
                            className="ml-1 h-5 w-5 text-gray-400 transition duration-200 ease-in-out max-lg:hidden"
                            aria-hidden="true"/>
                    </button>
                </DrawerTrigger>
                <DrawerContent className="h-full">
                    <DrawerHeader>
                        <DrawerTitle className="flex items-center justify-center relative bg-[#7851f1] h-16">
                            <ChevronLeft className="text-white absolute left-0 ml-2 cursor-pointer" onClick={() => setIsOpen(false)}/>
                            <span className="text-white">Мой профиль</span>
                        </DrawerTitle>
                    </DrawerHeader>
                    <DrawerFooter>
                        
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </>
    );
}