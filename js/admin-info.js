document.addEventListener("DOMContentLoaded", () => {
  fetch("components/admin-info.html")
    .then(res => res.text())
    .then(html => {
      const div = document.createElement("div");
      div.innerHTML = html;
      document.body.appendChild(div);
      initAdminInfo();
    });
});

function initAdminInfo() {
  const defaultData = {
    fullname: "Nguyễn Văn Quang",
    gender: "Nam",
    age: 30,
    address: "123 Đường ABC, Quận 1, TP.HCM",
    email: "quang.admin@example.com",
    phone: "0901234567"
  };
  let adminData = JSON.parse(localStorage.getItem("adminInfo")) || defaultData;

  // Hiển thị tên admin
  document.getElementById("admin-name").textContent = adminData.fullname.split(" ").slice(-2).join(" ") || "Admin";

  // Toggle menu
  const avatarToggle = document.getElementById("admin-avatar-toggle");
  const menu = document.getElementById("admin-menu");
  avatarToggle.addEventListener("click", (e) => {
    e.stopPropagation();
    menu.classList.toggle("hidden");
  });
  document.addEventListener("click", (e) => {
    if (!menu.contains(e.target) && !avatarToggle.contains(e.target)) {
      menu.classList.add("hidden");
    }
  });

  // Mở modal thông tin
  const infoBtn = document.getElementById("admin-info-btn");
  const modal = document.getElementById("admin-info-modal");
  infoBtn.addEventListener("click", () => {
    menu.classList.add("hidden");
    showAdminInfoModal();
  });

  function showAdminInfoModal() {
    modal.classList.remove("hidden");
    // Gán dữ liệu vào form
    document.getElementById("admin-fullname").value = adminData.fullname;
    document.getElementById("admin-gender").value = adminData.gender;
    document.getElementById("admin-age").value = adminData.age;
    document.getElementById("admin-address").value = adminData.address;
    document.getElementById("admin-email").value = adminData.email;
    document.getElementById("admin-phone").value = adminData.phone;
  }

  // Đóng modal
  document.getElementById("admin-cancel-btn").onclick = () => {
    modal.classList.add("hidden");
  };

  // Lưu thông tin
  document.getElementById("admin-info-form").onsubmit = function(e) {
    e.preventDefault();
    const ageValue = Number(document.getElementById("admin-age").value);
    if (ageValue < 18 || ageValue > 100) {
      alert("Số tuổi phải nằm trong khoảng từ 18 đến 100.");
      document.getElementById("admin-age").focus();
      return false;
    }
    adminData = {
      fullname: document.getElementById("admin-fullname").value,
      gender: document.getElementById("admin-gender").value,
      age: ageValue,
      address: document.getElementById("admin-address").value,
      email: document.getElementById("admin-email").value,
      phone: document.getElementById("admin-phone").value
    };
    localStorage.setItem("adminInfo", JSON.stringify(adminData));
    document.getElementById("admin-name").textContent = adminData.fullname.split(" ").slice(-2).join(" ") || "Admin";
    alert("Đã lưu thông tin thành công!");
    modal.classList.add("hidden");
  };

  // Xóa dữ liệu
  document.getElementById("admin-delete-btn").onclick = function() {
    if (confirm("Bạn có chắc chắn muốn xóa toàn bộ thông tin cá nhân?")) {
      localStorage.removeItem("adminInfo");
      adminData = defaultData;
      showAdminInfoModal();
      document.getElementById("admin-name").textContent = adminData.fullname.split(" ").slice(-2).join(" ") || "Admin";
      alert("Đã xóa dữ liệu. Dữ liệu mẫu sẽ được hiển thị lại.");
    }
  };
} 