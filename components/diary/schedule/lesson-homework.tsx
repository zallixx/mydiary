'use client';

import { itemProps } from '@/types/schedule';

export default function LessonHomework({item}: {item: itemProps}) {
    return (
        <>
            <span className="text-sm ml-1 break-all">
                {item.homework[0]?.description ? (
                    <div>
                        <div className="flex flex-row">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                 fill="none"
                                 className={`flex-none ml-2.5 mr-1 relative ${item.homework[0].completions[0]?.isCompleted ? 'text-green-600' : 'text-gray-700'}`}>
                                <path fill="currentColor"
                                      d="M13.167 14.333h-3a.833.833 0 0 1-.834-.833v-3a.666.666 0 0 0-.666-.667H7.333a.666.666 0 0 0-.666.667v3c0 .46-.373.833-.834.833h-3A.833.833 0 0 1 2 13.5V7.138a2.5 2.5 0 0 1 .953-1.965L7.69 1.44a.5.5 0 0 1 .62 0l4.737 3.733A2.5 2.5 0 0 1 14 7.137V13.5c0 .46-.373.833-.833.833"></path>
                            </svg>
                            <span className="max-[520px]:hidden">{'Домашнее задание: ' + item.homework[0].description}</span>
                            <span className="flex min-[520px]:hidden">{item.homework.length + ' задание'}</span>
                        </div>
                        <div>
                            {item.specificAssignment[0] && (
                                <div className="flex flex-row mt-1">
                                    <svg stroke="currentColor" fill="currentColor" strokeWidth="0"
                                         viewBox="0 0 512 512" height="16px" width="16px"
                                         className={`flex-none ml-2.5 mr-1 ${item.specificAssignment[0].homeworkCompletion[0]?.isCompleted ? 'text-green-600' : 'text-gray-700'}`}
                                         xmlns="http://www.w3.org/2000/svg">
                                        <path fill="none" strokeLinecap="round"
                                              strokeLinejoin="round" strokeWidth="32"
                                              d="M256 80c-8.66 0-16.58 7.36-16 16l8 216a8 8 0 0 0 8 8h0a8 8 0 0 0 8-8l8-216c.58-8.64-7.34-16-16-16z"></path>
                                        <circle cx="256" cy="416" r="16" fill="none"
                                                strokeLinecap="round" strokeLinejoin="round"
                                                strokeWidth="32"></circle>
                                    </svg>
                                    <span className="flex max-[520px]:hidden">Дополнительное домашнее задание: {item.specificAssignment[0].description}</span>
                                    <span className="flex min-[520px]:hidden">{item.specificAssignment.length + ' дополнительное задание'}</span>
                                </div>
                            )}
                        </div>
                    </div>
                ) : item.specificAssignment[0] ? (
                    <div className="flex flex-row">
                        <svg stroke="currentColor" fill="currentColor" strokeWidth="0"
                             viewBox="0 0 512 512" height="16px" width="16px"
                             className={`flex-none ml-2.5 mr-1 ${item.specificAssignment[0].homeworkCompletion[0]?.isCompleted ? 'text-green-600' : 'text-gray-700'}`}
                             xmlns="http://www.w3.org/2000/svg">
                            <path fill="none" strokeLinecap="round"
                                  strokeLinejoin="round" strokeWidth="32"
                                  d="M256 80c-8.66 0-16.58 7.36-16 16l8 216a8 8 0 0 0 8 8h0a8 8 0 0 0 8-8l8-216c.58-8.64-7.34-16-16-16z"></path>
                            <circle cx="256" cy="416" r="16" fill="none"
                                    strokeLinecap="round" strokeLinejoin="round"
                                    strokeWidth="32"></circle>
                        </svg>
                        <span className="max-[520px]:hidden">Дополнительное домашнее задание: {item.specificAssignment[0].description}</span>
                        <span className="min-[520px]:hidden">{item.specificAssignment.length + ' дополнительное задание'}</span>
                    </div>
                ) : (
                    <div className="flex flex-row">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none"
                             className="flex-none ml-2.5 mr-1 relative text-green-600">
                            <path fill="currentColor"
                                  d="M13.167 14.333h-3a.833.833 0 0 1-.834-.833v-3a.666.666 0 0 0-.666-.667H7.333a.666.666 0 0 0-.666.667v3c0 .46-.373.833-.834.833h-3A.833.833 0 0 1 2 13.5V7.138a2.5 2.5 0 0 1 .953-1.965L7.69 1.44a.5.5 0 0 1 .62 0l4.737 3.733A2.5 2.5 0 0 1 14 7.137V13.5c0 .46-.373.833-.833.833"></path>
                        </svg>
                        <span>Домашнее задание не задано</span>
                    </div>
                )}
            </span>
            {item.homework.length > 1 && (
                <span className="text-sm ml-4 break-all">{`Ещё ${item.homework.length - 1}`}</span>
            )}
        </>
    );
};