<script>
export default {
  props: {
    nameEpreuve: {
      type: String,
      required: true
    }
  }
}
</script>

<template>
  <div class="shadow p-4 flex items-center justify-center h-20 bg-gray-100 rounded">
    {{ nameEpreuve }}
  </div>
</template>

<style scoped>
</style>
