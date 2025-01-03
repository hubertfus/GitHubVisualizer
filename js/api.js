export async function fetchGitHubUser(username) {
  try {
    const response = await fetch(`https://api.github.com/users/${username}`);

    if (response.status === 403) {
      throw new Error("API rate limit exceeded");
    }

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

    if (response.status === 403) {
      throw new Error("API rate limit exceeded");
    }

    if (!response.ok) {
      throw new Error("Failed to fetch repositories");
    }
    return await response.json();
  } catch (error) {
    throw error;
  }
}
export async function fetchFollowers(username) {
  try {
    const response = await fetch(
      `https://api.github.com/users/${username}/followers`
    );

    if (response.status === 403) {
      throw new Error("API rate limit exceeded");
    }

    if (!response.ok) {
      throw new Error("Failed to fetch followers");
    }
    return await response.json();
  } catch (error) {
    throw new Error("Error fetching followers");
  }
}

export async function fetchUserFollowers(username) {
  try {
    const response = await fetch(
      `https://api.github.com/users/${username}/followers`
    );

    if (response.status === 403) {
      throw new Error("API rate limit exceeded");
    }

    if (!response.ok) {
      throw new Error("Failed to fetch followers");
    }
    return await response.json();
  } catch (error) {
    throw error;
  }
}

export async function fetchFollowersDetails(followers) {
  try {
    const detailedFollowers = await Promise.all(
      followers.map((follower) => fetchGitHubUser(follower.login))
    );
    return detailedFollowers;
  } catch (error) {
    throw new Error("Error fetching followers details");
  }
}
