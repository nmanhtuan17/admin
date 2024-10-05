// Fake data thể loại
const orders = [
  {
    id: "ABCD",
    name: "Username",
    address: "Hanoi",
    total: 10000,
    date: '3-10-2024',
    status: {
      value: "Đang chờ xử lý",
      color: '#5068E2FF',
      background: '#C9D1F6FF'
    },
    shipment: 'VN Express'
  },
  {
    id: "ABCD",
    name: "Username",
    address: "Hanoi",
    total: 10000,
    date: '3-10-2024',
    status: {
      value: "Đang chờ xử lý",
      color: '#5068E2FF',
      background: '#C9D1F6FF'
    },
    shipment: 'VN Express'
  },
  {
    id: "ABCD",
    name: "Username",
    address: "Hanoi",
    total: 10000,
    date: '3-10-2024',
    status: {
      value: "Đang chờ xử lý",
      color: '#5068E2FF',
      background: '#C9D1F6FF'
    },
    shipment: 'VN Express'
  },
  {
    id: "ABCD",
    name: "Username",
    address: "Hanoi",
    total: 10000,
    date: '3-10-2024',
    status: {
      value: "Đã giao hàng",
      color: '#117B34FF',
      background: '#EEFDF3FF'
    },
    shipment: 'VN Express'
  },
];

// Hàm tìm kiếm
function searchOrders() {
  const tableBody = document.getElementById('order-table');
  tableBody.innerHTML = '';

  // Hiển thị danh sách thể loại
  orders.forEach(order => {
    const row = `<tr>
          <td>${order.id}</td>
          <td>${order.name}</td>
          <td>${order.address}</td>
          <td>${order.total}</td>
          <td>${order.date}</td>
          <td><span class="status" style="color:${order.status.color};background-color:${order.status.background};">${order.status.value}</span>
          </td>
          <td>${order.shipment}</td>
      </tr>`;
    tableBody.innerHTML += row;
  });
}

// Hàm thiết lập lại tìm kiếm
function resetSearch() {
  document.getElementById('order-id').value = '';
  document.getElementById('order-name').value = '';
  document.getElementById('status').value = '';
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
  searchOrders();  // Load dữ liệu khi trang mở
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

