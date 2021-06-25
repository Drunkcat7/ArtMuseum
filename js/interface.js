// -- user登陆 传入imgkey
function userLogin(userImgkey) {
    var userLoginData;
    $.ajax({
        url: 'http://127.0.0.1:8086/user/userLogin',
        type: 'post',
        async: false,//使用同步的方式,true为异步方式
        data: { imgkey: userImgkey },
        success: function (res) {
            if (res.start) {
                console.log("获取登陆信息成功")
                userLoginData = res.data;

            } else {
                console.log("获取登陆信息失败")
                userLoginData = false;
            }
        },
        fail: function () {
            //code here...
        }
    })
    // 有数据返回数组，没数据返回false
    return userLoginData;
}

// -- 获取Name 传入Id{
function userName(userId){
    var userNameData;
    $.ajax({
        url: 'http://127.0.0.1:8086/user/userName',
        type: 'post',
        async: false,//使用同步的方式,true为异步方式
        data: { id: userId },
        success: function (res) {
            if (res.start) {
                console.log("获取名字信息成功")
                userNameData = res.data.name;

            } else {
                console.log("获取名字信息失败")
                userNameData = false;
            }
        },
        fail: function () {
            //code here...
        }
    })
    // 有数据返回数组，没数据返回false
    return userNameData;
}

// -- user注册 传入(name,imgkey)
function userSignIn(userName, userImgkey) {
    var userSignInData;
    $.ajax({
        url: 'http://127.0.0.1:8086/user/userSignIn',
        type: 'post',
        async: false,//使用同步的方式,true为异步方式
        data: { name: userName, imgkey: userImgkey },
        success: function (res) {
            if (res) {
                console.log("注册成功")
                userSignInData = res;

            } else {
                console.log("注册失败")
                userSignInData = res;
            }
        },
        fail: function () {
            //code here...
        }
    })
    // 有数据返回false，没数据返回false
    return userSignInData;
}

// -- admin登陆 传入account与password
function adminLogin(adminAccount, adminPassword) {
    var adminLoginData;
    $.ajax({
        url: 'http://127.0.0.1:8086/admin/adminLogin',
        type: 'post',
        async: false,//使用同步的方式,true为异步方式
        data: { account: adminAccount, password: adminPassword },
        success: function (res) {
            if (res.start) {
                console.log("获取管理员登陆信息成功")
                adminLoginData = res;

            } else {
                console.log("获取管理员登陆信息失败")
                adminLoginData = res;
            }
        },
        fail: function () {
            //code here...
        }
    })
    // 有数据返回数组，没数据返回null
    return adminLoginData;
}

// -- 上传图片 传入(imglink,title,info)
function uploadPublicInfo(upImglink, upTitle, upInfo) {
    var uploadPublicInfoData;
    $.ajax({
        url: 'http://127.0.0.1:8086/publicinfo/uploadPublicInfo',
        type: 'post',
        async: false,//使用同步的方式,true为异步方式
        data: { imglink: upImglink, title: upTitle, info: upInfo },
        success: function (res) {
            if (res) {
                console.log("导入成功")
                uploadPublicInfoData = res;

            } else {
                console.log("导入失败")
                uploadPublicInfoData = res;
            }
        },
        fail: function () {
            //code here...
        }
    })
    // 有数据返回数组，没数据返回null
    return uploadPublicInfoData;
}

// -- 主页展示所有图
function showPublicInfo() {
    var showPublicInfoData;
    $.ajax({
        url: 'http://127.0.0.1:8086/publicinfo/showPublicInfo',
        type: 'post',
        async: false,//使用同步的方式,true为异步方式
        data: {},
        success: function (res) {
            showPublicInfoData = res;
        },
        fail: function () {
            //code here...
        }
    })
    // 有数据返回数组，没数据返回null
    return showPublicInfoData;
}

// -- 个人页展示所有图（传入用户id）
function showPrivateInfo(prUserNo) {
    var showPrivateInfoData;
    $.ajax({
        url: 'http://127.0.0.1:8086/publicinfo/showPrivateInfo',
        type: 'post',
        async: false,//使用同步的方式,true为异步方式
        data: {userNo:prUserNo},
        success: function (res) {
            showPrivateInfoData = res;
        },
        fail: function () {
            //code here...
        }
    })
    // 有数据返回数组，没数据返回null
    return showPrivateInfoData;
}

// -- 收藏 (传入用户id和图片id)
function addPrivateInfo(AddUserNo, AddImgNo) {
    var addPrivateInfoData;
    $.ajax({
        url: 'http://127.0.0.1:8086/privateinfo/addPrivateInfo',
        type: 'post',
        async: false,//使用同步的方式,true为异步方式
        data: { userNo: AddUserNo, imgNo: AddImgNo },
        success: function (res) {
            if (res) {
                console.log("加入收藏成功")
                addPrivateInfoData = res;

            } else {
                console.log("加入收藏失败")
                addPrivateInfoData = res;
            }
        },
        fail: function () {
            //code here...
        }
    })
    // 有数据返回数组，没数据返回null
    return addPrivateInfoData;
}

// -- 取消收藏 (传入用户id和图片id)
function deletePrivateInfo(DeleUserNo, DelePrImgNo) {
    var deletePrivateInfoData;
    $.ajax({
        url: 'http://127.0.0.1:8086/privateinfo/deletePrivateInfo',
        type: 'post',
        async: false,//使用同步的方式,true为异步方式
        data: { userNo: DeleUserNo, imgNo: DelePrImgNo },
        success: function (res) {
                // console.log(res)
                deletePrivateInfoData = res
                // 删除成功返回true，失败返回false
        },
        fail: function () {
            //code here...
        }
    })
    // 有数据返回数组，没数据返回null
    return deletePrivateInfoData;
}

// -- 搜索 (传入title)(支持模糊搜索)
function searchPublicInfo(searchTitle) {
    var searchPublicInfoData;
    $.ajax({
        url: 'http://127.0.0.1:8086/publicinfo/searchPublicInfo',
        type: 'post',
        async: false,//使用同步的方式,true为异步方式
        data: {title:searchTitle},
        success: function (res) {
            if(res.start){
                searchPublicInfoData = res.data;
                console.log('搜索到了');
            }else{
                searchPublicInfoData = false;
                console.log('没搜索到');
            }
            
        },
        fail: function () {
            //code here...
        }
    })
    // 有数据返回数组，没数据返回null
    return searchPublicInfoData;
}

//  -- 主页轮播图
function showAdvertising() {
    var showAdvertisingData;
    $.ajax({
        url: 'http://127.0.0.1:8086/advertising/showAdvertising',
        type: 'post',
        async: false,//使用同步的方式,true为异步方式
        data: {},
        success: function (res) {
            showAdvertisingData = res;
        },
        fail: function () {
            //code here...
        }
    })
    // 有数据返回数组，没数据返回null
    return showAdvertisingData;
}

//  -- 小红心 传入id 和 图片id 功能：查看是否收藏（有数据就代表收藏了）
function favoritePrivateInfo(serchUserNo,serchImgNo) {
    var favoritePrivateInfoData;
    $.ajax({
        url: 'http://127.0.0.1:8086/privateinfo/favoritePrivateInfo',
        type: 'post',
        async: false,//使用同步的方式,true为异步方式
        data: {userNo:serchUserNo,imgNo:serchImgNo},
        success: function (res) {
            favoritePrivateInfoData = res;
            // console.log(res)
        },
        fail: function () {
            //code here...
        }
    })
    return favoritePrivateInfoData;
}

// -- 点赞 传入画publicinfo的id
function addLikePublicInfo(addLikeImgNo) {
    var addLikePublicInfoData;
    $.ajax({
        url: 'http://127.0.0.1:8086/publicinfo/addLikePublicInfo',
        type: 'post',
        async: false,//使用同步的方式,true为异步方式
        data: {id:addLikeImgNo},
        success: function (res) {
            addLikePublicInfoData = res;
        },
        fail: function () {
            //code here...
        }
    })
    // 返回的是点赞数
    return addLikePublicInfoData;
}

// -- 取消点赞 传入画publicinfo的id
function cancelLikePublicInfo(addLikeImgNo) {
    var cancelLikePublicInfoData;
    $.ajax({
        url: 'http://127.0.0.1:8086/publicinfo/cancelLikePublicInfo',
        type: 'post',
        async: false,//使用同步的方式,true为异步方式
        data: {id:addLikeImgNo},
        success: function (res) {
            cancelLikePublicInfoData = res;
        },
        fail: function () {
            //code here...
        }
    })
    // 返回的是点赞数
    return cancelLikePublicInfoData;
}
