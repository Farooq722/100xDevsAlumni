import { Resend } from "resend";
import dotenv from "dotenv";
dotenv.config();

if (!process.env.RESEND_API) {
  console.log("Provide resend-api in side the .env file");
}
const resend = new Resend(process.env.RESEND_API);

interface EmailParams {
  sendTo: string;
  subject: string;
  html: string;
}

export const sendEmail = async ({ sendTo, subject, html }: EmailParams) => {
  try {
    const { data, error } = await resend.emails.send({
      from: "100xalumni <onboarding@resend.dev>",
      to: ["farooq32176@gmail.com"],
      subject: subject,
      html: html,
    });

    if (error) {
      return console.error({ error });
    }
    //   console.log({ data });
    return data;
  } catch (err) {
    console.log(err);
  }
};
