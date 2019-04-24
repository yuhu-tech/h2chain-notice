const send = require('../sendmsg/advisermsg')

async function main(){
    await send.sendTemplateMsgToAdviser();
}
main();