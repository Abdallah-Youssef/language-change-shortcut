chrome.contextMenus.create({
    id: "change-text",
    title: "Change",
    contexts: ['editable'] // show only when selection over editable field e.g. <input>
});


const translate = (text) => "عادل شكل"


chrome.contextMenus.onClicked.addListener(function (info, tab) {
    if (info.menuItemId === "change-text") {
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            chrome.tabs.sendMessage(tabs[0].id, { newText: translate(info.selectionText) });
        });
    }
});


