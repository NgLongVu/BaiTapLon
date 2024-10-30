 // Script điều khiển sidebar
 let btn = document.querySelector("#btn");
 let sidebar = document.querySelector(".sidebar");
 let searchBtn = document.querySelector(".bx-search");

 btn.onclick = function() {
     sidebar.classList.toggle("active");
 };
 searchBtn.onclick = function() {
     sidebar.classList.toggle("active");
 };






//  -------------------dashboard---------------------
 // Biểu đồ doanh thu theo tháng
 var ctx = document.getElementById('revenueChart').getContext('2d');
 var revenueChart = new Chart(ctx, {
   type: 'bar',
   data: {
     labels: ['T1', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'T8', 'T9', 'T10', 'T11', 'T12'],
     datasets: [{
       label: 'Doanh thu (triệu VND)',
       data: [12, 19, 3, 5, 2, 3, 10, 15, 20, 25, 18, 30],
       backgroundColor: 'rgba(54, 162, 235, 0.6)',
       borderColor: 'rgba(54, 162, 235, 1)',
       borderWidth: 1
     }]
   },
   options: {
     responsive: true,
     maintainAspectRatio: false,
     scales: {
       y: {
         beginAtZero: true
       }
     },
     plugins: {
       title: {
         display: true,
         text: 'Thống kê doanh thu theo tháng'
       }
     }
   }
 });

 // Biểu đồ top 5 món ăn bán chạy
 var ctx2 = document.getElementById('topDishesChart').getContext('2d');
 var topDishesChart = new Chart(ctx2, {
   type: 'pie',
   data: {
     labels: ['Cà phê sữa', 'Trà sữa trân châu', 'Bánh mì thịt', 'Phở bò', 'Bún chả'],
     datasets: [{
       data: [30, 25, 20, 15, 10],
       backgroundColor: [
         'rgba(255, 99, 132, 0.6)',
         'rgba(54, 162, 235, 0.6)',
         'rgba(255, 206, 86, 0.6)',
         'rgba(75, 192, 192, 0.6)',
         'rgba(153, 102, 255, 0.6)'
       ],
       borderColor: [
         'rgba(255, 99, 132, 1)',
         'rgba(54, 162, 235, 1)',
         'rgba(255, 206, 86, 1)',
         'rgba(75, 192, 192, 1)',
         'rgba(153, 102, 255, 1)'
       ],
       borderWidth: 1
     }]
   },
   options: {
     responsive: true,
     maintainAspectRatio: false,
     plugins: {
       title: {
         display: true,
         text: 'Top 5 món ăn bán chạy'
       },
       legend: {
         position: 'bottom',
       }
     }
   }
 });

 
 // Script cho quản lý thực đơn
 function themMon() {
  const maMon = document.getElementById('maMon').value;
  const tenMon = document.getElementById('tenMon').value;
  const donGia = document.getElementById('donGia').value;
  const danhMuc = document.getElementById('danhMuc').value;

  if(!maMon || !tenMon || !donGia || !danhMuc) {
    alert('Vui lòng nhập đầy đủ thông tin!');
    return;
  }

  const table = document.getElementById('menuTable').getElementsByTagName('tbody')[0];
  const newRow = table.insertRow();
  newRow.innerHTML = `
    <td>${maMon}</td>
    <td>${tenMon}</td>
    <td>${donGia}</td>
    <td>${danhMuc}</td>
    <td>
      <button class="btn-edit-row" onclick="chonDongChinhSua(this)">
        <i class='bx bx-edit'></i>
      </button>
      <button class="btn-delete-row" onclick="xoaDong(this)">
        <i class='bx bx-trash'></i>
      </button>
    </td>
  `;

  // Reset form
  document.getElementById('maMon').value = '';
  document.getElementById('tenMon').value = '';
  document.getElementById('donGia').value = '';
  document.getElementById('danhMuc').value = '';
}

function chonDongChinhSua(button) {
  const row = button.closest('tr');
  const cells = row.cells;

  document.getElementById('maMon').value = cells[0].textContent;
  document.getElementById('tenMon').value = cells[1].textContent;
  document.getElementById('donGia').value = cells[2].textContent;
  document.getElementById('danhMuc').value = cells[3].textContent;
}

function suaMon() {
  const maMon = document.getElementById('maMon').value;
  const table = document.getElementById('menuTable');
  const rows = table.getElementsByTagName('tr');

  for(let i = 1; i < rows.length; i++) {
    if(rows[i].cells[0].textContent === maMon) {
      rows[i].cells[1].textContent = document.getElementById('tenMon').value;
      rows[i].cells[2].textContent = document.getElementById('donGia').value;
      rows[i].cells[3].textContent = document.getElementById('danhMuc').value;
      break;
    }
  }
}

function xoaMon() {
  const maMon = document.getElementById('maMon').value;
  const table = document.getElementById('menuTable');
  const rows = table.getElementsByTagName('tr');
  for(let i = 1; i < rows.length; i++) {
    if(rows[i].cells[0].textContent === maMon) {
      table.deleteRow(i);
      break;
    }
  }

  // Reset form
  document.getElementById('maMon').value = '';
  document.getElementById('tenMon').value = '';
  document.getElementById('donGia').value = '';
  document.getElementById('danhMuc').value = '';
}

function xoaDong(button) {
  const row = button.closest('tr');
  row.remove();
}

function filterTable() {
  const filterMa = document.getElementById('filterMa').value.toUpperCase();
  const filterTen = document.getElementById('filterTen').value.toUpperCase();
  const filterGia = document.getElementById('filterGia').value;
  const filterDanhMuc = document.getElementById('filterDanhMuc').value.toUpperCase();
  
  const table = document.getElementById('menuTable');
  const tr = table.getElementsByTagName('tr');

  for (let i = 1; i < tr.length; i++) {
    const tdMa = tr[i].getElementsByTagName('td')[0];
    const tdTen = tr[i].getElementsByTagName('td')[1];
    const tdGia = tr[i].getElementsByTagName('td')[2];
    const tdDanhMuc = tr[i].getElementsByTagName('td')[3];
    
    if (tdMa && tdTen && tdGia && tdDanhMuc) {
      const txtMa = tdMa.textContent || tdMa.innerText;
      const txtTen = tdTen.textContent || tdTen.innerText;
      const txtGia = tdGia.textContent || tdGia.innerText;
      const txtDanhMuc = tdDanhMuc.textContent || tdDanhMuc.innerText;

      if (
        txtMa.toUpperCase().indexOf(filterMa) > -1 &&
        txtTen.toUpperCase().indexOf(filterTen) > -1 &&
        (filterGia === '' || parseInt(txtGia) >= parseInt(filterGia)) &&
        (filterDanhMuc === '' || txtDanhMuc.toUpperCase().indexOf(filterDanhMuc) > -1)
      ) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  }
}