import express from "express";
import cors from "cors";
import { launch } from "puppeteer";
import { getProfileData } from "./profile.js";
import { getRepositories } from "./repositories.js";
import { getRepositoryDetails } from "./repositoryDetails.js";
import { getRepositoryAllRepositories, getReposPageCount } from "./allRepositories.js";
import { getUptime } from "./time.js";
import { sendConsoleMessage } from "./console_message.js";

// const variable 
const app = express();
app.use(cors());
const PORT = 4000;
sendConsoleMessage("STARTING", `Port configured on ${PORT}`)

// to remember when started
const startTime = Date.now();
sendConsoleMessage("STARTING", `Start time set to ${startTime}`)


// const text values
const repoName = "github-scraper-api";
const dockerImageName = "scraper-api"

// initialize the browser
let browser;
const initializeBrowser = async () => {
    if (!browser) {
        browser = await launch({
            args: ["--no-sandbox", "--disable-setuid-sandbox"],
        });
    }
};

// to check server status
app.get('/health', (req, res) => {
    res.json({
        status: "ok",
        timestamp: new Date().toISOString(),
        uptime: getUptime(startTime),
        version: "1.1.0"
    });
    sendConsoleMessage("GET", "/health")
});

// to get project info
app.get('/info', (req, res) => {
    res.json({
        creator: "Aitaneuh",
        description: "This API is made to give an easy access to data from github or maybe others in the future",
        started_on: "04.03.2025",
        github_repo: `https://github.com/Aitaneuh/${repoName}`,
        docker_image: `aitaneuh/${dockerImageName}:latest`,
        repo_stats: `http://localhost:4000/github/repository/Aitaneuh/${repoName}`
    });
    sendConsoleMessage("GET", "/info")

});

// to get server uptime
app.get('/uptime', (req, res) => {
    res.json({
        uptime: ((Date.now() - startTime)),
    });
    sendConsoleMessage("GET", "/uptime")

});

// get github profile info
app.get("/github/profile/:username", async (req, res) => {
    const startTaskTime = Date.now()

    try {
        const username = req.params.username;
        const url = `https://github.com/${username}`;
        const repositoriesUrl = `https://github.com/${username}?tab=repositories`;

        await initializeBrowser();
        const page = await browser.newPage();
        await page.goto(url, { waitUntil: "domcontentloaded" });

        const profileData = await getProfileData(page);

        await page.goto(repositoriesUrl, { waitUntil: "domcontentloaded" });
        const repositories = await getRepositories(page);

        res.json({ ...profileData, repositories });
        const endTaskTime = Date.now()
        sendConsoleMessage("GET", `/github/profile/${username} - Response time : ${endTaskTime - startTaskTime}ms`)

    } catch (error) {
        sendConsoleMessage("ERROR", `Error fetching profile data:, \n${error}`)
        res.status(500).send("An error occurred while fetching the profile data.");
    }
});

// get github repo info
app.get("/github/repository/:username/:repo", async (req, res) => {
    const startTaskTime = Date.now()

    try {
        const { username, repo } = req.params;
        const repoUrl = `https://github.com/${username}/${repo}`;

        await initializeBrowser();
        const page = await browser.newPage();
        await page.goto(repoUrl, { waitUntil: "domcontentloaded" });

        const repoDetails = await getRepositoryDetails(page);

        res.json(repoDetails);
        const endTaskTime = Date.now()
        sendConsoleMessage("GET", `/github/repository/${username}/${repo} - Response time : ${endTaskTime - startTaskTime}ms`)
    } catch (error) {
        sendConsoleMessage("ERROR", `Error fetching repository details:, \n${error}`)
        res.status(500).send("An error occurred while fetching the repository details.");
    }
});

// get all repo for someone
app.get("/github/all-repositories/:username", async (req, res) => {
    const startTaskTime = Date.now()
    try {
        const { username } = req.params;
        const countUrl = `https://github.com/${username}`;

        await initializeBrowser();
        const countPage = await browser.newPage();
        await countPage.goto(countUrl, { waitUntil: "domcontentloaded" });

        const pageCount = await getReposPageCount(countPage);
        const allRepositories = await getRepositoryAllRepositories(browser, username, pageCount);

        res.json(allRepositories);
        const endTaskTime = Date.now()
        sendConsoleMessage("GET", `/github/all-repositories/${username} - Response time : ${endTaskTime - startTaskTime}ms`)
    } catch (error) {
        sendConsoleMessage("ERROR", `Error fetching all repositories:, \n${error}`)
        res.status(500).send("An error occurred while fetching all repositories.");
    }
});

// server started message
app.listen(PORT, () => {
    sendConsoleMessage("STARTED", `Server running on port ${PORT}`)
});

setInterval(() => {
    sendConsoleMessage("STATUS", `Server is fine. Uptime : ${getUptime(startTime)}`)
}, 1000000)