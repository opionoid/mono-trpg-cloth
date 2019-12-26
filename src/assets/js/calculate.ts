/** レベル帯ごとの成長量から最終的なステータスを返します */
export function growthCurve(
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

/** 現在のステータスにおける威力を算出します */
export function calculatePotency(
  weapon,
  weaponStone,
  physicalAbility: number,
  magicAbility: number
): number {
  return Math.floor(
    /** 基礎攻撃力 */
    (weapon.basePotency +
      /** 物理補正 */
      (weapon.physicalRatio * weaponStone.physicalRatio +
        weaponStone.physicalRate) *
        physicalAbility +
      /** 魔法補正 */
      (weapon.magicRatio * weaponStone.magicRatio + weaponStone.magicRate) *
        magicAbility) *
      /** 威力補正 */
      weaponStone.potencyRatio
  );
}

/** 現在のステータスにおける会心率を算出します */
export function calculateCriticalRate(
  weapon,
  weaponStone,
  deft: number
): number {
  return Math.floor(
    /** 技量補正 */
    (weapon.deftRatio * weaponStone.deftRatio + weaponStone.deftRate) *
      deft *
      0.24
  );
}

/** スキルがクリティカルしたかどうか判定します */
export function distinguishCritical(criticalRate: number): boolean {
  return Math.floor(Math.random() * 100 + 1) <= criticalRate ? true : false;
}

/** スキル使用時のダメージを算出します */
export function calculateSkillDamage(
  skill,
  potency: number,
  isCritical: boolean
): number {
  if (skill.isPassive) return 0;
  const CRITICAL_RATIO = 2
  const baseDamage = Math.floor(potency * skill.potencyRatio / 10) * 10;

  let damage = baseDamage
  if (isCritical) damage *= CRITICAL_RATIO

  return damage
}
