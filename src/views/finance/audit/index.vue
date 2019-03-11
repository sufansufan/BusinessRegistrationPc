<template>
  <div>
    <refund-view :is-audit="true"/>
  </div>
</template>

<script>
import RefundView from '../../foreground/apply/components/RefundView'
export default {
  components: {
    RefundView
  }
}
</script>

<style scoped>
</style>
