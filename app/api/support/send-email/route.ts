import { NextResponse, NextRequest } from 'next/server';
import db from '@/lib/db';
import { mailOptions, transporter } from '@/lib/nodemailer';
import { CurrentProfile } from '@/lib/auth/current-profile';
import { redirect } from 'next/navigation';

export async function POST(request: NextRequest) {
	if (request.method !== 'POST') {
		return NextResponse.json('Метод не разрешен', { status: 405 });
	}

	const { profile } = await CurrentProfile();

	if (!profile) {
		return redirect('/sign-in');
	}

	if (profile.role !== 'ADMIN' && profile.role !== 'DEVELOPER') {
		return NextResponse.json('Доступ запрещен', { status: 401 });
	}

	const payload = await request.json();

	if (!payload.answer || !payload.profileEmail || !payload.supportMessageId) {
		return NextResponse.json('Отсутствуют обязательные поля', { status: 400 });
	}

	await db.supportMessage.update({
		where: {
			id: payload.supportMessageId,
		},
		data: {
			answer: payload.answer,
		},
	});

	try {
		const htmlContent = `
            <div>
                <h3>Ответ от технической поддержки:</h3>
                <p>${payload.answer}</p>
            </div>
        `;
		await transporter.sendMail({
			...mailOptions,
			to: payload.profileEmail,
			subject: `Ответ от технической поддержки`,
			text: payload.answer,
			html: htmlContent,
		});

		return NextResponse.json('OK', { status: 200 });
	} catch (error) {
		return NextResponse.json('Что-то пошло не так', { status: 500 });
	}
}
