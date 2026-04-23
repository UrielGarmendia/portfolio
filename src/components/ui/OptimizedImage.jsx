/**
 * OptimizedImage — Imagen WebP con fallback PNG/JPG y fetchpriority.
 *
 * IMPORTANTE: usa display:contents en <picture> para que no interfiera
 * con layouts de posicionamiento absoluto (absolute inset-0, etc.)
 */
const OptimizedImage = ({
  src,
  alt,
  width,
  height,
  className = '',
  priority = false,
  sizes = '100vw',
  style = {},
  onError,
}) => {
  // Derivar ruta WebP automáticamente desde el src original
  const webpSrc = src.replace(/\.(png|jpg|jpeg)$/i, '.webp');

  return (
    <picture
      // display:contents hace que <picture> sea invisible al layout —
      // el <img> se posiciona como si <picture> no existiera.
      style={{ display: 'contents' }}
    >
      {/* WebP — browsers modernos (97%+ de usuarios) */}
      <source
        type="image/webp"
        srcSet={webpSrc}
        sizes={sizes}
      />
      {/* Fallback PNG/JPG para Safari < 14 y browsers muy antiguos */}
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={className}
        style={style}
        loading={priority ? 'eager' : 'lazy'}
        decoding={priority ? 'sync' : 'async'}
        fetchPriority={priority ? 'high' : 'auto'}
        onError={onError ?? ((e) => { e.currentTarget.style.display = 'none'; })}
      />
    </picture>
  );
};

export default OptimizedImage;
