import Image from 'next/image';
import Link from 'next/link';
import { mainComponentProps } from '@/components/header/interfaces';

export default function MainLinks({ mainComponents, currentPage }: { mainComponents: mainComponentProps[]; currentPage: string }) {
    return (
        <div className="flex">
            <div className="flex flex-shrink-0 items-center max-lg:hidden">
                <Image width={100} height={150} src="/mai.svg" alt="Icon"/>
            </div>
            <nav className="hidden lg:ml-6 lg:flex lg:space-x-4 content-center items-center">
                {mainComponents.map((item) => (
                    <Link
                        key={item.title}
                        href={item.href}
                        className={`inline-flex items-center rounded-md py-1 text-base group ${currentPage.startsWith('/' + item.href.split('/')[1]) ? 'font-bold' : ''}`}
                    >
                        <div
                            className="mr-1 transition delay-150 duration-200 ease-in-out group-hover:-translate-y-0.5">{item.svg}</div>
                        <span
                            className="truncate max-w-xs transition duration-200 ease-in-out group-hover:-translate-y-1">{item.title}</span>
                    </Link>
                ))}
            </nav>
        </div>
    );
};