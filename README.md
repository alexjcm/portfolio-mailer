# Web service app &middot; [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/facebook/react/blob/master/LICENSE) ![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)

## Installation

Clone or download this repository:

```
git clone https://github.com/alexjcm/portfolio-mailer.git
```

## Dependencies

- NodeJS 14
- [expressjs](https://github.com/expressjs/express) - The server for handling and routing HTTP requests. It is a backend framework for Node.js.
- [nodemailer](https://github.com/nodemailer/nodemailer) - Is a module for Node.js applications to allow easy as cake email sending

## Installation

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:5000](http://localhost:5000) to view it in the browser.

## Deployment with docker

Build image:

```bash
docker build -t alexjcm/portfolio-mailer -f DockerfilePro .
```

Or

```bash
docker pull alexjcm/portfolio-mailer
```

Start container:

```bash
docker run --rm -d -p 5000:5000 --name my-portfolio-mailer alexjcm/portfolio-mailer
```

Stop container:

```bash
docker stop my-portfolio-mailer
```

## Conventional commits

To view the convention used for commit messages, [click here](https://gist.github.com/alexjcm/6cc0a0a1ed96c85675a9d92706e1099d)

### License

[MIT licensed](./LICENSE).
