//Tue Aug 06 2024 20:33:00 GMT+0000 (Coordinated Universal Time)
//Base:https://github.com/echo094/decode-js
//Modify:https://github.com/smallfawn/decode_action
if (mode) {
  activityUrl = "https://prodev.m.jd.com/mall/active/dVF7gQUVKyUcuSsVhuya5d2XD4F/index.html?code=01d3aa79db784e71852aa76637c88977";
  activityUrl = "https://prodev.m.jd.com/mall/active/dVF7gQUVKyUcuSsVhuya5d2XD4F/index.html?code=567b366c7dc84da9a185600fb027d79f";
  activityUrl = "https://prodev.m.jd.com/mall/active/dVF7gQUVKyUcuSsVhuya5d2XD4F/index.html?code=b16c03b3d29b4969ae5c40c700642f31";
  activityUrl = "https://pro.m.jd.com/mall/active/dVF7gQUVKyUcuSsVhuya5d2XD4F/index.html?code=228f465344374fc0af950f15bec44de4";
  activityUrl = "https://pro.m.jd.com/mall/active/dVF7gQUVKyUcuSsVhuya5d2XD4F/index.html?code=dbba7f4ed9074bcfbead66c7d25dff0c";
  activityUrl = "https://prodev.m.jd.com/mall/active/dVF7gQUVKyUcuSsVhuya5d2XD4F/index.html?code=ffbb0c4f89c740bda7bfb14502a58274";
}
const {
  RunMode: l1II1Ili,
  UserMode: li1IiI1I
} = require("./bear");
l1II1Ili.envInfo = {
  "name": "pro邀请有礼beta",
  "runName": "jd_prodev",
  "version": "1.0.1"
};
class lIiIi1l1 extends li1IiI1I {
  constructor(IlIIIiil, iiIllil) {
    super(IlIIIiil, iiIllil);
    this.code = this.getQueryString(activityUrl, "code");
    this.proxyRetryCount = 0;
  }
  async ["memberBringActPage"](IliIiIli = true) {
    let I1i1IIIl = await this.jd_api({
      "api": "api",
      "params": {
        "functionId": "memberBringActPage",
        "body": JSON.stringify({
          "code": this.code,
          "invitePin": "",
          "_t": this.timestamp()
        }),
        "client": "",
        "clientVersion": "",
        "appid": "jdchoujiang_h5",
        "t": this.timestamp(),
        "h5st": "",
        "openid": -1,
        "uuid": this.uuid(32),
        "code": this.code,
        "invitePin": ""
      },
      "headers": {
        "Referer": this.activityUrl
      }
    });
    if (I1i1IIIl && I1i1IIIl.success) {
      this.venderId = I1i1IIIl.data?.["venderId"];
      this.shopId = I1i1IIIl.data?.["shopId"];
      let lIliIiIl = I1i1IIIl.data?.["beginTime"],
        II1IlI1 = I1i1IIIl.data?.["endTime"];
      li1IiI1I.activity.venderId = this.venderId;
      li1IiI1I.activity.shopId = this.shopId;
      li1IiI1I.activity.startTime = lIliIiIl;
      li1IiI1I.activity.endTime = II1IlI1;
      li1IiI1I.activity.shopName = I1i1IIIl.data?.["shopName"];
      lIliIiIl && lIliIiIl > this.timestamp() && (this.putMsg("活动未开始"), this.stop());
      II1IlI1 && II1IlI1 < this.timestamp() && (this.putMsg("活动已结束"), this.stop());
      if (!IliIiIli) return;
      this.helpedCount = I1i1IIIl.data?.["successCount"] ?? 0;
      this.log(this.helpedCount);
      let l1I1liil = I1i1IIIl.data?.["rewards"] ?? [];
      this.firstInvite = l1I1liil.some(IIl1iI1I => IIl1iI1I?.["rewardStatus"] === 0 && IIl1iI1I?.["stage"] === 1);
      l1I1liil = l1I1liil.filter(IIiII1I => [1].includes(IIiII1I?.["rewardType"]) && IIiII1I?.["rewardStock"] > 0);
      l1I1liil.length === 0 && (this.putMsg("垃圾或领完"), this.stop());
      l1I1liil = l1I1liil.sort((Iill11i, II11IlIi) => Iill11i?.["inviteNum"] - II11IlIi?.["inviteNum"]);
      this.debug(l1I1liil);
      let lI1iiiiI = l1I1liil.filter(ll1Ii1I => ll1Ii1I?.["rewardStatus"] === 2);
      for (let II1l1IIl = 0; II1l1IIl < lI1iiiiI.length; II1l1IIl++) {
        lI1iiiiI[II1l1IIl].rewardStatus = 3;
        await this.memberBringInviteReward(lI1iiiiI[II1l1IIl]);
      }
      l1I1liil = l1I1liil.filter(l1Iliili => l1Iliili?.["rewardStatus"] !== 3);
      l1I1liil.length === 0 && (this.putMsg("奖励已领完"), this.stop());
      this.rewards = l1I1liil;
      li1IiI1I.activity.maxHelpCount = l1I1liil[l1I1liil.length - 1]?.["inviteNum"] ?? 0;
      li1IiI1I.activity.cookieNum = l1II1Ili.cookieLength - 1 + l1II1Ili.inviteCookieLength;
      li1IiI1I.activity.cookieNum < l1I1liil[0]?.["inviteNum"] - this.helpedCount && (this.putMsg("ck不够"), this.stop());
      return;
    }
    let Il1iIlIl = I1i1IIIl?.["errorMessage"] ?? "获取活动信息失败";
    this.putMsg(Il1iIlIl);
    this.stop();
  }
  async ["memberBringFirstInvite"]() {
    let lillllll = await this.jd_api({
      "api": "api",
      "params": {
        "functionId": "memberBringFirstInvite",
        "body": JSON.stringify({
          "code": this.code
        }),
        "client": "",
        "clientVersion": "",
        "appid": "jdchoujiang_h5",
        "t": this.timestamp(),
        "h5st": ""
      },
      "headers": {
        "Referer": this.activityUrl
      }
    });
    this.debug(lillllll);
    if (lillllll && lillllll.success) {
      this.log("开启邀请成功");
      return;
    }
    let i1II1iIl = lillllll?.["errorMessage"] ?? "开启邀请失败";
    this.putMsg(i1II1iIl);
    this.stop();
  }
  ["checkCooieNum"]() {
    let li1IlIl1 = this.toHelpUser.rewards.filter(iili1i1 => iili1i1?.["rewardStatus"] !== 3);
    li1IlIl1.length > 0 && li1IlIl1[0].inviteNum - this.toHelpUser.helpedCount > li1IiI1I.activity.cookieNum && (this.log("ck不够"), this.toHelpUser.needHelp = false);
  }
  async ["memberBringJoinMember"]() {
    let II1IliIi = await this.jd_api({
      "api": "api",
      "params": {
        "functionId": "memberBringJoinMember",
        "body": JSON.stringify({
          "code": this.code,
          "invitePin": this.toHelpUser.pin
        }),
        "client": "",
        "clientVersion": "",
        "appid": "jdchoujiang_h5",
        "t": this.timestamp(),
        "h5st": "",
        "openid": -1,
        "uuid": this.uuid(32),
        "code": this.code,
        "invitePin": this.toHelpUser.pin
      },
      "headers": {
        "Referer": this.activityUrl
      }
    });
    this.debug(II1IliIi);
    li1IiI1I.activity.cookieNum--;
    let IlllllII = II1IliIi?.["errorMessage"] ?? "助力失败";
    if (II1IliIi && II1IliIi.success || IlllllII.includes("交易失败")) {
      this.log("助力成功");
      this.toHelpUser.helpedCount++;
      let iII1lIIi = this.toHelpUser.rewards.filter(IiIllI1l => this.toHelpUser.helpedCount >= IiIllI1l?.["inviteNum"] && IiIllI1l?.["rewardStatus"] !== 3);
      iII1lIIi.length > 0 && (iII1lIIi[0].rewardStatus = 3, await this.toHelpUser.memberBringInviteReward(iII1lIIi[0]));
      this.toHelpUser.helpedCount >= this.toHelpUser.maxHelpCount && (this.toHelpUser.needHelp = false, this.stop());
    } else this.putMsg(IlllllII), this.wxStop(IlllllII), this.canHelp = false;
    this.checkCooieNum();
  }
  async ["memberBringInviteReward"](llI11iIi) {
    let IIl1iI1 = await this.jd_api({
      "api": "api",
      "params": {
        "functionId": "memberBringInviteReward",
        "body": JSON.stringify({
          "code": this.code,
          "stage": llI11iIi?.["stage"]
        }),
        "client": "",
        "clientVersion": "",
        "appid": "jdchoujiang_h5",
        "t": this.timestamp(),
        "h5st": "",
        "openid": -1,
        "uuid": this.uuid(32),
        "code": this.code,
        "stage": llI11iIi?.["stage"]
      },
      "headers": {
        "Referer": this.activityUrl
      }
    });
    this.debug(IIl1iI1);
    if (IIl1iI1 && IIl1iI1.success) {
      this.putMsg(llI11iIi?.["rewardName"]);
      return;
    }
    let IlIlIII1 = IIl1iI1?.["errorMessage"] ?? "领取奖励失败";
    this.putMsg(IlIlIII1);
    this.wxStop(IlIlIII1);
  }
  async ["inviteTask"](iIIliIii) {
    this.retryCount = 1;
    this.proxyRetryCount = 2;
    this.toHelpUser = iIIliIii;
    if (!this.toHelpUser.needHelp) return;
    await this.getShopOpenCardInfo(li1IiI1I.activity.venderId);
    if (this.openCardStatus !== 0) {
      this.log("已开卡");
      this.canHelp = false;
      li1IiI1I.activity.cookieNum--;
      this.checkCooieNum();
      return;
    }
    await this.memberBringJoinMember();
  }
  async ["userTask"]() {
    if (this.index > 0) return this.stop();
    await this.memberBringActPage();
    await this.getShopOpenCardInfo();
    this.openCardStatus === 0 && (await this.bindWithVender());
    this.firstInvite && (await this.memberBringFirstInvite());
  }
}
l1II1Ili.activity = {
  "activityUrl": activityUrl
};
l1II1Ili.TaskClass = lIiIi1l1;
l1II1Ili.run({
  "whitelist": ["1-1000"],
  "thread": 2,
  "main_thread": 1,
  "inviteTask": true
});