export const convertMongoToHumanDate = (mongoDate) => {
    var jsDate = new Date(mongoDate);

    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    var year = jsDate.getFullYear();
    var month = months[jsDate.getMonth()];
    var date = jsDate.getDate();
    var hour = jsDate.getHours();
    var minute = jsDate.getMinutes();
    var AMPM = hour >= 12 ? "PM" : "AM";
    hour = hour >= 12 ? hour-12 : hour;
    return '📅 ' + date + ', ' + month + ' ' + year + ' 🕒 ' + hour + ":" + minute + " " + AMPM;    // final date with time, you can use this according your requirement
}