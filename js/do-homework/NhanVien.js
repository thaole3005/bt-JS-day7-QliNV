function NhanVien(maNV, tenNV, email, password, ngayLam, luongCB, chucVu, gioLam) {
    //thuộc tính
    this.maNV = maNV;
    this.tenNV = tenNV;
    this.email = email;
    this.password = password;
    this.ngayLam = ngayLam;
    this.luongCB = luongCB;
    this.chucVu = chucVu;
    this.gioLam = gioLam;
    this.tongLuong = 0;
    this.loaiNV = "";
    this.mangDoiChieu = [this.maNV, this.tenNV, this.email, this.ngayLam, this.chucVu, this.tongLuong, this.loaiNV];


    //phương thức
    this.tinhTongLuong = function() {
        switch (this.chucVu) {
            case 1: {  //sếp
                this.tongLuong = (this.luongCB *3).toLocaleString();
                this.chucVu = "Sếp";
                break;
            }
            case 2: { //trưởng phòng
                this.tongLuong = (this.luongCB *2).toLocaleString();
                this.chucVu = "Trưởng phòng";
                break;
            } 
            case 3: { //nhân viên
                this.tongLuong = (this.luongCB).toLocaleString();
                this.chucVu = "Nhân viên";
                break;
            } 
            default: {
                console.log('chưa chọn chức vụ');
            }
        };

        this.mangDoiChieu = [this.maNV, this.tenNV, this.email, this.ngayLam, this.chucVu, this.tongLuong, this.loaiNV];

    };

    this.xepLoaiNV = function() {
        if(this.gioLam >= 192) {
            this.loaiNV = "Xuất sắc";
        } else if(this.gioLam >= 176 && this.gioLam < 192) {
            this.loaiNV = "Giỏi";
        } else if (this.gioLam >= 160 && this.gioLam < 176) {
            this.loaiNV = "Khá";
        } else {
            this.loaiNV = "Trung bình";
        };

        this.mangDoiChieu = [this.maNV, this.tenNV, this.email, this.ngayLam, this.chucVu, this.tongLuong, this.loaiNV];

    }
}