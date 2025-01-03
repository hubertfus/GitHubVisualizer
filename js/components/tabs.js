export function createTabs(activeTab = "profile") {
  return `
      <div class="tabs">
        <button class="tab-btn ${
          activeTab === "followers" ? "active" : ""
        }" data-tab="followers">
          Followers
        </button>
        <button class="tab-btn ${
          activeTab === "repos" ? "active" : ""
        }" data-tab="repos">
          Repositories
        </button>
      </div>`;
}
