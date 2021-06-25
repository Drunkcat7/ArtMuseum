$(function () {
    var userId = sessionStorage.getItem('userId');
    var userLoginSwitch = false
    if (userId != false && userId != null) {
        console.log('id : ' + userId)
        userLoginSwitch = true;
    } else {
        console.log('游客')
        userLoginSwitch = false
    }


    // 瀑布流初始化 建议图片加载后
    var $grid = $('.grid').masonry({
        itemSelector: '.grid-item',
        columnWidth: '.grid-sizer',
        percentPosition: true
    });


    // 登陆信息
    $('#headerUserLog').hide();
    // 登陆后显示
    if (userLoginSwitch) {
        $('#headerUserLog').show();
        $('#headerLogin').hide();
        // 查询用户数据 并且打印到首页
        $('#headerUserLogName').text(userName(userId))
    }

    $('#headerUserLogExit').on('click', function () {
        // 退出按钮 清空参数
        sessionStorage.setItem('userId', '');
        window.location.href = "index.html";
        userLoginSwitch = false
    })

    // 获取图片到页面
    // 从数据库获取数据
    var showPublicInfoData = showPublicInfo();
    console.log('主页一共' + showPublicInfoData.length);
    for (let i = 0; i < showPublicInfoData.length; i++) {
        // 如果登陆
        collectionData = false;
        if (userLoginSwitch) {
            var favoritePrivateInfoData = favoritePrivateInfo(userId, showPublicInfoData[i].id);
            if (favoritePrivateInfoData != false) {
                // console.log('有数据')
                collectionData = true;
            } else {
                // console.log('没数据')
                collectionData = false;
            }
        }

        var items = $('<div class="grid-item">' + '<div class="artContentItem">' +
            '<img class="ItemImg" src=' + showPublicInfoData[i].imglink + ' alt=' + showPublicInfoData[i].id + ' collection=' + collectionData + '>' +
            '<div class="artContentItemHover">' +
            '<div class="artContentItemHoverText">' +
            '<span class="ItemTitle">' + showPublicInfoData[i].title + '</span><br>' +
            '<span class="ItemInfo">' + showPublicInfoData[i].info + '</span>' +
            '</div>' +
            '<div class="artContentItemHoverBtn">' +
            '<span class="ItemCollection"></span><br>' +
            '<span class="ItemLikeNum">' + showPublicInfoData[i].like + '</span>&nbsp;<span class="ItemLike"></span>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '</div>');

        $('.grid').append(items).masonry('appended', items);

        if (collectionData) {
            $('.ItemImg[alt=' + showPublicInfoData[i].id + ']').parents(".artContentItem").find('.ItemCollection').css({ 'color': 'orangered' });
            $('.ItemImg[alt=' + showPublicInfoData[i].id + ']').parents(".artContentItem").find('.ItemCollection').text('');
        }
    }
    // 再次加载瀑布流
    // layout Masonry after each image loads
    $grid.imagesLoaded().progress(function () {
        $grid.masonry();
    });

    // 图片加载失败时触发
    $(".grid-item").find('img').on("error", function () {
        console.log('图片加载失败！！！！！')
        $(this).parents(".grid-item").hide();
        $grid.imagesLoaded().progress(function () {
            $grid.masonry();
        });
    });

    // 顶部滚轮显示Logo
    let scrollSwitch = false;
    $(window).scroll(function () {
        if ($(document).scrollTop() > 70) {
            scrollSwitch = true;
            $('#headerLogo h1:nth-child(1)').animate(
                {
                    opacity: '1',
                    opacity: '1',
                    letterSpacing: '-0.6em',
                    opacity: '0'
                }, 700)

            $('#headerLogo h1:nth-child(2)').animate(
                {
                    opacity: '0',
                    opacity: '0',
                    opacity: '1'
                }, 700)
        } else {
            if (scrollSwitch) {
                $('#headerLogo h1:nth-child(1)').stop(true, true).animate(
                    {
                        opacity: '0',
                        letterSpacing: '0em',
                        opacity: '1',
                        opacity: '1'
                    }, 700)

                $('#headerLogo h1:nth-child(2)').stop(true, true).animate(
                    {
                        opacity: '1',
                        opacity: '0',
                        opacity: '0'
                    }, 700)
                scrollSwitch = false;
            }


        }
    });

    // 显示搜索框
    $('#headerSearchBox').hide();
    $('#headerSearchBox').css({ 'opacity': '1' });
    $('#headerSearch').on('click', function () {
        $('#headerSearchBox').fadeIn(300)
    });
    $('#headerSearchClose').on('click', function () {
        window.location.href = "index.html";
        $('#headerSearchBox').fadeOut(300)
    })

    // 首页广告大图 随机数
    let randomNum = Math.floor(Math.random() * showAdvertising().length);
    let artShowData = showAdvertising()[randomNum]
    $('#artShow').css({ 'background-image': 'url(' + artShowData.imglink + ')' })
    $('#artShow').find('h3').text('来自 ' + artShowData.info + ' 的 ' + artShowData.title)

    // 收藏
    var CollectionSwitch = true;
    // 显示放大图片控件 showItem--------
    $('#showItem').hide();
    $('#showItem').css({ 'opacity': '1' })
    $('.grid-item').on('click', function () {
        // 初始化收藏
        findCollection = $(this).find('img').attr('collection')
        // console.log(findCollection)
        if (findCollection !== "false") {
            CollectionSwitch = false;
            $('#showItemCollection').css({ 'color': 'orangered' });
            $('#showItemCollection').text('');
        } else {
            CollectionSwitch = true;
            $('#showItemCollection').css({ 'color': '#333' });
            $('#showItemCollection').text('');
        }
        // 初始化点赞
        // $('#showItemLike').css({ 'color': '#333' });

        findSrc = $(this).find('img').attr('src')
        findAlt = $(this).find('img').attr('alt')
        findTitle = $(this).find('.ItemTitle').text();
        findInfo = $(this).find('.ItemInfo').text();
        findLikeNum = $(this).find('.ItemLikeNum').text();

        $('#showItemLikeNum').text(findLikeNum)
        $('#showItemInfo').text(findInfo)
        $('#showItemTitle').text(findTitle)
        $('#showItemImg').attr('src', findSrc)
        $('#showItemImg').attr('alt', findAlt)
        $('#showItemImg').attr('collection', findCollection)
        $('#showItem').fadeIn(300)
    });
    $('.showItemTop').on('click', function () {
        $('#showItem').fadeOut(300)
    })

    // 点赞
    var likeSwitch = true;
    $('#showItemLike').on('click', function () {
        // 获取图片id
        let showItemImgNo = $('#showItemImg').attr('alt');
        // console.log('id' + showItemImgNo);
        if (likeSwitch) {
            // 点赞
            var addLikeNum = addLikePublicInfo(showItemImgNo);
            $('#showItemLikeNum').text(addLikeNum)
            // $('#showItemLike').css({ 'color': 'orangered' });

            // 外面的图片也得增加
            $('.ItemImg[alt=' + showItemImgNo + ']').parents(".artContentItem").find('.ItemLikeNum').text(addLikeNum);
            // $('.ItemImg[alt=' + showItemImgNo + ']').parents(".artContentItem").find('.ItemLikeNum').css({ 'color': 'orangered' });
            // $('.ItemImg[alt=' + showItemImgNo + ']').parents(".artContentItem").find('.ItemLike').css({ 'color': 'orangered' });

            likeSwitch = false;
        } else {
            // 取消点赞
            var cancelLikeNum = cancelLikePublicInfo(showItemImgNo);
            $('#showItemLikeNum').text(cancelLikeNum)
            $('#showItemLike').css({ 'color': '#333' });

            // 外面的图片也得减少
            $('.ItemImg[alt=' + showItemImgNo + ']').parents(".artContentItem").find('.ItemLikeNum').text(cancelLikeNum);
            $('.ItemImg[alt=' + showItemImgNo + ']').parents(".artContentItem").find('.ItemLikeNum').css({ 'color': '#f4f7f6' });
            $('.ItemImg[alt=' + showItemImgNo + ']').parents(".artContentItem").find('.ItemLike').css({ 'color': '#f4f7f6' });
            likeSwitch = true;
        }

    })



    // 收藏
    // var CollectionSwitch = true;
    $('#showItemCollection').on('click', function () {
        // 判断用户登陆没
        if (userLoginSwitch) {
            // 登陆了
            // 获取图片id
            // console.log('id' + showItemImgNo);
            let showItemImgNo = $('#showItemImg').attr('alt');
            if (CollectionSwitch) {
                // 收藏
                // 调用接口 addPrivateInfo(AddUserNo, AddImgNo)
                addPrivateInfo(userId, showItemImgNo)
                // console.log(userId+":"+showItemImgNo)

                $('#showItemCollection').css({ 'color': 'orangered' });
                $('#showItemCollection').text('');

                $('.ItemImg[alt=' + showItemImgNo + ']').attr('collection', 'true')
                $('.ItemImg[alt=' + showItemImgNo + ']').parents(".artContentItem").find('.ItemCollection').css({ 'color': 'orangered' });
                $('.ItemImg[alt=' + showItemImgNo + ']').parents(".artContentItem").find('.ItemCollection').text('');

                CollectionSwitch = false;
            } else {
                // 取消收藏
                // 调用接口 deletePrivateInfo(DeleUserNo, DelePrImgNo)
                deletePrivateInfo(userId, showItemImgNo)

                $('#showItemCollection').css({ 'color': '#333' });
                $('#showItemCollection').text('');

                $('.ItemImg[alt=' + showItemImgNo + ']').attr('collection', 'false')
                $('.ItemImg[alt=' + showItemImgNo + ']').parents(".artContentItem").find('.ItemCollection').css({ 'color': '#f4f7f6' });
                $('.ItemImg[alt=' + showItemImgNo + ']').parents(".artContentItem").find('.ItemCollection').text('');
                CollectionSwitch = true;
            }
        } else {
            // 没登陆
            alert('收藏需登陆～还没账号？加入我们！')
        }
    })





    // 切换个人收藏页面
    var collectionDataSwitch = true;
    $('#collectionSwitch').on('click', function () {
        if (collectionDataSwitch) {
            // 打开
            if (userLoginSwitch) {
                // 登陆了
                $('#artContentHeadingTitle').text('Collection');
                $('#collectionSwitch').text('');
                $('#artContentHeadingTitle').css({ 'color': 'orangered' });
                $('#artContentHeadingSwitch').css({ 'color': 'orangered' });

                // 没收藏就删除
                for (let i = 0; i < $('.grid-item').length; i++) {
                    if ($('.grid-item:eq(' + i + ')').find('img').attr("collection") == "false") {
                        var $v = $('.grid-item:eq(' + i + ')'); //jQuery对象
                        var v = $v[0]; //DOM对象
                        // console.log(v)
                        $grid.masonry('remove', v)
                            // trigger layout
                            .masonry();

                        //   $grid.on( 'removeComplete', function( event, removedItems ) {
                        //     console.log( 'Masonry remove complete with ' + removedItems.length + ' items' );
                        //   });
                    }
                }

                collectionDataSwitch = false;
            } else {
                // 没登陆
                alert('收藏需登陆～还没账号？加入我们！')
            }
        } else {
            // 关闭
            window.location.href = "index.html";
            collectionDataSwitch = true;
        }
    })

    // 搜索
    $('#headerSearchInput').keydown(function (e) {
        //键盘抬起时通过判断keyCode来判断按下的按键
        if (e.keyCode == 13) {
            // 隐藏主页大图
            $('#artShow').slideUp(1000);
            $('.artContentHeading').css({ 'margin-top': '40px' })
            $('.header').css({ 'position': 'absolute' })

            // 获取图片到页面
            // 从数据库获取数据
            var searchPublicInfoData = searchPublicInfo($('#headerSearchInput').val())
            // console.log(searchPublicInfoData)

            $('.grid').html('<div class="grid-sizer"></div>');

            console.log('搜索页一共' + searchPublicInfoData.length);
            for (let i = 0; i < searchPublicInfoData.length; i++) {
                // 如果登陆
                collectionData = false;
                if (userLoginSwitch) {
                    var favoritePrivateInfoData = favoritePrivateInfo(userId, searchPublicInfoData[i].id);
                    if (favoritePrivateInfoData != false) {
                        // console.log('有数据')
                        collectionData = true;
                    } else {
                        // console.log('没数据')
                        collectionData = false;
                    }
                }

                var items = $('<div class="grid-item">' + '<div class="artContentItem">' +
                    '<img class="ItemImg" src=' + searchPublicInfoData[i].imglink + ' alt=' + searchPublicInfoData[i].id + ' collection=' + collectionData + '>' +
                    '<div class="artContentItemHover">' +
                    '<div class="artContentItemHoverText">' +
                    '<span class="ItemTitle">' + searchPublicInfoData[i].title + '</span><br>' +
                    '<span class="ItemInfo">' + searchPublicInfoData[i].info + '</span>' +
                    '</div>' +
                    '<div class="artContentItemHoverBtn">' +
                    '<span class="ItemCollection"></span><br>' +
                    '<span class="ItemLikeNum">' + searchPublicInfoData[i].like + '</span>&nbsp;<span class="ItemLike"></span>' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '</div>');

                $('.grid').append(items).masonry('appended', items);

                if (collectionData) {
                    $('.ItemImg[alt=' + searchPublicInfoData[i].id + ']').parents(".artContentItem").find('.ItemCollection').css({ 'color': 'orangered' });
                    $('.ItemImg[alt=' + searchPublicInfoData[i].id + ']').parents(".artContentItem").find('.ItemCollection').text('');
                }
            }
            // 再次加载瀑布流
            // layout Masonry after each image loads
            $grid.imagesLoaded().progress(function () {
                $grid.masonry();
            });

            $('.grid-item').on('click', function () {
                console.log('sss')
                // 初始化收藏
                findCollection = $(this).find('img').attr('collection')
                // console.log(findCollection)
                if (findCollection !== "false") {
                    CollectionSwitch = false;
                    $('#showItemCollection').css({ 'color': 'orangered' });
                    $('#showItemCollection').text('');
                } else {
                    CollectionSwitch = true;
                    $('#showItemCollection').css({ 'color': '#333' });
                    $('#showItemCollection').text('');
                }
                // 初始化点赞
                // $('#showItemLike').css({ 'color': '#333' });

                findSrc = $(this).find('img').attr('src')
                findAlt = $(this).find('img').attr('alt')
                findTitle = $(this).find('.ItemTitle').text();
                findInfo = $(this).find('.ItemInfo').text();
                findLikeNum = $(this).find('.ItemLikeNum').text();

                $('#showItemLikeNum').text(findLikeNum)
                $('#showItemInfo').text(findInfo)
                $('#showItemTitle').text(findTitle)
                $('#showItemImg').attr('src', findSrc)
                $('#showItemImg').attr('alt', findAlt)
                $('#showItemImg').attr('collection', findCollection)
                $('#showItem').fadeIn(300)
            });

        }
    });

})
