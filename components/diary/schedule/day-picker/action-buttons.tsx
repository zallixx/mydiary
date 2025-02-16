// @ts-nocheck
import { Button } from '@/components/ui/button';
import { Download, Plus, Settings } from 'lucide-react';
import { useState } from 'react';
import { handleDownload } from '@/utils/downloadSchedule';
import { CreateEventModal } from '@/components/modals/create-event-modal/create-event-modal';


export default function ActionButtons({dateString} : {dateString: string}) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon">
                    <Settings className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" onClick={() => handleDownload(dateString)}>
                    <Download className="h-4 w-4" />
                </Button>
                <Button className="bg-[#0a3af5] hover:bg-[#0a3af5]/90" onClick={() => setIsOpen(true)}>
                    <Plus className="h-4 w-4 mr-2 text-white" />
                    Создать
                </Button>
            </div>
            <CreateEventModal isOpen={isOpen} setIsOpen={setIsOpen} />
        </>
    );
};