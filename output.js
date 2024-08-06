//Tue Aug 06 2024 19:35:02 GMT+0000 (Coordinated Universal Time)
//Base:https://github.com/echo094/decode-js
//Modify:https://github.com/smallfawn/decode_action
if (mode) {
  activityUrl = "https://lzkj-isv.isvjd.com/wxShopGift/activity?activityId=48c48940394147bc9aecfc313970952d";
  activityUrl = "https://lzkj-isv.isvjd.com/wxShopGift/activity?activityId=6d1a4409036b462e915e3a29c5c97c01";
  activityUrl = "https://lzkj-isv.isvjcloud.com/prod/cc/interactsaas/index?activityType=10058&templateId=7498bc9d-0be3-480d-ae9d-59b8a074566a&activityId=1735146557846773761&nodeId=101001&giftType=1&isGiftTrue=true&prd=cjwx";
  activityUrl = "https://gzsl-isv.isvjcloud.com/wuxian/mobileForApp/dist/views/pages/newShopGiftBag.html?activityType=JRCX_183&activityId=1000337645";
  activityUrl = "https://gzsl-isv.isvjcloud.com/wuxian/mobileForApp/dist/views/pages/shopGiftBag.html?activityType=JRCX_44&activityId=1000118676";
  activityUrl = "https://lzkj-isv.isvjcloud.com/prod/cc/interactsaas/index?activityType=10058&templateId=7498bc9d-0be3-480d-ae9d-59b8a074566a&activityId=1791015101848346625&nodeId=101001&giftType=1&isGiftTrue=true&prd=cjwx";
  activityUrl = "https://txzj-isv.isvjcloud.com/shop_gift?code=b0U0MjlrRkhNNEV3dWc4aWJn";
  activityUrl = "https://txzj-isv.isvjcloud.com/shop_gift?code=OWt0dHBFaENNdGN3dWc0bmFB";
}
const {
  RunMode: iII1Iil1,
  UserMode: IIIlIi11
} = require("./bear");
iII1Iil1.envInfo = {
  "name": "无线关注beta",
  "runName": "jd_wx_shopGift",
  "version": "2.0.0"
};
class Ii1iliII extends IIIlIi11 {
  constructor(Ii1illII, llli111i) {
    super(Ii1illII, llli111i);
  }
  async ["userTask"]() {
    await this.isvObfuscator();
    if (this.mode === "txzj") {
      if (!this.activityId) return this.putMsg("活动链接错误"), this.stop();
      let IliIi1i = await this.taskPost("front/jd_store_user_info", {
        "token": this.isvToken
      });
      if (!IliIi1i || IliIi1i.code !== "success") {
        let II11Il1 = IliIi1i.msg || "获取用户信息失败";
        return this.putMsg(II11Il1), this.wxStop(II11Il1);
      }
      let i111lIl = await this.taskGet(this.activityUrl),
        I1ill11l = this.textToHtml(i111lIl),
        l1III11l = I1ill11l(".animated").attr("data-code");
      if (!l1III11l) return this.putMsg("活动已结束"), this.stop();
      let ll11liiI = await this.taskPost("shop_gift/send_prize", {
        "code": l1III11l
      });
      this.debug(ll11liiI);
      if (ll11liiI && ll11liiI.code === "success") {
        this.putMsg("领取成功");
        return;
      }
      let IlllI1l = ll11liiI?.["msg"] || "领取失败";
      this.putMsg(IlllI1l);
      this.wxStop(IlllI1l);
      return;
    }
    await this.getDefenseUrls();
    if (this.mode === "gzsl") {
      let l1iiIlIl = await this.gzslApi("getShopGiftActivity", {
        "venderId": this.activityId
      });
      if (l1iiIlIl?.["status"] != "1") {
        let i1l11Il = l1iiIlIl?.["msg"] || "获取礼包信息失败";
        this.putMsg(i1l11Il);
        this.wxStop(i1l11Il);
        return;
      }
      let iilIiiii = l1iiIlIl?.["activity"] || {};
      this.shopId = iilIiiii.shopId;
      this.venderId = iilIiiii.venderId;
      this.rule = iilIiiii.rule;
      this.shopName = iilIiiii.detail;
      let ll1iI1iI = iilIiiii.prizes || [],
        {
          startTime: liliii1I,
          endTime: iIiIIiiI
        } = iilIiiii;
      IIIlIi11.activity.shopId = this.shopId;
      IIIlIi11.activity.venderId = this.shopId;
      IIIlIi11.activity.shopName = this.shopName;
      IIIlIi11.activity.startTime = liliii1I;
      IIIlIi11.activity.endTime = iIiIIiiI;
      if (liliii1I && liliii1I > this.timestamp()) {
        this.putMsg("活动未开始");
        this.stop();
        return;
      }
      if (iIiIIiiI && iIiIIiiI < this.timestamp()) {
        this.putMsg("活动已结束");
        this.stop();
        return;
      }
      ll1iI1iI = ll1iI1iI.filter(i1i1iI1I => !["2"].includes(i1i1iI1I.source));
      if (ll1iI1iI.length === 0) {
        this.putMsg("垃圾或领完");
        this.stop();
        return;
      }
      let II11il11 = await this.gzslApi("getShopGiftPrize", {}, true);
      II11il11?.["status"] === "1" ? this.putMsg("领取成功") : (this.putMsg(II11il11?.["msg"] || "领取失败"), this.wxStop(II11il11?.["msg"]));
      return;
    }
    if (["10058"].includes(this.activityType)) {
      await this.login();
      let III11l1I = await this.lzkjApi("api/shopGift/drawShopGift", {
        "flag": true,
        "memberUser": 0,
        "name": "",
        "visitor": "",
        "position": ""
      });
      this.debug(III11l1I);
      if (III11l1I && III11l1I.resp_code === 0) {
        this.putMsg("领取成功");
        return;
      }
      let ll1i1I1i = III11l1I?.["resp_msg"] || "领取失败";
      this.putMsg(ll1i1I1i);
      this.wxStop(ll1i1I1i);
      return;
    }
    await this.wxCommonInfo();
    await this.getSimpleActInfoVo();
    this.defenseUrls.length === 0 ? await this.getMyPing() : await this.initPinToken();
    await this.accessLog();
    let i111ilIl = await this.activityContent({
      "buyerPin": this.secretPin
    });
    if (!i111ilIl?.["result"] || !i111ilIl?.["data"]) {
      this.putMsg(i111ilIl?.["errorMessage"]);
      return;
    }
    let li1ll1Il = await this.wxApi("wxShopGift/draw", {
      "activityId": this.activityId,
      "buyerPin": this.secretPin,
      "hasFollow": true
    });
    this.debug(li1ll1Il);
    if (li1ll1Il && li1ll1Il.result) this.putMsg("领取成功");else {
      let Ii1iIlli = li1ll1Il?.["errorMessage"];
      this.putMsg(Ii1iIlli);
      this.wxStop(Ii1iIlli);
      return;
    }
  }
}
iII1Iil1.activity = {
  "activityUrl": activityUrl
};
iII1Iil1.TaskClass = Ii1iliII;
iII1Iil1.run({
  "whitelist": ["1-20"],
  "main_thread": 3
});