// ==============================================
// CARTINHAS DE AMOR - APLICATIVO PARA NAMORADA
// ==============================================

// Banco de dados das cartinhas (MODIFIQUE AQUI!)
const loveCards = [
    {
        id: 1,
        title: "Meu Amor ❤️",
        message: "Quero que saiba que cada momento ao seu lado é especial. Seu sorriso ilumina meus dias e seu amor preenche cada cantinho do meu coração. Eu te amo mais do que as palavras podem expressar.",
        signature: "Com todo meu amor, eternamente seu."
    },
    {
        id: 2,
        title: "Minha Razão de Sorrir 😊",
        message: "Quando penso em você, meu coração fica leve e um sorriso brota no meu rosto. Você transformou minha vida de uma maneira que eu nem imaginava ser possível. Obrigado por ser minha luz.",
        signature: "Seu amor para sempre."
    },
    {
        id: 3,
        title: "Nosso Mundo 🌍",
        message: "Juntos, criamos nosso próprio universo onde só existem amor, cumplicidade e sonhos compartilhados. Cada detalhe nosso é único e especial. Você é minha melhor escolha, sempre.",
        signature: "Do seu eterno companheiro."
    },
    {
        id: 4,
        title: "Promessa Eterna 💫",
        message: "Prometo estar ao seu lado nos dias bons e nos ruins. Prometo cuidar do nosso amor como a coisa mais preciosa que tenho. Prometo fazer você sorrir todos os dias.",
        signature: "Sempre seu, hoje e sempre."
    },
    {
        id: 5,
        title: "Gratidão 🙏",
        message: "Sou imensamente grato por ter você na minha vida. Obrigado pelo amor, pela paciência, pelo carinho e por cada momento compartilhado. Você é meu maior presente.",
        signature: "Com gratidão e amor infinito."
    },
    {
        id: 6,
        title: "Nosso Futuro ✨",
        message: "Sonho com nossos planos se realizando, com nossas mãos unidas enfrentando a vida. Cada passo que damos juntos é uma aventura maravilhosa. Mal posso esperar pelo que está por vir.",
        signature: "Do seu parceiro de sonhos."
    },
    {
        id: 7,
        title: "Teu Cheiro 🌹",
        message: "O seu cheiro é o meu perfume favorito. Sua voz é a melodia mais linda que já ouvi. Seu toque acalma minha alma. Você é perfeição em forma de pessoa.",
        signature: "Apaixonado por você."
    },
    {
        id: 8,
        title: "Minha Paz ☮️",
        message: "No seu colo encontro paz. No seu abraço encontro conforto. No seu amor encontro meu lar. Você é meu porto seguro em qualquer tempestade.",
        signature: "Seu refúgio eterno."
    }
];

// Variáveis globais
let currentCardIndex = 0;
let touchStartX = 0;
let touchEndX = 0;

// Elementos do DOM
const cardsContainer = document.getElementById('cardsContainer');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const randomBtn = document.getElementById('randomBtn');

// ==============================================
// FUNÇÕES PRINCIPAIS
// ==============================================

// Exibe uma cartinha
function displayCard(index) {
    const card = loveCards[index];
    
    cardsContainer.innerHTML = `
        <div class="card">
            <h2>${card.title}</h2>
            <div class="message">${card.message}</div>
            <div class="signature">${card.signature}</div>
        </div>
        <div class="tap-hint">← Deslize para os lados →</div>
    `;
    
    // Atualiza título da página
    document.title = `Cartinha ${index + 1} de ${loveCards.length} ❤️`;
}

// Próxima cartinha
function nextCard() {
    currentCardIndex = (currentCardIndex + 1) % loveCards.length;
    displayCard(currentCardIndex);
    playSwipeSound();
}

// Cartinha anterior
function prevCard() {
    currentCardIndex = (currentCardIndex - 1 + loveCards.length) % loveCards.length;
    displayCard(currentCardIndex);
    playSwipeSound();
}

// Cartinha aleatória
function randomCard() {
    let newIndex;
    do {
        newIndex = Math.floor(Math.random() * loveCards.length);
    } while (newIndex === currentCardIndex && loveCards.length > 1);
    
    currentCardIndex = newIndex;
    displayCard(currentCardIndex);
    
    // Efeito visual especial
    randomBtn.innerHTML = '<i class="fas fa-star"></i> Surpresa!';
    randomBtn.style.animation = 'pulse 0.5s';
    
    setTimeout(() => {
        randomBtn.innerHTML = '<i class="fas fa-random"></i> Surpresa!';
        randomBtn.style.animation = '';
    }, 1000);
    
    playHeartSound();
}

// ==============================================
// FUNÇÕES DE APOIO
// ==============================================

// Sons (opcional - funciona online)
function playHeartSound() {
    try {
        const audio = new Audio('https://assets.mixkit.co/sfx/preview/mixkit-heartbeat-1180.mp3');
        audio.volume = 0.3;
        audio.play().catch(e => console.log("Som não disponível"));
    } catch (e) {
        // Silenciosamente ignora erros de áudio
    }
}

function playSwipeSound() {
    try {
        const audio = new Audio('https://assets.mixkit.co/sfx/preview/mixkit-page-turn-swipe-1494.mp3');
        audio.volume = 0.2;
        audio.play().catch(e => console.log("Som não disponível"));
    } catch (e) {
        // Silenciosamente ignora erros de áudio
    }
}

// ==============================================
// EVENTOS E INICIALIZAÇÃO
// ==============================================

// Configura eventos de toque (swipe)
function setupSwipeEvents() {
    cardsContainer.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });
    
    cardsContainer.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, { passive: true });
}

// Processa o gesto de swipe
function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;
    
    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            // Swipe para esquerda = próxima
            nextCard();
        } else {
            // Swipe para direita = anterior
            prevCard();
        }
    }
}

// Configura eventos de clique
function setupClickEvents() {
    prevBtn.addEventListener('click', prevCard);
    nextBtn.addEventListener('click', nextCard);
    randomBtn.addEventListener('click', randomCard);
    
    // Clique na cartinha também muda
    cardsContainer.addEventListener('click', (e) => {
        if (e.target === cardsContainer || e.target.classList.contains('card')) {
            nextCard();
        }
    });
}

// Configura eventos de teclado
function setupKeyboardEvents() {
    document.addEventListener('keydown', (e) => {
        switch(e.key) {
            case 'ArrowRight':
            case ' ':
                nextCard();
                break;
            case 'ArrowLeft':
                prevCard();
                break;
            case 'r':
            case 'R':
                randomCard();
                break;
        }
    });
}

// Impede comportamento padrão do navegador
function preventDefaultGestures() {
    document.addEventListener('gesturestart', (e) => e.preventDefault());
    document.addEventListener('contextmenu', (e) => e.preventDefault());
}

// Inicializa o aplicativo
function initApp() {
    console.log('💖 Aplicativo de Cartinhas de Amor iniciado!');
    
    // Mostra primeira cartinha
    displayCard(currentCardIndex);
    
    // Configura todos os eventos
    setupSwipeEvents();
    setupClickEvents();
    setupKeyboardEvents();
    preventDefaultGestures();
    
    // Adiciona classe para prevenir seleção de texto
    document.body.classList.add('prevent-select');
    
    // Mostra mensagem no console
    console.log(`📱 ${loveCards.length} cartinhas carregadas com sucesso!`);
    console.log('👉 Use: Setas ← →, Espaço, ou clique nas cartinhas');
}

// ==============================================
// INICIALIZAÇÃO
// ==============================================

// Aguarda o carregamento completo da página
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
} else {
    initApp();
}

// Suporte para Service Worker (PWA)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('sw.js')
            .then(() => console.log('✅ Service Worker registrado'))
            .catch(err => console.log('❌ Service Worker falhou:', err));
    });
}