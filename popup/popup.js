'use strict';

// Constants

const loginWebsite = "https://openinet.indiabulls.com/login.aspx";


//////////////////////////////////////////////////////////////////////////
// Attendance Marker                                                    //
//////////////////////////////////////////////////////////////////////////


document.getElementById("mark-attendance").addEventListener("click", markAttendance);

document.getElementById("inet-credentials").addEventListener("click", redirectToAddCredentials);

function redirectToAddCredentials() {
    window.location.href = "add_credentials.html";
    console.log("Please add or change your inet credentials");
}

function markAttendance() {
    chrome.tabs.create({'url':loginWebsite});
}

function addCredentials() {
    alert('Adding Crendentials');
    console.log('Adding inet credentials'); 
}
