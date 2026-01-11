const rootApp = document.getElementById("app");

const DataStore = {
    autentikasi: {
        terdaftar: false,
        username: null
    },
}

function navbar(){
    const {terdaftar} = DataStore.autentikasi;
    return `
        <nav class="navbar">
            <a href="#" class="navbar-logo">EduFund</a>
            
            <div class="navbar-nav">
                <a href="#/home">Home</a>
                <a href="#/kampanye">Kampanye</a>
                <a href="#/donasi">Donasi</a>
                <a href="#/relawan">Relawan</a>
                <a href="#/kontak">Tentang & Kontak</a>
                ${terdaftar ?
                    '<a onclick="App.navigasi(\'admin\')">Admin</a>' : 
                    '<a onclick="App.navigasi(\'login\')">Login</a>'
                }
                ${terdaftar ?
                    '<button onclick="App.logout()">Logout</button>' :
                    ''
                }   
            </div>  
        </nav>
    `
}

function footer(){
    return `
        <footer class="footer">
            <div class="footer_content">
                <div>
                    <h3 class="footer_title">Tentang EduFund</h3>
                    <p>Bersama menyalurkan kepedulian melalui donasi pendidikan untuk menciptakan akses belajar
                    yang merata dan bekelanjutan bagi generasi masa depan</p>
                </div>
                            
                <div>
                    <h3 class="footer_title">Quick Links</h3>
                    <ul class="footer_links">
                        <li><a class="footer_link" onclick="App.navigasi('home')">Home</a></li>
                        <li><a class="footer_link" onclick="App.navigasi('kampanye')">Kampanye</a></li>
                        <li><a class="footer_link" onclick="App.navigasi('relawan')">Relawan</a></li>
                        <li><a class="footer_link" onclick="App.navigasi('kontak')">Kontak</a></li>
                    </ul>
                </div>
                                
                <div>
                    <h3 class="footer_title">Kontak Informasi</h3>
                    <p><i class="bi bi-geo-alt-fill"></i> Di Denpasar</p>
                    <p><i class="bi bi-telephone-fill"></i> +62 01-002-003</p>
                    <p><i class="bi bi-envelope-at-fill"></i> EduFund@gmail.com</p>
                </div>
            </div>
            <div class="footer_bottom">
                <p>&copy; 2026 EduFund | Dibuat untuk memajukan pendidikan di Indonesia</p>
            </div>
        </footer>
    `;
}

function home() {
    return `
        <div class="home">
            <div class="home_side-image left">
                <img src="asset/anak_sekolah.jpg" alt="Education">
            </div>
            <div class="home_content">
                <h1 class="title">Membangun Pendidikan, Membangun Masa Depan</h1>
                <p class="subtitle">Bersama, kita wujudkan pendidikan berkualitas untuk setiap anak</p>
                <button class="klik_donasi" onclick="App.navigasi('donasi')">Donasi Sekarang</button>
            </div>
            <div class="home_side-image right">
                <img src="asset/Volunteers_Support1.jpg" alt="Students">
            </div>
        </div>

        <section class="proses_donasi">
            <div class="container">
                <h2 class="section_title">Bagaimana Cara Kerjanya</h2>
                <p class="section_subtitle">Mewujudkan perubahan kini lebih mudah melalui tiga langkah sederhana</p>
                <div class="steps">
                    <div class="step">
                        <div class="step_icon"><i class="bi bi-search"></i></div>
                        <h3 class="step_title">1. Jelajahi Kampanye</h3>
                        <p>Jelajahi kampanye yang kami miliki dan temukan yang sesuai dengan kepedulian anda.</p>
                    </div>
                    <div class="step">
                        <div class="step_icon"><i class="bi bi-heart-fill"></i></div>
                        <h3 class="step_title">2. Melakukan Donasi</h3>
                        <p>Tentukan nominal donasi. Setiap donasi akan diberikan dengan aman dan dikelola secara 
                        transparan untuk mendukung pendidikan</p>
                    </div>
                    <div class="step">
                        <div class="step_icon"><i class="bi bi-graph-up-arrow"></i></div>
                        <h3 class="step_title">3. Dukung Masa Depan</h3>
                        <p>Donasi anda akan membantu membuka akses pendidikan dan menciptakan peluang belajar yang 
                        lebih baik bagi anak-anak</p>
                    </div>
                </div>
            </div>
        </section>
    `;
}

function kampanye(){
    return `
        <div>
            <p>kampanye</p>
        </div>
    `
}

function donasi(){
    return `
        <div>
            <p>donasi</p>
        </div>
    `
}

function relawan(){
    return `
        <div>
            <p>relawan</p>
        </div>
    `
}

function kontak(){
    return `
        <div>
            <p>tentang & kontak</p>
        </div>
    `
}

const App = {
    currentPage: 'home',

    navigasi(page) {
        if (page === 'admin' && !DataStore.autentikasi.terdaftar) {
            alert("Akses Ditolak! Login Terlebih Dahulu");
            window.location.hash = "#/login"; 
            return;
        }

        window.location.hash = `#/${page}`;
        window.scrollTo({ top: 0, behavior: "smooth" });
    },

    logout() {
        if (confirm('Logout?')) {
            DataStore.autentikasi.terdaftar = false;
            DataStore.autentikasi.username = null;
            alert('Berhasil Logout');
            this.navigasi('home');
        }
    },
}

function router(){
    const route = location.hash || "#/home";

    rootApp.innerHTML = navbar();

    if(route === "#/home"){
        rootApp.innerHTML += home();
    }else if(route === "#/kampanye"){
        rootApp.innerHTML += kampanye();
    }else if(route === "#/donasi"){
        rootApp.innerHTML += donasi();
    }else if(route === "#/relawan"){
        rootApp.innerHTML += relawan();
    }else if(route === "#/kontak"){
        rootApp.innerHTML += kontak();
    }
    else{
        rootApp.innerHTML += '<h2>404 - Halaman Tidak Ditemukan</h2>'
    }

    rootApp.innerHTML += footer();
}

window.addEventListener("hashchange", router);
window.addEventListener("load", router);