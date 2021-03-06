var BGPage = chrome.extension.getBackgroundPage();

function show() {
    var e = BGPage.popupView;
    switch (e.status) {
        case"off":
            document.getElementById("offStatus").style.display = "block", document.getElementById("onStatus").style.display = "none", document.getElementById("tips").innerHTML = e.warming;
            break;
        case"on":
            document.getElementById("onStatus").style.display = "block", document.getElementById("offStatus").style.display = "none";
            break;
        default:
            console.error("这错误不可能")
    }
    document.getElementById("versionNumber").innerText = chrome.runtime.getManifest().version, document.getElementById("openMainWebsite").innerHTML = localStorage["popup-message"], localStorage["stop-proxy"] && "true" == localStorage["stop-proxy"] ? (document.getElementById("startP").style.display = null, document.getElementById("stopP").style.display = "none") : (document.getElementById("startP").style.display = "none", document.getElementById("stopP").style.display = null)
}

show();
var iii = setInterval(show, 1e3);
// document.getElementById("settings").addEventListener("click", function (e) {
//     chrome.tabs.create({url: "/options.html"})
// }),
    document.getElementById("refreshP").addEventListener("click", function (e) {
    chrome.runtime.sendMessage({reqtype: "refresh"}, function (e) {
    })
}), document.getElementById("restartP").addEventListener("click", function (e) {
    localStorage["auto-homepage"] && "true" == localStorage["auto-homepage"] ? chrome.runtime.reload() : (document.getElementById("offStatus").style.display = "block", document.getElementById("tips").innerHTML = "请你打开设置的主页，重启后检测<br>不到主页会激活失败！10秒后重启,请不要关闭页面", window.clearInterval(iii), setTimeout(function () {
        chrome.runtime.reload()
    }, 1e4))
}), document.getElementById("stopP").addEventListener("click", function (e) {
    chrome.runtime.sendMessage({reqtype: "stop"}, function (e) {
    })
}), document.getElementById("startP").addEventListener("click", function (e) {
    chrome.runtime.sendMessage({reqtype: "start"}, function (e) {
    })
});