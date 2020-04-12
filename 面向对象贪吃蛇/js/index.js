window.onload = function () {
    // console.log("onload")
    // 1.0 获取相关元素
    var map = document.getElementById("mapId");
    // console.log(map)
    // 2.0 定义变量记录(需要的数据)
    // 定义宽度
    var width = 600;
    // 定义高度
    var height = 600;
    // 定义方格 li
    var size = 20;
    // 定义行
    var row = height / size;
    // 定义列
    var column = width / size;
    // 定义数组（大）
    var elements = [];
    // 定时器
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
    //3.0 设置地图的大小
    map.style.width = width + "px";
    map.style.height = height + "px";
    //4.0 创建地图
    for (var i = 0; i < row; i++) {
        // 4.0.1 创建行 ul标签
        var ulCreate = document.createElement("ul");
        // 4.0.2 设置类名
        ulCreate.className = "row";
        // 4.0.3 设置ul的高度
        ulCreate.style.height = size + "px";
        // 4.0.4 创建列
        // 4.0.5 定义数组 （小）
        var arr = [];
        for (var j = 0; j < column; j++) {
            // 4.0.6 创建li标签
            var liCreate = document.createElement("li");
            // 4.0.7 设置liCreate标签大小
            liCreate.style.width = (size - 2) + "px";
            liCreate.style.height = (size - 2) + "px";
            // 4.0.8 往ulCreate标签添加元素
            ulCreate.appendChild(liCreate);
            // 4.0.9 把创建的li标签添加到数组
            arr.push(liCreate);
        }
        // 4.0.10 往map标签添加ul标签
        map.appendChild(ulCreate);
        // 4.0.11 往大数组添加小数组arr
        elements.push(arr);
    }

    // console.log(elements)
    //5.0 定义数组 记录蛇身体
    var snakeBody = [];
    // 5.0.1 循环
    for (var i = 0; i < 3; i++) {
        //5.0.2 设置第一行前3列li标签类名为snake
        elements[0][i].className = "snake";
        //5.0.3 往snakebody
        snakeBody.push(elements[0][i]);
    }
    // console.log(snakeBody);
    // 6.0 定义创建食物的函数
    function createFood() {
        // 6.0.1 设置食物的坐标
        foodHang = random(row, 0);
        foodLie = random(column, 0);
        // 判断创建的食物是否落在蛇身体上
        if (elements[foodHang][foodLie].className == 'snake') {
            // 6.0.2 重新创建食物
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
        // keyCode  40  ---- > 下
        // keyCode  38  ---- > 上
        // keyCode  37  ---- > 左
        // keyCode  39  ---- > 右
        // 9.0.3 处理 ， 例如蛇往右边移动，禁止按下左边按键
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
        // console.log(direction)
        // 延迟函数  延迟300毫秒  才允许改变方向 direction
        setTimeout(function(){
            isChange = true;
        },300)
    }

    // 10. 定义蛇运动函数
    // 改变蛇坐标
    function move(){
        //10.0.1 控制语句
        switch(direction) {
            case "right":
                    // 往右边移动
                    lie ++;
                break;
            case "left":
                    // 往左边移动
                    lie --;
                break;
            case "down":
                    // 往下边移动
                    hang ++;
                break;
            case "up" :
                    // 往上边移动
                    hang --;
                break;
        }
        // console.log({
        //     x:lie,
        //     y:hang
        // })
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
        // snakeBody
        for(var i = 0 ; i < snakeBody.length ; i ++ ){
            //10.0.2.1 判断第hang行第lie列 和 数组snakeBody的元素是否重复了
            if(elements[hang][lie] == snakeBody[i]){
                //10.0.2.2 停止定时器函数
                clearInterval(timer);
                //10.0.2.3 提示
                alert('蛇吃自己了');
                // 10.0.2.4 终止代码
                return ;
            }
        }


        //10.0.3 判断蛇是否吃到食物 
        if(hang == foodHang && lie == foodLie){ //蛇头和食物碰撞检测 吃到食物
            // 10.0.3.1 把食物的背景色设置为 蓝色
            elements[foodHang][foodLie].className = "snake";
            //10.0.3.2 往snakeBody 添加一个方块
            snakeBody.push(elements[foodHang][foodLie]);
            //10.0.3.3 重新创新食物
            createFood();
            // ... 

        }else { // 没有吃到食物
            //10.0.3.4 移除snakeBody数组的第一个元素的背景色
            snakeBody[0].className="";
            //10.0.3.5 删除snakeBody数组的第一个元素
            snakeBody.shift();
            //10.0.3.6 设置第hang行第lie列的标签背景色为蓝色
            elements[hang][lie].className = "snake";
            //10.0.3.7 往snakeBody 添加一个elements[hang][lie]标签
            snakeBody.push(elements[hang][lie]);
        }
        

    }
    console.log(elements)
    // 11.执行定时器函数
    timer = this.setInterval(move , 300);

}