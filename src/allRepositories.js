export async function getRepositoryAllRepositories(browser, username, pageCount) {
    const repos = [];

    if (pageCount == 1) {
        const repositoriesUrl = `https://github.com/${username}?tab=repositories`;

        const page = await browser.newPage();
        await page.goto(repositoriesUrl, { waitUntil: "domcontentloaded" });

        const pageRepos = await page.evaluate(() => {
            const pageReposArray = [];
            document.querySelectorAll("li.public").forEach(repo => {
                const name = repo.querySelector("a[itemprop='name codeRepository']")?.innerText.trim() || "Unnamed";
                const description = repo.querySelector("p")?.innerText.trim() || "No description";
                const stars = repo.querySelector("a[href*='stargazers']")?.innerText.trim() || "0";
                const language = repo.querySelector("[itemprop='programmingLanguage']")?.innerText.trim() || "Unknown";

                pageReposArray.push({ name, description, stars, language });
            });
            return pageReposArray;
        });

        repos.push(...pageRepos);
    } else {
        for (let i = 1; i <= pageCount; i++) {
            const repositoriesUrl = `https://github.com/${username}?page=${i}&tab=repositories`;

            const page = await browser.newPage();
            await page.goto(repositoriesUrl, { waitUntil: "domcontentloaded" });

            const pageRepos = await page.evaluate(() => {
                const pageReposArray = [];
                document.querySelectorAll("li.public").forEach(repo => {
                    const name = repo.querySelector("a[itemprop='name codeRepository']")?.innerText.trim() || "Unnamed";
                    const description = repo.querySelector("p")?.innerText.trim() || "No description";
                    const stars = repo.querySelector("a[href*='stargazers']")?.innerText.trim() || "0";
                    const language = repo.querySelector("[itemprop='programmingLanguage']")?.innerText.trim() || "Unknown";

                    pageReposArray.push({ name, description, stars, language });
                });
                return pageReposArray;
            });

            repos.push(...pageRepos);
        }
    }

    return repos;
}


export async function getReposPageCount(page) {
    return await page.evaluate(() => {
        const reposCount = document.querySelector("a[href$='?tab=repositories']")?.innerText.match(/\d+/)?.[0] || "0";

        let count = Math.ceil(reposCount / 30)
        return count;
    });
}
