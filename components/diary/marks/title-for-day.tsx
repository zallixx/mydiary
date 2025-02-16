import { validateDate } from '@/utils/schedule';

export default function TitleForDay({ date }: { date: Date }) {
    return (
        <div className="mb-2">
            <div className="text-lg font-medium text-gray-500">{validateDate(date)}</div>
        </div>
    );
}