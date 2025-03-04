# GitHub Scraping API

This project uses Puppeteer to scrape data from GitHub and provides an easy-to-use API to access the data.

## Installation

To get started, clone the repository and install the dependencies:

```bash
git clone https://github.com/Aitaneuh/github-scraper-api.git
cd github-scraper-api
npm install
```

## Usage

In your `github-scraper-api` directory, run the following command to start the server:

```bash
node server.js
```

Finally, you can access the data by visiting this URL: `http://localhost:3000/github/Aitaneuh`. It will return a JSON response like this:

```json
{
  "name": "Aitaneuh",
  "bio": "I am learning computer science and software developement. I live in Switzerland.",
  "followers": "3",
  "following": "9",
  "repos": "10",
  "projects": "0",
  "packages": "0",
  "stars": "22",
  "org": "none",
  "location": "none",
  "currentTime": "23:05 (UTC +01:00)",
  "links": [
    "https://x.com/Aitaneuh"
  ]
}
```

## Future Plans

I plan to convert the fields `"repos"`, `"projects"`, `"packages"`, and maybe `"stars"` into a list of objects containing their respective data.

### Contributing

I am totally open to pull requests if you want to help improve this small project!