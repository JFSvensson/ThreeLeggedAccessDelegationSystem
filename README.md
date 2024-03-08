# Assignment WT1 - OAuth + Consuming REST and GraphQL APIs
This project is a three-legged OAuth2 access delegation system for a server-side rendered web application and GitLab. It enables users to log in to the application using their GitLab account and access the following information from GitLab: basic profile information, the 101 most recent GitLab activities, and information about groups, projects, and the latest commit.

## Getting Started
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites
- Node.js
- npm

### Installation
1. Clone the repository:
`git clone git@gitlab.lnu.se:1dv027/student/fs222id/assignment-wt1.git`
2. Install the dependencies:
`npm install`

### Usage
To start the server, run:
`npm start`
To start the server in development mode, run:
`npm run dev`
To run the tests, run:
`npm test`
To lint the code, run:
`npm run lint`

### Built With
- Node.js
- Express
- EJS

### Author
Fredrik Svensson - fs222id@student.lnu.se

### License
This project is licensed under the MIT License - see the LICENSE file for details.

### Inspiration
Much of the code in this repository is inspired by earlier examples and assignments in the courses 1DV026 and 1DV027 at LNU.