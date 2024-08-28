import html2canvas from "html2canvas";

const Html2Pic = async (
  htmlId: string,
  scale = 1,
  type?: "image/webp" | "image/png"
) => {
  const PicDom = document.getElementById(htmlId);
  const shareContent = PicDom, //需要截图的包裹的（原生的）DOM 对象
    width = shareContent.offsetWidth, //获取dom 宽度
    height = shareContent.offsetHeight, //获取dom 高度
    canvas = document.createElement("canvas"); //创建一个canvas节点
  // scale = 2; //定义任意放大倍数 支持小数
  canvas.width = width * scale; //定义canvas 宽度 * 缩放
  canvas.height = height * scale; //定义canvas高度 *缩放
  canvas.getContext("2d").scale(scale, scale); //获取context,设置scale
  const opts = {
    scale, // 添加的scale 参数
    canvas: canvas, //自定义 canvas
    // logging: true, //日志开关，便于查看html2canvas的内部执行流程
    width: width, //dom 原始宽度
    height: height,
    useCORS: true, // 【重要】开启跨域配置
  };
  const r = html2canvas(shareContent, opts).then(function (canvas) {
    const context = canvas.getContext("2d");
    // 【重要】关闭抗锯齿
    context.imageSmoothingEnabled = false;
    // 【重要】默认转化的格式为png,也可设置为其他格式
    const img = canvas.toDataURL(type);
    return {
      url: img,
      width: canvas.width / scale + "px",
      height: canvas.height / scale + "px",
    };
  });
  canvas.remove();
  return r;
};

export default Html2Pic;
