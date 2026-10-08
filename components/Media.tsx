// Picks the right element for a YouTube link, a video file, or an image.
export default function Media({ url, title }: { url: string; title: string }) {
  const yt = url.match(/(?:youtu\.be\/|youtube\.com\/watch\?v=)([\w-]{11})/);
  if (yt)
    return (
      <iframe
        className="media"
        title={title}
        loading="lazy"
        allowFullScreen
        src={`https://www.youtube-nocookie.com/embed/${yt[1]}`}
      />
    );
  if (/\.(mp4|webm|mov)(\?|$)/i.test(url))
    return <video className="media" src={url} controls preload="metadata" />;
  // eslint-disable-next-line @next/next/no-img-element
  return <img className="media" src={url} alt={title} loading="lazy" />;
}
