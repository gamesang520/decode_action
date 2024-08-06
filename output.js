//Tue Aug 06 2024 20:45:46 GMT+0000 (Coordinated Universal Time)
//Base:https://github.com/echo094/decode-js
//Modify:https://github.com/smallfawn/decode_action
const notify = require("./utils/Rebels_sendJDNotify"),
  jdCookie = require("./jdCookie"),
  common = require("./utils/Rebels_jdCommon"),
  {
    H5st
  } = require("./utils/Rebels_H"),
  isNotify = process.env.jd_zzhb_Notify === "true",
  pddcode = process.env.jd_zzhb_inviterId || "",
  pddnum = process.env.jd_zzhb_num,
  linkId = "wDNvX5t2N52cWEM8cLOa0g",
  PDD_WAIT = "1";
let waitTimes = parseInt(PDD_WAIT) * 1000;
$.helpnum = 0;
$.PDDEnd = false;
let cookie = "";
const cookiesArr = Object.keys(jdCookie).map(illIii => jdCookie[illIii]).filter(ii1il1 => ii1il1);
!cookiesArr[0] && ($.msg($.name, "【提示】请先获取Cookie"), process.exit(1));
!(async () => {
  authorCodeList = await getAuthorCodeList("http://code.257999.xyz/yqlxj.json");
  authorCodeList ? (console.log("❖ 测试连通性中...\n❖ 服务状态正常...\n"), $.authorCode = authorCodeList[random(0, authorCodeList.length)]) : console.log("❖ 准备就绪...\n");
  if (pddnum) console.log("❖ 已填写指定人数变量，指定人数 [" + pddnum + "]");
  pddcode ? console.log("❖ 已填写指定助力变量，开始助力 [" + pddcode + "]") : console.log("❖ 未填写指定助力变量，开始助力账号[1]");
  notify.config({
    "title": $.name
  });
  for (let l1iIII = 0; l1iIII < cookiesArr.length; l1iIII++) {
    $.index = l1iIII + 1;
    cookie = cookiesArr[l1iIII];
    common.setCookie(cookie);
    $.UserName = decodeURIComponent(common.getCookieValue(cookie, "pt_pin"));
    $.UA = common.genUA($.UserName);
    $.message = notify.create($.index, $.UserName);
    $.nickName = "";
    console.log("\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "******\n");
    $.hash = gen_jda_cookie();
    $.strList = "__jda=" + $.hash.jda + ";__jdb=" + $.hash.jdb + ";__jdc=" + $.hash.jdc + ";__jdv=" + $.hash.jdv + ";;";
    $.uuid = new Date().getTime() + "" + parseInt(2147483647 * Math.random());
    await Main();
    common.unsetCookie();
    if ($.PDDEnd || $.runEnd) break;
    await $.wait(parseInt(waitTimes * 1 + 100, 10));
  }
  isNotify && notify.getMessage() && (notify.appendContent("\n"), await notify.push());
})().catch(llI1I1 => $.logErr(llI1I1)).finally(() => $.done());
async function Main() {
  $.canWatering = true;
  try {
    if (pddcode) {
      $.index == 1 ? (console.log("⏺️ 账号[1]默认去助力作者"), await inviteFissionhelp($.authorCode)) : await inviteFissionhelp(pddcode);
    } else {
      if ($.index == 1) {
        console.log("⏺️ 账号[1]默认去助力作者");
        await inviteFissionHome();
        if ($.runEnd) return;
        await inviteFissionhelp($.authorCode);
      } else await inviteFissionhelp($.shareinviter);
    }
  } catch (iii1ii) {
    console.log(iii1ii.message);
  }
}
async function inviteFissionHome() {
  await sendRequest("inviteFissionBeforeHome");
  if ($.runEnd) return;
  await $.wait(parseInt(waitTimes * 1 + 100, 10));
  await sendRequest("inviteFissionHome");
  await $.wait(parseInt(waitTimes * 1 + 100, 10));
  if ($.inviteFissionHome?.["inviter"]) {
    $.shareinviter = $.inviteFissionHome?.["inviter"];
    const lilIIi = new Date().valueOf(),
      i1l1Il = $.inviteFissionHome?.["countDownTime"] + lilIIi,
      llIli = $.time("yyyy-MM-dd HH:mm:ss", i1l1Il);
    console.log("⏺️ 已开启活动，到期时间：" + llIli + "\n⏺️ 助力码：" + $.shareinviter);
  } else console.log("⏺️ 未能正确获取到助力码，退出执行！"), $.runEnd = true;
}
async function inviteFissionhelp(i1i11l) {
  $.inviter = i1i11l;
  await sendRequest("inviteFissionhelp");
}
async function handleResponse(IiiliI, iii1iI) {
  try {
    switch (IiiliI) {
      case "inviteFissionhelp":
        if (iii1iI?.["code"] === 0 && iii1iI?.["success"] === true) {
          $.inviteFissionhelp = iii1iI.data;
          switch ($.inviteFissionhelp?.["helpResult"]) {
            case null:
              console.log("❌ 助力码未填写");
              break;
            case 0:
              console.log("❌ 不能自己助力自己");
              break;
            case 1:
              if ($.index == 1) console.log("✅ 助力成功 [感谢]");else {
                $.helpnum++;
                console.log("✅ 助力成功 [" + $.helpnum + "]");
                if (pddnum) {
                  if (pddnum <= $.helpnum) {
                    console.log("✅ 当前助力已达到指定助力人数，退出！");
                    $.PDDEnd = true;
                    return;
                  }
                }
              }
              break;
            case 2:
              console.log("❌ 活动火爆");
              break;
            case 3:
              console.log("❌ 没有助力次数");
              break;
            case 6:
              console.log("❌ 已助力过了");
              break;
            case 8:
              if ($.index == 1) {
                console.log("❌ 助力码失效，作者未开启活动！");
                break;
              } else {
                console.log("❌ 助力码失效，请先去开启新一轮活动后再运行吧！");
                return;
              }
            default:
              {
                console.log("[未知助力状态]:[" + helpResult + "]");
                break;
              }
          }
        } else {
          if (iii1iI.data?.["bizMsg"]) {
            console.log("> " + iii1iI.errMsg);
          } else {
            if (iii1iI.errMsg) console.log("> " + iii1iI.errMsg);else iii1iI.msg ? console.log("> " + iii1iI.msg) : console.log("❓" + IiiliI + " " + JSON.stringify(iii1iI));
          }
        }
        break;
      case "inviteFissionBeforeHome":
        if (iii1iI?.["code"] === 0 && iii1iI?.["success"] === true) $.inviteFissionBeforeHome = iii1iI.data;else {
          if (iii1iI.data?.["bizMsg"]) console.log("> " + iii1iI.data?.["bizMsg"] + "}");else {
            if (iii1iI.errMsg) $.runEnd = true, console.log("> " + iii1iI.errMsg);else iii1iI.msg ? console.log("> " + iii1iI.msg) : console.log("❓" + IiiliI + " " + JSON.stringify(iii1iI));
          }
        }
        break;
      case "inviteFissionHome":
        if (iii1iI?.["code"] === 0 && iii1iI?.["success"] === true) $.inviteFissionHome = iii1iI.data;else {
          if (iii1iI.data?.["bizMsg"]) console.log("> " + iii1iI.data?.["bizMsg"]);else {
            if (iii1iI.errMsg) $.runEnd = true, console.log("> " + iii1iI.errMsg);else iii1iI.msg ? console.log("> " + iii1iI.msg) : console.log("❓" + IiiliI + " " + JSON.stringify(iii1iI));
          }
        }
        break;
    }
  } catch (Iil1ll) {
    console.log("❌ 未能正确处理 " + IiiliI + " 请求响应 " + (Iil1ll.message || Iil1ll));
  }
}
async function sendRequest(iillI) {
  if ($.runEnd) return;
  let IIliIi = "",
    IllIiI = null,
    i1il1 = null,
    I1l111 = "POST",
    IIii1l = {},
    I1iIII = {};
  switch (iillI) {
    case "inviteFissionhelp":
      I1iIII = {
        "appId": "c5389",
        "functionId": "inviteFissionhelp",
        "appid": "activities_platform",
        "clientVersion": common.getLatestAppVersion(),
        "client": "ios",
        "body": {
          "linkId": linkId,
          "isJdApp": true,
          "inviter": $.inviter
        },
        "version": "4.7",
        "ua": $.UA,
        "t": true
      }, IIii1l = await H5st.getH5st(I1iIII), IIliIi = "https://api.m.jd.com/client.action", IllIiI = IIii1l.paramsData;
      break;
    case "inviteFissionBeforeHome":
      I1iIII = {
        "appId": "02f8d",
        "functionId": "inviteFissionBeforeHome",
        "appid": "activities_platform",
        "clientVersion": common.getLatestAppVersion(),
        "client": "ios",
        "body": {
          "linkId": linkId,
          "isJdApp": true,
          "inviter": ""
        },
        "version": "4.7",
        "ua": $.UA,
        "t": true
      }, IIii1l = await H5st.getH5st(I1iIII), IIliIi = "https://api.m.jd.com/client.action", IllIiI = IIii1l.paramsData;
      break;
    case "inviteFissionHome":
      I1iIII = {
        "appId": "eb67b",
        "functionId": "inviteFissionHome",
        "appid": "activities_platform",
        "clientVersion": common.getLatestAppVersion(),
        "client": "ios",
        "body": {
          "linkId": linkId,
          "inviter": ""
        },
        "version": "4.7",
        "ua": $.UA,
        "t": true
      }, IIii1l = await H5st.getH5st(I1iIII), IIliIi = "https://api.m.jd.com/client.action", IllIiI = IIii1l.paramsData;
      break;
    default:
      console.log("❌ 未知请求 " + iillI);
      return;
  }
  const liiI11 = {};
  IllIiI && (IllIiI = {
    ...IllIiI,
    ...liiI11
  });
  i1il1 && (i1il1 = {
    ...i1il1,
    ...liiI11
  });
  const ililI1 = {
    "url": IIliIi,
    "method": I1l111,
    "headers": {
      "Accept": "application/json, text/plain, */*",
      "Accept-Encoding": "gzip, deflate, br",
      "Accept-Language": "zh-cn",
      "Connection": "keep-alive",
      "Content-Type": "application/x-www-form-urlencoded",
      "X-Requested-With": "XMLHttpRequest",
      "Cookie": cookie + $.strList,
      "Referer": "https://pro.m.jd.com/jdlite/active/23CeE8ZXA4uFS9M9mTjtta9T4S5x/index.html",
      "X-Referer-Page": "https://pro.m.jd.com/jdlite/active/23CeE8ZXA4uFS9M9mTjtta9T4S5x/index.html",
      "Origin": "https://pro.m.jd.com",
      "x-rp-client": "h5_1.0.0",
      "User-Agent": $.UA
    },
    "params": i1il1,
    "data": IllIiI,
    "timeout": 20000
  };
  I1l111 === "GET" && (delete ililI1.data, delete ililI1.headers["Content-Type"]);
  const IIii1i = 1;
  let i1ili = 0,
    Iiill1 = null,
    I1iII1 = false;
  while (i1ili < IIii1i) {
    i1ili > 0 && (await $.wait(1000));
    const Ii1ilI = await common.request(ililI1);
    if (!Ii1ilI.success) {
      Iiill1 = "🚫 " + iillI + " 请求失败 ➜ " + Ii1ilI.error;
      i1ili++;
      continue;
    }
    if (!Ii1ilI?.["data"]) {
      Iiill1 = "🚫 " + iillI + " 请求失败 ➜ 无响应数据";
      i1ili++;
      continue;
    }
    handleResponse(iillI, Ii1ilI.data);
    I1iII1 = false;
    break;
  }
  if (i1ili >= IIii1i) {
    console.log(Iiill1);
    I1iII1 && ($.outFlag = true, $.message && $.message.fix(Iiill1));
  }
}
function getAuthorCodeList(lill1i) {
  return new Promise(Ill11i => {
    const iilil = {
      "url": "" + lill1i,
      "timeout": 10000,
      "headers": {
        "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1 Edg/87.0.4280.88"
      }
    };
    $.get(iilil, async (Ill11l, il1ll, i1ilIi) => {
      try {
        if (Ill11l) {} else {
          if (i1ilIi) {
            i1ilIi = JSON.parse(i1ilIi);
          } else console.log("未获取到数据,请重新运行");
        }
      } catch (Ii1il1) {
        $.logErr(Ii1il1, il1ll);
        i1ilIi = null;
      } finally {
        Ill11i(i1ilIi);
      }
    });
  });
}
function gen_jda_cookie() {
  const il1lI = "3";
  let IliIIl = Math.floor(147483647 * Math.random()).toString(),
    I1il1l = [...Array(12)].map(() => Math.floor(Math.random() * 10)).join(""),
    lI1l1l = timestamp() - 200000,
    IIliII = lI1l1l + Math.floor(Math.random() * 100000),
    iiliI = IIliII + Math.floor(Math.random() * 10000),
    Ill11I = lI1l1l + Math.floor(Math.random() * 100000),
    I1il1i = [IliIIl, "" + lI1l1l + I1il1l, lI1l1l.toString(), IIliII.toString(), iiliI.toString(), il1lI].join("."),
    IliIIi = [IliIIl, I1il1l.slice(-2), "" + lI1l1l + I1il1l + "|" + il1lI, iiliI.toString()].join("."),
    lI1l1i = IliIIl,
    i1iil = [IliIIl, "kong", "t_1003649902_", "tuiguang", "202054b9f71e49e6a228adc8e665f848", Ill11I.toString()],
    llI11l = encodeURIComponent(i1iil.join("|"));
  return {
    "jda": I1il1i,
    "jdb": IliIIi,
    "jdc": lI1l1i,
    "jdv": llI11l
  };
}
function timestamp() {
  return Math.floor(Date.now() / 1000);
}
function random(iili1, II11ii) {
  return Math.floor(Math.random() * (II11ii - iili1)) + iili1;
}
function Env(t, e) {
  "undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process.exit(0);
  class s {
    constructor(t) {
      this.env = t;
    }
    send(t, e = "GET") {
      t = "string" == typeof t ? {
        url: t
      } : t;
      let s = this.get;
      return "POST" === e && (s = this.post), new Promise((e, i) => {
        s.call(this, t, (t, s, r) => {
          t ? i(t) : e(s);
        });
      });
    }
    get(t) {
      return this.send.call(this.env, t);
    }
    post(t) {
      return this.send.call(this.env, t, "POST");
    }
  }
  return new class {
    constructor(t, e) {
      this.name = t;
      this.http = new s(this);
      this.data = null;
      this.dataFile = "box.dat";
      this.logs = [];
      this.isMute = !1;
      this.isNeedRewrite = !1;
      this.logSeparator = "\n";
      this.startTime = new Date().getTime();
      Object.assign(this, e);
      this.log("", `🔔${this.name}, 开始!`);
    }
    isNode() {
      return "undefined" != typeof module && !!module.exports;
    }
    isQuanX() {
      return "undefined" != typeof $task;
    }
    isSurge() {
      return "undefined" != typeof $httpClient && "undefined" == typeof $loon;
    }
    isLoon() {
      return "undefined" != typeof $loon;
    }
    toObj(t, e = null) {
      try {
        return JSON.parse(t);
      } catch {
        return e;
      }
    }
    toStr(t, e = null) {
      try {
        return JSON.stringify(t);
      } catch {
        return e;
      }
    }
    getjson(t, e) {
      let s = e;
      const i = this.getdata(t);
      if (i) try {
        s = JSON.parse(this.getdata(t));
      } catch {}
      return s;
    }
    setjson(t, e) {
      try {
        return this.setdata(JSON.stringify(t), e);
      } catch {
        return !1;
      }
    }
    getScript(t) {
      return new Promise(e => {
        this.get({
          url: t
        }, (t, s, i) => e(i));
      });
    }
    runScript(t, e) {
      return new Promise(s => {
        let i = this.getdata("@chavy_boxjs_userCfgs.httpapi");
        i = i ? i.replace(/\n/g, "").trim() : i;
        let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");
        r = r ? 1 * r : 20;
        r = e && e.timeout ? e.timeout : r;
        const [o, h] = i.split("@"),
          n = {
            url: `http://${h}/v1/scripting/evaluate`,
            body: {
              script_text: t,
              mock_type: "cron",
              timeout: r
            },
            headers: {
              "X-Key": o,
              Accept: "*/*"
            }
          };
        this.post(n, (t, e, i) => s(i));
      }).catch(t => this.logErr(t));
    }
    loaddata() {
      if (!this.isNode()) return {};
      {
        this.fs = this.fs ? this.fs : require("fs");
        this.path = this.path ? this.path : require("path");
        const t = this.path.resolve(this.dataFile),
          e = this.path.resolve(process.cwd(), this.dataFile),
          s = this.fs.existsSync(t),
          i = !s && this.fs.existsSync(e);
        if (!s && !i) return {};
        {
          const i = s ? t : e;
          try {
            return JSON.parse(this.fs.readFileSync(i));
          } catch (t) {
            return {};
          }
        }
      }
    }
    writedata() {
      if (this.isNode()) {
        this.fs = this.fs ? this.fs : require("fs");
        this.path = this.path ? this.path : require("path");
        const t = this.path.resolve(this.dataFile),
          e = this.path.resolve(process.cwd(), this.dataFile),
          s = this.fs.existsSync(t),
          i = !s && this.fs.existsSync(e),
          r = JSON.stringify(this.data);
        s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r);
      }
    }
    lodash_get(t, e, s) {
      const i = e.replace(/\[(\d+)\]/g, ".$1").split(".");
      let r = t;
      for (const t of i) if (r = Object(r)[t], void 0 === r) return s;
      return r;
    }
    lodash_set(t, e, s) {
      return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t);
    }
    getdata(t) {
      let e = this.getval(t);
      if (/^@/.test(t)) {
        const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t),
          r = s ? this.getval(s) : "";
        if (r) try {
          const t = JSON.parse(r);
          e = t ? this.lodash_get(t, i, "") : e;
        } catch (t) {
          e = "";
        }
      }
      return e;
    }
    setdata(t, e) {
      let s = false;
      if (/^@/.test(e)) {
        const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e),
          o = this.getval(i),
          h = i ? "null" === o ? null : o || "{}" : "{}";
        try {
          const e = JSON.parse(h);
          this.lodash_set(e, r, t);
          s = this.setval(JSON.stringify(e), i);
        } catch (e) {
          const o = {};
          this.lodash_set(o, r, t);
          s = this.setval(JSON.stringify(o), i);
        }
      } else s = this.setval(t, e);
      return s;
    }
    getval(t) {
      return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null;
    }
    setval(t, e) {
      return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null;
    }
    initGotEnv(t) {
      this.got = this.got ? this.got : require("got");
      this.cktough = this.cktough ? this.cktough : require("tough-cookie");
      this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar();
      t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar));
    }
    get(t, e = () => {}) {
      t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]);
      this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, {
        "X-Surge-Skip-Scripting": !1
      })), $httpClient.get(t, (t, s, i) => {
        !t && s && (s.body = i, s.statusCode = s.status);
        e(t, s, i);
      })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, {
        hints: !1
      })), $task.fetch(t).then(t => {
        const {
          statusCode: s,
          statusCode: i,
          headers: r,
          body: o
        } = t;
        e(null, {
          status: s,
          statusCode: i,
          headers: r,
          body: o
        }, o);
      }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => {
        try {
          if (t.headers["set-cookie"]) {
            const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();
            s && this.ckjar.setCookieSync(s, null);
            e.cookieJar = this.ckjar;
          }
        } catch (t) {
          this.logErr(t);
        }
      }).then(t => {
        const {
          statusCode: s,
          statusCode: i,
          headers: r,
          body: o
        } = t;
        e(null, {
          status: s,
          statusCode: i,
          headers: r,
          body: o
        }, o);
      }, t => {
        const {
          message: s,
          response: i
        } = t;
        e(s, i, i && i.body);
      }));
    }
    post(t, e = () => {}) {
      if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, {
        "X-Surge-Skip-Scripting": !1
      })), $httpClient.post(t, (t, s, i) => {
        !t && s && (s.body = i, s.statusCode = s.status);
        e(t, s, i);
      });else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, {
        hints: !1
      })), $task.fetch(t).then(t => {
        const {
          statusCode: s,
          statusCode: i,
          headers: r,
          body: o
        } = t;
        e(null, {
          status: s,
          statusCode: i,
          headers: r,
          body: o
        }, o);
      }, t => e(t));else if (this.isNode()) {
        this.initGotEnv(t);
        const {
          url: s,
          ...i
        } = t;
        this.got.post(s, i).then(t => {
          const {
            statusCode: s,
            statusCode: i,
            headers: r,
            body: o
          } = t;
          e(null, {
            status: s,
            statusCode: i,
            headers: r,
            body: o
          }, o);
        }, t => {
          const {
            message: s,
            response: i
          } = t;
          e(s, i, i && i.body);
        });
      }
    }
    time(t, e = null) {
      const s = e ? new Date(e) : new Date();
      let i = {
        "M+": s.getMonth() + 1,
        "d+": s.getDate(),
        "H+": s.getHours(),
        "m+": s.getMinutes(),
        "s+": s.getSeconds(),
        "q+": Math.floor((s.getMonth() + 3) / 3),
        S: s.getMilliseconds()
      };
      /(y+)/.test(t) && (t = t.replace(RegExp.$1, (s.getFullYear() + "").substr(4 - RegExp.$1.length)));
      for (let e in i) new RegExp("(" + e + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? i[e] : ("00" + i[e]).substr(("" + i[e]).length)));
      return t;
    }
    msg(e = t, s = "", i = "", r) {
      const o = t => {
        if (!t) return t;
        if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? {
          "open-url": t
        } : this.isSurge() ? {
          url: t
        } : void 0;
        if ("object" == typeof t) {
          if (this.isLoon()) {
            let e = t.openUrl || t.url || t["open-url"],
              s = t.mediaUrl || t["media-url"];
            return {
              openUrl: e,
              mediaUrl: s
            };
          }
          if (this.isQuanX()) {
            let e = t["open-url"] || t.url || t.openUrl,
              s = t["media-url"] || t.mediaUrl;
            return {
              "open-url": e,
              "media-url": s
            };
          }
          if (this.isSurge()) {
            let e = t.url || t.openUrl || t["open-url"];
            return {
              url: e
            };
          }
        }
      };
      if (this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))), !this.isMuteLog) {
        let t = ["", "==============📣系统通知📣=============="];
        t.push(e);
        s && t.push(s);
        i && t.push(i);
        console.log(t.join("\n"));
        this.logs = this.logs.concat(t);
      }
    }
    log(...t) {
      t.length > 0 && (this.logs = [...this.logs, ...t]);
      console.log(t.join(this.logSeparator));
    }
    logErr(t, e) {
      const s = !this.isSurge() && !this.isQuanX() && !this.isLoon();
      s ? this.log("", `❗️${this.name}, 错误!`, t.stack) : this.log("", `❗️${this.name}, 错误!`, t);
    }
    wait(t) {
      return new Promise(e => setTimeout(e, t));
    }
    done(t = {}) {
      const e = new Date().getTime(),
        s = (e - this.startTime) / 1000;
      this.log("", `🔔${this.name}, 结束! 🕛 ${s} 秒`);
      this.log();
      (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t);
    }
  }(t, e);
}