import {YTVideoFeed, Video, VideoWithRenderer} from "./videos";
import strings from "./strings";

let feed = new YTVideoFeed([
  "ytd-compact-video-renderer:not(.ytbb-visited)",
  "ytd-rich-item-renderer:not(.ytbb-visited)",
  "ytd-video-renderer:not(.ytbb-visited)",
  "ytd-grid-video-renderer:not(.ytbb-visited)",
  "ytd-compact-radio-renderer:not(.ytbb-visited)",
]);

console.log("Running")

feed.onVideoLoad(async (videoWithRenderer: VideoWithRenderer) => {
    const {video, renderer} = videoWithRenderer

    if (video.title.includes("as")){
        console.log(video)
        // hide the video renderer from view
        renderer.style.display = "none"
    }
});

/**
 * background.js will send a message on WebNavigation. Usually, most of
 * these events involve new videos being loaded.
 */
chrome.runtime.onMessage.addListener((req) => {
  if (req.message == strings.pageLoad) feed.pollPageForVideos();
});

/**
 * Youtube will load new videos on scroll down. requestAnimationFrame
 * will limit the polling to at most one poll per monitor refresh.
 */
document.addEventListener("scroll", () => {
    window.requestAnimationFrame(() => feed.pollPageForVideos());
});
