// @ts-nocheck
import { itemProps } from '@/types/schedule';

export default function LessonDrawerTopic({ item }: { item: itemProps }) {
    return (
        <div className="w-full flex flex-col">
            <span className="mt-2 text-3xl text-[#2c2c18]">
                {item.subject?.name || item.name}
            </span>
            <span className="rounded-lg bg-white mr-4 ml-4 p-4 text-card-foreground flex flex-col items-start w-auto">
                <span className="text-gray-500">Тема</span>
                <span>{item.topic + ''}</span>
            </span>
        </div>
    );
}