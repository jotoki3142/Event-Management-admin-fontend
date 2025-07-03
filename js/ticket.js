// File: js/ticket.js

let tickets = JSON.parse(localStorage.getItem('tickets')) || [];
let customers = JSON.parse(localStorage.getItem('customers')) || [];
let staff = JSON.parse(localStorage.getItem('staff')) || [];

const ticketList = document.getElementById('ticketList');
const ticketModal = document.getElementById('ticketModal');
const ticketForm = document.getElementById('ticketForm');
const ticketIdInput = document.getElementById('ticketId');
const assignStaff = document.getElementById('assignStaff');
const replyContent = document.getElementById('replyContent');

function getCustomerName(id) {
  const c = customers.find(c => c.id === id);
  return c ? c.name : 'Ẩn danh';
}

function getStaffName(id) {
  const s = staff.find(s => s.id === id);
  return s ? s.name : '-';
}

function renderStaffOptions() {
  assignStaff.innerHTML = '';
  staff.forEach(s => {
    const opt = document.createElement('option');
    opt.value = s.id;
    opt.textContent = s.name;
    assignStaff.appendChild(opt);
  });
}

function renderTickets() {
  ticketList.innerHTML = '';
  tickets.forEach(t => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${getCustomerName(t.customerId)}</td>
      <td>${t.content}</td>
      <td>${getStaffName(t.staffId)}</td>
      <td>${t.reply || ''}</td>
      <td>${t.status}</td>
      <td>
        <button onclick="openTicketModal('${t.id}')">Cập nhật</button>
      </td>
    `;
    ticketList.appendChild(tr);
  });
}

function openTicketModal(id) {
  const ticket = tickets.find(t => t.id === id);
  if (!ticket) return;
  ticketIdInput.value = ticket.id;
  assignStaff.value = ticket.staffId || '';
  replyContent.value = ticket.reply || '';
  ticketModal.classList.remove('hidden');
}

function closeTicketModal() {
  ticketModal.classList.add('hidden');
  ticketForm.reset();
}

ticketForm.addEventListener('submit', function (e) {
  e.preventDefault();
  const id = ticketIdInput.value;
  const index = tickets.findIndex(t => t.id === id);
  if (index > -1) {
    tickets[index].staffId = assignStaff.value;
    tickets[index].reply = replyContent.value;
    tickets[index].status = 'Đã xử lý';
    localStorage.setItem('tickets', JSON.stringify(tickets));
    renderTickets();
    closeTicketModal();
  }
});

document.addEventListener('DOMContentLoaded', () => {
  renderStaffOptions();
  renderTickets();
});