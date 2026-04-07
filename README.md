# Devie Honda - E-Catalog

E-catalog untuk menampilkan produk motor Honda dengan desain simple dan elegan.

## URLs Penting

- **Home**: http://localhost:3000/
- **Products**: http://localhost:3000/products
- **Blog**: http://localhost:3000/blog
- **Admin CMS**: http://localhost:3000/admin
  - Password: `hondaadmin123`
- **WhatsApp**: +62 822-3306-0075

## Cara Menjalankan

```bash
npm run dev
```

## Fitur

- **Home**: Hero section, kategori motor, motor重点工作, why choose us, CTA WhatsApp
- **Products**: Filter berdasarkan kategori (Sport, Scooter, Matic, Bebek), search
- **Product Detail**: Spesifikasi, fitur, tombol WhatsApp
- **Blog**: Artikel tips, review, dan berita motor Honda
- **Admin CMS**: Tambah/Edit/Hapus produk (termasuk kategori), edit konten situs

## SEO

- Meta tags untuk Google dan social media
- Open Graph untuk share ke sosial media
- Structured data untuk produk dan blog

## Deploy ke Vercel

1. Push ke GitHub
2. Import project di Vercel
3. Deploy

## Catatan

- Data tersimpan di `src/data/products.json` dan `src/data/blog.json` (tanpa database)
- Perubahan di admin akan hilang saat redeploy (belum menggunakan database)
- Gambar menggunakan placeholder dari Unsplash - untuk production disarankan download dan simpan di `public/images/`