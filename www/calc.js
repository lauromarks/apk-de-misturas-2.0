/* Regras de cálculo — espelham a planilha CALCULADORA DE VOLUME DE MISTURA.
   Para alterar receitas ou frascos, edite SOMENTE este arquivo. */
(function (root) {
  // Frascos / embalagens: nome e volume em litros (coluna A e B da planilha)
  const FRASCOS = [
    ["Diluente Domino AX", 1.2],
    ["Tinta Domino AX", 0.825],
    ["Domino Classic", 0.825],
    ["Diluente Domino Itech", 1.2],
    ["Tinta Domino Itech", 0.825],
    ["Diluente Best Code / Hitachi / Willet", 1],
    ["Diluente Hitachi UX", 0.8],
    ["Tinta Hitachi UX", 0.5],
    ["Linx 500mL", 0.5],
    ["Diluente Linx Com Tag", 1],
    ["Tinta Linx Com Tag", 0.5],
    ["Markem Imaje Bico Normal", 0.8],
    ["Markem Imaje Bico Invertido", 0.75],
    ["Diluente QB Code", 0.8],
    ["Tinta QB Code", 0.5],
    ["Solução 1L Garrafa Padrão", 1],
    ["Videojet Importada", 0.75],
    ["Videojet Nacional", 0.75],
    ["Videojet 900mL", 0.9],
    ["Citronix", 0.8],
    ["Solução/Diluente Galão 5L", 5],
    ["Reservatório de Tinta Domino", 1.2],
  ].map(([nome, litros], i) => ({ id: i, nome, litros }));

  const MATERIAS = ["MEK", "ACETONA", "ÁLCOOL", "ETILA", "METANOL", "TINTA BASE MEK"];

  // Misturas (ordem de exibição) e seus nomes
  const NOMES = {
    M1: "M1 - Mek Puro",
    M2: "M2 - 50% Mek/Mek Flex",
    M3: "M3 - Mek Free",
    M4: "M4 - Base Álcool",
    M5: "M5 - Álcool Resistente",
    M6: "M6 - Flex Caustic",
    M7: "M7 - Food Grade",
    TINTA: "Tinta Base Mek",   // líquido pronto: só serve pra estimar consumo de tinta
  };

  // Proporção (fração do volume total) de cada matéria-prima em cada mistura
  const RECEITAS = {
    M1: { MEK: 0.8, ACETONA: 0,   "ÁLCOOL": 0.1, ETILA: 0.1, METANOL: 0 },
    M2: { MEK: 0.5, ACETONA: 0,   "ÁLCOOL": 0.4, ETILA: 0.1, METANOL: 0 },
    M3: { MEK: 0,   ACETONA: 0,   "ÁLCOOL": 0.5, ETILA: 0.5, METANOL: 0 },
    M4: { MEK: 0.3, ACETONA: 0.1, "ÁLCOOL": 0.6, ETILA: 0,   METANOL: 0 },
    M5: { MEK: 0.8, ACETONA: 0,   "ÁLCOOL": 0,   ETILA: 0.2, METANOL: 0 },
    M6: { MEK: 0,   ACETONA: 0,   "ÁLCOOL": 0.2, ETILA: 0,   METANOL: 0.8 },
    M7: { MEK: 0,   ACETONA: 0.4, "ÁLCOOL": 0.6, ETILA: 0,   METANOL: 0 },
    TINTA: { "TINTA BASE MEK": 1 },
  };

  // Arredondamento da "proporção aproximada" (igual à planilha; tinta base: pra cima)
  const ARREDONDAMENTO = { MEK: "baixo", ACETONA: "baixo", "ÁLCOOL": "cima", ETILA: "cima", METANOL: "cima", "TINTA BASE MEK": "cima" };

  // Tinta QB Code: fração do volume, em mL (só M3 e M4)
  const TINTA_QB = { M3: 0.007, M4: 0.01 };

  // Misturas que não passam pelo tanque de 300 L
  const SEM_TANQUE = ["TINTA"];

  // Capacidade do tanque (L)
  const TANQUE_L = 300;

  // Excel trabalha com ~15 dígitos; evita 7.000000000000001 virar 8 no ROUNDUP
  const limpa = (x) => Math.round(x * 1e9) / 1e9;

  function calcular({ qtds = {}, extra = 0, mistura }) {
    let total = Number(extra) || 0;
    for (const f of FRASCOS) total += f.litros * (Number(qtds[f.id]) || 0);
    total = limpa(total);

    const receita = RECEITAS[mistura];
    const exato = {}, aprox = {};
    let somaReceita = 0, totalExato = 0, totalAprox = 0;
    for (const m of MATERIAS) {
      const p = receita[m] || 0;
      somaReceita += p;
      exato[m] = limpa(total * p);
      aprox[m] = ARREDONDAMENTO[m] === "baixo" ? Math.floor(exato[m]) : Math.ceil(exato[m]);
      totalExato += exato[m];
      totalAprox += aprox[m];
    }
    return {
      total, exato, aprox,
      totalExato: limpa(totalExato), totalAprox,
      somaReceita: limpa(somaReceita),
      tintaQB_mL: TINTA_QB[mistura] ? limpa(total * TINTA_QB[mistura] * 1000) : null,
    };
  }

  const api = { FRASCOS, MATERIAS, NOMES, SEM_TANQUE, RECEITAS, ARREDONDAMENTO, TINTA_QB, TANQUE_L, calcular };
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  else root.Calc = api;
})(typeof window !== "undefined" ? window : globalThis);
