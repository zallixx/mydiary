import { mailOptions, transporter } from '@/lib/nodemailer';
import { emailProps } from '@/types/auth';

export async function sendEmail(values: emailProps) {
    if (values.subject === 'Подтвердите свою почту') {
        await transporter.sendMail({
            ...mailOptions,
            subject: values.subject,
            to: values.profile.email,
            html:
                `
                <html lang="ru">
                    <body style="font-family: Arial, sans-serif; line-height: 1.6; background-color: #f0f0f0; margin: 0; padding: 0;">
                        <table style="max-width: 600px; margin: 0 auto; background-color: #ffffff;">
                            <tr>
                                <td style="padding: 20px;">
                                    <main style="width: 100%;">
                                        <p style="margin-bottom: 15px;">Здравствуйте, ${values.profile.name}</p>
                                        <p style="margin-bottom: 15px;">Благодарим вас за регистрацию на нашем сайте. Для завершения процесса регистрации, пожалуйста, используйте следующий код подтверждения:</p>
                                        <div style="background-color: #000000; width: 100%; border-radius: 0.375rem; padding: 15px 0; margin: 20px 0; text-align: center;">
                                            <span style="font-size: 24px; font-weight: bold; letter-spacing: 5px; color: #4CAF50; display: inline-block;">${values.confirmationCode}</span>
                                        </div>
                                        <p style="margin-bottom: 15px; text-align: center;">Если вы не регистрировались на нашем сайте, пожалуйста, проигнорируйте это письмо.</p>
                                        <p style="margin-bottom: 5px; text-align: center;">Код подтверждения действителен в течение 5 минут. Если вы не подтвердите свою регистрацию в течение этого времени, вам нужно будет запросить новый код.</p>
                                    </main>
                                </td>
                            </tr>
                        </table>
                    </body>
                </html>
            `
        });
    } else if (values.subject === 'Подтвердите вход в аккаунт') {
        await transporter.sendMail({
            ...mailOptions,
            subject: values.subject,
            to: values.profile.email,
            html:
                `
                <html lang="ru">
                    <body style="font-family: Arial, sans-serif; line-height: 1.6; background-color: #f0f0f0; margin: 0; padding: 0;">
                        <table style="max-width: 600px; margin: 0 auto; background-color: #ffffff;">
                            <tr>
                                <td style="padding: 20px;">
                                    <main style="width: 100%;">
                                        <p style="margin-bottom: 15px;">Здравствуйте, ${values.profile.name}</p>
                                        <p style="margin-bottom: 15px;">Для завершения процесса входа в аккаунт, пожалуйста, используйте следующий код подтверждения:</p><p>
                                        <div style="background-color: #000000; width: 100%; border-radius: 0.375rem; padding: 15px 0; margin: 20px 0; text-align: center;">
                                            <span style="font-size: 24px; font-weight: bold; letter-spacing: 5px; color: #4CAF50; display: inline-block;">${values.confirmationCode}</span>
                                        </div>
                                        <p style="margin-bottom: 15px; text-align: center;">Если вы не входили в аккаунт, пожалуйста, проигнорируйте это письмо. </p>
                                        <p style="margin-bottom: 5px; text-align: center;">Код подтверждения действителен в течение 5 минут. Если вы не подтвердите вход в аккаунт в течение этого времени, вам нужно будет запросить новый код.</p>
                                    </main>
                                </td>
                            </tr>
                        </table>
                    </body>
                </html>
            `
        });
    }
}