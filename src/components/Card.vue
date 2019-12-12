<template lang="pug">
  .card(@mouseover="filtered" @mouseleave="unfiltered")
</template>

<script lang="js">
/** tslint:disbale */
/** バージョン関連の厄介なエラーにハマったのでjsに戻しています */
import * as PIXI from "pixi.js";
import { TweenMax } from 'gsap'

export default {
  name: "Card",

  data() {
    return {
      app: null,
      renderer: null,
      container: null,
      thumbnail: null,
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
      width: 262,
      height: 162,
      backgroundCOlor:0xfefefe,
      resolution: window.devicePixelRatio || 1
    });
    this.$el.appendChild(this.app.view)
    //this.app.renderer.view.style.display = "block";
    this.app.renderer.autoResize = true;

    this.renderer = new PIXI.Renderer()
    this.container = new PIXI.Container()
    this.app.stage.addChild(this.container)

    const thumbnailTexture = PIXI.Texture.from("https://picsum.photos/262/162")
    this.thumbnail = new PIXI.Sprite(thumbnailTexture)

    const filterTexture = PIXI.Texture.from("https://picsum.photos/id/11/262/162")
    this.filter = new PIXI.filters.DisplacementFilter(new PIXI.Sprite(filterTexture))
    this.filter.scale.x = 0
    this.filter.scale.y = 0
    this.thumbnail.filters = [this.filter]

    this.container.addChild(this.thumbnail)
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
