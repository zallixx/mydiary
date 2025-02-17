import {
    Briefcase,
    CheckSquare,
    GraduationCapIcon,
    LayoutGrid,
    LibraryBig,
    Medal,
    NotebookPen,
    School,
    Send,
    Star
} from 'lucide-react';

const StudentSidebarData = () => {
    return {
        navMain: [
            {
                title: "Расписание",
                url: "/diary/schedule",
                icon: LayoutGrid,
                isActive: true,
            },
            {
                title: "Задания",
                url: "/diary/tasks",
                icon: CheckSquare,
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
    };
}

const TeacherSidebarData = () => {
    return {
        navMain: [
            {
                title: "Журнал",
                url: "/journal",
                icon: LayoutGrid,
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
                    }
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
    };
}

export { StudentSidebarData, TeacherSidebarData };