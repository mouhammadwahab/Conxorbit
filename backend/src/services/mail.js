const emailjs = require("@emailjs/nodejs");

function isEmailJsConfigured() {
  return Boolean(
    process.env.EMAILJS_SERVICE_ID &&
      process.env.EMAILJS_TEMPLATE_ID &&
      process.env.EMAILJS_PUBLIC_KEY
  );
}

/**
 * Sends an inquiry to CONTACT_TO via EmailJS.
 * CONTACT_MODE=log prints to the API console instead of sending.
 */
async function sendMail({ subject, text, replyTo }) {
  const to = process.env.CONTACT_TO || "Founder@conxorbit.com";
  const mode = (process.env.CONTACT_MODE || "emailjs").toLowerCase();

  if (mode === "log") {
    console.log("\n[contact:log] CONTACT_MODE=log — inquiry logged only");
    console.log(`To: ${to}`);
    console.log(`Reply-To: ${replyTo || "—"}`);
    console.log(`Subject: ${subject}`);
    console.log(text);
    console.log("[contact:log] end\n");
    return { ok: true, mode: "log" };
  }

  if (!isEmailJsConfigured()) {
    const err = new Error(
      "EmailJS is not configured. Set EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, EMAILJS_PUBLIC_KEY (and EMAILJS_PRIVATE_KEY)."
    );
    err.code = "MAIL_NOT_CONFIGURED";
    throw err;
  }

  const templateParams = {
    to_email: to,
    to_name: "Founder",
    subject,
    message: text,
    reply_to: replyTo || to,
  };

  const options = {
    publicKey: process.env.EMAILJS_PUBLIC_KEY,
  };
  if (process.env.EMAILJS_PRIVATE_KEY) {
    options.privateKey = process.env.EMAILJS_PRIVATE_KEY;
  }

  try {
    await emailjs.send(
      process.env.EMAILJS_SERVICE_ID,
      process.env.EMAILJS_TEMPLATE_ID,
      templateParams,
      options
    );
  } catch (error) {
    const detail =
      (error && (error.text || error.message)) ||
      "EmailJS request failed";
    const err = new Error(detail);
    err.code = "EMAILJS_SEND_FAILED";
    throw err;
  }

  return { ok: true, mode: "emailjs" };
}

module.exports = { sendMail, isEmailJsConfigured };
