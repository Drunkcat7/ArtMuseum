function DragImgUpload(id,options) {
    this.me = $(id);
    var defaultOpt = {
        boxWidth:'200px',
        boxHeight:'auto'
    }
    this.preview = $('#sectionUploadIMG');
    this.opts=$.extend(true, defaultOpt,{
    }, options);
    this.init();
    this.callback = this.opts.callback;
}

//定义原型方法
DragImgUpload.prototype = {
    init:function () {
        this.me.append(this.preview);
        this.me.append(this.fileupload);
        // this.cssInit();
        this.eventClickInit();
    },
    cssInit:function () {
        
    },
    onDragover:function (e) {
        e.stopPropagation();
        e.preventDefault();
        e.dataTransfer.dropEffect = 'copy';
    },
    onDrop:function (e) {
        var self = this;
        e.stopPropagation();
        e.preventDefault();
        var fileList = e.dataTransfer.files; //获取文件对象
        // do something upload
        if(fileList.length == 0){
            return false;
        }
        //检测文件是不是图片
        if(fileList[0].type.indexOf('image') === -1){
            alert("您拖的不是图片！");
            return false;
        }

        //拖拉图片到浏览器，可以实现预览功能
        
        var img = window.URL.createObjectURL(fileList[0]);
        var filename = fileList[0].name; //图片名称
        var filesize = Math.floor((fileList[0].size)/1024);
        if(filesize>500){
            alert("上传大小不能超过500K.");
            return false;
        }
        this.preview.show()
        self.me.find("img").attr("src",img);
        self.me.find("img").attr("title",filename);
        if(this.callback){
            this.callback(fileList);
        }

        var fr = new FileReader();//实例FileReader对象
        fr.readAsDataURL(fileList[0]);//把上传的文件对象转换成url
        fr.onload = function (e) {
            // console.log(e);
            // var Url=e.target.result;//上传文件的URL
            var Url = this.result;//上传文件的URL

            //图片的url
            // 开始调用接口
            // console.log(Url)
            if(userLogin(Url)!=false){
                // console.log(userLogin(Url));
                let userId =  userLogin(Url)
                userId = userId.id;
                console.log(userId)
                // 传值
                sessionStorage.setItem('userId',userId);
                window.location.href = "index.html";
            }else{
                alert('登陆失败')
            }
            


        }
    },
    eventClickInit:function () {
        var self = this;
        this.me.unbind().click(function () {
            self.createImageUploadDialog();
        })
        var dp = this.me[0];
        dp.addEventListener('dragover', function(e) {
            self.onDragover(e);
        });
        dp.addEventListener("drop", function(e) {
            self.onDrop(e);
        });


    },
    onChangeUploadFile:function () {
        var fileInput = this.fileInput;
        var files = fileInput.files;
        var file = files[0];
        var img = window.URL.createObjectURL(file);
        var filename = file.name;
        this.preview.show()
        this.me.find("img").attr("src",img);
        this.me.find("img").attr("title",filename);
        if(this.callback){
            this.callback(files);
        }

        var fr = new FileReader();//实例FileReader对象
        fr.readAsDataURL(files[0]);//把上传的文件对象转换成url
        fr.onload = function (e) {
            // console.log(e);
            // var Url=e.target.result;//上传文件的URL
            var Url = this.result;//上传文件的URL
            
            //图片的url
            // 开始调用接口
            // console.log(Url)
            if(userLogin(Url)!=false){
                // console.log(userLogin(Url));
                let userId =  userLogin(Url)
                userId = userId.id;
                console.log(userId)
                // 传值
                sessionStorage.setItem('userId',userId);
                window.location.href = "index.html";
            }else{
                alert('登陆失败')
            }
            

        }
    },
    createImageUploadDialog:function () {
        var fileInput = this.fileInput;
        if (!fileInput) {
            //创建临时input元素
            fileInput = document.createElement('input');
            //设置input type为文件类型
            fileInput.type = 'file';
            //设置文件name
            fileInput.name = 'ime-images';
            //允许上传多个文件
            fileInput.multiple = true;
            fileInput.onchange  = this.onChangeUploadFile.bind(this);
            this.fileInput = fileInput;
        }
        //触发点击input点击事件，弹出选择文件对话框
        fileInput.click();
    }

}

