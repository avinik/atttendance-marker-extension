// Constants
const loginWebsite = "https://openinet.indiabulls.com/login.aspx";

var alarmClock = {

    onHandler : function(force_update) {
        if(force_update ==  true){
            chrome.alarms.create("attendanceAlarm", {periodInMinutes: 30, delayInMinutes: 0.1} );
            window.close();
        }
        else {
            chrome.alarms.get("attendanceAlarm", function(alarm) {
                if(alarm == null){
                    chrome.alarms.create("attendanceAlarm", {periodInMinutes: 30, delayInMinutes: 0.1} );
                }
                else{
                    chrome.alarms.create("attendanceAlarm", {when: alarm.scheduledTime, periodInMinutes: 30} );
                }
            });
        }
    },

    offHandler : function(e) {
        chrome.alarms.clear("attendanceAlarm");
                window.close();
    }
};

chrome.alarms.onAlarm.addListener(function(alarm) {
    chrome.storage.local.get(['isAttendanceMarked', 'lastMarkedTime'], function (result) {

        var isAttendanceMarked = result.isAttendanceMarked;
        var lastMarkedTimeInMilliSeconds = result.lastMarkedTime;
        if(isAttendanceMarked == null || lastMarkedTimeInMilliSeconds == null){
            chrome.tabs.create({'url':loginWebsite});
        }
        else{
            var lastMarkedTime = new Date(lastMarkedTimeInMilliSeconds);
            var currTime = new Date();
            var isAttendanceMarkedToday = isAttendanceMarked && (currTime.getDate() == lastMarkedTime.getDate());
            if(isAttendanceMarkedToday == false){
                chrome.tabs.create({'url':loginWebsite});
            }else{
                console.log('Already marked attendance today');
            }
        }
    });
 });


 alarmClock.onHandler(false);