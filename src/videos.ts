interface VideoExtractionError {
  message: string;
}

export class Video {
  title: string;
  channel: string;

  constructor(title: string, channel: string) {
    this.title = title;
    this.channel = channel;
  }
}

type VideoResult = Video | VideoExtractionError;

export type VideoWithRenderer = {
  video: Video;
  renderer: HTMLElement;
};

type OnNewVideoCallback = (video: VideoWithRenderer) => Promise<any>;

function extractTitleFromVideoRendererElement(
  $renderer: JQuery<HTMLElement>
): string | undefined {
  return $renderer.find("#video-title").get(0)?.innerText;
}

function extractChannelNameFromVideoRendererElement(
  $renderer: JQuery<HTMLElement>
): string | undefined {
  return $renderer.find("#text.ytd-channel-name").get(0)?.innerText;
}

function extractVideoFromVideoRenderer(
  _: number,
  renderer: HTMLElement
): VideoResult {
  const $renderer = $(renderer);
  const title = extractTitleFromVideoRendererElement($renderer);
  const channel = extractChannelNameFromVideoRendererElement($renderer);

  if (title === undefined)
    return { message: "Failed to extract title from HTMLElement" };

  if (channel === undefined)
    return { message: "Failed to extract channel name from HTMLElement" };

  return { title, channel };
}

export class YTVideoFeed {
  readonly selectors: Array<string>;
  _callbacks: Array<OnNewVideoCallback>;

  constructor(selectors: Array<string>) {
    this.selectors = selectors;
    this._callbacks = [];
  }

  async pollPageForVideos() {
    const $renderers: JQuery<HTMLElement> = this.selectors
      .map((selector, _) => $(selector))
      .reduce((prev, current) => prev.add(current));

    // Mark each element once we've emitted it
    const uniqueRenderers = $renderers
      .filter((_, v) => !v.classList.contains("ytbb-visited"))
      .each((_, v) => v.classList.add("ytbb-visited"));

    const videos = uniqueRenderers
      .map(
        (_, renderer) =>
          ({
            video: extractVideoFromVideoRenderer(_, renderer),
            renderer,
          } as VideoWithRenderer)
      )
      .filter((_, videoWithRenderer) => !(videoWithRenderer.video instanceof Video));

    videos.each((_, videoWithRenderer) =>
      this._callbacks.forEach((callback) => callback(videoWithRenderer))
    );
  }

  onVideoLoad(callback: OnNewVideoCallback) {
    this._callbacks.push(callback);
  }
}
