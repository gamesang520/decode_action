//Tue Aug 06 2024 20:07:52 GMT+0000 (Coordinated Universal Time)
//Base:https://github.com/echo094/decode-js
//Modify:https://github.com/smallfawn/decode_action
if (mode) {
  activityUrl = "https://lzdz1-isv.isvjcloud.com/m/1000282702/dze70dc1d244b18a194dfc8857shop/";
  activityUrl = "https://jinggengjcq-isv.isvjcloud.com/jdbeverage/pages/oC20240401cot/oC20240401cot?actId=8b0ef0c607f34f2ab2a7a5_240401";
  activityUrl = "https://jinggengjcq-isv.isvjcloud.com/jdbeverage/pages/oC20240401cot/oC20240401cot?actId=c903126b617b4d8e943c82baa_240403";
  activityUrl = "https://jinggengjcq-isv.isvjcloud.com/jdbeverage/pages/oC20240401cot/oC20240401cot?actId=0f03b6459c2c4333a1081be5acca7_240410";
  activityUrl = "https://lzdz1-isv.isvjd.com/m/unite/dzlh0001/?activityId=d5412c11d735467abbfba3b3f4b319d7&venderId=1000001933&adSource=TBGFQJD";
  activityUrl = "https://lzdz1-isv.isvjd.com/m/1000001683/dzb08098af8dca4bb28fce9c88b6e4/?adsource=0005";
  activityUrl = "https://lzdz1-isv.isvjd.com/dingzhi/joinCommon/activity/activity?activityId=d5412c11d735467abbfba3b3f4b319d7";
  activityUrl = "https://szxyun-rc.isvjcloud.com/pagec/unionOpenSHR240422/index.html";
  activityUrl = "https://lzdz1-isv.isvjcloud.com/m/unite/dzlh0001?activityId=7940395b691b4611a4eadb59c3c8a4f6&venderId=1000003443&adSource=MJLJDZYGFQJD";
  activityUrl = "https://jinggengjcq-isv.isvjcloud.com/jdbeverage/pages/oC20240410aslw/oC20240410aslw?actId=5f4d63b233744b1_240515";
  activityUrl = "https://jinggengjcq-isv.isvjcloud.com/jdbeverage/pages/oC20240410aslw/oC20240410aslw?actId=42af5f29743f45e_240517";
  activityUrl = "https://jinggengjcq-isv.isvjcloud.com/jdbeverage/pages/oC20240520def/oC20240520def?actId=df5b2fe59b9b453_240520";
  activityUrl = "https://jinggengjcq-isv.isvjcloud.com/jdbeverage/pages/oC2024052402cxc/oC2024052402cxc?actId=0421ccc68d7c41bb_24052402";
}
const {
  RunMode: l1IilII,
  UserMode: il11iiIl,
  baseCommonEnv: l1l11I1l,
  baseCommonEnvKey: iIIiIil
} = require("./bear");
l1l11I1l.inviteNum = parseInt(process.env.B_WX_OPENCARD_INVITE_NUM || 100);
l1l11I1l.leaderNum = parseInt(process.env.B_WX_OPENCARD_LEADER_NUM || 1);
l1l11I1l.viewShop = parseInt(process.env.B_WX_OPENCARD_VIEW_SHOP || 0);
l1l11I1l.addSku = parseInt(process.env.B_WX_OPENCARD_ADD_SKU || 0);
iIIiIil.B_WX_OPENCARD_INVITE_NUM = "inviteNum";
iIIiIil.B_WX_OPENCARD_LEADER_NUM = "leaderNum";
iIIiIil.B_WX_OPENCARD_VIEW_SHOP = "viewShop";
iIIiIil.B_WX_OPENCARD_ADD_SKU = "addSku";
l1IilII.envInfo = {
  "name": "通用开卡beta",
  "runName": "jd_wx_opencard",
  "version": "2.0.2"
};
class I1IiiIil extends il11iiIl {
  constructor(ilIIiil1, liIIIiil) {
    super(ilIIiil1, liIIIiil);
    this.pinImg = "https://img10.360buyimg.com/imgzone/jfs/t1/21383/2/6633/3879/5c5138d8E0967ccf2/91da57c5e2166005.jpg";
    this.viewShop = true;
  }
  async ["writeLongCache"]() {
    this.writeFileSyncByLock("cache", this.activityId, this.pin);
  }
  async ["checkOpenCard"](ii1II1II = false) {
    this.debug({
      "activityId": this.activityId,
      "pin": this.secretPin,
      "actorUuid": this.shareUuid,
      "shareUuid": this.toHelpUser?.["shareUuid"] || ""
    });
    let i1iI1lI = await this.wxApi("dingzhi/shop/league/checkOpenCard", {
      "activityId": this.activityId,
      "pin": this.secretPin,
      "actorUuid": this.shareUuid,
      "shareUuid": this.toHelpUser?.["shareUuid"] || ""
    });
    this.debug(i1iI1lI);
    if (!i1iI1lI || !i1iI1lI.result) {
      this.putMsg(i1iI1lI?.["errorMessage"]);
      this.wxStop(i1iI1lI?.["errorMessage"]);
      return;
    }
    let iIilili = i1iI1lI.data.allOpenCard,
      IIll1iil = i1iI1lI.data.assistStatus,
      II1lIlIi = i1iI1lI.data.sendBeanNum;
    this.debug("----", II1lIlIi);
    if (iIilili) {
      this.log("已完成全部开卡");
    }
    if (this.toHelpUser?.["shareUuid"] && ii1II1II) switch (IIll1iil) {
      case 0:
        break;
      case 1:
        this.toHelpUser.helpedCount++, this.toHelpUser.helpedCount >= il11iiIl.activity.maxHelpCount && (this.toHelpUser.needHelp = false), this.log("助力成功，已邀请" + this.toHelpUser.helpedCount + "人");
        break;
      case 2:
        this.log("您已经为该好友助力过了！");
        break;
      case 3:
        this.log("您已经为其他好友助力过了！");
        break;
      case 11:
        this.log("今日助力次数已达上限，无法继续为他助力！");
        break;
      case 12:
        this.log("您活动期间助力次数已达上限，无法继续助力！");
        break;
      case 21:
        this.log("您还不是会员，无法为好友助力！");
        break;
      case 22:
        this.log("需要关注店铺及成为全部品牌会员并且有新会员，才能助力成功哦~");
        break;
      case 88:
        this.log("需要关注店铺及成为全部品牌会员并且有新会员，才能助力成功哦~");
        break;
      case 66:
        break;
      case 99:
        switch (i1iI1lI.shareType) {
          case 2:
            this.log("您需要完成全部开卡才能为好友助力");
            break;
          case 5:
            this.log("您需要完成任意一组开卡，并关注店铺才能为好友助力");
            break;
          case 6:
            this.log("您的好友邀请您为TA助力，您关注店铺和品牌全部开卡后，即为好友助力成功");
            break;
          default:
            break;
        }
        break;
    }
    return i1iI1lI.data.cardList.filter(l1lIIilI => !l1lIIilI.status);
  }
  async ["assist"](lI11iIii = false) {
    let Ii1Ilil1 = await this.wxApi("dingzhi/joinCommon/assist", {
      "activityId": this.activityId,
      "pin": this.secretPin,
      "uuid": this.shareUuid,
      "shareUuid": this.toHelpUser?.["shareUuid"] || ""
    });
    this.debug(Ii1Ilil1);
    let iiiil1I1 = Ii1Ilil1?.["data"]?.["assistState"],
      lI1I1lI = Ii1Ilil1?.["data"]?.["openCardInfo"]?.["openAll"];
    lI1I1lI && this.log("已完成全部开卡");
    if (this.toHelpUser?.["shareUuid"]) switch (iiiil1I1) {
      case 0:
        this.log("无法助力自己");
        break;
      case 1:
        this.toHelpUser.helpedCount++, this.toHelpUser.helpedCount >= il11iiIl.activity.maxHelpCount && (this.toHelpUser.needHelp = false), this.log("助力成功，已邀请" + this.toHelpUser.helpedCount + "人");
        break;
      case 2:
        this.log("已经助力过了");
        break;
      case 3:
        this.log("没有助力次数了");
        break;
      case 10:
        this.log("您已为好友助力过了哦");
        break;
      case 11:
        this.log("您已成功为好友助力了，不能再为其他好友助力了");
        break;
      case 20:
        this.log("您需注册会员,才能为好友助力！");
        break;
      case 21:
        this.log("您需注册会员并关注店铺,才能为好友助力！");
        break;
      case 22:
        this.log("您需注关注店铺,才能为好友助力！");
        break;
      case 77:
        this.log("未全部开卡和关注，不能助力");
        break;
      case 78:
        this.log("已经是老会员，不能助力");
        break;
      default:
        this.log("未知状态");
        break;
    }
    return Ii1Ilil1.data?.["openCardInfo"]["openVenderId"] || [];
  }
  async ["getActivityContent"]() {
    let ll1iIi1I = "";
    if (this.domain.includes("lzdz-isv")) {
      let iliIIIil = await this.wxApi("dingzhi/taskact/common/init", {
        "activityId": this.activityId,
        "dzActivityType": 0,
        "pin": "",
        "adSource": ""
      });
      if (!iliIIIil || !iliIIIil.result) {
        this.putMsg(iliIIIil?.["errorMessage"]);
        this.wxStop(iliIIIil?.["errorMessage"]);
        return;
      }
      let l1ll1iIl = iliIIIil?.["data"]?.["startTime"],
        IlIIIIl1 = iliIIIil?.["data"]?.["endTime"];
      if (l1ll1iIl && this.timestamp() < l1ll1iIl) {
        this.putMsg("活动未开始");
        this.stop();
        return;
      }
      if (IlIIIIl1 && this.timestamp() > IlIIIIl1) {
        this.putMsg("活动已结束");
        this.stop();
        return;
      }
      ll1iIi1I = await this.wxApi("dingzhi/uinion/plus2505/activityContent", {
        "activityId": this.activityId,
        "nick": this.nickname,
        "pinImg": this.pinImg,
        "pin": this.secretPin,
        "shareUuid": this.toHelpUser?.["shareUuid"] || ""
      });
      let IIlI1lIi = ll1iIi1I?.["data"]?.["vipPrize"] ?? [];
      if (IIlI1lIi.length > 0) {
        let l1liil11 = [];
        for (let Ill11lii of IIlI1lIi) {
          let {
            bean = 0,
            score = 0
          } = Ill11lii;
          if (bean) l1liil11.push(bean + "京豆");
          if (score) l1liil11.push(score + "金币");
        }
        this.log("获得入会奖励:" + l1liil11.join(","));
      }
    } else {
      if (this.activityUrl.includes("/m/unite/") || this.activityUrl.includes("joinCommon")) {
        let ilIIliII = await this.wxApi("dingzhi/taskact/common/init", {
          "activityId": this.activityId,
          "dzActivityType": 1,
          "pin": ""
        });
        this.debug(ilIIliII);
        if (!ilIIliII || !ilIIliII.result) {
          this.putMsg(ilIIliII?.["errorMessage"]);
          this.wxStop(ilIIliII?.["errorMessage"]);
          return;
        }
        let Ilililil = ilIIliII?.["data"]?.["startTime"],
          illIIii1 = ilIIliII?.["data"]?.["endTime"];
        if (Ilililil && this.timestamp() < Ilililil) {
          this.putMsg("活动未开始");
          this.stop();
          return;
        }
        if (illIIii1 && this.timestamp() > illIIii1) {
          this.putMsg("活动已结束");
          this.stop();
          return;
        }
        ll1iIi1I = await this.wxApi("dingzhi/joinCommon/activityContent", {
          "activityId": this.activityId,
          "nick": this.nickname,
          "pinImg": this.pinImg,
          "pin": this.secretPin,
          "shareUuid": this.toHelpUser?.["shareUuid"] || ""
        });
        this.debug(ll1iIi1I);
      } else this.activityUrl.includes("shop") ? (ll1iIi1I = await this.wxApi("dingzhi/shop/league/activityContent", {
        "activityId": this.activityId,
        "nick": this.nickname,
        "pinImg": this.pinImg,
        "pin": this.secretPin,
        "shareUuid": this.toHelpUser?.["shareUuid"] || ""
      }), this.debug(ll1iIi1I)) : (await this.getOpenCardPath(), this.debug("dingzhi/" + this.pathType + "/union/activityContent"), ll1iIi1I = await this.wxApi("dingzhi/" + this.pathType + "/union/activityContent", {
        "activityId": this.activityId,
        "nick": this.nickname,
        "pinImg": this.pinImg,
        "pin": this.secretPin,
        "shareUuid": this.toHelpUser?.["shareUuid"] || ""
      }));
    }
    return ll1iIi1I;
  }
  async ["getOpenCardPath"]() {
    if (il11iiIl.activity.pathType) return this.pathType = il11iiIl.activity.pathType;
    let iiIii1Il = await this.taskGet(this.activityUrl);
    const liIIillI = this.textToHtml(iiIii1Il);
    let iilill1i = "";
    liIIillI("script[src]").each((i1Iii1I1, i1I1lli1) => {
      const iiIl1Ii = liIIillI(i1I1lli1).attr("src");
      let i1i1II1l = iiIl1Ii.match(/\/\/.*\/js\/index\.\w+\.js/);
      i1i1II1l && i1i1II1l.length > 0 && (iilill1i = i1i1II1l[0]);
    });
    let ll1IllII = await this.request({
        "url": "https:" + iilill1i
      }),
      Iiiiili1 = ll1IllII?.["data"]?.["match"](/dingzhi\/([a-zA-Z]+)\/union\/saveTask/);
    if (Iiiiili1 && Iiiiili1.length > 1) {
      il11iiIl.activity.pathType = Iiiiili1[1];
      this.pathType = Iiiiili1[1];
      return;
    }
    return this.log("未匹配到路径"), this.stop();
  }
  async ["initOpenCard"](l1iilIi1 = false) {
    let lliI11II = await this.wxApi("dingzhi/" + this.pathType + "/union/initOpenCard", {
      "activityId": this.activityId,
      "pin": this.secretPin,
      "actorUuid": this.shareUuid,
      "shareUuid": this.toHelpUser?.["shareUuid"] || ""
    });
    this.debug(lliI11II);
    let Il11lill = lliI11II?.["data"]?.["allOpenCard"],
      lliiII1i = lliI11II?.["data"]?.["assistStatus"],
      Illl1liI = lliI11II?.["data"]?.["openCardBeans"];
    Illl1liI > 0 && this.log("开卡获得京豆: " + Illl1liI);
    Il11lill && this.log("已完成全部开卡");
    if (this.toHelpUser?.["shareUuid"]) {
      switch (lliiII1i) {
        case 0:
          this.log("无法助力自己");
          break;
        case 1:
          this.toHelpUser.helpedCount++, this.toHelpUser.helpedCount >= il11iiIl.activity.maxHelpCount && (this.toHelpUser.needHelp = false), this.log("助力成功，已邀请" + this.toHelpUser.helpedCount + "人");
          break;
        case 2:
          this.log("已经助力过了");
          break;
        case 3:
          this.log("没有助力次数了");
          break;
        case 10:
          this.log("您已为好友助力过了哦");
          break;
        case 11:
          this.log("您已成功为好友助力了，不能再为其他好友助力了");
          break;
        case 20:
          this.log("您需注册会员,才能为好友助力！");
          break;
        case 21:
          this.log("您需注册会员并关注店铺,才能为好友助力！");
          break;
        case 22:
          this.log("您需注关注店铺,才能为好友助力！");
          break;
        case 77:
          this.log("未全部开卡和关注，不能助力");
          break;
        case 78:
          this.log("已经是老会员，不能助力");
          break;
        default:
          this.log("未知状态");
          break;
      }
    }
    return lliI11II?.["data"]?.["openInfo"] || [];
  }
  async ["task"]() {
    if (this.domain.includes("lzdz-isv")) {
      let ll11i1lI = this.activityContent.data.vipList ?? [],
        lIIil1ii = this.activityContent.data.venderList?.["filter"](IilliiI1 => !ll11i1lI.includes(IilliiI1.venderId));
      if (lIIil1ii.length === 0) return this.log("已全部开卡");
      for (let IIiilII1 of lIIil1ii) {
        await this.bindWithVender(IIiilII1.venderId || IIiilII1.shopId);
        await this.sleep(500, 1000);
      }
      await this.getActivityContent();
      return;
    }
    if (this.activityUrl.includes("shop")) {
      for (let i1ll1li1 in this.activityContent.data) {
        if (this.activityContent.data[i1ll1li1]?.["allStatus"]) continue;
        switch (i1ll1li1) {
          case "followShop":
            await this.wxApi("dingzhi/shop/league/saveTask", {
              "activityId": this.activityId,
              "pin": this.secretPin,
              "actorUuid": this.shareUuid,
              "taskType": 1,
              "taskValue": 1,
              "shareUuid": this.toHelpUser?.["shareUuid"] || ""
            });
            break;
          case "addSku":
            await this.wxApi("dingzhi/shop/league/saveTask", {
              "activityId": this.activityId,
              "pin": this.secretPin,
              "actorUuid": this.shareUuid,
              "taskType": 2,
              "taskValue": 2,
              "shareUuid": this.toHelpUser?.["shareUuid"] || ""
            });
            break;
          case "mainActive":
            break;
        }
      }
      let iliIlll = await this.checkOpenCard();
      for (let lIlIll1l of iliIlll) {
        await this.bindWithVender(lIlIll1l.value || lIlIll1l.value2);
        await this.sleep(500, 1000);
      }
      iliIlll?.["length"] > 0 && (await this.checkOpenCard(true));
    } else {
      if (this.activityUrl.includes("/m/unite/") || this.activityUrl.includes("joinCommon")) {
        let ii11l1ii = await this.wxApi("dingzhi/joinCommon/taskInfo", {
            "activityId": this.activityId,
            "pin": this.secretPin,
            "uuid": this.shareUuid,
            "shareUuid": this.toHelpUser?.["shareUuid"] || ""
          }),
          lIIi11II = await this.wxApi("dingzhi/joinCommon/taskRecord", {
            "activityId": this.activityId,
            "pin": this.secretPin,
            "uuid": this.shareUuid,
            "shareUuid": this.toHelpUser?.["shareUuid"] || "",
            "taskType": ""
          });
        this.debug(lIIi11II);
        for (let liiliilI in lIIi11II?.["data"] || {}) {
          if (liiliilI === "1") continue;
          if (lIIi11II.data[liiliilI]?.["recordCount"] > 0) continue;
          if (["20", "23", "24"].includes(liiliilI)) {
            let iii1ll11 = await this.wxApi("dingzhi/joinCommon/doTask", {
              "activityId": this.activityId,
              "pin": this.secretPin,
              "uuid": this.shareUuid,
              "shareUuid": this.toHelpUser?.["shareUuid"] || "",
              "taskType": liiliilI,
              "taskValue": ""
            });
            this.debug(iii1ll11);
          }
        }
        let IlIIIlIl = ii11l1ii?.["data"]?.[1]?.["settingInfo"]["map"](liiIliI => parseInt(liiIliI.value)) || [],
          l1lllilI = (await this.assist()).map(lii1ilii => parseInt(lii1ilii));
        IlIIIlIl = this.different(IlIIIlIl, l1lllilI);
        for (let iiil1111 of IlIIIlIl) {
          await this.bindWithVender(iiil1111);
          await this.sleep(50, 500);
        }
        IlIIIlIl?.["length"] > 0 && (await this.assist(true));
      } else {
        let I1I1iliI = await this.initOpenCard();
        for (let I1IlIi of I1I1iliI) {
          !I1IlIi?.["followShopStatus"] && (await this.wxApi("dingzhi/" + this.pathType + "/union/saveTask", {
            "activityId": this.activityId,
            "pin": this.secretPin,
            "actorUuid": this.shareUuid,
            "taskType": 1,
            "taskValue": I1IlIi.venderId,
            "shareUuid": this.toHelpUser?.["shareUuid"] || ""
          }));
          !I1IlIi?.["openStatus"] && (await this.bindWithVender(I1IlIi.venderId));
        }
        I1I1iliI?.["length"] > 0 && (await this.initOpenCard(true));
      }
    }
  }
  ["mpdzSign"](i11l1lii) {
    let lI111i1l = "6cc5dbd8900e434b94c4bdb0c16348ed",
      I11iIIII = "c1614da9ac68",
      l1lIiIii = this.timestamp(),
      l11Ii1iI = "f" + I11iIIII + "D" + JSON.stringify(i11l1lii) + "c" + l1lIiIii + lI111i1l,
      lli1II = this.md5(l11Ii1iI.toLowerCase());
    return {
      "sign": lli1II,
      "timeStamp": l1lIiIii
    };
  }
  ["jgcqdm"](I1lIIIi, Il1lIill) {
    let I11ili11 = {
        "actId": this.activityId,
        ...Il1lIill,
        "method": I1lIIIi.replace("dm/front", ""),
        "userId": this.userId,
        "buyerNick": this.buyerNick || ""
      },
      IlII1Ill = this.mpdzSign(I11ili11);
    return {
      "jsonRpc": "2.0",
      "params": {
        "commonParameter": {
          "m": "POST",
          "oba": IlII1Ill.sign,
          "timestamp": IlII1Ill.timeStamp,
          "userId": this.userId
        },
        "admJson": I11ili11
      }
    };
  }
  async ["mpdzTask"](I1IIIlIl, Iliii11I = {}) {
    let lIllIil = I1IIIlIl.replace("dm/front", "").replace("//", "/");
    return await this.taskPostByJson(I1IIIlIl + "?open_id=&mix_nick=" + (this.buyerNick ?? "") + "&user_id=10299171", this.jgcqdm(lIllIil, Iliii11I));
  }
  async ["load"]() {
    let IIll1Ill = await this.mpdzTask("dm/front/jdJoinCardtf/activity/load", {
      "jdToken": this.isvToken,
      "source": "01",
      "inviteNick": this.toHelpUser?.["buyerNick"] || ""
    });
    this.debug(IIll1Ill);
    if (!IIll1Ill || !IIll1Ill.success || IIll1Ill.data.status !== 200) return this.putMsg(IIll1Ill?.["errorMessage"]), this.wxStop(IIll1Ill?.["errorMessage"]), this.index === 0 && this.stop(), this.exit();
    this.buyerNick = IIll1Ill.data.data.missionCustomer.buyerNick;
    if (!this.buyerNick) {
      return this.index === 0 && (this.putMsg("无法获取到buyerNick"), this.stop()), this.log("黑号，跳过"), this.exit();
    }
    let lIliiiil = IIll1Ill.data.data.cusActivity.startTime,
      lli11lI1 = IIll1Ill.data.data.cusActivity.endTime;
    if (lIliiiil && this.timestamp() < lIliiiil) {
      this.putMsg("活动未开始");
      this.stop();
      return;
    }
    if (lli11lI1 && this.timestamp() > lli11lI1) {
      this.putMsg("活动已结束");
      this.stop();
      return;
    }
    !this.isInviter && l1l11I1l.viewShop !== 1 && l1l11I1l.addSku !== 1 && (await this.inviteRelation());
    if (IIll1Ill.data.data?.["missionCustomer"]?.["hasAddCart"] === 0 && l1l11I1l.viewShop !== 1 && l1l11I1l.addSku === 1) {
      let l1Illlii = await this.mpdzTask("dm/front/jdJoinCardtf/mission/completeMission", {
        "missionType": "uniteAddCart"
      });
      this.log(l1Illlii?.["data"]?.["data"]?.["remark"] || l1Illlii.errorMessage || "已完成加购任务");
    }
    if (IIll1Ill.data?.["data"]?.["missionCustomer"]?.["hasCollectShop"] === 0 && l1l11I1l.viewShop !== 1) {
      let li1Iili1 = await this.mpdzTask("dm/front/jdJoinCardtf/mission/completeMission", {
        "missionType": "uniteCollectShop"
      });
      this.log(li1Iili1?.["data"]?.["data"]?.["remark"] || li1Iili1.errorMessage || "已完成关注店铺任务");
    }
    let lil1llIi = await this.mpdzTask("dm/front/jdJoinCardtf/shop/shopList");
    this.debug(lil1llIi);
    let i111iII = lil1llIi?.["data"]?.["data"] || [];
    if (l1l11I1l.viewShop === 1 || l1l11I1l.viewShop === 2) {
      for (let iill1II of i111iII) {
        let lIlll1il = await this.mpdzTask("dm/front/jdJoinCardtf/mission/completeMission", {
          "missionType": "viewShop",
          "goodsNumId": iill1II.userId
        });
        this.log(lIlll1il?.["data"]?.["data"]?.["remark"] || lIlll1il.errorMessage);
        await this.sleep(800, 1200);
      }
    }
    if (l1l11I1l.viewShop === 1 || l1l11I1l.addSku === 1) return;
    i111iII = lil1llIi?.["data"]?.["data"]?.["filter"](IlIl1I1l => !IlIl1I1l.open) || [];
    for (let l1Iii1il of i111iII) {
      let iiii1Iil = await this.mpdzTask("dm/front/jdJoinCardtf/mission/completeMission", {
        "missionType": "openCard",
        "shopId": l1Iii1il.userId
      });
      this.log(iiii1Iil?.["data"]?.["data"]?.["remark"] || iiii1Iil.errorMessage);
      let iIi1iil1 = this.getQueryString(l1Iii1il?.["openCardUrl"] || "", "venderId") || l1Iii1il.userId || l1Iii1il.shopId;
      await this.bindWithVender(iIi1iil1);
      if (this.canNotOpenCard) this.log("不能开卡", iIi1iil1), this.exit();
      await this.sleep(500, 1000);
      await await this.mpdzTask("dm/front/jdJoinCardtf/activity/load", {
        "jdToken": this.isvToken,
        "source": "01",
        "inviteNick": this.toHelpUser?.["buyerNick"] || "",
        "shopId": l1Iii1il.userId
      });
    }
  }
  async ["inviteRelation"]() {
    let I1iiIII = {
        "inviterNick": this.toHelpUser?.["buyerNick"] || ""
      },
      liiiIlI1 = this.jgcqdm("/jdJoinCardtf/customer/inviteRelation", I1iiIII),
      liiilIII = await this.taskPostByJson("dm/front/jdJoinCardtf/customer/inviteRelation?open_id=&mix_nick=" + (this.buyerNick ?? "") + "&user_id=10299171", liiiIlI1);
    this.debug(liiilIII);
    if (!liiilIII || !liiilIII.success || liiilIII.data.status !== 200) return this.putMsg(liiilIII?.["errorMessage"]), this.wxStop(liiilIII?.["errorMessage"]), this.exit();
    this.log(liiilIII.data.msg || "绑定邀请成功");
    this.toHelpUser.helpedCount++;
    this.toHelpUser.helpedCount >= il11iiIl.activity.maxHelpCount && (this.toHelpUser.needHelp = false);
  }
  async ["getszxyunActid"]() {
    if (il11iiIl.activity.activityId) return this.activityId = il11iiIl.activity.activityId;
    let Iililiii = await this.taskGet(this.activityUrl);
    const l1illiI1 = this.textToHtml(Iililiii);
    let ll1llIi = "";
    l1illiI1("script[src]").each((lli1l1lI, illlllI) => {
      const iIII1II = l1illiI1(illlllI).attr("src");
      let iIlIllll = iIII1II.match(/\/\/.*\/js\/app\.\w+\.js/);
      iIlIllll && iIlIllll.length > 0 && (ll1llIi = iIlIllll[0]);
    });
    let lIllI1 = await this.request({
        "url": "https:" + ll1llIi
      }),
      ilIll1iI = lIllI1?.["data"]?.["match"](/unionOpen\w*\"/g);
    if (ilIll1iI && ilIll1iI.length > 0) {
      let ilillIl1 = ilIll1iI[0].replace("\"", "");
      il11iiIl.activity.activityId = ilillIl1;
      this.activityId = ilillIl1;
      return;
    }
    return this.putMsg("未匹配到活动id"), this.stop();
  }
  async ["szxyunLogin"]() {
    let i1IiI1Il = await this.taskPostByJson("webc/login/userLogin", {
      "shopId": "1000100710",
      "token": this.isvToken,
      "source": "01"
    });
    if (!i1IiI1Il || i1IiI1Il.code !== "200") {
      return this.putMsg(i1IiI1Il.message || "登录失败"), this.wxStop(i1IiI1Il.message || "登录失败"), this.exit();
    }
    this.otherHeaders = {
      "jd-fast-token": i1IiI1Il.data
    };
  }
  async ["active"](ill1liiI = false) {
    let iiili11i = await this.taskPostByJson("webc/unionOpen/active", {
      "activeId": this.activityId,
      "shareId": null
    });
    this.debug(iiili11i);
    if (!iiili11i || iiili11i.code !== "200") {
      return this.putMsg(iiili11i.message || "获取活动详情失败"), this.wxStop(iiili11i.message || "获取活动详情失败"), this.exit();
    }
    if (ill1liiI) {
      iiili11i.data?.["showBeanList"] && iiili11i.data?.["showBeanList"]["length"] > 0 && this.log("获得:", iiili11i.data?.["showBeanList"][0]?.["sendNum"] + "京豆");
      return;
    }
    this.shareUuid = iiili11i.data?.["userVO"]?.["joinId"];
    this.helpedCount = iiili11i.data?.["userVO"]?.["points"];
    this.log("助力码: " + this.shareUuid);
    this.log("已邀请: " + this.helpedCount);
    if (this.isInviter) il11iiIl.activity.maxHelpCount = l1l11I1l.inviteNum;
    let l1iIiI1i = iiili11i.data?.["bindCardInfo"] ?? [];
    l1iIiI1i = l1iIiI1i.filter(I1lI1i11 => !I1lI1i11.isBindCard);
    for (let iIili11i of l1iIiI1i) {
      let liIlilI1 = this.getQueryString(iIili11i?.["openUrl"] || "", "venderId") ?? iIili11i?.["shopId"];
      await this.bindWithVender(liIlilI1);
      await this.sleep(50, 500);
    }
    l1iIiI1i?.["length"] > 0 && (await this.active(true));
  }
  async ["szyunShare"]() {
    let ili1i = await this.taskPostByJson("webc/unionOpen/share", {
      "activeId": this.activityId,
      "joinId": this.shareUuid || "",
      "shareId": this.toHelpUser?.["shareUuid"] || ""
    });
    this.debug(ili1i);
    if (!ili1i || ili1i.code !== "200") return this.putMsg(ili1i.message || "助力失败"), this.wxStop(ili1i.message || "助力失败"), this.exit();
    let li1lIIiI = ili1i.data?.["helpStatus"];
    switch (li1lIIiI) {
      case 1:
        this.toHelpUser.helpedCount++, this.toHelpUser.helpedCount >= il11iiIl.activity.maxHelpCount && (this.toHelpUser.needHelp = false), this.log("助力成功，已邀请" + this.toHelpUser.helpedCount + "人");
        break;
      case 2:
        this.log("已经助力过了");
        break;
      case 3:
        this.log("已为他人助力");
        break;
      case 4:
        this.log("发起人助力到达限制");
        break;
      case 5:
        this.log("发起人助力数达到上限");
        break;
      default:
        this.log("未知状态", li1lIIiI);
        break;
    }
  }
  async ["inviteTask"](l11llII1) {
    this.toHelpUser = l11llII1;
    if (!this.toHelpUser.needHelp) {
      return;
    }
    await this.isvObfuscator();
    if (this.activityUrl.includes("szxyun")) {
      await this.getszxyunActid();
      await this.szxyunLogin();
      this.debug(this.otherHeaders);
      await this.active();
      await this.szyunShare();
      return;
    }
    if (this.activityUrl.includes("jinggengjcq")) {
      this.activityId = this.getQueryString(this.activityUrl, "actId");
      this.userId = "10299171";
      await this.load();
      return;
    }
    if (this.domain.includes("lzdz-isv")) await this.taskGet("/wxCommonInfo/token"), this.venderId = this.activityUrl.match(/\/m\/(\d+)/)[1], this.activityId = this.activityUrl.match(/\/(\d+)$/)[1];else {
      await this.wxCommonInfo();
      await this.getSimpleActInfoVo("dz/common/getSimpleActInfoVo");
    }
    if (this.activityUrl.includes("joinCommon")) {
      await this.getMyPing();
    } else {
      await this.getMyPing("customer/getMyCidPing");
    }
    await this.accessLog();
    let Iilili1i = await this.getActivityContent();
    if (!Iilili1i || !Iilili1i.result) {
      return this.putMsg(Iilili1i?.["errorMessage"]), this.wxStop(Iilili1i?.["errorMessage"]), this.exit();
    }
    this.activityContent = Iilili1i;
    let iiIiilii = Iilili1i?.["data"]?.["actorUuid"] || Iilili1i?.["data"]?.["actorInfo"]?.["uuid"];
    this.shareUuid = iiIiilii;
    await this.task();
  }
  async ["userTask"]() {
    if (this.index >= l1l11I1l.leaderNum && l1l11I1l.viewShop !== 1) return this.stop();
    await this.isvObfuscator();
    if (this.activityUrl.includes("szxyun")) {
      await this.getszxyunActid();
      this.debug("activityId:", this.activityId);
      await this.szxyunLogin();
      this.debug(this.otherHeaders);
      await this.active();
      return;
    }
    if (this.activityUrl.includes("jinggengjcq")) {
      this.activityId = this.getQueryString(this.activityUrl, "actId");
      this.userId = "10299171";
      await this.load();
      if (l1l11I1l.viewShop === 1) this.needHelp = false;
      il11iiIl.activity.maxHelpCount = l1l11I1l.inviteNum;
      this.helpedCount = 0;
      return;
    }
    if (this.domain.includes("lzdz-isv")) await this.taskGet("/wxCommonInfo/token"), this.venderId = this.activityUrl.match(/\/m\/(\d+)/)[1], this.activityId = this.activityUrl.match(/\/(\d+)$/)[1];else {
      await this.wxCommonInfo();
      await this.getSimpleActInfoVo("dz/common/getSimpleActInfoVo");
    }
    this.activityUrl.includes("joinCommon") ? await this.getMyPing() : await this.getMyPing("customer/getMyCidPing");
    await this.accessLog();
    let iill1I1i = await this.getActivityContent();
    if (!iill1I1i || !iill1I1i.result) return this.putMsg(iill1I1i?.["errorMessage"]), this.wxStop(iill1I1i?.["errorMessage"]), this.exit();
    let iI1Ili1 = iill1I1i?.["data"]?.["startTime"],
      IiIl111 = iill1I1i?.["data"]?.["endTime"];
    if (iI1Ili1 && this.timestamp() < iI1Ili1) {
      this.putMsg("活动未开始");
      this.stop();
      return;
    }
    if (IiIl111 && this.timestamp() > IiIl111) {
      this.putMsg("活动已结束");
      this.stop();
      return;
    }
    let l1iilIlI = iill1I1i?.["data"]?.["actorUuid"] || iill1I1i?.["data"]?.["actorInfo"]?.["uuid"] || iill1I1i?.["data"]?.["userInfo"]?.["uid"];
    this.shareUuid = l1iilIlI;
    this.helpedCount = 0;
    il11iiIl.activity.maxHelpCount = l1l11I1l.inviteNum;
    this.log("助力码: " + l1iilIlI);
    this.activityContent = iill1I1i;
    await this.task();
  }
}
l1IilII.activity = {
  "activityUrl": activityUrl
};
l1IilII.TaskClass = I1IiiIil;
l1IilII.run({
  "whitelist": ["1-20"],
  "main_thread": 3,
  "thread": 10,
  "inviteTask": true,
  "noPush": true
});