export async function getRepositoryDetails(page) {
    return await page.evaluate(() => {
        const name = document.querySelector("strong.mr-2.flex-self-stretch a")?.innerText.trim() || "Unnamed";
        const description = document.querySelector("p.f4.my-3")?.innerText.trim() || "No description";

        const stars = document.querySelector("span.Counter.js-social-count")?.innerText.trim() || "Not found";

        const forks = document.querySelector("span.Counter")?.innerText.trim() || "Not found";


        const commitElement = document.querySelector("span.fgColor-default");
        let commits = "Not found";
        if (commitElement) {
            commits = commitElement.innerText.split(" ")[0].replace(",", "") || "Not found";
        }

        let contributors;
        const contributorsText = document.querySelector("a[href*='/graphs/contributors']")?.innerText.trim() || "Not found";
        if (contributorsText == "Not found") {
            contributors = "Not found";
        } else {
            contributors = contributorsText.replace(/[^0-9K+]/g, "");
        }

        let languages = Array.from(document.querySelectorAll("span.color-fg-default.text-bold.mr-1"))
            .map(span => span.innerText.trim());

        languages = languages.length > 0 ? languages : ["Unknown"];

        return { name, description, commits, stars, forks, languages, contributors };
    });
}

