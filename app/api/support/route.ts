import { NextResponse } from 'next/server';
import db from '@/lib/db';
import { CurrentProfile } from '@/lib/auth/current-profile';
import { redirect } from 'next/navigation';

export async function POST(request: Request) {
	const { profile } = await CurrentProfile();

	if (!profile) {
		return redirect('/auth');
	}

	const payload = await request.json();

	if (!payload.city || !payload.problemName || !payload.problemDescription) {
		return NextResponse.json('Отсутствуют обязательные поля', { status: 400 });
	}

	const SupportMessage = await db.supportMessage.create({
		data: {
			profileId: profile.id,
			city: payload.city,
			problemName: payload.problemName,
			problemDescription: payload.problemDescription,
		},
	});

	if (!SupportMessage) {
		return NextResponse.json('Что-то пошло не так', { status: 500 });
	}

	return NextResponse.json('OK', { status: 200 });
}
