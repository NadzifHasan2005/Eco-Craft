import React, { useState } from 'react';
import { ArrowLeft, Pencil, Plus, Scissors, Trash2 } from 'lucide-react';

const categories = ['Plastik', 'Kardus & Kertas', 'Tekstil', 'Kayu / Paralon'];

const emptyTutorial = {
    judul: '',
    kategori: 'Plastik',
    deskripsi: '',
    thumbnail: '',
    waktu: '',
    kesulitan: 'Mudah',
    penulis: '',
    videoUrl: '',
    alatBahan: '',
    langkah: ''
};

const createId = () => `tutorial-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

export default function AdminKatalog({ tutorials, setTutorials }) {
    const [form, setForm] = useState(null);
    const [editingId, setEditingId] = useState(null);
    const [notice, setNotice] = useState('');

    const openCreateForm = () => {
        setForm({ ...emptyTutorial });
        setEditingId(null);
        setNotice('');
    };

    const openEditForm = (tutorial) => {
        setForm({
            judul: tutorial.judul ?? '',
            kategori: tutorial.kategori ?? 'Plastik',
            deskripsi: tutorial.deskripsi ?? '',
            thumbnail: tutorial.thumbnail ?? '',
            waktu: tutorial.waktu ?? '',
            kesulitan: tutorial.kesulitan ?? 'Mudah',
            penulis: tutorial.penulis ?? '',
            videoUrl: tutorial.videoUrl ?? '',
            alatBahan: (tutorial.alatBahan ?? []).join('\n'),
            langkah: (tutorial.langkah ?? [])
                .map((step) => `${step.judulStep}: ${step.deskripsiStep}`)
                .join('\n')
        });
        setEditingId(tutorial.id);
        setNotice('');
    };

    const updateField = (field, value) => {
        setForm((current) => ({ ...current, [field]: value }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const tutorial = {
            id: editingId ?? createId(),
            judul: form.judul.trim(),
            kategori: form.kategori,
            deskripsi: form.deskripsi.trim(),
            thumbnail: form.thumbnail.trim(),
            waktu: form.waktu.trim(),
            kesulitan: form.kesulitan,
            penulis: form.penulis.trim(),
            videoUrl: form.videoUrl.trim(),
            alatBahan: form.alatBahan
                .split(/[\n,]/)
                .map((item) => item.trim())
                .filter(Boolean),
            langkah: form.langkah
                .split('\n')
                .map((step) => step.trim())
                .filter(Boolean)
                .map((step, index) => {
                    const separator = step.indexOf(':');
                    return {
                        step: index + 1,
                        judulStep: separator > 0 ? step.slice(0, separator).trim() : `Langkah ${index + 1}`,
                        deskripsiStep: separator > 0 ? step.slice(separator + 1).trim() : step
                    };
                })
        };

        setTutorials((current) => editingId
            ? current.map((item) => item.id === editingId ? tutorial : item)
            : [tutorial, ...current]);
        setNotice(editingId ? 'Tutorial berhasil diperbarui.' : 'Tutorial berhasil ditambahkan.');
        setForm(null);
        setEditingId(null);
    };

    const deleteTutorial = (tutorial) => {
        if (!window.confirm(`Hapus tutorial "${tutorial.judul}"? Tindakan ini tidak dapat dibatalkan.`)) {
            return;
        }

        setTutorials((current) => current.filter((item) => item.id !== tutorial.id));
        setNotice('Tutorial berhasil dihapus.');
    };

    const cancelForm = () => {
        setForm(null);
        setEditingId(null);
    };

    return (
        <section className="content-management-view">
            {form ? (
                <div className="form-wrapper">
                    <button type="button" className="btn-back" onClick={cancelForm}>
                        <ArrowLeft size={16} /> Kembali ke katalog
                    </button>
                    <h1 className="view-title">{editingId ? 'Edit Tutorial DIY' : 'Tambah Tutorial DIY'}</h1>
                    <form className="admin-form" onSubmit={handleSubmit}>
                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="tutorial-title">Judul tutorial</label>
                                <input id="tutorial-title" value={form.judul} onChange={(event) => updateField('judul', event.target.value)} required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="tutorial-author">Kreator</label>
                                <input id="tutorial-author" value={form.penulis} onChange={(event) => updateField('penulis', event.target.value)} required />
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="tutorial-category">Kategori bahan</label>
                                <select id="tutorial-category" value={form.kategori} onChange={(event) => updateField('kategori', event.target.value)}>
                                    {categories.map((category) => <option key={category}>{category}</option>)}
                                </select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="tutorial-level">Tingkat kesulitan</label>
                                <select id="tutorial-level" value={form.kesulitan} onChange={(event) => updateField('kesulitan', event.target.value)}>
                                    <option>Mudah</option>
                                    <option>Sedang</option>
                                    <option>Sulit</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="tutorial-time">Waktu pengerjaan</label>
                                <input id="tutorial-time" value={form.waktu} onChange={(event) => updateField('waktu', event.target.value)} required />
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="tutorial-description">Deskripsi</label>
                            <textarea id="tutorial-description" rows="3" value={form.deskripsi} onChange={(event) => updateField('deskripsi', event.target.value)} required />
                        </div>
                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="tutorial-image">URL gambar thumbnail</label>
                                <input id="tutorial-image" type="url" value={form.thumbnail} onChange={(event) => updateField('thumbnail', event.target.value)} required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="tutorial-video">URL video YouTube (opsional)</label>
                                <input id="tutorial-video" type="url" value={form.videoUrl} onChange={(event) => updateField('videoUrl', event.target.value)} />
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="tutorial-materials">Alat dan bahan (satu item per baris)</label>
                            <textarea id="tutorial-materials" rows="4" value={form.alatBahan} onChange={(event) => updateField('alatBahan', event.target.value)} required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="tutorial-steps">Langkah pembuatan (satu langkah per baris, opsional gunakan format “Judul: deskripsi”)</label>
                            <textarea id="tutorial-steps" rows="6" value={form.langkah} onChange={(event) => updateField('langkah', event.target.value)} required />
                        </div>
                        <div className="form-actions">
                            <button type="submit" className="btn-submit">{editingId ? 'Simpan Perubahan' : 'Simpan Tutorial'}</button>
                            <button type="button" className="btn-cancel" onClick={cancelForm}>Batal</button>
                        </div>
                    </form>
                </div>
            ) : (
                <>
                    <div className="content-list-header">
                        <div>
                            <h1 className="view-title">Kelola Katalog DIY</h1>
                            <p>{tutorials.length} tutorial</p>
                        </div>
                        <button type="button" className="btn-submit" onClick={openCreateForm}>
                            <Plus size={17} /> Tambah Tutorial
                        </button>
                    </div>
                    {notice && <p className="admin-notice" role="status">{notice}</p>}
                    {tutorials.length ? (
                        <div className="admin-content-list">
                            {tutorials.map((tutorial) => (
                                <article className="admin-content-card" key={tutorial.id}>
                                    {tutorial.thumbnail && <img src={tutorial.thumbnail} alt="" className="admin-content-image" />}
                                    <div className="admin-content-info">
                                        <span className="admin-content-type">{tutorial.kategori}</span>
                                        <h2>{tutorial.judul}</h2>
                                        <p>{tutorial.deskripsi}</p>
                                        <small>{tutorial.kesulitan || 'Mudah'} · {tutorial.waktu || 'Waktu tidak ditentukan'}</small>
                                    </div>
                                    <div className="admin-content-actions">
                                        <button type="button" className="btn-edit" onClick={() => openEditForm(tutorial)}>
                                            <Pencil size={16} /> Edit
                                        </button>
                                        <button type="button" className="btn-delete" onClick={() => deleteTutorial(tutorial)}>
                                            <Trash2 size={16} /> Hapus
                                        </button>
                                    </div>
                                </article>
                            ))}
                        </div>
                    ) : (
                        <div className="admin-empty">
                            <Scissors size={32} />
                            <p>Belum ada tutorial DIY.</p>
                            <button type="button" className="btn-submit" onClick={openCreateForm}>
                                <Plus size={17} /> Tambahkan tutorial
                            </button>
                        </div>
                    )}
                </>
            )}
        </section>
    );
}
