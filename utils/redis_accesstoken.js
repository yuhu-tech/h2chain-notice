var redis = require('redis');
var config = require('../conf/config')

var client = redis.createClient(config.RDS.port, config.RDS.host, config.RDS.opts)

// 连接redis
function ClientOn() {
    return new Promise((resolve, reject) => {
        client.on('connect', function () { })
        resolve()
    })
}

function ClientSet(key, value) {
    return new Promise((resolve, reject) => {
        client.set(key, value, function (err, res) {
            if (err) {
                reject(err)
            } else {
                resolve(res)
            }
        })
    })
}

function ClientGet(key) {
    return new Promise((resolve, reject) => {
        client.get(key, function (err, res) {
            if (err) {
                reject(err)
            } else {
                resolve(res)
            }
        })
    })
}


// 存储access_token
var SetAccessToken = async function (key, value) {
    await ClientOn()
    var res = await ClientSet(key, value)       //存在错误返回,err需要处理
    return res
}

// 获取access_token
var GetAccessToken = async function (num) {
    var key = ''
    if (num === 1) {
        key = 'hotel'
    } else if (num === 2) {
        key = 'adviser'
    } else if (num === 3) {
        key = 'pt'
    } else {

    }
    await ClientOn
    var res = await ClientGet(key)              //存在错误返回,err需要处理
    return res
}




module.exports = {
    SetAccessToken,
    GetAccessToken,
};