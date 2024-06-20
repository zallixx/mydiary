export default function SettingsPage({
	params,
}: {
	params: { profileId: string };
}) {
	return <h1>{params.profileId}</h1>;
}
