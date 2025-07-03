let invoices = JSON.parse(localStorage.getItem('invoices')) || [];
let customers = JSON.parse(localStorage.getItem('customers')) || [];
let staff = JSON.parse(localStorage.getItem('staff')) || [];
let registrations = JSON.parse(localStorage.getItem('registrations')) || [];

const filterStatus = document.getElementById('filterStatus');
const invoiceList = document.getElementById('invoiceList');

const modal = document.getElementById('invoiceDetailModal');
const detailCustomer = document.getElementById('detailCustomer');
const detailDate = document.getElementById('detailDate');
const detailTotal = document.getElementById('detailTotal');
const detailPayment = document.getElementById('detailPayment');
const detailStaff = document.getElementById('detailStaff');
const detailRegistration = document.getElementById('detailRegistration');
const closeModal = document.getElementById('closeModal');

function getCustomerNameById(id) {
  const c = customers.find(cus => cus.id === id);
  return c ? c.name : 'Ẩn danh';
}

function getStaffNameById(id) {
  const s = staff.find(st => st.id === id);
  return s ? s.name : 'Không rõ';
}

function renderInvoices() {
  const statusFilter = filterStatus.value;
  invoiceList.innerHTML = '';

  let filtered = invoices.filter(inv => !statusFilter || inv.status === statusFilter);

  filtered.forEach(inv => {
    const row = document.createElement('tr');

    const tdId = document.createElement('td');
    tdId.textContent = inv.id;

    const tdCustomer = document.createElement('td');
    tdCustomer.textContent = getCustomerNameById(inv.customerId);

    const tdDate = document.createElement('td');
    tdDate.textContent = inv.date;

    const tdTotal = document.createElement('td');
    tdTotal.textContent = inv.total.toLocaleString('vi-VN') + '₫';

    const tdStatus = document.createElement('td');
    tdStatus.textContent = inv.status;

    const tdDetail = document.createElement('td');
    const btn = document.createElement('button');
    btn.textContent = 'Xem';
    btn.onclick = () => openModal(inv);
    tdDetail.appendChild(btn);

    row.appendChild(tdId);
    row.appendChild(tdCustomer);
    row.appendChild(tdDate);
    row.appendChild(tdTotal);
    row.appendChild(tdStatus);
    row.appendChild(tdDetail);

    invoiceList.appendChild(row);
  });
}

function openModal(inv) {
  detailCustomer.textContent = getCustomerNameById(inv.customerId);
  detailDate.textContent = inv.date;
  detailTotal.textContent = inv.total.toLocaleString('vi-VN') + '₫';
  detailPayment.textContent = inv.paymentMethod;
  detailStaff.textContent = getStaffNameById(inv.staffId);
  detailRegistration.textContent = inv.registrationId || 'Không có';
  modal.classList.remove('hidden');
}

closeModal.onclick = () => modal.classList.add('hidden');

filterStatus.onchange = () => renderInvoices();

document.addEventListener('DOMContentLoaded', renderInvoices);
