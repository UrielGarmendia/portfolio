/**
 * OptimizedImage — Imagen con soporte WebP automático + fetchpriority + lazy load.
 *
 * Uso:
 *   <OptimizedImage
 *     src="/foto-mia.png"       ← ruta PNG/JPG original (fallback)
 *     alt="Descripción"
 *     width={280} height={373}
 *     priority={true}           ← true para imágenes LCP (above the fold)
 *     sizes="(max-width: 768px) 256px, 280px"
 *     className="..."
 *   />
 *
 * Si existe /foto-mia.webp, el browser lo usa automáticamente (ahorra 60-80%).
 * Si no existe el .webp, cae al src original sin error visible.
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
    <picture>
      {/* Fuente WebP — browsers modernos la prefieren si existe */}
      <source
        type="image/webp"
        srcSet={webpSrc}
        sizes={sizes}
      />
      {/* Fallback PNG/JPG para browsers sin soporte WebP */}
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
