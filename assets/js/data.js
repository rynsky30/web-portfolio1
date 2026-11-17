// data.js â€” Static data: projects and skills arrays

/**
 * @typedef {Object} Project
 * @property {string}      id          - Slug unik, e.g. "todo-app"
 * @property {string}      title       - Maks. 60 karakter
 * @property {string}      description - Maks. 150 karakter
 * @property {string[]}    tags        - Maks. 8 item, masing-masing maks. 20 karakter
 * @property {string}      image       - Path relatif ke thumbnail
 * @property {string|null} repoUrl     - URL repositori atau null
 * @property {string|null} demoUrl     - URL demo atau null
 */

/** @type {Project[]} */
export const projects = [
  {
    id: "todo-app",
    title: "Todo App",
    description: "Aplikasi manajemen tugas berbasis web dengan fitur tambah, edit, hapus, dan tandai tugas selesai.",
    tags: ["JavaScript", "HTML5", "CSS3"],
    image: "assets/images/projects/todo-app.webp",
    repoUrl: "https://github.com/rynsky30/todo-app",
    demoUrl: "https://rynsky30.github.io/todo-app"
  },
  {
    id: "student-management",
    title: "Sistem Manajemen Data Mahasiswa",
    description: "Aplikasi CRUD untuk mengelola data mahasiswa dengan fitur pencarian dan ekspor ke CSV menggunakan Python Flask.",
    tags: ["Python", "Flask", "MySQL", "Bootstrap"],
    image: "assets/images/projects/student-management.webp",
    repoUrl: "https://github.com/rynsky30/student-management",
    demoUrl: null
  },
  {
    id: "library-system",
    title: "Sistem Perpustakaan Digital",
    description: "Platform peminjaman buku digital berbasis web dengan autentikasi pengguna dan manajemen koleksi buku.",
    tags: ["PHP", "MySQL", "Bootstrap", "JavaScript"],
    image: "assets/images/projects/library-system.webp",
    repoUrl: "https://github.com/rynsky30/library-system",
    demoUrl: null
  },
  {
    id: "expense-tracker",
    title: "Expense Tracker",
    description: "Aplikasi pencatat pengeluaran harian dengan visualisasi grafik dan laporan bulanan berbasis JavaScript.",
    tags: ["JavaScript", "HTML5", "CSS3", "Chart.js"],
    image: "assets/images/projects/expense-tracker.webp",
    repoUrl: "https://github.com/rynsky30/expense-tracker",
    demoUrl: "https://rynsky30.github.io/expense-tracker"
  }
];

/**
 * @typedef {Object} SkillCategory
 * @property {string}   category - Nama kategori, e.g. "Bahasa Pemrograman"
 * @property {string[]} items    - Daftar nama keahlian dalam kategori ini
 */

/** @type {SkillCategory[]} */
export const skills = [
  {
    category: "Bahasa Pemrograman",
    items: ["Python", "JavaScript", "PHP", "Java"]
  },
  {
    category: "Framework & Library",
    items: ["Flask", "Bootstrap"]
  },
  {
    category: "Database",
    items: ["MySQL", "PostgreSQL"]
  },
  {
    category: "Tools & Platform",
    items: ["Git", "VS Code", "GitHub"]
  },
  {
    category: "Soft Skills",
    items: ["Komunikasi", "Kerja Tim", "Problem Solving"]
  }
];
