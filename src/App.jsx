import React, { useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navigation from './Navigation.jsx';
import Footer from './Footer.jsx';
import Home from './Home.jsx';
import Katalog from './Katalog.jsx';
import Artikel from './Artikel.jsx';
import Kontak from './Kontak.jsx';
import Tentang from './Tentang.jsx';
import AdminLogin from './admin/AdminLogin.jsx';
import AdminDashboard from './admin/AdminDashboard.jsx';
import { initialKreasiData } from './data/kreasiData.js';
import { getYoutubeLinks } from './utils/youtube.js';
import { ArrowLeft, Check, Clock, ExternalLink, Leaf, PlayCircle } from 'lucide-react';

const CONTENT_STORAGE_KEY = 'ecocraft-content-v1';

function isContentList(value) {
  return Array.isArray(value) && value.every((item) =>
    item && typeof item.id === 'string' && typeof item.judul === 'string'
  );
}

function loadContent() {
  try {
    const savedContent = window.localStorage.getItem(CONTENT_STORAGE_KEY);
    if (!savedContent) {
      return { tutorials: initialKreasiData, articles: [], error: '' };
    }

    const parsedContent = JSON.parse(savedContent);
    if (!isContentList(parsedContent.tutorials) || !isContentList(parsedContent.articles)) {
      throw new Error('Format data konten tidak valid.');
    }

    return {
      tutorials: parsedContent.tutorials,
      articles: parsedContent.articles,
      error: ''
    };
  } catch (error) {
    console.error('Gagal membaca data konten dari localStorage:', error);
    return {
      tutorials: initialKreasiData,
      articles: [],
      error: 'Data konten lokal tidak dapat dibaca. Konten awal ditampilkan; perubahan baru akan dicoba untuk disimpan.'
    };
  }
}

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('home');
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [selectedKreasi, setSelectedKreasi] = useState(null);
  const [initialContent] = useState(loadContent);
  const [tutorials, setTutorials] = useState(initialContent.tutorials);
  const [articles, setArticles] = useState(initialContent.articles);
  const [storageError, setStorageError] = useState(initialContent.error);
  const tutorialsRef = useRef(tutorials);
  const articlesRef = useRef(articles);
  const isAdmin = location.pathname.replace(/\/+$/, '') === '/admin';

  const setIsAdmin = (openAdmin) => {
    navigate(openAdmin ? '/admin' : '/');
  };

  const persistContent = (nextTutorials, nextArticles) => {
    try {
      window.localStorage.setItem(
        CONTENT_STORAGE_KEY,
        JSON.stringify({ tutorials: nextTutorials, articles: nextArticles })
      );
      setStorageError('');
    } catch (error) {
      console.error('Gagal menyimpan data konten ke localStorage:', error);
      setStorageError('Perubahan tampil di sesi ini, tetapi gagal disimpan ke browser. Periksa ruang penyimpanan atau izin browser.');
    }
  };

  const updateTutorials = (nextValue) => {
    const nextTutorials = typeof nextValue === 'function' ? nextValue(tutorialsRef.current) : nextValue;
    tutorialsRef.current = nextTutorials;
    setTutorials(nextTutorials);
    persistContent(nextTutorials, articlesRef.current);
  };

  const updateArticles = (nextValue) => {
    const nextArticles = typeof nextValue === 'function' ? nextValue(articlesRef.current) : nextValue;
    articlesRef.current = nextArticles;
    setArticles(nextArticles);
    persistContent(tutorialsRef.current, nextArticles);
  };

  const selectKreasi = (kreasi) => {
    setSelectedKreasi(kreasi);
    setActiveTab('detail');
  };

  const handleLogout = () => {
    setIsAdminAuthenticated(false);
    setActiveTab('home');
    navigate('/', { replace: true });
  };

  const selectedYoutube = selectedKreasi ? getYoutubeLinks(selectedKreasi.videoUrl) : null;

  return (
    <>
      <Navigation
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isAdmin={isAdmin}
        setIsAdmin={setIsAdmin}
      />
      {storageError && <p className="storage-warning" role="alert">{storageError}</p>}
      {isAdmin ? (
        isAdminAuthenticated ? (
          <AdminDashboard
            tutorials={tutorials}
            setTutorials={updateTutorials}
            articles={articles}
            setArticles={updateArticles}
            onLogout={handleLogout}
          />
        ) : (
          <AdminLogin onLoginSuccess={() => setIsAdminAuthenticated(true)} />
        )
      ) : (
        <>
          {activeTab === 'home' && (
            <Home
              kreasiData={tutorials}
              setActiveTab={setActiveTab}
              onSelectKreasi={selectKreasi}
            />
          )}
          {activeTab === 'katalog' && (
            <Katalog kreasiData={tutorials} onSelectKreasi={selectKreasi} />
          )}
          {activeTab === 'artikel' && (
            <Artikel articles={articles} setActiveTab={setActiveTab} />
          )}
          {activeTab === 'detail' && selectedKreasi && (
            <main className="diy-detail-page">
              <div className="diy-detail-shell">
                <button
                  type="button"
                  className="diy-back-button"
                  onClick={() => setActiveTab('katalog')}
                >
                  <ArrowLeft size={17} /> Kembali ke Katalog
                </button>

                <header className="diy-detail-hero">
                  <div className="diy-detail-copy">
                    <span className="diy-detail-category"><Leaf size={15} /> {selectedKreasi.kategori}</span>
                    <h1>{selectedKreasi.judul}</h1>
                    <p>{selectedKreasi.deskripsi}</p>
                    <div className="diy-detail-meta">
                      <span>{selectedKreasi.kesulitan || 'Mudah'}</span>
                      <span><Clock size={15} /> {selectedKreasi.waktu || 'Waktu fleksibel'}</span>
                    </div>
                  </div>
                  {selectedKreasi.thumbnail && (
                    <img className="diy-detail-image" src={selectedKreasi.thumbnail} alt={selectedKreasi.judul} />
                  )}
                </header>

                <div className="diy-detail-layout">
                  <aside className="diy-materials-panel">
                    <span className="diy-section-eyebrow">SEBELUM MEMULAI</span>
                    <h2>Bahan dan alat</h2>
                    <p>Siapkan beberapa bahan berikut untuk membuat kreasi ini.</p>
                    {selectedKreasi.alatBahan?.length ? (
                      <ul className="diy-materials-list">
                        {selectedKreasi.alatBahan.map((item) => (
                          <li key={item}><Check size={16} /> {item}</li>
                        ))}
                      </ul>
                    ) : (
                      <p className="diy-detail-empty">Daftar bahan belum tersedia.</p>
                    )}
                  </aside>

                  <section className="diy-steps-panel">
                    <span className="diy-section-eyebrow">PANDUAN PRAKTIS</span>
                    <h2>Langkah pembuatan</h2>
                    {selectedKreasi.langkah?.length ? (
                      <ol className="diy-steps-list">
                        {selectedKreasi.langkah.map((langkah, index) => (
                          <li className="diy-step" key={`${langkah.step}-${langkah.judulStep}`}>
                            <span className="diy-step-number">{String(index + 1).padStart(2, '0')}</span>
                            <div>
                              <h3>{langkah.judulStep}</h3>
                              <p>{langkah.deskripsiStep}</p>
                            </div>
                          </li>
                        ))}
                      </ol>
                    ) : (
                      <p className="diy-detail-empty">Langkah pembuatan belum tersedia.</p>
                    )}

                    <section className="diy-video-panel">
                      <div className="diy-video-heading">
                        <span className="diy-video-icon"><PlayCircle size={21} /></span>
                        <div>
                          <span className="diy-section-eyebrow">LANJUTKAN DENGAN VIDEO</span>
                          <h2>Video panduan YouTube</h2>
                        </div>
                      </div>
                      {selectedYoutube ? (
                        <>
                          <div className="diy-video-frame">
                            <iframe
                              src={selectedYoutube.embedUrl}
                              title={`Video panduan YouTube: ${selectedKreasi.judul}`}
                              loading="lazy"
                              referrerPolicy="strict-origin-when-cross-origin"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                              allowFullScreen
                            />
                          </div>
                          <a
                            className="diy-youtube-link"
                            href={selectedYoutube.watchUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Buka video di YouTube <ExternalLink size={16} />
                          </a>
                        </>
                      ) : (
                        <p className="diy-detail-empty">Video YouTube untuk panduan ini belum tersedia.</p>
                      )}
                    </section>
                  </section>
                </div>
              </div>
            </main>
          )}
          {activeTab === 'about' && (
            <Tentang setActiveTab={setActiveTab} />
          )}
          {activeTab === 'contact' && (
            <Kontak />
          )}
          <Footer setActiveTab={setActiveTab} />
        </>
      )}
    </>
  );
}

export default App;