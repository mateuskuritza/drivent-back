import nodemailer from "nodemailer";
import SMTP_CONFIG from "./config/nodemailer-smtp";

const transporter = nodemailer.createTransport({
  host: SMTP_CONFIG.host,
  port: Number(SMTP_CONFIG.port),
  secure: false,
  auth: {
    user: SMTP_CONFIG.user,
    pass: SMTP_CONFIG.pass,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

interface RecoveryEmailData {
  mailTo: string;
  recoveryLink: string;
}

export { RecoveryEmailData };

export async function sendRecoveryEmail(data: RecoveryEmailData) {
  try {
    await transporter.sendMail({
      subject: "Email de recuperação de senha da sua conta Drivent ",
      from: `Drivent <${process.env.SEND_EMAIL}>`,
      to: [`${data.mailTo}`],
      html: `
        <head>
          <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
          <title>Reset Password Email Template</title>
          <meta name="description" content="Reset Password Email Template.">
          <style type="text/css">
            a:hover {text-decoration: underline !important;}
          </style>
        </head>
  
        <body marginheight="0" topmargin="0" marginwidth="0" style="margin: 0px; background-color: #f2f3f8;" leftmargin="0">
          <!--100% body table-->
          <table cellspacing="0" border="0" cellpadding="0" width="100%" bgcolor="#f2f3f8"
              style="@import url(https://fonts.googleapis.com/css?family=Rubik:300,400,500,700|Open+Sans:300,400,600,700); font-family: 'Open Sans', sans-serif;">
              <tr>
                  <td>
                      <table style="background-color: #f2f3f8; max-width:670px;  margin:0 auto;" width="100%" border="0"
                          align="center" cellpadding="0" cellspacing="0">
                          <tr>
                              <td style="height:80px;">&nbsp;</td>
                          </tr>
                          <tr>
                              <td style="text-align:center; font-size: 26px; background: linear-gradient(45deg, #FF3091, #FFB47F)">
                                <strong>Drivent</strong>
                              </td>
                          </tr>
                          <tr>
                              <td style="height:20px;">&nbsp;</td>
                          </tr>
                          <tr>
                              <td>
                                  <table width="95%" border="0" align="center" cellpadding="0" cellspacing="0"
                                      style="max-width:670px;background:#fff; border-radius:3px; text-align:center;-webkit-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);-moz-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);box-shadow:0 6px 18px 0 rgba(0,0,0,.06);">
                                      <tr>
                                          <td style="height:40px;">&nbsp;</td>
                                      </tr>
                                      <tr>
                                          <td style="padding:0 35px;">
                                              <h1 style="color:#1e1e2d; font-weight:500; margin:0;font-size:32px;font-family:'Rubik',sans-serif;">Você solicitou a recuperação de senha para o email: <strong>${data.mailTo}</strong></h1>
                                              <span
                                                  style="display:inline-block; vertical-align:middle; margin:29px 0 26px; border-bottom:1px solid #cecece; width:100px;"></span>
                                              <p style="color:#455056; font-size:15px;line-height:24px; margin:0;">
                                                  Para resetar sua senha, clique no link
                                                  abaixo e siga as intruções, o link expira em 1 hora.
                                              </p>
                                              <a href="${data.recoveryLink}" target="_blank"
                                                  style="background:#F05998; text-decoration: none; font-weight:700; margin-top:35px;color:#FFF !important;text-transform:uppercase; font-size:14px;padding:10px 24px;display:inline-block;border-radius:50px;">
                                                  Resetar Senha
                                              </a>
                                          </b>
                                      </tr>
                                      <tr>
                                          <td style="height:40px;">&nbsp;</td>
                                      </tr>
                                  </table>
                              </td>
                          <tr>
                              <td style="height:20px;">&nbsp;</td>
                          </tr>
                          <tr>
                              <td style="text-align:center;">
                                  <p>
                                    <a href="https://drivent-front-one.vercel.app" title="logo" target="_blank" style=" text-decoration: none; font-size:14px; color:rgba(69, 80, 86, 0.7411764705882353); line-height:18px; margin:0 0 0; ">
                                      &copy; <strong>drivent-front-one.vercel.app</strong>
                                    </a>
                                  </p>
                              </td>
                          </tr>
                          <tr>
                              <td style="height:80px;">&nbsp;</td>
                          </tr>
                      </table>
                  </td>
              </tr>
          </table>
          <!--/100% body table-->
        </body>
      `,
    });
  } catch (err) {
    /* eslint-disable-next-line no-console */
    console.error(err);
  }
}
