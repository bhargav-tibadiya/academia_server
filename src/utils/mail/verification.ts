const verificationMail = (otp: string) => {
  return `
  <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Academia SIS - OTP Verification</title>
  <style>
    body {
      background-color: #f4f4f4;
      font-family: 'Arial', sans-serif;
      margin: 0;
      padding: 0;
      text-align: center;
    }
    .container {
      max-width: 600px;
      margin: 30px auto;
      background: linear-gradient(135deg, #1e1e2f, #3a3a5e);
      color: #ffffff;
      border-radius: 12px;
      box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
      padding: 30px;
    }
    .logo img {
      max-width: 180px;
      margin-bottom: 20px;
    }
    h1 {
      font-size: 24px;
      margin: 10px 0;
    }
    p {
      font-size: 16px;
      margin: 15px 0;
    }
    .otp {
      font-size: 32px;
      font-weight: bold;
      background: #FFD60A;
      color: #000;
      padding: 10px 20px;
      border-radius: 8px;
      display: inline-block;
      margin: 15px 0;
      letter-spacing: 2px;
    }
    .info {
      font-size: 14px;
      opacity: 0.8;
    }
    .footer {
      margin-top: 20px;
      font-size: 13px;
      color: #ddd;
    }
    .cta:hover {
      background: #ffcc00;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="logo">
      <img src="https://i.ibb.co/84bTdg54/cgpit-utu-sis.png" alt="Academia SIS Logo">
    </div>
    <h1>Verify Your Academia SIS Account</h1>
    <p>Dear Student,</p>
    <p>Welcome to <b>Academia: Student Information System</b> To complete your registration and access features like student records, course management, and academic progress, please verify your email using the OTP below:</p>
    <div class="otp">${otp}</div>
    <p>This OTP is valid for **5 minutes**. If you didn’t request this verification, please ignore this email.</p>
    <p class="info">For any queries, contact our support team at <a href="mailto:support@academia.com" style="color:#FFD60A;">support@academia.com</a></p>
    <div class="footer">© 2024 Academia SIS | All Rights Reserved</div>
  </div>
</body>
</html>
`
}

export default verificationMail