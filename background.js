
chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
        id: "change-text",
        title: "Change Language",
        contexts: ['editable'] // show only when selection over editable field 
    });
});


const execute = () => {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {});
    });
}


chrome.contextMenus.onClicked.addListener(function (info, tab) {
    if (info.menuItemId === "change-text") {
        execute()
        return
    }
});

chrome.commands.onCommand.addListener((command) => {
    if (command === 'run')
        execute()
});


