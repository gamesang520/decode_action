//Tue Aug 06 2024 19:37:24 GMT+0000 (Coordinated Universal Time)
//Base:https://github.com/echo094/decode-js
//Modify:https://github.com/smallfawn/decode_action
if (mode) {
  activityUrl = "https://lzkj-isv.isvjcloud.com/prod/cc/interactsaas/index?activityType=10043&templateId=20210714190900fxyl011&activityId=1719307230965833730&nodeId=101001043&prd=cjwx";
  activityUrl = "https://lzkj-isv.isvjcloud.com/prod/cc/interactsaas/index?activityType=10068&templateId=1acc469f-2a7e-40ce-905e-698a99081656&activityId=1722097372582031361&nodeId=101001&prd=cjwx";
  activityUrl = "https://lzkj-isv.isvjcloud.com/prod/cc/interactsaas/index?activityType=10068&activityId=1722860611094683649&templateId=1acc469f-2a7e-40ce-905e-698a99081656&nodeId=101001&prd=cjwx";
  activityUrl = "https://lzkj-isv.isvjcloud.com/prod/cc/interactsaas/index?activityType=10043&templateId=20210714190900fxyl011&activityId=1724611605446049794&nodeId=101001043&prd=cjwx";
  activityUrl = "https://lzkj-isv.isvjcloud.com/prod/cc/interactsaas/index?activityType=10043&templateId=20210714190900fxyl011&activityId=1731973206748696578&nodeId=101001043&prd=cjwx";
  activityUrl = "https://lzkj-isv.isvjcloud.com/prod/cc/interactsaas/index?activityType=10043&templateId=7ba26d86-9bcc-4994-81be-e288f7162378&activityId=1730809290173358082&nodeId=101001043&prd=cjwx";
  activityUrl = "https://lzkj-isv.isvjcloud.com/prod/cc/interactsaas/index?activityType=10043&templateId=20210714190900fxyl011&activityId=1730199984276058114&nodeId=101001043&prd=cjwx";
  activityUrl = "https://lzkj-isv.isvjcloud.com/prod/cc/interactsaas/index?activityType=10068&templateId=1acc469f-2a7e-40ce-905e-698a99081656&activityId=1730118424914898946&nodeId=101001&prd=cjwx";
  activityUrl = "https://jingyun-rc.isvjcloud.com/h5/pages/shareGift/shareGift1?id=261e2e3e5e67a4a104f1964953f9e6ac&userId=10151786";
  activityUrl = "https://lzkj-isv.isvjcloud.com/prod/cc/interactsaas/index?activityType=10043&templateId=20210714190900fxyl011&activityId=1730141404973965314&nodeId=101001043&prd=cjwx";
  activityUrl = "https://lzkj-isv.isvjcloud.com/prod/cc/interactsaas/index?activityType=10043&activityId=1729029067829522433&templateId=20210714190900fxyl011&nodeId=101001043&prd=cjwx";
  activityUrl = "https://lzkj-isv.isvjcloud.com/prod/cc/interactsaas/index?activityType=10068&templateId=1acc469f-2a7e-40ce-905e-698a99081656&activityId=1735559298289143810&nodeId=101001&prd=cjwx";
  activityUrl = "https://lzkj-isv.isvjcloud.com/prod/cc/interactsaas/index?activityType=10043&templateId=20210714190900fxyl011&activityId=1736925238473572354&prd=cjwx";
  activityUrl = "https://lzkj-isv.isvjcloud.com/prod/cc/interactsaas/index?activityType=10043&templateId=2023121110043fxyl01&activityId=1740638526440665090&nodeId=101001043&prd=cjwx";
  activityUrl = "https://lzkj-isv.isvjcloud.com/prod/cc/interactsaas/index?activityType=10043&templateId=2023121110043fxyl01&activityId=1742488152866869249&prd=cjwx";
  activityUrl = "https://lzkj-isv.isvjcloud.com/prod/cc/interaction/v1/index?activityType=10068&activityId=1739922992114561026&templateId=ce1115bf-0e84-43c6-b2e3-2fc364c12ff1&nodeId=101001&prd=crm";
  activityUrl = "https://lzkj-isv.isvjcloud.com/prod/cc/interactsaas/noMeet?activityType=10043&templateId=2023121110043fxyl01&activityId=1768190686514446337&nodeId=101001043&prd=cjwx";
  activityUrl = "https://lzkj-isv.isvjcloud.com/prod/cc/interactsaas/index?activityType=10068&activityId=1774679182683455490&templateId=1acc469f-2a7e-40ce-905e-698a99081656&nodeId=101001&prd=cjwx";
}
const {
  RunMode: iIlIiIIl,
  UserMode: Iiil,
  baseCommonEnv: i1IlIiii,
  baseCommonEnvKey: IlI1liii
} = require("./bear");
iIlIiIIl.envInfo = {
  "name": "分享有礼beta",
  "runName": "jd_wx_share",
  "version": "2.0.0"
};
i1IlIiii.leaderNum = parseInt(process.env.B_SHARE_LEADER_NUM || 10);
IlI1liii.B_SHARE_LEADER_NUM = "leaderNum";
class II1iilll extends Iiil {
  constructor(iiliIllI, I1ilIli) {
    super(iiliIllI, I1ilIli);
  }
  async ["actInfo"]() {
    let i1IllIIi = await this.lzkjApi("api/task/sharePolitely/activity");
    return i1IllIIi;
  }
  async ["hdbAcquire"](i1I11Iil, ilIiI1I1 = true) {
    if (this.openCard === 0) {
      this.openCard === 1 && (await this.bindWithVender());
    }
    let II1illII = await this.hdbApi("postShareAward", {
      "awardId": i1I11Iil
    });
    if (!II1illII || !II1illII.succ) {
      if (II1illII?.["message"]?.["includes"]("关注店铺") && ilIiI1I1) return await this.follow(), await this.hdbAcquire(i1I11Iil, false);
      this.putMsg(II1illII?.["message"]);
      this.wxStop(II1illII?.["message"]);
      return;
    }
    if (II1illII.result?.["succ"]) {
      this.putMsg(II1illII.result?.["dmActivityLog"]?.["awardName"] || "空气");
      II1illII.result?.["msg"]?.["includes"]("填写信息") && (this.addressId = II1illII.result?.["dmActivityLog"]?.["id"], this.prizeName = II1illII.result?.["dmActivityLog"]?.["awardName"], await this.saveAddress());
      return;
    } else {
      this.putMsg(II1illII.result?.["errorMsg"] || II1illII.result?.["message"]);
    }
  }
  async ["inviteTask"](iliII1il) {
    this.toHelpUser = iliII1il;
    if (!this.toHelpUser.needHelp) {
      return;
    }
    await this.isvObfuscator();
    await this.getDefenseUrls();
    if (this.mode === "hdb") {
      await this.login();
      await this.reportPVUV();
      let IIilIl = await this.hdbApi("postShareAward", {
        "inviterNick": this.toHelpUser.aesBuyerNick
      });
      this.debug(IIilIl);
      if (IIilIl && IIilIl.succ) {
        if (IIilIl.result?.["succ"]) {
          this.log("助力成功");
          this.toHelpUser.helpedCount += 1;
          let Ii11i1li = this.toHelpUser.inviteConfigs.filter(i1iiliil => this.toHelpUser.helpedCount >= i1iiliil.helpNum && !i1iiliil.hasReceived);
          Ii11i1li.length > 0 && (Ii11i1li[0].hasReceived = 1, await this.toHelpUser.hdbAcquire(Ii11i1li[0].award.id));
          this.toHelpUser.helpedCount >= Iiil.activity.maxHelpCount && (this.toHelpUser.needHelp = false);
        }
      }
      return;
    }
    await this.login();
    if (this.activityType === "10043") {
      let IIllIIl1 = await this.lzkjApi("api/task/sharePolitely/activity", {
        "shareUserId": this.toHelpUser.shareUserId
      });
      if (IIllIIl1 && IIllIIl1.resp_code === 0) {
        if (IIllIIl1.data?.["status"] === 0) {
          this.log("助力成功");
          this.toHelpUser.helpedCount += 1;
          let i11iIl1i = this.toHelpUser.shareSuccessTimesList.filter(lIlI1ii => this.toHelpUser.helpedCount >= lIlI1ii.successTimes && lIlI1ii.status !== 3);
          i11iIl1i.length > 0 && (i11iIl1i[0].status = 3, await this.toHelpUser.actInfo(), await this.toHelpUser.acquire(i11iIl1i[0].prizeInfoId));
          if (this.toHelpUser.helpedCount >= Iiil.activity.maxHelpCount) {
            this.toHelpUser.needHelp = false;
          }
        }
      }
    } else {
      if (["1005", "1006", "1002"].includes(this.joinCode)) {
        if (!this.toHelpUser.openCard) return this.reseCookieStatus(), this.log(this.joinDes);
        await this.bindWithVender();
        if (this.canNotOpenCard) return this.reseCookieStatus();
        await this.login(false);
      }
      let IlilI11I = await this.lzkjApi("api/task/inviteFollowShop/getInviteInfo", {
        "shareUserId": this.toHelpUser.shareUserId
      });
      this.debug(IlilI11I);
      if (IlilI11I && IlilI11I.resp_code === 0) {
        if (IlilI11I.data?.["sharesStatus"] === 1) {
          this.log("助力成功");
          this.toHelpUser.helpedCount += 1;
          let l1IiI11 = this.toHelpUser.shareSuccessTimesList.filter(Iii1lI => this.toHelpUser.helpedCount >= Iii1lI.days && Iii1lI.status !== 1);
          l1IiI11.length > 0 && (l1IiI11[0].status = 1, await this.toHelpUser.acquire(l1IiI11[0].id));
          if (this.toHelpUser.helpedCount >= Iiil.activity.maxHelpCount) {
            this.toHelpUser.needHelp = false;
          }
        }
      }
    }
  }
  async ["userTask"]() {
    if (this.index >= i1IlIiii.leaderNum) return this.stop();
    await this.isvObfuscator();
    if (this.mode === "hdb") {
      await this.login();
      await this.reportPVUV();
      await this.loadFrontAct();
      await this.loadFrontAward();
      let I111ilII = await this.hdbApi("loadMyInviteLogs");
      if (!I111ilII || !I111ilII.succ) {
        this.putMsg(I111ilII?.["message"]);
        this.wxStop(I111ilII?.["message"]);
        return;
      }
      this.helpedCount = I111ilII.result?.["total"] || 0;
      let illii1l1 = await this.hdbApi("loadShareSetting", {
        "inviterNick": null
      });
      if (!illii1l1 || !illii1l1.succ) {
        this.putMsg(illii1l1?.["message"]);
        this.wxStop(illii1l1?.["message"]);
        return;
      }
      let llIIIiI1 = illii1l1.result?.["fissionCouponSetting"]?.["inviteConfigs"] || [];
      this.debug(llIIIiI1);
      for (let llii1i1I of llIIIiI1) {
        this.helpedCount >= llii1i1I.helpNum && !llii1i1I.hasReceived && (await this.hdbAcquire(llii1i1I.award.id), llii1i1I.hasReceived = 1);
      }
      this.inviteConfigs = llIIIiI1.filter(i1I1IiI1 => !i1I1IiI1.hasReceived);
      this.inviteConfigs = this.inviteConfigs.sort((llll1lI, i1l1I1iI) => llll1lI.helpNum - i1l1I1iI.helpNum);
      let ii11lll = this.inviteConfigs[this.inviteConfigs.length - 1].helpNum;
      Iiil.activity.maxHelpCount = ii11lll;
      Iiil.activity.customThread = ii11lll > 10 ? 10 : ii11lll;
      this.debug(this.helpedCount, Iiil.activity.maxHelpCount, Iiil.activity.customThread);
      let IlIiiilI = await this.hdbApi("reportActionLog", {
        "actionType": "shareAct"
      });
      this.debug(IlIiiilI);
      return;
    }
    await this.getDefenseUrls();
    if (["10043"].includes(this.activityType)) {
      await this.login();
      this.prizeList = this.prizeList.filter(i1Ii1Ii1 => ![2].includes(i1Ii1Ii1.prizeType) && i1Ii1Ii1.leftNum > 0);
      if (this.prizeList.length === 0) {
        this.putMsg("垃圾活动");
        this.stop();
        return;
      }
      let i111li11 = await this.lzkjApi("api/task/sharePolitely/activity");
      if (!i111li11 || i111li11.resp_code !== 0) {
        this.putMsg(i111li11?.["resp_msg"] || "获取活动信息失败");
        this.wxStop(i111li11?.["resp_msg"] || "获取活动信息失败");
        return;
      }
      let iiI1iIli = i111li11.data?.["shareSuccessTimesList"];
      this.debug(this.prizeList);
      iiI1iIli = iiI1iIli.filter(ll1I1l1i => ll1I1l1i.status !== 4 && this.prizeList.some(iiIiIil1 => iiIiIil1.id === ll1I1l1i.prizeInfoId));
      if (iiI1iIli.length === 0) {
        this.putMsg("已领取所有奖品");
        this.needHelp = false;
        return;
      }
      for (let li111IlI of iiI1iIli) {
        li111IlI.status === 1 && (await this.acquire(li111IlI.prizeInfoId), li111IlI.status = 3);
      }
      iiI1iIli = iiI1iIli.filter(Ili1 => Ili1.status !== 3);
      if (iiI1iIli.length === 0) {
        this.putMsg("已领取所有奖品");
        this.needHelp = false;
        return;
      }
      iiI1iIli = iiI1iIli.sort((l1i11ll, lii1iI1i) => l1i11ll.successTimes - lii1iI1i.successTimes);
      this.shareSuccessTimesList = iiI1iIli;
      let Ili1llil = await this.lzkjApi("api/task/share/friends");
      this.helpedCount = Ili1llil?.["data"]?.["num"] || 0;
      let Ii1iilI1 = this.prizeList.filter(l1Ill1l => l1Ill1l.prizeType === 1 && l1Ill1l.beanNum > 1 && iiI1iIli.some(ili1iili => ili1iili.prizeInfoId === l1Ill1l.id)).length > 0;
      if (this.joinCode !== "1001") {
        !Ii1iilI1 && (this.putMsg(this.joinDes), this.needHelp = false, this.exit());
        await this.bindWithVender();
        if (this.canNotOpenCard) return this.reseCookieStatus();
        await this.login(false);
      }
      await this.getUserId();
      if (!this.shareUserId) {
        this.putMsg("获取助力码失败");
        this.needHelp = false;
        return;
      }
      let lIllIii1 = this.shareSuccessTimesList[this.shareSuccessTimesList.length - 1]?.["successTimes"] ?? 0;
      Iiil.activity.maxHelpCount = lIllIii1;
      Iiil.activity.customThread = lIllIii1 > 10 ? 10 : lIllIii1;
      this.debug(this.helpedCount, Iiil.activity.maxHelpCount, Iiil.activity.customThread);
      this.log("当前用户ID：" + this.shareUserId);
      return;
    }
    if (["10068".includes(this.activityType)]) {
      await this.login();
      let il1li = await this.lzkjApi("api/task/inviteFollowShop/prizeList");
      this.prizeList = il1li.data?.["prizeInfo"] ?? [];
      this.prizeList = this.prizeList.filter(ii11l111 => ![2, 4].includes(ii11l111.prizeType) && ii11l111.leftNum > 0);
      if (this.prizeList.length === 0) {
        this.putMsg("垃圾活动");
        this.stop();
        return;
      }
      let lIiiii1i = await this.lzkjApi("api/prize/receive/list");
      if (!lIiiii1i || lIiiii1i.resp_code !== 0) {
        this.log(lIiiii1i?.["resp_msg"] || "获取活动信息失败");
        this.wxStop(lIiiii1i?.["resp_msg"] || "获取活动信息失败");
        return;
      }
      let II11IIll = lIiiii1i.data?.["receivePrizes"];
      if (II11IIll.length > 0) for (let IIIli1li of II11IIll) {
        IIIli1li.status === 0 && (await this.acquire(IIIli1li.prizeInfoId), IIIli1li.status = 1);
      }
      this.shareSuccessTimesList = this.prizeList.filter(ilIllIlI => !II11IIll.some(I1liii => I1liii.prizeInfoId === ilIllIlI.id && I1liii.status === 1)).map(llli1l1 => ({
        ...llli1l1,
        "status": 0
      })) || [];
      if (this.shareSuccessTimesList.length === 0) {
        this.log("已领取所有奖品");
        this.needHelp = false;
        return;
      }
      this.shareSuccessTimesList = this.shareSuccessTimesList.sort((IIliI1II, lIIl11II) => IIliI1II.days - lIIl11II.days);
      let IlIIiii1 = await this.lzkjApi("api/task/inviteFollowShop/getInviteInfo", {
        "shareUserId": ""
      });
      this.debug(IlIIiii1);
      if (!IlIIiii1 || IlIIiii1.resp_code !== 0) {
        this.log(IlIIiii1?.["resp_msg"] || "获取活动信息失败");
        this.wxStop(IlIIiii1?.["resp_msg"] || "获取活动信息失败");
        return;
      }
      this.debug(this.shareSuccessTimesList);
      this.openCard = this.shareSuccessTimesList.some(iiIiiiIi => iiIiiiIi.prizeType === 1 && iiIiiiIi.beanNum > 1);
      if (this.joinCode !== "1001") {
        !this.openCard && (this.putMsg(this.joinDes), this.needHelp = false, this.exit());
        await this.bindWithVender();
        if (this.canNotOpenCard) return this.reseCookieStatus();
        await this.login(false);
      }
      await this.getUserId();
      if (!this.shareUserId) {
        this.putMsg("获取助力码失败");
        this.needHelp = false;
        return;
      }
      this.helpedCount = IlIIiii1.data?.["shareNum"] || 0;
      let i1IIII1l = this.shareSuccessTimesList[this.shareSuccessTimesList.length - 1]?.["days"] ?? 0;
      Iiil.activity.maxHelpCount = i1IIII1l;
      Iiil.activity.customThread = i1IIII1l > 10 ? 10 : i1IIII1l;
      this.debug(this.helpedCount, Iiil.activity.maxHelpCount, Iiil.activity.customThread);
      return;
    }
  }
}
iIlIiIIl.activity = {
  "activityUrl": activityUrl
};
iIlIiIIl.TaskClass = II1iilll;
iIlIiIIl.run({
  "whitelist": ["1-100"],
  "thread": 10,
  "main_thread": 1,
  "inviteTask": true
});