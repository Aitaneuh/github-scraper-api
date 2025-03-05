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

        return repos;
    });
}
