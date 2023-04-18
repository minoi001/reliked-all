import { google } from "googleapis";
const relikedApiKey = process.env.RELIKED_API_KEY;

export default async function handler(req, res) {
  // need to add authentication & error handling
  const credentials = {
    client_id: process.env.GOOGLE_CLIENT_ID,
    client_email: process.env.GOOGLE_CLIENT_EMAIL,
    project_id: process.env.GOOGLE_PROJECT_ID,
    private_key: process.env.GOOGLE_PRIVATE_KEY.split(String.raw`\n`).join(
      "\n"
    ),
  };

  const auth = new google.auth.GoogleAuth({
    credentials: credentials,
    scopes: "https://www.googleapis.com/auth/spreadsheets",
  });

  // Create client instance for auth
  const client = await auth.getClient();

  // Instance of Google Sheets API
  const googleSheets = google.sheets({ version: "v4", auth: client });

  const spreadsheetId = process.env.PRODUCTS_SPREADSHEET_ID;

  // Get metadata about spreadsheet
  const metaData = await googleSheets.spreadsheets.get({
    auth,
    spreadsheetId,
  });

  // Read rows from spreadsheet
  const getData = await googleSheets.spreadsheets.values.get({
    auth,
    spreadsheetId,
    range: "Sizes!A2:C",
  });

  const sizesObject = getData.data.values.map((x) => ({
    Name: x[0],
    value: x[1],
    label: x[2],
  }));

  res.send(sizesObject);
}
