// Fake data thể loại
const categories = [
  { id: "ABCD", name: "Username", address: "Hanoi",total: 10000, date: '3-10-2024', status: "Đang chờ xử lý", shipment: 'VN Express' },
  { id: "ABCD", name: "Username", address: "Hanoi",total: 10000, date: '3-10-2024', status: "Đang chờ xử lý", shipment: 'VN Express' },
  { id: "ABCD", name: "Username", address: "Hanoi",total: 10000, date: '3-10-2024', status: "Đang chờ xử lý", shipment: 'VN Express' },
  { id: "ABCD", name: "Username", address: "Hanoi",total: 10000, date: '3-10-2024', status: "Đang chờ xử lý", shipment: 'VN Express' },
];

// Hàm tìm kiếm (giả lập)
function searchCategories() {
  const tableBody = document.getElementById('category-table');
  tableBody.innerHTML = '';

  // Hiển thị danh sách thể loại
  categories.forEach(category => {
    const row = `<tr>
          <td>${category.id}</td>
          <td>${category.name}</td>
          <td>${category.address}</td>
          <td>${category.total}</td>
          <td>${category.date}</td>
          <td><span class="status ${category.status == 'Đang chờ xử lý' ? 'status-active' : 'status-inactive'}">${category.status}</span>
          </td>
          <td>${category.shipment}</td>
      </tr>`;
    tableBody.innerHTML += row;
  });
}

// Hàm thiết lập lại tìm kiếm
function resetSearch() {
  document.getElementById('category-id').value = '';
  document.getElementById('category-name').value = '';
  document.getElementById('status').value = '';
}

// Hàm thêm mới thể loại
function addCategory() {
  alert('Thêm mới thể loại');
}

// Hàm xóa thể loại
function deleteCategory(id) {
  alert(`Xóa thể loại có mã: ${id}`);
}

// Hàm chuyển tab
function openTab(evt, tabName) {
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
  document.getElementById(tabName).style.display = "block";
  evt.currentTarget.className += " active";
}

// Khởi động trang với tab "Danh sách thể loại"
document.addEventListener('DOMContentLoaded', () => {
  searchCategories();  // Load dữ liệu khi trang mở
});

// Hiển thị modal
function addCategory() {
  document.getElementById("addCategoryModal").style.display = "flex";
}

// Đóng modal
function closeModal() {
  document.getElementById("addCategoryModal").style.display = "none";
}

// Lưu thể loại (giả lập)
function saveCategory() {
  const id = document.getElementById("category-id-modal").value;
  const name = document.getElementById("category-name-modal").value;
  const status = document.getElementById("status-modal").value;
  const description = document.getElementById("description-modal").value;

  if (name === "" || status === "") {
    alert("Vui lòng nhập đầy đủ thông tin!");
    return;
  }

  // Giả lập lưu thể loại mới (hiển thị alert)
  alert(`Thể loại mới:\nMã: ${id}\nTên: ${name}\nTrạng thái: ${status}\nMô tả: ${description}`);

  // Đóng modal sau khi lưu
  closeModal();
}

