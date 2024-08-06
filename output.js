//Tue Aug 06 2024 20:05:31 GMT+0000 (Coordinated Universal Time)
//Base:https://github.com/echo094/decode-js
//Modify:https://github.com/smallfawn/decode_action
if (mode) {
  activityUrl = "https://cjhy-isv.isvjcloud.com/mc/wxPointShopView/pointExgBeans?venderId=1000092950&giftId=83c141f7589348ada97081d92f79f511&giftType=4&beansLevel=";
  activityUrl = "https://cjhy-isv.isvjcloud.com/mc/wxPointShopView/pointExgBeans?venderId=1000015445&giftId=c8e4b16f96014fb3a53aa182627402c3&giftType=4&beansLevel=1";
  activityUrl = "https://cjhy-isv.isvjcloud.com/mc/wxPointShopView/pointExgShiWu?venderId=779565&giftId=a0ebbb463bf04473ae1da3ac017653be&giftType=3";
  activityUrl = "https://lzkj-isv.isvjcloud.com/prod/cc/interactsaas/index?activityType=10079&templateId=202209051007jfdh&activityId=1768977757201473538&nodeId=101001&prd=cjwx";
  activityUrl = "https://jinggeng-rc.isvjcloud.com/ql/front/exchangeActDetail?actId=9e8080c68e328c5e018e3668d9f42709&userId=10726683";
  activityUrl = "https://jinggeng-rc.isvjcloud.com/ql/front/exchangeActDetail?actId=9e8080268dca1acb018df35a01c36241&userId=1000377707";
  activityUrl = "https://lzkj-isv.isvjcloud.com/prod/cc/interactsaas/index?activityType=10079&templateId=202209051007jfdh&activityId=1770345652211335170&nodeId=101001&prd=cjwx";
  activityUrl = "https://cjhy-isv.isvjcloud.com/mc/wxPointShopView/pointExgZheKou?venderId=13355577&giftId=fe450dd0d7a74d24919549b43472824d&giftType=5";
  activityUrl = "https://cjhy-isv.isvjcloud.com/mc/wxPointShopView/pointExgShiWu?venderId=1000075343&giftId=48d9a075943c412390977c2e61d4f155&giftType=3";
  activityUrl = "https://jingyun-rc.isvjcloud.com/h5/pages/exchangePoint/exchangePoint?id=7b7db11b08b21348e9aeb2d4cc31ae7a&userId=1000080364&actForm=single";
  activityUrl = "https://lzkj-isv.isvjcloud.com/prod/cc/interactsaas/index?activityType=10079&templateId=202209051007jfdh618&activityId=1785215208127311873&nodeId=101001&prd=cjwx";
  activityUrl = "https://cjhy-isv.isvjcloud.com/mc/wxPointShopView/pointExgBeans?venderId=1000302822&giftId=7a3c49af66ff42bf8e2eb2c0c7b95cec&giftType=4";
  activityUrl = "https://cjhy-isv.isvjcloud.com/mc/wxPointShopView/pointExgBeans?venderId=1000302822&giftId=a573617872f541f9ac18436208e776c2&giftType=4";
  activityUrl = "https://jingyun-rc.isvjcloud.com/h5/pages/exchangeJDmarket/exchangeJDmarket?id=f0ec65ba8db5a7a913dddc892f9d5b9e&userId=1000307221&actForm=single";
  activityUrl = "https://jingyun-rc.isvjcloud.com/h5/pages/exchangePoint/exchangePoint?id=2ee25610cda5d58daff79c7a98178904&userId=1000007503&actForm=single";
  activityUrl = "https://lzkj-isv.isvjcloud.com/prod/cc/interaction/v2/30002/1001/?activityId=1806167396485083137&shopId=1000002836";
}
const {
  RunMode: _0x517e36,
  UserMode: _0x56fba7,
  baseCommonEnv: _0x1c00c6,
  baseCommonEnvKey: _0x10f3de
} = require("./bear");
_0x1c00c6.notPointDrawList = process.env?.["B_WX_NOT_POINT_DRAW_LIST"]?.["split"](/[@,&|]/) || [];
_0x1c00c6.notPointDrawGiftNameList = process.env?.["B_WX_NOT_POINT_DRAW_GIFT_NAMES"]?.["split"](/[@,&|]/) || ["雨x伞", "加赠特权"];
_0x10f3de.B_WX_NOT_POINT_DRAW_LIST = "__notPointDrawList__";
_0x10f3de.B_WX_NOT_POINT_DRAW_GIFT_NAMES = "__notPointDrawGiftNameList__";
_0x517e36.envInfo = {
  "name": "积分兑换beta",
  "runName": "jd_wx_pointDraw",
  "version": "2.0.3"
};
class _0x20828e extends _0x56fba7 {
  constructor(_0xd1cd72, _0xc1c9da) {
    super(_0xd1cd72, _0xc1c9da);
    this.needPoint = null;
  }
  async ["receivePrize"](_0x29fd5c = {}) {
    let _0x58fde4 = await this.v2Api("api/" + this.activityType + "/receivePrize", {
      "prizeNum": 1,
      "mobile": "",
      ..._0x29fd5c
    });
    if (_0x58fde4 && _0x58fde4.code === 200) {
      this.putMsg(_0x58fde4.data?.["msg"] || _0x58fde4.data);
      if (_0x58fde4.data?.["successNum"] > 0) {
        let _0x332387 = this.formatDate(Date.now(), "yyyy-MM-dd HH:mm:ss") + "," + this.rightsName + "," + this.pin + "," + this.address?.["phone"] + "," + this.address?.["address"] + "," + _0x517e36.envInfo.name + "," + (this.shopId ?? this.venderId) + "," + this.activityUrl + "\n";
        this.appendFileSync("", "gifts.csv", _0x332387);
      }
      return;
    }
    let _0x48ad7f = _0x58fde4.data?.["msg"] || _0x58fde4.data;
    this.putMsg(_0x48ad7f);
    await this.wxStopSync(_0x48ad7f);
    this.exit();
  }
  async ["hdbExchange"](_0x5aacc8, _0x45bf9 = true) {
    let _0x20a668 = await this.hdbApi("post" + this.activityType + "FrontAct", {
      "awardId": _0x5aacc8
    });
    if (_0x20a668 && _0x20a668.succ) {
      if (_0x20a668.result.succ) {
        this.putMsg(_0x20a668.result?.["dmActivityLog"]?.["awardName"] || "空气");
        _0x20a668.result?.["msg"]?.["includes"]("填写信息") && (this.addressId = _0x20a668.result?.["dmActivityLog"]?.["id"], this.prizeName = _0x20a668.result?.["dmActivityLog"]?.["awardName"], await this.saveAddress());
        return;
      } else this.putMsg(_0x20a668.result?.["errorMsg"] || _0x20a668.result?.["message"]), this.exit();
    }
    let _0x1e6397 = _0x20a668?.["message"];
    if (_0x1e6397?.["includes"]("关注店铺") && _0x45bf9 && (await this.follow())) return await this.hdbExchange(_0x5aacc8, false);
    return this.putMsg(_0x1e6397), await this.wxStopSync(_0x1e6397), this.exit();
  }
  async ["userTask"]() {
    await this.isvObfuscator();
    await this.getDefenseUrls();
    if (this.mode === "v2") {
      await this.login();
      let _0x573518 = await this.v2Api("api/" + this.activityType + "/getActivityInfo"),
        {
          detail: _0x1f07a0,
          rightsName: _0x2fd93a,
          rightsType: _0x3e43f3
        } = _0x573518?.["data"];
      this.rightsName = _0x2fd93a;
      if (/(券|权益已兑完)/.test(_0x2fd93a)) return this.putMsg("垃圾活动"), this.stop();
      if (_0x1f07a0) return this.putMsg(_0x1f07a0);
      if (_0x3e43f3 === 3) {
        this.getAddress();
        if (!this.address) {
          this.putMsg("未配置地址或所有地址已达使用上限,退出填地址");
          return;
        }
        let _0x1eda4c = await this.v2Api("api/" + this.activityType + "/saveAddress", {
          "name": this.address.receiver,
          "tel": this.address.phone,
          "province": this.address.province,
          "city": this.address.city,
          "county": this.address.county,
          "addressDetail": this.address.address,
          "isDefault": false
        });
        this.putMsg(_0x1eda4c.data?.["msg"] || _0x1eda4c.data);
        let _0xbbf6e2 = await this.v2Api("api/" + this.activityType + "/getAddressList");
        for (let _0x591e7d of _0xbbf6e2?.["data"] || []) {
          _0x591e7d.tel?.["includes"](this.address.phone) && (await this.receivePrize({
            "addressId": _0x591e7d.id
          }));
          await this.v2Api("api/" + this.activityType + "/delAddress", {
            "id": _0x591e7d.id
          });
        }
      } else await this.receivePrize();
      return;
    }
    if (this.mode === "hdb") {
      await this.login();
      await this.reportPVUV();
      await this.loadFrontAct();
      await this.loadFrontAward();
      let _0x18a1c4 = await this.hdbApi("getMyPoint"),
        _0x39e04a = _0x18a1c4?.["result"] ?? 0;
      if (_0x39e04a <= 0) return this.putMsg("无积分"), this.exit();
      this.activityType = "PointExchange";
      this.activityUrl.includes("exchangeJDmarket") && (this.activityType = "PointLimitedTimeExchange");
      let _0x46a19a = await this.hdbApi("load" + this.activityType + "Awards", {
          "timeIndex": 0
        }),
        _0x48db9f = _0x46a19a?.["result"]?.["awards"] ?? [];
      _0x48db9f = _0x48db9f.filter(_0xf42f8f => _0xf42f8f?.["awardSurplusQuantity"] > 0);
      if (_0x48db9f.length === 0) return this.putMsg("垃圾或已领完"), this.stop();
      this.debug(_0x48db9f);
      _0x48db9f = _0x48db9f.filter(_0x2aa90f => _0x2aa90f.awardSurplusQuantity > 0 && _0x39e04a >= _0x2aa90f.pointNum && _0x2aa90f.hasExchange === 0);
      this.debug(_0x48db9f);
      if (_0x48db9f.length === 0) return this.putMsg("无可兑换奖励"), this.exit();
      if (this.openCard === 0) await this.bindWithVender();
      for (let _0xa47e7a of _0x48db9f.reverse()) {
        this.debug(_0xa47e7a);
        await this.hdbExchange(_0xa47e7a.id);
      }
      return;
    }
    if (this.mode === "jinggeng") {
      this.userId = this.userId || this.getQueryString(this.activityUrl, "userId");
      this.activityId = this.activityId || this.getQueryString(this.activityUrl, "actId");
      if (!this.userId || !this.activityId) return this.putMsg("参数错误"), this.stop();
      await this.setMixNick();
      let _0x46bc0d = await this.jinggengShopInfo(),
        _0x4c313f = _0x46bc0d("#actType", "body").attr("value");
      if (["JD_GOODS", "JD_COUPON", "JD_POINTTOBUY"].includes(_0x4c313f)) {
        this.putMsg("垃圾或领完");
        this.stop();
        return;
      }
      let _0x562c93 = parseInt(this.rule?.["match"](/(?<=每人可兑换)\d{1,2}/)[0] || "1");
      this.debug(_0x562c93);
      for (let _0x33627c = 0; _0x33627c < _0x562c93; _0x33627c++) {
        let _0x5130ee = await this.jinggengApi("postQlExchange");
        if (_0x5130ee && _0x5130ee.succ) {
          let _0x3bad82 = _0x5130ee.msg ?? "{}",
            _0x4b3730 = JSON.parse(_0x3bad82);
          if (_0x4b3730?.["isSendSucc"]) {
            let _0x12c62d = _0x4b3730?.["drawAwardDto"]?.["awardName"];
            this.putMsg(_0x4b3730?.["drawAwardDto"]?.["awardDenomination"] + " " + _0x12c62d);
            _0x4b3730?.["drawAwardDto"]?.["awardType"] === "JD_GOODS" && (this.addressId = _0x4b3730?.["drawAwardDto"]?.["actLogId"], this.prizeName = _0x12c62d, await this.saveAddress());
          }
          await this.sleep(2000, 3000);
          continue;
        }
        this.putMsg(_0x5130ee?.["msg"] || "兑换失败");
        await this.wxStopSync(_0x5130ee?.["msg"]);
        return;
      }
      return;
    }
    if (["10079"].includes(this.activityType)) {
      await this.login();
      let _0x3f3457 = await this.taskGet("api/pointsExchange/activity");
      this.debug(_0x3f3457);
      if (!_0x3f3457 || _0x3f3457.resp_code !== 0) return this.putMsg(_0x3f3457?.["resp_msg"] || "查询失败"), await this.wxStopSync(_0x3f3457?.["resp_msg"]);
      let _0x15da66 = _0x3f3457.data.pointsExchangePrizeVos ?? [];
      _0x15da66 = _0x15da66.filter(_0xf0643c => _0xf0643c.stock !== 0 && !_0x1c00c6.notPointDrawGiftNameList.some(_0x3cf8aa => _0xf0643c.prizeName.includes(_0x3cf8aa)));
      if (_0x15da66.length === 0) return this.putMsg("垃圾或领完"), this.stop();
      _0x15da66 = _0x15da66.filter(_0x51fa03 => _0x51fa03.status === 1);
      if (_0x15da66.length === 0) return this.putMsg("已兑换"), this.exit();
      let _0xab7f1b = _0x3f3457.data.myPoints;
      if (_0xab7f1b === 0) return this.putMsg("无积分");
      _0x15da66 = _0x15da66.filter(_0x240cc5 => _0xab7f1b >= _0x240cc5.num);
      if (_0x15da66.length === 0 || _0xab7f1b < _0x15da66[0].num) return this.putMsg("积分不足");
      if (["1005", "1006", "1002"].includes(this.joinCode)) {
        await this.getShopOpenCardInfo();
        await this.bindWithVender();
        if (this.canNotOpenCard) return this.putMsg(this.joinDes);
        await this.login(false);
      }
      for (let _0x432d2a of _0x15da66.reverse()) {
        let _0x9c7b2 = await this.lzkjApi("api/pointsExchange/exchange", {
          "prizeInfoId": _0x432d2a.prizeInfoId,
          "status": 1
        });
        this.debug(_0x9c7b2);
        if (_0x9c7b2 && _0x9c7b2.resp_code === 0) {
          this.prizeName = _0x9c7b2.data?.["prizeName"];
          _0xab7f1b -= _0x432d2a.num;
          _0x15da66 = _0x15da66.filter(_0x5183af => _0xab7f1b >= _0x5183af.num);
          this.putMsg(this.prizeName);
          this.addressId = _0x9c7b2.data?.["addressId"];
          _0x9c7b2.data?.["prizeType"] === 3 && (await this.saveAddress());
          return;
        }
        let _0x316c00 = _0x9c7b2?.["resp_msg"] || "兑换失败";
        this.putMsg(_0x316c00);
        await this.wxStopSync(_0x316c00);
      }
      return;
    }
    if (!["pointExgBeans", "pointExgECard", "pointExgHb", "pointExgShiWu"].some(_0x346efb => this.activityUrl.includes(_0x346efb))) return this.putMsg("暂不支持该行活动,请联系作者"), this.stop();
    this.activityId = this.getQueryString(this.activityUrl, "giftId");
    await this.wxCommonInfo();
    await this.getSimpleActInfoVo();
    if (this.index === 0) {
      await this.getShopInfo();
      if (this.shopName && [26, 128, 129].includes(this.activityType) && _0x1c00c6.notPointDrawList.some(_0x2fcee9 => this.shopName.includes(_0x2fcee9))) {
        this.putMsg("已屏蔽");
        this.stop();
        return;
      }
    }
    this.defenseUrls.length === 0 ? await this.getMyPing() : await this.initPinToken();
    await this.accessLog();
    let _0x1913fd = await this.wxApi("mc/wxPointShop/getBuyerPoints", {
      "venderId": this.venderId,
      "buyerPin": this.secretPin
    });
    this.debug(_0x1913fd);
    let _0x266b2e = parseInt(_0x1913fd?.["data"]?.["grade"] ?? 1),
      _0xc21407 = parseInt(_0x1913fd?.["data"]?.["buyerPoints"] ?? 0);
    if (_0xc21407 <= 0) {
      this.putMsg("无积分");
      return;
    }
    if (_0x266b2e === 1 && this.needPoint && this.needPoint > _0xc21407) return this.putMsg("积分不足");
    let _0x36d595, _0x1d46f5;
    if (this.activityUrl.includes("pointExgECard")) _0x36d595 = "mc/equity/selectEquityForC", _0x1d46f5 = {
      "giftId": this.activityId,
      "venderId": this.venderId,
      "buyerPin": this.secretPin
    };else {
      if (this.activityUrl.includes("pointExgHb")) {
        _0x36d595 = "mc/hb/selectHbForC";
        _0x1d46f5 = {
          "giftId": this.activityId,
          "venderId": this.venderId,
          "buyerPin": this.secretPin
        };
      } else {
        if (this.activityUrl.includes("pointExgShiWu")) {
          for (let _0x316321 of _0x1c00c6.notPointDrawGiftNameList) {
            _0x56fba7.activity.shopName.includes(_0x316321) && (this.putMsg("已屏蔽"), this.stop());
          }
          _0x36d595 = "mc/shiWu/selectShiWu";
          _0x1d46f5 = {
            "giftId": this.activityId,
            "venderId": this.venderId
          };
        } else {
          if (this.activityUrl.includes("pointExgBeans")) {
            if (_0x56fba7.activity.shopName.includes("同仁堂")) {
              this.putMsg("已屏蔽");
              this.stop();
              return;
            }
            _0x36d595 = "mc/beans/selectBeansForC";
            _0x1d46f5 = {
              "giftId": this.activityId,
              "venderId": this.venderId,
              "buyerPin": this.secretPin,
              "beansLevel": _0x266b2e
            };
          } else {
            return this.putMsg("暂不支持该行活动,请联系作者"), this.stop();
          }
        }
      }
    }
    let _0x11c1cf = await this.wxApi(_0x36d595, _0x1d46f5);
    this.debug(_0x11c1cf);
    if (!_0x11c1cf || !_0x11c1cf.result) {
      return this.putMsg(_0x11c1cf?.["errorMessage"] || "查询失败"), await this.wxStopSync(_0x11c1cf?.["errorMessage"]);
    }
    let _0x15ad11, _0x2cd6a8, _0x2c380a, _0x5f192e, _0x54ce75, _0x3f3e0e, _0x3c3fce, _0x2dcb42;
    if (this.activityUrl.includes("pointExgShiWu")) {
      _0x15ad11 = _0x11c1cf.data?.["mcGiftBaseInfo"]?.["actrule"];
      _0x2cd6a8 = _0x11c1cf.data?.["mcGiftBaseInfo"]?.["upTime"];
      _0x2c380a = _0x11c1cf.data?.["mcGiftBaseInfo"]?.["downTime"];
      _0x5f192e = _0x11c1cf.data?.["mcGiftBaseInfo"]?.["giftName"];
      _0x54ce75 = _0x11c1cf.data?.["mcShiWu"];
      _0x3f3e0e = _0x11c1cf.data?.["mcGiftBaseInfo"]?.["num"] === _0x11c1cf.data?.["mcGiftBaseInfo"]?.["usedNum"];
      this.needPoint = _0x11c1cf.data?.["mcGiftBaseInfo"]["point" + _0x266b2e];
    } else {
      _0x15ad11 = _0x11c1cf.data?.["actrule"];
      _0x2cd6a8 = _0x11c1cf.data?.["upTime"];
      _0x2c380a = _0x11c1cf.data?.["downTime"];
      _0x5f192e = _0x11c1cf.data?.["giftName"];
      _0x3c3fce = _0x11c1cf.data?.["exgStyle"] ?? 0;
      let {
        oneLevel = 0,
        twoLevel = 0,
        threeLevel = 0
      } = _0x11c1cf.data;
      _0x2dcb42 = [oneLevel, threeLevel, twoLevel].filter(_0x234363 => _0x234363 !== 0 && _0x234363);
      this.needPoint = _0x11c1cf.data["point" + _0x266b2e];
      _0x3f3e0e = _0x11c1cf.data?.["num"] === _0x11c1cf.data?.["usedNum"];
      _0x11c1cf.data?.["beansLevelCount"] > 0 && (this.needPoint = _0x11c1cf.data["point" + _0x266b2e] * _0x11c1cf.data?.["beansLevelCount"]);
    }
    _0x56fba7.activity.startTime = _0x2cd6a8;
    _0x56fba7.activity.endTime = _0x2c380a;
    if (_0x2cd6a8 && _0x2cd6a8 > this.timestamp()) {
      return this.putMsg("未开始"), this.stop();
    }
    if (_0x2c380a && _0x2c380a < this.timestamp()) {
      return this.putMsg("已结束"), await this.writeLongCacheByStop(), this.stop();
    }
    if (!this.needPoint) return this.putMsg("等级不符"), this.exit();
    this.debug("needPoint", this.needPoint);
    if (_0x3f3e0e) return this.putMsg("已抢光,明日再来"), this.stop();
    if (this.needPoint > _0xc21407) return this.putMsg("积分:" + _0xc21407 + ",需要:" + this.needPoint);
    for (let _0x290702 of _0x1c00c6.notPointDrawGiftNameList) {
      if (_0x5f192e.includes(_0x290702)) {
        this.putMsg("已屏蔽");
        this.stop();
        return;
      }
    }
    if (this.activityUrl.includes("pointExgHb")) {
      let _0x2999c5 = await this.wxApi("mc/wxPointShop/exgHB", {
        "giftId": this.activityId,
        "venderId": this.venderId,
        "buyerPin": this.secretPin
      });
      return this.putMsg(_0x2999c5?.["errorMessage"] || "兑换成功");
    } else {
      if (this.activityUrl.includes("pointExgECard")) {
        let _0x3bdedb = await this.wxApi("mc/wxPointShop/exgECard", {
          "giftId": this.activityId,
          "venderId": this.venderId,
          "buyerPin": this.secretPin,
          "buyerNick": this.nickname
        });
        return this.putMsg(_0x3bdedb?.["errorMessage"] || "兑换成功");
      } else {
        if (this.activityUrl.includes("pointExgShiWu")) {
          let _0x5520d9 = await this.wxApi("mc/wxPointShop/selectAddressList", {
            "venderId": this.venderId,
            "buyerPin": this.secretPin
          });
          if (_0x5520d9 && _0x5520d9.ok && _0x5520d9.count > 0) {
            for (let _0x5b1d87 of _0x5520d9.data) {}
          }
          this.getAddress();
          if (!this.address) {
            this.putMsg("未配置地址或所有地址已达使用上限,退出填地址");
            return;
          }
          this.log("使用地址", this.address);
          let _0x4b0cff = await this.wxApi("mc/wxPointShop/saveAddress", {
            "venderId": this.venderId,
            "buyerPin": this.secretPin,
            "address": this.address.address,
            "city": this.address.city,
            "county": this.address.county,
            "province": this.address.province,
            "receiver": this.address.receiver,
            "receiverPhone": this.address.phone
          });
          if (!_0x4b0cff || !_0x4b0cff.result) return this.putMsg(_0x4b0cff?.["errorMessage"] || "保存地址失败");
          let _0xf1ab5d = _0x4b0cff.data.addressId;
          this.putMsg("已填地址");
          let _0x50c6f3 = await this.wxApi("mc/wxPointShop/exgShiWu", {
            "buyerPin": this.secretPin,
            "buyerNick": this.nickname,
            "giftId": this.activityId,
            "venderId": this.venderId,
            "addressId": _0xf1ab5d
          });
          if (_0x50c6f3 && _0x50c6f3.result) {
            let _0x1c4569 = this.formatDate(Date.now(), "yyyy-MM-dd HH:mm:ss") + "," + _0x5f192e + "," + this.pin + "," + this.address?.["phone"] + "," + this.address?.["address"] + "," + _0x517e36.envInfo.name + "," + (this.shopId ?? this.venderId) + "," + this.activityUrl + "\n";
            return this.appendFileSync("", "gifts.csv", _0x1c4569), this.putMsg("兑换成功");
          }
          let _0x3f798f = _0x50c6f3?.["errorMessage"] || "兑换失败";
          this.putMsg(_0x3f798f);
          await this.wxStopSync(_0x3f798f);
          return;
        }
      }
    }
    let _0x29e1ee = parseInt(_0xc21407 / _0x11c1cf.data["point" + _0x266b2e]);
    if (_0x11c1cf.data?.["canExgByPeopDay"] && _0x29e1ee > _0x11c1cf.data?.["canExgByPeopDay"]) _0x29e1ee = _0x11c1cf.data?.["canExgByPeopDay"];
    let _0xec79bb = _0x11c1cf.data?.["beansLevelCount"];
    if (_0x29e1ee < _0xec79bb) {
      return this.putMsg("积分不足");
    }
    _0x29e1ee = _0xec79bb === 0 ? _0x29e1ee : _0xec79bb;
    if (_0x3c3fce === 1) {
      _0x29e1ee = _0x2dcb42?.["filter"](_0x2149ab => _0xc21407 >= _0x2149ab * _0x11c1cf.data["point" + _0x266b2e])?.["sort"]((_0x200736, _0x58b29b) => _0x58b29b - _0x200736)?.[0] ?? 0;
    }
    this.debug(_0x29e1ee);
    if (_0x29e1ee <= 0) return this.putMsg("积分不足");
    let _0x5d9b6a = await this.wxApi("mc/wxPointShop/exgBeans", {
      "buyerPin": this.secretPin,
      "buyerNick": this.nickname,
      "giftId": this.activityId,
      "venderId": this.venderId,
      "beansLevel": _0x266b2e,
      "exgBeanNum": _0x29e1ee
    });
    if (_0x5d9b6a && _0x5d9b6a.result) return this.putMsg(_0x29e1ee + "京豆");
    let _0x52ce6d = _0x5d9b6a?.["errorMessage"] || "兑换失败";
    this.putMsg(_0x52ce6d);
    await this.wxStopSync(_0x52ce6d);
  }
}
_0x517e36.activity = {
  "activityUrl": activityUrl
};
_0x517e36.TaskClass = _0x20828e;
_0x517e36.run({
  "whitelist": ["1-20000"],
  "main_thread": 3
});