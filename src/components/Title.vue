<template lang="pug">
  .card(@mouseover="filtered" @mouseleave="unfiltered")
</template>

<script lang="js">
/** tslint:disbale */
/** バージョン関連の厄介なエラーにハマったのでjsに戻しています */
import * as PIXI from "pixi.js";
import { TweenMax } from 'gsap'

export default {
  name: "Title",

  data() {
    return {
      app: null,
      renderer: null,
      container: null,
      title: null,
      filter: null
    }
  },

  props: {
    'name': String,
    'path': String,
    'image': String
  },

  mounted() {
    this.app = new PIXI.Application({
      antialias: true,
      width: 612,
      height: 600,
      transparent: true,
      resolution: window.devicePixelRatio || 1,
      autoResize: true
    });
    this.$el.appendChild(this.app.view)

    this.renderer = new PIXI.Renderer()
    this.container = new PIXI.Container()
    this.app.stage.addChild(this.container)

    this.title = new PIXI.Text("\tMONO\n\tTRPG\n\tCLOTH", {
      //fontFamily: "ROBOTO",
      fontWeight: "bold",
      fontSize: 160,
      fill: 0x837A81
    })

    const filterTexture = PIXI.Texture.from("https://picsum.photos/id/404/812/600")
    this.filter = new PIXI.filters.DisplacementFilter(new PIXI.Sprite(filterTexture))
    this.filter.scale.x = 0
    this.filter.scale.y = 0
    this.title.filters = [this.filter]

    this.container.addChild(this.title)
  },
  methods: {
    filtered() {
      TweenMax.to(this.filter.scale, 0.6, {
        x: 131,
        y: 81
      })
    },
    unfiltered() {
      TweenMax.to(this.filter.scale, 0.6, {
        x: 0,
        y: 0
      })
    }
  }
}
</script>
