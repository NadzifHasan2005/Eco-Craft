import React from 'react';
import { FileText, LayoutDashboard, Plus, Scissors } from 'lucide-react';

export default function AdminDashboard({ tutorials, articles, onNavigate }) {
    const categoryCount = new Set(tutorials.map((item) => item.kategori).filter(Boolean)).size;

    return (
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
                    <div><h3>Kategori DIY</h3><p className="stat-value">{categoryCount}</p></div>
                </div>
            </div>
            <div className="summary-box">
                <h2>Kelola Konten EcoCraft</h2>
                <p>Konten disimpan di browser ini. Pilih bagian yang ingin dikelola untuk menambahkan, mengedit, atau menghapus konten.</p>
                <div className="dashboard-actions">
                    <button type="button" className="btn-submit" onClick={() => onNavigate('katalog')}>
                        <Plus size={17} /> Kelola Tutorial DIY
                    </button>
                    <button type="button" className="btn-submit" onClick={() => onNavigate('artikel')}>
                        <Plus size={17} /> Kelola Artikel
                    </button>
                </div>
            </div>
        </section>
    );
}
