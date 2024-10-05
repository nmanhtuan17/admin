
const RECORD_PER_PAGE = 20; // Số lượng bản ghi trên mỗi trang
let currentPage = 1; // Trang hiện tại


// Fake data để mô phỏng danh sách khách hàng
const customers = [
  { id: "abcd", name: "Nguyễn Văn A", phone: "0123456789", address: "Hà Nội" },
  { id: "abcd", name: "Nguyễn Văn A", phone: "0123456789", address: "Hà Nội" },
  { id: "abcd", name: "Nguyễn Văn A", phone: "0123456789", address: "Hà Nội" },
  { id: "abc", name: "Nguyễn Văn A", phone: "0123456789", address: "Hà Nội" },
  { id: "abcd", name: "Nguyễn Văn A", phone: "0123456789", address: "Hà Nội" },
  { id: "abc", name: "Nguyễn Văn A", phone: "0123456789", address: "Hà Nội" }
];

// Hàm tìm kiếm
function searchCustomers(page = 1) {
  currentPage = page;

  const tableBody = document.getElementById('customer-table');
  tableBody.innerHTML = '';

  const name = document.getElementById('customer-name').value;
  const id = document.getElementById('customer-id').value;
  const phone = document.getElementById('customer-phone').value;

  const filteredCustomers = customers.filter(customer =>
    (!!id ? customer.id.includes(id) : true) &&
    (!!name ? customer.name.includes(name) : true) &&
    (!!phone ? customer.phone.includes(phone) : true)
  );

  // Tính toán số trang
  const totalRecords = filteredCustomers.length;
  const totalPages = Math.ceil(totalRecords / RECORD_PER_PAGE);

  // Cắt danh sách khách hàng theo trang hiện tại
  const startIndex = (page - 1) * RECORD_PER_PAGE;
  const endIndex = page * RECORD_PER_PAGE;
  const paginatedCustomers = filteredCustomers.slice(startIndex, endIndex);

  // Hiển thị danh sách khách hàng
  paginatedCustomers.forEach(customer => {
    const row = `<tr>
          <td>${customer.id}</td>
          <td>${customer.name}</td>
          <td>${customer.phone}</td>
          <td>${customer.address}</td>
      </tr>`;
    tableBody.innerHTML += row;
  });

  // Cập nhật giao diện phân trang
  renderPagination(totalPages);
}

// Hàm hiển thị phân trang
function renderPagination(totalPages) {
  const pagination = document.querySelector('.pagination');
  pagination.innerHTML = '';

  if (currentPage > 1) {
    const prevLink = `<a href="#" onclick="searchCustomers(${currentPage - 1})">‹</a>`;
    pagination.innerHTML += prevLink;
  }

  for (let i = 1; i <= totalPages; i++) {
    const pageLink = `<a href="#" ${i === currentPage ? 'class="active"' : ''} onclick="searchCustomers(${i})">${i}</a>`;
    pagination.innerHTML += pageLink;
  }

  if (currentPage < totalPages) {
    const nextLink = `<a href="#" onclick="searchCustomers(${currentPage + 1})">›</a>`;
    pagination.innerHTML += nextLink;
  }
}

// Load dữ liệu khi trang mở
document.addEventListener('DOMContentLoaded', () => {
  searchCustomers();
});

// Hàm thiết lập lại tìm kiếm
function resetSearch() {
  document.getElementById('customer-name').value = '';
  document.getElementById('customer-id').value = '';
  document.getElementById('customer-phone').value = '';
  searchCustomers();
}
