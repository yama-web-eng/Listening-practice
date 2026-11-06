// テスト対策道場: 帯(ランク)とポイント
var BELTS=[[0,'白帯','⚪'],[10,'黄帯','🟡'],[30,'オレンジ帯','🟠'],[60,'緑帯','🟢'],[100,'青帯','🔵'],[150,'茶帯','🟤'],[220,'黒帯','⚫']];
function ktTotal(){try{return +localStorage.getItem('kt_correct')||0}catch(e){return 0}}
function ktBelt(){var n=ktTotal(),i=0;for(var k=0;k<BELTS.length;k++)if(n>=BELTS[k][0])i=k;var nx=BELTS[i+1];
 return {n:n,name:BELTS[i][1],ic:BELTS[i][2],next:nx?nx[0]-n:0,nextName:nx?nx[1]:''}}
function ktBeltText(){var b=ktBelt();return b.ic+' いまの帯: <b>'+b.name+'</b>(正解 '+b.n+'問)'+(b.next?'　次の'+b.nextName+'まで あと '+b.next+'問!':'　黒帯達成!🎊')}
var KT_TIPS=["現在完了の目印は <b>for / since / ever / never / just / ～times</b>。見つけたら have(has)＋過去分詞です。", "受け身の目印は <b>by ～</b>(～によって)。「～される」と訳せたら be動詞＋過去分詞です。", "主格の関係代名詞の後ろは<b>すぐ動詞</b>、目的格の後ろは<b>主語＋動詞</b>。ここで見分けます。", "目的格の関係代名詞は<b>省略できます</b>が、主格は省略できません。", "先行詞が人なら who、物なら which。that はどちらにも使えます。", "last year や yesterday のような<b>はっきり過去</b>を表す語があるときは、現在完了は使えません。", "主語が3人称単数なら、has や is を忘れずに。3単現の s に注意です。"];
function ktTip(){return KT_TIPS[Math.floor(Math.random()*KT_TIPS.length)]}
