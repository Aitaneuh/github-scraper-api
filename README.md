# GitHub Scraping API

This project uses Puppeteer to scrape data from GitHub and provides an easy-to-use API to access the data of a GitHub profile and its repositories.

## Installation

Clone the repository and install the dependencies with the following commands:

```bash
git clone https://github.com/Aitaneuh/github-scraper-api.git
cd github-scraper-api
npm install
```

## Usage

1. Start the server with the following command:

```bash
node server.js
```

2. Once the server is running, you can query the API to get profile or repository information.

### 1. **Get GitHub Profile Information**

Access a GitHub user's profile by sending a GET request to the following URL:

```
http://localhost:3000/github/:username
```

Replace `:username` with the GitHub username of the person you want to get information about.

**Example**:
```bash
GET http://localhost:3000/github/Aitaneuh
```

**Response (Example)**:
```json
{
  "name": "Aitaneuh",
  "bio": "I am learning computer science and software development. I live in Switzerland.",
  "followers": "4",
  "following": "9",
  "reposCount": "10",
  "avatarUrl": "https://avatars.githubusercontent.com/u/130589742?v=4",
  "org": "none",
  "location": "none",
  "currentTime": "20:58 (UTC +01:00)",
  "links": [
    "https://x.com/Aitaneuh"
  ],
  "repositories": [
    {
      "name": "github-scraper-api",
      "description": "A small project that creates a little API to get the data of a GitHub profile.",
      "stars": "0",
      "language": "JavaScript"
    },
    {
      "name": "JS-Shell-Utility",
      "description": "A customizable JavaScript-based shell utility that allows users to execute predefined commands in a console-like environment.",
      "stars": "0",
      "language": "JavaScript"
    },
    {
      "name": "Flutter-Structure-Creation",
      "description": "A PowerShell file that creates all the Flutter structure you need.",
      "stars": "0",
      "language": "PowerShell"
    },
    {
      "name": "Aitaneuh",
      "description": "No description",
      "stars": "0",
      "language": "Unknown"
    },
    {
      "name": "Scream",
      "description": "A Discord Bot to manage the Scream Discord Server, providing an easy environment to find Rocket League Scrims.",
      "stars": "0",
      "language": "Python"
    },
    {
      "name": "SQLite-Browser",
      "description": "SQLite Browser is a tool used to interact with .db files.",
      "stars": "0",
      "language": "C#"
    },
    {
      "name": "RL-Replay-Viewer",
      "description": "A WPF C# app to open Rocket League .replay files without having to open them in Rocket League.",
      "stars": "0",
      "language": "C#"
    },
    {
      "name": "SRLC-3.0",
      "description": "The only Swiss PUG platform for Rocket League!",
      "stars": "0",
      "language": "Python"
    },
    {
      "name": "Rocket-Tournament-League-Discord-Bot",
      "description": "No description",
      "stars": "0",
      "language": "Python"
    },
    {
      "name": "2BallChasers",
      "description": "No description",
      "stars": "0",
      "language": "Python"
    }
  ]
}
```

### 2. **Get Repository Details**

Access the details of a specific repository by sending a GET request to the following URL:

```
http://localhost:3000/github/:username/:repo
```

Replace `:username` with the GitHub username and `:repo` with the repository name.

**Example**:
```bash
GET http://localhost:3000/github/Aitaneuh/github-scraper-api
```

**Response (Example)**:
```json
{
  "name": "github-scraper-api",
  "description": "A small project that creates a little API to get the data of a GitHub profile.",
  "commits": "3",
  "stars": "0",
  "forks": "0",
  "languages": ["JavaScript"],
  "contributors": "Not Found"
}
```

## Project Structure

### 1. **Main Files**:

- `server.js`: Contains the Express server code and API routes.
- `profile.js`: Contains the logic for fetching profile data.
- `repositories.js`: Contains the logic for fetching public repositories of a user.
- `repositoryDetails.js`: Contains the logic for fetching detailed information about a specific repository.

### 2. **Features**:

- **`getProfileData(page)`**: Fetches profile information like name, bio, followers, repositories count, and more.
- **`getRepositories(page)`**: Fetches a list of repositories, including repository name, description, stars, and language.
- **`getRepositoryDetails(page)`**: Fetches detailed information about a repository, such as commits, forks, contributors, languages used, and last update.

## Technologies Used

- **Puppeteer**: For scraping data from GitHub pages.
- **Express**: For setting up the server and handling API requests.
- **Cors**: To allow requests from different origins.

## Future Features

- Include additional data like issues or pull requests.
- Support for fetching stars and forks for organizations. (Still not sure)

## Contributions

Contributions are welcome! Feel free to submit pull requests to improve the project or add new features.