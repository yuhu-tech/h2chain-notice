const RDS = require('../../utils/redis_accesstoken')


async function GetAccessToken (){
    var num = 1
    var access_token = await RDS.GetAccessToken(num)
    console.log(access_token)
}

GetAccessToken();