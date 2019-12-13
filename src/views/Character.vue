<template lang="pug">
  v-container
    v-form(ref="form")
      //- general info
      v-row(justify="center")
        v-col(cols="12" md="5")
          v-text-field(v-model="name" label="名前" required color='#DCC09B')
        v-col(cols="4" md="2")
          v-text-field(v-model="sex" label="性別" color='#DCC09B')
        v-col(cols="4" md="2")
          v-text-field(v-model="age" label="年齢" color='#DCC09B')
        v-col(cols="4" md="3")
          .level {{ level }}
      //- status
      v-row(justify="center")
        v-col.py-1(cols="3")
          v-text-field(v-model.number="vit" type="number" label="体力" color='#DCC09B')
        v-col.py-1(cols="3")
          v-text-field(v-model.number="str" type="number" label="筋力" color='#DCC09B')
        v-col.py-1(cols="3")
          v-text-field(v-model.number="pow" type="number" label="魔力" color='#DCC09B')
        v-col.py-1(cols="3")
          v-text-field(v-model.number="dex" type="number" label="技量" color='#DCC09B')
      v-row(justify="center")
        v-col.py-1(cols="3")
          v-text-field(v-model="physicalAbility" readonly outlined dense label="物理" color='#DCC09B')
        v-col.py-1(cols="3")
          v-text-field(v-model="magicAbility" readonly outlined dense label="魔法" color='#DCC09B')
        v-col.py-1(cols="3")
          v-text-field(v-model="deft" readonly outlined dense label="技巧" color='#DCC09B')
        v-col.py-1(cols="3")
          v-text-field(v-model="parryingRate" readonly outlined dense label="受流" color='#DCC09B')
      v-row(justify="center")
        v-col.pt-0(cols="3")
          v-text-field(v-model="mainPotency" readonly outlined dense label="威力 - メイン" color='#DCC09B')
        v-col.pt-0(cols="3")
          v-text-field(v-model="mainCriticalRate" readonly outlined dense label="会心 - メイン" color='#DCC09B')
        v-col.pt-0(cols="3")
          v-text-field(v-model="subPotency" readonly outlined dense label="威力 - サブ" color='#DCC09B')
        v-col.pt-0(cols="3")
          v-text-field(v-model="subCriticalRate" readonly outlined dense label="会心 - サブ" color='#DCC09B')
      //- equipment
      v-content
        //- main weapon
        v-row(justify="center")
          v-col(cols="12" sm="6")
            v-select(
              v-model="currentWeaponId"
              :items="weapons"
              item-text="name"
              item-value="id"
              label="メイン装備"
              :hint="`威力${weapons[currentWeaponId].basePotency}, 物理${weapons[currentWeaponId].physicalRatio * 100}, 魔法${weapons[currentWeaponId].magicRatio * 100}, 技巧${weapons[currentWeaponId].deftRatio * 100}`"
              persistent-hint
              color='#DCC09B'
              item-color='#DCC09B'
            )
          v-col(cols="12" sm="6")
            v-select(
              v-model="currentWeaponStoneId"
              :items="weaponStones"
              item-text="name"
              item-value="id"
              label="変質石"
              :hint="`${weaponStones[currentWeaponStoneId].description}`"
              persistent-hint
              color='#DCC09B'
              item-color='#DCC09B'
            )
        //- sub weapon
        v-row(justify="center")
          v-col(cols="12" sm="6")
            v-select(
              v-model="currentSubWeaponId"
              :items="weapons"
              item-text="name"
              item-value="id"
              label="サブ装備"
              :hint="`威力${weapons[currentSubWeaponId].basePotency}, 物理${weapons[currentSubWeaponId].physicalRatio * 100}, 魔法${weapons[currentSubWeaponId].magicRatio * 100}, 技巧${weapons[currentSubWeaponId].deftRatio * 100}`"
              persistent-hint
              color='#DCC09B'
              item-color='#DCC09B'
            )
          v-col(cols="12" sm="6")
            v-select(
              v-model="currentSubWeaponStoneId"
              :items="weaponStones"
              item-text="name"
              item-value="id"
              label="変質石"
              :hint="`${weaponStones[currentSubWeaponStoneId].description}`"
              persistent-hint
              color='#DCC09B'
              item-color='#DCC09B'
            )
        //- ring
        v-row(justify="center")
          v-col(cols="12" sm="6")
            v-select(
              v-model="currentRingId"
              :items="rings"
              item-text="name"
              item-value="id"
              label="指輪"
              :hint="`${rings[currentRingId].description}`"
              persistent-hint
              color='#DCC09B'
              item-color='#DCC09B'
            )
          v-col(cols="12" sm="6")
            v-select(
              v-model="currentRingSignId"
              :items="ringSigns"
              item-text="name"
              item-value="id"
              label="刻印"
              :hint="`${ringSigns[currentRingSignId].description}`"
              persistent-hint
              color='#DCC09B'
              item-color='#DCC09B'
            )
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
  currentHP: number = this.HP;
  currentMP: number = this.MP;

  /**
   * Equipment
   */
  /**
   * 1. Weapon
   *   computed で取得されるサブステータスから物理／魔法に分離していない攻撃力を出力．
   *   スキル威力は攻撃力を元に計算され，スキル自体が物理／魔法の属性を持つ．
   *   これにより「物理と魔法に補正され，物理スキルを放つ武器」が実装可能．
   */
  weapons = [
    {
      id: "",
      name: "",
      description: "",
      basePotency: 0,
      physicalRatio: 0, // 物理攻撃の，威力への反映率
      magicRatio: 0, // 魔法攻撃の，威力への反映率
      deftRatio: 0, // 技巧の，クリティカル率に対する 反映率
      /**
       * skills[] としなかったのは this.$set 等を用いずに
       * このデータをリアクティブに扱いたかったため．
       * また，スキル数が必ず 2 しかないため．
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
      }
    }
  ];
  /**
   * 2. weaponStone
   */
  weaponStones = [
    {
      id: 0,
      name: "",
      description: "",
      potencyRatio: 1,
      physicalRatio: 1,
      magicRatio: 1,
      deftRatio: 1,
      physicalRate: 0,
      magicRate: 0,
      deftRate: 0,
      skill1Ratio: 1,
      skill2Ratio: 1,
      skill1ChangedTarget: "",
      skill2ChangedTarget: ""
    }
  ];
  /**
   * 3. 指輪
   */
  rings = [
    {
      id: 0,
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
   * 4. 指輪の刻印
   */
  ringSigns = [
    {
      id: 0,
      name: "",
      description: ""
    }
  ];

  /**
   * 現在の装備を示す id
   */
  currentWeaponId: number = 0;
  currentWeaponStoneId: number = 0;
  currentSubWeaponId: number = 0;
  currentSubWeaponStoneId: number = 0;
  currentRingId: number = 0;
  currentRingSignId: number = 0;

  get level(): number {
    const level = this.vit + this.str + this.dex + this.pow;
    return level;
  }
  get HP(): number {
    let tmpHP = this.growthCurve(this.vit, 50, 30, 18, 10, 6, 3);
    tmpHP = this.growthCurve(this.str, 4.5, 1.8, 0.9, 0.9, 0.9, 1, tmpHP);
    return tmpHP;
  }
  get MP(): number {
    return this.growthCurve(this.pow, 0.5, 0.3, 0.1, 0.1, 0.05, 0.09);
  }
  get physicalAbility(): number {
    return this.growthCurve(this.str, 11, 8, 5, 2, 0.5, 0.91);
  }
  get magicAbility(): number {
    return this.growthCurve(this.pow, 2, 20, 11, 2, 0.5, 0.91);
  }
  get deft(): number {
    return this.growthCurve(this.dex, 6, 15, 8, 2, 0.5, 0.91);
  }
  get parryingRate(): number {
    return this.growthCurve(this.dex, 1.2, 0.4, 0.1, 0.1, 0.1, 0.112);
  }
  get mainPotency(): number {
    return this.calculatePotency(
      this.currentWeaponId,
      this.currentWeaponStoneId
    );
  }
  get mainCriticalRate(): number {
    return this.calculateCriticalRate(
      this.currentWeaponId,
      this.currentWeaponStoneId
    );
  }
  get subPotency(): number {
    return this.calculatePotency(
      this.currentSubWeaponId,
      this.currentSubWeaponStoneId
    );
  }
  get subCriticalRate(): number {
    return this.calculateCriticalRate(
      this.currentSubWeaponId,
      this.currentSubWeaponStoneId
    );
  }

  /** レベル帯に成長する値を入力すれば最終的なステータスが返されます */
  growthCurve(
    mainStatus: number,
    growthUnder20: number,
    growthUnder30: number,
    growthUnder40: number,
    growthUnder50: number,
    growthUnder90: number,
    growthUnder99: number,
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
      } else if (i < 85) {
        subStatus += growthUnder90;
      } else if (i < 99) {
        subStatus += growthUnder99;
      }
    }
    return Math.floor(subStatus);
  }
  /** 武器idと変質石idから，現在のステータスにおける威力を算出します */
  calculatePotency(weaponId: number, weaponStoneId: number): number {
    return Math.floor(
      /** 基礎攻撃力 */
      (this.weapons[weaponId].basePotency +
        /** 物理補正 */
        (this.weapons[weaponId].physicalRatio *
          this.weaponStones[weaponStoneId].physicalRatio +
          this.weaponStones[weaponStoneId].physicalRate) *
          this.physicalAbility +
        /** 魔法補正 */
        (this.weapons[weaponId].magicRatio *
          this.weaponStones[weaponStoneId].magicRatio +
          this.weaponStones[weaponStoneId].magicRate) *
          this.magicAbility) *
        /** 威力補正 */
        this.weaponStones[weaponStoneId].potencyRatio
    );
  }
  /** 武器idと変質石idから，現在のステータスにおける会心率を算出します */
  calculateCriticalRate(weaponId: number, weaponStoneId: number): number {
    return Math.floor(
      /** 技量補正 */
      (this.weapons[weaponId].deftRatio *
        this.weaponStones[weaponStoneId].deftRatio +
        this.weaponStones[weaponStoneId].deftRate) *
        this.deft *
        0.24
    );
  }

  mounted() {
    /**
     * Firestore から 装備品データを読み込む
     * 本当は for 文とかでスマートに取得したかった．
     */
    db.collection("weapons")
      .get()
      .then(querySnapshot => {
        let tmp: Array<any> = [];
        querySnapshot.forEach(doc => {
          tmp.push(doc.data());
        });
        this.weapons = tmp;
      });
    db.collection("weaponStones")
      .get()
      .then(querySnapshot => {
        let tmp: Array<any> = [];
        querySnapshot.forEach(doc => {
          tmp.push(doc.data());
        });
        this.weaponStones = tmp;
      });
    db.collection("rings")
      .get()
      .then(querySnapshot => {
        let tmp: Array<any> = [];
        querySnapshot.forEach(doc => {
          tmp.push(doc.data());
        });
        this.rings = tmp;
      });
    db.collection("ringSigns")
      .get()
      .then(querySnapshot => {
        let tmp: Array<any> = [];
        querySnapshot.forEach(doc => {
          tmp.push(doc.data());
        });
        this.ringSigns = tmp;
      });
  }
}
</script>
