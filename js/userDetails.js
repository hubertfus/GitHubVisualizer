export function createReposList(repos) {
  if (!repos.length) {
    return '<p class="text-muted">No public repositories</p>';
  }

  return `
      <div class="repos-list">
        ${repos
          .map(
            (repo) => `
          <div class="repo-item">
            <h3>
              <a href="${repo.html_url}" target="_blank">${repo.name}</a>
            </h3>
            <p>${repo.description || "No description available"}</p>
            <div class="repo-stats">
              <span>⭐ ${repo.stargazers_count}</span>
              <span>🔄 ${repo.forks_count}</span>
              <span>${repo.language || "No language specified"}</span>
            </div>
          </div>
        `
          )
          .join("")}
      </div>`;
}

export function createUserDetails(user) {
  return `
      <div class="user-details">
        <div class="user-header">
          <img src="${user.avatar_url}" alt="${user.login}" class="avatar">
          <div class="user-names">
            <h2>${user.name || user.login}</h2>
            <a href="${user.html_url}" target="_blank">@${user.login}</a>
            ${user.bio ? `<p class="bio">${user.bio}</p>` : ""}
          </div>
        </div>
        
        <div class="stats">
          <div class="stat-item">
            <span class="value">${user.followers}</span>
            <span class="label">Followers</span>
          </div>
          <div class="stat-item">
            <span class="value">${user.following}</span>
            <span class="label">Following</span>
          </div>
          <div class="stat-item">
            <span class="value">${user.public_repos}</span>
            <span class="label">Repos</span>
          </div>
        </div>
        
        <div class="user-info">
          ${user.company ? `<p>🏢 ${user.company}</p>` : ""}
          ${user.location ? `<p>📍 ${user.location}</p>` : ""}
          ${
            user.blog
              ? `<p>🔗 <a href="${user.blog}" target="_blank">${user.blog}</a></p>`
              : ""
          }
          ${
            user.twitter_username
              ? `<p>🐦 <a href="https://twitter.com/${user.twitter_username}" target="_blank">@${user.twitter_username}</a></p>`
              : ""
          }
        </div>
      </div>`;
}
