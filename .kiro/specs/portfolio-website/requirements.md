# Requirements Document

## Introduction

Portfolio website untuk Muhammad Ryan Hidayat, mahasiswa Teknik Informatika dari Universitas Bina Insani. Website ini berfungsi sebagai media presentasi profesional yang menampilkan profil pribadi, daftar proyek, keahlian teknis, dan informasi kontak. Dibangun dengan HTML5, CSS3, dan JavaScript vanilla agar ringan, cepat dimuat, dan mudah di-hosting secara statis (GitHub Pages, Netlify, dsb.) tanpa ketergantungan framework berat.

## Glossary

- **Website**: Aplikasi web statis portfolio Muhammad Ryan Hidayat yang berjalan di browser.
- **Visitor**: Pengguna yang mengakses Website melalui browser.
- **Hero_Section**: Bagian halaman pertama yang menampilkan nama, tagline, dan foto profil.
- **About_Section**: Bagian halaman yang menampilkan ringkasan profil dan latar belakang pendidikan.
- **Projects_Section**: Bagian halaman yang menampilkan kartu-kartu proyek beserta deskripsi dan tautannya.
- **Skills_Section**: Bagian halaman yang menampilkan daftar keahlian teknis dan non-teknis.
- **Contact_Section**: Bagian halaman yang menampilkan formulir kontak dan tautan media sosial/profil profesional.
- **Navigation**: Komponen menu navigasi yang menghubungkan setiap bagian halaman.
- **Project_Card**: Komponen UI yang merepresentasikan satu proyek dengan gambar, judul, deskripsi, tag teknologi, dan tautan.
- **Contact_Form**: Formulir HTML yang memungkinkan Visitor mengirim pesan melalui layanan pihak ketiga (misalnya Formspree).
- **Smooth_Scroll**: Perilaku animasi perpindahan halaman saat Visitor mengeklik tautan navigasi.
- **Dark_Mode**: Tema tampilan dengan skema warna gelap sebagai alternatif tema terang default.
- **Responsive_Layout**: Tata letak yang menyesuaikan diri dengan lebar layar perangkat (mobile, tablet, desktop).

---

## Requirements

### Requirement 1: Halaman Tunggal dengan Navigasi Antar Seksi

**User Story:** As a Visitor, I want to navigate between sections of the page smoothly, so that I can explore the portfolio content without full page reloads.

#### Acceptance Criteria

1. THE Website SHALL render semua konten dalam satu halaman HTML tunggal (single-page layout).
2. THE Navigation SHALL menampilkan tautan ke Hero_Section, About_Section, Projects_Section, Skills_Section, dan Contact_Section.
3. WHEN Visitor mengeklik tautan di Navigation, THE Website SHALL melakukan scroll ke seksi yang dituju dengan animasi yang berlangsung antara 300ms hingga 800ms.
4. WHILE Visitor men-scroll halaman, THE Navigation SHALL menyorot tautan yang aktif dengan visual berbeda (seperti perubahan warna atau garis bawah) untuk seksi yang batas atasnya paling dekat dengan bagian atas viewport, selama seksi tersebut mencakup setidaknya 50% tinggi viewport.
5. IF lebar layar kurang dari 768px, THEN THE Navigation SHALL menampilkan tombol hamburger menu sebagai pengganti daftar tautan yang ditampilkan langsung.
6. WHEN Visitor mengeklik tombol hamburger menu, THE Navigation SHALL membuka atau menutup daftar tautan navigasi (toggle).
7. WHEN Visitor mengeklik salah satu tautan di dalam menu hamburger yang sedang terbuka, THE Navigation SHALL menutup daftar tautan navigasi setelah scroll dimulai.

---

### Requirement 2: Hero Section

**User Story:** As a Visitor, I want to see a clear and compelling introduction, so that I immediately understand who Muhammad Ryan Hidayat is and what he does.

#### Acceptance Criteria

1. THE Hero_Section SHALL menampilkan teks nama lengkap "Muhammad Ryan Hidayat" sebagai heading utama halaman.
2. THE Hero_Section SHALL menampilkan tagline profesional yang terdiri dari 1–2 kalimat (maksimal 160 karakter) yang menyebutkan bidang keahlian utama secara eksplisit.
3. THE Hero_Section SHALL menampilkan foto profil dengan dimensi tampilan minimum 200×200 piksel dan rasio aspek 1:1.
4. WHEN Visitor mengklik tombol call-to-action, THE Hero_Section SHALL menggulir tampilan halaman ke Projects_Section.
5. THE Hero_Section SHALL menampilkan tautan yang dapat diklik menuju URL profil LinkedIn dan URL profil GitHub milik Muhammad Ryan Hidayat, masing-masing terbuka di tab baru.

---

### Requirement 3: About Section

**User Story:** As a Visitor, I want to read a brief background about Muhammad Ryan Hidayat, so that I can understand his education, interests, and professional goals.

#### Acceptance Criteria

1. THE About_Section SHALL display a description paragraph that includes the name of the university (Universitas Bina Insani) and the field of study (Teknik Informatika), with a length between 50 and 300 words.
2. THE About_Section SHALL display the active study enrollment year as a 4-digit calendar year (e.g., 2022).
3. THE About_Section SHALL display at least one explicitly labeled statement describing a professional interest or career goal.
4. WHEN Visitor clicks the CV download button, THE About_Section SHALL open the CV file in PDF format in a new browser tab.
5. IF the CV file is unavailable, THEN THE About_Section SHALL display an error message indicating that the CV cannot be loaded and disable the download button.

---

### Requirement 4: Projects Section

**User Story:** As a Visitor, I want to browse the projects Muhammad Ryan Hidayat has built, so that I can assess his technical capabilities and experience.

#### Acceptance Criteria

1. THE Projects_Section SHALL display a minimum of three Project_Card components, each representing a distinct project.
2. THE Project_Card SHALL display a project title of no more than 60 characters, a short description of no more than 150 characters, a list of up to 8 technology tags each no more than 20 characters, and at least one link to either a repository or a demo.
3. WHEN a Visitor moves the cursor over a Project_Card, THE Project_Card SHALL change at least one visual property (such as border, shadow, or background) to distinguish it from its non-hovered state within 200ms.
4. WHEN a repository link is available on a Project_Card, THE Project_Card SHALL open that repository URL in a new browser tab when the link is activated.
5. WHEN a demo link is available on a Project_Card, THE Project_Card SHALL open that demo URL in a new browser tab when the link is activated.
6. THE Projects_Section SHALL display Project_Card components in a Responsive_Layout: one column when viewport width is less than 768px, two columns when viewport width is between 768px and 1023px, and three columns when viewport width is 1024px or greater.
7. IF a Project_Card has neither a repository link nor a demo link, THEN THE Project_Card SHALL display a text label indicating that no link is available.

---

### Requirement 5: Skills Section

**User Story:** As a Visitor, I want to see a structured list of Muhammad Ryan Hidayat's technical and soft skills, so that I can quickly evaluate his competencies.

#### Acceptance Criteria

1. THE Skills_Section SHALL display skills grouped into at least 2 categories, where each category has a visible heading label, and no skill item appears under more than one category heading.
2. WHEN the Skills_Section is rendered, THE Skills_Section SHALL display each skill as a visually distinct item with a visible boundary (such as a badge or chip element) that contains the skill name as text.
3. THE Skills_Section SHALL include at least 3 programming languages, at least 1 framework, and at least 1 database technology under a technical skills category.
4. THE Skills_Section SHALL include at least 2 development tools (such as Git and VS Code) grouped under a dedicated tools or platforms category.
5. WHEN a visitor views the Skills_Section on a viewport width between 320px and 1280px, THE Skills_Section SHALL display all skill items without any item being clipped, hidden, or overflowing its container.

---

### Requirement 6: Contact Section

**User Story:** As a Visitor, I want to send a message or find Muhammad Ryan Hidayat's contact information, so that I can reach out for collaboration or opportunities.

#### Acceptance Criteria

1. THE Contact_Section SHALL menampilkan Contact_Form dengan kolom nama (maksimal 100 karakter), alamat email (maksimal 254 karakter), dan pesan (maksimal 1000 karakter).
2. WHEN Visitor mengirimkan Contact_Form dengan semua kolom terisi valid, THE Contact_Form SHALL mengirim data ke layanan formulir pihak ketiga dan menampilkan pesan konfirmasi keberhasilan yang tetap terlihat hingga Visitor menutupnya atau berpindah halaman.
3. IF pengiriman Contact_Form ke layanan formulir pihak ketiga gagal, THEN THE Contact_Form SHALL menampilkan pesan kesalahan yang mengindikasikan kegagalan pengiriman dan mempertahankan isian kolom yang telah dimasukkan Visitor.
4. WHEN Visitor mengirimkan Contact_Form dengan kolom nama atau pesan kosong, atau kolom email kosong maupun tidak mengandung karakter `@` yang diikuti domain valid, THE Contact_Form SHALL menampilkan pesan kesalahan yang spesifik untuk setiap kolom yang tidak valid tanpa mengirimkan data ke layanan formulir pihak ketiga.
5. THE Contact_Section SHALL menampilkan tautan ke profil LinkedIn, GitHub, dan alamat email sebagai alternatif kontak langsung.
6. WHEN Visitor mengeklik tautan email, THE Contact_Section SHALL membuka klien email default dengan alamat email Muhammad Ryan Hidayat sebagai penerima.

---

### Requirement 7: Responsive Layout

**User Story:** As a Visitor, I want the website to display correctly on any device I use, so that I can comfortably browse the portfolio from mobile, tablet, or desktop.

#### Acceptance Criteria

1. THE Website SHALL implement Responsive_Layout using CSS Flexbox and/or CSS Grid for all content sections.
2. THE Website SHALL include a viewport meta tag that sets the width to match the device width and sets the initial scale to 1.
3. WHEN the viewport width is less than 768px, THE Website SHALL display a single-column layout for all content sections, with each column spanning the full available width.
4. WHEN the viewport width is between 768px and 1024px inclusive, THE Website SHALL display a two-column layout for Projects_Section and Skills_Section.
5. WHEN the viewport width is 1025px or greater, THE Website SHALL display a layout of at least three columns for Projects_Section and Skills_Section.
6. THE Website SHALL render all body text at a minimum font size of 16px and all secondary text at a minimum of 12px on screens with a minimum width of 320px, without requiring horizontal scrolling.
7. IF an image within any section does not fit within the viewport width at any breakpoint, THEN THE Website SHALL scale the image to fit within the available width while maintaining its aspect ratio.

---

### Requirement 8: Dark Mode

**User Story:** As a Visitor, I want to switch between light and dark themes, so that I can read the portfolio comfortably in different lighting conditions.

#### Acceptance Criteria

1. THE Website SHALL provide a visible theme toggle button in the navigation bar that switches between light mode and Dark_Mode.
2. WHEN Visitor activates Dark_Mode or switches back to light mode, THE Website SHALL apply the selected color scheme across all text, background, and surface elements on the page within 300ms.
3. WHEN Visitor refreshes or reopens the Website, THE Website SHALL apply the theme last saved in localStorage, overriding any OS-level preference.
4. WHERE the Visitor's operating system reports a dark theme preference (prefers-color-scheme: dark) AND no theme value exists in localStorage, THE Website SHALL apply Dark_Mode automatically.

---

### Requirement 9: Performa dan Aksesibilitas

**User Story:** As a Visitor, I want the website to load quickly and be accessible, so that I have a good experience regardless of my connection speed or accessibility needs.

#### Acceptance Criteria

1. THE Website SHALL mencapai skor Lighthouse Performance minimal 90 dan skor Lighthouse Accessibility minimal 90 pada kondisi jaringan simulasi 4G throttling (10 Mbps download, 1 Mbps upload, 40ms RTT).
2. THE Website SHALL menggunakan tag HTML semantik (`header`, `nav`, `main`, `section`, `footer`, `article`) sehingga setiap halaman memiliki tepat satu elemen `main` dan setidaknya satu elemen `header` serta `nav`.
3. THE Website SHALL menyertakan atribut `alt` pada setiap elemen `<img>`, di mana gambar yang bersifat dekoratif menggunakan `alt=""` dan gambar konten menggunakan teks deskriptif tidak lebih dari 150 karakter.
4. THE Website SHALL memastikan rasio kontras warna teks terhadap latar belakang memenuhi standar WCAG AA: minimum 4.5:1 untuk teks normal (di bawah 18pt atau 14pt bold) dan minimum 3:1 untuk teks besar (18pt atau lebih, atau 14pt bold atau lebih).
5. THE Website SHALL dapat dinavigasi sepenuhnya menggunakan keyboard saja, di mana tombol Tab berpindah fokus antar elemen interaktif secara berurutan, tombol Enter mengaktifkan elemen yang difokus, dan tombol Escape menutup hamburger menu jika sedang terbuka.
6. WHEN gambar belum selesai dimuat, THE Website SHALL menampilkan placeholder berwarna solid atau skeleton loader beranimasi selama maksimal 3 detik, sebelum menampilkan gambar penuh atau pesan error jika gambar gagal dimuat.
7. IF halaman gagal mencapai skor Lighthouse Performance 90 pada pengukuran, THEN THE Website SHALL memuat seluruh konten yang terlihat di viewport awal (above-the-fold) dalam waktu maksimal 2,5 detik (Largest Contentful Paint ≤ 2,5 detik).
