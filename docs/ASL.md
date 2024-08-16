<script setup>
import { data as time } from "./time.data.ts"
import S from "./timeline/s.vue"
</script>

::: danger 须知
本页数据来自[汇总酱](https://hzj.wiki)。  
数据使用请严格按照[[getting-started#license-许可证|许可证]]注明来源。  
由于 汇总酱 的网页未规范格式化，抓取数据可能有误。  
:::

::: danger 警告
本页未经人工核准且无删减切片，若需准确数据请在菜单中选择具体季度。  
:::

最近更新时间：`{{ new Date(time?.src_update).toLocaleString("zh-Hans-CN") }}`[`{{ new Date(time?.src_update) }}`]  

<S set_time="AutoSyncLatest" />
