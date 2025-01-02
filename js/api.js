export async function fetchGitHubUser(username) {
  try {
    const response = await fetch(`https://api.github.com/users/${username}`);
    if (!response.ok) {
      throw new Error("User not found");
    }
    return await response.json();
  } catch (error) {
    throw error;
  }
}

export async function fetchUserRepos(username) {
  try {
    const response = await fetch(
      `https://api.github.com/users/${username}/repos?sort=updated&per_page=5`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch repositories");
    }
    return await response.json();
  } catch (error) {
    throw error;
  }
}
