// File: js/taikhoan.js

let staff = JSON.parse(localStorage.getItem('staff')) || [];
let customers = JSON.parse(localStorage.getItem('customers')) || [];
let invoices = JSON.parse(localStorage.getItem('invoices')) || [];
let registrations = JSON.parse(localStorage.getItem('registrations')) || [];

const nvTable = document.querySelector('#nhanvienTable tbody');
const khTable = document.querySelector('#khachhangTable tbody');

const modal = document.getElementById('nhanVienModal');
const form = document.getElementById('nhanVienForm');
const idField = document.getElementById('nvId');
const nameField = document.getElementById('nvName');
const ageField = document.getElementById('nvAge');
const genderField = document.getElementById('nvGender');
const emailField = document.getElementById('nvEmail');
const phoneField = document.getElementById('nvPhone');
const addressField = document.getElementById('nvAddress');

function openNhanVienModal(nv = null) {
  if (nv) {
    idField.value = nv.id;
    nameField.value = nv.name;
    ageField.value = nv.age;
    genderField.value = nv.gender;
    emailField.value = nv.email;
    phoneField.value = nv.phone;
    addressField.value = nv.address;
  } else {
    form.reset();
    idField.value = '';
  }
  modal.classList.remove('hidden');
}

function closeNhanVienModal() {
  modal.classList.add('hidden');
}

form.onsubmit = e => {
  e.preventDefault();
  const newNV = {
    id: idField.value || 'NV' + Date.now(),
    name: nameField.value,
    age: parseInt(ageField.value),
    gender: genderField.value,
    email: emailField.value,
    phone: phoneField.value,
    address: addressField.value
  };

  if (newNV.age < 18 || newNV.age > 100) return alert('Tuổi phải từ 18 đến 100');

  const idx = staff.findIndex(nv => nv.id === newNV.id);
  if (idx > -1) staff[idx] = newNV;
  else staff.push(newNV);

  localStorage.setItem('staff', JSON.stringify(staff));
  closeNhanVienModal();
  renderNhanVien();
};

function deleteNhanVien(id) {
  if (!confirm('Xóa nhân viên này?')) return;
  staff = staff.filter(nv => nv.id !== id);
  localStorage.setItem('staff', JSON.stringify(staff));
  renderNhanVien();
}

function renderNhanVien() {
  nvTable.innerHTML = '';
  staff.forEach(nv => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${nv.id}</td>
      <td>${nv.name}</td>
      <td>${nv.age}</td>
      <td>${nv.gender}</td>
      <td>${nv.email}</td>
      <td>${nv.phone}</td>
      <td>${nv.address}</td>
      <td>
        <button onclick='openNhanVienModal(${JSON.stringify(nv)})'>Sửa</button>
        <button onclick='deleteNhanVien("${nv.id}")'>Xóa</button>
      </td>
    `;
    nvTable.appendChild(tr);
  });
}

function renderKhachHang() {
  khTable.innerHTML = '';
  customers.forEach(kh => {
    const regCount = registrations.filter(r => r.customerId === kh.id).length;
    const khInvoices = invoices.filter(i => i.customerId === kh.id);
    const totalSpend = khInvoices.reduce((sum, i) => sum + (i.total || 0), 0);

    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${kh.id}</td>
      <td>${kh.name}</td>
      <td>${kh.age || '?'}</td>
      <td>${kh.gender}</td>
      <td>${kh.email}</td>
      <td>${kh.phone}</td>
      <td>${kh.address}</td>
      <td>${regCount}</td>
      <td>${khInvoices.length}</td>
      <td>${totalSpend.toLocaleString('vi-VN')}₫</td>
    `;
    khTable.appendChild(tr);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  renderNhanVien();
  renderKhachHang();
});
