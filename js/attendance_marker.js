const mark_attendace_url="https://openinet.indiabulls.com/NewPunch_Request/NPR_init.aspx";
const login_url="https://openinet.indiabulls.com/Login.aspx";
const home_page_url="https://openinet.indiabulls.com/Default.aspx";

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
 }

var elts = document.getElementsByClassName("panel panel-body nopadd-mobile");
for (var i = 0; i < elts.length; i++) {
  elts[i].style['background-color'] = '#BDBDBD';
}

function checkIfAttendanceShouldBeMarked(markAttendancefunc) {

    chrome.storage.local.get(['isAttendanceMarked', 'lastMarkedTime', 'autoMarkAttendance'], function (result) {
        
        if(result.autoMarkAttendance != true){
            return;
        }
        var isAttendanceMarked = result.isAttendanceMarked;
        var lastMarkedTimeInMilliSeconds = result.lastMarkedTime;
        if(isAttendanceMarked == null || lastMarkedTimeInMilliSeconds == null){
            // console.log(isAttendanceMarked);
            // console.log(lastMarkedTimeInMilliSeconds);
            markAttendancefunc();
        }
        else{
            var lastMarkedTime = new Date(lastMarkedTimeInMilliSeconds);
            var currTime = new Date();

            // console.log(currTime);
            // console.log(lastMarkedTime);
            // console.log(currTime.getDate() == lastMarkedTime.getDate());

            var isAttendanceMarkedToday = isAttendanceMarked && (currTime.getDate() == lastMarkedTime.getDate());
            if(isAttendanceMarkedToday == false){
                markAttendancefunc();
            }else{
                console.log('Already marked attendance today');
            }
        }
    });
}

function inetLogin() {
    chrome.storage.local.get(['inetUsername', 'inetPassword'], function (result) {
        var username = result.inetUsername;
        var password = result.inetPassword;

        // alert(username);
        // alert(password);
        if(username == null || password == null) {
            alert("Please add your credentials");
            return;
        }
        console.log("Logging in...");
        document.getElementById('txtUserName').value = username;
        document.getElementById('txtPass').value = password;
        document.getElementById('btnLogin').click();
        
    });
}

function openMarkYourAttendancePage() {
    window.location.href = "https://openinet.indiabulls.com/NewPunch_Request/NPR_init.aspx";
}

async function submitAttendance() {
    console.log('Submitting attendance...');
    if(document.getElementById('chkAttendance').checked == false) {
        document.getElementById('chkAttendance').click();
    } else{
        document.getElementById('btnSubmit').click();
        var lastMarkedTime = new Date(); 
        chrome.storage.local.set({ lastMarkedTime: lastMarkedTime.getTime()});
        chrome.storage.local.set({ isAttendanceMarked: true});
        console.log(lastMarkedTime.getTime());
    }
}


function entryPoint() {
    var currTime = new Date();
    var isNight = currTime.getHours() < 8 || currTime.getHours() > 20;
    var isWeekend = currTime.getDay() == 0 || currTime.getDay() == 6;
    if(isNight || isWeekend){
        console.log("It's probably night time or weekend");
        return;
    }
    var markAttendancefunc = function(){
        if(document.URL.toLowerCase().startsWith('https://openinet.indiabulls.com/login.aspx')){
            inetLogin();
        }
        else if(document.URL.toLowerCase() == "https://openinet.indiabulls.com/NewPunch_Request/NPR_init.aspx".toLocaleLowerCase()){
            submitAttendance(); 
        }
        else if(document.URL.toLowerCase().startsWith("https://openinet.indiabulls.com/")){
            openMarkYourAttendancePage();
        }
    }
    checkIfAttendanceShouldBeMarked(markAttendancefunc);
}

entryPoint();
