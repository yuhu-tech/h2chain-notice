const send = require('../sendmsg/ptmsg')

async function main() {
    await send.sendTemplateMsgToPt();
};

main();