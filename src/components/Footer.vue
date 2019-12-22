<template lang="pug">
  #footer
    v-row(justify="center")
      p.grey--text.pt-4 ©︎ Opion 2019
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class Footer extends Vue {}
</script>

<style lang="stylus" scoped>
#footer
  width 100%
  background-color #221B2E
</style>
