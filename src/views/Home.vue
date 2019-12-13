<template lang="pug">
#home
  #title-background
  .title(@click="$router.push('/character')")
    Title
  v-container#about
    v-row(justify="center")
      h2.display-3.pa-4 WHAT'S THIS ?
    v-row(justify="center")
      p.pa-4.grey--text MONO TRPG CLOTH は，あなたが考えたTRPGのシナリオや世界観の実現を手助けします．
    v-row(justify="center")
      v-col.px-4(xs="12" md="4")
        v-row(justify="center")
          i.material-icons.pa-4(data-delighter) description
        v-row(justify="center")
          h4.about-title.display-1.font-weight-light.mt-2(data-delighter) Data
          p.about-description.mt-1.pa-4.grey--text(data-delighter) 武器，スキル，アビリティなど，そのままでも始められるだけのデータが揃っています．もしあなたが素晴らしいシナリオを書いて，そこに戦闘がある場合，これを利用するのが最も手軽で（しかも癖がないので）扱いやすいはずです．
      v-col.px-4(xs="12" md="4")
        v-row(justify="center")
          i.material-icons.pa-4(data-delighter) flash_on
        v-row(justify="center")
          h4.about-title.display-1.font-weight-light.mt-2(data-delighter) Rapid
          p.about-description.mt-1.pa-4.grey--text(data-delighter) アプリ上でキャラを作成できるだけでなく，スキルを押すだけで Discord や Slack に判定結果が通知されます．もう 1D6 を入力する必要はありません．さらにログインすれば，作ったキャラクターデータは自動で保存されます．
      v-col.px-4(xs="12" md="4")
        v-row(justify="center")
          i.material-icons.pa-4(data-delighter) build
        v-row(justify="center")
          h4.about-title.display-1.font-weight-light.mt-2(data-delighter) Customize
          p.about-description.mt-1.pa-4.grey--text(data-delighter) あなたが武器を増やしたり，スキルを変更したいとき，チュートリアルに沿うだけで構いません．もしもっと作り変えたくて，しかもあなたがエンジニアなら，ソースコードを全て書き換えても構いません．
    v-row.my-4.pb-4(justify="center")
      .btn(data-delighter @click="$router.push('/character')")
        span.font-weight-light MAKE
  #customize
    v-row(justify="end")
      v-col(xs="12" sm="9" md="6" lg="5")
        .customize-title
          p(data-delighter) あなたが
          p(data-delighter) すべてを
          p(data-delighter) 創りあげる
    v-row(justify="center")
      v-col(cols="4")
        v-row(justify="center")
          .btn(data-delighter @click="$router.push('/customize')")
            span CUSTOM
      v-col(cols="4")
        v-row(justify="center")
          .btn(data-delighter @click="$router.push('https://github.com/KindledKindred/mono-trpg-cloth')")
            span GitHub
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Title from "@/components/Title.vue";

@Component({
  components: {
    Title
  }
})
export default class Home extends Vue {}
</script>

<style lang="stylus" scoped>
#title-background
  color grey
  background-image url("https://picsum.photos/id/1000/1920/1080")
  background liner-gradient(to top, rgba(217, 175, 217, 0.7))
  background-repeat no-repeat
  background-position center
  height 90vh

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
  margin-top 15vh
  color #DCC09B
  line-height 1.4rem

.material-icons
  font-size 120px

.material-icons.delighter
  transition all .3s ease
  transform rotate(180deg)
  font-size 4px

.material-icons.delighter.started
  transform rotate(30deg)
  font-size 140px

.material-icons.delighter.started.ended
  transform none
  font-size 120px

.about-title.delighter
  transition all .5s ease
  transform translateY(30%)
  opacity 0

.about-title.delighter.started
  transform none
  opacity 1

.about-description.delighter
  transition all .5s ease
  transform translateY(30%)
  opacity 0

.about-description.delighter.started
  transform none
  opacity 1

.btn > span
  font-size 1.8rem
  transition all .3s ease

.btn:hover > span
  font-size 1.3rem

.btn
  width 160px
  height 100px
  line-height 104px
  text-align center
  cursor pointer
  color #837A81
  transition: all 0.5s
  position relative

.btn::before
  content: ''
  position absolute
  top 0
  left 0
  width 100%
  height 100%
  z-index 1
  background-color rgba(105, 80, 155, 0.1)
  transition all 0.3s

.btn:hover::before
  opacity 0
  transform scale(0.5, 0.5)

.btn::after 
  content ''
  position absolute
  top 0
  left 0
  width 100%
  height 100%
  z-index 1
  opacity 0
  transition all 0.3s
  border 1px solid rgba(105, 80, 155, 0.8)
  transform scale(1.2, 1.2)

.btn:hover::after
  opacity 1
  transform scale(1, 1)

.btn.delighter
  transition all .5s ease
  transform translateY(30%)
  opacity 0

.btn.delighter.started
  transform none
  opacity 1

#customize
  margin-top 10vh
  color #eaebeb
  background-image url("https://picsum.photos/id/187/1920/1080")
  background liner-gradient(to top, rgba(217, 175, 217, 0.7))
  background-repeat no-repeat
  background-position center
  height 100vh

.customize-title
  margin 20vh 0 9vh 32px
  font-size 80px
  line-height 1.2em

.customize-title > p.delighter
  transition all .6s ease
  transform translateY(30%)
  opacity 0

.customize-title > p.delighter.started
  transform none
  opacity 1
</style>