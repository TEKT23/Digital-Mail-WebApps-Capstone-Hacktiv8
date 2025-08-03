# Digital Mail WebApps Capstone Hacktiv8

Sistem manajemen surat digital yang efisien dan terintegrasi dengan AI Assistant.

## Deskripsi Proyek

Aplikasi web ini adalah sistem manajemen surat digital yang dirancang untuk mempermudah alur kerja administrasi dokumen di lingkungan perkantoran. Sistem ini mendukung tiga peran pengguna utama: **Bagian Umum**, **ADC (Ajudan Direktur Utama)**, dan **Direktur**. Setiap peran memiliki dashboard dan hak akses yang disesuaikan untuk mengelola surat masuk, surat keluar, disposisi, dan persetujuan.

Fitur unggulan dari aplikasi ini adalah integrasi **AI Assistant** yang menggunakan model bahasa IBM Granite. Asisten AI ini bertujuan untuk memberikan panduan, informasi, dan bantuan kontekstual kepada pengguna, membuat sistem lebih mudah digunakan dan lebih produktif.

---

## Teknologi yang Digunakan

Aplikasi ini dibangun menggunakan tumpukan teknologi modern untuk performa dan pengalaman pengguna yang optimal.

* **Frontend Framework**: Next.js
* **Styling**: Tailwind CSS
* **UI Components**: Shadcn/ui (berbagai komponen seperti `Dialog`, `Card`, `Button`, `Table`, dll. digunakan)
* **Icon Library**: Lucide React
* **State Management**: React Context (`SuratContext.tsx`)
* **AI Integration**: Replicate API, menggunakan model `ibm-granite/granite-3.3-8b-instruct`
* **Deployment**: Vercel (karena menggunakan Next.js)
* **Database**: Tidak ada database backend; data disimulasikan menggunakan data lokal (misalnya, `data/suratMasuk.ts`)

---

## Fitur Utama

* **Manajemen Surat Berbasis Peran**: Menyediakan dashboard dan antarmuka yang disesuaikan untuk **Bagian Umum**, **ADC**, dan **Direktur**.
* **Surat Masuk**: Mengelola dan melacak surat yang diterima, dengan fitur untuk mengubah status, melakukan disposisi, dan melihat riwayat surat.
* **Surat Keluar**: Memungkinkan pembuatan, pengiriman, dan pelacakan surat keluar dari status `draft` hingga `sent`.
* **Alur Kerja Dokumen**: Dokumen dapat didisposisi dari satu pengguna ke pengguna lain sesuai alur kerja yang telah ditentukan.
* **Pencatatan Riwayat Status**: Setiap dokumen memiliki riwayat status yang lengkap, mencakup siapa yang melakukan aksi, kapan, dan catatan terkait.
* **AI Assistant Interaktif**: Asisten AI yang terintegrasi di seluruh aplikasi untuk membantu pengguna dengan pertanyaan tentang cara penggunaan, alur kerja, dan fitur sistem.
* **Buku Alamat Digital**: Halaman khusus untuk mencari dan mengelola kontak internal di berbagai departemen.

---

## Cara Melakukan Setup

Untuk menjalankan proyek ini di lingkungan lokal Anda, ikuti langkah-langkah berikut:

1.  **Clone Repositori**
    ```bash
    git clone [https://github.com/TEKT23/Digital-Mail-WebApps-Capstone-Hacktiv8.git](https://github.com/TEKT23/Digital-Mail-WebApps-Capstone-Hacktiv8.git)
    cd Digital-Mail-WebApps-Capstone-Hacktiv8
    ```

2.  **Instal Dependensi**
    Pastikan Anda memiliki Node.js terinstal. Jalankan perintah ini untuk menginstal semua paket yang diperlukan:
    ```bash
    npm install
    ```

3.  **Konfigurasi Lingkungan (Environment)**
    Aplikasi ini menggunakan Replicate API untuk fungsionalitas AI. Anda perlu membuat file `.env.local` di direktori root proyek dan menambahkan token API Anda.
    ```bash
    # File: .env.local
    REPLICATE_API_TOKEN=your_replicate_api_token_here
    ```

4.  **Jalankan Aplikasi**
    Jalankan server pengembangan dengan perintah:
    ```bash
    npm run dev
    ```
    Aplikasi akan berjalan di `http://localhost:3000`.

---

## Penjelasan Dukungan AI

Proyek ini terintegrasi dengan **IBM Granite Model** yang diakses melalui Replicate API. Fitur AI Assistant dirancang untuk memberikan pengalaman pengguna yang lebih intuitif dengan menyediakan bantuan kontekstual secara real-time.

Ketika pengguna mengajukan pertanyaan di chat, pertanyaan tersebut dikirim ke API Replicate yang menjalankan model IBM Granite. Model ini telah diberikan konteks khusus mengenai struktur dan fitur aplikasi (seperti peran pengguna, manajemen surat, dan alur kerja) untuk memastikan jawabannya relevan dan akurat.

Tujuan utama AI adalah untuk:
* Memberikan panduan langkah-demi-langkah tentang cara menggunakan fitur tertentu.
* Menjelaskan konsep-konsep seperti alur disposisi atau dashboard masing-masing peran.
* Menjawab pertanyaan umum seputar sistem secara profesional dan efisien.

Jika API mengalami kegagalan, sistem memiliki respons cadangan (fallback response) yang telah disiapkan untuk tetap memberikan informasi dasar yang bermanfaat kepada pengguna.
