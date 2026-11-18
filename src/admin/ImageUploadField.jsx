import React, { useRef, useState } from 'react';
import { ImagePlus, Trash2 } from 'lucide-react';
import { compressImageFile } from '../utils/imageUpload.js';

export default function ImageUploadField({ id, label, value, onChange, required = false }) {
    const fileInputRef = useRef(null);
    const [error, setError] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);

    const handleFileChange = async (event) => {
        const file = event.target.files?.[0];
        event.target.value = '';
        if (!file) return;

        setError('');
        setIsProcessing(true);
        try {
            onChange(await compressImageFile(file));
        } catch (uploadError) {
            console.error('Gagal memproses gambar unggahan:', uploadError);
            setError(uploadError instanceof Error ? uploadError.message : 'Gambar gagal diproses.');
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <div className="form-group image-upload-field">
            <label htmlFor={`${id}-url`}>{label}</label>
            <input
                id={`${id}-url`}
                type="url"
                value={value}
                onChange={(event) => {
                    setError('');
                    onChange(event.target.value);
                }}
                placeholder="Tempel URL gambar atau unggah dari perangkat"
                required={required}
            />
            <input
                ref={fileInputRef}
                id={`${id}-file`}
                className="image-file-input"
                type="file"
                accept="image/jpeg,image/png,image/webp"
                onChange={handleFileChange}
                tabIndex={-1}
                aria-hidden="true"
            />
            <button
                type="button"
                className="btn-image-upload"
                onClick={() => fileInputRef.current?.click()}
                disabled={isProcessing}
            >
                <ImagePlus size={16} />
                {isProcessing ? 'Memproses gambar...' : 'Unggah dari perangkat'}
            </button>
            <small className="image-upload-help">JPEG, PNG, atau WebP · Maks. 15 MB · Gambar dikompres untuk penyimpanan browser.</small>
            {error && <p className="image-upload-error" role="alert">{error}</p>}
            {value && (
                <div className="image-upload-preview">
                    <img src={value} alt={`Pratinjau ${label.toLowerCase()}`} />
                    <button type="button" className="btn-image-remove" onClick={() => onChange('')}>
                        <Trash2 size={15} /> Hapus gambar
                    </button>
                </div>
            )}
        </div>
    );
}
