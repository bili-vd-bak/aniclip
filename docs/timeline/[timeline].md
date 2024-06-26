<script setup>
import S from "./s.vue"
import { useData } from 'vitepress'
const { params } = useData()
</script>

<S :set_time=params.timeline />
