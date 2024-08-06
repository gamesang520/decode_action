//Tue Aug 06 2024 19:20:02 GMT+0000 (Coordinated Universal Time)
//Base:https://github.com/echo094/decode-js
//Modify:https://github.com/smallfawn/decode_action
if (mode) {
  activityUrl = "https://lzkj-isv.isvjd.com/prod/cc/interaction/v2/10023/1001/?activityId=1763116670225666049&shopId=10034889";
  activityUrl = "https://cjhy-isv.isvjcloud.com/sign/signActivity?activityId=4879ca4f9b4d4e9580ac09eca30b44ac";
  activityUrl = "https://jinggeng-rc.isvjcloud.com/ql/front/showSign?id=9e80802c8dc9f04d018df48f286509c1&user_id=10028198";
  activityUrl = "https://lzkj-isv.isvjcloud.com/prod/cc/interactsaas/index?activityType=10002&activityId=1764492473030377474&templateId=20201228083300lxqdsl011&nodeId=101001003&prd=cjwx";
  activityUrl = "https://cjhy-isv.isvjcloud.com/sign/signActivity?activityId=4879ca4f9b4d4e9580ac09eca30b44ac";
  activityUrl = "https://lzkj-isv.isvjcloud.com/prod/cc/interactsaas/index?activityType=10023&activityId=1752867173633544194&templateId=2023110802rlqd&nodeId=101001&prd=cjwx";
  activityUrl = "https://txzj-isv.isvjcloud.com/sign_in/home?a=UHpDWkVHNFhlTzhGZ2MrYUV3";
  activityUrl = "https://lzkj-isv.isvjcloud.com/sign/signActivity2?activityId=f6bfaa803f59453b897876ccccd08cef&venderId=1000084244&adsource=tg_storePage";
  activityUrl = "https://txzj-isv.isvjcloud.com/sign_in/home?a=TUdPWlJXOFFlK29GZ2MrZUV3";
  activityUrl = "https://lzkj-isv.isvjcloud.com/prod/cc/interactsaas/index?activityType=10040&activityId=1772829299506323457&templateId=20210518190900qrqd011&nodeId=101001&prd=cjwx";
  activityUrl = "https://jingyun-rc.isvjcloud.com/h5/pages/SignIn/SignIn?id=2085faf335324522080865dbc20ba790&userId=1000007503";
  activityUrl = "https://lzkj-isv.isvjcloud.com/prod/cc/interactsaas/index?activityType=10023&templateId=20210518190900rlqd011&activityId=1791052003950125057";
  activityUrl = "https://jingyun-rc.isvjcloud.com/sign_h5/pages/BudweiserSignIn/SignIn?id=0c9992da962de13b2f205b1000dac90d&userId=1000002552";
  activityUrl = "https://cjhy-isv.isvjcloud.com/sign/signActivity?activityId=b3a4db52e1dc43598b71c946bdcae9bd";
}
const {
  RunMode: I,
  UserMode: J
} = require("./bear");
I.envInfo = {
  "name": "签到有礼beta",
  "runName": "jd_wx_sign",
  "version": "2.0.0"
};
let K = process.env.B_WX_SHOP_SIGN_BEAN_GOODS ? process.env.B_WX_SHOP_SIGN_BEAN_GOODS : false,
  M = ["10001", "10002", "10003", "10004", "10023", "10040"];
process.env.B_WX_SIGN_ACTIVITY_TYPES ? process.env.B_WX_SIGN_ACTIVITY_TYPES.split(/[@,&|]/).forEach(e => M.push(e)) : "";
class N extends J {
  constructor(e, f) {
    super(e, f);
  }
  async ["v2Sign"](e = true) {
    let g = await this.v2Api("api/" + this.activityType + "/sign");
    this.debug(g);
    if (g && g.code === 200) this.putMsg(g.data?.["prizeName"] || "签到成功");else {
      if (g?.["message"]["includes"]("不是店铺会员") && e) {
        await this.bindWithVender();
        await this.sign(false);
      }
    }
  }
  async ["signPost"](e = true) {
    let g = await this.hdbApi(this.hdbPrefix ? this.hdbPrefix + "front/cusActivity/cusSignPost" : "signPost");
    if (g && g.succ) {
      g?.["result"]?.["awardRes"]?.["needSend"] && this.putMsg(g.result?.["awardRes"]?.["dmActivityLog"]?.["awardName"] || "空气");
      let j = g.result?.["signLog"]?.["continueCount"];
      this.putMsg("已连续签到" + j + "天");
      return;
    }
    let h = g?.["message"];
    if (e && h?.["includes"]("关注店铺") && (await this.follow())) {
      return await this.signPost(false);
    }
    this.putMsg(h);
    this.wxStop(h);
    return;
  }
  async ["userTask"]() {
    await this.isvObfuscator();
    if (this.mode === "txzj") {
      if (!this.activityId) return this.putMsg("活动链接错误"), this.stop();
      let h = await this.taskPost("front/jd_store_user_info", {
        "token": this.isvToken
      });
      if (!h || h.code !== "success") {
        let k = h.msg || "获取用户信息失败";
        return this.putMsg(k), this.wxStop(k);
      }
      let i = await this.taskPost("sign_in/receive_prize", {
        "pid": this.activityId
      });
      this.debug(i);
      if (i && i.code === "success") {
        this.putMsg("签到成功");
        if (i?.["data"]?.["prize_title"]) switch (i?.["data"]?.["prize_title"]["type"]) {
          case "coupon":
            this.putMsg("优惠券");
            break;
          case "bean":
            this.putMsg((i.data.prize_title?.["prize_title"] || i.data.prize_title?.["once_num"]) + "京豆");
            break;
          case "integral":
            this.putMsg((i.data.prize_title?.["prize_title"] || i.data.prize_title?.["once_num"]) + "积分");
            break;
          case "goods":
            this.putMsg("" + i.data.prize_title.prize_name);
            break;
          default:
            this.putMsg(JSON.stringify(i?.["data"]?.["prize_title"]));
        }
        return;
      }
      let j = i?.["msg"] || "签到失败";
      this.putMsg(j);
      this.wxStop(j);
      return;
    }
    if (this.mode === "v2") {
      await this.login();
      await this.v2Sign();
      let m = await this.v2Api("api/" + this.activityType + "/calendar");
      this.debug(m);
      if (m && m.code === 200) {
        let n = m.data.continuousSignDays;
        this.putMsg("已连续签到" + n + "天");
      }
      return;
    }
    if (this.mode === "jinggeng") {
      this.userId = this.userId || this.getQueryString(this.activityUrl, "userId");
      this.activityId = this.activityId || this.getQueryString(this.activityUrl, "actId");
      await this.setMixNick();
      await this.jinggengShopInfo();
      await this.taskPost("front/followShop", {
        "userId": this.userId
      });
      let p = await this.jinggengApi("saveSignIn");
      this.debug(p);
      if (p && p.succ) {
        if (p?.["msg"]?.["includes"]("签到成功但不需要发奖")) this.putMsg("签到成功");else {
          let s = JSON.parse(p.msg);
          s?.["isSendSucc"] ? this.putMsg(s?.["actLogDto"]?.["remark"]) : this.putMsg("空气");
        }
        return;
      }
      let q = p?.["msg"] || "签到失败";
      this.putMsg(q);
      this.wxStop(q);
      return;
    }
    if (this.mode === "hdb") {
      return this.hdbPrefix = "", this.activityUrl?.["includes"]("BudweiserSignIn") && (this.hdbEncript = true, this.hdbLoginPath = "sign_java/front/fans/login", this.hdbPrefix = "sign_java/"), await this.login(), await this.reportPVUV(this.hdbPrefix + "front/activity/reportPVUV"), await this.loadFrontAct(this.hdbPrefix + "front/activity/loadFrontAct"), await this.signPost();
    }
    await this.getDefenseUrls();
    if (M.includes(this.activityType)) {
      await this.login();
      let v = ["10001", "10002", "10003", "10004"].includes(this.activityType) ? "api/task/sign/add" : "api/task/daySign/getSignClick",
        w = await this.lzkjApi(v);
      this.debug(w);
      if (w && w.resp_code === 0) {
        this.putMsg("签到成功");
        let y = w?.["data"]?.["prizeName"];
        this.putMsg(y);
        w.data && w.data?.["prizeName"] && w.data?.["prizeType"] === 3 && w.data?.["addressId"] && w.data?.["dayTime"] === this.formatDate(Date.now(), "yyyy-MM-dd") && (this.addressId = w.data.addressId, this.prizeName = w.data?.["prizeName"], await this.saveAddress());
        return;
      }
      let x = w?.["resp_msg"] || "签到失败";
      this.putMsg(x);
      this.wxStop(x);
      return;
    }
    await this.wxCommonInfo();
    await this.getSimpleActInfoVo();
    this.defenseUrls.length === 0 ? await this.getMyPing() : await this.initPinToken();
    await this.accessLog();
    this.isSevenDay = this.activityUrl?.["includes"]("sevenDay");
    this.isCj = this.activityUrl?.["includes"]("//cjhy");
    if (this.index === 0) {
      let z = await this.wxApi(this.isSevenDay ? "sign/sevenDay/wx/getActivity" : "sign/wx/getActivity", {
        "actId": this.activityId,
        "venderId": this.venderId
      });
      this.debug(z);
      if (!z || !z.isOk) {
        let A = z?.["msg"] || "活动已结束";
        this.putMsg(A);
        this.wxStop(A);
      } else {
        let B = z?.["act"]?.["startTime"],
          C = z?.["act"]?.["endTime"];
        J.activity.startTime = B;
        J.activity.endTime = C;
        if (B && B > this.timestamp()) {
          return this.putMsg("活动未开始"), this.stop();
        }
        if (C && C < this.timestamp()) return this.putMsg("活动已结束"), this.stop();
        let D = [];
        if (this.isSevenDay) {
          for (let Q of z?.["act"]?.["giftBean"]?.["giftConditions"] || []) {
            Q.gift && (Q.gift.dayNum = Q.dayNum, D.push(Q.gift));
          }
        } else {
          z?.["act"]?.["wxSignActivityGiftBean"]?.["hasGiftEveryDay"] === "y" && D.push(z?.["act"]?.["wxSignActivityGiftBean"]?.["gift"]);
          if (z?.["act"]?.["wxSignActivityGiftBean"]?.["giftConditions"]?.["length"] > 0) {
            for (let R of z?.["act"]?.["wxSignActivityGiftBean"]?.["giftConditions"] || []) {
              R.gift && (R.gift.dayNum = R.dayNum, D.push(R.gift));
            }
          }
        }
        D = D.filter(T => ["6", "7", "9", "13", "14", "15", "16"].includes(T.giftType) && !T.insufficient);
        if (D.length === 0) return this.putMsg("垃圾或领完"), this.stop();
        if (K && D.filter(T => ["6", "7", "13", "14", "15", "16"].includes(T.giftType)).length === 0) return this.putMsg("垃圾或领完"), this.stop();
      }
    }
    this.debug(this.isSevenDay ? "sign/sevenDay/wx/signUp" : "sign/wx/signUp");
    let f = await this.wxApi(this.isSevenDay ? "sign/sevenDay/wx/signUp" : "sign/wx/signUp", {
      "actId": this.activityId,
      "pin": this.secretPin
    });
    this.debug(f);
    if (f && f.isOk) {
      this.putMsg("签到成功");
      let U = this.isSevenDay ? f.signResult?.["gift"] : f.gift,
        V = "";
      if (U) {
        let W = this.isSevenDay ? f.signResult?.["gift"]?.["giftName"] : f?.["gift"]?.["giftName"],
          X = this.isCj ? f?.["signResult"]?.["send"] ? "" : "(已发完)" : f?.["isSend"] ? "" : "(已发完)";
        V = "" + W + X;
        this.addressId = f?.["addressId"];
        f?.["needWriteAddressflag"] === "y" && this.addressId && (this.prizeName = W, await this.saveAddress());
      }
      this.putMsg(V);
      return;
    }
    let g = f?.["msg"] || f?.["errMsg"] || "签到失败";
    this.putMsg(g);
    this.wxStop(g);
  }
}
I.activity = {
  "activityUrl": activityUrl
};
I.TaskClass = N;
I.run({
  "whitelist": ["1-100000"],
  "main_thread": 5,
  "wxProxyCheck": 2
});