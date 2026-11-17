import React, { useState } from 'react';
import { ArrowRight, Leaf, Mail, MessageCircle, Send } from 'lucide-react';

export default function Kontak() {
    const [formValues, setFormValues] = useState({
        nama: '',
        email: '',
        topik: 'Pertanyaan umum',
        pesan: ''
    });
    const [emailDraft, setEmailDraft] = useState('');

    const updateField = (field, value) => {
        setFormValues((current) => ({ ...current, [field]: value }));
        setEmailDraft('');
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const subject = `[EcoCraft] ${formValues.topik}`;
        const body = [
            `Nama: ${formValues.nama}`,
            `Email: ${formValues.email}`,
            '',
            formValues.pesan
        ].join('\n');
        setEmailDraft(`mailto:halo@ecocraft.id?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`);
    };

    return (
        <main className="contact-page">
            <section className="contact-hero">
                <div className="contact-hero-inner">
                    <span className="contact-eyebrow"><Leaf size={16} /> Kami siap mendengar</span>
                    <h1>Mari mulai <span>percakapan baik</span></h1>
                    <p>
                        Punya pertanyaan, ide tutorial, atau ingin berkolaborasi? Ceritakan
                        kepada kami—setiap langkah kecil bisa membawa dampak baik.
                    </p>
                </div>
            </section>

            <section className="contact-content section-wrapper">
                <div className="contact-info">
                    <span className="articles-section-label">TERHUBUNG DENGAN ECOCRAFT</span>
                    <h2>Ruang untuk ide dan kolaborasi.</h2>
                    <p>
                        Kami terbuka untuk pertanyaan seputar kreasi daur ulang, usulan
                        konten, dan kerja sama yang mendukung gaya hidup lebih lestari.
                    </p>
                    <a className="contact-email-card" href="mailto:halo@ecocraft.id">
                        <span className="contact-icon"><Mail size={21} /></span>
                        <span>
                            <small>Kirim email langsung</small>
                            <strong>halo@ecocraft.id</strong>
                        </span>
                        <ArrowRight size={18} />
                    </a>
                    <div className="contact-note">
                        <MessageCircle size={19} />
                        <p>Form ini menyiapkan pesan melalui aplikasi email di perangkat Anda. Pesan tidak dikirim atau disimpan oleh situs.</p>
                    </div>
                </div>

                <form className="contact-form" onSubmit={handleSubmit}>
                    <div className="contact-form-heading">
                        <span><Send size={17} /> Tulis pesan</span>
                        <h2>Ada yang ingin disampaikan?</h2>
                    </div>
                    <div className="contact-form-row">
                        <div className="contact-field">
                            <label htmlFor="contact-name">Nama</label>
                            <input
                                id="contact-name"
                                value={formValues.nama}
                                onChange={(event) => updateField('nama', event.target.value)}
                                autoComplete="name"
                                required
                            />
                        </div>
                        <div className="contact-field">
                            <label htmlFor="contact-email">Email</label>
                            <input
                                id="contact-email"
                                type="email"
                                value={formValues.email}
                                onChange={(event) => updateField('email', event.target.value)}
                                autoComplete="email"
                                required
                            />
                        </div>
                    </div>
                    <div className="contact-field">
                        <label htmlFor="contact-topic">Topik</label>
                        <select
                            id="contact-topic"
                            value={formValues.topik}
                            onChange={(event) => updateField('topik', event.target.value)}
                        >
                            <option>Pertanyaan umum</option>
                            <option>Usulan artikel atau tutorial</option>
                            <option>Kolaborasi</option>
                            <option>Masukan untuk website</option>
                        </select>
                    </div>
                    <div className="contact-field">
                        <label htmlFor="contact-message">Pesan</label>
                        <textarea
                            id="contact-message"
                            rows="5"
                            value={formValues.pesan}
                            onChange={(event) => updateField('pesan', event.target.value)}
                            placeholder="Ceritakan pesan atau ide Anda..."
                            required
                        />
                    </div>
                    <button type="submit" className="btn-primary contact-submit">
                        Siapkan email <ArrowRight size={17} />
                    </button>
                    {emailDraft && (
                        <p className="contact-draft-message" role="status">
                            Pesan siap. <a href={emailDraft}>Klik di sini untuk membuka aplikasi email.</a>
                        </p>
                    )}
                </form>
            </section>
        </main>
    );
}
