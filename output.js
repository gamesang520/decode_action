//Tue Aug 06 2024 20:26:27 GMT+0000 (Coordinated Universal Time)
//Base:https://github.com/echo094/decode-js
//Modify:https://github.com/smallfawn/decode_action
mode && (activityUrl = "https://lzkj-isv.isvjd.com/drawCenter/activity/ef729f6783cc405cbb9fa83e68ce9be3?activityId=ef729f6783cc405cbb9fa83e68ce9be3", activityUrl = "https://lzkj-isv.isvjcloud.com/prod/cc/interactsaas/index?activityType=10054&templateId=20210804190900ssq011&activityId=1722901315029733378&nodeId=101001054&prd=cjwx", activityUrl = "https://lzkj-isv.isvjcloud.com/prod/cc/interactsaas/index?activityType=10054&templateId=20210804190900ssq011&activityId=1722085969499193346&nodeId=101001054&prd=cjwx", activityUrl = "https://lzkj-isv.isvjd.com/drawCenter/activity/71ca645008bd4d688984bc7e737e6ebe?activityId=71ca645008bd4d688984bc7e737e6ebe");
const {
  RunMode: IIlII1l1,
  UserMode: lIilIIi1
} = require("./bear");
IIlII1l1.envInfo = {
  "name": "老虎机抽奖beta",
  "runName": "jd_wx_centerDraw",
  "version": "1.0.0"
};
class lIll1ilI extends lIilIIi1 {
  constructor(llII1iIl, ii1l11I1) {
    super(llII1iIl, ii1l11I1);
    this.lzkjOpenCard = true;
  }
  async ["userTask"]() {
    await this.isvObfuscator();
    await this.getDefenseUrls();
    if (["10054"].includes(this.activityType)) {
      await this.login();
      let l1IIlII = await this.lzkjApi("api/task/" + this.type + "/getTask", {
        "shareUserId": ""
      });
      this.debug(l1IIlII);
      if (l1IIlII && l1IIlII.resp_code === 0) {
        let I1IliIii = l1IIlII.data?.["taskList"] ?? [];
        await this.lzkjTask(I1IliIii);
      }
      let IllIliii = await this.lzkjApi("api/prize/drawPrize");
      this.drawNumber = 0;
      if (IllIliii && IllIliii.resp_code === 0) {
        this.drawNumber = IllIliii.data?.["drawNumber"];
      }
      if (this.drawNumber <= 0) {
        this.putMsg("无抽奖次数");
        return;
      }
      this.drawNumber = Math.min(this.drawNumber, 7);
      while (this.drawNumber-- > 0) {
        let iil1IIll = await this.lzkjApi("api/prize/draw", {
          "consumePoints": 0,
          "actId": this.activityId
        });
        this.debug(iil1IIll);
        if (iil1IIll && iil1IIll.resp_code === 0) {
          if (iil1IIll.data === "1") {
            this.putMsg("积分不足");
            return;
          }
          this.putMsg(iil1IIll.data?.["prizeName"] || "空气");
          iil1IIll.data && iil1IIll.data?.["prizeName"] && iil1IIll.data?.["prizeType"] === 3 && iil1IIll.data?.["addressId"] && iil1IIll.data?.["dayTime"] === this.formatDate(Date.now(), "yyyy-MM-dd") && (this.addressId = iil1IIll.data.addressId, this.prizeName = iil1IIll.data?.["prizeName"], await this.saveAddress());
          await this.sleep(200);
        } else {
          let i1i1liI = iil1IIll?.["resp_msg"];
          this.putMsg(i1i1liI);
          this.wxStop(i1i1liI);
          return;
        }
      }
      return;
    }
    await this.wxCommonInfo();
    await this.getSimpleActInfoVo();
    this.type = "drawCenter";
    this.defenseUrls.length === 0 ? await this.getMyPing() : await this.initPinToken();
    await this.accessLog();
    let I1i1llll = await this.activityContent({
      "shareUuid": "",
      "nick": "",
      "pinImg": ""
    });
    if (!I1i1llll?.["result"] || !I1i1llll?.["data"]) {
      this.putMsg(I1i1llll?.["errorMessage"]);
      return;
    }
    let Iii1iiI1 = I1i1llll?.["data"]?.["chance"] ?? 3,
      l1l11l = I1i1llll?.["data"]?.["isGameEnd"] ?? false;
    if (l1l11l) {
      this.putMsg("活动已结束");
      this.stop();
      return;
    }
    if (Iii1iiI1 === 0) {
      this.putMsg("抽奖机会不足");
      return;
    }
    Iii1iiI1 = Math.min(Iii1iiI1, 7);
    while (Iii1iiI1-- > 0) {
      let llIill1i = await this.wxApi("drawCenter/draw/luckyDraw", {
        "activityId": this.activityId,
        "pin": this.secretPin
      });
      this.debug(llIill1i);
      if (llIill1i && llIill1i.result) this.putMsg("" + (llIill1i.data?.["name"] || "空气")), llIill1i.data?.["drawInfoType"] === 7 && llIill1i.data?.["needWriteAddress"] === "y" && llIill1i.data?.["addressId"] && (this.addressId = llIill1i.data.addressId, this.prizeName = llIill1i.data.name, await this.saveAddress()), await this.sleep(500);else {
        let i1li11i1 = llIill1i?.["errorMessage"];
        if (i1li11i1?.["includes"]("未关注") && (await this.follow())) {
          Iii1iiI1++;
          continue;
        }
        this.putMsg(i1li11i1);
        this.wxStop(i1li11i1);
        return;
      }
    }
  }
}
IIlII1l1.activity = {
  "activityUrl": activityUrl
};
IIlII1l1.TaskClass = lIll1ilI;
IIlII1l1.run({
  "whitelist": ["1-20"],
  "main_thread": 3
});