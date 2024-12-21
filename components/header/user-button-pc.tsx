import { UserAvatar } from '@/components/user-avatar';
import { ChevronDown } from 'lucide-react';
import { Label } from '@radix-ui/react-menu';
import Link from 'next/link';
import * as React from 'react';
import { profileComponentProps } from '@/components/header/interfaces';
import { Profile } from '@prisma/client';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';

export default function UserButtonPc({ profile, profileComponents }: { profile: Profile; profileComponents: profileComponentProps[] }) {
    const [isOpen, setIsOpen] = React.useState(false);

    return (
        <div className="relative ml-4 flex-shrink-0 rounded-full items-center justify-center content-center">
            <DropdownMenu onOpenChange={setIsOpen}>
                <DropdownMenuTrigger className="outline-none">
                    <button type="button" className="flex items-center rounded-full bg-white group py-1 outline-none">
                        <UserAvatar profile={profile}/>
                        <span className="ml-2 text-sm font-medium text-gray-700 transition duration-200 ease-in-out">{profile.name}</span>
                        <ChevronDown
                            className={`ml-1 h-5 w-5 text-gray-400 transition duration-200 ease-in-out max-lg:hidden ${isOpen ? 'rotate-180' : ''}`}
                            aria-hidden="true"/>
                    </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-64 h-auto">
                    <div className="flex flex-col items-center pt-4">
                        <img src={profile.image?.toString()} alt={profile.name} width={60} height={60}
                             className="rounded-full"/>
                        <DropdownMenuLabel className="text-center break-all text-base">
                            {profile.name}
                        </DropdownMenuLabel>
                    </div>
                    <DropdownMenuSeparator/>
                    {profileComponents.map((item) => (
                        <div key={item.title} onClick={item.onClick}>
                            <DropdownMenuItem className="cursor-pointer">
                                {item.svg}
                                <Label className="ml-2">{item.title}</Label>
                                <Link href={item.href} />
                            </DropdownMenuItem>
                        </div>
                    ))}
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
}