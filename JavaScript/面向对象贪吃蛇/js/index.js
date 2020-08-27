window.onload = function () {
    // console.log("onload")
    // 1.0 获取相关元素
    var map = document.getElementById("mapId");
    var width = 600;
    var height = 600;
    var size = 20;
    var row = height / size;
    // 定义列
    var column = width / size;
    // 定义数组（大）
    var elements = [];
    var timer = null;
    // 方向
    var direction = "right";
    // 蛇头部的坐标 
    var hang = 0;
    var lie = 2;
    // 食物的坐标
    var foodHang = 0;
    var foodLie = 0;
    // 布尔值  防止手指按下键盘频繁改变方向
    var isChange = true;
    // ....
    var count = 0;
    //3.0 设置地图的大小
    map.style.width = width + "px";
    map.style.height = height + "px";
    //4.0 创建地图
    for (var i = 0; i < row; i++) {
        var ulCreate = document.createElement("ul");
        ulCreate.className = "row";
        ulCreate.style.height = size + "px";
        var arr = [];
        for (var j = 0; j < column; j++) {
            var liCreate = document.createElement("li");
            liCreate.style.width = (size - 2) + "px";
            liCreate.style.height = (size - 2) + "px";
            ulCreate.appendChild(liCreate);
            arr.push(liCreate);
        }
        map.appendChild(ulCreate);
        elements.push(arr);
    }

    //5.0 定义数组 记录蛇身体
    var snakeBody = [];
    // 5.0.1 循环
    for (var i = 0; i < 3; i++) {
        elements[0][i].className = "snake";
        snakeBody.push(elements[0][i]);
    }
    // 6.0 定义创建食物的函数
    function createFood() {
        // 6.0.1 设置食物的坐标
        foodHang = random(row, 0);
        foodLie = random(column, 0);
        if (elements[foodHang][foodLie].className == 'snake') {
            createFood();
        } else {
            // 6.0.3 设置食物背景色
            elements[foodHang][foodLie].className = "egg";
        }
    }
    // 7.0 随机数
    function random(max, min) {
        return Math.floor(Math.random() * (max - min) + min);
    }
    // 8.0 调用创建食物的函数
    createFood();

    // 9.0 监听键盘事件  获取蛇移动的方向
    document.onkeydown = function (event) {

        // 9.0.1 ...
        if(!isChange){
            return ;
        }

        // 9.0.2 获取键值码
        var keyCode = event.keyCode;
        if (direction == "right" && keyCode == 37) {
            return;
        }
        if (direction == "left" && keyCode == 39) {
            return;
        }
        if (direction == "down" && keyCode == 38) {
            return;
        }
        if (direction == "up" && keyCode == 40) {
            return;
        }
        // console.log(keyCode)

        // 9.0.4 设置方向 direction 
        if(keyCode == 39){
            direction = "right";
            isChange = false;
        }
        if(keyCode == 37){
            direction = "left";
            isChange = false;
        }
        if(keyCode == 40){
            direction = "down";
            isChange = false;
        }
        if(keyCode == 38){
            direction = "up";
            isChange = false;
        }
        // console.log(direction
        setTimeout(function(){
            isChange = true;
        },300)
    }

    // 10. 定义蛇运动函数
    function move(){
        //10.0.1 控制语句
        switch(direction) {
            case "right":
                    lie ++;
                break;
            case "left":
                    lie --;
                break;
            case "down":
                    hang ++;
                break;
            case "up" :
                    hang --;
                break;
        }
        //10.0.2 判断坐标是否超出地图范围
        if( hang < 0 || hang > (row -1) || lie < 0 || lie > (column-1)){
            //停止定时器函数
            clearInterval(timer);
            //提示
            alert("亲，你跑出地球以外了！");
            // 终止代码
            return;
        }
        //10.0.2 判断蛇头部方块蛇身体接触提示游戏结束
        for(var i = 0 ; i < snakeBody.length ; i ++ ){
            //10.0.2.1 判断第hang行第lie列 和 数组snakeBody的元素是否重复了
            if(elements[hang][lie] == snakeBody[i]){
                clearInterval(timer);
                alert('蛇吃自己了');
                return ;
            }
        }


        //10.0.3 判断蛇是否吃到食物 
        if(hang == foodHang && lie == foodLie){ //蛇头和食物碰撞检测 吃到食物
            
            elements[foodHang][foodLie].className = "snake";
            snakeBody.push(elements[foodHang][foodLie]);
            createFood();
            // ... 
           count ++;
            document.getElementsByClassName('cout')[0].innerText = count

        }else { 
            snakeBody[0].className="";
            snakeBody.shift();
            elements[hang][lie].className = "snake";
            snakeBody.push(elements[hang][lie]);
        }
        

    }
    // 11.执行定时器函数
    
    var btn1 = document.getElementsByClassName('btn1')[0]
    var btn2 = document.getElementsByClassName('btn2')[0]
    console.log(btn1,'[[[[')
    btn1.onclick = function(){
        console.log(btn1,'btn1')
        var _this  = this
        clearInterval(timer)
        timer = setInterval(move , 300);
    }
    btn2.onclick = function(){
        console.log(btn2,'btn2')
        clearInterval(timer)
    }
    // timer = this.setInterval(move , 300);
}