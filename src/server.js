import express from "express";
import cors from "cors";
import { launch } from "puppeteer";
import { getProfileData } from "./profile.js";
import { getRepositories } from "./repositories.js";
import { getRepositoryDetails } from "./repositoryDetails.js";
import { getRepositoryAllRepositories, getReposPageCount } from "./allRepositories.js";
import { getUptime } from "./time.js";

const app = express();
app.use(cors());
const PORT = 4000;
const startTime = Date.now();
const repoName = "github-scraper-api";
const dockerImageName = "scraper-api"

let browser;
const initializeBrowser = async () => {
    if (!browser) {
        browser = await launch({
            args: ["--no-sandbox", "--disable-setuid-sandbox"],
        });
    }
};

app.get('/health', (req, res) => {
    res.json({
        status: "ok",
        timestamp: new Date().toISOString(),
        uptime: getUptime(startTime),
        version: "1.1.0"
    });
});

app.get('/info', (req, res) => {
    res.json({
        creator: "Aitaneuh",
        description: "This API is made to give an easy access to data from github or maybe others in the future",
        started_on: "04.03.2025",
        github_repo: `https://github.com/Aitaneuh/${repoName}`,
        docker_image: `aitaneuh/${dockerImageName}:latest`,
        repo_stats: `http://localhost:4000/github/repository/Aitaneuh/${repoName}`
    });
});

app.get('/uptime', (req, res) => {
    res.json({
        uptime: ((Date.now() - startTime)),
    });
});

app.get("/github/profile/:username", async (req, res) => {
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
    } catch (error) {
        console.error("Error fetching profile data:", error);
        res.status(500).send("An error occurred while fetching the profile data.");
    }
});

app.get("/github/repository/:username/:repo", async (req, res) => {
    try {
        const { username, repo } = req.params;
        const repoUrl = `https://github.com/${username}/${repo}`;

        await initializeBrowser();
        const page = await browser.newPage();
        await page.goto(repoUrl, { waitUntil: "domcontentloaded" });

        const repoDetails = await getRepositoryDetails(page);

        res.json(repoDetails);
    } catch (error) {
        console.error("Error fetching repository details:", error);
        res.status(500).send("An error occurred while fetching the repository details.");
    }
});

app.get("/github/all-repositories/:username", async (req, res) => {
    try {
        const { username } = req.params;
        const countUrl = `https://github.com/${username}`;

        await initializeBrowser();
        const countPage = await browser.newPage();
        await countPage.goto(countUrl, { waitUntil: "domcontentloaded" });

        const pageCount = await getReposPageCount(countPage);
        const allRepositories = await getRepositoryAllRepositories(browser, username, pageCount);

        res.json(allRepositories);
    } catch (error) {
        console.error("Error fetching all repositories:", error);
        res.status(500).send("An error occurred while fetching all repositories.");
    }
});


app.listen(PORT, () => {
    console.log(`(${new Date().toISOString()}) - [RUNNING] Server running on port ${PORT}`);
});

