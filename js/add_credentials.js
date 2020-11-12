document.getElementById("add_cred").addEventListener("click", addCredentials);

function addCredentials(){
    console.log("test");
    var inetUsername = document.getElementById('inet_username').value;
    var inetPassword = document.getElementById('inet_password').value;
    // alert(inetUsername);
    // alert(inetPassword);
    chrome.storage.local.set({'inetUsername': inetUsername});
    chrome.storage.local.set({'inetPassword': inetPassword});

    alert('Inet credentials saved successfully');
}   