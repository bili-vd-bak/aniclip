<script lang="ts" setup>
import { data as time } from "./time.data.ts"
</script>

# AniClip 番剧删减汇总

AniClip 番剧删减汇总：  
鉴于大多数流媒体平台(bilibili等)均对番剧有过度删减的现象，悲痛万分，建此平台，帮助各位正版受害者快捷观看到番剧的缺失/修改部分。无论是画面和谐、片段消失术，还是字幕翻译中体现的语言艺术，我们都会纠正回来，还一个正常的追番体验(个鬼)。  
这是一个方便各位 *正版受害者* 快捷观看删减片段(~~看看自己有多么大冤种~~) 的网站，尽情享受吧！  

## 灵感

1. 有很多人不会/懒得去找和下载完整版，这里提供了一个方便的平台。  
2. 其二是个人在存档番剧时有来自B站的源，而弹幕对删减的吐槽等也是一种文化现象，值得收录，而也没必要再存一份别的源，故截取一份对应片段留存。  

## 公告

最近构建时间：`{{ new Date(time?.build).toLocaleString("zh-Hans-CN") }}`[`{{ new Date(time?.build) }}`]  
最近更新时间：`{{ new Date(time?.src_update).toLocaleString("zh-Hans-CN") }}`[`{{ new Date(time?.src_update) }}`]  

::: danger 须知(数据来源)
数据主要来自[汇总酱](https://hzj.wiki)，以及该仓库的其他贡献者。  
数据使用请严格按照[许可证](#license-许可证)注明来源。  
:::

::: warning 须知(数据可靠性)
`2021.10`~`2022.7`均由AI转换自汇总酱，仅由仓库所有者人工补齐`source`并修正部分集数标记错误。  
在此公开[AI提示词](https://www.doubao.com/thread/w45506302557698)，供转换参考。  
:::

::: tip 须知(基本操作)
你可以使用侧边栏按**时间线**查询番剧，在`速览`中可进行快速跳转至对应番剧；也可直接使用页面上方导航栏**搜索框**搜索番剧。  
**搜索框**分词功能有点问题，暂时建议进入 `时间线`-`速览` 页面，调用浏览器自带搜索(`Ctrl`+`k`)。  
**最新**栏目由自动程序同步，可能不准确；其它项目均经基本人工核准。  
进入当季度页面后，可在页面右上角`大纲`处快速跳转。  
:::

## 帮助我们：提供数据或改进程序

您可以按照以下教程向我们提供数据或上传被删减的番剧片段。  
[[contribute|点击查看贡献指南]]

## 基于API的查询方式

### JSON

类型请自行查看JSON文件或`bili-vd-bak/aniclip`下的`docs/timeline/toml.data.ts`。  

以下链接任选:  

```url
https://aniclip.xrzyun.eu.org/data.json
(选择季度)
(仅需在timeline任意页面后加上 .json 即可)
https://aniclip.xrzyun.eu.org/timeline/{季度}.json
```

## LICENSE 许可证

本仓库中：  
[**代码部分**](https://github.com/bili-vd-bak/aniclip)采用`MIT`协议开源；  
[**数据部分**](https://github.com/bili-vd-bak/aniclip-src)(仓库`src/`目录下文件、文档中所有显示番剧删减信息的表格或文字等)采用[CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/)许可协议共享。
