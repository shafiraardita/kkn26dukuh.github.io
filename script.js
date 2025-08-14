/******************************************
 * 1. Hamburger Menu
 ******************************************/
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('show');
    });
}

/******************************************
 * 2. Data Album
 ******************************************/
const albumData = {
    pertemuan1: [
        { src: "images/pertemuan.JPG" },
        { src: "images/pertemuan2.JPG"},
        { src: "images/pertemuan3.JPG"},
        { src: "images/pelepasan.jpg"},
        { src: "images/pelepasan2.jpg" }
    ],
    KITA: [
        { src: "images/kita.jpg"},
        { src: "images/kita1.JPG" },
        { src: "images/kita2.JPG"},
        { src: "images/kita3.JPG" }
    ],
    GotongRoyong: [
        { src: "images/gotongrotong.JPG", caption: "Kerja Bakti Bersama Warga" },
        { src: "images/gotongroyong2.JPG", caption: "Membersihkan Jalan" }
    ],
    SDNDUKUH: [
        { src: "images/sdn.jpg", caption: "Mengajar di SDN Dukuh" },
        { src: "images/sdndukuh1.JPG", caption: "Foto Bersama Murid" }
    ],
    RandomKita: [
        { src: "images/random1.JPG", caption: "Momen Santai" },
        { src: "images/random2.JPG", caption: "Jalan-jalan Sore" }
    ],
    FotoDivisi: [
        { src: "images/bph.jpg", caption: "Badan Pengurus Harian" },
        { src: "images/acara.jpg", caption: "Divisi Acara" },
        { src: "images/humas.jpg", caption: "Divisi Hubungan Masyarakat" },
        { src: "images/pdd.jpg", caption: "Divisi Publikasi Dokumentasi dan Desain" },
        { src: "images/konsumsi.jpg", caption: "Divisi Konsumsi" }
    ]
};

/******************************************
 * 3. Modal Swiper
 ******************************************/
let swiperInstance;
const albumModal = document.getElementById("albumModal");
const albumCloseBtn = document.querySelector(".album-close");
const albumContent = document.getElementById("albumContent");

if (albumModal && albumContent) {
    // Buka modal saat card diklik
    document.querySelectorAll(".service-card").forEach(card => {
        card.addEventListener("click", () => {
            const albumKey = card.dataset.album;
            if (!albumData[albumKey]) return;

            // Isi slide dengan zoom-container
            albumContent.innerHTML = albumData[albumKey]
                .map(photo => `
                    <div class="swiper-slide">
                        <div class="swiper-zoom-container">
                            <img src="${photo.src}" alt="${photo.caption}" />
                        </div>
                        <p style="color:white; text-align:center; margin-top:5px;">${photo.caption}</p>
                    </div>
                `).join("");

            // Tampilkan modal
            albumModal.style.display = "flex";

            // Inisialisasi / reset Swiper
            if (swiperInstance) swiperInstance.destroy(true, true);
            swiperInstance = new Swiper(".albumSwiper", {
                navigation: {
                    nextEl: ".swiper-button-next",
                    prevEl: ".swiper-button-prev",
                },
                pagination: {
                    el: ".swiper-pagination",
                    clickable: true,
                },
                zoom: {
                    maxRatio: 0.8 // Zoom maksimal 80%
                },
                loop: true,
                centeredSlides: true
            });
        });
    });

    // Tutup modal dengan tombol close
    if (albumCloseBtn) {
        albumCloseBtn.addEventListener("click", () => {
            albumModal.style.display = "none";
            if (swiperInstance) swiperInstance.destroy(true, true);
        });
    }

    // Tutup modal saat klik di luar gambar
    albumModal.addEventListener("click", (e) => {
        if (e.target === albumModal) {
            albumModal.style.display = "none";
            if (swiperInstance) swiperInstance.destroy(true, true);
        }
    });
}
