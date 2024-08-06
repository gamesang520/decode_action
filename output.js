//Tue Aug 06 2024 20:12:47 GMT+0000 (Coordinated Universal Time)
//Base:https://github.com/echo094/decode-js
//Modify:https://github.com/smallfawn/decode_action
if (mode) {
  activityUrl = "https://cjhy-isv.isvjcloud.com/mc/wxMcLevelAndBirthGifts/activity?activityId=d651133fe1e74bb3823dc745d571a185";
  activityUrl = "https://cjhy-isv.isvjcloud.com/mc/wxMcLevelAndBirthGifts/activity?activityId=25386dcd16b34b14ba50b5c6c5c5b0f4";
  activityUrl = "https://cjhy-isv.isvjcloud.com/mc/wxMcLevelAndBirthGifts/activity?activityId=ee8648bca1ae492cacc43dcf8ae294d7";
  activityUrl = "https://cjhy-isv.isvjcloud.com/mc/wxMcLevelAndBirthGifts/activity?activityId=b741377f23a048a08b64999b08cbd7aa";
  activityUrl = "https://cjhy-isv.isvjcloud.com/mc/wxMcLevelAndBirthGifts/activity?activityId=b1cd3698edad47698573bad5742356f6";
  activityUrl = "https://lzkj-isv.isvjd.com/prod/cc/interaction/v2/20002/1001/?shopId=1000309923&activityId=1762435679669395458";
}
const {
  RunMode: i1i1lIlI,
  UserMode: ilII11I,
  baseCommonEnv: I1i1liil,
  baseCommonEnvKey: I11i1iIl
} = require("./bear");
I1i1liil.beanNum = parseInt(process.env?.["B_WX_LEVEL_BIRTH_BEAN_NUM"] || 10);
I11i1iIl.B_WX_LEVEL_BIRTH_BEAN_NUM = "beanNum";
i1i1lIlI.envInfo = {
  "name": "等级/生日礼包beta",
  "runName": "jd_wx_levelBirth",
  "version": "2.0.0"
};
class l1liIIil extends ilII11I {
  constructor(liiIi1l, IIlI11Il) {
    super(liiIi1l, IIlI11Il);
    this.level = 0;
    this.openedCard = false;
  }
  async ["saveBirthDay"]() {
    let i11IiI1I = this.formatDate(Date.now(), "yyyy-MM-dd"),
      ill11Ii = await this.wxApi("mc/wxMcLevelAndBirthGifts/saveBirthDay", {
        "venderId": this.venderId,
        "pin": this.secretPin,
        "birthDay": i11IiI1I
      });
    if (ill11Ii && ill11Ii.result) {
      this.log("设置生日" + i11IiI1I + "成功");
      return;
    }
    let lIi11Il = ill11Ii?.["errorMessage"] || "设置生日失败";
    this.log(lIi11Il);
  }
  async ["sendBirthGifts"]() {
    let lIIIll1 = await this.wxApi("mc/wxMcLevelAndBirthGifts/sendBirthGifts", {
      "activityId": this.activityId,
      "venderId": this.venderId,
      "pin": this.secretPin,
      "level": this.level
    });
    this.debug(lIIIll1);
    if (lIIIll1 && lIIIll1.result) {
      let IiiiiiI = [];
      if (lIIIll1.data?.["birthdayData"]) {
        for (let lliIiii of lIIIll1.data.birthdayData) {
          if (lliIiii.name) {
            IiiiiiI.push(lliIiii.beanNum + "个" + lliIiii.name);
          }
        }
      }
      IiiiiiI.length > 0 ? this.putMsg(IiiiiiI.join(",")) : this.putMsg("没有获得奖品");
      return;
    }
    let Iiil1lli = lIIIll1?.["errorMessage"] || lIIIll1?.["data"]?.["birthdayError"] || "领取生日礼包失败";
    this.putMsg(Iiil1lli);
    this.wxStop(Iiil1lli);
  }
  async ["sendLevelGifts"]() {
    let ill1iIiI = await this.wxApi("mc/wxMcLevelAndBirthGifts/sendLevelGifts", {
      "activityId": this.activityId,
      "venderId": this.venderId,
      "pin": this.secretPin,
      "level": this.level
    });
    this.debug(ill1iIiI);
    if (ill1iIiI && ill1iIiI.result) {
      let i11iilI1 = [];
      if (ill1iIiI.data?.["birthdayData"]) for (let lllIi1I1 of ill1iIiI.data.birthdayData) {
        lllIi1I1.name && i11iilI1.push(lllIi1I1.beanNum + "个" + lllIi1I1.name);
      }
      i11iilI1.length > 0 ? this.putMsg(i11iilI1.join(",")) : this.putMsg("没有获得奖品");
      return;
    }
    let Il1lllii = ill1iIiI?.["errorMessage"] || ill1iIiI?.["data"]?.["levelError"] || "领取等级礼包失败";
    this.putMsg(Il1lllii);
    this.wxStop(Il1lllii);
  }
  async ["userTask"]() {
    await this.isvObfuscator();
    if (this.mode === "v2") {
      await this.login();
      let lI1Iili1 = await this.v2Api("api/" + this.activityType + "/getActivityInfo");
      this.debug(lI1Iili1);
      if (!lI1Iili1 && !lI1Iili1.code === 200) {
        this.putMsg("获取活动信息失败");
        return;
      }
      if (lI1Iili1?.["data"]?.["remark"]?.["includes"]("已经领取") || lI1Iili1?.["data"]?.["status"] === 4) {
        this.putMsg("已领取");
        return;
      }
      let IIiI1liI = await this.v2Api("api/" + this.activityType + "/birthday", {
        "birthday": this.formatDate(Date.now(), "yyyy/MM/dd")
      });
      this.debug(IIiI1liI);
      let IIl1111I = await this.v2Api("api/" + this.activityType + "/receivePrize");
      this.debug(IIl1111I);
      let iIiI1i1I = await this.v2Api("api/" + this.activityType + "/myPrizes");
      this.debug(iIiI1i1I);
      if (iIiI1i1I && iIiI1i1I.code === 200) {
        this.putMsg(iIiI1i1I.data.map(liilllii => "" + liilllii.prizeName).join(",") || "空气");
        return;
      }
      this.putMsg("领取失败");
      return;
    }
    await this.getDefenseUrls();
    await this.wxCommonInfo();
    await this.getSimpleActInfoVo();
    this.defenseUrls.length === 0 ? await this.getMyPing() : await this.initPinToken();
    await this.accessLog();
    let iI1lii1i = await this.wxApi("mc/new/brandCard/common/shopAndBrand/getOpenCardInfo", {
      "venderId": this.venderId,
      "buyerPin": this.secretPin,
      "activityType": 103
    });
    this.debug(iI1lii1i);
    if (iI1lii1i && iI1lii1i.result) this.openedCard = iI1lii1i.data.openedCard;else {
      let iIli1il = iI1lii1i?.["errorMessage"] || "获取开卡信息失败";
      this.log(iIli1il);
    }
    let llIliII1 = await this.wxApi("mc/wxMcLevelAndBirthGifts/getMemberLevel", {
      "venderId": this.venderId,
      "pin": this.secretPin
    });
    this.debug(llIliII1);
    if (llIliII1 && llIliII1.result) {
      this.level = llIliII1.data.level;
    } else {
      let ilIl1lI = llIliII1?.["errorMessage"] || "获取会员等级失败";
      this.log(ilIl1lI);
    }
    let ll11liIl = await this.activityContent({
      "level": 1
    });
    if (ll11liIl && ll11liIl.result) {
      let iIi1i111 = JSON.parse(ll11liIl.data?.["content"]).filter(i1111II => [4, 6, 7, 9, 13, 14, 15, 16].includes(i1111II.type));
      if (iIi1i111.length === 0) {
        this.putMsg("垃圾或领完");
        this.stop();
        return;
      }
      iIi1i111 = iIi1i111.sort((iiI1Ii1, l1iIiii1) => iiI1Ii1.drawLevel - l1iIiii1.drawLevel);
      if (ll11liIl.data.isReceived === 0) {
        let iiI11Iii = !this.openedCard && iIi1i111.filter(l1iIIil => l1iIIil.beanNum >= I1i1liil.beanNum && l1iIIil.name == "京豆" && l1iIIil.drawLevel == 1).length > 0;
        if (iiI11Iii) {
          await this.getShopOpenCardInfo();
          await this.bindWithVender();
          if (this.canNotOpenCard) return;
          this.level = 1;
        }
        this.debug(this.activityType);
        if (this.activityType === 103) await this.saveBirthDay(), await this.sendBirthGifts();else [104, 119].includes(this.activityType) && (await this.sendLevelGifts());
      } else this.putMsg("已领取");
      return;
    }
    let IiII1iii = ll11liIl?.["errorMessage"] || "获取活动信息失败";
    this.putMsg(IiII1iii);
    this.wxStop(IiII1iii);
  }
}
i1i1lIlI.activity = {
  "activityUrl": activityUrl
};
i1i1lIlI.TaskClass = l1liIIil;
i1i1lIlI.run({
  "whitelist": ["1-20"],
  "main_thread": 3
});