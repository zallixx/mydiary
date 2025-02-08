// @ts-nocheck
import { Button } from '@/components/ui/button';
import { CirclePlus, Download, Settings } from 'lucide-react';
import { useState } from 'react';
import { CreateEventModal } from '@/components/modals/create-event-modal/create-event-modal';
import { handleDownload } from '@/utils/downloadSchedule';

export default function ActionButtonsMb({ dateString } : { dateString: string }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm" className="bg-white">
                    <Settings className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" className="bg-white" onClick={() => handleDownload(dateString)}>
                    <Download className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" className="bg-white" onClick={() => setIsOpen(true)}>
                    <CirclePlus className="h-4 w-4" />
                </Button>
            </div>
            <CreateEventModal isOpen={isOpen} setIsOpen={setIsOpen} />
        </>
    );
}