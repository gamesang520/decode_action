//Fri Aug 09 2024 17:49:38 GMT+0000 (Coordinated Universal Time)
//Base:https://github.com/echo094/decode-js
//Modify:https://github.com/smallfawn/decode_action
if (mode) {
  activityUrl = "https://lzkj-isv.isvjcloud.com/prod/cc/interactsaas/index?activityType=10070&templateId=7fab7995-298c-44a1-af5a-f79c520fa8a888&activityId=1743104309459283970&nodeId=101001&prd=cjwx";
  activityUrl = "https://lzkj-isv.isvjcloud.com/prod/cc/interactsaas/index?activityType=10070&templateId=7fab7995-298c-44a1-af5a-f79c520fa8a888&activityId=1739220043064475649&nodeId=101001&prd=cjwx";
  activityUrl = "https://lorealjdcampaign-rc.isvjcloud.com/interact/index?activityType=10006&activityId=1738126574080573441&templateId=20201228083300yqrhyl01&nodeId=101001005&prd=crm";
  activityUrl = "https://lzkj-isv.isvjcloud.com/prod/cc/interaction/v1/index?activityType=10006&templateId=20201228083300yqrhyl01&activityId=1745043938804285441&nodeId=101001005&&shareUserId=1745055475646279682&shopid=1000002984";
  activityUrl = "https://lorealjdcampaign-rc.isvjcloud.com/interact/index?activityType=10006&activityId=1738126574080573441&templateId=20201228083300yqrhyl01&nodeId=101001005&prd=crm";
  activityUrl = "https://lzkj-isv.isvjcloud.com/prod/cc/interactsaas/index?activityType=10070&activityId=1744979364341022722&templateId=7fab7995-298c-44a1-af5a-f79c520fa8eff1&nodeId=101001&prd=cjwx";
  activityUrl = "https://lzkj-isv.isvjcloud.com/prod/cc/interactsaas/index?activityType=10070&templateId=7fab7995-298c-44a1-af5a-f79c520fa8a888&activityId=1752989489668743169&nodeId=101001&prd=cjwx";
}
const {
  RunMode: llil1ilI,
  UserMode: ii11lI,
  baseCommonEnv: i111iii1,
  baseCommonEnvKey: i1lIilil
} = require("./bear");
i111iii1.wx_address_stop_keyword = process.env.B_INVITE_STOP_KEYWORD ? process.env.B_INVITE_STOP_KEYWORD.split(/[@,&|]/) : "鼠标垫|测试".split(/[@,&|]/);
i111iii1.leaderNum = parseInt(process.env.B_INVITE_LEADER_NUM || 1);
i111iii1.needMaxNum = parseInt(process.env.B_INVITE_MAX_NEED_NUM || 999);
i111iii1.runReceive = parseInt(process.env.B_INVITE_RUN_RECEIVE || 0);
i111iii1.runMode = parseInt(process.env.B_INVITE_RUN_MODE || 0);
i1lIilil.B_INVITE_STOP_KEYWORD = "__wx_address_stop_keyword__";
i1lIilil.B_INVITE_LEADER_NUM = "leaderNum";
i1lIilil.B_INVITE_MAX_NEED_NUM = "needMaxNum";
i1lIilil.B_INVITE_RUN_RECEIVE = "runReceive";
i1lIilil.B_INVITE_RUN_MODE = "runMode";
llil1ilI.envInfo = {
  "name": "邀请有礼beta",
  "runName": "jd_inviteJoin",
  "version": "2.0.4"
};
class iIiiIl1l extends ii11lI {
  constructor(iI11I1iI, iliIIlI) {
    super(iI11I1iI, iliIIlI);
    this.equityTypes = ["JD_BEAN", "JD_E_CARD", "JD_REDBAG", "JD_AIQIYI", "JD_GOODS"];
    this.keymap = {
      "one": "awardOneStatus",
      "two": "awardTwoStatus",
      "three": "awardThreeStatus",
      "four": "awardFourStatus"
    };
    this.keymap2 = {
      "one": "leveOneNum",
      "two": "leveTwoNum",
      "three": "leveThreeNum",
      "four": "leveFourNum"
    };
    this.keymap4 = {
      "one": "1级",
      "two": "2级",
      "three": "3级",
      "four": "4级"
    };
  }
  async ["customAcquire"]() {
    if (this.toHelpUser.asyncLock) return;
    let illli11I = this.toHelpUser.inviteSuccessTimesList.filter(iill1I1i => iill1I1i.status === 999).sort((IiIl1Iil, Illiill1) => IiIl1Iil.days - Illiill1.days);
    if (illli11I.length > 0) {
      this.toHelpUser.asyncLock = true;
      for (let l11lIlI1 of illli11I.reverse()) {
        await this.toHelpUser.acquire(l11lIlI1.id);
      }
      return;
    }
  }
  async ["checkCooieNum"]() {
    let IIi11ii1 = this.toHelpUser.inviteSuccessTimesList.filter(IIl11iIi => IIl11iIi.status !== 1);
    IIi11ii1.length > 0 && IIi11ii1[0].days - this.toHelpUser.helpedCount > ii11lI.activity.cookieNum && (this.log("ck不够"), this.toHelpUser.needHelp = false, this.toHelpUser.memberType === 1 && (await this.customAcquire()));
  }
  async ["jinggengAcquire"](i1lI1III) {
    let ii11llli = await this.jinggengApi("receiveInviteJoinAward", {
      "awardId": i1lI1III
    });
    if (ii11llli && ii11llli.succ) {
      let ill1I1I1 = ii11llli.msg ?? "{}",
        IiiIIIll = JSON.parse(ill1I1I1);
      if (IiiIIIll?.["isSendSucc"]) {
        let i1liilll = IiiIIIll?.["drawAwardDto"]?.["awardName"];
        this.putMsg("" + IiiIIIll?.["drawAwardDto"]?.["awardDenomination"] + i1liilll);
        if (IiiIIIll?.["drawAwardDto"]?.["awardType"] === "JD_GOODS") {
          this.addressId = IiiIIIll?.["drawAwardDto"]?.["actLogId"];
          this.prizeName = i1liilll;
          await this.saveAddress();
        }
        return;
      }
      return;
    }
    let l1iliiil = ii11llli?.["msg"] || "领取失败";
    this.putMsg(l1iliiil);
    this.wxStop();
    return;
  }
  async ["showInviteJoin"](l1l1lII = 0) {
    let IIlIlilI = await this.taskGet("ql/front/showInviteJoin", {
      "inviterNick": this.toHelpUser.mixNick,
      "isOpenCard": 1,
      "id": this.activityId,
      "user_id": this.userId
    });
    if (IIlIlilI.includes("请稍后再试") || IIlIlilI.includes("努力加载") || IIlIlilI.includes("请稍后重试")) return l1l1lII > 3 && (this.log("未知原因"), this.exit()), this.debug("火爆重试"), await this.showInviteJoin(l1l1lII + 1);
    return IIlIlilI;
  }
  async ["recordActPvUvData"]() {}
  async ["inviteTask"](iIliIiIl) {
    this.toHelpUser = iIliIiIl;
    if (!this.toHelpUser.needHelp) {
      return;
    }
    await this.isvObfuscator();
    if (this.mode === "jinggeng") {
      ii11lI.activity.cookieNum--;
      await this.setMixNick();
      this.venderId = this.toHelpUser.venderId;
      this.userId = this.venderId;
      let i1II1iIi = await this.taskGet("ql/front/showInviteJoin", {
        "inviterNick": this.toHelpUser.mixNick,
        "isOpenCard": 0,
        "id": this.activityId,
        "user_id": this.userId
      });
      if (!i1II1iIi) return this.stop();
      await this.getShopOpenCardInfo();
      if (this.openCardStatus !== 0) return this.log("已开卡"), this.exit();
      await this.bindWithVender();
      if (this.canNotOpenCard) return this.canHelp = false;
      this.debug({
        "inviterNick": this.toHelpUser.mixNick,
        "isOpenCard": 1,
        "id": this.activityId,
        "user_id": this.userId
      });
      await this.jinggengApi("reportActivity/recordActPvUvData");
      await this.taskPost("front/checkTokenInSession", {
        "userId": this.userId,
        "token": this.isvToken
      });
      let I1iIiII1 = await this.showInviteJoin();
      I1iIiII1 = this.textToHtml(I1iIiII1);
      let iiIIiIll = I1iIiII1("#inviteSucc", "body").attr("value"),
        iIi1lI1I = I1iIiII1("#buyerFans", "body").attr("value");
      this.debug("inviteSucc:", iiIIiIll, "buyerFans:", iIi1lI1I);
      if (iiIIiIll && iIi1lI1I) {
        this.toHelpUser.helpedCount++;
        this.log("助力[" + this.toHelpUser.pin + "]成功" + this.toHelpUser.helpedCount);
        let lilI1IiI = this.toHelpUser.inviteSuccessTimesList.filter(iilI1ii => this.toHelpUser.helpedCount >= iilI1ii.days && iilI1ii.status !== 1);
        lilI1IiI.length > 0 && (await this.toHelpUser.jinggengAcquire(lilI1IiI[0].awardId));
      }
      await this.checkCooieNum();
      return;
    }
    await this.getDefenseUrls();
    if (!this.toHelpUser.needHelp) {
      return;
    }
    await this.login();
    if (this.joinCode === "1001") {
      this.log("已是会员");
      ii11lI.activity.cookieNum--;
      await this.checkCooieNum();
      return;
    }
    if (!this.toHelpUser.needHelp) {
      return;
    }
    await this.bindWithVender();
    if (this.canNotOpenCard) {
      this.log(this.joinDes);
      this.canHelp = false;
      return;
    }
    await this.login(false);
    let i1ii1i11 = await this.lzkjApi("/api/task/member/getMember", {
      "shareUserId": this.toHelpUser.shareUserId
    });
    this.debug(i1ii1i11);
    ii11lI.activity.cookieNum--;
    if (i1ii1i11 && i1ii1i11.resp_code === 0) {
      if (i1ii1i11.data?.["isSuccess"] === 1 || i1ii1i11.data?.["isSuccess"] === 0 && this.activityUrl.includes("//loreal")) {
        this.toHelpUser.helpedCount++;
        this.log("助力[" + this.toHelpUser.pin + "]成功" + this.toHelpUser.helpedCount);
        let IiIIIIll = this.toHelpUser.inviteSuccessTimesList.filter(IIiI11l1 => this.toHelpUser.helpedCount >= IIiI11l1.days && IIiI11l1.status !== 1 && IIiI11l1.status !== 999);
        if (IiIIIIll.length > 0) {
          if (this.toHelpUser.memberType === 1) IiIIIIll[0].status = 999;else {
            IiIIIIll[0].status = 1;
            await this.toHelpUser.acquire(IiIIIIll[0].id);
          }
        }
        if (this.toHelpUser.helpedCount >= ii11lI.activity.maxHelpCount) {
          this.toHelpUser.needHelp = false;
          this.toHelpUser.memberType === 1 && (await this.customAcquire());
          return;
        }
      } else this.log("助力失败");
    } else this.log(i1ii1i11.resp_msg || "助力失败");
    await this.checkCooieNum();
  }
  async ["userTask"]() {
    if (this.index >= i111iii1.leaderNum) return this.stop();
    await this.isvObfuscator();
    if (this.mode === "jinggeng") {
      await this.setMixNick();
      let ii1lIlil = await this.jinggengShopInfo();
      if (!ii1lIlil) return this.stop();
      let ll1i1li = this.str2Json(ii1lIlil("#helpLogs", "body").attr("value")),
        liliil1I = this.str2Json(ii1lIlil("#bindLogsList", "body").attr("value")),
        liill111 = this.str2Json(ii1lIlil("#inviteSetting2", "body").attr("value")),
        il1l111i = this.str2Json(ii1lIlil("#activityAll", "body").attr("value")),
        il1Ii1ll = false;
      for (let lIili in liill111) {
        if (!il1Ii1ll) il1Ii1ll = liill111[lIili]?.["availableQuantity"] > 0;
      }
      if (!il1Ii1ll) return this.putMsg("垃圾或领完"), this.stop();
      this.debug(ll1i1li, liliil1I, liill111);
      let iIlilll1 = [];
      for (let l1II1li in liill111) {
        let IIi = liill111[l1II1li].equityName;
        [1, 2].includes(liill111[l1II1li][this.keymap[l1II1li]]) && this.equityTypes.includes(liill111[l1II1li].equityType) && liill111[l1II1li].availableQuantity > 0 && iIlilll1.push({
          "equityName": IIi,
          "awardId": liill111[l1II1li].id,
          "days": liill111[l1II1li][this.keymap2[l1II1li]],
          "status": 0
        });
        [3].includes(liill111[l1II1li][this.keymap[l1II1li]]) && iIlilll1.push({
          "status": 1
        });
      }
      this.debug(iIlilll1);
      iIlilll1 = iIlilll1.filter(i1111lil => i1111lil.days <= i111iii1.needMaxNum);
      if (iIlilll1.length === 0) return this.putMsg("垃圾活动"), this.stop();
      iIlilll1 = iIlilll1.filter(ll1iiII1 => ll1iiII1.status === 0);
      if (iIlilll1.length === 0) return this.putMsg("已全部领取"), this.exit();
      iIlilll1 = iIlilll1.sort((I1ll1Ii1, Ii11lIii) => I1ll1Ii1.days - Ii11lIii.days);
      ii11lI.activity.maxHelpCount = iIlilll1[iIlilll1.length - 1].days;
      ii11lI.activity.customThread = 1;
      this.inviteSuccessTimesList = iIlilll1;
      this.helpedCount = ll1i1li.length;
      ii11lI.activity.cookieNum < this.inviteSuccessTimesList[0]?.["days"] - this.helpedCount && (this.putMsg("ck不够"), this.stop());
      await this.jinggengApi("reportActivity/recordActPvUvData");
      await this.taskPost("front/checkTokenInSession", {
        "userId": this.userId,
        "token": this.isvToken
      });
      return;
    }
    this.log(this.activityType);
    if (!["10070", "10006"].includes(this.activityType)) return this.putMsg("不支持的活动类型"), this.stop();
    await this.getDefenseUrls();
    await this.login();
    let iliiliii = this.activityType === "10070" && this.activityUrl.includes("//lzkj") ? "api/task/member/rank/prizeList" : "api/task/member/prizeList",
      Illl1lii = await this.lzkjApi(iliiliii);
    this.debug(Illl1lii.data?.["maxReceiveNum"] ?? 0);
    let lII11l11 = (Illl1lii.data?.["maxReceiveNum"] ?? 0) === 1 ? 1 : 0;
    this.debug(lII11l11);
    this.memberType = Illl1lii.data?.["memberType"] ?? lII11l11 ?? 0;
    this.debug(this.memberType);
    this.prizeList = Illl1lii.data?.["prizeInfo"] ?? [];
    let lI1li1i = [2, 6, 10, 11];
    i111iii1.runMode === 0 && lI1li1i.push(4);
    let lI1i1il1 = this.prizeList.filter(iiIliiiI => !lI1li1i.includes(iiIliiiI.prizeType) && iiIliiiI.leftNum > 0 && iiIliiiI.days <= i111iii1.needMaxNum && !i111iii1.wx_address_stop_keyword?.["some"](lilll1ii => iiIliiiI.prizeName.includes(lilll1ii)));
    if (lI1i1il1.length === 0) {
      this.putMsg("垃圾活动");
      this.stop();
      return;
    }
    this.prizeList = this.prizeList.filter(i1i1liiI => ![2, 6, 10, 11, 4].includes(i1i1liiI.prizeType) && i1i1liiI.leftNum > 0 && i1i1liiI.days <= i111iii1.needMaxNum && !i111iii1.wx_address_stop_keyword?.["some"](iI1liIli => i1i1liiI.prizeName.includes(iI1liIli)));
    if (["1005", "1006", "1002"].includes(this.joinCode)) {
      await this.getShopOpenCardInfo();
      await this.bindWithVender();
      if (this.canNotOpenCard) return this.putMsg(this.joinDes);
      await this.login(false);
    }
    let iI1Ilil1 = await this.lzkjApi("api/prize/receive/list");
    if (!iI1Ilil1 || iI1Ilil1.resp_code !== 0) {
      this.putMsg(iI1Ilil1?.["resp_msg"] || "获取活动信息失败");
      this.wxStop(iI1Ilil1?.["resp_msg"] || "获取活动信息失败");
      return;
    }
    let I1l1ill1 = iI1Ilil1.data?.["receivePrizes"] ?? [];
    if (this.memberType === 1 && I1l1ill1.some(Il1lIlll => Il1lIlll.status === 1)) {
      this.putMsg("已领取奖品");
      this.needHelp = false;
      return;
    }
    if (I1l1ill1.length > 0 && i111iii1.runReceive === 1) {
      for (let li11llli of I1l1ill1) {
        li11llli.status === 0 && (await this.acquire(li11llli.prizeInfoId), li11llli.status = 1);
      }
    }
    if (this.memberType === 1 && I1l1ill1.some(IIlliiIi => IIlliiIi.status === 1)) {
      this.putMsg("已领取奖品");
      this.needHelp = false;
      return;
    }
    this.inviteSuccessTimesList = this.prizeList.filter(ili1i1I1 => !I1l1ill1.some(ililIiii => ililIiii.prizeInfoId === ili1i1I1.id && ililIiii.status === 1)).map(i11I1ii1 => ({
      ...i11I1ii1,
      "status": 0
    })) || [];
    if (this.inviteSuccessTimesList.length === 0) {
      this.putMsg("已领取所有奖品");
      this.needHelp = false;
      return;
    }
    this.inviteSuccessTimesList = this.inviteSuccessTimesList.sort((I1iilIi, lI11lii1) => I1iilIi.days - lI11lii1.days);
    let l11IIl1i = await this.lzkjApi("/api/task/member/getMember", {
      "shareUserId": ""
    });
    this.debug(l11IIl1i);
    if (!l11IIl1i || l11IIl1i.resp_code !== 0) {
      this.putMsg(l11IIl1i?.["resp_msg"] || "获取活动信息失败");
      this.wxStop(l11IIl1i?.["resp_msg"] || "获取活动信息失败");
      return;
    }
    let lilliI1I = l11IIl1i.data?.["shareUser"] ?? 0;
    this.helpedCount = lilliI1I;
    await this.getUserId();
    let iI1i1llI = this.inviteSuccessTimesList[this.inviteSuccessTimesList.length - 1]?.["days"] ?? 0;
    ii11lI.activity.maxHelpCount = iI1i1llI;
    ii11lI.activity.customThread = iI1i1llI > 20 ? 20 : iI1i1llI;
    ii11lI.activity.cookieNum = llil1ilI.cookieLength - 1 + llil1ilI.inviteCookieLength;
    this.log("可助力ck:" + ii11lI.activity.cookieNum);
    ii11lI.activity.cookieNum < this.inviteSuccessTimesList[0]?.["days"] - lilliI1I && (this.putMsg("ck不够"), this.stop());
    this.debug(this.inviteSuccessTimesList);
    this.debug(this.helpedCount, this.inviteSuccessTimesList.length, ii11lI.activity.maxHelpCount);
  }
}
llil1ilI.activity = {
  "activityUrl": activityUrl
};
llil1ilI.TaskClass = iIiiIl1l;
llil1ilI.run({
  "whitelist": ["1-1000"],
  "thread": 5,
  "main_thread": 1,
  "inviteTask": true
});