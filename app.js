const menuButton = document.querySelector(".menu");
const navigation = document.querySelector("#nav");
const filterButtons = document.querySelectorAll("[data-filter]");
const projectCards = document.querySelectorAll(".project-card");
const marquee = document.querySelector(".marquee div");

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

    projectCards.forEach((card) => {
      const categories = (card.dataset.categories || "").split(" ");
      const shouldShow = selectedFilter === "all" || categories.includes(selectedFilter);
      card.classList.toggle("hidden", !shouldShow);
    });
  });
});

if (marquee && !marquee.dataset.duplicated) {
  const text = marquee.textContent.trim();
  marquee.textContent = `${text} ${text}`;
  marquee.dataset.duplicated = "true";
}

const year = document.querySelector("#year");
if (year) year.textContent = new Date().getFullYear();
