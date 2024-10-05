
const orderStatuses = [
  {
    id: 1,
    status: 'Đang chờ xử lý'
  },
  {
    id: 2,
    status: 'Đã xác nhận'
  },
  {
    id: 3,
    status: 'Đang xử lý'
  },
  {
    id: 4,
    status: 'Đang vận chuyển'
  },
  {
    id: 5,
    status: 'Đã giao hàng'
  },
  {
    id: 6,
    status: 'Đã hủy'
  },
  {
    id: 7,
    status: 'Hoàn trả'
  },
]


const shipments = [
  {
    id: 1,
    name: 'VN Express'
  },
  {
    id: 2,
    name: 'GHTK'
  }
]

function renderSelectShipment() {
  const orderShipment = document.getElementById('order-shipment');
  orderShipment.innerHTML = '<option value="">--Chọn--</option>';

  shipments.forEach(s => {
    const row = `<option value="${s.id}">${s.name}</option>`;
    orderShipment.innerHTML += row;
  });
}

function renderSelectStatus() {
  const orderStatus = document.getElementById('order-status');
  orderStatus.innerHTML = '<option value="">--Chọn--</option>';

  orderStatuses.forEach(s => {
    const row = `<option value="${s.id}">${s.status}</option>`;
    orderStatus.innerHTML += row;
  });
}

document.addEventListener('DOMContentLoaded', () => {
  renderSelectShipment()
  renderSelectStatus()
});