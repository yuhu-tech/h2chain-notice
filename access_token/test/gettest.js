const RDS = require('../../utils/redis_accesstoken')


async function getAccessToken (){
    var num = 1
    var access_token = await RDS.getAccessToken(num)
    console.log(access_token)
}

getAccessToken();