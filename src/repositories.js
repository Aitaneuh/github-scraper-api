export async function getRepositories(page) {
    return await page.evaluate(() => {
        const repos = [];
        document.querySelectorAll("li.public").forEach(repo => {
            const name = repo.querySelector("a[itemprop='name codeRepository']")?.innerText.trim() || "Unnamed";
            const description = repo.querySelector("p")?.innerText.trim() || "No description";
            const stars = repo.querySelector("a[href*='stargazers']")?.innerText.trim() || "0";
            const language = repo.querySelector("[itemprop='programmingLanguage']")?.innerText.trim() || "Unknown";

            repos.push({ name, description, stars, language });
        });


        // Note that it only return the 30 firsts ones because these are the one loaded when you open the repos tab and then you have to change page at the bottom to load more
        // use /github/all-repositories/:username if you want every repository
        return repos;
    });
}
