const { google } = require('googleapis');
const fs = require('fs');
const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI
);
oauth2Client.setCredentials({ refresh_token: process.env.GOOGLE_REFRESH_TOKEN });
const drive = google.drive({ version: 'v3', auth: oauth2Client });
async function uploadFileToDrive(filePath, fileName, mimeType = 'application/pdf') {
  const fileMetadata = {
    name: fileName,
    parents: process.env.GOOGLE_DRIVE_FOLDER_ID ? [process.env.GOOGLE_DRIVE_FOLDER_ID] : undefined,
  };
  const media = { mimeType, body: fs.createReadStream(filePath) };
  const res = await drive.files.create({
    resource: fileMetadata,
    media: media,
    fields: 'id, webViewLink, webContentLink'
  });
  return res.data;
}
module.exports = { uploadFileToDrive };
