window.onload = function(){

    // 1.0 构造函数
    function Player(){
        // 1.0.1 获取相关的元素
        this.video = document.getElementById("video");
        this.element_play = document.getElementById("play");
        this.element_pause = document.getElementById("pause");
        this.element_current = document.getElementById("current");
        this.element_total = document.getElementById("total");
        this.element_progress = document.getElementById("progress");
        this.element_bar = document.getElementById("bar");
        this.element_fullpage = document.getElementById("fullpage");
        this.currentTime = 0;
        this.totalTime = 0;
        var _this = this;
        // 监听是不是一个视频文件
        this.video.oncanplay = function(){
            // 获取总时长
            _this.totalTime = this.duration;
            console.log(_this.totalTime,'test')
             // 视频文件总时长
             _this.element_total.innerHTML = _this.formatime(_this.totalTime);
             // 暂停视频
             _this.pause();
        }
    }
    // 2.0.1 原型对象 格式化时间
    Player.prototype.formatime = function(seconds){
        // 时分秒
        var h , m , s ;
        // 剩余小时
        h = Math.floor(seconds/3600);
        // 
        h = h < 10 ? "0"+h : h;
        // 剩余分钟
        m = Math.floor(seconds%3600/60);
        // 
        m = m < 10 ? "0"+m : m;
        // 剩余的秒数
        s = Math.floor(seconds%60);
        // 
        s = s < 10 ? "0"+s : s;
        // 返回时间的字符串
        return  h +":"+ m + ":"+s;
    }
    // 2.0.2 原型对象 显示元素
    Player.prototype.show = function(dom){
        dom.style.display = "block";
    }
    // 2.0.3原型对象隐藏元素
    Player.prototype.hide = function(dom){
        dom.style.display = "none";
    }
    // 2.0.4 原型对象 视频播放
    Player.prototype.play = function(){
        // 视频播放
        this.video.play();
    }
    // 2.0.5 原型对象 视频暂停
    Player.prototype.pause = function(){
        // 视频暂停
        this.video.pause();
    }
    // 2.0.6 原型对象 进度条
    Player.prototype.progress = function(val){
        // 改变.bar的宽度
        this.element_bar.style.width = (val*this.element_progress.offsetWidth) + "px";
    }

    // 2.0.6 原型对象 播放的时间
    Player.prototype.playVideoTime = function(){
        // 当前播放时间
        this.element_current.innerHTML = this.formatime(this.currentTime);
        // 视频文件总时长
        this.element_total.innerHTML = this.formatime(this.totalTime);
    }
    // 2.0.7 原型对象 全屏
    Player.prototype.fullPage2 = function(){
        console.log(this.video)
        // 全屏
        // .requestFullscreen(); 调用者：dom
        this.video.requestFullscreen();
    }
    // 2.0.7 原型对象 监听视频文件播放
    Player.prototype.addEvent = function(){ // 注意函数作用域   Player.prototype.addEvent
        // 记录构造函数产生的对象 this
        var _this = this;
        // 监听video播放
        this.video.ontimeupdate = function(){ //  注意函数作用域 ontimeupdate 
            // this ===== > video 
            // _this ===== > Player
            // 当前播放的时长
            _this.totalTime = this.duration;
            // 视频文件总时长
            _this.currentTime = this.currentTime;
            // console.log({
            //     totalTime:_this.totalTime,
            //     currentTime:_this.currentTime
            // })
            // 显示视频播放的时间信息
            _this.playVideoTime();
            // 显示进度条的比例
            var v1 = _this.currentTime / _this.totalTime ;
            // 显示进度条
            _this.progress(v1);
        }
    }

    // 2.0.8 原型对象 初始化
    Player.prototype.init = function(){
        // 记录Player对象
        var _this = this;
        // 点击播放
        this.element_play.onclick = function(){
            // 调用播放函数
            _this.play();
            // 隐藏当前点击的按钮
            _this.hide(this);
            // 显示|"暂停" 按钮
            _this.show(_this.element_pause);
        }
        // 点击暂停
        this.element_pause.onclick = function(){
            // 调用暂停函数
            _this.pause();
            // 隐藏当前点击的按钮
            _this.hide(this);
             // 显示|"播放" 按钮
            _this.show(_this.element_play);
        }
        // 监听视频播放
        this.addEvent();
        // 点击按钮 全屏
        this.element_fullpage.onclick = function(){
            // 
            _this.fullPage2();
        }
    }


    // 3.0 创建构造函数的实例对象
    var player = new Player();
    // 3.0.1 调用原型对象的init函数
    player.init();








}