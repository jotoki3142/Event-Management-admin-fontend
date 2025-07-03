document.addEventListener("DOMContentLoaded", function () {
  // Giả lập dữ liệu
  const events = [
    { name: "Hội chợ Xuân", status: "upcoming", users: 120 },
    { name: "TechTalk 2025", status: "active", users: 300 },
    { name: "Gala Âm nhạc", status: "finished", users: 95 },
    { name: "Workshop AI", status: "finished", users: 200 }
  ];

  // Cập nhật thống kê
  document.querySelector("#totalEvents span").textContent = events.length;
  document.querySelector("#upcomingEvents span").textContent = events.filter(e => e.status === "upcoming").length;
  document.querySelector("#activeEvents span").textContent = events.filter(e => e.status === "active").length;
  document.querySelector("#finishedEvents span").textContent = events.filter(e => e.status === "finished").length;
  document.querySelector("#totalUsers span").textContent = events.reduce((acc, e) => acc + e.users, 0);
  document.querySelector("#totalRevenue span").textContent = (events.reduce((acc, e) => acc + e.users * 50000, 0)).toLocaleString() + " VNĐ";

  // Top sự kiện
  const topEventsList = document.getElementById("topEventsList");
  events.sort((a, b) => b.users - a.users).slice(0, 3).forEach(event => {
    const li = document.createElement("li");
    li.textContent = `${event.name} - ${event.users} lượt`;
    topEventsList.appendChild(li);
  });

  // Biểu đồ xu hướng
  const ctx = document.getElementById("trendChart").getContext("2d");
  new Chart(ctx, {
    type: 'line',
    data: {
      labels: ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5'],
      datasets: [{
        label: 'Lượt tham gia',
        data: [150, 200, 180, 220, 300],
        backgroundColor: 'rgba(0,123,255,0.1)',
        borderColor: 'rgba(0,123,255,1)',
        borderWidth: 2
      }]
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
});

function toggleAccountMenu() {
  const menu = document.getElementById('accountMenu');
  menu.classList.toggle('hidden');
}

