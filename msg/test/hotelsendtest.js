const send = require('../sendmsg/hotelmsg')

async function main(){
    await send.sendTemplateMsgToHotel();
}

main()