
chrome.runtime.onMessage.addListener((req, sender, sendResp) => {
    if (req.message === "clicked_icon") {
        alert("clicked icon")
    }

    if (req.message === "page_load") {
        let contents = $("#contents")
        if (contents)
            contents.remove()
        //let videos = $("#contents > ytd-compact-video-renderer");
    }
});

