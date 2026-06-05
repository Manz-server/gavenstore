# 🚀 Gaven Store - React Vite TypeScript (Cloudflare Pages Ready)

Project ini merupakan aplikasi berbasis **React 19**, **Vite (TypeScript)**, dan **Tailwind CSS v4** yang sepenuhnya optimal dan siap untuk di-deploy ke **Cloudflare Pages** sebagai Single Page Application (SPA) berkinerja tinggi.

---

## 🛠️ Persiapan & Fitur Deployment

Aplikasi ini telah dikonfigurasi dengan:
1. **SPA Router Redirects (`/public/_redirects`)**: Menjamin agar ketika pengguna melakukan refresh halaman di URL mana pun (misalnya sub-halaman/routing), Cloudflare akan mengarahkannya kembali ke `index.html` dan membiarkan React router menangani navigasi tanpa memicu error 404.
2. **Standard Vite Build**: File output diletakkan di folder `/dist` yang terkompresi dan siap dikirim melalui Cloudflare CDN secara instan.

---

## 💻 Cara Menjalankan Secara Lokal

1. **Install Dependensi:**
   ```bash
   npm install
   ```

2. **Jalankan Server Development:**
   ```bash
   npm run dev
   ```
   Aplikasi akan berjalan di `http://localhost:3000` (atau port default yang tersedia).

3. **Lakukan Build Uji Coba:**
   ```bash
   npm run build
   ```
   Ini akan merakit kode Anda ke dalam folder `dist/` untuk memastikan tidak ada kesalahan kompilasi tipe data TypeScript sebelum di-upload ke Cloudflare.

---

## ☁️ Langkah-Langkah Deploy ke Cloudflare Pages

Ikuti langkah mudah berikut untuk mempublikasikannya secara online:

### Metode A: Melalui Hubungan Git (Otomatis & Direkomendasikan)
1. Commit dan push proyek ini ke repositori **GitHub** atau **GitLab** Anda.
2. Buka dashboard [Cloudflare](https://dash.cloudflare.com/) Anda dan masuk ke menu **Workers & Pages**.
3. Klik tombol **Create** -> pilih tab **Pages** -> klik **Connect to Git**.
4. Pilih repositori proyek Anda.
5. Pada bagian **Set up builds and deployments**, konfigurasikan setelan berikut:
   - **Framework preset:** `Vite` (atau pilih `None`)
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
6. Klik **Save and Deploy**. Cloudflare akan secara otomatis membangun aplikasi Anda dan memberikan subdomain `.pages.dev` gratis yang dilengkapi SSL! Setiap kali Anda membuat commit baru ke cabang utama, Cloudflare akan melakukan auto-update secara otomatis.

### Metode B: Melalui CLI Wrangler (Manual / Tanpa Git)
Jika Anda ingin men-deploy langsung tanpa menghubungkan ke repositori Git:
1. Install Wrangler CLI secara global atau jalankan langsung dengan npx:
   ```bash
   npx wrangler pages deploy dist
   ```
2. Ikuti instruksi masuk ke akun Cloudflare Anda melalui terminal, lalu buat proyek Pages baru dan tunggu hingga proses unggah selesai.

---

## 📦 Informasi Struktur Folder
- `src/` - Folder berisi semua kode sumber React (Komponen toko, setelan admin, tipe data, dan aset).
- `public/` - Folder berisi file statis yang disalin langsung ke folder build tujuan (termasuk instruksi redirect `_redirects`).
- `vite.config.ts` - Konfigurasi compiler Vite yang telah disesuaikan agar performa maksimal dan efisien.
