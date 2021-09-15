export default {
  host: "smtp.gmail.com",
  port: 587,
  user: `${process.env.SEND_EMAIL}`,
  pass: `${process.env.SEND_EMAIL_PASSWORD}`,
};
