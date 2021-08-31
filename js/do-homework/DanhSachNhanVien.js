

function DanhSachNhanVien() {

    //thuộc tính
    this.mangNV = new Array();


    //Phương thức thêm nhân viên
    this.themNV = function(newNV) {
        this.mangNV = [...this.mangNV, newNV];
    }



    //Phương thức tìm nhân viên theo maNV
    this.timViTriNVtheoMa = function(maNV) {
        let viTri = -1;
        this.mangNV.forEach(function(nv, index) {
            if(nv.maNV === maNV) {
                viTri = index;
            };
        });

        return viTri;
    }

    //Phương thức xóa nhân viên
    this.XoaNVtheoMa = function(maNV) {
        let viTri = -1;
        viTri = this.timViTriNVtheoMa(maNV);

        if(viTri >= 0 ) { //có nv vs maNV truyền vào trong mảng NC
            this.mangNV.splice(viTri, 1);
        } else {
            console.log("Không tìm được nhân viên");

        }
    }

    //Phương thức cập nhật nhân viên 
    this.capNhatNV = function(nvUpdated) {
        let viTri = -1;
        viTri = this.timViTriNVtheoMa(nvUpdated.maNV);
        this.mangNV[viTri] = nvUpdated;
    }




}

DanhSachNhanVien.prototype.timNVtheoLoai = function(keyword) {
    var result = [];
    var keywordLowerCase = keyword.toLowerCase();
    result = this.mangNV.filter(function(nv, index) {
        return nv.loaiNV.toLowerCase().indexOf(keywordLowerCase) >= 0;
    })

    return result;
}