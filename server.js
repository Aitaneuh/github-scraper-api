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
        const name = document.querySelector("span.p-name")?.innerText.trim() || "No name";
        const bio = document.querySelector("div.p-note")?.innerText.trim() || "No bio";
        const followers = document.querySelector("a[href$='followers'] span")?.innerText.trim() || "0";
        const following = document.querySelector("a[href$='following'] span")?.innerText.trim() || "0";
        const repos = document.querySelector("a[href$='?tab=repositories']")?.innerText.match(/\d+/)?.[0] || "0";

        return { name, bio, followers, following, repos };
    });

    await browser.close();
    res.json(stats);
});

app.listen(PORT, () => console.log(`🚀 Server started on http://localhost:${PORT}`));
