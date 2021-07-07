const refresh = require('../refresher/refresh')

async function timer(){
    await refresh.refreshHotelAT();
    await refresh.refreshAdviserAT();
    await refresh.refreshPtAT();
}

setInterval(timer,180*1000)