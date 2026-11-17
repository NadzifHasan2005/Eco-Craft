# EcoCraft

EcoCraft adalah website inspirasi daur ulang yang membantu pengguna mengubah barang bekas menjadi kreasi DIY yang bermanfaat. Website menyediakan katalog tutorial, artikel lingkungan, informasi tentang EcoCraft, formulir kontak, serta panel admin untuk mengelola konten.

## Fitur

- **Katalog DIY:** cari dan filter tutorial berdasarkan bahan, lihat daftar alat dan bahan serta langkah pembuatannya.
- **Video tutorial:** pemutar dan tautan YouTube tersedia pada detail tutorial jika URL video valid.
- **Artikel:** artikel yang dibuat melalui panel admin ditampilkan pada halaman Artikel dan dapat dicari serta dibaca.
- **Tentang EcoCraft:** informasi, visi, dan misi EcoCraft.
- **Kontak:** formulir menyiapkan email melalui aplikasi email pengguna. Website belum mengirim pesan melalui backend.
- **Kalkulator dampak lingkungan:** perkiraan emisi karbon yang dicegah berdasarkan jumlah barang yang didaur ulang.
- **Panel admin:** tambah, lihat, edit, dan hapus tutorial DIY maupun artikel.

## Teknologi

- React
- Vite
- React Router
- Lucide React

## Persyaratan

- Node.js 20.19+ atau 22.12+
- npm

## Menjalankan proyek

Pasang dependensi:

```bash
npm install
```

Jalankan server pengembangan:

```bash
npm run dev
```

Buka URL yang ditampilkan Vite, biasanya `http://localhost:5173`.

Panel admin dapat dibuka langsung melalui:

```text
http://localhost:5173/admin
```

## Akun demo admin

```text
Email: admin@ecocraft.id
Password: admin123
```

> **Peringatan:** akun demo dan validasi login saat ini tertanam di kode frontend. Ini tidak aman untuk penggunaan produksi. Ganti dengan autentikasi backend sebelum dipublikasikan.

## Penyimpanan konten

Tutorial dan artikel disimpan di `localStorage` browser dengan kunci `ecocraft-content-v1`. Data hanya tersedia pada browser dan perangkat tempat konten dibuat; data tidak tersinkron ke perangkat lain atau server. Artikel yang dihapus dari browser tidak dapat dipulihkan kecuali memiliki salinan.

Saat browser belum memiliki data tersimpan, katalog dimulai dengan contoh tutorial dari `src/data/kreasiData.js`. Artikel baru dapat dibuat dari panel admin.

## Perintah npm

| Perintah | Kegunaan |
| --- | --- |
| `npm run dev` | Menjalankan server pengembangan Vite |
| `npm run build` | Membuat build produksi di folder `dist/` |
| `npm run preview` | Menjalankan pratinjau build produksi |
| `npm run lint` | Menjalankan Oxlint |

## Build dan deployment

Buat build produksi:

```bash
npm run build
```

Untuk melihat hasil build secara lokal:

```bash
npm run preview
```

Karena aplikasi menggunakan React Router, konfigurasi hosting produksi perlu mengarahkan permintaan halaman seperti `/admin` ke `index.html` agar URL tersebut tetap dapat dibuka langsung atau dimuat ulang.

## Struktur utama

```text
src/
  admin/       Halaman login dan dashboard admin
  assets/      Logo dan gambar
  data/        Data tutorial awal
  App.jsx      State aplikasi dan navigasi halaman
  Artikel.jsx  Halaman artikel
  Home.jsx     Beranda dan kalkulator dampak
  Katalog.jsx  Katalog tutorial DIY
  Kontak.jsx   Formulir kontak
  Tentang.jsx  Profil, visi, dan misi EcoCraft
```
