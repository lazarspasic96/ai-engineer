import Image, { type StaticImageData } from 'next/image';
import { cn } from '@/lib/utils';

interface ScreenshotProps {
  src: StaticImageData | string;
  alt: string;
  caption?: string;
  width?: number;
  className?: string;
}

export function Screenshot({
  src,
  alt,
  caption,
  width,
  className,
}: ScreenshotProps) {
  const isStatic = typeof src !== 'string';

  return (
    <figure className={cn('my-8', className)}>
      <div className="overflow-hidden rounded-lg border border-border bg-muted/30 shadow-sm">
        <Image
          src={src}
          alt={alt}
          width={width ?? 720}
          height={0}
          className="w-full"
          placeholder={isStatic ? 'blur' : undefined}
          style={{ height: 'auto' }}
        />
      </div>
      {caption && (
        <figcaption className="mt-2.5 text-center text-sm text-muted-foreground">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
