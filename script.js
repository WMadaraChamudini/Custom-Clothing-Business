import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {

if (req.method !== 'POST') {
    return res.status(405).json({
        error: 'Method not allowed'
    });
}

try {

    const {
        name,
        email,
        phone,
        service,
        message
    } = req.body;

    if (!name || !email || !phone || !service || !message) {
        return res.status(400).json({
            success: false,
            error: 'All fields are required'
        });
    }

    const result = await resend.emails.send({
        from: 'Fashion By Nilu <onboarding@resend.dev>',
        to: ['madaraweerasinghe02@gmail.com'],
        reply_to: email,
        subject: `Fashion By Nilu - ${service} Inquiry`,
        html: `
            <div style="font-family: Arial, sans-serif; line-height: 1.6;">
                <h2 style="color:#8B4789;">
                    New Contact Form Submission
                </h2>

                <table cellpadding="8" cellspacing="0">
                    <tr>
                        <td><strong>Name:</strong></td>
                        <td>${name}</td>
                    </tr>

                    <tr>
                        <td><strong>Email:</strong></td>
                        <td>${email}</td>
                    </tr>

                    <tr>
                        <td><strong>Phone:</strong></td>
                        <td>${phone}</td>
                    </tr>

                    <tr>
                        <td><strong>Service:</strong></td>
                        <td>${service}</td>
                    </tr>
                </table>

                <h3>Message</h3>

                <p>${message.replace(/\n/g, '<br>')}</p>
            </div>
        `
    });

    return res.status(200).json({
        success: true,
        data: result
    });

} catch (error) {

    console.error('Resend Error:', error);

    return res.status(500).json({
        success: false,
        error: 'Failed to send email'
    });
}

}