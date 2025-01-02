import { fetchGitHubUser } from "../api.js";
import { navigateToDetails } from "../router.js";

export function renderSearchPage() {
  const app = document.querySelector("#app");
  app.innerHTML = `
    <div class="container">
      <div class="search-box">
        <input 
          type="text" 
          id="searchInput" 
          placeholder="Enter GitHub username"
          autocomplete="off"
        />
        <button id="searchButton">Search</button>
      </div>
      <div id="result"></div>
    </div>
  `;

  setupSearchHandlers();
}

function setupSearchHandlers() {
  const searchInput = document.querySelector("#searchInput");
  const searchButton = document.querySelector("#searchButton");
  const resultContainer = document.querySelector("#result");

  async function handleSearch() {
    const username = searchInput.value.trim();
    if (!username) return;

    try {
      resultContainer.innerHTML = '<div class="loading">Searching...</div>';
      navigateToDetails(username);
    } catch (error) {
      resultContainer.innerHTML = `
        <div class="error">
          ${
            error.message === "User not found"
              ? "User not found. Please try another username."
              : "An error occurred. Please try again."
          }
        </div>`;
    }
  }

  searchButton.addEventListener("click", handleSearch);
  searchInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  });
}
