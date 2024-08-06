//Tue Aug 06 2024 20:36:58 GMT+0000 (Coordinated Universal Time)
//Base:https://github.com/echo094/decode-js
//Modify:https://github.com/smallfawn/decode_action
if (mode) {
  liveArgv = "https://h5.m.jd.com/dev/3pbY8ZuCx4ML99uttZKLHC2QcAMn/live.html?id=22832609";
  liveArgv = "https://h5.m.jd.com/dev/3pbY8ZuCx4ML99uttZKLHC2QcAMn/live.html?id=22789891&sharer=%e8%93%9d%e8%89%b2%e9%9b%a8+R62663&user=tZLbIfinAeEQHKV7oZNnzHlo69Mkg6&cu=true&rid=12440&utm_source=kong&utm_medium=jingfen&utm_campaign=t_1002070633_1589_169_1&utm_term=3f58013f8d4a4055942f01ff46fd9f84";
  liveArgv = "https://h5.m.jd.com/dev/3pbY8ZuCx4ML99uttZKLHC2QcAMn/live.html?id=22775299&sharer=%e8%93%9d%e8%89%b2%e9%9b%a8+R62663&user=tZLbIfinAeEQHKV7oZNnzHlo69Mkg6&cu=true&rid=12422&hideyl=1&utm_source=kong&utm_medium=jingfen&utm_campaign=t_1002070633_1589_169_1&utm_term=0785fb47bf6945baa958ba7e68e132e5";
  liveArgv = "https://h5.m.jd.com/dev/3pbY8ZuCx4ML99uttZKLHC2QcAMn/live.html?id=22789891&sharer=%e8%93%9d%e8%89%b2%e9%9b%a8+R62663&user=tZLbIfinAeEQHKV7oZNnzHlo69Mkg6&cu=true&rid=12427&hideyl=1&utm_source=kong&utm_medium=jingfen&utm_campaign=t_1002070633_1589_169_1&utm_term=5834da7c5ddd4bd8965fa763833aaa01";
  liveArgv = "https://h5.m.jd.com/dev/3pbY8ZuCx4ML99uttZKLHC2QcAMn/live.html?id=22670339&sharer=%e8%93%9d%e8%89%b2%e9%9b%a8+R62663&user=tZLbIfinAeEQHKV7oZNnzHlo69Mkg6&cu=true&rid=12439&hideyl=1&utm_source=kong&utm_medium=jingfen&utm_campaign=t_1002070633_1589_169_1&utm_term=0e716e561b334b1b9a75c87a5221be56";
  liveArgv = "22670339";
  liveArgv = "https://h5.m.jd.com/dev/3pbY8ZuCx4ML99uttZKLHC2QcAMn/live.html?id=22773294";
  liveArgv = "https://h5.m.jd.com/dev/3pbY8ZuCx4ML99uttZKLHC2QcAMn/live.html?id=22747197";
}
const {
  RunMode: liii1i,
  UserMode: IlI1iiII
} = require("./bear");
liii1i.envInfo = {
  "name": "直播抽奖beta",
  "runName": "jd_live",
  "version": "1.0.6"
};
class i11Iliii extends IlI1iiII {
  constructor(i1III1i, IIlI1i) {
    super(i1III1i, IIlI1i);
    this.retryCount = 2;
    this.proxyRetryCount = 2;
    this.otherHeaders = {
      "User-Agent": this.ua.jd4,
      "jdgs": "-3107",
      "x-referer-package": "com.360buy.jdmobile",
      "x-rp-client": "ios_4.0.0"
    };
  }
  ["randomCookie"]() {
    const Iiiii11 = "abcdefghijklmnopqrstuvwxyz0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ",
      iili1II = Array.from({
        "length": 12
      }, () => Iiiii11.charAt(Math.floor(Math.random() * Iiiii11.length))).join(""),
      illiiiI1 = Array.from({
        "length": 9
      }, () => Iiiii11.charAt(Math.floor(Math.random() * Iiiii11.length))).join("");
    return "pt_key=AAJi3kgCADBAwCJiwFJpvIfk7J_U6J0FsSZDCnvCtbEhC" + iili1II + ";pt_pin=jd_" + illiiiI1 + ";";
  }
  async ["liveActivity"]() {
    let iiIiIlIl = await this.jd_api({
      "api": "client.action",
      "method": "post",
      "data": {},
      "functionId": "liveActivityV946",
      "body": {
        "itemId": null,
        "liveId": this.liveId,
        "masterPin": null,
        "pageId": "Live_Room",
        "showCoupon": "0"
      },
      "sign": true,
      "jdje": true,
      "noReferer": true
    });
    this.debug(iiIiIlIl);
    if (!iiIiIlIl || iiIiIlIl.code !== "0") return this.putMsg(iiIiIlIl ? JSON.stringify(iiIiIlIl) : "获取直播信息失败"), this.exit();
    let IIIliI1i = iiIiIlIl.data?.["iconArea"]?.["filter"](iilIiii => iilIiii.type === "new_anchor_darw_lottery" && iilIiii.actionType === 3) ?? [];
    if (IIIliI1i.length <= 0) return this.putMsg("未找到有效抽奖活动"), this.stop();
    this.iconArea = IIIliI1i;
  }
  async ["liveLotteryPanel"]() {
    let lIllII1 = await this.jd_api({
      "api": "client.action",
      "method": "post",
      "data": {},
      "functionId": "liveLotteryPanelV1012",
      "body": {
        "liveId": this.liveId.toString(),
        "lotteryId": this.lotteryId.toString(),
        "pageId": "Live_Room",
        "shared": 1
      },
      "sign": true,
      "jdje": true,
      "noReferer": true
    });
    this.debug(lIllII1);
    if (!lIllII1 || lIllII1.code !== "0") return this.putMsg("获取活动详情失败"), this.exit();
    if (![3, 13].includes(lIllII1.data?.["lotteryRewardDetail"]?.["rewardType"])) {
      return this.putMsg("垃圾活动"), this.stop();
    }
    this.rewardValue = lIllII1.data?.["lotteryRewardDetail"]?.["couponCondition"] || lIllII1.data?.["lotteryRewardDetail"]?.["rewardValue"] || 0;
    this.debug(this.rewardValue);
  }
  async ["userTask"]() {
    this.liveArgv?.["startsWith"]("http") ? this.liveId = this.getQueryString(this.liveArgv, "id") : this.liveId = this.liveArgv;
    if (!this.liveId) return this.putMsg("参数错误"), this.stop();
    liii1i.activity.activityUrl = "https://h5.m.jd.com/dev/3pbY8ZuCx4ML99uttZKLHC2QcAMn/live.html?id=" + this.liveId;
    await this.liveActivity();
    for (let il1IllI1 of this.iconArea) {
      this.lotteryId = il1IllI1.data.lotteryId;
      if (!this.lotteryId) {
        continue;
      }
      await this.liveLotteryPanel();
      let i1ii11Il = await this.jd_api({
        "api": "client.action",
        "data": {},
        "method": "post",
        "functionId": "liveDrawLotteryV1012",
        "body": {
          "fansLevel": 1,
          "liveId": this.liveId.toString(),
          "lotteryId": this.lotteryId.toString(),
          "nickName": this.pin,
          "pageId": "Live_Room",
          "plus": 1,
          "token": "",
          "eid": ""
        },
        "sign": true,
        "jdje": true,
        "noReferer": true
      });
      this.debug(i1ii11Il);
      if (!i1ii11Il || i1ii11Il.code !== "0") {
        this.putMsg("抽奖失败");
        continue;
      }
      if (i1ii11Il.data?.["rewardTitle"]?.["includes"]("中奖")) {
        this.putMsg(this.rewardValue + "京豆");
      } else i1ii11Il.data?.["rewardTitle"]?.["includes"]("擦肩") ? this.putMsg("空气") : this.putMsg(i1ii11Il.data?.["rewardTitle"]);
    }
  }
}
liii1i.activity = {
  "liveArgv": liveArgv
};
liii1i.TaskClass = i11Iliii;
liii1i.run({
  "whitelist": ["1-20"],
  "main_thread": 3
});