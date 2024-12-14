import * as React from 'react';
import { lessonComponentsProps } from '@/components/diary/schedule/interfaces';

export default function DrawerItemTitle({ component }: { component: lessonComponentsProps }) {
    return (
        <h2 className="px-4 text-sm font-medium uppercase tracking-wide text-muted-foreground">
            {component.title}
        </h2>
    );
}