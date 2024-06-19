import { ColumnDef } from '@tanstack/react-table';
import { SupportMessage } from '@prisma/client';

export const columns: ColumnDef<SupportMessage>[] = [
    {
        accessorKey: 'problemName',
        header: 'Название проблемы',
    },
]