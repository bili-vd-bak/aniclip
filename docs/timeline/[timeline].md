<script setup>
import { data as time } from "../time.data.ts"
import S from "./s.vue"
import { useData } from 'vitepress'
const { params } = useData()
</script>

最近更新时间：`{{ new Date(time?.src_update).toLocaleString("zh-Hans-CN") }}`[`{{ new Date(time?.src_update) }}`]  

<S :set_time=params.timeline />
