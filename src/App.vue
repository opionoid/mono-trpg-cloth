<template lang="pug">
  v-app
    router-view
    Footer
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Footer from "@/components/Footer.vue";

@Component({
  components: {
    Footer
  }
})
export default class App extends Vue {}
</script>
