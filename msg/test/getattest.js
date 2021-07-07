const getAT = require('../../utils/wx_accesstoken')

async function main(){
    var num = 1
    var access_token = await getAT.getAccessToken(num)
    console.log(access_token)
}

main();