const nulo=new Proxy(function(){},{get:()=>nulo,set:()=>true,apply:()=>nulo});
const $=s=>document.querySelector(s)||nulo,$$=s=>[...document.querySelectorAll(s)];
const R=v=>v.toLocaleString('pt-BR',{style:'currency',currency:'BRL'});
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const ga=(n,p)=>{try{gtag('event',n,p||{})}catch(e){}};
const ls={get:(k,d)=>{try{return JSON.parse(localStorage.getItem(k))??d}catch(e){return d}},set:(k,v)=>{try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}}};

/* Catálogo: 30 títulos de edições brasileiras. Cada livro tem ISBNs brasileiros conferidos (separados por |).
   A capa é carregada pelo ISBN, primeiro na Open Library e, se não existir, no Google Books. Se nenhuma carregar, o card mostra o título. */
const B=[
['duna','Duna','Frank Herbert',1965,'Space opera','9788576573135|9788576571018',119.9,89.9,'No deserto de Arrakis nasce a especiaria mais valiosa do universo e o destino de Paul Atreides.'],
['messias','Messias de Duna','Frank Herbert',1969,'Space opera','9788576571162|9788576573821',79.9,59.9,'Paul Muad’Dib governa o império que conquistou, enquanto uma conspiração se forma ao seu redor.'],
['filhos','Filhos de Duna','Frank Herbert',1976,'Space opera','9788576571650',84.9,62.9,'Os gêmeos de Paul herdam um império em crise e um futuro que ninguém ousa prever.'],
['imperador','Imperador Deus de Duna','Frank Herbert',1981,'Space opera','9788576572626',94.9,69.9,'Milênios depois, Leto II governa Arrakis, já verdejante, e carrega o peso do Caminho Dourado.'],
['neuromancer','Neuromancer','William Gibson',1984,'Cyberpunk','9788576573005|9788585887902|9788576571407|9788576570493|9788576571919',79.9,59.9,'Um hacker decadente aceita uma última invasão no ciberespaço. O livro que criou o cyberpunk.'],
['fundacao','Fundação','Isaac Asimov',1951,'Space opera','9788576570660',74.9,54.9,'Um matemático prevê a queda do Império Galáctico e monta um plano para encurtar as trevas.'],
['trilogiaf','Trilogia da Fundação','Isaac Asimov',1953,'Space opera','9788576571971',149.9,109.9,'Fundação, Fundação e Império e Segunda Fundação reunidos num só volume em capa dura.'],
['robo','Eu, Robô','Isaac Asimov',1950,'Robôs e IA','9788576572008|9788576575023',59.9,44.9,'Nove histórias sobre robôs, as Três Leis da Robótica e os paradoxos que elas criam.'],
['cavernas','As Cavernas de Aço','Isaac Asimov',1954,'Robôs e IA','9788576574538',64.9,48.9,'Numa Terra superpovoada, um detetive e um robô investigam um assassinato que pode abalar a humanidade.'],
['alvorada','Os Robôs da Alvorada','Isaac Asimov',1983,'Robôs e IA','9788576572657',79.9,58.9,'O detetive Baley viaja ao planeta Aurora para investigar a destruição de um robô quase humano.'],
['robosimperio','Robôs e Império','Isaac Asimov',1985,'Robôs e IA','9788576573197',84.9,62.9,'O elo entre as sagas dos robôs e da Fundação, num conflito que decide o futuro da Galáxia.'],
['ubik','Ubik','Philip K. Dick',1969,'Clássicos','9788576570752',62.9,46.9,'Depois de um atentado, a realidade de um grupo de telepatas começa a regredir no tempo.'],
['androides','Androides Sonham com Ovelhas Elétricas?','Philip K. Dick',1968,'Cyberpunk','9788576571605|9788576573845',69.9,52.9,'Um caçador de recompensas persegue androides quase idênticos a humanos numa Terra devastada.'],
['realidades','Realidades Adaptadas','Philip K. Dick',2012,'Clássicos','9788576571346',64.9,47.9,'Contos de Dick que viraram filmes como Minority Report e O Vingador do Futuro.'],
['sonhos','Sonhos Elétricos','Philip K. Dick',2018,'Clássicos','9788576573975',59.9,43.9,'Dez contos adaptados na série Electric Dreams, sobre realidade, memória e controle.'],
['palmer','Os Três Estigmas de Palmer Eldritch','Philip K. Dick',1965,'Clássicos','9788576574989',64.9,47.9,'Uma droga alucinógena e um industrial misterioso embaralham realidade e ilusão nas colônias de Marte.'],
['esquerda','A Mão Esquerda da Escuridão','Ursula K. Le Guin',1969,'Clássicos','9788576574484|9788576570578',69.9,52.9,'Um enviado humano tenta convencer um planeta de gelo, onde ninguém tem sexo fixo, a se unir a outros mundos.'],
['despossuidos','Os Despossuídos','Ursula K. Le Guin',1974,'Clássicos','9788576574583|9788576573685',74.9,55.9,'Um físico deixa seu mundo anarquista para visitar o planeta rico e desigual de onde seus ancestrais saíram.'],
['laranja','Laranja Mecânica','Anthony Burgess',1962,'Distopia','9788576571360|9788576574637',64.9,47.9,'Alex e sua gangue espalham violência por uma Inglaterra futura, até o Estado decidir reprogramá-lo.'],
['solaris','Solaris','Stanisław Lem',1961,'Primeiro contato','9788576573326',69.9,52.9,'Numa estação sobre um oceano vivo, um psicólogo encara as memórias que o planeta devolve.'],
['1984','1984','George Orwell',1949,'Distopia','9788535914849',49.9,34.9,'Em um Estado que vigia tudo, Winston tenta guardar um pensamento só seu.'],
['fahrenheit','Fahrenheit 451','Ray Bradbury',1953,'Distopia','9788525052247|9786558300151',52.9,39.9,'Bombeiros queimam livros e Montag começa a duvidar do próprio ofício.'],
['tres','O Problema dos Três Corpos','Liu Cixin',2008,'Primeiro contato','9788556510204',89.9,67.9,'Um sinal enviado nos anos 1960 atravessa o espaço e muda o rumo da humanidade.'],
['floresta','A Floresta Sombria','Liu Cixin',2008,'Primeiro contato','9788556510501',99.9,74.9,'A humanidade se prepara para a invasão dos trissolarianos e aposta em estratégias de ocultação.'],
['fimmorte','O Fim da Morte','Liu Cixin',2010,'Primeiro contato','9788556510747',119.9,89.9,'O desfecho da trilogia: a humanidade enfrenta o limite do universo e uma escolha final.'],
['inofensiva','Praticamente Inofensiva','Douglas Adams',1992,'Space opera','9788599296981',59.9,44.9,'No quinto livro da série, Arthur Dent encontra um novo lar e a Terra ainda tem mais uma surpresa.'],
['guia','O Guia do Mochileiro das Galáxias','Douglas Adams',1979,'Space opera','9788599296776',59.9,44.9,'Minutos antes de a Terra ser demolida, Arthur Dent escapa com um guia de viagem e muito humor.'],
['restaurante','O Restaurante no Fim do Universo','Douglas Adams',1980,'Space opera','9788599296585|9788599296950',59.9,44.9,'Arthur Dent e seus amigos seguem pela galáxia rumo ao restaurante mais improvável do universo.'],
['marte','Perdido em Marte','Andy Weir',2011,'Hard SF','9788580414486',69.9,51.9,'Dado como morto, um astronauta precisa sobreviver sozinho em Marte usando ciência.']
].map(a=>({id:a[0],t:a[1],a:a[2],y:a[3],g:a[4],isbns:a[5].split('|'),de:a[6],por:a[7],s:a[8]}));
const fontes=b=>b.isbns.flatMap(i=>[`https://covers.openlibrary.org/b/isbn/${i}-L.jpg?default=false`,`https://books.google.com/books/content?vid=ISBN${i}&printsec=frontcover&img=1&zoom=1`]);
const capa=(b,cls='')=>`<div class="capa ${cls}"><span>${esc(b.t)}</span><img data-b="${b.id}" data-n="0" src="${fontes(b)[0]}" alt="Capa de ${esc(b.t)}" loading="lazy"></div>`;
function proxima(i){const b=B.find(x=>x.id===i.dataset.b),f=fontes(b),n=+i.dataset.n+1;if(n<f.length){i.dataset.n=n;i.src=f[n]}else i.remove()}
document.addEventListener('error',e=>{if(e.target.tagName==='IMG'&&e.target.dataset.b)proxima(e.target)},true);
document.addEventListener('load',e=>{if(e.target.tagName==='IMG'&&e.target.dataset.b&&e.target.naturalWidth<=1)proxima(e.target)},true);
const item=b=>({item_id:b.id,item_name:b.t,item_brand:b.a,item_category:b.g,price:b.por});

/* Hero */
$('#leque').innerHTML=['duna','neuromancer','fundacao'].map(i=>capa(B.find(b=>b.id===i))).join('');
/* Filtros e lista */
let cat='Todos',q='';
const cats=['Todos',...new Set(B.map(b=>b.g))];
$('#filtros').innerHTML=cats.map(c=>`<button class="chip" aria-pressed="${c==='Todos'}">${c}</button>`).join('');
$('#filtros').onclick=e=>{if(e.target.className!=='chip')return;cat=e.target.textContent;$$('.chip').forEach(c=>c.setAttribute('aria-pressed',c===e.target));ga('select_content',{content_type:'categoria',content_id:cat});lista()};
$$('.sq').forEach(i=>{i.oninput=e=>{q=e.target.value.toLowerCase();$$('.sq').forEach(o=>o.value=e.target.value);lista()};
 i.onchange=e=>{if(e.target.value)ga('search',{search_term:e.target.value})};
 i.onkeydown=e=>{if(e.key==='Enter'){fechar();location.hash='#catalogo'}}});
$('#ord').onchange=lista;
let vl=false;
function lista(){
 let l=B.filter(b=>(cat==='Todos'||b.g===cat)&&(b.t+' '+b.a).toLowerCase().includes(q));
 const o=$('#ord').value;
 if(o==='menor')l.sort((x,y)=>x.por-y.por);if(o==='maior')l.sort((x,y)=>y.por-x.por);
 if(o==='ano')l.sort((x,y)=>x.y-y.y);if(o==='az')l.sort((x,y)=>x.t.localeCompare(y.t,'pt'));
 $('#cont').textContent=l.length+' livro'+(l.length===1?'':'s')+' encontrado'+(l.length===1?'':'s');
 $('#grade').innerHTML=l.length?l.map(b=>`<article class="card"><div style="position:relative"><span class="badge">-${Math.round((1-b.por/b.de)*100)}%</span>${capa(b)}</div><div class="info"><small>${b.g} · ${b.y}</small><h3>${esc(b.t)}</h3><p class="aut">${esc(b.a)}</p><p class="sin">${esc(b.s)}</p><div class="pr"><s>${R(b.de)}</s><b>${R(b.por)}</b></div><button class="btn" data-add="${b.id}">Adicionar ao carrinho</button></div></article>`).join(''):'<p class="vazio">Nenhum livro encontrado. Tente outro termo ou categoria.</p>';
  if(!vl){vl=true;ga('view_item_list',{item_list_name:'catalogo',items:l.map(item)})}
}
$('#grade').onclick=e=>{const id=e.target.dataset.add;if(!id)return;const b=B.find(x=>x.id===id);car[id]=(car[id]||0)+1;salvar();ga('add_to_cart',{currency:'BRL',value:b.por,items:[{...item(b),quantity:1}]});abrir()};

lista();
/* Carrinho */
let car=ls.get('nb_car',{}),cupom=false,frete=null;
const salvar=()=>{ls.set('nb_car',car);desenhar()};
const tot=()=>{let sub=0;for(const i in car)sub+=B.find(b=>b.id===i).por*car[i];
 const desc=cupom?+(sub*.1).toFixed(2):0,gr=sub-desc>=199,f=gr?0:(frete||0);return{sub,desc,gr,f,t:sub-desc+f}};
function desenhar(){
 const ids=Object.keys(car),o=tot();
 $('#nCar').textContent=ids.reduce((s,i)=>s+car[i],0);
 $('#itens').innerHTML=ids.length?ids.map(i=>{const b=B.find(x=>x.id===i);return`<div class="item">${capa(b)}<div><h3>${esc(b.t)}</h3><small>${R(b.por)}</small><div class="qtd"><button data-m="${i}" aria-label="Diminuir">−</button><span>${car[i]}</span><button data-p="${i}" aria-label="Aumentar">+</button></div></div><button class="x" data-r="${i}" aria-label="Remover ${esc(b.t)}">×</button></div>`}).join(''):'<p class="nota">Seu carrinho está vazio. Escolha um livro no catálogo.</p>';
 $('#rSub').textContent=R(o.sub);$('#rDesc').textContent='− '+R(o.desc);
 $('#rFrete').textContent=!ids.length?R(0):o.gr?'Grátis':frete?R(frete):'Informe o CEP';$('#rTot').textContent=R(o.t);
 $('#irCheck').disabled=!ids.length;}
$('#itens').onclick=e=>{const t=e.target,d=t.dataset;
 if(d.p)car[d.p]++;
 if(d.m&&--car[d.m]<=0)delete car[d.m];
 if(d.r){const b=B.find(x=>x.id===d.r);ga('remove_from_cart',{currency:'BRL',value:b.por*car[d.r],items:[{...item(b),quantity:car[d.r]}]});delete car[d.r]}
 if(d.p||d.m||d.r)salvar()};
const abrir=()=>{$('#menu').classList.remove('on');$('#ov').classList.add('on');$('#gaveta').classList.add('on');ga('view_cart',{currency:'BRL',value:tot().t})};
const fechar=()=>{$('#ov').classList.remove('on');$('#gaveta').classList.remove('on');$('#menu').classList.remove('on');$('#menuBtn').setAttribute('aria-expanded','false')};
$('#menuBtn').onclick=()=>{$('#ov').classList.add('on');$('#menu').classList.add('on');$('#menuBtn').setAttribute('aria-expanded','true')};
$('#fecharMenu').onclick=fechar;$$('#menu a').forEach(a=>a.onclick=fechar);
$('#abrirCar').onclick=abrir;$('#fecharCar').onclick=fechar;$('#ov').onclick=fechar;
document.addEventListener('keydown',e=>{if(e.key==='Escape')fechar()});
$('#aplicar').onclick=()=>{const v=$('#cupom').value.trim().toUpperCase(),m=$('#cupomMsg');
 cupom=v==='LIVRO10';m.textContent=cupom?'Cupom aplicado: 10% de desconto.':v?'Cupom inválido.':'Digite um cupom.';m.className='nota '+(cupom?'ok':'erro');
 if(cupom)ga('select_promotion',{promotion_name:'LIVRO10'});desenhar()};
const regiao=c=>{const a=+c.slice(0,2),d=+c[0];
 if(d<=3)return['Sudeste',14.9];if(d===4||d===5||(a>=60&&a<=65))return['Nordeste',21.9];
 if(d===6||(a>=66&&a<=69))return['Norte',29.9];if(d===7)return['Centro-Oeste',19.9];return['Sul',17.9]};
$('#cep').oninput=e=>{const v=e.target.value.replace(/\D/g,'').slice(0,8);e.target.value=v.length>5?v.slice(0,5)+'-'+v.slice(5):v;const m=$('#freteMsg');
 if(v.length===8){const[r,f]=regiao(v);frete=f;m.textContent='Região '+r+': '+R(f)+' (3 a 12 dias úteis). Grátis acima de R$ 199.';m.className='nota ok'}
 else{frete=null;m.textContent='Informe o CEP para calcular o frete.';m.className='nota'}desenhar()};

/* Cookies, diálogos */
const setC=v=>{ls.set('nb_consent',v);gtag('consent','update',{analytics_storage:v==='ok'?'granted':'denied'});$('#cookies').style.display='none'};
const c0=ls.get('nb_consent',null);if(c0==='ok')gtag('consent','update',{analytics_storage:'granted'});else if(!c0)$('#cookies').style.display='block';
$('#aceitar').onclick=()=>setC('ok');$('#recusar').onclick=()=>setC('no');
$$('[data-abrir]').forEach(b=>b.onclick=()=>b.dataset.abrir==='cook'?($('#cookies').style.display='block'):$('#priv').showModal());
$$('[data-fechar]').forEach(b=>b.onclick=()=>b.closest('dialog').close());
$$('[data-cta]').forEach(a=>a.onclick=()=>ga('select_promotion',{promotion_name:'cta_'+a.dataset.cta}));

/* Login e cadastro (simulados, localStorage) */
let modo='login',depois=null;
const sess=()=>ls.get('nb_sess',null);
function conta(){const s=sess();$$('.btnConta').forEach(b=>b.textContent=s?'Olá, '+s.nome.split(' ')[0]+' (sair)':'Entrar')}
function modoAuth(m){modo=m;$('#authT').textContent=m==='login'?'Entrar':'Criar conta';$('#authB').textContent=m==='login'?'Entrar':'Criar conta';
 $('#authN').style.display=m==='login'?'none':'block';$('#authTroca').textContent=m==='login'?'Criar conta':'Já tenho conta';$('#authE').textContent=''}
$('#authTroca').onclick=()=>modoAuth(modo==='login'?'cadastro':'login');
$$('.btnConta').forEach(b=>b.onclick=()=>{fechar();if(sess()){ls.set('nb_sess',null);conta();return}modoAuth('login');$('#auth').showModal()});
$('#authF').onsubmit=e=>{e.preventDefault();
 const em=$('#ae').value.trim().toLowerCase(),se=$('#as').value,nm=$('#an').value.trim(),us=ls.get('nb_users',{}),E=m=>$('#authE').textContent=m;
 if(!/^\S+@\S+\.\S+$/.test(em))return E('Informe um e-mail válido.');
 if(se.length<6)return E('A senha precisa ter ao menos 6 caracteres.');
 if(modo==='cadastro'){if(nm.split(' ').length<2)return E('Informe nome e sobrenome.');if(us[em])return E('Este e-mail já tem cadastro. Use Entrar.');
  us[em]={nome:nm,senha:btoa(se)};ls.set('nb_users',us);ls.set('nb_sess',{nome:nm,email:em});ga('sign_up',{method:'email'})}
 else{if(!us[em]||us[em].senha!==btoa(se))return E('E-mail ou senha incorretos.');ls.set('nb_sess',{nome:us[em].nome,email:em});ga('login',{method:'email'})}
 $('#auth').close();conta();if(depois){const f=depois;depois=null;f()}};

/* Checkout */
const pagar=()=>{const s=sess(),o=tot();$('#cn').value=s.nome;$('#cm').value=s.email;$('#cTot').textContent=R(o.t);$('#cErro').textContent='';$('#check').showModal();
 ga('begin_checkout',{currency:'BRL',value:o.t,coupon:cupom?'LIVRO10':'',items:Object.keys(car).map(i=>({...item(B.find(b=>b.id===i)),quantity:car[i]}))})};
$('#irCheck').onclick=()=>{const o=tot();
 if(!o.gr&&!frete){$('#freteMsg').textContent='Informe o CEP para calcular o frete antes de continuar.';$('#freteMsg').className='nota erro';$('#cep').focus();return}
 fechar();if(!sess()){modoAuth('cadastro');depois=pagar;$('#auth').showModal()}else pagar()};
$$('input[name=pg]').forEach(r=>r.onchange=()=>{$$('.pg').forEach(x=>x.classList.remove('on'));$('#pg-'+r.value).classList.add('on');ga('add_payment_info',{currency:'BRL',value:tot().t,payment_type:r.value})});
$('#cc').oninput=e=>{const v=e.target.value.replace(/\D/g,'').slice(0,11);e.target.value=v.replace(/(\d{3})(\d)/,'$1.$2').replace(/(\d{3})(\d)/,'$1.$2').replace(/(\d{3})(\d{1,2})$/,'$1-$2')};
$('#kn').oninput=e=>e.target.value=e.target.value.replace(/\D/g,'').slice(0,16).replace(/(\d{4})(?=\d)/g,'$1 ');
$('#kv').oninput=e=>{const v=e.target.value.replace(/\D/g,'').slice(0,4);e.target.value=v.length>2?v.slice(0,2)+'/'+v.slice(2):v};
$('#checkF').onsubmit=e=>{e.preventDefault();const E=m=>$('#cErro').textContent=m,v=s=>$(s).value.trim(),pg=$('input[name=pg]:checked').value;
 if(v('#cn').split(' ').length<2)return E('Informe nome e sobrenome.');
 if(!/^\S+@\S+\.\S+$/.test(v('#cm')))return E('Informe um e-mail válido.');
 if(v('#cc').replace(/\D/g,'').length!==11)return E('O CPF deve ter 11 números.');
 if(pg==='cartao'){if(v('#kn').replace(/\D/g,'').length<13)return E('Número de cartão incompleto.');if(!/^(0[1-9]|1[0-2])\/\d{2}$/.test(v('#kv')))return E('Validade no formato MM/AA.');if(v('#kc').length<3)return E('CVV incompleto.')}
 if(!$('#ac').checked)return E('Aceite a Política de Privacidade para continuar.');
 const o=tot(),id='NB-'+Date.now().toString().slice(-8),its=Object.keys(car).map(i=>({...item(B.find(b=>b.id===i)),quantity:car[i]}));
 ga('purchase',{transaction_id:id,currency:'BRL',value:o.t,shipping:o.f,coupon:cupom?'LIVRO10':'',payment_type:pg,items:its});
 $('#okTxt').textContent='Pedido '+id+' no valor de '+R(o.t)+' via '+({pix:'Pix',cartao:'cartão',carteira:'carteira digital'})[pg]+'. Nenhuma cobrança foi feita.';
 $('#okMail').innerHTML='<b>Para:</b> '+esc(v('#cm'))+'<br><b>Assunto:</b> Seu pedido '+id+' foi confirmado<br><br>Olá, '+esc(v('#cn').split(' ')[0])+'! Recebemos seu pedido de '+its.length+' título(s). A nota fiscal (NF-e) segue anexa e você tem 7 dias para se arrepender da compra.';
 car={};cupom=false;frete=null;salvar();$('#check').close();$('#ok').showModal()};

/* QR simulado */
(()=>{let s='',x=7;const r=()=>(x=(x*9301+49297)%233280)/233280;
 for(let i=0;i<21;i++)for(let j=0;j<21;j++)if(!((i<8&&j<8)||(i<8&&j>12)||(i>12&&j<8))&&r()>.5)s+=`<rect x="${j}" y="${i}" width="1" height="1" fill="#0b1020"/>`;
 [[0,0],[14,0],[0,14]].forEach(([a,b])=>s+=`<rect x="${a}" y="${b}" width="7" height="7" fill="#0b1020"/><rect x="${a+1}" y="${b+1}" width="5" height="5" fill="#fff"/><rect x="${a+2}" y="${b+2}" width="3" height="3" fill="#0b1020"/>`);
 $('#qr').innerHTML=s})();

/* Chat automatizado */
const resp={frete:'Frete por região: Sudeste R$ 14,90, Sul R$ 17,90, Centro-Oeste R$ 19,90, Nordeste R$ 21,90, Norte R$ 29,90. Grátis acima de R$ 199.',
 prazo:'A entrega leva de 3 a 12 dias úteis, conforme a região.',devol:'Você pode desistir da compra em até 7 dias após receber, sem justificar, e o valor é devolvido.',
 pagam:'Aceitamos Pix, cartão (até 3× sem juros) e carteiras digitais. Neste projeto o pagamento é simulado.',nota:'A NF-e é emitida automaticamente após a aprovação do pagamento e enviada ao seu e-mail.'};
const achar=t=>{t=t.toLowerCase();return/frete|envio/.test(t)?'frete':/prazo|entrega|demora/.test(t)?'prazo':/devol|troca|arrepen/.test(t)?'devol':/pag|pix|cart/.test(t)?'pagam':/nota|nf/.test(t)?'nota':null};
const say=(t,eu)=>{const p=document.createElement('p');p.textContent=t;if(eu)p.className='eu';$('#log').append(p);$('#log').scrollTop=1e5};
const fala=t=>{say(t,1);const k=achar(t);setTimeout(()=>say(k?resp[k]:'Não encontrei essa resposta. Escreva para contato@nebulalivros.example e retornamos em até 1 dia útil.'),400);ga('chat_message',{topic:k||'outro'})};
$('#chatbtn').onclick=()=>{const on=$('#chat').classList.toggle('on');$('#chatbtn').setAttribute('aria-expanded',on);if(on)ga('chat_open')};
$$('.rap button').forEach(b=>b.onclick=()=>fala(b.textContent));
$('#chatf').onsubmit=e=>{e.preventDefault();const t=$('#chati').value.trim();if(t){fala(t);$('#chati').value=''}};

lista();desenhar();conta();
