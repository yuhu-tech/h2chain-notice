const request = require('request')
const templates = require('../model/msgtemplates')
const msg = require('../model/sendrequest')
const formId = require('../formid/redis')
const rds = require('../../utils/redis_accesstoken')


/*
1.调用sendTemplateMsgToHotel()应传入msg.HotelMsgData结构类型数据作为参数
2.此处为测试和后续开发，直接引用../model/sendrequest文件中的数据作为传参
*/
async function sendTemplateMsgToHotel() {

    //获取access_token 拼接url
    var access_token = await rds.getAccessToken(1)          //err未处理
    console.log('1.获取小程序access_token:' + access_token)
    const url = `https://api.weixin.qq.com/cgi-bin/message/wxopen/template/send?access_token=${access_token}`

    //获取field和formId
    var key = msg.HotelMsgData.userId + msg.HotelMsgData.orderId
    var getRes = await formId.getFormId(key);                 //err未处理
    console.log('2.获取用户fied+formId:'+getRes.formId)

    //获取消息模版,拼接消息内容
    var templateId = ''
    var data = {}
    switch (msg.HotelMsgData.num) {
        case 1:
            templateId = templates.HotelTIs.msgOne
            data = {
                "keyword1": {
                    "value": msg.HotelMsgData.content.keyword1
                },
                "keyword2": {
                    "value": msg.HotelMsgData.content.keyword2
                },
                "keyword3": {
                    "value": msg.HotelMsgData.content.keyword3
                },
            }
            break;
        case 2:
            templateId = templates.HotelTIs.msgTwo
            data = {
                "keyword1": {
                    "value": msg.HotelMsgData.content.keyword1
                },
                "keyword2": {
                    "value": msg.HotelMsgData.content.keyword2
                },
            }
            break;
        default:
            break;
    }

    // 拼接模版消息发送的requestData数据
    const requestData = {
        "touser": msg.HotelMsgData.openId,
        "template_id": templateId,
        "page": "index",
        "form_id": getRes.formId,
        "data": data,
    };
    console.log('3.最终拼接数据为:'+requestData)

    // 发送模版消息
    await request({
        url: url,
        method: 'post',
        body: JSON.stringify(requestData),
    }, function (error, response, body) {                   //err未处理 
        if (!error && response.statusCode === 200) {
            console.log('服务消息推送成功');
        }
    });

    //发送完成后删除已使用的formid
    var delres = await formId.delFormId(key, getRes.field)
    console.log('删除结果:' + delres)
};


module.exports = {
    sendTemplateMsgToHotel
};