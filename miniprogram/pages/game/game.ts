/**
 * 游戏主页面
 */
import { GameData, Dice, RollResult } from '../../types/game';
import { rollMultipleDice, calculateTotal, createInitialDice } from '../../utils/dice-util';

Page({
  data: {
    gameData: {
      dice: [],
      status: 'idle',
      totalPoints: 0,
      rollCount: 0,
      specialCombination: ''
    } as GameData,
    isRolling: false
  },

  /** 摇骰子音效 */
  rollAudio: null as WechatMiniprogram.InnerAudioContext | null,

  onLoad() {
    this.initGame();
    // 创建音效实例
    this.rollAudio = wx.createInnerAudioContext();
    this.rollAudio.src = '/audio/touzi.mp3';
  },

  onUnload() {
    // 销毁音效实例
    this.rollAudio?.destroy();
  },

  /**
   * 初始化游戏
   */
  initGame() {
    const dice = createInitialDice(5);
    this.setData({
      'gameData.dice': dice,
      'gameData.status': 'idle',
      'gameData.totalPoints': 0,
      'gameData.rollCount': 0,
      'gameData.specialCombination': '',
      isRolling: false
    });
  },

  /**
   * 摇骰子
   */
  onRollDice() {
    if (this.data.isRolling) return;

    // 播放摇骰子音效
    this.rollAudio?.play();

    // 开始摇骰子
    this.setData({
      isRolling: true,
      'gameData.status': 'rolling'
    });

    // 为每个骰子设置滚动状态
    const rollingDice = this.data.gameData.dice.map((dice: Dice) => ({
      ...dice,
      isRolling: true
    }));

    this.setData({
      'gameData.dice': rollingDice
    });

    // 模拟摇骰子动画延迟
    setTimeout(() => {
      this.finishRoll();
    }, 800);
  },

  /**
   * 完成摇骰子
   */
  finishRoll() {
    const result: RollResult = rollMultipleDice(5);
    const total = calculateTotal(result.dice);

    this.setData({
      'gameData.dice': result.dice,
      'gameData.totalPoints': total,
      'gameData.rollCount': this.data.gameData.rollCount + 1,
      'gameData.status': 'rolled',
      'gameData.specialCombination': result.specialCombination || '',
      isRolling: false
    });
  },

  /**
   * 开骰子，显示点数
   */
  onReveal() {
    const isRevealed = this.data.gameData.status === 'revealed';
    this.setData({
      'gameData.status': isRevealed ? 'rolled' : 'revealed'
    });
  },

  /**
   * 骰子点击事件
   * @param e 事件对象
   */
  onDiceTap(e: any) {
    const { value } = e.detail;
    console.log('骰子点击，点数:', value);
  }
});