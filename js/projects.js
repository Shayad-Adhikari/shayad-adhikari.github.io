const GITHUB_USERNAME = "shayad-adhikari";

async function loadProjects() {
  const container = document.getElementById("project-list");
  container.innerHTML = "<p>Loading projects...</p>";

  try {
    const response = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=3`);
    const repos = await response.json();

    if (!Array.isArray(repos)) throw new Error("GitHub API returned invalid data");

    container.innerHTML = ""; // Clear loading

    repos.forEach((repo, index) => {
      const projectCard = document.createElement("div");
      projectCard.classList.add("project-card");

      projectCard.innerHTML = `
        <img src="assets/images/project${index + 1}.jpg" alt="${repo.name}" />
        <h3>${repo.name}</h3>
        <p>${repo.description || "No description provided."}</p>
        <p><strong>Last Updated:</strong> ${new Date(repo.updated_at).toLocaleDateString()}</p>
        <a href="${repo.html_url}" target="_blank">View Repository</a>
      `;

      container.appendChild(projectCard);
    });

  } catch (error) {
    container.innerHTML = `<p>Error loading projects: ${error.message}</p>`;
  }
}

document.addEventListener("DOMContentLoaded", loadProjects);
