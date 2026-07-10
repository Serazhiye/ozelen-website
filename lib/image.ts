type Compressed = { blob: Blob; type: string };

/** Draw an image file onto a downscaled canvas; run a callback with it. */
function drawToCanvas(
  file: File,
  maxEdge: number,
): Promise<HTMLCanvasElement> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error("Не удалось прочитать файл"));
    reader.onload = () => {
      const img = new Image();
      img.onerror = () => reject(new Error("Не удалось загрузить изображение"));
      img.onload = () => {
        const scale = Math.min(1, maxEdge / Math.max(img.width, img.height));
        const w = Math.round(img.width * scale);
        const h = Math.round(img.height * scale);
        const canvas = document.createElement("canvas");
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext("2d");
        if (!ctx) {
          reject(new Error("Canvas недоступен"));
          return;
        }
        ctx.drawImage(img, 0, 0, w, h);
        resolve(canvas);
      };
      img.src = reader.result as string;
    };
    reader.readAsDataURL(file);
  });
}

/**
 * Reads an uploaded image file, downscales it (max edge ~2000px) and re-encodes
 * it as WebP (falling back to JPEG where WebP encoding is unavailable). Returns
 * the compressed Blob + its MIME type — ready to upload to Supabase Storage.
 */
export async function fileToCompressedBlob(
  file: File,
  maxEdge = 2000,
  quality = 0.82,
): Promise<Compressed> {
  const canvas = await drawToCanvas(file, maxEdge);
  const encode = (type: string) =>
    new Promise<Blob | null>((res) => canvas.toBlob((b) => res(b), type, quality));

  const webp = await encode("image/webp");
  if (webp && webp.type === "image/webp") return { blob: webp, type: "image/webp" };

  const jpeg = await encode("image/jpeg");
  if (jpeg) return { blob: jpeg, type: "image/jpeg" };

  throw new Error("Не удалось сжать изображение");
}

/** Read a Blob as a data URL (used as a fallback when Storage is unavailable). */
export function blobToDataUrl(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error("Не удалось прочитать изображение"));
    reader.onload = () => resolve(reader.result as string);
    reader.readAsDataURL(blob);
  });
}

/**
 * Reads an uploaded image file and returns a compressed data URL.
 * Images are downscaled (max edge ~1600px) and re-encoded as JPEG so they
 * fit comfortably in localStorage (which the client-only CMS uses for storage).
 */
export function fileToCompressedDataUrl(file: File, maxEdge = 1600, quality = 0.82): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error("Не удалось прочитать файл"));
    reader.onload = () => {
      const img = new Image();
      img.onerror = () => reject(new Error("Не удалось загрузить изображение"));
      img.onload = () => {
        const scale = Math.min(1, maxEdge / Math.max(img.width, img.height));
        const w = Math.round(img.width * scale);
        const h = Math.round(img.height * scale);
        const canvas = document.createElement("canvas");
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext("2d");
        if (!ctx) {
          resolve(reader.result as string);
          return;
        }
        ctx.drawImage(img, 0, 0, w, h);
        resolve(canvas.toDataURL("image/jpeg", quality));
      };
      img.src = reader.result as string;
    };
    reader.readAsDataURL(file);
  });
}
