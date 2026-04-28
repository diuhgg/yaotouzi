/**
 * 骰子组件
 */
import { DiceValue } from '../../types/game';

Component({
  properties: {
    /** 骰子点数 */
    value: {
      type: Number,
      value: 1
    },
    /** 是否正在滚动 */
    rolling: {
      type: Boolean,
      value: false
    },
    /** 是否显示点数 */
    revealed: {
      type: Boolean,
      value: false
    },
    /** 骰子大小 */
    size: {
      type: String,
      value: 'medium' // small, medium, large
    }
  },

  data: {
    /** 点数对应的圆点位置 */
    dots: [4] as number[], // 默认显示1点
    /** 每个位置是否显示点 */
    hasDot: [false, false, false, false, true, false, false, false, false] as boolean[]
  },

  observers: {
    'value': function(value: DiceValue) {
      this.updateDots(value);
    }
  },

  lifetimes: {
    attached() {
      this.updateDots(this.properties.value as DiceValue);
    }
  },

  methods: {
    /**
     * 更新骰子点数显示
     * @param value 点数
     */
    updateDots(value: DiceValue) {
      const dotsMap: Record<DiceValue, number[]> = {
        1: [4],
        2: [0, 8],
        3: [0, 4, 8],
        4: [0, 2, 6, 8],
        5: [0, 2, 4, 6, 8],
        6: [0, 2, 3, 5, 6, 8]
      };

      const activeDots = dotsMap[value] || [4];
      const hasDot = [false, false, false, false, false, false, false, false, false];

      activeDots.forEach(dotIndex => {
        if (dotIndex >= 0 && dotIndex < 9) {
          hasDot[dotIndex] = true;
        }
      });

      this.setData({
        dots: activeDots,
        hasDot: hasDot
      });
    },

    /**
     * 点击骰子
     */
    onTap() {
      this.triggerEvent('diceTap', {
        value: this.properties.value
      });
    }
  }
});