let booster_domains = [
    "https://github.com.cnpmjs.org",
    "https://hub.fastgit.org",
    "https://github.wuyanzheshui.workers.dev",
    "https://github.bajins.com",
    "https://github.rc1844.workers.dev",
    "https://gitclone.com/github.com",
    "https://github-speedup.laiczhang.com",
];
let github_domain = "https://github.com";

function getUrlPatterns(booster_domains) {
    document_url_patterns = ["https://*.github.com/*"]
    for (let i = 0; i < booster_domains.length; i++) {
        url_pattern = booster_domains[i] + "/*"
        document_url_patterns.push(url_pattern)
        // console.log("匹配路由：", url_pattern)
    }
    return document_url_patterns
}

function getCurrentTabId(callback) {
    chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
        if (callback) callback(tabs.length ? tabs[0].id : null);
    });
}

function booster(info, tab) {
    let uri = info.pageUrl;
    let to_be_changed_booster_domain = booster_domains[info.menuItemId - 2];
    for (var i = 0; i < booster_domains.length; i++) {
        let current_booster_domain = booster_domains[i];
        if (uri.indexOf(current_booster_domain) == 0) {
            if (current_booster_domain == to_be_changed_booster_domain) {
                // console.log("已经使用当前通道加速了");
                return;
            } else {
                let booster_url = uri.replace(current_booster_domain, to_be_changed_booster_domain);
                getCurrentTabId((tabId) => {
                    chrome.tabs.update(tabId, {
                        'url': booster_url,
                        'selected': true
                    });
                });
                return;
            }
        }
    }
    if (uri.indexOf(github_domain) == 0) {
        let booster_url = uri.replace(github_domain, to_be_changed_booster_domain);
        getCurrentTabId((tabId) => {
            chrome.tabs.update(tabId, {
                'url': booster_url,
                'selected': true
            });
        });
    }
}

let menusId = chrome.contextMenus.create({
    "title": "Github 加速访问",
    "contexts": ["page"],
    "documentUrlPatterns": getUrlPatterns(booster_domains)
});

for (var i = 0; i <= booster_domains.length - 1; i++) {
    chrome.contextMenus.create({
        "title": "加速通道" + (i + 1),
        "contexts": ["page"],
        "parentId": menusId,
        "onclick": booster,
    });
}