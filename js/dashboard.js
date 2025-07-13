document.addEventListener("DOMContentLoaded", function () {
  // Giả lập dữ liệu sự kiện
  const events = [
    { name: "Hội chợ Xuân", status: "upcoming", users: 120, rating: { positive: 70, negative: 30 } },
    { name: "TechTalk 2025", status: "active", users: 300, rating: { positive: 80, negative: 20 } },
    { name: "Gala Âm nhạc", status: "finished", users: 95, rating: { positive: 40, negative: 60 } },
    { name: "Workshop AI", status: "finished", users: 200, rating: { positive: 60, negative: 40 } }
  ];

  // Tính tỷ lệ đánh giá trung bình
  const totalRatings = events.reduce((acc, e) => ({
    positive: acc.positive + e.rating.positive,
    negative: acc.negative + e.rating.negative
  }), { positive: 0, negative: 0 });

  const total = totalRatings.positive + totalRatings.negative;
  const positivePercent = Math.round((totalRatings.positive / total) * 100);
  const negativePercent = Math.round((totalRatings.negative / total) * 100);

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
  const trendCtx = document.getElementById("trendChart").getContext("2d");
  new Chart(trendCtx, {
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

  // Biểu đồ tròn đánh giá
  const pieCtx = document.getElementById("ratingChart").getContext("2d");
  const pieChart = new Chart(pieCtx, {
    type: 'pie',
    data: {
      labels: ['Tích cực', 'Tiêu cực'],
      datasets: [{
        data: [positivePercent, negativePercent],
        backgroundColor: ['#28a745', '#dc3545'],
        borderColor: '#fff',
        borderWidth: 2
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      plugins: {
        legend: {
          position: 'bottom'
        },
        tooltip: {
          callbacks: {
            label: function(context) {
              return `${context.label}: ${context.parsed}%`;
            }
          }
        },
        datalabels: {
          formatter: (value) => `${value}%`,
          color: '#fff',
          font: {
            weight: 'bold'
          }
        }
      }
    },
    plugins: [ChartDataLabels]
  });

  // Xử lý sự kiện click vào biểu đồ tròn
  const ratingEventsList = document.getElementById("ratingEventsList");
  pieCtx.canvas.addEventListener('click', function(event) {
    const activeElement = pieChart.getElementsAtEventForMode(event, 'nearest', { intersect: true }, false);
    if (activeElement.length) {
      const clickedIndex = activeElement[0].index;
      const ratingType = clickedIndex === 0 ? 'positive' : 'negative';
      
      // Xóa danh sách cũ
      ratingEventsList.innerHTML = '';
      
      // Lấy top 3 sự kiện theo loại đánh giá
      const sortedEvents = events.sort((a, b) => b.rating[ratingType] - a.rating[ratingType]).slice(0, 3);
      sortedEvents.forEach(event => {
        const li = document.createElement("li");
        li.innerHTML = `
          <div class="event-card">
            <span class="event-name">${event.name}</span>
            <span class="event-rating">${ratingType === 'positive' ? 'Tích cực' : 'Tiêu cực'}: ${event.rating[ratingType]}%</span>
          </div>
        `;
        ratingEventsList.appendChild(li);
      });
    }
  });
});

function toggleAccountMenu() {
  const menu = document.getElementById('accountMenu');
  menu.classList.toggle('hidden');
}