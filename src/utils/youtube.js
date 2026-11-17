const YOUTUBE_ID_PATTERN = /^[A-Za-z0-9_-]{11}$/;

export function getYoutubeLinks(value) {
    if (typeof value !== 'string' || value.trim() === '') {
        return null;
    }

    let url;
    try {
        url = new URL(value);
    } catch {
        return null;
    }

    if (url.protocol !== 'https:' && url.protocol !== 'http:') {
        return null;
    }

    const hostname = url.hostname.toLowerCase().replace(/^www\./, '');
    let videoId = '';

    if (hostname === 'youtu.be') {
        videoId = url.pathname.split('/').filter(Boolean)[0] ?? '';
    } else if (['youtube.com', 'm.youtube.com', 'youtube-nocookie.com'].includes(hostname)) {
        videoId = url.searchParams.get('v') ?? '';
        if (!videoId) {
            const pathMatch = url.pathname.match(/^\/(?:embed|shorts|live)\/([^/]+)/);
            videoId = pathMatch?.[1] ?? '';
        }
    } else {
        return null;
    }

    if (!YOUTUBE_ID_PATTERN.test(videoId)) {
        return null;
    }

    const encodedId = encodeURIComponent(videoId);
    return {
        watchUrl: `https://www.youtube.com/watch?v=${encodedId}`,
        embedUrl: `https://www.youtube-nocookie.com/embed/${encodedId}`
    };
}
