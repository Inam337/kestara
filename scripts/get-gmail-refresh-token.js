/**
 * One-time helper: run `npm run get-gmail-refresh-token` to obtain a Gmail API
 * refresh token for GMAIL_REFRESH_TOKEN. Requires GMAIL_CLIENT_ID and
 * GMAIL_CLIENT_SECRET to already be set (env or .env), and the OAuth client's
 * "Authorized redirect URIs" to include http://localhost:3000/oauth2callback.
 */
require("dotenv").config();
const http = require("http");
const { URL } = require("url");
const { google } = require("googleapis");

const PORT = 3000;
const REDIRECT_URI = "http://localhost:" + PORT + "/oauth2callback";

const CLIENT_ID = process.env.GMAIL_CLIENT_ID;
const CLIENT_SECRET = process.env.GMAIL_CLIENT_SECRET;

if (!CLIENT_ID || !CLIENT_SECRET) {
  console.error("Set GMAIL_CLIENT_ID and GMAIL_CLIENT_SECRET (env vars or .env) before running this script.");
  process.exit(1);
}

var oauth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);

var authUrl = oauth2Client.generateAuthUrl({
  access_type: "offline",
  prompt: "consent",
  scope: ["https://www.googleapis.com/auth/gmail.send"]
});

console.log("\n1. Open this URL and sign in as the Gmail account you want to send FROM (e.g. inam.337@gmail.com):\n");
console.log(authUrl + "\n");
console.log("2. Approve access. You'll be redirected back here automatically.\n");

var server = http.createServer(function (req, res) {
  var qs = new URL(req.url, REDIRECT_URI).searchParams;
  var code = qs.get("code");
  var error = qs.get("error");

  if (error) {
    res.end("Authorization failed: " + error + ". You can close this tab.");
    console.error("Authorization denied:", error);
    server.close();
    return;
  }
  if (!code) {
    res.end("No authorization code received.");
    return;
  }

  res.end("Authentication complete. You can close this tab and return to the terminal.");
  server.close();

  oauth2Client.getToken(code).then(function (result) {
    var tokens = result.tokens;
    if (!tokens.refresh_token) {
      console.error(
        "\nNo refresh_token returned. This usually means the account already granted this app access.\n" +
        "Revoke access at https://myaccount.google.com/permissions and run this script again.\n"
      );
      process.exit(1);
    }
    console.log("\nGMAIL_REFRESH_TOKEN=" + tokens.refresh_token + "\n");
    console.log("Add this value to your .env file and to your Vercel project's environment variables.\n");
  }).catch(function (err) {
    console.error("Failed to exchange code for tokens:", err.message);
    process.exit(1);
  });
});

server.listen(PORT, function () {
  console.log("Waiting for the OAuth redirect on " + REDIRECT_URI + " ...");
});
