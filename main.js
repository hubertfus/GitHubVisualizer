import {
  fetchGitHubUser,
  fetchUserRepos,
  fetchUserFollowers,
  fetchFollowersDetails,
} from "./js/api.js";
import { createUserDetails } from "./js/userDetails.js";
import { createReposList } from "./js/userDetails.js";
import { createFollowersList } from "./js/components/followersListG.js";
import { createTabs } from "./js/components/tabs.js";

const searchInput = document.querySelector("#searchInput");
const searchButton = document.querySelector("#searchButton");
const resultContainer = document.querySelector("#content");
const profileContainer = document.querySelector("#profile");

let currentUsername = "";
let currentTab = "repos";

async function handleSearch() {
  const username = searchInput.value.trim();
  if (!username) return;

  currentUsername = username;
  const userData = await fetchGitHubUser(currentUsername);
  let profile = createUserDetails(userData);
  profileContainer.innerHTML = `${profile}`;
  await loadContent("repos");
}

async function loadContent(tab) {
  if (!currentUsername) return;

  try {
    resultContainer.innerHTML = '<div class="loading">Loading...</div>';
    currentTab = tab;

    const tabs = createTabs(currentTab);
    let content = "";

    switch (tab) {
      case "followers":
        const followers = await fetchUserFollowers(currentUsername);
        content = await createFollowersList(fetchFollowersDetails(followers));
        break;
      case "repos":
        const repos = await fetchUserRepos(currentUsername);
        content = createReposList(repos);
        break;
    }

    resultContainer.innerHTML = `${tabs}
      <div class="content">
        ${content}
      </div>
      `;

    document.querySelectorAll(".tab-btn").forEach((btn) => {
      btn.addEventListener("click", () => loadContent(btn.dataset.tab));
    });
  } catch (error) {
    resultContainer.innerHTML = `
      <div class="error">
        ${
          error.message === "User not found"
            ? "User not found. Please try another username."
            : error.message
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
