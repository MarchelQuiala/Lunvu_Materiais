// ============================================
// MENU LATERAL (SIDEBAR) - FUNCIONANDO EM TODAS AS TELAS
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    
    // Elementos do menu lateral
    const menuToggle = document.querySelector('.menu-toggle');
    const sidebar = document.querySelector('.sidebar');
    const sidebarOverlay = document.querySelector('.sidebar-overlay');
    const sidebarClose = document.querySelector('.sidebar-close');
    const sidebarLinks = document.querySelectorAll('.sidebar-nav a');
    
    console.log('✅ Script carregado!');
    
    // 1. ABRIR MENU LATERAL (clicar nas 3 barras)
    if (menuToggle) {
        menuToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            sidebar.classList.add('active');
            sidebarOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    }
    
    // 2. FECHAR MENU LATERAL (função)
    function closeSidebar() {
        sidebar.classList.remove('active');
        sidebarOverlay.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
    
    // 3. FECHAR COM BOTÃO X
    if (sidebarClose) {
        sidebarClose.addEventListener('click', function(e) {
            e.stopPropagation();
            closeSidebar();
        });
    }
    
    // 4. FECHAR CLICANDO FORA (no overlay)
    if (sidebarOverlay) {
        sidebarOverlay.addEventListener('click', function(e) {
            if (e.target === sidebarOverlay) {
                closeSidebar();
            }
        });
    }
    
    // 5. FECHAR AO CLICAR EM UM LINK DO MENU
    sidebarLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            if (!this.href.includes('tel:')) {
                closeSidebar();
            }
        });
    });
    
    // 6. FECHAR COM TECLA ESC
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' || event.key === 'Esc') {
            closeSidebar();
        }
    });
    
    // 7. Impedir que cliques dentro do sidebar fechem o menu
    sidebar.addEventListener('click', function(e) {
        e.stopPropagation();
    });
    
    // ============================================
    // ANIMAÇÃO DE ESTATÍSTICAS
    // ============================================
// ============================================
// CONTAGEM AUTOMÁTICA DAS ESTATÍSTICAS
// ============================================
function animateCounter(element, target, suffix = '') {
    let current = 0;
    const increment = target / 50;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current) + suffix;
    }, 30);
}

// CORREÇÃO: Usando a seção correta .stats-grid
const statsSection = document.querySelector('.stats-grid');
const stats = document.querySelectorAll('.stat-item h3'); // CORRIGIDO: .stat-item h3

if (statsSection && stats.length > 0) {
    let alreadyCounted = false; // Evita contar múltiplas vezes
    
    const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && !alreadyCounted) {
            alreadyCounted = true;
            
            stats.forEach(stat => {
                const text = stat.textContent;
                let target, suffix = '';
                
                if (text.includes('+')) {
                    target = parseInt(text.replace('+', ''));
                    suffix = '+';
                } else if (text.includes('%')) {
                    target = parseInt(text.replace('%', ''));
                    suffix = '%';
                } else if (text.includes('anos') || text.includes('Anos')) {
                    target = parseInt(text);
                    suffix = '+ Anos';
                } else {
                    target = parseInt(text);
                }
                
                if (!isNaN(target)) {
                    // Reseta o texto para 0 antes de começar a contar
                    stat.textContent = '0' + suffix;
                    animateCounter(stat, target, suffix);
                }
            });
            
            observer.unobserve(statsSection);
        }
    }, { threshold: 0.3 }); // Começa quando 30% da seção estiver visível
    
    observer.observe(statsSection);
}
    
    // ============================================
    // NAVBAR COM EFEITO AO SCROLL
    // ============================================
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.97)';
            navbar.style.backdropFilter = 'blur(10px)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.backgroundColor = 'white';
            navbar.style.backdropFilter = 'none';
            navbar.style.boxShadow = '0 2px 15px rgba(0, 0, 0, 0.1)';
        }
    });
    
    // ============================================
    // ATUALIZAR ANO NO FOOTER
    // ============================================
    const footerYear = document.querySelector('.footer-bottom p');
    if (footerYear) {
        const currentYear = new Date().getFullYear();
        footerYear.innerHTML = footerYear.innerHTML.replace('2024', currentYear);
    }
    
    // ============================================
    // SCROLL SUAVE PARA LINKS INTERNOS
    // ============================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#' || href === '') return;
            const targetElement = document.querySelector(href);
            if (targetElement) {
                e.preventDefault();
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // ============================================
    // SEÇÃO NOSSOS MATERIAIS - TROCA DE IMAGENS (PÁGINA INICIAL)
    // ============================================
    const materiaisGrid = document.getElementById('materiais-grid');
    const botoesCategoria = document.querySelectorAll('.btn-categoria');

    const produtos = {
        eletricos: [
            { img: 'https://res.cloudinary.com/dhsg68f5x/image/upload/v1772445044/I9_xmg6g4.jpg', nome: 'Disjuntor', desc: 'Disjuntor 16A' },
            { img: 'https://res.cloudinary.com/dhsg68f5x/image/upload/v1772444997/I12_gg8eo5.jpg', nome: 'Tomada', desc: 'Tomada 10A' },
            { img: 'https://res.cloudinary.com/dhsg68f5x/image/upload/v1772445044/I10_lgewcn.jpg', nome: 'Cabo Elétrico', desc: 'Cabo 2.5mm' },
            { img: 'https://res.cloudinary.com/dhsg68f5x/image/upload/v1772444996/I13_blgmte.webp', nome: 'Interruptor', desc: 'Interruptor simples' }
        ],
        construcao: [
            { img: 'https://res.cloudinary.com/dhsg68f5x/image/upload/v1772445004/I24_qjduvm.jpg', nome: 'Madeiras', desc: 'Madeiras' },
            { img: 'https://res.cloudinary.com/dhsg68f5x/image/upload/v1772445002/I20_vzqbnx.jpg', nome: 'Ferro', desc: 'Ferro' },
            { img: 'https://res.cloudinary.com/dhsg68f5x/image/upload/v1772445005/I25_ln0qsy.webp', nome: 'Electródo', desc: 'Electródo' },
            { img: 'https://res.cloudinary.com/dhsg68f5x/image/upload/v1772445007/I26_zug7pz.webp', nome: 'Chapas', desc: 'Chapas' }
        ],
        canalizacao: [
            { img: 'https://res.cloudinary.com/dhsg68f5x/image/upload/v1772444997/I15_n2zhc2.jpg', nome: 'Tubo PEAD', desc: 'Tubo 100mm' },
            { img: 'https://res.cloudinary.com/dhsg68f5x/image/upload/v1772445001/I17_vzmnpx.jpg', nome: 'Conexão', desc: 'Joelho 90°' },
            { img: 'https://res.cloudinary.com/dhsg68f5x/image/upload/v1772445002/I18_jzeyxi.jpg', nome: 'Tubo PPR', desc: 'Tubo 100mm' },
            { img: 'https://res.cloudinary.com/dhsg68f5x/image/upload/v1772445000/I19_upocvv.jpg', nome: 'Tubo PVC', desc: 'Tubo 100mm' }
        ],
        ferramentas: [
            { img: 'https://res.cloudinary.com/dhsg68f5x/image/upload/v1772445008/I27_fng5ku.webp', nome: 'Martelo', desc: 'Martelo de unha' },
            { img: 'https://res.cloudinary.com/dhsg68f5x/image/upload/v1772445008/I28_xkduns.webp', nome: 'Chave de fenda', desc: 'Chave philips' },
            { img: 'https://res.cloudinary.com/dhsg68f5x/image/upload/v1772445011/I30_thyh1q.jpg', nome: 'Furadeira', desc: 'Furadeira 500W' },
            { img: 'https://res.cloudinary.com/dhsg68f5x/image/upload/v1772445009/I29_zscsve.webp', nome: 'Serra', desc: 'Serra manual' }
        ]
    };

    function mostrarCategoria(categoria) {
        const itens = produtos[categoria];
        if (!itens) return;

        let html = '';
        itens.forEach(item => {
            html += `
                <div class="material-card">
                    <img src="${item.img}" alt="${item.nome}">
                    <div class="card-body">
                        <h4>${item.nome}</h4>
                        <p>${item.desc}</p>
                    </div>
                </div>
            `;
        });
        materiaisGrid.innerHTML = html;
    }

    botoesCategoria.forEach(btn => {
        btn.addEventListener('click', function() {
            botoesCategoria.forEach(b => b.classList.remove('ativo'));
            this.classList.add('ativo');
            const categoria = this.getAttribute('data-categoria');
            mostrarCategoria(categoria);
        });
    });

    if (botoesCategoria.length > 0) {
        mostrarCategoria('eletricos');
    }
    
    // ============================================
    // FORMULÁRIO DE CONTACTO COM MENSAGEM INLINE (PÁGINA CONTATO)
    // ============================================
// ===== FORMULÁRIO DE CONTACTO MODERNO =====
const contactFormModern = document.getElementById('contactForm');
const formMensagemModern = document.getElementById('form-mensagem');

if (contactFormModern) {
    contactFormModern.addEventListener('submit', async function(e) {
        e.preventDefault();

        formMensagemModern.innerHTML = '<p style="color: #4361ee;"><i class="fas fa-spinner fa-pulse"></i> A enviar mensagem...</p>';
        formMensagemModern.style.display = 'block';
        formMensagemModern.style.background = '#f0f4ff';

        const formData = new FormData(contactFormModern);
        const data = Object.fromEntries(formData.entries());

        try {
            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });

            const result = await response.json();

            if (response.ok && result.success) {
                formMensagemModern.innerHTML = '<p style="color: #10b981;"><i class="fas fa-check-circle"></i> ✓ Mensagem enviada com sucesso! Entraremos em contacto em breve.</p>';
                formMensagemModern.style.background = '#ecfdf5';
                contactFormModern.reset();
                
                setTimeout(() => {
                    formMensagemModern.style.display = 'none';
                }, 5000);
            } else {
                formMensagemModern.innerHTML = '<p style="color: #ef4444;"><i class="fas fa-exclamation-triangle"></i> ✗ Erro ao enviar. Tente novamente.</p>';
                formMensagemModern.style.background = '#fef2f2';
            }
        } catch (error) {
            formMensagemModern.innerHTML = '<p style="color: #ef4444;"><i class="fas fa-wifi"></i> ✗ Erro de rede. Verifique sua conexão.</p>';
            formMensagemModern.style.background = '#fef2f2';
        }
        
        setTimeout(() => {
            formMensagemModern.style.display = 'none';
        }, 6000);
    });
}


    
    // ============================================
    // MOSTRAR WHATSAPP APENAS QUANDO FOOTER APARECE (se implementado)
    // ============================================
    // (código para o WhatsApp pode ser adicionado aqui se necessário)
    
});

// ============================================
// CÓDIGO ESPECÍFICO DA PÁGINA DE CATÁLOGO
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    const CLOUDINARY = "https://res.cloudinary.com/dhsg68f5x/image/upload/";
    // Verifica se estamos na página de catálogo (existe produtosGrid)
    if (!document.getElementById('produtosGrid')) return;

    // ===== ELEMENTOS DA PÁGINA =====
    const produtosGrid = document.getElementById('produtosGrid');
    const pesquisaInput = document.getElementById('pesquisaInput');
    const pesquisaBtn = document.getElementById('pesquisaBtn');
    const categoriasPrincipaisDiv = document.getElementById('categorias-principais');
    const subcategoriasDiv = document.getElementById('subcategorias');
    const listaSubcategorias = document.getElementById('lista-subcategorias');
    const tituloSubcategoria = document.getElementById('titulo-subcategoria');
    const voltarBtn = document.getElementById('voltar-principais');
    const btnAnterior = document.getElementById('btnAnterior');
    const btnProximo = document.getElementById('btnProximo');
    const paginaInfo = document.getElementById('paginaInfo');

    // ===== DADOS TÉCNICOS PARA ELET1 (CADA PRODUTO COM SUA ESTRUTURA) =====
    const dadosTecnicosElet1 = {
        "Berço de Guiamento": {
            aplicacao: "Fixação de cabos em superfícies planas (paredes, caixas de passagem) ou em estruturas metálicas que possuam furos de encaixe",
            material: "Disponível em aço galvanizado (AG) para áreas externas ou eletrozincado (AZ) para ambientes internos",
            colunas: ["Seção", "Código", "Tipo","Info"],
            especificacoes: [
                { secao: "2×6 – 5×16", codigo: "9113000110", tipo: "BE AZ 16", info: "com espigão" },
                { secao: "2×6 – 5×16", codigo: "9113000111", tipo: "BE AZ 16", info: "com espigão" },
                { secao: "4×25 – 4×70", codigo: "9123000131", tipo: "BE AG 70", info: "com espigão" },
                { secao: "4×25 – 4×70", codigo: "9113000135", tipo: "BE AG 70", info: "com espigão" },
                { secao: "2×6 – 5×16", codigo: "9123000120", tipo: "BG AI 16", info: "com gancho" },
                { secao: "4×25 – 4×70", codigo: "9123000130", tipo: "BG AI 70", info: "com gancho" }
            ]
        },
        "Ligadores de Derivação de Aperto Independente": {
            aplicacao: "Instalação de linhas elétricas torcadas (cabos duplex, triplex, quadriplex) em postes ou fachadas",
            material: "Normalmente combina um berço de plástico (para isolar e proteger o cabo) com um gancho de aço inox ou galvanizado (para resistência mecânica)",
            colunas: ["Seção","Código", "Tipo"],
            especificacoes: [
                { secao: "10-25 mm²", codigo: "9123000440", tipo: "CPB 1/CT25" },
                { secao: "16-95 mm²", codigo: "9123000450", tipo: "	CPB 1/CT70" },
                { secao: "16-95 mm²", codigo: "9123000460", tipo: "	CPB 1/CT70" }
            ]
        },
        "Pinça e Consola de Amarração para Redes com Neutro Tensor": {
            aplicacao: "Amarração do cabo neutro tensor em redes de torçada do tipo francês, A Pinça de Amarração é presa ao poste através da Consola de Amarração e a Consola de Amarração efectua a sua fixação ao poste por intermédio de 2 parafusos M16 ou fita de aço inox",
            material: "Corpo da Pinça de Amarração PA1500 em liga de alumínio de alta resistência mecânica. Cunhas em material plástico isolante de alta resistência mecânica, climática e dieléctrica. Espia de amarração flexível em aço inox, provida de uma sela amovível em material isolante, Corpo da Consola de Amarração CA1500 em alumínio de alta resistência mecânica.",
            colunas: ["Código", "Tipo", "Designação", "Info"],
            especificacoes: [
                { codigo: "9115000", tipo: "PA1500", designacao: "Pinça Amarração 54,6 mm²", info: "1 Pinça" },
                { codigo: "9115000015", tipo: "CA1500", designacao: "Consola Amarração", info: "1 Consola" },
                { codigo: "9115000035", tipo: "PA1CA", designacao: "Conjunto Amarração SIMPLES", info: "1 Pinça + 1 Consola" },
                { codigo: "9115000040", tipo: "PA2CA", designacao: "Conjunto Amarração DUPLO", info: "2 Pinças + 1 Consola " },
                { codigo: "9115000045", tipo: "PA3CA", designacao: "Conjunto Amarração TRIPLO", info: "3 Pinças + 1 Consola" }
            ]
        },
        "Pinça de Suspensão": {
            aplicacao:"Utilizada na suspensão de cabos de torçada. Capacidades diferentes estão disponíveis para se adaptar ao diâmetro do cabo em uso. A pinça pode ser presa ao poste por meio de um Ferro com Olhal Rabo de Porco",
            material: "Pinça de Suspensão com corpo metálico em aço electrozincado (AZ), galvanizado a quente (AG) ou aço inox (AI), núcleo em borracha de alta resistência mecânica, climatérica e dieléctrica",
            colunas: ["Seção", "Código", "Tipo"],
            especificacoes: [
                { secao: "2×6 – 3×25", codigo: "9113000070", tipo: "PS AZ 325" },
                { secao: "2×6 – 3×25", codigo: "9113000071", tipo: "PS AG 325" },
                { secao: "2×6 – 3×25", codigo: "9113000075", tipo: "PS AI 325" },
                { secao: "2×16 – 4×25", codigo: "9113000080", tipo: "PS AZ 425" },
                { secao: "2×16 – 4×25", codigo: "9113000081", tipo: "PS AG 425" },
                { secao: "2×16 – 4×25", codigo: "9113000085", tipo: "PS AI 425" },
                { secao: "4×25 – 4×50", codigo: "9113000090", tipo: "PS AZ 50" },
                { secao: "4×25 – 4×50", codigo: "9113000091", tipo: "PS AG 50" },
                { secao: "4×25 – 4×50", codigo: "9113000095", tipo: "PS AI 50" },
                { secao: "4×70 – 4×95", codigo: "9113000100", tipo: "	PS AZ 95" }
            ]
        },
          "Ligadores de Derivação de Aperto Simultâneo": {
            aplicacao: "Permite uma montagem sob tensão sem desnudamento do condutores. O aperto é controlado por um parafuso-fusível Derivação de cabos de torçada em cobre ou alumínio",
            material: "Ligadores de Derivação e de Perfuração de isolamento com Aperto Simultâneo (6 kV) de resistência. São altamente resistentes. São fabricados em termoplástico reforçados com fibra de vidro, Dentes em Alumínio (AL) ou Cobre (CU)",
            colunas: ["Seção", "Código", "Tipo"],
            especificacoes: [
                { secao: "10-95", codigo: "9123000430", tipo: "10-95/1,5-10 (IP)" },
                { secao: "16-95", codigo: "9123000490", tipo: "16-95/4-35(50) (P25)" },
                { secao: "16-150", codigo: "9123000495", tipo: "	16-150/6-50 (P50)" },
                { secao: "16-95", codigo: "9123000500", tipo: "16-95/16-95 (P95)" },
                { secao: "35-150", codigo: "9123000510", tipo: "35-150/35-150 (P150)" },
                  { secao:"70-240", codigo: "9123000520", tipo: "70-240/70-240 (P240)" },
                { secao: "10-95", codigo: "9123000431", tipo: "	10-95/1,5-10 (IP)" },
                { secao: "16-95", codigo: "9123000492", tipo: "	16-95/4-35(50) (P25)" },
                { secao: "16-150", codigo: "9123000496", tipo: "16-150/6-50 (P50)" },
                { secao: "16-95", codigo: "9123000501", tipo: "	16-95/16-95 (P95)" }
            ]
        },
              "Pinças de Amarração Plásticas para Ramais": {
            aplicacao: "Pinças de amarração plásticas utilizada em baixadas e ramais de 2, 3 e 4 condutores idênticos em torçada.",
            material: "Corpo e cunha em material plástico de elevada resistência mecânica e climatérica e gancho em aço inoxidável (AI)",
            colunas: ["Seção", "Código", "Tipo"],
            especificacoes: [
                { secao: "2×6 – 2×16", codigo: "9113000020", tipo: "PAG AI 216" },
                { secao: "4×6 – 4×16", codigo: "9113000040", tipo: "PAG AI 416" }
             
            ]
        },
               "Pinça de Amarração Metálica para Redes": {
            aplicacao: "Utilização adequada para amarração dos cabos de torçada utilizados em redes de distribuição.",
            material: "Cunhas em material plástico de alta resistência mecânica e climatérica. Hastes em aço inox, aço galvanizado ou aço zincado.",
            colunas: ["Seção", "Código", "Tipo"],
            especificacoes: [
                { secao: "4×25 – 4×50", codigo: "9113000050", tipo: "PAH AZ 450" },
                { secao: "4×25 – 4×50", codigo: "9113000051", tipo: "PAH AG 450" },
                { secao: "4×25 – 4×50", codigo: "9113000055", tipo: "PAH AI 450" },
                { secao: "4×70 – 4×95", codigo: "9113000060", tipo: "PAH AZ 495" },
                { secao: "4×70 – 4×95", codigo: "9113000061", tipo: "PAH AG 495" },
                { secao: "4×70 – 4×95", codigo: "9113000065", tipo: "PAH AI 495" }
             
            ]
        },
                "Pinça e Consola de Suspensão para Redes com Neutro Tensor": {
            aplicacao: "Suspensão em linha ou em ângulo de cabos de torçada com neutro tensor. Fixação da pinça de suspensão ao poste através de 1 parafuso ou fita de aço inox (consulte o capítulo 5).",
            material: "Pinça e Consola de Suspensão para Redes com Neutro Tensor, pinça de Suspensão PS1500 provida de ligação móvel em matéria. plástica isolante de alta resistência mecânica, climática e dieléctrica, Consola de Suspensão CS1500 composta em alumínio fundido.",
            colunas: ["Código", "Tipo","Info", "Designação"],
            especificacoes: [
                { codigo: "9124300020", tipo: "PS 1500 / 54" , info: "1 Pinça" , designacao: "Pinça Suspenção 54.6 mm²" },
                { codigo: "9115000017", tipo: "	CS 1500" , info: "1 Consola" , designacao: "Consola Suspenção" },
                { codigo: "9115000050", tipo: "	PS1CS" , info: "1 Pinça + 1 Consola" , designacao: "Conjunto Suspenção" },
              
             
            ]
        },
              "Abraçadeira de liga": {
            aplicacao: "Fixação e sustentação de cabos isolados em redes aéreas de distribuição elétrica (postes). Disponível nas versões simples (1 cabo) e dupla (2 cabos)",
            material: " Zamak (liga de zinco de alta resistência)",
            colunas: ["Código", "Tipo","Info"],
            especificacoes: [
                { codigo: "9123050275", tipo: "ALS 5/14" , info: "Simples" },
                { codigo: "9123052300", tipo: "	ALS 9/18" , info: "Simples"  },
                { codigo: "9123052280", tipo: "	ALS 18/29" , info: "Simples"  },
                { codigo: "9123052290", tipo: "ALS 29/40" , info: "Simples" },
                { codigo: "9123052270", tipo: "	ALD 9/18" , info: "Duplo"  },
                { codigo: "9123052250", tipo: "	ALD 18/29" , info: "Duplo"  },
                { codigo: "9123052260", tipo: "	ALD 29/40" , info: "Duplo"  },
             
            ]
        },

              "Terminal Pré-Isolado": {
            aplicacao: "Utilizado para efetuar a ligação de dois condutores isolados, bornes ou barras de cobre em redes BT. Instalação por compressão hexagonal por meio de matrizes E140, E173, E215 ",
            material: " Terminal Pré-Isolado fabricado com cobre e material plástico de alta resistência mecânica, climática e dieléctrica.",
            colunas: ["Seção", "Código", "Tipo","Info", "Cor"],
            especificacoes: [
                { secao: "16 mm²", codigo: "9123000740", tipo: "CPTAU 16 (E140)" , info: "Matriz E140", cor:"Azul" },
                { secao: "25 mm²", codigo: "9123000750", tipo: "	CPTAU 25 (E140)" , info: "Matriz E140", cor:"Laranja"  },
                { secao: "35 mm²", codigo: "9123000760", tipo: "	CPTAU 35 (E173)" , info: "Matriz E173", cor:"Vermelho"  },
                { secao: "50 mm²", codigo: "9123000770", tipo: "CPTAU 50 (E173)" , info: "Matriz E173", cor:"Amarelo" },
                { secao: "54 mm²", codigo: "9123000775", tipo: "	CPTAU 54 (E173" , info: "Matriz E173", cor:"Preto"  },
                { secao: "70 mm²", codigo: "9123000780", tipo: "	CPTAU 70 (E173)" , info: "Matriz E173", cor:"Branco"  },
                { secao: "95 mm²", codigo: "9123000782", tipo: "	CPTAU 95 (E173)" , info: "Matriz E173", cor:"Cinzento"  },
                { secao: "120 mm²", codigo: "9123000784", tipo: "	CPTAU 120 (E215)" , info: "Matriz E215", cor:"Rosa"  },
                { secao: "150 mm²", codigo: "9123000785", tipo: "	CPTAU 150 (E215)" , info: "Matriz E215", cor:"Violeta"  },
            
             
            ]
        },

           "Roldana em Alumínio para Cabos de Torçada e Cabos Nus": {
            aplicacao: "São ideais para facilitar a colocação dos cabos de torçada no local de instalação, sem danificar a camada do isolamento exterior. Linguetas de segurança para fixar o gancho e o cabo. ",
            material: "Roldana em alumínio para cabos de torçada e cabos nus. O gancho orientável é em alumínio com alta resistência mecânica e a pedido, gola com revestimento. (E)",
            colunas: ["Código", "Tipo","Info"],
            especificacoes: [
                {codigo: "9124050090", tipo: "RCT D250" , info: "Cabo torçada" },
                {codigo: "9124050095", tipo: "	RCT D250 E" ,info: "Cabo torçada" },
                {codigo: "9124050100", tipo: "	RCT D150" ,info: "Cabo torçada" },
                {codigo: "9124050105", tipo: "RCT D150 E" , info: "Cabo torçada"},
                {codigo: "9124050115", tipo: "	RCN D400" , info: "Cabo NU"  },
                {codigo: "9124050110", tipo: "	RCN D250" , info: "Cabo NU"},
              
            
             
            ]
        },

          "União Pré-Isolada": {
            aplicacao: "Ligação de dois condutores isolados de redes BT, permite a ligação estanque de cabos Alumínio-Alumínio. Alumínio-Cobre e Cobre-Cobre e instalação por compressão hexagonal  ",
            material: "Corpo em alumínio, revestimento em material plástico de alta resistência mecânica climática e dielétrica. Interior revestido com massa dielétrica para otimizar o contacto, de acordo com as normas NFC 33-021 e EN 50-483",
            colunas: ["Seção", "Código", "Tipo","Info", "Cor"],
            especificacoes: [
                {secao: "16 mm²", codigo: "9123000790", tipo: "MJPB 16" , info: "	Matriz E140" , cor:"Azul" },
                {secao: "16 mm²", codigo: "9123000791", tipo: "MJPT 16" ,info: "Matriz E173" , cor:"Azul" },
                {secao: "25 mm²", codigo: "9123000800", tipo: "MJPB 25" ,info: "Matriz E140" , cor:"Laranja" },
                {secao: "25 mm²", codigo: "9123000801", tipo: " MJPT 25" , info: "Matriz E173", cor:"Laranja" },
                {secao: "25/16 mm²", codigo: "9123000803", tipo: "MJPT 25/16" , info: "Matriz E173"  , cor:"Laranja-Azul" },
                {secao: "35 mm²", codigo: "9123000810", tipo: "MJPB 35" , info: "	Matriz E140", cor:"Vermelho" },
               { secao: "35 mm²", codigo: "9123000811", tipo: "MJPT 35" , info: "	Matriz E140", cor:"Vermelho" },
                {secao: "50 mm²", codigo: "9123000820", tipo: "MJPT 50" ,info: "Matriz E173", cor:"Amarelo" },
                {secao: "50/25 mm²", codigo: "9123000805", tipo: "MJPT 50/25" ,info: "Matriz E173", cor:"Amarelo-Laranja" },
                {secao: "54 mm²", codigo: "9123000822", tipo: "MJPT 54 (NEUTRO)" , info: "Matriz E173", cor:"Preto"},
            ]
        },
         "Pinça de Suspensão Mural": {
            aplicacao: "Utilizado para fixação de cabos de torçada em fachadas: Pinça Suspensão Mural (PSM) fixa os cabos de torçada às fachadas mantendo o afastamento da parede. ",
            material: "Pinça fabricada com material plástico de alta resistência mecânica, climática e dieléctrica",
            colunas: [ "Código", "Tipo","Material", "Designação"],
            especificacoes: [
                { codigo: "9123000900", tipo: "4×25 a 4×95 cabos" , material: "	Prego Aço" , designacao: "PSM 70.1" },
                { codigo: "9123000910", tipo: "4×25 a 4×95 cabos" ,material: "	Prego Aço" , designacao: "PSM 70.6" },
                {codigo: "9123000920", tipo: "2×6 a 4×25 cabos" ,material: "Prego Plástico" , designacao: "PSM 4-6/16" },
                
            ]
        },
         "Cachimbo em aluminio para baixadas": {
            aplicacao: "Entrada do ramal aéreo no interior dos edifícios, evitando infiltrações e melhorando o aspecto estético. ",
            material: "Liga de alumínio fundido.",
            colunas: [ "Seção", "Código", "Tipo"],
            especificacoes: [
                {secao: "2×6 – 4×6", codigo: "9123001020", tipo: "	CB 2646"  },
              
                
            ]
        },
    };

    // ===== FUNÇÃO PARA GERAR TABELA DINÂMICA =====
// ===== FUNÇÃO PARA GERAR TABELA DINÂMICA (VERSÃO SIMPLES - SEM ROWSPAN) =====
// ===== FUNÇÃO PARA GERAR TABELA DINÂMICA (UNIVERSAL - SUPORTA ROWSPAN SÓ COM SEÇÃO) =====
// ===== FUNÇÃO PARA GERAR TABELA DINÂMICA (DEFINITIVA - FUNCIONA PARA TODOS OS SEUS PRODUTOS) =====
// ===== FUNÇÃO PARA GERAR TABELA DINÂMICA (COM MAPEAMENTO PARA SEÇÃO DERIVAÇÃO) =====
function gerarTabelaDinamica(especificacoes, colunas) {
    if (!especificacoes || especificacoes.length === 0) {
        return '<tr><td colspan="' + colunas.length + '" style="text-align:center;">Especificações não disponíveisNonNull' + '</tr>';
    }
    
    // Verifica se precisa de rowspan (primeira coluna é "Seção")
    const precisaRowspan = colunas[0] === "Seção";
    
    if (precisaRowspan) {
        // ===== ROWSPAN =====
        const agrupado = {};
        
        for (let i = 0; i < especificacoes.length; i++) {
            const item = especificacoes[i];
            const chave = item.secao || "SEM SEÇÃO";
            if (!agrupado[chave]) {
                agrupado[chave] = [];
            }
            agrupado[chave].push(item);
        }
        
        let html = '';
        
        for (const [secao, itens] of Object.entries(agrupado)) {
            const rowspan = itens.length;
            
            for (let i = 0; i < itens.length; i++) {
                const item = itens[i];
                html += '<tr>';
                
                // Primeira coluna (Seção) com rowspan
                if (i === 0) {
                    html += `<td rowspan="${rowspan}" class="secao-cell" style="vertical-align:middle; background-color:#f0f4ff; font-weight:bold;">${secao}</td>`;
                }
                
                // Demais colunas
                for (let j = 1; j < colunas.length; j++) {
                    const coluna = colunas[j];
                    let valor = "-";
                    
                    // MAPEAMENTO COMPLETO
                    if (coluna === "Código") {
                        valor = item.codigo || "-";
                    } else if (coluna === "Tipo") {
                        valor = item.tipo || "-";
                    } else if (coluna === "Designação") {
                        valor = item.designacao || "-";
                    } else if (coluna === "Info") {
                        valor = item.info || "-";
                    } else if (coluna === "Seção Derivação" || coluna === "Secção Derivação") {
                        // Para campo "Seção Derivação" ou "Secção Derivação"
                        valor = item.secaoDerivacao || item.seccaoDerivacao || "-";
                    } else {
                        // Para qualquer outra coluna
                        const campo = coluna.toLowerCase().replace(/ /g, '').replace(/ç/g, 'c');
                        valor = item[campo] || "-";
                    }
                    
                    html += `<td class="cell-${j}">${valor}</td>`;
                }
                
                html += '</tr>';
            }
        }
        return html;
    } else {
        // ===== TABELA SIMPLES =====
        let html = '';
        
        for (let i = 0; i < especificacoes.length; i++) {
            const item = especificacoes[i];
            html += '<tr>';
            
            for (let j = 0; j < colunas.length; j++) {
                const coluna = colunas[j];
                let valor = "-";
                
                // MAPEAMENTO COMPLETO
                if (coluna === "Código") {
                    valor = item.codigo || "-";
                } else if (coluna === "Tipo") {
                    valor = item.tipo || "-";
                } else if (coluna === "Designação") {
                    valor = item.designacao || "-";
                } else if (coluna === "Info") {
                    valor = item.info || "-";
                } else if (coluna === "Seção Derivação" || coluna === "Secção Derivação") {
                    valor = item.secaoDerivacao || item.seccaoDerivacao || "-";
                } else {
                    const campo = coluna.toLowerCase().replace(/ /g, '').replace(/ç/g, 'c');
                    valor = item[campo] || "-";
                }
                
                html += `<td class="cell-${j}">${valor}</td>`;
            }
            
            html += '<tr>';
        }
        return html;
    }
}
    // ===== FUNÇÃO PARA ATUALIZAR CABEÇALHO DA TABELA =====
    function atualizarCabecalhoTabela(colunas) {
        const thead = document.querySelector('#tabela-especificacoes thead');
        if (!thead) return;
        
        let html = '<tr>';
        for (let i = 0; i < colunas.length; i++) {
            html += `<th>${colunas[i]}</th>`;
        }
        html += '</tr>';
        thead.innerHTML = html;
    }

    // ===== FUNÇÃO PARA RENDERIZAR TABELA COM PAGINAÇÃO =====
    let colunasAtuais = ["Seção", "Código", "Tipo"];
    
    function renderizarTabelaComPaginacao() {
        const inicio = (tabelaPaginaAtual - 1) * itensPorPaginaTabela;
        const fim = inicio + itensPorPaginaTabela;
        const itensPagina = especificacoesCompletas.slice(inicio, fim);
        
        const tabelaBody = document.getElementById('tabela-especificacoes-body');
        const totalPaginas = Math.ceil(especificacoesCompletas.length / itensPorPaginaTabela);
        
        if (tabelaBody) {
            tabelaBody.innerHTML = gerarTabelaDinamica(itensPagina, colunasAtuais);
        }
        
        const btnAnteriorTab = document.getElementById('tabAnterior');
        const btnProximoTab = document.getElementById('tabProximo');
        const paginaInfoTab = document.getElementById('tabPaginaInfo');
        
        if (btnAnteriorTab) btnAnteriorTab.disabled = tabelaPaginaAtual === 1;
        if (btnProximoTab) btnProximoTab.disabled = tabelaPaginaAtual === totalPaginas || totalPaginas === 0;
        if (paginaInfoTab) paginaInfoTab.textContent = `Página ${tabelaPaginaAtual} de ${totalPaginas || 1}`;
    }

    // ===== FUNÇÃO PARA ABRIR MODAL =====
    function abrirModal(produto) {
        console.log("Abrindo modal para:", produto.nome);
        
        const modal = document.getElementById('modal-produto');
        const modalImg = document.getElementById('modal-img');
        const modalNome = document.getElementById('modal-nome');
        const modalAplicacao = document.getElementById('modal-aplicacao');
        const modalMaterial = document.getElementById('modal-material');
        
        modalImg.src = produto.img;
        modalNome.textContent = produto.nome;
        
        const dadosTecnicos = dadosTecnicosElet1[produto.nome];
        
        if (dadosTecnicos) {
            modalAplicacao.textContent = dadosTecnicos.aplicacao;
            modalMaterial.textContent = dadosTecnicos.material;
            especificacoesCompletas = dadosTecnicos.especificacoes;
            colunasAtuais = dadosTecnicos.colunas || ["Seção", "Código", "Tipo"];
            
            atualizarCabecalhoTabela(colunasAtuais);
            tabelaPaginaAtual = 1;
            renderizarTabelaComPaginacao();
        } else {
            modalAplicacao.textContent = 'Consultar representante comercial';
            modalMaterial.textContent = 'Consultar representante comercial';
            especificacoesCompletas = [];
            colunasAtuais = ["Seção", "Código", "Tipo"];
            atualizarCabecalhoTabela(colunasAtuais);
            
            const tabelaBody = document.getElementById('tabela-especificacoes-body');
            if (tabelaBody) {
                tabelaBody.innerHTML = '<td><td colspan="3" style="text-align:center;">Especificações em desenvolvimento</td></tr>';
            }
            const btnAnteriorTab = document.getElementById('tabAnterior');
            const btnProximoTab = document.getElementById('tabProximo');
            if (btnAnteriorTab) btnAnteriorTab.disabled = true;
            if (btnProximoTab) btnProximoTab.disabled = true;
            const paginaInfoTab = document.getElementById('tabPaginaInfo');
            if (paginaInfoTab) paginaInfoTab.textContent = 'Página 1';
        }
        
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }

    // ===== DADOS DAS SUBCATEGORIAS =====
    const subcategoriasData = {
        eletricos: [
            { id: 'elet1', nome: '1. ACESSÓRIOS PARA REDES DE CABOS DE TORÇADA' },
            { id: 'elet2', nome: '2. ACESSÓRIOS PARA ILUMINAÇÃO PÚBLICA' },
            { id: 'elet3', nome: '3. ACESSÓRIOS PARA LINHAS NUAS' },
            { id: 'elet4', nome: '4. PROTEÇÃO CONTRA DESCARGAS ATMOSFÉRICAS' },
            { id: 'elet5', nome: '5. REDES DE TERRAS' },
            { id: 'elet6', nome: '6. BARRAS COLECTORAS' },
            { id: 'elet7', nome: '7. SUBESTAÇÕES' },
            { id: 'elet8', nome: '8. FERROVIAS' },
            { id: 'elet9', nome: '9. TERMINAIS, UNIÕES E BORNES' },
        
        ],
        construcao: [
            { id: 'cons1', nome: '1. CIMENTOS E ARGAMASSAS' },
            { id: 'cons2', nome: '2. BLOCOS E TIJOLOS' },
            { id: 'cons3', nome: '3. AGREGADOS (AREIA, BRITA)' },
            { id: 'cons4', nome: '4. AÇO E ARMADURAS' },
            { id: 'cons5', nome: '5. MADEIRAS' },
            { id: 'cons6', nome: '6. TELHAS E COBERTURAS' },
            { id: 'cons7', nome: '7. IMPERMEABILIZANTES' },
            { id: 'cons8', nome: '8. REVESTIMENTOS' },
            { id: 'cons9', nome: '9. TINTAS E VERNIZES' },
            { id: 'cons10', nome: '10. FERRAGENS PARA CONSTRUÇÃO' },
        ],
        canalizacao: [
            { id: 'can1', nome: '1. TUBOS PVC' },
            { id: 'can2', nome: '2. CONEXÕES' },
            { id: 'can3', nome: '3. REGISTROS E VÁLVULAS' },
            { id: 'can4', nome: '4. CAIXAS DE INSPEÇÃO' },
            { id: 'can5', nome: '5. SIFÕES E RALOS' },
            { id: 'can6', nome: '6. TUBOS DE COBRE' },
            { id: 'can7', nome: '7. AQUECEDORES' },
            { id: 'can8', nome: '8. BOMBAS' },
            { id: 'can9', nome: '9. FILTROS' },
            { id: 'can10', nome: '10. ACESSÓRIOS PARA ESGOTO' },
        ],
        ferramentas: [
            { id: 'fer1', nome: '1. FERRAMENTAS MANUAIS' },
            { id: 'fer2', nome: '2. FERRAMENTAS ELÉTRICAS' },
            { id: 'fer3', nome: '3. EQUIPAMENTOS DE MEDIÇÃO' },
            { id: 'fer4', nome: '4. MÁQUINAS' },
            { id: 'fer5', nome: '5. ACESSÓRIOS PARA FERRAMENTAS' },
            { id: 'fer6', nome: '6. EPIs' },
            { id: 'fer7', nome: '7. BANCADAS E SUPORTES' },
            { id: 'fer8', nome: '8. ESCADAS' },
            { id: 'fer9', nome: '9. CARRINHOS' },
            { id: 'fer10', nome: '10. ORGANIZADORES' },
        ]
    };

    // ===== MAPEAMENTO DAS IMAGENS DO CLOUDINARY =====
    const imagensCloudinary = {
        'elet1': [
            'https://res.cloudinary.com/dhsg68f5x/image/upload/v1776851672/ts_nzz2vh.jpg',
            'https://res.cloudinary.com/dhsg68f5x/image/upload/v1776851788/fe_urtahl.jpg',
            'https://res.cloudinary.com/dhsg68f5x/image/upload/v1772445046/R6_qhxtmw.png',
            'https://res.cloudinary.com/dhsg68f5x/image/upload/v1776851470/Rw_tsq8qg.png',
            'https://res.cloudinary.com/dhsg68f5x/image/upload/v1772445045/R5_dxtgba.jpg',
            'https://res.cloudinary.com/dhsg68f5x/image/upload/v1772445045/R3_b2fxo0.jpg',
            'https://res.cloudinary.com/dhsg68f5x/image/upload/v1772445045/R4_azzttv.jpg',
            'https://res.cloudinary.com/dhsg68f5x/image/upload/v1772445044/R2_ajs7vd.png',
            'https://res.cloudinary.com/dhsg68f5x/image/upload/v1776866599/brt_bqmtis.jpg',
            'https://res.cloudinary.com/dhsg68f5x/image/upload/v1772445048/R12_ynfvwg.png',
            'https://res.cloudinary.com/dhsg68f5x/image/upload/v1772539208/roldana-em-aluminio-para-cabos-torcada-t-e-cabos-nus-n-600x600_zy1jdb.jpg',
            'https://res.cloudinary.com/dhsg68f5x/image/upload/v1772539209/uniao-preisolada-jobasi_-500x500_1_mhzi7v.png',
            'https://res.cloudinary.com/dhsg68f5x/image/upload/v1777044161/ght_zifabg.jpg',
            'https://res.cloudinary.com/dhsg68f5x/image/upload/v1772539208/pinca-de-suspencao-mural-l7wv-600x600_pjkghz.jpg',
        ],
        'elet2': [
            'https://res.cloudinary.com/dhsg68f5x/image/upload/q_auto/f_auto/v1776270242/transferir_25_nqzw0k.jpg',
            'https://res.cloudinary.com/dhsg68f5x/image/upload/q_auto/f_auto/v1776270243/transferir_26_jxi5fg.jpg',
            'https://res.cloudinary.com/dhsg68f5x/image/upload/q_auto/f_auto/v1776270829/transferir_32_sbg2hh.jpg',
            'https://res.cloudinary.com/dhsg68f5x/image/upload/q_auto/f_auto/v1776270244/transferir_27_dwavkq.jpg',
            'https://res.cloudinary.com/dhsg68f5x/image/upload/q_auto/f_auto/v1776270245/transferir_crg42r.png',
            'https://res.cloudinary.com/dhsg68f5x/image/upload/q_auto/f_auto/v1776270238/images_18_ucnflo.jpg',
            'https://res.cloudinary.com/dhsg68f5x/image/upload/q_auto/f_auto/v1776270239/images_19_jeotn5.jpg',
            'https://res.cloudinary.com/dhsg68f5x/image/upload/q_auto/f_auto/v1776270237/images_17_omeq1h.jpg',
            'https://res.cloudinary.com/dhsg68f5x/image/upload/q_auto/f_auto/v1776270242/transferir_24_bc4qn1.jpg',
            'https://res.cloudinary.com/dhsg68f5x/image/upload/q_auto/f_auto/v1776270234/images_11_onceqn.jpg',
            'https://res.cloudinary.com/dhsg68f5x/image/upload/q_auto/f_auto/v1776270237/images_16_qn20ox.jpg',
            'https://res.cloudinary.com/dhsg68f5x/image/upload/v1776272347/images_26_wjc93n.jpg',
            'https://res.cloudinary.com/dhsg68f5x/image/upload/v1776271376/images_25_biwgrf.jpg',
            'https://res.cloudinary.com/dhsg68f5x/image/upload/v1776271160/images_24_qkvvmn.jpg',
        ],
        'elet3': [
            'https://res.cloudinary.com/dhsg68f5x/image/upload/T6_ixlz8t',
            'https://res.cloudinary.com/dhsg68f5x/image/upload/T3_svjclp',
            'https://res.cloudinary.com/dhsg68f5x/image/upload/v1772445054/T9_etjntf.jpg',
            'https://res.cloudinary.com/dhsg68f5x/image/upload/v1772445054/T11_u0as1w.jpg',
            'https://res.cloudinary.com/dhsg68f5x/image/upload/v1772445053/T10_rjhcp1.jpg',
            'https://res.cloudinary.com/dhsg68f5x/image/upload/v1772445053/T4_wa2ik0.png',
            'https://res.cloudinary.com/dhsg68f5x/image/upload/v1772445053/T8_dx4xsx.jpg',
            'https://res.cloudinary.com/dhsg68f5x/image/upload/v1772445053/T5_ckqufe.jpg',
            'https://res.cloudinary.com/dhsg68f5x/image/upload/v1772445051/T2_n9fsvc.png',
            'https://res.cloudinary.com/dhsg68f5x/image/upload/v1772445054/T12_hojekd.jpg',
            'https://res.cloudinary.com/dhsg68f5x/image/upload/v1772541594/T14_hezib1.jpg',
            'https://res.cloudinary.com/dhsg68f5x/image/upload/v1772541594/T15_moemy1.png',
            'https://res.cloudinary.com/dhsg68f5x/image/upload/v1772542565/OIP_6_hdtizo.webp',
            'https://res.cloudinary.com/dhsg68f5x/image/upload/v1772542304/OIP_5_pmr8t3.webp',
        ],
        'elet4': [
            'https://res.cloudinary.com/dhsg68f5x/image/upload/q_auto/f_auto/v1775560110/para-raios-ponta-franklin-600x600_wz5s2u.jpg',
            'https://res.cloudinary.com/dhsg68f5x/image/upload/q_auto/f_auto/v1775560108/jobasi-zeus-electron-zeus-sigma-600x600_y9cxbh.png',
            'https://res.cloudinary.com/dhsg68f5x/image/upload/q_auto/f_auto/v1775560109/para-raios-franklin-600x600_duzdb9.jpg',
            'https://res.cloudinary.com/dhsg68f5x/image/upload/q_auto/f_auto/v1775560033/Contador-Descargas-Digital-500x500_ypifsh.png',
            'https://res.cloudinary.com/dhsg68f5x/image/upload/q_auto/f_auto/v1775560032/contador-descargas-600x600_fdu4lf.jpg',
            'https://res.cloudinary.com/dhsg68f5x/image/upload/q_auto/f_auto/v1775560031/9123455180-LIGADOR-CONDUTOR-O8-10-A-GOTEIRA-10-20MM-500x500_rib8oi.png',
            'https://res.cloudinary.com/dhsg68f5x/image/upload/q_auto/f_auto/v1775560031/9123455210-ABRACADEIRA-P-HASTE-CAPTORA-500x500_b6ietu.jpg',
            'https://res.cloudinary.com/dhsg68f5x/image/upload/q_auto/f_auto/v1775560031/9123455220-Ligador-de-Condutor-Redondo-para-Haste-Captora-500x500_b23var.jpg',
            'https://res.cloudinary.com/dhsg68f5x/image/upload/q_auto/f_auto/v1775560031/9113100595-ABRACADEIRA-PARA-CABO-PARA-RAIOS--500x500_fpdtnx.png',
            'https://res.cloudinary.com/dhsg68f5x/image/upload/q_auto/f_auto/v1775560138/uniao-fixacao-mastro-600x600_1_wfgdfv.png',
            'https://res.cloudinary.com/dhsg68f5x/image/upload/q_auto/f_auto/v1775647709/Acessorios-Caso-Isojo-500x500_zqhfq5.png',
            'https://res.cloudinary.com/dhsg68f5x/image/upload/q_auto/f_auto/v1775647709/Ligador-Amovivel-500x500_jksskk.png',
            'https://res.cloudinary.com/dhsg68f5x/image/upload/q_auto/f_auto/v1775647708/abracadeira-chumbadouro-500x500_r1g8lo.png',
            'https://res.cloudinary.com/dhsg68f5x/image/upload/q_auto/f_auto/v1775647709/suporte-conico-ligador-500x500_fmca4q.jpg',
        ],
        'elet5': [
            'https://res.cloudinary.com/dhsg68f5x/image/upload/q_auto/f_auto/v1775560033/Cabo-de-Aluminio-8mm-500x500_jatyi4.png',
            'https://res.cloudinary.com/dhsg68f5x/image/upload/q_auto/f_auto/v1775560032/cabo-aco-galvanizado-jobasi-600x600_elyuid.jpg',
            'https://res.cloudinary.com/dhsg68f5x/image/upload/q_auto/f_auto/v1775560032/cabo-cobre-estanhado-jobasi-600x600_b4ithi.jpg',
            'https://res.cloudinary.com/dhsg68f5x/image/upload/q_auto/f_auto/v1775560032/cabo-de-aco-inoxidavel-jobasi-600x600_sjfqti.jpg',
            'https://res.cloudinary.com/dhsg68f5x/image/upload/q_auto/f_auto/v1775560032/cabo-cobre-macico-jobasi-600x600_i5t0dp.jpg',
            'https://res.cloudinary.com/dhsg68f5x/image/upload/q_auto/f_auto/v1775560031/cabo-aco-cobreado-jobasi-600x600_eeyarc.jpg',
            'https://res.cloudinary.com/dhsg68f5x/image/upload/q_auto/f_auto/v1772444998/I16_k5qtkp.webp',
            'https://res.cloudinary.com/dhsg68f5x/image/upload/q_auto/f_auto/v1775560107/fita-aco-inox-jobasi-600x600_ubttgw.jpg',
            'https://res.cloudinary.com/dhsg68f5x/image/upload/q_auto/f_auto/v1775560106/fita-aco-galvanizado-jobasi-1-600x600_ru7i2q.jpg',
            'https://res.cloudinary.com/dhsg68f5x/image/upload/q_auto/f_auto/v1775560035/electrodo-2roscas-600x600_ymkoq1.jpg',
            'https://res.cloudinary.com/dhsg68f5x/image/upload/q_auto/f_auto/v1775560105/electrodo-inox-galv_awufgh.jpg',
            'https://res.cloudinary.com/dhsg68f5x/image/upload/q_auto/f_auto/v1775908141/electrodo-sem-rocas_snpx0v.jpg',
            'https://res.cloudinary.com/dhsg68f5x/image/upload/q_auto/f_auto/v1775908141/electrodo-1rosca-600x600_edhalp.jpg',
            'https://res.cloudinary.com/dhsg68f5x/image/upload/q_auto/f_auto/v1775908141/tranca-plana-cobre-estanhada-600x600_e9hbuo.jpg',
        ],
        'elet6': [
            'https://res.cloudinary.com/dhsg68f5x/image/upload/q_auto/f_auto/v1776264106/9113101482-BARRA-TERRA-CU-40X5X430-CAMOVIVEL-4-2-500x500_ngqxk1.png',
            'https://res.cloudinary.com/dhsg68f5x/image/upload/q_auto/f_auto/v1776264106/9113100459-Barra-Coletora-500x500_wai0hv.png',
            'https://res.cloudinary.com/dhsg68f5x/image/upload/q_auto/f_auto/v1776264106/9113100756-BARRA-COLECTORA-DE-TERRAS-40x5x220-S_-ISOLADOR-500x500_c2l9nt.png',
            'https://res.cloudinary.com/dhsg68f5x/image/upload/q_auto/f_auto/v1776264107/barradecobre-500x500_bzshrr.png',
            'https://res.cloudinary.com/dhsg68f5x/image/upload/q_auto/f_auto/v1776264106/9113100477-500x500_adrtf1.png',
            'https://res.cloudinary.com/dhsg68f5x/image/upload/q_auto/f_auto/v1776264106/9113100479-500x500_bescqa.png',
            'https://res.cloudinary.com/dhsg68f5x/image/upload/q_auto/f_auto/v1776264106/Barra-com-ligador-amovivel-500x500_hzftxp.png',
            'https://res.cloudinary.com/dhsg68f5x/image/upload/q_auto/f_auto/v1776264105/9113100478-BARRA-CU-30x5x190-C_BARRA-AMOV.-C_3-SM35-1E1S-500x500_xb9tn9.png',
            'https://res.cloudinary.com/dhsg68f5x/image/upload/q_auto/f_auto/v1776264105/9113100410-RENDER-S.PARAFUSOS-500x500_mehkrg.png',
            'https://res.cloudinary.com/dhsg68f5x/image/upload/q_auto/f_auto/v1776264105/9113100458-500x500_tgrfgm.png',
            'https://res.cloudinary.com/dhsg68f5x/image/upload/q_auto/f_auto/v1776264105/9113100414-barra-terra-40x5x200-2isoladores-5parafusos-ligacao-500x500_c1x0mj.png',
            'https://res.cloudinary.com/dhsg68f5x/image/upload/q_auto/f_auto/v1776264104/barra-colectora-de-terras-30x5mm-para-electrodo-ft-600x600_pyrwir.jpg',
            'https://res.cloudinary.com/dhsg68f5x/image/upload/q_auto/f_auto/v1776264105/barra-colectora-de-terras-inox-200X100X3-com-16-furos-500x500_cmifc4.jpg',
            'https://res.cloudinary.com/dhsg68f5x/image/upload/q_auto/f_auto/v1776264106/Barra-CU-9113100464-500x500_kgcafy.png',
        ],
        'elet7': [
            'https://res.cloudinary.com/dhsg68f5x/image/upload/q_auto/f_auto/v1776266034/Ligadores-de-Terra-600x600_ocvff4.png',
            'https://res.cloudinary.com/dhsg68f5x/image/upload/q_auto/f_auto/v1776266035/terminal-de-bt-para-transformador-de-potencia-600x600_soqbg2.jpg',
            'https://res.cloudinary.com/dhsg68f5x/image/upload/q_auto/f_auto/v1776266035/grampos-de-conexao-para-estrutura-e-cabo-600x600_o9oksg.png',
            'https://res.cloudinary.com/dhsg68f5x/image/upload/q_auto/f_auto/v1776266034/Ligador-Dilatacao-90-Bimetalico-9113451451-1-500x500_xlvxlk.png',
            'https://res.cloudinary.com/dhsg68f5x/image/upload/q_auto/f_auto/v1776266034/Abrac%CC%A7adeiras-com-Alheta-600x600_v2en5g.png',
            'https://res.cloudinary.com/dhsg68f5x/image/upload/q_auto/f_auto/v1776266034/ligador-paralelo-para-condutores-de-cobre-nu-600x600_nddlcz.jpg',
            'https://res.cloudinary.com/dhsg68f5x/image/upload/q_auto/f_auto/v1776266033/Ligador-de-dilatacao-90-com-borne-9113451450-500x500_ojytm9.png',
            'https://res.cloudinary.com/dhsg68f5x/image/upload/q_auto/f_auto/v1776266034/ligadores-para-cabo-barra-terra-com-e-sem-alheta-600x600_cwqfoc.jpg',
            'https://res.cloudinary.com/dhsg68f5x/image/upload/q_auto/f_auto/v1776266032/4-600x600_hvlf0n.png',
            'https://res.cloudinary.com/dhsg68f5x/image/upload/q_auto/f_auto/v1776266032/9113451180-500x500_bckibe.png',
            'https://res.cloudinary.com/dhsg68f5x/image/upload/q_auto/f_auto/v1776266034/ligador-para-barra-de-terra-lbt-1-600x600_ym79ga.jpg',
            'https://res.cloudinary.com/dhsg68f5x/image/upload/q_auto/f_auto/v1776266033/ligador-de-cobre-em-c-2--600x600_opn3wc.jpg',
            'https://res.cloudinary.com/dhsg68f5x/image/upload/q_auto/f_auto/v1776266033/ligador-de-terra-para-seccionadores-d60d116-600x600_imk5kd.jpg',
            'https://res.cloudinary.com/dhsg68f5x/image/upload/q_auto/f_auto/v1776266035/ligador-para-bornes-de-transformador-tipo-grampo-600x600_gubhti.jpg',
        ],
        'elet8': [
            'https://res.cloudinary.com/dhsg68f5x/image/upload/q_auto/f_auto/v1776267149/Perfil-L70-2-furos-o18-500x500_atsew1.png',
            'https://res.cloudinary.com/dhsg68f5x/image/upload/q_auto/f_auto/v1776267149/p-cabo-de-terra-aereo-em-alonga-02.202.02-500x500_mlkt1b.png',
            'https://res.cloudinary.com/dhsg68f5x/image/upload/q_auto/f_auto/v1776267149/Perfil-L60-2-Furos-D18-500x500_drkbjf.png',
            'https://res.cloudinary.com/dhsg68f5x/image/upload/q_auto/f_auto/v1776267148/PAG-103-02.400.01-500x500_hfoz2m.png',
            'https://res.cloudinary.com/dhsg68f5x/image/upload/q_auto/f_auto/v1776267148/PAG-93-02.300.01-500x500_jcoifw.png',
            'https://res.cloudinary.com/dhsg68f5x/image/upload/q_auto/f_auto/v1776267148/PAG-84-02.209.01-500x500_epwaqc.png',
            'https://res.cloudinary.com/dhsg68f5x/image/upload/q_auto/f_auto/v1776267147/PAG-64-02.110.01-500x500_cggft5.png',
            'https://res.cloudinary.com/dhsg68f5x/image/upload/q_auto/f_auto/v1776267147/PAG-65-02.201.01-500x500_wfnvdw.png',
            'https://res.cloudinary.com/dhsg68f5x/image/upload/q_auto/f_auto/v1776267147/06.900.01-PAG-258-2-500x500_m5wngf.png',
            'https://res.cloudinary.com/dhsg68f5x/image/upload/q_auto/f_auto/v1776267147/PAG-57-02.108.01-500x500_wtc4i9.png',
            'https://res.cloudinary.com/dhsg68f5x/image/upload/q_auto/f_auto/v1776267146/PAG-41-02.104.01-03-500x500_bmsze0.png',
            'https://res.cloudinary.com/dhsg68f5x/image/upload/q_auto/f_auto/v1776267146/2-Rasgos-de-22-02.213.01-03-500x500_q9aaof.png',
            'https://res.cloudinary.com/dhsg68f5x/image/upload/q_auto/f_auto/v1776267146/1-Furos-o18-02.202.01-500x500_kysjp7.png',
            'https://res.cloudinary.com/dhsg68f5x/image/upload/q_auto/f_auto/v1776268118/1-Furo-02.200.01-04--500x500_maancu.png',
        ],
        'elet9': [
            'https://res.cloudinary.com/dhsg68f5x/image/upload/q_auto/f_auto/v1776268960/terminal-de-cravar-cobre-bt-600x600_x3qlkp.jpg',
            'https://res.cloudinary.com/dhsg68f5x/image/upload/q_auto/f_auto/v1776268962/tcjobasi-500x500_bncho5.png',
            'https://res.cloudinary.com/dhsg68f5x/image/upload/q_auto/f_auto/v1776268961/terminaldinjobasi-500x500_wkwnua.png',
            'https://res.cloudinary.com/dhsg68f5x/image/upload/q_auto/f_auto/v1776268960/terminal-de-cobre-macico-de-cravar-mt-600x600_cyzkuc.jpg',
            'https://res.cloudinary.com/dhsg68f5x/image/upload/q_auto/f_auto/v1776268958/jw-500x500_scid4y.png',
            'https://res.cloudinary.com/dhsg68f5x/image/upload/q_auto/f_auto/v1776268960/Terminal-cravar-Cobre-90graus-500x500_mohirh.png',
            'https://res.cloudinary.com/dhsg68f5x/image/upload/q_auto/f_auto/v1776268963/unioes-bimet-mt-600x600_hu2icp.jpg',
            'https://res.cloudinary.com/dhsg68f5x/image/upload/q_auto/f_auto/v1776268958/terminal-bimetalico-tbi-600x600_f5krqe.jpg',
            'https://res.cloudinary.com/dhsg68f5x/image/upload/q_auto/f_auto/v1776268959/terminal-concentrico-angulo-recto-600x600_g5xvid.jpg',
            'https://res.cloudinary.com/dhsg68f5x/image/upload/q_auto/f_auto/v1776268963/uniao-de-cravar-de-cobre-bt-600x600_ac0pz5.jpg',
            'https://res.cloudinary.com/dhsg68f5x/image/upload/q_auto/f_auto/v1776268962/Terminal-Cravar-Ponteira-500x500_ubmzyk.png',
            'https://res.cloudinary.com/dhsg68f5x/image/upload/q_auto/f_auto/v1776268961/uniao-concentrica-simples-600x600_vqvfdc.jpg',
            'https://res.cloudinary.com/dhsg68f5x/image/upload/q_auto/f_auto/v1776268962/Terminal-Liga-Unica-Jobasi-500x500_j4llga.png',
            'https://res.cloudinary.com/dhsg68f5x/image/upload/q_auto/f_auto/v1776268960/terminal-de-cobre-macico-de-cravar-mt-600x600_cyzkuc.jpg',
        ]
    };

    // ===== NOMES DOS PRODUTOS =====
    const nomesProdutos = {
        'elet1': [
            "Berço de Guiamento",
            "Ligadores de Derivação de Aperto Independente",
            "Pinça e Consola de Amarração para Redes com Neutro Tensor",
            "Ligadores de Derivação de Aperto Simultâneo",
            "Pinça de Suspensão",
            "Pinças de Amarração Plásticas para Ramais",
            "Pinça de Amarração Metálica para Redes",
            "Pinça e Consola de Suspensão para Redes com Neutro Tensor",
            "Abraçadeira de liga",
            "Terminal Pré-Isolado",
            "Roldana em Alumínio para Cabos de Torçada e Cabos Nus",
            "União Pré-Isolada",
            "Cachimbo em aluminio para baixadas",
            "Pinça de Suspensão Mural"
        ],
        'elet3': [
            "Pinça de Suspensão",
            "Ligador de Derivação",
            "Conector de Tensão",
            "Gancho de Ancoragem",
            "Esticador de Linha",
            "Manilha de Suspensão",
            "Cantoneira de Fixação",
            "Braço de Sustentação",
            "Isolador de Porcelana",
            "Grampo de Ancoragem",
            "Conector Bimetálico",
            "Luva de Emenda",
            "Para-raios",
            "Espaçador de Cabos"
        ]
    };

    // ===== BASE DE DADOS DE PRODUTOS =====
    const catalogoProdutos = {};

    // Gerar produtos usando as URLs
    for (const cat in subcategoriasData) {
        subcategoriasData[cat].forEach(sub => {
            const produtos = [];
            const urls = imagensCloudinary[sub.id] || [];
            const nomes = nomesProdutos[sub.id] || [];
            
            for (let i = 0; i < 14; i++) {
                const url = urls[i] || (CLOUDINARY + 'placeholder.jpg');
                const nome = nomes[i] || `Produto ${sub.id} - ${i+1}`;
                
                produtos.push({
                    img: url,
                    nome: nome
                });
            }
            catalogoProdutos[sub.id] = produtos;
        });
    }

    // ===== VARIÁVEIS DE ESTADO =====
    let subcategoriaAtual = null;
    let termoPesquisa = '';
    let paginaAtual = 1;
    const itensPorPagina = 6;
    
    // ===== VARIÁVEIS PARA PAGINAÇÃO DA TABELA =====
    let tabelaPaginaAtual = 1;
    let itensPorPaginaTabela = 5;
    let especificacoesCompletas = [];

    // ===== FUNÇÕES DE CARREGAMENTO =====
    function carregarProdutos(subcategoriaId) {
        const produtos = catalogoProdutos[subcategoriaId] || [];
        
        const produtosFiltrados = produtos.filter(prod =>
            prod.nome.toLowerCase().includes(termoPesquisa.toLowerCase())
        );

        const totalPaginas = Math.ceil(produtosFiltrados.length / itensPorPagina);
        if (paginaAtual > totalPaginas) paginaAtual = totalPaginas || 1;

        const inicio = (paginaAtual - 1) * itensPorPagina;
        const produtosPaginados = produtosFiltrados.slice(inicio, inicio + itensPorPagina);

        if (produtosPaginados.length === 0) {
            produtosGrid.innerHTML = '<p style="text-align:center; grid-column:1/-1; padding:40px;">Nenhum produto encontrado.</p>';
            atualizarPaginacao(totalPaginas);
            return;
        }

        let html = '';
        produtosPaginados.forEach(prod => {
            const produtoJSON = JSON.stringify(prod).replace(/'/g, "&apos;");
            html += `
                <div class="material-card" onclick='abrirModal(${produtoJSON})'>
                    <img src="${prod.img}" alt="${prod.nome}" onerror="this.src='${CLOUDINARY}placeholder.jpg'">
                    <div class="card-body">
                        <h4>${prod.nome}</h4>
                    </div>
                </div>
            `;
        });
        produtosGrid.innerHTML = html;
        atualizarPaginacao(totalPaginas);
    }

    function atualizarPaginacao(totalPaginas) {
        if (!btnAnterior || !btnProximo || !paginaInfo) return;
        if (totalPaginas <= 1) {
            btnAnterior.disabled = true;
            btnProximo.disabled = true;
            paginaInfo.textContent = 'Página 1';
            return;
        }
        btnAnterior.disabled = paginaAtual === 1;
        btnProximo.disabled = paginaAtual === totalPaginas;
        paginaInfo.textContent = `Página ${paginaAtual} de ${totalPaginas}`;
    }

    // ===== EVENTOS DE CATEGORIAS =====
    document.querySelectorAll('.categoria-principal-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const principal = this.getAttribute('data-principal');
            const subcategorias = subcategoriasData[principal];
            
            tituloSubcategoria.textContent = this.textContent;
            
            listaSubcategorias.innerHTML = '';
            subcategorias.forEach(sub => {
                const li = document.createElement('li');
                const btnSub = document.createElement('button');
                btnSub.className = 'categoria-btn';
                btnSub.textContent = sub.nome;
                btnSub.setAttribute('data-subcategoria', sub.id);
                btnSub.addEventListener('click', function() {
                    document.querySelectorAll('.categoria-btn').forEach(b => b.classList.remove('ativo'));
                    this.classList.add('ativo');
                    subcategoriaAtual = this.getAttribute('data-subcategoria');
                    termoPesquisa = '';
                    paginaAtual = 1;
                    if (pesquisaInput) pesquisaInput.value = '';
                    carregarProdutos(subcategoriaAtual);
                });
                li.appendChild(btnSub);
                listaSubcategorias.appendChild(li);
            });

            categoriasPrincipaisDiv.style.display = 'none';
            subcategoriasDiv.style.display = 'block';
        });
    });

    // VOLTAR PARA CATEGORIAS PRINCIPAIS
    if (voltarBtn) {
        voltarBtn.addEventListener('click', function() {
            categoriasPrincipaisDiv.style.display = 'block';
            subcategoriasDiv.style.display = 'none';
            subcategoriaAtual = null;
            produtosGrid.innerHTML = '';
            document.querySelectorAll('.categoria-btn').forEach(b => b.classList.remove('ativo'));
            if (btnAnterior && btnProximo && paginaInfo) {
                btnAnterior.disabled = true;
                btnProximo.disabled = true;
                paginaInfo.textContent = 'Página 1';
            }
        });
    }

    // ===== PESQUISA =====
    if (pesquisaInput) {
        pesquisaInput.addEventListener('input', function() {
            if (subcategoriaAtual) {
                termoPesquisa = this.value;
                paginaAtual = 1;
                carregarProdutos(subcategoriaAtual);
            }
        });
    }

    if (pesquisaBtn) {
        pesquisaBtn.addEventListener('click', function() {
            if (subcategoriaAtual) {
                termoPesquisa = pesquisaInput.value;
                paginaAtual = 1;
                carregarProdutos(subcategoriaAtual);
            }
        });
    }

    // ===== PAGINAÇÃO DO CATÁLOGO =====
    if (btnAnterior) {
        btnAnterior.addEventListener('click', function() {
            if (subcategoriaAtual && paginaAtual > 1) {
                paginaAtual--;
                carregarProdutos(subcategoriaAtual);
            }
        });
    }

    if (btnProximo) {
        btnProximo.addEventListener('click', function() {
            if (subcategoriaAtual) {
                const produtos = catalogoProdutos[subcategoriaAtual] || [];
                const produtosFiltrados = produtos.filter(prod =>
                    prod.nome.toLowerCase().includes(termoPesquisa.toLowerCase())
                );
                const total = Math.ceil(produtosFiltrados.length / itensPorPagina);
                if (paginaAtual < total) {
                    paginaAtual++;
                    carregarProdutos(subcategoriaAtual);
                }
            }
        });
    }

    // ===== PAGINAÇÃO DA TABELA DENTRO DO MODAL =====
    const btnAnteriorTab = document.getElementById('tabAnterior');
    const btnProximoTab = document.getElementById('tabProximo');
    
    if (btnAnteriorTab) {
        btnAnteriorTab.addEventListener('click', function() {
            if (tabelaPaginaAtual > 1) {
                tabelaPaginaAtual--;
                renderizarTabelaComPaginacao();
            }
        });
    }
    
    if (btnProximoTab) {
        btnProximoTab.addEventListener('click', function() {
            const totalPaginas = Math.ceil(especificacoesCompletas.length / itensPorPaginaTabela);
            if (tabelaPaginaAtual < totalPaginas) {
                tabelaPaginaAtual++;
                renderizarTabelaComPaginacao();
            }
        });
    }

    // ===== MODAL: FECHAR =====
    const modal = document.getElementById('modal-produto');
    const modalClose = document.querySelector('.modal-close');
    const modalOrcamento = document.getElementById('modal-orcamento');

    if (modalClose) {
        modalClose.addEventListener('click', function() {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
    }

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

    if (modalOrcamento) {
        modalOrcamento.addEventListener('click', () => {
            window.location.href = 'contato.html';
        });
    }

    // Expor função global
    window.abrirModal = abrirModal;



    /*    // ===== TESTE DE CARREGAMENTO DE PRODUTOS =====*/



    


    
});