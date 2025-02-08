import { profileComponentProps } from '@/types/header';
import { Role } from '@prisma/client';
import { logout } from '@/lib/auth/auth';

const profileInfoMb = (): profileComponentProps[] => {
    return [
        {
            title: 'Представители',
            href: '/representatives/',
            svg: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-house"><path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"/><path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>,
        },
        {
            title: 'Дневник',
            href: '/diary/schedule/',
            svg: <svg width="16" height="16" viewBox="0 0 18 18" strokeLinecap="round" strokeLinejoin="round"><path d="M7.073 7.42c.487 0 .94.082 1.359.242.418.16.78.388 1.082.68.301.292.538.643.71 1.052.17.41.255.863.255 1.36a3.49 3.49 0 01-.286 1.432c-.19.429-.455.797-.797 1.104a3.677 3.677 0 01-1.213.716c-.468.17-.974.256-1.52.256-.76 0-1.44-.16-2.04-.483a3.324 3.324 0 01-1.366-1.316l1.126-1.169c.273.38.614.683 1.023.907.41.224.833.336 1.272.336.526 0 .958-.158 1.293-.474.337-.318.505-.74.505-1.265 0-.507-.159-.916-.475-1.229-.316-.311-.719-.467-1.206-.467-.322 0-.621.073-.9.22-.277.145-.5.345-.665.598H3.52c0-.028.02-.138.06-.328l.146-.732c.058-.296.12-.628.189-.993s.141-.739.22-1.118c.175-.897.37-1.901.584-3.011h5.116V5.52H6.137l-.424 2.323c.117-.126.29-.228.519-.307.228-.077.51-.116.841-.116zM13.272 14.262a1.47 1.47 0 100-2.94 1.47 1.47 0 000 2.94z"></path><path d="M14 1.5c1.379 0 2.5 1.122 2.5 2.5v10c0 1.379-1.121 2.5-2.5 2.5H4A2.503 2.503 0 011.5 14V4c0-1.378 1.122-2.5 2.5-2.5h10zM14 0H4a4 4 0 00-4 4v10a4 4 0 004 4h10a4 4 0 004-4V4a4 4 0 00-4-4z"></path></svg>,
        },
        {
            title: 'Библиотека',
            href: '/library/',
            svg: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-library-big"><rect width="8" height="18" x="3" y="3" rx="1"/><path d="M7 3v18"/><path d="M20.4 18.9c.2.5-.1 1.1-.6 1.3l-1.9.7c-.5.2-1.1-.1-1.3-.6L11.1 5.1c-.2-.5.1-1.1.6-1.3l1.9-.7c.5-.2 1.1.1 1.3.6Z"/></svg>,
        },
        {
            title: 'Портфолио',
            href: '/portfolio/',
            svg: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-briefcase"><path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/><rect width="20" height="14" x="2" y="6" rx="2"/></svg>,
        },
        {
            title: 'Олимпиады',
            href: '/olympiads/',
            svg: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-medal"><path d="M7.21 15 2.66 7.14a2 2 0 0 1 .13-2.2L4.4 2.8A2 2 0 0 1 6 2h12a2 2 0 0 1 1.6.8l1.6 2.14a2 2 0 0 1 .14 2.2L16.79 15"/><path d="M11 12 5.12 2.2"/><path d="m13 12 5.88-9.8"/><path d="M8 7h8"/><circle cx="12" cy="17" r="5"/><path d="M12 18v-2h-.5"/></svg>,
        },
        {
            title: 'Задать вопрос',
            href: '/support/',
            svg: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-info"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>,
        },
        {
            title: 'Выйти из аккаунта',
            href: '',
            svg: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-log-out"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" x2="9" y1="12" y2="12"/></svg>,
            onClick: () => logout(),
        },
    ];
}

const defineUserRole = (role: Role) => {
    switch (role) {
        case Role.ADMIN:
            return 'Администратор';
        case Role.TEACHER:
            return 'Учитель';
        case Role.STUDENT:
            return 'Ученик';
        default:
            return 'Ученик';
    }
}

export { defineUserRole, profileInfoMb };