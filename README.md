<div align="center">

# ✦ Arcana Pocket ✦

*Os 78 arcanos no bolso de quem aprende a ler as cartas.*

</div>

---

## ☾ O que é

**Arcana Pocket** é um grimório de bolso para estudantes de tarot. O app não sorteia cartas: o ritual é seu, com o baralho físico nas mãos. Quando as cartas estiverem na mesa, o app ajuda a decifrá-las.

Feito com **Expo** e **TypeScript**.

---

## ✦ O que o grimório guarda

| Aba | O que revela |
|---|---|
| **Cartas** | Os 78 arcanos, com busca por nome, palavra-chave ou número (`seis de ouros`, `6, 7 ou 8 de ouro`) e filtro por naipe. Cada carta mostra palavras-chave e significado, na posição **normal** ou **invertida**, com a carta girando entre uma e outra. |
| **Tiragens** | Oito tiragens, da Carta do Dia à Cruz Celta, com um desenho de como dispor as cartas e o significado de cada posição. |
| **Qual usar?** | Um breve oráculo de perguntas que indica qual tiragem combina com o seu momento. |
| **Pessoal** | Os três **Arcanos Pessoais**: Vida, Expressão e Síntese. Os cálculos podem ser **salvos** para você rever depois, os seus e os de quem você quiser. |
| **Básico** | Fundamentos para iniciantes: invertidas, naipes, cartas da corte e como os Arcanos Pessoais são calculados. |

---

## ☽ Os três Arcanos Pessoais

Um método que une o Tarot à Numerologia, usando **somente adição**.

- **Arcano de Vida** nasce da data de nascimento: soma de todos os dígitos.
- **Arcano de Expressão** nasce do nome completo: cada letra vale um número pela tabela pitagórica, e tudo é somado.
- **Arcano de Síntese** une os dois anteriores: a soma de Vida e Expressão.

Quando o total passa de 22, somam-se os algarismos do resultado até cair entre **1 e 22**. O **22 é O Louco**. A numeração segue o **Tarot de Marselha** (VIII é A Justiça, XI é A Força).

> Este é o método adotado pelo app, e não uma regra universal. Outras escolas calculam de outras formas.

---

## ⚝ Invocação (como rodar)

**1. Prepare o terreno**

```bash
npx create-expo-app@latest tarot-guia --template blank-typescript
cd tarot-guia
```

Copie para dentro da pasta o `App.tsx`, a pasta `src/`, a pasta `assets/` e a pasta `scripts/`.

**2. Chame os ingredientes**

```bash
npm install @react-navigation/native @react-navigation/native-stack @react-navigation/bottom-tabs
npx expo install react-native-screens react-native-safe-area-context @expo/vector-icons expo-status-bar expo-splash-screen @react-native-async-storage/async-storage
```

**3. Traga as cartas para o aparelho** *(opcional, mas recomendado)*

```bash
node scripts/download-images.mjs
```

O script baixa as 78 imagens para `assets/cards/`, o que deixa o app mais rápido e permite usá-lo sem internet. Sem esse passo, as cartas são carregadas da internet.

**4. Abra o portal**

```bash
npx expo start -c
```

Escaneie o QR code com o app **Expo Go** no celular. Se a rede não permitir a conexão, use `npx expo start --tunnel` (exige login com `npx expo login`).

> No Expo Go, o ícone e a splash nativa são os do próprio Expo Go. Eles só aparecem em um build instalado. A abertura animada funciona nos dois.

---

## ✧ Mapa do grimório

```
App.tsx                          navegação e abertura animada
assets/                          ícone, splash e imagens das cartas
scripts/download-images.mjs      baixa as 78 cartas
src/
├── data/
│   ├── cards.ts                 as 78 cartas e seus significados
│   ├── spreads.ts               tiragens e posições
│   ├── personalArcana.ts        significados dos Arcanos Pessoais
│   └── cardImages.ts            imagens locais (gerado pelo script)
├── screens/                     as telas do app
├── components/                  CardImage, SpreadThumb, AnimatedSplash
└── utils/
    ├── search.ts                busca por nome, palavra-chave e número
    └── personalArcana.ts        cálculo dos três arcanos
```

---

## ☉ Sobre as imagens

As cartas são do baralho **Rider-Waite-Smith** (1909, domínio público), vindas do Wikimedia Commons. Se alguma não carregar, o app mostra um ✦ no lugar.

---

<div align="center">

*Que as cartas falem, e que você saiba ouvir.*

✦ ☾ ✦

</div>
