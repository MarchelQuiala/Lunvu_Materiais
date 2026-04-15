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
    
    const aboutSection = document.querySelector('.about');
    const stats = document.querySelectorAll('.stat h3');
    
    if (aboutSection && stats.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                stats.forEach(stat => {
                    const text = stat.textContent;
                    let target, suffix = '';
                    
                    if (text.includes('+')) {
                        target = parseInt(text.replace('+', ''));
                        suffix = '+';
                    } else if (text.includes('%')) {
                        target = parseInt(text.replace('%', ''));
                        suffix = '%';
                    } else if (text.includes('anos')) {
                        target = parseInt(text.replace(' anos', ''));
                        suffix = ' anos';
                    } else {
                        target = parseInt(text);
                    }
                    
                    if (!isNaN(target)) {
                        animateCounter(stat, target, suffix);
                    }
                });
                observer.unobserve(aboutSection);
            }
        }, { threshold: 0.5 });
        
        observer.observe(aboutSection);
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
    const contactForm = document.getElementById('contactForm');
    const formMensagem = document.getElementById('form-mensagem');

    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();

            formMensagem.innerHTML = '<p style="color: #4361ee;">A enviar mensagem...</p>';
            formMensagem.style.display = 'block';

            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData.entries());

            try {
                const response = await fetch('https://api.web3forms.com/submit', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data)
                });

                const result = await response.json();

                if (response.ok && result.success) {
                    formMensagem.innerHTML = '<p style="color: green;">✓ Mensagem enviada com sucesso! Entraremos em contacto em breve.</p>';
                    contactForm.reset();
                } else {
                    formMensagem.innerHTML = '<p style="color: red;">✗ Erro ao enviar. Tente novamente.</p>';
                }
            } catch (error) {
                formMensagem.innerHTML = '<p style="color: red;">✗ Erro de rede. Verifique sua conexão.</p>';
            }
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
        // MATERIAIS ELÉTRICOS
        'elet1': [
            'https://res.cloudinary.com/dhsg68f5x/image/upload/R10_l3whdp',
            'https://res.cloudinary.com/dhsg68f5x/image/upload/v1772445047/R9_dmn7er.jpg',
            'https://res.cloudinary.com/dhsg68f5x/image/upload/v1772445046/R6_qhxtmw.png',
            'https://res.cloudinary.com/dhsg68f5x/image/upload/v1772445046/R7_gy2uuy.jpg',
            'https://res.cloudinary.com/dhsg68f5x/image/upload/v1772445045/R5_dxtgba.jpg',
            'https://res.cloudinary.com/dhsg68f5x/image/upload/v1772445045/R3_b2fxo0.jpg',
            'https://res.cloudinary.com/dhsg68f5x/image/upload/v1772445045/R4_azzttv.jpg',
            'https://res.cloudinary.com/dhsg68f5x/image/upload/v1772445044/R2_ajs7vd.png',
            'https://res.cloudinary.com/dhsg68f5x/image/upload/v1772445042/R1_apc03g.jpg',
            'https://res.cloudinary.com/dhsg68f5x/image/upload/v1772445048/R12_ynfvwg.png',
            'https://res.cloudinary.com/dhsg68f5x/image/upload/v1772539208/roldana-em-aluminio-para-cabos-torcada-t-e-cabos-nus-n-600x600_zy1jdb.jpg',
            'https://res.cloudinary.com/dhsg68f5x/image/upload/v1772539209/uniao-preisolada-jobasi_-500x500_1_mhzi7v.png',
            'https://res.cloudinary.com/dhsg68f5x/image/upload/v1772539208/braco-pe-90-600x600_pa4bwk.jpg',
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
            'https://res.cloudinary.com/dhsg68f5x/image/upload/q_auto/f_auto/v1776272347/images_26_wjc93n.jpg',
            'https://res.cloudinary.com/dhsg68f5x/image/upload/q_auto/f_auto/v1776271376/images_25_biwgrf.jpg',
      
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
           'elet5':[
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


        // ... (as restantes subcategorias mantêm-se como estavam)
    };

    // ===== DADOS REAIS DOS PRODUTOS (SUBSTITUIR AQUI) =====
    const dadosProdutos = {
        // MATERIAIS ELÉTRICOS - ACESSÓRIOS PARA REDES DE CABOS DE TORÇADA (elet1)
        'elet1': [
            { nome: 'Berço de Guiamento com Espigão', desc: 'Conector tipo cunha para cabos de alumínio', material: 'pedra', dimensoes: '45 x 25 x 15 mm', peso: '0.15 kg', cor: 'Prata', norma: 'NBR 12345' },
            { nome: 'Berço de Guiamento com Gancho', desc: 'Chave para montagem de conectores torçados', material: 'Aço carbono', dimensoes: '200 x 50 x 20 mm', peso: '1.2 kg', cor: 'Vermelho', norma: 'ISO 6789' },
            { nome: 'Pinça e Consola de Amarração para Redes com Neutro Tensor', desc: 'Isolador para cabos torçados', material: 'Polietileno', dimensoes: '30 x 30 mm', peso: '0.05 kg', cor: 'Preto', norma: 'NBR 5432' },
            { nome: 'Ligador de Derivação (IP)', desc: 'Conector tipo cunha para cabos de alumínio', material: 'pedra', dimensoes: '45 x 25 x 15 mm', peso: '0.15 kg', cor: 'Prata', norma: 'NBR 12345' },
            { nome: 'Pinça de Suspensão', desc: 'Chave para montagem de conectores torçados', material: 'Aço carbono', dimensoes: '200 x 50 x 20 mm', peso: '1.2 kg', cor: 'Vermelho', norma: 'ISO 6789' },
            { nome: 'Pinças de Amarração Plásticas para Ramais', desc: 'Isolador para cabos torçados', material: 'Polietileno', dimensoes: '30 x 30 mm', peso: '0.05 kg', cor: 'Preto', norma: 'NBR 5432' },
            { nome: 'Pinça de Amarração Metálica para Redes', desc: 'Conector tipo cunha para cabos de alumínio', material: 'pedra', dimensoes: '45 x 25 x 15 mm', peso: '0.15 kg', cor: 'Prata', norma: 'NBR 12345' },
            { nome: 'Pinça e Consola de Suspensão para Redes com Neutro Tensor', desc: 'Chave para montagem de conectores torçados', material: 'Aço carbono', dimensoes: '200 x 50 x 20 mm', peso: '1.2 kg', cor: 'Vermelho', norma: 'ISO 6789' },
            { nome: 'Ligador de Derivação (P95)', desc: 'Isolador para cabos torçados', material: 'Polietileno', dimensoes: '30 x 30 mm', peso: '0.05 kg', cor: 'Preto', norma: 'NBR 5432' },
            { nome: 'Terminal Pré-Isolado', desc: 'Conector tipo cunha para cabos de alumínio', material: 'pedra', dimensoes: '45 x 25 x 15 mm', peso: '0.15 kg', cor: 'Prata', norma: 'NBR 12345' },
            { nome: 'Roldana em Alumínio para Cabos de Torçada e Cabos Nus', desc: 'Chave para montagem de conectores torçados', material: 'Aço carbono', dimensoes: '200 x 50 x 20 mm', peso: '1.2 kg', cor: 'Vermelho', norma: 'ISO 6789' },
            { nome: 'União Pré-Isolada', desc: 'Isolador para cabos torçados', material: 'Polietileno', dimensoes: '30 x 30 mm', peso: '0.05 kg', cor: 'Preto', norma: 'NBR 5432' },
           
            // ... até 14 produtos (substituir pelos reais)
            // ... até 14 produtos (substituir pelos reais)
        ],
        // ACESSÓRIOS PARA ILUMINAÇÃO PÚBLICA (elet2)
        'elet2': [
            { nome: 'Luminária LED 60W', desc: 'Luminária para via pública, 60W, 5000K', material: 'Alumínio e policarbonato', dimensoes: '400 x 200 x 100 mm', peso: '3.5 kg', cor: 'Branco', norma: 'IEC 60598' },
            { nome: 'Braço para Luminária', desc: 'Braço em aço galvanizado 1,5m', material: 'Aço galvanizado', dimensoes: '1500 mm', peso: '2.8 kg', cor: 'Galvanizado', norma: 'NBR 5432' },
            // ... até 14
        ],
        // ... continuar para todas as subcategorias
    };

    // ===== BASE DE DADOS DE PRODUTOS =====
    const catalogoProdutos = {};

    // Gerar produtos usando as URLs e os dados reais
    for (const cat in subcategoriasData) {
        subcategoriasData[cat].forEach(sub => {
            const produtos = [];
            const urls = imagensCloudinary[sub.id] || [];
            const dados = dadosProdutos[sub.id] || [];

            for (let i = 0; i < 14; i++) {
                const url = urls[i] || (CLOUDINARY + 'placeholder.jpg');
                // Se existirem dados reais para este índice, usa-os; senão, usa fallback
                const info = dados[i] || {
                    nome: `Produto ${sub.id} - ${i+1}`,
                    desc: `Descrição do produto ${i+1}`,
                    material: 'Consultar',
                    dimensoes: 'Consultar',
                    peso: 'Consultar',
                    cor: 'Consultar',
                    norma: 'Consultar'
                };
                produtos.push({
                    img: url,
                    nome: info.nome,
                    desc: info.desc,
                    material: info.material,
                    dimensoes: info.dimensoes,
                    peso: info.peso,
                    cor: info.cor,
                    norma: info.norma
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

    // ===== FUNÇÕES =====
    function carregarProdutos(subcategoriaId) {
        const produtos = catalogoProdutos[subcategoriaId] || [];
        
        const produtosFiltrados = produtos.filter(prod =>
            prod.nome.toLowerCase().includes(termoPesquisa.toLowerCase()) ||
            prod.desc.toLowerCase().includes(termoPesquisa.toLowerCase())
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
                        <p>${prod.desc}</p>
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

    // ===== PAGINAÇÃO =====
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
                const total = Math.ceil(catalogoProdutos[subcategoriaAtual].length / itensPorPagina);
                if (paginaAtual < total) {
                    paginaAtual++;
                    carregarProdutos(subcategoriaAtual);
                }
            }
        });
    }

    // ===== MODAL =====
    const modal = document.getElementById('modal-produto');
    const modalImg = document.getElementById('modal-img');
    const modalNome = document.getElementById('modal-nome');
    const modalDesc = document.getElementById('modal-desc');
    const modalMaterial = document.getElementById('ft-material');
    const modalDimensoes = document.getElementById('ft-dimensoes');
    const modalPeso = document.getElementById('ft-peso');
    const modalCor = document.getElementById('ft-cor');
    const modalNorma = document.getElementById('ft-norma');
    const modalOrcamento = document.getElementById('modal-orcamento');
    const modalClose = document.querySelector('.modal-close');

    if (modal) {
        function abrirModal(produto) {
            modalImg.src = produto.img;
            modalNome.textContent = produto.nome;
            modalDesc.textContent = produto.desc;
            modalMaterial.textContent = produto.material || 'Consultar';
            modalDimensoes.textContent = produto.dimensoes || 'Consultar';
            modalPeso.textContent = produto.peso || 'Consultar';
            modalCor.textContent = produto.cor || 'Consultar';
            modalNorma.textContent = produto.norma || 'Consultar';
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        }

        function fecharModal() {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }

        modalClose.addEventListener('click', fecharModal);
        window.addEventListener('click', (e) => {
            if (e.target === modal) fecharModal();
        });

        modalOrcamento.addEventListener('click', () => {
            window.location.href = 'contato.html';
        });

        window.abrirModal = abrirModal;
    }
});