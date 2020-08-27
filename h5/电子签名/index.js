window.onload = function () {

  function getId(id) {
    return document.getElementById(id);
  }

  let canvas = getId('canvas');
  let context = canvas.getContext('2d');

  //创建临时canvas
  let temporaryCanvas = document.createElement('canvas');

  //设置临时canvas的宽度和高度
  temporaryCanvas.width = canvas.width;
  temporaryCanvas.height= canvas.height;

  //获取临时canvas的上下文
  let temporaryContext = temporaryCanvas.getContext('2d');

  let sizeBtn = getId('size');

  let colorBtn = getId('color');

  let save = getId('save');

  let clear = getId('clear');

  let restore = getId('restore');

  //获取默认画笔大小
  let size = sizeBtn.value / 10;
  console.log('size ==> ', size);

  context.lineWidth = size;


  //获取画笔颜色
  let color = colorBtn.value;
  context.strokeStyle = color;


  class SignName {

    constructor() {

    }

    //绑定事件
    addEvent(node, type, fn) {
      node['on' + type] = fn;
    }

    //取消事件
    removeEvent(node, type) {
      node['on' + type] = null;
    }

  }

  //创建实例
  let signName = new SignName();

  signName.addEvent(canvas, 'mousedown', function (e) {
    //获取坐标
    let x0 = e.offsetX;
    let y0 = e.offsetY;
    // console.log('x0 ==> ', x0);
    // console.log('y0 ==> ', y0);

    //开启绘制路径
    context.beginPath();
    //开始绘制坐标
    context.moveTo(x0, y0);

    signName.addEvent(this, 'mousemove', function (e) {
      //获取坐标
      let x1 = e.offsetX;
      let y1 = e.offsetY;
      // console.log('x1 ==> ', x1);
      // console.log('y1 ==> ', y1);
      context.lineTo(x1, y1);
      context.stroke();
    });

  });

  signName.addEvent(canvas, 'mouseup', function () {
    signName.removeEvent(this, 'mousemove');
  })


  signName.addEvent(canvas, 'mouseout', function () {
    signName.removeEvent(this, 'mousemove');
  })

  //修改画笔大小 oninput
  signName.addEvent(sizeBtn, 'input', function () {
    // console.log(this.value);

    context.lineWidth = this.value / 10;
  })

  //修改画笔颜色
  signName.addEvent(colorBtn, 'change', function () {
    // console.log(this.value);
    context.strokeStyle = this.value;
  })

  //保存图片
  signName.addEvent(save, 'click', function () {
    //base64: 图片信息
    let base64 = canvas.toDataURL('image/png');
    // console.log('base64 ==> ', base64);

    //利用a实现将图片保存本地
    let a = document.createElement('a');
    a.href = base64;
    a.download = '你下载的文件';
    a.click();
  })

  //清除图形
  signName.addEvent(clear, 'click', function () {

    //将主canvas的图形保存在临时canvas中
    temporaryContext.drawImage(canvas, 0, 0, canvas.width, canvas.height);

    //清除主canvas的图形
    context.clearRect(0, 0, canvas.width, canvas.height);
  })

  //恢复上一次的图形
  signName.addEvent(restore, 'click', function () {

    //恢复时，可以将临时canvas的图形绘制到主canvas中
    context.drawImage(temporaryCanvas, 0, 0, canvas.width, canvas.height);

    //清除临时canvas的图形
    temporaryContext.clearRect(0, 0, canvas.width, canvas.height);

  })

}