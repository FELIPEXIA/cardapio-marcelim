/**
 * Base de Dados Estruturada do Cardápio - Churrasquim do Marcelim (O Point de Santo Antônio)
 * Estrutura limpa e escalável para fácil edição e adição de itens reais.
 */

const MENU_DATA = {
  restaurant: {
    name: "Churrasquim do Marcelim",
    tagline: "O Point de Santo Antônio",
    status: "Aberto Agora",
    statusDetail: "Atendimento no salão e calçada",
    address: "Av São Paulo, Santo Antônio, Cariacica",
    hours: "Segunda a Sábado, das 16:00 às 23:00",
    wifi: "Marcelim_Cliente",
    wifiPass: "pointdesantoantonio",
    defaultTable: "04"
  },
  categories: [
    { id: "destaques", name: "Destaques" },
    { id: "porcoes", name: "PORÇÕES" },
    { id: "espetos", name: "ESPETOS" },
    { id: "monte_barca", name: "MONTE SUA BARCA" },
    { id: "combos", name: "COMBOS" },
    { id: "barcas", name: "BARCAS" },
    { id: "complementos", name: "COMPLEMENTOS" },
    { id: "drinks", name: "DRINKS" },
    { id: "refri_sucos", name: "REFRI/SUCOS" },
    { id: "cerveja", name: "CERVEJA" },
    { id: "sorvetes", name: "SORVETES" }
  ],
  products: [
    // DESTAQUES
    {
      id: "aipim-200g",
      name: "AIPIM 200G",
      category: "destaques",
      price: 10.99,
      originalPrice: 12.99,
      discount: "-15%",
      description: "Pequena porção de aipim frito sequinho e crocante.",
      image: "assets/images/aipim_200g.jpg",
      badge: "-15%",
      serves: "Petisco"
    },
    {
      id: "barca-p-espetos-mistos",
      name: "BARCA P - 02 ESPETOS MISTOS",
      category: "destaques",
      price: 25.00,
      originalPrice: 30.00,
      discount: "-17%",
      description: "➕ Adicionais: Vinagrete e Arroz ➕ Complementos: Molho branco e Farofa",
      image: "assets/images/barca_espetos_misto.jpg",
      badge: "-17%",
      serves: "Serve 1 a 2 pessoas",
      customizationGroups: [
        {
          id: "carnes",
          title: "MONTE SUA BARCA - P",
          subtitle: "Selecione até 2 opções",
          min: 1,
          max: 2,
          required: true,
          items: ["Boi", "Misto", "Frango", "Medalhao", "Tulipa", "Linguiça", "Queijo coalho", "Coração"]
        },
        {
          id: "adicionais",
          title: "ADICIONAIS",
          subtitle: "Selecione até 2 opções",
          min: 0,
          max: 2,
          required: false,
          exclusiveOption: "Sem adicionais",
          items: ["Vinagrete", "Arroz", "Sem adicionais"]
        },
        {
          id: "complementos",
          title: "COMPLEMENTOS",
          subtitle: "Selecione mínimo 1 opções",
          badge: "Obrigatórios",
          min: 1,
          max: 2,
          required: true,
          exclusiveOption: "Sem complementos",
          items: ["Molho branco", "Farofa", "Sem complementos"]
        }
      ]
    },
    {
      id: "porcao-costelinha-porco",
      name: "PORÇÃO DE COSTELINHA DE PORCO",
      category: "destaques",
      price: 69.99,
      originalPrice: 72.99,
      discount: "-4%",
      sizeDescription: "Tamanho: 600g costela, 700g batata ou aipim...",
      description: "Tamanho: 600g costela, 700g batata ou aipim... Deliciosa porção de costelinha suína na brasa com batatas fritas ou aipim crocante e molhos especiais.",
      image: "assets/images/costelinha_porco.jpg",
      badge: "-4%",
      serves: "Serve 2 a 3 pessoas",
      customizationGroups: [
        {
          id: "fritas",
          title: "FRITAS",
          subtitle: "Selecione mínimo 1 opção",
          badge: "Obrigatórios",
          min: 1,
          max: 2,
          required: true,
          items: ["AIPIM", "BATATA"]
        }
      ]
    },

    // PORÇÕES
    {
      id: "porcao-costelinha-porco-porcao",
      name: "PORÇÃO DE COSTELINHA DE PORCO",
      category: "porcoes",
      price: 69.99,
      originalPrice: 72.99,
      discount: "-4%",
      sizeDescription: "Tamanho: 600g costela, 700g batata ou aipim...",
      description: "Tamanho: 600g costela, 700g batata ou aipim... Deliciosa porção de costelinha suína na brasa com batatas fritas ou aipim crocante e molhos especiais.",
      image: "assets/images/costelinha_porco.jpg",
      badge: "-4%",
      serves: "Serve 2 a 3 pessoas",
      customizationGroups: [
        {
          id: "fritas",
          title: "FRITAS",
          subtitle: "Selecione mínimo 1 opção",
          badge: "Obrigatórios",
          min: 1,
          max: 2,
          required: true,
          items: ["AIPIM", "BATATA"]
        }
      ]
    },
    {
      id: "porcao-batata-200g",
      name: "BATATA 200G",
      category: "porcoes",
      price: 10.99,
      originalPrice: 12.99,
      discount: "-15%",
      description: "pequena porcao de batata para voce que vai comer aquele churrasco ,mais nao pode deixar de pegar aquela batatinha .",
      image: "assets/images/batata_200g.jpg",
      badge: "-15%",
      serves: "Petisco"
    },
    {
      id: "porcao-aipim-200g",
      name: "AIPIM 200G",
      category: "porcoes",
      price: 10.99,
      originalPrice: 12.99,
      discount: "-15%",
      description: "Pequena porção de aipim frito sequinho e crocante.",
      image: "assets/images/aipim_200g.jpg",
      badge: "-15%",
      serves: "Petisco"
    },
    {
      id: "porcao-isca-boi-fritas",
      name: "PORÇÃO DE ISCA DE BOI COM FRITAS",
      category: "porcoes",
      price: 72.99,
      originalPrice: 82.99,
      discount: "-12%",
      sizeDescription: "Tamanho: 500g Iscas de boi + 700g batata ou aipim",
      description: "Tamanho: 500g Iscas de boi + 700g batata ou aipim",
      image: "assets/images/isca_boi_fritas.jpg",
      badge: "-12%",
      serves: "Serve 2 a 3 pessoas",
      customizationGroups: [
        {
          id: "molhos",
          title: "Molhos",
          subtitle: "Selecione até 3 opções",
          min: 0,
          max: 3,
          required: false,
          exclusiveOption: "Sem Molhos",
          items: ["Barbecue", "Molho branco", "Limão", "Sem Molhos"]
        },
        {
          id: "fritas",
          title: "FRITAS",
          subtitle: "Selecione mínimo 1 opções",
          badge: "Obrigatórios",
          min: 1,
          max: 2,
          required: true,
          items: ["AIPIM", "BATATA"]
        }
      ]
    },

    {
      id: "porcao-frango-com-fritas",
      name: "PORÇÃO DE FRANGO COM FRITAS",
      category: "porcoes",
      price: 62.99,
      originalPrice: 69.90,
      discount: "-10%",
      sizeDescription: "Tamanho: 700g Frango + 700g Batata ou aipim",
      description: "Tamanho: 700g Frango + 700g Batata ou aipim",
      image: "assets/images/porcao_frango_fritas.jpg",
      badge: "-10%",
      serves: "Serve 2 a 3 pessoas",
      customizationGroups: [
        {
          id: "molhos",
          title: "Molhos",
          subtitle: "Selecione até 3 opções",
          min: 0,
          max: 3,
          required: false,
          exclusiveOption: "Sem Molhos",
          items: ["Barbecue", "Molho branco", "Limão", "Sem Molhos"]
        },
        {
          id: "fritas",
          title: "FRITAS",
          subtitle: "Selecione mínimo 1 opções",
          badge: "Obrigatórios",
          min: 1,
          max: 2,
          required: true,
          items: ["AIPIM", "BATATA"]
        }
      ]
    },
    {
      id: "porcao-filezinho-tilapias-fritas",
      name: "PORÇÃO FILEZINHO D TILAPIAS C/FRITAS",
      category: "porcoes",
      price: 68.99,
      originalPrice: 78.99,
      discount: "-13%",
      sizeDescription: "Tamanho: 700g Batata + 400g Tilápia ou aipim",
      description: "Tamanho: 700g Batata + 400g Tilápia ou aipim",
      image: "assets/images/porcao_tilapia_fritas.jpg",
      badge: "-13%",
      serves: "Serve 2 a 3 pessoas",
      customizationGroups: [
        {
          id: "molhos",
          title: "Molhos",
          subtitle: "Selecione até 3 opções",
          min: 0,
          max: 3,
          required: false,
          exclusiveOption: "Sem Molhos",
          items: ["Barbecue", "Molho branco", "Limão", "Sem Molhos"]
        },
        {
          id: "fritas",
          title: "FRITAS",
          subtitle: "Selecione mínimo 1 opções",
          badge: "Obrigatórios",
          min: 1,
          max: 2,
          required: true,
          items: ["AIPIM", "BATATA"]
        }
      ]
    },
    {
      id: "porcao-batata-bacon-cheddar",
      name: "PORÇÃO DE BATATA COM BACON E CHEDDAR",
      category: "porcoes",
      price: 42.99,
      originalPrice: 49.90,
      discount: "-14%",
      sizeDescription: "Tamanho: 700g de batata ou aipim +150g de bacon + Queijo cheddar",
      description: "Tamanho: 700g de batata ou aipim +150g de bacon + Queijo cheddar",
      image: "assets/images/porcao_batata_cheddar_bacon.jpg",
      badge: "-14%",
      serves: "Serve 2 a 3 pessoas",
      customizationGroups: [
        {
          id: "molhos",
          title: "Molhos",
          subtitle: "Selecione até 3 opções",
          min: 0,
          max: 3,
          required: false,
          exclusiveOption: "Sem Molhos",
          items: ["Barbecue", "Molho branco", "Limão", "Sem Molhos"]
        },
        {
          id: "fritas",
          title: "FRITAS",
          subtitle: "Selecione mínimo 1 opções",
          badge: "Obrigatórios",
          min: 1,
          max: 2,
          required: true,
          items: ["AIPIM", "BATATA"]
        }
      ]
    },
    {
      id: "porcao-carne-de-sol-fritas",
      name: "PORCAO de CARNE de SOL com FRITAS",
      category: "porcoes",
      price: 69.99,
      originalPrice: 79.99,
      discount: "-13%",
      sizeDescription: "aquela carne com aquele gosto diferenciado , com aquele tempero a mais ...",
      description: "aquela carne com aquele gosto diferenciado , com aquele tempero a mais ...",
      image: "assets/images/porcao_carne_sol_fritas.jpg",
      badge: "-13%",
      serves: "Serve 2 a 3 pessoas",
      customizationGroups: [
        {
          id: "molhos",
          title: "Molhos",
          subtitle: "Selecione até 3 opções",
          min: 0,
          max: 3,
          required: false,
          exclusiveOption: "Sem Molhos",
          items: ["Barbecue", "Molho branco", "Limão", "Sem Molhos"]
        },
        {
          id: "fritas",
          title: "FRITAS",
          subtitle: "Selecione mínimo 1 opções",
          badge: "Obrigatórios",
          min: 1,
          max: 2,
          required: true,
          items: ["AIPIM", "BATATA"]
        }
      ]
    },

    // ESPETOS
    {
      id: "espeto-01un-boi",
      name: "ESPETO 01UN – BOI",
      category: "espetos",
      price: 9.99,
      originalPrice: 10.00,
      description: "suculento e com aquela gordurinha ..",
      image: "assets/images/espeto_boi.jpg",
      serves: "Individual",
      customizationGroups: [
        {
          id: "acrescentar",
          title: "VOCÊ TAMBEM PODE ACRESCENTAR:",
          subtitle: "Selecione até 2 opções",
          min: 0,
          max: 2,
          required: false,
          items: [
            { name: "Arroz", price: 4.00 },
            { name: "Vinagrete", price: 5.00 }
          ]
        },
        {
          id: "complementos",
          title: "COMPLEMENTOS",
          subtitle: "Selecione mínimo 1 opções",
          badge: "Obrigatórios",
          min: 1,
          max: 2,
          required: true,
          exclusiveOption: "Sem complementos",
          items: ["Molho branco", "Farofa", "Sem complementos"]
        }
      ]
    },
    {
      id: "espeto-01un-frango",
      name: "ESPETO 01UN – FRANGO",
      category: "espetos",
      price: 8.99,
      originalPrice: 9.99,
      discount: "-10%",
      badge: "-10%",
      description: "Aquela carne macia de file de peito de frango ...",
      image: "assets/images/espeto_frango.jpg",
      serves: "Individual",
      customizationGroups: [
        {
          id: "acrescentar",
          title: "VOCÊ TAMBEM PODE ACRESCENTAR:",
          subtitle: "Selecione até 2 opções",
          min: 0,
          max: 2,
          required: false,
          items: [
            { name: "Arroz", price: 4.00 },
            { name: "Vinagrete", price: 5.00 }
          ]
        },
        {
          id: "complementos",
          title: "COMPLEMENTOS",
          subtitle: "Selecione mínimo 1 opções",
          badge: "Obrigatórios",
          min: 1,
          max: 2,
          required: true,
          exclusiveOption: "Sem complementos",
          items: ["Molho branco", "Farofa", "Sem complementos"]
        }
      ]
    },
    {
      id: "espeto-01un-misto",
      name: "ESPETO 01UN – MISTO",
      category: "espetos",
      price: 8.99,
      originalPrice: 9.99,
      discount: "-10%",
      badge: "-10%",
      description: "Para os indecisos rs... ou para aqueles que gostam de experimentar misturas de sabores . Contem carne de boi, frango ,...",
      image: "assets/images/espeto_misto.jpg",
      serves: "Individual",
      customizationGroups: [
        {
          id: "acrescentar",
          title: "VOCÊ TAMBEM PODE ACRESCENTAR:",
          subtitle: "Selecione até 2 opções",
          min: 0,
          max: 2,
          required: false,
          items: [
            { name: "Arroz", price: 4.00 },
            { name: "Vinagrete", price: 5.00 }
          ]
        },
        {
          id: "complementos",
          title: "COMPLEMENTOS",
          subtitle: "Selecione mínimo 1 opções",
          badge: "Obrigatórios",
          min: 1,
          max: 2,
          required: true,
          exclusiveOption: "Sem complementos",
          items: ["Molho branco", "Farofa", "Sem complementos"]
        }
      ]
    },
    {
      id: "espeto-01un-medalhao",
      name: "ESPETO 01UN – MEDALHÃO",
      category: "espetos",
      price: 9.99,
      originalPrice: 10.99,
      discount: "-9%",
      badge: "-9%",
      description: "O queridinho de BOI com Tiras de Bacon em volta, IRRESISTIVE LLLL...",
      image: "assets/images/espeto_medalhao.jpg",
      serves: "Individual",
      customizationGroups: [
        {
          id: "acrescentar",
          title: "VOCÊ TAMBEM PODE ACRESCENTAR:",
          subtitle: "Selecione até 2 opções",
          min: 0,
          max: 2,
          required: false,
          items: [
            { name: "Arroz", price: 4.00 },
            { name: "Vinagrete", price: 5.00 }
          ]
        },
        {
          id: "complementos",
          title: "COMPLEMENTOS",
          subtitle: "Selecione mínimo 1 opções",
          badge: "Obrigatórios",
          min: 1,
          max: 2,
          required: true,
          exclusiveOption: "Sem complementos",
          items: ["Molho branco", "Farofa", "Sem complementos"]
        }
      ]
    },
    {
      id: "espeto-01un-queijo-coalho",
      name: "ESPETO 01UN – QUEIJO COALHO",
      category: "espetos",
      price: 9.99,
      originalPrice: 10.99,
      discount: "-9%",
      badge: "-9%",
      description: "quem prova pede mais...rs",
      image: "assets/images/espeto_queijo_coalho.jpg",
      serves: "Individual",
      customizationGroups: [
        {
          id: "acrescentar",
          title: "VOCÊ TAMBEM PODE ACRESCENTAR:",
          subtitle: "Selecione até 2 opções",
          min: 0,
          max: 2,
          required: false,
          items: [
            { name: "Arroz", price: 4.00 },
            { name: "Vinagrete", price: 5.00 }
          ]
        },
        {
          id: "complementos",
          title: "COMPLEMENTOS",
          subtitle: "Selecione mínimo 1 opções",
          badge: "Obrigatórios",
          min: 1,
          max: 2,
          required: true,
          exclusiveOption: "Sem complementos",
          items: ["Molho branco", "Farofa", "Sem complementos"]
        }
      ]
    },
    {
      id: "espeto-01un-coracao",
      name: "ESPETO 01UN – CORAÇÃO",
      category: "espetos",
      price: 9.99,
      originalPrice: 10.99,
      discount: "-9%",
      badge: "-9%",
      description: "Me fale como vc gosta, Mal Passado- ao Ponto- Bem Passado",
      image: "assets/images/espeto_coracao.jpg",
      serves: "Individual",
      customizationGroups: [
        {
          id: "acrescentar",
          title: "VOCÊ TAMBEM PODE ACRESCENTAR:",
          subtitle: "Selecione até 2 opções",
          min: 0,
          max: 2,
          required: false,
          items: [
            { name: "Arroz", price: 4.00 },
            { name: "Vinagrete", price: 5.00 }
          ]
        },
        {
          id: "complementos",
          title: "COMPLEMENTOS",
          subtitle: "Selecione mínimo 1 opções",
          badge: "Obrigatórios",
          min: 1,
          max: 2,
          required: true,
          exclusiveOption: "Sem complementos",
          items: ["Molho branco", "Farofa", "Sem complementos"]
        }
      ]
    },
    {
      id: "espeto-01un-tulipa",
      name: "ESPETO 01UN – TULIPA",
      category: "espetos",
      price: 9.99,
      originalPrice: 10.99,
      discount: "-9%",
      badge: "-9%",
      description: "Para os amantes da tulipa ou melhor dizendo, o meio da asa , a melhor parte da asa de frango..rs",
      image: "assets/images/espeto_tulipa.jpg",
      serves: "Individual",
      customizationGroups: [
        {
          id: "acrescentar",
          title: "VOCÊ TAMBEM PODE ACRESCENTAR:",
          subtitle: "Selecione até 2 opções",
          min: 0,
          max: 2,
          required: false,
          items: [
            { name: "Arroz", price: 4.00 },
            { name: "Vinagrete", price: 5.00 }
          ]
        },
        {
          id: "complementos",
          title: "COMPLEMENTOS",
          subtitle: "Selecione mínimo 1 opções",
          badge: "Obrigatórios",
          min: 1,
          max: 2,
          required: true,
          exclusiveOption: "Sem complementos",
          items: ["Molho branco", "Farofa", "Sem complementos"]
        }
      ]
    },

    // MONTE SUA BARCA
    {
      id: "barca-m-04-espetos-mistos",
      name: "BARCA M - 04 ESPETOS MISTOS",
      category: "monte_barca",
      price: 48.99,
      originalPrice: 55.00,
      discount: "-11%",
      description: "➕ Adicionais: Vinagrete e Arroz ➕ Complementos: Molho branco e Farofa",
      image: "assets/images/barca_espetos_misto.jpg",
      badge: "-11%",
      serves: "Serve 2 a 3 pessoas",
      customizationGroups: [
        {
          id: "adicionais",
          title: "ADICIONAIS",
          subtitle: "Selecione até 2 opções",
          min: 0,
          max: 2,
          required: false,
          exclusiveOption: "Sem adicionais",
          items: ["Vinagrete", "Arroz", "Sem adicionais"]
        },
        {
          id: "carnes",
          type: "stepper",
          title: "MONTE SUA BARCA - M",
          subtitle: "Selecione até 4 opções",
          min: 1,
          max: 4,
          required: true,
          items: ["Boi", "Misto", "Frango", "Medalhao", "Tulipa", "Linguiça", "Queijo coalho", "Coração"]
        },
        {
          id: "complementos",
          title: "COMPLEMENTOS",
          subtitle: "Selecione mínimo 1 opções",
          badge: "Obrigatórios",
          min: 1,
          max: 2,
          required: true,
          exclusiveOption: "Sem complementos",
          items: ["Molho branco", "Farofa", "Sem complementos"]
        }
      ]
    },
    {
      id: "barca-p-espetos-mistos-monte",
      name: "BARCA P - 02 ESPETOS MISTOS",
      category: "monte_barca",
      price: 25.00,
      originalPrice: 30.00,
      discount: "-17%",
      description: "➕ Adicionais: Vinagrete e Arroz ➕ Complementos: Molho branco e Farofa",
      image: "assets/images/barca_espetos_misto.jpg",
      badge: "-17%",
      serves: "Serve 1 a 2 pessoas",
      customizationGroups: [
        {
          id: "carnes",
          title: "MONTE SUA BARCA - P",
          subtitle: "Selecione até 2 opções",
          min: 1,
          max: 2,
          required: true,
          items: ["Boi", "Misto", "Frango", "Medalhao", "Tulipa", "Linguiça", "Queijo coalho", "Coração"]
        },
        {
          id: "adicionais",
          title: "ADICIONAIS",
          subtitle: "Selecione até 2 opções",
          min: 0,
          max: 2,
          required: false,
          exclusiveOption: "Sem adicionais",
          items: ["Vinagrete", "Arroz", "Sem adicionais"]
        },
        {
          id: "complementos",
          title: "COMPLEMENTOS",
          subtitle: "Selecione mínimo 1 opções",
          badge: "Obrigatórios",
          min: 1,
          max: 2,
          required: true,
          exclusiveOption: "Sem complementos",
          items: ["Molho branco", "Farofa", "Sem complementos"]
        }
      ]
    },
    {
      id: "barca-g-09-espetos-mistos",
      name: "BARCA G - 09 ESPETOS MISTOS",
      category: "monte_barca",
      price: 91.99,
      originalPrice: 100.00,
      discount: "-8%",
      description: "➕ Adicionais: Vinagrete e Arroz ➕ Complementos: Molho branco e Farofa",
      image: "assets/images/barca_espetos_misto.jpg",
      badge: "-8%",
      serves: "Serve 3 a 4 pessoas",
      customizationGroups: [
        {
          id: "carnes",
          type: "stepper",
          title: "MONTE SUA BARCA - G",
          subtitle: "Selecione até 9 opções",
          min: 1,
          max: 9,
          required: true,
          items: ["Boi", "Misto", "Frango", "Medalhao", "Tulipa", "Linguiça", "Queijo coalho", "Coração"]
        },
        {
          id: "adicionais",
          title: "ADICIONAIS",
          subtitle: "Selecione até 2 opções",
          min: 0,
          max: 2,
          required: false,
          exclusiveOption: "Sem adicionais",
          items: ["Vinagrete", "Arroz", "Sem adicionais"]
        },
        {
          id: "complementos",
          title: "COMPLEMENTOS",
          subtitle: "Selecione mínimo 1 opções",
          badge: "Obrigatórios",
          min: 1,
          max: 2,
          required: true,
          exclusiveOption: "Sem complementos",
          items: ["Molho branco", "Farofa", "Sem complementos"]
        }
      ]
    },
    {
      id: "barca-titanic-12-espetos-mistos",
      name: "BARCA TITANIC - 12 ESPETOS MISTOS",
      category: "monte_barca",
      price: 119.99,
      originalPrice: 130.00,
      discount: "-8%",
      description: "➕ Adicionais: Vinagrete e Arroz ➕ Complementos: Molho branco e Farofa",
      image: "assets/images/barca_espetos_misto.jpg",
      badge: "-8%",
      serves: "Serve 4 a 6 pessoas",
      customizationGroups: [
        {
          id: "carnes",
          type: "stepper",
          title: "MONTE SUA BARCA - TITANIC",
          subtitle: "Selecione até 12 opções",
          min: 1,
          max: 12,
          required: true,
          items: ["Boi", "Misto", "Frango", "Medalhao", "Tulipa", "Linguiça", "Queijo coalho", "Coração"]
        },
        {
          id: "adicionais",
          title: "ADICIONAIS",
          subtitle: "Selecione até 2 opções",
          min: 0,
          max: 2,
          required: false,
          exclusiveOption: "Sem adicionais",
          items: ["Vinagrete", "Arroz", "Sem adicionais"]
        },
        {
          id: "complementos",
          title: "COMPLEMENTOS",
          subtitle: "Selecione mínimo 1 opções",
          badge: "Obrigatórios",
          min: 1,
          max: 2,
          required: true,
          exclusiveOption: "Sem complementos",
          items: ["Molho branco", "Farofa", "Sem complementos"]
        }
      ]
    },

    // COMBOS
    {
      id: "combo-duplo-barca-p-refri-lata",
      name: "COMBO DUPLO | BARCA P +REFRI LATA",
      category: "combos",
      price: 28.99,
      description: "COMBO DUPLO: 02 espetos na barca + Refri lata ➕ Adicionais: Vinagrete e Arroz ➕ Complementos: Molho branco e Farofa",
      image: "assets/images/combo_duplo_hd.jpg",
      serves: "Serve 1 a 2 pessoas",
      customizationGroups: [
        {
          id: "carnes",
          title: "MONTE SUA BARCA - P",
          subtitle: "Selecione até 2 opções",
          min: 1,
          max: 2,
          required: true,
          items: ["Boi", "Misto", "Frango", "Medalhao", "Tulipa", "Linguiça", "Queijo coalho", "Coração"]
        },
        {
          id: "adicionais",
          title: "ADICIONAIS",
          subtitle: "Selecione até 2 opções",
          min: 0,
          max: 2,
          required: false,
          exclusiveOption: "Sem adicionais",
          items: ["Vinagrete", "Arroz", "Sem adicionais"]
        },
        {
          id: "complementos",
          title: "COMPLEMENTOS",
          subtitle: "Selecione mínimo 1 opções",
          badge: "Obrigatórios",
          min: 1,
          max: 2,
          required: true,
          exclusiveOption: "Sem complementos",
          items: ["Molho branco", "Farofa", "Sem complementos"]
        }
      ]
    },
    {
      id: "trio-barca-p-refri-lata-batata-200g",
      name: "TRIO BARCA P +REFRI LATA+BATATA 200G",
      category: "combos",
      price: 38.99,
      description: "COMBO TRIPLO: 02 espetos na barca + Refri lata + 🍟 Batata Kraft 200g ➕ Adicionais: Vinagrete e Arroz ➕ Complementos: Molho branco e Farofa",
      image: "assets/images/combo_trio_hd.jpg",
      serves: "Serve 1 a 2 pessoas",
      customizationGroups: [
        {
          id: "carnes",
          title: "MONTE SUA BARCA - P",
          subtitle: "Selecione até 2 opções",
          min: 1,
          max: 2,
          required: true,
          items: ["Boi", "Misto", "Frango", "Medalhao", "Tulipa", "Linguiça", "Queijo coalho", "Coração"]
        },
        {
          id: "adicionais",
          title: "ADICIONAIS",
          subtitle: "Selecione até 2 opções",
          min: 0,
          max: 2,
          required: false,
          exclusiveOption: "Sem adicionais",
          items: ["Vinagrete", "Arroz", "Sem adicionais"]
        },
        {
          id: "complementos",
          title: "COMPLEMENTOS",
          subtitle: "Selecione mínimo 1 opções",
          badge: "Obrigatórios",
          min: 1,
          max: 2,
          required: true,
          exclusiveOption: "Sem complementos",
          items: ["Molho branco", "Farofa", "Sem complementos"]
        }
      ]
    },
    {
      id: "combo-casal-barca-m-refri-600ml",
      name: "COMBO CASAL | BARCA M +REFRI 600ML",
      category: "combos",
      price: 56.99,
      description: "COMBO CASAL: 04 espetos na barca + Refri 600ML ➕ Adicionais: Vinagrete e Arroz ➕ Complementos: Molho branco e Farofa",
      image: "assets/images/combo_casal_hd.jpg",
      serves: "Serve 2 a 3 pessoas",
      customizationGroups: [
        {
          id: "carnes",
          type: "stepper",
          title: "MONTE SUA BARCA - M",
          subtitle: "Selecione até 4 opções",
          min: 1,
          max: 4,
          required: true,
          items: ["Boi", "Misto", "Frango", "Medalhao", "Tulipa", "Linguiça", "Queijo coalho", "Coração"]
        },
        {
          id: "adicionais",
          title: "ADICIONAIS",
          subtitle: "Selecione até 2 opções",
          min: 0,
          max: 2,
          required: false,
          exclusiveOption: "Sem adicionais",
          items: ["Vinagrete", "Arroz", "Sem adicionais"]
        },
        {
          id: "complementos",
          title: "COMPLEMENTOS",
          subtitle: "Selecione mínimo 1 opções",
          badge: "Obrigatórios",
          min: 1,
          max: 2,
          required: true,
          exclusiveOption: "Sem complementos",
          items: ["Molho branco", "Farofa", "Sem complementos"]
        }
      ]
    },
    {
      id: "combo-familia-barca-g-refri-2l",
      name: "COMBO FAMÍLIA | BARCA G +REFRI 2L",
      category: "combos",
      price: 99.90,
      description: "COMBO FAMILIA: 09 espetos na barca + Refri 2L ➕ Adicionais: Vinagrete e Arroz ➕ Complementos: Molho branco e Farofa",
      image: "assets/images/combo_familia_hd.jpg",
      serves: "Serve 3 a 5 pessoas",
      customizationGroups: [
        {
          id: "carnes",
          type: "stepper",
          title: "MONTE SUA BARCA - G",
          subtitle: "Selecione até 9 opções",
          min: 1,
          max: 9,
          required: true,
          items: ["Boi", "Misto", "Frango", "Medalhao", "Tulipa", "Linguiça", "Queijo coalho", "Coração"]
        },
        {
          id: "adicionais",
          title: "ADICIONAIS",
          subtitle: "Selecione até 2 opções",
          min: 0,
          max: 2,
          required: false,
          exclusiveOption: "Sem adicionais",
          items: ["Vinagrete", "Arroz", "Sem adicionais"]
        },
        {
          id: "complementos",
          title: "COMPLEMENTOS",
          subtitle: "Selecione mínimo 1 opções",
          badge: "Obrigatórios",
          min: 1,
          max: 2,
          required: true,
          exclusiveOption: "Sem complementos",
          items: ["Molho branco", "Farofa", "Sem complementos"]
        }
      ]
    },

    // BARCAS
    {
      id: "barca-boi",
      name: "BARCA BOI",
      category: "barcas",
      price: 26.99,
      description: "Todas as barcas acompanham: Arroz, vinagrete, farofa e molho branco.",
      topDescription: "Todas as barcas acompanham:\nArroz, vinagrete, farofa e molho branco.",
      image: "assets/images/barca_boi.jpg",
      serves: "A partir de 1 pessoa",
      customizationGroups: [
        {
          id: "tamanho",
          type: "radio_list",
          mode: "replace_price",
          title: "Escolha o tamanho da sua barca:",
          subtitle: "Selecione o mínimo 1 opção",
          min: 1,
          max: 1,
          required: true,
          items: [
            { name: "P - 02 ESPETOS", price: 26.99 },
            { name: "M - 04 ESPETOS", price: 49.99 },
            { name: "G - 09 ESPETOS", price: 88.00 },
            { name: "TITANIC - 12 ESPETOS", price: 110.00 }
          ]
        },
        {
          id: "adicionais",
          title: "ADICIONAIS",
          subtitle: "Selecione até 2 opções",
          min: 0,
          max: 2,
          required: false,
          exclusiveOption: "Sem adicionais",
          items: ["Vinagrete", "Arroz", "Sem adicionais"]
        },
        {
          id: "complementos",
          title: "COMPLEMENTOS",
          subtitle: "Selecione mínimo 1 opções",
          badge: "Obrigatórios",
          min: 1,
          max: 2,
          required: true,
          exclusiveOption: "Sem complementos",
          items: ["Molho branco", "Farofa", "Sem complementos"]
        }
      ]
    },
    {
      id: "barca-frango",
      name: "BARCA FRANGO",
      category: "barcas",
      price: 24.99,
      description: "Todas as barcas acompanham: Arroz, vinagrete, farofa e molho branco.",
      topDescription: "Todas as barcas acompanham:\nArroz, vinagrete, farofa e molho branco.",
      image: "assets/images/barca_frango.jpg",
      serves: "A partir de 1 pessoa",
      customizationGroups: [
        {
          id: "tamanho",
          type: "radio_list",
          mode: "replace_price",
          title: "Escolha o tamanho da sua barca:",
          subtitle: "Selecione o mínimo 1 opção",
          min: 1,
          max: 1,
          required: true,
          items: [
            { name: "P - 02 ESPETOS", price: 24.99 },
            { name: "M - 04 ESPETOS", price: 48.99 },
            { name: "G - 09 ESPETOS", price: 70.00 }
          ]
        },
        {
          id: "adicionais",
          title: "ADICIONAIS",
          subtitle: "Selecione até 2 opções",
          min: 0,
          max: 2,
          required: false,
          exclusiveOption: "Sem adicionais",
          items: ["Vinagrete", "Arroz", "Sem adicionais"]
        },
        {
          id: "complementos",
          title: "COMPLEMENTOS",
          subtitle: "Selecione mínimo 1 opções",
          badge: "Obrigatórios",
          min: 1,
          max: 2,
          required: true,
          exclusiveOption: "Sem complementos",
          items: ["Molho branco", "Farofa", "Sem complementos"]
        }
      ]
    },
    {
      id: "barca-tulipa",
      name: "BARCA TULIPA",
      category: "barcas",
      price: 26.99,
      description: "Todas as barcas acompanham: Arroz, vinagrete, farofa e molho branco.",
      topDescription: "Todas as barcas acompanham:\nArroz, vinagrete, farofa e molho branco.",
      image: "assets/images/barca_tulipa.jpg",
      serves: "A partir de 1 pessoa",
      customizationGroups: [
        {
          id: "tamanho",
          type: "radio_list",
          mode: "replace_price",
          title: "Escolha o tamanho da sua barca:",
          subtitle: "Selecione o mínimo 1 opção",
          min: 1,
          max: 1,
          required: true,
          items: [
            { name: "P - 02 ESPETOS", price: 26.99 },
            { name: "M - 04 ESPETOS", price: 49.99 },
            { name: "G - 09 ESPETOS", price: 90.00 },
            { name: "TITANIC - 12 ESPETOS", price: 110.00 }
          ]
        },
        {
          id: "adicionais",
          title: "ADICIONAIS",
          subtitle: "Selecione até 2 opções",
          min: 0,
          max: 2,
          required: false,
          exclusiveOption: "Sem adicionais",
          items: ["Vinagrete", "Arroz", "Sem adicionais"]
        },
        {
          id: "complementos",
          title: "COMPLEMENTOS",
          subtitle: "Selecione mínimo 1 opções",
          badge: "Obrigatórios",
          min: 1,
          max: 2,
          required: true,
          exclusiveOption: "Sem complementos",
          items: ["Molho branco", "Farofa", "Sem complementos"]
        }
      ]
    },
    {
      id: "barca-linguica",
      name: "BARCA LINGUIÇA",
      category: "barcas",
      price: 24.99,
      description: "Todas as barcas acompanham: Arroz, vinagrete, farofa e molho branco.",
      topDescription: "Todas as barcas acompanham:\nArroz, vinagrete, farofa e molho branco.",
      image: "assets/images/barca_linguica.jpg",
      serves: "A partir de 1 pessoa",
      customizationGroups: [
        {
          id: "tamanho",
          type: "radio_list",
          mode: "replace_price",
          title: "Escolha o tamanho da sua barca:",
          subtitle: "Selecione o mínimo 1 opção",
          min: 1,
          max: 1,
          required: true,
          items: [
            { name: "P - 02 ESPETOS", price: 24.99 },
            { name: "M - 04 ESPETOS", price: 35.00 },
            { name: "G - 09 ESPETOS", price: 70.00 },
            { name: "TITANIC - 12 ESPETOS", price: 95.00 }
          ]
        },
        {
          id: "adicionais",
          title: "ADICIONAIS",
          subtitle: "Selecione até 2 opções",
          min: 0,
          max: 2,
          required: false,
          exclusiveOption: "Sem adicionais",
          items: ["Vinagrete", "Arroz", "Sem adicionais"]
        },
        {
          id: "complementos",
          title: "COMPLEMENTOS",
          subtitle: "Selecione mínimo 1 opções",
          badge: "Obrigatórios",
          min: 1,
          max: 2,
          required: true,
          exclusiveOption: "Sem complementos",
          items: ["Molho branco", "Farofa", "Sem complementos"]
        }
      ]
    },
    {
      id: "barca-medalhao",
      name: "BARCA MEDALHÃO",
      category: "barcas",
      price: 26.99,
      description: "Todas as barcas acompanham: Arroz, vinagrete, farofa e molho branco.",
      topDescription: "Todas as barcas acompanham:\nArroz, vinagrete, farofa e molho branco.",
      image: "assets/images/barca_medalhao.jpg",
      serves: "A partir de 1 pessoa",
      customizationGroups: [
        {
          id: "tamanho",
          type: "radio_list",
          mode: "replace_price",
          title: "Escolha o tamanho da sua barca:",
          subtitle: "Selecione o mínimo 1 opção",
          min: 1,
          max: 1,
          required: true,
          items: [
            { name: "P - 02 ESPETOS", price: 26.99 },
            { name: "M - 04 ESPETOS", price: 46.00 },
            { name: "G - 09 ESPETOS", price: 88.00 },
            { name: "TITANIC - 12 ESPETOS", price: 110.00 }
          ]
        },
        {
          id: "adicionais",
          title: "ADICIONAIS",
          subtitle: "Selecione até 2 opções",
          min: 0,
          max: 2,
          required: false,
          exclusiveOption: "Sem adicionais",
          items: ["Vinagrete", "Arroz", "Sem adicionais"]
        },
        {
          id: "complementos",
          title: "COMPLEMENTOS",
          subtitle: "Selecione mínimo 1 opções",
          badge: "Obrigatórios",
          min: 1,
          max: 2,
          required: true,
          exclusiveOption: "Sem complementos",
          items: ["Molho branco", "Farofa", "Sem complementos"]
        }
      ]
    },

    // COMPLEMENTOS
    {
      id: "pao-de-alho-1un",
      name: "PAO DE ALHO - 01UN",
      category: "complementos",
      price: 5.99,
      originalPrice: 6.99,
      discount: "-14%",
      badge: "-14%",
      description: "Pão de alho crocante assado na brasa, recheado com creme especial e queijo.",
      image: "assets/images/pao_de_alho.jpg",
      customizationGroups: [
        {
          id: "acrescentar",
          title: "VOCÊ TAMBÉM PODE ACRESCENTAR",
          subtitle: "Selecione até 2 opções",
          min: 0,
          max: 2,
          required: false,
          items: [
            { name: "Arroz", price: 4.00 },
            { name: "Vinagrete", price: 5.00 }
          ]
        },
        {
          id: "complementos",
          title: "COMPLEMENTOS",
          subtitle: "Selecione mínimo 1 opções",
          badge: "Obrigatórios",
          min: 1,
          max: 2,
          required: true,
          exclusiveOption: "Sem complementos",
          items: ["Molho branco", "Farofa", "Sem complementos"]
        }
      ]
    },
    {
      id: "porcao-de-vinagrete",
      name: "PORÇÃO DE VINAGRETE",
      category: "complementos",
      price: 5.99,
      description: "Tigela de vinagrete fresco da casa com tomates, cebola, cheiro verde e azeite extravirgem.",
      image: "assets/images/porcao_vinagrete.jpg"
    },
    {
      id: "porcao-de-arroz",
      name: "PORÇÃO DE ARROZ",
      category: "complementos",
      price: 4.99,
      description: "Tigela de arroz branco soltinho preparado na hora.",
      image: "assets/images/porcao_arroz.jpg"
    },

    // DRINKS
    {
      id: "drink-caipirinha",
      name: "CAIPIRINHA",
      category: "drinks",
      price: 17.00,
      description: "Experimente o sabor refrescante da nossa caipirinha, com pedaços de limão e gelo. Ideal para momentos de relaxamento e diversão.",
      image: "assets/images/drink_caipirinha.jpg",
      customizationGroups: [
        {
          id: "preferencia_drink",
          title: "COMO PREFERE SEU DRINK?",
          subtitle: "Selecione mínimo 1 opções",
          badge: "Obrigatórios",
          min: 1,
          max: 1,
          required: true,
          items: ["Sem álcool", "Padrão"]
        }
      ]
    },
    {
      id: "drink-nevada",
      name: "NEVADA DRINK",
      category: "drinks",
      price: 19.00,
      description: "Voce tambem pode escolher a versao sem alcool.",
      image: "assets/images/drink_nevada.jpg",
      customizationGroups: [
        {
          id: "preferencia_drink",
          title: "COMO PREFERE SEU DRINK?",
          subtitle: "Selecione mínimo 1 opções",
          badge: "Obrigatórios",
          min: 1,
          max: 1,
          required: true,
          items: ["Sem álcool", "Padrão"]
        }
      ]
    },
    {
      id: "drink-caipi-morango",
      name: "CAIPI MORANGO",
      category: "drinks",
      price: 18.00,
      description: "Voce tambem pode escolher a versao sem alcool.",
      image: "assets/images/drink_caipi_morango.jpg",
      customizationGroups: [
        {
          id: "preferencia_drink",
          title: "COMO PREFERE SEU DRINK?",
          subtitle: "Selecione mínimo 1 opções",
          badge: "Obrigatórios",
          min: 1,
          max: 1,
          required: true,
          items: ["Sem álcool", "Padrão"]
        }
      ]
    },
    {
      id: "drink-caipi-maracuja",
      name: "CAIPI MARACUJÁ",
      category: "drinks",
      price: 18.00,
      description: "Voce tambem pode escolher a versao sem alcool.",
      image: "assets/images/drink_caipi_maracuja.jpg",
      customizationGroups: [
        {
          id: "preferencia_drink",
          title: "COMO PREFERE SEU DRINK?",
          subtitle: "Selecione mínimo 1 opções",
          badge: "Obrigatórios",
          min: 1,
          max: 1,
          required: true,
          items: ["Sem álcool", "Padrão"]
        }
      ]
    },
    {
      id: "drink-gin-tropical",
      name: "GIN TROPICAL",
      category: "drinks",
      price: 18.00,
      description: "Gin tropical refrescante servido na taça com frutas e muito gelo.",
      image: "assets/images/drink_gin_tropical.jpg"
    },
    {
      id: "drink-caipirona",
      name: "CAIPIRONA",
      category: "drinks",
      price: 24.00,
      originalPrice: 26.00,
      discount: "-8%",
      badge: "-8%",
      description: "Corona + Caipirinha S2",
      image: "assets/images/drink_caipirona.jpg"
    },
    {
      id: "drink-copao",
      name: "COPÃO",
      category: "drinks",
      price: 20.00,
      description: "Copão gelado com seu destilado favorito. Escolha uma das opções abaixo.",
      image: "assets/images/drink_copao.jpg",
      customizationGroups: [
        {
          id: "destilados",
          type: "radio_list",
          mode: "replace_price",
          title: "ESCOLHA SEU DESTILADO",
          subtitle: "Selecione mínimo 1 opção",
          badge: "Obrigatório",
          min: 1,
          max: 1,
          required: true,
          items: [
            { name: "Cavalo ou Balatines", price: 20.00 },
            { name: "Red Label", price: 24.00 },
            { name: "Jack Daniels", price: 28.00 },
            { name: "Red Label / Redbull", price: 32.00 },
            { name: "Jack Daniels / Red Bull", price: 36.00 }
          ]
        }
      ]
    },

    // REFRI/SUCOS
    {
      id: "refri-coca-250ml-juninho",
      name: "REFRI COCA COLA 250ML JUNINHO",
      category: "refri_sucos",
      price: 4.50,
      description: "Garrafa pet 250ml mini bem geladinha.",
      image: "assets/images/refri_coca_250ml_juninho.jpg"
    },
    {
      id: "refri-juninho-200ml-sabores",
      name: "REFRI JUNINHO 200ML SABORES",
      category: "refri_sucos",
      price: 2.99,
      description: "Garrafinha pet 200ml bem geladinha. Sabores variados.",
      image: "assets/images/refri_juninho_200ml_sabores.jpg",
      options: ["Guaraná", "Laranja", "Uva"]
    },
    {
      id: "refri-coca-lata-350ml",
      name: "REFRI COCA LATA 350ML",
      category: "refri_sucos",
      price: 5.99,
      originalPrice: 6.00,
      discount: "-14%",
      badge: "-14%",
      description: "Lata 350ml estupidamente gelada.",
      image: "assets/images/refri_coca_lata_350ml.jpg"
    },
    {
      id: "refri-lata-350ml-sabores",
      name: "REFRI LATA 350ML SABORES",
      category: "refri_sucos",
      price: 5.00,
      description: "Ver sabores disponiveis",
      image: "assets/images/refri_lata_350ml_sabores.jpg",
      options: ["Guaraná Antarctica", "Guaraná Zero", "Fanta Laranja", "Fanta Uva", "Sprite"]
    },
    {
      id: "refri-coca-600ml",
      name: "REFRI COCA 600ML",
      category: "refri_sucos",
      price: 9.00,
      description: "Garrafa pet 600ml estupidamente gelada.",
      image: "assets/images/refri_coca_600ml.jpg"
    },
    {
      id: "refri-coca-2l",
      name: "REFRI COCA 2L",
      category: "refri_sucos",
      price: 13.99,
      description: "Garrafa pet 2 Litros bem gelada para toda a mesa.",
      image: "assets/images/refri_coca_2l.jpg"
    },
    {
      id: "refri-2l-sabores",
      name: "REFRI 2L SABORES",
      category: "refri_sucos",
      price: 9.99,
      description: "Garrafa pet 2 Litros gelada. Escolha o seu sabor favorito.",
      image: "assets/images/refri_2l_sabores.jpg",
      customizationGroups: [
        {
          id: "sabores_2l",
          type: "radio_list",
          mode: "replace_price",
          title: "ESCOLHA O SABOR",
          subtitle: "Selecione mínimo 1 opção",
          badge: "Obrigatório",
          min: 1,
          max: 1,
          required: true,
          items: [
            { name: "Fanta Laranja 2L", price: 9.99 },
            { name: "Sprite 2L", price: 9.99 },
            { name: "Guaraná 2L", price: 10.99 }
          ]
        }
      ]
    },
    {
      id: "refri-skinka-450ml",
      name: "SKINKA 450ML",
      category: "refri_sucos",
      price: 5.99,
      description: "Ver sabores disponíveis",
      image: "assets/images/refri_skinka_450ml.jpg",
      customizationGroups: [
        {
          id: "sabores_skinka",
          type: "radio_list",
          mode: "replace_price",
          title: "ESCOLHA O SABOR",
          subtitle: "Selecione mínimo 1 opção",
          badge: "Obrigatório",
          min: 1,
          max: 1,
          required: true,
          items: [
            { name: "Frutas cítricas", price: 5.99 },
            { name: "Frutas vermelhas", price: 5.99 },
            { name: "Uva", price: 5.99 }
          ]
        }
      ]
    },
    {
      id: "suco-natural",
      name: "SUCO NATURAL",
      category: "refri_sucos",
      price: 5.99,
      description: "Ver tamanhos disponíveis",
      image: "assets/images/suco_natural.jpg",
      customizationGroups: [
        {
          id: "tamanho_suco",
          type: "radio_list",
          mode: "replace_price",
          title: "ESCOLHA O TAMANHO",
          subtitle: "Selecione mínimo 1 opção",
          badge: "Obrigatório",
          min: 1,
          max: 1,
          required: true,
          items: [
            { name: "300ML", price: 5.99 },
            { name: "500ML", price: 9.99 },
            { name: "1 LITRO", price: 16.99 }
          ]
        },
        {
          id: "sabor_suco",
          type: "radio_list",
          title: "ESCOLHA O SABOR",
          subtitle: "Selecione mínimo 1 opção",
          badge: "Obrigatório",
          min: 1,
          max: 1,
          required: true,
          items: ["MARACUJÁ", "LARANJA"]
        }
      ]
    },
    {
      id: "monster-lata-473ml",
      name: "MONSTER LATA 473ML",
      category: "refri_sucos",
      price: 12.99,
      description: "Lata 473ml estupidamente gelada.",
      image: "assets/images/refri_monster_473ml.svg"
    },
    {
      id: "agua-com-gas",
      name: "AGUA COM GAS",
      category: "refri_sucos",
      price: 4.00,
      description: "Garrafa 500ml estupidamente gelada com gás.",
      image: "assets/images/agua_com_gas.svg"
    },
    {
      id: "agua-mineral",
      name: "Água Mineral 500ml (Sem Gás)",
      category: "refri_sucos",
      price: 4.00,
      description: "Garrafa 500ml bem geladinha sem gás.",
      image: "assets/images/agua_com_gas.svg"
    },
    {
      id: "refri-h2o",
      name: "H2O",
      category: "refri_sucos",
      price: 5.99,
      description: "Garrafa 500ml estupidamente gelada com leve toque de limão.",
      image: "assets/images/refri_h2oh_limao.svg"
    },

    // CERVEJA
    {
      id: "litrinhos-300ml",
      name: "LITRINHOS 300ML",
      category: "cerveja",
      price: 4.50,
      description: "Garrafas 300ml retornáveis trincando de geladas. Escolha a sua marca favorita.",
      image: "assets/images/cerveja_litrinhos_300ml.png",
      badge: "Trincando",
      customizationGroups: [
        {
          id: "marcas_litrinho",
          type: "radio_list",
          mode: "replace_price",
          title: "ESCOLHA SUA CERVEJA",
          subtitle: "Selecione mínimo 1 opção",
          badge: "Obrigatório",
          min: 1,
          max: 1,
          required: true,
          items: [
            { name: "Brahma", price: 4.50 },
            { name: "Skol", price: 4.50 },
            { name: "Brahma Duplo Malte", price: 4.50 },
            { name: "Antarctica", price: 4.50 },
            { name: "Devassa", price: 4.50 },
            { name: "Bohemia", price: 4.50 },
            { name: "Petra", price: 5.00 },
            { name: "Antarctica Original", price: 5.00 }
          ]
        }
      ]
    },
    {
      id: "cerveja-corona-longneck",
      name: "CERVEJA CORONA LONGNECK",
      category: "cerveja",
      price: 9.99,
      image: "assets/images/cerveja_corona_longneck.png"
    },
    {
      id: "cerveja-stella-longneck",
      name: "CERVEJA STELLA LONGNECK",
      category: "cerveja",
      price: 7.99,
      image: "assets/images/cerveja_stella_longneck.png"
    },
    {
      id: "cerveja-budweiser-longneck",
      name: "CERVEJA BUDWEISER LONGNECK",
      category: "cerveja",
      price: 7.99,
      image: "assets/images/cerveja_budweiser_longneck.png"
    },
    {
      id: "cerveja-600ml-heineken",
      name: "CERVEJA 600ML HEINECKEN",
      category: "cerveja",
      price: 15.99,
      image: "assets/images/cerveja_heineken_600ml.png"
    },
    {
      id: "cerveja-600ml-amstel",
      name: "CERVEJA 600ML AMSTEL",
      category: "cerveja",
      price: 11.99,
      image: "assets/images/cerveja_amstel_600ml.png"
    },
    {
      id: "cerveja-600ml-stella",
      name: "CERVEJA 600ML STELLA",
      category: "cerveja",
      price: 13.99,
      image: "assets/images/cerveja_stella_600ml.png"
    },
    {
      id: "cerveja-600ml-spaten",
      name: "CERVEJA 600ML SPATEN",
      category: "cerveja",
      price: 13.99,
      image: "assets/images/cerveja_spaten_600ml.png"
    },
    {
      id: "cerveja-600ml-brahma",
      name: "CERVEJA 600ML BRAHMA",
      category: "cerveja",
      price: 11.99,
      image: "assets/images/cerveja_brahma_600ml.png"
    },
    {
      id: "cerveja-latao-brahma",
      name: "CERVEJA LATAO BRAHMA",
      category: "cerveja",
      price: 6.99,
      image: "assets/images/cerveja_latao_brahma.png"
    },
    {
      id: "cerveja-latao-amstel",
      name: "CERVEJA LATAO AMSTEL",
      category: "cerveja",
      price: 6.99,
      image: "assets/images/cerveja_latao_amstel.png"
    },
    {
      id: "cerveja-latao-heineken",
      name: "CERVEJA LATAO HEINECKEN",
      category: "cerveja",
      price: 9.99,
      image: "assets/images/cerveja_latao_heineken.png"
    },

    // SORVETES
    {
      id: "sorvete-copo-300ml",
      name: "SORVETE COPO 300ML",
      category: "sorvetes",
      price: 18.99,
      description: "Monte seu copo de sorvete Delicius: escolha até 2 sabores, 2 complementos e 1 calda.",
      image: "assets/images/sorvete_copo_300ml.png",
      customizationGroups: [
        {
          id: "sabores_sorvete",
          title: "02 SABORES",
          subtitle: "Selecione mínimo 1 opções",
          badge: "Obrigatórios",
          min: 1,
          max: 2,
          required: true,
          items: [
            "BLUE ICE",
            "NAPOLITANO",
            "ABACAXI",
            "CHOCOMENTA",
            "COCO",
            "FLOCOS",
            "FRUTA DO BOSQUE",
            "IOGURTE GREGO",
            "MORANG. FLOCADO",
            "TORTA DE LIMÃO",
            "CHOC. TRUFADO",
            "FROZEN IOGURTE",
            "KITKAT",
            "DOCE DE LEITE",
            "AÇAI Tribus",
            "FROZEN"
          ]
        },
        {
          id: "complementos_sorvete",
          title: "02 COMPLEMENTOS",
          subtitle: "Selecione mínimo 1 opções",
          badge: "Obrigatórios",
          min: 1,
          max: 2,
          required: true,
          items: [
            "LEITE EM PÓ",
            "GRANULADO",
            "PAÇOCA",
            "AMENDOIM",
            "CHOCOBOL",
            "JUJUBA",
            "GRANOLA",
            "M&M",
            "FLOCOS DE ARROZ",
            "CEREAL",
            "CANUDINHO"
          ]
        },
        {
          id: "calda_sorvete",
          title: "01 CALDA DE SABOR",
          subtitle: "Selecione mínimo 1 opções",
          badge: "Obrigatórios",
          min: 1,
          max: 1,
          required: true,
          items: [
            "CHOC. MEIO AMARGO",
            "CHOC. C/ AVELÃ",
            "MORANGO",
            "FRUTAS VERMELHAS",
            "UVA",
            "BLUE ICE",
            "MENTA",
            "MELANCIA"
          ]
        }
      ]
    },
    {
      id: "sorvete-copo-500ml",
      name: "SORVETE COPO 500ML",
      category: "sorvetes",
      price: 26.99,
      description: "Monte seu copo de sorvete Delicius: escolha até 3 sabores, 3 complementos e 1 calda.",
      image: "assets/images/sorvete_copo_500ml.png",
      customizationGroups: [
        {
          id: "sabores_sorvete",
          title: "03 SABORES",
          subtitle: "Selecione mínimo 1 opções",
          badge: "Obrigatórios",
          min: 1,
          max: 3,
          required: true,
          items: [
            "BLUE ICE",
            "NAPOLITANO",
            "ABACAXI",
            "CHOCOMENTA",
            "COCO",
            "FLOCOS",
            "FRUTA DO BOSQUE",
            "IOGURTE GREGO",
            "MORANG. FLOCADO",
            "TORTA DE LIMÃO",
            "FROZEN IOGURTE",
            "KITKAT",
            "NINHO TRUFADO",
            "DOCE DE LEITE",
            "AÇAI TRIBUS",
            "RED VELVET"
          ]
        },
        {
          id: "complementos_sorvete",
          title: "03 COMPLEMENTOS",
          subtitle: "Selecione mínimo 1 opções",
          badge: "Obrigatórios",
          min: 1,
          max: 3,
          required: true,
          items: [
            "LEITE EM PÓ",
            "GRANULADO",
            "PAÇOCA",
            "AMENDOIM",
            "CHOCOBOL",
            "JUJUBA",
            "GRANOLA",
            "M&M",
            "FLOCOS DE ARROZ",
            "CEREAL",
            "CANUDINHO"
          ]
        },
        {
          id: "calda_sorvete",
          title: "01 CALDA DE SABOR",
          subtitle: "Selecione mínimo 1 opções",
          badge: "Obrigatórios",
          min: 1,
          max: 1,
          required: true,
          items: [
            "CHOC. MEIO AMARGO",
            "CHOC. C/ AVELÃ",
            "MORANGO",
            "FRUTAS VERMELHAS",
            "UVA",
            "BLUE ICE",
            "MENTA",
            "MELANCIA"
          ]
        }
      ]
    },
    {
      id: "sorvete-copo-700ml",
      name: "SORVETE COPO 700ML",
      category: "sorvetes",
      price: 34.99,
      description: "Monte seu copo de sorvete Delicius: escolha até 4 sabores, 4 complementos e 1 calda.",
      image: "assets/images/sorvete_copo_700ml.png",
      customizationGroups: [
        {
          id: "sabores_sorvete",
          title: "04 SABORES",
          subtitle: "Selecione mínimo 1 opções",
          badge: "Obrigatórios",
          min: 1,
          max: 4,
          required: true,
          items: [
            "BLUE ICE",
            "NAPOLITANO",
            "ABACAXI",
            "CHOCOMENTA",
            "COCO",
            "FLOCOS",
            "FRUTA DO BOSQUE",
            "IOGURTE GREGO",
            "MORANG. FLOCADO",
            "TORTA DE LIMÃO",
            "FROZEN IOGURTE",
            "KITKAT",
            "NINHO TRUFADO",
            "DOCE DE LEITE",
            "AÇAI TRIBUS",
            "RED VELVET"
          ]
        },
        {
          id: "complementos_sorvete",
          title: "04 COMPLEMENTOS",
          subtitle: "Selecione mínimo 1 opções",
          badge: "Obrigatórios",
          min: 1,
          max: 4,
          required: true,
          items: [
            "LEITE EM PÓ",
            "GRANULADO",
            "PAÇOCA",
            "AMENDOIM",
            "CHOCOBOL",
            "JUJUBA",
            "GRANOLA",
            "M&M",
            "FLOCOS DE ARROZ",
            "CEREAL",
            "CANUDINHO"
          ]
        },
        {
          id: "calda_sorvete",
          title: "01 CALDA DE SABOR",
          subtitle: "Selecione mínimo 1 opções",
          badge: "Obrigatórios",
          min: 1,
          max: 1,
          required: true,
          items: [
            "CHOC. MEIO AMARGO",
            "CHOC. C/ AVELÃ",
            "MORANGO",
            "FRUTAS VERMELHAS",
            "UVA",
            "BLUE ICE",
            "MENTA",
            "MELANCIA"
          ]
        }
      ]
    }
  ]
};
