//Tue Aug 06 2024 20:23:50 GMT+0000 (Coordinated Universal Time)
//Base:https://github.com/echo094/decode-js
//Modify:https://github.com/smallfawn/decode_action
if (mode) {
  activityUrl = "https://cjhy-isv.isvjcloud.com/wx/completeInfoActivity/view/activity?activityId=c9a7f0ca315d44aabecf618d953cadfd&venderId=1000091815";
  activityUrl = "https://lzkj-isv.isvjcloud.com/prod/cc/interactsaas/index?activityType=10049&templateId=20210720190900wsxxyl011&activityId=1732713789232435201&nodeId=101001009&prd=cjwx";
  activityUrl = "https://cjhy-isv.isvjcloud.com/wx/completeInfoActivity/view/activity?activityId=35bc437239234dd386cedae3751e9e53&venderId=102282&shareuserid4minipg=6%252BhitCZLEJf6Svvo%252BM5%252BfFhXBmEZA6lSVT%252B72G8p%252FfVoLg2u1PPhDKnKIGiyllSk&shopid=100391";
  activityUrl = "https://cjhy-isv.isvjcloud.com/wx/completeInfoActivity/view/activity?activityId=0e39ac6147374ed68bd8112cf99788c0&venderId=1000385629";
  activityUrl = "https://lzkj-isv.isvjcloud.com/prod/cc/interaction/v2/10049/1002/?activityId=1772602526133301250&shopId=1000399381";
  activityUrl = "https://lzkj-isv.isvjcloud.com/prod/cc/interactsaas/index?activityType=10049&activityId=1774620564769026049&templateId=20210720190900wsxxyl011&nodeId=101001009&prd=cjwx";
  activityUrl = "https://cjhy-isv.isvjcloud.com/wx/completeInfoActivity/view/activity?activityId=2075e6cf7a64475c888303b7d95c9bb1&venderId=16401149";
  activityUrl = "https://cjhy-isv.isvjcloud.com/wx/completeInfoActivity/view/activity?activityId=688c76293a42466b973fd62112de8e3d&venderId=14923588";
  activityUrl = "https://lzkj-isv.isvjcloud.com/prod/cc/interactsaas/index?activityType=10049&templateId=20210720190900wsxxyl011&activityId=1784873822283304962&nodeId=101001009&prd=cjwx";
  activityUrl = "https://cjhy-isv.isvjcloud.com/wx/completeInfoActivity/view/activity?activityId=a2bd9a11d77f48b5b8965eb11e9cc34a&venderId=1000092950";
}
const {
  RunMode: iI1II1i,
  UserMode: lliii11,
  baseCommonEnv: I1Ii1i,
  baseCommonEnvKey: lI11ii1I
} = require("./bear");
I1Ii1i.openCardBeanNum = parseInt(process.env.B_WX_COMPLETE_BEAN_NUM || "2");
lI11ii1I.B_WX_COMPLETE_BEAN_NUM = "openCardBeanNum";
iI1II1i.envInfo = {
  "name": "完善有礼beta",
  "runName": "jd_wx_completeDraw",
  "version": "2.1.0"
};
class l1il1l1i extends lliii11 {
  constructor(li1l1Ii, I111iI1l) {
    super(li1l1Ii, I111iI1l);
    this.names = "赵钱孙李周吴郑王冯陈褚卫蒋沈韩杨朱秦尤许何吕施张孔曹严华金魏陶姜戚谢邹喻柏水窦章云苏潘葛奚范彭郎鲁韦昌马苗凤花方俞任袁柳酆鲍史唐费廉岑薛雷贺倪汤滕殷罗毕郝邬安常乐于时傅皮卞齐康".split("");
    this.phones = this.generateRandomMobiles(10);
  }
  ["generateRandomMobiles"](iiilIIli) {
    const l1I1Illi = ["130", "131", "132", "133", "134", "135", "136", "137", "138", "139", "150", "151", "152", "153", "155", "156", "157", "158", "159", "180", "181", "182", "183", "184", "185", "186", "187", "188", "189"];
    let ilIl1i1l = [];
    for (let illI1i = 0; illI1i < iiilIIli; illI1i++) {
      const IIil1 = l1I1Illi[Math.floor(Math.random() * l1I1Illi.length)];
      let I1i11ill = IIil1;
      for (let i1lIlIII = 0; i1lIlIII < 8; i1lIlIII++) {
        I1i11ill += Math.floor(Math.random() * 10);
      }
      ilIl1i1l.push(I1i11ill);
    }
    return ilIl1i1l;
  }
  ["firstCharToLowercase"](IiilIill) {
    return IiilIill.charAt(0).toLowerCase() + IiilIill.slice(1);
  }
  async ["listDrawContent"]() {
    lliii11.activity.listDrawContent && lliii11.activity?.["prizeList"] && (this.prizeList = lliii11.activity.prizeList);
    let IIi11Ii1 = await this.wxApi("drawContent/listDrawContent", {
      "activityId": this.activityId,
      "type": this.activityType
    });
    this.debug(IIi11Ii1);
    if (!IIi11Ii1 || !IIi11Ii1.result) {
      if (IIi11Ii1.errorMessage === null && IIi11Ii1.data === "") return this.putMsg("垃圾或领完"), this.stop();
      let I11Il11l = IIi11Ii1?.["errorMessage"] || "获取奖品失败";
      this.putMsg(I11Il11l);
      await this.wxStopSync(I11Il11l);
      this.exit();
      return;
    }
    this.prizeList = IIi11Ii1.data || [];
    this.debug(this.prizeList);
    this.prizeList = this.prizeList.filter(IiIlIili => [6, 7, 9, 13, 14, 15, 16].includes(IiIlIili.type) || IiIlIili.hasSendPrizeNum - IiIlIili.size > 0);
    if (this.prizeList.length === 0) {
      this.putMsg("垃圾或领完");
      this.stop();
      return;
    }
    lliii11.activity.prizeList = this.prizeList;
  }
  async ["userTask"]() {
    await this.hitCache();
    await this.isvObfuscator();
    await this.getDefenseUrls();
    if (this.mode === "v2") {
      await this.login();
      let lI1I1IlI = await this.v2Api("api/" + this.activityType + "/getPrize");
      this.debug(lI1I1IlI);
      if (!lI1I1IlI || lI1I1IlI.code !== 200) {
        this.putMsg("获取活动信息失败");
        return;
      }
      if (lI1I1IlI.data?.["filter"](iII11i1i => iII11i1i.status === 1)["length"] > 0) {
        this.putMsg("已领取");
        await this.writeLongCache();
        return;
      }
      if (!this.openCard) {
        if (lI1I1IlI.data?.["some"](illI1iiI => illI1iiI.prizeName.includes("京豆"))) await this.bindWithVender();else return this.putMsg("活动仅限店铺会员参与");
      }
      let I1iIIll1 = await this.v2Api("api/" + this.activityType + "/getItem");
      this.debug(I1iIIll1);
      if (!I1iIIll1 || I1iIIll1.code !== 200) {
        this.putMsg(I1iIIll1?.["message"] || "获取奖品失败");
        return;
      }
      let iIiIIi1i = I1iIIll1.data?.["allInfo"];
      if (I1iIIll1.data?.["status"] === 0) {
        for (let IilI1lII of iIiIIi1i) {
          switch (IilI1lII.num) {
            case "1":
              IilI1lII.content = this.names[this.random(0, this.names.length - 1)];
              break;
            case "2":
              IilI1lII.content = this.random(2000, 2022) + "/" + this.random(1, 12) + "/" + this.random(1, 27);
              break;
            case "3":
              IilI1lII.content = this.phones[this.random(0, this.phones.length - 1)];
              break;
            case "4":
              IilI1lII.content = this.randomArray(["男", "女"], 1)[0];
              break;
            case "5":
              IilI1lII.content = this.random(1000000, 9999999) + "@qq.com";
              break;
            case "6":
              IilI1lII.content = "北京市/北京市/东城区";
              break;
            default:
              this.log("未知字段", IilI1lII.num, IilI1lII.title), IilI1lII.content = "1";
          }
        }
        let I1i1iI1 = await this.v2Api("api/" + this.activityType + "/addInfo", {
          "allInfo": iIiIIi1i
        });
        this.debug(I1i1iI1);
        if (!I1i1iI1 || I1i1iI1.code !== 200) {
          this.putMsg(I1i1iI1?.["message"] || "提交信息失败");
          return;
        }
      }
      let iiIII1li = await this.v2Api("api/" + this.activityType + "/receivePrize");
      this.debug(iiIII1li);
      if (!iiIII1li || iiIII1li.code !== 200) {
        this.putMsg(iiIII1li?.["message"] || "领取奖品失败");
        return;
      }
      this.putMsg(iiIII1li.data?.["prizeName"] || "领取成功");
      await this.writeLongCache();
      return;
    }
    if (this.mode === "jinggeng") {
      await this.setMixNick();
      await this.jinggengShopInfo();
      let Iiil1ill = await this.jinggengApi("postAddMaterial", {
        "detail": JSON.stringify({
          "姓名": this.names[this.random(0, this.names.length - 1)],
          "性别": this.randomArray(["男", "女"], 1)[0],
          "生日": "19" + this.random(60, 99) + "-0" + this.random(1, 9) + "-0" + this.random(1, 9),
          "手机号码": "" + this.phones[this.random(0, this.phones.length - 1)],
          "地区(省市)": "北京市-北京市"
        })
      });
      if (Iiil1ill && Iiil1ill.succ) {
        let liilllil = JSON.parse(Iiil1ill.msg);
        if (liilllil.isSendSucc && liilllil.drawAwardDto) {
          let l1111iiI = liilllil?.["drawAwardDto"]?.["awardName"];
          this.putMsg("" + liilllil?.["drawAwardDto"]?.["awardDenomination"] + l1111iiI);
          await this.writeLongCache();
          if (liilllil?.["drawAwardDto"]?.["awardType"] === "JD_GOODS") {
            this.addressId = liilllil?.["drawAwardDto"]?.["actLogId"];
            this.prizeName = l1111iiI;
            await this.saveAddress();
          }
        }
        return;
      }
      let IIlllI1i = Iiil1ill?.["msg"];
      this.putMsg(IIlllI1i);
      await this.wxStopSync(IIlllI1i);
      return;
    }
    if (["10049"].includes(this.activityType)) {
      await this.login();
      let IiI1iil1 = await this.lzkjApi("api/task/perfectInfo/activity");
      this.debug(IiI1iil1);
      if (!IiI1iil1 || IiI1iil1.resp_code !== 0) {
        this.putMsg(IiI1iil1?.["resp_msg"] || "获取奖品失败");
        await this.wxStopSync(IiI1iil1?.["resp_msg"]);
        return;
      }
      if (IiI1iil1.data?.["flag"] === "002") return this.putMsg("已领取"), await this.writeLongCache();
      let l1l11iii = [IiI1iil1?.["data"]];
      l1l11iii.some(I1l1i1lI => I1l1i1lI?.["prizeName"]?.["includes"]("京豆") && I1l1i1lI?.["beanNum"] >= I1Ii1i.openCardBeanNum) && (this.openCard = true);
      await this.lzkjOpenCardTask();
      l1l11iii = l1l11iii.filter(Ii1l1III => Ii1l1III?.["prizeName"]["includes"]("京豆") || Ii1l1III?.["prizeName"]["includes"]("积分"));
      if (l1l11iii.length === 0) {
        this.putMsg("垃圾或领完");
        this.stop();
        return;
      }
      let i1I1lliI = IiI1iil1.data.allInfo || [];
      for (let i1Il1liI of i1I1lliI) {
        switch (i1Il1liI.num) {
          case "info01":
            i1Il1liI.content = this.names[this.random(0, this.names.length - 1)];
            break;
          case "info02":
            i1Il1liI.content = this.random(2000, 2022) + "年" + this.random(1, 12) + "月" + this.random(1, 27) + "日 ";
            break;
          case "info03":
            i1Il1liI.content = this.phones[this.random(0, this.phones.length - 1)];
            break;
          case "info04":
            i1Il1liI.content = this.randomArray(["男", "女"], 1)[0];
            break;
          default:
            this.log("未知字段", i1Il1liI.num, i1Il1liI.title), i1Il1liI.content = "1";
        }
      }
      let Ii1i1i1I = await this.lzkjApi("api/task/perfectInfo/addInfo", {
        "perfectInfo": i1I1lliI
      });
      this.debug(Ii1i1i1I);
      if (!Ii1i1i1I || Ii1i1i1I.resp_code !== 0) {
        this.putMsg(Ii1i1i1I?.["resp_msg"]);
        await this.wxStopSync(Ii1i1i1I?.["resp_msg"]);
        return;
      }
      await this.lzkjApi("api/task/perfectInfo/activity");
      await this.acquire(IiI1iil1.data.prizeId, true);
      return;
    }
    await this.wxCommonInfo();
    await this.getSimpleActInfoVo();
    this.defenseUrls.length === 0 ? await this.getMyPing() : await this.initPinToken();
    await this.accessLog();
    await this.listDrawContent();
    let lli11ii1 = await this.wxApi("completeInfoActivity/selectById", {
      "activityId": this.activityId,
      "pin": this.secretPin,
      "venderId": this.venderId
    });
    this.debug(lli11ii1);
    if (!lli11ii1 || !lli11ii1.result) {
      let II1lli11 = lli11ii1?.["errorMessage"];
      this.putMsg(II1lli11);
      await this.wxStopSync(II1lli11);
      return;
    }
    let i1llI11 = lli11ii1.data?.["startTime"] || 0,
      iiI11II = lli11ii1.data?.["endTime"] || 0;
    lliii11.activity.startTime = i1llI11;
    lliii11.activity.endTime = iiI11II;
    if (i1llI11 && i1llI11 > this.timestamp()) {
      this.log("活动未开始");
      this.stop();
      return;
    }
    if (iiI11II && iiI11II < this.timestamp()) {
      this.log("活动已结束");
      await this.writeLongCacheByStop();
      this.stop();
      return;
    }
    let IIl1Ii = {};
    for (let IilI111l in lli11ii1.data) {
      if (IilI111l.startsWith("choose") && lli11ii1.data[IilI111l] === "y") {
        let IIiiiil1 = this.firstCharToLowercase(IilI111l?.["replace"]("choose", ""));
        switch (IIiiiil1) {
          case "name":
            IIl1Ii.name = this.names[this.random(0, this.names.length - 1)];
            break;
          case "phone":
            IIl1Ii.phone = this.phones[this.random(0, this.phones.length - 1)];
            break;
          case "weixin":
            IIl1Ii.weiXin = "wx_" + this.randomNum(10);
            break;
          case "qQ":
            IIl1Ii.QQ = this.randomNum(10);
            break;
          case "birth":
            IIl1Ii.birthDay = "19" + this.random(60, 99) + "-0" + this.random(1, 9) + "-0" + this.random(1, 9);
            break;
          case "professional":
            IIl1Ii.professional = this.randomArray(["科学家", "工人", "农民", "白领", "司机"], 1)[0];
            break;
          case "address":
            IIl1Ii.province = "上海市", IIl1Ii.city = "黄浦区", IIl1Ii.address = "未知";
            break;
          case "email":
            IIl1Ii.email = random(1000000, 9999999) + "@qq.com";
            break;
          case "gender":
            IIl1Ii.gender = this.randomArray(["男", "女"], 1)[0];
            break;
          default:
            IIl1Ii[IIiiiil1] = "1";
        }
      }
    }
    if (lli11ii1.data?.["customJson"]) {
      let lIiiI = [];
      for (let li1I1II = 0; li1I1II < JSON.parse(lli11ii1.data.customJson).length; li1I1II++) {
        lIiiI.push("1");
      }
      IIl1Ii.customContent = JSON.stringify(lIiiI);
    }
    IIl1Ii.drawInfoId = this.prizeList[0].drawInfoId;
    IIl1Ii.activityId = this.activityId;
    IIl1Ii.venderId = this.venderId;
    IIl1Ii.pin = this.secretPin;
    IIl1Ii.vcode = "";
    IIl1Ii.token = this.isvToken;
    IIl1Ii.fromType = "APP";
    let IIIilil = await this.wxApi("wx/completeInfoActivity/save", IIl1Ii);
    this.debug(IIIilil);
    if (IIIilil && IIIilil.result) {
      if (IIIilil.data?.["drawOk"]) this.putMsg("领取成功"), await this.writeLongCache();else IIIilil.data === "修改成功" ? (this.putMsg("已领过"), await this.writeLongCache()) : (this.putMsg(IIIilil.data?.["errorMessage"]), await this.wxStopSync(IIIilil.data?.["errorMessage"]));
      return;
    }
    let llIiIili = IIIilil.errorMessage;
    this.putMsg(llIiIili);
    await this.wxStopSync(llIiIili);
  }
}
iI1II1i.activity = {
  "activityUrl": activityUrl
};
iI1II1i.TaskClass = l1il1l1i;
iI1II1i.run({
  "whitelist": ["1-20"],
  "main_thread": 3
});