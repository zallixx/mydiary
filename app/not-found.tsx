import Link from 'next/link';
import Image from 'next/image';

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <div className="text-center">
                <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
                <h2 className="text-2xl font-semibold text-gray-600 mb-4">Упс! Страница прогуляла урок</h2>
                <p className="text-gray-500 mb-8">Похоже, эта страница решила не явиться в школу. Может, она забыла сделать домашнее задание?</p>
                <Link href="/" className="px-6 py-3 bg-[#4c6ef5] text-white rounded-md hover:bg-blue-600 transition duration-300">
                    Вернуться на главную страницу
                </Link>
                <Image src={"/404.webp"} alt="404" width={500} height={200} className="mx-auto my-auto pointer-events-none" />
            </div>
        </div>
    )
}