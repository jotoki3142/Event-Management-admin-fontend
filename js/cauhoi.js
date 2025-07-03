// File: js/cauhoi.js

let questions = JSON.parse(localStorage.getItem('questions')) || [];
let events = JSON.parse(localStorage.getItem('events')) || [];
let customers = JSON.parse(localStorage.getItem('customers')) || [];

const questionList = document.getElementById('questionList');
const filterEvent = document.getElementById('filterEvent');
const filterStatus = document.getElementById('filterStatus');

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

function renderQuestions() {
  let filtered = questions.filter(q => {
    return (!filterEvent.value || q.eventId === filterEvent.value)
      && (!filterStatus.value || q.status === filterStatus.value);
  });

  questionList.innerHTML = '';

  filtered.forEach(q => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${getEventName(q.eventId)}</td>
      <td>${getCustomerName(q.customerId)}</td>
      <td>${q.content}</td>
      <td>${q.date}</td>
      <td>${q.status}</td>
      <td>
        ${q.status === 'Chưa xử lý' ? `<button onclick="handleQuestion('${q.id}')">Xử lý</button>` : ''}
      </td>
    `;
    questionList.appendChild(tr);
  });
}

function handleQuestion(id) {
  const index = questions.findIndex(q => q.id === id);
  if (index > -1) {
    questions[index].status = 'Đã xử lý';
    localStorage.setItem('questions', JSON.stringify(questions));
    renderQuestions();
  }
}

document.addEventListener('DOMContentLoaded', () => {
  populateEventFilter();
  renderQuestions();
});