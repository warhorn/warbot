# Warbot

A [Discord](https://discord.com/) bot for [Warhorn](https://warhorn.net)

## Developers

See CONTRIBUTING.md for general contribution guidelines.

Warbot is written in [TypeScript](https://www.typescriptlang.org/) and runs on [Node.js](https://nodejs.org/).

### Build and run Warbot locally

1. Install Node.

   If you aren't familiar with how to do this, Discord.js has a [great explanation of how to do this](https://discordjs.guide/preparations/#installing-node-js).

   _Note:_ Discord.js, and therefore this bot, require Node v16.6.0 at minimum.

   _Note:_ This project contains an `.nvmrc` file in case you'd like to use [NVM](https://github.com/nvm-sh/nvm) to manage your Node installation.

2. Install dependencies

   ```sh
   $ npm install

   > warbot@0.0.2 prepare
   > husky install

   husky - Git hooks installed

   up to date, audited 820 packages in 1s

   59 packages are looking for funding
   run `npm fund` for details

   found 0 vulnerabilities
   ```

3. Create your local environment file

   <!-- markdownlint-disable MD014 -->

   ```sh
   $ cp .env.sample .env
   ```

   <!-- markdownlint-restore -->

   Retrieve the bot token from the [Discord bot settings page](https://discord.com/developers/applications/701978523182694481/bot) and replace the `DISCORD_BOT_TOKEN` environment variable's placeholder value with the real bot token. If you do not have access to that page, ask for it in `#bot_dev` on the Warhorn Discord server.

   Ask [@bcm](https://github.com/bcm) for the Warhorn app token and replace the `WARHORN_APP_TOKEN` environment variable's placeholder with the real app token.

4. Run the tests

   ```sh
   $ npm test

   > warbot@0.0.2 test
   > jest --detectOpenHandles --forceExit --verbose

   ...

   Test Suites: 6 passed, 6 total
   Tests:       17 passed, 17 total
   Snapshots:   0 total
   Time:        1.657 s, estimated 2 s
   Ran all test suites.
   ```

   You can also run the tests in "watch" mode, which re-runs them every time a source file changes.

   ```sh
   $ npm run test:watch

   ...

   Test Suites: 6 passed, 6 total
   Tests:       17 passed, 17 total
   Snapshots:   0 total
   Time:        1.628 s, estimated 2 s
   Ran all test suites.

   Watch Usage
   › Press f to run only failed tests.
   › Press o to only run tests related to changed files.
   › Press p to filter by a filename regex pattern.
   › Press t to filter by a test name regex pattern.
   › Press q to quit watch mode.
   › Press Enter to trigger a test run.
   ```

5. Start the bot

   ```sh
   $ npm start

   > warbot@0.0.2 start
   > node dist/index.js

   {"@timestamp":"2022-01-01T02:35:25.838Z","log.level":"info","message":"Logged into Discord as 'bcm testbot#0942'","ecs":{"version":"1.6.0"}}
   ```

### Code style and quality

This project uses [Prettier](https://prettier.io/) to auto-format code and [ESLint](https://eslint.org/) to detect code quality issues.

Prettier runs in a git pre-commit hook, so code formatting will happen when you stage changes. You can also [set up your editor](https://prettier.io/docs/en/editors.html) to run it as you work.

Similarly, you can [set up your editor](https://eslint.org/docs/user-guide/integrations) to run ESLint as you make changes.
