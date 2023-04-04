# Hookdown

![preview](https://github.com/AkiraVoid-Productions/Hookdown/main/public/img/github-preview.png)

Hookdown is a website that hosts a Markdown editor. By using hookdown, you could edit Markdown without any other efforts, and most importantly, it let you configure a webhook which could be used to automatically publish your works.

## Usage and deployment

To use Hookdown, you need firstly find a Hookdown provider, or download the Hookdown deployment pack on GitHub releases, and deploy it by yourself.

### Using Hookdown without deployment/after deployment

The usage of Hookdown is quite simple right now. Basically you could just use it as you use other Markdown editors. The special things are:

- Hookdown offers a toolbar that could be used for visualized editing.
- The toolbar contains a button of settings, click it and you will be able to change the configurations of the website and editor.
- For using webhook, you should first configure the Webhook section in settings. You must provide a URL, and optionally others.
- Once you configured webhook, you could simply click the button nearby the settings button, then Hookdown will send the texts you written to the webhook you've configured.

### Deploy Hookdown by yourself

1. Install [Node.js](https://nodejs.org/en). Hookdown is written on Node.js v18.15.0, and has not been tested on other versions, so we suggest you use the same version. But in theory, it should be usable on other versions that Next.js 13 supports (Node.js 14.6.0 or newer).
2. [Go to releases page](https://github.com/AkiraVoid-Productions/Hookdown/releases) to download the `hookdown-deployment-pack` of specified version, or [Go to download the latest pack directly](https://github.com/AkiraVoid-Productions/Hookdown/releases/latest).
3. Unzip the deployment pack to anywhere you like.

#### For NPM users:

4. At the root directory of unzipped deployment pack, run following code in bash/cmd:
   ```bash
   npm install --omit=dev
   npm run start
   ```
5. Now your app should be successfully started. By default it listens to port 3000, you could use the switch `-p` to specify other ports. For example, run `npm run start -p 3001` to listen to port 3001.

#### For yarn users:

4. [Enable yarn corepack](https://yarnpkg.com/getting-started/install).
5. Locates to the root directory of unzipped deployment pack.
6. Install workspace tool by running following code in bash/cmd:
   ```bash
   yarn plugin import workspace-tools
   ```
   This command will download a package from `raw.githubusercontent.com`, so you may need [set yarn proxy](https://yarnpkg.com/configuration/yarnrc#httpsProxy) to make it accessible.
7. Then run:
   ```bash
   yarn workspaces focus --production
   yarn start
   ```
8. Now your app should be successfully started. By default it listens to port 3000, you could use the switch `-p` to specify other ports. For example, run `yarn start -p 3001` to listen to port 3001.

#### Use Process Manager 2 (PM2) to daemonize process

The deployment pack includes a `ecosystem.config.js` file which could be used by PM2 to daemonize your app. This is designed for yarn, so make sure you have executed [these steps](#for-yarn-users) and have not got any error.

| ℹ INFO                                                                                                                                                                                                                                                                                                                                                    |
| :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Although the original `ecosystem.config.js` is designed for yarn, you could simply change some of its configurations to switch to npm. Basically, all you need to do is change `script: "yarn"` to `script: "npm run"`. For more info about PM2's `ecosystem.config.js`, see [their docs](https://pm2.keymetrics.io/docs/usage/application-declaration/). |

1. To install PM2 on your server, run following code in bash/cmd:
   ```bash
   npm i -g pm2
   ```
2. Then run following code start and daemonize your app:
   ```bash
   pm2 start ecosystem.config.js
   ```
3. The status of your app could be checked by:
   ```bash
   pm2 list
   ```

For more info about PM2, see [their docs](https://pm2.keymetrics.io/docs/usage/process-management/).

## For contributors

For programmers who want to submit code to this repo, we ask you:

- Respect the code styles of this repo.
- Before making pull request, make sure that there is an issue about what you are going to do.
- Commit with conventional commits.

For all contributors and who want to contribute, make sure you followed the [Code of Conduct](https://github.com/AkiraVoid-Productions/Hookdown/blob/main/CODE_OF_CONDUCT.md).

## Development guidance

> This section is under construction.

We use [Visual Studio Code](https://code.visualstudio.com/) as main editor. Once you opened this project in Visual Studio Code, you could find some recommended extensions in Extension tab. Install them to keep consistent development experience with us. You may be asked by Visual Studio Code to use a workspace edition of TypeScript if you opened a TypeScript file, make sure you accept it.

We use Yarn 3 as package manager, you could find a installation guide on its [official website](https://yarnpkg.com/getting-started/install). Once you installed Yarn 3, run code below at the root of the project:

```bash
yarn install
```

It will install all needed dependencies for you.

## License

This project is open-sourced under the [MIT license](https://github.com/AkiraVoid-Productions/Hookdown/blob/main/LICENSE).

## Contributors

| Name       | Email            |
| ---------- | ---------------- |
| @AkiraVoid | me@akiravoid.com |
