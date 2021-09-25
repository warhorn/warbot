const Bot = require("./bot");

const TOKEN = "deadbeef";

let bot;
beforeEach(() => (bot = new Bot(TOKEN)));

describe("onMessage", () => {
  test("pongs when pinged", () => {
    const msg = {
      content: "ping",
      reply: jest.fn(),
    };
    bot.onMessageCreate(msg);

    expect(msg.reply).toHaveBeenCalledWith("pong");
  });

  test("doesn't pong otherwise", () => {
    const msg = {
      content: "hi",
      reply: jest.fn(),
    };
    bot.onMessageCreate(msg);

    expect(msg.reply).not.toHaveBeenCalled();
  });
});

describe("start", () => {
  test("logs in", () => {
    // mock out login to suppress its side effects
    const spy = jest.spyOn(bot.client, "login").mockImplementation(() => {});

    bot.start();

    expect(spy).toHaveBeenCalledWith(TOKEN);
  });
});
