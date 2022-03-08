function addZero(num){
    return num < 10 ? `0${num}`:num;
}

function getTime(){
    var currentTime = new Date();
    var currentOffset = currentTime.getTimezoneOffset();
    var ISTOffset = 330;   // IST offset UTC +5:30 
    var ISTTime = new Date(currentTime.getTime() + (ISTOffset + currentOffset)*60000);
    // ISTTime now represents the time in IST coordinates
    var hours = ISTTime.getHours();
    var AmOrPm = hours >= 12 ? 'pm' : 'am';
    hours = (hours % 12) || 12;
    var hoursFormated = hours;
    var minutes = addZero(ISTTime.getMinutes());

    const time = `${hoursFormated}:${minutes}${" "}${AmOrPm}`;
    return time;
}

export default getTime