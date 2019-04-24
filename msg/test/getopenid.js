const Get = require('../utils/getopenid')

async function main() {
    var js_code = '023xuMpy13hgs90h5Rpy1PUZpy1xuMpO'
    var num = 1
    var openid = await Get.getOpenId(js_code, num)
    console.log('my openid in hotel :', openid)
}

main();