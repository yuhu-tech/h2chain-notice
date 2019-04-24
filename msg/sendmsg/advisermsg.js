const request = require('request')
const templates = require('../model/msgtemplates')
const msg = require('../model/sendrequest')
const formId = require('../formid/redis')
const rds = require('../../utils/redis_accesstoken')


/*
1.调用sendTemplateMsgToHotel()应传入msg.HotelMsgData结构类型数据作为参数
2.此处为测试和后续开发，直接引用../model/sendrequest文件中的数据作为传参
*/
async function sendTemplateMsgToAdviser() {
    try {
        //获取access_token 拼接url
        var num = 2
        var access_token = await rds.getAccessToken(num)
        const url = `https://api.weixin.qq.com/cgi-bin/message/wxopen/template/send?access_token=${access_token}`

        //获取field和formId
        var key = msg.AdviserMsgData.userId + msg.AdviserMsgData.orderId
        var getRes = await formId.getFormId(key);

        //获取消息模版,拼接消息内容
        var templateId = ''
        var data = {}
        switch (msg.AdviserMsgData.num) {
            case 1:
                templateId = templates.AdviserTIs.msgOne
                data = {
                    "keyword1": {
                        "value": msg.AdviserMsgData.content.keyword1    //酒店名称
                    },
                    "keyword2": {
                        "value": msg.AdviserMsgData.content.keyword2    //下单时间
                    },
                }
                break;
            case 2:
                templateId = templates.AdviserTIs.msgTwo
                data = {
                    "keyword1": {
                        "value": msg.AdviserMsgData.content.keyword1    //操作人
                    },
                    "keyword2": {
                        "value": msg.AdviserMsgData.content.keyword2    //操作详情
                    },
                    "keyword3": {
                        "value": msg.AdviserMsgData.content.keyword3    //发布时间
                    },
                }
                break;
            case 3:
                templateId = templates.AdviserTIs.msgThree
                data = {
                    "keyword1": {
                        "value": msg.AdviserMsgData.content.keyword1    //应聘工作
                    },
                    "keyword2": {
                        "value": msg.AdviserMsgData.content.keyword2    //应聘人
                    },
                    "keyword3": {
                        "value": msg.AdviserMsgData.content.keyword3    //创建时间
                    },
                }
                break;
            case 4:
                templateId = templates.AdviserTIs.msgFour
                data = {
                    "keyword1": {
                        "value": msg.AdviserMsgData.content.keyword1    //修改内容
                    },
                    "keyword2": {
                        "value": msg.AdviserMsgData.content.keyword2    //修改时间
                    },
                }
                break;
            case 5:
                templateId = templates.AdviserTIs.msgFive
                data = {
                    "keyword1": {
                        "value": msg.AdviserMsgData.content.keyword1    //订单内容
                    },
                    "keyword2": {
                        "value": msg.AdviserMsgData.content.keyword2    //回复人
                    },
                    "keyword3": {
                        "value": msg.AdviserMsgData.content.keyword3    //回复时间
                    },
                }
                break;
            case 6:
                templateId = templates.AdviserTIs.msgSix
                data = {
                    "keyword1": {
                        "value": msg.AdviserMsgData.content.keyword1    //订单详情
                    },
                    "keyword2": {
                        "value": msg.AdviserMsgData.content.keyword2    //关闭人
                    },
                    "keyword3": {
                        "value": msg.AdviserMsgData.content.keyword3    //关闭时间
                    },
                }
                break;
            default:
                break;
        }

        // 拼接模版消息发送的requestData数据
        const requestData = {
            "touser": msg.AdviserMsgData.openId,
            "template_id": templateId,
            "page": "index",
            "form_id": getRes.formId,
            "data": data,
        };

        // 发送模版消息
        await request({
            url: url,
            method: 'post',
            body: JSON.stringify(requestData),
        }, function (error, response, body) {
            if (!error && response.statusCode === 200) {
                console.log('服务消息推送成功');
            } else {
                throw error
            }
        });

        //发送完成后删除已使用的formid
        var delres = await formId.delFormId(key, getRes.field)
        console.log('删除结果:' + delres)
    } catch (error) {
        console.log('顾问端消息推送失败:', error)
    }
};


module.exports = {
    sendTemplateMsgToAdviser
};