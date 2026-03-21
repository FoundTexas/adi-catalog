// src/config/pricing.ts

export type SizeRow = {
  size: string;
  widthCm: number;
  lengthCm: number;
};

export type PriceOpt = {
  id: string;
  label: string;
  retail: number;
  wholesale: number;
};

export type Product = {
  id: string;
  name: string;
  category: "tshirt" | "hoodie" | "polo" | "sweatshirt" | "scrub";
  description: string;

  prices: PriceOpt[];

  colors: {
    key: string;
    label: string;
    hex?: string;
    image: string;
  }[];

  spec: {
    material: string;
    fit: string;
    print: string;
    care?: string;
  };

  sizeChart?: {
    title: string;
    rows: SizeRow[];
  };
};

export const PRICING = {
  wholesaleThreshold: 5,

  contact: {
    email: "adi.photostock@gmail.com",
    whatsappUrl: "https://wa.me/525549138324",
  },

  notes: {
    vat: "Precios en MXN. Incluyen IVA.",
    shipping: "Costo de envío no incluido (se calcula según destino).",
  },

  shipping: {
    metroCdmx: 0,
    nationalRetail: 100,
    nationalWholesale: 0,
  },
};

export const PRODUCTS: Product[] = [
  {
    id: "tshirt-basic",
    name: "Playera Heavy Cotton",
    category: "tshirt",
    description: "Ideal para el día a día, marcas, eventos.",

    prices: [
      { id: "custom", label: "Personalizada (DTF)", retail: 250, wholesale: 180 },
      { id: "blank", label: "Sin personalizar", retail: 100, wholesale: 80 },
    ],

    colors: [
      { key: "morado", label: "Morado", hex: "#6a1b9a", image: "/img/tee/morado.webp" },
      { key: "negro", label: "Negro", hex: "#111111", image: "/img/tee/negro.webp" },
      { key: "blanco", label: "Blanco", hex: "#ffffff", image: "/img/tee/blanco.webp" },
      { key: "jaspe_oscuro", label: "Jaspe Oscuro", hex: "#3a3a3a", image: "/img/tee/jaspe_oscuro.webp" },
      { key: "beige", label: "Beige", hex: "#d8c3a5", image: "/img/tee/beige.webp" },
      { key: "marino_brillante", label: "Marino Brillante", hex: "#0b1b3a", image: "/img/tee/marino_brillante.webp" },
      { key: "azul_rey", label: "Azul Rey", hex: "#1f4ed8", image: "/img/tee/azul_rey.webp" },
      { key: "azul_cielo", label: "Azul Cielo", hex: "#87ceeb", image: "/img/tee/azul_cielo.webp" },
      { key: "verde_militar", label: "Verde Militar", hex: "#4b5320", image: "/img/tee/verde_militar.webp" },
      { key: "verde_bandera", label: "Verde Bandera", hex: "#007a33", image: "/img/tee/verde_bandera.webp" },
      { key: "turquesa", label: "Turquesa", hex: "#1077a7", image: "/img/tee/turquesa.webp" },
      { key: "amarillo", label: "Amarillo", hex: "#f4d03f", image: "/img/tee/amarillo.webp" },
      { key: "limon", label: "Limón", hex: "#A7EF78", image: "/img/tee/limon.webp" },
      { key: "ocre", label: "Ocre", hex: "#a6403e", image: "/img/tee/ocre.webp" },
      { key: "oro", label: "Oro", hex: "#d4af37", image: "/img/tee/oro.webp" },
      { key: "rojo_brillante", label: "Rojo Brillante", hex: "#d32f2f", image: "/img/tee/rojo_brillante.webp" },
      { key: "fucsia", label: "Fucsia", hex: "#e91e63", image: "/img/tee/fucsia.webp" },
    ],

    spec: {
      material: "Algodón",
      fit: "Regular",
      print: "DTF / Vinil textil / Serigrafía (según pedido)",
      care: "Lavar al revés, agua fría, no planchar directo sobre el estampado.",
    },

    sizeChart: {
      title: "Tabla de tallas – Playera",
      rows: [
        { size: "S", widthCm: 48, lengthCm: 70 },
        { size: "M", widthCm: 52, lengthCm: 72 },
        { size: "L", widthCm: 56, lengthCm: 74 },
        { size: "XL", widthCm: 60, lengthCm: 76 },
      ],
    },
  },

  {
    id: "polo",
    name: "Polo",
    category: "polo",
    description: "Ideal para uniformes, equipos, eventos.",

    prices: [
      { id: "custom", label: "Personalizada (DTF)", retail: 300, wholesale: 250 },
      { id: "blank", label: "Sin personalizar", retail: 200, wholesale: 150 },
    ],

    colors: [
      { key: "gris_jaspe", label: "Gris Jaspe", hex: "#777777", image: "/img/polo/gris_jaspeado.webp" },
      { key: "blanco", label: "Blanco", hex: "#ffffff", image: "/img/polo/blanco.webp" },
      { key: "negro", label: "Negro", hex: "#111111", image: "/img/polo/negro.webp" },
      { key: "marino", label: "Marino", hex: "#0b1b3a", image: "/img/polo/marino.webp" },
      { key: "azul_rey", label: "Azul Rey", hex: "#1f4ed8", image: "/img/polo/azul_rey.webp" },
      { key: "cielo", label: "Cielo", hex: "#8fd0f1", image: "/img/polo/azul_cielo.webp" },
      { key: "turquesa", label: "Turquesa", hex: "#1077a7", image: "/img/polo/azul_turquesa.webp" },
      { key: "marino", label: "Marino", hex: "#1b273d", image: "/img/polo/marino_jaspeado.webp" },
      { key: "limon", label: "Limon", hex: "#A7EF78", image: "/img/polo/verde_limon.webp" },
      { key: "amarillo_oro", label: "Amarillo Oro", hex: "#f6c64b", image: "/img/polo/amarillo_oro.webp" },
      { key: "vino", label: "Vino", hex: "#5b1020", image: "/img/polo/vino.webp" },
      { key: "rojo", label: "Rojo", hex: "#d32f2f", image: "/img/polo/rojo.webp" },
    ],

    spec: {
      material: "50% Algodón / 50% Poliéster",
      fit: "Regular",
      print: "DTF / Vinil textil / Serigrafía (según pedido)",
      care: "Lavar al revés, agua fría. Evitar secadora en alta temperatura.",
    },

    sizeChart: {
      title: "Tabla de tallas – Playera 50/50",
      rows: [
        { size: "S", widthCm: 48, lengthCm: 70 },
        { size: "M", widthCm: 52, lengthCm: 72 },
        { size: "L", widthCm: 56, lengthCm: 74 },
        { size: "XL", widthCm: 60, lengthCm: 76 },
      ],
    },
  },

  {
    id: "pijama-quirurgica",
    name: "Scrubs",
    category: "scrub",
    description: "Pijamas quirúrgicas de tela anti fluido.",

    prices: [
      { id: "set", label: "Bordado", retail: 950, wholesale: 700 },
      { id: "blank", label: "Sin personalizar", retail: 800, wholesale: 650 },
    ],

    colors: [
      { key: "vino", label: "Vino", hex: "#5b1020", image: "/img/scrub/vino.webp" },
      { key: "blanco", label: "Blanco", hex: "#ffffff", image: "/img/scrub/blanco.webp" },
      { key: "negro", label: "Negro", hex: "#111111", image: "/img/scrub/negro.webp" },
      { key: "marino", label: "Marino", hex: "#0b1b3a", image: "/img/scrub/marino.webp" },
      { key: "plumbago", label: "Plumbago", hex: "#5f7f9b", image: "/img/scrub/plumbago.webp" },
      { key: "menta", label: "Menta", hex: "#B2D7AB", image: "/img/scrub/menta.webp" },
      { key: "militar", label: "Militar", hex: "#4b5320", image: "/img/scrub/militar.webp" },
      { key: "rosa", label: "Rosa", hex: "#f2b6d3", image: "/img/scrub/rosa.webp" },
    ],

    spec: {
      material: "50% Algodón / 50% Poliéster",
      fit: "Regular",
      print: "DTF / Vinil textil / Serigrafía (según pedido)",
      care: "Lavar al revés, agua fría. Evitar secadora en alta temperatura.",
    },

    sizeChart: {
      title: "Tabla de tallas – Scrubs",
      rows: [
        { size: "S", widthCm: 48, lengthCm: 70 },
        { size: "M", widthCm: 52, lengthCm: 72 },
        { size: "L", widthCm: 56, lengthCm: 74 },
        { size: "XL", widthCm: 60, lengthCm: 76 },
      ],
    },
  },

  {
    id: "sudadera-cuello-redondo",
    name: "Sudadera Cuello Redondo",
    category: "sweatshirt",
    description: "Sudadera cuello redondo de acabado afelpado.",

    prices: [
      { id: "custom", label: "Personalizada (DTF)", retail: 400, wholesale: 350 },
      { id: "blank", label: "Sin personalizar", retail: 300, wholesale: 250 },
    ],

    colors: [
      { key: "morado", label: "Morado", hex: "#3A2757", image: "/img/crewneck/morado.webp" },
      { key: "blanco", label: "Blanco", hex: "#ffffff", image: "/img/crewneck/blanco.webp" },
      { key: "black", label: "Negro", hex: "#111111", image: "/img/crewneck/black.webp" },
      { key: "beige-sand", label: "Beige Arena", hex: "#CABEA9", image: "/img/crewneck/beige_sand.webp" },
      { key: "verde-bosque", label: "Verde Bosque", hex: "#2D3126", image: "/img/crewneck/verde_bosque.webp" },
      { key: "azul-leni", label: "Azul Leni", hex: "#181E2A", image: "/img/crewneck/azul_leni.webp" },
      { key: "gris-tb", label: "Gris TB", hex: "#686568", image: "/img/crewneck/gris_tb.webp" },
      { key: "azul-sakai", label: "Azul Sakai", hex: "#36578B", image: "/img/crewneck/azul_sakai.webp" },
      { key: "rojo", label: "Rojo Davao", hex: "#D70E2D", image: "/img/crewneck/rojo.webp" },
      { key: "verde-militar", label: "Verde Militar", hex: "#4E4A37", image: "/img/crewneck/verde_militar.webp" },
      { key: "azul-rey", label: "Azul Rey", hex: "#17499E", image: "/img/crewneck/azul_rey.webp" },
      { key: "azul-purist", label: "Azul Purist", hex: "#A1D7DC", image: "/img/crewneck/azul_purist.webp" },
      { key: "gris-cherasco", label: "Gris Cherasco", hex: "#575556", image: "/img/crewneck/gris_cherasco.webp" },
      { key: "verde-menta", label: "Verde Menta", hex: "#B2D7AB", image: "/img/crewneck/verde_menta.webp" },
      { key: "naranja", label: "Naranja", hex: "#FEB977", image: "/img/crewneck/naranja.webp" },
      { key: "azul-heze", label: "Azul Heze", hex: "#3E4357", image: "/img/crewneck/azul_heze.webp" },
      { key: "marron", label: "Marron", hex: "#421B22", image: "/img/crewneck/marron.webp" },
      { key: "cafe", label: "Cafe", hex: "#4A2C1F", image: "/img/crewneck/cafe.webp" },
      { key: "azul-colombia", label: "Azul Colombia", hex: "#6786C2", image: "/img/crewneck/azul_colombia.webp" },
    ],

    spec: {
      material: "Mezcla algodón / poliéster (según lote)",
      fit: "Regular",
      print: "DTF",
      care: "Lavar al revés, no secadora en alta temperatura.",
    },
  },

  {
    id: "hoodie-basic",
    name: "Hoodie Heavy Blend",
    category: "hoodie",
    description:
      "Sudadera premium con gorro y bolsa frontal. Ideal para streetwear, marcas, merch y uniformes. Excelente para impresión DTF.",

    prices: [
      { id: "custom", label: "Personalizada (DTF)", retail: 450, wholesale: 350 },
      { id: "blank", label: "Sin personalizar", retail: 350, wholesale: 250 },
    ],

    colors: [
      { key: "negro", label: "Negro", hex: "#101010", image: "/img/hoodie/negro.webp" },
      { key: "blanco", label: "Blanco", hex: "#ffffff", image: "/img/hoodie/blanco.webp" },
      { key: "gris_oxford", label: "Gris Oxford", hex: "#868f92", image: "/img/hoodie/gris_oxford.webp" },
      { key: "gris_jaspe", label: "Gris Jaspe Oscuro", hex: "#4a4a4a", image: "/img/hoodie/gris_jaspe.webp" },
      { key: "beige", label: "Beige", hex: "#8a8570", image: "/img/hoodie/beige.webp" },
      { key: "marino", label: "Azul Marino", hex: "#1c2a4a", image: "/img/hoodie/marino.webp" },
      { key: "azul_petroleo", label: "Azul Petróleo", hex: "#2f5d62", image: "/img/hoodie/azul_petroleo.webp" },
      { key: "azul_cielo", label: "Azul Cielo", hex: "#adc3d5", image: "/img/hoodie/azul_cielo.webp" },
      { key: "verde_militar", label: "Verde Militar", hex: "#6b705c", image: "/img/hoodie/verde_militar.webp" },
      { key: "verde_brillante", label: "Verde Brillante", hex: "#35bf54", image: "/img/hoodie/verde_brillante.webp" },
      { key: "menta", label: "Menta", hex: "#aec9b8", image: "/img/hoodie/menta.webp" },
      { key: "amarillo_limon", label: "Amarillo Limón", hex: "#bac300", image: "/img/hoodie/amarillo_limon.webp" },
      { key: "naranja", label: "Naranja", hex: "#ee8a1d", image: "/img/hoodie/naranja.webp" },
      { key: "rojo", label: "Rojo", hex: "#e2001d", image: "/img/hoodie/rojo.webp" },
      { key: "rosa", label: "Rosa", hex: "#d26892", image: "/img/hoodie/rosa.webp" },
      { key: "lila", label: "Lila", hex: "#c8a2c8", image: "/img/hoodie/lila.webp" },
    ],

    spec: {
      material: "Algodón / Poliéster (según modelo)",
      fit: "Regular",
      print: "DTF / Vinil textil / Serigrafía (según pedido)",
      care: "Lavar al revés, agua fría, no planchar directo sobre el estampado.",
    },

    sizeChart: {
      title: "Tabla de tallas – Hoodie",
      rows: [
        { size: "S", widthCm: 52, lengthCm: 68 },
        { size: "M", widthCm: 56, lengthCm: 70 },
        { size: "L", widthCm: 60, lengthCm: 72 },
        { size: "XL", widthCm: 64, lengthCm: 74 },
      ],
    },
  },

  {
    id: "tshirt-5050",
    name: "Playera 50/50",
    category: "tshirt",
    description: "Mezcla 50% algodón / 50% poliéster. Excelente para impresión DTF.",

    prices: [
      { id: "custom", label: "Personalizada (DTF)", retail: 250, wholesale: 180 },
      { id: "blank", label: "Sin personalizar", retail: 100, wholesale: 80 },
    ],

    colors: [
      { key: "blanco", label: "Blanco", hex: "#ffffff", image: "/img/tee-5050/blanco.webp" },
      { key: "negro", label: "Negro", hex: "#111111", image: "/img/tee-5050/negro.webp" },
      { key: "oxford", label: "Oxford", hex: "#6e6f72", image: "/img/tee-5050/oxford.webp" },
      { key: "gris_jaspe", label: "Gris Jaspe", hex: "#9a9a9a", image: "/img/tee-5050/gris_jaspe.webp" },
      { key: "grafito", label: "Grafito", hex: "#2f3437", image: "/img/tee-5050/grafito.webp" },
      { key: "cemento", label: "Cemento", hex: "#7e8c8d", image: "/img/tee-5050/cemento.webp" },
      { key: "arena", label: "Arena", hex: "#d9cbb3", image: "/img/tee-5050/arena.webp" },
      { key: "beige", label: "Beige", hex: "#c7b299", image: "/img/tee-5050/beige.webp" },
      { key: "marino", label: "Marino", hex: "#0b1b3a", image: "/img/tee-5050/marino.webp" },
      { key: "azul_rey", label: "Azul Rey", hex: "#1f4ed8", image: "/img/tee-5050/azul_rey.webp" },
      { key: "cielo", label: "Cielo", hex: "#8fd0f1", image: "/img/tee-5050/cielo.webp" },
      { key: "azul_petroleo", label: "Azul Petróleo", hex: "#102b4b", image: "/img/tee-5050/azul_petroleo.webp" },
      { key: "plumbago", label: "Plumbago", hex: "#5f7f9b", image: "/img/tee-5050/plumbago.webp" },
      { key: "turquesa", label: "Turquesa", hex: "#1aa7c9", image: "/img/tee-5050/turquesa.webp" },
      { key: "bandera", label: "Bandera", hex: "#0f6a2e", image: "/img/tee-5050/bandera.webp" },
      { key: "militar", label: "Militar", hex: "#4b5320", image: "/img/tee-5050/militar.webp" },
      { key: "botella", label: "Botella", hex: "#0f3d2e", image: "/img/tee-5050/botella.webp" },
      { key: "manzana", label: "Manzana", hex: "#8dc63f", image: "/img/tee-5050/manzana.webp" },
      { key: "canario", label: "Canario", hex: "#f6c64b", image: "/img/tee-5050/canario.webp" },
      { key: "naranja", label: "Naranja", hex: "#f36a21", image: "/img/tee-5050/naranja.webp" },
      { key: "cafe", label: "Café", hex: "#3b2418", image: "/img/tee-5050/cafe.webp" },
      { key: "rojo", label: "Rojo", hex: "#d32f2f", image: "/img/tee-5050/rojo.webp" },
      { key: "rosa", label: "Rosa", hex: "#f2b6d3", image: "/img/tee-5050/rosa.webp" },
      { key: "fiusha", label: "Fiusha", hex: "#d81b60", image: "/img/tee-5050/fiusha.webp" },
      { key: "vino", label: "Vino", hex: "#5b1020", image: "/img/tee-5050/vino.webp" },
      { key: "morado", label: "Morado", hex: "#6a1b9a", image: "/img/tee-5050/morado.webp" },
      { key: "lila", label: "Lila", hex: "#b79ad8", image: "/img/tee-5050/lila.webp" },
    ],

    spec: {
      material: "50% Algodón / 50% Poliéster",
      fit: "Regular",
      print: "DTF / Vinil textil / Serigrafía (según pedido)",
      care: "Lavar al revés, agua fría. Evitar secadora en alta temperatura.",
    },

    sizeChart: {
      title: "Tabla de tallas – Playera 50/50",
      rows: [
        { size: "S", widthCm: 48, lengthCm: 70 },
        { size: "M", widthCm: 52, lengthCm: 72 },
        { size: "L", widthCm: 56, lengthCm: 74 },
        { size: "XL", widthCm: 60, lengthCm: 76 },
      ],
    },
  },
];