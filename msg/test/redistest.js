var operation = require('../formid/redis')

async function Set() {
    //var userId = 'tdergouziadviser'
    var userId = 'tdergouzihotel'
    var orderId = 'orderid'
    var formId = 'f0d7ba387de0408e8173348561c4b26a'

    var Res = await operation.setFormId(userId, orderId, formId);
    console.log("res")
    console.log(Res)
}

async function Get(){
    //var key = 'tdergouziadviserorderid'
    var key = 'tdergouzihotelorderid'
    var res = await operation.getFormId(key)
    console.log(res)
    console.log(res.field)
    console.log(res.formId)
}

Set();
//Get()