/**
 * DEERPRINT OFFICIAL LANDING PAGE - JAVASCRIPT
 * Sistema de integração com GitHub Releases & Interatividade
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavbarScroll();
  initReleaseData();
  initToolsShowcase();
  initFaqAccordion();
  initMockupToolbar();
  initMockupScreenshotSwitcher();
  initFeedbackForm();
});

/* ==========================================================================
   1. NAVBAR SCROLL LISTENER
   ========================================================================== */
function initNavbarScroll() {
  const navbar = document.getElementById('main-navbar');
  if (!navbar) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }, { passive: true });
}

/* ==========================================================================
   2. GITHUB RELEASES API INTEGRATION
   ========================================================================== */
async function initReleaseData() {
  const repo = 'Fulviotanure/DeerPrint';
  const defaultVersion = 'v3.0.5';
  const defaultDownloadUrl = `https://github.com/${repo}/releases/latest`;

  // Elementos do DOM
  const btnHero = document.getElementById('btn-download-hero');
  const btnNav = document.getElementById('btn-download-nav');
  const btnFull = document.getElementById('btn-download-full');
  const heroBadge = document.getElementById('hero-version-tag');
  const brandBadge = document.getElementById('brand-version-tag');
  const heroMeta = document.getElementById('hero-download-meta');
  
  // Elementos da tabela de especificações técnicas
  const specVersion = document.getElementById('spec-version');
  const specSize = document.getElementById('spec-size');
  const specDate = document.getElementById('spec-date');
  const specFilename = document.getElementById('spec-filename');

  try {
    const response = await fetch(`https://api.github.com/repos/${repo}/releases/latest`);
    
    if (response.ok) {
      const release = await response.json();
      const version = release.tag_name || defaultVersion;
      
      // Localiza o instalador executável Windows (.exe)
      const exeAsset = release.assets ? release.assets.find(asset => 
        asset.name.endsWith('.exe') && !asset.name.includes('blockmap')
      ) : null;

      const downloadUrl = exeAsset ? exeAsset.browser_download_url : `https://github.com/${repo}/releases/download/${version}/DeerPrint-Setup-${version.replace('v', '')}.exe`;
      
      let formattedSize = '99.5 MB';
      if (exeAsset && exeAsset.size) {
        formattedSize = `${(exeAsset.size / (1024 * 1024)).toFixed(1)} MB`;
      }

      let formattedDate = 'Agosto 2026';
      if (release.published_at) {
        const d = new Date(release.published_at);
        formattedDate = d.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' });
      }

      // Atualiza Links dos Botões (mantendo textos limpos e atemporais)
      if (btnHero) btnHero.href = downloadUrl;
      if (btnNav) btnNav.href = downloadUrl;
      if (btnFull) btnFull.href = downloadUrl;

    } else {
      console.warn('API do GitHub indisponível ou com limite temporário. Utilizando links padrão.');
    }
  } catch (error) {
    console.warn('Erro na requisição da release:', error);
    // Fallbacks padrão já configurados no HTML
  }
}

/* ==========================================================================
   3. FERRAMENTAS INTERATIVAS (SHOWCASE TABS)
   ========================================================================== */
function initToolsShowcase() {
  const tabs = document.querySelectorAll('.tool-tab-btn');
  const panes = document.querySelectorAll('.tool-tab-pane');

  if (!tabs.length || !panes.length) return;

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const targetTool = tab.getAttribute('data-tool');

      // Remove classes ativas
      tabs.forEach(t => t.classList.remove('active'));
      panes.forEach(p => p.classList.remove('active'));

      // Ativa aba selecionada
      tab.classList.add('active');
      const targetPane = document.getElementById(`pane-${targetTool}`);
      if (targetPane) {
        targetPane.classList.add('active');
      }
    });
  });
}

/* ==========================================================================
   4. FAQ ACCORDION
   ========================================================================== */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');

    if (!questionBtn || !answer) return;

    questionBtn.addEventListener('click', () => {
      const isOpen = item.classList.contains('active');

      // Fecha todos os outros
      faqItems.forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.classList.remove('active');
          const otherAnswer = otherItem.querySelector('.faq-answer');
          if (otherAnswer) otherAnswer.style.maxHeight = null;
        }
      });

      // Alterna o atual
      if (isOpen) {
        item.classList.remove('active');
        answer.style.maxHeight = null;
      } else {
        item.classList.add('active');
        answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    });
  });
}

/* ==========================================================================
   5. MOCKUP FLOATING TOOLBAR INTERACTIVITY
   ========================================================================== */
function initMockupToolbar() {
  const toolButtons = document.querySelectorAll('.mockup-viewport .tool-btn');
  const selectionDim = document.querySelector('.selection-dimension-tag');

  toolButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      toolButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      
      const toolName = btn.getAttribute('data-tool-name');
      if (toolName && selectionDim) {
        selectionDim.textContent = `1920 × 1080 • [${toolName}]`;
      }
    });
  });
}

/* ==========================================================================
   6. MOCKUP SCREENSHOT SWITCHER
   ========================================================================== */
function initMockupScreenshotSwitcher() {
  const switchBtns = document.querySelectorAll('.mockup-nav-btn');
  const mainImg = document.getElementById('mockup-main-screenshot');
  const mockupTitle = document.getElementById('mockup-screen-title');

  if (!switchBtns.length || !mainImg) return;

  switchBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const src = btn.getAttribute('data-img');
      const title = btn.getAttribute('data-title');

      switchBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      mainImg.style.opacity = '0';
      mainImg.style.transform = 'scale(0.99)';

      setTimeout(() => {
        mainImg.src = src;
        mainImg.alt = title || 'DeerPrint Screenshot';
        if (mockupTitle && title) {
          mockupTitle.textContent = `DeerPrint — ${title}`;
        }
        mainImg.style.opacity = '1';
        mainImg.style.transform = 'scale(1)';
      }, 150);
    });
  });
}

/* ==========================================================================
   7. FEEDBACK, SUGESTÕES & RECLAMAÇÕES FORM
   ========================================================================== */
function initFeedbackForm() {
  const form = document.getElementById('feedback-form');
  const statusEl = document.getElementById('feedback-status');
  const submitBtn = document.getElementById('btn-submit-feedback');

  if (!form || !statusEl || !submitBtn) return;

  const WEB3FORMS_ACCESS_KEY = "bf2e767b-e809-4b59-968e-9ba6d342f3f2";

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('feedback-name').value.trim();
    const email = document.getElementById('feedback-email').value.trim();
    const type = document.getElementById('feedback-type').value;
    const message = document.getElementById('feedback-message').value.trim();

    if (!name || !email || !message) {
      statusEl.style.display = 'block';
      statusEl.className = 'feedback-status error';
      statusEl.textContent = 'Por favor, preencha todos os campos obrigatórios.';
      return;
    }

    const btnText = submitBtn.querySelector('.btn-text');
    const originalText = btnText ? btnText.textContent : 'Enviar Mensagem';

    submitBtn.disabled = true;
    if (btnText) btnText.textContent = 'Enviando...';
    statusEl.style.display = 'none';

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          name: name,
          email: email,
          subject: `[DeerPrint] ${type} - ${name}`,
          from_name: "DeerPrint Feedback Website",
          message_type: type,
          message: message
        })
      });

      const result = await response.json();

      if (response.status === 200 && result.success) {
        statusEl.style.display = 'block';
        statusEl.className = 'feedback-status success';
        statusEl.innerHTML = `✅ <strong>Mensagem enviada com sucesso!</strong><br>Obrigado pelo seu feedback, ${name}. Responderemos em breve no e-mail <em>${email}</em>.`;
        form.reset();
      } else {
        throw new Error(result.message || 'Falha no envio');
      }
    } catch (err) {
      console.warn('Feedback submit fallback:', err);
      statusEl.style.display = 'block';
      statusEl.className = 'feedback-status error';
      statusEl.textContent = '⚠️ Não foi possível enviar a mensagem no momento. Por favor, tente novamente em instantes.';
    } finally {
      submitBtn.disabled = false;
      if (btnText) btnText.textContent = originalText;
    }
  });
}

