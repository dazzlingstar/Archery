var gameData = [
    {"id":"1","word":"along","tone":"饿狼","txt":"饿狼沿着羊的脚印往前找。","rubric":"o","redtxt":"沿着"},
    {"id":"2","word":"against","tone":"额干死他","txt":"他要是敢反对，额就干死他。","rubric":"i","redtxt":"反对"},
    {"id":"3","word":"awake","tone":"饿胃渴","txt":"胃渴了,就醒来喝水。","rubric":"a","redtxt":"醒来"},
    {"id":"4","word":"approach","tone":"鹅扑肉吃","txt":"鹅靠近肉，扑到上面去吃。","rubric":"o","redtxt":"靠近"},
    {"id":"5","word":"ambulance","tone":"俺不能死","txt":"快叫救护车，因为我不能死。","rubric":"u","redtxt":"救护车"},
    {"id":"6","word":"accompany","tone":"俺come陪你","txt":"小妹妹一个人很无聊吗？那俺来陪你吧。","rubric":"o","redtxt":"陪"},
    {"id":"7","word":"compare","tone":"看牌啊","txt":"比比谁牌大。","rubric":"a","redtxt":"比比"},
    {"id":"8","word":"cough","tone":"口服","txt":"咳嗽了，要喝止咳糖浆，口服的。","rubric":"u","redtxt":"咳嗽"},
    {"id":"9","word":"couple","tone":"开炮","txt":"那一对夫妇又开炮了。","rubric":"u","redtxt":"夫妇"},
    {"id":"10","word":"parking","tone":"趴停","txt":"小汽车终于可以趴这儿停（车）会儿了","rubric":"k","redtxt":"停（车）"},
    {"id":"11","word":"dad","tone":"呆的","txt":"爸爸比我呆。","rubric":"a","redtxt":"爸爸"},
    {"id":"12","word":"dormitory","tone":"倒霉催","txt":"这真是倒霉催的宿舍。","rubric":"m","redtxt":"宿舍"},
    {"id":"13","word":"fiction","tone":"非可信","txt":"小说都是虚构的，不可相信。","rubric":"c","redtxt":"小说"},
    {"id":"14","word":"fly","tone":"福来","txt":"福是飞来的。","rubric":"l","redtxt":"飞"},
    {"id":"15","word":"gossip","tone":"搞事婆","txt":"整天没事可干的妇女，喜欢到处散播小道消息，真是搞事婆。","rubric":"o","redtxt":"小道消息"},
    {"id":"16","word":"jeans","tone":"紧死 ","txt":"牛仔裤紧死。","rubric":"a","redtxt":"牛仔裤"},
    {"id":"17","word":"knowledge","tone":"脑力值","txt":"脑力值越大，知识越多。","rubric":"o","redtxt":"知识"},
    {"id":"18","word":"lay","tone":"累","txt":"母鸡生不出蛋，好心累啊。","rubric":"a","redtxt":"生"},
    {"id":"19","word":"layer","tone":"累啊","txt":"这个产品的包装真复杂，拆了一层又一层的，累啊。","rubric":"y","redtxt":"层"},
    {"id":"20","word":"mask","tone":"马赛克","txt":"马赛克图案的面具。","rubric":"a","redtxt":"面具。"},
    {"id":"21","word":"metting","tone":"没听","txt":"会议太无聊了，根本没人听。","rubric":"t","redtxt":"会议"},
    {"id":"22","word":"sofa","tone":"舒服","txt":"躺在沙发很舒服。","rubric":"o","redtxt":"沙发"},
    {"id":"23","word":"panda","tone":"胖的","txt":"熊猫是胖的。","rubric":"n","redtxt":"熊猫"},
    {"id":"24","word":"tired","tone":"太二","txt":"就我一个人干活，好累，我太二了~","rubric":"r","redtxt":"累"},
    {"id":"25","word":"title","tone":"抬头","txt":"抬头才看得见标题，看得见冠军。","rubric":"t","redtxt":"标题"},
    {"id":"26","word":"whale","tone":"围殴","txt":"看，一只鲸鱼被围殴了！","rubric":"a","redtxt":"鲸鱼"},
    {"id":"27","word":"plunge","tone":"扑浪去","txt":"跳入水中去扑浪去。","rubric":"u","redtxt":"跳入水中"},
    {"id":"28","word":"powerful","tone":"怕我否","txt":"看我强有力的肌肉，怕我不？","rubric":"w","redtxt":"强有力的"},
    {"id":"29","word":"queen","tone":"困","txt":"王后被困宫中。","rubric":"u","redtxt":"王后"},
    {"id":"30","word":"run","tone":"软了","txt":"跑了一千米后，我完全瘫软了。","rubric":"u","redtxt":"跑"},
    {"id":"31","word":"silence","tone":"腮冷死","txt":"他的腮冷死了，只能安静不说话了。","rubric":"e","redtxt":"安静"},
    {"id":"32","word":"speech","tone":"撕碧池","txt":"我想呼吁大家要敢于撕碧池！","rubric":"p","redtxt":"呼吁"},
    {"id":"33","word":"strong","tone":"死壮","txt":"这人太强壮了。","rubric":"r","redtxt":"强壮"},
    {"id":"34","word":"long","tone":"龙","txt":"龙都是很长的。","rubric":"o","redtxt":"长"},
    {"id":"35","word":"nice","tone":"耐撕","txt":"好孩子都是很“耐撕”的，因为他们懂得忍让。","rubric":"i","redtxt":"好"},
    {"id":"36","word":"shy","tone":"晒","txt":"你脸红是害羞还是因为晒得？","rubric":"h","redtxt":"害羞"},
    {"id":"37","word":"bend","tone":"笨的","txt":"弯曲头发什么的看来笨笨的~","rubric":"e","redtxt":"弯曲"},
    {"id":"38","word":"sausage","tone":"杀死鸡","txt":"杀死鸡做的鸡肉香肠将我的嘴巴吃成了香肠嘴。","rubric":"u","redtxt":"香肠"},
    {"id":"39","word":"blow","tone":"不漏","txt":"这个气球竟然吹不漏。","rubric":"o","redtxt":"吹"},
    {"id":"40","word":"coach","tone":"口吃","txt":"这个教练有口吃。","rubric":"a","redtxt":"教练"},
    {"id":"41","word":"gun","tone":"杆","txt":"一杆枪。","rubric":"u","redtxt":"枪"},
    {"id":"42","word":"bond","tone":"绑的","txt":"我们之间是实打实的绑的","rubric":"o","redtxt":"绑"},
    {"id":"43","word":"survivor","tone":"射歪我了","txt":"我有幸生还了，因为箭射歪了~","rubric":"u","redtxt":"生还"},
    {"id":"44","word":"happy","tone":"嗨皮","txt":"我是皮，我好嗨森（开心）！","rubric":"a","redtxt":"嗨森（开心）"},
    {"id":"45","word":"noise","tone":"闹死","txt":"他睡觉打呼噜的噪音真是闹死了~","rubric":"o","redtxt":"噪音"},
    {"id":"46","word":"past","tone":"拍死它","txt":"看到害虫就拍死它！","rubric":"a","redtxt":"害虫"},
    {"id":"47","word":"admire","tone":"额的妈呀","txt":"额的妈呀，真羡慕这对小情侣。","rubric":"m","redtxt":"羡慕"},
    {"id":"48","word":"pet","tone":"陪她","txt":"要陪她，她是宠物。","rubric":"e","redtxt":"宠物"},
    {"id":"49","word":"pour","tone":"泼","txt":"水要慢慢倒，不要泼。","rubric":"u","redtxt":"倒"},
    {"id":"50","word":"roast","tone":"肉咝的","txt":"烤肉的时候，肉丝都会发出咝咝的声音。","rubric":"o","redtxt":"烤"}

];
var resulttxt=[
    "我默默捂住我的小眼睛，拜托少侠你瞅准了再射一次...",
    "恭喜！轻松拿下首射！",
    "“箭”入佳境，但你要冷静！",
    "嘿嘿嘿，加油啊，前方高能呢→",
    "恭喜！让你的箭再飞一会儿，还能再射两个呢~",
    "嗯，射的准的人颜值通常不会太低！",
    "注意！请拉好小扶手，老司机要开始飙车了！",
    "少年，你这么厉害，咋不去拍速度和激情8呢",
    "天啦噜，这么变态的挑战你竟然到了8级，简直6得飞起！",
    "-终于找到你！你就是传说中人箭合一的“神射手”吧！",
    "给你跪了！请接收来自四面八方的膜拜！"
];

