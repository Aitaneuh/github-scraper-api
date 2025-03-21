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


3. When sending requests, you can watch the console. It should log what happens in real time.

### 1. **Get GitHub Profile Information**

Access a GitHub user's profile by sending a GET request to the following URL:

```
http://localhost:4000/github/profile/:username
```

Replace `:username` with the GitHub username you want to retrieve information about.

**Example**:
```bash
GET http://localhost:4000/github/profile/Aitaneuh
```

**Response (Example)**:
```json
{
  "name": "Aitaneuh",
  "bio": "I am learning computer science and software development. I live in Switzerland.",
  "followers": "4",
  "following": "9",
  "reposCount": "7",
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
http://localhost:4000/github/repository/:username/:repo
```

Replace `:username` with the GitHub username and `:repo` with the repository name.

**Example**:
```bash
GET http://localhost:4000/github/repository/Aitaneuh/github-scraper-api
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
http://localhost:4000/github/all-repositories/:username
```

Replace `:username` with the GitHub username.

**Example**:
```bash
GET http://localhost:4000/github/all-repositories/Aitaneuh
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

## Docker Container

If you prefer to run this API inside a Docker container instead of running it locally, you can use the prebuilt image available on Docker Hub. The image is tagged as `aitaneuh/scraper-api`, and it can be pulled and run with Docker.

### 1. **Pull the Docker Image**

To pull the Docker image, use the following command:

```bash
docker pull aitaneuh/scraper-api:latest
```

### 2. **Run the Docker Container**

After pulling the image, you can run the Docker container with the following command:

```bash
docker run -p 4000:4000 aitaneuh/scraper-api:latest
```

This will start the API inside a Docker container, and you can access it at `http://localhost:4000`.

### 3. **Health Check**

The container includes a basic health check to ensure it is running correctly. You can check the health status by sending a GET request to:

```
http://localhost:4000/health
```

If the container is healthy, it will respond with a `ok` status.

**Response (Example)**:
```json
{
  "status": "ok",
  "timestamp": "2025-03-10T20:56:05.269Z",
  "uptime": "00H 12M 42S",
  "version": "1.3.0"
}
```

## Other Requests

### 1. **Info**

Retrieve information about the project in general by sending a GET request to:

```
http://localhost:4000/info
```

**Example**:
```bash
GET http://localhost:4000/info
```

**Response (Example)**:
```json
{
  "creator": "Aitaneuh",
  "description": "This API is made to give an easy access to data from github or maybe others in the future",
  "started_on": "04.03.2025",
  "github_repo": "https://github.com/Aitaneuh/github-scraper-api",
  "docker_image": "aitaneuh/scraper-api:latest",
  "repo_stats": "http://localhost:4000/github/repository/Aitaneuh/github-scraper-api"
}
```

### 2. **Uptime**

Retrieve only the uptime of the api in milliseconds by sending a GET request to:

```
http://localhost:4000/uptime
```

**Example**:
```bash
GET http://localhost:4000/uptime
```

**Response (Example)**:
```json
{
  "uptime": 10935,
}
```

This for example was an uptime of almost 11 seconds.

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