

//biến toàn cục
var dsnv = new DanhSachNhanVien();
var validation = new Validation();




function getEle(id) {
    return document.getElementById(id);
}



function hienThiTable(mangNV) {

    // console.log("mangNV",mangNV);
    var content = "<tr>"

    mangNV.forEach(function(nv, index) {
       for (let displayItem of nv.mangDoiChieu) {
           content += `<td>${displayItem}</td>`
       }

       content += `<td><button class="btn btn-danger" onclick = "xoaNhanVien('${nv.maNV}')" style = "font-size: 14px">Xóa</button>
        <button class="btn btn-primary ml-1" onclick = "getNhanVien('${nv.maNV}')" data-toggle="modal" data-target="#myModal" style = "font-size: 14px">Sửa</button> </td>`
       content += "</tr>";

       if(index < mangNV.length - 1) {
       content += "<tr>";

       }

    })


    // console.log('content', content);
    getEle("tableDanhSach").innerHTML = content;
}



function setLocalStorage(mangNV) {
    localStorage.setItem("BT_DSNV", JSON.stringify(mangNV));
}


function getLocalStorage() {
    if(localStorage.getItem("BT_DSNV") !== null) {
        dsnv.mangNV = JSON.parse(localStorage.getItem("BT_DSNV"));
        // console.log(dsnv.mangNV)
        hienThiTable(dsnv.mangNV);

    }
}

getLocalStorage();


function openModal(title, type) {
    //type = 0: thêm nv mới. type = 1: sửa nhân viên
    switch (type) {
        case 0: {     //thêm nv mới
            getEle("header-title").innerHTML = title;
            getEle("btnThemNV").style.display = "block";
            getEle("btnCapNhat").style.display = "none";
            break;

        }
        case 1: {   //cập nhật nhân viên
            getEle("header-title").innerHTML = title;
            getEle("btnThemNV").style.display = "none";
            getEle("btnCapNhat").style.display = "block";
            break;

        }   
    }
}




//hàm thêm Nhân viên khi click nút "Thêm nhân viên" ở trong form
function themNhanVien() {
    var maNV = getEle("tknv").value;
    var tenNV = getEle("name").value
    var email = getEle("email").value;
    var password = getEle("password").value;
    var ngayLam = getEle("datepicker").value;
    var luongCB = getEle("luongCB").value;
    var chucVu = getEle("chucvu").selectedIndex;
    var gioLam = getEle("gioLam").value;


    //VALIDATION
    /**
     * Biến isValid chứa tất cả các kết quả return của các phương thức validation của các trường, các kết quả này phải true hết thì isValid mới true
     * Chỉ khi isValid = true thì mới thực hiện tạo đối tượng nv với giá trị người dùng nhập vào form, còn không thì báo lỗi và không đc tạo nhân viên mới
     */

    var isValid = true;


    //-----trường mã NV-------
    isValid &= validation.checkEmpty(maNV, "tbTKNV", "Bạn chưa nhập mã NV")
     && validation.checkExist(maNV, "tbTKNV", "Mã này đã tồn tại, mời bạn nhập mã mới", dsnv.mangNV);


    //-----trường họ tên-------

    isValid &= validation.checkEmpty(tenNV, "tbTen", "Bạn chưa nhập tên NV")
     && validation.checkName(tenNV, "tbTen", "Tên không đúng định dạng, tên chỉ bảo gồm kí tự chữ");

    //-----trường email-------

    isValid &= validation.checkEmpty(email, "tbEmail", "Bạn chưa nhập email")
     && validation.checkEmail(email, "tbEmail", "Email không hợp lệ");


     //-----trường password-------

     isValid &= validation.checkEmpty(password, "tbMatKhau", "Bạn chưa nhập mật khẩu")
     && validation.checkPassword(password, "tbMatKhau", "Mật khẩu phải bao gôm 6-10 ký tự và (chứa ít nhất 1 ký tự số, 1 ký tự in hoa, 1 ký tự đặc biệt");

    //-----trường ngày làm-------

    isValid &= validation.checkEmpty(ngayLam, "tbNgay", "Bạn chưa nhập ngày làm")
    && validation.checkNgayLam(ngayLam, "tbNgay", "Ngày làm không hợp lệ");


    //-----trường luongCB---------

    isValid &= validation.checkEmpty(luongCB, "tbLuongCB", "Bạn chưa nhập lương cơ bản")
    && validation.checkluongCB(luongCB, "tbLuongCB", "Lương cơ bản phải từ 1 000 000 - 20 000 000");

     //-----trường chức vụ-------

     isValid &= validation.checkChucVu(chucVu, "tbChucVu", "Bạn chưa chọn chức vụ");


     //-----trường giờ làm-------
     isValid &= validation.checkEmpty(gioLam, "tbGiolam", "Bạn chưa nhập giờ làm")
     && validation.checkGioLam(gioLam, "tbGiolam", "Giờ làm trong tháng phải là số nguyên từ 80 - 200 giờ");



    if(isValid) {
   
        var newNhanVien = new NhanVien(maNV, tenNV, email, password, ngayLam, parseInt(luongCB), chucVu, gioLam);
        // console.log("newNhanVien",newNhanVien)
        newNhanVien.tinhTongLuong();
        newNhanVien.xepLoaiNV();
        // console.log(newNhanVien);
        dsnv.themNV(newNhanVien);
    
        hienThiTable(dsnv.mangNV);
    
        setLocalStorage(dsnv.mangNV);
        getEle("formNV").reset();

    }






}



    function xoaNhanVien(maNV) {
        dsnv.XoaNVtheoMa(maNV);
        hienThiTable(dsnv.mangNV);
        setLocalStorage(dsnv.mangNV);
    }


    function getNhanVien(maNV) {      //Xem thông tin cũ chứ chưa sửa
        //B1: lấy dữ liệu của nhân viên cần sửa update lên form
        var viTri = -1;
        viTri = dsnv.timViTriNVtheoMa(maNV);
        var nhanVien = dsnv.mangNV[viTri];
        getEle("tknv").disabled = true;
        getEle("tknv").value = nhanVien.maNV;
        getEle("name").value = nhanVien.tenNV;
        getEle("email").value = nhanVien.email;
        getEle("password").value = nhanVien.password;
        getEle("datepicker").value =nhanVien.ngayLam;
        getEle("luongCB").value = nhanVien.luongCB;

        switch(nhanVien.chucVu) {
            case "Sếp": {
                getEle("chucvu").selectedIndex = 1;
                break;
            }
            case "Trưởng phòng": {
                getEle("chucvu").selectedIndex = 2;
                break;
            }
            case "Nhân viên": {
                getEle("chucvu").selectedIndex = 3;
                break;
            }
        }
        // C2: getEle("chucvu").value = nhanVien.chucVu;
        getEle("gioLam").value = nhanVien.gioLam;
        clearSpanError();
        openModal("Cập nhật nhân viên", 1);
    }

    //B2: cập nhật thông tin nhân viên vừa sửa rồi hiển thị ra giao diện
    getEle("btnCapNhat").addEventListener("click", function(e) {
        var maNV = getEle("tknv").value;
        var tenNV = getEle("name").value
        var email = getEle("email").value;
        var password = getEle("password").value;
        var ngayLam = getEle("datepicker").value;
        var luongCB = getEle("luongCB").value;
        var chucVu = getEle("chucvu").selectedIndex;
        var gioLam = getEle("gioLam").value;
    
       
        //VALIDATION
    /**
     * Biến isValid chứa tất cả các kết quả return của các phương thức validation của các trường, các kết quả này phải true hết thì isValid mới true
     * Chỉ khi isValid = true thì mới thực hiện tạo đối tượng nv với giá trị người dùng nhập vào form, còn không thì báo lỗi và không đc tạo nhân viên mới
     */

    var isValid = true;


    //Khi cập nhật thì k cần validation lại trường mã NV, vì mã NV không đc thay đổi


    //-----trường họ tên-------

    isValid &= validation.checkEmpty(tenNV, "tbTen", "Bạn chưa nhập tên NV")
     && validation.checkName(tenNV, "tbTen", "Tên không đúng định dạng, tên chỉ bảo gồm kí tự chữ");

    //-----trường email-------

    isValid &= validation.checkEmpty(email, "tbEmail", "Bạn chưa nhập email")
     && validation.checkEmail(email, "tbEmail", "Email không hợp lệ");


     //-----trường password-------

     isValid &= validation.checkEmpty(password, "tbMatKhau", "Bạn chưa nhập mật khẩu")
     && validation.checkPassword(password, "tbMatKhau", "Mật khẩu phải bao gôm 6-10 ký tự và (chứa ít nhất 1 ký tự số, 1 ký tự in hoa, 1 ký tự đặc biệt");

    //-----trường ngày làm-------

    isValid &= validation.checkEmpty(ngayLam, "tbNgay", "Bạn chưa nhập ngày làm")
    && validation.checkNgayLam(ngayLam, "tbNgay", "Ngày làm không hợp lệ");


    //-----trường luongCB---------

    isValid &= validation.checkEmpty(luongCB, "tbLuongCB", "Bạn chưa nhập lương cơ bản")
    && validation.checkluongCB(luongCB, "tbLuongCB", "Lương cơ bản phải từ 1 000 000 - 20 000 000");

     //-----trường chức vụ-------

     isValid &= validation.checkChucVu(chucVu, "tbChucVu", "Bạn chưa chọn chức vụ");


     //-----trường giờ làm-------
     isValid &= validation.checkEmpty(gioLam, "tbGiolam", "Bạn chưa nhập giờ làm")
     && validation.checkGioLam(gioLam, "tbGiolam", "Giờ làm trong tháng phải là số nguyên từ 80 - 200 giờ");


     //Nếu mọi trường đúng hết thì mới cho cập nhật
        if(isValid) {
            var nvUpdated = new NhanVien(maNV, tenNV, email, password, ngayLam, parseInt(luongCB), chucVu, gioLam);
            nvUpdated.tinhTongLuong();
            nvUpdated.xepLoaiNV();
    
            dsnv.capNhatNV(nvUpdated);
            hienThiTable(dsnv.mangNV);
            setLocalStorage(dsnv.mangNV);

            //nếu cập nhật thành công thì đong form lại
            getEle("btnDong").click();
    
        }


     
    })




    //Tịm nhân viên theo loại nhân viên
    getEle("searchName").addEventListener("keyup", function(e) {
        var keyword = this.value;
        result = dsnv.timNVtheoLoai(keyword);
        hienThiTable(result);

    })







getEle("btnThemNV").addEventListener("click", themNhanVien);
getEle("btnThem").addEventListener("click", function (e) { 
    //mỗi khi click vào nút Thêm nhân viên có id = "btnThem" thì đầu tiên phải reset form 
    openModal("Thêm nhân viên", 0);
    getEle("tknv").disabled = false;
    getEle("formNV").reset();
    
    clearSpanError();

})


clearSpanError = () => {
    var spanArray = document.querySelectorAll('#formNV span');

      //xỏa bỏ lỗi của người dùng khi nhập sai đinh dạng mỗi khi click vào form

    //C1------Dùng thuộc tính ID
    // for(let spanItem of spanArray) {
    //     if(spanItem.id !== "") {
    //         getEle(spanItem.id).style.display = "none";
    //     }
    // }



    //C2------Dùng thuộc tính clas
    for(let spanItem of spanArray) {
        // console.log(spanItem.className)
        if(spanItem.className.indexOf("sp-") >=0) {
            // console.log(spanItem.className)
            // console.log(spanItem)
            spanItem.style.display = "none";
        }
    }
}