// Função para verificar se é o dia 13 de janeiro de 2026 (a partir da meia-noite)
function checkDate() {
    const now = new Date();
    const targetDate = new Date(2026, 0, 13, 0, 0, 0); // 13 de janeiro de 2026, 00:00:00

    // Verifica se a data/hora atual é igual ou posterior à meia-noite do dia 13
    return now >= targetDate;
}

// Função para mostrar ou esconder o conteúdo
function toggleContent() {
    const lockScreen = document.getElementById('lockScreen');
    const mainContent = document.getElementById('mainContent');
    const quizScreen = document.getElementById('quizScreen');

    if (checkDate()) {
        // É 13 de janeiro - verifica se já passou pelo quiz
        const quizCompleted = localStorage.getItem('quizCompleted') === 'true';
        
        if (quizCompleted) {
            // Quiz já foi completado - mostra o conteúdo
            lockScreen.classList.add('hidden');
            quizScreen.classList.add('hidden');
            mainContent.classList.remove('hidden');
        } else {
            // Mostra o quiz
            lockScreen.classList.add('hidden');
            mainContent.classList.add('hidden');
            quizScreen.classList.remove('hidden');
            initQuiz();
        }
    } else {
        // Não é 13 de janeiro - mostra tela de bloqueio
        lockScreen.classList.remove('hidden');
        mainContent.classList.add('hidden');
        quizScreen.classList.add('hidden');
    }
}

// Perguntas do quiz
const quizQuestions = [
    {
        question: "Qual foi a minha primeira mensagem?",
        correct: "Quero esse colar pra mim hein",
        wrong: ["Lindo colar", "Meu deus que estilo musical bom", "veigh baby uh uh"]
    },
    {
        question: "Qual foi o primeiro lugar que a gente saiu?",
        correct: "Filmore Ipiranga",
        wrong: ["Filmore Mooca", "Shopping Mooca", "Petshop"]
    },
    {
        question: "Quantos por cento é o nosso match no Spotify?",
        correct: "97%",
        wrong: ["98%", "96%", "99%"]
    },
    {
        question: "Qual foi a frase que mais me marcou desde o nosso primeiro encontro?",
        correct: "eu nao quero que minha vida inteira seja um ato de deixar ir. pelo menos, uma vez, eu quero agarrar-me a algo, pertencer, e nunca mais ter de partir",
        wrong: ["Veigh Baby", "Rosas são vermelhas, violetas são azuis, mas seu sorriso florescendo é o que enche o meu dia de luz", "I open my eyes"]
    }
];

let currentQuestion = 0;
let userAnswers = [];

// Função para inicializar o quiz
function initQuiz() {
    currentQuestion = 0;
    userAnswers = [];
    showQuestion(0);
}

// Função para mostrar a pergunta atual
function showQuestion(index) {
    const quizContent = document.getElementById('quizContent');
    if (!quizContent) return;
    
    if (index >= quizQuestions.length) {
        checkQuizAnswers();
        return;
    }
    
    const question = quizQuestions[index];
    const allAnswers = [question.correct, ...question.wrong].sort(() => Math.random() - 0.5);
    
    quizContent.innerHTML = `
        <div class="question-container">
            <div class="question-number">Pergunta ${index + 1} de ${quizQuestions.length}</div>
            <h2 class="question-text">${question.question}</h2>
            <div class="answers-container">
                ${allAnswers.map((answer, i) => `
                    <button class="answer-btn" onclick="selectAnswer(${index}, '${answer.replace(/'/g, "\\'")}')">
                        ${answer}
                    </button>
                `).join('')}
            </div>
        </div>
    `;
}

// Função para selecionar uma resposta
function selectAnswer(questionIndex, answer) {
    userAnswers[questionIndex] = answer;
    
    // Desabilita todos os botões
    const buttons = document.querySelectorAll('.answer-btn');
    buttons.forEach(btn => {
        btn.disabled = true;
        if (btn.textContent.trim() === answer) {
            btn.classList.add('selected');
        }
    });
    
    // Aguarda um pouco e passa para próxima pergunta
    setTimeout(() => {
        showQuestion(questionIndex + 1);
    }, 1000);
}

// Função para verificar as respostas
function checkQuizAnswers() {
    const quizContent = document.getElementById('quizContent');
    const quizResult = document.getElementById('quizResult');
    
    let correctCount = 0;
    quizQuestions.forEach((question, index) => {
        if (userAnswers[index] === question.correct) {
            correctCount++;
        }
    });
    
    if (correctCount === quizQuestions.length) {
        // Todas corretas - libera o site
        quizContent.innerHTML = '';
        quizResult.classList.remove('hidden');
        quizResult.innerHTML = `
            <div class="result-success">
                <h2>🎉 Parabéns! Você acertou todas! 🎉</h2>
                <p>Você realmente me conhece bem! 💕</p>
                <p class="result-message">Agora você pode ver sua surpresa especial!</p>
                <button class="unlock-btn" onclick="unlockSite()">Ver Minha Surpresa! ✨</button>
            </div>
        `;
    } else {
        // Algumas erradas - permite tentar novamente
        quizContent.innerHTML = '';
        quizResult.classList.remove('hidden');
        quizResult.innerHTML = `
            <div class="result-error">
                <h2>😅 Quase lá!</h2>
                <p>Você acertou ${correctCount} de ${quizQuestions.length} perguntas.</p>
                <p class="result-message">Tente novamente! Você consegue! 💪</p>
                <button class="retry-btn" onclick="retryQuiz()">Tentar Novamente</button>
            </div>
        `;
    }
}

// Função para liberar o site
function unlockSite() {
    localStorage.setItem('quizCompleted', 'true');
    const quizScreen = document.getElementById('quizScreen');
    const mainContent = document.getElementById('mainContent');
    
    quizScreen.classList.add('hidden');
    mainContent.classList.remove('hidden');
    
    // Carrega todo o conteúdo
    updateMessages();
    addPhotos();
    addVideo();
    initScrollAnimations();
    initCounter();
}

// Função para tentar novamente
function retryQuiz() {
    const quizResult = document.getElementById('quizResult');
    quizResult.classList.add('hidden');
    currentQuestion = 0;
    userAnswers = [];
    showQuestion(0);
}

// Função para atualizar as mensagens personalizadas
function updateMessages() {
    // Mensagem do primeiro encontro
    const firstMeetingMessage = document.getElementById('firstMeetingMessage');
    if (firstMeetingMessage) {
        firstMeetingMessage.textContent =
            "60 reais em um pao com ovo kkkk mas valeu a pena pra ter te conhecido" +
            "me assustei um pouco com as historias mas nesse dia eu fiquei muito feliz";
    }

    // Mensagem do vídeo principal (hero)
    const heroVideoMessage = document.getElementById('heroVideoMessage');
    if (heroVideoMessage) {
        heroVideoMessage.innerHTML =
            "Este é o nosso vídeo especial! 💕<br><br>" +
            "Aqui foi nosso primeiro encontro foi incrivel,e eu tava tao timido que nao conseguia segurar sua mao kkkkk  " +
            "Nunca tinha saido em um date ou feito algo do tipo, mas voce me surpreendeu e me fez sentir bem";
    }

    // Mensagem do vídeo (seção abaixo)
    const videoMessage = document.getElementById('videoMessage');
    if (videoMessage) {
        videoMessage.textContent =
            "Mensagem especial para acompanhar o vídeo! " +
            "Edite este texto no arquivo script.js para personalizar.";
    }

    // Mensagem final
    const finalMessage = document.getElementById('finalMessage');
    if (finalMessage) {
        finalMessage.innerHTML =
            "Vi, hoje você completa 19 anos e eu não poderia estar mais orgulhoso da pessoa incrível que você é! 💕<br><br>" +
            "Você é uma menina forte, corajosa e cheia de luz. Cada dia conversando com você é uma bênção e eu sou muito grato por ter você na minha vida.<br><br>" +
            "Você não faz ideia do quanto eu gosto de você e do quanto sou orgulhoso de ver você enfretando a vida" +
            "Desde que te conheci voce virou minha pessoa favorita para conversar, meu conforto, e minha paz, para tudo que ja precisei <br><br>" +
            "Que seus 19 anos sejam repletos de felicidade, sonhos realizados e momentos inesquecíveis! " +
            "Espero estar ao seu lado em varios deles! 🎂🎉<br><br>" +
            "Feliz aniversario! 💝";
    }
}

// Função para adicionar fotos automaticamente das pastas
function addPhotos() {
    // Lista de fotos do primeiro encontro (vão para "Nossos Momentos")
    const primeiroEncontro = [
        'WhatsApp Image 2026-01-10 at 02.21.37 (1).jpeg',
        'WhatsApp Image 2026-01-10 at 02.21.37.jpeg',
        'WhatsApp Image 2026-01-10 at 02.21.38 (1).jpeg',
        'WhatsApp Image 2026-01-10 at 02.21.38 (2).jpeg',
        'WhatsApp Image 2026-01-10 at 02.21.38 (3).jpeg',
        'WhatsApp Image 2026-01-10 at 02.21.38.jpeg',
        'WhatsApp Image 2026-01-10 at 02.21.39 (1).jpeg',
        'WhatsApp Image 2026-01-10 at 02.21.39.jpeg',
        'WhatsApp Image 2026-01-10 at 02.21.40 (1).jpeg',
        'WhatsApp Image 2026-01-10 at 02.21.40 (2).jpeg',
        'WhatsApp Image 2026-01-10 at 02.21.40.jpeg',
        'WhatsApp Image 2026-01-10 at 02.21.41 (1).jpeg',
        'WhatsApp Image 2026-01-10 at 02.21.41 (2).jpeg',
        'WhatsApp Image 2026-01-10 at 02.21.41.jpeg'
    ];

    // Lista de fotos de outros encontros (vão para "Mais Momentos Especiais")
    const outrosEncontros = [
        'WhatsApp Image 2026-01-10 at 02.21.43 (1).jpeg',
        'WhatsApp Image 2026-01-10 at 02.21.43.jpeg',
        'WhatsApp Image 2026-01-10 at 02.21.44 (1).jpeg',
        'WhatsApp Image 2026-01-10 at 02.21.44.jpeg',
        'WhatsApp Image 2026-01-10 at 02.21.50 (1).jpeg',

        'WhatsApp Image 2026-01-10 at 02.21.50 (3).jpeg',
        'WhatsApp Image 2026-01-10 at 02.22.02 (1).jpeg',
        'spotify.jpeg',
        'avenida.jfif',
        'cinema.jfif'
    ];

    // Lista de fotos aleatórias
    const fotosAleatorias = [
        'WhatsApp Image 2026-01-10 at 02.21.42 (1).jpeg',
        'WhatsApp Image 2026-01-10 at 02.21.42 (2).jpeg',
        'WhatsApp Image 2026-01-10 at 02.21.42.jpeg',
        'WhatsApp Image 2026-01-10 at 02.21.45.jpeg',
        'WhatsApp Image 2026-01-10 at 02.21.48.jpeg',
        'WhatsApp Image 2026-01-10 at 02.21.51 (1).jpeg',
        'WhatsApp Image 2026-01-10 at 02.21.52 (3).jpeg',
        'WhatsApp Image 2026-01-10 at 02.21.53 (1).jpeg',
        'WhatsApp Image 2026-01-10 at 02.21.53.jpeg',
        'WhatsApp Image 2026-01-10 at 02.22.02.jpeg'
    ];

    // Lista de fotos da Mayte
    const fotosMayte = [
        'WhatsApp Image 2026-01-10 at 02.21.48 (1).jpeg',
        'WhatsApp Image 2026-01-10 at 02.21.48 (2).jpeg',
        'WhatsApp Image 2026-01-10 at 02.21.48 (3).jpeg',
        'WhatsApp Image 2026-01-10 at 02.21.48 (4).jpeg',
        'WhatsApp Image 2026-01-10 at 02.21.49 (1).jpeg',
        'WhatsApp Image 2026-01-10 at 02.21.49.jpeg',
        'WhatsApp Image 2026-01-10 at 02.21.51 (2).jpeg',
        'WhatsApp Image 2026-01-10 at 02.21.51 (3).jpeg',
        'WhatsApp Image 2026-01-10 at 02.21.51 (4).jpeg',
        'WhatsApp Image 2026-01-10 at 02.21.52 (2).jpeg',
        'WhatsApp Image 2026-01-10 at 02.21.52.jpeg',
        'WhatsApp Image 2026-01-10 at 02.22.00.jpeg',
        'maytee.jfif',
        'mayteeee.jfif'
    ];

    // Adiciona fotos do primeiro encontro na seção "Primeiro Encontro"
    primeiroEncontro.forEach(foto => {
        addImageToSection('firstMeetingPhotos', `primeiro encontro/${foto}`, 'Nosso primeiro encontro');
    });

    // Adiciona fotos aleatórias
    fotosAleatorias.forEach(foto => {
        addImageToSection('randomPhotos', `fotos aleatorias/${foto}`, 'Foto especial que você me mandou');
    });

    // Adiciona fotos da Mayte
    fotosMayte.forEach(foto => {
        addImageToSection('maytePhotos', `mayte/${foto}`, 'Mayte - A menininha mais linda!');
    });

    // As fotos de "outros encontros" vão para "Mais Momentos Especiais" com legendas
    // Você pode personalizar as legendas aqui editando o objeto abaixo
    const legendasFotos = {
        'WhatsApp Image 2026-01-10 at 02.21.43 (1).jpeg': 'Quero o moleton do tupac meda',
        'WhatsApp Image 2026-01-10 at 02.21.43.jpeg': 'Pegando busão lotado pra assustar a riqueza',
        'WhatsApp Image 2026-01-10 at 02.21.44 (1).jpeg': '00:00 esperando o busao pra ir pra casa porque nao queria ir embora ',
        'WhatsApp Image 2026-01-10 at 02.21.44.jpeg': 'Voltando pra casa com metro vazio seloco',
        'WhatsApp Image 2026-01-10 at 02.21.50 (1).jpeg': 'Se voce uma pessoa que tem a unha feia quem voce seria',

        'WhatsApp Image 2026-01-10 at 02.21.50 (3).jpeg': 'Preciso nem falar né AURA',
        'WhatsApp Image 2026-01-10 at 02.22.02 (1).jpeg': 'Double date com o andrey e a maria',
        'spotify.jpeg': 'Veigh Baby',
        'avenida.jfif': 'TOda vez que passo aqui lembro da gente andando 2km pra ir em um lugar fechado kkkkk',
        'cinema.jfif': 'Quase nao prestei atenção no filme pensando se voce tava gostando kkkk'
    };

    outrosEncontros.forEach(foto => {
        const legenda = legendasFotos[foto] || 'Mais um momento especial';
        addImageWithCaption('morePhotos', `outros encontros/${foto}`, legenda);
    });
}

// Função para adicionar vídeo principal
function addVideo() {
    const heroVideoWrapper = document.getElementById('mainHeroVideo');
    if (!heroVideoWrapper) return;

    // Remove placeholder se existir
    const placeholder = heroVideoWrapper.querySelector('.hero-placeholder');

    // Vídeo principal da pasta videos
    const video = document.createElement('video');
    video.src = 'videos/WhatsApp Video 2026-01-10 at 02.35.23.mp4';
    video.controls = true;
    video.autoplay = false;
    video.muted = false;
    video.loop = false;
    video.preload = 'metadata';
    video.style.width = '100%';
    video.style.height = 'auto';
    video.style.borderRadius = '30px';
    video.style.display = 'block';

    // Adiciona evento de erro caso o vídeo não carregue
    video.onerror = function () {
        console.warn('Erro ao carregar vídeo. Verifique se o arquivo existe na pasta videos/');
    };

    if (placeholder) {
        placeholder.remove();
    }
    heroVideoWrapper.appendChild(video);

    // OPÇÃO 2: YouTube (descomente e coloque o ID do vídeo)
    // const iframe = document.createElement('iframe');
    // iframe.src = 'https://www.youtube.com/embed/SEU_VIDEO_ID_AQUI';
    // iframe.width = '100%';
    // iframe.height = '600';
    // iframe.frameBorder = '0';
    // iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
    // iframe.allowFullscreen = true;
    // iframe.style.borderRadius = '30px';
    // if (placeholder) placeholder.remove();
    // heroVideoWrapper.appendChild(iframe);

    // OPÇÃO 3: Vimeo (descomente e coloque o ID do vídeo)
    // const iframe = document.createElement('iframe');
    // iframe.src = 'https://player.vimeo.com/video/SEU_VIDEO_ID_AQUI';
    // iframe.width = '100%';
    // iframe.height = '600';
    // iframe.frameBorder = '0';
    // iframe.allow = 'autoplay; fullscreen; picture-in-picture';
    // iframe.allowFullscreen = true;
    // iframe.style.borderRadius = '30px';
    // if (placeholder) placeholder.remove();
    // heroVideoWrapper.appendChild(iframe);

    // Por enquanto, deixamos o placeholder
}

// Função para animação de scroll reveal
function initScrollAnimations() {
    const sections = document.querySelectorAll('.section');

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Anima elementos filhos com delay
                const children = entry.target.querySelectorAll('.message-box, .photo-grid > *');
                children.forEach((child, index) => {
                    setTimeout(() => {
                        child.style.opacity = '0';
                        child.style.transform = 'translateY(30px)';
                        child.style.transition = 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
                        setTimeout(() => {
                            child.style.opacity = '1';
                            child.style.transform = 'translateY(0)';
                        }, 50);
                    }, index * 100);
                });
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });
}

// Função para calcular e atualizar o contador
function initCounter() {
    // Data da primeira mensagem: 13 de novembro de 2025
    const firstMessageDate = new Date(2025, 10, 13, 0, 0, 0); // 13 de novembro de 2025 (mês 10 = novembro, pois janeiro é 0)

    function updateCounter() {
        const now = new Date();
        const diff = now - firstMessageDate;

        // Calcula dias, horas, minutos e segundos
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        // Atualiza os elementos com animação
        updateCounterElement('days', days);
        updateCounterElement('hours', hours);
        updateCounterElement('minutes', minutes);
        updateCounterElement('seconds', seconds);
    }

    function updateCounterElement(id, value) {
        const element = document.getElementById(id);
        if (!element) return;

        const currentValue = parseInt(element.textContent) || 0;

        if (currentValue !== value) {
            element.classList.add('updating');
            element.textContent = value.toString().padStart(2, '0');

            setTimeout(() => {
                element.classList.remove('updating');
            }, 500);
        } else {
            element.textContent = value.toString().padStart(2, '0');
        }
    }

    // Atualiza imediatamente e depois a cada segundo
    updateCounter();
    setInterval(updateCounter, 1000);
}

// Função para atualizar o contador regressivo na tela de bloqueio
function updateCountdown() {
    const now = new Date();
    const targetDate = new Date(2026, 0, 13, 0, 0, 0); // 13 de janeiro de 2026, 00:00:00
    const diff = targetDate - now;

    if (diff <= 0) {
        // Já passou da data, libera o site
        toggleContent();
        return;
    }

    // Calcula dias, horas, minutos e segundos restantes
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    // Atualiza os elementos na tela de bloqueio
    const countdownElement = document.getElementById('countdown');
    if (countdownElement) {
        countdownElement.innerHTML = `
            <div class="countdown-item">
                <div class="countdown-number">${days}</div>
                <div class="countdown-label">Dias</div>
            </div>
            <div class="countdown-separator">:</div>
            <div class="countdown-item">
                <div class="countdown-number">${hours.toString().padStart(2, '0')}</div>
                <div class="countdown-label">Horas</div>
            </div>
            <div class="countdown-separator">:</div>
            <div class="countdown-item">
                <div class="countdown-number">${minutes.toString().padStart(2, '0')}</div>
                <div class="countdown-label">Minutos</div>
            </div>
            <div class="countdown-separator">:</div>
            <div class="countdown-item">
                <div class="countdown-number">${seconds.toString().padStart(2, '0')}</div>
                <div class="countdown-label">Segundos</div>
            </div>
        `;
    }
}

// Inicialização quando a página carrega
document.addEventListener('DOMContentLoaded', function () {
    // Para testar o quiz localmente, descomente a linha abaixo para limpar o localStorage:
    // localStorage.removeItem('quizCompleted');
    
    toggleContent();
    updateCountdown();

    // Se o site ainda estiver bloqueado, atualiza o contador a cada segundo
    if (!checkDate()) {
        setInterval(function () {
            updateCountdown();
            // Verifica se já pode liberar
            if (checkDate()) {
                toggleContent();
            }
        }, 1000); // Atualiza a cada segundo
    } else {
        // Se já estiver liberado, verifica se precisa mostrar quiz ou conteúdo
        toggleContent();
    }

    // Adiciona animação suave ao scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

// Função auxiliar para adicionar imagens facilmente
// Use esta função para adicionar fotos nas seções
function addImageToSection(sectionId, imageSrc, imageAlt = 'Foto') {
    const section = document.getElementById(sectionId);
    if (!section) return;

    // Remove placeholder se existir (apenas na primeira vez)
    const placeholder = section.querySelector('.photo-placeholder');
    if (placeholder && section.children.length === 1) {
        placeholder.remove();
    }

    // Cria elemento de imagem
    const img = document.createElement('img');
    // Codifica o caminho para lidar com espaços e caracteres especiais
    img.src = encodeURI(imageSrc).replace(/#/g, '%23');
    img.alt = imageAlt;
    img.loading = 'lazy';
    img.onerror = function () {
        console.warn('Erro ao carregar imagem:', imageSrc);
        this.style.display = 'none';
    };

    // Adiciona à seção
    section.appendChild(img);
}

// Função para adicionar imagens com legenda (usada na seção "Mais Momentos Especiais")
function addImageWithCaption(sectionId, imageSrc, caption = '') {
    const section = document.getElementById(sectionId);
    if (!section) return;

    // Remove placeholder se existir (apenas na primeira vez)
    const placeholder = section.querySelector('.photo-placeholder');
    if (placeholder && section.children.length === 1) {
        placeholder.remove();
    }

    // Cria container para foto com legenda
    const photoContainer = document.createElement('div');
    photoContainer.className = 'photo-with-caption';

    // Cria elemento de imagem
    const img = document.createElement('img');
    img.src = encodeURI(imageSrc).replace(/#/g, '%23');
    img.alt = caption || 'Foto especial';
    img.loading = 'lazy';
    img.onerror = function () {
        console.warn('Erro ao carregar imagem:', imageSrc);
        photoContainer.style.display = 'none';
    };

    // Cria elemento de legenda
    const captionElement = document.createElement('div');
    captionElement.className = 'photo-caption';
    captionElement.textContent = caption;

    // Adiciona imagem e legenda ao container
    photoContainer.appendChild(img);
    photoContainer.appendChild(captionElement);

    // Adiciona à seção
    section.appendChild(photoContainer);
}

// Exemplo de uso (descomente e ajuste os caminhos):
// addImageToSection('photosTogether', 'fotos/nossas-fotos/foto1.jpg', 'Nós juntos');
// addImageToSection('randomPhotos', 'fotos/aleatorias/foto1.jpg', 'Foto aleatória');
// addImageToSection('maytePhotos', 'fotos/mayte/foto1.jpg', 'Mayte fofa');
// addImageToSection('morePhotos', 'fotos/mais/foto1.jpg', 'Mais um momento especial');
