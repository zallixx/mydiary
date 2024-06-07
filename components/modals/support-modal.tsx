'use client';

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogTitle,
    DialogHeader,
} from '@/components/ui/dialog';
import SupportMessageFormComponent from '@/components/forms/support-message-form';

interface SupportModalProps {
    readonly isOpened: boolean;
    readonly onClose?: () => void;
}

export default function SupportModal(params: SupportModalProps) {
    return (
        <Dialog open={params.isOpened} onOpenChange={params.onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Новое обращение в техническую поддержку</DialogTitle>
                    <DialogDescription>
                        Постарайтесь как можно подробнее описать вашу проблему.
                    </DialogDescription>
                    <SupportMessageFormComponent />
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
}