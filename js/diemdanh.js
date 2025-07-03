let diemDanhData = JSON.parse(localStorage.getItem('diemdanh')) || [];
let suKiens = JSON.parse(localStorage.getItem('events')) || [];

const filterEvent = document.getElementById("filter-event");
const tbody = document.getElementById("attendance-body");

function saveDiemDanh() {
  localStorage.setItem('diemdanh', JSON.stringify(diemDanhData));
}

function loadEventOptions() {
  filterEvent.innerHTML = '<option value="">Tất cả sự kiện</option>';
  suKiens.forEach(e => {
    const opt = document.createElement("option");
    opt.value = e.id;
    opt.textContent = e.name;
    filterEvent.appendChild(opt);
  });
}

function renderAttendance() {
  const selectedEventId = filterEvent.value;
  tbody.innerHTML = "";

  const filtered = selectedEventId ? diemDanhData.filter(d => d.suKienId == selectedEventId) : diemDanhData;

  filtered.forEach((dd, idx) => {
    const event = suKiens.find(e => e.id === dd.suKienId);
    const tr = document.createElement("tr");

    tr.innerHTML = `
      <td>${idx + 1}</td>
      <td>${dd.khachHang}</td>
      <td>${event ? event.name : 'Không rõ'}</td>
      <td>${dd.ghe}</td>
      <td><span class="status ${dd.trangThai === 'Có mặt' ? 'present' : 'absent'}">${dd.trangThai}</span></td>
      <td>
        <button class="mark-present" data-id="${dd.id}">Có mặt</button>
        <button class="mark-absent" data-id="${dd.id}">Vắng mặt</button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

function updateStatus(id, newStatus) {
  const record = diemDanhData.find(r => r.id == id);
  if (record) {
    record.trangThai = newStatus;
    saveDiemDanh();
    renderAttendance();
  }
}

filterEvent.onchange = () => renderAttendance();

tbody.addEventListener("click", (e) => {
  if (e.target.tagName === "BUTTON") {
    const id = e.target.getAttribute("data-id");
    const isPresent = e.target.classList.contains("mark-present");
    updateStatus(id, isPresent ? "Có mặt" : "Vắng mặt");
  }
});

document.addEventListener("DOMContentLoaded", () => {
  loadEventOptions();
  renderAttendance();
});
