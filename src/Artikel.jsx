import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, BookOpen, Clock, Search } from 'lucide-react';
import ArticleContent from './ArticleContent.jsx';

export default function Artikel({ articles = [], setActiveTab }) {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedArticle, setSelectedArticle] = useState(null);
    const normalizedQuery = searchQuery.trim().toLowerCase();
    const filteredArticles = articles.filter((article) =>
        [article.judul, article.ringkasan, article.konten, article.penulis]
            .some((value) => value?.toLowerCase().includes(normalizedQuery))
    );

    if (selectedArticle) {
        return (
            <main className="article-detail-page">
                <div className="article-detail-shell">
                    <button type="button" className="article-back-button" onClick={() => setSelectedArticle(null)}>
                        <ArrowLeft size={17} /> Kembali ke artikel
                    </button>
                    {selectedArticle.gambar && (
                        <img src={selectedArticle.gambar} alt="" className="article-detail-image" />
                    )}
                    <article className="article-detail-content">
                        <div className="article-meta">
                            <span><BookOpen size={15} /> Wawasan EcoCraft</span>
                            <span><Clock size={15} /> {selectedArticle.waktuBaca || 'Artikel'}</span>
                        </div>
                        <h1>{selectedArticle.judul}</h1>
                        <p className="article-detail-summary">{selectedArticle.ringkasan}</p>
                        <p className="article-byline">Ditulis oleh {selectedArticle.penulis || 'Tim EcoCraft'}</p>
                        <ArticleContent content={selectedArticle.konten} />
                        <button type="button" className="btn-primary article-contact-cta" onClick={() => setActiveTab('contact')}>
                            Diskusikan ide dengan kami <ArrowRight size={17} />
                        </button>
                    </article>
                </div>
            </main>
        );
    }

    return (
        <main className="articles-page">
            <header className="articles-hero">
                <span className="articles-eyebrow"><BookOpen size={16} /> Cerita dan inspirasi</span>
                <h1>Jelajahi <span>Artikel EcoCraft</span></h1>
                <p>Temukan wawasan sederhana untuk hidup lebih bijak, mengurangi sampah, dan mulai berkarya dari barang yang sudah ada.</p>
                <label className="articles-search">
                    <Search size={19} aria-hidden="true" />
                    <input
                        type="search"
                        value={searchQuery}
                        onChange={(event) => setSearchQuery(event.target.value)}
                        placeholder="Cari artikel atau penulis..."
                        aria-label="Cari artikel"
                    />
                </label>
            </header>

            <section className="articles-content section-wrapper" aria-label="Daftar artikel">
                <div className="articles-list-heading">
                    <div>
                        <span className="articles-section-label">BACA, TEMUKAN, LAKUKAN</span>
                        <h2>{normalizedQuery ? 'Hasil pencarian' : 'Wawasan terbaru'}</h2>
                    </div>
                    <span className="articles-count">{filteredArticles.length} artikel</span>
                </div>

                {filteredArticles.length > 0 ? (
                    <div className="articles-grid">
                        {filteredArticles.map((article) => (
                            <article className="article-card" key={article.id}>
                                {article.gambar ? (
                                    <img src={article.gambar} alt="" className="article-card-image" />
                                ) : (
                                    <div className="article-card-placeholder"><BookOpen size={34} /></div>
                                )}
                                <div className="article-card-content">
                                    <div className="article-meta">
                                        <span><Clock size={14} /> {article.waktuBaca || 'Artikel'}</span>
                                        <span>{article.penulis || 'Tim EcoCraft'}</span>
                                    </div>
                                    <h3>{article.judul}</h3>
                                    <p>{article.ringkasan}</p>
                                    <button type="button" className="article-read-link" onClick={() => setSelectedArticle(article)}>
                                        Baca artikel <ArrowRight size={16} />
                                    </button>
                                </div>
                            </article>
                        ))}
                    </div>
                ) : (
                    <div className="articles-empty">
                        <BookOpen size={38} />
                        <h3>{normalizedQuery ? 'Artikel tidak ditemukan' : 'Cerita baru segera hadir'}</h3>
                        <p>
                            {normalizedQuery
                                ? 'Coba kata kunci lain, atau jelajahi tutorial kreasi dari barang bekas.'
                                : 'Saat ini belum ada artikel yang dipublikasikan. Sementara itu, kamu bisa mulai berkreasi dari katalog DIY.'}
                        </p>
                        {normalizedQuery ? (
                            <button type="button" className="btn-primary" onClick={() => setActiveTab('katalog')}>
                                Jelajahi Katalog DIY <ArrowRight size={17} />
                            </button>
                        ) : (
                            <button type="button" className="btn-primary" onClick={() => setActiveTab('contact')}>
                                Sampaikan ide artikel <ArrowRight size={17} />
                            </button>
                        )}
                    </div>
                )}
            </section>
        </main>
    );
}
