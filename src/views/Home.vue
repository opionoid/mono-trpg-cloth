<template lang="pug">
  v-container
    v-row(justify="center")
      #mono
    v-row(justify="center")
      #trpg
    v-row(justify="center")
      #cloth
    v-row(justify="center")
      v-btn(to="/character" outlined x-large) 流刑地幻想譚
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { TextAnimation } from "@/assets/animation/text";

@Component
export default class Home extends Vue {
  textAnimation = new TextAnimation();
  mounted() {
    this.textAnimation.init("mono", "mono");
    this.textAnimation.init("trpg", "TRPG");
    this.textAnimation.init("cloth", "cloth");
  }
}
</script>
