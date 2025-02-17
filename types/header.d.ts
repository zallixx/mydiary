import * as React from 'react';

interface profileComponentProps {
    title: string;
    href: string;
    svg?: React.ReactElement;
    onClick?: () => void;
}

export type { profileComponentProps, mainComponentProps };