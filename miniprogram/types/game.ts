/**
 * 游戏相关类型定义
 */

/**
 * 骰子接口
 */
export interface Dice {
  /** 骰子ID */
  id: number;
  /** 点数 (1-6) */
  value: number;
  /** 是否正在滚动 */
  isRolling: boolean;
  /** 骰子位置（用于动画） */
  position?: {
    x: number;
    y: number;
  };
}

/**
 * 游戏状态
 */
export type GameStatus = 'idle' | 'rolling' | 'finished';

/**
 * 游戏数据接口
 */
export interface GameData {
  /** 5颗骰子 */
  dice: Dice[];
  /** 游戏状态 */
  status: GameStatus;
  /** 总点数 */
  totalPoints: number;
  /** 摇骰子次数 */
  rollCount: number;
}

/**
 * 骰子点数类型
 */
export type DiceValue = 1 | 2 | 3 | 4 | 5 | 6;

/**
 * 摇骰子结果
 */
export interface RollResult {
  /** 骰子结果 */
  dice: Dice[];
  /** 总点数 */
  total: number;
  /** 是否包含特殊组合 */
  specialCombination?: string;
}

/**
 * 动画配置
 */
export interface AnimationConfig {
  /** 动画时长（毫秒） */
  duration: number;
  /** 延迟时间（毫秒） */
  delay: number;
  /** 动画类型 */
  timingFunction: 'linear' | 'ease' | 'ease-in' | 'ease-out' | 'ease-in-out';
}