const Reflash = require('../reflasher/reflash')

async function Timer(){
    await Reflash.ReflashHotelAT();
    await Reflash.ReflashAdviserAT();
    await Reflash.ReflashPtAT();
}

setInterval(Timer,180*1000)