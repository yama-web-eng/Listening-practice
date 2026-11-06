(function(){
var app=document.getElementById('app');
function esc(s){return String(s).replace(/[&<>"]/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})}
function shuffle(a){a=a.slice();for(var i=a.length-1;i>0;i--){var j=Math.floor(Math.random()*(i+1));var t=a[i];a[i]=a[j];a[j]=t}return a}
function norm(s){return s.toLowerCase().replace(/[’‘]/g,"'").replace(/[.!?,]/g,' ').replace(/\s+/g,' ').trim()}
function expand(s){var re=/\(([^()|]+(?:\|[^()|]+)+)\)/;var m=re.exec(s);if(!m)return[s];var out=[];m[1].split('|').forEach(function(o){expand(s.replace(re,o)).forEach(function(x){out.push(x)})});return out}
var cfg={form:{data:FORM,title:'語形変化'},reorderja:{data:REORDER_JA},reorder:{data:REORDER},translate:{data:TRANSLATE}}[MODE];
var order=shuffle(cfg.data),idx=0,score=0,answered=0;
function header(){return '<div class="meta"><span>'+(idx+1)+' / '+order.length+'</span><span>正解 '+score+' / '+answered+'</span></div>'}
function finish(){app.innerHTML='<div class="card"><p>おつかれさま!　'+order.length+'問中 <b>'+score+'問</b> 正解でした。</p></div><button class="acc" id="again">もう一度(順番をシャッフル)</button>';document.getElementById('again').onclick=function(){order=shuffle(cfg.data);idx=0;score=0;answered=0;render()}}
function nextBtn(){return '<button class="acc" id="next">'+(idx+1<order.length?'次の問題 →':'結果を見る')+'</button>'}
function bindNext(){document.getElementById('next').onclick=function(){idx++;render()}}
function render(){if(idx>=order.length)return finish();var q=order[idx];({form:rForm,reorderja:rReorder,reorder:rReorder,translate:rTrans})[MODE](q)}

function rForm(q){
 var parts=q.s.split('{}');
 app.innerHTML=header()+'<div class="card"><p class="en">'+esc(parts[0])+'( <b>'+esc(q.v)+'</b> )'+esc(parts[1])+'</p><p class="hint">( )の動詞を正しい形に。答えは1語とは限りません。目印の言葉を探そう!</p></div>'
 +'<input type="text" id="ans" autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="答えを入力">'
 +'<button id="chk">答えあわせ</button><div id="res"></div>';
 var inp=document.getElementById('ans');inp.focus();
 function check(){
  var ok=q.a.some(function(x){return norm(x)===norm(inp.value)});
  var full=esc(parts[0])+'<b>'+esc(q.a[0])+'</b>'+esc(parts[1]);
  q.m.forEach(function(m){full=full.replace(esc(m),'<mark>'+esc(m)+'</mark>')});
  answered++;if(ok)score++;
  document.getElementById('res').innerHTML='<div class="res '+(ok?'ok':'ng')+'"><b class="'+(ok?'ok':'ng')+'">'+(ok?'正解!':'ざんねん… 正解は「'+esc(q.a[0])+'」')+'</b><p class="en">'+full+'</p><p>目印: '+q.m.map(function(m){return '<mark>'+esc(m)+'</mark>'}).join(' ')+'<br>'+esc(q.e)+'</p></div>'+nextBtn();
  document.getElementById('chk').disabled=true;inp.disabled=true;bindNext()}
 document.getElementById('chk').onclick=check;
 inp.onkeydown=function(e){if(e.key==='Enter'&&!inp.disabled)check()}
}

function rReorder(q){
 var words=shuffle(q.w.split(' ')),picked=[];
 app.innerHTML=header()+'<div class="card">'+(q.j?'<p class="ja">'+esc(q.j)+'</p>':'<p class="ja">語を並べかえて、意味の通る英文にしよう。</p>')+'</div>'
 +'<div class="line" id="line"></div><div class="chips" id="pool"></div>'
 +'<button id="chk" class="acc" disabled>答えあわせ</button><button id="clr" class="sub2">やり直す</button><div id="res"></div>';
 var line=document.getElementById('line'),pool=document.getElementById('pool'),chk=document.getElementById('chk');
 var done=false;
 function draw(){
  line.innerHTML='';picked.forEach(function(i,k){var b=document.createElement('button');b.className='chip';b.textContent=words[i];b.onclick=function(){if(done)return;picked.splice(k,1);draw()};line.appendChild(b)});
  pool.innerHTML='';words.forEach(function(w,i){var b=document.createElement('button');b.className='chip'+(picked.indexOf(i)>=0?' used':'');b.textContent=w;b.disabled=picked.indexOf(i)>=0;b.onclick=function(){if(done)return;picked.push(i);draw()};pool.appendChild(b)});
  chk.disabled=picked.length!==words.length||done}
 draw();
 document.getElementById('clr').onclick=function(){if(done)return;picked=[];draw()};
 chk.onclick=function(){
  done=true;var mine=picked.map(function(i){return words[i]}).join(' ');
  var ok=norm(mine)===norm(q.a);answered++;if(ok)score++;
  document.getElementById('res').innerHTML='<div class="res '+(ok?'ok':'ng')+'"><b class="'+(ok?'ok':'ng')+'">'+(ok?'正解!':'ざんねん…')+'</b><p class="en">'+esc(q.a)+'</p>'+(ok?'':'<p class="hint">あなたの答え: '+esc(mine)+'</p>')+'<p class="hint">プリントでは、文頭を大文字・最後にピリオドを忘れずに。</p></div>'+nextBtn();
  chk.disabled=true;draw();bindNext()}
}

function rTrans(q){
 app.innerHTML=header()+'<div class="card"><p class="ja">'+esc(q.j)+'</p><p class="hint">ヒント: '+esc(q.h)+'</p></div>'
 +'<input type="text" id="ans" autocomplete="off" autocapitalize="sentences" spellcheck="false" placeholder="英文を入力">'
 +'<button id="chk">答えあわせ</button><div id="res"></div>';
 var inp=document.getElementById('ans');
 var accepted=expand(q.a).map(norm);
 var model=expand(q.a)[0];
 function check(){
  var ok=accepted.indexOf(norm(inp.value))>=0;
  document.getElementById('chk').disabled=true;inp.disabled=true;
  if(ok){answered++;score++;
   document.getElementById('res').innerHTML='<div class="res ok"><b class="ok">正解!</b><p class="en">'+esc(model)+'</p><p>'+esc(q.m)+'</p></div>'+nextBtn();bindNext()}
  else{
   document.getElementById('res').innerHTML='<div class="res ng"><b class="ng">答えがちがうかも…</b><p class="hint">あなたの答え: '+esc(inp.value||'(未入力)')+'</p><p class="en">模範解答: '+esc(model)+'</p><p>'+esc(q.m)+'</p><p>言い方がちがうだけで、文法的に正しければ○にしてOK。自分で判定しよう。</p><button id="okb">自分の答えも正しかった</button><button id="ngb" class="sub2">まちがっていた</button></div>';
   function go(good){answered++;if(good)score++;document.getElementById('res').insertAdjacentHTML('beforeend',nextBtn());document.getElementById('okb').disabled=true;document.getElementById('ngb').disabled=true;bindNext()}
   document.getElementById('okb').onclick=function(){go(true)};document.getElementById('ngb').onclick=function(){go(false)}}}
 document.getElementById('chk').onclick=check;
 inp.onkeydown=function(e){if(e.key==='Enter'&&!inp.disabled)check()}
}
render();
})();
