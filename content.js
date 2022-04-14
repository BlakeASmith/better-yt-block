
const extractVideoInfo = (_, e) => {
    let $e = $(e);

    return {
        title: $e.find("#video-title")[0].innerText,
        channel: $e.find("#text.ytd-channel-name")[0].innerText,
        elem: e
    }
}

const removeUnwantedVideos = () => {
    let $compact_renderers = $("ytd-compact-video-renderer:not(.ytbb-visited)");
    let $item_renderers = $("ytd-rich-item-renderer:not(.ytbb-visited)")
    let $video_renderers = $("ytd-video-renderer:not(.ytbb-visited)")
    let $grid_renderers = $("ytd-grid-video-renderer:not(.ytbb-visited)")
    let $radio_renderers = $("ytd-compact-radio-renderer:not(.ytbb-visited)");
    let $videos = $compact_renderers
        .add($item_renderers)
        .add($radio_renderers)
        .add($grid_renderers)
        .add($video_renderers);
    // We change the visibility instead of removing the element
    // since YT will try to fetch more videos once one is removed
    $videos
        .map(extractVideoInfo)
        .filter(hasUnwantedChannelName)
        .each(console.log)
        .each((i, v) => v.elem.style.display = "none")
         // Don't visit videos which have already been considered
        .each((i, v) => v.elem.classList.add("ytbb-visited"))
}

// Wait for page load events --> when there might be new videos
chrome.runtime.onMessage.addListener((req, sender, sendResp) => {
    if (req.message == "page_load")
        removeUnwantedVideos()
});

// YT loads new videos anytime the page scrolls
document.addEventListener("scroll", e => {
    // scroll events get spammed very quickly
    // requestAnimationFrame buffers limits the scroll
    // events to about 1 per monitor refresh
    // any faster would not do any good for us
    window.requestAnimationFrame(removeUnwantedVideos);
});


