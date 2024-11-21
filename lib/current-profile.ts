import { auth, currentUser } from '@clerk/nextjs/server';
import db from '@/lib/db';

export default async function CurrentProfile() {
	const user = await currentUser();

	if (!user) {
		return auth().redirectToSignIn();
	}

	const profile = await db.profile.findUnique({
		where: {
			id: user.id,
		},
		include: {
			groups: true,
		}
	});

	if (!profile) {
		return auth().redirectToSignIn();
	}

	return profile;
}
