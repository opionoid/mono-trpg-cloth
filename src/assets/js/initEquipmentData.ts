import db from "@/plugins/firebase";

export function initWeaponsData(weapons) {
  db.collection("weapons")
    .get()
    .then(querySnapshot => {
      querySnapshot.forEach(doc => {
        weapons.push(doc.data());
      });
      /**
       * 未指定の項目にデフォルト値を適用．並びは firestore に準拠
       * 最低限の構成
       *  - id
       *  - skill1 (中身は空でも構いません)
       *  - skill2 (中身は空でも構いません)
       */
      weapons.map(weapon => {
        // !weapon.XXX だと値が0のときも含まれてしまいます
        // === null だと undefined を漏らしてしまいます
        if (weapon.basePotency == null) weapon.basePotency = 0;
        if (weapon.deftRatio == null) weapon.deftRatio = 0;
        if (weapon.description == null) weapon.description = "";
        if (weapon.magicRatio == null) weapon.magicRatio = 0;
        if (weapon.name == null) weapon.name = `仮武器${weapon.id}`;
        if (weapon.physicalRatio == null) weapon.physicalRatio = 0;
        if (weapon.skill1.description == null) weapon.skill1.description = "";
        if (weapon.skill1.element == null) weapon.skill1.element = "無";
        if (weapon.skill1.icon == null) weapon.skill1.icon = "none";
        if (weapon.skill1.isPassive == null) weapon.skill1.isPassive = false;
        if (weapon.skill1.mpCost == null) weapon.skill1.mpCost = 0;
        if (weapon.skill1.name == null) weapon.skill1.name = "仮スキル1";
        if (weapon.skill1.potencyRatio == null) weapon.skill1.potencyRatio = 0;
        if (weapon.skill1.range == null) weapon.skill1.range = 0;
        if (weapon.skill1.target == null) weapon.skill1.target = "自身";
        if (weapon.skill2.description == null) weapon.skill2.description = "";
        if (weapon.skill2.element == null) weapon.skill2.element = "無";
        if (weapon.skill2.icon == null) weapon.skill2.icon = "none";
        if (weapon.skill2.isPassive == null) weapon.skill2.isPassive = false;
        if (weapon.skill2.mpCost == null) weapon.skill2.mpCost = 0;
        if (weapon.skill2.name == null) weapon.skill2.name = "仮スキル2";
        if (weapon.skill2.potencyRatio == null) weapon.skill2.potencyRatio = 0;
        if (weapon.skill2.range == null) weapon.skill2.range = 0;
        if (weapon.skill2.target == null) weapon.skill2.target = "自身";
      });
    });
}

export function initWeaponStonesData(weaponStones) {
  db.collection("weaponStones")
    .get()
    .then(querySnapshot => {
      querySnapshot.forEach(doc => {
        weaponStones.push(doc.data());
      });
      weaponStones.map(weaponStone => {
        if (weaponStone.deftRate == null) weaponStone.deftRatio = 0;
        if (weaponStone.deftRatio == null) weaponStone.deftRatio = 1;
        if (weaponStone.description == null) weaponStone.description = "";
        if (weaponStone.magicRate == null) weaponStone.magicRate = 0;
        if (weaponStone.magicRatio == null) weaponStone.magicRatio = 1;
        if (weaponStone.name == null)
          weaponStone.name == `仮変質石${weaponStone.id}`;
        if (weaponStone.physicalRate == null) weaponStone.physicalRate = 0;
        if (weaponStone.physicalRatio == null) weaponStone.physicalRatio = 1;
        if (weaponStone.potencyRatio == null) weaponStone.potencyRatio = 1;
        if (weaponStone.skill1ChangedTarget == null)
          weaponStone.skill1ChangedTarget = "";
        if (weaponStone.skill1Ratio == null) weaponStone.skill1Ratio = 1;
        if (weaponStone.skill2ChangedTarget == null)
          weaponStone.skill2ChangedTarget = "";
        if (weaponStone.skill1Ratio == null) weaponStone.skill2Ratio = 1;
      });
    });
}

export function initRingsData(rings) {
  db.collection("rings")
    .get()
    .then(querySnapshot => {
      querySnapshot.forEach(doc => {
        rings.push(doc.data());
      });
      rings.map(ring => {
        if (ring.description == null) ring.description = "";
        if (ring.name == null) ring.name = `仮指輪${ring.id}`;
        if (ring.skill.description == null) ring.skill.description = "";
        if (ring.skill.element == null) ring.skill.element = "無";
        if (ring.skill2.icon == null) ring.skill.icon = "none";
        if (ring.skill.isPassive == null) ring.skill.isPassive = false;
        if (ring.skill.mpCost == null) ring.skill.mpCost = 4;
        if (ring.skill.name == null) ring.skill.name = `仮スキル`;
        if (ring.skill.potencyRatio == null) ring.skill.potencyRatio = 0;
        if (ring.skill.range == null) ring.skill.range = 0;
        if (ring.skill.target == null) ring.skill.target = "自身";
      });
    });
}

export function initRingSignsData(ringSigns) {
  db.collection("ringSigns")
    .get()
    .then(querySnapshot => {
      querySnapshot.forEach(doc => {
        ringSigns.push(doc.data());
      });
      ringSigns.map(ringSign => {
        if (ringSign.description == null) ringSign.description = "効果未設定";
        if (ringSign.name == null) ringSign.name = `仮刻印${ringSign.id}`;
      });
    });
}
