document.addEventListener("DOMContentLoaded", () => {
  // Fetch account component HTML
  fetch("components/account.html")
    .then(res => res.text())
    .then(html => {
      const container = document.getElementById("account-container");
      container.innerHTML = html;

      const toggle = container.querySelector("#account-toggle");
      const menu = container.querySelector("#account-menu");

      toggle.addEventListener("click", (e) => {
        e.stopPropagation();
        menu.classList.toggle("show");
      });

      document.addEventListener("click", (e) => {
        if (!menu.contains(e.target)) {
          menu.classList.remove("show");
        }
      });
    });
});
