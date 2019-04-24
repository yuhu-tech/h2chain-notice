const GET = require('../../utils/wx_accesstoken')
const RDS = require('../../utils/redis_accesstoken')

async function ReflashHotelAT (){
    var num = 1
    var key = 'hotel'
    var value = await GET.getAccessToken(num)
    var res = await RDS.SetAccessToken(key,value)
    return res
}

async function ReflashAdviserAT (){
    var num = 2
    var key = 'adviser'
    var value = await GET.getAccessToken(num) 
    var res = await RDS.SetAccessToken(key,value)
    return res
}

async function ReflashPtAT (){
    var num = 3
    var key = 'pt'
    var value = await GET.getAccessToken(num) 
    var res = await RDS.SetAccessToken(key,value)
    return res
}

module.exports = {
    ReflashHotelAT,
    ReflashAdviserAT,
    ReflashPtAT
}
