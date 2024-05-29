
interface SupportMessagePageProps {
    readonly messageId: string;
}

export default function SupportMessagePage({ params }: {params: SupportMessagePageProps }) {
    const { messageId } = params;

    return <div>Support</div>;
}