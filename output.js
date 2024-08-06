//Tue Aug 06 2024 19:26:26 GMT+0000 (Coordinated Universal Time)
//Base:https://github.com/echo094/decode-js
//Modify:https://github.com/smallfawn/decode_action
mode && (activityUrl = "https://lzkj-isv.isvjcloud.com/prod/cc/interactsaas/index?activityType=10044&templateId=20210714190900tpyl011&activityId=1732698027993563138&nodeId=101001&prd=cjwx");
const {
  RunMode: iIll1II,
  UserMode: l1II11iI
} = require("./bear");
iIll1II.envInfo = {
  "name": "投票抽奖beta",
  "runName": "jd_wx_voteDraw",
  "version": "1.0.0"
};
class iililIii extends l1II11iI {
  constructor(lii1Ii1I, Iilii) {
    super(lii1Ii1I, Iilii);
  }
  async ["userTask"]() {
    await this.isvObfuscator();
    await this.getDefenseUrls();
    if (["10044"].includes(this.activityType)) {
      await this.login();
      let i1I1IlI1 = await this.lzkjApi("api/task/votePolitely/activity");
      this.debug(i1I1IlI1);
      if (!i1I1IlI1 || i1I1IlI1.resp_code !== 0) {
        this.putMsg(i1I1IlI1?.["resp_msg"]);
        this.wxStop(i1I1IlI1?.["resp_msg"]);
        return;
      }
      let lii1i1iI = i1I1IlI1?.["data"]?.["voteSelectList"] ?? [],
        I1I1i1iI = i1I1IlI1?.["data"]?.["canDraw"];
      this.debug(lii1i1iI);
      if (lii1i1iI?.["length"] === 0) {
        let Iiiil111 = [i1I1IlI1.data.rule[0].text];
        i1I1IlI1.data.votingForm === 2 && Iiiil111.push(i1I1IlI1.data.rule[1].text);
        let iliIi11I = await this.lzkjApi("api/task/votePolitely/savePkResult", {
          "selectVote": Iiiil111
        });
        this.debug(iliIi11I);
        if (iliIi11I && iliIi11I.resp_code === 0) {
          I1I1i1iI = true;
        } else this.putMsg(iliIi11I?.["resp_msg"]), this.wxStop(iliIi11I?.["resp_msg"]);
      }
      if (!I1I1i1iI) return;
      let il1ii1iI = await this.lzkjApi("api/prize/draw");
      this.debug(il1ii1iI);
      if (!il1ii1iI || il1ii1iI.resp_code !== 0) {
        this.putMsg(il1ii1iI?.["resp_msg"]);
        this.stop(il1ii1iI?.["resp_msg"]);
        return;
      }
      this.putMsg(il1ii1iI.data?.["prizeName"] || "空气");
      il1ii1iI.data && il1ii1iI.data?.["prizeName"] && il1ii1iI.data?.["prizeType"] === 3 && il1ii1iI.data?.["addressId"] && il1ii1iI.data?.["dayTime"] === this.formatDate(Date.now(), "yyyy-MM-dd") && (this.addressId = il1ii1iI.data.addressId, this.prizeName = il1ii1iI.data?.["prizeName"], await this.saveAddress());
    }
  }
}
iIll1II.activity = {
  "activityUrl": activityUrl
};
iIll1II.TaskClass = iililIii;
iIll1II.run({
  "whitelist": ["1-20"],
  "main_thread": 3
});