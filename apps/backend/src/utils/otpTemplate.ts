export const otpEmail = (otpCode: number, name: string): string => {
  return `
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <title>Password Reset OTP - 100xDevsAlumni</title>
          <style>
            body {
              font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
              background-color: #f4f4f7;
              margin: 0;
              padding: 0;
              color: #333;
            }
            .container {
              max-width: 600px;
              margin: 40px auto;
              background-color: #ffffff;
              padding: 30px;
              border-radius: 12px;
              box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
              text-align: center;
            }
            .header h1 {
              color: #0077b6;
              margin-bottom: 20px;
            }
            .otp-box {
              display: inline-block;
              padding: 16px 28px;
              font-size: 26px;
              letter-spacing: 8px;
              background-color: #f1f5f9;
              border-radius: 8px;
              font-weight: bold;
              margin: 20px 0;
              color: #1e293b;
            }
            .content p {
              font-size: 16px;
              line-height: 1.6;
            }
            .footer {
              margin-top: 40px;
              font-size: 13px;
              color: #888;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Reset Your Password</h1>
            </div>
            <div class="content">
              <p>Hello ${name}</p>
              <p>You requested to reset your password for <strong>100xDevsAlumni</strong>.</p>
              <p>Use the following One-Time Password (OTP) to proceed:</p>
              <div class="otp-box"> ${otpCode}</div>
              <p>This OTP is valid for 10 minutes.</p>
              <p>If you did not request this, please ignore this email.</p>
            </div>
            <div class="footer">
              &copy; 2025 100xDevsAlumni. All rights reserved.
            </div>
          </div>
        </body>
      </html>
    `;
};
