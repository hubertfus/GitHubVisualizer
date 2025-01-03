import { createUserDetails } from "../userDetails.js";

export async function createFollowersList(followers) {
  followers = await followers;
  if (!followers?.length) {
    return '<p class="no-followers">No followers found</p>';
  }

  return `
    <div class="followers-list">
      ${await followers.map((follower) => createUserDetails(follower)).join("")}
    </div>`;
}
