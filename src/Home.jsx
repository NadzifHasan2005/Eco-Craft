import React, { useState } from 'react';
import { 
    Leaf, 
    Package, 
    Sparkles, 
    Award, 
    ArrowRight, 
    Clock, 
    Calculator,
    Recycle
} from 'lucide-react';


export default function Home({ kreasiData, setActiveTab, onSelectKreasi }) {
    // State untuk Kalkulator Karbon Sederhana
    const [botolPlastik, setBotolPlastik] = useState(2);
    const [kardusBekas, setKardusBekas] = useState(1);

    // Perkiraan emisi CO2 hemat (gram) per item yang didaur ulang
    const totalKarbonTerselamatkan = (botolPlastik * 80 + kardusBekas * 150).toFixed(0);
    const jumlahTutorial = kreasiData?.length ?? 0;
    const jumlahKategori = new Set((kreasiData ?? []).map((item) => item.kategori).filter(Boolean)).size;

    const kategoriList = [
        { nama: 'Plastik', icon: Package, desc: 'Botol, kemasan, & tempat makanan' },
        { nama: 'Kardus & Kertas', icon: Leaf, desc: 'Kotak sepatu, majalah, & koran' },
        { nama: 'Tekstil', icon: Sparkles, desc: 'Kaos bekas, kain perca, & pakaian' },
        { nama: 'Kayu / Paralon', icon: Award, desc: 'Potongan sisa kayu & pipa PVC' },
    ];

    return (
        <div className="home-container">
        {/* 1. HERO SECTION */}
            <section className="hero-section">
                <div className="hero-grid">
                    <div>
                        <h1 className="hero-title">
                            Eco <span>Craft </span>
                        </h1>
                        <p className="hero-subtitle">
                            Ubah Barang Bekas Menjadi Kreasi Berdaya Guna
                        </p>
                        <p className="hero-description">
                            Temukan inspirasi, ikuti panduan DIY, dan mulai kebiasaan
                            ramah lingkungan dari rumah.
                        </p>
                        <div className="hero-actions">
                            <button 
                                onClick={() => setActiveTab('katalog')} 
                                className="btn-primary"
                            >
                                Jelajahi Katalog DIY
                                <ArrowRight size={18} />
                            </button>
                            <button 
                                onClick={() => setActiveTab('about')} 
                                className="btn-secondary-outline"
                            >
                                Tentang EcoCraft
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            <section className="home-intro section-wrapper">
                <div className="home-intro-copy">
                    <span className="home-intro-eyebrow"><Leaf size={16} /> Kenalan dengan EcoCraft</span>
                    <h2>Barang bekas bukan akhir cerita—bisa jadi awal kreasi baru.</h2>
                    <p>
                        EcoCraft adalah ruang inspirasi untuk mengubah barang yang sering
                        dianggap sampah menjadi karya yang berguna. Kami menyajikan
                        panduan DIY yang mudah diikuti, ide berdasarkan bahan, dan cara
                        sederhana untuk melihat dampak kebiasaan daur ulangmu.
                    </p>
                    <button type="button" className="home-intro-link" onClick={() => setActiveTab('about')}>
                        Kenali misi kami <ArrowRight size={16} />
                    </button>
                </div>
                <div className="home-intro-visual">
                    <div className="home-intro-art"><Recycle size={54} strokeWidth={1.5} /></div>
                    <div className="home-intro-stat-grid">
                        <div className="home-intro-stat">
                            <strong>{jumlahTutorial}</strong>
                            <span>ide kreasi DIY</span>
                        </div>
                        <div className="home-intro-stat">
                            <strong>{jumlahKategori}</strong>
                            <span>kategori bahan</span>
                        </div>
                    </div>
                    <p>Mulai dari satu barang. Lanjutkan dengan satu kebiasaan baik.</p>
                </div>
            </section>

        {/* 2. KATEGORI BAHAN BEKAS */}
            <section className="section-wrapper">
                <h2 className="section-title">Pilih Berdasarkan Bahan Bekas</h2>
                <p className="section-subtitle">Mulai berkreasi dari barang-barang yang sudah ada di rumahmu</p>
                
                <div className="kategori-grid">
                {kategoriList.map((kat, idx) => {
                    const Icon = kat.icon;
                    return (
                    <div 
                        key={idx} 
                        onClick={() => setActiveTab('katalog')} 
                        className="kategori-card"
                    >
                        <div className="kategori-icon-box">
                        <Icon size={28} />
                        </div>
                        <h3 className="kategori-card-title">{kat.nama}</h3>
                        <p className="kategori-card-desc">{kat.desc}</p>
                    </div>
                    );
                })}
                </div>
            </section>

            {/* 3. KREASI POPULER (FEATURED DIY) */}
            <section className="section-wrapper" style={{ paddingTop: 0 }}>
                <h2 className="section-title">Kreasi DIY Populer</h2>
                <p className="section-subtitle">Proyek favorit yang paling banyak dicoba minggu ini</p>

                <div className="featured-grid">
                {kreasiData?.slice(0, 3).map((diy) => (
                    <div key={diy.id} className="diy-card">
                    <div className="diy-card-img-wrapper">
                        <img src={diy.thumbnail} alt={diy.judul} className="diy-card-img" />
                        <span className="diy-badge-kategori">{diy.kategori}</span>
                        <span className="diy-badge-waktu">
                        <Clock size={12} /> {diy.waktu}
                        </span>
                    </div>
                    <div className="diy-card-body">
                        <h3 className="diy-card-title">{diy.judul}</h3>
                        <p className="diy-card-desc">{diy.deskripsi}</p>
                        
                        <div className="diy-card-footer">
                        <span className="diy-difficulty">Level: {diy.kesulitan}</span>
                        <button 
                            onClick={() => onSelectKreasi(diy)} 
                            className="btn-detail"
                        >
                            Lihat Cara <ArrowRight size={14} />
                        </button>
                        </div>
                    </div>
                    </div>
                ))}
                </div>
            </section>

            {/* 4. WIDGET INTERAKTIF: KALKULATOR JEJAK KARBON */}
            <section className="section-wrapper">
                <div className="calculator-box">
                <div className="calculator-grid">
                    <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#52B788', fontWeight: 700, marginBottom: '8px' }}>
                        <Calculator size={20} />
                        <span>Kalkulator Dampak Lingkungan</span>
                    </div>
                    <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#F4F1DE', marginBottom: '1rem' }}>
                        Hitung Dampak Daur Ulangmu
                    </h2>
                    <p style={{ color: 'rgba(244,241,222,0.8)', fontSize: '0.95rem', marginBottom: '1.5rem', lineHeight: 1.5 }}>
                        Masukkan jumlah barang bekas yang kamu olah kembali untuk melihat perkiraan emisi Karbon (CO2) yang berhasil dicegah!
                    </p>

                    <div className="calc-input-group">
                        <label className="calc-label">Jumlah Botol Plastik Bekas (buah)</label>
                        <input 
                        type="number" 
                        min="0"
                        value={botolPlastik} 
                        onChange={(e) => setBotolPlastik(Math.max(0, parseInt(e.target.value) || 0))}
                        className="calc-input" 
                        />
                    </div>

                    <div className="calc-input-group">
                        <label className="calc-label">Jumlah Kardus Bekas (lembar/kotak)</label>
                        <input 
                        type="number" 
                        min="0"
                        value={kardusBekas} 
                        onChange={(e) => setKardusBekas(Math.max(0, parseInt(e.target.value) || 0))}
                        className="calc-input" 
                        />
                    </div>
                    </div>

                    <div className="calc-result-card">
                    <span style={{ fontSize: '0.875rem', fontWeight: 600, color: '#D8F3DC' }}>
                        Estimasi Emisi CO2 Dicegah:
                    </span>
                    <div className="calc-result-number">{totalKarbonTerselamatkan} g</div>
                    <span style={{ fontSize: '0.875rem', color: '#F4F1DE', opacity: 0.9 }}>
                        Setara dengan menanam 1 bibit pohon kecil! 🌱
                    </span>
                    </div>
                </div>
                </div>
            </section>

        </div>
    );
}