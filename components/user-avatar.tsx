import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Profile } from '@prisma/client';
import { cn } from '@/utils/cn';

export function UserAvatar({ profile, className }: { profile: Profile; className?: string }) {
	return (
		<Avatar className={cn(className)}>
			<AvatarImage src={profile.image || ""} alt={'123'} />
			<AvatarFallback delayMs={100}>
				{profile.name?.charAt(0).toUpperCase() + profile.surname?.charAt(0).toUpperCase()}
			</AvatarFallback>
		</Avatar>
	);
}
