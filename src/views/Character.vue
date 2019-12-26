<template lang="pug">
  v-container#character
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
          v-text-field(v-model.number="vit" type="number" :rules="statusRules" label="体力" color='#DCC09B')
        v-col.py-1(cols="3")
          v-text-field(v-model.number="str" type="number" :rules="statusRules" label="筋力" color='#DCC09B')
        v-col.py-1(cols="3")
          v-text-field(v-model.number="pow" type="number" :rules="statusRules" label="魔力" color='#DCC09B')
        v-col.py-1(cols="3")
          v-text-field(v-model.number="dex" type="number" :rules="statusRules" label="技量" color='#DCC09B')
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
      v-row(justify="center")
        v-col.pt-0(xs="6" md="3")
          v-text-field(v-model.number="currentHP" type="number" :rules="hpRules" label="HP" :hint="`MaxHP: ${HP || 0}`" persistent-hint color='#DCC09B')
        v-col.pt-0(xs="6" md="3")
          v-text-field(v-model.number="currentMP" type="number" :rules="mpRules" label="MP" :hint="`MaxMP: ${MP || 0}`" persistent-hint color='#DCC09B')
        v-col.pt-0(xs="12" md="6")
          v-text-field(v-model="note" label="メモ")
      //- skill icons
      v-row(justify="center")
        v-col(xs="4" md="2" @mouseover="currentSkill = weapons[currentWeaponId].skill1" @click="useSkill('main')")
          v-img(:src="weapons[currentWeaponId].skill1.icon")
        v-col(xs="4" md="2" @mouseover="currentSkill = weapons[currentWeaponId].skill2" @click="useSkill('main')")
          v-img(:src="weapons[currentWeaponId].skill2.icon")
        v-col(xs="4" md="2" @mouseover="currentSkill = weapons[currentSubWeaponId].skill1" @click="useSkill('sub')")
          v-img(:src="weapons[currentSubWeaponId].skill1.icon")
        v-col(xs="4" md="2" @mouseover="currentSkill = weapons[currentSubWeaponId].skill2" @click="useSkill('sub')")
          v-img(:src="weapons[currentSubWeaponId].skill2.icon")
        v-col(xs="4" md="2" @mouseover="currentSkill = rings[currentRingId].skill" @click="useSkill('main', rings[currentRingId].skill)")
          v-img(:src="rings[currentRingId].skill.icon")
      //- current skill description
      #current-skill(v-show="currentSkill")
        v-row {{ currentSkill.name }}
        v-row(justify="center" v-show="!currentSkill.isPassive")
          v-col(cols="2") 威力 {{ currentSkill.potencyRatio * 100 }}
          v-col(cols="2") 射程 {{ currentSkill.range }}
          v-col(cols="2") 消費 {{ currentSkill.mpCost }}
          v-col(cols="2") 属性 {{ currentSkill.element }}
          v-col(cols="2") 対象 {{ currentSkill.target }}
        v-row {{ currentSkill.description }}
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
import * as calculate from "@/assets/js/calculate";
import * as discord from "@/assets/js/discord";
import * as initEquipmentData from "@/assets/js/initEquipmentData";

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
   * Note
   */
  note: string = "";

  /**
   * Validation
   */
  statusRules = [
    v => v <= 99 || "最大値は 99 です",
    v => v >= 5 || "最低値は 5 です"
  ];
  hpRules = [
    v => v <= this.HP || "最大HPを超過しています",
    v => v >= 0 || "HPは0以上でなければなりません"
  ];
  mpRules = [
    v => v <= this.MP || "最大MPを超過しています",
    v => v >= 0 || "MPは0以上でなければなりません"
  ];

  /**
   * current skill
   */
  currentSkill = {
    name: "",
    description: "",
    isPassive: false,
    element: "",
    potencyRatio: 0,
    range: 0,
    mpCost: 0,
    target: ""
  };

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
      id: 0,
      name: "流刑人の鉈",
      description: "",
      basePotency: 300,
      physicalRatio: 0.5, // 物理攻撃の，威力への反映率
      magicRatio: 0, // 魔法攻撃の，威力への反映率
      deftRatio: 0.1, // 技巧の，クリティカル率に対する 反映率
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
      name: "異人",
      description: "威力+10%，攻撃スキルを範囲化",
      potencyRatio: 1,
      physicalRatio: 1.1,
      magicRatio: 1,
      deftRatio: 1,
      physicalRate: 0,
      magicRate: 0,
      deftRate: 0,
      skill1Ratio: 1,
      skill2Ratio: 1,
      skill1ChangedTarget: "範囲",
      skill2ChangedTarget: "範囲"
    }
  ];
  /**
   * 3. 指輪
   */
  rings = [
    {
      id: 0,
      name: "望郷の指輪",
      description:
        "誰かの思い出の品．永遠の愛が刻まれた指輪の持ち主は，思い出せぬ過去を捨て去るようにこれを外したのだろう．",
      skill: {
        name: "永遠の輪",
        description: "自身のHPを1ターン前に戻す．",
        isPassive: false,
        element: "無",
        potencyRatio: 0,
        range: 0,
        mpCost: 4,
        target: "自身"
      }
    }
  ];
  /**
   * 4. 指輪の刻印
   */
  ringSigns = [
    {
      id: 0,
      name: "久遠",
      description: "MPを支払えない時，MP1/HP100 の割合で代替してもよい．"
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
    let tmpHP = calculate.growthCurve(this.vit, 50, 30, 18, 10, 6, 3);
    tmpHP = calculate.growthCurve(this.str, 4.5, 1.8, 0.9, 0.9, 0.9, 1, tmpHP);
    return tmpHP;
  }
  get MP(): number {
    return calculate.growthCurve(this.pow, 0.5, 0.3, 0.1, 0.1, 0.05, 0.09);
  }
  get physicalAbility(): number {
    return calculate.growthCurve(this.str, 11, 8, 5, 2, 0.5, 0.91);
  }
  get magicAbility(): number {
    return calculate.growthCurve(this.pow, 2, 20, 11, 2, 0.5, 0.91);
  }
  get deft(): number {
    return calculate.growthCurve(this.dex, 6, 15, 8, 2, 0.5, 0.91);
  }
  get parryingRate(): number {
    return calculate.growthCurve(this.dex, 1.2, 0.4, 0.1, 0.1, 0.1, 0.112);
  }
  get mainPotency(): number {
    return calculate.calculatePotency(
      this.weapons[this.currentWeaponId],
      this.weaponStones[this.currentWeaponStoneId],
      this.physicalAbility,
      this.magicAbility
    );
  }
  get mainCriticalRate(): number {
    return calculate.calculateCriticalRate(
      this.weapons[this.currentWeaponId],
      this.weaponStones[this.currentWeaponStoneId],
      this.deft
    );
  }
  get subPotency(): number {
    return calculate.calculatePotency(
      this.weapons[this.currentSubWeaponId],
      this.weaponStones[this.currentSubWeaponStoneId],
      this.physicalAbility,
      this.magicAbility
    );
  }
  get subCriticalRate(): number {
    return calculate.calculateCriticalRate(
      this.weapons[this.currentSubWeaponId],
      this.weaponStones[this.currentSubWeaponStoneId],
      this.deft
    );
  }

  useSkill(mainORsub: string) {
    const potency: number =
      mainORsub === "main" ? this.mainPotency : this.subPotency;
    const criticalRate: number =
      mainORsub === "main" ? this.mainCriticalRate : this.subCriticalRate;
    const isCritical: boolean = calculate.distinguishCritical(criticalRate);
    const damage = calculate.calculateSkillDamage(
      this.currentSkill,
      potency,
      isCritical
    );

    discord.sendAttackMessage(this.currentSkill, isCritical, damage);
  }

  mounted() {
    initEquipmentData.initWeaponsData(this.weapons);
    initEquipmentData.initWeaponStonesData(this.weaponStones);
    initEquipmentData.initRingsData(this.rings);
    initEquipmentData.initRingSignsData(this.ringSigns);
  }
}
</script>

<style lang="stylus" scoped>
#character
  padding-bottom 14vh
</style>
