import { auth, currentUser } from '@clerk/nextjs/server';
import db from '@/lib/db';


export default async function InitializeProfile() {
    const user = await currentUser();

    if (user) {
        const profile = await db().profile.findUnique({
            where: {
                id: user.id
            }
        });

        if (profile) {
            return profile;
        }

        return db().profile.create({
            data: {
                id: user.id,
                name: user.firstName + ' ' + user.lastName,
                email: user.emailAddresses[0]?.emailAddress,
                image: user.imageUrl
            }
        });
    }

    return auth().redirectToSignIn();
}