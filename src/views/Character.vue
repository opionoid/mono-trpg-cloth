<template lang="pug">
  v-container
    v-form(ref="form")
      //- general info
      v-row(justify="center")
        v-col(cols="12" md="5")
          v-text-field(v-model="name" label="名前" required)
        v-col(cols="4" md="2")
          v-text-field(v-model="sex" label="性別")
        v-col(cols="4" md="2")
          v-text-field(v-model="age" label="年齢")
        v-col(cols="4" md="3")
          .level {{ level }}
      //- status
      v-row(justify="center")
        v-col(cols="12" md="5")
          v-select(:vit="")
        v-col(cols="12" md="7")
          v-row(justify="center")
            v-col(cols="12" sm="6")
            v-col(cols="12" sm="6")
      //- equipment
      v-row(justify="center")
        v-row(justify="center")
          v-col(cols="12" md="8")
            v-select(
              v-model="weapon"
            )
          v-col(cols="12" md="4")
        v-row(justify="center")
          v-col(cols="12" md="8")
          v-col(cols="12" md="4")
        v-row(justify="center")
          v-col(cols="12" md="8")
          v-col(cols="12" md="4")
      //- battle skill
      v-row(justify="center")
      //- field skill
      v-row(justify="center")
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class Character extends Vue {
  /**
   * General Info
   */
  name: string = ''
  sex: string = ''
  age: number = 20

  /**
   * Status
   */
  vit: number = 5
  str: number = 5
  pow: number = 5
  dex: number = 5

  /**
   * Equipment
   */
  /**
   * 1. Weapon
   *   computed で取得されるサブステータスから物理／魔法に分離していない攻撃力を出力．
   *   スキル威力は攻撃力を元に計算され，スキル自体が物理／魔法の属性を持つ．
   *   これにより「物理と魔法に補正され，物理スキルを放つ武器」が実装可能．
   */
  weapon = {
    id: 0,
    name: '',
    description: '',
    basePotency: 0,
    physicalRatio: 0, // 物理攻撃の，威力への反映率
    magicalRatio: 0, // 魔法攻撃の，威力への反映率
    deftRatio: 0, // 技巧の，クリティカル率に対する 反映率
    /** 
     * skills[] としなかったのは this.$set 等を用いずに
     * このデータをリアクティブに扱いたかったため．
     * また，スキル数が必ず 3 しかないため．
     */
    skill1: {
      name: '',
      isPassive: false,
      element: '',
      potencyRatio: 0,
      range: 0,
      mpCost: 0,
      target: '',
      description: ''
    },
    skill2: {
      name: '',
      isPassive: false,
      element: '',
      potencyRatio: 0,
      range: 0,
      mpCost: 0,
      target: '',
      description: ''
    },
    skill3: {
      name: '',
      isPassive: false,
      element: '',
      potencyRatio: 0,
      range: 0,
      mpCost: 0,
      target: '',
      description: ''
    }
  }
  weaponStone = {
    id: 0,
    name: '',
    description: '',
    potencyRatio: 0,
    skill1Ratio: 0,
    skill2Ratio: 0,
    skill3Ratio: 0,
    criticalRate: 0
  }
  lantern = {
    id: 0,
    name: '',
    description: '',
    skill: {
      name: '',
      mpCost: 0,
      description: ''
    }
  }
  ring = {
    id: 0,
    name: '',
    description: '',
    skill: {
      name: '',
      description: '',
      isPassive: false,
      element: '',
      potencyRatio: 0,
      range: 0,
      mpCost: 0,
      target: ''
    }
  }

  get level (): number {
    const level = this.vit + this.str + this.dex + this.pow
    return level
  }

  get HP (): number {
    let tmpHP = this.growthCurve(this.vit, 10, 6, 3, 1)
    tmpHP = this.growthCurve(this.str, 2, 2, 1, 1, tmpHP)
    return tmpHP
  }
  get MP (): number {
    return Math.floor(this.growthCurve(this.pow, 0.5, 0.3, 0.1, 0.1))
  }
  get physicAttack (): number {
    return this.growthCurve(this.str, 10, 6, 3, 1)
  }
  get magicAttack (): number {
    return this.growthCurve(this.pow, 8, 9, 4, 1)
  }
  get deft (): number {
    return this.growthCurve(this.dex, 13, 11, 9, 2)
  }
  get parryingRate (): number {
    return this.growthCurve(this.dex, 0.8, 0.6, 0.2, 0.1)
  }
  get potency (): number {
    return (
      this.weapon.basePotency + 
      this.weapon.physicalRatio * this.physicAttack +
      this.weapon.magicalRatio * this.magicAttack
      ) * this.weaponStone.potencyRatio
  }
  get criticalRate (): number {
    return (
      this.weapon.deftRatio * this.deft +
      this.weaponStone.criticalRate
    )
  }

  growthCurve(
    mainStatus: number,
    growthUnder20: number,
    growthUnder30: number,
    growthUnder40: number,
    growthUnder50: number,
    subStatus?: number,
  ): number {
    subStatus ? subStatus : subStatus = 0
    for (let i = 0; i < this.vit; i++) {
      if (i < 20) {
        subStatus += growthUnder20
      } else if (i < 30) {
        subStatus += growthUnder30
      } else if (i < 40) {
        subStatus += growthUnder40
      } else if (i < 50) {
        subStatus += growthUnder50
      }
    }
    return subStatus
  }
}
</script>