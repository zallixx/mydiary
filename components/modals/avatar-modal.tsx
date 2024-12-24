'use client';

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from '@/components/ui/dialog';
import { UploadDropzone } from '@/utils/uploadthing';

export default function SetUpAvatarModal() {
    const fetchAvatar = async (fileUrl: string) => {
        try {
            await fetch('/api/profilePicture', {
                method: 'POST',
                body: JSON.stringify({
                    fileUrl,
                }),
            });
            return;
        } catch (error) {
            console.log('Что-то пошло не так...');
        }
    }
    return (
        <>
            <Dialog>
                <DialogTrigger asChild>
                    <span>
                        P.S Пока ждёте - можете{' '}
                        <span className='cursor-pointer text-blue-500 mt-2'>
                            установить аватарку
                        </span>
                        {' '}
                        в нашем дневнике!
                    </span>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>
                            Создание аватарки
                        </DialogTitle>
                        <DialogDescription>
                            Проявите креативность :)
                        </DialogDescription>
                        <UploadDropzone endpoint="profilePicture" className="bg-slate-800 ut-label:text-lg ut-allowed-content:ut-uploading:text-red-300" onClientUploadComplete={(r) => fetchAvatar(r[0].url)} />
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </>
    )
}