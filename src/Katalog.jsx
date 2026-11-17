import React, { useState } from 'react';
import { ArrowRight, Clock, Filter, PlayCircle, Recycle, Search } from 'lucide-react';
import { getYoutubeLinks } from './utils/youtube.js';

export default function Katalog({ kreasiData = [], onSelectKreasi }) {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedKategori, setSelectedKategori] = useState('Semua');
    const daftarKategori = [
        'Semua',
        ...new Set(kreasiData.map((item) => item.kategori).filter(Boolean))
    ];
    const normalizedQuery = searchQuery.trim().toLowerCase();

    const filteredData = kreasiData.filter((item) => {
        const searchableText = [
            item.judul,
            item.deskripsi,
            item.kategori,
            ...(item.alatBahan ?? [])
        ].filter(Boolean).join(' ').toLowerCase();
        const matchSearch = searchableText.includes(normalizedQuery);
        const matchKategori = selectedKategori === 'Semua' || item.kategori === selectedKategori;
        return matchSearch && matchKategori;
    });

    return (
        <main className="catalog-page">
            <header className="catalog-hero">
                <div className="catalog-hero-content">
                    <span className="catalog-eyebrow"><Recycle size={16} /> Kreasi baru dari barang lama</span>
                    <h1>Katalog <span>DIY EcoCraft</span></h1>
                    <p>
                        Temukan proyek seru sesuai bahan yang kamu punya. Setiap kreasi
                        dilengkapi panduan, bahan, dan tautan video bila tersedia.
                    </p>
                    <div className="catalog-hero-stats">
                        <div><strong>{kreasiData.length}</strong><span>ide kreasi</span></div>
                        <div><strong>{Math.max(daftarKategori.length - 1, 0)}</strong><span>kategori bahan</span></div>
                    </div>
                </div>
            </header>

            <section className="catalog-content" aria-label="Katalog ide DIY">
                <div className="catalog-toolbar">
                    <label className="catalog-search">
                        <Search size={19} aria-hidden="true" />
                        <input
                            type="search"
                            value={searchQuery}
                            onChange={(event) => setSearchQuery(event.target.value)}
                            placeholder="Cari kreasi atau bahan..."
                            aria-label="Cari kreasi atau bahan"
                        />
                    </label>
                    <div className="catalog-filter">
                        <span className="catalog-filter-label"><Filter size={16} /> Bahan</span>
                        <div className="catalog-filter-options" role="group" aria-label="Filter berdasarkan bahan">
                            {daftarKategori.map((category) => (
                                <button
                                    type="button"
                                    key={category}
                                    onClick={() => setSelectedKategori(category)}
                                    className={`catalog-filter-chip ${selectedKategori === category ? 'selected' : ''}`}
                                    aria-pressed={selectedKategori === category}
                                >
                                    {category}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="catalog-results-heading">
                    <div>
                        <span className="catalog-section-label">MULAI DARI YANG KAMU PUNYA</span>
                        <h2>{normalizedQuery || selectedKategori !== 'Semua' ? 'Kreasi yang cocok' : 'Inspirasi untuk dicoba'}</h2>
                    </div>
                    <span>{filteredData.length} dari {kreasiData.length} kreasi</span>
                </div>

                {filteredData.length > 0 ? (
                    <div className="catalog-grid">
                        {filteredData.map((diy) => {
                            const youtubeLinks = getYoutubeLinks(diy.videoUrl);
                            return (
                                <article className="catalog-card" key={diy.id}>
                                    <div className="catalog-card-cover">
                                        {diy.thumbnail ? (
                                            <img src={diy.thumbnail} alt={diy.judul} />
                                        ) : (
                                            <div className="catalog-image-placeholder"><Recycle size={42} /></div>
                                        )}
                                        <span className="catalog-category-badge">{diy.kategori}</span>
                                        <span className="catalog-difficulty-badge">{diy.kesulitan || 'Mudah'}</span>
                                    </div>
                                    <div className="catalog-card-body">
                                        <div className="catalog-card-meta">
                                            <span><Clock size={14} /> {diy.waktu || 'Waktu fleksibel'}</span>
                                            {diy.penulis && <span>Oleh {diy.penulis}</span>}
                                        </div>
                                        <h3>{diy.judul}</h3>
                                        <p className="catalog-card-description">{diy.deskripsi}</p>
                                        {diy.alatBahan?.length > 0 && (
                                            <div className="catalog-materials">
                                                <span>Bahan utama</span>
                                                <p>{diy.alatBahan.slice(0, 2).join(' · ')}</p>
                                            </div>
                                        )}
                                        <div className="catalog-card-actions">
                                            <button
                                                type="button"
                                                className="catalog-detail-button"
                                                onClick={() => onSelectKreasi?.(diy)}
                                            >
                                                Lihat langkah <ArrowRight size={16} />
                                            </button>
                                            {youtubeLinks ? (
                                                <a
                                                    className="catalog-video-link"
                                                    href={youtubeLinks.watchUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    aria-label={`Tonton video YouTube untuk ${diy.judul}`}
                                                >
                                                    <PlayCircle size={17} /> YouTube
                                                </a>
                                            ) : (
                                                <span className="catalog-video-unavailable">
                                                    <PlayCircle size={17} /> Video belum tersedia
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </article>
                            );
                        })}
                    </div>
                ) : (
                    <div className="catalog-empty">
                        <Search size={30} />
                        <h3>Kreasi belum ditemukan</h3>
                        <p>Coba kata kunci atau kategori bahan yang berbeda.</p>
                        <button
                            type="button"
                            className="catalog-reset-button"
                            onClick={() => { setSearchQuery(''); setSelectedKategori('Semua'); }}
                        >
                            Tampilkan semua kreasi
                        </button>
                    </div>
                )}
            </section>
        </main>
    );
}
