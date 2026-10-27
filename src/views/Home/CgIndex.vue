<template>
  <div class="cg-home">你好，{{ nickname }}</div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useUserStore } from '@/store/modules/user'

defineOptions({ name: 'CgIndex' })

const userStore = useUserStore()
const nickname = computed(() => userStore.getUser?.nickname || '')
</script>

<style lang="scss" scoped>
.cg-home {
  padding: 16px;
  font-size: 20px;
}
</style>
