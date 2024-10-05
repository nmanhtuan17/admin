
const RECORD_PER_PAGE = 20; // Số lượng bản ghi trên mỗi trang
let currentPage = 1; // Trang hiện tại



// Fake data category
const categories = [
  { id: 1, name: "Tiểu thuyết", description: "Content", status: 'active' },
  { id: 2, name: "Truyện tranh", description: "Content", status: 'active' },
  { id: 3, name: "Thiếu nhi", description: "Content", status: 'inactive' },
  { id: 4, name: "Kinh tế", description: "Content", status: 'active' },
];

// Hàm tìm kiếm
function searchCategories(page = 1) {

  currentPage = page;

  const id = document.getElementById('category-id').value;
  const name = document.getElementById('category-name').value;
  const status = document.getElementById('status').value;
  const tableBody = document.getElementById('category-table');
  tableBody.innerHTML = '';

  const filteredCategories = categories.filter(category =>
    (!!id ? category.id == id : true) &&
    (!!name ? category.name.toLowerCase().includes(name.toLowerCase()) : true) &&
    (!!status ? category.status === status : true)
  );

  // Tính toán số trang
  const totalRecords = filteredCategories.length;
  const totalPages = Math.ceil(totalRecords / RECORD_PER_PAGE);

  // Cắt danh sách khách hàng theo trang hiện tại
  const startIndex = (page - 1) * RECORD_PER_PAGE;
  const endIndex = page * RECORD_PER_PAGE;
  const paginatedCategories = filteredCategories.slice(startIndex, endIndex);

  // Hiển thị danh sách category
  paginatedCategories.forEach(category => {
    const row = `<tr>
          <td>${category.id}</td>
          <td>${category.name}</td>
          <td>${category.description}</td>
          <td><span class="status ${category.status === 'active' ? 'status-active' : 'status-inactive'}">${category.status === 'active' ? 'Hoạt động' : 'Không hoạt động'}</span></td>
          <td>
            <span class="action-edit" onclick="openEditCategoryModal('${category.id}')">
              <i class="fa-regular fa-pen-to-square"></i>
            </span>
            <span class="action-delete" onclick="openDeleteCategoryModal('${category.id}')">
              <i class="fa-solid fa-trash"></i>
            </span>
          </td>
      </tr>`;
    tableBody.innerHTML += row;
  });

  renderCategoryPagination(totalPages)
}

function renderCategoryPagination(totalPages) {
  const pagination = document.querySelector('.pagination');
  pagination.innerHTML = '';

  if (currentPage > 1) {
    const prevLink = `<a href="#" onclick="searchCategories(${currentPage - 1})">‹</a>`;
    pagination.innerHTML += prevLink;
  }

  for (let i = 1; i <= totalPages; i++) {
    const pageLink = `<a href="#" ${i === currentPage ? 'class="active"' : ''} onclick="searchCategories(${i})">${i}</a>`;
    pagination.innerHTML += pageLink;
  }

  if (currentPage < totalPages) {
    const nextLink = `<a href="#" onclick="searchCategories(${currentPage + 1})">›</a>`;
    pagination.innerHTML += nextLink;
  }
}

// Khởi động trang với tab "Danh sách thể loại"
document.addEventListener('DOMContentLoaded', () => {
  searchCategories();  // Load dữ liệu khi trang mở
});

// Hàm thiết lập lại tìm kiếm
function resetSearchCategories() {
  document.getElementById('category-id').value = '';
  document.getElementById('category-name').value = '';
  document.getElementById('status').value = '';
  searchCategories()
}