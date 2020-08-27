window.onload = function(){

    // 1.0 构造函数
    function Player(){
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
        
        this.video.oncanplay = function(){
            _this.totalTime = this.duration;
            // console.log(_this.totalTime,'test')
             _this.element_total.innerHTML = _this.formatime(_this.totalTime);
             _this.pause();
        }
    }
    Player.prototype.formatime = function(seconds){
        var h , m , s ;
        // 剩余小时
        h = Math.floor(seconds/3600);
        h = h < 10 ? "0"+h : h;
        // 剩余分钟
        m = Math.floor(seconds%3600/60);
        m = m < 10 ? "0"+m : m;
        s = Math.floor(seconds%60);
        s = s < 10 ? "0"+s : s;
        return  h +":"+ m + ":"+s;
    }
    Player.prototype.show = function(dom){
        dom.style.display = "block";
    }
    Player.prototype.hide = function(dom){
        dom.style.display = "none";
    }
    Player.prototype.play = function(){
        // 视频播放
        this.video.play();
    }
    Player.prototype.pause = function(){
        // 视频暂停
        this.video.pause();
    }
    // 2.0.6 原型对象 进度条
    Player.prototype.progress = function(val){
        // 改变.bar的宽度
        this.element_bar.style.width = (val*this.element_progress.offsetWidth) + "px";
        // console.log(this.element_bar,'=-----')
        
    }
    Player.prototype.playVideoTime = function(){
        // 当前播放时间
        this.element_current.innerHTML = this.formatime(this.currentTime);
        // 视频文件总时长
        this.element_total.innerHTML = this.formatime(this.totalTime);
        // console.log(this.currentTime,this.totalTime,'====')
        
    }
    // 2.0.7 原型对象 全屏
    Player.prototype.fullPage2 = function(){
        // console.log(this.video)
        this.video.requestFullscreen();
    }
    Player.prototype.addEvent = function(){
        var _this = this;
        var count = 0;

        console.log(this.video.getAttribute('src',count++),'----=====')
        // 监听video播放
        this.video.ontimeupdate = function(){
            _this.totalTime = this.duration;
            _this.currentTime = this.currentTime;
            _this.playVideoTime();
            var v1 = _this.currentTime / _this.totalTime ;
            _this.progress(v1);
            if(_this.currentTime == _this.totalTime){
                _this.play();
                _this.hide(_this.element_pause);
                _this.show(_this.element_play);
            }
        }
    }
    Player.prototype.init = function(){
        var _this = this;
        // 点击播放
        this.element_play.onclick = function(){
            _this.play();
            _this.hide(this);
            _this.show(_this.element_pause);
        }
        this.element_pause.onclick = function(){
            _this.pause();
            _this.hide(this);
            _this.show(_this.element_play);
        }
        this.addEvent();
        this.element_fullpage.onclick = function(){
            // 
            _this.fullPage2();
        }
    }
    var player = new Player();
    player.init();


}