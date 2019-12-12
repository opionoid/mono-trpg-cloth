<template lang="pug">
#home
  #title-background
  .title
    p MONO
    p TRPG
    p CLOTH
  v-container
    v-row(justify="center")
      Card(
        v-for="trpg in trpgs"
        :key="trpg.path"
        :name="trpg.name"
        :path="trpg.path"
        :image="trpg.image"
      )
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Card from "@/components/Card.vue";

@Component({
  components: {
    Card
  }
})
export default class Home extends Vue {
  trpgs = [
    {
      name: "流刑地幻想譚",
      path: "/character",
      image: "@/assets/images/logo.png"
    }
  ];
}
</script>

<style lang="stylus" scoped>
#title-background
  color white
  background-color #221B2E
  height 110vh
  clip-path polygon(0 0, 0 100%, 100% 66%, 100% 8%, 95% 0)

.title
  position absolute
  top 0
  left 10px
  padding 26vh 0 0 0

.title > p
  color #837A81
  padding-top 7rem
  font-size 12rem
</style>
