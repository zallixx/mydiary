import { Button } from '@/components/ui/button';

export default function TodayButton({ handleTodayClick }: { handleTodayClick: () => void }) {
    return (
        <Button variant="outline" size="sm" onClick={handleTodayClick} className="bg-white">
            Сегодня
        </Button>
    );
};