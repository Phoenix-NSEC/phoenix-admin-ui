import React, { useState } from "react";

async function sendEmail(email) {
    const config = {
        SecureToken: "815eff5d-ad8b-492d-97f6-42a22832908b",
        Server: "smtp.elasticemail.com",
        To: email,
        From: "mail.phoenixnsec@gmail.com",
        Subject: "Subject",
        Body: '<div>HEAD</div><div style="border:2px solid black">BODY</div>',
      };
  return new Promise((resolve, reject) => {
    Email.send(config).then(
      (message) => {
        console.log("Email sent:", message);
        resolve(message);
      },
      (error) => {
        console.error("Email sending error:", error);
        reject(error);
      }
    );
  });
}
export {sendEmail};
