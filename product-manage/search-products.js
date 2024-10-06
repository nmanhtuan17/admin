const PRODUCT_PER_PAGE = 20; // Số lượng bản ghi trên mỗi trang
let current_Page = 1; // Trang hiện tại

const convertPrice = new Intl.NumberFormat('vn-VN', {
  style: 'currency',
  currency: 'VND',
});

const category = [
  { id: 1, name: "Tiểu thuyết", description: "Content", status: 'active' },
  { id: 2, name: "Truyện tranh", description: "Content", status: 'active' },
  { id: 3, name: "Thiếu nhi", description: "Content", status: 'inactive' },
  { id: 4, name: "Kinh tế", description: "Content", status: 'active' },
];

const priceRange = [
  {
    id: 1,
    label: '< 100.000đ',
    min: 0,
    max: 100000,
  },
  {
    id: 2,
    label: '100.000đ - 200.000đ',
    min: 100000,
    max: 200000,
  },
  {
    id: 3,
    label: '> 200.000đ',
    min: 200000,
    max: Number.MAX_SAFE_INTEGER
  },
]

// Fake data product
const products = [
  {
    id: 100,
    name: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    category: "Tiểu thuyết",
    price: 100000,
    quantity: 100,
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
    quantity: 100,
    publisher: "Scribner",
    image: 'https://upload.wikimedia.org/wikipedia/commons/7/7a/The_Great_Gatsby_Cover_1925_Retouched.jpg',
    language: 'English'
  }, {
    id: 3,
    name: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    category: "Fiction",
    price: 100000,
    quantity: 100,
    publisher: "Scribner",
    image: 'https://upload.wikimedia.org/wikipedia/commons/7/7a/The_Great_Gatsby_Cover_1925_Retouched.jpg',
    language: 'English'
  }, {
    id: 4,
    name: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    category: "Fiction",
    price: 100001,
    quantity: 100,
    publisher: "Scribner",
    image: 'https://upload.wikimedia.org/wikipedia/commons/7/7a/The_Great_Gatsby_Cover_1925_Retouched.jpg',
    language: 'English'
  }, {
    id: 5,
    name: "The Great Gatsby",
    author: "Scott Fitzgerald",
    category: "Fiction",
    price: 100000,
    quantity: 10,
    publisher: "Scribner",
    image: 'https://upload.wikimedia.org/wikipedia/commons/7/7a/The_Great_Gatsby_Cover_1925_Retouched.jpg',
    language: 'English'
  },
]


//Hàm render selector category
function renderSelectCategory() {
  const productCategory = document.getElementById('product-category');
  productCategory.innerHTML = '<option value="">--Chọn--</option>';

  category.forEach(category => {
    const row = `<option value="${category.id}">${category.name}</option>`;
    productCategory.innerHTML += row;
  });
}

function renderSelectCategoryModal() {
  const productCategory = document.getElementById('product-category-modal');
  productCategory.innerHTML = '<option value="">--Chọn--</option>';

  category.forEach(category => {
    const row = `<option value="${category.id}">${category.name}</option>`;
    productCategory.innerHTML += row;
  });
}

function renderSelectCategoryInEditModal() {
  const productCategory = document.getElementById('edit-product-category-modal');
  productCategory.innerHTML = '<option value="">--Chọn--</option>';

  category.forEach(category => {
    const row = `<option value="${category.id}">${category.name}</option>`;
    productCategory.innerHTML += row;
  });
}

function renderSelectPrice() {
  const productPrice = document.getElementById('product-price');
  productPrice.innerHTML = '<option value="">--Chọn--</option>';

  priceRange.forEach(price => {
    const row = `<option value="${price.id}">${price.label}</option>`;
    productPrice.innerHTML += row;
  });
}



// Hàm tìm kiếm
function searchProducts(page = 1) {

  current_Page = page;

  const id = document.getElementById('product-id').value;
  const name = document.getElementById('product-name').value;
  const category = document.getElementById('product-category').value;
  const author = document.getElementById('product-author').value;
  const price = document.getElementById('product-price').value;
  const publisher = document.getElementById('product-publisher').value;
  const quantity = document.getElementById('product-quantity').value;

  const tableBody = document.getElementById('product-table');
  tableBody.innerHTML = '';

  const filteredProducts = products.filter(product => {
    const checkId = !!id ? product.id == id : true
    const checkName = !!name ? product.name.toLowerCase().includes(name.toLowerCase()) : true
    const checkAuthor = !!author ? product.author.toLowerCase().includes(author.toLowerCase()) : true
    const checkPublisher = !!publisher ? product.publisher.toLowerCase().includes(publisher.toLowerCase()) : true
    const checkQuantity = !!quantity ? product.quantity == quantity : true
    const checkCategory = !!category ? categories.find(c => c.id == category)?.name == product.category : true
    const checkPrice = !!price ?
      (priceRange.find(p => p.id == price)?.max >= product.price
        &&
        priceRange.find(p => p.id == price)?.min < product.price
      ) : true
    return checkId && checkName && checkAuthor && checkPublisher && checkQuantity && checkCategory && checkPrice
  }
  );

  // Tính toán số trang
  const totalRecords = filteredProducts.length;
  const totalPages = Math.ceil(totalRecords / PRODUCT_PER_PAGE);

  // Cắt danh sách khách hàng theo trang hiện tại
  const startIndex = (page - 1) * PRODUCT_PER_PAGE;
  const endIndex = page * PRODUCT_PER_PAGE;
  const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

  // Hiển thị danh sách category
  paginatedProducts.forEach(product => {
    const row = `<tr>
          <td>${product.id}</td>
          <td>${product.name}</td>
          <td>${product.category}</td>
          <td>${product.author}</td>
          <td>${convertPrice.format(product.price)}</td>
          <td>${product.quantity}</td>
          <td>${product.publisher}</td>
          <td>
            <span class="action-edit" onclick="openEditProductModal('${product.id}')">
              <i class="fa-regular fa-pen-to-square"></i>
            </span>
            <span class="action-delete" onclick="openDeleteProductModal('${product.id}')">
              <i class="fa-solid fa-trash"></i>
            </span>
          </td>
      </tr>`;
    tableBody.innerHTML += row;
  });

  renderPagination(totalPages)
}

function renderPagination(totalPages) {
  const pagination = document.querySelector('.pagination-product');
  pagination.innerHTML = '';

  if (current_Page > 1) {
    const prevLink = `<a href="#" onclick="searchProducts(${current_Page - 1})">‹</a>`;
    pagination.innerHTML += prevLink;
  }

  for (let i = 1; i <= totalPages; i++) {
    const pageLink = `<a href="#" ${i === current_Page ? 'class="active"' : ''} onclick="searchProducts(${i})">${i}</a>`;
    pagination.innerHTML += pageLink;
  }

  if (current_Page < totalPages) {
    const nextLink = `<a href="#" onclick="searchProducts(${currentPage + 1})">›</a>`;
    pagination.innerHTML += nextLink;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  renderSelectCategory();
  renderSelectCategoryModal();
  renderSelectCategoryInEditModal();
  renderSelectPrice()
  searchProducts();
});


// Hàm thiết lập lại tìm kiếm
function resetProductSearch() {
  document.getElementById('product-id').value = '';
  document.getElementById('product-name').value = '';
  document.getElementById('product-category').value = '';
  document.getElementById('product-author').value = '';
  document.getElementById('product-price').value = '';
  document.getElementById('product-publisher').value = '';
  document.getElementById('product-quantity').value = '';

  searchProducts()
}

