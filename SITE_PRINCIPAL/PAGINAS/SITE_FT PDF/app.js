/**
 * FT PDF - Script de Interatividade Sucinto
 * Foco: Leitor de PDF com Verificação de Integridade para Windows
 */

(function () {
  'use strict';

  const DOWNLOAD_URLS = {
    normalExe: 'https://github.com/Fulviotanure/ft-pdf/releases/download/v2.0.0/FtPdf.exe',
    liteExe: 'https://github.com/Fulviotanure/ft-pdf/releases/download/lite-v2.0.0/FtPdfLite.exe'
  };

  document.addEventListener('DOMContentLoaded', () => {
    initNavbar();
    initMobileMenu();
    initDownloadModal();
    initScreenshotShowcase();
  });

  /**
   * Navbar: Detecção de scroll e ScrollSpy
   */
  function initNavbar() {
    const navbar = document.getElementById('main-navbar');
    if (!navbar) return;

    const navLinks = document.querySelectorAll('.nav-links .nav-link');
    const sections = document.querySelectorAll('section[id]');

    function onScroll() {
      if (window.scrollY > 30) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }

      let currentSectionId = '';
      const scrollPosition = window.scrollY + 120;

      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          currentSectionId = section.getAttribute('id');
        }
      });

      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSectionId}`) {
          link.classList.add('active');
        }
      });
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /**
   * Menu Mobile
   */
  function initMobileMenu() {
    const toggleBtn = document.getElementById('mobile-toggle-btn');
    const drawer = document.getElementById('mobile-drawer');
    if (!toggleBtn || !drawer) return;

    toggleBtn.addEventListener('click', () => {
      const isOpen = drawer.classList.toggle('active');
      toggleBtn.setAttribute('aria-expanded', isOpen);
    });

    drawer.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        drawer.classList.remove('active');
        toggleBtn.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /**
   * Modal de Download e Disparo Direto (Normal e Lite - Apenas .EXE)
   */
  function initDownloadModal() {
    const modal = document.getElementById('download-modal');
    const closeBtn = document.getElementById('modal-close-btn');
    const modalTitle = modal ? modal.querySelector('.modal-title') : null;
    const modalDesc = modal ? modal.querySelector('.modal-desc') : null;
    const modalForceLink = document.getElementById('modal-direct-link');
    const downloadBtns = document.querySelectorAll('[data-download-trigger]');

    if (!modal) return;

    downloadBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        const edition = btn.dataset.edition || 'normal';
        const targetUrl = (edition === 'lite') ? DOWNLOAD_URLS.liteExe : DOWNLOAD_URLS.normalExe;
        const editionLabel = (edition === 'lite') ? 'FT PDF Lite' : 'FT PDF (Normal)';

        if (modalTitle) modalTitle.textContent = `Iniciando download do ${editionLabel}!`;
        if (modalDesc) modalDesc.textContent = `O download do arquivo executável para Windows iniciará automaticamente.`;
        if (modalForceLink) modalForceLink.href = targetUrl;

        // Abre modal
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';

        // Dispara download após abrir o modal
        setTimeout(() => {
          const tempAnchor = document.createElement('a');
          tempAnchor.href = targetUrl;
          tempAnchor.setAttribute('download', '');
          document.body.appendChild(tempAnchor);
          tempAnchor.click();
          document.body.removeChild(tempAnchor);
        }, 350);
      });
    });

    function closeModal() {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    }

    if (closeBtn) closeBtn.addEventListener('click', closeModal);

    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.classList.contains('active')) {
        closeModal();
      }
    });
  }

  /**
   * Showcase de Prints Reais do Aplicativo
   */
  function initScreenshotShowcase() {
    const tabs = document.querySelectorAll('.showcase-tab');
    const mainImg = document.getElementById('main-showcase-img');
    const caption = document.getElementById('showcase-caption');

    if (!tabs.length || !mainImg) return;

    const captions = {
      'screenshot-ftpdf-normal.png': 'Interface oficial: Painel de Integridade de 100,0% e análise vetorial',
      'screenshot-ftpdf-lite-reader.png': 'Interface oficial: FT PDF Lite com leitura veloz e foco total no documento',
      'screenshot-ftpdf-lite-welcome.png': 'Interface oficial: FT PDF Lite tela inicial limpa e abertura ágil'
    };

    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        const targetSrc = tab.dataset.screenshot;
        if (targetSrc) {
          mainImg.style.opacity = '0.3';
          setTimeout(() => {
            mainImg.src = targetSrc;
            mainImg.style.opacity = '1';
            if (caption && captions[targetSrc]) {
              caption.textContent = captions[targetSrc];
            }
          }, 150);
        }
      });
    });
  }

})();
