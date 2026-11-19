const W=[
["FLASH",12,7,"H","Flash","Memória não volátil e regravável, igual à do pendrive; guarda o programa do Arduino."],
["MICROCONTROLADOR",1,8,"V","Micro\u00adcontrolador","Chip com CPU, memória e entrada e saída juntos; o ATmega328P é um."],
["CPU",6,8,"H","CPU","Núcleo do computador: busca e executa as instruções do programa."],
["DMA",14,8,"H","DMA","Controlador que copia dados entre dispositivo e RAM sem a CPU mover cada byte."],
["CACHE",9,11,"V","Cache","Memória minúscula e rapidíssima dentro do processador, com cópia do usado há pouco."],
["ROM",16,8,"H","ROM","Guarda o firmware de inicialização, como a BIOS, e não perde dados sem energia."],
["EEPROM",4,5,"H","EEPROM","Pequena memória do Arduino onde o programa guarda configurações que sobrevivem ao desligamento."],
["RAM",2,10,"V","RAM","Memória de trabalho volátil: guarda programas em execução e seus dados."],
["ULA",6,10,"V","ULA","Parte da CPU que faz as contas e as operações lógicas."],
["ADDRESSBUS",0,6,"V","Address bus","Fios que só saem da CPU e dizem ONDE ler ou escrever."],
["DATABUS",9,0,"H","Data bus","Fios que levam e trazem o valor lido ou escrito, e também as instruções."],
["UC",9,5,"V","UC","Lê cada instrução, descobre o que ela pede e dá as ordens."],
["MEMORIADEMASSA",2,0,"V","Memória de massa","SSD ou HD: guarda arquivos e programas instalados de forma permanente."],
["REGISTRADORES",2,3,"V","Registra\u00addores","Minúsculas memórias dentro da CPU, as mais rápidas de todas."]
];
const ICO={CPU:"🧠",ULA:"🧮",UC:"🎛️",REGISTRADORES:"📦",RAM:"⚡",ROM:"📜",EEPROM:"💾",FLASH:"🔌",CACHE:"🚀",MEMORIADEMASSA:"💽",DMA:"🚚",ADDRESSBUS:"📍",DATABUS:"🚌",MICROCONTROLADOR:"🔲"};
const EXP={
CPU:"Unidade Central de Processamento: busca e executa as instruções do programa. É formada por ULA, UC e registradores. No Arduino Uno é o núcleo do ATmega328P, a 16 MHz.",
ULA:"Unidade Lógica e Aritmética: faz as contas (soma, subtração) e as operações lógicas (AND, OR, XOR, NOT). Segue o mesmo princípio do meio somador do Logisim.",
UC:"Unidade de Controle: lê cada instrução, descobre o que ela pede e envia as ordens para as outras partes. Na cozinha da CPU, é o chef.",
REGISTRADORES:"Pequenas memórias dentro da CPU: as mais rápidas e as menores do computador. Os principais são o acumulador, o contador de programa (PC) e o registrador de instrução.",
RAM:"Random Access Memory: a memória de trabalho, volátil. Guarda os programas em execução e seus dados. No Arduino Uno são 2 KB.",
ROM:"Memória não volátil que guarda o que o equipamento precisa para começar a funcionar, como o firmware (BIOS ou UEFI). Hoje quase sempre é feita com memória Flash.",
EEPROM:"Memória não volátil pequena (1 KB no Arduino Uno) onde o próprio programa pode guardar dados que devem sobreviver ao desligamento, como uma configuração.",
FLASH:"Memória não volátil e regravável, a mesma tecnologia do pendrive. No Arduino Uno guarda o programa (32 KB) e por isso ele não some ao desligar.",
CACHE:"Memória pequena e muito rápida dentro do processador, com cópia do que a CPU usou há pouco. É volátil. O ATmega328P do Arduino Uno não tem cache.",
MEMORIADEMASSA:"Armazenamento (SSD ou HD): guarda arquivos e programas instalados de forma permanente. É o nível maior, mais lento e mais barato da hierarquia de memória.",
DMA:"Direct Memory Access: um controlador próprio copia dados entre um dispositivo e a RAM sem a CPU mover cada byte. A CPU só configura e recebe o aviso no final. O Arduino Uno não tem DMA.",
ADDRESSBUS:"Barramento de endereço: sai da CPU e leva o número da posição de memória (ou do dispositivo) que ela quer acessar. Com n fios, alcança 2ⁿ endereços.",
DATABUS:"Barramento de dados: vai e volta, levando o valor que está sendo lido ou escrito e também as instruções.",
MICROCONTROLADOR:"Reúne CPU, memória e entrada e saída em um único chip, feito para uma tarefa específica. O ATmega328P do Arduino Uno é um microcontrolador."
};
const $=s=>document.querySelector(s);
const shuffle=a=>{for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a};
const words=W.map(([w,r,c,d,l,clue])=>({w,r,c,d,l,clue}));
const dirs=o=>o.d=="V"?[1,0]:[0,1];
const cnt=o=>Object.keys(o).length;

/* ---------- Progresso, missões e recompensas ---------- */
let S={xp:0,gems:0,done:{},lc:{},li:{},limpos:0,perfeitos:0,maxCombo:0};
try{Object.assign(S,JSON.parse(localStorage.getItem("minecomp")||"{}"))}catch(e){}
const salvar=()=>{try{localStorage.setItem("minecomp",JSON.stringify(S))}catch(e){}};
const TIT=["Aldeão","Aprendiz de Redstone","Engenheiro de Redstone","Mestre Construtor","Arquiteto de Computadores"];
const nivel=()=>Math.floor(S.xp/100)+1;
const titulo=()=>TIT[Math.min(nivel()-1,TIT.length-1)];
const MIS=[
{id:"a1",t:"Primeiro bloco",d:"acerte 1 palavra na cruzadinha",ok:()=>cnt(S.lc)>=1,xp:20,g:1},
{id:"a2",t:"Pedreiro da CPU",d:"acerte 7 palavras diferentes na cruzadinha",ok:()=>cnt(S.lc)>=7,xp:40,g:3},
{id:"a3",t:"Engenheiro de Redstone",d:"complete a cruzadinha (14 palavras)",ok:()=>cnt(S.lc)>=words.length,xp:80,g:5},
{id:"b1",t:"Primeira coleta",d:"acerte 1 item no inventário",ok:()=>cnt(S.li)>=1,xp:20,g:1},
{id:"b2",t:"Faxina no baú",d:"acerte 7 itens diferentes no inventário",ok:()=>cnt(S.li)>=7,xp:40,g:3},
{id:"b3",t:"Combo de redstone",d:"acerte 5 itens seguidos sem errar",ok:()=>S.maxCombo>=5,xp:50,g:3},
{id:"b4",t:"Inventário limpo",d:"esvazie o inventário inteiro",ok:()=>S.limpos>=1,xp:80,g:5},
{id:"b5",t:"Mente perfeita",d:"esvazie o inventário sem nenhum erro",ok:()=>S.perfeitos>=1,xp:100,g:8},
{id:"c1",t:"Mestre da arquitetura",d:"complete os dois jogos",ok:()=>cnt(S.lc)>=words.length&&S.limpos>=1,xp:150,g:10}
];
function toast(h){const e=document.createElement("div");e.className="toast";e.innerHTML=h;$("#toasts").append(e);setTimeout(()=>e.remove(),4500)}
function ganhar(xp,g){
  const n0=nivel();S.xp+=xp;S.gems+=g;
  let ch=true;
  while(ch){ch=false;MIS.forEach(m=>{
    if(!S.done[m.id]&&m.ok()){S.done[m.id]=1;S.xp+=m.xp;S.gems+=m.g;ch=true;
      toast(`🏆 <small>Missão cumprida!</small><b>${m.t}</b> +${m.xp} XP, +${m.g} 💎`)}
  })}
  if(nivel()>n0){toast(`⬆️ <small>Subiu de nível!</small><b>Nível ${nivel()}: ${titulo()}</b>`);tom([523,659,784,1047])}
  salvar();perfil();
}
function premio(w,tipo,combo){
  const novo=!S[tipo][w];S[tipo][w]=1;
  const xp=(novo?10:2)+Math.min(combo,5)*2;
  ganhar(xp,novo?1:0);
  return xp;
}
function perfil(){$("#chip").textContent=`Nv ${nivel()} · ${S.gems} 💎`}
function abrirMissoes(){
  const p=S.xp%100;
  modal("🏆 Missões",`<p><b>Nível ${nivel()}: ${titulo()}</b></p><div class="xp"><i style="width:${p}%"></i></div>
  <p>${S.xp} XP · ${S.gems} 💎 · faltam ${100-p} XP para o próximo nível</p>
  <ul class="miss">${MIS.map(m=>`<li class="${S.done[m.id]?"feita":""}">${S.done[m.id]?"✅":"⬜"} <b>${m.t}</b>: ${m.d} <small>(+${m.xp} XP, +${m.g} 💎)</small></li>`).join("")}</ul>`,
  [["Fechar"],["Zerar progresso",()=>{
    if(confirm("Zerar XP, esmeraldas e missões?")){S={xp:0,gems:0,done:{},lc:{},li:{},limpos:0,perfeitos:0,maxCombo:0};salvar();perfil()}
  }]]);
}
$("#btn-miss").onclick=abrirMissoes;

/* ---------- Som, modais e comemoração ---------- */
let som=true,ac;
const AC=window.AudioContext||window.webkitAudioContext;
function tom(notas,tipo="square",dur=.12){
  if(!som||!AC)return;
  ac??=new AC();
  notas.forEach((f,i)=>{
    const o=ac.createOscillator(),g=ac.createGain(),t=ac.currentTime+i*dur;
    o.type=tipo;o.frequency.value=f;
    g.gain.setValueAtTime(.05,t);g.gain.exponentialRampToValueAtTime(.001,t+dur);
    o.connect(g);g.connect(ac.destination);o.start(t);o.stop(t+dur);
  });
}
$("#som").onclick=()=>{som=!som;$("#som").textContent=som?"🔊":"🔇"};
let bufClique;
const somAlt=new Audio("click.m4a");
somAlt.preload="auto";
async function carregarClique(){
  try{
    ac??=new AC();
    const r=await fetch("click.m4a");
    bufClique=await ac.decodeAudioData(await r.arrayBuffer());
  }catch(e){console.warn("Web Audio falhou, usando Audio:",e)}
}
function clique(){
  if(!som)return;
  if(bufClique&&AC){
    if(ac.state=="suspended")ac.resume();
    const s=ac.createBufferSource(),g=ac.createGain();
    s.buffer=bufClique;g.gain.value=.8;
    s.connect(g);g.connect(ac.destination);s.start();
  }else{
    const a=somAlt.cloneNode();a.volume=.8;a.play().catch(()=>{});
  }
}
document.addEventListener("pointerdown",e=>{
  if(e.target.closest("button")&&!e.target.closest(".slot"))clique();
});
carregarClique();
function modal(tit,html,botoes){
  const fx=$("#fx");
  fx.querySelector(".fim")?.remove();
  const d=document.createElement("div");
  d.className="fim";d.setAttribute("role","dialog");d.setAttribute("aria-modal","true");
  d.innerHTML=`<div class="caixa"><h2>${tit}</h2><div class="corpo">${html}</div><div class="bts"></div></div>`;
  botoes.forEach(([t,fn])=>{
    const b=document.createElement("button");b.className="mc";b.textContent=t;
    b.onclick=()=>{d.remove();fn&&fn()};
    d.querySelector(".bts").append(b);
  });
  fx.append(d);d.querySelector("button").focus();
}
function confete(){
  const fx=$("#fx");
  for(let i=0;i<60;i++){
    const o=document.createElement("i");o.className="orb";
    o.style.cssText=`left:${Math.random()*100}%;--d:${2+Math.random()*2.5}s;--w:${Math.random()*1.2}s;background:${["#7dff3a","#ffe14d","#5ad1ff","#ff7bd0"][i%4]}`;
    fx.append(o);
  }
  setTimeout(()=>fx.querySelectorAll(".orb").forEach(e=>e.remove()),6000);
}
function celebrar(tit,texto,botoes){
  tom([523,659,784,1047,784,1047]);
  modal("🏆 "+tit,`<p>${texto}</p>`,botoes);
  confete();
}

/* ---------- Telas, missões de entrada e "como jogar" ---------- */
const COMO=`<p><b>O que é o Minecomp?</b> Uma plataforma de estudo de Arquitetura Computacional com tema de Minecraft. Você treina os termos da aula (CPU, ULA, UC, memórias, barramentos, DMA e mais) em dois jogos.</p>
<p><b>📝 Cruzadinha:</b> leia a pista, clique na casa e digite. Cada palavra é conferida assim que você completa as letras: verde está certa, vermelho precisa de revisão. O botão Conferir verifica o tabuleiro todo.</p>
<p><b>🎒 Inventário:</b> o baú está cheio de conceitos. Leia a dica embaixo e clique no item certo. Acertou? Ele sai do inventário e você lê uma explicação rápida. Errou? Tente de novo.</p>
<p><b>🏆 Jornada:</b> cada acerto dá XP e esmeraldas. Cumpra missões, suba de nível e vire Arquiteto de Computadores. Seu progresso fica salvo neste navegador.</p>`;
const INTRO={
cruz:{t:"📝 Missão: reparar o computador da vila",
 m:"O computador da vila quebrou e as peças de arquitetura se espalharam pelo tabuleiro. Descubra os termos pelas pistas para consertá-lo!",
 p:["Clique numa casa (ou numa pista) e digite as letras.","Ao completar uma palavra, ela é conferida na hora: verde certa, vermelha errada.","Clique de novo numa casa de cruzamento para trocar entre horizontal e vertical.","Conferir verifica tudo; Reiniciar limpa o tabuleiro."]},
inv:{t:"🎒 Missão: esvaziar o inventário",
 m:"Seu inventário está cheio, e você precisa esvaziar para guardar mais itens. Relacione os conceitos corretos para esvaziar!",
 p:["Leia a dica na caixa roxa embaixo do inventário.","Clique no item que corresponde à dica.","Acertou: o item sai e você aprende o conceito. Errou: tente de novo (o combo zera).","Acertos seguidos dão XP extra!"]}
};
function intro(modo,btn,fn){
  const i=INTRO[modo];
  modal(i.t,`<p>${i.m}</p><p><b>Como jogar</b></p><ol>${i.p.map(x=>`<li>${x}</li>`).join("")}</ol>`,[[btn,fn]]);
}
function mostrar(t){
  $("#home").hidden=t!="home";$("main").hidden=t=="home";
  $("#cruz").hidden=t!="cruz";$("#inv").hidden=t!="inv";
  $("#menu").hidden=$("#mini").hidden=t=="home";
  $("#topo").classList.toggle("home",t=="home");
  scrollTo(0,0);
}
$("#menu").onclick=()=>mostrar("home");
$("#como").onclick=()=>modal("❓ Como jogar?",COMO,[["Entendi"]]);
$("#go-cruz").onclick=()=>{mostrar("cruz");intro("cruz","Começar missão")};
$("#go-inv").onclick=()=>{mostrar("inv");abrirInv();intro("inv","Começar missão",()=>{trava=false;mostraDica()})};
$("#ajuda-cruz").onclick=()=>intro("cruz","Entendi");
$("#ajuda-inv").onclick=()=>intro("inv","Entendi");

/* ---------- Cruzadinha ---------- */
const R=Math.max(...words.map(o=>o.r+(o.d=="V"?o.w.length:1)));
const C=Math.max(...words.map(o=>o.c+(o.d=="H"?o.w.length:1)));
const cells={};
words.forEach(o=>{
  const [dr,dc]=dirs(o);
  o.cells=[...o.w].map((ch,i)=>{
    const r=o.r+dr*i,c=o.c+dc*i,k=r+","+c;
    const x=cells[k]??={ch,r,c,d:new Set()};
    x.d.add(o.d);
    return x;
  });
});
let n=0;
for(let r=0;r<R;r++)for(let c=0;c<C;c++){
  const st=words.filter(o=>o.r==r&&o.c==c);
  if(st.length){n++;st.forEach(o=>o.n=n)}
}
let dir="H",fim=false;
const board=$("#board");
board.style.setProperty("--cols",C);
const msg=t=>$("#msg").textContent=t;
const step=(x,s)=>{
  const [dr,dc]=dir=="V"?[1,0]:[0,1];
  cells[(x.r+dr*s)+","+(x.c+dc*s)]?.el.focus();
};
function marcar(x){
  Object.values(cells).forEach(c=>c.div.classList.remove("hl"));
  words.find(o=>o.d==dir&&o.cells.includes(x))?.cells.forEach(c=>c.div.classList.add("hl"));
}
const arrow={ArrowRight:[0,1],ArrowLeft:[0,-1],ArrowDown:[1,0],ArrowUp:[-1,0]};
for(let r=0;r<R;r++)for(let c=0;c<C;c++){
  const x=cells[r+","+c],div=document.createElement("div");
  if(x){
    div.className="cell";
    const s=words.find(o=>o.r==r&&o.c==c);
    if(s)div.insertAdjacentHTML("beforeend",`<span class="num">${s.n}</span>`);
    const inp=document.createElement("input");
    inp.maxLength=2;inp.autocomplete="off";inp.setAttribute("aria-label",`Linha ${r+1}, coluna ${c+1}`);
    inp.onfocus=()=>{if(!x.d.has(dir))dir=[...x.d][0];marcar(x)};
    inp.onmousedown=()=>{inp._was=document.activeElement===inp};
    inp.onclick=()=>{if(inp._was&&x.d.size==2){dir=dir=="H"?"V":"H";marcar(x)}};
    inp.oninput=()=>{
      const v=inp.value.normalize("NFD").replace(/[^A-Za-z]/g,"").toUpperCase().slice(-1);
      inp.value=v;
      words.filter(o=>o.cells.includes(x)).forEach(o=>checar(o,false));
      pintar();
      if(v)step(x,1);
    };
    inp.onkeydown=e=>{
      if(e.key=="Backspace"&&!inp.value){step(x,-1)}
      else if(arrow[e.key]){
        e.preventDefault();
        cells[(r+arrow[e.key][0])+","+(c+arrow[e.key][1])]?.el.focus();
      }
    };
    div.append(inp);x.el=inp;x.div=div;
  }else div.className="blank";
  board.append(div);
}
words.forEach(o=>{
  const li=document.createElement("li");
  li.innerHTML=`<b>${o.n}.</b>${o.clue} <small>(${o.w.length} letras)</small>`;
  li.onclick=()=>{dir=o.d;o.cells[0].el.focus()};
  o.li=li;
});
words.filter(o=>o.d=="H").sort((a,b)=>a.n-b.n).forEach(o=>$("#clues-h").append(o.li));
words.filter(o=>o.d=="V").sort((a,b)=>a.n-b.n).forEach(o=>$("#clues-v").append(o.li));

function checar(o,forcar){
  const cheia=o.cells.every(x=>x.el.value);
  const antes=o.st;
  o.st=cheia?(o.cells.every((x,i)=>x.el.value==o.w[i])?"ok":"bad"):(forcar?"bad":null);
  if(o.st=="ok"&&!o.rec){
    o.rec=true;tom([660,880]);
    const xp=premio(o.w,"lc",0);
    if(!forcar)msg(`✔ Pista ${o.n} certa! +${xp} XP`);
  }else if(o.st=="bad"&&antes!="bad"&&!forcar){
    tom([160,120],"sawtooth");
    msg(`✖ A palavra da pista ${o.n} (${o.d=="H"?"horizontal":"vertical"}) não está certa. Revise!`);
  }
}
function pintar(){
  Object.values(cells).forEach(x=>{
    const ws=words.filter(o=>o.cells.includes(x));
    const ok=ws.some(o=>o.st=="ok");
    x.div.classList.toggle("ok",ok);
    x.div.classList.toggle("bad",!ok&&!!x.el.value&&ws.some(o=>o.st=="bad"));
  });
  words.forEach(o=>o.li.className=o.st||"");
  const k=words.filter(o=>o.st=="ok").length;
  $("#count").textContent=`${k} de ${words.length} palavras`;
  $("#xp-cruz").style.width=k/words.length*100+"%";
  if(k==words.length&&!fim){
    fim=true;msg("Cruzadinha completa!");
    celebrar("Engenheiro de Redstone",`Você consertou o computador da vila: ${k} de ${words.length} palavras!`,
      [["Ir para o inventário",()=>$("#go-inv").click()],["Menu",()=>mostrar("home")],["Fechar"]]);
  }
}
$("#conferir").onclick=()=>{
  words.forEach(o=>checar(o,true));
  pintar();
  const k=words.filter(o=>o.st=="ok").length;
  if(k<words.length)msg(`${k} de ${words.length} certas. As vermelhas precisam de revisão; clique numa pista para ir até ela.`);
};
$("#reiniciar").onclick=()=>{
  Object.values(cells).forEach(x=>x.el.value="");
  words.forEach(o=>{o.st=null;o.rec=false});
  fim=false;msg("");pintar();
};
pintar();

/* ---------- Inventário ---------- */
let inv,fila,atual,trava=true,combo=0,erros=0;
function abrirInv(){
  const pos=shuffle([...Array(28).keys()]);
  inv=Array(28).fill(null);
  shuffle(words.slice()).forEach((o,i)=>inv[pos[i]]=o);
  fila=shuffle(words.slice());combo=0;erros=0;trava=true;
  atual=fila.shift();
  $("#dica").innerHTML="<small>Dica</small>Aceite a missão para receber a primeira dica.";
  contar();desenhar();$("#inv-msg").textContent="";
}
function iniciarInv(){abrirInv();trava=false;mostraDica()}
function contar(){
  const rest=fila.length+(atual?1:0);
  $("#inv-count").textContent=`Restam ${rest} itens`;
  $("#xp-inv").style.width=(words.length-rest)/words.length*100+"%";
}
function mostraDica(){
  $("#dica").innerHTML=atual?`<small>Dica</small>${atual.clue}`:"Inventário limpo!";
}
function desenhar(){
  const g=$("#slots");g.innerHTML="";
  inv.forEach((it,i)=>{
    const b=document.createElement("button");
    b.className="slot"+(it?"":" empty");
    if(it)b.innerHTML=`<span class="ic">${ICO[it.w]}</span><span class="nm">${it.l}</span>`;
    b.onclick=()=>escolher(i,b);
    g.append(b);
  });
}
function escolher(i,b){
  const it=inv[i];
  if(!it||!atual||trava)return;
  if(it.w==atual.w){
    trava=true;tom([660,880]);
    combo++;S.maxCombo=Math.max(S.maxCombo,combo);
    const ultimo=!fila.length;
    if(ultimo){S.limpos++;if(!erros)S.perfeitos++}
    const xp=premio(it.w,"li",combo-1);
    b.classList.add("hit");
    $("#inv-msg").textContent="Acertou! Item coletado.";
    setTimeout(()=>{
      inv[i]=null;atual=fila.shift();contar();desenhar();
      modal(`<span class="ic">${ICO[it.w]}</span> ${it.l}`,
        `<p>${EXP[it.w]}</p><p class="xpg">+${xp} XP${combo>1?` · combo x${combo}`:""}</p>`,
        [["Continuar",()=>{
          if(atual){trava=false;mostraDica()}
          else{
            mostraDica();
            celebrar("Inventário limpo!",erros?`Você esvaziou o inventário com ${erros} erro(s). Dá pra fazer sem nenhum!`:"Você esvaziou o inventário sem nenhum erro!",
              [["Jogar de novo",iniciarInv],["Menu",()=>mostrar("home")]]);
          }
        }]]);
    },280);
  }else{
    tom([160,120],"sawtooth");erros++;combo=0;
    $("#inv-msg").textContent="Esse não é. Tente de novo.";
    b.classList.remove("no");void b.offsetWidth;b.classList.add("no");
  }
}
$("#inv-reiniciar").onclick=iniciarInv;
abrirInv();
perfil();
mostrar("home");