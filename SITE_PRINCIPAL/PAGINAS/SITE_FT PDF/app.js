/**
 * FT PDF — Script de Interatividade e Integração
 * - Navbar com efeito de scroll
 * - Atualização assíncrona do link de download direto
 * - Zero exposição de números de versão nos botões
 */

const GITHUB_REPO_API = 'https://api.github.com/repos/Fulviotanure/FT-PDF/releases';
const FALLBACK_DOWNLOAD_URL = 'https://github.com/Fulviotanure/FT-PDF/releases/latest/download/FtPdfLite.exe';

document.addEventListener('DOMContentLoaded', () => {
  initNavbarScroll();
  fetchLatestDownloadLink();
});

/**
 * Navbar: adiciona sombra e fundo opaco ao rolar a página
 */
function initNavbarScroll() {
  const navbar = document.getElementById('main-navbar');
  if (!navbar) return;

  function checkScroll() {
    if (window.scrollY > 24) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', checkScroll, { passive: true });
  checkScroll();
}

/**
 * Busca em segundo plano o link oficial direto mais recente
 * (Sem expor números de versão no botão)
 */
async function fetchLatestDownloadLink() {
  const btnDownload = document.getElementById('btn-download-main');
  if (!btnDownload) return;

  try {
    const response = await fetch(GITHUB_REPO_API);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);

    const releases = await response.json();
    if (!Array.isArray(releases) || releases.length === 0) return;

    // Localiza o executável oficial mais recente da versão Lite (FtPdfLite.exe)
    let targetDownloadUrl = null;

    for (const release of releases) {
      if (release.assets && Array.isArray(release.assets)) {
        const asset = release.assets.find(a => 
          a.name && a.name.toLowerCase() === 'ftpdflite.exe'
        );
        if (asset && asset.browser_download_url) {
          targetDownloadUrl = asset.browser_download_url;
          break;
        }
      }
    }

    if (targetDownloadUrl) {
      btnDownload.href = targetDownloadUrl;
    }
  } catch (error) {
    // Mantém o link de fallback seguro caso a API atinja rate-limit
    btnDownload.href = FALLBACK_DOWNLOAD_URL;
  }
}