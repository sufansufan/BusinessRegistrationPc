<template>
  <div class="order-box">
    <order-group :type="1" :is-refund="true"/>
  </div>
</template>

<script>
import OrderGroup from './OrderGroup'
export default {
  components: {
    OrderGroup
  }
}
</script>
