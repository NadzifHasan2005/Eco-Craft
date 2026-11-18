const SUPPORTED_IMAGE_TYPES = new Set(['image/jpeg', 'image/png', 'image/webp']);
const MAX_SOURCE_SIZE = 15 * 1024 * 1024;
const MAX_OUTPUT_SIZE = 500 * 1024;
const MAX_DIMENSION = 1600;

function loadImage(file) {
    const objectUrl = URL.createObjectURL(file);

    return new Promise((resolve, reject) => {
        const image = new Image();
        image.onload = () => {
            URL.revokeObjectURL(objectUrl);
            resolve(image);
        };
        image.onerror = () => {
            URL.revokeObjectURL(objectUrl);
            reject(new Error('File gambar tidak dapat dibuka. Coba pilih file lain.'));
        };
        image.src = objectUrl;
    });
}

function canvasToBlob(canvas, quality) {
    return new Promise((resolve, reject) => {
        canvas.toBlob((blob) => {
            if (blob) {
                resolve(blob);
            } else {
                reject(new Error('Gambar gagal dikompres. Coba file gambar lain.'));
            }
        }, 'image/webp', quality);
    });
}

function blobToDataUrl(blob) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
            if (typeof reader.result === 'string') {
                resolve(reader.result);
            } else {
                reject(new Error('Gambar gagal disiapkan untuk disimpan.'));
            }
        };
        reader.onerror = () => reject(new Error('Gambar gagal dibaca. Coba pilih file lain.'));
        reader.readAsDataURL(blob);
    });
}

export async function compressImageFile(file) {
    if (!SUPPORTED_IMAGE_TYPES.has(file.type)) {
        throw new Error('Gunakan gambar berformat JPEG, PNG, atau WebP.');
    }

    if (file.size > MAX_SOURCE_SIZE) {
        throw new Error('Ukuran gambar maksimal 15 MB.');
    }

    const image = await loadImage(file);
    const scale = Math.min(1, MAX_DIMENSION / image.naturalWidth, MAX_DIMENSION / image.naturalHeight);
    const initialWidth = Math.max(1, Math.round(image.naturalWidth * scale));
    const initialHeight = Math.max(1, Math.round(image.naturalHeight * scale));
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');

    if (!context) {
        throw new Error('Browser tidak dapat memproses gambar ini.');
    }

    for (let resizeScale = 1; resizeScale >= 0.2; resizeScale *= 0.8) {
        canvas.width = Math.max(1, Math.round(initialWidth * resizeScale));
        canvas.height = Math.max(1, Math.round(initialHeight * resizeScale));
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.drawImage(image, 0, 0, canvas.width, canvas.height);

        for (const quality of [0.82, 0.68, 0.54]) {
            const blob = await canvasToBlob(canvas, quality);
            if (blob.size <= MAX_OUTPUT_SIZE) {
                return blobToDataUrl(blob);
            }
        }
    }

    throw new Error('Gambar terlalu besar untuk disimpan. Pilih gambar dengan resolusi lebih kecil.');
}
