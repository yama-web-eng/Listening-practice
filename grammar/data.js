// 問題データ。追加するときは各配列に1行足すだけでOK。
// FORM: s=文({}が空所) v=動詞の原形 a=正解(複数可) m=目印の言葉 t=perfect|passive|past e=解説
var FORM=[
{s:"The man who {} in this town for twenty years is a doctor.",v:"live",a:["has lived"],m:["for twenty years"],t:"perfect",e:"for ～(～の間)があるので現在完了。主語 The man は3人称単数 → has lived"},
{s:"The temple which {} by many tourists every year is in Kyoto.",v:"visit",a:["is visited"],m:["by many tourists"],t:"passive",e:"by ～(～によって)があるので受け身。主語 The temple は単数 → is visited"},
{s:"The pictures which {} by my father last year were beautiful.",v:"take",a:["were taken"],m:["by my father","last year"],t:"passive",e:"by ～があるので受け身。last year(去年)は過去 → were taken"},
{s:"I have a friend who {} me since I was a child.",v:"know",a:["has known"],m:["since I was a child"],t:"perfect",e:"since ～(～以来)があるので現在完了。a friend は3人称単数 → has known"},
{s:"The movie that I {} three times is very exciting.",v:"see",a:["have seen"],m:["three times"],t:"perfect",e:"three times(3回)は経験を表す現在完了の目印 → have seen"},
{s:"The room which {} by students every day is bright.",v:"clean",a:["is cleaned"],m:["by students","every day"],t:"passive",e:"by ～があるので受け身。every day は現在 → is cleaned"},
{s:"The woman who {} English at our school for ten years is Ms. Sato.",v:"teach",a:["has taught"],m:["for ten years"],t:"perfect",e:"for ten years があるので現在完了。teach の過去分詞は taught → has taught"},
{s:"This is the letter which {} by my grandmother many years ago.",v:"write",a:["was written"],m:["by my grandmother","many years ago"],t:"passive",e:"by ～があるので受け身。many years ago(ずっと前)は過去 → was written"},
{s:"The bike which I {} since last year is getting old.",v:"use",a:["have used"],m:["since last year"],t:"perfect",e:"since last year(去年から)があるので現在完了 → have used"},
{s:"The cake that {} by my sister was delicious.",v:"make",a:["was made"],m:["by my sister"],t:"passive",e:"by ～があるので受け身。文全体が過去(was delicious) → was made"},
{s:"The boy who {} soccer since he was six is on the school team.",v:"play",a:["has played"],m:["since he was six"],t:"perfect",e:"since ～があるので現在完了 → has played"},
{s:"English is a language which {} in many countries.",v:"speak",a:["is spoken"],m:["in many countries"],t:"passive",e:"in ～(～で)から「話されている」という受け身。主語 a language は単数 → is spoken"},
{s:"The students who {} as members of the team practiced hard yesterday.",v:"choose",a:["were chosen"],m:["as members of the team","yesterday"],t:"passive",e:"「選ばれた」という受け身。yesterday は過去 → were chosen"},
{s:"This is the best book that I have ever {}.",v:"read",a:["read"],m:["ever","have"],t:"perfect",e:"have ever ～ は現在完了(経験)。read の過去分詞は read(つづりは同じ)"},
{s:"The stamps which {} by my brother for five years are in this box.",v:"collect",a:["have been collected"],m:["by my brother","for five years"],t:"both",e:"by ～で受け身、for five years で現在完了 → 現在完了の受け身 have been collected(★難)"},
{s:"The window which {} by Ken last week has been repaired.",v:"break",a:["was broken"],m:["by Ken","last week"],t:"passive",e:"by Ken があるので受け身。last week(先週)は過去 → was broken"},
{s:"The friend that I {} in Tokyo last year lives in Osaka now.",v:"meet",a:["met"],m:["last year"],t:"past",e:"last year(去年)ははっきりした過去なので、現在完了ではなく過去形 → met(★ひっかけ)"},
{s:"My teacher is a person who {} by all students.",v:"respect",a:["is respected"],m:["by all students"],t:"passive",e:"by ～があるので受け身 → is respected"},
{s:"The letter that I {} for since this morning finally came.",v:"wait",a:["have waited"],m:["since this morning"],t:"perfect",e:"since this morning があるので現在完了 → have waited"},
{s:"The girl that I {} for ten years moved to Osaka.",v:"know",a:["have known"],m:["for ten years"],t:"perfect",e:"for ten years があるので現在完了 → have known"}
];
// REORDER_JA: j=日本語 w=語群 a=正解
var REORDER_JA=[
{j:"私が10年間使っているかばんは古いです。",w:"the bag which I have used for ten years is old",a:"The bag which I have used for ten years is old."},
{j:"これは世界中で読まれている本です。",w:"this is a book which is read all over the world",a:"This is a book which is read all over the world."},
{j:"私が今まで食べた中で一番おいしい料理はカレーです。",w:"the best dish that I have ever eaten is curry",a:"The best dish that I have ever eaten is curry."},
{j:"ケンによって書かれた手紙は机の上にあります。",w:"the letter which was written by Ken is on the desk",a:"The letter which was written by Ken is on the desk."},
{j:"私には、5年間沖縄に住んでいる友達がいます。",w:"I have a friend who has lived in Okinawa for five years",a:"I have a friend who has lived in Okinawa for five years."},
{j:"昨日開かれたパーティーは楽しかったです。",w:"the party which was held yesterday was fun",a:"The party which was held yesterday was fun."},
{j:"私が昨日会った男の子は、私の弟の友達です。",w:"the boy I met yesterday is my brother's friend",a:"The boy I met yesterday is my brother's friend."},
{j:"私は多くの人に愛されている歌が好きです。",w:"I like songs which are loved by many people",a:"I like songs which are loved by many people."},
{j:"これはイタリアで作られたかばんです。",w:"this is a bag which was made in Italy",a:"This is a bag which was made in Italy."},
{j:"私が去年から知っている先生は、数学を教えています。",w:"the teacher that I have known since last year teaches math",a:"The teacher that I have known since last year teaches math."},
{j:"ここは多くの人に訪れられている公園です。",w:"this is a park which is visited by many people",a:"This is a park which is visited by many people."},
{j:"私がちょうど読み終えた本は、とてもおもしろかったです。",w:"the book that I have just finished reading was very interesting",a:"The book that I have just finished reading was very interesting."},
{j:"英語は多くの国で話されている言語です。",w:"English is a language which is spoken in many countries",a:"English is a language which is spoken in many countries."},
{j:"私がまだ訪れたことのない町は北海道にあります。",w:"the town which I have never visited is in Hokkaido",a:"The town which I have never visited is in Hokkaido."}
];
// REORDER: w=語群 a=正解(日本語なし)
var REORDER=[
{w:"the man who was invited to the party is my uncle",a:"The man who was invited to the party is my uncle."},
{w:"the song which I have listened to many times is my favorite",a:"The song which I have listened to many times is my favorite."},
{w:"this is the town that my grandmother has lived in for many years",a:"This is the town that my grandmother has lived in for many years."},
{w:"the book which was written by Natsume Soseki is loved by many people",a:"The book which was written by Natsume Soseki is loved by many people."},
{w:"the students who have studied English for three years can speak it well",a:"The students who have studied English for three years can speak it well."},
{w:"I want to see the movie which has been talked about at school",a:"I want to see the movie which has been talked about at school."},
{w:"the cake that my mother made for me was delicious",a:"The cake that my mother made for me was delicious."},
{w:"the picture which was taken by my sister has won a prize",a:"The picture which was taken by my sister has won a prize."},
{w:"she is the teacher that everyone has respected for many years",a:"She is the teacher that everyone has respected for many years."},
{w:"the festival which is held in this town every summer is very famous",a:"The festival which is held in this town every summer is very famous."},
{w:"the boy who has been practicing the piano since morning is Ken",a:"The boy who has been practicing the piano since morning is Ken."},
{w:"this is the best restaurant that I have ever been to",a:"This is the best restaurant that I have ever been to."}
];
// TRANSLATE: j=日本語 h=ヒント a=正解(「(that|which)」のように書くと、どちらも正解になる) m=解説
var TRANSLATE=[
{j:"これは私が今まで読んだ中で一番おもしろい本です。",h:"interesting / 関係代名詞 that",a:"This is the most interesting book (that|which) I have ever read.",m:"ever があるので現在完了(have ever read)。最上級の先行詞には that がよく使われます。"},
{j:"私には、5年間京都に住んでいる友達がいます。",h:"関係代名詞 who",a:"I have a friend (who|that) has lived in Kyoto for five years.",m:"for five years → 現在完了。主格の who の後ろは動詞(has lived)です。"},
{j:"これは多くの人に愛されているアニメです。",h:"関係代名詞 which",a:"This is an anime (which|that) is loved by many people.",m:"「愛されている」は受け身(is loved)。主格なので which の後ろにすぐ動詞が来ます。"},
{j:"昨年建てられた学校は新しいです。",h:"build:建てる",a:"The school (which|that) was built last year is new.",m:"「建てられた」は受け身(was built)。last year は過去。"},
{j:"これは私が3回見たことがある映画です。",h:"関係代名詞 that",a:"This is the movie (that|which) I have seen three times.",m:"three times → 現在完了(経験)。目的格なので that の後ろは I have seen(主語＋動詞)。"},
{j:"彼女は日本中で知られている歌手です。",h:"関係代名詞 who",a:"She is a singer (who|that) is known all over Japan.",m:"「知られている」は受け身(is known)。"},
{j:"先生が私たちに見せてくれた写真は、京都で撮られました。",h:"関係代名詞 which",a:"The picture (which|that) our teacher showed us was taken in Kyoto.",m:"目的格(our teacher showed us)の後ろに、主文の受け身 was taken が続きます。"},
{j:"私は、子供のころからずっとピアノを習っている少年を知っています。",h:"関係代名詞 who",a:"I know a boy (who|that) has learned the piano since he was a child.",m:"since ～ → 現在完了(has learned)。(has played でも○)"},
{j:"これは日本製のカメラです。",h:"関係代名詞 which / make",a:"This is a camera (which|that) was made in Japan.",m:"「作られた」は受け身(was made)。"},
{j:"ここは100年前に建てられたお寺です。",h:"temple / 関係代名詞 which",a:"This is a temple (which|that) was built (100|one hundred) years ago.",m:"「建てられた」は受け身。ago があるので過去形(was built)。"}
];
