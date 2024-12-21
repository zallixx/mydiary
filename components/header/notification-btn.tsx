export default function NotificationButton() {
    return (
        <button
            type="button"
            className="lg:flex-shrink-0 max-lg:flex max-lg:justify-end max-lg:mr-2 transition duration-200 ease-in-out hover:-translate-y-0.5 bg-white p-1 text-black"
        >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
                 stroke="currentColor"
                 strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-bell">
                <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/>
                <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/>
            </svg>
        </button>
    );
}