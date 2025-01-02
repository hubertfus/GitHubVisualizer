import { fetchGitHubUser, fetchUserRepos } from "../api.js";
import { createUserDetails, createReposList } from "../userDetails.js";

export async function renderDetailsPage(username) {
  const app = document.querySelector("#app");
  app.innerHTML = `
    <div class="container">
      <button id="backButton" class="back-button">← Back to Search</button>
      <div id="userContent" class="loading">Loading user details...</div>
    </div>
  `;

  setupBackButton();
  await loadUserData(username);
}

function setupBackButton() {
  const backButton = document.querySelector("#backButton");
  backButton.addEventListener("click", () => {
    window.history.pushState({}, "", "/");
    import("./search.js").then((module) => {
      module.renderSearchPage();
    });
  });
}

async function loadUserData(username) {
  const userContent = document.querySelector("#userContent");

  try {
    const [userData, userRepos] = await Promise.all([
      fetchGitHubUser(username),
      fetchUserRepos(username),
    ]);

    userContent.innerHTML = `
      <div class="user-card">
        ${createUserDetails(userData)}
        <h2>Latest Repositories</h2>
        ${createReposList(userRepos)}
      </div>`;
  } catch (error) {
    userContent.innerHTML = `
      <div class="error">
        Failed to load user details. Please try again.
      </div>`;
  }
}
