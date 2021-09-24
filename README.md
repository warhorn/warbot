# Warbot

A [Discord](https://discord.com/) bot for [Warhorn](https://warhorn.net)

## Developers

See CONTRIBUTING.md for general contribution guidelines.

Warbot is written in [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript) and runs on [Node.js](https://nodejs.org/) (v16.6.0 or higher).

### Build and run Warbot locally

1. Install Node.

   If you aren't familiar with how to do this, Discord.js has a [great explanation of how to do this](https://discordjs.guide/preparations/#installing-node-js).

   _Note:_ This project contains an `.nvmrc` file in case you'd like to use [NVM](https://github.com/nvm-sh/nvm) to manage your Node installation.

2. Install dependencies

   ```sh
   $ npm install

   added 28 packages, and audited 29 packages in 400ms

   4 packages are looking for funding
     run `npm fund` for details

   found 0 vulnerabilities
   ```

3. Create your local environment file

   ```sh
   $ cp .env.sample .env
   ```

   Retrieve the bot token from the [Discord bot settings page](https://discord.com/developers/applications/701978523182694481/bot) and replace the `DISCORD_BOT_TOKEN` environment variable's placeholder value with the real bot token. If you do not have access to that page, ask for it in `#bot_dev` on the Warhorn Discord server.

4. Start the bot

   ```sh
   $ npm start

   > warbot@0.0.1 start
   > node src/index.js

   Ready!
   ```

### Code style and quality

This project uses [Prettier](https://prettier.io/) to auto-format code and [ESLint](https://eslint.org/) to detect code quality issues.

Prettier runs in a git pre-commit hook, so code formatting will happen when you stage changes. You can also [set up your editor](https://prettier.io/docs/en/editors.html) to run it as you work.

Similarly, you can [set up your editor](https://eslint.org/docs/user-guide/integrations) to run ESLint as you make changes.
