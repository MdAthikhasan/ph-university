import nodemailer from "nodemailer";
export const sendEmail = async (to: string, html: string) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com.",
    port: 587,
    secure: false,
    auth: {
      // TODO: replace `user` and `pass` values from <https://forwardemail.net>
      user: "mdathikhasan136@gmail.com",
      pass: "snnn egii ztym cyfp",
    },
  });
  console.log();
  await transporter.sendMail({
    from: "mdathikhasan136@gmail.com", // sender address
    to, // list of receivers
    subject: "Reset your password within ten mins!", // Subject line
    text: "", // plain text body
    html, // html body
  });
};
