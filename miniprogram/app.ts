/**
 * 小程序入口
 */
App<IAppOption>({
  globalData: {
    userInfo: undefined
  },
  onLaunch() {
    // 小程序启动时的初始化逻辑
    console.log('摇骰子小程序启动');
  },
  onShow() {
    // 小程序显示时的逻辑
  },
  onHide() {
    // 小程序隐藏时的逻辑
  }
})