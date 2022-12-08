const { Meteor } = require('meteor/meteor');
const nodemailer = require('nodemailer');
const { google } = require('googleapis');

const type = Meteor.settings.gmailAuth.TYPE;
const user = Meteor.settings.gmailAuth.USER;
const clientId = Meteor.settings.gmailAuth.CLIENT_ID;
const clientSecret = Meteor.settings.gmailAuth.CLIENT_SECRET;
const clientRedirectUrl = Meteor.settings.REDIRECT_URL;
const refreshToken = Meteor.settings.gmailAuth.REFRESH_TOKEN;
const gmailEmail = Meteor.settings.gmailAuth.EMAIL;

const oAuth2Client = new google.auth.OAuth2(
  clientId,
  clientSecret,
  clientRedirectUrl,
);

oAuth2Client.setCredentials({
  refresh_token: refreshToken,
});

async function sendMail(req, res) {
  try {
    const accessToken = await oAuth2Client.getAccessToken();
    const transport = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: type,
        user: user,
        clientId: clientId,
        clientSecret: clientSecret,
        refreshToken: refreshToken,
        accessToken: accessToken,
      },
    });

    const body = req.body;

    const mailOptions = {
      from: `ManoaXchange <${gmailEmail}>`,
      to: body.to,
      subject: body.subject,
      text: body.text,
    };

    const result = await transport.sendMail(mailOptions);
    res.status(200);
    res.send(result);
  } catch (error) {
    console.log(error);
    res.status(400);
    res.send(error);
  }
}

module.exports = {
  sendMail,
};
