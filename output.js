//Tue Aug 06 2024 20:21:13 GMT+0000 (Coordinated Universal Time)
//Base:https://github.com/echo094/decode-js
//Modify:https://github.com/smallfawn/decode_action
mode && (activityUrl = "https://cjhy-isv.isvjcloud.com/activity/daily/wx/indexPage?activityId=25c8fa02eab04f6fb6ffbca9eef11e19", activityUrl = "https://lzkj-isv.isvjcloud.com/prod/cc/interactsaas/index?activityType=10022&templateId=20210518190900mrqhl011&activityId=1764484786904494081&nodeId=101001&prd=cjwx", activityUrl = "https://cjhy-isv.isvjcloud.com/activity/daily/wx/indexPage1/236b89e3b3d24379a56e6cb07ee997fa?activityId=236b89e3b3d24379a56e6cb07ee997fa&venderId=33957");
const {
  RunMode: I11ilI1i,
  UserMode: l11ll1i,
  baseCommonEnv: illill1i,
  baseCommonEnvKey: iI1I1ili
} = require("./bear");
I11ilI1i.envInfo = {
  "name": "每日抢beta",
  "runName": "jd_wx_daily",
  "version": "2.0.2"
};
illill1i.openCardMode = parseInt(process.env.B_WX_DAILY_OPEN_MODE || 0);
iI1I1ili.B_WX_DAILY_OPEN_MODE = "openCardMode";
class IiI1llII extends l11ll1i {
  constructor(li1iI11, lll1IIII) {
    super(li1iI11, lll1IIII);
    this.lzkjOpenCard = true;
  }
  async ["userTask"]() {
    await this.isvObfuscator();
    await this.getDefenseUrls();
    if (["10022"].includes(this.activityType)) {
      await this.login();
      if (illill1i.openCardMode && this.joinCode !== "1001") {
        await this.bindWithVender();
        if (this.canNotOpenCard) return this.putMsg(this.joinDes);
        await this.login(false);
      }
      let l11Iiiii = await this.lzkjApi("api/task/dailyGrabs/activity");
      this.debug(l11Iiiii);
      (!l11Iiiii || l11Iiiii.resp_code !== 0) && (this.putMsg(l11Iiiii.resp_msg || "获取活动信息失败"), this.exit());
      let li11I1i1 = l11Iiiii.data?.["activityEndTime"],
        liilllll = l11Iiiii.data?.["activityStartTime"];
      l11ll1i.activity.timeStr = this.formatDate(liilllll, "yyyy-MM-dd HH:mm:ss") + "至" + this.formatDate(li11I1i1, "yyyy-MM-dd HH:mm:ss") + "\n" + "每日开抢时间:" + l11Iiiii.data?.["hours"] + "点" + l11Iiiii.data?.["minutes"] + "分";
      if (l11Iiiii.data?.["receiveStatus"] === 1) return this.putMsg("已领取");
      let lIlI1l1 = await this.lzkjApi("api/task/dailyGrabs/dayReceive", {
        "prizeInfoId": l11Iiiii.data?.["prizeInfoId"]
      });
      this.debug(lIlI1l1);
      if (lIlI1l1 && lIlI1l1.resp_code === 0) {
        this.putMsg(lIlI1l1.data?.["prizeName"] || "空气");
        lIlI1l1.data?.["prizeType"] === 3 && (this.addressId = lIlI1l1.data?.["addressId"], this.prizeName = lIlI1l1.data?.["prizeName"], await this.saveAddress());
        return;
      }
      let iillI1I = lIlI1l1?.["resp_msg"] || "抢礼物失败";
      this.putMsg(iillI1I);
      this.wxStop(iillI1I);
      return;
    }
    await this.wxCommonInfo();
    let iI11I1iI = await this.taskGet(this.activityUrl),
      iiiillI = this.textToHtml(iI11I1iI),
      lIl1lli1 = iiiillI("#actTimeStr", "body").attr("value"),
      l11li11l = iiiillI("#giftJson", "body").attr("value");
    l11li11l && (l11li11l = JSON.parse(l11li11l));
    lIl1lli1 && (l11ll1i.activity.timeStr = lIl1lli1.replace(/\s*至\s*/, "至") + "\n" + "每日开抢时间:" + l11li11l?.["hours"] + "点" + l11li11l?.["minutes"] + "分");
    await this.getSimpleActInfoVo();
    this.defenseUrls.length === 0 ? await this.getMyPing() : await this.initPinToken();
    await this.accessLog();
    if (illill1i.openCardMode) {
      let IIliiI1i = "",
        IiIillII = {};
      this.activityUrl.includes("//cjhy") ? (IIliiI1i = "mc/new/brandCard/common/shopAndBrand/getOpenCardInfo", IiIillII = {
        "venderId": this.venderId,
        "buyerPin": this.secretPin,
        "activityType": this.activityType
      }) : (IIliiI1i = "wxCommonInfo/getActMemberInfo", IiIillII = {
        "activityId": this.activityId,
        "venderId": this.venderId,
        "pin": this.secretPin
      });
      let i1ii1lII = await this.wxApi(IIliiI1i, IiIillII);
      this.debug(i1ii1lII);
      if (i1ii1lII && i1ii1lII.result && !i1ii1lII.data?.["openedCard"]) {
        await this.bindWithVender();
        if (this.canNotOpenCard) return this.exit();
      }
    }
    let lll11l = await this.wxApi("activity/daily/wx/grabGift", {
      "actId": this.activityId,
      "pin": this.secretPin
    });
    this.debug(lll11l);
    if (lll11l && lll11l.isOk) {
      this.putMsg(lll11l.gift?.["gift"]?.["giftName"] || "空气");
      lll11l.gift?.["gift"]?.["giftType"] === 7 && (this.addressId = lll11l?.["addressId"], this.prizeName = lll11l.gift?.["gift"]?.["giftName"], await this.saveAddress());
      return;
    }
    let iiiIill = lll11l?.["msg"] || "抢礼物失败";
    this.putMsg(iiiIill);
    this.wxStop(iiiIill);
  }
}
I11ilI1i.activity = {
  "activityUrl": activityUrl
};
I11ilI1i.TaskClass = IiI1llII;
I11ilI1i.run({
  "whitelist": ["1-20"],
  "main_thread": 3
});