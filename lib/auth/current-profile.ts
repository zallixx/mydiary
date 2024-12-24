import 'server-only';

import { getSession } from '@/lib/auth/session';
import db from '@/lib/db';
import redis from '@/lib/redis';
import { serverSessionProps } from '@/types/auth';

export async function verifySession() {
	const { decryptedSession, jwt } = await getSession();

	if (!decryptedSession) {
		return { activated: false, profileId: '' }
	}

	const serverSession: serverSessionProps | null = await redis.get(decryptedSession.uuid);

	if(!serverSession) {
		return { activated: false, profileId: '' }
	} else if (serverSession.session !== jwt) {
		return { activated: false, profileId: '' }
	}

	return { activated: decryptedSession.activated, profileId: decryptedSession.profileId };
}

export async function CurrentProfile() {
	const { activated, profileId } = await verifySession();

	if (!activated && profileId !== '') {
		return { activated: false, profile: null };
	}

	try {
		const profile = await db.profile.findUnique({
			where: {
				id: profileId,
			},
			include: {
				groups: true,
			}
		});
		return { activated: activated, profile: profile };
	} catch (error) {
		return { activated: false, profile: null };
	}
}