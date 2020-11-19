'use strict';

// Constants

const loginWebsite = "https://openinet.indiabulls.com/login.aspx";


//////////////////////////////////////////////////////////////////////////
// Attendance Marker                                                    //
//////////////////////////////////////////////////////////////////////////


document.getElementById("mark-attendance").addEventListener("click", markAttendance);

document.getElementById("inet-credentials").addEventListener("click", redirectToAddCredentials);

chrome.storage.local.get('autoMarkAttendance', function (result) {

    var autoMarkAttendance = result.autoMarkAttendance;
    if(autoMarkAttendance != null) {
        var autoMarkAttendanceCheckbox = document.getElementById('auto_chkbox');
        autoMarkAttendanceCheckbox.checked = autoMarkAttendance;
    }
    
});


// Change auto attendance according to checkbox user input
document.getElementById('auto_chkbox').addEventListener('click', function () {
    var autoMarkAttendanceCheckbox = document.getElementById('auto_chkbox');
    chrome.storage.local.set({'autoMarkAttendance': autoMarkAttendanceCheckbox.checked});
    console.log('Set Auto mark attendance to %s', autoMarkAttendanceCheckbox.checked);
    chrome.storage.local.set({ isAttendanceMarked: false});
});


function redirectToAddCredentials() {
    window.location.href = "add_credentials.html";
    console.log("Please add or change your inet credentials");
}

function markAttendance() {
    var autoMarkAttendanceCheckbox = document.getElementById('auto_chkbox');
    chrome.storage.local.set({ isAttendanceMarked: false});
    autoMarkAttendanceCheckbox.checked = true;
    chrome.storage.local.set({'autoMarkAttendance': autoMarkAttendanceCheckbox.checked});
    console.log(autoMarkAttendanceCheckbox.checked);
    chrome.tabs.create({'url':loginWebsite});
}
