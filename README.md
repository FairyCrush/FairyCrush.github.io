# Portofolio Bevlin Logen

Website portofolio statis. Isinya HTML, CSS, dan JavaScript biasa, jadi tidak perlu install apa pun dan tidak ada proses build.

Scroll halus memakai Lenis dari CDN (dengan hash SRI). Kalau CDN tidak bisa diakses, websitenya tetap jalan dengan scroll biasa. Font: Newsreader, Archivo, dan DM Mono dari Google Fonts.

## Cara membuka

Klik dua kali `index.html`, atau jalankan server lokal supaya font dan semua fitur jalan normal:

```
python -m http.server 8765
```

Lalu buka `http://localhost:8765`.

## Mengubah isi

Semua teks dan angka ada di `js/content.js`. File lain tidak perlu disentuh untuk urusan isi.

| Yang mau diubah | Lokasi di `content.js` |
| --- | --- |
| Nama, email, peran | `person` |
| Link GitHub, LinkedIn, Kaggle, CV | `person.links`, isi `url`. Tombol dengan `url` kosong otomatis disembunyikan |
| Paragraf perkenalan | `about.lead` dan `about.body` |
| Baris "Sekarang" | `now` |
| Daftar keahlian | `skills` |
| Proyek di bagian Karya | `projects`, yang `featured: true` tampil sebagai Gbr. 1 sampai 4 |
| Log di bagian Catatan | `notebook` |
| Teks tombol dan label | `ui.en` dan `ui.id` |

Setiap teks punya versi `en` dan `id`. Kalau salah satunya diubah, ubah juga pasangannya.

Thumbnail proyek digambar dari field `viz`. Jenis yang tersedia: `registry`, `slope`, `compare`, `ladder`, `matrix`, `glyphs`, `pairs`, `dumbbell`, `tree`. Angka di dalam `viz` sebaiknya sama dengan angka di `metrics`.

## Deploy

- GitHub Pages: push folder ini ke repo, lalu aktifkan Pages dari branch utama.
- Netlify: seret folder ini ke halaman Netlify Drop.

## Struktur

```
index.html
css/style.css
js/content.js   data dan teks
js/viz.js       generator grafik thumbnail
js/hero.js      batu karang dari titik data di bagian atas
js/map.js       peta titik Indonesia di bagian kontak
js/main.js      render halaman, ganti bahasa, dialog, catatan, salin email
js/motion.js    smooth scroll, reveal saat scroll, parallax hero
```
