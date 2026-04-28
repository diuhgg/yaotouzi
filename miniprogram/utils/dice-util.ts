/**
 * 骰子工具函数
 */
import { Dice, DiceValue, RollResult } from '../types/game';

/**
 * 生成随机骰子点数（1-6）
 * @returns 随机点数
 */
export function rollSingleDice(): DiceValue {
  return Math.floor(Math.random() * 6) + 1 as DiceValue;
}

/**
 * 摇多颗骰子
 * @param count 骰子数量
 * @returns 摇骰子结果
 */
export function rollMultipleDice(count: number = 5): RollResult {
  const dice: Dice[] = [];
  let total = 0;

  for (let i = 0; i < count; i++) {
    const value = rollSingleDice();
    dice.push({
      id: i,
      value: value,
      isRolling: false
    });
    total += value;
  }

  const result: RollResult = {
    dice,
    total
  };

  // 检查特殊组合
  result.specialCombination = checkSpecialCombination(dice);

  return result;
}

/**
 * 检查特殊组合
 * @param dice 骰子数组
 * @returns 特殊组合名称
 */
export function checkSpecialCombination(dice: Dice[]): string | undefined {
  const values = dice.map(d => d.value).sort((a, b) => a - b);

  // 检查豹子（五个相同）
  if (values.every(v => v === values[0])) {
    return `豹子 ${values[0]}点`;
  }

  // 检查四条（四个相同）
  const valueCounts = getValueCounts(values);
  for (const [value, count] of Object.entries(valueCounts)) {
    if (count === 4) {
      return `四条 ${value}点`;
    }
  }

  // 检查葫芦（三个相同 + 两个相同）
  const counts = Object.values(valueCounts);
  if (counts.includes(3) && counts.includes(2)) {
    return '葫芦';
  }

  // 检查顺子（连续五个）
  if (isStraight(values)) {
    return '顺子';
  }

  // 检查三条（三个相同）
  if (counts.includes(3)) {
    const threeValue = Object.keys(valueCounts).find(key => valueCounts[Number(key)] === 3);
    return `三条 ${threeValue}点`;
  }

  // 检查两对
  const pairs = Object.values(valueCounts).filter(count => count === 2).length;
  if (pairs === 2) {
    return '两对';
  }

  // 检查对子
  if (pairs === 1) {
    const pairValue = Object.keys(valueCounts).find(key => valueCounts[Number(key)] === 2);
    return `对子 ${pairValue}点`;
  }

  return undefined;
}

/**
 * 获取每个点数的出现次数
 * @param values 点数数组
 * @returns 点数计数对象
 */
function getValueCounts(values: number[]): Record<number, number> {
  const counts: Record<number, number> = {};
  values.forEach(value => {
    counts[value] = (counts[value] || 0) + 1;
  });
  return counts;
}

/**
 * 检查是否为顺子
 * @param values 已排序的点数数组
 * @returns 是否为顺子
 */
function isStraight(values: number[]): boolean {
  // 常规顺子：1-2-3-4-5, 2-3-4-5-6
  const isConsecutive = values.every((value, index) => {
    if (index === 0) return true;
    return value === values[index - 1] + 1;
  });

  if (isConsecutive) return true;

  return false;
}

/**
 * 计算骰子总点数
 * @param dice 骰子数组
 * @returns 总点数
 */
export function calculateTotal(dice: Dice[]): number {
  return dice.reduce((sum, die) => sum + die.value, 0);
}

/**
 * 重置骰子状态
 * @param dice 骰子数组
 * @returns 重置后的骰子数组
 */
export function resetDice(dice: Dice[]): Dice[] {
  return dice.map(die => ({
    ...die,
    value: 1,
    isRolling: false
  }));
}

/**
 * 创建初始骰子
 * @param count 骰子数量
 * @returns 初始骰子数组
 */
export function createInitialDice(count: number = 5): Dice[] {
  const dice: Dice[] = [];
  for (let i = 0; i < count; i++) {
    dice.push({
      id: i,
      value: 1,
      isRolling: false
    });
  }
  return dice;
}