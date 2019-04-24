const request = require('request')
const templates = require('../model/msgtemplates')
const msg = require('../model/sendrequest')
const formId = require('../formid/redis')
const utils = require('../../utils/wx_accesstoken')
const rds = require('../../utils/redis_accesstoken')


/*
1.调用sendTemplateMsgToPt()应传入msg.PtMsgData结构类型数据作为参数
2.此处为测试和后续开发，直接引用../model/sendrequest文件中的数据作为传参
*/
async function sendTemplateMsgToPt() {

    //获取access_token 拼接url
    var access_token = await rds.GetAccessToken(3)          //err未处理
    console.log('1.获取小程序access_token:' + access_token)
    const url = `https://api.weixin.qq.com/cgi-bin/message/wxopen/template/send?access_token=${access_token}`

    //获取field和formId
    var key = msg.PtMsgData.userId + msg.PtMsgData.orderId
    var getRes = await formId.GetFromId(key);                 //err未处理
    console.log('2.获取用户fied+formId:'+getRes.formId)

    //获取消息模版,拼接消息内容
    var templateId = ''
    var data = {}
    switch (msg.PtMsgData.num) {
        case 1:
            templateId = templates.PtTIs.msgOne
            data = {
                "keyword1": {
                    "value": msg.PtMsgData.content.keyword1
                },
                "keyword2": {
                    "value": msg.PtMsgData.content.keyword2
                },
            }
            break;
        case 2:
            templateId = templates.PtTIs.msgTwo
            data = {
                "keyword1": {
                    "value": msg.PtMsgData.content.keyword1
                },
                "keyword2": {
                    "value": msg.PtMsgData.content.keyword2
                },
                "keyword3": {
                    "value": msg.PtMsgData.content.keyword3
                },
            }
            break;
        default:
            templateId = templates.PtTIs.msgThree
            data = {
                "keyword1": {
                    "value": msg.PtMsgData.content.keyword1
                },
                "keyword2": {
                    "value": msg.PtMsgData.content.keyword2
                },
            }
            break;
    }

    // 拼接模版消息发送的requestData数据
    const requestData = {
        "touser": msg.PtMsgData.openId,
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
    var delres = await formId.DelFormId(key, getRes.field)
    console.log('删除结果:' + delres)
};


module.exports = {
    sendTemplateMsgToPt
};