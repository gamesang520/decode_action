//Tue Aug 06 2024 20:16:37 GMT+0000 (Coordinated Universal Time)
//Base:https://github.com/echo094/decode-js
//Modify:https://github.com/smallfawn/decode_action
if (mode) {
  activityUrl = "https://lzkj-isv.isvjcloud.com/prod/cc/interactsaas/index?activityType=10092&templateId=831049299456454111&activityId=1730467509346807809&nodeId=101001&prd=cjwx";
  activityUrl = "https://cjhy-isv.isvjcloud.com/wxGameActivity/activity?activityId=2e8c28b441b34d03ab4579b1dd78fda3";
  activityUrl = "https://lzkj-isv.isvjd.com/wxgame/activity/de387009255e49d68a1a1ebc9973dc2a?activityId=de387009255e49d68a1a1ebc9973dc2a";
  activityUrl = "https://lzkj-isv.isvjd.com/wxgame/activity/7d77dd9caf16432cac8894e644bf146f?activityId=7d77dd9caf16432cac8894e644bf146f";
  activityUrl = "https://lzkj-isv.isvjcloud.com/prod/cc/interaction/v2/10086/1001/?activityId=1809050581606518785&shopId=1000004065";
}
const {
  RunMode: _0xfcbdcc,
  UserMode: _0xd05e66
} = require("./bear");
_0xfcbdcc.envInfo = {
  "name": "无线游戏beta",
  "runName": "jd_wx_game",
  "version": "2.0.1"
};
let _0x120d7f = ["10082", "10084", "10086", "10089", "10091", "10092", "10093", "10094", "10095"];
class _0xbfd39f extends _0xd05e66 {
  constructor(_0x287e53, _0x5cfa76) {
    super(_0x287e53, _0x5cfa76);
  }
  async ["v2ToDoTask"](_0x5d8961, _0x512db6 = "") {
    let _0x5219b9 = {
        2: "浏览店铺",
        7: "加购商品",
        8: "购买商品",
        9: "分享商品",
        12: "分享活动"
      },
      _0x373350 = {
        2: "browseShop/shareShop",
        7: "addSku/excute",
        9: "shareSku",
        12: "shareActivity"
      },
      _0x1ed663 = await this.v2Api("api/" + this.activityType + "/" + _0x373350[_0x5d8961], {
        "skuId": _0x512db6
      });
    this.debug(_0x1ed663, _0x5d8961);
    if (_0x1ed663 && _0x1ed663.code === 200) {
      return this.log("任务[" + (_0x5219b9[_0x5d8961] || _0x512db6 || _0x5d8961) + "]完成"), _0x1ed663.data;
    }
  }
  async ["userTask"]() {
    await this.isvObfuscator();
    if (this.mode === "v2") {
      await this.login();
      let _0x2abea7 = await this.v2Api("api/" + this.activityType + "/getTask");
      this.debug(_0x2abea7);
      if (_0x2abea7 && _0x2abea7.code === 200) {
        let _0x1c9170 = _0x2abea7?.["data"] || [];
        for (let _0x30e3dc of _0x1c9170) {
          if (_0x30e3dc.taskFinishGiveAllLotteryCount >= _0x30e3dc.totalLimit) continue;
          switch (_0x30e3dc.taskType) {
            case 2:
            case 12:
              await this.v2ToDoTask(_0x30e3dc.taskType);
              break;
            case 9:
              let _0x3102e1 = await this.v2Api("api/" + this.activityType + "/getShareSkuTaskSkuList"),
                _0x1bfbb9 = _0x3102e1?.["data"]?.["filter"](_0x4eddc9 => !_0x4eddc9.isOperated) || [];
              for (let _0x5c2024 = _0x30e3dc.taskFinishGiveAllLotteryCount || 0; _0x5c2024 < Math.min(_0x30e3dc.totalLimit, _0x1bfbb9.length); _0x5c2024++) {
                await this.v2ToDoTask(9, _0x1bfbb9.shift().skuId);
              }
              break;
            case 7:
              let _0xadb004 = await this.v2Api("api/" + this.activityType + "/addSku/getSkuList"),
                _0x3a6de8 = _0xadb004?.["data"]?.["filter"](_0x93d1c3 => !_0x93d1c3.isOperated) || [];
              for (let _0xdcff7e = _0x30e3dc.taskFinishGiveAllLotteryCount || 0; _0xdcff7e < Math.min(_0x30e3dc.totalLimit, _0x3a6de8.length); _0xdcff7e++) {
                await this.v2ToDoTask(7, _0x3a6de8.shift().skuId);
              }
              break;
          }
        }
      }
      let _0x4f0f26 = await this.v2Api("api/" + this.activityType + "/gameChanceNum");
      this.debug(_0x4f0f26);
      let _0x4e0068 = _0x4f0f26?.["data"] ?? 0;
      while (_0x4e0068-- > 0) {
        await this.sleep(2000, 3000);
        let _0x3ec701 = await this.v2Api("api/" + this.activityType + "/gameStart");
        this.debug(_0x3ec701);
        let _0x2a3a0d = _0x3ec701.data.uuid;
        await this.sleep(3000, 5000);
        let _0x23d215 = await this.v2Api("api/" + this.activityType + "/gameEnd", {
          "uuid": _0x2a3a0d
        });
        this.debug(_0x23d215);
      }
      let _0x2aee39 = await this.v2Api("api/" + this.activityType + "/chanceNum");
      this.debug(_0x2aee39);
      let _0x3e5c0e = _0x2aee39?.["data"] ?? 5;
      this.debug(_0x3e5c0e);
      while (_0x3e5c0e-- > 0) {
        let _0x487bb1 = await this.v2Api("api/" + this.activityType + "/lotteryDraw");
        this.log(_0x487bb1);
        if (_0x487bb1 && _0x487bb1.code === 200) {
          this.putMsg(_0x487bb1?.["data"]?.["prizeName"] || "空气");
          _0x487bb1?.["data"]?.["result"]?.["result"] !== "true" && _0x487bb1?.["data"]?.["result"]?.["result"] !== true && _0x487bb1?.["data"]?.["activityPrizeId"] && (this.addressId = _0x487bb1?.["data"]?.["result"]?.["result"], this.prizeName = _0x487bb1?.["data"]?.["prizeName"], this.activityPrizeId = _0x487bb1?.["data"]?.["activityPrizeId"], await this.saveAddress());
          continue;
        }
        let _0x4d95a7 = _0x487bb1?.["message"] || "抽奖失败";
        this.putMsg(_0x4d95a7);
        await this.wxStopSync(_0x4d95a7);
        return;
      }
      return;
    }
    await this.getDefenseUrls();
    if (_0x120d7f.includes(this.activityType)) {
      await this.login();
      let _0x34712c = this.getQueryString(this.activityUrl, "templateId"),
        _0x180126 = await this.lzkjApi("api/game/getGameInfo", {
          "gameUrl": "https://lzkj-yc.isvjd.com/index.html?templateId=" + _0x34712c + "&token=" + this.token,
          "shareUserId": ""
        });
      this.debug(_0x180126);
      if (_0x180126 && _0x180126.resp_code === 0) {
        await this.lzkjTask(_0x180126.data?.["taskList"]);
      }
      _0x180126 = await this.lzkjApi("api/game/getGameInfo", {
        "gameUrl": "https://lzkj-yc.isvjd.com/index.html?templateId=" + _0x34712c + "&token=" + this.token,
        "shareUserId": ""
      });
      this.debug(_0x180126);
      if (!(_0x180126 && _0x180126.resp_code === 0)) {
        let _0x1ec695 = _0x180126?.["resp_msg"] || "获取任务失败";
        this.putMsg(_0x1ec695);
        await this.wxStopSync(_0x1ec695);
        return;
      }
      let _0x2f3f42 = _0x180126.data?.["gameChance"] ?? 4,
        _0x442194 = _0x180126.data?.["canDrawTimes"] ?? 0,
        _0x4b9d30 = await this.lzkjApi("api/game/init", {
          "templateId": _0x34712c
        });
      if (_0x4b9d30 && _0x4b9d30.resp_code === 0) {
        let _0x49bff6 = _0x4b9d30.data?.["publicKey"],
          _0x3d8d2e = _0x4b9d30.data?.["ruleScore"];
        this.debug(_0x49bff6, _0x3d8d2e);
        for (let _0x5a6488 = 0; _0x5a6488 < _0x2f3f42; _0x5a6488++) {
          let _0x5bbcce = await this.lzkjApi("api/game/start");
          this.debug(_0x5bbcce);
          if (!(_0x5bbcce && _0x5bbcce.resp_code === 0)) {
            this.log("开启游戏失败");
            continue;
          }
          let _0xb7b9d3 = _0x5bbcce.data?.["id"],
            _0x59c786 = this.rsaEncrypt(_0x49bff6, {
              "encryptionScheme": "pkcs1"
            }, JSON.stringify({
              "score": _0x3d8d2e + "",
              "id": _0xb7b9d3
            }));
          this.debug(_0x59c786);
          let _0x36d08d = await this.lzkjApi("api/game/end", {
            "result": _0x59c786,
            "activityId": this.activityId
          });
          this.debug(_0x36d08d);
          if (_0x36d08d && _0x36d08d.resp_code === 0) {
            _0x36d08d.data === 1 && _0x442194++;
          }
        }
      } else {
        let _0x57b2a1 = _0x4b9d30?.["resp_msg"] || "初始化游戏失败";
        this.putMsg(_0x57b2a1);
        await this.wxStopSync(_0x57b2a1);
      }
      while (_0x442194-- > 0) {
        let _0x1c7c7d = await this.lzkjApi("api/prize/draw", {
          "consumePoints": 0
        });
        this.debug(_0x1c7c7d);
        if (_0x1c7c7d && _0x1c7c7d.resp_code === 0) {
          this.putMsg(_0x1c7c7d.data?.["prizeName"] || "空气");
          if (_0x1c7c7d.data.prizeType == 3) {
            this.addressId = _0x1c7c7d.data.addressId;
            this.prizeName = _0x1c7c7d.data.prizeName;
            await this.saveAddress();
          }
        } else {
          let _0x214e28 = _0x1c7c7d?.["resp_msg"] || "抽奖失败";
          this.putMsg(_0x214e28);
          await this.wxStopSync(_0x214e28);
        }
        await this.sleep(200);
      }
      return;
    }
    await this.wxCommonInfo();
    await this.getSimpleActInfoVo();
    this.index === 0 && (await this.getShopInfo());
    this.defenseUrls.length === 0 ? await this.getMyPing() : await this.initPinToken();
    await this.accessLog();
    let _0x32c3bc = "",
      _0x1e68bc = "",
      _0x185ec2 = this.activityType == 7 ? {} : {
        "pinImg": _0x32c3bc,
        "nick": _0x1e68bc,
        "shareUuid": _0xd05e66.activity.shareUuid || "",
        "cjyxPin": "",
        "cjhyPin": ""
      };
    this.debug(_0x185ec2, this.type);
    let _0x34eb84 = await this.activityContent(_0x185ec2);
    if (!_0x34eb84?.["result"] || !_0x34eb84?.["data"]) {
      this.putMsg(_0x34eb84?.["errorMessage"]);
      return;
    }
    if (this.activityType == 7) {
      let _0x3a461e = _0x34eb84?.["data"]?.["todayCanDrawOk"] || 1,
        _0x56c403 = _0x34eb84?.["data"]?.["drawContentVOs"] ?? [];
      _0x56c403 = _0x56c403.filter(_0x258f0d => [6, 7, 9, 13, 14, 15, 16].includes(_0x258f0d.type) && _0x258f0d.prizeNum > _0x258f0d.hasSendPrizeNum);
      if (_0x56c403.length === 0) {
        this.putMsg("垃圾或领完");
        this.stop();
        return;
      }
      await this.wxApi("wxGameActivity/follow", {
        "activityId": this.activityId,
        "pin": this.secretPin
      });
      if (_0x3a461e === 0) {
        this.putMsg("无次数");
        return;
      }
      _0x3a461e = Math.min(_0x3a461e, 20);
      _0x56c403 = _0x56c403.sort((_0x40d810, _0x3c4545) => _0x3c4545.startScore - _0x40d810.startScore);
      while (_0x3a461e-- > 0) {
        let _0x11379c = this.random(_0x56c403[0].startScore, _0x56c403[0].endScore) + "";
        _0x11379c = (_0x11379c.substring(0, _0x11379c.length - 1) + 0) * 1;
        this.domain.includes("cjhy") && (_0x11379c = this.encryptCrypto("AES", "ECB", "Pkcs7", "00000000", JSON.stringify(_0x11379c), this.activityId));
        let _0x275fb3 = await this.wxApi("wxGameActivity/gameStartDeposit", {
          "activityId": this.activityId,
          "pin": this.secretPin
        });
        this.debug(_0x275fb3);
        if (!(_0x275fb3 && _0x275fb3.result)) {
          this.log("开启游戏失败");
          continue;
        }
        let _0xfdf5ce = {
          "activityId": this.activityId,
          "pin": this.secretPin,
          "score": encodeURIComponent(_0x11379c)
        };
        this.debug(_0xfdf5ce);
        let _0x27eecd = await this.wxApi("wxGameActivity/gameOverRecord", _0xfdf5ce);
        this.debug(_0x27eecd);
        if (_0x27eecd && _0x27eecd.result) this.putMsg(_0x27eecd.data?.["name"] || "空气"), _0x27eecd.data?.["needWriteAddress"] === "y" && (this.addressId = _0x27eecd.data.addressId, this.prizeName = _0x27eecd.data.name, await this.saveAddress());else {
          let _0x5bcfbd = _0x27eecd?.["errorMessage"] || "游戏失败";
          this.putMsg(_0x5bcfbd);
          await this.wxStopSync(_0x5bcfbd);
        }
      }
    } else {
      let _0x32418f = _0x34eb84?.["data"]?.["drawMiniScore"] ?? 1000;
      if (_0x34eb84?.["data"]?.["isGameEnd"]) {
        this.putMsg("活动已结束");
        await this.writeLongCache();
        this.stop();
        return;
      }
      let _0x6dbfd3 = _0x34eb84?.["data"]?.["uid"];
      this.index === 0 && _0x6dbfd3 && (_0xd05e66.activity.shareUuid = _0x6dbfd3);
      let _0xfe0f4a = await this.wxApi("wxgame/myInfo", {
        "activityId": this.activityId,
        "pin": this.secretPin
      });
      if (_0xfe0f4a && _0xfe0f4a.result) {
        let _0x17d9fe = _0xfe0f4a.data?.["taskList"] ?? [];
        _0x17d9fe = _0x17d9fe.filter(_0x166acf => _0x166acf.taskId !== "share2help" && _0x166acf.curNum < _0x166acf.maxNeed);
        for (let _0x5cdc86 of _0x17d9fe) {
          let _0x44f128 = _0x5cdc86.taskId === "followsku" ? "3" : _0x5cdc86.taskId === "add2cart" ? "1" : "";
          if (_0x44f128 === "") continue;
          let _0x5602a7 = await this.wxApi("wxgame/getProduct", {
            "activityId": this.activityId,
            "pin": this.secretPin,
            "type": _0x44f128
          });
          if (_0x5602a7 && _0x5602a7.result) for (let _0x422e36 = 0; _0x422e36 < _0x5602a7.data.length && _0x422e36 < _0x5cdc86.maxNeed; _0x422e36++) {
            let _0x5b29c1 = await this.wxApi("wxgame/doTask", {
              "activityId": this.activityId,
              "pin": this.secretPin,
              "taskId": _0x5cdc86.taskId,
              "param": _0x5602a7.data[_0x422e36].skuId
            });
            this.debug(_0x5b29c1);
          }
        }
      }
      _0xfe0f4a = await this.wxApi("wxgame/myInfo", {
        "activityId": this.activityId,
        "pin": this.secretPin
      });
      if (_0xfe0f4a && _0xfe0f4a.result) {
        let _0x1f3998 = Math.min(_0xfe0f4a.data?.["chance"] ?? 0, 7);
        if (_0x1f3998 === 0) {
          this.putMsg("无次数");
          return;
        }
        while (_0x1f3998-- > 0) {
          let _0x5dad61 = await this.wxApi("wxgame/game/start", {
            "activityId": this.activityId,
            "pin": this.secretPin
          });
          this.debug(_0x5dad61);
          if (_0x5dad61 && _0x5dad61.result) {
            let _0x492de3 = _0x5dad61.data;
            this.debug("gameId:", _0x492de3);
            let _0x4126ee = _0x32418f + this.random(100, 200);
            await this.sleep(1000);
            let _0x367930 = this.timestamp(),
              _0x3a9bec = this.md5(_0x492de3 + "," + _0x367930 + "," + _0x4126ee + ",0eed6538f6e84b754ad2ab95b45c54f8"),
              _0x589956 = await this.wxApi("wxgame/game/end", {
                "activityId": this.activityId,
                "pin": this.secretPin,
                "gameId": _0x492de3,
                "score": _0x4126ee,
                "sign": _0x3a9bec,
                "reqtime": _0x367930,
                "getRank": true,
                "getScoreRank": true,
                "getPlayerNum": true
              });
            this.debug(_0x589956);
            if (_0x589956 && _0x589956.result) {
              _0x367930 = this.timestamp() + "";
              let _0x420872 = await this.wxApi("wxgame/game/luckyDraw", {
                "activityId": this.activityId,
                "pin": this.secretPin,
                "gameId": _0x492de3,
                "score": _0x4126ee,
                "reqtime": _0x367930,
                "sign": this.md5(_0x492de3 + "," + _0x367930 + ",0eed6538f6e84b754ad2ab95b45c54f8")
              });
              this.debug(_0x420872);
              if (_0x420872 && _0x420872.result) this.putMsg(_0x420872.data.name || "空气"), _0x420872.data.needWriteAddress === "y" && (this.addressId = _0x420872.data.addressId, this.prizeName = _0x420872.data.name, await this.saveAddress());else {
                let _0x3639e4 = _0x420872?.["errorMessage"] || "抽奖失败";
                this.putMsg(_0x3639e4);
                await this.wxStopSync(_0x3639e4);
              }
            } else {
              let _0x5d28c7 = _0x589956?.["errorMessage"] || "游戏失败";
              this.putMsg(_0x5d28c7);
              await this.wxStopSync(_0x5d28c7);
            }
          }
        }
      } else {
        let _0x1fd8bf = _0xfe0f4a?.["errorMessage"] || "获取用户信息失败";
        this.putMsg(_0x1fd8bf);
        await this.wxStopSync(_0x1fd8bf);
      }
    }
  }
}
_0xfcbdcc.activity = {
  "activityUrl": activityUrl
};
_0xfcbdcc.TaskClass = _0xbfd39f;
_0xfcbdcc.run({
  "whitelist": ["1-20"],
  "main_thread": 3
});