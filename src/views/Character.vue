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
        v-col(cols="4")
          v-text-field(v-model.number="vit" type="number" label="体力")
          v-text-field(v-model.number="str" type="number" label="筋力")
          v-text-field(v-model.number="pow" type="number" label="魔力")
          v-text-field(v-model.number="dex" type="number" label="技量")
        v-col(cols="8")
          v-row(justify="center")
            v-col.py-1(cols="6")
              v-text-field(v-model="HP" readonly outlined dense label="HP")
            v-col.py-1(cols="6")
              v-text-field(v-model="MP" readonly outlined dense label="MP")
          v-row(justify="center")
            v-col.py-1(cols="6")
              v-text-field(v-model="physicalAttack" readonly outlined dense label="物理")
            v-col.py-1(cols="6")
              v-text-field(v-model="magicalAttack" readonly outlined dense label="魔法")
          v-row(justify="center")
            v-col.py-1(cols="6")
              v-text-field(v-model="deft" readonly outlined dense label="技巧")
            v-col.py-1(cols="6")
              v-text-field(v-model="parryingRate" readonly outlined dense label="受流")
          v-row(justify="center")
            v-col.py-1(cols="6")
              v-text-field(v-model="potency" readonly outlined dense label="威力")
            v-col.py-1(cols="6")
              v-text-field(v-model="criticalRate" readonly outlined dense label="会心")
      //- equipment
      v-row(justify="center")
        v-row(justify="center")
          v-col(cols="12" md="6")
            v-select(
              :v-model="currentWeaponId"
              :items="weapons"
              item-text="name"
              item-value="id"
              label="武器"
              :hint="`威力${weapons[currentWeaponId].basePotency}, 物理${weapons[currentWeaponId].physicalRatio}, 魔法${weapons[currentWeaponId].magicalRatio}, 技巧${weapons[currentWeaponId].deftRatio}`"
              persistent-hint
            )
          v-col(cols="6")
        v-row(justify="center")
          v-col(cols="6")
          v-col(cols="6")
        v-row(justify="center")
          v-col(cols="6")
          v-col(cols="6")
      //- battle skill
      v-row(justify="center")
      //- field skill
      v-row(justify="center")
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import db from "@/plugins/firebase";

@Component
export default class Character extends Vue {
  /**
   * Database
   */
  database: any;
  /**
   * General Info
   */
  name: string = "";
  sex: string = "";
  age: number = 20;

  /**
   * Status
   */
  vit: number = 5;
  str: number = 5;
  pow: number = 5;
  dex: number = 5;

  /**
   * Equipment
   */
  /**
   * 1. Weapon
   *   computed で取得されるサブステータスから物理／魔法に分離していない攻撃力を出力．
   *   スキル威力は攻撃力を元に計算され，スキル自体が物理／魔法の属性を持つ．
   *   これにより「物理と魔法に補正され，物理スキルを放つ武器」が実装可能．
   */
  currentWeaponId: number = 0;
  weapons = [
    {
      id: "",
      name: "",
      description: "",
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
        name: "",
        description: "",
        isPassive: false,
        element: "",
        potencyRatio: 0,
        range: 0,
        mpCost: 0,
        target: ""
      },
      skill2: {
        name: "",
        description: "",
        isPassive: false,
        element: "",
        potencyRatio: 0,
        range: 0,
        mpCost: 0,
        target: ""
      },
      skill3: {
        name: "",
        description: "",
        isPassive: false,
        element: "",
        potencyRatio: 0,
        range: 0,
        mpCost: 0,
        target: ""
      }
    }
  ];
  /**
   * 紅結晶
   */
  currentWeaponStoneId: number = 0;
  weaponStones = [
    {
      id: "",
      name: "",
      description: "",
      potencyRatio: 1,
      skill1Ratio: 1,
      skill2Ratio: 1,
      skill3Ratio: 1,
      criticalRate: 0
    }
  ];
  /**
   * ランタン
   */
  currentLanternId: number = 0;
  lanterns = [
    {
      id: "",
      name: "",
      description: "",
      skill: {
        name: "",
        mpCost: 0,
        description: ""
      }
    }
  ];
  /**
   * 灰結晶
   */
  /**
   * 指輪
   */
  rings = [
    {
      id: "",
      name: "",
      description: "",
      skill: {
        name: "",
        description: "",
        isPassive: false,
        element: "",
        potencyRatio: 0,
        range: 0,
        mpCost: 0,
        target: ""
      }
    }
  ];
  /**
   * 蒼結晶
   */

  get level(): number {
    const level = this.vit + this.str + this.dex + this.pow;
    return level;
  }

  get HP(): number {
    let tmpHP = this.growthCurve(this.vit, 10, 6, 3, 1);
    tmpHP = this.growthCurve(this.str, 2, 2, 1, 1, tmpHP);
    return tmpHP;
  }
  get MP(): number {
    return Math.floor(this.growthCurve(this.pow, 0.5, 0.3, 0.1, 0.1));
  }
  get physicalAttack(): number {
    return this.growthCurve(this.str, 10, 6, 3, 1);
  }
  get magicalAttack(): number {
    return this.growthCurve(this.pow, 8, 9, 4, 1);
  }
  get deft(): number {
    return this.growthCurve(this.dex, 10, 6, 3, 1);
  }
  get parryingRate(): number {
    return Math.floor(this.growthCurve(this.dex, 0.8, 0.6, 0.2, 0.1));
  }
  get potency(): number {
    return (
      (this.weapons[this.currentWeaponId].basePotency +
        this.weapons[this.currentWeaponId].physicalRatio * this.physicalAttack +
        this.weapons[this.currentWeaponId].magicalRatio * this.magicalAttack) *
      this.weaponStones[this.currentWeaponStoneId].potencyRatio
    );
  }
  get criticalRate(): number {
    return (
      this.weapons[this.currentWeaponId].deftRatio * this.deft * 0.16 +
      this.weaponStones[this.currentWeaponStoneId].criticalRate
    );
  }

  growthCurve(
    mainStatus: number,
    growthUnder20: number,
    growthUnder30: number,
    growthUnder40: number,
    growthUnder50: number,
    subStatus?: number
  ): number {
    subStatus ? subStatus : (subStatus = 0);
    for (let i = 0; i < mainStatus; i++) {
      if (i < 20) {
        subStatus += growthUnder20;
      } else if (i < 30) {
        subStatus += growthUnder30;
      } else if (i < 40) {
        subStatus += growthUnder40;
      } else if (i < 50) {
        subStatus += growthUnder50;
      }
    }
    return subStatus;
  }

  mounted() {
    db.collection("weapons")
      .get()
      .then((querySnapshot) => {
        let tmpWeapons: any = []
        querySnapshot.forEach((doc) => {
          tmpWeapons.push(doc.data())
        });
        this.weapons = tmpWeapons
      });
  }
}
</script>
