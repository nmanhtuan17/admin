let editProductId = null
let deleteProductId = null

// THÊM MỚI SẢN PHẨM
// Hiển thị modal
function openAddProductModal() {
  document.getElementById("addProductModal").style.display = "flex";
}

// Đóng modal
function closeAddProductModal() {
  document.getElementById("addProductModal").style.display = "none";
}


// Lưu thể loại
function saveProduct() {
  const id = document.getElementById("product-id-modal").value;
  const name = document.getElementById("product-name-modal").value;
  const category = document.getElementById("product-category-modal").value;
  const author = document.getElementById("product-author-modal").value;
  const publisher = document.getElementById("product-publisher-modal").value;
  const year = document.getElementById("product-year-modal").value;
  const language = document.getElementById("product-language-modal").value;
  const quantity = document.getElementById("product-quantity-modal").value;
  const description = document.getElementById("product-description-modal").value;
  const photo = document.getElementById("product-photo-modal").files[0];


  if (!name || !id || !category || !author || !publisher || !year || !language || !quantity || !photo || !description) {
    alert("Vui lòng nhập đầy đủ thông tin!");
    return;
  }


  // Đóng modal sau khi lưu
  closeAddProductModal();
}


// SỬA SẢN PHẨM
// Hiển thị modal
function openEditProductModal(id) {
  editProductId = id
  const product = products.find(p => p.id == id);

  document.getElementById("edit-product-id-modal").value = product.id;
  document.getElementById("edit-product-name-modal").value = product.name;
  document.getElementById("edit-product-category-modal").value = product.category;
  document.getElementById("edit-product-author-modal").value = product.author;
  document.getElementById("edit-product-publisher-modal").value = product.publisher;
  document.getElementById("edit-product-year-modal").value = product.year;
  document.getElementById("edit-product-language-modal").value = product.language;
  document.getElementById("edit-product-quantity-modal").value = product.quantity;
  document.getElementById("edit-product-price-modal").value = product.price;
  document.getElementById("edit-product-description-modal").value = product.description;

  document.getElementById("editProductModal").style.display = "flex";
}

// Đóng modal
function closeEditProductModal() {
  editProductId = null
  document.getElementById("editProductModal").style.display = "none";
}


// Lưu thể loại
function confirmEditProduct() {
  const id = document.getElementById("product-id-modal").value;
  const name = document.getElementById("product-name-modal").value;
  const category = document.getElementById("product-category-modal").value;
  const author = document.getElementById("product-author-modal").value;
  const publisher = document.getElementById("product-publisher-modal").value;
  const year = document.getElementById("product-year-modal").value;
  const language = document.getElementById("product-language-modal").value;
  const quantity = document.getElementById("product-quantity-modal").value;
  const description = document.getElementById("product-description-modal").value;
  const price = document.getElementById("product-price-modal").value;
  const photo = document.getElementById("product-photo-modal").files[0];


  if (!name || !id || !category || !author || !publisher || !year || !language || !quantity || !photo || !description || !price) {
    alert("Vui lòng nhập đầy đủ thông tin!");
    return;
  }


  // Đóng modal sau khi lưu
  closeEditProductModal();
}

// Hiển thị modal delete Product
function openDeleteProductModal(id) {
  deleteProductId = id
  document.getElementById("deleteProductModal").style.display = "flex";
}

// Đóng modal delete Product
function closeDeleteProductModal() {
  deleteProductId = null
  document.getElementById("deleteProductModal").style.display = "none";
}

// Xác nhận xóa delete Product
function confirmDeleteProduct() {
  // Thực hiện hành động xóa, ví dụ gửi yêu cầu đến server để xóa bản ghi
  alert(`Xóa thể loại có mã: ${deleteProductId}`);

  // Sau khi xóa xong, đóng modal
  closeDeleteProductModal();
}