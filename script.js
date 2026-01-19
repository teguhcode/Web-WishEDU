const rootApp = document.getElementById("app");

const DataStore = {
    autentikasi: { terdaftar: false, username: null },
    kampanye: [
        { id: 1, judul: "Membangun Sekolah ", kategori: "Pembangunan", terkumpul: 150000000, gambar: "asset/pembangunan_sekolah.png" },
        { id: 2, judul: "Bantuan Seragam Sekolah", kategori: "Pendidikan", terkumpul: 20000000, gambar: "asset/baju_sekolah.jpg" },
        { id: 3, judul: "Beasiswa Pelajar", kategori: "Beasiswa", terkumpul: 50000000, gambar: "asset/bantuan_beasiswa.jpg" },
        { id: 4, judul: "Bantuan Buku", kategori: "Pendidikan", terkumpul: 15000000, gambar: "asset/buku_sekolah.jpg" },
    ],
};

const App = {
    tabAktif: 'overview',

    navigasi(page) {
        window.location.hash = `#/${page}`;
    },

    navigasiAdmin(tab) {
        this.tabAktif = tab;
        router();
    },

    prosesLogin() {
        const user = document.getElementById("user").value;
        const pass = document.getElementById("pass").value;

        if (user === "admin" && pass === "12345") {
            DataStore.autentikasi.terdaftar = true;
            DataStore.autentikasi.username = user;
            alert(`Selamat Datang, ${user}!`);
            this.navigasi('admin');
        } else {
            alert("Username atau Password salah!");
        }
    },

    logout() {
        if (confirm("Apakah anda yakin ingin logout?")) {
            DataStore.autentikasi.terdaftar = false;
            DataStore.autentikasi.username = null;

            const nb = document.querySelector('.navbar');
            if (nb) nb.style.display = 'flex';
            this.navigasi('home');
        }
    },

    handleSimpan(event) {
        event.preventDefault();
        const idEdit = document.getElementById('edit-id').value;
        const newData = {
            id: idEdit ? parseInt(idEdit) : Date.now(),
            judul: document.getElementById('judul').value,
            kategori: document.getElementById('kategori').value,
            terkumpul: parseInt(document.getElementById('terkumpul').value),
        };

        if (idEdit) {
            const idx = DataStore.kampanye.findIndex(k => k.id == idEdit);
            DataStore.kampanye[idx] = newData;
        } else {
            DataStore.kampanye.push(newData);
        }
        router();
    },

    siapkanEdit(id) {
        const item = DataStore.kampanye.find(k => k.id === id);
        document.getElementById('edit-id').value = item.id;
        document.getElementById('judul').value = item.judul;
        document.getElementById('kategori').value = item.kategori;
        document.getElementById('terkumpul').value = item.terkumpul;
        document.getElementById('form-title').innerText = "Edit Kampanye";
    },

    deleteKampanye(id) {
        if (confirm("Hapus kampanye ini?")) {
            DataStore.kampanye = DataStore.kampanye.filter(k => k.id !== id);
            router();
        }
    }
};

function navbar() {
    const { terdaftar } = DataStore.autentikasi;
    return `
        <nav class="navbar">
            <a href="#/home" class="navbar-logo">EduFund</a>
            <div class="navbar-container">
                <div class="navbar-nav">
                    <a href="#/home">Home</a>
                    <a href="#/kampanye">Kampanye</a>
                    <a href="#/relawan">Relawan</a>
                    <a href="#/kontak">Tentang & Kontak</a>
                    ${terdaftar ? `<a onclick="App.navigasi('admin')">Admin</a>` : `<a onclick="App.navigasi('login')">Login</a>`}
                </div>  
                    <a href="#/donasi" class="nav-donasi">Donasi Sekarang</a> 
                </div>
            </div>
        </nav>`;
}

function footer() {
    return `
            <footer class="footer">
                <div class="footer-content">
                    <div>
                        <h3 class="footer-title">Tentang EduFund</h3>
                        <p class=footer-text>Bersama menyalurkan kepedulian melalui donasi pendidikan untuk menciptakan akses belajar
                        yang merata dan bekelanjutan bagi generasi masa depan</p>
                    </div>
                    
                    <div class="footer-container">
                        <div>
                            <h3 class="footer-title">Quick Links</h3>
                            <ul class="footer-links">
                                <li><a class="footer-link" onclick="App.navigasi('home')">Home</a></li>
                                <li><a class="footer-link" onclick="App.navigasi('kampanye')">Kampanye</a></li>
                                <li><a class="footer-link" onclick="App.navigasi('relawan')">Relawan</a></li>
                                <li><a class="footer-link" onclick="App.navigasi('kontak')">Kontak</a></li>
                            </ul>
                        </div>
                                        
                        <div>
                            <h3 class="footer-title">Kontak Informasi</h3>
                            <p><i class="bi bi-geo-alt-fill"></i> Di Denpasar</p>
                            <p><i class="bi bi-telephone-fill"></i> +62 01-002-003</p>
                            <p><i class="bi bi-envelope-at-fill"></i> EduFund@gmail.com</p>
                        </div>
                    </div>
                </div>
                <div class="footer-bottom">
                    <p>&copy; 2026 EduFund | Dibuat untuk memajukan pendidikan di Indonesia</p>
                </div>
            </footer>
        `;
}

function home() {
    const k1 = DataStore.kampanye[0];
    const k2 = DataStore.kampanye[1];
    return `
            <div class="home">
                <div class="home-side-image left">
                    <img src="asset/anak_sekolah.jpg" alt="Murid">
                </div>

                <div class="home-content">
                    <h1 class="title">Membangun Pendidikan, Membangun Masa Depan</h1>
                    <p class="subtitle">Bersama, kita wujudkan pendidikan berkualitas untuk setiap anak</p>
                    <button class="klik-donasi" onclick="App.navigasi('donasi')">Donasi Sekarang</button>
                </div>

                <div class="home-side-image right">
                    <img src="asset/Volunteers_Support.jpg" alt="Relawan">
                </div>
            </div>

            <section class="main-split-container">
                <div class="split-wrapper">
                    
                    <div class="stats-side-area">
                        <div class="stat-box">
                            <div class="stat-info">
                                <p>Total Donasi</p>
                                <h3>Rp 75.000.000+</h3>
                            </div>
                        </div>

                        <div class="stat-box">
                            <div class="stat-info">
                                <p>Jumlah Relawan</p>
                                <h3>200+</h3>
                            </div>
                        </div>
                        
                        <div class="stat-box">
                            <div class="stat-info">
                                <p>Kampanye Aktif</p>
                                <h3>${DataStore.kampanye.length}</h3>
                            </div>
                        </div>
                    </div>

                    <div class="campaign-side-area">
                        <h3 class="kampanye-section-title">Kampanye Aktif</h3>
                        
                        <div class="kampanye-list-vertical">
                            <div class="kampanye-card-custom">
                                <div class="kampanye-img-box">
                                    <img src="${k1.gambar}">
                                </div>
                                <div class="kampanye-details">
                                    <h3>${k1.judul}</h3>
                                    <p>Bersama program ${k1.judul}, mari kita wudujkan pendidikan yang lebih merata</p>
                                    <div class="donasi-info">
                                        <p class="label">Donasi Terkumpul</p>
                                        <p class="nominal">Rp ${k1.terkumpul.toLocaleString()}</p>
                                    </div>
                                    <button class="klik-donasi-kecil" onclick="App.navigasi('donasi')">Donasi Sekarang</button>
                                </div>
                            </div>

                            <div class="kampanye-card-custom">
                                <div class="kampanye-img-box">
                                    <img src="${k2.gambar}">
                                </div>
                                <div class="kampanye-details">
                                    <h3>${k2.judul}</h3>
                                    <p>Bersama program ${k2.judul}, mari kita wudujkan pendidikan yang lebih merata</p>
                                <div class="donasi-info">
                                    <p class="label">Donasi Terkumpul</p>
                                    <p class="nominal">Rp ${k2.terkumpul.toLocaleString()}</p>
                                </div>
                                    <button class="klik-donasi-kecil" onclick="App.navigasi('donasi')">Donasi Sekarang</button>
                                </div>
                            </div>
                        </div>

                        <div class="center-link">
                            <button class="klik-kampanye" onclick="App.navigasi('kampanye')">Lihat Semua</button>
                        </div>
                    </div>

                </div>
            </section>
    `;
}


function kampanye() {
    const daftarKampanye = DataStore.kampanye.map(item => `
        <div class="kampanye-card-custom">
            <div class="kampanye-img-box">
                <img src="${item.gambar}" alt="${item.judul}">
            </div>
            <div class="kampanye-details">
                <h3>${item.judul}</h3>
                <p>Bersama program ${item.judul}, mari kita wudujkan pendidikan yang lebih merata</p>
                <div class="donasi-info">
                    <p class="label">Donasi Terkumpul</p>
                    <p class="nominal">Rp ${item.terkumpul.toLocaleString()}</p>
                </div>
                <button class="klik-donasi-kecil" onclick="App.navigasi('donasi')">Donasi Sekarang</button>
            </div>
        </div>
    `).join('');

    return `
        <section class="halaman-kampanye">
            <div class="header-halaman">
                <h2>Jelajahi Kampanye Yang Aktif</h2>
                <p>Setiap donasi yang diberikan akan berarti bagi masa depan pendidikan Indonesia<</p>
            </div>
            
            <div class="grid-kampanye">
                ${daftarKampanye}
            </div>
        </section>
    `;
}

function donasi() {
  return `
        <div>
            <p>donasi</p>
        </div>
    `;
}

function relawan() {
  return `
        <div>
            <p>relawan</p>
        </div>
    `;
}

function kontak() {
  return `
        <div>
            <p>tentang & kontak</p>
        </div>
    `;
}

function login() {
    return `
            <div class="login-page">
                <div class="login-card">
                    <h2 class="form-title">Login</h2>

                    <div class="form-group">
                        <label>Username</label>
                        <input type="text" id="user" placeholder="Username" class="form-control">
                    </div>

                    <div class="form-group">
                        <label>Password</label>
                        <input type="password" id="pass" placeholder="Password" class="form-control">
                    </div>

                    <button class="form-submit" onclick="App.prosesLogin()">Login</button>
                </div>
            </div>
        `;
}

function admin() {
    const nb = document.querySelector('.navbar');
    if (nb) {
        nb.style.display = 'none'
    };

    const tab = App.tabAktif;
    const campaignRows = DataStore.kampanye.map((item, index) => `
        <tr>
            <td>${index + 1}</td>
            <td><strong>${item.judul}</strong></td>
            <td>${item.kategori}</td>
            <td>Rp ${item.terkumpul.toLocaleString()}</td>
            <td>
                <button class="btn-edit" onclick="App.siapkanEdit(${item.id})"><i class="bi bi-pencil-square"></i></button>
                <button class="btn-del" onclick="App.deleteKampanye(${item.id})"><i class="bi bi-trash"></i></button>
            </td>
        </tr>`).join('');

    return `
    <div class="admin-layout">
        <aside class="sidebar-admin">
            <div class="brand">EduFund Admin</div>
            <nav>
                <a class="${tab === 'overview' ? 'active' : ''}" onclick="App.navigasiAdmin('overview')">Overview</a>
                <a class="${tab === 'kampanye' ? 'active' : ''}" onclick="App.navigasiAdmin('kampanye')">Kampanye</a>
                <hr style="margin: 20px 0; opacity: 0.2;">
                <a onclick="App.logout()">Logout</a>
            </nav>
        </aside>
        <main class="main-admin">
            ${tab === 'overview' ? `
                <h2>Overview Dashboard</h2>
                <div class="stats-row">
                    <div class="card-stat"><h4>Total Donasi</h4><p>Rp 75.000.000</p></div>
                    <div class="card-stat"><h4>Relawan</h4><p>200 Orang</p></div>
                    <div class="card-stat"><h4>Kampanye</h4><p>${DataStore.kampanye.length}</p></div>
                </div>
                <div class="data-section">
                    <h3>Donasi Masuk</h3>
                    <table class="table-admin">
                        <thead><tr><th>No</th><th>Nama</th><th>Donasi</th></tr></thead>
                        <tbody>
                            <tr><td>1</td><td>Agus</td><td>Rp. 250.000</td></tr>
                            <tr><td>2</td><td>Johan</td><td>Rp. 100.000</td></tr>
                        </tbody>
                    </table>
                </div>` 
            : `
                <h2>Manajemen Kampanye</h2>
                <div class="data-section">
                    <form onsubmit="App.handleSimpan(event)">
                        <input type="hidden" id="edit-id">
                        <div class="form-row">
                            <input type="text" id="judul" placeholder="Judul" required>
                            <input type="text" id="kategori" placeholder="Kategori" required>
                            <input type="number" id="terkumpul" placeholder="Terkumpul" required>
                        </div>
                        <button type="submit" class="btn-submit">Simpan Data</button>
                    </form>
                </div>
                <div class="data-section">
                    <table class="table-admin">
                        <thead><tr><th>No</th><th>Judul</th><th>Kategori</th><th>Terkumpul</th><th>Aksi</th></tr></thead>
                        <tbody>${campaignRows}</tbody>
                    </table>
                </div>`}
        </main>
    </div>`;
}

function router() {
    const route = location.hash || "#/home";
    
    rootApp.innerHTML = navbar();

    if (route === "#/admin") {
        if (!DataStore.autentikasi.terdaftar) {
            alert("Akses ditolak!");
            location.hash = "#/login";
            return;
        }
        rootApp.innerHTML = admin();
        return;
    }

    const nb = document.querySelector('.navbar');
    if (nb) nb.style.display = 'flex';

    let content = "";
    switch(route) {
        case "#/home": 
            content = home(); 
            break;
        case "#/login": 
            content = login(); 
            break;
        case "#/kampanye": 
            content = kampanye(); 
            break;
        case "#/donasi":     
            content = donasi(); 
            break;
        case "#/relawan":   
            content = relawan(); 
            break;
        case "#/kontak": 
            content = kontak(); 
            break;
        default: 
            content = home();
    }
    
    rootApp.innerHTML += `<div style="margin-top: 80px">${content}</div>` + footer();
    setTimeout(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }, 200);
}

window.addEventListener("hashchange", router);
window.addEventListener("load", router);