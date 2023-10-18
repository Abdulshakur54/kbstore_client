function capitalizeWord(str){
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function capitalizeEachWord (sen){
    const words = sen.split(" ");
    const results = []
    for(let word of words){
        results.push(capitalizeWord(word))
    }
    return results.join(" ")
}


function formatDate(dateString){
    const date = new Date(dateString)
    const day = date.getDate()
    const month = date.getMonth()
    const year = date.getFullYear()
    const hour = date.getHours()
    const minute = date.getMinutes()
    return `${addSuffix(day)} ${getMonth(month)}, ${year}  ${addTimeSuffix(hour +':'+minute)}`;
}
//2023-09-26T23:59:38.886Z
function addSuffix(number){
    if(number > 10 && number < 20){
        return number+'th';
    }
    const numberString = '' + number;
    const lastDigitString = numberString.substring(numberString.length - 1)
    const lastDigit = parseInt(lastDigitString)
    switch(lastDigit){
        case 1:
            return number+'st'
        case 2:
            return number+ 'nd'
        case 3:
            return number + 'rd'
        default:
            return number + 'th'
    }
}

//timeString in the format 12:20
function addTimeSuffix(timeString){
    const hour = parseInt(timeString.split(":")[0])
    const pos = timeString.indexOf(':');
    const remainingTimeString = timeString.substring(pos)
    if(hour >12){
        return (hour - 12 )+ remainingTimeString +' PM'
    }
    return hour+remainingTimeString+' AM'
}

function getMonth(pos){
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    return months[pos]
}

export {capitalizeEachWord, capitalizeWord, formatDate}