'use client';

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogTitle,
    DialogHeader,
} from '@/components/ui/dialog';
import SupportMessageFormComponent from '@/components/forms/support-message-form';

export default function SupportModal({ isOpened, onClose }: { isOpened:boolean, onClose?: () => void }) {
    return (
        <Dialog open={isOpened} onOpenChange={onClose}>
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