// File: js/danhgia.js

let reviews = JSON.parse(localStorage.getItem('reviews')) || [];
let events = JSON.parse(localStorage.getItem('events')) || [];
let customers = JSON.parse(localStorage.getItem('customers')) || [];

const reviewList = document.getElementById('reviewList');
const summaryResult = document.getElementById('summaryResult');
const filterEvent = document.getElementById('filterEvent');
const filterRating = document.getElementById('filterRating');
const filterDate = document.getElementById('filterDate');
const filterCustomer = document.getElementById('filterCustomer');

function getEventName(id) {
  const ev = events.find(e => e.id === id);
  return ev ? ev.name : 'Không rõ';
}

function getCustomerName(id) {
  const c = customers.find(c => c.id === id);
  return c ? c.name : 'Ẩn danh';
}

function populateEventFilter() {
  events.forEach(ev => {
    const opt = document.createElement('option');
    opt.value = ev.id;
    opt.textContent = ev.name;
    filterEvent.appendChild(opt);
  });
}

function renderReviews() {
  let filtered = reviews.filter(r => {
    return (!filterEvent.value || r.eventId === filterEvent.value)
      && (!filterRating.value || r.rating === parseInt(filterRating.value))
      && (!filterDate.value || r.date === filterDate.value)
      && (!filterCustomer.value || getCustomerName(r.customerId).toLowerCase().includes(filterCustomer.value.toLowerCase()));
  });

  reviewList.innerHTML = '';
  let totalRating = 0;

  filtered.forEach(r => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${getEventName(r.eventId)}</td>
      <td>${getCustomerName(r.customerId)}</td>
      <td>${r.rating}</td>
      <td>${r.comment}</td>
      <td>${r.date}</td>
      <td><button onclick="deleteReview('${r.id}')">Xóa</button></td>
    `;
    reviewList.appendChild(tr);
    totalRating += r.rating;
  });

  const avg = filtered.length ? (totalRating / filtered.length).toFixed(2) : 0;
  let level = '';
  if (avg >= 4.5) level = 'Rất hài lòng';
  else if (avg >= 3.5) level = 'Hài lòng';
  else if (avg >= 2.5) level = 'Trung bình';
  else level = 'Không hài lòng';

  summaryResult.textContent = `Điểm trung bình: ${avg} ⭐ - Mức độ: ${level}`;
}

function deleteReview(id) {
  if (!confirm('Xóa đánh giá này?')) return;
  reviews = reviews.filter(r => r.id !== id);
  localStorage.setItem('reviews', JSON.stringify(reviews));
  renderReviews();
}

document.addEventListener('DOMContentLoaded', () => {
  populateEventFilter();
  renderReviews();
});
