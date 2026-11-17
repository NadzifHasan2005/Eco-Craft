import React, { useState } from 'react';
import { ArrowLeft, BookOpen, Pencil, Plus, Trash2 } from 'lucide-react';
import ArticleContent from '../ArticleContent.jsx';

const emptyArticle = {
    judul: '',
    ringkasan: '',
    konten: '',
    gambar: '',
    waktuBaca: '5 Menit',
    penulis: ''
};

const createId = () => `article-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

export default function AdminArtikel({ articles, setArticles }) {
    const [form, setForm] = useState(null);
    const [editingId, setEditingId] = useState(null);
    const [notice, setNotice] = useState('');

    const openCreateForm = () => {
        setForm({ ...emptyArticle });
        setEditingId(null);
        setNotice('');
    };

    const openEditForm = (article) => {
        setForm({
            judul: article.judul ?? '',
            ringkasan: article.ringkasan ?? '',
            konten: article.konten ?? '',
            gambar: article.gambar ?? '',
            waktuBaca: article.waktuBaca ?? '5 Menit',
            penulis: article.penulis ?? ''
        });
        setEditingId(article.id);
        setNotice('');
    };

    const updateField = (field, value) => {
        setForm((current) => ({ ...current, [field]: value }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const article = {
            id: editingId ?? createId(),
            judul: form.judul.trim(),
            ringkasan: form.ringkasan.trim(),
            konten: form.konten.trim(),
            gambar: form.gambar.trim(),
            waktuBaca: form.waktuBaca.trim(),
            penulis: form.penulis.trim()
        };

        setArticles((current) => editingId
            ? current.map((item) => item.id === editingId ? article : item)
            : [article, ...current]);
        setNotice(editingId ? 'Artikel berhasil diperbarui.' : 'Artikel berhasil ditambahkan.');
        setForm(null);
        setEditingId(null);
    };

    const deleteArticle = (article) => {
        if (!window.confirm(`Hapus artikel "${article.judul}"? Tindakan ini tidak dapat dibatalkan.`)) {
            return;
        }

        setArticles((current) => current.filter((item) => item.id !== article.id));
        setNotice('Artikel berhasil dihapus.');
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
                        <ArrowLeft size={16} /> Kembali ke daftar artikel
                    </button>
                    <h1 className="view-title">{editingId ? 'Edit Artikel' : 'Tambah Artikel'}</h1>
                    <form className="admin-form" onSubmit={handleSubmit}>
                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="article-title">Judul artikel</label>
                                <input id="article-title" value={form.judul} onChange={(event) => updateField('judul', event.target.value)} required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="article-author">Penulis</label>
                                <input id="article-author" value={form.penulis} onChange={(event) => updateField('penulis', event.target.value)} required />
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="article-image">URL gambar utama</label>
                                <input id="article-image" type="url" value={form.gambar} onChange={(event) => updateField('gambar', event.target.value)} required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="article-read-time">Waktu baca</label>
                                <input id="article-read-time" value={form.waktuBaca} onChange={(event) => updateField('waktuBaca', event.target.value)} required />
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="article-summary">Ringkasan artikel</label>
                            <textarea id="article-summary" rows="3" value={form.ringkasan} onChange={(event) => updateField('ringkasan', event.target.value)} required />
                        </div>
                        <div className="article-editor-grid">
                            <div className="form-group article-editor-field">
                                <label htmlFor="article-content">Isi artikel (Markdown)</label>
                                <textarea id="article-content" rows="12" value={form.konten} onChange={(event) => updateField('konten', event.target.value)} required />
                                <p className="article-markdown-help">
                                    Gunakan <code># Subjudul</code>, <code>**tebal**</code>, <code>*miring*</code>, <code>- item</code>,
                                    {' '}<code>1. item</code>, <code>&gt; kutipan</code>, atau <code>[tautan](https://...)</code>.
                                </p>
                            </div>
                            <aside className="article-preview-panel" aria-live="polite">
                                <h2>Pratinjau langsung</h2>
                                {form.konten.trim() ? (
                                    <ArticleContent content={form.konten} />
                                ) : (
                                    <p className="article-preview-empty">Hasil format artikel akan tampil di sini saat kamu mengetik.</p>
                                )}
                            </aside>
                        </div>
                        <div className="form-actions">
                            <button type="submit" className="btn-submit">{editingId ? 'Simpan Perubahan' : 'Simpan Artikel'}</button>
                            <button type="button" className="btn-cancel" onClick={cancelForm}>Batal</button>
                        </div>
                    </form>
                </div>
            ) : (
                <>
                    <div className="content-list-header">
                        <div>
                            <h1 className="view-title">Kelola Artikel</h1>
                            <p>{articles.length} artikel</p>
                        </div>
                        <button type="button" className="btn-submit" onClick={openCreateForm}>
                            <Plus size={17} /> Tambah Artikel
                        </button>
                    </div>
                    {notice && <p className="admin-notice" role="status">{notice}</p>}
                    {articles.length ? (
                        <div className="admin-content-list">
                            {articles.map((article) => (
                                <article className="admin-content-card" key={article.id}>
                                    {article.gambar && <img src={article.gambar} alt="" className="admin-content-image" />}
                                    <div className="admin-content-info">
                                        <span className="admin-content-type">Oleh {article.penulis || '—'}</span>
                                        <h2>{article.judul}</h2>
                                        <p>{article.ringkasan}</p>
                                        <small>{article.waktuBaca || 'Waktu baca tidak ditentukan'}</small>
                                    </div>
                                    <div className="admin-content-actions">
                                        <button type="button" className="btn-edit" onClick={() => openEditForm(article)}>
                                            <Pencil size={16} /> Edit
                                        </button>
                                        <button type="button" className="btn-delete" onClick={() => deleteArticle(article)}>
                                            <Trash2 size={16} /> Hapus
                                        </button>
                                    </div>
                                </article>
                            ))}
                        </div>
                    ) : (
                        <div className="admin-empty">
                            <BookOpen size={32} />
                            <p>Belum ada artikel.</p>
                            <button type="button" className="btn-submit" onClick={openCreateForm}>
                                <Plus size={17} /> Tambahkan artikel
                            </button>
                        </div>
                    )}
                </>
            )}
        </section>
    );
}
