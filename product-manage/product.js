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

  if (name === "" || status === "") {
    alert("Vui lòng nhập đầy đủ thông tin!");
    return;
  }

  // Giả lập lưu thể loại mới (hiển thị alert)
  // alert(`Thể loại mới:\nMã: ${id}\nTên: ${name}\nTrạng thái: ${status}\nMô tả: ${description}`);

  // Đóng modal sau khi lưu
  closeModal();
}