import { YTVideoFeed, Video } from "./videos";
import strings from "./strings";
import { UI } from "./ui";
import ReactDOM from "react-dom";

let feed = new YTVideoFeed([
  "ytd-compact-video-renderer:not(.ytbb-visited)",
  "ytd-rich-item-renderer:not(.ytbb-visited)",
  "ytd-video-renderer:not(.ytbb-visited)",
  "ytd-grid-video-renderer:not(.ytbb-visited)",
  "ytd-compact-radio-renderer:not(.ytbb-visited)",
]);

feed.onVideoLoad(async ({ renderer }) => {});

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

window.onload = () => {
  const menuButtons = $("#container > #end").get(0);
  const blockMenuButton = document.createElement("div");

  menuButtons?.appendChild(
      blockMenuButton
  );

  ReactDOM.render(<UI blocked={["Zaney"]} />, blockMenuButton);
}
