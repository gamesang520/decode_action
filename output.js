//Tue Aug 06 2024 20:01:43 GMT+0000 (Coordinated Universal Time)
//Base:https://github.com/echo094/decode-js
//Modify:https://github.com/smallfawn/decode_action
mode && (activityUrl = "https://lzkj-isv.isvjcloud.com/wxSecond/activity/c8943bae199447c6911d488be4b453c4?activityId=c8943bae199447c6911d488be4b453c4");
const {
  RunMode: lIIlIIl,
  UserMode: IIlI1ill
} = require("./bear");
lIIlIIl.envInfo = {
  "name": "读秒手速beta",
  "runName": "jd_wx_secondDraw",
  "version": "1.0.0"
};
class IIlIiiii extends IIlI1ill {
  constructor(Il111i1, ii1i1lll) {
    super(Il111i1, ii1i1lll);
  }
  async ["userTask"]() {
    await this.isvObfuscator();
    await this.getDefenseUrls();
    await this.wxCommonInfo();
    await this.getSimpleActInfoVo();
    this.index === 0 && (await this.getShopInfo());
    let lIl1lili = await this.wxApi("wxSecond/getData", {
      "activityId": this.activityId,
      "pin": this.secretPin
    });
    this.debug(lIl1lili);
    if (!lIl1lili || !lIl1lili.result) {
      let ilIlIli = lIl1lili?.["errorMessage"] || "获取数据失败";
      this.putMsg(ilIlIli);
      this.wxStop(ilIlIli);
      return;
    }
    let {
        score: llil1l,
        secondActive: lllIIiI1,
        brushBane: liiiI11,
        bid: l11lilI,
        uuid: lIlI1iIi,
        prizeList: lIIli
      } = this.activityInfo,
      IIlI111l = lllIIiI1?.["startTime"] || 0,
      l1llll1I = lllIIiI1?.["endTime"] || 0,
      ilIil1l1 = lllIIiI1?.["targetTime"] || 0;
    IIlI1ill.activity.startTime = IIlI111l;
    IIlI1ill.activity.endTime = l1llll1I;
    if (IIlI111l && IIlI111l > this.timestamp()) {
      this.log("活动未开始");
      this.wxStop();
      return;
    }
    if (l1llll1I && l1llll1I < this.timestamp()) {
      this.log("活动已结束");
      this.wxStop();
      return;
    }
    lIIli = lIIli?.["filter"](I11I1l1 => [6, 7, 9, 13, 14, 15, 16].includes(I11I1l1.type)) ?? [];
    if (lIIli.length === 0) {
      this.log("垃圾或领完");
      this.wxStop();
      return;
    }
    let iIlIlI1l = await this.wxApi("wxSecond/getTaskDay", {
      "activityId": this.activityId,
      "pin": this.secretPin,
      "uuid": lIlI1iIi
    });
    if (iIlIlI1l && iIlIlI1l.result) {
      let lI1iii1I = iIlIlI1l.data || [];
      for (let I1IliIIi of lI1iii1I) {
        let ii1i1IIi = I1IliIIi.taskType;
        for (let l1lil111 = 0; l1lil111 < I1IliIIi.dayMaxNumber && I1IliIIi.finishNumber === 0; l1lil111++) {
          if ([2, 5].includes(ii1i1IIi)) {
            let iii1liIl = I1IliIIi.activityTaskGoods.slice(l1lil111 * I1IliIIi.commodity, l1lil111 * I1IliIIi.commodity + I1IliIIi.commodity).filter(IiiiiIII => IiiiiIII.complete === 0);
            for (let iiIliIi1 of iii1liIl) {
              let l11l1ll1 = await this.wxApi("wxSecond/finishTask", {
                "activityId": this.activityId,
                "pin": this.secretPin,
                "uuid": lIlI1iIi,
                "taskType": ii1i1IIi,
                "skuId": iiIliIi1.skuId
              });
              this.debug(l11l1ll1);
              getTaskGoods && getTaskGoods.result && (llil1l += l11l1ll1.data?.["score"] ?? 0);
              await this.sleep(500);
            }
            await this.sleep(500);
          }
        }
        await this.sleep(500);
      }
    }
    let ilIill1I = await this.wxApi("wxSecond/getTask", {
      "activityId": this.activityId,
      "pin": this.secretPin,
      "uuid": lIlI1iIi
    });
    if (ilIill1I && ilIill1I.result) {
      let iIllIll = ilIill1I.data || [];
      for (let IlI11Il of iIllIll) {
        let Iill1lI1 = IlI11Il.taskType;
        if ([3].includes(Iill1lI1)) for (let iII111li = 0; iII111li < IlI11Il.dayMaxNumber && IlI11Il.finishNumber === 0; iII111li++) {
          let iIiIiiI1 = await this.wxApi("wxSecond/finishTask", {
            "activityId": this.activityId,
            "pin": this.secretPin,
            "uuid": lIlI1iIi,
            "taskType": Iill1lI1,
            "skuId": good.skuId
          });
          this.debug(iIiIiiI1);
          iIiIiiI1 && iIiIiiI1.result && (llil1l += iIiIiiI1.data?.["score"] ?? 0);
          await this.sleep(500);
        }
        if ([12].includes(Iill1lI1)) {
          for (let i1lilli1 = 0; i1lilli1 < IlI11Il.dayMaxNumber && IlI11Il.finishNumber === 0; i1lilli1++) {
            let IlIi1l1 = await this.wxApi("wxSecond/finishTask", {
              "activityId": this.activityId,
              "pin": this.secretPin,
              "uuid": lIlI1iIi,
              "taskType": Iill1lI1,
              "skuId": ""
            });
            this.debug(IlIi1l1);
            IlIi1l1 && IlIi1l1.result && (llil1l += IlIi1l1.data?.["score"] ?? 0);
            await this.sleep(500);
          }
        }
        await this.sleep(500);
      }
    }
    if (llil1l === 0) {
      this.log("无次数");
      return;
    }
    llil1l = Math.min(llil1l, 7);
    while (llil1l-- > 0) {
      let i1llIII1 = await this.wxApi("wxSecond/checkAuth", {
        "activityId": this.activityId,
        "pin": this.secretPin,
        "brushBane": liiiI11,
        "bid": l11lilI
      });
      this.debug(i1llIII1);
      if (!i1llIII1 || !i1llIII1.result) {
        let iliI11i1 = i1llIII1?.["errorMessage"] || "获取数据失败";
        this.putMsg(iliI11i1);
        this.wxStop(iliI11i1);
        return;
      }
      let lli1I11I = i1llIII1.data?.["brushResult"],
        ii11IlI1 = await this.wxApi("wxSecond/start", {
          "activityId": this.activityId,
          "pin": this.secretPin,
          "brushBane": liiiI11,
          "bid": l11lilI,
          "uuid": lIlI1iIi,
          "seconds": ilIil1l1,
          "brushResult": lli1I11I
        });
      this.debug(ii11IlI1);
      if (ii11IlI1 && ii11IlI1.result) {
        this.putMsg(ii11IlI1.data?.["draw"]?.["name"] || "空气");
        if ((ii11IlI1.data?.["type"] === 7 || ii11IlI1.data?.["drawInfoType"] === 7) && ii11IlI1.data.needWriteAddress === "y") {
          this.addressId = ii11IlI1.data.addressId;
          this.prizeName = ii11IlI1.data?.["draw"]?.["name"];
          await this.addAddress();
        }
        continue;
      }
      let Iiil1lIi = ii11IlI1?.["errorMessage"] || "游戏失败";
      this.putMsg(Iiil1lIi);
      this.wxStop(Iiil1lIi);
    }
  }
}
lIIlIIl.activity = {
  "activityUrl": activityUrl
};
lIIlIIl.TaskClass = IIlIiiii;
lIIlIIl.run({
  "whitelist": ["1-20"],
  "main_thread": 3
});