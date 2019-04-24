var operation = require('../formid/redis')

async function Set() {
    //var userId = 'tdergouziadviser'
    var userId = 'tdergouzihotel'
    var orderId = 'orderid'
    var formId = '7577a787236d46509057afaa75fc921a'

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

//Set();
Get()