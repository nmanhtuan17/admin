// Fake data để mô phỏng danh sách khách hàng
const customers = [
  { id: "abcd", name: "Nguyễn Văn A", phone: "0123456789", address: "Hà Nội" },
  { id: "abcd", name: "Nguyễn Văn A", phone: "0123456789", address: "Hà Nội" },
  { id: "abcd", name: "Nguyễn Văn A", phone: "0123456789", address: "Hà Nội" },
  { id: "abc", name: "Nguyễn Văn A", phone: "0123456789", address: "Hà Nội" }
];

// Hàm tìm kiếm (giả lập)
function searchCustomers() {
  const tableBody = document.getElementById('customer-table');
  tableBody.innerHTML = '';

  // Hiển thị danh sách khách hàng
  customers.forEach(customer => {
      const row = `<tr>
          <td>${customer.id}</td>
          <td>${customer.name}</td>
          <td>${customer.phone}</td>
          <td>${customer.address}</td>
      </tr>`;
      tableBody.innerHTML += row;
  });
}
document.addEventListener('DOMContentLoaded', () => {
  searchCustomers();  // Load dữ liệu khi trang mở
});

// Hàm thiết lập lại tìm kiếm
function resetSearch() {
  document.getElementById('customer-name').value = '';
  document.getElementById('customer-id').value = '';
  document.getElementById('customer-phone').value = '';
}
