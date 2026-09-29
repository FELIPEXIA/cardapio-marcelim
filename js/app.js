/**
 * CHURRASQUIM DO MARCELIM - APLICAÇÃO CARDÁPIO DIGITAL MOBILE-FIRST
 * Lógica de Interface, Rascunho de Pedido, Filtros e Modo Atendente
 */

document.addEventListener('DOMContentLoaded', () => {
  // ==========================================
  // ESTADO DA APLICAÇÃO
  // ==========================================
  const state = {
    table: getInitialTable(),
    cart: loadCartFromStorage(),
    activeCategory: 'destaques',
    searchQuery: '',
    generalNotes: localStorage.getItem('marcelim_order_notes') || ''
  };

  // ==========================================
  // ELEMENTOS DO DOM
  // ==========================================
  const dom = {
    currentTableLabel: document.getElementById('current-table-label'),
    btnMesaSelector: document.getElementById('btn-mesa-selector'),
    categoriesContainer: document.getElementById('categories-container'),
    productsCatalog: document.getElementById('products-catalog'),
    searchInput: document.getElementById('search-input'),
    btnClearSearch: document.getElementById('btn-clear-search'),
    
    // Barra Flutuante
    floatingDraftBar: document.getElementById('floating-draft-bar'),
    btnOpenDraftDrawer: document.getElementById('btn-open-draft-drawer'),
    draftItemCount: document.getElementById('draft-item-count'),
    draftTotalPreview: document.getElementById('draft-total-preview'),

    // Gaveta de Rascunho
    drawerBackdrop: document.getElementById('drawer-backdrop'),
    draftDrawer: document.getElementById('draft-drawer'),
    btnCloseDrawer: document.getElementById('btn-close-drawer'),
    drawerTableDisplay: document.getElementById('drawer-table-display'),
    draftItemsList: document.getElementById('draft-items-list'),
    orderNotes: document.getElementById('order-notes'),
    summaryItemsQty: document.getElementById('summary-items-qty'),
    summaryTotalAmount: document.getElementById('summary-total-amount'),
    btnCallWaiter: document.getElementById('btn-call-waiter'),
    btnClearDraft: document.getElementById('btn-clear-draft'),

    // Modo Atendente / Ticket
    waiterModalBackdrop: document.getElementById('waiter-modal-backdrop'),
    waiterModal: document.getElementById('waiter-modal'),
    btnCloseWaiterModal: document.getElementById('btn-close-waiter-modal'),
    ticketTableBadge: document.getElementById('ticket-table-badge'),
    ticketTime: document.getElementById('ticket-time'),
    ticketItemsList: document.getElementById('ticket-items-list'),
    ticketNotesDisplay: document.getElementById('ticket-notes-display'),
    ticketNotesText: document.getElementById('ticket-notes-text'),
    ticketTotalValue: document.getElementById('ticket-total-value'),
    btnBeaconMode: document.getElementById('btn-beacon-mode'),
    btnCopyTicket: document.getElementById('btn-copy-ticket'),

    // Farol de Mesa (Beacon)
    beaconFullscreen: document.getElementById('beacon-fullscreen'),
    beaconTableNum: document.getElementById('beacon-table-num'),
    btnExitBeacon: document.getElementById('btn-exit-beacon'),

    // Modal Trocar Mesa
    tableModalBackdrop: document.getElementById('table-modal-backdrop'),
    tableModal: document.getElementById('table-modal'),
    btnCloseTableModal: document.getElementById('btn-close-table-modal'),
    customTableInput: document.getElementById('custom-table-input'),
    btnSaveTable: document.getElementById('btn-save-table'),
    quickTableButtons: document.querySelectorAll('.quick-table-btn'),

    // Modal Info
    btnInfoModal: document.getElementById('btn-info-modal'),
    infoModalBackdrop: document.getElementById('info-modal-backdrop'),
    infoModal: document.getElementById('info-modal'),
    btnCloseInfoModal: document.getElementById('btn-close-info-modal'),

    // Modal Opções de Item
    itemModalBackdrop: document.getElementById('item-modal-backdrop'),
    itemModal: document.getElementById('item-modal'),
    itemModalContent: document.getElementById('item-modal-content'),

    // Toast
    toast: document.getElementById('toast-notification'),
    toastIcon: document.getElementById('toast-icon'),
    toastMessage: document.getElementById('toast-message'),

    // Splash Screen
    splashScreen: document.getElementById('splash-screen'),
    splashLoadingText: document.getElementById('splash-loading-text')
  };

  // ==========================================
  // INICIALIZAÇÃO
  // ==========================================
  init();

  function init() {
    setupSplashScreen();
    updateTableUI();
    renderCategories();
    renderProducts();
    updateCartUI();
    setupEventListeners();

    if (state.generalNotes && dom.orderNotes) {
      dom.orderNotes.value = state.generalNotes;
    }
  }

  // ==========================================
  // TELA DE BOAS-VINDAS (SPLASH SCREEN)
  // ==========================================
  function setupSplashScreen() {
    if (!dom.splashScreen) return;

    // Texto de carregamento personalizado com a mesa
    const tableLabel = state.table.toLowerCase().includes('balc') 
      ? state.table 
      : `Mesa ${state.table}`;

    if (dom.splashLoadingText) {
      dom.splashLoadingText.textContent = `Carregando o cardápio da ${tableLabel}...`;
    }

    let closed = false;
    const hideSplash = () => {
      if (closed) return;
      closed = true;
      dom.splashScreen.classList.add('fade-out');
      setTimeout(() => {
        if (dom.splashScreen) {
          dom.splashScreen.style.display = 'none';
        }
      }, 700);
    };

    // Transição suave de fade-out após 2 segundos
    setTimeout(hideSplash, 2000);

    // Toque na tela para dispensar instantaneamente
    dom.splashScreen.addEventListener('click', hideSplash);
  }

  // ==========================================
  // FUNÇÕES DE MESA & PERSISTÊNCIA
  // ==========================================
  function getInitialTable() {
    const urlParams = new URLSearchParams(window.location.search);
    const mesaParam = urlParams.get('mesa') || urlParams.get('m');
    if (mesaParam) {
      const cleanMesa = mesaParam.replace(/[^0-9a-zA-Z]/g, '');
      localStorage.setItem('marcelim_table', cleanMesa);
      return cleanMesa;
    }
    return localStorage.getItem('marcelim_table') || MENU_DATA.restaurant.defaultTable;
  }

  function setTable(newTable) {
    state.table = newTable;
    localStorage.setItem('marcelim_table', newTable);
    updateTableUI();
    closeAllModals();
    showToast(`Mesa alterada para ${newTable}!`, '📍');
  }

  function updateTableUI() {
    const formatted = state.table.toLowerCase().includes('balc') ? state.table : `Mesa ${state.table}`;
    dom.currentTableLabel.textContent = formatted;
    dom.drawerTableDisplay.textContent = formatted;
    dom.ticketTableBadge.textContent = formatted.toUpperCase();
    dom.beaconTableNum.textContent = formatted.toUpperCase();
  }

  function loadCartFromStorage() {
    try {
      const saved = localStorage.getItem('marcelim_draft_cart');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  }

  function saveCartToStorage() {
    localStorage.setItem('marcelim_draft_cart', JSON.stringify(state.cart));
  }

  function triggerHaptic() {
    if (navigator.vibrate) {
      navigator.vibrate(30);
    }
  }

  // ==========================================
  // RENDERIZAÇÃO DE CATEGORIAS
  // ==========================================
  function renderCategories() {
    dom.categoriesContainer.innerHTML = '';

    MENU_DATA.categories.forEach((cat) => {
      const pill = document.createElement('button');
      pill.className = `category-pill ${cat.id === state.activeCategory ? 'active' : ''}`;
      pill.dataset.category = cat.id;
      pill.textContent = cat.name;
      pill.addEventListener('click', () => {
        state.activeCategory = cat.id;
        state.searchQuery = '';
        dom.searchInput.value = '';
        dom.btnClearSearch.style.display = 'none';
        
        document.querySelectorAll('.category-pill').forEach(p => p.classList.remove('active'));
        pill.classList.add('active');

        // Rolagem suave até a seção correspondente
        const targetSection = document.getElementById(`section-${cat.id}`);
        if (targetSection) {
          const header = document.querySelector('.main-header');
          const headerOffset = header ? header.offsetHeight + 10 : 230;
          const elementPosition = targetSection.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      });
      dom.categoriesContainer.appendChild(pill);
    });

    setupCategoryScrollSpy();
  }

  function setupCategoryScrollSpy() {
    if (window._categoryScrollSpyActive) return;
    window._categoryScrollSpyActive = true;

    let scrollTimeout;
    window.addEventListener('scroll', () => {
      if (state.searchQuery) return;
      if (scrollTimeout) clearTimeout(scrollTimeout);

      scrollTimeout = setTimeout(() => {
        const header = document.querySelector('.main-header');
        const headerOffset = header ? header.offsetHeight + 80 : 260;
        const scrollPos = window.scrollY + headerOffset;

        for (let i = MENU_DATA.categories.length - 1; i >= 0; i--) {
          const cat = MENU_DATA.categories[i];
          const section = document.getElementById(`section-${cat.id}`);
          if (section && section.offsetTop <= scrollPos) {
            if (state.activeCategory !== cat.id) {
              state.activeCategory = cat.id;
              const pills = document.querySelectorAll('.category-pill');
              pills.forEach(p => {
                if (p.dataset.category === cat.id) {
                  p.classList.add('active');
                } else {
                  p.classList.remove('active');
                }
              });
            }
            break;
          }
        }
      }, 50);
    }, { passive: true });
  }

  // ==========================================
  // RENDERIZAÇÃO DE PRODUTOS & CARDS
  // ==========================================
  function renderProducts() {
    dom.productsCatalog.innerHTML = '';

    const query = state.searchQuery.toLowerCase().trim();

    // Filtra produtos se houver busca
    let filteredProducts = MENU_DATA.products;
    if (query) {
      filteredProducts = MENU_DATA.products.filter(p => 
        p.name.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query) ||
        p.category.toLowerCase().includes(query)
      );

      if (filteredProducts.length === 0) {
        dom.productsCatalog.innerHTML = `
          <div class="empty-search-state">
            <div class="empty-icon">🔍</div>
            <h3 style="font-family: var(--font-display); font-size: 18px; margin-bottom: 6px;">Nenhum item encontrado</h3>
            <p style="color: var(--text-secondary); font-size: 13px;">Tente buscar por termos como "espeto", "picanha", "chopp" ou "mandioca".</p>
          </div>
        `;
        return;
      }

      // Renderiza resultado unificado de busca
      const searchSection = document.createElement('section');
      searchSection.className = 'category-section';
      searchSection.innerHTML = `
        <h2 class="category-section-title">Resultados para "${query}" (${filteredProducts.length})</h2>
        <div class="products-grid"></div>
      `;
      const grid = searchSection.querySelector('.products-grid');
      filteredProducts.forEach(product => grid.appendChild(createProductCard(product)));
      dom.productsCatalog.appendChild(searchSection);
      return;
    }

    // Renderização normal agrupada por categorias
    MENU_DATA.categories.forEach(category => {
      const categoryProducts = MENU_DATA.products.filter(p => p.category === category.id);
      if (categoryProducts.length === 0) return;

      const section = document.createElement('section');
      section.className = 'category-section';
      section.id = `section-${category.id}`;

      section.innerHTML = `
        <h2 class="category-section-title">${category.name}</h2>
        <div class="products-grid"></div>
      `;

      const grid = section.querySelector('.products-grid');
      categoryProducts.forEach(product => {
        grid.appendChild(createProductCard(product));
      });

      dom.productsCatalog.appendChild(section);
    });
  }

  function createProductCard(product) {
    const card = document.createElement('article');
    const isCleanBg = product.category === 'destaques' || product.category === 'porcoes' || product.category === 'espetos' || product.category === 'barcas' || product.category === 'combos' || product.category === 'complementos' || product.category === 'drinks' || product.category === 'refri_sucos' || product.category === 'cerveja' || product.category === 'sorvetes' || (product.image && !product.image.includes('barca_churrasco') && !product.image.includes('hero_picanha'));
    card.className = `product-card ${product.discount ? 'has-discount' : ''} ${isCleanBg ? 'featured-clean-card' : ''}`;
    card.id = `card-${product.id}`;

    // Quantidade atual deste produto no carrinho (soma todas as variações dele)
    const cartCount = getCartProductCount(product.id);

    // Badges no topo da imagem
    let badgeHtml = '';
    if (product.discount) {
      badgeHtml = `<span class="product-badge-pill discount-pill">${product.discount}</span>`;
    } else if (product.badge) {
      badgeHtml = `<span class="product-badge-pill">${product.badge}</span>`;
    }
    const servesHtml = product.serves ? `<span class="product-serves-pill">👥 ${product.serves}</span>` : '';

    // Bloco de Preço com Desconto Oficial e Preço Original Riscado (estilo print)
    let priceHtml = '';
    if (product.originalPrice && product.discount) {
      priceHtml = `
        <div class="product-price-box has-discount-box">
          <span class="discount-tag">${product.discount}</span>
          <div class="price-main-line">
            <span class="price-currency">R$</span>
            <span class="price-value">${product.price.toFixed(2).replace('.', ',')}</span>
          </div>
          <span class="original-price-val">R$ ${product.originalPrice.toFixed(2).replace('.', ',')}</span>
        </div>
      `;
    } else {
      priceHtml = `
        <div class="product-price-box">
          <div class="price-main-line">
            <span class="price-currency">R$</span>
            <span class="price-value">${product.price.toFixed(2).replace('.', ',')}</span>
          </div>
        </div>
      `;
    }

    card.innerHTML = `
      <div class="product-card-hero ${isCleanBg ? 'white-bg' : ''}">
        <img src="${product.image}" alt="${product.name}" class="${isCleanBg ? 'fit-contain' : ''}" loading="lazy" onerror="this.src='assets/images/hero_picanha.jpg'">
        ${badgeHtml}
        ${servesHtml}
      </div>
      <div class="product-card-body">
        <h3 class="product-title">${product.name}</h3>
        <p class="product-description">${product.description}</p>
        <div class="product-card-footer">
          ${priceHtml}
          <div class="card-action-container" id="action-container-${product.id}">
            ${renderCardAction(product, cartCount)}
          </div>
        </div>
      </div>
    `;

    // Eventos de clique
    attachCardEvents(card, product);

    return card;
  }

  function renderCardAction(product, count) {
    if (count > 0) {
      return `
        <div class="card-stepper">
          <button class="stepper-btn btn-stepper-minus" data-id="${product.id}" aria-label="Diminuir">-</button>
          <span class="stepper-count">${count}</span>
          <button class="stepper-btn btn-stepper-plus" data-id="${product.id}" aria-label="Aumentar">+</button>
        </div>
      `;
    } else {
      return `
        <button class="btn-quick-add" data-id="${product.id}">
          <span>+</span>
          <span>Adicionar</span>
        </button>
      `;
    }
  }

  function attachCardEvents(card, product) {
    // Clique na imagem ou título para abrir modal de detalhes/opções
    const hero = card.querySelector('.product-card-hero');
    const title = card.querySelector('.product-title');

    const openDetails = () => {
      openProductDetailsModal(product);
    };

    hero.addEventListener('click', openDetails);
    title.addEventListener('click', openDetails);

    // Botões de ação rápida
    const actionContainer = card.querySelector(`#action-container-${product.id}`);
    
    actionContainer.addEventListener('click', (e) => {
      e.stopPropagation();
      const addBtn = e.target.closest('.btn-quick-add');
      const plusBtn = e.target.closest('.btn-stepper-plus');
      const minusBtn = e.target.closest('.btn-stepper-minus');

      const hasCustomization = (product.customizationGroups && product.customizationGroups.length > 0) || (product.options && product.options.length > 0);

      if (addBtn) {
        if (hasCustomization) {
          openProductDetailsModal(product);
        } else {
          addToCart(product, 1);
        }
      } else if (plusBtn) {
        if (hasCustomization) {
          openProductDetailsModal(product);
        } else {
          addToCart(product, 1);
        }
      } else if (minusBtn) {
        removeFromCart(product.id);
      }
    });
  }

  function updateSingleCardButton(productId) {
    const isCostelinha = productId.includes('costelinha');
    const isBarcaP = productId.includes('barca-p-espetos-mistos');
    let idsToUpdate = [productId];
    if (isCostelinha) {
      idsToUpdate = ['porcao-costelinha-porco', 'porcao-costelinha-porco-porcao'];
    } else if (isBarcaP) {
      idsToUpdate = ['barca-p-espetos-mistos', 'barca-p-espetos-mistos-monte'];
    }

    idsToUpdate.forEach(id => {
      const container = document.getElementById(`action-container-${id}`);
      if (container) {
        const product = MENU_DATA.products.find(p => p.id === id);
        if (product) {
          const count = getCartProductCount(id);
          container.innerHTML = renderCardAction(product, count);
        }
      }
    });
  }

  // ==========================================
  // GERENCIAMENTO DO CARRINHO / RASCUNHO
  // ==========================================
  function addToCart(product, quantity = 1, option = null, note = '', finalPrice = null) {
    triggerHaptic();

    const unitPrice = finalPrice !== null ? finalPrice : product.price;

    // Procura se já existe exatamente com a mesma opção e preço
    const existingIndex = state.cart.findIndex(item => 
      item.productId === product.id && item.option === option && Math.abs(item.price - unitPrice) < 0.01
    );

    if (existingIndex > -1) {
      state.cart[existingIndex].quantity += quantity;
      if (note) state.cart[existingIndex].note = note;
    } else {
      state.cart.push({
        id: 'cart_' + Date.now() + '_' + Math.random().toString(36).substr(2, 4),
        productId: product.id,
        name: product.name,
        price: unitPrice,
        image: product.image,
        quantity: quantity,
        option: option,
        note: note
      });
    }

    saveCartToStorage();
    updateCartUI();
    updateSingleCardButton(product.id);
    showToast(`"${product.name}" adicionado ao rascunho!`, '🔥');
  }

  function removeFromCart(productId, specificOption = null) {
    triggerHaptic();

    const index = state.cart.findLastIndex(item => 
      item.productId === productId && (specificOption === null || item.option === specificOption)
    );

    if (index > -1) {
      if (state.cart[index].quantity > 1) {
        state.cart[index].quantity -= 1;
      } else {
        state.cart.splice(index, 1);
      }
    }

    saveCartToStorage();
    updateCartUI();
    updateSingleCardButton(productId);
  }

  function deleteCartItemByIndex(index) {
    triggerHaptic();
    const removed = state.cart.splice(index, 1)[0];
    saveCartToStorage();
    updateCartUI();
    if (removed) {
      updateSingleCardButton(removed.productId);
    }
  }

  function updateItemQuantity(index, delta) {
    triggerHaptic();
    if (state.cart[index]) {
      state.cart[index].quantity += delta;
      if (state.cart[index].quantity <= 0) {
        const removed = state.cart.splice(index, 1)[0];
        updateSingleCardButton(removed.productId);
      } else {
        updateSingleCardButton(state.cart[index].productId);
      }
      saveCartToStorage();
      updateCartUI();
    }
  }

  function getCartProductCount(productId) {
    if (productId.includes('costelinha')) {
      return state.cart
        .filter(item => item.productId.includes('costelinha'))
        .reduce((sum, item) => sum + item.quantity, 0);
    }
    return state.cart
      .filter(item => item.productId === productId)
      .reduce((sum, item) => sum + item.quantity, 0);
  }

  function getCartTotalCount() {
    return state.cart.reduce((sum, item) => sum + item.quantity, 0);
  }

  function getCartSubtotal() {
    return state.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  }

  // ==========================================
  // ATUALIZAÇÃO VISUAL DO RASCUNHO & GAVETA
  // ==========================================
  function updateCartUI() {
    const totalCount = getCartTotalCount();
    const subtotal = getCartSubtotal();
    const formattedSubtotal = formatCurrency(subtotal);

    // Barra Flutuante
    if (totalCount > 0) {
      dom.floatingDraftBar.style.display = 'block';
      dom.draftItemCount.textContent = totalCount;
      dom.draftTotalPreview.textContent = formattedSubtotal;
    } else {
      dom.floatingDraftBar.style.display = 'none';
      if (dom.draftDrawer.classList.contains('open')) {
        closeDrawer();
      }
    }

    // Drawer Totals
    dom.summaryItemsQty.textContent = `${totalCount} ${totalCount === 1 ? 'item' : 'itens'}`;
    dom.summaryTotalAmount.textContent = formattedSubtotal;

    // Renderizar itens dentro da gaveta
    renderDrawerItems();
  }

  function renderDrawerItems() {
    dom.draftItemsList.innerHTML = '';

    if (state.cart.length === 0) {
      dom.draftItemsList.innerHTML = `
        <div style="text-align: center; padding: 30px 10px; color: var(--text-secondary);">
          <span style="font-size: 32px; display: block; margin-bottom: 8px;">🛒</span>
          <strong style="color: #FFF;">Seu rascunho de mesa está vazio.</strong>
          <p style="font-size: 13px; margin-top: 4px;">Escolha petiscos, espetos e bebidas no cardápio!</p>
        </div>
      `;
      return;
    }

    state.cart.forEach((item, index) => {
      const row = document.createElement('div');
      row.className = 'draft-item-row';

      const optionTag = item.option ? `<div class="draft-item-option">Opção: ${item.option}</div>` : '';
      const noteTag = item.note ? `<div style="font-size: 11px; color: var(--text-muted); font-style: italic;">"${item.note}"</div>` : '';
      const itemSubtotal = formatCurrency(item.price * item.quantity);

      row.innerHTML = `
        <div class="draft-item-info">
          <h4 class="draft-item-title">${item.name}</h4>
          ${optionTag}
          ${noteTag}
          <div class="draft-item-price">${itemSubtotal} <span style="font-size: 11px; opacity: 0.7;">(${item.quantity}x ${formatCurrency(item.price)})</span></div>
        </div>
        <div class="draft-item-controls">
          <div class="card-stepper" style="background: var(--bg-surface);">
            <button class="stepper-btn btn-drawer-minus" data-index="${index}">-</button>
            <span class="stepper-count">${item.quantity}</span>
            <button class="stepper-btn btn-drawer-plus" data-index="${index}">+</button>
          </div>
          <button class="btn-drawer-delete" data-index="${index}" style="background: none; border: none; color: var(--text-muted); padding: 4px; font-size: 16px; cursor: pointer;" aria-label="Remover">🗑️</button>
        </div>
      `;

      row.querySelector('.btn-drawer-minus').addEventListener('click', () => updateItemQuantity(index, -1));
      row.querySelector('.btn-drawer-plus').addEventListener('click', () => updateItemQuantity(index, 1));
      row.querySelector('.btn-drawer-delete').addEventListener('click', () => deleteCartItemByIndex(index));

      dom.draftItemsList.appendChild(row);
    });
  }

  // ==========================================
  // MODAL: DETALHES E OPÇÕES DO PRODUTO
  // ==========================================
  function openProductDetailsModal(product) {
    const isCleanBg = product.category === 'destaques' || product.category === 'porcoes' || product.category === 'espetos' || product.category === 'barcas' || product.category === 'combos' || product.category === 'complementos' || product.category === 'drinks' || product.category === 'refri_sucos' || product.category === 'cerveja' || product.category === 'sorvetes' || (product.image && !product.image.includes('barca_churrasco') && !product.image.includes('hero_picanha'));
    const hasCustomGroups = product.customizationGroups && product.customizationGroups.length > 0;

    if (hasCustomGroups) {
      // Estado de seleção inicial para a personalização
      const selectedState = {};
      product.customizationGroups.forEach(group => {
        if (group.type === 'stepper') {
          selectedState[group.id] = {};
          group.items.forEach(it => {
            const itName = typeof it === 'object' ? it.name : it;
            selectedState[group.id][itName] = 0;
          });
        } else if (group.type === 'radio_list') {
          const firstItem = group.items[0];
          const firstName = typeof firstItem === 'object' ? firstItem.name : firstItem;
          selectedState[group.id] = group.required && firstName ? [firstName] : [];
        } else {
          selectedState[group.id] = [];
        }
      });

      const isSingleBarca = product.id.startsWith('barca-') && !['barca-p', 'barca-m', 'barca-g', 'barca-titanic'].includes(product.id);
      if (!isSingleBarca && (product.id.includes('barca-') || product.id.includes('combo-') || product.id.includes('trio-'))) {
        if (selectedState.adicionais) {
          selectedState.adicionais = ["Vinagrete", "Arroz"];
        }
        if (selectedState.complementos) {
          selectedState.complementos = ["Molho branco", "Farofa"];
        }
      }

      function calculateCurrentPrice() {
        let basePrice = product.price;
        const replaceGroup = product.customizationGroups.find(g => g.mode === 'replace_price');
        if (replaceGroup) {
          const selected = selectedState[replaceGroup.id] || [];
          if (selected.length > 0) {
            const found = replaceGroup.items.find(it => (typeof it === 'object' ? it.name : it) === selected[0]);
            if (found && typeof found === 'object' && found.price !== undefined) {
              basePrice = found.price;
            }
          }
        }

        let total = basePrice;
        product.customizationGroups.forEach(group => {
          if (group.mode === 'replace_price') return;
          if (group.type === 'stepper') {
            const counts = selectedState[group.id] || {};
            Object.entries(counts).forEach(([selName, qty]) => {
              if (qty > 0) {
                const found = group.items.find(it => (typeof it === 'object' ? it.name : it) === selName);
                if (found && typeof found === 'object' && found.price) {
                  total += (found.price * qty);
                }
              }
            });
          } else {
            const selected = selectedState[group.id] || [];
            selected.forEach(selName => {
              const found = group.items.find(it => (typeof it === 'object' ? it.name : it) === selName);
              if (found && typeof found === 'object' && found.price) {
                total += found.price;
              }
            });
          }
        });
        return total;
      }

      function updateModalPriceDisplay() {
        const curPrice = calculateCurrentPrice();
        const priceEl = dom.itemModalContent.querySelector('.item-modal-price');
        if (priceEl) {
          priceEl.textContent = formatCurrency(curPrice);
        }
        const topPriceEl = dom.itemModalContent.querySelector('.custom-price-current');
        if (topPriceEl) {
          topPriceEl.textContent = `R$ ${curPrice.toFixed(2).replace('.', ',')}`;
        }
      }

      const groupsHtml = product.customizationGroups.map(group => {
        const badgeHtml = group.badge ? `<span class="custom-group-badge">${group.badge}</span>` : '';
        const isStepper = group.type === 'stepper';
        const isRadioList = group.type === 'radio_list';

        if (isRadioList) {
          const curSelections = selectedState[group.id] || [];
          return `
            <div class="custom-group-block" id="group-block-${group.id}">
              <div class="custom-group-header">
                <div class="group-header-text">
                  <h4 class="custom-group-title">${group.title}</h4>
                  <span class="custom-group-subtitle">${group.subtitle}</span>
                </div>
                <div class="group-header-badges">
                  ${badgeHtml}
                  <span class="custom-group-chevron">▾</span>
                </div>
              </div>
              <div class="custom-radio-list" data-group-id="${group.id}">
                ${group.items.map(item => {
                  const itemName = typeof item === 'object' ? item.name : item;
                  const itemPrice = typeof item === 'object' ? item.price : null;
                  const isSelected = curSelections.includes(itemName);
                  return `
                    <div class="custom-radio-row ${isSelected ? 'selected' : ''}" data-group="${group.id}" data-value="${itemName}">
                      <div class="radio-row-info">
                        <span class="radio-row-name">${itemName}</span>
                        ${itemPrice ? `<span class="radio-row-price">R$ ${itemPrice.toFixed(2).replace('.', ',')}</span>` : ''}
                      </div>
                      <div class="custom-radio-circle ${isSelected ? 'checked' : ''}">
                        <div class="custom-radio-inner"></div>
                      </div>
                    </div>
                  `;
                }).join('')}
              </div>
            </div>
          `;
        }

        if (isStepper) {
          const curSelections = selectedState[group.id] || {};
          return `
            <div class="custom-group-block" id="group-block-${group.id}">
              <div class="custom-group-header">
                <div class="group-header-text">
                  <h4 class="custom-group-title">${group.title}</h4>
                  <span class="custom-group-subtitle">${group.subtitle}</span>
                </div>
                <div class="group-header-badges">
                  ${badgeHtml}
                  <span class="custom-group-chevron">▾</span>
                </div>
              </div>
              <div class="custom-stepper-list" data-group-id="${group.id}">
                ${group.items.map(item => {
                  const itemName = typeof item === 'object' ? item.name : item;
                  const itemPrice = typeof item === 'object' ? (item.price || 0) : 0;
                  const qty = curSelections[itemName] || 0;
                  return `
                    <div class="custom-stepper-row" data-group="${group.id}" data-item="${itemName}">
                      <div class="stepper-row-name-wrap">
                        <span class="stepper-row-name">${itemName}</span>
                        ${itemPrice > 0 ? `<span class="stepper-row-price">+ R$ ${itemPrice.toFixed(2).replace('.', ',')}</span>` : ''}
                      </div>
                      <div class="stepper-control-wrap" data-group="${group.id}" data-item="${itemName}">
                        ${qty > 0 ? `
                          <div class="stepper-inline-controls">
                            <button type="button" class="stepper-inline-btn btn-stepper-dec" data-group="${group.id}" data-item="${itemName}" aria-label="Diminuir">-</button>
                            <span class="stepper-inline-qty">${qty}</span>
                            <button type="button" class="stepper-inline-btn btn-stepper-inc" data-group="${group.id}" data-item="${itemName}" aria-label="Aumentar">+</button>
                          </div>
                        ` : `
                          <button type="button" class="stepper-add-single-btn" data-group="${group.id}" data-item="${itemName}" aria-label="Adicionar">+</button>
                        `}
                      </div>
                    </div>
                  `;
                }).join('')}
              </div>
            </div>
          `;
        }

        const curSelections = selectedState[group.id] || [];
        return `
          <div class="custom-group-block" id="group-block-${group.id}">
            <div class="custom-group-header">
              <div class="group-header-text">
                <h4 class="custom-group-title">${group.title}</h4>
                <span class="custom-group-subtitle">${group.subtitle}</span>
              </div>
              <div class="group-header-badges">
                ${badgeHtml}
                <span class="custom-group-chevron">▾</span>
              </div>
            </div>
            <div class="custom-options-grid" data-group-id="${group.id}">
              ${group.items.map(item => {
                const itemName = typeof item === 'object' ? item.name : item;
                const itemPrice = typeof item === 'object' ? (item.price || 0) : 0;
                const isChecked = curSelections.includes(itemName);
                return `
                  <button type="button" class="custom-check-btn ${isChecked ? 'active' : ''}" data-group="${group.id}" data-value="${itemName}">
                    <span class="custom-checkbox-square ${isChecked ? 'checked' : ''}">
                      ${isChecked ? '✓' : ''}
                    </span>
                    <div class="custom-check-text-wrap">
                      <span class="custom-check-text">${itemName}</span>
                      ${itemPrice > 0 ? `<span class="custom-check-extra-price">+ R$ ${itemPrice.toFixed(2).replace('.', ',')}</span>` : ''}
                    </div>
                  </button>
                `;
              }).join('')}
            </div>
          </div>
        `;
      }).join('');

      dom.itemModalContent.innerHTML = `
        <div class="custom-modal-layout">
          <div class="custom-modal-top-bar" style="justify-content: center; position: relative;">
            <div class="custom-modal-title-group" style="text-align: center; width: 100%;">
              <h3 class="custom-modal-top-title" style="text-align: center;">${product.name}</h3>
            </div>
            <button class="item-modal-close" id="btn-close-item-modal" aria-label="Fechar" style="position: absolute; right: 14px; top: 50%; transform: translateY(-50%);">✕</button>
          </div>

          <div class="custom-modal-hero-strip">
            <div class="custom-modal-img-wrap ${isCleanBg ? 'white-bg' : ''}">
              <img src="${product.image}" alt="${product.name}" class="${isCleanBg ? 'fit-contain' : 'fit-cover'}" onerror="this.src='assets/images/barca_churrasco.jpg'">
            </div>
            <div class="custom-modal-info-col">
              ${product.topDescription ? `
                <div class="custom-modal-top-desc" style="margin-bottom: 8px;">
                  <span style="font-size: 11.5px; color: #7A7A8E; font-weight: 500; line-height: 1.35; display: block;">${product.topDescription.replace(/\n/g, '<br>')}</span>
                </div>
              ` : (product.sizeDescription ? `
                <div class="custom-modal-size-box" style="margin-bottom: 8px;">
                  <span style="display: block; font-size: 11.5px; color: #8E8EA0; font-weight: 600;">Tamanho:</span>
                  <span style="font-size: 12.5px; color: #6C6C7E; font-weight: 500; line-height: 1.35;">${product.sizeDescription.replace(/^Tamanho:\s*/i, '').replace(/\n/g, '<br>')}</span>
                </div>
              ` : (product.description ? `
                <div class="custom-modal-top-desc" style="margin-bottom: 8px;">
                  <span style="font-size: 12px; color: #7A7A8E; font-weight: 500; line-height: 1.35; display: block;">${product.description}</span>
                </div>
              ` : ''))}
              <div class="custom-price-strip">
                <span class="custom-price-current">R$ ${product.price.toFixed(2).replace('.', ',')}</span>
                ${product.originalPrice ? `<span class="custom-price-old">R$ ${product.originalPrice.toFixed(2).replace('.', ',')}</span>` : ''}
                ${product.discount ? `<span class="discount-tag">${product.discount}</span>` : ''}
              </div>
            </div>
          </div>

          <div class="custom-modal-body">
            ${groupsHtml}

            <div class="item-custom-obs" style="margin-top: 18px;">
              <label style="font-size: 13.5px; font-weight: 800; color: #111118; display: block; margin-bottom: 6px;">
                Comentários
              </label>
              <textarea id="modal-item-note" placeholder="(Opcional)" rows="2" style="background: #F8F8FA; border: 1px solid #DCDCDE; color: #111; width: 100%; border-radius: 6px; padding: 10px 12px; font-family: var(--font-body); font-size: 13px; resize: vertical; box-sizing: border-box; outline: none;"></textarea>
            </div>
          </div>

          <div class="item-modal-footer" style="background: #FFFFFF; border-top: 1px solid #EFEFF5;">
            <div class="item-modal-price-box">
              <div class="item-modal-price" style="color: #111118;">${formatCurrency(product.price)}</div>
              ${product.originalPrice && product.discount ? `
                <div class="modal-discount-info">
                  <span class="discount-tag">${product.discount}</span>
                  <span class="original-price-val">De ${formatCurrency(product.originalPrice)}</span>
                </div>
              ` : ''}
            </div>
            <button class="btn-confirm-add" id="btn-confirm-modal-add">Adicionar ao Rascunho</button>
          </div>
        </div>
      `;

      // Event listeners para os botões de opção checkbox
      dom.itemModalContent.querySelectorAll('.custom-check-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const groupId = btn.dataset.group;
          const value = btn.dataset.value;
          const groupDef = product.customizationGroups.find(g => g.id === groupId);
          if (!groupDef) return;

          let currentSelections = selectedState[groupId] ? [...selectedState[groupId]] : [];

          if (groupDef.exclusiveOption && value === groupDef.exclusiveOption) {
            if (currentSelections.includes(value)) {
              currentSelections = [];
            } else {
              currentSelections = [value];
            }
          } else {
            if (groupDef.exclusiveOption && currentSelections.includes(groupDef.exclusiveOption)) {
              currentSelections = [];
            }

            if (currentSelections.includes(value)) {
              currentSelections = currentSelections.filter(v => v !== value);
            } else {
              if (currentSelections.length >= groupDef.max) {
                if (groupDef.max === 1) {
                  currentSelections = [value];
                } else {
                  showToast(`Selecione até ${groupDef.max} opções em "${groupDef.title}"!`, '⚠️');
                  return;
                }
              } else {
                currentSelections.push(value);
              }
            }
          }

          selectedState[groupId] = currentSelections;
          updateModalPriceDisplay();

          // Atualiza visuais dos botões do grupo
          const grid = dom.itemModalContent.querySelector(`.custom-options-grid[data-group-id="${groupId}"]`);
          if (grid) {
            grid.querySelectorAll('.custom-check-btn').forEach(b => {
              const val = b.dataset.value;
              const isChecked = currentSelections.includes(val);
              const square = b.querySelector('.custom-checkbox-square');
              if (isChecked) {
                b.classList.add('active');
                if (square) {
                  square.classList.add('checked');
                  square.textContent = '✓';
                }
              } else {
                b.classList.remove('active');
                if (square) {
                  square.classList.remove('checked');
                  square.textContent = '';
                }
              }
            });
          }
        });
      });

      // Event listeners para os itens de lista de rádio (ex: Escolha o tamanho da sua barca)
      dom.itemModalContent.querySelectorAll('.custom-radio-row').forEach(row => {
        row.addEventListener('click', () => {
          const groupId = row.dataset.group;
          const value = row.dataset.value;
          selectedState[groupId] = [value];
          updateModalPriceDisplay();

          const list = dom.itemModalContent.querySelector(`.custom-radio-list[data-group-id="${groupId}"]`);
          if (list) {
            list.querySelectorAll('.custom-radio-row').forEach(r => {
              const isMatch = r.dataset.value === value;
              r.classList.toggle('selected', isMatch);
              const circle = r.querySelector('.custom-radio-circle');
              if (circle) circle.classList.toggle('checked', isMatch);
            });
          }
        });
      });

      // Função e delegação de clique para steppers de quantidade
      function updateStepperRowUI(groupId, itemName) {
        const wrap = dom.itemModalContent.querySelector(`.stepper-control-wrap[data-group="${groupId}"][data-item="${itemName}"]`);
        if (!wrap) return;
        const qty = (selectedState[groupId] && selectedState[groupId][itemName]) || 0;
        if (qty > 0) {
          wrap.innerHTML = `
            <div class="stepper-inline-controls">
              <button type="button" class="stepper-inline-btn btn-stepper-dec" data-group="${groupId}" data-item="${itemName}" aria-label="Diminuir">-</button>
              <span class="stepper-inline-qty">${qty}</span>
              <button type="button" class="stepper-inline-btn btn-stepper-inc" data-group="${groupId}" data-item="${itemName}" aria-label="Aumentar">+</button>
            </div>
          `;
        } else {
          wrap.innerHTML = `
            <button type="button" class="stepper-add-single-btn" data-group="${groupId}" data-item="${itemName}" aria-label="Adicionar">+</button>
          `;
        }
      }

      dom.itemModalContent.addEventListener('click', (e) => {
        const addBtn = e.target.closest('.stepper-add-single-btn');
        const incBtn = e.target.closest('.btn-stepper-inc');
        const decBtn = e.target.closest('.btn-stepper-dec');

        if (addBtn || incBtn) {
          const btn = addBtn || incBtn;
          const groupId = btn.dataset.group;
          const itemName = btn.dataset.item;
          const groupDef = product.customizationGroups.find(g => g.id === groupId);
          if (!groupDef) return;

          const currentTotal = Object.values(selectedState[groupId] || {}).reduce((a, b) => a + b, 0);
          if (currentTotal >= groupDef.max) {
            showToast(`Selecione até ${groupDef.max} opções em "${groupDef.title}"!`, '⚠️');
            return;
          }

          selectedState[groupId][itemName] = (selectedState[groupId][itemName] || 0) + 1;
          updateStepperRowUI(groupId, itemName);
          updateModalPriceDisplay();
        } else if (decBtn) {
          const groupId = decBtn.dataset.group;
          const itemName = decBtn.dataset.item;
          const cur = (selectedState[groupId] && selectedState[groupId][itemName]) || 0;
          if (cur > 0) {
            selectedState[groupId][itemName] = cur - 1;
            updateStepperRowUI(groupId, itemName);
            updateModalPriceDisplay();
          }
        }
      });

      // Fechar modal
      dom.itemModalContent.querySelector('#btn-close-item-modal').addEventListener('click', closeAllModals);

      // Confirmar adição
      dom.itemModalContent.querySelector('#btn-confirm-modal-add').addEventListener('click', () => {
        // Validação genérica para cada grupo obrigatório
        for (const group of product.customizationGroups) {
          if (group.type === 'stepper') {
            const counts = selectedState[group.id] || {};
            const totalQty = Object.values(counts).reduce((a, b) => a + b, 0);
            if (group.required && totalQty < (group.min || 1)) {
              showToast(`"${group.title}" é obrigatório! Escolha ao menos ${group.min || 1} opções.`, '⚠️');
              const groupEl = dom.itemModalContent.querySelector(`#group-block-${group.id}`);
              if (groupEl) groupEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
              return;
            }
          } else {
            const groupSelections = selectedState[group.id] || [];
            if (group.required && groupSelections.length < (group.min || 1)) {
              showToast(`"${group.title}" é obrigatório! Escolha ao menos ${group.min || 1} opção.`, '⚠️');
              const groupEl = dom.itemModalContent.querySelector(`#group-block-${group.id}`);
              if (groupEl) groupEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
              return;
            }
          }
        }

        const summaryParts = [];
        for (const group of product.customizationGroups) {
          if (group.type === 'stepper') {
            const counts = selectedState[group.id] || {};
            const chosen = [];
            Object.entries(counts).forEach(([selName, qty]) => {
              if (qty > 0) {
                const found = group.items.find(it => (typeof it === 'object' ? it.name : it) === selName);
                if (found && typeof found === 'object' && found.price) {
                  chosen.push(`${qty}x ${selName} (+R$ ${(found.price * qty).toFixed(2).replace('.', ',')})`);
                } else {
                  chosen.push(`${qty}x ${selName}`);
                }
              }
            });
            if (chosen.length > 0) {
              summaryParts.push(`${group.title}: ${chosen.join(', ')}`);
            }
          } else if (group.type === 'radio_list') {
            const groupSelections = selectedState[group.id] || [];
            if (groupSelections.length > 0) {
              summaryParts.push(`${group.title}: ${groupSelections[0]}`);
            }
          } else {
            const groupSelections = selectedState[group.id] || [];
            if (groupSelections.length > 0) {
              const formattedItems = groupSelections.map(selName => {
                const found = group.items.find(it => (typeof it === 'object' ? it.name : it) === selName);
                if (found && typeof found === 'object' && found.price) {
                  return `${selName} (+R$ ${found.price.toFixed(2).replace('.', ',')})`;
                }
                return selName;
              });
              summaryParts.push(`${group.title}: ${formattedItems.join(', ')}`);
            }
          }
        }
        const fullOptionsSummary = summaryParts.join(' | ');
        const note = dom.itemModalContent.querySelector('#modal-item-note').value.trim();
        const unitPrice = calculateCurrentPrice();

        addToCart(product, 1, fullOptionsSummary, note, unitPrice);
        closeAllModals();
      });

      updateModalPriceDisplay();
      openModal(dom.itemModalBackdrop, dom.itemModal);
      return;
    }

    let selectedOption = product.options && product.options.length > 0 ? product.options[0] : null;

    let optionsHtml = '';
    if (product.options && product.options.length > 0) {
      optionsHtml = `
        <div class="options-group-title">Escolha sua preferência:</div>
        <div class="options-pills">
          ${product.options.map((opt, idx) => `
            <label class="option-radio-label ${idx === 0 ? 'selected' : ''}">
              <span>${opt}</span>
              <input type="radio" name="product-option" value="${opt}" ${idx === 0 ? 'checked' : ''} style="accent-color: var(--ember-primary);">
            </label>
          `).join('')}
        </div>
      `;
    }

    if (isCleanBg || product.discount) {
      dom.itemModalContent.innerHTML = `
        <div class="custom-modal-layout simple-modal-print-layout">
          <div class="custom-modal-top-bar" style="justify-content: center; position: relative;">
            <h3 class="custom-modal-top-title" style="text-align: center; width: 100%; font-size: 19px; font-weight: 900; letter-spacing: -0.2px;">${product.name}</h3>
            <button class="item-modal-close" id="btn-close-item-modal" aria-label="Fechar" style="position: absolute; right: 14px; top: 50%; transform: translateY(-50%);">✕</button>
          </div>

          <div class="simple-modal-print-body">
            <div class="simple-modal-img-col">
              <img src="${product.image}" alt="${product.name}" onerror="this.src='assets/images/hero_picanha.jpg'">
            </div>
            <div class="simple-modal-info-col">
              ${product.description ? `<p class="simple-modal-desc">${product.description}</p>` : ''}

              <div class="simple-modal-price-row">
                <span class="custom-price-current">R$ ${product.price.toFixed(2).replace('.', ',')}</span>
                ${product.originalPrice ? `<span class="custom-price-old">R$ ${product.originalPrice.toFixed(2).replace('.', ',')}</span>` : ''}
                ${product.discount ? `<span class="discount-tag">${product.discount}</span>` : ''}
              </div>

              ${optionsHtml ? `<div style="margin-bottom: 14px;">${optionsHtml}</div>` : ''}

              <div class="simple-modal-divider"></div>

              <div class="item-custom-obs" style="margin-top: 0;">
                <label class="simple-modal-comment-label">
                  Comentários
                </label>
                <textarea id="modal-item-note" placeholder="(Opcional)" rows="2" class="simple-modal-textarea"></textarea>
              </div>
            </div>
          </div>

          <div class="item-modal-footer" style="background: #FFFFFF; border-top: 1px solid #EFEFF5;">
            <div class="item-modal-price-box">
              <div class="item-modal-price" style="color: #111118;">${formatCurrency(product.price)}</div>
              ${product.originalPrice && product.discount ? `
                <div class="modal-discount-info">
                  <span class="discount-tag">${product.discount}</span>
                  <span class="original-price-val">De ${formatCurrency(product.originalPrice)}</span>
                </div>
              ` : ''}
            </div>
            <button class="btn-confirm-add" id="btn-confirm-modal-add">Adicionar ao Rascunho</button>
          </div>
        </div>
      `;
    } else {
      dom.itemModalContent.innerHTML = `
        <div class="item-modal-hero ${isCleanBg ? 'white-bg' : ''}">
          <img src="${product.image}" alt="${product.name}" class="${isCleanBg ? 'fit-contain' : ''}" onerror="this.src='assets/images/hero_picanha.jpg'">
          <button class="item-modal-close" id="btn-close-item-modal">✕</button>
        </div>
        <div class="item-modal-body">
          <h3 class="item-modal-title">${product.name}</h3>
          <p class="item-modal-desc">${product.description}</p>
          ${optionsHtml}
          <div class="item-custom-obs">
            <label style="font-size: 13.5px; font-weight: 700; color: #111118; display: block; margin-bottom: 6px;">
              Comentários
            </label>
            <textarea id="modal-item-note" placeholder="(Opcional)" rows="2" class="simple-modal-textarea"></textarea>
          </div>
        </div>
        <div class="item-modal-footer">
          <div class="item-modal-price-box">
            <div class="item-modal-price">${formatCurrency(product.price)}</div>
            ${product.originalPrice && product.discount ? `
              <div class="modal-discount-info">
                <span class="discount-tag">${product.discount}</span>
                <span class="original-price-val">De ${formatCurrency(product.originalPrice)}</span>
              </div>
            ` : ''}
          </div>
          <button class="btn-confirm-add" id="btn-confirm-modal-add">Adicionar ao Rascunho</button>
        </div>
      `;
    }

    // Interações dos radios
    const labels = dom.itemModalContent.querySelectorAll('.option-radio-label');
    labels.forEach(label => {
      label.addEventListener('click', () => {
        labels.forEach(l => l.classList.remove('selected'));
        label.classList.add('selected');
        const input = label.querySelector('input');
        if (input) {
          input.checked = true;
          selectedOption = input.value;
        }
      });
    });

    // Fechar modal
    dom.itemModalContent.querySelector('#btn-close-item-modal').addEventListener('click', closeAllModals);

    // Confirmar adição
    dom.itemModalContent.querySelector('#btn-confirm-modal-add').addEventListener('click', () => {
      const note = dom.itemModalContent.querySelector('#modal-item-note').value.trim();
      addToCart(product, 1, selectedOption, note);
      closeAllModals();
    });

    openModal(dom.itemModalBackdrop, dom.itemModal);
  }

  // ==========================================
  // MODO ATENDENTE (COMANDA DE APOIO)
  // ==========================================
  function openWaiterModal() {
    if (state.cart.length === 0) {
      showToast('Adicione itens ao rascunho primeiro!', '⚠️');
      return;
    }

    closeDrawer();

    const now = new Date();
    const timeStr = now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
    dom.ticketTime.textContent = `Registrado às ${timeStr}`;

    dom.ticketItemsList.innerHTML = '';

    state.cart.forEach(item => {
      const itemRow = document.createElement('div');
      itemRow.className = 'ticket-item-row';

      const optText = item.option ? ` • ${item.option}` : '';
      const noteText = item.note ? ` • Obs: "${item.note}"` : '';

      itemRow.innerHTML = `
        <span class="ticket-item-qty">${item.quantity}x</span>
        <div class="ticket-item-details">
          <div class="ticket-item-name">${item.name}</div>
          ${optText || noteText ? `<div class="ticket-item-obs">${optText}${noteText}</div>` : ''}
        </div>
      `;

      dom.ticketItemsList.appendChild(itemRow);
    });

    const generalNote = dom.orderNotes ? dom.orderNotes.value.trim() : '';
    if (generalNote) {
      dom.ticketNotesDisplay.style.display = 'block';
      dom.ticketNotesText.textContent = generalNote;
    } else {
      dom.ticketNotesDisplay.style.display = 'none';
    }

    dom.ticketTotalValue.textContent = formatCurrency(getCartSubtotal());

    openModal(dom.waiterModalBackdrop, dom.waiterModal);
  }

  // ==========================================
  // FAROL DE MESA (BEACON SCREEN)
  // ==========================================
  function openBeaconMode() {
    dom.beaconFullscreen.style.display = 'flex';
  }

  function closeBeaconMode() {
    dom.beaconFullscreen.style.display = 'none';
  }

  // ==========================================
  // COPIAR RESUMO DO PEDIDO
  // ==========================================
  function copyTicketSummary() {
    const formatted = state.table.toLowerCase().includes('balc') ? state.table : `Mesa ${state.table}`;
    let text = `🔥 *CHURRASQUIM DO MARCELIM - O Point de Santo Antônio*\n`;
    text += `📍 *${formatted.toUpperCase()}*\n`;
    text += `🕒 ${new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}\n\n`;
    text += `*ITENS DO RASCUNHO:*\n`;

    state.cart.forEach(item => {
      text += `▪ ${item.quantity}x ${item.name}`;
      if (item.option) text += ` (${item.option})`;
      if (item.note) text += ` - Obs: "${item.note}"`;
      text += `\n`;
    });

    const generalNote = dom.orderNotes ? dom.orderNotes.value.trim() : '';
    if (generalNote) {
      text += `\n📝 *Observação da Mesa:* ${generalNote}\n`;
    }

    text += `\n💰 *Total Estimado:* ${formatCurrency(getCartSubtotal())}\n`;
    text += `*(Conferido na comanda de papel do atendente)*`;

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(() => {
        showToast('Resumo copiado com sucesso!', '📋');
      }).catch(() => {
        fallbackCopyText(text);
      });
    } else {
      fallbackCopyText(text);
    }
  }

  function fallbackCopyText(text) {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.position = "fixed";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      document.execCommand('copy');
      showToast('Resumo copiado!', '📋');
    } catch (err) {
      showToast('Não foi possível copiar automaticamente.', '⚠️');
    }
    document.body.removeChild(textArea);
  }

  // ==========================================
  // GERENCIAMENTO DE MODAIS E GAVETA
  // ==========================================
  function openDrawer() {
    triggerHaptic();
    dom.drawerBackdrop.classList.add('open');
    dom.draftDrawer.classList.add('open');
    dom.draftDrawer.setAttribute('aria-hidden', 'false');
  }

  function closeDrawer() {
    dom.drawerBackdrop.classList.remove('open');
    dom.draftDrawer.classList.remove('open');
    dom.draftDrawer.setAttribute('aria-hidden', 'true');
  }

  function openModal(backdrop, modal) {
    triggerHaptic();
    backdrop.classList.add('open');
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
  }

  function closeAllModals() {
    [dom.waiterModalBackdrop, dom.tableModalBackdrop, dom.infoModalBackdrop, dom.itemModalBackdrop, dom.drawerBackdrop].forEach(b => {
      if (b) b.classList.remove('open');
    });

    [dom.waiterModal, dom.tableModal, dom.infoModal, dom.itemModal, dom.draftDrawer].forEach(m => {
      if (m) {
        m.classList.remove('open');
        m.setAttribute('aria-hidden', 'true');
      }
    });

    closeBeaconMode();
  }

  function showToast(message, icon = '🔥') {
    dom.toastIcon.textContent = icon;
    dom.toastMessage.textContent = message;
    dom.toast.style.display = 'flex';

    if (window.toastTimeout) clearTimeout(window.toastTimeout);
    window.toastTimeout = setTimeout(() => {
      dom.toast.style.display = 'none';
    }, 2800);
  }

  function formatCurrency(value) {
    return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  }

  // ==========================================
  // EVENT LISTENERS GERAIS
  // ==========================================
  function setupEventListeners() {
    // Abrir gaveta pelo botão flutuante
    dom.btnOpenDraftDrawer.addEventListener('click', openDrawer);
    dom.btnCloseDrawer.addEventListener('click', closeDrawer);
    dom.drawerBackdrop.addEventListener('click', closeDrawer);

    // Chamar atendente (abre ticket de leitura)
    dom.btnCallWaiter.addEventListener('click', openWaiterModal);
    dom.btnCloseWaiterModal.addEventListener('click', closeAllModals);
    dom.waiterModalBackdrop.addEventListener('click', closeAllModals);

    // Farol de mesa
    dom.btnBeaconMode.addEventListener('click', openBeaconMode);
    dom.btnExitBeacon.addEventListener('click', closeBeaconMode);

    // Copiar comanda
    dom.btnCopyTicket.addEventListener('click', copyTicketSummary);

    // Limpar rascunho
    dom.btnClearDraft.addEventListener('click', () => {
      if (confirm('Deseja realmente limpar todos os itens do rascunho?')) {
        state.cart = [];
        saveCartToStorage();
        updateCartUI();
        renderProducts(); // re-renderiza botões dos cards
        closeDrawer();
        showToast('Rascunho de mesa limpo!', '🧹');
      }
    });

    // Salvar observações gerais
    if (dom.orderNotes) {
      dom.orderNotes.addEventListener('input', (e) => {
        state.generalNotes = e.target.value;
        localStorage.setItem('marcelim_order_notes', state.generalNotes);
      });
    }

    // Modal Troca de Mesa
    dom.btnMesaSelector.addEventListener('click', () => {
      openModal(dom.tableModalBackdrop, dom.tableModal);
    });
    dom.btnCloseTableModal.addEventListener('click', closeAllModals);
    dom.tableModalBackdrop.addEventListener('click', closeAllModals);

    dom.btnSaveTable.addEventListener('click', () => {
      const val = dom.customTableInput.value.trim();
      if (val) {
        setTable(val.padStart(2, '0'));
      }
    });

    dom.quickTableButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const val = btn.dataset.mesa;
        if (val) setTable(val);
      });
    });

    // Modal de Informações / Wi-Fi
    dom.btnInfoModal.addEventListener('click', () => {
      openModal(dom.infoModalBackdrop, dom.infoModal);
    });
    dom.btnCloseInfoModal.addEventListener('click', closeAllModals);
    dom.infoModalBackdrop.addEventListener('click', closeAllModals);

    // Busca ao vivo
    dom.searchInput.addEventListener('input', (e) => {
      state.searchQuery = e.target.value;
      dom.btnClearSearch.style.display = state.searchQuery ? 'flex' : 'none';
      renderProducts();
    });

    dom.btnClearSearch.addEventListener('click', () => {
      state.searchQuery = '';
      dom.searchInput.value = '';
      dom.btnClearSearch.style.display = 'none';
      renderProducts();
    });
  }
});
