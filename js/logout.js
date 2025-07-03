document.addEventListener("DOMContentLoaded", () => {
  fetch("components/logout-footer.html")
    .then(res => res.text())
    .then(html => {
      const div = document.createElement("div");
      div.innerHTML = html;
      document.body.appendChild(div);

      const logoutBtn = document.getElementById("logout-button");
      if (logoutBtn) {
        logoutBtn.addEventListener("click", () => {
          if (confirm("Bạn có chắc chắn muốn đăng xuất?")) {
            // Xóa token/localStorage nếu cần
            // localStorage.clear(); hoặc removeItem("token")
            window.location.href = "login.html";
          }
        });
      }
    });
});
