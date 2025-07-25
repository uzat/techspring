// public/js/theme-toggle.js
document.addEventListener("DOMContentLoaded", () => {
  const toggleButton = document.getElementById("themeToggle");
  const currentTheme = localStorage.getItem("theme") || "light";
  document.body.className = currentTheme;

  toggleButton.addEventListener("click", () => {
    const isLight = document.body.classList.contains("light");
    document.body.className = isLight ? "dark" : "light";
    localStorage.setItem("theme", isLight ? "dark" : "light");
  });
});
