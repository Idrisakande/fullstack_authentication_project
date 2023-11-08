import nodemailer from "nodemailer";
import ENV from "../confg.js";
import Mailgen from "mailgen";

// confi
const nodeConfig = {
  service: "gmail",
  auth: {
    user: ENV.EMAIL,
    pass: ENV.PASSWORD,
  },
};
// initialize a reusable transporter object
const transporter = nodemailer.createTransport(nodeConfig);
// initialize Mailgen
const MailGenerator = new Mailgen({
  theme: "default",
  product: {
    name: "From Drisy Authentication",
    link: "https://mailgen.js/",
  },
});

/** Post: http://localhost:8000/api/registerMail
 *@params : {
    "username": "Drisy",
    "userEmail": "idris@gmail.com",
    "text": "",
    "subject": ""
 }
 */
// send mail from real gmail account
export const registerMail = (req, res) => {
  //
  const { username, userEmail, text, subject } = req.body;

  // email response body
  const email = {
    body: {
      name: username,
      intro:
        text || `Welcome ${username}! We are very excited to have you on board`,
      table: {
        data: [
          {
            item: "Nodemailer Stack Book",
            description: "A Backend Application",
            price: "$10.99",
          },
        ],
      },
      outro:
        "Need help, or have question? Just reply to this email, we are a very good listner.",
    },
  };

  // generate a mail
  // and add or specified it to the email body variable
  const emailBody = MailGenerator.generate(email);

  //
  const message = {
    from: ENV.EMAIL,
    to: userEmail,
    subject: subject || `${username}, you have signup successfully`,
    html: emailBody,
  };
  // send mail with defined transport object
  transporter
    .sendMail(message)
    .then(() => {
      return res
        .status(200)
        .send({ msg: "You should receive an email from us " });
    })
    .catch((error) => {
      console.log(error);
      return res.status(500).send({ error });
    });
};
