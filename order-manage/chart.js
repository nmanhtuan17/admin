
function getDatesInRange() {

  const start = new Date(startDate);
  const end = new Date(endDate);
  const dateArray = [];
  let currentDate = start;

  while (currentDate <= end) {
    // Đẩy ngày hiện tại vào mảng dưới định dạng yyyy-mm-dd
    dateArray.push(currentDate.toISOString().split('T')[0]);
    // Tăng thêm 1 ngày
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return dateArray;
}

function filterOrdersByDate(orders) {
  const startDate = document.getElementById('start-date').value
  const endDate = document.getElementById('end-date').value

  const start = new Date(startDate);
  const end = new Date(endDate);

  return orders.filter(order => {
    const orderDate = new Date(order.date);
    return orderDate >= start && orderDate <= end;
  });
}

function calculateRevenueByDate(orders) {
  const revenueByDate = {};

  orders.forEach(order => {
    const orderDate = order.date;

    // Nếu ngày này chưa có trong revenueByDate thì khởi tạo
    if (!revenueByDate[orderDate]) {
      revenueByDate[orderDate] = 0;
    }

    // Cộng tổng tiền của đơn hàng vào ngày tương ứng
    revenueByDate[orderDate] += order.total;
  });

  return revenueByDate;
}

function calculateProductSalesByDate(orders) {
  const salesByDate = {};

  orders.forEach(order => {
    const orderDate = order.date;

    // Khởi tạo đối tượng cho ngày nếu chưa có
    if (!salesByDate[orderDate]) {
      salesByDate[orderDate] = 0;
    }
    const totalQuantity = order.products.reduce((accumulator, product) => {
      return accumulator + product.quantity;
    }, 0);
    salesByDate[orderDate] += totalQuantity
  });

  return salesByDate;
}

function analytis() {
  const startDate = document.getElementById('start-date').value
  const endDate = document.getElementById('end-date').value
  if (!startDate || !endDate) {
    alert('Chọn ngày')
    return;
  }
  const type = document.getElementById('statistic-type').value

  if (type === 'revenue') {
    const filteredOrders = filterOrdersByDate(orders);
    const filteredRevenueData = calculateRevenueByDate(filteredOrders);
    const data = {
      labels: Object.keys(filteredRevenueData),
      datasets: [
        {
          label: 'Doanh thu theo ngày',
          data: Object.values(filteredRevenueData),  // Dữ liệu doanh thu
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1
        }
      ]
    };

    new Chart("myChart", {
      type: 'line',  // Bạn có thể đổi sang 'bar' hoặc các loại biểu đồ khác
      data: data,
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  } else if (type === 'product') {
    const filteredOrders = filterOrdersByDate(orders);
    const productSalesByDate = calculateProductSalesByDate(filteredOrders);

    const data = {
      labels: Object.keys(productSalesByDate),
      datasets: [
        {
          label: 'Sản phẩm bán ra theo ngày',
          data: Object.values(productSalesByDate),  // Sản phẩm bán ra theo ngày
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1
        }
      ]
    };

    new Chart("myChart", {
      type: 'line',  // Bạn có thể đổi sang 'bar' hoặc các loại biểu đồ khác
      data: data,
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        },  
      }
    });
    
    
  } else {
    alert('Chọn kiểu thống kê')
    return;
  }

}

