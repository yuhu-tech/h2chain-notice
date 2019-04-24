var operation = require('../formid/redis')

async function Set() {
    //var userId = 'tdergouziadviser'
    var userId = 'tdergouzihotel'
    var orderId = 'orderid'
    var formId = '8c241b8bc9b6471395356d9563ea5ff0'

    var Res = await operation.SetFormId(userId, orderId, formId);
    console.log("res")
    console.log(Res)
}

async function Get(){
    //var key = 'tdergouziadviserorderid'
    var key = 'tdergouzihotelorderid'
    var res = await operation.GetFromId(key)
    console.log(res)
    console.log(res.field)
    console.log(res.formId)
}

//Set();
Get()