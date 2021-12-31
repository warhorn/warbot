const Bot = require("./bot");

describe("start", () => {
  test("logs in", () => {
    const bot = new Bot();
    // mock out login to suppress its side effects
    const spy = jest.spyOn(bot.client, "login").mockImplementation(() => {});

    bot.start();

    expect(spy).toHaveBeenCalled();
  });
});
