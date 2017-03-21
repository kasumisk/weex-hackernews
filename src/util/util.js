let CryptoJS = require('./sha1.js')
const storage = weex.requireModule('storage')
let config = {
    // api : 'https://bank.mindai.com/api',
    // api: "http://127.0.0.1:8000/api/",
    resouce:'http://192.168.2.113:1337/dist/',
    // api : 'https://121.196.208.139/api',
    // api : 'http://121.196.208.139/api',
    api : 'http://121.196.215.15:8087/api',
    // api : 'http://192.168.2.32:8087/api',
    appKey: '00000004',
    appKeySecret: 'O2F2L0I84LC9U1KP',
    format: 'json',
    locale: 'cn',
    timestamp: getBJTime(),
    method: 'POST',
    data: {
        method: '',
        v: '1.0',
        sessionId: "",
        bizContent: {}
    }
}

function setLocationStorage(key,value) {
    return new Promise((resolve, reject) => {
        storage.setItem(key,value,(e) =>{
            if(e.result === 'success'){
                resolve(e.data)
            }else {
                reject(e.data)
            }

        })
    })
}



function getLocationStorage(key) {
    return new Promise((resolve, reject) => {
        storage.getItem(key,(e) =>{
            if(e.result === 'success'){
                resolve(e.data)
            }else {
                resolve('')
            }

        })
    })

}
function getBJTime() {
    let localDate = new Date(),
        utc = localDate.getTime() + (localDate.getTimezoneOffset() * 60000),
        BJDate = new Date(utc + (3600000 * 8)),
        format = "yyyy-MM-dd hh:mm:ss",
        o = {
            'M+': BJDate.getMonth() + 1,
            'd+': BJDate.getDate(),
            'h+': BJDate.getHours(),
            'm+': BJDate.getMinutes(),
            's+': BJDate.getSeconds(),
            'q+': Math.floor((BJDate.getMonth() + 3) / 3),
            'S': BJDate.getMilliseconds()
        };
    if (/(y+)/.test(format)) {
        format = format.replace(RegExp.$1, (BJDate.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    for (let k in o) {
        if (new RegExp('(' + k + ')').test(format)) {
            format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length));
        }
    }
    return format;
}

function aesEncrypt(data, keyStr, ivStr) {
    let sendData = CryptoJS.enc.Utf8.parse(data);
    let key = CryptoJS.enc.Utf8.parse(keyStr);
    let iv = CryptoJS.enc.Utf8.parse(ivStr);
    let encrypted = CryptoJS.AES.encrypt(sendData, key, { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });
    return CryptoJS.enc.Base64.stringify(encrypted.ciphertext);
}


function Encrypt(options,callback) {
    options.bizContent.deviceType = 'ios';

    let config1 = Object.assign({}, config.data, options);
    config.data = config1;
    // console.log('配置:',options);
    // console.log('内容:',config);
    getLocationStorage("sessionId").then((sessionId)=>{
        let bizContent = aesEncrypt(JSON.stringify(config.data.bizContent), config.appKeySecret, config.appKeySecret),
            signStr = config.appKeySecret + 'appKey' + config.appKey + 'bizContent' + bizContent + 'formatjsonlocalecnmethod' + config.data.method + 'sessionId' + sessionId + 'timestamp' + config.timestamp + 'v' + config.data.v + config.appKeySecret,
            sign = CryptoJS.SHA1(signStr).toString().toUpperCase()

        let body = {
            method: config.data.method,
            v: config.data.v,
            sessionId: sessionId,
            bizContent: bizContent,
            appKey: config.appKey,
            format: config.format,
            locale: config.locale,
            timestamp: config.timestamp,
            sign: sign
        }
        callback && callback(body)
    })


}

/**
 * 处理金额格式，示例123456789==>123,456,789
 * @param  {[type]} money [description]
 * @return {[type]}       [description]
 */
function moneyFormat(money) {
    var money = money
    if (typeof(money) == 'number' || typeof(money) == 'string') {
        money = money.toString()
    } else {
        console.error("金额格式不正确")
        return
    }
    money = money.split("").reverse().join("");
    money = money.replace(/(\d{3})/g, "$1,");
    money = money.split("").reverse().join("");
    if (money.indexOf(',') == 0) {
        money = money.replace(/,/, '')
    }
    return money;
}

/**
 *@residentId {string} 身份证号码
 */
function residentId(residentId) {
    //var idcard = $('#' + card_id);
    var idcard_val = residentId
        // 构造函数，变量为15位或者18位的身份证号码
    function clsIDCard(CardNo) {
        this.Valid = false;
        this.ID15 = '';
        this.ID18 = '';
        this.Local = '';
        if (CardNo != null)
            this.SetCardNo(CardNo);
    }
    // 设置身份证号码，15位或者18位
    clsIDCard.prototype.SetCardNo = function(CardNo) {
            this.ID15 = '';
            this.ID18 = '';
            this.Local = '';
            CardNo = CardNo.replace(" ", "");
            var strCardNo;
            if (CardNo.length == 18) {
                //pattern = /^\d{17}(\d|x|X)$/;
                pattern = /^\d{17}(\d|X)$/;
                if (pattern.exec(CardNo) == null)
                    return;
                strCardNo = CardNo.toUpperCase();
            } else {
                pattern = /^\d{15}$/;
                if (pattern.exec(CardNo) == null)
                    return;
                strCardNo = CardNo.substr(0, 6) + '19' + CardNo.substr(6, 9)
                strCardNo += this.GetVCode(strCardNo);
            }

            this.Valid = this.CheckValid(strCardNo);
        }
        // 校验身份证有效性
    clsIDCard.prototype.IsValid = function() {
            return this.Valid;
        }
        // 返回生日字符串，格式如下，1981-10-10
    clsIDCard.prototype.GetBirthDate = function() {
            var BirthDate = '';
            if (this.Valid)
                BirthDate = this.GetBirthYear() + '-' + this.GetBirthMonth() + '-' + this.GetBirthDay();
            return BirthDate;
        }
        // 返回生日中的年，格式如下，1981
    clsIDCard.prototype.GetBirthYear = function() {
            var BirthYear = '';
            if (this.Valid)
                BirthYear = this.ID18.substr(6, 4);
            return BirthYear;
        }
        // 返回生日中的月，格式如下，10
    clsIDCard.prototype.GetBirthMonth = function() {
            var BirthMonth = '';
            if (this.Valid)
                BirthMonth = this.ID18.substr(10, 2);
            if (BirthMonth.charAt(0) == '0')
                BirthMonth = BirthMonth.charAt(1);
            return BirthMonth;
        }
        // 返回生日中的日，格式如下，10
    clsIDCard.prototype.GetBirthDay = function() {
            var BirthDay = '';
            if (this.Valid)
                BirthDay = this.ID18.substr(12, 2);
            return BirthDay;
        }
        // 返回性别，1：男，0：女
    clsIDCard.prototype.GetSex = function() {
            var Sex = '';
            if (this.Valid)
                Sex = this.ID18.charAt(16) % 2;
            return Sex;
        }
        // 返回15位身份证号码
    clsIDCard.prototype.Get15 = function() {
            var ID15 = '';
            if (this.Valid)
                ID15 = this.ID15;
            return ID15;
        }
        // 返回18位身份证号码
    clsIDCard.prototype.Get18 = function() {
            var ID18 = '';
            if (this.Valid)
                ID18 = this.ID18;
            return ID18;
        }
        // 返回所在省，例如：上海市、浙江省
    clsIDCard.prototype.GetLocal = function() {
        var Local = '';
        if (this.Valid)
            Local = this.Local;
        return Local;
    }
    clsIDCard.prototype.GetVCode = function(CardNo17) {
        var Wi = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8,
            4, 2, 1);
        var Ai = new Array('1', '0', 'X', '9', '8', '7', '6', '5', '4',
            '3', '2');
        var cardNoSum = 0;
        for (var i = 0; i < CardNo17.length; i++)
            cardNoSum += CardNo17.charAt(i) * Wi[i];
        var seq = cardNoSum % 11;
        return Ai[seq];
    }
    clsIDCard.prototype.CheckValid = function(CardNo18) {
        if (this.GetVCode(CardNo18.substr(0, 17)) != CardNo18.charAt(17))
            return false;
        if (!this.IsDate(CardNo18.substr(6, 8)))
            return false;
        var aCity = {
            11: "北京",
            12: "天津",
            13: "河北",
            14: "山西",
            15: "内蒙古",
            21: "辽宁",
            22: "吉林",
            23: "黑龙江 ",
            31: "上海",
            32: "江苏",
            33: "浙江",
            34: "安徽",
            35: "福建",
            36: "江西",
            37: "山东",
            41: "河南",
            42: "湖北 ",
            43: "湖南",
            44: "广东",
            45: "广西",
            46: "海南",
            50: "重庆",
            51: "四川",
            52: "贵州",
            53: "云南",
            54: "西藏 ",
            61: "陕西",
            62: "甘肃",
            63: "青海",
            64: "宁夏",
            65: "新疆",
            71: "台湾",
            81: "香港",
            82: "澳门",
            91: "国外"
        };
        if (aCity[parseInt(CardNo18.substr(0, 2))] == null)
            return false;
        this.ID18 = CardNo18;
        this.ID15 = CardNo18.substr(0, 6) + CardNo18.substr(8, 9);
        this.Local = aCity[parseInt(CardNo18.substr(0, 2))];
        return true;
    }
    clsIDCard.prototype.IsDate = function(strDate) {
        var r = strDate.match(/^(\d{1,4})(\d{1,2})(\d{1,2})$/);
        if (r == null)
            return false;
        var d = new Date(r[1], r[2] - 1, r[3]);
        return (d.getFullYear() == r[1] && (d.getMonth() + 1) == r[2] && d
            .getDate() == r[3]);
    }
    var checkFlag = new clsIDCard(idcard_val);
    if (!checkFlag.IsValid()) {
        return false;
    } else {
        return true
    }
}



function formatName(str){
    switch (str.length){
        case 0:
            str = "";
            break;
        case 2:
            str = str.substring(0, 1) + "*";
            break;
        case 3:
            str = str.substring(0, 1) + "**";
            break;
        default:
            str = str.substring(0, 1) + "**"
    }

    return str;
}

function formatPhone(str) {
    return str.substring(0,3)+"*****"+str.substring(str.length-3);
}

module.exports = {
    moneyFormat : moneyFormat,
    residentId : residentId,
    formatName: formatName,
    formatPhone:formatPhone,
    Encrypt,
    getBJTime,
    config,
    setLocationStorage,
    getLocationStorage
};
