$(function () {
    // 数据库用的变量
    let userName;
    let userImgkey;
    // 判断是否有绘画
    let drawJudge = false;

    // 画板操作
    //这是画板的地址
    // console.log(myCanvas.toDataURL("image/png"));
    var myCanvas = document.getElementById('myCanvas');
    var context = myCanvas.getContext("2d");
    // myCanvas的宽高
    var myCanvasX = myCanvas.getAttribute('width');
    var myCanvasY = myCanvas.getAttribute('height');
    myCanvasX = Number(myCanvasX.slice(0, myCanvasX.length - 2));
    myCanvasY = Number(myCanvasY.slice(0, myCanvasY.length - 2));
    // 设置背景颜色
    context.fillStyle = "hsl(356deg, 61.7%, 81.6%)";
    // 绘制背景
    context.fillRect(0, 0, myCanvasX, myCanvasY);
    // 画笔颜色
    context.strokeStyle = "hsl(356deg, 61.7%, 30%)";
    // 圆形的结束线帽
    context.lineCap = "round";
    // 粗细
    context.lineWidth = 4;
    //阴影大小
    context.shadowBlur = 2;
    //阴影颜色
    context.shadowColor = "#25253a";
    // 线条交汇时，创建圆形边角
    // context.lineJoin = "round";

    // 页面的range移动时发生变化
    // 字体粗细
    $('#weightRange').on('input', function () {
        // console.log($('#weightRange').val())
        // 打印值
        $('#weightAlert').html($('#weightRange').val() + '&nbsp;Pixel')
        context.lineWidth = $('#weightRange').val();
    });
    //颜色 
    $('#colorRange').on('input', function () {
        drawJudge = false;
        // console.log($('#colorRange').val())
        // 打印值
        $('#colorAlert').html($('#colorRange').val() + '&nbsp;Deg')
        context.fillStyle = "hsl(" + $('#colorRange').val() + "deg, 61.7%, 81.6%)";
        context.strokeStyle = "hsl(" + $('#colorRange').val() + "deg, 61.7%, 30%)";
        // 清除页面
        context.clearRect(0, 0, myCanvasX, myCanvasY);
        // 加上背景颜色
        context.fillRect(0, 0, myCanvasX, myCanvasY);
        $('.section .sectionCanvas').css({ 'background-color': 'hsl(' + $('#colorRange').val() + 'deg, 29.8%, 74.3%)' });
        $('.section .sectionCanvas .sectionCanvasArtKey').css({ 'background-color': 'hsl(' + $('#colorRange').val() + 'deg, 61.7%, 70%)' });
    });

    // 页面的nameinput
    $('#nameText').on('input', function () {
        if ($('#nameText').val() != "") {
            $('#nameAlert').text('获取ARTKEY吧!');
        } else {
            $('#nameAlert').text('请输入名字!');
        }
        $('#canvasName').text($('#nameText').val());
    });

    // 记录位置
    var clickX = new Array();
    var clickY = new Array();
    // 判断鼠标是否在作画
    var paint;

    // 记录鼠标坐标点
    function addClick(x, y) {
        clickX.push(x);
        clickY.push(y);
    }
    // 鼠标按下事件(Mouse Down Event)
    $('#myCanvas').mousedown(function (e) {
        //鼠标在元素的位置 鼠标x位置-元素离左边位置
        let mouseX = e.pageX - $('#myCanvas').offset().left;
        let mouseY = e.pageY - $('#myCanvas').offset().top;
        paint = true;
        addClick(mouseX, mouseY);
        redraw();
    });
    // 鼠标移动事件(Mouse Move Event)
    $('#myCanvas').mousemove(function (e) {
        if (paint) {//是不是按下了鼠标
            let mouseX = e.pageX - $('#myCanvas').offset().left;
            let mouseY = e.pageY - $('#myCanvas').offset().top;
            addClick(mouseX, mouseY);
            redraw();
        }
    });
    // 鼠标松开事件(Mouse Up Event)
    $('#myCanvas').mouseup(function (e) {
        paint = false;
        // 重置坐标
        clickX = new Array();
        clickY = new Array();
    });
    // 鼠标移开事件(Mouse Leave Event)
    $('#myCanvas').mouseleave(function (e) {
        paint = false;
        // 重置坐标
        clickX = new Array();
        clickY = new Array();
    });

    function redraw() {
        // 画了
        drawJudge = true;
        context.beginPath();
        if (clickX.length == 1 || clickY.length == 1) {
            context.moveTo(clickX[clickX.length - 1], clickY[clickX.length - 1]);
            context.lineTo(clickX[clickX.length - 1], clickY[clickX.length - 1]);
            // console.log('触发')
        } else {
            context.moveTo(clickX[clickX.length - 2], clickY[clickX.length - 2]);
            context.lineTo(clickX[clickX.length - 1], clickY[clickX.length - 1]);
        }
        context.closePath();
        context.stroke();
        // console.log('X:'+clickX.length +'Y:'+clickY.length)
    }

    //清除画板
    $('#clearBtn').on('click', function () {
        // 判断重置
        drawJudge = false;
        // 重置坐标
        clickX = new Array();
        clickY = new Array();
        // 清除页面
        context.clearRect(0, 0, myCanvasX, myCanvasY);
        // 加上背景颜色
        context.fillRect(0, 0, myCanvasX, myCanvasY);
    })


    // 点击按钮下载
    $('#artKeyBtn').on('click', function () {
        // 如果名字不为空
        if ($('#nameText').val() != "" && drawJudge) {
            // 注册，将数据存入数据库！
            userName = $('#canvasName').text();
            //寻找页面mydiv转换成canvas
            changeCanvas('mydiv');
            // 寻找页面canvas myPrint
            setTimeout(function () {
                let myPrint = document.getElementById("myPrint");
                // console.log(myPrint.toDataURL("image/png"));
                downImg(myPrint.toDataURL("image/png"))
                // 注册，将数据存入数据库！
                userImgkey = myPrint.toDataURL("image/png");
                userSignIn(userName,userImgkey);
                // 注册成功跳转
                // 先获取用户的id
                let userId =  userLogin(userImgkey)
                userId = userId.id;
                // console.log(userId)
                // 传值
                sessionStorage.setItem('userId',userId+"");
                window.location.href = "index.html";
            }, 1000)
        } else {
            alert('注册失败！请确认名字是否有填写 或 ARTKEY是否有绘画');
        }
    })

    //选中.box类将该容器转为canvas
    function changeCanvas(id) {
        html2canvas(document.querySelector('#' + id)).then(function (canvas) {
            $('#' + id).remove()    //移除页面上的该元素
            canvas.setAttribute('id', 'myPrint')
            // document.body.appendChild(canvas);    //像页面中添加转为canvas之后的元素!!!!!!!
            $('.sectionCanvas').prepend(canvas) //在被选元素的开头插入内容
        })
    }

    // 图片下载方法
    function downImg(url) {
        // 创建a标签 并设置其相关属性，最后触发其点击事件
        let a = document.createElement("a")
        let clickEvent = document.createEvent("MouseEvents");
        a.setAttribute("href", url)
        a.setAttribute("download", 'artKey')
        a.setAttribute("target", '_blank')
        clickEvent.initEvent('click', true, true)
        a.dispatchEvent(clickEvent);
    }


})