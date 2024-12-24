import * as React from 'react';

interface profileComponentProps {
    title: string;
    href: string;
    svg?: React.ReactElement;
    onClick?: () => void;
}

interface mainComponentProps {
    title: string;
    href: string;
    svg?: React.ReactElement;
    children?:
        {
            sub_title: string;
            sub_href: string;
            sub_children?:
                {
                    sub_title: string;
                    sub_href: string;
                    svg?: React.ReactElement
                }[];
        }[];
}

export type { profileComponentProps, mainComponentProps };