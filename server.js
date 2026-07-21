const express = require("express");
const fs = require("fs");
const path = require("path");
const { google } = require("googleapis");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static(__dirname));

const auth = new google.auth.GoogleAuth({
    keyFile: "service-account.json",
    scopes: [
        "https://www.googleapis.com/auth/spreadsheets"
    ]
});

const sheets = google.sheets({
    version: "v4",
    auth
});

const SPREADSHEET_ID = "1Qmj28STjpOpxH9bZbaMuzIh1lRY3nNWnJLaY-b6QuUI";


const DATA_DIR = path.join(__dirname, "data");
const FILE = path.join(DATA_DIR, "responses.json");

// Create data folder
if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR);
}

// Create JSON file
if (!fs.existsSync(FILE)) {
    fs.writeFileSync(FILE, "[]");
}

// Home page
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

// Health Check
app.get("/health", (req, res) => {
    res.send("Server is running");
});

// Save responses
app.post("/submit", async (req, res) => {

    try {

        const {
            date,
            time,
            place,
            message
        } = req.body;

        await sheets.spreadsheets.values.append({

            spreadsheetId: SPREADSHEET_ID,

            range: "Sheet1!A:E",

            valueInputOption: "USER_ENTERED",

            requestBody: {

                values: [[

                    new Date().toLocaleString(),

                    date,

                    time,

                    place,

                    message

                ]]

            }

        });

        res.json({

            success: true,

            message: "Response saved ❤️"

        });

    } catch (err) {

        console.error(err);

        res.status(500).json({

            success: false,

            message: "Failed to save response"

        });

    }

});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

