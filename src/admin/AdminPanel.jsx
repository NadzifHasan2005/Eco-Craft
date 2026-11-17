import React, { useState } from 'react';
import { BarChart3, FileText, LogOut, Scissors } from 'lucide-react';
import AdminArtikel from './AdminArtikel.jsx';
import AdminDashboard from './AdminDashboard.jsx';
import AdminKatalog from './AdminKatalog.jsx';
import './AdminDashboard.css';

const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'katalog', label: 'Katalog DIY', icon: Scissors },
    { id: 'artikel', label: 'Artikel', icon: FileText }
];

export default function AdminPanel({ tutorials, setTutorials, articles, setArticles, onLogout }) {
    const [activeMenu, setActiveMenu] = useState('dashboard');

    return (
        <div className="admin-layout">
            <aside className="admin-sidebar">
                <div className="sidebar-brand">
                    <h2>EcoCraft Admin</h2>
                </div>
                <nav className="sidebar-menu" aria-label="Menu admin">
                    {menuItems.map((item) => {
                        const Icon = item.icon;
                        return (
                            <button
                                type="button"
                                key={item.id}
                                className={`menu-item ${activeMenu === item.id ? 'active' : ''}`}
                                onClick={() => setActiveMenu(item.id)}
                                aria-current={activeMenu === item.id ? 'page' : undefined}
                            >
                                <Icon size={18} /> {item.label}
                            </button>
                        );
                    })}
                </nav>
                <button type="button" className="btn-logout" onClick={onLogout}>
                    <LogOut size={18} /> Keluar
                </button>
            </aside>

            <main className="admin-main">
                {activeMenu === 'dashboard' && (
                    <AdminDashboard
                        tutorials={tutorials}
                        articles={articles}
                        onNavigate={setActiveMenu}
                    />
                )}
                {activeMenu === 'katalog' && (
                    <AdminKatalog tutorials={tutorials} setTutorials={setTutorials} />
                )}
                {activeMenu === 'artikel' && (
                    <AdminArtikel articles={articles} setArticles={setArticles} />
                )}
            </main>
        </div>
    );
}
