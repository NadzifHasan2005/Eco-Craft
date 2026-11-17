import React, { useState } from 'react';
import { Menu, X, LayoutDashboard, Home, BookOpen, Info, Mail, Newspaper } from 'lucide-react';

import ecoCraftLogo from './assets/ecoCraft-logo.png';

export default function Navigation({ activeTab, setActiveTab, isAdmin, setIsAdmin }) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const navItems = [
        { id: 'home', label: 'Beranda', icon: Home },
        { id: 'katalog', label: 'Katalog DIY', icon: BookOpen },
        { id: 'artikel', label: 'Artikel', icon: Newspaper },
        { id: 'about', label: 'Tentang Kami', icon: Info },
        { id: 'contact', label: 'Kontak', icon: Mail },
    ];

    const handleNavClick = (id) => {
        setActiveTab(id);
        setIsMobileMenuOpen(false);
    };

    const toggleAdmin = () => {
        setIsAdmin(!isAdmin);
        setIsMobileMenuOpen(false);
    };

    return (
        <nav className="navbar-container" aria-label="Navigasi utama">
            <div className="navbar-wrapper">
                <div className="navbar-content">
                    <button
                        type="button"
                        onClick={() => handleNavClick('home')}
                        className="brand-logo-container"
                        aria-label="EcoCraft, kembali ke Beranda"
                    >
                        <img src={ecoCraftLogo} alt="EcoCraft" width="150" />
                    </button>

                    {!isAdmin && (
                        <div className="desktop-nav-menu">
                            {navItems.map((item) => {
                                const Icon = item.icon;
                                const isActive = activeTab === item.id || (item.id === 'katalog' && activeTab === 'detail');
                                return (
                                    <button
                                        key={item.id}
                                        type="button"
                                        onClick={() => handleNavClick(item.id)}
                                        className={`nav-link ${isActive ? 'nav-link-active' : ''}`}
                                        aria-current={isActive ? 'page' : undefined}
                                    >
                                        <Icon size={16} />
                                        {item.label}
                                    </button>
                                );
                            })}
                        </div>
                    )}

                    <div className="admin-action-container">
                        <button
                            type="button"
                            onClick={toggleAdmin}
                            className={`btn-admin-toggle ${isAdmin ? 'btn-admin-active' : 'btn-admin-inactive'}`}
                            aria-label={isAdmin ? 'Kembali ke situs' : 'Buka panel admin'}
                        >
                            <LayoutDashboard size={16} />
                            {isAdmin ? 'Kembali ke Situs' : 'Admin'}
                        </button>
                    </div>

                    <div className="mobile-controls">
                        <button
                            type="button"
                            onClick={toggleAdmin}
                            className="btn-icon-mobile"
                            title={isAdmin ? 'Kembali ke situs' : 'Buka panel admin'}
                            aria-label={isAdmin ? 'Kembali ke situs' : 'Buka panel admin'}
                        >
                            <LayoutDashboard size={20} />
                        </button>
                        {!isAdmin && (
                            <button
                                type="button"
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                className="btn-icon-mobile"
                                aria-label={isMobileMenuOpen ? 'Tutup menu' : 'Buka menu'}
                                aria-expanded={isMobileMenuOpen}
                            >
                                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {isMobileMenuOpen && !isAdmin && (
                <div className="mobile-menu-drawer">
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = activeTab === item.id || (item.id === 'katalog' && activeTab === 'detail');
                        return (
                            <button
                                key={item.id}
                                type="button"
                                onClick={() => handleNavClick(item.id)}
                                className={`mobile-nav-link ${isActive ? 'mobile-nav-link-active' : ''}`}
                                aria-current={isActive ? 'page' : undefined}
                            >
                                <Icon size={20} />
                                {item.label}
                            </button>
                        );
                    })}
                </div>
            )}
        </nav>
    );
}
