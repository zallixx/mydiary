import { Tooltip, TooltipContent, TooltipTrigger} from '@/components/ui/tooltip';
import Link from 'next/link';
import { ChevronDown } from 'lucide-react';
import { getCurrentPageName } from '@/components/header/functions';
import { mainComponentProps } from '@/components/header/interfaces';

export default function SubLinks({ mainComponents, currentPage }: { mainComponents: mainComponentProps[]; currentPage: string }) {
    return (
        <div className="border-t border-gray-200 mx-auto sm:px-2 lg:px-4 max-lg:hidden justify-between">
            <div className="flex h-12 lg:h-14">
                <div className="flex content-center items-center">
                    <span className="text-xl font-bold mr-3">{getCurrentPageName(currentPage)}</span>
                    <nav className="lg:flex px-2.5 lg:space-x-7">
                        {mainComponents.map((item) => (
                            (currentPage.startsWith('/' + item.href.split('/')[1])) ? (
                                item.children?.map((child) => (
                                    <div className="group">
                                        <Tooltip delayDuration={300}>
                                            <TooltipTrigger>
                                                <Link href={child.sub_href} key={child.sub_title} className={`inline-flex items-center rounded-md py-1 text-base ${currentPage.startsWith('/diary/' + child.sub_href.split('/')[2]) ? 'font-semibold' : ''}`}>
                                                    <span className="truncate max-w-xs transition duration-200 ease-in-out group-hover:-translate-y-1">
                                                        {child.sub_title}
                                                    </span>
                                                    {child.sub_children && (
                                                        <ChevronDown className="ml-1 h-5 w-5 text-gray-400 transition duration-300 ease-in-out group-hover:-translate-y-0.5 group-hover:rotate-180" aria-hidden="true"/>
                                                    )}
                                                </Link>
                                            </TooltipTrigger>
                                            {child.sub_children && (
                                                <TooltipContent className="flex-col w-64 space-y-1 h-auto" key={child.sub_title}>
                                                    {child.sub_children?.map((sub_child) => (
                                                        <Link key={item.href} href={sub_child.sub_href} className="block items-center rounded-md hover:bg-gray-100 font-medium h-8 text-gray-500 hover:text-gray-700 pt-1">
                                                            <div className={`inline-flex items-center ${currentPage === sub_child.sub_href ? 'font-semibold text-black' : ''}`}>
                                                                {sub_child.svg}
                                                                <span className="px-1">{sub_child.sub_title}</span>
                                                            </div>
                                                        </Link>
                                                    ))}
                                                </TooltipContent>
                                            )}
                                        </Tooltip>
                                    </div>
                                ))
                            ) : null)
                        )}
                    </nav>
                </div>
            </div>
        </div>
    );
}