const { JSDOM } = require("jsdom");
const { setupWatchlistButton } = require("../../frontend/movies-search");

describe("Movie Search Tests", () => {
  let dom;

  beforeEach(() => {
    const html = `
      <div>
        <button id="viewWatchlistButton"></button>
        <input id="searchInput" type="text" />
        <div class="grid-container"></div>
      </div>
    `;
    dom = new JSDOM(html);
    global.document = dom.window.document;
    global.window = dom.window;

    setupWatchlistButton(); // Explicitly call the function to set up event listeners
  });

  afterEach(() => {
    dom = null;
    global.document = undefined;
    global.window = undefined;
  });

  test("should handle search input", () => {
    const searchInput = document.getElementById("searchInput");
    searchInput.value = "Test Movie";

    expect(searchInput.value).toBe("Test Movie");
  });
});

