// File: js/dangky.js

let registrations = JSON.parse(localStorage.getItem('registrations')) || [];
let events = JSON.parse(localStorage.getItem('events')) || [];
let customers = JSON.parse(localStorage.getItem('customers')) || [];

const filterEvent = document.getElementById('filterEvent');
const filterStatus = document.getElementById('filterStatus');
const registrationList = document.getElementById('registrationList');
const registrationStats = document.getElementById('registrationStats');

function getEventNameById(id) {
  const e = events.find(ev => ev.id === id);
  return e ? e.name : 'Không xác định';
}

function getCustomerNameById(id) {
  const c = customers.find(cus => cus.id === id);
  return c ? c.name : 'Ẩn danh';
}

function renderEventOptions() {
  filterEvent.innerHTML = '<option value="">Tất cả sự kiện</option>';
  events.forEach(ev => {
    filterEvent.innerHTML += `<option value="${ev.id}">${ev.name}</option>`;
  });
}

function renderRegistrations() {
  const eventFilter = filterEvent.value;
  const statusFilter = filterStatus.value;

  let filtered = registrations.filter(reg =>
    (!eventFilter || reg.eventId == eventFilter) &&
    (!statusFilter || reg.status === statusFilter)
  );

  registrationList.innerHTML = '';
  let counts = {};

  filtered.forEach((reg, index) => {
    const row = document.createElement('tr');

    const tdEvent = document.createElement('td');
    tdEvent.textContent = getEventNameById(reg.eventId);

    const tdCustomer = document.createElement('td');
    tdCustomer.textContent = getCustomerNameById(reg.customerId);

    const tdStatus = document.createElement('td');
    const statusSelect = document.createElement('select');
    ['Xử lý', 'Hủy', 'Thành công', 'Điểm danh'].forEach(st => {
      const opt = document.createElement('option');
      opt.value = st;
      opt.textContent = st;
      if (st === reg.status) opt.selected = true;
      statusSelect.appendChild(opt);
    });
    statusSelect.onchange = () => {
      reg.status = statusSelect.value;
      saveRegistrations();
    };
    tdStatus.appendChild(statusSelect);

    const tdSeat = document.createElement('td');
    const seatInput = document.createElement('input');
    seatInput.type = 'text';
    seatInput.value = reg.seat || '';
    seatInput.placeholder = 'Vị trí ghế';
    seatInput.onchange = () => {
      reg.seat = seatInput.value;
      saveRegistrations();
    };
    tdSeat.appendChild(seatInput);

    const tdSave = document.createElement('td');
    const btn = document.createElement('button');
    btn.textContent = 'Lưu';
    btn.onclick = () => {
      saveRegistrations();
    };
    tdSave.appendChild(btn);

    row.appendChild(tdEvent);
    row.appendChild(tdCustomer);
    row.appendChild(tdStatus);
    row.appendChild(tdSeat);
    row.appendChild(tdSave);
    registrationList.appendChild(row);

    if (!counts[reg.eventId]) counts[reg.eventId] = 0;
    counts[reg.eventId]++;
  });

  let statText = 'Tổng số đăng ký: ' + filtered.length;
  for (let eid in counts) {
    const name = getEventNameById(eid);
    statText += ` | ${name}: ${counts[eid]}`;
  }
  registrationStats.textContent = statText;
}

function saveRegistrations() {
  localStorage.setItem('registrations', JSON.stringify(registrations));
  renderRegistrations();
}

filterEvent.onchange = filterStatus.onchange = () => {
  renderRegistrations();
};

document.addEventListener('DOMContentLoaded', () => {
  renderEventOptions();
  renderRegistrations();
});
