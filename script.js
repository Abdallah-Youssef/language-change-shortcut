
chrome.runtime.onMessage.addListener(
    function ({newText}, sender, sendResponse) {
        console.log(sender.tab ?
            "from a content script:" + sender.tab.url :
            "from the extension");


        document.activeElement.value = newText
    }
);
