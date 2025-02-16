'use client';

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle
} from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import CreateEventForm from '@/components/forms/create-event-form';

export function CreateEventModal({ isOpen, setIsOpen }: {isOpen: boolean, setIsOpen: Function}) {
    return (
        <Dialog open={isOpen} onOpenChange={() => setIsOpen(false)}>
            <DialogContent className="sm:max-w-[425px] bg-white">
                <ScrollArea className="h-[calc(100vh-182px)]">
                    <DialogHeader>
                        <DialogTitle className="text-2xl font-bold">Новое мероприятие</DialogTitle>
                    </DialogHeader>
                    <CreateEventForm />
                </ScrollArea>
            </DialogContent>
        </Dialog>
    );
}
