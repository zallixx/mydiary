import { ColumnDef } from '@tanstack/react-table';
import { SupportMessage } from '@prisma/client';
import { Button } from '@/components/ui/button';
import { ArrowUpDown } from 'lucide-react';

export const columns: ColumnDef<SupportMessage>[] = [
    {
        accessorKey: 'problemName',
        header: 'Название проблемы',
    },
    {
        accessorKey: 'answer',
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Статус
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
    },
]