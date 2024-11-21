import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Profile } from '@prisma/client';

export function UserAvatar({ profile }: { profile: Profile }) {
	return (
		<Avatar>
			<AvatarImage src={profile.image || ""} alt={'123'} />
			<AvatarFallback delayMs={600}>{'123'}</AvatarFallback>
		</Avatar>
	);
}
