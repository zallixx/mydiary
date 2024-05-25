import InitializeProfile from "@/lib/initualize-profile";

export default async function SetupPage() {
    const profile = await InitializeProfile();

    return <div>123</div>;
}