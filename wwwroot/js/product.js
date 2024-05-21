var DataTable;
$(document).ready(function () {
    var url = window.location.search;
    var categories = ["Ice Coffees", "Hot Coffees", "Milshakes", "Deserts"];
    var selectedCategory = "all";

    // URL'deki parametreleri kontrol et
    for (var i = 0; i < categories.length; i++) {
        if (url.includes(categories[i])) {
            selectedCategory = categories[i];
            break;
        }
    }

    // DataTable'� y�kle
    loadDataTable(selectedCategory);
});

function loadDataTable(status) {
    DataTable = $('#tblData').DataTable({
        "ajax": {
            url: '/product/getall?status=' + status },
        "columns": [
            { data: 'title', "width": "25%" },
            { data: 'price', "width": "10%" },
            { data: 'category.name', "width": "10%" },
            {
                data: 'id',
                "render": function (data) {
                    return `<div class="w-75 btn-group" role="group">
:                   <a href="/product/upsert?id=${data}" class="btn btn-primary mx-2"> <i class="bi bi-pencil-square"></i> Edit</a>
                    <a onClick=Delete('/product/delete/${data}') class="btn btn-danger mx-2"> <i class="bi bi-trash-fill"></i> Delete</a>
                </div>`
                },
                "width": "25%"
            }
        ]
    });
}
function Delete(url) {
    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
    }).then((result) => {
        if (result.isConfirmed) {
            $.ajax({
                url: url,
                type: 'DELETE',
                success: function (data) {
                    DataTable.ajax.reload();
                    toastr.success(data.message);
                }
            
            })
        }
    })
}