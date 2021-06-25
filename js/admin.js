$(function () {
    $('#loginSubmit').on('click', function () {
        adminAccount = $('#loginAccount').val();
        adminPassword = $('#loginPassword').val();
        adminLoginData = adminLogin(adminAccount, adminPassword)
        console.log(adminLoginData);
        if (adminLoginData.start == true) {
            adminAccount = $('#loginAccount').val('');
            adminPassword = $('#loginPassword').val('');
            $('#login').hide();
            $('#updata').show();
            $('#exit').show(1000);
        } else {
            alert("账号密码错误！")
        }
    })

    $('#updataSubmit').on('click', function () {
        // 登陆成功后才可以上传数据
        if (adminLoginData.start == true) {

            upTitle = $('#updataTitle').val();
            upInfo = $('#updataDesigner').val();
            upImglink = $('#updataPicture').val();
            if (upTitle != '' && upInfo != '' && upImglink != '') {
                uploadPublicInfoData = uploadPublicInfo(upImglink, upTitle, upInfo)
                console.log(uploadPublicInfoData);
                upTitle = $('#updataTitle').val('');
                upInfo = $('#updataDesigner').val('');
                upImglink = $('#updataPicture').val('');
            } else {
                alert('请勿留空')
            }

        }
    })

    $('#exit').on('click', function () {
        adminLoginData = false;
        $('#login').show();
        $('#updata').hide();
        $('#exit').hide(1000);
    })


})