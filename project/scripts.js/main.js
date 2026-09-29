function setupNavToggle() {
  const toggleButton = document.querySelector(".nav-toggle");
  const navList = document.querySelector(".nav-list");

  if (!toggleButton || !navList) {
    return;
  }

  toggleButton.addEventListener("click", () => {
    const isOpen = navList.classList.toggle("nav-list--open");
    toggleButton.setAttribute("aria-expanded", isOpen ? "true" : "false");
  });
}

function setupFooterDates() {
  const currentYearElement = document.getElementById("currentYear");
  if (currentYearElement) {
    currentYearElement.textContent = new Date().getFullYear();
  }

  const lastModifiedElement = document.getElementById("lastModified");
  if (lastModifiedElement) {
    lastModifiedElement.textContent = document.lastModified;
  }
}

function renderFeaturedPlants() {
  const featuredGrid = document.getElementById("featuredGrid");
  if (!featuredGrid || typeof plantData === "undefined") return;

  const featured = plantData.slice(0, 3);

  const cardsHtml = featured
    .map((plant) => {
      return `
        <article class="plant-card">
          <h3>${plant.name}</h3>
          <p>${plant.description}</p>
        </article>
      `;
    })
    .join("");

  featuredGrid.innerHTML = cardsHtml;
}

document.addEventListener("DOMContentLoaded", () => {
  setupNavToggle();
  setupFooterDates();
  renderFeaturedPlants();
});