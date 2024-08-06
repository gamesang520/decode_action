//Tue Aug 06 2024 20:28:26 GMT+0000 (Coordinated Universal Time)
//Base:https://github.com/echo094/decode-js
//Modify:https://github.com/smallfawn/decode_action
if (mode) {
  activityUrl = "https://lzkj-isv.isvjd.com/wxCartKoi/cartkoi/activity/361487a1d9704d178f77ea631279550f?activityId=361487a1d9704d178f77ea631279550f";
  activityUrl = "https://lzkj-isv.isvjd.com/wxCartKoi/cartkoi/activity/10f3ef3be1414b36b9b566f7ce381372?activityId=10f3ef3be1414b36b9b566f7ce381372&adsource=tg_storePage";
  activityUrl = "https://lzkj-isv.isvjcloud.com/wxCartKoi/cartkoi/activity/501953175faa4e09913847657eb81681?activityId=501953175faa4e09913847657eb81681";
  activityUrl = "https://lzkj-isv.isvjcloud.com/prod/cc/interactsaas/index?activityType=10036&templateId=2021070590900gwcjl081&activityId=1722164785163591681&nodeId=101001&prd=cjwx";
  activityUrl = "https://lzkj-isv.isvjcloud.com/prod/cc/interactsaas/index?activityType=10036&templateId=2021070590900gwcjl081&activityId=1724309552314191873&nodeId=101001&prd=cjwx";
  activityUrl = "https://lzkj-isv.isvjcloud.com/prod/cc/interactsaas/index?activityType=10036&activityId=1723332057093693441&templateId=2021070590900gwcjl081&nodeId=101001&prd=cjwx";
  activityUrl = "https://lzkjdz-isv.isvjd.com/wxCartKoi/cartkoi/activity/07841bc39b0a4226b26f9d03535e9ab1?activityId=07841bc39b0a4226b26f9d03535e9ab1";
  activityUrl = "https://lzkj-isv.isvjd.com/wxCartKoi/cartkoi/activity?activityId=cc5ab0a00ccc48a288874549709db392";
  activityUrl = "https://lzkj-isv.isvjcloud.com/prod/cc/interactsaas/index?activityType=10036&templateId=2021070590900gwcjl081&activityId=1715308876757774338&nodeId=101001&prd=cjwx";
  activityUrl = "https://lzkj-isv.isvjcloud.com/prod/cc/interactsaas/index?activityType=10036&activityId=1727254167809003522&templateId=2021070590900gwcjl081&nodeId=101001&prd=cjwx";
  activityUrl = "https://lzkj-isv.isvjcloud.com/prod/cc/interactsaas/index?activityType=10036&templateId=2021070590900gwcjl081&activityId=1727246016674234370&nodeId=101001&prd=cjwx";
  activityUrl = "https://lzkj-isv.isvjcloud.com/prod/cc/interaction/v1/index?activityType=10036&templateId=2021070590900gwcjl08&activityId=1731494042823737346&nodeId=101001&prd=crm";
  activityUrl = "https://lzkj-isv.isvjcloud.com/prod/cc/interactsaas/index?activityType=10036&templateId=2023121110036gwcjl01&activityId=1740321245336375298&nodeId=101001&prd=cjwx";
  activityUrl = "https://lzkj-isv.isvjcloud.com/prod/cc/interactsaas/index?activityType=10036&templateId=20210518190900rlqd011&activityId=1744276235708506114&prd=cjwx";
}
const {
  RunMode: lIi1I11,
  UserMode: IIiIi1li,
  baseCommonEnv: lI1i11I,
  baseCommonEnvKey: i1Il1Iii
} = require("./bear");
lI1i11I.openCardBeanNum = parseInt(process.env.B_WX_CARTKOI_MODE || 3);
i1Il1Iii.B_WX_CARTKOI_MODE = "openCardBeanNum";
lIi1I11.envInfo = {
  "name": "购物车锦鲤beta",
  "runName": "jd_wx_cartKoi",
  "version": "2.0.0"
};
class i11llii extends IIiIi1li {
  constructor(IiI1iIil, llll1lII) {
    super(IiI1iIil, llll1lII);
    this.oneClickPurchase = 0;
  }
  async ["getDrawPrizeInfo"]() {
    let I1i1lli1 = [];
    if (lI1i11I.openCardBeanNum === 1) {
      I1i1lli1.push(6);
    } else {
      if (lI1i11I.openCardBeanNum === 2) {
        I1i1lli1.push(7);
      } else lI1i11I.openCardBeanNum === 3 && I1i1lli1.push(6, 7);
    }
    if (I1i1lli1.length === 0) {
      this.openCard = true;
      return;
    }
    let lIIlI1iI = await this.wxApi("wxCartKoi/cartkoi/getDrawPrizeInfo", {
      "activityId": this.activityId
    });
    if (lIIlI1iI && lIIlI1iI.data) {
      let iII1Ii1 = lIIlI1iI.data ?? [];
      if (iII1Ii1.some(iliIiI11 => I1i1lli1.includes(iliIiI11.type))) {
        this.openCard = true;
      }
    }
  }
  async ["addCart"]() {
    let liI1lliI = await this.wxApi("wxCartKoi/cartkoi/addCart", {
      "activityId": this.activityId,
      "pin": this.secretPin,
      "productId": this.prodectVos[0].productId
    });
    this.debug(liI1lliI);
    if (liI1lliI && liI1lliI.result) {
      this.putMsg("加购完成");
      return;
    }
    let iiI1iiIl = liI1lliI?.["errorMessage"] || "加购失败";
    this.putMsg(iiI1iiIl);
    this.wxStop(iiI1iiIl);
  }
  async ["quickAddCart"](llIIIiI = true) {
    let ll1iilIl = await this.wxApi("wxCartKoi/cartkoi/quickAddCart", {
      "activityId": this.activityId,
      "pin": this.secretPin,
      "productIds": JSON.stringify(this.prodectVos.map(Iiiil11l => Iiiil11l.productId))
    });
    this.debug(ll1iilIl);
    if (ll1iilIl && ll1iilIl.result) {
      if (this.timestamp() > IIiIi1li.activity.drawTime && this.timestamp() < IIiIi1li.activity.endTime) {
        return await this.drawResult();
      }
      this.putMsg("已完成加购");
      return;
    }
    let lIIl1IIl = ll1iilIl?.["errorMessage"] || "加购失败";
    if (lIIl1IIl.includes("未关注") && llIIIiI && (await this.follow())) return await this.quickAddCart(false);
    if (lIIl1IIl.includes("会员") && this.openCard && llIIIiI && (await this.bindWithVender()) && !this.canNotOpenCard) return await this.quickAddCart(false);
    this.putMsg(lIIl1IIl);
    this.wxStop(lIIl1IIl);
  }
  async ["drawResult"](lIi1liI1 = true) {
    let iilIIiI = await this.wxApi("wxCartKoi/cartkoi/drawResult", {
      "activityId": this.activityId,
      "pin": this.secretPin,
      "uuid": this.myUuid
    });
    this.debug(iilIIiI);
    if (iilIIiI && iilIIiI.result) this.putMsg("" + (iilIIiI.data?.["name"] || iilIIiI.data?.["drawInfo"]?.["name"] || "空气")), iilIIiI.data?.["drawInfoType"] === 7 && iilIIiI.data?.["needWriteAddress"] === "y" && iilIIiI.data?.["addressId"] && (this.addressId = iilIIiI.data.addressId, this.prizeName = iilIIiI.data.name, await this.saveAddress());else {
      let II1l1Iii = res?.["errorMessage"];
      if (II1l1Iii?.["includes"]("未关注") && lIi1liI1 && (await this.follow())) {
        return await this.drawResult(false);
      }
      if (II1l1Iii.includes("会员") && this.openCard && lIi1liI1 && (await this.bindWithVender()) && !this.canNotOpenCard) {
        return await this.quickAddCart(false);
      }
      this.putMsg(II1l1Iii);
      this.wxStop(II1l1Iii);
      return;
    }
  }
  async ["drawPrize"]() {
    let IlIIIiII = await this.lzkjApi("api/prize/drawPrize");
    this.drawNumber = 1;
    if (IlIIIiII && IlIIIiII.resp_code === 0) {
      this.drawNumber = IlIIIiII?.["data"]?.["drawNumber"] ?? 1;
      let I1IiIiIl = [];
      if (lI1i11I.openCardBeanNum === 1) {
        I1IiIiIl.push(1);
      } else {
        if (lI1i11I.openCardBeanNum === 2) I1IiIiIl.push(3);else lI1i11I.openCardBeanNum === 3 && I1IiIiIl.push(1, 3);
      }
      if (I1IiIiIl.length === 0) {
        this.openCard = true;
        return;
      }
      let Il1II1li = IlIIIiII?.["data"]?.["prizeInfo"] ?? [];
      if (Il1II1li.some(illi1iI1 => I1IiIiIl.includes(illi1iI1?.["prizeType"]))) {
        this.openCard = true;
      }
    }
  }
  async ["addSku"](l1lllIli = "999") {
    let ii1I11I = await this.lzkjApi("api/task/addSkuPrice/addSku", {
      "skuId": l1lllIli
    });
    this.debug(ii1I11I);
    if (typeof ii1I11I?.["data"] === "object" && Object.keys(ii1I11I.data).length === 0 && l1lllIli === "999") {
      this.oneClickPurchase = 1;
      return;
    }
    if (ii1I11I && ii1I11I.resp_code === 0) {
      let il1lI111 = ii1I11I?.["data"] ?? {};
      if (il1lI111.skuFlag) {
        this.putMsg("加购完成");
        return;
      }
      this.putMsg(il1lI111.messageFlag === 1 ? "未在加购时间内" : il1lI111.messageFlag === 2 ? "当前商品已加购" : il1lI111.messageFlag === 3 ? "当前商品已全部加购" : il1lI111.messageFlag === 4 && "没有加购资格");
      return;
    }
    let illiIIII = ii1I11I?.["resp_msg"] || "加购失败";
    this.putMsg(illiIIII);
    this.wxStop(illiIIII);
  }
  async ["draw"]() {
    let iill1I1l = await this.lzkjApi("api/task/addSkuPrice/draw");
    this.debug(iill1I1l);
    if (iill1I1l && iill1I1l.resp_code === 0) {
      let IiiIi11I = iill1I1l?.["data"] ?? {};
      if (IiiIi11I.skuFlag) {
        this.putMsg("加购的商品数量不满足抽奖所需的数量");
        return;
      }
      if (IiiIi11I.drawNull) {
        this.putMsg(IiiIi11I?.["draw"]?.["prizeName"] || "空气");
        IiiIi11I?.["draw"] && IiiIi11I?.["draw"]?.["prizeName"] && IiiIi11I?.["draw"]?.["prizeType"] === 3 && IiiIi11I?.["draw"]?.["addressId"] && IiiIi11I?.["draw"]?.["dayTime"] === this.formatDate(Date.now(), "yyyy-MM-dd") && (this.addressId = IiiIi11I.draw.addressId, this.prizeName = IiiIi11I.draw.prizeName, await this.saveAddress());
        return;
      } else {
        this.putMsg("空气");
        return;
      }
    }
    let i1lIIIll = iill1I1l?.["resp_msg"];
    this.putMsg(i1lIIIll);
    this.wxStop(i1lIIIll);
  }
  async ["inviteActivity"]() {
    let I1ilIi1I = IIiIi1li.activity.userList && IIiIi1li.activity.userList.length > 0 ? IIiIi1li.activity.userList[0] : null;
    if (!I1ilIi1I) return;
    let II1lllil = await this.lzkjApi("api/task/addSkuPrice/activity", {
      "shareUserId": "1744750944717832194" || ""
    });
    if (II1lllil && II1lllil.resp_code === 0) {
      let iiI1l11I = II1lllil?.["data"]?.["shareNum"] ?? 0,
        l1I1IliI = II1lllil?.["data"]?.["shareFlag"] ?? 0;
      this.debug(I1ilIi1I.pin, iiI1l11I, l1I1IliI);
      if (l1I1IliI && iiI1l11I === 3) {
        I1ilIi1I.helpedCount++;
        I1ilIi1I.helpedCount >= I1ilIi1I.maxHelpCount && I1ilIi1I.needHelp && (I1ilIi1I.needHelp = false, IIiIi1li.activity.userList.shift(), await I1ilIi1I.addSku());
      }
    }
  }
  async ["userTask"]() {
    await this.isvObfuscator();
    await this.getDefenseUrls();
    if (["10036"].includes(this.activityType)) {
      await this.login();
      await this.drawPrize();
      let lIi11iI1 = await this.lzkjApi("api/task/addSkuPrice/activity1");
      if (lIi11iI1 && lIi11iI1.resp_code === 0) {
        let IiiI1iIi = lIi11iI1?.["data"]?.["skuInfoList"] ?? [],
          llIliII = lIi11iI1?.["data"]?.["userAddSkuRecord"] ?? [],
          iiil1Ill = lIi11iI1?.["data"]?.["addSkuNumber"] ?? 0,
          I1lI11Il = lIi11iI1?.["data"]?.["addSkuStartTime"] ?? 0,
          I1Ili1lI = lIi11iI1?.["data"]?.["addSkuEndTime"] ?? 0,
          iIllIlll = lIi11iI1?.["data"]?.["priceTime"] ?? 0,
          IlIiliiI = lIi11iI1?.["data"]?.["userSkuCount"] ?? 0,
          IilIli1 = lIi11iI1?.["data"]?.["unlockSkuNumber"] ?? 0,
          IiiIiilI = lIi11iI1?.["data"]?.["shareNum"] ?? 0,
          iIili = lIi11iI1?.["data"]?.["shareFlag"] ?? 0,
          Ii1ii1l1 = lIi11iI1?.["data"]?.["shareCount"] ?? 0;
        this.debug(IiiIiilI, iIili);
        IIiIi1li.activity.drawTimeStr = this.formatDate(iIllIlll, "yyyy-MM-dd HH:mm:ss");
        IIiIi1li.activity.drawTime = iIllIlll;
        this.timestamp() < iIllIlll && (IIiIi1li.activity.noDraw = true);
        if (this.timestamp() < I1lI11Il) {
          this.putMsg("未到加购时间");
          this.stop();
          return;
        }
        if (["1006", "1005", "1002"].includes(this.joinCode)) {
          if (!this.openCard) return this.putMsg(this.joinDes);
          await this.getShopOpenCardInfo();
          await this.bindWithVender();
          if (this.canNotOpenCard) return this.reseCookieStatus();
          await this.login(false);
        }
        if (this.timestamp() > I1lI11Il && this.timestamp() < I1Ili1lI) {
          if (IlIiliiI >= iiil1Ill && IlIiliiI >= IilIli1 + Ii1ii1l1) {
            this.putMsg("已完成加购");
          }
          await this.inviteActivity();
          if (IilIli1 < iiil1Ill && IlIiliiI < iiil1Ill) {
            await this.getUserId();
            this.helpedCount = Ii1ii1l1;
            this.maxHelpCount = iiil1Ill - IilIli1;
            !IIiIi1li.activity.userList && (IIiIi1li.activity.userList = []);
            IIiIi1li.activity.userList.push(this);
          }
          this.debug(IilIli1 + Ii1ii1l1, IlIiliiI, iiil1Ill, IilIli1);
          if (IilIli1 + Ii1ii1l1 > IlIiliiI && IilIli1 + Ii1ii1l1 >= iiil1Ill) {
            await this.addSku();
            if (this.oneClickPurchase === 1) {
              IiiI1iIi = IiiI1iIi.filter(I1lliII => !llIliII.some(lli1I1lI => lli1I1lI.skuId === I1lliII.skuId));
              if (IiiI1iIi.length === 0) {
                this.putMsg("已完成加购");
                return;
              }
              for (let lIlIliI of IiiI1iIi) {
                await this.addSku(lIlIliI.skuId);
              }
            }
          }
        }
        this.debug(this.timestamp(), iIllIlll, IlIiliiI, iiil1Ill, this.drawNumber);
        this.timestamp() > iIllIlll && IlIiliiI >= iiil1Ill && (await this.draw());
      }
      return;
    }
    this.needHelp = false;
    await this.wxCommonInfo();
    await this.getSimpleActInfoVo();
    this.index === 0 && (await this.getShopInfo());
    this.defenseUrls.length === 0 ? await this.getMyPing() : await this.initPinToken();
    await this.accessLog();
    let ll1liIIl = await this.activityContent({
      "status": 1
    });
    if (!ll1liIIl?.["result"] || !ll1liIIl?.["data"]) {
      this.putMsg(ll1liIIl?.["errorMessage"]);
      return;
    }
    this.prodectVos = ll1liIIl.data?.["prodectVos"] ?? [];
    let Ii11I11I = ll1liIIl.data?.["addCarts"] ?? 1,
      Illi1Iii = ll1liIIl.data?.["activityVo"] ?? {},
      lIiilllI = this.dateStringToTimestamp(Illi1Iii?.["drawTime"]),
      ill11I1I = this.dateStringToTimestamp(Illi1Iii?.["cartStartTime"]),
      llIII1Il = this.dateStringToTimestamp(Illi1Iii?.["cartEndTime"]),
      IIl11llI = this.dateStringToTimestamp(Illi1Iii?.["startTime"]),
      li1Ii11l = this.dateStringToTimestamp(Illi1Iii?.["endTime"]),
      Ili11l11 = Illi1Iii?.["drawCondition"] ?? 1;
    this.myUuid = ll1liIIl.data?.["joinRecord"]?.["myUuid"] ?? "";
    this.debug("startTime", "cartStartTime", ill11I1I, "cartEndTime", llIII1Il, IIl11llI, "drawTime", lIiilllI, "endTime", li1Ii11l);
    this.rule = Illi1Iii?.["actRule"] ?? "";
    IIiIi1li.activity.timeStr = this.formatDate(IIl11llI, "yyyy-MM-dd HH:mm:ss") + "至" + this.formatDate(li1Ii11l, "yyyy-MM-dd HH:mm:ss");
    IIiIi1li.activity.startTime = IIl11llI;
    IIiIi1li.activity.endTime = li1Ii11l;
    IIiIi1li.activity.drawTimeStr = this.formatDate(lIiilllI, "yyyy-MM-dd HH:mm:ss");
    IIiIi1li.activity.drawTime = lIiilllI;
    this.timestamp() < lIiilllI && (IIiIi1li.activity.noDraw = true);
    IIl11llI && IIl11llI > Date.now() && (this.putMsg("活动未开始"), IIiIi1li.activity.noStart = true, this.stop());
    li1Ii11l && li1Ii11l < Date.now() && (this.putMsg("活动已结束"), this.stop());
    let ll11iil1 = Illi1Iii?.["needFollow"] ?? false,
      Il1ii1Il = ll1liIIl.data?.["hasFollow"] ?? false;
    ll11iil1 && !Il1ii1Il && (await this.follow());
    await this.getDrawPrizeInfo();
    if (this.timestamp() > lIiilllI && this.timestamp() < li1Ii11l && Ii11I11I >= Ili11l11) {
      return await this.drawResult();
    }
    if (this.timestamp() < llIII1Il) {
      if (Ii11I11I >= Ili11l11) this.putMsg("已完成加购");else {
        await this.quickAddCart();
      }
    }
  }
}
lIi1I11.activity = {
  "activityUrl": activityUrl
};
lIi1I11.TaskClass = i11llii;
lIi1I11.run({
  "whitelist": ["1-20"],
  "main_thread": 3
});