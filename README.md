<div align="center">

# ⛏️ Minecomp

### Aprenda Arquitetura Computacional jogando

Uma cruzadinha e um inventário de conceitos com tema de Minecraft, feitos para treinar os termos da aula de **Tópicos de Arquitetura Computacional**.

![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)
![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-222?logo=github&logoColor=white)

### 🎮 [**Jogar agora**](https://SEU-USUARIO.github.io/arqcomp-cruzadinha/)

</div>

---

## 📑 Sumário

- [O que é o Minecomp](#-o-que-é-o-minecomp)
- [Como jogar](#-como-jogar)
- [Jornada: XP, níveis e missões](#-jornada-xp-níveis-e-missões)
- [Palavras e pistas](#-palavras-e-pistas)
- [Tecnologias e estrutura](#-tecnologias-e-estrutura)
- [Rodar no seu computador](#-rodar-no-seu-computador)
- [Créditos](#-créditos)

## 🧱 O que é o Minecomp

O Minecomp junta dois jogos para fixar os conceitos vistos em aula (CPU, ULA, UC, memórias, barramentos, DMA e microcontrolador):

| Modo | Ideia |
|---|---|
| 📝 **Cruzadinha** | Leia as pistas e escreva os termos direto no tabuleiro. |
| 🎒 **Inventário** | O baú está cheio de conceitos: relacione cada dica ao item certo para esvaziá-lo. |

Cada jogo começa com uma **missão** que explica o objetivo e as regras. Tudo roda no navegador, sem instalar nada.

## 🕹️ Como jogar

### Na tela inicial
Escolha **Cruzadinha** ou **Inventário**. O botão **Como jogar?** explica a plataforma, e o botão **🏆 Missões** (canto superior) mostra seu nível e suas conquistas.

### 📝 Cruzadinha
1. Clique numa casa do tabuleiro, ou numa pista da lista, e digite as letras.
2. Ao completar uma palavra ela é **conferida na hora**: 🟩 verde está certa, 🟥 vermelho precisa de revisão.
3. Clique de novo numa casa de cruzamento para alternar entre horizontal (→) e vertical (↓).
4. O botão **Conferir** verifica o tabuleiro inteiro e o contador mostra seus acertos (ex.: "8 de 14 palavras").
5. **Reiniciar** limpa o tabuleiro.

> Dica: use as setas do teclado para andar pelas casas e **Backspace** para voltar.

### 🎒 Inventário
1. Leia a dica na caixa roxa embaixo do inventário.
2. Clique no item que corresponde à dica.
3. **Acertou?** O item sai do inventário e aparece uma explicação curta do conceito.
4. **Errou?** O item treme e você tenta de novo (o combo zera).
5. Esvazie o inventário inteiro para vencer.

## 🏆 Jornada: XP, níveis e missões

Cada acerto rende **XP** e **esmeraldas 💎**. Acertar um termo pela primeira vez vale mais, e acertos seguidos no inventário dão **combo** com XP extra. A cada 100 XP você sobe de nível:

**Aldeão → Aprendiz de Redstone → Engenheiro de Redstone → Mestre Construtor → Arquiteto de Computadores**

| Missão | Objetivo | Recompensa |
|---|---|---|
| Primeiro bloco | Acerte 1 palavra na cruzadinha | +20 XP, +1 💎 |
| Pedreiro da CPU | Acerte 7 palavras diferentes na cruzadinha | +40 XP, +3 💎 |
| Engenheiro de Redstone | Complete a cruzadinha (14 palavras) | +80 XP, +5 💎 |
| Primeira coleta | Acerte 1 item no inventário | +20 XP, +1 💎 |
| Faxina no baú | Acerte 7 itens diferentes no inventário | +40 XP, +3 💎 |
| Combo de redstone | Acerte 5 itens seguidos sem errar | +50 XP, +3 💎 |
| Inventário limpo | Esvazie o inventário inteiro | +80 XP, +5 💎 |
| Mente perfeita | Esvazie o inventário sem nenhum erro | +100 XP, +8 💎 |
| Mestre da arquitetura | Complete os dois jogos | +150 XP, +10 💎 |

O progresso fica salvo no seu navegador (`localStorage`) e pode ser zerado no menu de Missões.

## 📚 Palavras e pistas

São 14 palavras, todas cruzadas no tabuleiro.

| | Termo | Letras | Direção | Pista |
|---|---|---|---|---|
| 🔌 | **Flash** | 5 | → | Memória não volátil e regravável, igual à do pendrive; guarda o programa do Arduino. |
| 🔲 | **Micro\u00adcontrolador** | 16 | ↓ | Chip com CPU, memória e entrada e saída juntos; o ATmega328P é um. |
| 🧠 | **CPU** | 3 | → | Núcleo do computador: busca e executa as instruções do programa. |
| 🚚 | **DMA** | 3 | → | Controlador que copia dados entre dispositivo e RAM sem a CPU mover cada byte. |
| 🚀 | **Cache** | 5 | ↓ | Memória minúscula e rapidíssima dentro do processador, com cópia do usado há pouco. |
| 📜 | **ROM** | 3 | → | Guarda o firmware de inicialização, como a BIOS, e não perde dados sem energia. |
| 💾 | **EEPROM** | 6 | → | Pequena memória do Arduino onde o programa guarda configurações que sobrevivem ao desligamento. |
| ⚡ | **RAM** | 3 | ↓ | Memória de trabalho volátil: guarda programas em execução e seus dados. |
| 🧮 | **ULA** | 3 | ↓ | Parte da CPU que faz as contas e as operações lógicas. |
| 📍 | **Address bus** | 10 | ↓ | Fios que só saem da CPU e dizem ONDE ler ou escrever. |
| 🚌 | **Data bus** | 7 | → | Fios que levam e trazem o valor lido ou escrito, e também as instruções. |
| 🎛️ | **UC** | 2 | ↓ | Lê cada instrução, descobre o que ela pede e dá as ordens. |
| 💽 | **Memória de massa** | 14 | ↓ | SSD ou HD: guarda arquivos e programas instalados de forma permanente. |
| 📦 | **Registra\u00addores** | 13 | ↓ | Minúsculas memórias dentro da CPU, as mais rápidas de todas. |

## 🛠️ Tecnologias e estrutura

HTML, CSS e JavaScript puros, sem bibliotecas nem frameworks.

```
arqcomp-cruzadinha/
├── index.html   # estrutura das telas
├── style.css    # visual estilo Minecraft
├── script.js    # lógica dos jogos, missões e progresso
└── README.md
```

## 💻 Rodar no seu computador

```bash
git clone https://github.com/SEU-USUARIO/arqcomp-cruzadinha.git
cd arqcomp-cruzadinha
```

Depois abra o `index.html` no navegador. Não precisa de servidor.

## 🙌 Créditos

- Conteúdo baseado no e-book *Tópicos de Arquitetura Computacional* (São Paulo Tech School).
- Fontes [Press Start 2P](https://fonts.google.com/specimen/Press+Start+2P) e [VT323](https://fonts.google.com/specimen/VT323), do Google Fonts.
- Projeto acadêmico e **não oficial**, inspirado no estilo visual de Minecraft. Não é afiliado à Mojang nem à Microsoft, e todos os visuais foram feitos em CSS.