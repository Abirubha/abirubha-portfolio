const projects = window.PORTFOLIO_PROJECTS || [];
const menuButton = document.querySelector(".menu");
const navigation = document.querySelector("#nav");
const projectGrid = document.querySelector("#projectGrid");
const filterButtons = document.querySelectorAll("[data-filter]");
const marquee = document.querySelector(".marquee div");
const viewer = document.querySelector("#projectViewer");
const viewerClose = document.querySelector(".viewer-close");
const viewerGallery = document.querySelector("#viewerGallery");
const viewerTitle = document.querySelector("#viewerTitle");
const viewerNumber = document.querySelector("#viewerNumber");
const viewerLabel = document.querySelector("#viewerLabel");
const viewerDescription = document.querySelector("#viewerDescription");
const viewerBehance = document.querySelector("#viewerBehance");
const viewerProgress = document.querySelector(".viewer-progress");
let lastFocusedCard = null;

function projectCard(project) {
  return `
    <button class="project-card" type="button" data-slug="${project.slug}" data-categories="${project.categories.join(" ")}" aria-label="Open ${project.name} complete portfolio">
      <span class="project-image"><img src="${project.cover}" alt="${project.name} project cover" loading="lazy"></span>
      <span class="project-meta">
        <span class="project-number">${project.number}</span>
        <span><h3>${project.name}</h3><p>${project.label}</p></span>
        <span class="arrow" aria-hidden="true">↗</span>
      </span>
    </button>`;
}

function renderProjects() {
  if (!projectGrid || !projects.length) return;
  projectGrid.innerHTML = projects.map(projectCard).join("");
  projectGrid.querySelectorAll(".project-card").forEach((card) => {
    card.addEventListener("click", () => openProject(card.dataset.slug, card));
  });
}

function openProject(slug, trigger) {
  const project = projects.find((item) => item.slug === slug);
  if (!project || !viewer) return;

  lastFocusedCard = trigger;
  viewerNumber.textContent = `Project ${project.number}`;
  viewerTitle.textContent = project.name;
  viewerLabel.textContent = project.label;
  viewerDescription.textContent = project.description;
  viewerBehance.href = project.behance;
  viewerProgress.textContent = `${project.images.length} portfolio pages`;
  viewerGallery.innerHTML = project.images.map((image, index) => `
    <figure><img src="${image.src}" alt="${image.alt}" loading="${index < 2 ? "eager" : "lazy"}"></figure>
  `).join("");

  viewer.hidden = false;
  viewer.scrollTop = 0;
  document.body.classList.add("viewer-open");
  viewerClose.focus();
}

function closeProject() {
  if (!viewer || viewer.hidden) return;
  viewer.hidden = true;
  viewerGallery.innerHTML = "";
  document.body.classList.remove("viewer-open");
  if (lastFocusedCard) lastFocusedCard.focus();
}

if (menuButton && navigation) {
  menuButton.addEventListener("click", () => {
    const isOpen = navigation.classList.toggle("open");
    menuButton.setAttribute("aria-expanded", String(isOpen));
  });

  navigation.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navigation.classList.remove("open");
      menuButton.setAttribute("aria-expanded", "false");
    });
  });
}

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const selectedFilter = button.dataset.filter;

    filterButtons.forEach((item) => {
      const isSelected = item === button;
      item.classList.toggle("active", isSelected);
      item.setAttribute("aria-pressed", String(isSelected));
    });

    projectGrid.querySelectorAll(".project-card").forEach((card) => {
      const categories = (card.dataset.categories || "").split(" ");
      card.classList.toggle("hidden", selectedFilter !== "all" && !categories.includes(selectedFilter));
    });
  });
});

if (viewerClose) viewerClose.addEventListener("click", closeProject);
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeProject();
});

if (marquee && !marquee.dataset.duplicated) {
  const text = marquee.textContent.trim();
  marquee.textContent = `${text} ${text}`;
  marquee.dataset.duplicated = "true";
}

const year = document.querySelector("#year");
if (year) year.textContent = new Date().getFullYear();

renderProjects();
