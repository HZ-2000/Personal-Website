const contactForm = document.querySelector('.contact-form');

let name = document.getElementById('name');
let email = document.getElementById('email');
let subject = document.getElementById('subject');
let message = document.getElementById('message');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();

  let formData = {
    name: name.value,
    email: email.value,
    subject: subject.value,
    message: message.value
  }

  let xhr = new XMLHttpRequest();
  xhr.open('POST', '/contact');
  xhr.setRequestHeader('content-type', 'application/json');
  xhr.onload = function(){
    console.log(xhr.responseText);
    if(xhr.responseText == 'success'){
      alert('Email sent');
      name.value = '';
      email.value = '';
      subject.value = '';
      message.value = '';
    }
    else {
      alert('Something went wrong');
    }
  }

  xhr.send(JSON.stringify(formData));

})

//for app.js
//https://dev.to/chandrapantachhetri/sending-emails-securely-using-node-js-nodemailer-smtp-gmail-and-oauth2-g3a
const createTransporter = async (req) => {
  const oauth2Client = new OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    "https://developers.google.com/oauthplayground"
  );

  oauth2Client.setCredentials({
    refresh_token: process.env.REFRESH_TOKEN
  });

  const accessToken = await new Promise((resolve, reject) => {
    oauth2Client.getAccessToken((err, token) => {
      if (err) {
        reject("Failed to create access token :(");
      }
      resolve(token);
    });
  });

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: process.env.EMAIL,
      accessToken,
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      refreshToken: process.env.REFRESH_TOKEN
    }
  });

  return transporter;
};

const sendEmail = async (emailOptions) => {
  let emailTransporter = await createTransporter();
  await emailTransporter.sendMail(emailOptions);
};

sendEmail({
  subject: `Message from ${req.body.email}: ${req.body.subject}`,
  text: req.body.message,
  to: process.env.EMAIL,
  from: req.body.email
});
