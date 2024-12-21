import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Profile } from '@prisma/client';
import { cn } from '@/lib/utils';

export function UserAvatar({ profile, className }: { profile: Profile; className?: string }) {
	return (
		<Avatar className={cn(className)}>
			<AvatarImage src={profile.image || ""} alt={'123'} />
			<AvatarFallback delayMs={600}>{'123'}</AvatarFallback>
		</Avatar>
	);
}
