export async function getProfileData(page) {
    return await page.evaluate(() => {
        const name = document.querySelector("span.p-name")?.innerText.trim() || "No name";
        const bio = document.querySelector("div.p-note")?.innerText.trim() || "No bio";
        const followers = document.querySelector("a[href$='followers'] span")?.innerText.trim() || "0";
        const following = document.querySelector("a[href$='following'] span")?.innerText.trim() || "0";
        const reposCount = document.querySelector("a[href$='?tab=repositories']")?.innerText.match(/\d+/)?.[0] || "0";
        const org = document.querySelector("span.p-org")?.innerText.trim() || "none";
        let location = document.querySelector("span.p-label")?.innerText.trim() || "none";

        const timeRegex = /\d{1,2}:\d{2}/;
        let currentTime = "none";

        if (timeRegex.test(location)) {
            currentTime = location;
            location = "none";
        } else {
            currentTime = document.querySelectorAll("span.p-label")[1]?.innerText.trim() || "none";
        }

        let links = Array.from(document.querySelectorAll("a.Link--primary.wb-break-all"));
        links = links.map(link => link.getAttribute("href") || "none");

        return { name, bio, followers, following, reposCount, org, location, currentTime, links };
    });
}
