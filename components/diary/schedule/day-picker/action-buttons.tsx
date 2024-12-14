import { Button } from '@/components/ui/button';
import { Download, Plus, Settings } from 'lucide-react';
import * as React from 'react';

export default function ActionButtons() {
    return (
        <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon">
                <Settings className="h-4 w-4"/>
            </Button>
            <Button variant="ghost" size="icon">
                <Download className="h-4 w-4"/>
            </Button>
            <Button className="bg-[#4c6ef5] hover:bg-[#4c6ef5]/90">
                <Plus className="h-4 w-4 mr-2 text -white"/>
                Создать
            </Button>
        </div>
    );
};