// Constants
const loginWebsite = "https://openinet.indiabulls.com/login.aspx";

var alarmClock = {

    onHandler : function(force_update) {
        if(force_update ==  true){
            chrome.alarms.create("attendanceAlarm", {periodInMinutes: 30, delayInMinutes: 1} );
            window.close();
        }
        else {
            chrome.alarms.get("attendanceAlarm", function(alarm) {
                if(alarm == null){
                    chrome.alarms.create("attendanceAlarm", {periodInMinutes: 30, delayInMinutes: 1} );
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
    chrome.storage.local.get(['isAttendanceMarked', 'lastMarkedTime', 'autoMarkAttendance'], function (result) {
        if(result.autoMarkAttendance == false){
            return;
        }

        var currTime = new Date();
        var isNight = currTime.getHours() < 8 || currTime.getHours() > 20;
        var isWeekend = currTime.getDay() == 0 || currTime.getDay() == 6;
        if(isNight || isWeekend){
            console.log("It's probably night time or weekend day");
            return;
        }

        var isAttendanceMarked = result.isAttendanceMarked;
        var lastMarkedTimeInMilliSeconds = result.lastMarkedTime;
        if(isAttendanceMarked == null || lastMarkedTimeInMilliSeconds == null){
            chrome.tabs.create({'url':loginWebsite});
        }
        else{
            var lastMarkedTime = new Date(lastMarkedTimeInMilliSeconds);
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