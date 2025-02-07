// @ts-nocheck
import { itemProps } from '@/types/schedule';

export default function LessonDrawerTopic({ item }: { item: itemProps }) {
    return (
        <>
            <span className="mt-2 text-3xl text-[#2c2c18]">
                {item.subject.name}
            </span>
            <span className="p-[16px] mt-2 w-96 mb-8 rounded-[16px] bg-white items-start justify-items-start content-start flex flex-col text-black">
                <span className="text-gray-500">Тема</span>
                <span>{item.topic + ''}</span>
            </span>
        </>
    );
}