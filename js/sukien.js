let events = JSON.parse(localStorage.getItem('events')) || [];
const categories = JSON.parse(localStorage.getItem('categories')) || [];
let currentPage = 1;
const itemsPerPage = 6;

const eventList = document.getElementById('eventList');
const searchInput = document.getElementById('searchInput');
const filterCategory = document.getElementById('filterCategory');
const filterStatus = document.getElementById('filterStatus');
const pageInfo = document.getElementById('pageInfo');
const prevPage = document.getElementById('prevPage');
const nextPage = document.getElementById('nextPage');
const addEventBtn = document.getElementById('addEventBtn');

const eventModal = document.getElementById('eventModal');
const modalTitle = document.getElementById('modalTitle');
const eventForm = document.getElementById('eventForm');
const cancelModal = document.getElementById('cancelModal');

function saveEvents() {
  localStorage.setItem('events', JSON.stringify(events));
}

function renderCategoryOptions() {
  const categories = JSON.parse(localStorage.getItem('categories')) || [];
  filterCategory.innerHTML = '<option value="">Tất cả danh mục</option>';
  eventCategory.innerHTML = '<option value="">-- Chọn danh mục --</option>';
  categories.forEach(cat => {
    filterCategory.innerHTML += `<option value="${cat}">${cat}</option>`;
    eventCategory.innerHTML += `<option value="${cat}">${cat}</option>`;
  });
}


function renderEvents() {
  const query = searchInput.value.toLowerCase();
  const category = filterCategory.value;
  const status = filterStatus.value;

  let filtered = events.filter(e =>
    (!query || e.name.toLowerCase().includes(query)) &&
    (!category || e.category === category) &&
    (!status || e.status === status)
  );

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  currentPage = Math.min(currentPage, totalPages);
  const start = (currentPage - 1) * itemsPerPage;
  const paginated = filtered.slice(start, start + itemsPerPage);

  eventList.innerHTML = paginated.map((e, i) => `
    <div class="event-card">
      <img src="${e.image || 'https://via.placeholder.com/400x150'}" alt="">
      <h4>${e.name}</h4>
      <p>${e.description}</p>
      <p><strong>Địa điểm:</strong> ${e.location}</p>
      <p><strong>Thời gian:</strong> ${e.startDate} - ${e.endDate}</p>

      <p><strong>Chỗ:</strong> ${e.seats} (${e.seats > 0 ? 'Còn chỗ' : 'Hết chỗ'})</p>
      <p><strong>Phí:</strong> ${e.fee.toLocaleString()} VNĐ</p>
      <p><strong>Danh mục:</strong> ${e.category}</p>
      <p><strong>Trạng thái:</strong> ${e.status}</p>
      <div class="actions">
        <button class="edit-btn" onclick="editEvent(${e.id})">Sửa</button>
        <button class="delete-btn" onclick="deleteEvent(${e.id})">Xóa</button>
      </div>
    </div>`).join('');

  pageInfo.textContent = `Trang ${currentPage}/${totalPages || 1}`;
  prevPage.disabled = currentPage <= 1;
  nextPage.disabled = currentPage >= totalPages;
}

function resetForm() {
  eventForm.reset();
  document.getElementById('eventId').value = '';
}

addEventBtn.onclick = () => {
  resetForm();
  modalTitle.textContent = 'Thêm sự kiện';
  eventModal.classList.remove('hidden');
};

cancelModal.onclick = () => {
  eventModal.classList.add('hidden');
};

prevPage.onclick = () => {
  if (currentPage > 1) {
    currentPage--;
    renderEvents();
  }
};

nextPage.onclick = () => {
  currentPage++;
  renderEvents();
};

function editEvent(id) {
  const event = events.find(e => e.id === id);
  if (!event) return;

  document.getElementById('eventId').value = event.id;
  document.getElementById('eventName').value = event.name;
  document.getElementById('eventDescription').value = event.description;
  document.getElementById('eventLocation').value = event.location;
  document.getElementById('eventStartDate').value = event.startDate;
  document.getElementById('eventEndDate').value = event.endDate;
  document.getElementById('eventFee').value = event.fee;
  document.getElementById('eventSeats').value = event.seats;
  document.getElementById('eventCategory').value = event.category;
  document.getElementById('eventStatus').value = event.status;

  modalTitle.textContent = 'Chỉnh sửa sự kiện';
  eventModal.classList.remove('hidden');
}

function deleteEvent(id) {
  if (confirm('Bạn có chắc chắn muốn xóa sự kiện này?')) {
    events = events.filter(e => e.id !== id);
    saveEvents();
    renderCategoryOptions();
    renderEvents();
  }
}

eventForm.onsubmit = (e) => {
  e.preventDefault();
  const id = document.getElementById('eventId').value || Date.now();
  const newEvent = {
    id: Number(id),
    name: document.getElementById('eventName').value,
    description: document.getElementById('eventDescription').value,
    location: document.getElementById('eventLocation').value,
    startDate: document.getElementById('eventStartDate').value + ' ' + document.getElementById('eventStartTime').value,
    endDate: document.getElementById('eventEndDate').value + ' ' + document.getElementById('eventEndTime').value,
    fee: Number(document.getElementById('eventFee').value),
    seats: Number(document.getElementById('eventSeats').value),
    category: document.getElementById('eventCategory').value,
    status: document.getElementById('eventStatus').value,
    image: ''
  };

  const file = document.getElementById('eventImage').files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (evt) {
      newEvent.image = evt.target.result;
      saveAndRenderEvent(newEvent);
    };
    reader.readAsDataURL(file);
  } else {
    const existing = events.find(e => e.id === newEvent.id);
    if (existing) newEvent.image = existing.image;
    saveAndRenderEvent(newEvent);
  }
};

function saveAndRenderEvent(ev) {
  const index = events.findIndex(e => e.id === ev.id);
  if (index !== -1) {
    events[index] = ev;
  } else {
    events.push(ev);
  }
  saveEvents();
  renderCategoryOptions();
  renderEvents();
  eventModal.classList.add('hidden');
}

searchInput.oninput = filterCategory.onchange = filterStatus.onchange = () => {
  currentPage = 1;
  renderEvents();
};

document.addEventListener('DOMContentLoaded', () => {
  renderCategoryOptions();
  renderEvents();
});
