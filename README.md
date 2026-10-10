# Portofolio Bevlin Logen

Website portofolio statis. Isinya HTML, CSS, dan JavaScript biasa, jadi tidak perlu install apa pun dan tidak ada proses build.

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
| Foto profil | `person.avatar`, isi dengan path gambar, misalnya `"assets/foto.jpg"` |
| Link GitHub, LinkedIn, Kaggle, CV | `person.links`, isi `url`. Tombol dengan `url` kosong otomatis disembunyikan |
| Paragraf perkenalan | `about.en` dan `about.id` |
| Kartu keahlian | `skills` |
| Proyek di bagian Karya | `projects` |
| Timeline di bagian Catatan | `notebook` |
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
js/main.js      render halaman, ganti bahasa, dialog, timeline, form
```
