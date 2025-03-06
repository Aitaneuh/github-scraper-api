# GitHub Scraping API

This project uses Puppeteer to scrape data from GitHub and provides an easy-to-use API to access GitHub profile data and repository details.

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
node src/server.js
```

2. Once the server is running, you can query the API to retrieve profile or repository information.

### 1. **Get GitHub Profile Information**

Access a GitHub user's profile by sending a GET request to the following URL:

```
http://localhost:3000/github/profile/:username
```

Replace `:username` with the GitHub username you want to retrieve information about.

**Example**:
```bash
GET http://localhost:3000/github/profile/Aitaneuh
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
    }
  ]
}
```

### 2. **Get Repository Details**

Retrieve details of a specific repository by sending a GET request to:

```
http://localhost:3000/github/repository/:username/:repo
```

Replace `:username` with the GitHub username and `:repo` with the repository name.

**Example**:
```bash
GET http://localhost:3000/github/repository/Aitaneuh/github-scraper-api
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

### 3. **Get All Repositories of a User (it can take some time if there are a lot of repositories)**

Retrieve all public repositories of a user by sending a GET request to:

```
http://localhost:3000/github/all-repositories/:username
```

Replace `:username` with the GitHub username.

**Example**:
```bash
GET http://localhost:3000/github/all-repositories/Aitaneuh
```

**Response (Example)**:
```json
[
  {
    "name": "github-scraper-api",
    "description": "A small project that creates a little API to get the data of a GitHub profile.",
    "stars": "0",
    "language": "JavaScript"
  }
]
```

## Project Structure

### 1. **Main Files**:

- `server.js`: Contains the Express server code and API routes.
- `profile.js`: Fetches GitHub profile data.
- `repositories.js`: Fetches a list of repositories of a user.
- `repositoryDetails.js`: Fetches detailed information about a repository.
- `allRepositories.js`: Fetches all public repositories of a user.

### 2. **Features**:

- **`getProfileData(page)`**: Retrieves profile information such as name, bio, followers, and repositories count.
- **`getRepositories(page)`**: Retrieves a list of repositories with name, description, stars, and language.
- **`getRepositoryDetails(page)`**: Retrieves detailed information about a repository, including commits, forks, contributors, and languages.
- **`getRepositoryAllRepositories(browser, username, pageCount)`**: Retrieves all repositories of a user.

## Technologies Used

- **Puppeteer**: Used for web scraping GitHub data.
- **Express**: Handles API requests and server routing.
- **Cors**: Enables cross-origin requests.

## Future Features

- Include additional data like issues or pull requests.
- Support for fetching stars and forks for organizations.

## Contributions

Contributions are welcome! Feel free to submit pull requests to improve the project or add new features.

