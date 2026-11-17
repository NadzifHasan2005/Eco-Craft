import React from 'react';
import { ArrowUpRight, Leaf, Mail } from 'lucide-react';
import ecoCraftLogo from './assets/ecocraft-logo.png';

const currentYear = new Date().getFullYear();

const footerLinks = [
    { id: 'home', label: 'Beranda' },
    { id: 'katalog', label: 'Katalog DIY' },
    { id: 'artikel', label: 'Artikel' },
    { id: 'about', label: 'Tentang Kami' },
    { id: 'contact', label: 'Kontak' },
];

export default function Footer({ setActiveTab }) {
    const handleLinkClick = (id) => {
        setActiveTab(id);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <footer className="site-footer">
            <div className="footer-content">
                <div className="footer-main">
                    <div className="footer-brand">
                        <img src={ecoCraftLogo} alt="EcoCraft" className="footer-logo" />
                        <p>
                            Ubah barang bekas menjadi kreasi berdaya guna. Mulai langkah
                            kecil untuk bumi yang lebih lestari bersama EcoCraft.
                        </p>
                    </div>

                    <nav className="footer-navigation" aria-label="Navigasi footer">
                        <h2>Jelajahi</h2>
                        {footerLinks.map((link) => (
                            <button
                                key={link.id}
                                type="button"
                                onClick={() => handleLinkClick(link.id)}
                                className="footer-link"
                            >
                                {link.label}
                                <ArrowUpRight size={14} aria-hidden="true" />
                            </button>
                        ))}
                    </nav>

                    <div className="footer-contact">
                        <h2>Mari Terhubung</h2>
                        <p>Punya ide kreasi atau pertanyaan? Kami senang mendengarnya.</p>
                        <a href="mailto:halo@ecocraft.id">
                            <Mail size={17} aria-hidden="true" />
                            halo@ecocraft.id
                        </a>
                    </div>
                </div>

                <div className="footer-bottom">
                    <span>
                        <Leaf size={15} aria-hidden="true" />
                        © {currentYear} EcoCraft. Berkarya lebih bijak untuk bumi.
                    </span>
                    <span className="footer-made-with">Dibuat dengan semangat daur ulang</span>
                </div>
            </div>
        </footer>
    );
}
