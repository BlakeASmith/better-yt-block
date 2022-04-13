
const sendClickEventToTab = (e) => {
    chrome.tabs.query({active:true, currentWindow:true}, tabs => {
        let active = tabs[0];
        chrome.tabs.sendMessage(active.id, {"message": "clicked_icon"})
    })
}


chrome.action.onClicked.addListener(sendClickEventToTab);

chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
        "id": "betteYoutubeBlockingMenu",
        "title": "Better Youtube Blocking",
        "contexts": ["all"]
    })
});


const handleContextMenuClick = () => {
    console.log("menu click")
};

chrome.contextMenus.onClicked.addListener(handleContextMenuClick);

const onPageLoadDone = (e) => {
    chrome.tabs.query({active:true, currentWindow:true}, tabs => {
        let active = tabs[0];
        chrome.tabs.sendMessage(active.id, {"message": "page_load", "object": e})
    })
}

chrome.webNavigation.onCompleted.addListener(onPageLoadDone);
