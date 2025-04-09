export const adminEmailTemplate = (
  name: string,
  url: string,
  secretKey: string,
): string => {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8" />
        <title>Email Verification - 100xDevsAlumni</title>
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
            background-color: #fff;
            padding: 30px;
            border-radius: 12px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
          }
          .header {
            text-align: center;
            margin-bottom: 30px;
          }
          .header h1 {
            color: #0077b6;
            font-size: 28px;
          }
          .content p {
            font-size: 16px;
            line-height: 1.6;
          }
          .btn {
            display: inline-block;
            margin-top: 20px;
            padding: 14px 24px;
            background-color: #0077b6;
            color: #fff;
            text-decoration: none;
            border-radius: 6px;
            font-weight: bold;
          }
          .secret-key {
            background-color: #f0f8ff;
            border: 1px dashed #0077b6;
            color: #0077b6;
            padding: 12px;
            margin: 20px 0;
            font-size: 18px;
            text-align: center;
            font-weight: bold;
            border-radius: 8px;
          }
          .footer {
            margin-top: 40px;
            font-size: 13px;
            text-align: center;
            color: #888;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Welcome to 100xDevsAlumni!</h1>
          </div>
          <div class="content">
            <p>Hi ${name},</p>
            <p>
              Thank you for joining <strong>100xDevsAlumni</strong>! We're excited to have you on board.
              To complete your registration, please verify your email address by clicking the button below:
            </p>
            <p style="text-align: center;">
              <a href="${url}" class="btn">Verify Email</a>
            </p>
            <p>
              <strong>Your Secret Key:</strong>
            </p>
            <div class="secret-key">${secretKey}</div>
            <p>
              Please keep this secret key secure. You may need it for admin-related actions. Do not share it with anyone.
            </p>
            <p>
              If you didn’t create an account, you can safely ignore this email.
            </p>
          </div>
          <div class="footer">
            &copy; 2025 100xDevsAlumni. All rights reserved.
          </div>
        </div>
      </body>
    </html>
  `;
};
