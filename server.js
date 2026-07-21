const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// Parse JSON requests
app.use(express.json());

// Serve static files
app.use(express.static(__dirname));

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
app.post("/submit", (req, res) => {

    try {

        const newResponse = {
            id: Date.now(),
            submittedAt: new Date().toLocaleString(),
            ...req.body
        };

        const data = fs.readFileSync(FILE, "utf8");
        const responses = JSON.parse(data);

        responses.push(newResponse);

        fs.writeFileSync(
            FILE,
            JSON.stringify(responses, null, 4)
        );

        res.json({
            success: true,
            message: "Response saved ❤️"
        });

    } catch (err) {

        console.error(err);

        res.status(500).json({
            success: false,
            message: "Server error"
        });

    }

});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});