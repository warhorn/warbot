const Bot = require("./bot");

const token = "deadbeef";

describe("start", () => {
  test("logs in", () => {
    const bot = new Bot(token);
    // mock out login to suppress its side effects
    const spy = jest.spyOn(bot.client, "login").mockImplementation(() => {});

    bot.start();

    expect(spy).toHaveBeenCalledWith(token);
  });
});
