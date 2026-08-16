/* ==========================================================================
   RIVI - MUSIC STREAMING ENGINE & SOUND VISUALIZER
   MULTI-ARTIST CATALOGUE, MINIMIZE/MAXIMIZE BOTTOM DOCK & DUAL WAVE ENGINE
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

    // --- 1. DATA DATABASE (ARTISTS & TRACKS) ---
    const DB = {
        artists: [
            {
                id: 'synapse',
                name: 'Synapse',
                genre: 'Synthwave / Dark Electronic',
                avatar: 'capas/artist-synapse.jpg',
                banner: 'capas/artist-synapse.jpg',
                bio: 'Produtor de música eletrônica focado em batidas analógicas, sintetizadores espaciais e atmosferas cyberpunk.',
                verified: true
            },
            {
                id: 'nova-pulse',
                name: 'Nova Pulse',
                genre: 'Retrowave / 80s Synth',
                avatar: 'capas/artist-nova-pulse.jpg',
                banner: 'capas/artist-nova-pulse.jpg',
                bio: 'Mergulho nostálgico no retrowave com sintetizadores analógicos clássicos e horizontes de neon.',
                verified: true
            },
            {
                id: 'cyber-ghost',
                name: 'Cyber Ghost',
                genre: 'Darksynth / Industrial',
                avatar: 'capas/artist-cyber-ghost.jpg',
                banner: 'capas/artist-cyber-ghost.jpg',
                bio: 'Linhas de baixo pesadas, distorções industriais e ritmos eletrônicos distópicos para alta adrenalina.',
                verified: true
            },
            {
                id: 'luna-veil',
                name: 'Luna Veil',
                genre: 'Ambient / Chillwave',
                avatar: 'capas/artist-luna-veil.jpg',
                banner: 'capas/artist-luna-veil.jpg',
                bio: 'Paisagens sonoras imersivas, frequências relaxantes e sintetizadores celestiais para relaxamento.',
                verified: true
            }
        ],
        tracks: [
            {
                id: 'foolish-heart',
                title: 'Foolish Heart',
                artistId: 'synapse',
                artist: 'Synapse',
                album: 'Single Oficial',
                genre: 'Synthwave / Dark Electronic',
                src: 'audios/foolish-heart.mp3',
                cover: 'capas/cover-foolish-heart.jpg',
                lrc: 'letras/foolish-heart.lrc',
                duration: 195
            },
            {
                id: 'youre-not-mine',
                title: "You're Not Mine",
                artistId: 'synapse',
                artist: 'Synapse',
                album: 'Single Oficial',
                genre: 'Dark Pop / Synthwave',
                src: 'audios/youre-not-mine.mp3',
                cover: 'capas/cover-youre-not-mine.jpg',
                lrc: 'letras/youre-not-mine.lrc',
                duration: 176
            },
            {
                id: 'cyber-pulse',
                title: 'Cyber Pulse',
                artistId: 'synapse',
                artist: 'Synapse',
                album: 'Single Oficial',
                genre: 'Darksynth / Midtempo',
                src: 'audios/foolish-heart.mp3',
                cover: 'capas/cover-foolish-heart.jpg',
                lrc: 'letras/foolish-heart.lrc',
                duration: 184
            },
            {
                id: 'neon-sunset',
                title: 'Neon Sunset',
                artistId: 'nova-pulse',
                artist: 'Nova Pulse',
                album: 'Retro Horizons',
                genre: 'Retrowave / 80s Synth',
                src: 'audios/youre-not-mine.mp3',
                cover: 'capas/artist-nova-pulse.jpg',
                lrc: 'letras/youre-not-mine.lrc',
                duration: 222
            },
            {
                id: 'midnight-drive',
                title: 'Midnight Drive',
                artistId: 'nova-pulse',
                artist: 'Nova Pulse',
                album: 'Retro Horizons',
                genre: 'Retrowave / 80s Synth',
                src: 'audios/foolish-heart.mp3',
                cover: 'capas/artist-nova-pulse.jpg',
                lrc: 'letras/foolish-heart.lrc',
                duration: 255
            },
            {
                id: 'system-overload',
                title: 'System Overload',
                artistId: 'cyber-ghost',
                artist: 'Cyber Ghost',
                album: 'Dark Circuit',
                genre: 'Darksynth / Industrial',
                src: 'audios/foolish-heart.mp3',
                cover: 'capas/artist-cyber-ghost.jpg',
                lrc: 'letras/foolish-heart.lrc',
                duration: 208
            },
            {
                id: 'astral-drift',
                title: 'Astral Drift',
                artistId: 'luna-veil',
                artist: 'Luna Veil',
                album: 'Ethereal Echoes',
                genre: 'Ambient / Chillwave',
                src: 'audios/youre-not-mine.mp3',
                cover: 'capas/artist-luna-veil.jpg',
                lrc: 'letras/youre-not-mine.lrc',
                duration: 242
            }
        ]
    };

    // --- 2. DOM ELEMENTS ---
    let audio = document.getElementById('audio-player');
    if (!audio) {
        audio = new Audio();
        audio.id = 'audio-player';
        document.body.appendChild(audio);
    }
    audio.crossOrigin = 'anonymous';

    // Views
    const viewHome = document.getElementById('view-home');
    const viewArtist = document.getElementById('view-artist');
    const viewArtistsList = document.getElementById('view-artists-list');
    const viewSearchResults = document.getElementById('view-search-results');
    const allViews = [viewHome, viewArtist, viewArtistsList, viewSearchResults];

    // Navigation Links
    const navHome = document.getElementById('nav-home');
    const navArtists = document.getElementById('nav-artists');
    const brandHomeLink = document.getElementById('brand-home-link');

    // Search Elements
    const searchInput = document.getElementById('global-search-input');
    const searchClearBtn = document.getElementById('search-clear-btn');
    const searchQueryText = document.getElementById('search-query-text');
    const searchTracklist = document.getElementById('search-tracklist');

    // User Profile Modal
    const userProfileBtn = document.getElementById('user-profile-btn');
    const userModal = document.getElementById('user-modal');
    const modalCloseBtn = document.getElementById('modal-close-btn');

    // Player Elements
    const playerContainer = document.getElementById('player-container');
    const playerCard = document.getElementById('player-card');
    const playerMinimizeBtn = document.getElementById('player-minimize-btn');
    const playBtn = document.getElementById('play-btn');
    const playIcon = document.getElementById('play-icon');
    const pauseIcon = document.getElementById('pause-icon');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const shuffleBtn = document.getElementById('shuffle-btn');
    const repeatBtn = document.getElementById('repeat-btn');

    const albumCoverFrame = document.getElementById('album-cover-frame');
    const mainCoverImg = document.getElementById('main-cover-img');
    const trackTitleEl = document.getElementById('track-title');
    const trackArtistLink = document.getElementById('track-artist-link');
    const currentArtistHeading = document.getElementById('current-artist-heading');

    const timelineWrap = document.getElementById('timeline-wrap');
    const timelineProgress = document.getElementById('timeline-progress');
    const currentTimeEl = document.getElementById('current-time');
    const totalTimeEl = document.getElementById('total-time');

    // Bottom Mini-Player Elements
    const bottomMiniPlayer = document.getElementById('bottom-mini-player');
    const miniCoverImg = document.getElementById('mini-cover-img');
    const miniTrackTitle = document.getElementById('mini-track-title');
    const miniTrackArtist = document.getElementById('mini-track-artist');
    const miniShuffleBtn = document.getElementById('mini-shuffle-btn');
    const miniPrevBtn = document.getElementById('mini-prev-btn');
    const miniPlayBtn = document.getElementById('mini-play-btn');
    const miniPlayIcon = document.getElementById('mini-play-icon');
    const miniPauseIcon = document.getElementById('mini-pause-icon');
    const miniNextBtn = document.getElementById('mini-next-btn');
    const miniRepeatBtn = document.getElementById('mini-repeat-btn');
    const miniTimelineBar = document.getElementById('mini-timeline-bar');
    const miniTimelineProgress = document.getElementById('mini-timeline-progress');
    const miniMaximizeBtn = document.getElementById('mini-maximize-btn');
    const miniPlayerExpandTrigger = document.getElementById('mini-player-expand-trigger');
    const miniWaveWrapper = document.getElementById('mini-wave-wrapper');
    const miniVisualizerCanvas = document.getElementById('mini-visualizer-canvas');
    const miniLyricsWrapper = document.getElementById('mini-lyrics-wrapper');
    const miniLyricsTicker = document.getElementById('mini-lyrics-ticker');

    // Popovers
    const modeBtn = document.getElementById('mode-btn');
    const modePopup = document.getElementById('mode-popup');
    const modeMenuItems = document.querySelectorAll('.mode-menu-item');
    const modePopoverWrap = document.getElementById('mode-popover-wrap');

    const volumeBtn = document.getElementById('volume-btn');
    const volumePopup = document.getElementById('volume-popup');
    const volumePopoverWrap = document.getElementById('volume-popover-wrap');
    const volumeVerticalTrack = document.getElementById('volume-vertical-track');
    const volumeVerticalFill = document.getElementById('volume-vertical-fill');
    const volumeValText = document.getElementById('volume-val-text');
    const volIconHigh = document.getElementById('vol-icon-high');
    const volIconMute = document.getElementById('vol-icon-mute');

    const lyricsContainer = document.getElementById('lyrics-container');
    const visualizerCanvas = document.getElementById('visualizer-canvas');
    const viewPanels = document.querySelectorAll('.view-panel');

    // Artist Profile Header Elements
    const artistHeroName = document.getElementById('artist-hero-name');
    const artistHeroBio = document.getElementById('artist-hero-bio');
    const artistHeroImg = document.getElementById('artist-hero-img');
    const artistPlayRandomBtn = document.getElementById('artist-play-random-btn');
    const artistFollowBtn = document.getElementById('artist-follow-btn');
    const artistTracklist = document.getElementById('artist-tracklist');
    const homeTracklist = document.getElementById('home-tracklist');
    const artistsGrid = document.getElementById('artists-grid');

    // Player State
    let currentTrackIndex = 0;
    let currentActiveArtistId = 'synapse';
    let currentActiveMode = 'view-cover'; // 'view-cover', 'view-visualizer', 'view-lyrics'
    let currentLyrics = [];
    let isPlaying = false;
    let isShuffle = false;
    let isRepeat = false;
    let isPlayerMinimized = false;
    let previousVolume = 0.85;
    let isSeeking = false;
    let isAdjustingVolume = false;
    let activeLyricIndex = -1;
    let vizAnimationId = null;

    // Web Audio State
    let audioCtx = null;
    let analyserNode = null;
    let sourceNode = null;
    let isWebAudioReady = false;

    // --- 3. MINIMIZE / MAXIMIZE PLAYER CONTROLLER ---
    function minimizePlayer() {
        isPlayerMinimized = true;
        if (playerContainer) playerContainer.classList.add('minimized-hidden');
        if (bottomMiniPlayer) bottomMiniPlayer.style.display = 'grid';

        // Check active mode: If in lyrics mode, show mini lyrics ticker instead of visualizer
        if (currentActiveMode === 'view-lyrics') {
            if (miniLyricsWrapper) miniLyricsWrapper.style.display = 'flex';
            if (miniWaveWrapper) miniWaveWrapper.style.display = 'none';
        } else {
            if (miniLyricsWrapper) miniLyricsWrapper.style.display = 'none';
            if (miniWaveWrapper) miniWaveWrapper.style.display = 'flex';
            setTimeout(resizeMiniCanvas, 50);
        }
    }

    function maximizePlayer() {
        isPlayerMinimized = false;
        if (playerContainer) playerContainer.classList.remove('minimized-hidden');
        if (bottomMiniPlayer) bottomMiniPlayer.style.display = 'none';
        if (viewHome) switchView(viewHome);
        if (currentActiveMode === 'view-visualizer') {
            setTimeout(resizeCanvas, 50);
        }
    }

    if (playerMinimizeBtn) playerMinimizeBtn.addEventListener('click', minimizePlayer);
    if (miniMaximizeBtn) miniMaximizeBtn.addEventListener('click', maximizePlayer);
    if (miniPlayerExpandTrigger) miniPlayerExpandTrigger.addEventListener('click', maximizePlayer);

    // --- 4. VIEW SWITCHER NAVIGATION ---
    function switchView(targetView) {
        allViews.forEach(v => {
            if (v) v.style.display = 'none';
        });
        if (targetView) {
            targetView.style.display = 'flex';
        }
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    if (navHome) {
        navHome.addEventListener('click', (e) => {
            e.preventDefault();
            document.querySelectorAll('.sidebar-link').forEach(l => l.classList.remove('active'));
            navHome.classList.add('active');
            switchView(viewHome);
        });
    }

    if (brandHomeLink) {
        brandHomeLink.addEventListener('click', (e) => {
            e.preventDefault();
            document.querySelectorAll('.sidebar-link').forEach(l => l.classList.remove('active'));
            if (navHome) navHome.classList.add('active');
            switchView(viewHome);
        });
    }

    if (navArtists) {
        navArtists.addEventListener('click', (e) => {
            e.preventDefault();
            document.querySelectorAll('.sidebar-link').forEach(l => l.classList.remove('active'));
            navArtists.classList.add('active');
            renderArtistsGrid();
            switchView(viewArtistsList);
        });
    }

    // Sidebar Artist Quick-Item clicks
    document.querySelectorAll('.artist-quick-item').forEach(item => {
        item.addEventListener('click', () => {
            const artistId = item.getAttribute('data-artist');
            openArtistPage(artistId);
        });
    });

    // Track artist link click (below title in player)
    if (trackArtistLink) {
        trackArtistLink.addEventListener('click', () => {
            const track = DB.tracks[currentTrackIndex];
            if (track) openArtistPage(track.artistId);
        });
    }

    // Open Artist Profile Page
    function openArtistPage(artistId) {
        const artist = DB.artists.find(a => a.id === artistId) || DB.artists[0];
        currentActiveArtistId = artist.id;

        if (artistHeroName) artistHeroName.innerText = artist.name;
        if (artistHeroBio) artistHeroBio.innerText = `${artist.genre} • ${artist.bio}`;
        if (artistHeroImg) artistHeroImg.src = artist.avatar || 'capas/artist-synapse.jpg';

        // Update active artist dot in sidebar
        document.querySelectorAll('.artist-quick-item').forEach(el => {
            el.classList.toggle('active-artist', el.getAttribute('data-artist') === artist.id);
        });

        renderArtistTracklist(artist.id);
        switchView(viewArtist);
    }

    // Artist "Tocar Aleatório"
    if (artistPlayRandomBtn) {
        artistPlayRandomBtn.addEventListener('click', () => {
            const artistTracks = DB.tracks.filter(t => t.artistId === currentActiveArtistId);
            if (artistTracks.length > 0) {
                const randomTrack = artistTracks[Math.floor(Math.random() * artistTracks.length)];
                const trackIdx = DB.tracks.findIndex(t => t.id === randomTrack.id);
                switchView(viewHome);
                loadTrack(trackIdx !== -1 ? trackIdx : 0);
                playAudio();
            }
        });
    }

    // Artist Follow Toggle
    if (artistFollowBtn) {
        artistFollowBtn.addEventListener('click', () => {
            artistFollowBtn.classList.toggle('following');
            const isFollowing = artistFollowBtn.classList.contains('following');
            artistFollowBtn.innerHTML = isFollowing ? '<span>Seguindo ✓</span>' : '<span>Seguir</span>';
        });
    }

    // --- 5. LIVE SEARCH SYSTEM ---
    if (searchInput) {
        searchInput.addEventListener('input', () => {
            const query = searchInput.value.trim().toLowerCase();
            if (searchClearBtn) searchClearBtn.style.display = query ? 'block' : 'none';

            if (!query) {
                switchView(viewHome);
                return;
            }

            if (searchQueryText) searchQueryText.innerText = `Resultados para "${query}"`;
            renderSearchResults(query);
            switchView(viewSearchResults);
        });
    }

    if (searchClearBtn) {
        searchClearBtn.addEventListener('click', () => {
            searchInput.value = '';
            searchClearBtn.style.display = 'none';
            switchView(viewHome);
        });
    }

    function renderSearchResults(query) {
        if (!searchTracklist) return;
        searchTracklist.innerHTML = '';

        const matches = DB.tracks.filter(t =>
            t.title.toLowerCase().includes(query) ||
            t.artist.toLowerCase().includes(query) ||
            t.genre.toLowerCase().includes(query)
        );

        if (matches.length === 0) {
            searchTracklist.innerHTML = '<div style="color:var(--text-muted); padding:2rem 1rem;">Nenhuma música ou artista encontrado para esta busca.</div>';
            return;
        }

        renderTrackRows(matches, searchTracklist);
    }

    // --- 6. RENDER TRACKLISTS (HOME, ARTIST, SEARCH) ---
    function renderTrackRows(tracksArray, targetContainer) {
        if (!targetContainer) return;
        targetContainer.innerHTML = '';

        tracksArray.forEach((track, idx) => {
            const globalIndex = DB.tracks.findIndex(t => t.id === track.id);
            const row = document.createElement('div');
            row.className = `spotify-track-row ${globalIndex === currentTrackIndex ? 'active-row' : ''}`;
            row.setAttribute('data-index', globalIndex);

            row.innerHTML = `
                <div class="track-row-num">${idx + 1}</div>
                <div class="track-row-meta">
                    ${track.cover ? `<img src="${track.cover}" alt="${track.title}" class="track-row-thumb">` : `<div class="track-row-thumb-placeholder">${track.title.substring(0, 2).toUpperCase()}</div>`}
                    <div class="track-row-info">
                        <span class="track-row-title">${track.title}</span>
                        <span class="track-row-artist">${track.artist}</span>
                    </div>
                </div>
                <div class="track-row-album">${track.album || 'Single'}</div>
                <div class="track-row-duration">${formatTime(track.duration)}</div>
            `;

            row.addEventListener('click', () => {
                switchView(viewHome);
                loadTrack(globalIndex);
                playAudio();
            });

            targetContainer.appendChild(row);
        });
    }

    function renderHomeTracklist() {
        if (!homeTracklist) return;
        const currentTrack = DB.tracks[currentTrackIndex];
        const relatedTracks = DB.tracks.filter(t => t.artistId === currentTrack.artistId || t.genre === currentTrack.genre);
        if (currentArtistHeading) currentArtistHeading.innerText = currentTrack.artist;
        renderTrackRows(relatedTracks.length > 0 ? relatedTracks : DB.tracks, homeTracklist);
    }

    function renderArtistTracklist(artistId) {
        if (!artistTracklist) return;
        const artistTracks = DB.tracks.filter(t => t.artistId === artistId);
        renderTrackRows(artistTracks, artistTracklist);
    }

    function renderArtistsGrid() {
        if (!artistsGrid) return;
        artistsGrid.innerHTML = '';

        DB.artists.forEach(artist => {
            const card = document.createElement('div');
            card.className = 'artist-grid-card';
            card.innerHTML = `
                ${artist.avatar ? `<img src="${artist.avatar}" alt="${artist.name}" class="artist-card-avatar">` : `<div class="artist-card-placeholder">${artist.name.substring(0, 2).toUpperCase()}</div>`}
                <div class="artist-card-name">${artist.name}</div>
                <div class="artist-card-genre">${artist.genre}</div>
            `;
            card.addEventListener('click', () => {
                openArtistPage(artist.id);
            });
            artistsGrid.appendChild(card);
        });
    }

    // --- 7. USER PROFILE MODAL ---
    if (userProfileBtn && userModal) {
        userProfileBtn.addEventListener('click', () => {
            userModal.style.display = 'flex';
        });
    }

    if (modalCloseBtn && userModal) {
        modalCloseBtn.addEventListener('click', () => {
            userModal.style.display = 'none';
        });
    }

    if (userModal) {
        userModal.addEventListener('click', (e) => {
            if (e.target === userModal) userModal.style.display = 'none';
        });
    }

    // --- 8. LRC (LYRICS) PARSER ENGINE ---
    function parseLRC(lrcText) {
        const lines = lrcText.split('\n');
        const result = [];
        const timeRegex = /\[(\d{2}):(\d{2})(?:\.(\d{2,3}))?\]/;

        lines.forEach(line => {
            const trimmed = line.trim();
            if (!trimmed) return;

            const match = trimmed.match(timeRegex);
            if (match) {
                const min = parseInt(match[1], 10);
                const sec = parseInt(match[2], 10);
                const ms = match[3] ? parseFloat('0.' + match[3]) : 0;
                const totalSeconds = min * 60 + sec + ms;
                const text = trimmed.replace(timeRegex, '').trim();

                if (text) {
                    const isHeader = text.startsWith('[') && text.endsWith(']') || text.startsWith('(') && text.endsWith(')');
                    result.push({
                        time: totalSeconds,
                        text: text,
                        type: isHeader ? 'header' : 'lyric'
                    });
                }
            }
        });

        result.sort((a, b) => a.time - b.time);
        return result;
    }

    async function loadTrackLyrics(track) {
        if (!lyricsContainer) return;
        lyricsContainer.innerHTML = '<div style="color:var(--text-muted); margin-top:2rem;">Carregando letra...</div>';

        if (track.lrc) {
            try {
                const response = await fetch(track.lrc);
                if (response.ok) {
                    const lrcText = await response.text();
                    currentLyrics = parseLRC(lrcText);
                    renderLyrics(currentLyrics);
                    return;
                }
            } catch (err) {
                console.warn('Network fetch error for .lrc:', err);
            }
        }

        renderLyrics([]);
    }

    function renderLyrics(lyrics) {
        if (!lyricsContainer) return;
        lyricsContainer.innerHTML = '';

        if (!lyrics || lyrics.length === 0) {
            lyricsContainer.innerHTML = '<div style="color:var(--text-muted); margin-top:2rem;">Letra instrumental ou indisponível para esta faixa.</div>';
            return;
        }

        lyrics.forEach((item, idx) => {
            if (item.type === 'header') {
                const headerEl = document.createElement('div');
                headerEl.className = 'lyric-section-header';
                headerEl.innerText = item.text;
                lyricsContainer.appendChild(headerEl);
            } else {
                const lineEl = document.createElement('div');
                lineEl.className = 'lyric-line';
                lineEl.innerText = item.text;
                lineEl.setAttribute('data-time', item.time);
                lineEl.setAttribute('data-index', idx);
                lineEl.title = `Clique para ouvir a partir de ${formatTime(item.time)}`;

                lineEl.addEventListener('click', () => {
                    audio.currentTime = item.time;
                    if (!isPlaying) playAudio();
                });

                lyricsContainer.appendChild(lineEl);
            }
        });
    }

    function updateLyricsSync() {
        if (!currentLyrics || !lyricsContainer) return;
        const curr = audio.currentTime;
        let matchIdx = -1;

        currentLyrics.forEach((item, idx) => {
            if (item.type !== 'header' && curr >= item.time) {
                matchIdx = idx;
            }
        });

        if (matchIdx !== activeLyricIndex) {
            activeLyricIndex = matchIdx;
            const lyricLines = lyricsContainer.querySelectorAll('.lyric-line');
            lyricLines.forEach(line => line.classList.remove('active-line'));

            if (matchIdx !== -1) {
                const activeLine = lyricsContainer.querySelector(`.lyric-line[data-index="${matchIdx}"]`);
                if (activeLine) {
                    activeLine.classList.add('active-line');
                    activeLine.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }

                // Update Mini-Player Karaoke Ticker
                if (miniLyricsTicker && currentLyrics[matchIdx]) {
                    miniLyricsTicker.innerText = currentLyrics[matchIdx].text;
                }
            } else if (miniLyricsTicker) {
                miniLyricsTicker.innerText = isPlaying ? '♪ Tocando...' : 'RIVI Music';
            }
        }
    }

    // --- 9. LOAD TRACK & PLAYBACK ENGINE ---
    function loadTrack(index) {
        if (index < 0) index = DB.tracks.length - 1;
        if (index >= DB.tracks.length) index = 0;

        currentTrackIndex = index;
        activeLyricIndex = -1;
        if (miniLyricsTicker) miniLyricsTicker.innerText = '♪ Sincronizando letra...';
        const track = DB.tracks[index];
        if (!track) return;

        if (track.src) {
            audio.src = track.src;
        }

        // Main Player Info
        if (trackTitleEl) trackTitleEl.innerText = track.title;
        if (trackArtistLink) trackArtistLink.innerText = track.artist;
        if (mainCoverImg && track.cover) mainCoverImg.src = track.cover;
        if (totalTimeEl) totalTimeEl.innerText = formatTime(track.duration);

        // Mini Player Info
        if (miniTrackTitle) miniTrackTitle.innerText = track.title;
        if (miniTrackArtist) miniTrackArtist.innerText = track.artist;
        if (miniCoverImg && track.cover) miniCoverImg.src = track.cover;

        // Update active highlight across all visible track rows
        document.querySelectorAll('.spotify-track-row').forEach(row => {
            const rowIdx = parseInt(row.getAttribute('data-index'), 10);
            row.classList.toggle('active-row', rowIdx === index);
        });

        renderHomeTracklist();
        loadTrackLyrics(track);
    }

    // --- 10. RIVI DUAL ULTRA-FINE LASER WAVE VISUALIZER ENGINE ---
    function initWebAudio() {
        if (isWebAudioReady) return;
        try {
            const AudioContextClass = window.AudioContext || window.webkitAudioContext;
            audioCtx = new AudioContextClass();
            analyserNode = audioCtx.createAnalyser();
            analyserNode.fftSize = 256;
            analyserNode.smoothingTimeConstant = 0.82;

            sourceNode = audioCtx.createMediaElementSource(audio);
            sourceNode.connect(analyserNode);
            analyserNode.connect(audioCtx.destination);
            isWebAudioReady = true;
        } catch (e) {
            isWebAudioReady = false;
        }
    }

    function resizeCanvas() {
        if (!visualizerCanvas) return;
        const rect = visualizerCanvas.parentElement.getBoundingClientRect();
        const dpr = window.devicePixelRatio || 1;
        const displayWidth = Math.max(300, rect.width - 32);
        const displayHeight = 280;

        visualizerCanvas.width = displayWidth * dpr;
        visualizerCanvas.height = displayHeight * dpr;
        visualizerCanvas.style.width = `${displayWidth}px`;
        visualizerCanvas.style.height = `${displayHeight}px`;

        const ctx = visualizerCanvas.getContext('2d');
        ctx.scale(dpr, dpr);
    }

    function resizeMiniCanvas() {
        if (!miniVisualizerCanvas) return;
        const rect = miniVisualizerCanvas.parentElement.getBoundingClientRect();
        const dpr = window.devicePixelRatio || 1;
        const displayWidth = Math.max(120, rect.width - 12);
        const displayHeight = 36;

        miniVisualizerCanvas.width = displayWidth * dpr;
        miniVisualizerCanvas.height = displayHeight * dpr;
        miniVisualizerCanvas.style.width = `${displayWidth}px`;
        miniVisualizerCanvas.style.height = `${displayHeight}px`;

        const ctx = miniVisualizerCanvas.getContext('2d');
        ctx.scale(dpr, dpr);
    }

    window.addEventListener('resize', () => {
        resizeCanvas();
        resizeMiniCanvas();
    });
    resizeCanvas();
    resizeMiniCanvas();

    let smoothBass = 0;
    let smoothMids = 0;
    let smoothHighs = 0;
    let smoothOnset = 0;
    let smoothEnergy = 0;
    let runningPhase = 0;

    function getAudioFrame(time) {
        // Mode A: Real-Time Web Audio API
        if (isWebAudioReady && analyserNode && isPlaying) {
            const freqData = new Uint8Array(analyserNode.frequencyBinCount);
            analyserNode.getByteFrequencyData(freqData);

            let bSum = 0, mSum = 0, hSum = 0;
            const bEnd = Math.floor(freqData.length * 0.15);
            const mEnd = Math.floor(freqData.length * 0.60);

            for (let i = 0; i < bEnd; i++) bSum += freqData[i];
            for (let i = bEnd; i < mEnd; i++) mSum += freqData[i];
            for (let i = mEnd; i < freqData.length; i++) hSum += freqData[i];

            const bass = (bSum / (bEnd || 1)) / 255;
            const mids = (mSum / ((mEnd - bEnd) || 1)) / 255;
            const highs = (hSum / ((freqData.length - mEnd) || 1)) / 255;
            const energy = (bass * 0.45) + (mids * 0.35) + (highs * 0.20);
            return { bass, mids, highs, onset: bass > 0.6 ? bass : 0, energy };
        }

        // Mode B: Exact Physical Pre-Analyzed Audio Dataset
        if (typeof AUDIO_WAVE_DATA !== 'undefined') {
            const currentTrack = DB.tracks[currentTrackIndex] || DB.tracks[0];
            const trackData = AUDIO_WAVE_DATA[currentTrack.id] || AUDIO_WAVE_DATA['foolish-heart'] || AUDIO_WAVE_DATA;

            if (trackData && trackData.frames) {
                const fps = trackData.fps || 30;
                const totalFrames = trackData.frames;
                const exactFrame = time * fps;
                const f0 = Math.max(0, Math.min(totalFrames - 1, Math.floor(exactFrame)));
                const f1 = Math.min(totalFrames - 1, f0 + 1);
                const frac = exactFrame - f0;

                const bass0 = trackData.bass[f0] / 255;
                const bass1 = trackData.bass[f1] / 255;
                const bass = bass0 + (bass1 - bass0) * frac;

                const mids0 = trackData.mids[f0] / 255;
                const mids1 = trackData.mids[f1] / 255;
                const mids = mids0 + (mids1 - mids0) * frac;

                const highs0 = trackData.highs[f0] / 255;
                const highs1 = trackData.highs[f1] / 255;
                const highs = highs0 + (highs1 - highs0) * frac;

                const onset0 = trackData.onset[f0] / 255;
                const onset1 = trackData.onset[f1] / 255;
                const onset = onset0 + (onset1 - onset0) * frac;

                const energy = (bass * 0.45) + (mids * 0.35) + (highs * 0.20);
                return { bass, mids, highs, onset, energy };
            }
        }

        return { bass: 0, mids: 0, highs: 0, onset: 0, energy: 0 };
    }

    function drawVisualizer() {
        const currTime = audio.currentTime;
        const raw = isPlaying ? getAudioFrame(currTime) : { bass: 0, mids: 0, highs: 0, onset: 0, energy: 0 };

        if (isPlaying) {
            smoothBass += (raw.bass - smoothBass) * 0.45;
            smoothMids += (raw.mids - smoothMids) * 0.55;
            smoothHighs += (raw.highs - smoothHighs) * 0.6;
            smoothOnset += (raw.onset - smoothOnset) * 0.7;
            smoothEnergy += (raw.energy - smoothEnergy) * 0.5;
            runningPhase += 0.05 + (smoothOnset * 0.08);
        } else {
            smoothBass *= 0.92;
            smoothMids *= 0.92;
            smoothHighs *= 0.92;
            smoothOnset *= 0.90;
            smoothEnergy *= 0.92;
            runningPhase += 0.01;
        }

        // Render Main Visualizer (when not minimized)
        if (visualizerCanvas && !isPlayerMinimized) {
            const ctx = visualizerCanvas.getContext('2d');
            const width = parseFloat(visualizerCanvas.style.width) || (visualizerCanvas.width / (window.devicePixelRatio || 1));
            const height = parseFloat(visualizerCanvas.style.height) || (visualizerCanvas.height / (window.devicePixelRatio || 1));
            const centerY = height / 2;

            ctx.clearRect(0, 0, width, height);

            const pointsCount = Math.floor(width / 2.0);
            const strand1 = [];
            const strand2 = [];
            const strand3 = [];
            const corePoints = [];

            const separation = isPlaying ? (smoothEnergy * 24 + smoothOnset * 18) : 0;

            for (let i = 0; i <= pointsCount; i++) {
                const normX = i / pointsCount;
                const x = normX * width;
                const envelope = Math.pow(Math.sin(normX * Math.PI), 1.7);

                const timeOffset = (normX - 0.5) * 0.25;
                const localFrame = isPlaying ? getAudioFrame(Math.max(0, currTime + timeOffset)) : raw;

                const baseWave = Math.sin(normX * 8 + runningPhase * 2) * (smoothBass * 42);
                const midWave = Math.sin(normX * 18 - runningPhase * 4) * (smoothMids * 24);
                const highWave = Math.cos(normX * 36 + runningPhase * 7) * (smoothHighs * 14);
                const kickSpike = Math.sin(normX * 24 + runningPhase * 3) * (localFrame.onset * 26);
                const vocalJitter = Math.sin(normX * 60 + runningPhase * 12) * (localFrame.mids * 10);
                const idleWave = !isPlaying ? Math.sin(normX * 6 + runningPhase * 1.5) * 2.0 : 0;

                const yCore = centerY + (baseWave + midWave + highWave + kickSpike + vocalJitter + idleWave) * envelope;
                corePoints.push({ x, y: yCore });

                strand1.push({
                    x,
                    y: yCore - (separation * envelope * Math.cos(normX * 12 + runningPhase))
                });

                strand2.push({
                    x,
                    y: yCore + (separation * envelope * Math.sin(normX * 16 - runningPhase * 1.5))
                });

                strand3.push({
                    x,
                    y: yCore + (separation * 0.6 * envelope * Math.cos(normX * 28 + runningPhase * 2))
                });
            }

            if (isPlaying && separation > 1.5) {
                ctx.save();
                ctx.lineWidth = 1.0;
                ctx.lineCap = 'round';
                ctx.lineJoin = 'round';

                ctx.strokeStyle = 'rgba(255, 230, 0, 0.45)';
                ctx.shadowBlur = 8;
                ctx.shadowColor = '#ffe600';
                ctx.beginPath();
                ctx.moveTo(strand1[0].x, strand1[0].y);
                for (let i = 1; i < strand1.length; i++) ctx.lineTo(strand1[i].x, strand1[i].y);
                ctx.stroke();

                ctx.strokeStyle = 'rgba(255, 152, 0, 0.40)';
                ctx.shadowBlur = 8;
                ctx.shadowColor = '#ff9800';
                ctx.beginPath();
                ctx.moveTo(strand2[0].x, strand2[0].y);
                for (let i = 1; i < strand2.length; i++) ctx.lineTo(strand2[i].x, strand2[i].y);
                ctx.stroke();

                ctx.strokeStyle = 'rgba(255, 245, 180, 0.35)';
                ctx.shadowBlur = 6;
                ctx.shadowColor = '#fff5b4';
                ctx.beginPath();
                ctx.moveTo(strand3[0].x, strand3[0].y);
                for (let i = 1; i < strand3.length; i++) ctx.lineTo(strand3[i].x, strand3[i].y);
                ctx.stroke();

                ctx.restore();
            }

            ctx.save();
            const gradient = ctx.createLinearGradient(0, 0, width, 0);
            gradient.addColorStop(0, '#ffe600');
            gradient.addColorStop(0.5, '#fff04d');
            gradient.addColorStop(1, '#ff9800');

            ctx.strokeStyle = gradient;
            ctx.lineWidth = isPlaying ? 1.4 : 1.2;
            ctx.lineCap = 'round';
            ctx.lineJoin = 'round';
            ctx.shadowBlur = isPlaying ? 12 : 4;
            ctx.shadowColor = '#ffe600';

            ctx.beginPath();
            ctx.moveTo(corePoints[0].x, corePoints[0].y);
            for (let i = 1; i < corePoints.length; i++) ctx.lineTo(corePoints[i].x, corePoints[i].y);
            ctx.stroke();
            ctx.restore();
        }

        // Render Mini-Visualizer on bottom bar
        if (miniVisualizerCanvas && bottomMiniPlayer && bottomMiniPlayer.style.display !== 'none') {
            const mCtx = miniVisualizerCanvas.getContext('2d');
            const mWidth = parseFloat(miniVisualizerCanvas.style.width) || 160;
            const mHeight = parseFloat(miniVisualizerCanvas.style.height) || 36;
            const mCenterY = mHeight / 2;

            mCtx.clearRect(0, 0, mWidth, mHeight);

            const mPoints = Math.floor(mWidth / 2);
            mCtx.save();
            mCtx.lineWidth = isPlaying ? 1.4 : 1.0;
            mCtx.strokeStyle = '#ffe600';
            mCtx.shadowBlur = isPlaying ? 8 : 2;
            mCtx.shadowColor = '#ffe600';
            mCtx.beginPath();

            for (let i = 0; i <= mPoints; i++) {
                const normX = i / mPoints;
                const x = normX * mWidth;
                const env = Math.sin(normX * Math.PI);
                const w = Math.sin(normX * 10 + runningPhase * 3) * (smoothBass * 14) +
                          Math.sin(normX * 24 - runningPhase * 5) * (smoothMids * 8);
                const y = mCenterY + w * env;
                if (i === 0) mCtx.moveTo(x, y);
                else mCtx.lineTo(x, y);
            }
            mCtx.stroke();
            mCtx.restore();
        }

        vizAnimationId = requestAnimationFrame(drawVisualizer);
    }

    // --- 11. CONTROLS & EVENT LISTENERS ---
    function playAudio() {
        if (!isWebAudioReady) initWebAudio();
        if (audioCtx && audioCtx.state === 'suspended') {
            audioCtx.resume();
        }

        const playPromise = audio.play();
        if (playPromise !== undefined) {
            playPromise.then(() => {
                isPlaying = true;
                if (playerCard) playerCard.classList.add('playing');
                if (playIcon) playIcon.style.display = 'none';
                if (pauseIcon) pauseIcon.style.display = 'block';
                if (miniPlayIcon) miniPlayIcon.style.display = 'none';
                if (miniPauseIcon) miniPauseIcon.style.display = 'block';
            }).catch(err => {
                console.error('Playback error:', err);
                isPlaying = false;
                if (playerCard) playerCard.classList.remove('playing');
                if (playIcon) playIcon.style.display = 'block';
                if (pauseIcon) pauseIcon.style.display = 'none';
                if (miniPlayIcon) miniPlayIcon.style.display = 'block';
                if (miniPauseIcon) miniPauseIcon.style.display = 'none';
            });
        }
    }

    function pauseAudio() {
        audio.pause();
        isPlaying = false;
        if (playerCard) playerCard.classList.remove('playing');
        if (playIcon) playIcon.style.display = 'block';
        if (pauseIcon) pauseIcon.style.display = 'none';
        if (miniPlayIcon) miniPlayIcon.style.display = 'block';
        if (miniPauseIcon) miniPauseIcon.style.display = 'none';
    }

    function togglePlayPause() {
        if (isPlaying) {
            pauseAudio();
        } else {
            playAudio();
        }
    }

    playBtn.addEventListener('click', togglePlayPause);
    if (miniPlayBtn) miniPlayBtn.addEventListener('click', togglePlayPause);
    if (albumCoverFrame) albumCoverFrame.addEventListener('click', togglePlayPause);

    // Prev Button Click (Rewind or Previous Track)
    function handlePrevTrack() {
        if (audio.currentTime > 3) {
            audio.currentTime = 0;
        } else {
            let prevIdx = currentTrackIndex - 1;
            if (prevIdx < 0) prevIdx = DB.tracks.length - 1;
            loadTrack(prevIdx);
            playAudio();
        }
    }

    prevBtn.addEventListener('click', handlePrevTrack);
    if (miniPrevBtn) miniPrevBtn.addEventListener('click', handlePrevTrack);

    // Next Button Click (Next Track in Playlist)
    function handleNextTrack() {
        let nextIdx;
        if (isShuffle) {
            nextIdx = Math.floor(Math.random() * DB.tracks.length);
            if (nextIdx === currentTrackIndex) nextIdx = (nextIdx + 1) % DB.tracks.length;
        } else {
            nextIdx = (currentTrackIndex + 1) % DB.tracks.length;
        }
        loadTrack(nextIdx);
        playAudio();
    }

    nextBtn.addEventListener('click', handleNextTrack);
    if (miniNextBtn) miniNextBtn.addEventListener('click', handleNextTrack);

    // Shuffle & Repeat
    function toggleShuffle() {
        isShuffle = !isShuffle;
        if (shuffleBtn) shuffleBtn.classList.toggle('active-toggle', isShuffle);
        if (miniShuffleBtn) miniShuffleBtn.classList.toggle('active-toggle', isShuffle);
    }

    function toggleRepeat() {
        isRepeat = !isRepeat;
        if (repeatBtn) repeatBtn.classList.toggle('active-toggle', isRepeat);
        if (miniRepeatBtn) miniRepeatBtn.classList.toggle('active-toggle', isRepeat);
    }

    if (shuffleBtn) shuffleBtn.addEventListener('click', toggleShuffle);
    if (miniShuffleBtn) miniShuffleBtn.addEventListener('click', toggleShuffle);

    if (repeatBtn) repeatBtn.addEventListener('click', toggleRepeat);
    if (miniRepeatBtn) miniRepeatBtn.addEventListener('click', toggleRepeat);

    // Mode Switcher Popover
    modeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (volumePopup) volumePopup.classList.remove('show');
        modePopup.classList.toggle('show');
    });

    modeMenuItems.forEach(item => {
        item.addEventListener('click', () => {
            modeMenuItems.forEach(i => i.classList.remove('active'));
            viewPanels.forEach(p => p.classList.remove('active'));

            item.classList.add('active');
            const targetViewId = item.getAttribute('data-view');
            currentActiveMode = targetViewId;
            const targetPanel = document.getElementById(targetViewId);
            if (targetPanel) {
                targetPanel.classList.add('active');
            }

            modePopup.classList.remove('show');
            if (targetViewId === 'view-visualizer') {
                setTimeout(resizeCanvas, 50);
            }
        });
    });

    // Vertical Volume Popover
    volumeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (modePopup) modePopup.classList.remove('show');
        volumePopup.classList.toggle('show');
    });

    function setVerticalVolumeFromEvent(e) {
        if (!volumeVerticalTrack) return;
        const rect = volumeVerticalTrack.getBoundingClientRect();
        const clientY = e.clientY !== undefined ? e.clientY : (e.touches && e.touches[0] ? e.touches[0].clientY : rect.bottom);
        let pct = (rect.bottom - clientY) / rect.height;
        pct = Math.max(0, Math.min(1, pct));

        audio.volume = pct;
        if (pct > 0) previousVolume = pct;

        volumeVerticalFill.style.height = `${pct * 100}%`;
        volumeVerticalTrack.setAttribute('aria-valuenow', Math.round(pct * 100));
        if (volumeValText) volumeValText.innerText = `${Math.round(pct * 100)}%`;

        if (pct === 0) {
            volIconHigh.style.display = 'none';
            volIconMute.style.display = 'block';
        } else {
            volIconHigh.style.display = 'block';
            volIconMute.style.display = 'none';
        }
    }

    if (volumeVerticalTrack) {
        volumeVerticalTrack.addEventListener('pointerdown', (e) => {
            isAdjustingVolume = true;
            setVerticalVolumeFromEvent(e);
            volumeVerticalTrack.setPointerCapture(e.pointerId);
        });

        volumeVerticalTrack.addEventListener('pointermove', (e) => {
            if (isAdjustingVolume) setVerticalVolumeFromEvent(e);
        });

        volumeVerticalTrack.addEventListener('pointerup', () => { isAdjustingVolume = false; });
        volumeVerticalTrack.addEventListener('pointercancel', () => { isAdjustingVolume = false; });
    }

    document.addEventListener('click', (e) => {
        if (modePopoverWrap && !modePopoverWrap.contains(e.target)) modePopup.classList.remove('show');
        if (volumePopoverWrap && !volumePopoverWrap.contains(e.target)) volumePopup.classList.remove('show');
    });

    // Timeline Scrubbing & Time Update
    function formatTime(seconds) {
        if (isNaN(seconds) || seconds < 0) return '00:00';
        const m = Math.floor(seconds / 60);
        const s = Math.floor(seconds % 60);
        return `${m < 10 ? '0' : ''}${m}:${s < 10 ? '0' : ''}${s}`;
    }

    audio.addEventListener('timeupdate', () => {
        if (isSeeking) return;
        const dur = audio.duration || DB.tracks[currentTrackIndex].duration;
        if (dur > 0) {
            const pct = (audio.currentTime / dur) * 100;
            if (timelineProgress) timelineProgress.style.width = `${Math.min(100, Math.max(0, pct))}%`;
            if (miniTimelineProgress) miniTimelineProgress.style.width = `${Math.min(100, Math.max(0, pct))}%`;
            if (timelineWrap) timelineWrap.setAttribute('aria-valuenow', Math.round(pct));
        }
        if (currentTimeEl) currentTimeEl.innerText = formatTime(audio.currentTime);
        updateLyricsSync();
    });

    audio.addEventListener('ended', () => {
        if (isRepeat) {
            audio.currentTime = 0;
            playAudio();
        } else {
            let nextIdx = (currentTrackIndex + 1) % DB.tracks.length;
            loadTrack(nextIdx);
            playAudio();
        }
    });

    function seekTimeline(e) {
        const rect = timelineWrap.getBoundingClientRect();
        const clientX = e.clientX !== undefined ? e.clientX : (e.touches && e.touches[0] ? e.touches[0].clientX : 0);
        const clickX = clientX - rect.left;
        let pct = clickX / rect.width;
        pct = Math.max(0, Math.min(1, pct));

        const dur = audio.duration || DB.tracks[currentTrackIndex].duration;
        timelineProgress.style.width = `${pct * 100}%`;
        if (miniTimelineProgress) miniTimelineProgress.style.width = `${pct * 100}%`;
        if (currentTimeEl) currentTimeEl.innerText = formatTime(pct * dur);

        if (dur) audio.currentTime = pct * dur;
    }

    timelineWrap.addEventListener('pointerdown', (e) => {
        isSeeking = true;
        seekTimeline(e);
        timelineWrap.setPointerCapture(e.pointerId);
    });

    timelineWrap.addEventListener('pointermove', (e) => {
        if (isSeeking) seekTimeline(e);
    });

    timelineWrap.addEventListener('pointerup', () => { isSeeking = false; });
    timelineWrap.addEventListener('pointercancel', () => { isSeeking = false; });

    // Mini Timeline Scrubbing
    if (miniTimelineBar) {
        miniTimelineBar.addEventListener('click', (e) => {
            const rect = miniTimelineBar.getBoundingClientRect();
            const clickX = e.clientX - rect.left;
            const pct = Math.max(0, Math.min(1, clickX / rect.width));
            const dur = audio.duration || DB.tracks[currentTrackIndex].duration;
            if (dur) audio.currentTime = pct * dur;
        });
    }

    // Keyboard Shortcuts
    document.addEventListener('keydown', (e) => {
        if (['INPUT', 'TEXTAREA', 'BUTTON'].includes(document.activeElement.tagName)) {
            if (e.code !== 'Space') return;
        }

        if (e.code === 'Space') {
            e.preventDefault();
            togglePlayPause();
        } else if (e.code === 'ArrowRight') {
            e.preventDefault();
            audio.currentTime = Math.min(audio.duration || 999, audio.currentTime + 5);
        } else if (e.code === 'ArrowLeft') {
            e.preventDefault();
            audio.currentTime = Math.max(0, audio.currentTime - 5);
        }
    });

    // --- 12. INITIAL LOAD ---
    loadTrack(0);
    drawVisualizer();
});
