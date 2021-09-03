
function getEle(id) {
    return document.getElementById(id);
}


function Validation() {
    //Không cần có thuộc tính vì không cần lưu trữ dữ liệu gì
    //chỉ chứa các phương thức validation

    this.checkEmpty = function(inpuVal, spanID, message) {
        if(inpuVal.trim() === "") {
            //không hợp lệ
            getEle(spanID).style.display = "block";
            getEle(spanID).innerHTML = message;
            return false;
        } else {
            //hợp lệ
            getEle(spanID).style.display = "none";
            getEle(spanID).innerHTML = "";
            return true;
        }
    }

    this.checkExist = function(inpuVal, spanID, message, mangNV) {
        var isExist = false;
        isExist = mangNV.some(function(nv, index) {
            //bị trùng
            return nv.maNV === inpuVal;
        })

        if(isExist) {  
            //bị trùng, không hợp lệ
            getEle(spanID).style.display = "block";
            getEle(spanID).innerHTML = message;
            return false
        } else {
            //hợp lệ

            getEle(spanID).innerHTML = "";
            getEle(spanID).style.display = "none";
            return true;
        }
    }


    this.checkName = function(inpuVal, spanID, message) {
        var pattern = new RegExp("^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" + "ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" + "ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹý\\s]+$");
        if(pattern.test(inpuVal)) {
            //hợp lệ
            getEle(spanID).innerHTML = "";
            getEle(spanID).style.display = "none";
            return true;
        } else {
            //không hợp lệ
            getEle(spanID).style.display = "block";
            getEle(spanID).innerHTML = message;
            return false
        }
    }



    this.checkEmail = function(inpuVal, spanID, message) {
        var pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if(pattern.test(inpuVal)) {
               //hợp lệ
               getEle(spanID).innerHTML = "";
               getEle(spanID).style.display = "none";
               return true;
        } else {
             //không hợp lệ
             getEle(spanID).style.display = "block";
             getEle(spanID).innerHTML = message;
             return false
        }
    }

    this.checkPassword = function(inpuVal, spanID, message) {
        var pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{6,10}$/;
        if(inpuVal.match(pattern)) {
              //hợp lệ
              getEle(spanID).innerHTML = "";
              getEle(spanID).style.display = "none";
              return true;
        } else {
              //không hợp lệ
              getEle(spanID).style.display = "block";
              getEle(spanID).innerHTML = message;
              return false
        }

    }


    this.checkNgayLam = function(inpuVal, spanID, message) {
        var pattern = /^(0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])[\/\-]\d{4}$/;
        if(pattern.test(inpuVal)) {
            //hợp lệ
            getEle(spanID).innerHTML = "";
            getEle(spanID).style.display = "none";
            return true;
        } else {
              //không hợp lệ
              getEle(spanID).style.display = "block";
              getEle(spanID).innerHTML = message;
              return false;
        }
       
    }

    this.checkluongCB = function(inpuVal, spanID, message) {
        if (parseFloat(inpuVal) > 1e+6 && parseFloat(inpuVal) < 20e+6) {
            // console.log("TH TRUE")
              //hợp lệ
              getEle(spanID).innerHTML = "";
              getEle(spanID).style.display = "none";
              return true;
        } else {
             //không hợp lệ
            // console.log("TH FALSE")

             getEle(spanID).style.display = "block";
             getEle(spanID).innerHTML = message;
             return false;
        }
    }


    this.checkChucVu = function(inpuVal, spanID, message) {
        if(inpuVal === 0) {
            //không hợp lệ

            getEle(spanID).style.display = "block";
            getEle(spanID).innerHTML = message;
            return false;
        } else {

            getEle(spanID).innerHTML = "";
            getEle(spanID).style.display = "none";
            return true;
        }
    }


    this.checkGioLam = function(inpuVal, spanID, message) {
        var inpuVal = parseFloat(inpuVal);
        // console.log("inputVal",inpuVal)
        if (parseFloat(inpuVal) >= 80 && parseFloat(inpuVal) <= 200 && Number.isInteger(inpuVal)) {
            // console.log("TH TRUE")
              //hợp lệ
              getEle(spanID).innerHTML = "";
              getEle(spanID).style.display = "none";
              return true;
        } else {
             //không hợp lệ
            // console.log("TH FALSE")

             getEle(spanID).style.display = "block";
             getEle(spanID).innerHTML = message;
             return false;
        }
    }

}