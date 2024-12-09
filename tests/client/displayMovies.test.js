const { JSDOM } = require("jsdom");
const { displayMovies, setupWatchlistButton } = require("../../frontend/movies-search");

describe("displayMovies Function", () => {
  let dom;
  let container;

  beforeEach(() => {
    const html = `
      <div>
        <button id="viewWatchlistButton"></button>
        <div class="grid-container"></div>
      </div>
    `;
    dom = new JSDOM(html);
    global.document = dom.window.document;
    global.window = dom.window;

    setupWatchlistButton(); // Explicitly call this function to set up the event listener

    container = document.querySelector(".grid-container");
  });

  afterEach(() => {
    dom = null;
    global.document = undefined;
    global.window = undefined;
  });

  test("should render movies into the grid container", () => {
    const movies = [
      { title: "Movie 1", release_date: "2024-01-01", genre_ids: [28] },
    ];
    const genres = [{ id: 28, name: "Action" }];

    displayMovies(movies, "popular", genres);

    expect(container.children.length).toBe(1);
    expect(container.children[0].textContent).toContain("Movie 1");
  });
});


