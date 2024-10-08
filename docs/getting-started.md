<script lang="ts" setup>
import { data as time } from "./time.data.ts"
</script>

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
想要直接**观看删减片段**请访问对应季度；若仅需知晓**删减情况**请访问`最新`。  
建议进入 `时间线`-`速览` 页面，调用浏览器自带搜索(`Ctrl`+`k`)。  
**最新**栏目由自动程序同步，可能不准确；其它项目均经基本人工核准。  
进入当季度页面后，可在页面右上角`大纲`处快速跳转。  
:::

## 帮助我们：提供数据或改进程序

您可以按照以下教程向我们提供数据或上传被删减的番剧片段。  
[[contribute|点击查看贡献指南]]

## RSS订阅

近三个月的番剧删减信息订阅：  

```url
https://aniclip.xrzyun.eu.org/atom.xml
```

若需订阅特定番剧，请前往各季度页面，在番剧下方获取对应RSS链接。  

## 基于API的查询方式

### JSON

类型请自行查看JSON文件或`bili-vd-bak/aniclip`下的`docs/timeline/toml.data.ts`。  

以下链接任选:  

```url
(查询更新时间及有记录的季度)
https://aniclip.xrzyun.eu.org/data.json
```

```url
(选择单季度)
(仅需在timeline任意页面后加上 .json 即可)
https://aniclip.xrzyun.eu.org/timeline/{季度}.json
```

## LICENSE 许可证

本仓库中：  
[**代码部分**](https://github.com/bili-vd-bak/aniclip)采用`MIT`协议开源；  
[**数据部分**](https://github.com/bili-vd-bak/aniclip-src)(仓库`src/`目录下文件、文档中所有显示番剧删减信息的表格或文字等)采用[CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/)许可协议共享。

### 第三方

#### UI/ICON

- 首页图标: [Re-Wearbili](https://github.com/SpaceXC/Re-Wearbili) -- UI(`Creative Common 4.0`)

#### 网络上相关代码使用及灵感

- 图片分享功能:[【基于html2canvas实现网页保存为图片及图片清晰度优化】分享自 @SegmentFault](https://segmentfault.com/a/1190000011478657?utm_medium=shareLink&utm_campaign=socialShare)

- Git时间戳获取: [Xavi](https://xaviw.github.io/XaviDocs/%E5%B7%A5%E5%85%B7%E7%B3%BB%E5%88%97/VitePress%E6%90%AD%E5%BB%BA/%E6%89%A9%E5%B1%95%E9%A6%96%E9%A1%B5%E5%86%85%E5%AE%B9(%E6%96%B0).html)及[Vitepress官方](https://github.com/vuejs/vitepress/blob/main/src/node/utils/getGitTimestamp.ts)

- Modal弹窗: [Vitepress文档](https://vitepress.dev/zh/guide/using-vue#using-teleports)

#### NPM包

各库及其开源许可证见`package.json`:  

<<< @/../package.json
