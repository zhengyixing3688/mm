// 可以设置标签多个属性
// 1.0 定义动画的函数
function animate(dom , option) {
    // 2.0 首先清除定时器
    clearInterval(dom.timer);
    // 3.0 执行定时器函数
    dom.timer = setInterval( function(){
        // 4.0 定义一个布尔值
        var bool = true;
        // 5.0 循环
        for(var k in option){
            // 5.0.1 获取目标属性值
            // k ----- > width
            // option[k] ---- > 100px
            // 5.0.2 目标属性值
            var target = parseInt(option[k]);
            // 5.0.3 当前的属性值 100px
            //  100
            var current = parseInt(getComputedStyle(dom, null)[k]);
            // 5.0.4 步长
            var speed = (target - current ) / 5 ;
            // 5.0.5 处理步长 出现的小数点  0.1 === 1 /-0.1 ===> -1
            // 
            speed =  speed > 0 ? Math.ceil(speed) : Math.floor(speed);
            // console.log({
            //     speed:speed
            // })
            // 步长
            // 5.0.6 判断 只要有一个属性没达到目标值 就设置bool为false 
            // 如果bool这个变量的值为false ,那么定时器就不会停止
            if(current != target){
                // 设置布尔值 为 false 
                bool = false;
            }
            //5.0.7 设置dom元素的样式
            dom.style[ k ] = current + speed + "px";
        }
        // 6.0 当所有的属性达到目标值  bool 为 true 
        if(bool){
            //
            // console.log("test")
            // 6.0.1 停止定时器函数
            clearInterval(dom.timer);
            // 6.0.2 终止程序
            return ;
        }
    } ,30)
}