//Tue Aug 06 2024 20:19:47 GMT+0000 (Coordinated Universal Time)
//Base:https://github.com/echo094/decode-js
//Modify:https://github.com/smallfawn/decode_action
mode && (activityUrl = "https://lzkj-isv.isvjcloud.com/wxFansInterActionActivity/activity/5876f114e9524b91ad00080850c49e30?activityId=5876f114e9524b91ad00080850c49e30");
const {
  RunMode: iI11IIiI,
  UserMode: il1lIl1i
} = require("./bear");
iI11IIiI.envInfo = {
  "name": "粉丝互动beta",
  "runName": "jd_wx_fansDraw",
  "version": "1.0.0"
};
class iII1i1lI extends il1lIl1i {
  constructor(lliliIlI, l1ll1l11) {
    super(lliliIlI, l1ll1l11);
    this.content = [];
  }
  async ["userTask"]() {
    await this.isvObfuscator();
    await this.getDefenseUrls();
    await this.wxCommonInfo();
    await this.getSimpleActInfoVo();
    this.defenseUrls.length === 0 ? await this.getMyPing() : await this.initPinToken();
    await this.accessLog();
    let Ill1II11 = await this.wxApi("wxFansInterActionActivity/activityContent", {
      "activityId": this.activityId,
      "pin": this.secretPin
    });
    if (!Ill1II11 || !Ill1II11.result) {
      let iiIIIIil = Ill1II11?.["msg"] || "获取活动信息失败";
      this.putMsg(iiIIIIil);
      this.wxStop(iiIIIIil);
      return;
    }
    let lIIII1i = Ill1II11.data?.["actInfo"]?.["startTime"],
      ii1i1lii = Ill1II11.data?.["actInfo"]?.["endTime"];
    ["giftLevelOne", "giftLevelTwo", "giftLevelThree"].forEach(I1IiIliI => JSON.parse(Ill1II11.data?.["actInfo"]?.[I1IiIliI] ?? "[]").forEach(iii1lIIl => this.content.push(iii1lIIl)));
    this.shopName = Ill1II11.data?.["actInfo"]?.["shopName"];
    let iliI1l11 = Ill1II11.data?.["actorInfo"];
    il1lIl1i.activity.shopName = this.shopName;
    il1lIl1i.activity.startTime = lIIII1i;
    il1lIl1i.activity.endTime = ii1i1lii;
    if (lIIII1i && this.timestamp() < lIIII1i) {
      this.putMsg("活动未开始");
      this.wxStop();
      return;
    }
    if (ii1i1lii && this.timestamp() > ii1i1lii) {
      this.putMsg("活动已结束");
      this.wxStop();
      return;
    }
    if (iliI1l11?.["prizeOneStatus"] && iliI1l11?.["prizeTwoStatus"] && iliI1l11?.["prizeThreeStatus"]) {
      this.putMsg("已领取所有奖品");
      return;
    }
    let lI1liliI = iliI1l11.uuid,
      I11II1l1 = {
        1: "task1Sign",
        2: "task2BrowGoods",
        3: "task3AddCart",
        4: "task4Share",
        5: "task5Remind",
        6: "task6GetCoupon",
        7: "task7MeetPlaceVo"
      },
      IIlIi1l1 = Ill1II11.data?.["actInfo"]?.["taskIds"];
    for (let ill1IIIi of IIlIi1l1.split(",")) {
      let lIill11 = Ill1II11.data?.[I11II1l1[ill1IIIi]] ?? {};
      if (lIill11.finishedCount >= lIill11.upLimit) continue;
      for (let i1ll1i1 = 0; i1ll1i1 < lIill11.upLimit - lIill11.finishedCount; i1ll1i1++) {
        try {
          if (["task1Sign", "task4Share", "task5Remind", "task7MeetPlaceVo"].includes(I11II1l1[ill1IIIi])) {
            let iI11Il = I11II1l1[ill1IIIi] === "task1Sign" ? "doSign" : I11II1l1[ill1IIIi] === "task4Share" ? "doShareTask" : I11II1l1[ill1IIIi] === "task5Remind" ? "doRemindTask" : "doMeetingTask";
            await this.wxApi("wxFansInterActionActivity/" + iI11Il, {
              "activityId": this.activityId,
              "uuid": lI1liliI
            });
          }
          if (["task2BrowGoods", "task3AddCart"].includes(I11II1l1[ill1IIIi]) && lIill11.taskGoodList?.["length"] > 0) {
            let iIil1IIl = lIill11.taskGoodList,
              illlliI1 = iIil1IIl[i1ll1i1].skuId,
              i1iIiI1I = I11II1l1[ill1IIIi] === "task2BrowGoods" ? "doBrowGoodsTask" : "doAddGoodsTask";
            await this.wxApi("wxFansInterActionActivity/" + i1iIiI1I, {
              "activityId": this.activityId,
              "uuid": lI1liliI,
              "skuId": illlliI1
            });
          }
          if (I11II1l1[ill1IIIi] === "task6GetCoupon" && lIill11.taskCouponInfoList?.["length"] > 0) {
            let lI1IIl11 = lIill11.taskCouponInfoList,
              il11illl = lI1IIl11[0].couponId;
            await this.wxApi("wxFansInterActionActivity/doGetCouponTask", {
              "activityId": this.activityId,
              "uuid": lI1liliI,
              "couponId": il11illl
            });
          }
        } catch (I1Ii1II) {
          this.log(I1Ii1II);
        } finally {
          this.sleep(1500);
        }
      }
    }
    let iliIilIi = iliI1l11?.["follow"];
    !iliIilIi && (await this.wxApi("wxFansInterActionActivity/followShop", {
      "activityId": this.activityId,
      "uuid": lI1liliI
    }));
    Ill1II11 = await this.wxApi("wxFansInterActionActivity/activityContent", {
      "activityId": this.activityId,
      "pin": this.secretPin
    });
    iliI1l11 = Ill1II11.data?.["actorInfo"] || iliI1l11;
    let IiI1illi = iliI1l11?.["energyValue"] ?? 0;
    IiI1illi += iliI1l11?.["fansLoveValue"] ?? 0;
    let lIiiIi1l = iliI1l11?.["prizeOneStatus"] ?? false,
      IIli11I1 = iliI1l11?.["prizeTwoStatus"] ?? false,
      i11i1Ii = iliI1l11?.["prizeThreeStatus"] ?? false,
      lIi1iiiI = Ill1II11.data?.["actConfig"],
      Ii1IlIli = lIi1iiiI?.["prizeScoreOne"] ?? 0,
      lil1IlII = lIi1iiiI?.["prizeScoreTwo"] ?? 0,
      l1i1lI11 = lIi1iiiI?.["prizeScoreThree"] ?? 0,
      iIl1Iii1 = "";
    !lIiiIi1l && IiI1illi >= Ii1IlIli && (iIl1Iii1 = "01");
    !IIli11I1 && IiI1illi >= lil1IlII && (iIl1Iii1 = "02");
    !i11i1Ii && IiI1illi >= l1i1lI11 && (iIl1Iii1 = "03");
    if (iIl1Iii1) {
      let ili1Iil1 = await this.wxApi("wxFansInterActionActivity/startDraw", {
        "activityId": this.activityId,
        "uuid": lI1liliI,
        "drawType": iIl1Iii1
      });
      this.log(ili1Iil1);
      if (ili1Iil1 && ili1Iil1.result) {
        let l1IIIilI = ili1Iil1.data.drawOk ? ili1Iil1.data?.["name"] : ili1Iil1.data?.["errorMessage"] || "空气";
        this.putMsg(l1IIIilI);
        ili1Iil1.data.needWriteAddress === "y" && ili1Iil1.data?.["drawInfoType"] === 7 && ili1Iil1.data?.["addressId"] && (this.addressId = ili1Iil1.data.addressId, this.prizeName = l1IIIilI, await this.saveAddress());
        return;
      }
      let ilI111I = ili1Iil1?.["errorMessage"];
      this.putMsg(ilI111I);
      this.wxStop(ilI111I);
      return;
    }
    this.putMsg("积分:" + IiI1illi + ",兑换1:" + lIiiIi1l + ",兑换2:" + IIli11I1 + "兑换3:" + i11i1Ii);
  }
}
iI11IIiI.activity = {
  "activityUrl": activityUrl
};
iI11IIiI.TaskClass = iII1i1lI;
iI11IIiI.run({
  "whitelist": ["1-20"],
  "main_thread": 3
});