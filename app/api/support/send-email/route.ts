import { NextResponse, NextRequest } from 'next/server';
import db from '@/lib/db';
import { mailOptions, transporter } from '@/lib/nodemailer';
import { CurrentProfile } from '@/lib/auth/current-profile';
import { redirect } from 'next/navigation';

export async function POST(request: NextRequest) {
	const { profile } = await CurrentProfile();

	if (!profile) {
		return redirect('/auth');
	}

	if (profile.role !== 'ADMIN' && profile.role !== 'DEVELOPER') {
		return NextResponse.json('Доступ запрещен', { status: 401 });
	}

	const payload = await request.json();

	if (!payload.answer || !payload.profileEmail || !payload.supportMessageId) {
		return NextResponse.json('Отсутствуют обязательные поля', { status: 400 });
	}

	const result = await db.supportMessage.update({
		where: {
			id: payload.supportMessageId,
		},
		data: {
			answer: payload.answer,
		},
	});

	try {
		const htmlContent = `<html lang="ru">
					<body style="font-family: Arial, sans-serif; line-height: 1.6; background-color: #f0f0f0; margin: 0; padding: 0;">
						<table style="max-width: 600px; margin: 0 auto; background-color: #ffffff;">
							<tr>
								<td style="padding: 20px;">
									<main style="width: 100%;">
										<h1 style="color: #333333; margin-bottom: 20px;">Ответ на ваше обращение в поддержку</h1>
										<p style="margin-bottom: 15px;">Здравствуйте, ${profile.name}</p>
										<p style="margin-bottom: 15px;">Мы получили ваше обращение и подготовили ответ:</p>
										<div style="background-color: #f9f9f9; border-left: 4px solid #4CAF50; padding: 15px; margin-bottom: 20px;">
											<h2 style="color: #4CAF50; margin-top: 0;">Тема обращения: ${result.problemName}</h2>
											<p style="margin-bottom: 10px;"><strong>Описание проблемы:</strong></p>
											<p style="margin-bottom: 15px;">${result.problemDescription}</p>
											<p style="margin-bottom: 10px;"><strong>Наш ответ:</strong></p>
											<p style="margin-bottom: 0;">${result.answer}</p>
										</div>
										<p style="margin-bottom: 15px;">Если у вас остались вопросы или вам нужна дополнительная помощь, пожалуйста, не стесняйтесь обращаться к нам снова.</p>
										<p style="margin-bottom: 15px;">Мы всегда рады помочь!</p>
										<p style="margin-bottom: 5px;">С уважением,</p>
										<p style="margin-top: 0;">Команда поддержки МЭШ</p>
									</main>
								</td>
							</tr>
						</table>
					</body>
				</html>`;
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
