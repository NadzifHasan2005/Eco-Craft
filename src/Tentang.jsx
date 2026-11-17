import React from 'react';
import { ArrowRight, BookOpen, Leaf, Recycle, Users } from 'lucide-react';

const misiEcoCraft = [
    {
        icon: Recycle,
        judul: 'Menghidupkan kembali barang bekas',
        deskripsi: 'Membagikan ide praktis agar material yang masih berguna tidak langsung berakhir sebagai sampah.'
    },
    {
        icon: BookOpen,
        judul: 'Belajar lewat panduan yang mudah',
        deskripsi: 'Menyediakan langkah DIY yang jelas, inspiratif, dan dapat dicoba dengan bahan di sekitar.'
    },
    {
        icon: Users,
        judul: 'Tumbuh bersama komunitas',
        deskripsi: 'Mendorong orang untuk berbagi kreativitas dan membangun kebiasaan yang lebih ramah lingkungan.'
    }
];

export default function Tentang({ setActiveTab }) {
    return (
        <main className="about-page">
            <header className="about-hero">
                <span className="about-eyebrow"><Leaf size={16} /> Tentang EcoCraft</span>
                <h1>Kreativitas kecil,<br /><span>dampak yang berarti.</span></h1>
                <p>
                    EcoCraft adalah ruang inspirasi untuk mengubah barang bekas menjadi
                    kreasi yang berguna. Kami percaya kebiasaan berkelanjutan bisa dimulai
                    dari rumah—dengan ide sederhana dan kemauan untuk mencoba.
                </p>
                <button type="button" className="btn-primary" onClick={() => setActiveTab('katalog')}>
                    Mulai berkreasi <ArrowRight size={17} />
                </button>
                <div className="about-hero-art" aria-hidden="true"><Recycle size={150} strokeWidth={1} /></div>
            </header>

            <section className="about-vision section-wrapper">
                <div className="about-vision-icon"><Leaf size={28} /></div>
                <span className="about-section-label">ARAH YANG KAMI TUJU</span>
                <h2>Visi EcoCraft</h2>
                <p>
                    Menjadi ruang belajar dan inspirasi yang membantu masyarakat
                    memandang barang bekas sebagai sumber daya, serta menjadikan
                    kreativitas dan kepedulian lingkungan bagian dari keseharian.
                </p>
            </section>

            <section className="about-mission-section">
                <div className="section-wrapper">
                    <div className="about-mission-heading">
                        <span className="about-section-label">LANGKAH NYATA KAMI</span>
                        <h2>Misi EcoCraft</h2>
                        <p>Yang kami lakukan untuk mendekatkan ide baik dengan aksi sehari-hari.</p>
                    </div>
                    <div className="about-mission-grid">
                        {misiEcoCraft.map((misi, index) => {
                            const Icon = misi.icon;
                            return (
                                <article className="about-mission-card" key={misi.judul}>
                                    <div className="about-mission-card-top">
                                        <span>0{index + 1}</span>
                                        <Icon size={23} />
                                    </div>
                                    <h3>{misi.judul}</h3>
                                    <p>{misi.deskripsi}</p>
                                </article>
                            );
                        })}
                    </div>
                </div>
            </section>

            <section className="about-closing section-wrapper">
                <div>
                    <span className="about-section-label">MULAI DARI RUMAH</span>
                    <h2>Satu barang yang digunakan kembali adalah langkah yang berarti.</h2>
                </div>
                <button type="button" className="btn-primary" onClick={() => setActiveTab('katalog')}>
                    Lihat ide DIY <ArrowRight size={17} />
                </button>
            </section>
        </main>
    );
}
