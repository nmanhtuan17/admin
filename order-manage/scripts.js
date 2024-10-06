let currentPage = 1
const ORDERS_PER_PAGE = 20
let orderDetailId = null
let cancelOrderId = null

const convertPrice = new Intl.NumberFormat('vn-VN', {
  style: 'currency',
  currency: 'VND',
});

// Hàm loại bỏ các ký tự có dấu
function removeAccents(str) {
  return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

function formatDate(dateString) {
  // Tách các phần của ngày từ chuỗi date (yyyy-mm-dd)
  const parts = dateString.split("-");
  const year = parts[0];
  const month = parts[1];
  const day = parts[2];
  
  // Trả về định dạng ngày theo kiểu dd/mm/yyyy
  return `${day}-${month}-${year}`;
}

// Fake data thể loại
const orders = [
  {
    id: 1,
    customer: "Username",
    address: "Hanoi",
    total: 10000,
    date: '2024-10-03',
    status: {
      id: 1,
      value: "Đang chờ xử lý",
      color: '#5068E2FF',
      background: '#C9D1F6FF'
    },
    shipment: 'VN Express',
    payment: {
      value: 'Đã thanh toán',
      color: '#117B34FF',
      background: '#EEFDF3FF'
    },
    products: [
      {
        id: 100,
        name: "The Great Gatsby",
        author: "F. Scott Fitzgerald",
        category: "Tiểu thuyết",
        price: 100000,
        quantity: 2,
        publisher: "Scribner",
        image: 'https://upload.wikimedia.org/wikipedia/commons/7/7a/The_Great_Gatsby_Cover_1925_Retouched.jpg',
        language: 'English'
      },
      {
        id: 2,
        name: "The Great Gatsby",
        author: "F. Scott Fitzgerald",
        category: "Fiction",
        price: 100000,
        quantity: 4,
        publisher: "Scribner",
        image: 'https://upload.wikimedia.org/wikipedia/commons/7/7a/The_Great_Gatsby_Cover_1925_Retouched.jpg',
        language: 'English'
      }
    ]
  },
  {
    id: 2,
    customer: "Username",
    address: "Hanoi",
    total: 10000,
    date: '2024-10-04',
    status: {
      id: 1,
      value: "Đang chờ xử lý",
      color: '#5068E2FF',
      background: '#C9D1F6FF'
    },
    shipment: 'VN Express',
    payment: {
      value: 'Đã thanh toán',
      color: '#117B34FF',
      background: '#EEFDF3FF'
    },
    products: [
      {
        id: 100,
        name: "The Great Gatsby",
        author: "F. Scott Fitzgerald",
        category: "Tiểu thuyết",
        price: 100000,
        quantity: 1,
        publisher: "Scribner",
        image: 'https://upload.wikimedia.org/wikipedia/commons/7/7a/The_Great_Gatsby_Cover_1925_Retouched.jpg',
        language: 'English'
      },
      {
        id: 2,
        name: "The Great Gatsby",
        author: "F. Scott Fitzgerald",
        category: "Fiction",
        price: 100000,
        quantity: 4,
        publisher: "Scribner",
        image: 'https://upload.wikimedia.org/wikipedia/commons/7/7a/The_Great_Gatsby_Cover_1925_Retouched.jpg',
        language: 'English'
      }
    ]
  },
  {
    id: 3,
    customer: "Username",
    address: "Hanoi",
    total: 10000,
    date: '2024-10-05',
    status: {
      id: 1,
      value: "Đang chờ xử lý",
      color: '#5068E2FF',
      background: '#C9D1F6FF'
    },
    shipment: 'GHTK',
    payment: {
      value: 'Đã thanh toán',
      color: '#117B34FF',
      background: '#EEFDF3FF'
    },
    products: [
      {
        id: 100,
        name: "The Great Gatsby",
        author: "F. Scott Fitzgerald",
        category: "Tiểu thuyết",
        price: 100000,
        quantity: 2,
        publisher: "Scribner",
        image: 'https://upload.wikimedia.org/wikipedia/commons/7/7a/The_Great_Gatsby_Cover_1925_Retouched.jpg',
        language: 'English'
      },
      {
        id: 2,
        name: "The Great Gatsby",
        author: "F. Scott Fitzgerald",
        category: "Fiction",
        price: 100000,
        quantity: 3,
        publisher: "Scribner",
        image: 'https://upload.wikimedia.org/wikipedia/commons/7/7a/The_Great_Gatsby_Cover_1925_Retouched.jpg',
        language: 'English'
      }
    ]
  },
  {
    id: 4,
    customer: "Username",
    address: "Hanoi",
    total: 10000,
    date: '2024-10-04',
    status: {
      id: 5,
      value: "Đã giao hàng",
      color: '#117B34FF',
      background: '#EEFDF3FF'
    },
    shipment: 'VN Express',
    payment: {
      value: 'Đã thanh toán',
      color: '#117B34FF',
      background: '#EEFDF3FF'
    },
    products: [
      {
        id: 100,
        name: "The Great Gatsby",
        author: "F. Scott Fitzgerald",
        category: "Tiểu thuyết",
        price: 100000,
        quantity: 2,
        publisher: "Scribner",
        image: 'https://upload.wikimedia.org/wikipedia/commons/7/7a/The_Great_Gatsby_Cover_1925_Retouched.jpg',
        language: 'English'
      },
      {
        id: 2,
        name: "The Great Gatsby",
        author: "F. Scott Fitzgerald",
        category: "Fiction",
        price: 100000,
        quantity: 1,
        publisher: "Scribner",
        image: 'https://upload.wikimedia.org/wikipedia/commons/7/7a/The_Great_Gatsby_Cover_1925_Retouched.jpg',
        language: 'English'
      }
    ]
  },
];

// Hàm tìm kiếm
function searchOrders(page = 1) {
  const tableBody = document.getElementById('order-table');
  tableBody.innerHTML = '';


  currentPage = page;

  const id = document.getElementById('order-id').value;
  const customer = document.getElementById('order-customer').value;
  const address = document.getElementById('order-address').value;
  const total = document.getElementById('order-total').value;
  const date = document.getElementById('order-date').value;
  const shipment = document.getElementById('order-shipment').value;
  const status = document.getElementById('order-status').value;


  const filteredOrders = orders.filter(order => {
    const checkId = !!id ? order.id == id : true
    const checkName = !!customer ? order.customer.toLowerCase().includes(customer.toLowerCase()) : true
    const checkAddress = !!address ? order.address.toLowerCase().includes(address.toLowerCase()) : true
    const checkTotal = !!total ? order.total == total : true
    const checkDate = !!date ? order.date == date : true
    const checkShipment = !!shipment ? shipments.find(c => c.id == shipment)?.name == order.shipment : true
    const checkStatus = !!status ? orderStatuses.find(st => st.id == status)?.status == order.status.value : true
    return checkId && checkName && checkAddress && checkTotal && checkDate && checkShipment && checkStatus
  }
  );

  // Tính toán số trang
  const totalRecords = filteredOrders.length;
  const totalPages = Math.ceil(totalRecords / ORDERS_PER_PAGE);

  // Cắt danh sách khách hàng theo trang hiện tại
  const startIndex = (page - 1) * ORDERS_PER_PAGE;
  const endIndex = page * ORDERS_PER_PAGE;
  const paginatedOrders = filteredOrders.slice(startIndex, endIndex);


  // Hiển thị danh sách thể loại
  paginatedOrders.forEach(order => {
    const row = `<tr class="cursor-pointer" onclick="openOrderDetail('${order.id}')">
          <td>${order.id}</td>
          <td>${order.customer}</td>
          <td>${order.address}</td>
          <td>${order.total}</td>
          <td>${order.date}</td>
          <td><span class="status" style="color:${order.status.color};background-color:${order.status.background};">${order.status.value}</span>
          </td>
          <td>${order.shipment}</td>
      </tr>`;
    tableBody.innerHTML += row;
  });

  renderPagination(totalPages)
}

// Hàm thiết lập lại tìm kiếm
function resetOrderSearch() {
  document.getElementById('order-id').value = '';
  document.getElementById('order-customer').value = '';
  document.getElementById('order-address').value = '';
  document.getElementById('order-total').value = '';
  document.getElementById('order-date').value = '';
  document.getElementById('order-shipment').value = '';
  document.getElementById('order-status').value = '';

  searchOrders()
}



function renderPagination(totalPages) {
  const pagination = document.querySelector('.pagination');
  pagination.innerHTML = '';

  if (currentPage > 1) {
    const prevLink = `<a href="#" onclick="searchOrders(${currentPage - 1})">‹</a>`;
    pagination.innerHTML += prevLink;
  }

  for (let i = 1; i <= totalPages; i++) {
    const pageLink = `<a href="#" ${i === currentPage ? 'class="active"' : ''} onclick="searchOrders(${i})">${i}</a>`;
    pagination.innerHTML += pageLink;
  }

  if (currentPage < totalPages) {
    const nextLink = `<a href="#" onclick="searchOrders(${currentPage + 1})">›</a>`;
    pagination.innerHTML += nextLink;
  }
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
  renderSelectStatusInModal()
});

function renderSelectStatusInModal () {
  const selectorStatusModal = document.getElementById('order-status-modal');
  selectorStatusModal.innerHTML = '<option value="">--Chọn--</option>';

  orderStatuses.forEach(status => {
    const row = `<option value="${status.id}">${status.status}</option>`;
    selectorStatusModal.innerHTML += row;
  });
}


function renderTotal (totalAmount) {
  const total = document.getElementById('total')
  total.innerText = convertPrice.format(totalAmount);
}

function renderProductOrder (orderId) {
  const tableBody = document.getElementById('order-product-table');
  tableBody.innerHTML = '';
  let total = 0

  const order = orders.find(order => order.id == orderId);

  order.products.forEach(product => {
    const row = `<tr>
          <td>${product.id}</td>
          <td>${product.name}</td>
          <td>${product.quantity}</td>
          <td>${convertPrice.format(product.price)}</td>
          <td>${convertPrice.format(product.quantity * product.price)}</td>
      </tr>`;
    tableBody.innerHTML += row;
    total += product.quantity * product.price
  });
  renderTotal(total)
}

// Hiển thị modal
function openOrderDetail(orderId) {
  orderDetailId = orderId
  const order = orders.find(order => order.id == orderId);
  document.getElementById("order-id-modal").value = order.id;
  document.getElementById("order-customer-modal").value = order.customer;
  document.getElementById("order-address-modal").value = order.address;
  document.getElementById("order-date-modal").value = order.date;
  document.getElementById("order-shipment-modal").value = order.shipment;
  document.getElementById("order-status-modal").value = order.status.id;
  document.getElementById("order-payment-modal").value = order.payment.value;

  renderProductOrder(orderId)

  document.getElementById("orderDetailModal").style.display = "flex";
}

// Đóng modal
function closeOrderDetailModal() {
  orderDetailId = null
  document.getElementById("orderDetailModal").style.display = "none";
}


function saveOrder() {

  // thực hiện call api 
  closeOrderDetailModal()
}

function openCancelOrderModal() {
  cancelOrderId = orderDetailId
  document.getElementById("cancelOrderModal").style.display = "flex";
}

function closeCancelModal() {
  cancelOrderId = null
  document.getElementById("cancelOrderModal").style.display = "none";
}

function confirmCancel() {
  alert('Hủy đơn hàng: ' + cancelOrderId)

  // thực hiện call api để hủy đơn hàng
  closeCancelModal()
}

