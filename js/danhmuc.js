let categories = JSON.parse(localStorage.getItem('categories')) || [];
let events = JSON.parse(localStorage.getItem('events')) || [];

const categoryInput = document.getElementById('categoryInput');
const addCategoryBtn = document.getElementById('addCategoryBtn');
const categoryList = document.getElementById('categoryList');

function saveCategories() {
  localStorage.setItem('categories', JSON.stringify(categories));
}

function renderCategories() {
  categoryList.innerHTML = '';
  categories.forEach((cat, index) => {
    const li = document.createElement('li');

    const nameSpan = document.createElement('span');
    nameSpan.textContent = cat;

    const editBtn = document.createElement('button');
    editBtn.textContent = 'Sửa';
    editBtn.className = 'edit-btn';
    editBtn.onclick = () => {
      const newName = prompt('Nhập tên danh mục mới:', cat);
      if (newName && newName.trim()) {
        const usedInEvents = events.some(e => e.category === cat);
        if (usedInEvents) {
          events = events.map(e => {
            if (e.category === cat) e.category = newName.trim();
            return e;
          });
          localStorage.setItem('events', JSON.stringify(events));
        }
        categories[index] = newName.trim();
        saveCategories();
        renderCategories();
      }
    };

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Xóa';
    deleteBtn.className = 'delete-btn';
    deleteBtn.onclick = () => {
      const used = events.some(e => e.category === cat);
      if (used) {
        alert('Không thể xóa vì danh mục đang được sử dụng trong sự kiện.');
        return;
      }
      if (confirm(`Xác nhận xóa danh mục "${cat}"?`)) {
        categories.splice(index, 1);
        saveCategories();
        renderCategories();
      }
    };

    li.appendChild(nameSpan);
    li.appendChild(editBtn);
    li.appendChild(deleteBtn);
    categoryList.appendChild(li);
  });
}

addCategoryBtn.onclick = () => {
  const newCat = categoryInput.value.trim();
  if (!newCat) return;
  if (categories.includes(newCat)) {
    alert('Danh mục đã tồn tại.');
    return;
  }
  categories.push(newCat);
  categoryInput.value = '';
  saveCategories();
  renderCategories();
};

document.addEventListener('DOMContentLoaded', renderCategories);