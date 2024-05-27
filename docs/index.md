<script lang="ts" setup>
import { data as time } from "./time.data.ts"
</script>

# AniClip 番剧删减汇总

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
你可以使用侧边栏按**时间线**查询番剧，也可直接使用页面上方导航栏**搜索框**搜索番剧。  
**搜索框**分词功能有点问题，暂时建议进入 `时间线`-`合集` 页面，调用浏览器自带搜索(`Ctrl`+`k`)。  
:::

## LICENSE 许可证

本仓库中：  
[**代码部分**](https://github.com/bili-vd-bak/aniclip)采用`MIT`协议开源；  
[**数据部分**](https://github.com/bili-vd-bak/aniclip-src)(仓库`src/`目录下文件、文档中所有显示番剧删减信息的表格或文字等)采用[CC BY-NC-SA](https://creativecommons.org/licenses/by-nc-sa/4.0/)许可协议共享。

## 帮助我们提供数据或改进程序

[点击查看贡献指南](contribute.md)
