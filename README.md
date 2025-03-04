# GitHub Stats Scraper API

This project uses Puppeteer to scrap the data from github and provide an easy to use API to access the datas.

## Installation
Just clone the repo and install the dependencies like this :
```
git clone https://github.com/Aitaneuh/github-scraper-api.git
cd github-scraper-api
npm install
```

## Usage 
In your github-scraper-api directory, run this command to start node :
```
node server.js
```
And finally, you can get the datas from this URL : `http://localhost:3000/github/torvalds` and it will return you a JSON like this :
```JSON
{
  "name": "Linus Torvalds",
  "bio": "No bio",
  "followers": "228k",
  "following": "0",
  "repos": "8"
}
```

### By the way, I am totally open to PR if you want to help me out on this small project.