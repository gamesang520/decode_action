//Tue Aug 06 2024 19:40:03 GMT+0000 (Coordinated Universal Time)
//Base:https://github.com/echo094/decode-js
//Modify:https://github.com/smallfawn/decode_action
const notInitPinTokenRegex = /(lorealjdcampaign-rc.isvjcloud.com|interaction\/v1)/,
  urlPrefixes = {
    "/prod/cc/interactsaas": /interactsaas/,
    "/crm-proya/apps/interact": /crm-proya/,
    "/apps/interact": /lorealjdcampaign-rc.isvjcloud.com\/prod\/cc/,
    "prod/cc/cjwx": /lorealjdcampaign-rc.isvjcloud.com\/prod\/cc\/cjwx/,
    "/apps/interact": /lorealjdcampaign-rc.isvjcloud.com\/interact/,
    "/prod/cc/interaction/v1": /interaction/
  };
let hdbTypes = ["hdb-isv.isvjcloud.com", "jingyun-rc.isvjcloud.com"],
  jinggengTypes = ["jinggeng-isv.isvjcloud.com", "jinggeng-rc.isvjcloud.com"],
  jinggengcjTypes = ["jinggengjcq-isv.isvjcloud.com", "mpdz-act-dz.isvjcloud.com"],
  keywords = ["pps", "utm_campaign", "utm_term", "utm_source", "utm_medium", "teamId", "mpin", "shareUuid", "signUuid", "inviterNick", "inviter", "InviteUuid", "inviterNickName", "sharer", "inviterImg", "nickName", "nick", "friendUuid", "helpUuid", "shareuserid4minipg", "bizExtString", "invitePin", "pps", "cookie", "friendid", "bizExtString", "bizExtString", "koikey", "pps", "inviter_id", "invitePin", "portrait", "sid", "shareUserId", "_ts", "pps", "pps", "pps", "DEBUG", "shareOpenId", "jxsid", "ad_od", "token", "pps", "encryptOpenId", "gx", "gxd", "accessToken"],
  _currentTime = Date.now(),
  proxies = [];
for (let i = 0; i < 20; i++) {
  try {
    if (!process.env["M_WX_PROXY_URL" + (i || "")]) continue;
    proxies.push({
      "index": i + 1,
      "url": process.env["M_WX_PROXY_URL" + (i || "")],
      "close": process.env["M_WX_PROXY_CLOSE" + (i || "")] || "",
      "type": parseInt(process.env["M_WX_PROXY_TYPE" + (i || "")] || 1)
    });
  } catch (_0x1209f7) {
    console.log("读取代理配置 出错", _0x1209f7);
  }
}
const version = "v3.7.1",
  axios = require("axios"),
  fs = require("fs"),
  tunnel = require("tunnel"),
  {
    format
  } = require("date-fns"),
  cheerio = require("cheerio"),
  notify = require("./sendNotify");
let jdCookieNode = require("./jdCookie.js");
const CryptoJS = require("crypto-js");
let base64 = require("base-64");
try {
  base64 = require("base-64");
} catch (_0x451559) {
  console.log("请安装base-64依赖");
}
let NodeRSA;
try {
  NodeRSA = require("node-rsa");
} catch (_0x3971a0) {
  console.log("请安装node-rsa依赖");
}
const h5sts = require("./h5sts.js"),
  H5st = require("./getH5st.js");
let cookies = [],
  redis;
if (isvObfuscatorCacheType === 2) {
  const Redis = require("ioredis"),
    redisUrl = process.env.M_REDIS_URL || "redis://:.T]x;M!()G^-0ckrBPoWCNln3@@172.17.0.1:6379/0";
  redis = new Redis(redisUrl, {
    "keyPrefix": "magic:"
  });
}
Object.keys(jdCookieNode).length > 0 && Object.keys(jdCookieNode).forEach(_0x228a27 => {
  cookies.push(jdCookieNode[_0x228a27]);
});
const JDAPP_USER_AGENTS = ["jdapp;android;10.0.2;9;" + uuid() + ";network/wifi;Mozilla/5.0 (Linux; Android 9; MHA-AL00 Build/HUAWEIMHA-AL00; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/66.0.3359.126 MQQBrowser/6.2 TBS/044942 Mobile Safari/537.36", "jdapp;android;10.0.2;9;" + uuid() + ";network/wifi;Mozilla/5.0 (Linux; Android 9; MI 6 Build/PKQ1.190118.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/66.0.3359.126 MQQBrowser/6.2 TBS/044942 Mobile Safari/537.36", "jdapp;android;10.0.2;9;" + uuid() + ";network/4g;Mozilla/5.0 (Linux; Android 9; Mi Note 3 Build/PKQ1.181007.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/66.0.3359.126 MQQBrowser/6.2 TBS/045131 Mobile Safari/537.36", "jdapp;android;10.0.2;9;" + uuid() + ";network/wifi;Mozilla/5.0 (Linux; Android 9; 16T Build/PKQ1.190616.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/66.0.3359.126 MQQBrowser/6.2 TBS/044942 Mobile Safari/537.36", "jdapp;android;10.0.2;10;" + uuid() + ";network/wifi;Mozilla/5.0 (Linux; Android 10; ONEPLUS A5010 Build/QKQ1.191014.012; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/77.0.3865.120 MQQBrowser/6.2 TBS/045230 Mobile Safari/537.36", "jdapp;android;10.0.2;10;" + uuid() + ";network/wifi;Mozilla/5.0 (Linux; Android 10; M2006J10C Build/QP1A.190711.020; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/77.0.3865.120 MQQBrowser/6.2 TBS/045230 Mobile Safari/537.36", "jdapp;android;10.0.2;10;" + uuid() + ";network/wifi;Mozilla/5.0 (Linux; Android 10; ONEPLUS A6000 Build/QKQ1.190716.003; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/77.0.3865.120 MQQBrowser/6.2 TBS/045224 Mobile Safari/537.36", "jdapp;android;10.0.2;10;" + uuid() + ";network/wifi;Mozilla/5.0 (Linux; Android 10; GM1910 Build/QKQ1.190716.003; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/77.0.3865.120 MQQBrowser/6.2 TBS/045230 Mobile Safari/537.36", "jdapp;android;10.0.2;10;" + uuid() + ";network/wifi;Mozilla/5.0 (Linux; Android 10; LYA-AL00 Build/HUAWEILYA-AL00L; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/77.0.3865.120 MQQBrowser/6.2 TBS/045230 Mobile Safari/537.36", "jdapp;android;10.0.2;10;" + uuid() + ";network/wifi;Mozilla/5.0 (Linux; Android 10; Redmi K20 Pro Premium Edition Build/QKQ1.190825.002; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/77.0.3865.120 MQQBrowser/6.2 TBS/045227 Mobile Safari/537.36", "jdapp;android;10.0.2;11;" + uuid() + ";network/wifi;Mozilla/5.0 (Linux; Android 11; Redmi K20 Pro Premium Edition Build/RKQ1.200826.002; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/77.0.3865.120 MQQBrowser/6.2 TBS/045513 Mobile Safari/537.36", "jdapp;android;10.0.2;10;" + uuid() + ";network/wifi;Mozilla/5.0 (Linux; Android 10; MI 8 Build/QKQ1.190828.002; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/77.0.3865.120 MQQBrowser/6.2 TBS/045227 Mobile Safari/537.36", "jdapp;android;10.0.2;11;" + uuid() + ";network/wifi;Mozilla/5.0 (Linux; Android 11; Redmi K30 5G Build/RKQ1.200826.002; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/77.0.3865.120 MQQBrowser/6.2 TBS/045511 Mobile Safari/537.36", "jdapp;iPhone;10.0.2;14.2;" + uuid() + ";network/wifi;Mozilla/5.0 (iPhone; CPU iPhone OS 14_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1", "jdapp;iPhone;10.0.2;14.3;" + uuid() + ";network/wifi;Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1", "jdapp;iPhone;10.0.2;14.2;" + uuid() + ";network/wifi;Mozilla/5.0 (iPhone; CPU iPhone OS 14_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1", "jdapp;iPhone;10.0.2;11.4;" + uuid() + ";network/wifi;Mozilla/5.0 (iPhone; CPU iPhone OS 11_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15F79", "jdapp;android;10.0.2;10;;" + uuid() + ";network/wifi;Mozilla/5.0 (Linux; Android 10; M2006J10C Build/QP1A.190711.020; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/77.0.3865.120 MQQBrowser/6.2 TBS/045230 Mobile Safari/537.36", "jdapp;iPhone;10.0.2;14.3;" + uuid() + ";network/4g;Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1", "jdapp;iPhone;10.0.2;13.6;" + uuid() + ";network/wifi;Mozilla/5.0 (iPhone; CPU iPhone OS 13_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1", "jdapp;iPhone;10.0.2;13.6;" + uuid() + ";network/wifi;Mozilla/5.0 (iPhone; CPU iPhone OS 13_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1", "jdapp;iPhone;10.0.2;13.5;" + uuid() + ";network/wifi;Mozilla/5.0 (iPhone; CPU iPhone OS 13_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1", "jdapp;iPhone;10.0.2;14.1;" + uuid() + ";network/wifi;Mozilla/5.0 (iPhone; CPU iPhone OS 14_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1", "jdapp;iPhone;10.0.2;13.3;" + uuid() + ";network/wifi;Mozilla/5.0 (iPhone; CPU iPhone OS 13_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1", "jdapp;iPhone;10.0.2;13.7;" + uuid() + ";network/wifi;Mozilla/5.0 (iPhone; CPU iPhone OS 13_7 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1", "jdapp;iPhone;10.0.2;14.1;" + uuid() + ";network/wifi;Mozilla/5.0 (iPhone; CPU iPhone OS 14_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1", "jdapp;iPhone;10.0.2;13.3;" + uuid() + ";network/wifi;Mozilla/5.0 (iPhone; CPU iPhone OS 13_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1", "jdapp;iPhone;10.0.2;13.4;" + uuid() + ";network/wifi;Mozilla/5.0 (iPhone; CPU iPhone OS 13_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1", "jdapp;iPhone;10.0.2;14.3;" + uuid() + ";network/wifi;Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1", "jdapp;iPhone;10.0.2;14.3;" + uuid() + ";network/wifi;Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1", "jdapp;iPhone;10.0.2;14.3;" + uuid() + ";network/4g;Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1", "jdapp;iPhone;10.0.2;14.1;" + uuid() + ";network/wifi;Mozilla/5.0 (iPhone; CPU iPhone OS 14_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1", "jdapp;android;10.0.2;8.1.0;" + uuid() + ";network/wifi;Mozilla/5.0 (Linux; Android 8.1.0; 16 X Build/OPM1.171019.026; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/66.0.3359.126 MQQBrowser/6.2 TBS/044942 Mobile Safari/537.36", "jdapp;android;10.0.2;8.0.0;" + uuid() + ";network/wifi;Mozilla/5.0 (Linux; Android 8.0.0; HTC U-3w Build/OPR6.170623.013; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/66.0.3359.126 MQQBrowser/6.2 TBS/044942 Mobile Safari/537.36", "jdapp;iPhone;10.0.2;14.0.1;" + uuid() + ";network/wifi;Mozilla/5.0 (iPhone; CPU iPhone OS 14_0_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1", "jdapp;android;10.0.2;8.1.0;" + uuid() + ";network/wifi;Mozilla/5.0 (Linux; Android 8.1.0; MI 8 Build/OPM1.171019.026; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/66.0.3359.126 MQQBrowser/6.2 TBS/045131 Mobile Safari/537.36"],
  $ = axios.create({
    "timeout": 20000
  });
$.defaults.headers.Accept = "*/*";
$.defaults.headers.Connection = "keep-alive";
$.defaults.headers["Accept-Language"] = "zh-CN,zh-Hans;q=0.9";
$.defaults.headers["Accept-Encoding"] = "gzip, deflate, br";
$.defaults.retry = 2;
$.defaults.retryDelay = 2000;
let resetRouterTimeInterval = process.env.M_WX_RESET_ROUTER_TIME_INTERVAL ? process.env.M_WX_RESET_ROUTER_TIME_INTERVAL * 1 : 60,
  status493 = false;
function uuid(_0x4f0baf = "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx") {
  return _0x4f0baf.replace(/[xy]/g, function (_0x933b4d) {
    const _0x5c3dec = 16 * Math.random() | 0,
      _0x4e88a2 = "x" === _0x933b4d ? _0x5c3dec : 3 & _0x5c3dec | 8;
    return _0x4e88a2.toString(36);
  });
}
class Env {
  constructor(_0x852665) {
    this.name = _0x852665;
    this.username = "";
    this.cookie = "";
    this.wskey = "";
    this.wskeys = new Map();
    this.originCookies = cookies;
    this.cookies = cookies;
    this.index = "";
    this.ext = [];
    this.msg = [];
    this.delimiter = "";
    this.filename = "";
    this.ticket = "";
    this.appId = "";
    this.algo = {};
    this.bot = false;
    this.openCount = 0;
    this.expire = false;
    this.breakBefore = false;
    this.skipNum = 0;
    this.accounts = {};
    this.accountAddressList = [];
    this.domain = "";
    this.activityUrl = "";
    this.activityId = "";
    this.activityType = "";
    this.tickets = new Map();
    this.addressIndex = 1;
    this.shopName = "";
    this.needOpenCard = false;
    this.urlPrefix = "";
    this.proxyEnable = false;
    this.superVersion = version;
    this.version = "";
    this.shopName = "";
    this.venderId = "";
    this.shopId = "";
    this.ownerUuid = "";
    this.exit = true;
    this.rule = "";
    this.masterNum = masterNum;
    this.prizeList = [];
    this.hdbTypes = hdbTypes;
    this.jinggengcjTypes = jinggengcjTypes;
    this.jinggengTypes = jinggengTypes;
    this.defenseUrls = [];
    this.runAll = false;
    this.currAddrUsername = "";
  }
  async ["run"](_0x10c7b9 = {
    "wait": [1000, 2000],
    "bot": false,
    "delimiter": "",
    "o2o": false,
    "random": false,
    "once": false,
    "wskey": false,
    "mod": 1,
    "multCenter": false,
    "blacklist": [],
    "whitelist": []
  }) {
    try {
      Promise.resolve().then(() => this.forceQuit());
      this.filename = process.argv[1];
      console.log(this.now() + " " + this.name + " " + this.filename + " 开始运行...");
      console.log("TG频道:https://t.me/Wall_E_Group");
      console.log("当前token:\"" + this.desensitizeString(apiToken) + "\"");
      console.log("sign地址:" + this.desensitizeString(apiSignUrl));
      if (this.activityUrl && !this.version) {
        throw new Error("请更新代码");
      }
      console.log("当前版本:" + (this.version || "v1.0.0") + ",依赖版本:" + (this.superVersion || "v1.0.0"));
      if (process.env.M_SYS_INFO === "1") {
        console.log("-----------------系统参数-----------------");
        for (let _0x9f9d99 in process.env) {
          if (!_0x9f9d99.startsWith("M_") || _0x9f9d99.includes("URL") || _0x9f9d99.includes("TOKEN") || _0x9f9d99.includes("ARGV")) continue;
          console.log(_0x9f9d99 + "=\"" + process.env[_0x9f9d99] + "\"");
        }
        console.log("-----------------系统参数-----------------");
      }
      this.__start = this.timestamp();
      let _0x45a8e9 = "";
      try {
        if (mode) _0x45a8e9 = this.readFileSync("/home/magic/Work/wools/doc/account.json");else {
          if (fs.existsSync("utils/account.json")) _0x45a8e9 = this.readFileSync("utils/account.json");else fs.existsSync("/jd/config/account.json") ? _0x45a8e9 = this.readFileSync("/jd/config/account.json") : _0x45a8e9 = this.readFileSync("account.json");
        }
        _0x45a8e9 && JSON.parse(_0x45a8e9).forEach(_0x1b5492 => {
          this.accounts[_0x1b5492.pt_pin] = _0x1b5492;
          _0x1b5492?.["address"] && this.accountAddressList.push(_0x1b5492?.["address"]);
        });
      } catch (_0x16b546) {
        console.log("account.json读取异常", _0x16b546);
        this.msg.push("account.json读取异常");
      }
      await this.config();
      _0x10c7b9?.["delimiter"] && (this.delimiter = _0x10c7b9?.["delimiter"]);
      _0x10c7b9?.["bot"] && (this.bot = _0x10c7b9.bot);
      console.log("原始ck长度", cookies.length);
      if (_0x10c7b9?.["blacklist"]?.["length"] > 0) for (const _0x50a8f6 of this.__as(_0x10c7b9.blacklist)) {
        delete cookies[_0x50a8f6 - 1];
      }
      this.buildActInfo();
      console.log("排除黑名单后ck长度", cookies.length);
      wxWhitelist.length > 0 && wxWhitelistNotSupportFile.filter(_0x5a8e61 => this.filename.includes(_0x5a8e61)).length === 0 && this.filename.includes("_wx_") && (console.log("支持全局无线ck长度:" + wxWhitelist), console.log("支持全局无线ck长度:" + wxWhitelistNotSupportFile), _0x10c7b9.whitelist = wxWhitelist);
      if (_0x10c7b9?.["whitelist"]?.["length"] > 0) {
        let _0x958d23 = [];
        for (const _0x5244b4 of this.__as(_0x10c7b9.whitelist)) {
          if (_0x5244b4 - 1 < cookies.length) {
            _0x958d23.push(cookies[_0x5244b4 - 1]);
          }
        }
        cookies = _0x958d23;
      }
      console.log("设置白名单后ck长度", cookies.length);
      this.delBlackCK();
      console.log("排除PIN黑名单后ck长度", cookies.length);
      if (fs.existsSync("./ck")) {
        for (let _0x5eb09d of fs.readdirSync("./ck")) {
          if (_0x5eb09d.includes(".txt")) {
            let _0x11ef02 = fs.readFileSync("./ck/" + _0x5eb09d, "utf-8");
            _0x11ef02 = _0x11ef02.replace(/\r/g, "");
            _0x11ef02 = _0x11ef02.replace(/\n/g, "&");
            let _0x475462 = _0x11ef02.split("&");
            for (let _0x3db1ec = 0; _0x3db1ec < _0x475462.length; _0x3db1ec++) {
              cookies.push(_0x475462[_0x3db1ec]);
            }
            console.log("读取" + _0x5eb09d + "后ck长度", cookies.length);
          }
        }
      }
      _0x10c7b9?.["random"] && (cookies = this.randomArray(cookies));
      if (_0x10c7b9?.["wskey"]) try {
        let _0xa0cea9 = fs.existsSync(wskeyFile) ? this.readFileSync(wskeyFile).split("\n") : process.env?.["JD_WSCK"]?.["split"]("&") || [];
        for (let _0x18b9da of _0xa0cea9) {
          !_0x18b9da.endsWith(";") && (_0x18b9da += ";");
          if (_0x18b9da.startsWith("pin")) this.wskeys.set(_0x18b9da.match(/pin=([^; ]+)(?=;?)/)[1], _0x18b9da.match(/(pin=.*?;wskey=.*?;)/)[1]);else _0x18b9da.startsWith("wskey") && this.wskeys.set(_0x18b9da.match(/pin=([^; ]+)(?=;?)/)[1], _0x18b9da.match(/(pin=.*?;wskey=.*?;)/)[1]);
        }
        console.log("当前wskey共计" + this.wskeys.size + "个");
      } catch (_0x1be402) {
        console.log("wkeys读取异常", _0x1be402);
        this.msg.push("wkeys读取异常");
      }
      wxProxySmart === 2 && !/(M店铺刮奖|M关注有礼)/.test(this.name) && (await this.routerProxy());
      await this.verify();
      this.cookies = cookies;
      if (_0x10c7b9?.["before"]) for (let _0x4265f2 = 0; _0x4265f2 < this.cookies.length; _0x4265f2++) {
        if (!this.cookies[_0x4265f2]) continue;
        if (this.breakBefore) {
          break;
        }
        let _0x5ea5d0 = this.cookies[_0x4265f2];
        this.cookie = _0x5ea5d0;
        let _0x26674d = _0x5ea5d0.match(/pt_pin=(.+?);/) && _0x5ea5d0.match(/pt_pin=(.+?);/)[1];
        this.username = decodeURIComponent(_0x26674d);
        this.wskey = this.wskeys.get(_0x26674d);
        $.defaults.headers.Cookie = this.cookie;
        this.index = _0x4265f2 + 1;
        try {
          let _0x4c6b43 = await this.before();
          _0x4c6b43 && this.ext.push(Object.assign({
            "username": this.username,
            "index": this.index,
            "cookie": this.cookie
          }, _0x4c6b43));
        } catch (_0x2c9864) {
          console.log(_0x2c9864);
        }
        _0x10c7b9?.["wait"]?.["length"] > 0 && this.index !== cookies.length && !this.breakBefore && (await this.wait(_0x10c7b9?.["wait"][0], _0x10c7b9?.["wait"][1]));
      }
      let _0x5ac0f0 = false;
      _0x571073: for (let _0x5302b3 = 0; _0x5302b3 < this.cookies.length; _0x5302b3++) {
        if (!this.cookies[_0x5302b3]) continue;
        if (this.expire) break;
        let _0x584136 = this.cookies[_0x5302b3];
        this.cookie = _0x584136;
        let _0x550010 = _0x584136.match(/pt_pin=(.+?);/) && _0x584136.match(/pt_pin=(.+?);/)[1];
        this.username = decodeURIComponent(_0x550010);
        this.index = _0x5302b3 + 1;
        if (_0x10c7b9?.["once"] && this.index !== _0x10c7b9.once) {
          _0x5ac0f0 = true;
          continue;
        }
        if (this.skipNum > 0 && this.skipNum-- > 0) {
          this.log("跳过当前ck skipNum=" + this.skipNum);
          continue;
        }
        this.wskey = this.wskeys.get(_0x550010);
        $.defaults.headers.Cookie = this.cookie;
        !_0x10c7b9?.["before"] ? this.ext.push({
          "username": this.username,
          "index": this.index,
          "cookie": this.cookie
        }) : "";
        !(this.activityUrl.includes("prod/cc") || this.activityUrl.includes("interact") || this.activityUrl.includes("crm-proya")) && (this.index > 1 ? this.appId === "wx" ? await this._algo() : "" : "");
        status493 = false;
        for (let _0x1d8522 = 0; _0x1d8522 < 3; _0x1d8522++) {
          try {
            await this.logic();
            _0x10c7b9?.["o2o"] && this.msg.length > 5 && (await this.send(), testMode ? this.log(this.msg.join("\n")) : "", this.msg = []);
            if (_0x5ac0f0) {
              break _0x571073;
            }
            break;
          } catch (_0x1c347a) {
            this.log("捕获异常", _0x1c347a.message);
            try {
              if (this.isProxy(_0x1c347a?.["message"])) {
                await this.routerProxy();
                continue;
              } else {
                if (_0x1c347a?.["response"]?.["status"] === 493 || _0x1c347a?.["message"]?.["includes"]("493")) {
                  await this.router();
                  continue;
                }
              }
              if (_0x1c347a?.["response"]?.["status"] === 403) {
                this.msg.push("IP 403 403 403");
                continue;
              }
              if (status493) {
                this.msg.push("beta测试");
                continue;
              }
              break;
            } catch (_0x3fa6d6) {
              this.log(_0x3fa6d6);
            }
          }
        }
        if (_0x10c7b9?.["wait"]?.["length"] > 0 && this.index !== cookies.length && !this.expire) {
          await this.wait(_0x10c7b9?.["wait"][0], _0x10c7b9?.["wait"][1]);
        }
      }
      try {
        this.msg.length > 0 && this.msg.push("");
        this.actName && this.msg.push("活动名称:" + this.actName);
        this.shopName && this.msg.push("#" + this.shopName);
        this.shopId && this.venderId && !this.shopName && this.msg.push("#" + (await this.getShopName()));
        this.shopId && this.venderId && this.msg.push("店铺信息:" + this.shopId + "_" + this.venderId);
        (this.actStartTime || this.actEndTime) && (this.actStartTime && !("" + this.actStartTime).includes("-") && (this.actStartTime = this.formatDate(this.actStartTime, "yyyy-MM-dd HH:mm:ss")), this.actEndTime && !("" + this.actEndTime).includes("-") && (this.actEndTime = this.formatDate(this.actEndTime, "yyyy-MM-dd HH:mm:ss")), this.msg.push("活动时间:" + (this.actStartTime || "") + "至" + (this.actEndTime || "")));
        await this.after();
        (this.shopId || this.userId || this.venderId) && (this.msg.push(""), this.msg.push("https://shop.m.jd.com/shop/home?shopId=" + (this.shopId || this.userId || this.venderId || "")));
      } catch (_0x1da51e) {
        this.log("after error" + _0x1da51e.message);
      }
      console.log(this.now() + " " + this.name + " 运行结束,耗时 " + (this.timestamp() - this.__start) + "ms\n");
      testMode && this.msg.length > 0 ? console.log(this.msg.join("\n")) : "";
      !this.notSend && !_0x10c7b9?.["o2o"] && (await this.send());
    } finally {
      if (isvObfuscatorCacheType === 2) try {
        await redis.quit();
      } catch (_0x149456) {}
      process.exit(0);
    }
  }
  async ["forceQuit"](_0x10524b = 3) {
    if (process.env?.["M_TIMEOUT_QUIT"]) {
      while ((Date.now() - _currentTime) / 1000 / 60 < _0x10524b) {
        console.log("进程监控中...");
        await this.wait(30 * 1000);
      }
      this.log("进程超时，强制退出");
      if (isvObfuscatorCacheType === 2) {
        try {
          await redis.quit();
        } catch (_0x57916e) {}
      }
      process.exit(0);
    }
  }
  async ["config"]() {}
  ["isProxy"](_0x512f5c = "493") {
    if (wxProxyEnable === 1 && this.index === 1) return;
    return this.isNeedRouter(_0x512f5c);
  }
  ["isNeedRouter"](_0x1543e2) {
    const _0x321ada = new RegExp(proxyRegx);
    return _0x321ada.test(_0x1543e2) && (this.domain.includes("isvjcloud") || this.proxyEnable);
  }
  ["delBlackCK"]() {
    let _0x39d7d4 = [],
      _0x213ed6 = [];
    _0x58ae8c: for (let _0x2492dd = 0; _0x2492dd < cookies.length; _0x2492dd++) {
      if (cookies[_0x2492dd]) {
        let _0x553954 = cookies[_0x2492dd],
          _0x3dbe13 = _0x553954.match(/pt_pin=(.+?);/) && _0x553954.match(/pt_pin=(.+?);/)[1];
        if (this.activityUrl.includes("isvjcloud") && blockPinRegx) for (let _0xcada3b of blockPinRegx.split(";")) {
          let _0x25a7a1 = _0xcada3b.split("@"),
            _0x58f35f = this.activityUrl.match(new RegExp(_0x25a7a1[0]));
          if (_0x58f35f && _0x25a7a1[1].split("|").includes(_0x3dbe13)) {
            _0x213ed6.push(_0x3dbe13);
            continue _0x58ae8c;
          }
        }
        if (blackPinConfig[this.domain]?.["includes"](_0x3dbe13)) {
          continue;
        }
        if (blackPinConfig["*"]?.["includes"](_0x3dbe13)) continue;
        _0x39d7d4.push(_0x553954);
      }
    }
    cookies = _0x39d7d4;
    if (_0x213ed6.length > 0) {
      this.log("匹配到黑名单 " + _0x213ed6.join("|"));
    }
  }
  ["me"]() {
    return this.ext[this.index - 1];
  }
  ["__as"](_0x35c71e) {
    let _0x385748 = [];
    for (let _0xa44726 of _0x35c71e) {
      if (typeof _0xa44726 !== "string") {
        _0x385748.push(_0xa44726);
        continue;
      }
      for (let _0x1e9586 of _0xa44726.split(",")) {
        if (typeof _0x1e9586 === "string") {
          if (_0x1e9586.includes("-")) {
            let _0x9309e8 = _0x1e9586.split("-")[0] * 1,
              _0x9cfeae = _0x1e9586.split("-")[1] * 1;
            if (_0x9cfeae - _0x9309e8 === 1) _0x385748.push(_0x9309e8), _0x385748.push(_0x9cfeae);else {
              for (let _0x54689a = _0x9309e8; _0x54689a <= _0x9cfeae; _0x54689a++) {
                _0x385748.push(_0x54689a);
              }
            }
          } else {
            _0x385748.push(_0x1e9586 * 1);
          }
        } else _0x385748.push(_0x1e9586);
      }
    }
    return _0x385748;
  }
  ["deleteCookie"]() {
    return delete this.cookies[this.index - 1], {};
  }
  ["groupBy"](_0x5c2fd4, _0x5331da) {
    const _0x33d0da = {};
    return _0x5c2fd4.forEach(function (_0x51ad79) {
      const _0x4b53ec = _0x5331da(_0x51ad79);
      _0x33d0da[_0x4b53ec] = _0x33d0da[_0x4b53ec] || [];
      _0x33d0da[_0x4b53ec].push(_0x51ad79);
    }), _0x33d0da;
  }
  async ["send"]() {
    this.msg?.["length"] > 0 && (this.msg.push("\n时间：" + this.now() + " 时长：" + ((this.timestamp() - this.__start) / 1000).toFixed(2) + "s"), this.bot ? await notify.sendNotify("/" + this.name, this.msg.join(this.delimiter || "")) : await notify.sendNotify(this.name, this.msg.join("\n")));
  }
  async ["verify"]() {
    let _0x26a077 = this.filename;
    function _0x251ea3(_0x3e172f) {
      return _0x3e172f.trim().match(/([a-z_])*$/)[0];
    }
    let _0x5cefd9 = "109M95O106F120V95B",
      _0x1ebd51 = "99M102F100O",
      _0x57eda7 = "109H99V",
      _0x1a609d = "102N97I99D116T111G114A121B",
      _0x288798 = "112C112U",
      _0x7f54c9 = "109N95G106B100K95U",
      _0x451051 = "119V120M",
      _0x17d5fa = /[A-Z]/;
    _0x5cefd9.concat(_0x1ebd51).split(_0x17d5fa).map(_0xc7fa1 => +_0xc7fa1).filter(_0x4d3892 => _0x4d3892 > 0).forEach(_0x1016f8 => _0x1ebd51 += String.fromCharCode(_0x1016f8));
    _0x5cefd9.concat(_0x57eda7).split(_0x17d5fa).map(_0x4bad5c => +_0x4bad5c).filter(_0x599be2 => _0x599be2 > 0).forEach(_0x1c0a42 => _0x57eda7 += String.fromCharCode(_0x1c0a42));
    _0x5cefd9.concat(_0x1a609d).split(_0x17d5fa).map(_0x3e988a => +_0x3e988a).filter(_0x5387e => _0x5387e > 0).forEach(_0x3a66e2 => _0x1a609d += String.fromCharCode(_0x3a66e2));
    _0x5cefd9.concat(_0x288798).split(_0x17d5fa).map(_0x3c667d => +_0x3c667d).filter(_0x2cf357 => _0x2cf357 > 0).forEach(_0x2db154 => _0x288798 += String.fromCharCode(_0x2db154));
    _0x7f54c9.concat(_0x451051).split(_0x17d5fa).map(_0x575c53 => +_0x575c53).filter(_0x3f5443 => _0x3f5443 > 0).forEach(_0x2c0773 => _0x451051 += String.fromCharCode(_0x2c0773));
    this.appId = _0x26a077 ? this.name.slice(0, 1) === String.fromCharCode(77) ? _0x26a077.includes(_0x251ea3(_0x1ebd51)) ? "10032" : _0x26a077.includes(_0x251ea3(_0x57eda7)) ? "10028" : _0x26a077.includes(_0x251ea3(_0x1a609d)) ? "10001" : _0x26a077.includes(_0x251ea3(_0x288798)) ? "10038" : _0x26a077.includes(_0x251ea3(_0x451051)) ? "wx" : "" : "" : "";
    this.appId ? this.algo = await this._algo() : "";
  }
  async ["wait"](_0x2891aa, _0x18dfc1) {
    if (_0x2891aa <= 0) return;
    return _0x18dfc1 ? new Promise(_0xee522d => setTimeout(_0xee522d, this.random(_0x2891aa, _0x18dfc1))) : new Promise(_0x3c6138 => setTimeout(_0x3c6138, _0x2891aa));
  }
  ["putMsg"](_0x356442) {
    _currentTime = Date.now();
    _0x356442 += "";
    this.log(_0x356442);
    let _0x183868 = [[" ", ""], ["优惠券", "券"], ["东券", "券"], ["元京东E卡", "元E卡"], ["店铺", ""], ["恭喜", ""], ["获得", ""]];
    for (let _0x108811 of _0x183868) {
      _0x356442 = _0x356442.replace(_0x108811[0], _0x108811[1]);
    }
    _0x356442?.["includes"]("期间下单") && (this.expire = true);
    if (this.bot) this.msg.push(_0x356442);else {
      let _0x10f898 = (this.accounts[this.username]?.["remarks"] || this.username) + this.index;
      if (this.msg.length > 0 && this.msg.filter(_0x10981b => _0x10981b.includes(_0x10f898)).length > 0) for (let _0x247a69 = 0; _0x247a69 < this.msg.length; _0x247a69++) {
        if (this.msg[_0x247a69].includes(_0x10f898)) {
          this.msg[_0x247a69] = this.msg[_0x247a69].split(" ")[0] + "" + [this.msg[_0x247a69].split(" ")[1], _0x356442].join(",");
          break;
        }
      } else {
        this.msg.push("【" + _0x10f898 + "】" + _0x356442);
      }
    }
  }
  ["getRemarks"](_0x26ec20) {
    return this.accounts[_0x26ec20]?.["remarks"] || _0x26ec20;
  }
  ["md5"](_0x194c7d) {
    return CryptoJS.MD5(_0x194c7d).toString();
  }
  ["hmacSHA256"](_0x8ef2bc, _0x3b57ca) {
    return CryptoJS.HmacSHA256(_0x8ef2bc, _0x3b57ca).toString();
  }
  ["encryptCrypto"](_0x35ddeb, _0x44682a, _0x234c40, _0x3cdc72, _0x17f862, _0x31d38c, _0x12ec5b = "Utf8", _0x5a47fd = "Hex") {
    return CryptoJS[_0x35ddeb].encrypt(CryptoJS.enc[_0x12ec5b].parse(_0x3cdc72), CryptoJS.enc.Utf8.parse(_0x17f862), {
      "mode": CryptoJS.mode[_0x44682a],
      "padding": CryptoJS.pad[_0x234c40],
      "iv": CryptoJS.enc.Utf8.parse(_0x31d38c)
    }).ciphertext.toString(CryptoJS.enc[_0x5a47fd]);
  }
  ["decryptCrypto"](_0xae38c, _0x3d7950, _0x3cc8a2, _0x373408, _0x2eeb49, _0x2ddebd, _0x4fda90 = "Base64", _0x3bae00 = "Utf8") {
    return CryptoJS[_0xae38c].decrypt({
      "ciphertext": CryptoJS.enc[_0x4fda90].parse(_0x373408)
    }, CryptoJS.enc.Utf8.parse(_0x2eeb49), {
      "mode": CryptoJS.mode[_0x3d7950],
      "padding": CryptoJS.pad[_0x3cc8a2],
      "iv": CryptoJS.enc.Utf8.parse(_0x2ddebd)
    }).toString(CryptoJS.enc[_0x3bae00]);
  }
  ["rsaEncrypt"](_0x38ae07, _0x26a169, _0x106434) {
    _0x38ae07 = "-----BEGIN PUBLIC KEY-----\n" + _0x38ae07 + "\n-----END PUBLIC KEY-----";
    let _0x58e451 = new NodeRSA(_0x38ae07);
    return _0x58e451.setOptions(_0x26a169), _0x58e451.encrypt(_0x106434, "base64");
  }
  ["log"](..._0x30fcd2) {
    _currentTime = Date.now();
    this.s ? console.log(..._0x30fcd2) : console.log(this.now("HH:mm:ss.SSS") + " cookie" + this.index + " " + (this.accounts[this.username]?.["remarks"] || this.desensitizeString(this.username)), ..._0x30fcd2);
  }
  ["desensitizeString"](_0x47b26e) {
    if (process.env?.["M_LOG_DESENSITIZE"]) {
      return _0x47b26e || "";
    }
    if (!_0x47b26e) return "";
    if (_0x47b26e.length <= 4) return _0x47b26e;
    const _0xa248cf = _0x47b26e,
      _0x4630c2 = _0xa248cf.substring(0, 2),
      _0x1930e7 = _0xa248cf.substring(_0xa248cf.length - 2),
      _0x5100fc = Math.max(0, 8 - _0x4630c2.length - _0x1930e7.length),
      _0x56b049 = "*".repeat(_0x5100fc);
    return (_0x4630c2 + _0x56b049 + _0x1930e7).padEnd(6, "*");
  }
  ["union"](_0x406e04, _0x528378) {
    return Array.from(new Set([..._0x406e04.map(_0x516b9e => _0x516b9e + ""), ..._0x528378.map(_0x12fee9 => _0x12fee9 + "")]));
  }
  ["intersection"](_0x5e8c76, _0xf7974b) {
    const _0x94e89c = _0x5e8c76.map(_0x52df75 => _0x52df75 + "").filter(_0x398071 => _0xf7974b.map(_0x49fb6d => _0x49fb6d + "").includes(_0x398071)),
      _0x3f5c57 = _0xf7974b.map(_0x564365 => _0x564365 + "").filter(_0x1c1041 => _0x5e8c76.map(_0x3c1aa6 => _0x3c1aa6 + "").includes(_0x1c1041));
    return _0x94e89c.concat(_0x3f5c57);
  }
  ["different"](_0x109532, _0x2e0fd2) {
    const _0x4ca800 = _0x109532.map(_0x15cdcb => _0x15cdcb + "").filter(_0x416871 => !_0x2e0fd2.map(_0x322c33 => _0x322c33 + "").includes(_0x416871)),
      _0x424254 = _0x2e0fd2.map(_0x2cbd31 => _0x2cbd31 + "").filter(_0x145023 => !_0x109532.map(_0x211ff1 => _0x211ff1 + "").includes(_0x145023));
    return _0x4ca800.concat(_0x424254);
  }
  ["build"](_0x135c6a) {
    if (_0x135c6a.match(/&callback=(jsonpCBK(.*))&/)) {
      let _0x1b9cf8 = _0x135c6a.match(/&callback=(jsonpCBK(.*))&/);
      _0x135c6a = _0x135c6a.replace(_0x1b9cf8[1], this.randomCallback(_0x1b9cf8[2].length || 0));
    }
    let _0x1d460e = decodeURIComponent(this.getQueryString(_0x135c6a, "_stk") || "");
    if (_0x1d460e) {
      let _0x47a064,
        _0x363f14,
        _0x49df2f = "",
        _0x206df9 = this.now("yyyyMMddHHmmssSSS").toString(),
        _0x18f0b1 = this.algo.tk,
        _0x591628 = this.algo.fp,
        _0x141a9f = this.algo.em;
      if (_0x18f0b1 && _0x591628 && _0x141a9f) _0x363f14 = _0x141a9f(_0x18f0b1, _0x591628, _0x206df9, this.appId, CryptoJS).toString(CryptoJS.enc.Hex);else {
        const _0x39c765 = "5gkjB6SpmC9s";
        _0x18f0b1 = "tk01wcdf61cb3a8nYUtHcmhSUFFCfddDPRvKvYaMjHkxo6Aj7dhzO+GXGFa9nPXfcgT+mULoF1b1YIS1ghvSlbwhE0Xc";
        _0x591628 = "9686767825751161";
        _0x363f14 = CryptoJS.SHA512("" + _0x18f0b1 + _0x591628 + _0x206df9 + this.appId + _0x39c765, _0x18f0b1).toString(CryptoJS.enc.Hex);
      }
      _0x1d460e.split(",").map((_0x320143, _0x537d6e) => {
        _0x49df2f += _0x320143 + ":" + this.getQueryString(_0x135c6a, _0x320143) + (_0x537d6e === _0x1d460e.split(",").length - 1 ? "" : "&");
      });
      _0x47a064 = encodeURIComponent(["".concat(_0x206df9), "".concat(_0x591628), "".concat(this.appId), "".concat(_0x18f0b1), "".concat(CryptoJS.HmacSHA256(_0x49df2f, _0x363f14.toString()).toString(CryptoJS.enc.Hex))].join(";"));
      if (_0x135c6a.match(/[?|&]h5st=(.*?)&/)) {
        _0x135c6a = _0x135c6a.replace(_0x135c6a.match(/[?|&]h5st=(.*?)&/)[1], "H5ST").replace(/H5ST/, _0x47a064);
      }
      let _0x24aab7 = [/[?|&]_time=(\d+)/, /[?|&]__t=(\d+)/, /[?|&]_ts=(\d+)/, /[?|&]_=(\d+)/, /[?|&]t=(\d+)/, /[?|&]_cfd_t=(\d+)/];
      for (let _0x165122 of _0x24aab7) {
        _0x135c6a.match(_0x165122) && (_0x135c6a = _0x135c6a.replace(_0x135c6a.match(_0x165122)[1], Date.now()));
      }
      let _0x595097 = this._tk();
      _0x135c6a.match(/strPgUUNum=(.*?)&/) && (_0x135c6a = _0x135c6a.replace(_0x135c6a.match(/strPgUUNum=(.*?)&/)[1], _0x595097.tk), _0x135c6a.match(/strPhoneID=(.*?)&/) && (_0x135c6a = _0x135c6a.replace(_0x135c6a.match(/strPhoneID=(.*?)&/)[1], _0x595097.id)), _0x135c6a.match(/strPgtimestamp=(.*?)&/) && (_0x135c6a = _0x135c6a.replace(_0x135c6a.match(/strPgtimestamp=(.*?)&/)[1], _0x595097.ts)));
      if (_0x135c6a.match(/jxmc_jstoken=(.*?)&/)) {
        _0x135c6a = _0x135c6a.replace(_0x135c6a.match(/jxmc_jstoken=(.*?)&/)[1], _0x595097.tk);
        if (_0x135c6a.match(/phoneid=(.*?)&/)) {
          _0x135c6a = _0x135c6a.replace(_0x135c6a.match(/phoneid=(.*?)&/)[1], _0x595097.id);
        }
        _0x135c6a.match(/timestamp=(.*?)&/) && (_0x135c6a = _0x135c6a.replace(_0x135c6a.match(/timestamp=(.*?)&/)[1], _0x595097.ts));
      }
    }
    return _0x135c6a;
  }
  ["getQueryString"](_0x314585, _0x935983) {
    let _0xf9798 = new RegExp("(^|[&?])" + _0x935983 + "=([^&]*)(&|$)"),
      _0x3a0ae8 = _0x314585.match(_0xf9798);
    if (_0x3a0ae8 != null) {
      return unescape(_0x3a0ae8[2]);
    }
    return "";
  }
  ["unique"](_0x1a29e8) {
    return Array.from(new Set(_0x1a29e8));
  }
  async ["logic"]() {
    console.log("default logic");
  }
  async ["before"]() {
    return -1;
  }
  async ["after"]() {
    return -1;
  }
  ["tryLock"](_0x4dccd8, _0x589c1e) {
    try {
      return fs.accessSync("/jd/log/lock/" + _0x589c1e + "_" + _0x4dccd8), false;
    } catch (_0x207410) {
      return true;
    }
  }
  ["setLock"](_0x3c2010, _0x34440d) {
    try {
      try {
        fs.accessSync("/jd/log/lock");
      } catch (_0x2b6555) {
        fs.mkdirSync("/jd/log/lock");
      }
      return fs.mkdirSync("/jd/log/lock/" + _0x34440d + "_" + _0x3c2010), false;
    } catch (_0x5d4294) {
      return true;
    }
  }
  ["match"](_0x5ca98f, _0x1470a1) {
    _0x5ca98f = _0x5ca98f instanceof Array ? _0x5ca98f : [_0x5ca98f];
    for (let _0x1e9d99 of _0x5ca98f) {
      const _0x2af00a = _0x1e9d99.exec(_0x1470a1);
      if (_0x2af00a) {
        const _0x48e585 = _0x2af00a.length;
        if (_0x48e585 === 1) {
          return _0x2af00a;
        } else {
          if (_0x48e585 === 2) return _0x2af00a[1];else {
            const _0x4df352 = [];
            for (let _0x30bf66 = 1; _0x30bf66 < _0x48e585; _0x30bf66++) {
              _0x4df352.push(_0x2af00a[_0x30bf66]);
            }
            return _0x4df352;
          }
        }
      }
    }
    return "";
  }
  ["matchAll"](_0x773ad7, _0x4198cd) {
    _0x773ad7 = _0x773ad7 instanceof Array ? _0x773ad7 : [_0x773ad7];
    let _0x86feea,
      _0x33c883 = [];
    for (let _0x7e39a5 of _0x773ad7) {
      while ((_0x86feea = _0x7e39a5.exec(_0x4198cd)) != null) {
        let _0xc2f81e = _0x86feea.length;
        if (_0xc2f81e === 1) _0x33c883.push(_0x86feea);else {
          if (_0xc2f81e === 2) _0x33c883.push(_0x86feea[1]);else {
            let _0x44d47c = [];
            for (let _0x25607d = 1; _0x25607d < _0xc2f81e; _0x25607d++) {
              _0x44d47c.push(_0x86feea[_0x25607d]);
            }
            _0x33c883.push(_0x44d47c);
          }
        }
      }
    }
    return _0x33c883;
  }
  async ["countdown"](_0x467536 = 1, _0xef5567 = 200) {
    let _0xb74b61 = new Date();
    if (_0x467536 === 1 && _0xb74b61.getMinutes() < 50 || _0x467536 === 2 && _0xb74b61.getMinutes() < 25 || _0x467536 === 3 && _0xb74b61.getMinutes() < 10 || _0x467536 === 4 && _0xb74b61.getMinutes() < 5) {
      return;
    }
    let _0x56b5f8 = _0xef5567;
    if (_0x467536 !== 9) {
      switch (_0x467536) {
        case 1:
          _0xb74b61.setHours(_0xb74b61.getHours() + 1), _0xb74b61.setMinutes(0);
          break;
        case 2:
          _0xb74b61.setMinutes(30);
          break;
        case 3:
          _0xb74b61.setMinutes(15);
          break;
        case 4:
          _0xb74b61.setMinutes(10);
          break;
        default:
          console.log("不支持");
      }
      _0xb74b61.setSeconds(0);
      _0xb74b61.setMilliseconds(0);
      _0x56b5f8 = _0xb74b61.getTime() - Date.now() - _0xef5567;
    }
    _0x56b5f8 > 0 && (console.log("需要等待时间" + _0x56b5f8 / 1000 + " 秒"), await this.wait(_0x56b5f8));
  }
  ["readFileSync"](_0x560c75) {
    try {
      return fs.readFileSync(_0x560c75).toString();
    } catch (_0x185e83) {
      return console.log(_0x560c75, "文件不存在进行创建"), this.writeFileSync(_0x560c75, ""), "";
    }
  }
  ["writeFileSync"](_0x2d2c45, _0x426dd8) {
    fs.writeFileSync(_0x2d2c45, _0x426dd8);
  }
  ["random"](_0x282f07, _0x3b4e9f) {
    return Math.min(Math.floor(_0x282f07 + Math.random() * (_0x3b4e9f - _0x282f07)), _0x3b4e9f);
  }
  async ["taskToDo"](_0x5a370d) {
    _0x5a370d.data.taskList.filter(_0x6bfdbc => ![8, 15, 13].includes(_0x6bfdbc.taskType * 1)).length === 0 && this.log("没有任务");
    let _0x1b7956 = _0x5a370d.data.taskList;
    for (let _0x4cecd1 of _0x1b7956.filter(_0x133080 => _0x133080.status === 0 && (_0x133080.completeCount < _0x133080.finishNum || _0x133080.completeCount < _0x133080.maxNum)) || []) {
      try {
        if ([1, 2, 4, 10, 12, 14].includes(_0x4cecd1.taskType)) await this.api("/api/basic/task/toDo", {
          "skuId": "",
          "taskId": _0x4cecd1.taskId
        });else {
          if ([3, 5, 6, 7, 9].includes(_0x4cecd1.taskType)) {
            let _0x52da9f = _0x4cecd1.skuInfoVO.filter(_0x16376f => _0x16376f.status === 0);
            for (let _0xaae560 = 0; _0xaae560 < _0x52da9f.length && (_0xaae560 < _0x4cecd1.finishNum || _0xaae560 < _0x4cecd1.maxNum); _0xaae560++) {
              await this.api("/api/basic/task/toDo", {
                "skuId": _0x52da9f[_0xaae560].skuId,
                "taskId": _0x4cecd1.taskId
              });
            }
          }
        }
      } catch (_0x41cc8f) {
        this.log(_0x41cc8f.message, JSON.stringify(_0x4cecd1));
      }
    }
  }
  async ["notify"](_0x10b031, _0xbf5a70) {
    return notify.sendNotify(_0x10b031, _0xbf5a70);
  }
  async ["get"](_0x3bc130, _0x53fe60) {
    return _0x3bc130 = this.appId ? this.build(_0x3bc130) : _0x3bc130, new Promise((_0x5cfe40, _0x4705d1) => {
      $.get(_0x3bc130, {
        "headers": _0x53fe60
      }).then(_0x5912c8 => _0x5cfe40(this.handler(_0x5912c8) || _0x5912c8)).catch(_0x3a87b2 => _0x4705d1(_0x3a87b2));
    });
  }
  async ["post"](_0x1039ed, _0x51e54c, _0x5b005d) {
    return _0x1039ed = this.appId ? this.build(_0x1039ed) : _0x1039ed, new Promise((_0x86f37b, _0x526981) => {
      $.post(_0x1039ed, _0x51e54c, {
        "headers": _0x5b005d
      }).then(_0x1c18fd => _0x86f37b(this.handler(_0x1c18fd) || _0x1c18fd)).catch(_0x38ccb7 => _0x526981(_0x38ccb7));
    });
  }
  async ["request"](_0x423db9, _0x4d33d7, _0x51c05c) {
    return new Promise((_0x44527c, _0x3519f1) => {
      let _0x561e51 = setTimeout(() => {
          console.log("超时异常进行重试");
          _0x3519f1(new Error("Request timeout"));
        }, 50000),
        _0x477699 = _0x4d33d7?.["headers"] ? _0x4d33d7 : {
          "headers": _0x4d33d7
        };
      (_0x51c05c ? $.post(_0x423db9, _0x51c05c, _0x477699) : $.get(_0x423db9, _0x477699)).then(_0x472dcc => {
        clearTimeout(_0x561e51);
        this.__lt(_0x472dcc);
        _0x44527c(_0x472dcc);
      }).catch(_0x55b025 => {
        clearTimeout(_0x561e51);
        _0x3519f1(_0x55b025);
      });
    });
  }
  ["__lt"](_0x58ea57) {
    let _0x54a350 = _0x58ea57?.["headers"]["set-cookie"] || _0x58ea57?.["headers"]["Set-Cookie"] || [],
      _0x25acb4 = typeof _0x54a350 != "object" ? _0x54a350.split(",") : _0x54a350;
    for (let _0x3bbf17 of _0x25acb4) {
      let _0xed6828 = _0x3bbf17.split(";")[0].trim().split("=");
      this.tickets.set(_0xed6828[0], _0xed6828[1]);
    }
    this.ticket = "";
    for (let [_0x364a86, _0x10e717] of this.tickets.entries()) {
      this.ticket += _0x364a86 + "=" + _0x10e717 + ";";
    }
  }
  ["handler"](_0x49ecd0) {
    let _0x53906d = _0x49ecd0?.["data"] || _0x49ecd0?.["body"] || _0x49ecd0;
    if (!_0x53906d) {
      return;
    }
    if (typeof _0x53906d === "string") {
      if (_0x53906d.startsWith("<") || _0x53906d.startsWith("(function")) {
        return _0x53906d;
      } else {
        _0x53906d = _0x53906d.replace(/[\n\r| ]/g, "");
        if (_0x53906d.includes("try{jsonpCB")) _0x53906d = _0x53906d.replace(/try{jsonpCB.*\({/, "{").replace(/}\)([;])?}catch\(e\){}/, "}");else {
          if (_0x53906d.includes("jsonpCB")) {
            let _0x92c2f5 = _0x53906d.replace(/[\n\r]/g, "").replace(/jsonpCB.*\({/, "{");
            _0x53906d = _0x92c2f5.substring(0, _0x92c2f5.length - 1);
          } else _0x53906d.match(/try{.*\({/) ? _0x53906d = _0x53906d.replace(/try{.*\({/, "{").replace(/}\)([;])?}catch\(e\){}/, "}") : _0x53906d = /.*?({.*}).*/g.exec(_0x53906d)?.[1] || "{}";
        }
        return JSON.parse(_0x53906d);
      }
    }
    return _0x53906d;
  }
  ["randomNum"](_0x53de12) {
    _0x53de12 = _0x53de12 || 32;
    let _0x1d79e3 = "0123456789",
      _0x3dc17c = _0x1d79e3.length,
      _0x2dbbbb = "";
    for (let _0x456a8c = 0; _0x456a8c < _0x53de12; _0x456a8c++) {
      _0x2dbbbb += _0x1d79e3.charAt(Math.floor(Math.random() * _0x3dc17c));
    }
    return _0x2dbbbb;
  }
  ["randomString"](_0xdb5287) {
    return this.uuid();
  }
  ["randomPattern"](_0x22b8ea, _0x112f88 = "abcdef0123456789") {
    let _0x29ed9b = "";
    for (let _0x236a39 of _0x22b8ea) {
      if (_0x236a39 == "x") _0x29ed9b += _0x112f88.charAt(Math.floor(Math.random() * _0x112f88.length));else _0x236a39 == "X" ? _0x29ed9b += _0x112f88.charAt(Math.floor(Math.random() * _0x112f88.length)).toUpperCase() : _0x29ed9b += _0x236a39;
    }
    return _0x29ed9b;
  }
  ["randomCallback"](_0x332cb9 = 1) {
    let _0x9e8b82 = "abcdefghigklmnopqrstuvwsyz",
      _0x48c71c = _0x9e8b82.length,
      _0x1a2cec = "";
    for (let _0x246bcf = 0; _0x246bcf < _0x332cb9; _0x246bcf++) {
      _0x1a2cec += _0x9e8b82.charAt(Math.floor(Math.random() * _0x48c71c));
    }
    return "jsonpCBK" + _0x1a2cec.toUpperCase();
  }
  ["randomArray"](_0x2f0b8f, _0x2ada6b) {
    _0x2ada6b = _0x2ada6b || _0x2f0b8f.length;
    let _0x13e5e9 = _0x2f0b8f.slice(0),
      _0x31ccfe = _0x2f0b8f.length,
      _0x14ae0d = _0x31ccfe - _0x2ada6b,
      _0x1fe411,
      _0x23f1c5;
    while (_0x31ccfe-- > _0x14ae0d) {
      _0x23f1c5 = Math.floor((_0x31ccfe + 1) * Math.random());
      _0x1fe411 = _0x13e5e9[_0x23f1c5];
      _0x13e5e9[_0x23f1c5] = _0x13e5e9[_0x31ccfe];
      _0x13e5e9[_0x31ccfe] = _0x1fe411;
    }
    return _0x13e5e9.slice(_0x14ae0d);
  }
  ["now"](_0x463532) {
    return format(Date.now(), _0x463532 || "yyyy-MM-dd HH:mm:ss.SSS");
  }
  ["formatDate"](_0x4800bd, _0x5861bd) {
    return format(typeof _0x4800bd === "object" ? _0x4800bd : new Date(typeof _0x4800bd === "string" ? _0x4800bd * 1 : _0x4800bd), _0x5861bd || "yyyy-MM-dd");
  }
  ["formatDateTime"](_0xc8f14c, _0x3c7941) {
    return format(typeof _0xc8f14c === "object" ? _0xc8f14c : new Date(typeof _0xc8f14c === "string" ? _0xc8f14c * 1 : _0xc8f14c), _0x3c7941 || "yyyy-MM-dd HH:mm:ss");
  }
  ["parseDate"](_0x62a1b6) {
    return new Date(Date.parse(_0x62a1b6.replace(/-/g, "/")));
  }
  ["timestamp"]() {
    return new Date().getTime();
  }
  ["uuid"](_0x51389b = "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx") {
    return _0x51389b.replace(/[xy]/g, function (_0x62d4ea) {
      const _0x2ed608 = 16 * Math.random() | 0,
        _0x5be7fb = "x" === _0x62d4ea ? _0x2ed608 : 3 & _0x2ed608 | 8;
      return _0x5be7fb.toString(36);
    });
  }
  async ["unfollow"](_0x4866aa = this.shopId) {
    let _0x1cadf9 = {
        "authority": "api.m.jd.com",
        "accept": "*/*",
        "origin": "https://shop.m.jd.com",
        "referer": "https://shop.m.jd.com/",
        "user-agent": this.UA,
        "Cookie": this.cookie
      },
      _0x5a0aae = {
        "shopId": _0x4866aa,
        "follow": false
      },
      _0x598663 = "https://api.m.jd.com/client.action?functionId=whx_followShop&appid=shop_m_jd_com&body=" + encodeURIComponent(JSON.stringify(_0x5a0aae)),
      _0x54bca4 = await this.get(_0x598663, _0x1cadf9);
    return _0x54bca4;
  }
  async ["getShopInfo"](_0x20b89b = this.venderId, _0x1636ef = this.shopId) {
    try {
      if (openCardMode.includes("wh5")) {
        let _0x5098b6 = {
            "authority": "api.m.jd.com",
            "accept": "*/*",
            "accept-language": "zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6",
            "origin": "https://shop.m.jd.com",
            "referer": "https://shop.m.jd.com/",
            "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36 Edg/107.0.1418.42"
          },
          _0x36939d = "https://api.m.jd.com/client.action?functionId=whx_getMShopOutlineInfo&appid=shop_view&clientVersion=11.0.0&client=wh5&body=" + encodeURIComponent(JSON.stringify({
            "shopId": _0x1636ef
          })),
          {
            status: _0xe8df54,
            data: _0x24171e
          } = await this.request(_0x36939d, _0x5098b6);
        return _0x24171e.data?.["shopInfo"];
      } else {
        let _0x369955 = await this.sign("getShopHomeBaseInfo", {
            "source": "app-shop",
            "latWs": "0",
            "lngWs": "0",
            "displayWidth": "1098.000000",
            "sourceRpc": "shop_app_home_home",
            "lng": "0",
            "lat": "0",
            "venderId": _0x20b89b,
            "navigationAbTest": "1"
          }),
          _0xf1e390 = {
            "J-E-H": "",
            "Connection": "keep-alive",
            "Accept-Encoding": "gzip, deflate, br",
            "Content-Type": "application/x-www-form-urlencoded",
            "Host": "api.m.jd.com",
            "Referer": "",
            "J-E-C": "",
            "Accept-Language": "zh-Hans-CN;q=1, en-CN;q=0.9",
            "Accept": "*/*",
            "User-Agent": "JD4iPhone/167841 (iPhone; iOS; Scale/3.00)"
          },
          _0x4787f6 = "https://api.m.jd.com/client.action?functionId=" + _0x369955.fn,
          {
            status: _0x4f3971,
            data: _0x4b811d
          } = await this.request(_0x4787f6, _0xf1e390, _0x369955.sign);
        return _0x4b811d.result?.["shopInfo"];
      }
    } catch (_0x551f6f) {
      return console.log(_0x551f6f), {};
    }
  }
  async ["getShopBaseInfo"](_0x364ee0 = this.venderId, _0x48cc1f = this.shopId) {
    let _0x14cf06 = "";
    if (_0x364ee0) _0x14cf06 = "https://chat1.jd.com/api/checkChat?callback=jQuery7749929&venderId=" + _0x364ee0 + "&_=" + this.timestamp();else _0x48cc1f && (_0x14cf06 = "https://chat1.jd.com/api/checkChat?callback=jQuery7749929&shopId=" + _0x48cc1f + "&_=" + this.timestamp());
    let _0x396143 = await this.request(_0x14cf06, {
      "authority": "chat1.jd.com",
      "Accept": "*/*",
      "Connection": "keep-alive",
      "Cookie": this.cookie,
      "User-Agent": this.ua(),
      "Accept-Language": "zh-cn",
      "Accept-Encoding": "gzip, deflate",
      "referer": "https://mall.jd.com/shopBrandMember-" + (_0x364ee0 || _0x48cc1f) + ".html"
    });
    const _0x4478ab = JSON.parse(_0x396143?.["data"]?.["replace"](/^jQuery\d+\(/, "")?.["replace"](/\);$/, "") || "{}");
    return {
      "shopId": _0x4478ab.shopId,
      "venderId": _0x4478ab.venderId,
      "shopName": _0x4478ab.seller
    };
  }
  async ["getShopName"](_0x54d773 = this.venderId, _0x351ab0 = this.shopId) {
    this.shopName = (await this.getShopBaseInfo())?.["shopName"];
    if (!this.shopName) {
      let _0x30bf4d = await this.getShopInfo(_0x54d773, _0x351ab0);
      this.shopName = _0x30bf4d?.["shopName"];
    }
    return this.shopName || "未知";
  }
  async ["sendTGMsg"](_0x46f230) {
    await this.sendMessage(process.env.TG_USER_ID, _0x46f230);
  }
  async ["sendMessage"](_0x1761b7 = process.env.TG_USER_ID, _0x5195b3, _0x100855 = 1, _0x3bc3c4 = process.env.TG_BOT_TOKEN) {
    if (mode) return;
    let _0x5e6cae = "https://api.telegram.org/bot" + _0x3bc3c4 + "/sendMessage",
      _0x53f2cd = {
        "chat_id": _0x1761b7,
        "text": _0x5195b3,
        "disable_web_page_preview": true
      },
      _0x2b87e7 = {
        "Content-Type": "application/json",
        "Cookie": "10089"
      };
    process.env.TG_PROXY_HOST && process.env.TG_PROXY_PORT && ($.defaults.proxy = false, $.defaults.httpsAgent = tunnel.httpsOverHttp({
      "proxy": {
        "host": process.env.TG_PROXY_HOST,
        "port": process.env.TG_PROXY_PORT * 1
      }
    }));
    let {
      data: _0x32bfe8
    } = await this.request(_0x5e6cae, _0x2b87e7, _0x53f2cd);
    if (_0x32bfe8?.["description"]?.["includes"]("long")) {
      await this.sendMessage(_0x1761b7, _0x5195b3.substring(0, 300), ++_0x100855);
      return;
    }
    !_0x32bfe8?.["ok"] && _0x100855 < 5 && ($.log("重试中", _0x5195b3), await $.wait(1000, 2000), await this.sendMessage(_0x1761b7, _0x5195b3, ++_0x100855));
  }
  ["ua"](_0x3fb012 = "jd") {
    return JDAPP_USER_AGENTS[this.random(0, JDAPP_USER_AGENTS.length)];
  }
  async ["wxStop"](_0x4b9cdc) {
    let _0x27a037 = false;
    for (let _0xbd9a93 of stopKeywords) {
      if (_0xbd9a93 && _0x4b9cdc?.["includes"](_0xbd9a93)) {
        _0x27a037 = true;
        this.expire = true;
        break;
      }
    }
    return _0x27a037;
  }
  async ["wxAddressStop"](_0x1f6a4e) {
    return _0x1f6a4e && _0x1f6a4e.match(new RegExp("(" + addressStopKeywords.join("|") + ")")) != null;
  }
  async ["wxAddressStopRule"](_0x47c6ff = this.rule) {
    try {
      if (!_0x47c6ff && this.urlPrefix) {
        let _0x381ea0 = await this.api("/api/active/getRule", {});
        _0x381ea0?.["resp_code"] === 0 && (_0x47c6ff = _0x381ea0?.["data"]);
      }
    } catch (_0x1d535f) {
      console.log(_0x1d535f);
    }
    return _0x47c6ff && _0x47c6ff.match(new RegExp("(" + addressStopKeywordsRule.join("|") + ")")) != null;
  }
  ["_tk"]() {
    let _0x14a1f4 = function (_0xc7586f) {
        let _0x47761c = "abcdefghijklmnopqrstuvwxyz1234567890",
          _0x52624e = "";
        for (let _0x1c4356 = 0; _0x1c4356 < _0xc7586f; _0x1c4356++) {
          _0x52624e += _0x47761c[Math.floor(_0x47761c.length * Math.random())];
        }
        return _0x52624e;
      }(40),
      _0x5446ce = Date.now().toString(),
      _0x569b5a = this.md5("" + decodeURIComponent(this.username) + _0x5446ce + _0x14a1f4 + "tPOamqCuk9NLgVPAljUyIHcPRmKlVxDy");
    return {
      "ts": _0x5446ce,
      "id": _0x14a1f4,
      "tk": _0x569b5a
    };
  }
  async ["_algo"](_0x1bbcec = 0) {
    if (this.appId === "wx") {
      this.tickets = new Map();
      let _0x28a6b3 = {
        "Accept-Encoding": "gzip, deflate, br",
        "Connection": "keep-alive",
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 14_5_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.1 Mobile/15E148 Safari/604.1",
        "Accept-Language": "zh-cn",
        "Cookie": this.cookie
      };
      try {
        this.domain.includes("lzkj") || this.domain.includes("lzdz") || this.domain.includes("cjhy") ? await this.request("https://" + this.domain + "/wxTeam/activity?activityId=" + this.activityId, _0x28a6b3) : await this.request(this.activityUrl, _0x28a6b3);
      } catch (_0x4573bb) {
        if (_0x1bbcec < 3) {
          if (this.isProxy(_0x4573bb.message)) await this.routerProxy(_0x1bbcec), this.msg.push("493启用代理重试" + _0x1bbcec), this.log("493去重试，第" + _0x1bbcec + "次重试...");else _0x4573bb.message?.["includes"]("493") && (await this.router());
          return await this._algo(++_0x1bbcec);
        }
      }
      return "";
    } else {
      let _0x46d7c1 = function () {
          let _0x4f199a = "0123456789",
            _0x77a948 = 13,
            _0x2e616f = "";
          for (; _0x77a948--;) {
            _0x2e616f += _0x4f199a[Math.random() * _0x4f199a.length | 0];
          }
          return (_0x2e616f + Date.now()).slice(0, 16);
        }(),
        _0x161432 = await this.post("https://cactus.jd.com/request_algo?g_ty=ajax", JSON.stringify({
          "version": "1.0",
          "fp": _0x46d7c1,
          "appId": this.appId,
          "timestamp": this.timestamp(),
          "platform": "web",
          "expandParams": ""
        }), {
          "Authority": "cactus.jd.com",
          "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1",
          "Content-Type": "application/json",
          "Origin": "https://st.jingxi.com",
          "Referer": "https://st.jingxi.com/"
        });
      return {
        "fp": _0x46d7c1.toString(),
        "tk": _0x161432?.["data"]?.["result"]?.["tk"] || _0x161432?.["result"]?.["tk"],
        "em": new Function("return " + (_0x161432?.["data"]?.["result"]?.["algo"] || _0x161432?.["result"]?.["algo"]))()
      };
    }
  }
  async ["routerProxy"](_0xd2546c = 0) {
    if (wxProxyEnable === 1) return;
    if (!proxies.find(_0x3cdfe7 => !_0x3cdfe7.close)) {
      this.log("所有代理已关闭");
      this.expire = true;
      this.proxy = null;
      return;
    }
    this.proxy = proxies.filter(_0x397799 => !_0x397799.close)[0];
    this.log("开始从M_WX_PROXY_URL" + (this.proxy.index - 1 || "") + "获取代理");
    let _0x40887d = await this.getProxyByUrl(this.proxy);
    !_0x40887d && (await this.routerProxy());
  }
  async ["getProxyByUrl"](_0x473430) {
    let _0x354177 = _0x473430.url;
    var _0xe3cecb = false;
    try {
      $.defaults.proxy = false;
      $.defaults.httpsAgent = false;
      $.defaults.httpAgent = false;
      let _0x2fe573 = await $.get(_0x354177);
      if (_0x354177.includes("=json")) {
        let _0x39134d = JSON.stringify(_0x2fe573.data),
          _0x12c738 = _0x2fe573.data.data;
        _0x2fe573.data.data?.["list"] && (_0x12c738 = _0x2fe573.data.data.list);
        if (_0x12c738) {
          if (_0x12c738[0]?.["port"]) _0xe3cecb = true, this.log("获取到的IP:" + _0x12c738[0].ip + ":" + _0x12c738[0].port), await this.setProxy(_0x12c738[0].ip + ":" + _0x12c738[0].port);else {
            const _0x1d13e3 = /(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}:\d+|[a-zA-Z0-9.-]+:\d+)/,
              _0xb2e7e0 = _0x39134d.match(_0x1d13e3);
            if (_0xb2e7e0) this.log("获取到的IP:" + _0xb2e7e0[0]), _0xe3cecb = true, await this.setProxy(_0xb2e7e0[0]);else {
              proxies.filter(_0x2ac680 => _0x2ac680.index = _0x473430.index)[0].close = true;
              this.log(JSON.stringify(_0x39134d));
            }
          }
        } else proxies.filter(_0x168da8 => _0x168da8.index = _0x473430.index)[0].close = true, this.log(JSON.stringify(_0x39134d));
      } else {
        let _0x4ab0e0 = _0x2fe573.data.toString().replace("\r\n", "").replace("\n", ""),
          _0x547782 = _0x4ab0e0?.["includes"]("@") ? _0x4ab0e0.split("@")[0] : "";
        const _0x33568a = /(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}:\d+|[a-zA-Z0-9.-]+:\d+)/,
          _0x36bf63 = _0x4ab0e0.match(_0x33568a);
        _0x36bf63 ? (this.log("获取到的IP:" + _0x36bf63[0]), _0xe3cecb = true, await this.setProxy(_0x36bf63[0], _0x547782)) : (proxies.filter(_0x292860 => _0x292860.index = _0x473430.index)[0].close = true, this.log(JSON.stringify(_0x4ab0e0)));
      }
    } catch (_0x262378) {
      this.log("M_WX_PROXY_URL" + (_0x473430.index - 1 || "") + "代理获取异常，切换下一个");
      proxies.filter(_0x351768 => _0x351768.index = _0x473430.index)[0].close = true;
    }
    return _0xe3cecb;
  }
  async ["setProxy"](_0x3ee907, _0x23b77a = "") {
    let _0x4a1a98 = _0x3ee907.split(":");
    $.defaults.proxy = false;
    let _0xac4fa4 = {
      "host": _0x4a1a98[0],
      "port": _0x4a1a98[1]
    };
    if (_0x23b77a) {
      _0xac4fa4.proxyAuth = _0x23b77a;
    }
    $.defaults.httpsAgent = tunnel.httpsOverHttp({
      "proxy": _0xac4fa4
    });
    $.defaults.httpAgent = tunnel.httpsOverHttp({
      "proxy": _0xac4fa4
    });
  }
  async ["router"]() {
    if (reRouterEnable === 1) {
      return;
    }
    !fs.existsSync("magic.lock") && fs.writeFileSync("magic.lock", Date.now().toString());
    let _0x530500 = fs.readFileSync("magic.lock").toString() * 1;
    (Date.now() - _0x530500) / 1000 > resetRouterTimeInterval && (fs.writeFileSync("magic.lock", Date.now().toString()), await notify.sendNotify("M自动重新拨号", this.filename), await notify.sendNotify(reRouterMsg, ""), await this.wait(3 * 1000, 5 * 1000));
  }
  async ["isvObfuscator"](_0x253b02 = enableCacheToken, _0x40b817 = isvObfuscatorRetry, _0x27e145 = this.cookie, _0x299676 = isvObfuscatorCacheType) {
    let _0x13a0af = decodeURIComponent(_0x27e145.match(/pt_pin=(.+?);/) && _0x27e145.match(/pt_pin=(.+?);/)[1]);
    if (_0x253b02 === 1) {
      this.log("缓存获取 isvToken");
      if (_0x299676 === 2) {
        let _0xe72637 = await this.rget("isvObfuscator:" + _0x13a0af);
        if (_0xe72637) return this.Token = _0xe72637, this.isvToken = _0xe72637, {
          "code": "0",
          "token": _0xe72637
        };
      } else {
        !fs.existsSync("tokens") && fs.mkdirSync("tokens");
        let _0x43a7de = JSON.parse(this.readFileSync("tokens/" + _0x13a0af + ".json") || "{}");
        if (_0x43a7de && _0x43a7de.token && _0x43a7de?.["expireTime"] > this.timestamp()) return this.Token = _0x43a7de.token, this.isvToken = _0x43a7de.token, {
          "code": "0",
          "token": _0x43a7de.token
        };
      }
    }
    let _0x5595b7 = "body=%7B%22url%22%3A%22https%3A%2F%2Fcjhy-isv.isvjcloud.com%22%2C%22id%22%3A%22%22%7D&uuid=b024526b380d35c9e3&client=apple&clientVersion=10.0.10&st=1646999134786&sv=111&sign=fd9417f9d8e872da6c55102bd69da99f";
    try {
      let _0x38532 = await this.sign("isvObfuscator", {
        "id": "",
        "url": "https://" + this.domain
      });
      _0x38532.sign && (_0x5595b7 = _0x38532.sign);
      let _0x1c37ee = "https://api.m.jd.com/client.action?functionId=isvObfuscator",
        _0x5a1c35 = {
          "Accept": "*/*",
          "Accept-Encoding": "gzip, deflate, br",
          "Accept-Language": "zh-cn",
          "Connection": "keep-alive",
          "Content-Type": "application/x-www-form-urlencoded",
          "Host": "api.m.jd.com",
          "Cookie": _0x27e145,
          "User-Agent": "JD4iPhone/168069 (iPhone; iOS 13.7; Scale/3.00)"
        };
      this.log("实时获取 isvToken");
      let {
        data: _0x2d40d5
      } = await this.request(_0x1c37ee, _0x5a1c35, _0x5595b7);
      if (_0x253b02 && _0x2d40d5?.["code"] === "0" && _0x2d40d5.token) {
        if (_0x253b02) {
          if (_0x299676 === 2) {
            await this.rcache("isvObfuscator:" + _0x13a0af, _0x2d40d5.token, this.random(tokenCacheMin, tokenCacheMax) * 60 * 1000);
          } else {
            let _0x3a5574 = {
              "expireTime": this.timestamp() + this.random(tokenCacheMin, tokenCacheMax) * 60 * 1000,
              "token": _0x2d40d5.token
            };
            this.writeFileSync("tokens/" + _0x13a0af + ".json", JSON.stringify(_0x3a5574));
          }
        }
      } else {
        if (_0x2d40d5?.["code"] === "3" && _0x2d40d5?.["errcode"] === 264) {
          this.putMsg("CK已失效");
          throw new Error("CK已失效");
        }
      }
      return this.isvToken = _0x2d40d5.token, this.Token = _0x2d40d5.token, _0x2d40d5;
    } catch (_0x545cc5) {
      this.log(_0x545cc5.message);
      if (_0x40b817 > 0 && this.isProxy(_0x545cc5.message)) return this.log("第" + (isvObfuscatorRetry - _0x40b817) + "去重试isvObfuscator接口,等待" + isvObfuscatorRetryWait + "秒"), await this.routerProxy(), await this.isvObfuscator(_0x253b02, --_0x40b817);
    }
    this.Token = "";
    throw new Error("获取Token失败");
    return {
      "code": "1",
      "token": ""
    };
  }
  async ["getSimpleActInfoVo"](_0x32d438 = "customer/getSimpleActInfoVo", _0x1462ac = 1) {
    if (this.venderId && this.shopId && this.activityType) {
      await this.initPinToken();
      return;
    }
    let _0x174bcd = await this.api(_0x32d438, _0x1462ac === 1 ? "activityId=" + this.activityId : _0x1462ac);
    if (!_0x174bcd?.["result"] || !_0x174bcd?.["data"]) {
      this.putMsg("手动确认");
      this.expire = true;
      throw new Error("活动已结束");
    }
    this.venderId = _0x174bcd.data?.["venderId"] || this.venderId;
    this.shopId = _0x174bcd.data?.["shopId"] || this.shopId;
    this.activityType = _0x174bcd.data?.["activityType"] || this.activityType;
    await this.initPinToken();
  }
  async ["initPinToken"]() {
    try {
      if (this.activityUrl.includes("activityType")) {
        if (!notInitPinTokenRegex.test(this.activityUrl)) {
          if (this.defenseUrls && this.defenseUrls.length === 0) {
            let _0x15692f = await this.api("api/user-info/getDefenseUrls", "");
            this.defenseUrls = _0x15692f.data.map(_0x371064 => _0x371064.interfaceName);
          }
          await this.api("api/user-info/initPinToken?source=01&status=1&activityId=" + this.activityId + "&uuid=" + this.uuid() + "&jdToken=" + this.isvToken + "&shopId=" + this.shopId + "&clientTime=" + Date.now() + "&shareUserId=" + (this.shareUserId || ""), "");
        }
      } else {
        if (this.defenseUrls && this.defenseUrls.length === 0) {
          let _0x40fc03 = await this.api("customer/getDefenseUrls", "");
          this.defenseUrls = _0x40fc03.data;
        }
        await this.api("customer/initPinToken?source=01&status=1&activityId=" + this.activityId + "&uuid=" + this.uuid() + "&jdToken=" + this.isvToken + "&venderId=" + this.venderId + "&shopId=" + this.shopId + "&clientTime=" + Date.now() + "&shareUserId=" + (this.shareUserId || ""), "");
      }
    } catch (_0x791020) {
      console.log(_0x791020);
    }
  }
  async ["getMyPing"](_0x228fe5 = "customer/getMyPing", _0x58adef = 0) {
    try {
      let _0x422f11 = await this.api(_0x228fe5, "userId=" + this.venderId + "&token=" + this.Token + "&pin=&fromType=APP&riskType=0");
      this.Pin = "";
      if (!_0x422f11.result) {
        if (_0x422f11.errorMessage.includes("请联系商家")) {
          this.expire = true;
          this.putMsg("商家token过期");
          throw new Error(_0x422f11.errorMessage);
        }
        if (_0x58adef < 3 && !_0x422f11.errorMessage?.["includes"]("活动太火爆")) this.putMsg("重试pin获取"), await this.getMyPing(_0x228fe5, ++_0x58adef);else {
          this.putMsg(_0x422f11.result.errorMessage);
          return;
        }
      }
      let _0x3f5e67 = _0x422f11.data.secretPin;
      this.nickname = _0x422f11.data.nickname;
      this.Pin = this.domain.includes("cjhy") ? encodeURIComponent(encodeURIComponent(_0x3f5e67)) : encodeURIComponent(_0x3f5e67);
    } catch (_0x28ce52) {
      this.putMsg(_0x28ce52?.["message"]);
      this.nickname = this.username;
      let _0x51adcf = this.tickets.get("AUTH_C_USER");
      this.Pin = _0x51adcf || encodeURIComponent(_0x51adcf) || this.domain.includes("cjhy") ? encodeURIComponent(encodeURIComponent(_0x51adcf)) : encodeURIComponent(_0x51adcf);
    }
  }
  async ["accessLog"](_0x6e0c20 = "" + (this.domain.includes("cjhy") ? "common/accessLog" : "common/accessLogWithAD")) {
    await this.api(_0x6e0c20, "venderId=" + this.venderId + "&code=" + this.activityType + "&pin=" + this.Pin + "&activityId=" + this.activityId + "&pageUrl=" + encodeURIComponent(this.activityUrl) + "&subType=app&adSource=");
  }
  async ["sign"](_0x131da3, _0x5936d7 = {}) {
    let _0x3c1c23 = {},
      _0x24dbec = {
        "fn": _0x131da3,
        "body": _0x5936d7
      },
      _0xe93237 = {
        "token": apiToken,
        "Cookie": 123
      };
    const _0x79d4e4 = $.defaults.httpsAgent,
      _0x381c83 = $.defaults.httpsAgent;
    $.defaults.httpsAgent = false;
    $.defaults.httpAgent = false;
    try {
      let {
        data: _0xb02efe
      } = await this.request(signMode.includes("server") ? "http://172.17.0.1:17840/sign" : apiSignUrl, _0xe93237, _0x24dbec);
      return {
        "fn": _0xb02efe.fn,
        "sign": _0xb02efe.body
      };
    } catch (_0xf8bba) {
      console.log("sign解析接口失效: " + _0xf8bba.message);
    } finally {
      $.defaults.httpsAgent = _0x79d4e4;
      $.defaults.httpAgent = _0x381c83;
    }
    return _0x3c1c23;
  }
  async ["login"](_0x5afd15 = this.Token) {
    if (/lzdz\d+-isv/.test(this.activityUrl)) await this.lzdz4Login();else {
      if (hdbTypes.includes(this.domain)) {
        let _0x2d290d = await this.api("/front/fans/login", {
          "source": "01",
          "token": _0x5afd15
        });
        if (_0x2d290d.code == "200") {
          this.log("登录成功 " + _0x2d290d.result.grade);
          this.aesBuyerNick = _0x2d290d.result.aesBuyerNick;
          _0x2d290d.result.grade < 0 && /partitionTeam/.test(this.activityUrl) && (await this.openCard());
          if (this.index > this.masterNum && _0x2d290d.result.grade > 0 && /inviteJoin/.test(this.activityUrl)) {
            throw new Error("已经是会员无法助力");
          }
          await this.api("/front/activity/reportPVUV", {
            "nonce": "01",
            "token": _0x5afd15
          });
          await this.loadFrontAct();
        } else {
          this.putMsg("登录失败");
          throw new Error(_0x2d290d.message);
        }
      } else {
        if (/hzbz-isv.isvjcloud.com|hdds-isv.isvjcloud.com/.test(this.activityUrl)) {
          const _0x15934e = await this.api("bigdraw/LoadUserData.json", "id=" + this.activityId + "&token=" + _0x5afd15 + "&buyerFrom=01");
          this.log(_0x15934e);
          const {
            code: _0x5e487c,
            txt: _0x8f3320,
            drawChances: _0x2d9130
          } = _0x15934e;
          if (_0x5e487c === 1) {
            this.log("登录成功，" + _0x8f3320);
          } else {
            if (_0x5e487c === 0) this.putMsg("登录成功，初始抽奖机会" + _0x2d9130 + "次");else {
              this.log(JSON.stringify(_0x15934e));
              throw new Error();
            }
          }
        } else {
          let _0xfe84f0 = await this.api("/api/user-info/login", {
            "status": "0",
            "activityId": this.activityId,
            "tokenPin": _0x5afd15,
            "source": "01",
            "shareUserId": "",
            "uuid": this.uuid()
          });
          if (_0xfe84f0.resp_code !== 0) {
            this.putMsg("登录失败");
            throw new Error(_0xfe84f0.message);
          }
          this.isvToken = _0x5afd15;
          this.Token = _0xfe84f0.data.token;
          try {
            this.venderId = _0xfe84f0.data.venderId || _0xfe84f0.data.joinInfo.openCardUrl.split("venderId=")[1].split("&")[0];
          } catch (_0x554c8d) {
            this.venderId = _0xfe84f0.data.venderId || _0xfe84f0.data.shopId;
          }
          this.shopId = _0xfe84f0.data.shopId;
          this.shopName = _0xfe84f0.data.shopName;
          this.joinCode = _0xfe84f0.data.joinInfo.joinCodeInfo.joinCode;
          this.joinDes = _0xfe84f0.data.joinInfo.joinCodeInfo.joinDes;
          this.log("登录成功 " + this.joinCode + " " + this.joinDes);
          let _0x192fea = await this.api("/api/active/basicInfo", {
            "activityId": this.activityId
          });
          this.actStartTime = _0x192fea.data.startTime;
          this.actEndTime = _0x192fea.data.endTime;
          this.actName = _0x192fea.data.actName;
          (!this.prizeList || this.prizeList.length <= 0) && (await this.getPrizeList());
          this.prizeList && this.prizeList.length > 0 && this.prizeList.filter(_0x3b7672 => ![2].includes(_0x3b7672.prizeType) && _0x3b7672.leftNum !== 0).length === 0 && (this.putMsg("垃圾活动"), this.expire = true);
          if (this.actStartTime > this.timestamp()) {
            this.putMsg("活动未开始");
            this.expire = true;
            throw new Error("活动未开始");
          }
          if (this.timestamp() > this.actEndTime) {
            this.putMsg("活动已结束");
            this.expire = true;
            throw new Error("活动已结束");
          }
          if (this.expire) throw new Error("垃圾活动");
          this.isMember = ["1001", "1004"].includes(this.joinCode);
          try {
            await this.api("/api/task/followShop/follow", {});
          } catch (_0x1f5b21) {}
          await this.initPinToken();
          if (!this.isMember && openCardTypes.includes(this.activityType)) {
            await this.openCard();
            this.isMember = true;
            return;
          }
          !this.isMember && this.prizeList && this.prizeList.length > 0 && this.prizeList.filter(_0x36c646 => [1, 3].includes(_0x36c646.prizeType) && _0x36c646.leftNum !== 0).length > 0 && ["10023", "10024", "10040", "10036", "10068", "10002"].includes(this.activityType) && (await this.openCard(), this.isMember = true);
          if (!this.isMember) {
            this.putMsg("" + this.joinDes);
            throw new Error(this.joinDes);
          }
        }
      }
    }
  }
  async ["getPrizeList"]() {
    let _0x57f2a9 = await this.api("/api/prize/drawPrize", {});
    if (_0x57f2a9.resp_code !== 0) {
      this.log("获取奖品是失败");
      return;
    }
    this.prizeList = _0x57f2a9.data?.["prizeInfo"] || [];
  }
  async ["loadFrontAct"]() {
    let _0x145e18 = await this.api("/front/activity/loadFrontAct", {});
    if (_0x145e18.code == "200") {
      this.actStartTime = _0x145e18.result.activity.startTime;
      this.actEndTime = _0x145e18.result.activity.endTime;
      this.rule = _0x145e18.result.activity.remark;
      this.shopName = _0x145e18.result.activity.shopTitle;
      this.useGrade = _0x145e18.result.activity.useGrade;
      this.shopId = _0x145e18.result.user.shopId;
      this.venderId = _0x145e18.result.user.venderId;
      this.memberStatus = _0x145e18.result.user.memberStatus;
      this.actName = _0x145e18.result.activity.actName;
      if (this.actStartTime > this.timestamp()) {
        this.putMsg("活动未开始");
        this.expire = true;
        throw new Error("活动未开始");
      }
      if (this.actEndTime < this.timestamp()) {
        this.putMsg("活动已结束");
        this.expire = true;
        throw new Error("活动已结束");
      }
      _0x145e18.result.activity.isNeedFavourite && !_0x145e18.result.isFavouriteShop && (await this.reportActionLog({
        "actionType": "favouriteShop"
      }));
    } else {
      this.putMsg("loadFrontAct失败");
      throw new Error(_0x145e18.message);
    }
    if (!this.prizeList || this.prizeList.length <= 0) {
      let _0x76cfc = await this.api("/front/activity/loadFrontAward", {});
      if (_0x76cfc.succ) {
        this.prizeList = _0x76cfc.result || [];
        this.activity = _0x145e18.result;
        if (this.prizeList && this.prizeList.length > 0 && this.prizeList.filter(_0x1068ee => !["JD_D_COUPON"].includes(_0x1068ee.awardType)).length === 0) {
          this.expire = true;
          this.putMsg("垃圾活动");
          throw new Error("垃圾活动");
        }
      }
    }
  }
  async ["reportActionLog"](_0x415f70) {
    await this.wait(3000, 5000);
    let _0x5a1609 = await this.api("/front/activity/reportActionLog", _0x415f70);
    _0x5a1609.code == "200" ? this.log(_0x415f70?.["actionType"] + "操作成功") : this.putMsg(_0x5a1609.message);
  }
  ["v"](_0x116f59) {
    let _0x1fa283 = ["B6dB3QqGZP1lKNICTaiAeNJSHKNepO5GGgtL6FUceqSlpFZCdx2SZ5MPPbzrgy91HeR0dnJazcMrvMgPF7bhFrfsGaApJKk4JohEEhoJ4kKJpAaGsfrFhb7FPgMvrMczaJnd0ReH19ygrzbPPM5ZS2xdCZFplSqecUF6LtgGG5OpeNKHSJNeAiaTCINKl1PZGqQ3Bd6B", "EUhzJoyKP7VydtpyBwNUGU2tqzI0QB0LIpQ10Fk3hX2ZcPoGRpACqmzcTQbKd98i3U7raFz2rMl2kys0ODgtAh22E3i57wmh38RbbR83hmw75i3E22hAtgDO0syk2lMr2zFar7U3i89dKbQTczmqCApRGoPcZ2Xh3kF01QpIL0BQ0Izqt2UGUNwByptdyV7PKyoJzhUE", "xexcHoyVwOs5TYTQVvU0iXn56ryKVdWedLTpq3KEKmbUHfwzuZjIpZOPVXMEappFhjdqwtp1bBrWaRBCfPFwCq2W8SsyvwqZ6sIGGIs6ZqwvysS8W2qCwFPfCBRaWrBb1ptwqdjhFppaEMXVPOZpIjZuzwfHUbmKEK3qpTLdeWdVKyr65nXi0UvVQTYT5sOwVyoHcxex", "2Llnegc5i4flqd4HZPFK210yh61boBxRSdnNVMeudKimx92Qi4aPuHP12HmEImbWrXjLgBGqy1bSnKvLhqMqhknyuse4nFoeLTkJJkTLeoFn4esuynkhqMqhLvKnSb1yqGBgLjXrWbmIEmH21PHuPa4iQ29xmiKdueMVNndSRxBob16hy012KFPZH4dqlf4i5cgenlL2", "dZzoMZF6xtt3voTFDbPzEZ7GeM8t7uY05d4K4xfhtdxELh96dDRB4oRYA2smET5dy1dafGkXOz2V7tNOVi0vSqfuhI99IKprVK6QQ6KVrpKI99IhufqSv0iVONt7V2zOXkGfad1yd5TEms2AYRo4BRDd69hLExdthfx4K4d50Yu7t8MeG7ZEzPbDFTov3ttx6FZMozZd", "SNYr3bWMtQulWZO2FEwuhSFp3EXPR1TujPRJwUFlxBh9Pvf2MeTEpR7a3dU6e9rNUMyBh2osDdK4Vdm4gZ0XcRCoHZPi2jiXT2dCCd2TXij2iPZHoCRcX0Zg4mdV4KdDso2hByMUNr9e6Ud3a7RpETeM2fvP9hBxlFUwJRPjuT1RPXE3pFShuwEF2OZWluQtMWb3rYNS", "4viQ2FrYHcrH44gqvPLo6KtiFu56AW1eXbDBZrBepzdLKE33Ey4TwFERnkVLnbHAXbKqAi0HFP9Eu7yg8WNlI7q2dvXGGiPaMbrBBrbMaPiGGXvd2q7IlNW8gy7uE9PFH0iAqKbXAHbnLVknREFwT4yE33EKLdzpeBrZBDbXe1WA65uFitK6oLPvqg44HrcHYrF2Qiv4", "0VIoSHBNVAW8De7NquFyEUm0o9xNnQJGn2OR1yOK9djWALhyP3a1XoQEwTnXuzypRuwsaLPUlertksOY6LYmnbQmPgdDQRXXKdKooKdKXXRQDdgPmQbnmYL6YOsktrelUPLaswuRpyzuXnTwEQoX1a3PyhLAWjd9KOy1RO2nGJQnNx9o0mUEyFuqN7eD8WAVNBHSoIV0", "fdJPBiTra9E0qg2HJrobeEC2SkOfSzbw6nG5J5ACx42GQDBsCyGfxNlHHYhl7EmkdvYaKAXUVXSKcTT1KhyYaj9Q4YtyhnOA7cLrrLc7AOnhytY4Q9jaYyhK1TTcKSXVUXAKaYvdkmE7lhYHHlNxfGyCsBDQG24xCA5J5Gn6wbzSfOkS2CEeborJH2gq0E9arTiBPJdf", "kLOA93PyUOX3QdlLuZ9JgNq1peyIITAQSnKzuLBZ2NthOSseAJMGCecvSLVKAww61Y31hJ4l7kAOcjLmtqQNJlNyJb5yu9d9vqWUUWqv9d9uy5bJyNlJNQqtmLjcOAk7l4Jh13Y16wwAKVLSvceCGMJAesSOhtN2ZBLuzKnSQATIIyep1qNgJ9ZuLldQ3XOUyP39AOLk"];
    var _0x152f9a = _0x116f59.nowTime + parseInt(this.tickets.get("te"));
    _0x116f59.nowTime = _0x152f9a;
    debugger;
    for (var _0x595d76 = this.tickets.get("pToken") + _0x152f9a, _0xd791f7 = _0x595d76.substring(0, _0x595d76.length - 5), _0x5bd313 = "", _0x3f5060 = 0; _0x3f5060 < _0xd791f7.length; _0x3f5060++) {
      var _0x5705d0 = _0xd791f7.charCodeAt(_0x3f5060);
      _0x5bd313 += _0x1fa283[_0x5705d0 % 10][_0x3f5060];
    }
    for (var _0x50df1b = _0x5bd313.length, _0x1ba7c3 = Math.floor(_0x50df1b / 24), _0xe47d32 = "", _0x195dc2 = 0; _0x195dc2 < 24; _0x195dc2++) {
      var _0x14fadb = (_0x195dc2 + 1) * _0x1ba7c3;
      23 === _0x195dc2 && (_0x14fadb = _0x50df1b);
      for (var _0x20e18c = _0x5bd313.substring(_0x195dc2 * _0x1ba7c3, _0x14fadb), _0x3540a8 = [], _0x1b044c = 0; _0x1b044c < _0x20e18c.length; _0x1b044c++) {
        _0x3540a8.push(_0x20e18c.charCodeAt(_0x1b044c));
      }
      var _0x39daac = _0x3540a8.reduce(function (_0x331198, _0x513505) {
          return _0x331198 + _0x513505;
        }, 0),
        _0x3e1251 = Math.floor(_0x39daac / _0x3540a8.length);
      _0xe47d32 += String.fromCharCode(_0x3e1251);
    }
    var _0x194286 = function (_0x31ee77) {
        _0x31ee77 = _0x31ee77.split("").reverse().join("");
        for (var _0x25b74c = new Uint8Array(12), _0x408897 = new TextEncoder().encode(_0x31ee77), _0xfd212b = 0; _0xfd212b < _0x408897.length; _0xfd212b += 2) {
          var _0x559ccf = _0x408897[_0xfd212b] << 5 | 255 & _0x408897[_0xfd212b + 1];
          _0x559ccf %= 63;
          _0x25b74c[_0xfd212b >> 1] = _0x559ccf;
        }
        for (var _0x14e17a = "", _0x59339d = 0; _0x59339d < _0x25b74c.length; _0x59339d++) {
          _0x14e17a += (_0x25b74c[_0x59339d] + 256).toString(2).slice(1);
        }
        for (var _0x368a20 = "", _0x28dda7 = "", _0x365229 = 0; _0x365229 < 16; _0x365229++) {
          if (0 !== _0x365229) {
            for (var _0x30a72e = 6 * _0x365229, _0x31367f = _0x14e17a.substring(_0x30a72e, _0x30a72e + 6), _0x1589a8 = parseInt(_0x31367f, 2), _0x1305b3 = _0x28dda7.split(""), _0x1690e8 = 0; _0x1690e8 < _0x1305b3.length; _0x1690e8++) {
              "1" === _0x1305b3[_0x1690e8] && (_0x1589a8 = 63 & (_0x1589a8 >> 6 - _0x1690e8 | _0x1589a8 << _0x1690e8));
            }
            _0x28dda7 = (63 & _0x1589a8).toString(2).padStart(6, "0");
          } else _0x28dda7 = _0x14e17a.substring(0, 6);
          _0x368a20 += _0x28dda7;
        }
        for (var _0x417647 = 0; _0x417647 < 12; _0x417647++) {
          var _0x4ff9cf = 8 * _0x417647;
          _0x25b74c[_0x417647] = parseInt(_0x368a20.substring(_0x4ff9cf, _0x4ff9cf + 8), 2);
        }
        return base64.encode(String.fromCharCode.apply(null, _0x25b74c));
      }(_0x5bd313 = _0xe47d32),
      _0x53d1e6 = CryptoJS.enc.Utf8.parse(_0x194286),
      _0x220589 = CryptoJS.enc.Utf8.parse("");
    return CryptoJS.AES.encrypt(JSON.stringify(_0x116f59), _0x53d1e6, {
      "iv": _0x220589,
      "mode": CryptoJS.mode.ECB,
      "padding": CryptoJS.pad.Pkcs7
    }).toString();
  }
  async ["api"](_0x38542e, _0x1042b8, _0x58c1fc = this.Token, _0x231ad8 = this.ticket, _0x3a02b4 = 0) {
    let _0x1aae0a = _0x1042b8;
    try {
      _0x38542e = ("/" + _0x38542e).replace("//", "/");
      this.urlPrefix = this.urlPrefix ? ("/" + this.urlPrefix).replace("//", "/") : "";
      let _0x555bfd = "https://" + this.domain + this.urlPrefix + _0x38542e,
        _0xd4bd83 = {
          "Host": this.domain,
          "Accept": "application/json, text/plain, text/javascript, */*",
          "Accept-Encoding": "gzip, deflate, br",
          "Accept-Language": "zh-cn",
          "Connection": "keep-alive",
          "Content-Type": _0x1042b8 ? typeof _0x1042b8 == "string" ? "application/x-www-form-urlencoded;charset=utf-8" : "application/json;charset=utf-8" : "application/x-www-form-urlencoded;charset=utf-8",
          "Origin": "https://" + this.domain,
          "Cookie": this.activityUrl.match(new RegExp(["prod/cc", "interact", "crm-proya", ...hdbTypes, ...jinggengcjTypes].join("|"))) ? "" : "IsvToken=" + _0x58c1fc + ";" + _0x231ad8,
          "Referer": this.activityUrl + "&sid=" + this.randomString() + "&un_area=" + this.randomPattern("xx_xxxx_xxxx_xxxxx"),
          "User-Agent": this.UA
        };
      _0x58c1fc?.["startsWith"]("ey") && (_0xd4bd83.token = _0x58c1fc);
      if (this.domain.includes("szxyun-rc.isvjcloud.com")) {
        _0xd4bd83["jd-fast-token"] = _0x58c1fc;
      }
      hdbTypes.includes(this.domain) && (_0x1042b8 = this.hdbBody(_0x38542e, _0x1042b8, _0xd4bd83), _0xd4bd83.ts = this._ts || "", _0xd4bd83.s = this._s || "", _0xd4bd83.nonce = this._nonce || "");
      if (jinggengcjTypes.includes(this.domain)) {
        _0x1042b8 = this.jinggengjcqBody(_0x38542e, _0x1042b8);
      }
      if (this.defenseUrls && this.defenseUrls.includes(_0x38542e)) {
        if (this.activityUrl.includes("interactsaas")) _0x1042b8.nowTime = this.timestamp(), _0x1042b8.actId = this.activityId, _0x1042b8.consumePoints = _0x1042b8.consumePoints || 0;else {
          const _0x17d59d = new URLSearchParams(_0x1042b8);
          _0x1042b8 = {};
          for (const [_0x34c827, _0x5ad8e5] of _0x17d59d.entries()) {
            _0x1042b8[_0x34c827] = _0x5ad8e5;
          }
          _0x1042b8.nowTime = this.timestamp();
          _0x1042b8.actId = this.activityId;
          debugger;
        }
        _0xd4bd83.Cookie = "IsvToken=" + this.isvToken + ";" + this.ticket + "isBasicJson=true;";
        let _0x4ccefe = this.v(_0x1042b8);
        _0x1042b8 = {
          "ecyText": _0x4ccefe
        };
      }
      let {
        headers: _0x1556fd,
        data: _0x24b16d
      } = await this.request(_0x555bfd, _0xd4bd83, _0x1042b8);
      if (this.defenseUrls && this.defenseUrls.includes(_0x38542e) && (!_0x24b16d || _0x24b16d.length === 0) && _0x3a02b4 < 5) return await this.initPinToken(), await this.api(_0x38542e, _0x1aae0a, _0x58c1fc, _0x231ad8, ++_0x3a02b4);
      if (!_0x24b16d) return _0x24b16d;
      hdbTypes.includes(this.domain) && _0x1556fd && (this._ts = _0x1556fd._ts, this._s = _0x1556fd._s, this._nonce = _0x1556fd._nonce);
      let _0xa91c92 = JSON.stringify(_0x24b16d);
      if (/还是去买买买吧/.test(_0xa91c92)) {
        this.putMsg("火爆账号[" + this.username + "]");
        throw new Error("还是去买买买吧");
      }
      if (_0xa91c92?.["includes"]("AUTH.FAILED.BLACK")) {
        return this.putMsg("AUTH BLACK"), _0x24b16d;
      }
      if (_0xa91c92?.["includes"]("请稍后重试") && jinggengcjTypes.includes(this.domain)) return _0x24b16d;
      if (new RegExp(reTryRegx).test(_0xa91c92) && _0x3a02b4 < 5) {
        return this.log("重试" + _0x3a02b4), await this.api(_0x38542e, _0x1aae0a, _0x58c1fc, _0x231ad8, ++_0x3a02b4);
      }
      if ((_0xa91c92.includes("您点的太快了") || _0xa91c92.includes("操作过于频繁")) && _0x3a02b4 < 5) return this.log("重试" + _0x3a02b4), await this.wait(3000, 5000), await this.api(_0x38542e, _0x1aae0a, _0x58c1fc, _0x231ad8, ++_0x3a02b4);
      if (_0xa91c92.includes("请求的数字签名不匹配")) return this.log("签名错误"), await this.login(this.isvToken), await this.api(_0x38542e, _0x1aae0a, _0x58c1fc, _0x231ad8, ++_0x3a02b4);
      if (_0xa91c92.includes("会员等级不")) {
        if (_0x58c1fc?.["startsWith"]("ey") && _0x3a02b4 < 3) {
          return this.log("等级不足重试" + _0x3a02b4), await this.login(this.isvToken), await this.wait(3000, 5000), await this.api(_0x38542e, _0x1aae0a, this.Token, _0x231ad8, ++_0x3a02b4);
        } else {
          this.putMsg("等级不足");
          throw new Error("等级不足");
        }
      }
      return (_0xa91c92.includes("商家token过期") || _0xa91c92.includes("商家订购过期")) && (this.putMsg("商家token过期"), this.expire = true), _0x24b16d;
    } catch (_0x2c3466) {
      if (_0x3a02b4 > 3) throw new Error(_0x2c3466.message);
      if (this.defenseUrls && this.defenseUrls.includes(_0x38542e) && [500].includes(_0x2c3466.response?.["status"])) return this.log("重试"), await this.initPinToken(), await this.api(_0x38542e, _0x1aae0a, _0x58c1fc, _0x231ad8, ++_0x3a02b4);
      if (this.isProxy(_0x2c3466.message)) return await this.routerProxy(_0x3a02b4), await this.api(_0x38542e, _0x1aae0a, _0x58c1fc, _0x231ad8, ++_0x3a02b4);else {
        throw new Error(_0x2c3466.message);
      }
    }
  }
  ["jinggengjcqBody"](_0x33a021, _0x16f646) {
    let _0x179e4c = _0x33a021.match(/dm\/front(.+)\?/)[1];
    delete _0x16f646.method;
    let _0x104dcf = {
        "actId": this.activityId,
        ..._0x16f646,
        "method": _0x179e4c,
        "userId": this.userId,
        "buyerNick": this.buyerNick || ""
      },
      _0x2c89bf = this.mpdzSign(_0x104dcf),
      _0x234ff2 = "94854284";
    const _0x1efece = {
      "jsonRpc": "2.0",
      "params": {
        "commonParameter": {
          "appkey": _0x234ff2,
          "m": "POST",
          "oba": _0x2c89bf.sign,
          "timestamp": _0x2c89bf.timeStamp,
          "userId": this.userId
        },
        "admJson": {
          "actId": this.activityId,
          ..._0x16f646,
          "method": _0x179e4c,
          "userId": this.userId,
          "buyerNick": this.buyerNick || ""
        }
      }
    };
    return _0x179e4c?.["indexOf"]("missionInviteList") > -1 && delete _0x1efece.params.admJson.actId, JSON.stringify(_0x1efece);
  }
  ["mpdzSign"](_0x2a9d7b) {
    let _0x484476 = "6cc5dbd8900e434b94c4bdb0c16348ed",
      _0x31bc1e = "c1614da9ac68",
      _0x22742c = new Date().valueOf(),
      _0x2aa85a = encodeURIComponent(JSON.stringify(_0x2a9d7b)),
      _0xf1e2eb = new RegExp("'", "g"),
      _0x52c66a = new RegExp("~", "g");
    _0x2aa85a = _0x2aa85a.replace(_0xf1e2eb, "%27");
    _0x2aa85a = _0x2aa85a.replace(_0x52c66a, "%7E");
    let _0x47523 = "f" + _0x31bc1e + "D" + _0x2aa85a + "c" + _0x22742c + _0x484476,
      _0x51100 = CryptoJS.MD5(_0x47523.toLowerCase()).toString();
    return {
      "sign": _0x51100,
      "timeStamp": _0x22742c
    };
  }
  ["hdbBody"](_0x39098b, _0x22a962, _0x3426d8) {
    let _0x551309 = this.aesBuyerNick,
      _0x3b1068 = Date.now(),
      _0x1d83bf = {
        "appJsonParams": {
          "id": this.activityId,
          "userId": this.venderId,
          "shopId": this.shopId || this.venderId,
          ..._0x22a962,
          "buyerNick": _0x551309,
          "method": _0x39098b
        },
        "sysParams": {
          "sysmethod": JSON.stringify(_0x39098b).replace(/[^\u4e00-\u9fa5\w]/g, ""),
          "timestamp": _0x3b1068,
          "actid": this.activityId
        }
      };
    _0x22a962 && (_0x22a962 = _0x1d83bf);
    if (!_0x551309) {
      delete _0x22a962.appJsonParams.buyerNick;
      delete _0x22a962.sysParams.buyernick;
    }
    this.tickets.get("_sk") ? _0x3426d8._sk = this.tickets.get("_sk") : "";
    this.tickets.get("zxhd_aes_buyer_nick") ? _0x3426d8._dzf = this.tickets.get("zxhd_aes_buyer_nick") : "";
    let _0x130186 = "actid" + this.activityId + "buyernick" + (_0x551309 || "undefined") + "sysmethod" + JSON.stringify(_0x39098b).replace(/[^\u4e00-\u9fa5\w]/g, "") + "timestamp" + _0x3b1068,
      _0x55562d = _0x3426d8._sk || "1111";
    return _0x22a962.sysParams.sign = CryptoJS.HmacSHA256(_0x130186, _0x55562d).toString(CryptoJS.enc.Hex), _0x22a962;
  }
  async ["selectAddress"](_0x4acede) {
    let _0x4833cf,
      _0x4517cb = M_WX_ADDRESS_MODE.toUpperCase();
    this.log("当前填地址模式: " + M_WX_ADDRESS_MODE.toUpperCase());
    if (["PIN"].includes(_0x4517cb)) {
      _0x4833cf = this.accounts[_0x4acede]?.["address"] || this.accounts[encodeURIComponent(_0x4acede)]?.["address"];
    }
    if (_0x4833cf) {
      return _0x4833cf;
    }
    ["CC", "CCWAV"].includes(_0x4517cb) && (_0x4833cf = this.accounts["默认地址" + this.addressIndex]?.["address"]);
    if (_0x4833cf) {
      return _0x4833cf;
    }
    let _0x3696a9 = [];
    for (let _0x3fd5c7 in this.accounts) {
      this.accounts[_0x3fd5c7]?.["address"] && _0x3696a9.push(this.accounts[_0x3fd5c7].address);
    }
    if (["RANGE"].includes(_0x4517cb)) {
      let _0x3dab6f = Math.min(parseInt(M_WX_ADDRESS_RANGE?.["split"]("-")?.[1] || _0x3696a9.length), _0x3696a9.length);
      this.addressIndex > _0x3dab6f && (this.addressIndex = 1);
      _0x4833cf = _0x3696a9[this.addressIndex - 1];
    }
    if (_0x4833cf) {
      return _0x4833cf;
    }
    if (M_WX_ADDRESS_MODE_LOWER || ["RANDOM"].includes(_0x4517cb)) {
      debugger;
      return _0x3696a9[this.random(1, _0x3696a9.length) - 1];
    }
  }
  async ["saveAddress"](_0x45ea54 = this.addressId, _0x59aa7e = this.prizeName, _0x423cbc = this.Pin, _0x4a5ceb = this.username, _0x3c91c3 = "") {
    if (await this.wxAddressStop(_0x59aa7e)) {
      this.putMsg("命中关键词，不填写地址！");
      return;
    }
    if (await this.wxAddressStopRule()) {
      this.putMsg("命中规则，不填地址beta！");
      return;
    }
    this.currAddrUsername && this.currAddrUsername !== _0x4a5ceb && this.addressIndex++;
    this.currAddrUsername = _0x4a5ceb;
    let _0xdc28e5 = await this.selectAddress(_0x4a5ceb);
    if (!_0xdc28e5) {
      this.putMsg("没有找到地址信息");
      return;
    }
    if (M_WX_ADDRESS_LOG || mode) {
      this.log("当前地址详情" + JSON.stringify(_0xdc28e5));
    }
    let _0x57610d = this.shopName;
    if (!_0x57610d) try {
      _0x57610d = await this.getShopName();
    } catch (_0x288996) {
      console.log("addr" + _0x288996);
    }
    try {
      if (jinggengcjTypes.includes(this.domain)) {
        let _0x337b30 = await this.api("/dm/front/jdBigAlliance/awards/updateAddress?open_id=&mix_nick=" + (this.buyerNick || "") + "&user_id=10299171", {
          "receiverName": _0xdc28e5.receiver,
          "receiverMobile": _0xdc28e5.phone,
          "receiverProvince": _0xdc28e5.province,
          "receiverCity": _0xdc28e5.city,
          "receiverDistrict": _0xdc28e5.county,
          "receiverAddress": _0xdc28e5.address,
          "logId": _0x45ea54
        });
        console.log(_0x337b30);
      } else {
        if (this.domain.includes("jinggeng")) {
          let _0x100da2 = _0xdc28e5.province.replace("市", "").replace("省", "") + " " + _0xdc28e5.city.replace("市", "") + " " + _0xdc28e5.county + _0xdc28e5.address,
            _0x2d229b = await this.api("/ql/front/postBuyerInfo", "receiverName=" + encodeURIComponent(_0xdc28e5.receiver) + "&mobile=" + _0xdc28e5.phone + "&address=" + encodeURIComponent(_0x100da2) + "&log_id=" + _0x45ea54 + "&user_id=" + this.userId);
          console.log(_0x2d229b);
          _0x2d229b.succ ? (this.putMsg("已填地址"), await fs.appendFileSync("gifts.csv", this.now() + "," + _0x59aa7e + "," + _0x4a5ceb + "," + _0xdc28e5.phone + "," + _0xdc28e5.address + "," + this.name + "," + _0x57610d + "," + this.activityUrl + "\n")) : this.putMsg(_0x2d229b.msg);
        } else {
          if (this.activityUrl.includes("interact") || this.activityUrl.includes("prod/cc") || this.activityUrl.includes("crm-proya")) {
            let _0x52987f = await this.api("/api/my/prize/update", {
              "realName": _0xdc28e5.receiver,
              "mobile": _0xdc28e5.phone,
              "address": _0xdc28e5.address,
              "orderCode": this.addressId,
              "province": _0xdc28e5.province,
              "city": _0xdc28e5.city,
              "county": _0xdc28e5.county
            });
            console.log(_0x52987f);
            if (_0x52987f?.["data"] !== "2") this.putMsg("已填地址"), await fs.appendFileSync("gifts.csv", this.now() + "," + _0x59aa7e + "," + _0x4a5ceb + "," + _0xdc28e5.phone + "," + _0xdc28e5.address + "," + this.name + "," + _0x57610d + "," + this.activityUrl + "\n");else {
              this.putMsg("超一小时或其他报错，请手动进活动确认");
            }
          } else {
            let _0x3e694e = await this.api("wxAddress/save", "venderId=" + this.venderId + "&pin=" + _0x423cbc + "&activityId=" + this.activityId + "&actType=" + this.activityType + "&prizeName=" + encodeURIComponent(_0x59aa7e) + "&receiver=" + encodeURIComponent(_0xdc28e5.receiver) + "&phone=" + _0xdc28e5.phone + "&province=" + encodeURIComponent(_0xdc28e5.province) + "&city=" + encodeURIComponent(_0xdc28e5.city) + "&address=" + encodeURIComponent(_0xdc28e5.address) + "&generateId=" + _0x45ea54 + "&postalCode=" + _0xdc28e5.postalCode + "&areaCode=" + encodeURIComponent(_0xdc28e5.areaCode) + "&county=" + encodeURIComponent(_0xdc28e5.county));
            if (!_0x3e694e?.["result"]) {
              if (_0x3e694e.errorMessage.includes("您必须在中奖一小时内填写中奖地址")) {
                return;
              }
            }
            if (_0x3e694e?.["result"]) this.putMsg("已填地址"), await fs.appendFileSync("gifts.csv", this.now() + "," + _0x59aa7e + "," + _0x4a5ceb + "," + _0xdc28e5.phone + "," + _0xdc28e5.address + "," + this.name + "," + _0x57610d + "," + this.activityUrl + "\n");else {
              _0x3e694e = await this.api("wxAddress/save", "venderId=" + this.shopId + "&pin=" + _0x423cbc + "&activityId=" + this.activityId + "&actType=" + this.activityType + "&prizeName=" + encodeURIComponent(_0x59aa7e) + "&receiver=" + encodeURIComponent(_0xdc28e5.receiver) + "&phone=" + _0xdc28e5.phone + "&province=" + encodeURIComponent(_0xdc28e5.province) + "&city=" + encodeURIComponent(_0xdc28e5.city) + "&address=" + encodeURIComponent(_0xdc28e5.address) + "&generateId=" + _0x45ea54 + "&postalCode=" + _0xdc28e5.postalCode + "&areaCode=" + encodeURIComponent(_0xdc28e5.areaCode) + "&county=" + encodeURIComponent(_0xdc28e5.county));
              if (_0x3e694e?.["result"]) {
                this.putMsg("已填地址");
                await fs.appendFileSync("gifts.csv", this.now() + "," + _0x59aa7e + "," + _0x4a5ceb + "," + _0xdc28e5.phone + "," + _0xdc28e5.address + "," + this.name + "," + _0x57610d + "," + this.activityUrl + "\n");
              } else this.putMsg("" + _0x3e694e?.["errorMessage"]);
            }
          }
        }
      }
    } catch (_0x70cbb2) {
      console.log(_0x70cbb2);
    }
  }
  async ["carData"]() {
    let _0x26a71f = "https://wq.jd.com/deal/mshopcart/uncheckcmdy?sceneval=2&g_login_type=1&g_ty=ajax",
      _0x2cb655 = "commlist=&pingouchannel=0&all=1&scene=0&locationid=&type=0&templete=1&reg=1&version=20190418&traceid=&tabMenuType=4&sceneval=2",
      _0x472dc8 = {
        "Accept": "application/json",
        "Origin": "https://p.m.jd.com",
        "Cookie": this.cookie,
        "Accept-Encoding": "gzip, deflate, br",
        "Content-Type": "application/x-www-form-urlencoded",
        "Host": "wq.jd.com",
        "User-Agent": "jdpingou;5.5.2;;session/9;brand/apple",
        "Referer": "https://p.m.jd.com/",
        "Accept-Language": "zh-CN,zh-Hans;q=0.9"
      },
      {
        data: _0x37af0f
      } = await this.request(_0x26a71f, _0x472dc8, _0x2cb655);
    return _0x37af0f.errId === "0" ? _0x37af0f : "";
  }
  async ["carRmv"](_0x560d9a = []) {
    let _0x39ecee = [],
      _0x278959 = await this.carData();
    if (_0x278959) for (let _0x303000 of _0x278959.cart.venderCart) {
      for (let _0x659e06 of _0x303000.sortedItems) {
        for (let _0x5f5b7f of _0x659e06.polyItem.products) {
          if (_0x560d9a.length > 0 && _0x560d9a.includes(_0x5f5b7f.mainSku.id.toString()) || _0x560d9a.length === 0) {
            const _0x22c72f = _0x659e06.polyItem?.["promotion"]?.["pid"];
            _0x22c72f ? _0x39ecee.push(_0x5f5b7f.mainSku.id + ",,1," + _0x5f5b7f.mainSku.id + ",11," + _0x659e06.polyItem.promotion.pid + ",0,skuUuid:" + _0x5f5b7f.skuUuid + "@@useUuid:0") : _0x39ecee.push(_0x5f5b7f.mainSku.id + ",,1," + _0x5f5b7f.mainSku.id + ",1,,0,skuUuid:" + _0x5f5b7f.skuUuid + "@@useUuid:0");
          }
        }
      }
    }
    if (_0x39ecee.length === 0) {
      return;
    }
    this.log("即将删除" + _0x39ecee.length + "件商品");
    let _0x1ea910 = "https://wq.jd.com/deal/mshopcart/rmvCmdy?sceneval=2&g_login_type=1&g_ty=ajax",
      _0x50e0e0 = "pingouchannel=0&commlist=" + encodeURIComponent(_0x39ecee.join("$")) + "&type=0&checked=0&locationid=&templete=1&reg=1&scene=0&version=20190418&traceid=&tabMenuType=4&sceneval=2",
      _0x291544 = {
        "Accept": "application/json",
        "Origin": "https://p.m.jd.com",
        "Cookie": this.cookie,
        "Accept-Encoding": "gzip, deflate, br",
        "Content-Type": "application/x-www-form-urlencoded",
        "Host": "wq.jd.com",
        "User-Agent": "jdpingou;5.5.2;;session/9;brand/apple",
        "Referer": "https://p.m.jd.com/",
        "Accept-Language": "zh-CN,zh-Hans;q=0.9"
      },
      {
        data: _0x36c44b
      } = await this.request(_0x1ea910, _0x291544, _0x50e0e0);
    return _0x36c44b.errId === "0" ? _0x36c44b : {};
  }
  async ["openCardInfo"](_0x74745a = this.venderId, _0xdf92de = this.cookie, _0x59b2a1 = 0) {
    try {
      if (openCardMode.includes("wh5")) {
        let _0x3359b7 = {
            "venderId": _0x74745a,
            "payUpShop": true,
            "channel": 406
          },
          _0x4fce19 = "https://api.m.jd.com/getShopOpenCardInfo?appid=jd_shop_member&functionId=getShopOpenCardInfo&body=" + encodeURIComponent(JSON.stringify(_0x3359b7)) + "&uuid=88888&clientVersion=9.2.0&client=wh5&" + (await this.h5st());
        return await this.get(_0x4fce19, {
          "authority": "api.m.jd.com",
          "accept": "application/json, text/plain, */*",
          "accept-language": "zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6",
          "content-type": "application/x-www-form-urlencoded",
          "origin": "https://shopmember.m.jd.com",
          "referer": "https://shopmember.m.jd.com/",
          "user-agent": this.UA,
          "Cookie": this.cookie
        });
      } else {
        let _0x49dd36 = "https://api.m.jd.com/client.action?appid=jd_shop_member&" + (await this.h5st({
          "venderId": _0x74745a,
          "channel": 401
        }, "getShopOpenCardInfo"));
        return await this.get(_0x49dd36, {
          "Accept": "*/*",
          "Connection": "close",
          "Referer": "https://shopmember.m.jd.com/shopcard/?",
          "Accept-Encoding": "gzip, deflate, br",
          "Host": "api.m.jd.com",
          "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0 Mobile/15E148 Safari/604.1",
          "Accept-Language": "zh-cn",
          "Cookie": _0xdf92de
        });
      }
    } catch (_0x144692) {
      this.log(_0x144692.message);
      if (_0x59b2a1 < 3 && _0x144692.message.includes("status code 403")) return this.isProxy(_0x144692.message) ? (await this.routerProxy(_0x59b2a1), await this.wait(1000, 2000)) : await this.router(), await this.openCardInfo(_0x74745a, _0xdf92de, ++_0x59b2a1);
      return {};
    }
  }
  async ["getShopOpenCardInfo"](_0xe0780e = this.venderId, _0xb27fa0 = this.cookie, _0x16c224 = 0) {
    try {
      let _0x352f51 = {
        "venderId": _0xe0780e,
        "payUpShop": true,
        "channel": 406
      };
      const _0x1d3113 = await H5st.getH5st({
        "appId": "27004",
        "appid": "shopmember_m_jd_com",
        "body": _0x352f51,
        "cookie": this.cookie,
        "clientVersion": "9.2.0",
        "client": "H5",
        "functionId": "getShopOpenCardInfo",
        "ua": this.UA,
        "version": "3.1",
        "t": true
      });
      let _0x4a6425 = "https://api.m.jd.com/client.action?" + _0x1d3113.params;
      return await this.get(_0x4a6425, {
        "authority": "api.m.jd.com",
        "accept": "application/json, text/plain, */*",
        "accept-language": "zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6",
        "content-type": "application/json;charset=utf-8",
        "origin": "https://shopmember.m.jd.com",
        "referer": "https://shopmember.m.jd.com/",
        "user-agent": this.UA,
        "Cookie": this.cookie
      });
    } catch (_0x2d14c3) {
      this.log(_0x2d14c3.message);
      if (_0x16c224 < 3 && _0x2d14c3.message.includes("status code 403")) {
        return this.isProxy(_0x2d14c3.message) ? (await this.routerProxy(_0x16c224), await this.wait(1000, 2000)) : await this.router(), await this.getShopOpenCardInfo(_0xe0780e, _0xb27fa0, ++_0x16c224);
      }
      return {};
    }
  }
  async ["isOpenCard"](_0x216ddb = this.venderId, _0x334000 = this.cookie, _0x53447e = 0) {
    try {
      let _0x68a476 = "https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=getShopOpenCardInfo",
        _0x140730 = {
          "venderId": _0x216ddb
        },
        _0x533e77 = "body=" + encodeURIComponent(JSON.stringify(_0x140730)) + "&uuid=2be5d035ec2c47e682c883a13e02cdb6&client=apple&clientVersion=9.4.0",
        {
          data: _0x4cb948
        } = await this.request(_0x68a476, {
          "Host": "api.m.jd.com",
          "User-Agent": "User-Agent: JD4iPhone/167814 (iPhone; iOS 14.4; Scale/3.00)",
          "Content-Type": "application/x-www-form-urlencoded",
          "Origin": "https://api.m.jd.com",
          "Cookie": _0x334000
        }, _0x533e77);
      return _0x4cb948?.["result"]?.["userInfo"]?.["openCardStatus"] === 1 && this.log(_0x216ddb + " 已经是会员"), await this.wait(1000), _0x4cb948?.["result"]?.["userInfo"]?.["openCardStatus"] === 1;
    } catch (_0x53b182) {
      this.log(_0x53b182.message);
      if (_0x53447e < 3 && _0x53b182.message.includes("status code 403")) {
        return this.isProxy(_0x53b182.message) ? (await this.routerProxy(_0x53447e), await this.wait(1000, 2000)) : await this.router(), await this.isOpenCard(_0x216ddb, _0x334000, ++_0x53447e);
      }
      return false;
    }
  }
  async ["openCard"](_0x38fc25 = this.venderId, _0x440ef1 = 406, _0x3d496d = "", _0x4e569e = 0) {
    try {
      if (_0x4e569e > 3) return;
      let _0x4608e1 = {
        "venderId": _0x38fc25,
        "shopId": this.shopId || _0x38fc25,
        "bindByVerifyCodeFlag": 1,
        "registerExtend": {},
        "writeChildFlag": 0,
        "channel": _0x440ef1
      };
      _0x3d496d && Object.assign(_0x4608e1, {
        "activityId": _0x3d496d
      });
      let _0x5682b2 = "https://api.m.jd.com/client.action",
        _0xff024f = {
          "authority": "api.m.jd.com",
          "accept": "application/json, text/plain, */*",
          "accept-language": "zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6",
          "content-type": "application/x-www-form-urlencoded",
          "origin": "https://shopmember.m.jd.com",
          "referer": "https://shopmember.m.jd.com/",
          "user-agent": this.UA,
          "Cookie": this.cookie
        };
      this.openCount++;
      _0x4608e1 = "appid=shopmember_m_jd_com&functionId=bindWithVender&body=" + encodeURIComponent(JSON.stringify(_0x4608e1)) + "&client=H5&clientVersion=9.2.0&" + (await this.h5st());
      let _0x89dd57 = await this.post(_0x5682b2, _0x4608e1, _0xff024f);
      this.log("开卡结果:" + _0x89dd57?.["message"]);
      if ([0, 9003].includes(_0x89dd57?.["busiCode"] * 1)) return _0x89dd57;
      if ([508, 510, 201, 9002].includes(_0x89dd57?.["busiCode"] * 1)) {
        throw new Error(_0x89dd57?.["message"]);
      }
      if ((_0x89dd57?.["message"]?.["includes"]("火爆") || _0x89dd57?.["message"]?.["includes"]("失败")) && _0x4e569e < 3) return await this.openCard(_0x38fc25, _0x440ef1, _0x3d496d, ++_0x4e569e);
      return _0x89dd57;
    } catch (_0x95fc81) {
      ++_0x4e569e;
      if (_0x4e569e < 3 && _0x95fc81.message.includes("status code 403")) {
        if (this.isProxy(_0x95fc81.message)) await this.routerProxy(_0x4e569e), await this.wait(1000, 2000);else {
          await this.router();
        }
        return await this.openCard(_0x38fc25, _0x440ef1, _0x3d496d, _0x4e569e);
      } else throw new Error(_0x95fc81?.["message"]);
    }
  }
  async ["getShopMemberInfo"](_0x3860bb = this.cookie, _0x134f0b = this.shopId, _0x117ad9 = this.venderId) {
    try {
      let _0x294eec = await this.sign("getFansFuseMemberDetail", {
          "shopId": _0x134f0b,
          "venderId": _0x117ad9,
          "channel": 102,
          "queryVersion": "10.5.2"
        }),
        _0xe4ed06 = {
          "J-E-H": "",
          "Connection": "keep-alive",
          "Accept-Encoding": "gzip, deflate, br",
          "Content-Type": "application/x-www-form-urlencoded",
          "Host": "api.m.jd.com",
          "Referer": "",
          "J-E-C": "",
          "Accept-Language": "zh-Hans-CN;q=1, en-CN;q=0.9",
          "Accept": "*/*",
          "User-Agent": "JD4iPhone/167841 (iPhone; iOS; Scale/3.00)",
          "Cookie": _0x3860bb
        },
        _0x23ba77 = "https://api.m.jd.com/client.action?functionId=" + _0x294eec.fn,
        {
          status: _0x359ed2,
          data: _0x25aad3
        } = await this.request(_0x23ba77, _0xe4ed06, _0x294eec.sign);
      return _0x25aad3.data[0].memberInfo;
    } catch (_0x2cd577) {
      return console.log(_0x2cd577), {};
    }
  }
  async ["h5st"](_0x5eb73f, _0x4978fb = "bindWithVender", _0x4bd758 = 0) {
    return h5sts.random();
  }
  ["getAwardText"](_0x20e16b) {
    let _0x283627 = "";
    if (_0x20e16b.awardType == "JD_GOODS") _0x283627 = _0x20e16b.awardName + " " + _0x20e16b.awardDenomination * 1 + "元";else {
      if (_0x20e16b.awardType == "JD_POINT") _0x283627 = _0x20e16b.awardDenomination * 1 + "积分";else {
        if (_0x20e16b.awardType == "JD_COUPON" || _0x20e16b.awardType == "JD_D_COUPON") _0x283627 = _0x20e16b.awardDenomination * 1 + "元券";else {
          if (_0x20e16b.awardType == "JD_BEAN" || _0x20e16b.awardType == "JD_MARKET") _0x283627 = _0x20e16b.awardDenomination * 1 + "豆";else {
            if (_0x20e16b.awardType == "JD_E_CARD") _0x283627 = _0x20e16b.assetsName;else {
              if (_0x20e16b.awardType == "JD_AIQIYI") _0x283627 = _0x20e16b.assetsName;else {
                if (_0x20e16b.awardType == "JD_REDBAG" || _0x20e16b.awardType == "JD_RED_BAG") _0x283627 = _0x20e16b.awardDenomination * 1 + "元红包";else {
                  _0x283627 = _0x20e16b.awardName;
                  debugger;
                }
              }
            }
          }
        }
      }
    }
    return _0x283627;
  }
  async ["getOpenCardPath"](_0x452b54 = this.activityUrl) {
    let _0x362335 = await this.get(_0x452b54, {});
    const _0x43a09e = cheerio.load(cheerio.load(_0x362335).html());
    let _0x3948fe = "";
    _0x43a09e("script[src]").each((_0x634585, _0x71eeaf) => {
      const _0x90ef6e = _0x43a09e(_0x71eeaf).attr("src");
      let _0x3673af = _0x90ef6e.match(/\/\/.*\/js\/index\.\w+\.js/);
      _0x3673af && _0x3673af.length > 0 && (_0x3948fe = _0x3673af[0]);
    });
    _0x362335 = await this.get("https:" + _0x3948fe, {});
    let _0x47a6de = _0x362335.match(/dingzhi\/([a-zA-Z]+)\/union\/saveTask/);
    return _0x47a6de[1];
  }
  async ["apiBatch"](_0x5aa07c, _0x42a308 = {}) {
    let _0x4be3c5 = _0x42a308?.["batchSize"] || 2,
      _0x75b390 = _0x42a308?.["execCount"] || 0,
      _0x168f18 = _0x42a308?.["filterFunc"] || null,
      _0x247252 = _0x42a308?.["processFunc"] || null;
    const _0x1c077b = [];
    for (let _0x5ec1be = 0; _0x5ec1be < _0x75b390; _0x5ec1be++) {
      for (let _0xc0c3cc = 0; _0xc0c3cc < _0x5aa07c.length; _0xc0c3cc += _0x4be3c5) {
        const _0xc789a8 = _0x5aa07c.slice(_0xc0c3cc, _0xc0c3cc + _0x4be3c5),
          _0x16908d = Promise.all(_0xc789a8.map(async _0x449bb8 => {
            try {
              const _0x24ba87 = await _0x449bb8();
              if (_0x24ba87 !== null && (!_0x168f18 || _0x168f18(_0x24ba87))) {
                return _0x247252 ? _0x247252(_0x24ba87) : _0x24ba87;
              }
              return null;
            } catch (_0x3b1719) {
              return console.error("任务 " + _0x449bb8 + " 执行出错：" + _0x3b1719), null;
            }
          }));
        _0x1c077b.push(_0x16908d);
      }
    }
    const _0x4b0443 = (await Promise.all(_0x1c077b)).flat();
    let _0xa22f2a = _0x4b0443.filter(_0x5bb4f3 => _0x5bb4f3 !== null);
    return _0x247252 && (_0xa22f2a = _0xa22f2a.map(_0x5e530a => {
      try {
        return _0x247252(_0x5e530a);
      } catch (_0x52ac76) {
        return console.error("处理结果 " + _0x5e530a + " 出错：" + _0x52ac76), null;
      }
    }).filter(_0x2cdcda => _0x2cdcda !== null)), _0xa22f2a;
  }
  ["getActivityId"](_0x197ebd = this.activityUrl) {
    const _0x1353eb = new URLSearchParams(new URL(_0x197ebd).search),
      _0x337158 = ["activityId", "giftId", "actId", "token", "code", "a", "id"];
    let _0x5a2553 = "";
    for (let _0x4a8f0f of _0x337158) {
      _0x5a2553 = _0x1353eb.get(_0x4a8f0f);
      if (_0x5a2553) break;
    }
    return !_0x5a2553 && (_0x5a2553 = this.match(/\/(dz[a-zA-Z0-9]{28,32})/, _0x197ebd)), this.activityId = _0x5a2553, this.activityId;
  }
  ["filterUrl"](_0x1af128) {
    if (_0x1af128 === null) return null;
    const _0x1d2293 = new URLSearchParams(new URL(_0x1af128).search),
      _0x2b3e1f = [];
    for (const [_0x3b02de, _0x4b154d] of _0x1d2293.entries()) {
      if (keywords.includes(_0x3b02de)) continue;
      _0x2b3e1f.push(_0x3b02de + "=" + _0x4b154d);
    }
    if (_0x2b3e1f.length > 0) return _0x1af128.split("?")[0] + "?" + _0x2b3e1f.join("&");
    return _0x1af128;
  }
  ["buildActInfo"]() {
    if (!this.activityUrl) {
      return;
    }
    this.activityUrl = this.filterUrl(this.activityUrl);
    this.activityUrl = this.match(/(https?:\/\/[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|])/, this.activityUrl);
    this.activityUrl = this?.["activityUrl"]?.["replace"](/(isvjd|lzkjdz|cjhydz|lzkjdzisv|cjhydzisv)/g, _0x36f59d => {
      switch (_0x36f59d) {
        case "isvjd":
          return "isvjcloud";
        case "lzkjdz":
          return "lzkj";
        case "cjhydz":
          return "cjhy";
        case "lzkjdzisv":
          return "lzkj-isv";
        case "cjhydzisv":
          return "cjhy-isv";
        default:
          return _0x36f59d;
      }
    }) || "";
    this.domain = this.match(/https?:\/\/([^/]+)/, this.activityUrl);
    this.activityId = this.getActivityId(this.activityUrl);
    while (this.activityId.startsWith("https")) {
      this.activityUrl = this.activityId;
      this.activityId = this.getActivityId(this.activityUrl);
    }
    this.activityType = this.getQueryString(this.activityUrl, "activityType");
    this.venderId = this.getQueryString(this.activityUrl, "user_id") || this.getQueryString(this.activityUrl, "userId") || this.match(/\/m\/(\d+)\//, this.activityUrl) || this.getQueryString(this.activityUrl, "venderId");
    this.userId = this.venderId;
    this?.["activityUrl"] && (this.urlPrefix = Object.keys(urlPrefixes).find(_0xd7a3e3 => this.activityUrl.match(urlPrefixes[_0xd7a3e3])) || "");
    console.log("活动链接 " + this.activityUrl + " " + this.activityType + " " + this.venderId);
  }
  async ["complete"]() {
    !this.runAll && this.index >= this.masterNum && (this.putMsg("全部完成"), this.expire = true);
  }
  async ["rcache"](_0x41bec6, _0x6f0a8f, _0x3b8731) {
    _0x3b8731 ? (await redis.del(_0x41bec6), await redis.set(_0x41bec6, _0x6f0a8f, "NX", "PX", _0x3b8731)) : await redis.set(_0x41bec6, _0x6f0a8f);
  }
  async ["rdel"](_0x3a342a) {
    await redis.del(_0x3a342a);
  }
  async ["rget"](_0x29af0e) {
    return await redis.get(_0x29af0e);
  }
  ["getAwardPrizeInfo"](_0x193607) {
    const _0x29b3a2 = _0x193607.awardType === "JD_BEAN" || _0x193607.awardType === "JD_MARKET",
      _0xb028a4 = parseInt(_0x193607.awardDenomination);
    return {
      "isBean": _0x29b3a2,
      "prizeNum": _0xb028a4
    };
  }
  ["formatDateString"](_0x2aebad) {
    if (_0x2aebad.match(/\d{4}年\d{1,2}月\d{1,2}日\d{2}:\d{2}:\d{2}/)) return _0x2aebad.replace(/(\d{4})年(\d{1,2})月(\d{1,2})日(\d{2}:\d{2}:\d{2})/, "$1-$2-$3 $4");
    return _0x2aebad;
  }
  async ["getRuleSETime"](_0x47fe0e = this.rule) {
    debugger;
    if (this.actStartTime) return;
    const _0x21c809 = /(\d{4}-\d{2}-\d{2} \d{2}:\d{2}|\d{4}-\d{2}-\d{2}\s\d{2}:\d{2}:\d{2}|\d{4}年\d{1,2}月\d{1,2}日\d{2}:\d{2}:\d{2})/g,
      _0x432ad3 = _0x47fe0e.match(_0x21c809);
    if (_0x432ad3) {
      const _0x18867e = this.formatDateString(_0x432ad3[0]),
        _0xcd4e82 = this.formatDateString(_0x432ad3[1]);
      this.actStartTime = new Date(_0x18867e).getTime();
      this.actEndTime = new Date(_0xcd4e82).getTime();
    } else {
      debugger;
      console.log("未找到活动时间！");
    }
  }
  ["generateJdaCookie"]() {
    const _0x413370 = Math.floor(Math.random() * 100000000) + "." + Math.floor(Math.random() * 1e+22),
      _0x1d6906 = Math.floor(Date.now() / 1000) - Math.floor(Math.random() * 31536000),
      _0x524d18 = Math.floor(Date.now() / 1000) - Math.floor(Math.random() * 604800),
      _0x515a66 = _0x524d18 - Math.floor(Math.random() * 604800),
      _0x52c04d = Math.floor(Math.random() * 100) + 1,
      _0x7590e3 = "__jda=" + _0x413370 + "." + _0x1d6906 + "." + _0x515a66 + "." + _0x524d18 + "." + _0x52c04d;
    return _0x7590e3;
  }
}
module.exports = {
  "http": $,
  "Env": Env,
  "CryptoJS": CryptoJS,
  "notify": notify,
  "fs": fs,
  "cheerio": cheerio,
  "NodeRSA": NodeRSA
};