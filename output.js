//Tue Aug 06 2024 20:18:16 GMT+0000 (Coordinated Universal Time)
//Base:https://github.com/echo094/decode-js
//Modify:https://github.com/smallfawn/decode_action
if (mode) {
  activityUrl = "https://lzkj-isv.isvjcloud.com/prod/cc/interactsaas/index?activityType=10069&templateId=ac8b6564-aa35-4ba5-aa62-55b0ce61b5d01&activityId=1719974616209104898&nodeId=101001&prd=cjwx";
  activityUrl = "https://lzkj-isv.isvjcloud.com/prod/cc/interactsaas/index?activityType=10053&templateId=20210804190900gzspyl011&activityId=1718891863502409730&nodeId=101001053&prd=cjwx";
  activityUrl = "https://cjhy-isv.isvjcloud.com/wxShopFollowActivity/activity?activityId=92406df13eae4203b77d7a567c398326";
  activityUrl = "https://jinggeng-isv.isvjcloud.com/ql/front/showFavoriteShop?id=9e8080a78b83db8f018b854284f27565&user_id=10028198";
  activityUrl = "https://lzkj-isv.isvjcloud.com/prod/cc/interactsaas/index?activityType=10069&activityId=1723989742404182018&templateId=ac8b6564-aa35-4ba5-aa62-55b0ce61b5d01&nodeId=101001&prd=cjwx";
  activityUrl = "https://jinggeng-isv.isvjcloud.com/ql/front/showFavoriteShop?id=9e8080a784add0d20184c74e8f0659f5&user_id=11179724";
  activityUrl = "https://lzkj-isv.isvjcloud.com/prod/cc/interactsaas/index?activityType=10053&templateId=20210804190900gzspyl011&activityId=1717457082637680641&nodeId=101001053&prd=cjwx";
  activityUrl = "https://lzkj-isv.isvjcloud.com/prod/cc/interaction/v1/index?activityType=10069&templateId=b60a7f97-84ed-445b-a2e2-9709da4a4d34&activityId=1775495796115959810&nodeId=101001&prd=crm";
}
const {
  RunMode: lI11Il1,
  UserMode: i1Ii1i1i
} = require("./bear");
lI11Il1.envInfo = {
  "name": "关注抽奖beta",
  "runName": "jd_wx_followDraw",
  "version": "1.0.1"
};
class iII11II extends i1Ii1i1i {
  constructor(il1l1iii, IilIllIl) {
    super(il1l1iii, IilIllIl);
  }
  async ["getActivityContentOnly"]() {}
  async ["userTask"]() {
    await this.isvObfuscator();
    if (this.mode === "jinggeng") {
      await this.setMixNick();
      await this.jinggengShopInfo();
      let I1ll11li = await this.jinggengApi("postFavoriteShop");
      this.debug(I1ll11li);
      if (I1ll11li && I1ll11li.succ) {
        let il1lli1I = I1ll11li.msg ?? "{}",
          lIlI11i = JSON.parse(il1lli1I);
        if (lIlI11i?.["actLogDto"]?.["remark"]) {
          this.putMsg(lIlI11i?.["actLogDto"]?.["remark"]);
          return;
        }
      } else {
        let iIlIIl = I1ll11li?.["msg"] || "抽奖失败";
        this.putMsg(iIlIIl);
        this.wxStop();
      }
      return;
    }
    await this.getDefenseUrls();
    if (["10053", "10069"].includes(this.activityType)) {
      await this.login();
      if (this.type === "lkFollowShop") {
        await this.unfollow();
        let iIiil111 = await this.taskGet("api/task/" + this.type + "/getUserFollowInfo");
        this.debug(iIiil111);
        if (iIiil111 && iIiil111.resp_code === 0) {
          if (iIiil111.data.followShop) {
            let IIllili1 = await this.taskGet("api/task/" + this.type + "/saveFollowInfo?actType=" + this.activityType);
            this.debug(IIllili1);
            if (IIllili1 && IIllili1.resp_code === 0) {
              this.putMsg(IIllili1.data?.["prizeName"] || "空气");
              return;
            }
            let il11l1I1 = IIllili1?.["resp_msg"] || "关注店铺失败";
            this.putMsg(il11l1I1);
            return;
          } else this.putMsg("此活动只针对新关注店铺用户~");
        } else {
          let lIII1lli = iIiil111?.["resp_msg"] || "获取关注信息失败";
          this.putMsg(lIII1lli);
        }
        return;
      }
      if (this.type === "followGoods") {
        let Ill11lIl = await this.lzkjApi("api/task/" + this.type + "/getFollowGoods");
        if (Ill11lIl && Ill11lIl.resp_code === 0) {
          this.taskId = Ill11lIl.data?.[0]?.["taskId"];
          let iil1IiIl = Ill11lIl.data?.[0]?.["completeCount"] || 0,
            IlIilllI = Ill11lIl.data?.[0]?.["finishNum"] || 0,
            i1II1il = Ill11lIl.data?.[0]?.["oneClickFollowPurchase"] || 1,
            l1ll1iii = Ill11lIl.data?.[0]?.["status"] || 0,
            il111Ii = Ill11lIl.data?.[0]?.["skuInfoVO"] || [];
          il111Ii = il111Ii.filter(Ilii11li => Ilii11li.status === 0);
          if (iil1IiIl >= IlIilllI || l1ll1iii === 1) {
            this.putMsg("已领取");
            return;
          }
          if (i1II1il === 0) {
            let i1llIlll = await this.lzkjApi("api/task/" + this.type + "/followGoods", {
              "taskId": this.taskId,
              "skuId": ""
            });
            this.debug(i1llIlll);
            if (i1llIlll && i1llIlll.resp_code === 0) {
              this.putMsg(i1llIlll.data?.["prizeName"] || "空气");
              return;
            }
            let Ii1ilil = i1llIlll?.["resp_msg"] || "关注商品失败";
            this.log(Ii1ilil);
          } else for (let lIIi11ll of il111Ii) {
            let i1ilIil = await this.lzkjApi("api/task/" + this.type + "/followGoods", {
              "skuId": lIIi11ll.skuId
            });
            this.debug(i1ilIil);
            if (i1ilIil && i1ilIil.resp_code === 0) {
              if (i1ilIil.data) {
                this.putMsg(i1ilIil.data?.["prizeName"] || "空气");
                return;
              }
            }
            let iI1ii111 = i1ilIil?.["resp_msg"] || "关注商品失败";
            this.log(iI1ii111);
            if (iI1ii111.includes("会员等级")) {
              return;
            }
          }
        } else {
          let i1lll1II = Ill11lIl?.["resp_msg"] || "获取关注商品信息失败";
          this.log(i1lll1II);
        }
      }
      return;
    }
    await this.wxCommonInfo();
    await this.getSimpleActInfoVo();
    this.index === 0 && (await this.getShopInfo());
    this.defenseUrls.length === 0 ? await this.getMyPing() : await this.initPinToken();
    await this.accessLog();
    let lIiIil1i = await this.wxApi("wxShopFollowActivity/activityContentOnly", {
      "activityId": this.activityId,
      "pin": this.secretPin
    });
    this.debug(lIiIil1i);
    if (lIiIil1i && lIiIil1i.result) {
      let Iliilii = lIiIil1i.data.hasFollow ?? false,
        II1iiI1 = lIiIil1i.data.canDrawTimes ?? 1,
        IIIII = lIiIil1i.data.startTime ?? 0,
        I111I1i = lIiIil1i.data.endTime ?? 0;
      i1Ii1i1i.activity.startTime = IIIII;
      i1Ii1i1i.activity.endTime = I111I1i;
      const II11IiI1 = this.formatDate(IIIII, "yyyy-MM-dd HH:mm:ss") + "至" + this.formatDate(I111I1i, "yyyy-MM-dd HH:mm:ss");
      i1Ii1i1i.activity.timeStr = II11IiI1;
      if (IIIII && IIIII > Date.now()) {
        this.putMsg("活动未开始");
        this.stop();
        return;
      }
      if (I111I1i && I111I1i < Date.now()) {
        this.putMsg("活动已结束");
        this.stop();
        return;
      }
      if (II1iiI1 === 0) {
        this.putMsg("无抽奖次数");
        return;
      }
      Iliilii && (await this.unfollow());
      if (this.domain.includes("cjhy")) await this.follow();else {
        let Ii1ii111 = await this.wxApi("wxShopFollowActivity/follow", {
          "activityId": this.activityId,
          "pin": this.secretPin
        });
        this.debug(Ii1ii111);
        if (!(Ii1ii111 && Ii1ii111.result)) {
          let l11iilI = Ii1ii111?.["errorMessage"] || "关注店铺失败";
          this.putMsg(l11iilI);
          return;
        }
      }
      await this.getPrize();
    }
  }
}
lI11Il1.activity = {
  "activityUrl": activityUrl
};
lI11Il1.TaskClass = iII11II;
lI11Il1.run({
  "whitelist": ["1-20"],
  "main_thread": 3
});