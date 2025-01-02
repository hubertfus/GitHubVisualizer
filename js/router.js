export function navigateToDetails(username) {
  window.history.pushState({ username }, "", `/details/${username}`);
  handleRoute();
}

export function handleRoute() {
  const path = window.location.pathname;

  if (path.startsWith("/details/")) {
    const username = path.split("/")[2];
    import("./pages/details.js").then((module) => {
      module.renderDetailsPage(username);
    });
  } else {
    import("./pages/search.js").then((module) => {
      module.renderSearchPage();
    });
  }
}
