let deleteCategoryId = null;
let editCategoryId = null;

// Hàm thêm mới thể loại
function addCategory() {
  alert('Thêm mới thể loại');
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

// Hiển thị modal
function addCategory() {
  document.getElementById("addCategoryModal").style.display = "flex";
}

// Đóng modal
function closeModal() {
  document.getElementById("addCategoryModal").style.display = "none";
}

// Lưu thể loại
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


// Hiển thị modal delete category
function openDeleteCategoryModal(id) {
  deleteCategoryId = id
  document.getElementById("deleteCategoryModal").style.display = "flex";
}

// Đóng modal delete category
function closeDeleteCategoryModal() {
  document.getElementById("deleteCategoryModal").style.display = "none";
}

// Xác nhận xóa delete category
function confirmDeleteCategory() {
  // Thực hiện hành động xóa, ví dụ gửi yêu cầu đến server để xóa bản ghi
  alert(`Xóa thể loại có mã: ${deleteCategoryId}`);

  // Sau khi xóa xong, đóng modal
  closeDeleteCategoryModal();
}



// MODAL EDIT CATEGORY

function openEditCategoryModal(id) {
  editCategoryId = id
  const category = categories.find(cate => cate.id == id)
  document.getElementById("edit-category-id-modal").value = category.id;
  document.getElementById("edit-category-name-modal").value = category.name;
  document.getElementById("edit-status-modal").value = category.status;
  document.getElementById("edit-description-modal").value = category.description;

  document.getElementById("editCategoryModal").style.display = "flex";
}

function closeEditModal() {
  document.getElementById("editCategoryModal").style.display = "none";
}


function editCategory() {
  const id = document.getElementById("edit-category-id-modal").value;
  const name = document.getElementById("edit-category-name-modal").value;
  const status = document.getElementById("edit-status-modal").value;
  const description = document.getElementById("edit-description-modal").value;

  if (name === "" || status === "") {
    alert("Vui lòng nhập đầy đủ thông tin!");
    return;
  }

  // Giả lập lưu thể loại mới (hiển thị alert)
  alert(`Chỉnh sửa:\nMã: ${id}\nTên: ${name}\nTrạng thái: ${status}\nMô tả: ${description}`);

  // Đóng modal sau khi lưu
  closeModal();
}
