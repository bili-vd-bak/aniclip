<script setup>
import S from "./s.vue"
import { useData } from 'vitepress'
const { params } = useData()
// console.log(params.value)
</script>

<S :set_time=params.timeline />
