/******************************************
 * 0. Jalankan setelah DOM siap
 ******************************************/
document.addEventListener('DOMContentLoaded', () => {

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
   * 2. Data Album (Path fix sesuai hosting)
   ******************************************/
  const albumData = {
    pertemuan1: [
      { src: "images/pertemuan.jpg" },
      { src: "images/pertemuan2.jpg" },
      { src: "images/pertemuan3.jpg" },
      { src: "images/pelepasan.jpg" },
      { src: "images/pelepasan2.jpg" }
    ],
    KITA: [
      { src: "images/kita.jpg" },
      { src: "images/kita1.jpg" },
      { src: "images/kita2.jpg" },
      { src: "images/kita3.jpg" },
      { src: "images/inovasi.jpg" },
      { src: "images/ovop1.jpg" },
      { src: "images/ovop2.jpg" }
    ],
    GotongRoyong: [
      { src: "images/gotongrotong.jpg"},
      { src: "images/gotongroyong2.jpg"}
    ],
    SDNDUKUH: [
      { src: "images/sdn.jpg"},
      { src: "images/sdndukuh1.jpg"},
      { src: "images/sd3.jpg" },
    ],
    RandomKita: [
      { src: "images/random1.jpg"},
      { src: "images/random2.jpg"},
      { src: "images/random3.jpg"}
    ],
    FotoDivisi: [
      { src: "images/bph.jpg", caption: "Badan Pengurus Harian" },
      { src: "images/acara.jpg", caption: "Divisi Acara" },
      { src: "images/humas.jpg", caption: "Divisi Hubungan Masyarakat" },
      { src: "images/pdd.jpg", caption: "Divisi Publikasi dokumentasi dan desain" },
      { src: "images/konsumsi.jpg", caption: "Divisi Konsumsi" }
    ],
    ProgramKerja: [
      { src: "images/inovasi.jpg", caption: "Inovasi Eco Enzyme" },
      { src: "images/ovop1.jpg"},
      { src: "images/ovop2.jpg"},
      { src: "images/MVI_1735.MP4"}
    ]
  };

  /******************************************
   * Helper: Fallback kapitalisasi ekstensi
   ******************************************/
  function addCaseFallback(containerEl) {
    containerEl.querySelectorAll('img').forEach(img => {
      let tried = false;
      const orig = img.getAttribute('src') || '';
      img.addEventListener('error', function onErr() {
        if (tried) return;
        tried = true;

        // Ganti .jpg<->.JPG, .jpeg<->.JPEG, .png<->.PNG
        const variants = [];
        if (orig.match(/\.jpg$/)) variants.push(orig.replace(/\.jpg$/, '.JPG'));
        if (orig.match(/\.JPG$/)) variants.push(orig.replace(/\.JPG$/, '.jpg'));
        if (orig.match(/\.jpeg$/)) variants.push(orig.replace(/\.jpeg$/, '.JPEG'));
        if (orig.match(/\.JPEG$/)) variants.push(orig.replace(/\.JPEG$/, '.jpeg'));
        if (orig.match(/\.png$/)) variants.push(orig.replace(/\.png$/, '.PNG'));
        if (orig.match(/\.PNG$/)) variants.push(orig.replace(/\.PNG$/, '.png'));

        if (variants.length) {
          img.removeEventListener('error', onErr); // cegah loop tak berujung
          img.src = variants[0];
        }
      });
    });
  }

  /******************************************
   * 3. Modal Swiper (Zoom diperbaiki)
   ******************************************/
  let swiperInstance;
  const albumModal   = document.getElementById("albumModal");
  const albumCloseBtn = document.querySelector(".album-close");
  const albumContent = document.getElementById("albumContent");

  if (albumModal && albumContent) {
    // Buka modal saat card diklik
    document.querySelectorAll(".service-card").forEach(card => {
      card.addEventListener("click", () => {
        const albumKey = card.dataset.album;
        if (!albumData[albumKey]) return;

        // Render slide
        albumContent.innerHTML = albumData[albumKey].map(photo => `
          <div class="swiper-slide">
            <div class="swiper-zoom-container">
              <img src="${photo.src}" alt="${photo.caption ? photo.caption : 'Foto Kegiatan'}" />
            </div>
            ${photo.caption ? `<p style="color:white; text-align:center; margin-top:5px;">${photo.caption}</p>` : ""}
          </div>
        `).join("");

        // Tambah fallback kapitalisasi file (untuk server case-sensitive)
        addCaseFallback(albumContent);

        // Tampilkan modal
        albumModal.style.display = "flex";

        // Inisialisasi / reset Swiper
        if (typeof Swiper === 'undefined') {
          console.error('Swiper tidak ter-load. Pastikan CDN Swiper dimuat sebelum script ini.');
          return;
        }
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
            maxRatio: 2 // bisa zoom hingga 3x
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

    // Tutup modal saat klik di luar isi modal
    albumModal.addEventListener("click", (e) => {
      if (e.target === albumModal) {
        albumModal.style.display = "none";
        if (swiperInstance) swiperInstance.destroy(true, true);
      }
    });
  }
});
