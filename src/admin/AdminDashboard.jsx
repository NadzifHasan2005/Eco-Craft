import React, { useState } from 'react';
import {
    ArrowLeft,
    BarChart3,
    BookOpen,
    FileText,
    LayoutDashboard,
    LogOut,
    Pencil,
    Plus,
    Scissors,
    Trash2
} from 'lucide-react';
import './AdminDashboard.css';

const categories = ['Plastik', 'Kardus & Kertas', 'Tekstil', 'Kayu / Paralon'];

const createEmptyForm = (type) => type === 'tutorial' ? ({
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
}) : ({
    judul: '',
    ringkasan: '',
    konten: '',
    gambar: '',
    waktuBaca: '5 Menit',
    penulis: ''
});

const createId = () => `content-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

export default function AdminDashboard({
    tutorials,
    setTutorials,
    articles,
    setArticles,
    onLogout
}) {
    const [activeMenu, setActiveMenu] = useState('dashboard');
    const [form, setForm] = useState(null);
    const [editingId, setEditingId] = useState(null);
    const [notice, setNotice] = useState('');

    const openCreateForm = (type) => {
        setActiveMenu(type === 'tutorial' ? 'tutorials' : 'articles');
        setEditingId(null);
        setForm({ type, values: createEmptyForm(type) });
        setNotice('');
    };

    const openEditForm = (type, item) => {
        setActiveMenu(type === 'tutorial' ? 'tutorials' : 'articles');
        setEditingId(item.id);
        setNotice('');
        setForm({
            type,
            values: type === 'tutorial' ? {
                judul: item.judul ?? '',
                kategori: item.kategori ?? 'Plastik',
                deskripsi: item.deskripsi ?? '',
                thumbnail: item.thumbnail ?? '',
                waktu: item.waktu ?? '',
                kesulitan: item.kesulitan ?? 'Mudah',
                penulis: item.penulis ?? '',
                videoUrl: item.videoUrl ?? '',
                alatBahan: (item.alatBahan ?? []).join('\n'),
                langkah: (item.langkah ?? [])
                    .map((step) => `${step.judulStep}: ${step.deskripsiStep}`)
                    .join('\n')
            } : {
                judul: item.judul ?? '',
                ringkasan: item.ringkasan ?? '',
                konten: item.konten ?? '',
                gambar: item.gambar ?? '',
                waktuBaca: item.waktuBaca ?? '5 Menit',
                penulis: item.penulis ?? ''
            }
        });
    };

    const cancelForm = () => {
        setForm(null);
        setEditingId(null);
    };

    const deleteItem = (type, item) => {
        const label = type === 'tutorial' ? 'tutorial' : 'artikel';
        if (!window.confirm(`Hapus ${label} "${item.judul}"? Tindakan ini tidak dapat dibatalkan.`)) {
            return;
        }

        if (type === 'tutorial') {
            setTutorials((current) => current.filter((entry) => entry.id !== item.id));
        } else {
            setArticles((current) => current.filter((entry) => entry.id !== item.id));
        }
        setNotice(`${label[0].toUpperCase()}${label.slice(1)} berhasil dihapus.`);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const id = editingId ?? createId();

        if (form.type === 'tutorial') {
            const tutorial = {
                id,
                judul: form.values.judul.trim(),
                kategori: form.values.kategori,
                deskripsi: form.values.deskripsi.trim(),
                thumbnail: form.values.thumbnail.trim(),
                waktu: form.values.waktu.trim(),
                kesulitan: form.values.kesulitan,
                penulis: form.values.penulis.trim(),
                videoUrl: form.values.videoUrl.trim(),
                alatBahan: form.values.alatBahan
                    .split(/[\n,]/)
                    .map((item) => item.trim())
                    .filter(Boolean),
                langkah: form.values.langkah
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
        } else {
            const article = {
                id,
                judul: form.values.judul.trim(),
                ringkasan: form.values.ringkasan.trim(),
                konten: form.values.konten.trim(),
                gambar: form.values.gambar.trim(),
                waktuBaca: form.values.waktuBaca.trim(),
                penulis: form.values.penulis.trim()
            };

            setArticles((current) => editingId
                ? current.map((item) => item.id === editingId ? article : item)
                : [article, ...current]);
            setNotice(editingId ? 'Artikel berhasil diperbarui.' : 'Artikel berhasil ditambahkan.');
        }

        setForm(null);
        setEditingId(null);
    };

    const updateForm = (field, value) => {
        setForm((current) => ({
            ...current,
            values: { ...current.values, [field]: value }
        }));
    };

    const currentType = activeMenu === 'tutorials' ? 'tutorial' : 'article';
    const currentItems = currentType === 'tutorial' ? tutorials : articles;

    return (
        <div className="admin-layout">
            <aside className="admin-sidebar">
                <div className="sidebar-brand">
                    <h2>EcoCraft Admin</h2>
                </div>
                <nav className="sidebar-menu" aria-label="Menu admin">
                    <button
                        type="button"
                        className={`menu-item ${activeMenu === 'dashboard' ? 'active' : ''}`}
                        onClick={() => { setActiveMenu('dashboard'); cancelForm(); setNotice(''); }}
                    >
                        <BarChart3 size={18} /> Dashboard
                    </button>
                    <button
                        type="button"
                        className={`menu-item ${activeMenu === 'tutorials' ? 'active' : ''}`}
                        onClick={() => { setActiveMenu('tutorials'); cancelForm(); setNotice(''); }}
                    >
                        <Scissors size={18} /> Tutorial DIY
                    </button>
                    <button
                        type="button"
                        className={`menu-item ${activeMenu === 'articles' ? 'active' : ''}`}
                        onClick={() => { setActiveMenu('articles'); cancelForm(); setNotice(''); }}
                    >
                        <FileText size={18} /> Artikel
                    </button>
                </nav>
                <button type="button" className="btn-logout" onClick={onLogout}>
                    <LogOut size={18} /> Keluar
                </button>
            </aside>

            <main className="admin-main">
                {activeMenu === 'dashboard' && (
                    <section className="dashboard-view">
                        <h1 className="view-title">Rangkuman Dashboard</h1>
                        <div className="stats-grid">
                            <div className="stat-card">
                                <div className="stat-icon-bg bg-green"><Scissors size={24} color="#1B4332" /></div>
                                <div><h3>Tutorial DIY</h3><p className="stat-value">{tutorials.length}</p></div>
                            </div>
                            <div className="stat-card">
                                <div className="stat-icon-bg bg-blue"><FileText size={24} color="#2A6F97" /></div>
                                <div><h3>Artikel</h3><p className="stat-value">{articles.length}</p></div>
                            </div>
                            <div className="stat-card">
                                <div className="stat-icon-bg bg-gold"><LayoutDashboard size={24} color="#B5838D" /></div>
                                <div><h3>Kategori DIY</h3><p className="stat-value">{new Set(tutorials.map((item) => item.kategori)).size}</p></div>
                            </div>
                        </div>
                        <div className="summary-box">
                            <h2>Kelola Konten EcoCraft</h2>
                            <p>Konten disimpan di browser ini dan dapat ditambahkan, diedit, atau dihapus melalui menu di samping.</p>
                            <div className="dashboard-actions">
                                <button type="button" className="btn-submit" onClick={() => openCreateForm('tutorial')}>
                                    <Plus size={17} /> Tambah Tutorial DIY
                                </button>
                                <button type="button" className="btn-submit" onClick={() => openCreateForm('article')}>
                                    <Plus size={17} /> Tambah Artikel
                                </button>
                            </div>
                        </div>
                    </section>
                )}

                {(activeMenu === 'tutorials' || activeMenu === 'articles') && (
                    <section className="content-management-view">
                        {form ? (
                            <div className="form-wrapper">
                                <button type="button" className="btn-back" onClick={cancelForm}>
                                    <ArrowLeft size={16} /> Kembali ke daftar
                                </button>
                                <h1 className="view-title">
                                    {editingId ? 'Edit' : 'Tambah'} {form.type === 'tutorial' ? 'Tutorial DIY' : 'Artikel'}
                                </h1>
                                <form className="admin-form" onSubmit={handleSubmit}>
                                    <div className="form-row">
                                        <div className="form-group">
                                            <label htmlFor="content-title">Judul</label>
                                            <input id="content-title" value={form.values.judul} onChange={(event) => updateForm('judul', event.target.value)} required />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="content-author">{form.type === 'tutorial' ? 'Kreator' : 'Penulis'}</label>
                                            <input id="content-author" value={form.values.penulis} onChange={(event) => updateForm('penulis', event.target.value)} required />
                                        </div>
                                    </div>

                                    {form.type === 'tutorial' ? (
                                        <>
                                            <div className="form-row">
                                                <div className="form-group">
                                                    <label htmlFor="content-category">Kategori bahan</label>
                                                    <select id="content-category" value={form.values.kategori} onChange={(event) => updateForm('kategori', event.target.value)}>
                                                        {categories.map((category) => <option key={category}>{category}</option>)}
                                                    </select>
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="content-level">Tingkat kesulitan</label>
                                                    <select id="content-level" value={form.values.kesulitan} onChange={(event) => updateForm('kesulitan', event.target.value)}>
                                                        <option>Mudah</option><option>Sedang</option><option>Sulit</option>
                                                    </select>
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="content-time">Waktu pengerjaan</label>
                                                    <input id="content-time" value={form.values.waktu} onChange={(event) => updateForm('waktu', event.target.value)} required />
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="content-description">Deskripsi</label>
                                                <textarea id="content-description" rows="3" value={form.values.deskripsi} onChange={(event) => updateForm('deskripsi', event.target.value)} required />
                                            </div>
                                            <div className="form-row">
                                                <div className="form-group">
                                                    <label htmlFor="content-image">URL gambar thumbnail</label>
                                                    <input id="content-image" type="url" value={form.values.thumbnail} onChange={(event) => updateForm('thumbnail', event.target.value)} required />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="content-video">URL video (opsional)</label>
                                                    <input id="content-video" type="url" value={form.values.videoUrl} onChange={(event) => updateForm('videoUrl', event.target.value)} />
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="content-materials">Alat dan bahan (satu item per baris)</label>
                                                <textarea id="content-materials" rows="4" value={form.values.alatBahan} onChange={(event) => updateForm('alatBahan', event.target.value)} required />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="content-steps">Langkah pembuatan (satu langkah per baris, opsional gunakan format “Judul: deskripsi”)</label>
                                                <textarea id="content-steps" rows="6" value={form.values.langkah} onChange={(event) => updateForm('langkah', event.target.value)} required />
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <div className="form-row">
                                                <div className="form-group">
                                                    <label htmlFor="article-image">URL gambar utama</label>
                                                    <input id="article-image" type="url" value={form.values.gambar} onChange={(event) => updateForm('gambar', event.target.value)} required />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="article-read-time">Waktu baca</label>
                                                    <input id="article-read-time" value={form.values.waktuBaca} onChange={(event) => updateForm('waktuBaca', event.target.value)} required />
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="article-summary">Ringkasan</label>
                                                <textarea id="article-summary" rows="3" value={form.values.ringkasan} onChange={(event) => updateForm('ringkasan', event.target.value)} required />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="article-content">Isi artikel</label>
                                                <textarea id="article-content" rows="10" value={form.values.konten} onChange={(event) => updateForm('konten', event.target.value)} required />
                                            </div>
                                        </>
                                    )}

                                    <div className="form-actions">
                                        <button type="submit" className="btn-submit">{editingId ? 'Simpan Perubahan' : 'Simpan Konten'}</button>
                                        <button type="button" className="btn-cancel" onClick={cancelForm}>Batal</button>
                                    </div>
                                </form>
                            </div>
                        ) : (
                            <>
                                <div className="content-list-header">
                                    <div>
                                        <h1 className="view-title">{currentType === 'tutorial' ? 'Kelola Tutorial DIY' : 'Kelola Artikel'}</h1>
                                        <p>{currentItems.length} konten</p>
                                    </div>
                                    <button type="button" className="btn-submit" onClick={() => openCreateForm(currentType)}>
                                        <Plus size={17} /> Tambah {currentType === 'tutorial' ? 'Tutorial' : 'Artikel'}
                                    </button>
                                </div>
                                {notice && <p className="admin-notice" role="status">{notice}</p>}
                                {currentItems.length ? (
                                    <div className="admin-content-list">
                                        {currentItems.map((item) => (
                                            <article className="admin-content-card" key={item.id}>
                                                {currentType === 'tutorial' && item.thumbnail && (
                                                    <img src={item.thumbnail} alt="" className="admin-content-image" />
                                                )}
                                                <div className="admin-content-info">
                                                    <span className="admin-content-type">
                                                        {currentType === 'tutorial' ? item.kategori : `Oleh ${item.penulis || '—'}`}
                                                    </span>
                                                    <h2>{item.judul}</h2>
                                                    <p>{currentType === 'tutorial' ? item.deskripsi : item.ringkasan}</p>
                                                    <small>
                                                        {currentType === 'tutorial'
                                                            ? `${item.kesulitan || 'Mudah'} · ${item.waktu || 'Waktu tidak ditentukan'}`
                                                            : `${item.waktuBaca || 'Waktu baca tidak ditentukan'} · ${item.penulis || 'Penulis tidak diketahui'}`}
                                                    </small>
                                                </div>
                                                <div className="admin-content-actions">
                                                    <button type="button" className="btn-edit" onClick={() => openEditForm(currentType, item)}>
                                                        <Pencil size={16} /> Edit
                                                    </button>
                                                    <button type="button" className="btn-delete" onClick={() => deleteItem(currentType, item)}>
                                                        <Trash2 size={16} /> Hapus
                                                    </button>
                                                </div>
                                            </article>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="admin-empty">
                                        <BookOpen size={32} />
                                        <p>Belum ada {currentType === 'tutorial' ? 'tutorial DIY' : 'artikel'}.</p>
                                        <button type="button" className="btn-submit" onClick={() => openCreateForm(currentType)}>
                                            <Plus size={17} /> Tambahkan sekarang
                                        </button>
                                    </div>
                                )}
                            </>
                        )}
                    </section>
                )}
            </main>
        </div>
    );
}
