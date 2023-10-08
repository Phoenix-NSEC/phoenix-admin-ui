import React, { useState } from "react";

async function sendEmail(email, firstName, lastName) {
    const config = {
        SecureToken: "91d7d8de-229d-4377-b7c6-a10419677471",
        Server: "smtp.elasticemail.com",
        To: email,
        From: "mail.phoenixnsec@gmail.com",
        Subject: "Subject",
        Body: `<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN" "http://www.w3.org/TR/REC-html40/loose.dtd">
        <html>
          <head>
            <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
            
          </head>
          <body style="margin:0;padding:0;background-color:#f1f1f1;font-family:'Poppins',sans-serif;font-weight:400;font-size:15px;line-height:1.8;color:rgba(0,0,0,0.4);"><center style="width:100%;background-color:#f1f1f1">
              <div style="max-width:600px;margin:0 auto;" class="email-container">
                <table align="center" role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin:auto;">
                  <tr>
                    <td valign="top" class="bg_white" style="padding:1em 2.5em 0 2.5em;">
                      <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
                        <tr>
                          <td class="logo" style="text-align:center;">
                            <h1 style="font-family:'Poppins',sans-serif;color:#000000;margin-top:0;font-weight:400;"><a style="text-decoration:none;color:teal;" href="#">Phoenix</a></h1>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                  <tr>
                    <td valign="middle" class="herobg_white" style="padding:2em 0 4em 0;">
                      <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
                        <tr>
                          <td style="padding:0 2.5em; text-align:center; padding-bottom:3em;">
                            <div class="text">
                              <h2 style="font-family:'Poppins',sans-serif; color:#000000; margin-top:0; font-weight:600;">You're In ${firstName}${" "}${lastName}! Registration Successfully Verified</h2>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td style="text-align:center;">
                            <div class="text-author">
                              <h3 style="font-family:'Poppins',sans-serif;color:#000000;margin-top:0;font-weight:400;" class="name">Phoenix</h3>
                              <span class="position">Official Tech Club Of NSEC</span>
                            </div>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
              </div>
            </center></body>
        </html>`
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
