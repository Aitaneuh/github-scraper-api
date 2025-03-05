import express from "express";
import cors from "cors";
import { launch } from "puppeteer";
import { getProfileData } from "./profile.js";
import { getRepositories } from "./repositories.js";
import { getRepositoryDetails } from "./repositoryDetails.js";

const app = express();
app.use(cors());
const PORT = 3000;

app.get("/github/:username", async (req, res) => {
    const username = req.params.username;
    const url = `https://github.com/${username}`;
    const repositoriesUrl = `https://github.com/${username}?tab=repositories`;

    const browser = await launch({ headless: true });
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: "domcontentloaded" });

    const profileData = await getProfileData(page);

    await page.goto(repositoriesUrl, { waitUntil: "domcontentloaded" });
    const repositories = await getRepositories(page);

    await browser.close();

    res.json({ ...profileData, repositories });
});

app.get("/github/:username/:repo", async (req, res) => {
    const { username, repo } = req.params;
    const repoUrl = `https://github.com/${username}/${repo}`;

    const browser = await launch({ headless: true });
    const page = await browser.newPage();
    await page.goto(repoUrl, { waitUntil: "domcontentloaded" });

    const repoDetails = await getRepositoryDetails(page);

    await browser.close();
    res.json(repoDetails);
});


app.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}/github/`));
