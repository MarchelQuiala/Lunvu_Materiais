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
    // SEÇÃO NOSSOS MATERIAIS - TROCA DE IMAGENS
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
    // MOSTRAR WHATSAPP APENAS QUANDO FOOTER APARECE
    // ============================================
    
});

// ============================================
// Código específico da página de catálogo
// ============================================
// ============================================
// Código específico da página de catálogo
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
            { id: 'elet9', nome: '9. SOLDADURAS' },
            { id: 'elet10', nome: '10. TERMINAIS, UNIÕES E BORNES' },
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
            

            // ... adicione as 14 URLs para elet1
        ],
        'elet2': [
            'https://res.cloudinary.com/dhsg68f5x/image/upload/S5_by36rt',
            'https://res.cloudinary.com/dhsg68f5x/image/upload/S2_x8bg2q',
            'https://res.cloudinary.com/dhsg68f5x/image/upload/v1772445050/S10_kp2czk.jpg',
            'https://res.cloudinary.com/dhsg68f5x/image/upload/v1772445051/S9_gamlkx.png',
            'https://res.cloudinary.com/dhsg68f5x/image/upload/v1772445048/S3_a3ewtp.jpg',
            'https://res.cloudinary.com/dhsg68f5x/image/upload/v1772445048/S1_vl9axv.jpg',
            'https://res.cloudinary.com/dhsg68f5x/image/upload/v1772445051/S11_grupio.png',
            'https://res.cloudinary.com/dhsg68f5x/image/upload/v1772445049/S6_x7rfoz.png',
            'https://res.cloudinary.com/dhsg68f5x/image/upload/v1772445049/S8_blebbv.jpg',
            'https://res.cloudinary.com/dhsg68f5x/image/upload/v1772445049/S4_eh50jf.jpg',
            'https://res.cloudinary.com/dhsg68f5x/image/upload/v1772540284/S15_dsjylk.png',
            'https://res.cloudinary.com/dhsg68f5x/image/upload/v1772540272/S14_gsimmk.webp',
            'https://res.cloudinary.com/dhsg68f5x/image/upload/v1772540272/S16_roqoxn.jpg',
            'https://res.cloudinary.com/dhsg68f5x/image/upload/v1772540270/S13_i7qj62.webp',
            // ... adicione as 14 URLs para elet2
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
            // ...
        ],
        // Preencha os demais com [] ou com URLs reais
        'elet4': [],
        'elet5': [],
        'elet6': [],
        'elet7': [],
        'elet8': [],
        'elet9': [],
        'elet10': [],
        'cons1': [],
        'cons2': [],
        'cons3': [],
        'cons4': [],
        'cons5': [],
        'cons6': [],
        'cons7': [],
        'cons8': [],
        'cons9': [],
        'cons10': [],
        'can1': [],
        'can2': [],
        'can3': [],
        'can4': [],
        'can5': [],
        'can6': [],
        'can7': [],
        'can8': [],
        'can9': [],
        'can10': [],
        'fer1': [],
        'fer2': [],
        'fer3': [],
        'fer4': [],
        'fer5': [],
        'fer6': [],
        'fer7': [],
        'fer8': [],
        'fer9': [],
        'fer10': []
    };

    // ===== BASE DE DADOS DE PRODUTOS =====
    const catalogoProdutos = {};

    // Gerar produtos usando as URLs mapeadas
    for (const cat in subcategoriasData) {
        subcategoriasData[cat].forEach(sub => {
            const produtos = [];
            const urls = imagensCloudinary[sub.id] || [];

            if (urls.length === 0) {
                // Se não há URLs, usa placeholder
                for (let i = 1; i <= 14; i++) {
                    produtos.push({
                        img: CLOUDINARY + 'placeholder.jpg', // crie um placeholder no Cloudinary
                        nome: `Produto ${sub.id} - ${i}`,
                        desc: `Descrição do produto ${i}`,
                        material: 'Aço inox',
                        dimensoes: `${10 + i} x ${5 + i} cm`,
                        peso: `${i}.5 kg`,
                        cor: 'Cinza',
                        norma: `NBR ${1000 + i}`
                    });
                }
            } else {
                for (let i = 0; i < 14; i++) {
                    const url = urls[i] || (CLOUDINARY + 'placeholder.jpg');
                    produtos.push({
                        img: url,
                        nome: `Produto ${sub.id} - ${i+1}`,
                        desc: `Descrição do produto ${i+1}`,
                        material: 'Aço inox',
                        dimensoes: `${10 + i+1} x ${5 + i+1} cm`,
                        peso: `${i+1}.5 kg`,
                        cor: 'Cinza',
                        norma: `NBR ${1000 + i+1}`
                    });
                }
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