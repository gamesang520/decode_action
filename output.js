//Tue Aug 06 2024 20:14:43 GMT+0000 (Coordinated Universal Time)
//Base:https://github.com/echo094/decode-js
//Modify:https://github.com/smallfawn/decode_action
mode && (activityUrl = "https://cjhy-isv.isvjcloud.com/wxKnowledgeActivity/activity?activityId=ffa61daaa499402da5fdc1bf4a779cfe");
const {
  RunMode: lII1il1l,
  UserMode: llIlilIl,
  baseCommonEnv: Iil1i1II,
  baseCommonEnvKey: il1i11i
} = require("./bear");
Iil1i1II.openCardBeanNum = parseInt(process.env.B_WX_KNOWLEDGE_BEAN_NUM || 1);
il1i11i.B_WX_KNOWLEDGE_BEAN_NUM = "openCardBeanNum";
lII1il1l.envInfo = {
  "name": "知识超人beta",
  "runName": "jd_wx_knowledge",
  "version": "2.0.0"
};
class IillI1ll extends llIlilIl {
  constructor(II11lIli, liiiiI1I) {
    super(II11lIli, liiiiI1I);
  }
  async ["userTask"]() {
    if (this.activityType === "10039") return;
    await this.isvObfuscator();
    await this.getDefenseUrls();
    await this.wxCommonInfo();
    await this.getSimpleActInfoVo();
    this.type = "wxKnowledgeActivity";
    this.index === 0 && (await this.getShopInfo());
    this.defenseUrls.length === 0 ? await this.getMyPing() : await this.initPinToken();
    await this.accessLog();
    let IIl1lII1 = await this.activityContent();
    if (!IIl1lII1 || !IIl1lII1.result) {
      this.putMsg(IIl1lII1?.["errorMessage"]);
      this.wxStop(IIl1lII1?.["errorMessage"]);
      return;
    }
    let IIii1iI = IIl1lII1.data.questions ?? [],
      i1lIllil = IIl1lII1.data.drawContentVOs ?? [];
    i1lIllil = i1lIllil.filter(iiII1iI => [6, 7, 9, 13, 14, 15, 16].includes(iiII1iI.type));
    if (i1lIllil.length === 0) {
      this.putMsg("垃圾或领完");
      this.stop();
      return;
    }
    let iiiilil1 = i1lIllil[0].type === 6 && i1lIllil[0].beanNum >= Iil1i1II.openCardBeanNum || i1lIllil[0].type === 7 || false,
      IliIlil = 10,
      I11II = null;
    while (IliIlil-- > 0) {
      I11II = await this.wxApi("wxKnowledgeActivity/startAnswer", {
        "activityId": this.activityId,
        "pin": this.secretPin
      });
      this.debug(I11II);
      if (I11II && I11II.result) break;
      let i1lllllI = I11II?.["errorMessage"];
      if (i1lllllI.includes("会员") && iiiilil1) {
        await this.bindWithVender();
        if (this.canNotOpenCard) return this.reseCookieStatus();
        continue;
      }
      this.putMsg(i1lllllI);
      this.wxStop(i1lllllI);
      return;
    }
    for (let ll11liII of IIii1iI) {
      let IIIliIll = await this.wxApi("wxKnowledgeActivity/answer", {
        "questionId": ll11liII.id,
        "answer": ll11liII.realAnswer,
        "detailId": I11II.data.id
      });
      this.debug(IIIliIll);
      let lIliII1l = IIIliIll?.["errorMessage"];
      this.wxStop(lIliII1l);
      if (lIliII1l.includes("答题已通关")) break;
    }
    let I1iIII = await this.wxApi("wxKnowledgeActivity/getPrize", {
      "detailId": I11II.data.id
    });
    this.debug(I1iIII);
    if (I1iIII && I1iIII.result) {
      if (I1iIII.data.drawOk) {
        this.putMsg(I1iIII.data.name || "空气");
        if (I1iIII.data?.["drawInfoType"] === 7 && I1iIII.data?.["needWriteAddress"] === "y" && I1iIII.data?.["addressId"]) {
          this.addressId = I1iIII.data.addressId;
          this.prizeName = I1iIII.data.name;
          await this.saveAddress();
        }
      }
      return;
    }
    let Il1lli1 = I1iIII?.["errorMessage"];
    this.putMsg(Il1lli1);
    this.wxStop(Il1lli1);
  }
}
lII1il1l.activity = {
  "activityUrl": activityUrl
};
lII1il1l.TaskClass = IillI1ll;
lII1il1l.run({
  "whitelist": ["1-20"],
  "main_thread": 3
});