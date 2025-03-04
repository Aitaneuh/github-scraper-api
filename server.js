import { launch } from "puppeteer";
import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
const PORT = 3000;

app.get("/github/:username", async (req, res) => {
    const username = req.params.username;
    const url = `https://github.com/${username}`;

    const browser = await launch({ headless: true });
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: "domcontentloaded" });

    const stats = await page.evaluate(() => {
        const name = document.querySelector("span.p-name")?.innerText.trim() || "none";
        const bio = document.querySelector("div.p-note")?.innerText.trim() || "none";
        const followers = document.querySelector("a[href$='followers'] span")?.innerText.trim() || "0";
        const following = document.querySelector("a[href$='following'] span")?.innerText.trim() || "0";
        const repos = document.querySelector("a[href$='?tab=repositories']")?.innerText.match(/\d+/)?.[0] || "0";
        const projects = document.querySelector("a[href$='?tab=projects']")?.innerText.match(/\d+/)?.[0] || "0";
        const packages = document.querySelector("a[href$='?tab=packages']")?.innerText.match(/\d+/)?.[0] || "0";
        const stars = document.querySelector("a[href$='?tab=stars']")?.innerText.match(/\d+/)?.[0] || "0";
        const org = document.querySelector("span.p-org")?.innerText.trim() || "none";

        let location = document.querySelector("span.p-label")?.innerText.trim() || "none";
        let currentTime = "none";

        // check if location has a time type
        const timeRegex = /\d{1,2}:\d{2}/;
        if (timeRegex.test(location)) {
            currentTime = location;
            location = "none";
        } else {
            currentTime = document.querySelectorAll("span.p-label")[1]?.innerText.trim() || "none";
        }

        let links = Array.from(document.querySelectorAll("a.Link--primary.wb-break-all"));
        links = links.map(link => link.getAttribute("href") || "none");


        return { name, bio, followers, following, repos, projects, packages, stars, org, location, currentTime, links };
    });

    await browser.close();
    res.json(stats);
});

app.listen(PORT, () => console.log(`🚀 Server started on http://localhost:${PORT}/github/`));
