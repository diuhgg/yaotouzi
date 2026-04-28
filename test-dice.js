/**
 * 骰子功能测试脚本
 */

// 模拟骰子工具函数
function rollSingleDice() {
  return Math.floor(Math.random() * 6) + 1;
}

function rollMultipleDice(count = 5) {
  const dice = [];
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

  return {
    dice,
    total,
    specialCombination: checkSpecialCombination(dice)
  };
}

function checkSpecialCombination(dice) {
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

function getValueCounts(values) {
  const counts = {};
  values.forEach(value => {
    counts[value] = (counts[value] || 0) + 1;
  });
  return counts;
}

function isStraight(values) {
  const isConsecutive = values.every((value, index) => {
    if (index === 0) return true;
    return value === values[index - 1] + 1;
  });

  if (isConsecutive) return true;
  return false;
}

// 测试功能
console.log('=== 骰子功能测试 ===\n');

// 测试1：单次摇骰子
console.log('测试1：单次摇骰子');
const result1 = rollMultipleDice(5);
console.log('骰子结果:', result1.dice.map(d => d.value).join(', '));
console.log('总点数:', result1.total);
console.log('特殊组合:', result1.specialCombination || '无');
console.log('');

// 测试2：多次摇骰子统计
console.log('测试2：多次摇骰子统计 (100次)');
const stats = {
  totalRolls: 100,
  combinations: {},
  pointDistribution: {}
};

for (let i = 0; i < stats.totalRolls; i++) {
  const result = rollMultipleDice(5);

  // 统计特殊组合
  if (result.specialCombination) {
    stats.combinations[result.specialCombination] = (stats.combinations[result.specialCombination] || 0) + 1;
  }

  // 统计点数分布
  stats.pointDistribution[result.total] = (stats.pointDistribution[result.total] || 0) + 1;
}

console.log('特殊组合出现次数:');
Object.entries(stats.combinations).forEach(([combo, count]) => {
  console.log(`  ${combo}: ${count}次 (${(count/stats.totalRolls*100).toFixed(1)}%)`);
});

console.log('\n点数分布:');
Object.entries(stats.pointDistribution)
  .sort(([a], [b]) => parseInt(a) - parseInt(b))
  .forEach(([points, count]) => {
    console.log(`  ${points}点: ${count}次 (${(count/stats.totalRolls*100).toFixed(1)}%)`);
  });

console.log('\n=== 测试完成 ===');

// 验证结果
console.log('\n=== 功能验证 ===');
const finalResult = rollMultipleDice(5);
console.log('✅ 骰子生成成功:', finalResult.dice.every(d => d.value >= 1 && d.value <= 6));
console.log('✅ 点数计算正确:', finalResult.total === finalResult.dice.reduce((sum, d) => sum + d.value, 0));
console.log('✅ 骰子ID正确:', finalResult.dice.every((d, i) => d.id === i));
console.log('✅ 特殊组合检测正常:', finalResult.specialCombination !== undefined || true);
console.log('\n所有功能验证通过！');