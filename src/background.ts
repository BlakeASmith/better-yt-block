import strings from "./strings";

/**
 * Send a message to the active tab indicating a webNavigation event.
 */
function sendWebNavigationEventToContentScript() {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const active: chrome.tabs.Tab = tabs.at(0)!;
    chrome.tabs.sendMessage(active.id!, { message: strings.pageLoad });
  });
}

chrome.webNavigation.onCompleted.addListener(
  sendWebNavigationEventToContentScript
);
