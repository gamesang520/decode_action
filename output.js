//Tue Aug 06 2024 20:31:32 GMT+0000 (Coordinated Universal Time)
//Base:https://github.com/echo094/decode-js
//Modify:https://github.com/smallfawn/decode_action
mode && (gygShopArgv = "650767_655224", gygShopArgv = "https://shop.m.jd.com/?shopId=650767", gygShopArgv = "https://shop.m.jd.com/?shopId=1000457155");
const {
  RunMode: iIlI1l1I,
  UserMode: ilII1iiI
} = require("./bear");
iIlI1l1I.envInfo = {
  "name": "店铺刮奖beta",
  "runName": "jd_shop_gyg",
  "version": "1.0.0"
};
class iIlIlIil extends ilII1iiI {
  constructor(ll1iilIl, IIIlIiI) {
    super(ll1iilIl, IIIlIiI);
  }
  ["removeLastCharacterIfAmpersand"](I1ii1lil) {
    const IiIlllii = I1ii1lil.charAt(I1ii1lil.length - 1);
    if (IiIlllii === "&") return I1ii1lil.slice(0, -1);else {
      return I1ii1lil;
    }
  }
  async ["userTask"]() {
    if (this.gygShopArgv?.["startsWith"]("http")) {
      this.shopId = this.getQueryString(this.gygShopArgv, "shopId");
      this.venderId = this.getQueryString(this.gygShopArgv, "venderId");
    } else {
      if (this.gygShopArgv.includes("_")) {
        let lIilII1l = this.gygShopArgv.split("_");
        this.shopId = lIilII1l[0];
        this.venderId = lIilII1l[1];
      } else {
        if (/^\d+$/.test(this.gygShopArgv)) this.venderId = this.gygShopArgv;else {
          this.putMsg("参数错误");
          this.stop();
          return;
        }
      }
    }
    !this.shopId && !this.venderId && (this.putMsg("参数错误"), this.stop());
    let ilIlllil = "https://shop.m.jd.com/?" + (this.shopId ? "shopId=" + this.shopId + "&" : "") + (this.venderId ? "venderId=" + this.venderId : "");
    iIlI1l1I.activity.activityUrl = this.removeLastCharacterIfAmpersand(ilIlllil);
    let ilIiilll = await this.jd_api({
      "url": "https://api.m.jd.com/client.action",
      "method": "post",
      "data": {},
      "functionId": "sign",
      "body": {
        "vendorId": this.venderId || this.shopId,
        "sourceRpc": "shop_app_sign_home"
      },
      "sign": true,
      "headers": {
        "Referer": "",
        "User-Agent": this.ua.jd4
      }
    });
    this.debug(ilIiilll);
    if (!ilIiilll || ilIiilll.code !== "0") {
      this.putMsg(ilIiilll ? JSON.stringify(ilIiilll) : "获取活动信息失败");
      return;
    }
    if (ilIiilll?.["result"]?.["isSign"] === 3) return this.putMsg("已刮过奖");else ilIiilll?.["result"]?.["isSign"] === 1 ? ilIiilll.result?.["isWin"] ? this.putMsg(ilIiilll.result?.["signReward"]?.["name"]) : this.putMsg("未中奖") : this.log(ilIiilll);
  }
}
iIlI1l1I.activity = {
  "gygShopArgv": gygShopArgv
};
iIlI1l1I.TaskClass = iIlIlIil;
iIlI1l1I.run({
  "whitelist": ["1-20"],
  "main_thread": 3
});