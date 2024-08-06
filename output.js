//Tue Aug 06 2024 20:35:07 GMT+0000 (Coordinated Universal Time)
//Base:https://github.com/echo094/decode-js
//Modify:https://github.com/smallfawn/decode_action
if (mode) {
  openCardArgv = "650767_655224";
  openCardArgv = "https://shopmember.m.jd.com/shopcard/?shopId=123";
  openCardArgv = "https://shopmember.m.jd.com/shopcard/?venderId=123";
  openCardArgv = "https://shopmember.m.jd.com/shopcard/?shopId=3779964&venderId=3779964";
  openCardArgv = "1000008814";
  openCardArgv = "https://shop.m.jd.com/shop/home?shopId=1000076283";
  openCardArgv = "https://shopmember.m.jd.com/shopcard?shopId=1000098801&venderId=1000098801";
  openCardArgv = "https://shopmember.m.jd.com/shopcard?shopId=1000077407&venderId=1000077407";
  openCardArgv = "https://shopmember.m.jd.com/shopcard?shopId=1000072462&venderId=1000072462";
  openCardArgv = "1000001195";
}
const {
  RunMode: i11I1ili,
  UserMode: ll1li1Ii,
  baseCommonEnv: II1I1ill,
  baseCommonEnvKey: IliIIil
} = require("./bear");
i11I1ili.envInfo = {
  "name": "入会有礼beta",
  "runName": "jd_open_card",
  "version": "2.0.2"
};
II1I1ill.openCardBeanNum = parseInt(process.env.B_OPEN_CARD_BEAN_NUM || "10");
II1I1ill.openCardMode = parseInt(process.env.B_OPEN_CARD_MODE || "0");
IliIIil.B_OPEN_CARD_BEAN_NUM = "openCardBeanNum";
IliIIil.B_OPEN_CARD_MODE = "openCardMode";
class ll11IIll extends ll1li1Ii {
  constructor(lilI1Il1, l1l11ii1) {
    super(lilI1Il1, l1l11ii1);
  }
  async ["userTask"]() {
    const llIiiIlI = /^(https?:\/\/)?([\da-zA-Z.-]+)\.([a-z.]{2,6})([/\w.-]*)*\/?(\?[\w&=.-]*)?$/;
    if (llIiiIlI.test(this.openCardArgv)) {
      this.shopId = this.getQueryString(this.openCardArgv, "shopId");
      this.venderId = this.getQueryString(this.openCardArgv, "venderId");
      this.debug(this.shopId);
      this.debug(this.venderId);
    } else {
      if (this.openCardArgv.includes("_")) {
        let IlliilI = this.openCardArgv.split("_");
        this.shopId = IlliilI[0];
        this.venderId = IlliilI[1];
      } else {
        if (/^\d+$/.test(this.openCardArgv)) this.venderId = this.openCardArgv;else {
          this.putMsg("参数错误");
          this.stop();
          return;
        }
      }
    }
    i11I1ili.activity.activityUrl = "https://shopmember.m.jd.com/shopcard?" + (this.shopId ? "shopId=" + this.shopId + "&" : "") + "venderId=" + this.venderId;
    let I1i11ilI = await this.getShopOpenCardInfo();
    this.debug(I1i11ilI);
    if (!I1i11ilI) {
      return;
    }
    if (this.openCardStatus == 0) {
      if (!this.giftActId) {
        this.putMsg("无入会礼包");
        this.stop();
        return;
      }
      let iliiIlII = I1i11ilI?.["result"]?.[0]?.["interestsRuleList"] ?? [];
      if (II1I1ill.openCardMode === 0 && !iliiIlII.some(i1i11ll1 => ["京豆"].includes(i1i11ll1.prizeName) && parseInt(i1i11ll1.discountString) >= II1I1ill.openCardBeanNum)) return this.putMsg("垃圾活动"), this.stop();
      if (II1I1ill.openCardMode === 1 && !iliiIlII.some(Iill1111 => /京豆|积分/.exec(Iill1111.prizeName))) return this.putMsg("垃圾活动"), this.stop();
      let ili1iIlI = await this.bindWithVender();
      if (ili1iIlI && ili1iIlI.success) {
        let i1iil111 = ili1iIlI?.["result"]?.["giftInfo"]?.["giftList"] ?? [];
        for (let l111IIl1 of i1iil111) {
          this.putMsg("" + l111IIl1?.["discount"] + l111IIl1?.["prizeTypeName"]);
        }
      }
      return;
    }
    this.log("已开卡");
  }
}
i11I1ili.activity = {
  "openCardArgv": openCardArgv
};
i11I1ili.TaskClass = ll11IIll;
i11I1ili.run({
  "whitelist": ["1-20"],
  "main_thread": 3
});