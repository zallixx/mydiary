import { absenceType } from '@prisma/client';
import React from 'react';

interface itemProps {
    id: string;
    place: string;
    event_type: string;
    topic: string;
    baseSchedule: {
        date: Date;
        duration: number;
        room: string;
        teacher: {
            name: string;
        };
        subject: {
            id: string;
            name: string;
            createdAt: Date;
            updatedAt: Date;
        };
    };
    specificAssignment: {
        id: string;
        description: string;
        completions: {
            isCompleted: boolean;
        }[];
    }[];
    homework: {
        id: string;
        date: Date;
        groupId: string;
        scheduleItemId: string;
        createdAt: Date;
        updatedAt: Date;
        description: string;
        completions: {
            isCompleted: boolean;
        }[];
    }[];
    absence: {
        type: absenceType;
    }[];
    assessment: {
        grade: number;
        gradeType: string;
        comment: string;
        category: string;
    }[];
}

interface lessonComponentsChild {
    sub_title?: string;
    svg?: React.ReactElement;
    description?: string;
    homeworkList?: homeworkProps[];
    specificAssignments?: specificAssignmentsProps[];
    assessment?: assessmentProps[];
    absence?: absenceProps[];
}

interface lessonComponentsProps {
    title: string;
    children: lessonComponentsChild[];
}

interface homeworkProps {
    id: string;
    date: Date;
    groupId: string;
    scheduleItemId: string;
    createdAt: Date;
    updatedAt: Date;
    description: string;
    completions: {
        isCompleted: boolean;
    }[];
}

interface specificAssignmentsProps {
    id: string;
    description: string;
    completions: {
        isCompleted: boolean;
    }[];
}

interface assessmentProps {
    comment: string;
    category: string;
    gradeType: string;
    grade: number;
}

interface absenceProps {
    type: absenceType;
}

interface weekProps {
    short: string;
    num: string;
    full: string;
    month: number;
    year: number;
}

interface weekOptionsProps {
    value: string;
    label: string;
}

export type { homeworkProps, specificAssignmentsProps, assessmentProps, absenceProps, itemProps, lessonComponentsChild, lessonComponentsProps, weekProps, weekOptionsProps };