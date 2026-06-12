const express = require('express');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 3000;

// ===============================
// CONTACT FORM EMAIL ROUTE
// ===============================
app.post('/api/send-email', async (req, res) => {
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

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS
            }
        });

        await transporter.sendMail({
            from: process.env.SMTP_USER,
            to: process.env.DEFAULT_RECIPIENT,
            replyTo: email,
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

                    <p>
                        ${message.replace(/\n/g, '<br>')}
                    </p>
                </div>
            `
        });

        return res.status(200).json({
            success: true,
            message: 'Email sent successfully'
        });

    } catch (error) {

        console.error('Email Error:', error);

        return res.status(500).json({
            success: false,
            error: 'Failed to send email'
        });
    }
});

// ===============================
// HEALTH CHECK
// ===============================
app.get('/', (req, res) => {
    res.send('Fashion By Nilu Contact API Running');
});

// ===============================
// START SERVER
// ===============================
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});