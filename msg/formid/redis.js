var redis = require('redis');
var config = require('../../conf/config')

var client = redis.createClient(config.RDS.port, config.RDS.host, config.RDS.opts)

// 连接redis
function ClientOn() {
    return new Promise((resolve, reject) => {
        client.on('connect', function () { })
        resolve()
    })
}

function ClientSet(key, field, value) {
    return new Promise((resolve, reject) => {
        client.hset(key, field, value, function (err, res) {
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
        client.hgetall(key, function (err, res) {
            if (err) {
                reject(err)
            }
            resolve(res)
        })
    })
}

function ClientDel(key, field) {
    return new Promise((resolve, reject) => {
        client.hdel(key, field, function (err, res) {
            if (err) {
                reject(err)
            }
            resolve(res)
        })
    })
}

// 存储formId 
var SetFormId = async function (userId, orderId, formId) {
    var key = userId + orderId
    var field = Date.now()
    await ClientOn()
    var res = await ClientSet(key, field, formId)       //存在错误返回,err需要处理
    return res
}

// 获取formId 
var GetFromId = async function (key) {
    await ClientOn
    var res = await ClientGet(key)              //存在错误返回,err需要处理
    var fields = []
    var values = []
    var res_field = ''
    var res_value = ''
    for (var field in res) {
        fields.push(field)
        if (res.hasOwnProperty(field)) {
            var element = res[field];
            values.push(element)
        }
    }
    for (var i = 0; i < values.length; i++) {
        var passTime = Date.now() - fields[i]
        var weekTime = 7 * 24 * 3600 * 1000
        if (passTime < weekTime) {
            res_field = fields[i]
            res_value = values[i]                          
            break
        } else {
            await DelFormId(key,fields[i])
        }
    }
    return {
        field:res_field,
        formId:res_value,
    }
}

// 删除formId 
var DelFormId = async function (key, field) {
    await ClientOn
    var res = await ClientDel(key, field)       //存在错误返回,err需要处理
    return res
}



module.exports = {
    SetFormId,
    GetFromId,
    DelFormId,
};