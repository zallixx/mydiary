import { useClerk } from '@clerk/nextjs';
import { mainComponentProps, profileComponentProps } from '@/components/header/interfaces';

const profileInfo = (): profileComponentProps[] => {
    const { signOut } = useClerk();
    return [
        {
            title: 'Настройки аккаунта',
            href: '/profile/settings',
            svg: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-settings"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>,
        },
        {
            title: 'Выйти из аккаунта',
            href: '',
            svg: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-log-out"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" x2="9" y1="12" y2="12"/></svg>,
            onClick: () => signOut({ redirectUrl: '/' }),
        },
    ];
}

const mainInfo = (): mainComponentProps[] => {
    return [
        {
            title: 'Дневник',
            href: `/diary/schedule/${new Date().toLocaleDateString('ru-RU')}`,
            svg: <svg width="18" height="18" viewBox="0 0 18 18"><path d="M7.073 7.42c.487 0 .94.082 1.359.242.418.16.78.388 1.082.68.301.292.538.643.71 1.052.17.41.255.863.255 1.36a3.49 3.49 0 01-.286 1.432c-.19.429-.455.797-.797 1.104a3.677 3.677 0 01-1.213.716c-.468.17-.974.256-1.52.256-.76 0-1.44-.16-2.04-.483a3.324 3.324 0 01-1.366-1.316l1.126-1.169c.273.38.614.683 1.023.907.41.224.833.336 1.272.336.526 0 .958-.158 1.293-.474.337-.318.505-.74.505-1.265 0-.507-.159-.916-.475-1.229-.316-.311-.719-.467-1.206-.467-.322 0-.621.073-.9.22-.277.145-.5.345-.665.598H3.52c0-.028.02-.138.06-.328l.146-.732c.058-.296.12-.628.189-.993s.141-.739.22-1.118c.175-.897.37-1.901.584-3.011h5.116V5.52H6.137l-.424 2.323c.117-.126.29-.228.519-.307.228-.077.51-.116.841-.116zM13.272 14.262a1.47 1.47 0 100-2.94 1.47 1.47 0 000 2.94z"></path><path d="M14 1.5c1.379 0 2.5 1.122 2.5 2.5v10c0 1.379-1.121 2.5-2.5 2.5H4A2.503 2.503 0 011.5 14V4c0-1.378 1.122-2.5 2.5-2.5h10zM14 0H4a4 4 0 00-4 4v10a4 4 0 004 4h10a4 4 0 004-4V4a4 4 0 00-4-4z"></path></svg>,
            children: [
                {sub_title: 'Расписание', sub_href: `/diary/schedule/`},
                {sub_title: 'Задания', sub_href: '/diary/tasks'},
                {
                    sub_title: 'Оценки', sub_href: '/diary/marks',
                    sub_children: [
                        {
                            sub_title: 'Оценки',
                            sub_href: '/diary/marks',
                            svg: <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-star"><path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"/></svg>,
                        },
                        {
                            sub_title: 'Рейтинг',
                            sub_href: '/diary/marks/rating',
                            svg: <svg width="18" height="18" viewBox="0 0 18 18" fill="currentColor"><path d="M9.4 3.2c.9 0 1.6-.7 1.6-1.6C11 .7 10.3 0 9.4 0c-.9 0-1.6.7-1.6 1.6 0 .9.7 1.6 1.6 1.6zm6.3 8.1h-1.3V6.5c0-1.1-.9-1.9-1.9-1.9H6.6c-1.1 0-1.9.9-1.9 1.9v1.7H2.3c-1.1 0-1.9.9-1.9 1.9V16.2c0 1 .9 1.8 1.9 1.8h13.3c1 0 1.9-.8 1.9-1.8V13.3c.1-1.1-.8-2-1.8-2zm0 1.5c.3 0 .5.2.5.5V16c0 .3-.2.5-.5.5h-3.3c-.3 0-.5-.2-.5-.5v-2.7c0-.3.2-.5.5-.5h3.3zM1.8 10.2c0-.3.2-.5.5-.5h4.4c.3 0 .5.2.5.5V16c0 .3-.2.5-.5.5H2.3c-.3 0-.5-.2-.5-.5v-5.8zm6.8 6.3c.1-.2.1-.4.1-.6v-5.8c0-1.1-.9-1.9-1.9-1.9h-.7V6.5c0-.3.2-.5.5-.5h5.9c.3 0 .5.2.5.5v4.8h-.6c-1.1 0-1.9.9-1.9 1.9V16c0 .2 0 .4.1.6h-2z"></path></svg>,
                        },
                        {
                            sub_title: 'Архив оценок',
                            sub_href: '/diary/marks/archive',
                            svg: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-archive"><rect width="20" height="5" x="2" y="3" rx="1"/><path d="M4 8v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8"/><path d="M10 12h4"/></svg>,
                        }
                    ]
                },
                {
                    sub_title: 'Учеба', sub_href: '/diary/study',
                    sub_children: [
                        {
                            sub_title: 'Предметы',
                            sub_href: '/diary/study/subjects',
                            svg: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-graduation-cap"><path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z"/><path d="M22 10v6"/><path d="M6 12.5V16a6 3 0 0 0 12 0v-3.5"/></svg>,
                        },
                        {
                            sub_title: 'Экзамены',
                            sub_href: '/diary/study/exams',
                            svg: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-flag"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" x2="4" y1="22" y2="15"/></svg>,
                        },
                        {
                            sub_title: 'Академ. задолженности',
                            sub_href: '/diary/study/debts',
                            svg: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-triangle-alert"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>,
                        }
                    ]
                },
                {
                    sub_title: 'Школа', sub_href: '/diary/school',
                    sub_children: [
                        {
                            sub_title: 'Кружки',
                            sub_href: '/diary/school/circles',
                            svg: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-palette"><circle cx="13.5" cy="6.5" r=".5" fill="currentColor"/><circle cx="17.5" cy="10.5" r=".5" fill="currentColor"/><circle cx="8.5" cy="7.5" r=".5" fill="currentColor"/><circle cx="6.5" cy="12.5" r=".5" fill="currentColor"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/></svg>,
                        },
                        {
                            sub_title: 'Посещаемость',
                            sub_href: '/diary/school/attendance',
                            svg: <svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="0" className="lucide lucide-palette"><path d="M14 14.252V16.3414C13.3744 16.1203 12.7013 16 12 16C8.68629 16 6 18.6863 6 22H4C4 17.5817 7.58172 14 12 14C12.6906 14 13.3608 14.0875 14 14.252ZM12 13C8.685 13 6 10.315 6 7C6 3.685 8.685 1 12 1C15.315 1 18 3.685 18 7C18 10.315 15.315 13 12 13ZM12 11C14.21 11 16 9.21 16 7C16 4.79 14.21 3 12 3C9.79 3 8 4.79 8 7C8 9.21 9.79 11 12 11ZM17.7929 19.9142L21.3284 16.3787L22.7426 17.7929L17.7929 22.7426L14.2574 19.2071L15.6716 17.7929L17.7929 19.9142Z"></path></svg>,
                        },
                        {
                            sub_title: 'О школе',
                            sub_href: '/diary/school/about',
                            svg: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-info"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>,
                        }
                    ]
                }
            ]
        },
        {
            title: 'Библиотека',
            href: '/library/',
            svg: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-library-big"><rect width="8" height="18" x="3" y="3" rx="1"/><path d="M7 3v18"/><path d="M20.4 18.9c.2.5-.1 1.1-.6 1.3l-1.9.7c-.5.2-1.1-.1-1.3-.6L11.1 5.1c-.2-.5.1-1.1.6-1.3l1.9-.7c.5-.2 1.1.1 1.3.6Z"/></svg>,
        },
        {
            title: 'Портфолио',
            href: '/portfolio/',
            svg: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-briefcase"><path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/><rect width="20" height="14" x="2" y="6" rx="2"/></svg>,
        },
        {
            title: 'Олимпиады',
            href: '/olympiads/',
            svg: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-medal"><path d="M7.21 15 2.66 7.14a2 2 0 0 1 .13-2.2L4.4 2.8A2 2 0 0 1 6 2h12a2 2 0 0 1 1.6.8l1.6 2.14a2 2 0 0 1 .14 2.2L16.79 15"/><path d="M11 12 5.12 2.2"/><path d="m13 12 5.88-9.8"/><path d="M8 7h8"/><circle cx="12" cy="17" r="5"/><path d="M12 18v-2h-.5"/></svg>,
        }
    ];
}

const getCurrentPageName = (path: string) => {
    switch (path) {
        case path.startsWith('/diary') ? '/diary' : '/diary/':
            return 'Мой дневник';
        default:
            return 'Мой дневник';
    }
}

export { profileInfo, mainInfo, getCurrentPageName };