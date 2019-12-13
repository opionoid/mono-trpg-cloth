<template lang="pug">
#home
  #title-background
  .title
    FakeTitle
  v-container#about
    v-row(justify="center")
      h2.display-3.pa-4 WHAT'S THIS?
    v-row(justify="center")
      p.pa-4.grey--text MONO TRPG CLOTH は，あなたが考えたTRPGのシナリオや世界観の実現を手助けします．
    v-row(justify="center")
      v-col.px-4(xs="12" sm="4")
        v-row(justify="center")
          i.material-icons.pa-4(data-delighter) description
        v-row(justify="center")
          h4.display-1.font-weight-light.mt-2 Data
          p.pa-4.grey--text 武器，スキル，アビリティなど，そのままでも始められるだけのデータが揃っています．もしあなたが素晴らしいシナリオを書いて，そこに戦闘がある場合，これを利用するのが最も手軽で（しかも癖がないので）扱いやすいはずです．
      v-col.px-4(xs="12" sm="4")
        v-row(justify="center")
          i.material-icons.pa-4(data-delighter) flash_on
        v-row(justify="center")
          h4.display-1.font-weight-light.mt-2 Rapid
          p.pa-4.grey--text アプリ上でキャラを作成できるだけでなく，スキルを押すだけで Discord や Slack に判定結果が通知されます．もう 1D6 を入力する必要はありません．さらにログインすれば，作ったキャラクターデータは自動で保存されます．
      v-col.px-4(xs="12" sm="4")
        v-row(justify="center")
          i.material-icons.pa-4(data-delighter) build
        v-row(justify="center")
          h4.display-1.font-weight-light.mt-2 Customize
          p.pa-4.grey--text あなたが武器を増やしたり，スキルを変更したいとき，下記のチュートリアルに沿うだけで構いません．もしもっと作り変えたくて，しかもあなたがエンジニアなら，ソースコードを全て書き換えても構いません．
  #footer
    p 未作成
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import FakeTitle from "@/components/FakeTitle.vue";

@Component({
  components: {
    FakeTitle
  }
})
export default class Home extends Vue {}
</script>

<style lang="stylus" scoped>
#title-background
  color white
  background-image url("https://picsum.photos/id/1000/1920/1080")
  background liner-gradient(to top, rgba(217, 175, 217, 0.7))
  background-repeat no-repeat
  background-position center
  height 1080px

.title
  position absolute
  top 0
  left 40px
  padding 26vh 0 0 0

.title > p
  color #837A81
  padding 3.5rem 0
  font-size 12rem

#about
  margin-top 10vh
  color #DCC09B
  line-height 1.4rem

.material-icons
  font-size 120px

.material-icons.delighter
  transition all .3s ease
  transform rotate(180deg)
  font-size 4px

.material-icons.delighter.started
  transform rotate(10deg)
  font-size 140px

.material-icons.delighter.started.ended
  transform none
  font-size 120px
</style>
