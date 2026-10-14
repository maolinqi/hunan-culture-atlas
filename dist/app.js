(() => {
  'use strict';
  const $ = id => document.getElementById(id);
  const TAU = Math.PI * 2;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const sources = [
    {id:'academy',title:'岳麓书院 · 书院简介',org:'湖南大学岳麓书院',url:'https://ylsy.hnu.edu.cn/sygk.htm',note:'书院、朱熹、张栻、朱张会讲、湖南大学及经世致用的联系。'},
    {id:'tower',title:'岳阳楼 · 历史寻迹',org:'湖南省人民政府',url:'https://www.hunan.gov.cn/hnszf/c101480/202108/t20210830_20411802.html',note:'范仲淹与《岳阳楼记》、岳阳楼。'},
    {id:'lake',title:'《岳阳楼志》概述',org:'湖南省地方志编纂院',url:'https://dfz.hunan.gov.cn/dfz/dqsj/202211/t20221122_29134400.html',note:'岳阳楼与洞庭湖的地理联系。'},
    {id:'phoenix',title:'湖南凤凰',org:'湖南省自然资源厅',url:'https://zrzyt.hunan.gov.cn/zrzyt/xxgk/qtxx/sxfc/201703/t20170328_4166474.html',note:'沈从文故里与湘西地域文化。'},
    {id:'river',title:'还母亲河沱江清净',org:'湖南省生态环境厅',url:'https://sthjt.hunan.gov.cn/xxgk/xwdt/szxw/201801/t20180108_4921341.html',note:'凤凰古城与沱江。'},
    {id:'border',title:'“边城”归原乡，真迹慰乡愁',org:'湖南省人民政府',url:'https://www.hunan.gov.cn/hnszf/hnyw/szdt/202605/t20260502_33969228.html',note:'沈从文、《边城》与茶峒；茶峒并非凤凰古城。'},
    {id:'dance',title:'土家族摆手舞',org:'中国非物质文化遗产网',url:'https://www.ihchina.cn/project_details/12922.html',note:'土家族、摆手舞、湘西龙山的联系。'},
    {id:'silver',title:'苗族银饰锻制技艺',org:'中国非物质文化遗产网',url:'https://www.ihchina.cn/art/detail/id/14330.html',note:'苗族银饰与凤凰县。'},
    {id:'embroidery',title:'湘绣',org:'中国非物质文化遗产网',url:'https://www.ihchina.cn/project_details/13982.html',note:'湘绣传统产区与长沙。'},
    {id:'porcelain',title:'醴陵釉下五彩瓷烧制技艺',org:'中国非物质文化遗产网',url:'https://www.ihchina.cn/art/detail/id/14451.html',note:'醴陵与釉下五彩瓷。'},
    {id:'brocade',title:'土家织锦与西兰卡普',org:'中国丝绸博物馆 · 工作报告',url:'https://www.chinasilkmuseum.com/uploadfiles/2021/01/20210119142314806.pdf',note:'土家织锦别称西兰卡普；湘西龙山的织造传统。'},
    {id:'dragon',title:'汨罗屈子文化园 · 满园楚韵始流芳',org:'湖南省文化和旅游厅',url:'https://whhlyt.hunan.gov.cn/news/sxxw/201901/t20190102_5377593.html',note:'汨罗江畔的屈原纪念、端午与龙舟习俗。'},
    {id:'island',title:'橘子洲风景区',org:'湖南省人民政府',url:'https://www.hunan.gov.cn/hnszf/c101474/202108/t20210827_20403826.html',note:'湘江、橘子洲与长沙的文化地理。'},
    {id:'tea',title:'安化黑茶与千两茶',org:'湖南省人民政府',url:'https://www.hunan.gov.cn/jxxx/hxwh/cls/201302/t20130218_4874915.html',note:'安化黑茶、千两茶及茶叶商贸背景。'},
    {id:'silk',title:'50年，“马王堆”从历史走向生活',org:'湖南省人民政府',url:'https://www.hunan.gov.cn/hnszf/hnyw/zwdt/202408/t20240818_33433708.html',note:'马王堆、辛追、素纱襌衣与湖南博物院。'},
    {id:'tomb',title:'马王堆汉墓辛追',org:'湖南省文物局',url:'https://wwj.hunan.gov.cn/wwj/c100310/c100313/202405/t20240517_33305313.html',note:'辛追与马王堆汉墓。'},
    {id:'d3',title:'D3 · Force simulations / Zoom',org:'D3 官方文档',url:'https://d3js.org/d3-force',note:'力布局、碰撞避让、图谱平移与缩放的实现参考。',visual:true},
    {id:'sigma',title:'Sigma.js · Rendering',org:'Sigma.js 官方文档',url:'https://www.sigmajs.org/concepts/rendering/',note:'大图谱的 WebGL 分层渲染；本原型采用原生 Canvas 与 DOM。',visual:true},
    {id:'particles',title:'Interactive Particles with Three.js',org:'Codrops · Bruno Imbrizi',url:'https://tympanus.net/codrops/2019/01/17/interactive-particles-with-three-js/',note:'粒子层次、指针扰动与平滑回落的设计参考。',visual:true},
    {id:'bloom',title:'Three.js · UnrealBloomPass',org:'Three.js 官方文档',url:'https://threejs.org/docs/pages/UnrealBloomPass.html',note:'局部辉光与光能层次；本原型用 Canvas 径向渐变和叠加绘制。',visual:true},
    {id:'motion',title:'prefers-reduced-motion',org:'MDN Web Docs',url:'https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@media/prefers-reduced-motion',note:'尊重系统减少动态效果偏好。',visual:true},
    {id:'zoom',title:'D3 · Zoom',org:'D3 官方文档',url:'https://d3js.org/d3-zoom',note:'平移、缩放与缩放中心的交互参考。',visual:true},
    {id:'bundling',title:'Hierarchical edge bundling',org:'D3 · Mike Bostock',url:'https://observablehq.com/@d3/hierarchical-edge-bundling',note:'大量连线时的曲线束参考；本原型采用独立曲线，未使用束化算法。',visual:true},
    {id:'kumu',title:'Focus',org:'Kumu 官方文档',url:'https://docs.kumu.io/guides/focus',note:'选择局部元素、弱化其他部分的探索方法参考。',visual:true}
  ];
  const sourceMap = new Map(sources.map(s => [s.id,s]));
  const groups = [
    {id:'land',name:'山水胜境',english:'LANDSCAPE',symbol:'⌁',x:-305,y:-182,color:'#9fbda9',desc:'江、湖、山与古城，在湖湘文化中构成可阅读的地理坐标。',items:[
      ['yuelu','岳麓山','Yuelu Mountain',-408,-285,'山岳','长沙的文化地标，与岳麓书院构成相连的山水与学术空间。','academy'],
      ['xiang','湘江','Xiang River',-238,-333,'河流','贯穿湖湘地域叙事的河流，橘子洲位于长沙湘江之中。','island'],
      ['dongting','洞庭湖','Dongting Lake',-496,-137,'湖泊','岳阳楼所临的湖泊，是古典文学中重要的山水意象。','lake'],
      ['tower','岳阳楼','Yueyang Tower',-195,-203,'古建筑','洞庭湖畔的名楼，与范仲淹的《岳阳楼记》紧密相连。','tower'],
      ['orange','橘子洲','Orange Isle',-386,-77,'洲岛','长沙湘江中的洲岛，也是湖湘诗词与地方记忆的坐标。','island'],
      ['tuo','沱江','Tuo River',-523,-278,'河流','凤凰古城的母亲河，沿江建筑与生活构成古城的重要景观。','river'],
      ['phoenix','凤凰古城','Fenghuang',-536,-32,'古城','湘西文化古城、沈从文故里；这里的沱江连起古城与日常生活。','phoenix']
    ]},
    {id:'academy',name:'书院文脉',english:'ACADEMIC HERITAGE',symbol:'⌑',x:30,y:-252,color:'#c7c29e',desc:'以岳麓书院为线索，连接学者、会讲传统与延续至今的教育文脉。',items:[
      ['yueluacademy','岳麓书院','Yuelu Academy',-72,-356,'书院','创建于北宋。朱熹与张栻在此论学，形成“朱张会讲”；书院的教育传统延续至湖南大学。','academy'],
      ['zhuxi','朱熹','Zhu Xi',53,-389,'人物','南宋学者，自福建来访，与张栻在岳麓书院切磋学问。','academy'],
      ['zhangshi','张栻','Zhang Shi',173,-332,'人物','南宋学者，主持岳麓书院教事，与朱熹留下“朱张会讲”的佳话。','academy'],
      ['lecture','朱张会讲','Zhu–Zhang Dialogue',169,-187,'历史事件','朱熹与张栻在岳麓书院论学的历史事件，是书院会讲传统的重要标志。','academy'],
      ['hnu','湖南大学','Hunan University',-80,-185,'教育机构','岳麓书院至湖南大学的历史演变，体现传统书院与现代大学教育的衔接。','academy'],
      ['wang','王夫之','Wang Fuzhi',-92,-272,'人物','湖湘思想史上的重要学者，被岳麓书院简介列入其文脉人物。','academy'],
      ['practice','经世致用','Practical Learning',66,-136,'思想','岳麓书院所传承的治学精神之一，强调学问与社会实践的联系。','academy']
    ]},
    {id:'literature',name:'诗词风骨',english:'LITERATURE',symbol:'〃',x:331,y:-91,color:'#b9c5b6',desc:'从岳阳楼的忧乐到湘西的文学原乡，以作品连接作者与地方。',items:[
      ['fan','范仲淹','Fan Zhongyan',303,-259,'人物','北宋文学家，《岳阳楼记》的作者；作品因重修岳阳楼而受邀创作。','tower'],
      ['toweressay','岳阳楼记','Record of Yueyang Tower',447,-208,'文学作品','范仲淹所作名篇，因岳阳楼而写，建立起楼、湖与文学的联系。','tower'],
      ['shen','沈从文','Shen Congwen',483,-60,'人物','出生于凤凰的文学家，《边城》的作者。','phoenix'],
      ['border','边城','Border Town',414,57,'文学作品','沈从文的小说，其文学原型地为茶峒（今边城镇）。','border'],
      ['chadong','茶峒','Chadong',555,71,'文学地理','位于湘渝黔交界的古镇，《边城》的原型地。','border'],
      ['qu','屈原','Qu Yuan',224,42,'人物','与汨罗江畔端午纪念传统紧密相连的诗人。','dragon'],
      ['miluo','汨罗江','Miluo River',553,-117,'河流','承载屈原纪念与端午龙舟习俗的地方文化空间。','dragon']
    ]},
    {id:'folk',name:'湘西民俗',english:'FOLK TRADITIONS',symbol:'⋈',x:292,y:238,color:'#b7b59b',desc:'舞蹈、服饰与节庆是活态文化的线索。此处也纳入汨罗端午作为跨主题示例。',items:[
      ['tujia','土家族','Tujia People',446,174,'民族文化','摆手舞与土家织锦是土家族文化的代表性表达。','dance'],
      ['dance','摆手舞','Baishou Dance',222,163,'传统舞蹈','土家族传统舞蹈，主要流传于湘西龙山、保靖、永顺等地。','dance'],
      ['miao','苗族','Miao People',523,288,'民族文化','苗族银饰及其手工锻制技艺构成丰富的传统装饰文化。','silver'],
      ['silver','苗族银饰','Miao Silverwork',414,372,'传统技艺','以手工完成的银饰锻制技艺，湖南凤凰县是项目申报地之一。','silver'],
      ['longshan','龙山县','Longshan',250,392,'地域','湖南湘西地域，摆手舞与土家织锦在此传承。','dance'],
      ['fenghuangcounty','凤凰县','Fenghuang County',120,309,'地域','苗族银饰锻制技艺的国家级非遗项目申报地之一。','silver'],
      ['dragonboat','端午龙舟','Dragon Boat Tradition',98,168,'节庆民俗','汨罗江畔端午习俗中的龙舟竞渡，承载当地对屈原的纪念。','dragon']
    ]},
    {id:'craft',name:'湖湘匠艺',english:'CRAFT & MATERIAL',symbol:'◇',x:-78,y:264,color:'#a8c2b6',desc:'以针线、泥土、织造与丝绸为材料，连接湖湘的技艺与器物。',items:[
      ['embroidery','湘绣','Xiang Embroidery',-112,396,'传统美术','湖南传统刺绣，传统产区主要分布于长沙及其所辖地域。','embroidery'],
      ['changsha','长沙','Changsha',-230,213,'城市','湘绣传统产区，也是岳麓书院、橘子洲与马王堆汉墓所在的城市。','embroidery'],
      ['liling','醴陵','Liling',45,381,'城市','醴陵釉下五彩瓷烧制技艺的代表地域。','porcelain'],
      ['porcelain','釉下五彩瓷','Underglaze Porcelain',-252,361,'传统技艺','醴陵特色瓷器与烧制技艺，体现釉下彩的材料与工艺传统。','porcelain'],
      ['brocade','土家织锦','Tujia Brocade',-9,171,'传统技艺','土家族传统织锦，也称西兰卡普。','brocade'],
      ['xilankapu','西兰卡普','Xilankapu',-138,146,'织锦名称','土家织锦的名称之一，连接织造、纹样与生活习俗。','brocade'],
      ['gauze','素纱襌衣','Gauze Gown',-347,314,'出土文物','马王堆汉墓出土的丝织衣物，是早期丝织工艺的重要文化实物。','silk']
    ]},
    {id:'memory',name:'风物记忆',english:'OBJECTS & MEMORY',symbol:'◒',x:-356,y:118,color:'#b6bd9a',desc:'从安化茶叶到马王堆文物，以地方风物与器物读湖南。',items:[
      ['anhua','安化','Anhua',-503,186,'地域','湖南茶乡，与安化黑茶的产地和商贸传统相连。','tea'],
      ['tea','安化黑茶','Anhua Dark Tea',-503,335,'地方物产','湖南安化的代表性茶类，千两茶是相关代表产品。','tea'],
      ['thousand','千两茶','Qianliang Tea',-345,424,'茶品','安化黑茶相关茶品，采用装篓、踩压、扎箍与干燥等加工工序。','tea'],
      ['tearoad','茶马古道','Tea Trade Routes',-614,72,'商贸意象','本示例以“茶马古道”作为茶叶历史商贸的主题意象；不在此主张某条具体路线。',null],
      ['mawangdui','马王堆汉墓','Mawangdui Tombs',-246,16,'考古遗址','西汉长沙国丞相利苍一家墓葬，出土辛追遗体及丰富文物。','tomb'],
      ['xinzhui','辛追','Lady Xin Zhui',-357,13,'历史人物','马王堆一号汉墓的墓主人，与汉代生活及丝织文物的展示相连。','tomb'],
      ['museum','湖南博物院','Hunan Museum',-619,268,'博物馆','展示马王堆汉墓文物与历史的文化机构。','silk']
    ]}
  ];
  const nodes = [{id:'root',name:'湖湘文化',english:'HUNAN CULTURE',kind:'root',type:'文化全景',desc:'山水、书院、文学、民俗、匠艺与风物，交织成湖南的文化星图。选择一个坐标，循着联系继续探索。',x:0,y:0,tx:0,ty:0,alpha:1,r:53,color:'#dbc490'}];
  const edges = [];
  groups.forEach((g,gi) => {
    nodes.push({...g,kind:'category',type:'文化主题',desc:g.desc,group:g.id,tx:0,ty:0,alpha:0,r:12,index:gi});
    edges.push({a:'root',b:g.id,label:'文化主题',editorial:true});
    g.items.forEach((row,i) => {
      const [id,name,english,x,y,type,desc,source] = row;
      nodes.push({id,name,english,x,y,type,desc,source,group:g.id,kind:'concept',tx:0,ty:0,alpha:0,r:3.6+(i%3)*.7,color:g.color,index:gi*7+i});
      edges.push({a:g.id,b:id,label:'主题归类',editorial:true});
    });
  });
  const factual = [
    ['yueluacademy','lecture','会讲发生地','academy'],['zhuxi','lecture','参与会讲','academy'],['zhangshi','lecture','参与会讲','academy'],
    ['zhangshi','yueluacademy','主持教事','academy'],['yueluacademy','hnu','教育沿革','academy'],['yueluacademy','practice','治学精神','academy'],
    ['wang','yueluacademy','书院文脉人物','academy'],['fan','toweressay','创作','tower'],['toweressay','tower','所记之楼','tower'],
    ['tower','dongting','临湖','lake'],['shen','border','创作','border'],['border','chadong','原型地','border'],
    ['shen','phoenix','故里','phoenix'],['phoenix','tuo','母亲河','river'],['orange','xiang','位于江中','island'],
    ['tujia','dance','传统舞蹈','dance'],['dance','longshan','流传于','dance'],['miao','silver','传统银饰','silver'],
    ['silver','fenghuangcounty','项目申报地','silver'],['embroidery','changsha','传统产区','embroidery'],['porcelain','liling','代表地域','porcelain'],
    ['brocade','xilankapu','又称','brocade'],['tujia','brocade','传统织锦','brocade'],['brocade','longshan','传承地域','brocade'],
    ['dragonboat','qu','纪念','dragon'],['dragonboat','miluo','民俗地域','dragon'],['tea','anhua','产地','tea'],
    ['thousand','tea','茶品关联','tea'],['mawangdui','gauze','出土文物','silk'],['mawangdui','xinzhui','一号墓墓主人','tomb'],
    ['museum','mawangdui','陈列主题','silk'],['gauze','museum','文物展示','silk']
  ];
  factual.forEach(([a,b,label,source]) => edges.push({a,b,label,source,editorial:false}));
  const nodeMap = new Map(nodes.map(n=>[n.id,n]));
  edges.forEach((e,i)=> {e.index=i;e.na=nodeMap.get(e.a);e.nb=nodeMap.get(e.b);e.offset=(i*.137)%1;e.bend=(e.editorial?.12:.18)*(i%2?1:-1);});
  let savedLanguage='zh';try{savedLanguage=localStorage.getItem('xiang-atlas-language')||'zh';}catch{}
  const state = {lang:savedLanguage==='en'?'en':'zh',layout:'atlas',selected:'root',hover:null,collapsed:new Set(),particles:!reduced.matches,flow:!reduced.matches,breathe:!reduced.matches,intensity:.6,panels:true,immersed:false,tour:false,drag:null,pointer:{x:-999,y:-999},time:0,paused:false};
  const I=window.ATLAS_I18N;
  const t=text=>state.lang==='en'?(I.ui[text]||text):text;
  const name=(n,full=false)=>state.lang==='zh'?n.name:(I.groupNames[n.id]||(full?n.english:I.shortNames[n.id])||n.english);
  const org=s=>state.lang==='zh'?s.org:(I.organisations[s.org]||s.org);
  const sourceTitle=s=>state.lang==='zh'?s.title:(I.sources[s.id]?.[0]||s.title);
  const sourceNote=s=>state.lang==='zh'?s.note:(I.sources[s.id]?.[1]||s.note);
  const cam = {x:0,y:0,z:.3,tx:0,ty:0,tz:1};
  let W=0,H=0,DPR=1,home={x:0,y:0,z:1},last=0,tourTimer=null,toastTimer=null,frameCount=0;
  const canvas=$('graph-canvas'),ctx=canvas.getContext('2d'),stage=$('stage');
  let seed=72;
  const rand=()=>{seed=(seed*1664525+1013904223)>>>0;return seed/4294967296;};
  const particles=Array.from({length:210},()=>({x:rand(),y:rand(),r:.3+rand()*1.1,s:.05+rand()*.1,phase:rand()*TAU,depth:.3+rand()*.7}));
  const dust=Array.from({length:270},()=>({angle:rand()*TAU,radius:80+rand()*125,phase:rand()*TAU,size:.25+rand()*.9,speed:.015+rand()*.045}));
  const ripples=[];
  const lerp=(a,b,t)=>a+(b-a)*t;
  const toScreen=(x,y)=>({x:cam.x+x*cam.z,y:cam.y+y*cam.z});
  const toWorld=(x,y)=>({x:(x-cam.x)/cam.z,y:(y-cam.y)/cam.z});
  const nodeRadius=n=>n.kind==='root'?53:n.kind==='category'?12:n.r;
  const escapeText=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

  nodes.forEach(n=>{
    const button=document.createElement('button');
    button.className='node '+n.kind;button.dataset.id=n.id;button.setAttribute('aria-label',n.name+(n.kind==='category'?'，点击聚焦，双击展开或收起':''));
    button.style.setProperty('--diameter',nodeRadius(n)*2+'px');button.style.setProperty('--node',n.color);
    const subtitle=n.kind==='root'?'<small class="root-sub">HUNAN CULTURE</small>':n.kind==='category'?`<small class="category-en">${n.english}</small>`:'';
    button.innerHTML=`<span class="node-hit"></span>${n.kind==='root'?'<span class="root-ornament"></span>':''}<span class="node-core"></span><span class="node-name">${n.name}${subtitle}</span>`;
    button.addEventListener('mouseenter',()=>{state.hover=n.id;refreshHighlight();});
    button.addEventListener('mouseleave',()=>{state.hover=null;refreshHighlight();});
    button.addEventListener('click',e=>{e.stopPropagation();if(state.drag?.moved)return;stopTour();selectNode(n.id);});
    button.addEventListener('dblclick',e=>{e.preventDefault();e.stopPropagation();if(n.kind==='category')toggleGroup(n.id);else if(n.kind==='root')resetView();});
    button.addEventListener('pointerdown',e=>{
      if(e.button!==0)return;
      e.stopPropagation();const p=toWorld(e.clientX-stage.getBoundingClientRect().left,e.clientY-stage.getBoundingClientRect().top);
      state.drag={node:n,startX:e.clientX,startY:e.clientY,offsetX:p.x-n.tx,offsetY:p.y-n.ty,moved:false};
      button.setPointerCapture(e.pointerId);
    });
    $('node-layer').append(button);n.el=button;
  });
  groups.forEach(g=>{
    const row=document.createElement('div');row.className='category-row';row.dataset.group=g.id;
    row.innerHTML=`<button class="category-select" data-id="${g.id}"><span class="category-symbol">${g.symbol}</span>${g.name}</button><button class="category-toggle" aria-label="收起${g.name}" title="收起${g.name}" aria-expanded="true">−</button>`;
    row.querySelector('.category-select').onclick=()=>{stopTour();selectNode(g.id);};
    row.querySelector('.category-toggle').onclick=()=>toggleGroup(g.id);
    $('categories').append(row);g.row=row;
  });
  $('edge-count').textContent=edges.length;
  function targets(){
    groups.forEach((g,gi)=>{
      const group=nodeMap.get(g.id);
      const angle=-Math.PI*.85+gi*TAU/6;
      if(state.layout==='atlas'){group.targetX=g.x;group.targetY=g.y;}
      else if(state.layout==='orbit'){group.targetX=Math.cos(angle)*230;group.targetY=Math.sin(angle)*230;}
      else {group.targetX=(gi%3-1)*355;group.targetY=gi<3?-150:165;}
      if(W>0&&W<=700){group.targetX*=.53;group.targetY*=.9;}
      group.targetAlpha=1;
      g.items.forEach((row,i)=>{
        const n=nodeMap.get(row[0]);
        if(state.collapsed.has(g.id)){n.targetX=group.targetX;n.targetY=group.targetY;n.targetAlpha=0;return;}
        n.targetAlpha=1;
        if(state.layout==='atlas'){n.targetX=n.x;n.targetY=n.y;}
        else if(state.layout==='orbit'){
          const a=angle+(i-3)*.14,r=375+(i%2)*90;
          n.targetX=Math.cos(a)*r;n.targetY=Math.sin(a)*r;
        }else{
          n.targetX=(gi%3-1)*355+((i%3)-1)*105;
          n.targetY=(gi<3?-150:165)+(gi<3?-1:1)*(80+Math.floor(i/3)*71);
        }
        if(W>0&&W<=700){n.targetX*=.53;n.targetY*=.9;}
      });
    });
    nodeMap.get('root').targetX=0;nodeMap.get('root').targetY=0;nodeMap.get('root').targetAlpha=1;
    updateCounts();
  }
  function updateCounts(){
    const shown=new Set(nodes.filter(n=>n.kind!=='concept'||!state.collapsed.has(n.group)).map(n=>n.id));
    $('node-count').textContent=shown.size;
    $('edge-count').textContent=edges.filter(e=>shown.has(e.a)&&shown.has(e.b)).length;
    groups.forEach(g=>{const closed=state.collapsed.has(g.id);g.row.classList.toggle('collapsed',closed);const b=g.row.querySelector('.category-toggle');b.textContent=closed?'+':'−';b.setAttribute('aria-expanded',!closed);const label=t(closed?'展开':'收起')+(state.lang==='en'?' ':'')+name(g);b.setAttribute('aria-label',label);b.title=label;});
    nodes.filter(n=>n.kind==='category').forEach(n=>{n.el.querySelector('.badge')?.remove();if(state.collapsed.has(n.id)){const badge=document.createElement('small');badge.className='badge';badge.textContent='+7';n.el.append(badge);}});
  }
  function toggleGroup(id){
    stopTour();if(state.collapsed.has(id))state.collapsed.delete(id);else state.collapsed.add(id);
    if(state.collapsed.has(id)&&nodeMap.get(state.selected)?.group===id)state.selected=id;
    targets();refreshHighlight();renderInspector();
    const n=nodeMap.get(id);ripple(n.tx,n.ty,110);toast(t(state.collapsed.has(id)?'收起':'展开')+' · '+name(n));
  }
  function refreshHighlight(){
    const active=state.hover || (state.selected!=='root'?state.selected:null);
    const connected=new Set(active?[active]:nodes.map(n=>n.id));
    if(active){edges.forEach(e=>{if(e.a===active)connected.add(e.b);if(e.b===active)connected.add(e.a);});connected.add('root');}
    state.active=active;state.connected=connected;
    nodes.forEach(n=>{n.el.classList.toggle('dimmed',!connected.has(n.id));n.el.classList.toggle('selected',state.selected===n.id&&n.id!=='root');n.el.setAttribute('aria-pressed',state.selected===n.id);});
    groups.forEach(g=>g.row.classList.toggle('active',state.selected===g.id || nodeMap.get(state.selected)?.group===g.id));
  }
  function fitHome(){
    const mobile=W<=700,immersed=state.immersed;
    const left=immersed?30:mobile?20:W<1150?176:205;
    const right=immersed?30:mobile?20:state.panels?(W<1150?264:313):45;
    const top=mobile?70:66,bottom=mobile?46:48;
    home={x:left+(W-left-right)/2+(mobile?12:32),y:top+(H-top-bottom)/2-12,z:Math.min((W-left-right)/(mobile?750:1300),(H-top-bottom)/(mobile?1000:870),1.2)};
    home.z=Math.max(.23,home.z);
    return home;
  }
  function resize(){
    const r=stage.getBoundingClientRect();W=r.width;H=r.height;DPR=Math.min(devicePixelRatio||1,2);
    canvas.width=Math.round(W*DPR);canvas.height=Math.round(H*DPR);
    targets();fitHome();if(!state.drag){cam.tx=home.x;cam.ty=home.y;cam.tz=home.z;}
  }
  function resetView(){
    stopTour();state.selected='root';state.hover=null;nodes.forEach(n=>delete n.pinned);
    targets();fitHome();cam.tx=home.x;cam.ty=home.y;cam.tz=home.z;
    refreshHighlight();renderInspector();$('focus-caption').hidden=true;
  }
  function selectNode(id,{focus=true}={}){
    const n=nodeMap.get(id);if(!n)return;
    if(n.kind==='concept'&&state.collapsed.has(n.group)){state.collapsed.delete(n.group);targets();}
    state.selected=id;state.hover=null;refreshHighlight();renderInspector();
    if(W<=700){$('inspector').hidden=false;state.panels=true;$('reopen-inspector').hidden=true;}
    if(id==='root'){fitHome();cam.tx=home.x;cam.ty=home.y;cam.tz=home.z;$('focus-caption').hidden=true;return;}
    if(focus){fitHome();const z=Math.min(home.z*(W<=700?1.3:1.25),1.12);cam.tz=z;cam.tx=home.x-n.targetX*z*.56;cam.ty=home.y-n.targetY*z*.56;}
    ripple(n.tx,n.ty,95);
    $('focus-caption').hidden=false;$('focus-caption').textContent=t('正在探索 · ')+name(n);
  }
  const landscape=`<svg viewBox="0 0 260 110" fill="none" aria-hidden="true"><defs><linearGradient id="mount" x1="0" y1="0" x2="260" y2="100"><stop stop-color="#98af9f" stop-opacity=".12"/><stop offset=".5" stop-color="#c4ba85" stop-opacity=".8"/><stop offset="1" stop-color="#a5b194" stop-opacity=".15"/></linearGradient></defs><path d="M0 77L23 66 38 70 65 29 81 57 94 46 127 73 147 67 164 40 179 65 206 18 225 55 260 77" stroke="url(#mount)" stroke-width=".8"/><path d="M0 90L39 75 64 86 91 70 128 89 159 80 203 70 260 90M10 100Q71 84 122 100T252 96" stroke="#aeb58d" opacity=".16"/><path d="M40 76l25-47 6 49m16-17 7-15 23 32m73-10 16-50 13 56" stroke="#b0b795" opacity=".2" stroke-width=".5"/><circle cx="135" cy="23" r="9" stroke="#c5b27c" opacity=".3" stroke-width=".5"/><path d="M145 97h85M10 103h49" stroke="#bdba89" opacity=".17"/><path d="M123 78h18v13h-18zM120 78l12-8 12 8M127 81v10m10-10v10" stroke="#aab393" opacity=".45" stroke-width=".7"/></svg>`;
  function renderInspector(){
    const n=nodeMap.get(state.selected);
    let rel=edges.filter(e=>e.a===n.id||e.b===n.id);
    if(n.kind!=='root')rel.sort((a,b)=>Number(a.editorial)-Number(b.editorial));
    const rows=rel.map(e=>{
      const other=nodeMap.get(e.a===n.id?e.b:e.a);
      return `<button class="relation-row" data-related="${other.id}" title="${e.editorial?t('示例主题编排'):(e.a===n.id?name(n)+' → '+name(other):name(other)+' → '+name(n))+' · '+t(e.label)}"><i></i><span>${name(other)}</span><small>${t(e.label)}</small><b class="relation-arrow">↗</b></button>`;
    }).join('');
    const src=sourceMap.get(n.source);
    const sourceHTML=src?`<a class="source-link" href="${src.url}" target="_blank" rel="noopener noreferrer">${org(src)} ↗<small>${t('查看文化资料来源')}</small></a>`:n.kind==='concept'?`<div class="source-link">${t('主题意象 · 示例编排')}</div>`:'';
    const branchText=state.lang==='en'?t(state.collapsed.has(n.id)?'展开':'收起')+' this branch':(state.collapsed.has(n.id)?'展开':'收起')+'这一分支';
    const desc=state.lang==='zh'?n.desc:I.descriptions[n.id];
    $('inspector-content').innerHTML=`<div class="focus-type">${t(n.type)}</div><h2 class="focus-title">${name(n,true)}</h2><div class="focus-english">${state.lang==='zh'?n.english:n.name}</div><p class="focus-description">${desc}</p><div class="focus-art">${landscape}</div><div class="focus-rule"></div><div class="relations-heading">${t(n.kind==='root'?'六方文化':'相连的坐标')}<small>${rel.length.toString().padStart(2,'0')} RELATIONS</small></div><div class="relations">${rows}</div>${sourceHTML}${n.kind==='category'?`<button class="branch-action" id="inspector-branch">${branchText} ${state.collapsed.has(n.id)?'＋':'−'}</button>`:''}<p class="inspector-note">${n.kind==='root'?t('42 个文化名词 · 6 个主题')+'<br>'+t('主题分组为示例编排，资料关联可追溯。'):t('实线连接主题归类，虚线连接资料关联。')+'<br>'+t('点击关联坐标，继续探索。')}</p>`;
    $('inspector-content').querySelectorAll('[data-related]').forEach(b=>b.onclick=()=>{stopTour();selectNode(b.dataset.related);});
    if($('inspector-branch'))$('inspector-branch').onclick=()=>toggleGroup(n.id);
  }
  function toast(message){$('toast').textContent=message;$('toast').classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>$('toast').classList.remove('show'),2200);}
  function ripple(x,y,r){if(state.breathe)ripples.push({x,y,r,age:0});}
  function drawGlow(x,y,r,color,alpha){
    const gradient=ctx.createRadialGradient(x,y,0,x,y,r);
    gradient.addColorStop(0,`rgba(${color},${alpha})`);gradient.addColorStop(.22,`rgba(${color},${alpha*.3})`);gradient.addColorStop(1,`rgba(${color},0)`);
    ctx.fillStyle=gradient;ctx.beginPath();ctx.arc(x,y,r,0,TAU);ctx.fill();
  }
  function curve(e){
    const a=toScreen(e.na.tx,e.na.ty),b=toScreen(e.nb.tx,e.nb.ty);
    const dx=b.x-a.x,dy=b.y-a.y;
    return {a,b,c:{x:(a.x+b.x)/2-dy*e.bend,y:(a.y+b.y)/2+dx*e.bend}};
  }
  function quadratic(a,c,b,t){const u=1-t;return{x:u*u*a.x+2*u*t*c.x+t*t*b.x,y:u*u*a.y+2*u*t*c.y+t*t*b.y};}
  function trace(c){ctx.beginPath();ctx.moveTo(c.a.x,c.a.y);ctx.quadraticCurveTo(c.c.x,c.c.y,c.b.x,c.b.y);}
  function drawAtmosphere(t){
    const center=toScreen(0,0);
    if(state.particles){
      ctx.globalCompositeOperation='screen';
      particles.forEach((p,i)=>{
        let x=p.x*W+Math.sin(t*p.s+p.phase)*18*state.intensity;
        let y=p.y*H+Math.cos(t*p.s*.65+p.phase)*25*state.intensity;
        const dx=x-state.pointer.x,dy=y-state.pointer.y,dist=Math.hypot(dx,dy);
        if(dist<90){x+=dx/Math.max(dist,1)*(90-dist)*.12;y+=dy/Math.max(dist,1)*(90-dist)*.12;}
        const alpha=(.12+.24*(.5+.5*Math.sin(t*.7+p.phase)))*p.depth;
        ctx.fillStyle=`rgba(186,192,160,${alpha})`;ctx.beginPath();ctx.arc(x,y,p.r,0,TAU);ctx.fill();
        if(i%31===0){ctx.strokeStyle=`rgba(195,196,159,${alpha*.5})`;ctx.lineWidth=.5;ctx.beginPath();ctx.moveTo(x-4,y);ctx.lineTo(x+4,y);ctx.moveTo(x,y-4);ctx.lineTo(x,y+4);ctx.stroke();}
      });
      ctx.globalCompositeOperation='source-over';
    }
    ctx.save();ctx.translate(center.x,center.y);ctx.scale(cam.z,cam.z);
    ctx.strokeStyle='rgba(170,180,145,.055)';ctx.lineWidth=.65/cam.z;
    for(let i=0;i<4;i++){
      ctx.save();ctx.rotate(-.37+i*.14);ctx.setLineDash([1.2,7]);ctx.beginPath();ctx.ellipse(0,0,225+i*100,175+i*99,0,0,TAU);ctx.stroke();ctx.restore();
    }
    ctx.setLineDash([]);
    for(let j=0;j<6;j++){
      ctx.strokeStyle=`rgba(151,170,146,${.017+j*.002})`;ctx.beginPath();
      for(let i=0;i<=120;i++){
        const a=i/120*TAU,r=240+j*35+Math.sin(a*3+j*.35+(state.breathe?t:0)*.015)*55;
        const x=Math.cos(a)*r,y=Math.sin(a)*r*.84;
        if(i===0)ctx.moveTo(x,y);else ctx.lineTo(x,y);
      }
      ctx.closePath();ctx.stroke();
    }
    ctx.restore();
    drawGlow(center.x,center.y,180,'132,141,104',.045);
  }
  function drawEdges(motionTime){
    edges.forEach(e=>{
      const alpha=Math.min(e.na.alpha,e.nb.alpha);if(alpha<.02)return;
      const active=state.active&&(e.a===state.active||e.b===state.active);
      const dim=state.active&&!active;
      const opacity=(active?.8:dim?.045:e.editorial?.25:.13)*alpha;
      const c=curve(e);e.curve=c;
      ctx.lineWidth=active?1.05:e.a==='root'?.75:.5;
      ctx.strokeStyle=`rgba(${active?'212,196,144':e.editorial?'163,170,131':'139,172,155'},${opacity})`;
      ctx.setLineDash(e.editorial?[]:[2,5]);trace(c);ctx.stroke();ctx.setLineDash([]);
      if(active&&!e.editorial){
        const p=quadratic(c.a,c.c,c.b,.84),p0=quadratic(c.a,c.c,c.b,.81),a=Math.atan2(p.y-p0.y,p.x-p0.x);
        ctx.fillStyle=`rgba(207,192,143,${alpha*.75})`;ctx.beginPath();ctx.moveTo(p.x,p.y);ctx.lineTo(p.x-Math.cos(a-.45)*5,p.y-Math.sin(a-.45)*5);ctx.lineTo(p.x-Math.cos(a+.45)*5,p.y-Math.sin(a+.45)*5);ctx.closePath();ctx.fill();
      }
      if(state.flow&&!dim){
        const v=(motionTime*(.038+e.index%4*.005)*(.55+state.intensity)+e.offset)%1;
        ctx.globalCompositeOperation='screen';
        for(let j=0;j<7;j++){
          const p=quadratic(c.a,c.c,c.b,(v-j*.005+1)%1);
          ctx.fillStyle=`rgba(${active?'238,218,161':'184,199,169'},${alpha*(active?.8:.32)*(1-j/7)*state.intensity})`;
          ctx.beginPath();ctx.arc(p.x,p.y,j===0?(active?1.65:1.05):.8,0,TAU);ctx.fill();
        }
        ctx.globalCompositeOperation='source-over';
      }
      if(active&&!e.editorial && !state.hover && W>700){
        const p=quadratic(c.a,c.c,c.b,.5);
        const label=t(e.label);ctx.font='9px "PingFang SC",sans-serif';const tw=ctx.measureText(label).width;
        ctx.fillStyle='rgba(10,19,21,.94)';ctx.fillRect(p.x-tw/2-6,p.y-8,tw+12,16);
        ctx.fillStyle=`rgba(182,191,152,${alpha*.9})`;ctx.textAlign='center';ctx.fillText(label,p.x,p.y+3);
      }
    });
  }
  function drawNodeAuras(t){
    nodes.forEach(n=>{
      if(n.alpha<.03||n.kind==='root')return;
      const p=toScreen(n.tx,n.ty);
      const active=state.connected.has(n.id);
      if(!active)return;
      const size=n.kind==='category'?36:16;
      drawGlow(p.x,p.y,size,'157,178,136',(.09+(state.breathe?Math.sin(t*.55+n.index)*.024:0))*n.alpha);
      if(n.id===state.selected||n.id===state.hover){
        ctx.strokeStyle='rgba(205,191,146,.3)';ctx.lineWidth=.6;ctx.beginPath();ctx.arc(p.x,p.y,n.kind==='category'?25:17,0,TAU);ctx.stroke();
      }
    });
    const p=toScreen(0,0),radius=W<=700?57:state.immersed?100:92;
    ctx.save();ctx.translate(p.x,p.y);
    ctx.strokeStyle='rgba(212,192,132,.26)';ctx.lineWidth=.7;
    ctx.save();ctx.rotate(state.breathe?t*.042:0);ctx.setLineDash([45,18,2,18]);ctx.beginPath();ctx.ellipse(0,0,radius,radius*.58,-.38,0,TAU);ctx.stroke();ctx.restore();
    ctx.save();ctx.rotate(state.breathe?-t*.025:0);ctx.strokeStyle='rgba(181,193,151,.14)';ctx.setLineDash([1,5]);ctx.beginPath();ctx.ellipse(0,0,radius*1.1,radius*.72,.4,0,TAU);ctx.stroke();ctx.restore();
    ctx.setLineDash([]);
    if(state.particles){
      ctx.globalCompositeOperation='screen';
      dust.forEach(d=>{
        const a=d.angle+t*d.speed*state.intensity;
        const r=d.radius*(.75+.12*Math.sin(a*3+d.phase));
        const x=Math.cos(a)*r,y=Math.sin(a)*r*.62;
        const alpha=.1+Math.pow(.5+.5*Math.sin(d.phase+t*.35),3)*.4;
        ctx.fillStyle=`rgba(218,199,139,${alpha})`;ctx.beginPath();ctx.arc(x,y,d.size,0,TAU);ctx.fill();
      });ctx.globalCompositeOperation='source-over';
    }
    ctx.restore();
    ripples.forEach(r=>{
      const p=toScreen(r.x,r.y),progress=r.age/1.6;
      if(progress>=1)return;
      ctx.strokeStyle=`rgba(215,195,140,${.26*(1-progress)})`;ctx.lineWidth=.8;
      ctx.beginPath();ctx.arc(p.x,p.y,8+progress*r.r,0,TAU);ctx.stroke();
    });
  }
  function frame(ms){
    if(state.paused)return;
    const dt=Math.min((ms-last)/1000||.016,.05);last=ms;
    if(!reduced.matches)state.time+=dt;
    const ease=reduced.matches?1:1-Math.exp(-dt*7);
    cam.x=lerp(cam.x,cam.tx,ease);cam.y=lerp(cam.y,cam.ty,ease);cam.z=lerp(cam.z,cam.tz,ease);
    nodes.forEach(n=>{
      const drift=state.breathe&&n.kind!=='root'&&!n.pinned?1.8*state.intensity:0;
      const target=n.pinned||{x:n.targetX,y:n.targetY};
      n.tx=lerp(n.tx,target.x+Math.sin(state.time*.17+(n.index||0)*1.13)*drift,ease);
      n.ty=lerp(n.ty,target.y+Math.cos(state.time*.13+(n.index||0))*.7*drift,ease);
      n.alpha=lerp(n.alpha,n.targetAlpha,ease);const p=toScreen(n.tx,n.ty);
      n.el.style.transform=`translate(${p.x.toFixed(2)}px,${p.y.toFixed(2)}px)`;
      n.el.style.opacity=n.alpha.toFixed(3);n.el.hidden=n.alpha<.015;n.el.tabIndex=n.targetAlpha?0:-1;
      const lowDetail=W<=700&&cam.z<home.z*1.55;
      const showLabel=!lowDetail||n.kind!=='concept'||n.index%7===0||n.index%7===3||n.id===state.selected||(state.active&&state.connected.has(n.id));
      n.el.querySelector('.node-name').style.visibility=showLabel?'visible':'hidden';
    });
    ctx.setTransform(DPR,0,0,DPR,0,0);ctx.clearRect(0,0,W,H);
    drawAtmosphere(state.time);drawEdges(state.time);drawNodeAuras(state.time);
    ripples.forEach(r=>r.age+=dt);while(ripples[0]?.age>1.6)ripples.shift();
    if(frameCount++%8===0)$('zoom-level').textContent=Math.round(cam.z/home.z*100)+'%';
    requestAnimationFrame(frame);
  }

  function zoom(factor,x=W/2,y=H/2){
    stopTour();const z=Math.max(home.z*.5,Math.min(cam.tz*factor,home.z*3.6));
    const world={x:(x-cam.tx)/cam.tz,y:(y-cam.ty)/cam.tz};cam.tx=x-world.x*z;cam.ty=y-world.y*z;cam.tz=z;
  }
  stage.addEventListener('wheel',e=>{e.preventDefault();const rect=stage.getBoundingClientRect();zoom(Math.exp(-e.deltaY*.001),e.clientX-rect.left,e.clientY-rect.top);},{passive:false});
  const touches=new Map();let pinch=null;
  stage.addEventListener('pointerdown',e=>{
    if(e.button!==0)return;stopTour();stage.setPointerCapture(e.pointerId);touches.set(e.pointerId,{x:e.clientX,y:e.clientY});
    if(touches.size===2){const pts=[...touches.values()];pinch={distance:Math.hypot(pts[0].x-pts[1].x,pts[0].y-pts[1].y),z:cam.tz};state.drag=null;return;}
    state.drag={startX:e.clientX,startY:e.clientY,x:cam.tx,y:cam.ty,moved:false};stage.classList.add('dragging');
  });
  window.addEventListener('pointermove',e=>{
    const rect=stage.getBoundingClientRect();state.pointer={x:e.clientX-rect.left,y:e.clientY-rect.top};
    if(touches.has(e.pointerId))touches.set(e.pointerId,{x:e.clientX,y:e.clientY});
    if(pinch&&touches.size===2){const pts=[...touches.values()],d=Math.hypot(pts[0].x-pts[1].x,pts[0].y-pts[1].y);zoom((pinch.z*d/pinch.distance)/cam.tz,(pts[0].x+pts[1].x)/2-rect.left,(pts[0].y+pts[1].y)/2-rect.top);return;}
    if(state.drag){
      const d=state.drag;if(Math.hypot(e.clientX-d.startX,e.clientY-d.startY)>4)d.moved=true;
      if(d.node&&d.moved){const p=toWorld(e.clientX-rect.left,e.clientY-rect.top);d.node.pinned={x:p.x-d.offsetX,y:p.y-d.offsetY};d.node.tx=d.node.pinned.x;d.node.ty=d.node.pinned.y;}
      else if(!d.node){cam.tx=d.x+e.clientX-d.startX;cam.ty=d.y+e.clientY-d.startY;}
      $('edge-tooltip').hidden=true;return;
    }
    if(e.target.closest('.node')){$('edge-tooltip').hidden=true;return;}
    let found=null;
    if(state.pointer.x>=0&&state.pointer.x<W&&state.pointer.y>=0&&state.pointer.y<H){
      for(const edge of edges){
        if(edge.editorial||!edge.curve||Math.min(edge.na.alpha,edge.nb.alpha)<.5)continue;
        if(state.active&&edge.a!==state.active&&edge.b!==state.active)continue;
        for(let i=2;i<18;i++){const p=quadratic(edge.curve.a,edge.curve.c,edge.curve.b,i/20);if(Math.hypot(p.x-state.pointer.x,p.y-state.pointer.y)<7){found=edge;break;}}
        if(found)break;
      }
    }
    const tip=$('edge-tooltip');tip.hidden=!found;
    if(found){tip.innerHTML=`${name(found.na)} → ${name(found.nb)}<small>${t(found.label)} · ${org(sourceMap.get(found.source))}</small>`;tip.style.left=Math.min(state.pointer.x+14,W-245)+'px';tip.style.top=Math.max(0,state.pointer.y-45)+'px';}
  });
  window.addEventListener('pointerup',e=>{
    touches.delete(e.pointerId);if(touches.size<2)pinch=null;
    const d=state.drag;if(d?.node&&d.moved)toast(t('已调整节点位置 · 全景按钮可复位'));
    stage.classList.remove('dragging');setTimeout(()=>{state.drag=null;},0);
  });
  stage.addEventListener('click',e=>{if(e.target.closest('.node')||state.drag?.moved)return;state.hover=null;state.selected='root';refreshHighlight();renderInspector();$('focus-caption').hidden=true;});
  stage.addEventListener('dblclick',e=>{if(!e.target.closest('.node'))resetView();});

  document.querySelectorAll('[data-layout]').forEach(b=>b.onclick=()=>{
    stopTour();state.layout=b.dataset.layout;nodes.forEach(n=>delete n.pinned);
    document.querySelectorAll('[data-layout]').forEach(btn=>{const selected=btn===b;btn.classList.toggle('active',selected);btn.setAttribute('aria-pressed',selected);});
    targets();resetView();ripple(0,0,230);toast(t('切换至')+t(state.layout==='atlas'?'星图':state.layout==='orbit'?'轨道':'脉络')+t('布局'));
  });
  $('expand-all').onclick=()=>{stopTour();state.collapsed.clear();targets();resetView();toast(t('六个分支已全部展开'));};
  $('collapse-all').onclick=()=>{stopTour();groups.forEach(g=>state.collapsed.add(g.id));targets();resetView();ripple(0,0,180);toast(t('已收起为六个文化主题'));};
  $('zoom-in').onclick=()=>zoom(1.22,home.x,home.y);$('zoom-out').onclick=()=>zoom(1/1.22,home.x,home.y);$('reset').onclick=resetView;
  function stopTour(){state.tour=false;clearTimeout(tourTimer);$('tour').classList.remove('active');$('tour').setAttribute('aria-pressed','false');$('tour').innerHTML='<span>▷</span> '+t('漫游');}
  $('tour').onclick=()=>{
    if(state.tour){stopTour();return;}
    state.tour=true;$('tour').classList.add('active');$('tour').setAttribute('aria-pressed','true');$('tour').innerHTML='<span>Ⅱ</span> '+t('漫游');
    const route=['yueluacademy','lecture','toweressay','border','silver','brocade','mawangdui','tea'];let index=0;
    function next(){if(!state.tour)return;selectNode(route[index++%route.length]);tourTimer=setTimeout(next,4700);}
    next();toast(t('漫游开始 · 可随时点击坐标接管'));
  };
  $('immersive').onclick=()=>{state.immersed=!state.immersed;$('app').classList.toggle('immersed',state.immersed);$('immersive').setAttribute('aria-pressed',state.immersed);fitHome();cam.tx=home.x;cam.ty=home.y;cam.tz=home.z;toast(t(state.immersed?'沉浸模式 · 再点右上角可退出':'已返回探索模式'));};
  $('close-inspector').onclick=()=>{state.panels=false;$('inspector').hidden=true;$('reopen-inspector').hidden=false;fitHome();};
  $('reopen-inspector').onclick=()=>{state.panels=true;$('inspector').hidden=false;$('reopen-inspector').hidden=true;fitHome();};
  $('settings-open').onclick=()=>$('settings-dialog').showModal();
  $('sources-open').onclick=()=>$('sources-dialog').showModal();
  ['particles','flow','breathe'].forEach(key=>{const input=$(key+'-toggle');input.checked=state[key];input.onchange=()=>{state[key]=input.checked;};});
  $('intensity').oninput=e=>{state.intensity=+e.target.value/100;$('intensity-label').textContent=e.target.value+'%';};
  const applyReduced=()=>{
    if(reduced.matches){state.particles=state.flow=state.breathe=false;['particles','flow','breathe'].forEach(key=>$(key+'-toggle').checked=false);$('motion-note').textContent=t('已遵循系统设置，减少动态效果。');}
  };applyReduced();reduced.addEventListener('change',applyReduced);
  document.querySelectorAll('dialog').forEach(dialog=>dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close();}}));
  function renderSources(){
    $('sources-list').innerHTML=['文化资料','视觉与前端技术'].map((title,index)=>`<h3 class="sources-group">${t(title)}</h3>${sources.filter(s=>!!s.visual===!!index).map((s,i)=>`<div class="source-row"><span class="source-index">${String(i+1).padStart(2,'0')}</span><div><a href="${s.url}" target="_blank" rel="noopener noreferrer">${sourceTitle(s)} ↗</a><small>${org(s)} · ${sourceNote(s)}</small></div></div>`).join('')}`).join('')+`<p class="notice">${t('所有视觉均由前端实时绘制。本原型不包含知识抽取、自动建图或模型调用。')}</p>`;
  }
  function doSearch(){
    const text=$('search').value.trim().toLowerCase(),box=$('search-results');
    if(!text){box.hidden=true;return;}
    const matches=nodes.filter(n=>n.name.includes(text)||n.english.toLowerCase().includes(text)).slice(0,8);
    box.hidden=false;box.innerHTML=matches.length?matches.map(n=>`<button data-result="${n.id}"><span>${name(n)}</span><small>${t(n.type)}</small></button>`).join(''):`<div class="empty">${t('没有找到')} “${escapeText($('search').value)}”</div>`;
    box.querySelectorAll('button').forEach(b=>b.onclick=()=>{stopTour();selectNode(b.dataset.result);box.hidden=true;$('search').value='';$('search').blur();});
  }
  $('search').addEventListener('input',doSearch);
  $('search').addEventListener('keydown',e=>{if(e.key==='Enter'){$('search-results').querySelector('button')?.click();}if(e.key==='Escape'){$('search-results').hidden=true;$('search').blur();}});
  $('search').parentElement.querySelector('span').onclick=()=>{$('search').style.display='block';$('search').focus();};
  document.addEventListener('click',e=>{if(!e.target.closest('.search-wrap'))$('search-results').hidden=true;});
  document.addEventListener('keydown',e=>{
    if(e.key==='/'&&!['INPUT','TEXTAREA'].includes(document.activeElement.tagName)){e.preventDefault();$('search').style.display='block';$('search').focus();}
    if(e.key==='Escape'){stopTour();if(state.immersed)$('immersive').click();}
    if(!['INPUT','TEXTAREA'].includes(document.activeElement.tagName)&&!document.querySelector('dialog[open]')){if(e.key==='+'||e.key==='=')zoom(1.2,home.x,home.y);if(e.key==='-')zoom(1/1.2,home.x,home.y);if(e.key==='0')resetView();}
  });
  document.addEventListener('visibilitychange',()=>{
    state.paused=document.hidden;if(state.paused){stopTour();}else{last=performance.now();requestAnimationFrame(frame);}
  });
  window.addEventListener('resize',resize);
  targets();resize();cam.x=home.x;cam.y=home.y;cam.tx=home.x;cam.ty=home.y;cam.z=home.z*(reduced.matches?1:.75);
  if(W<=700){state.panels=false;$('inspector').hidden=true;$('reopen-inspector').hidden=false;}
  function applyLanguage(){
    const en=state.lang==='en';document.documentElement.lang=en?'en':'zh-CN';document.title=en?'Hunan · Culture Atlas':'湘 · 文化星图';$('app').classList.toggle('lang-en',en);
    $('language-toggle').textContent=en?'中文':'EN';$('language-toggle').setAttribute('aria-label',en?'Switch to Chinese':'切换为 English');$('language-toggle').title=en?'切换为中文':'Switch to English';
    document.querySelector('.brand-name').childNodes[0].nodeValue=en?'Culture Atlas':'文化星图';
    document.querySelector('.brand').setAttribute('aria-label',en?'Hunan Culture Atlas home':'湘文化星图首页');
    document.querySelector('.view-tabs').setAttribute('aria-label',en?'Graph layout':'图谱布局');
    stage.setAttribute('aria-label',en?'Hunan culture graph: drag, zoom and select nodes':'湖南文化知识图谱，可拖动、缩放、点击节点');
    $('search').placeholder=t('寻找一个文化坐标');$('search').setAttribute('aria-label',t('搜索文化名词'));
    const labels={'settings-open':'动效设置',immersive:'切换沉浸模式','close-inspector':'关闭信息面板','reopen-inspector':'打开节点信息','zoom-out':'缩小','zoom-in':'放大',reset:'回到全景'};
    Object.entries(labels).forEach(([id,label])=>{$(id).setAttribute('aria-label',t(label));$(id).title=t(label);});
    document.querySelectorAll('[data-layout]').forEach(b=>{const key=b.dataset.layout;const symbol=key==='atlas'?'✧':key==='orbit'?'◎':'⌘';b.innerHTML='<span>'+symbol+'</span> '+t(key==='atlas'?'星图':key==='orbit'?'轨道':'脉络');});
    document.querySelector('.explorer h1').textContent=t('探索湖湘');document.querySelector('.explorer-intro').textContent=t('循一束光，见一方文化。');
    $('expand-all').innerHTML='<span>⊕</span> '+t('展开全部');$('collapse-all').innerHTML='<span>⊖</span> '+t('收起全部');
    document.querySelector('.legend').innerHTML=`<span><i class="dot gold"></i>${t('文化主题')}</span><span><i class="dot jade"></i>${t('文化名词')}</span><span><i class="line"></i>${t('主题归类')}</span><span><i class="line dashed"></i>${t('资料关联')}</span>`;
    document.querySelector('.inspector-top .eyebrow').textContent=t('当前焦点 / FOCUS');$('inspector').setAttribute('aria-label',en?'Node details':'节点信息');
    $('reopen-inspector').textContent=en?'Details ↗':'详情 ↗';
    document.querySelector('.stage-caption p').innerHTML=en?'Landscapes endure<span>Culture connects</span>':'山水有迹<span>文脉相连</span>';
    document.querySelector('.graph-stats').innerHTML=`<span class="live-dot"></span><strong id="node-count"></strong> ${t('个节点')} <span class="divider">/</span> <strong id="edge-count"></strong> ${t('条联系')}<small>${t('湖南文化 · 示例图谱')}</small>`;
    document.querySelector('.interaction-hint').textContent=t('拖动平移 · 滚轮缩放 · 双击展开');$('sources-open').textContent=t('参考资料 ↗');
    $('settings-dialog').querySelector('h2').textContent=t('光与运动');$('settings-dialog').querySelector('p').textContent=t('为探索调节星图的呼吸。');
    ['浮游微粒','关系流光','呼吸与涟漪','动效强度'].forEach((label,i)=>$('settings-dialog').querySelectorAll('label')[i].childNodes[0].nodeValue=t(label));
    $('settings-dialog').querySelector('.icon-button').setAttribute('aria-label',t('关闭动效设置'));$('intensity').setAttribute('aria-label',t('动效强度'));
    $('motion-note').textContent=t(reduced.matches?'已遵循系统设置，减少动态效果。':'动效可以关闭，图谱仍可正常探索。');
    $('sources-dialog').querySelector('h2').textContent=t('文化与视觉参考');$('sources-dialog').querySelector('.icon-button').setAttribute('aria-label',t('关闭参考资料'));
    $('sources-dialog').querySelector('p').textContent=t('文化名词由人工选编。主题归类用于视觉演示；资料关联附有来源。这里呈现的是图谱前端。');
    nodes.forEach(n=>{
      n.el.setAttribute('aria-label',name(n)+(n.kind==='category'?', '+t('点击聚焦，双击展开或收起'):''));
      const subtitle=n.kind==='root'?`<small class="root-sub">${en?'湖湘文化':'HUNAN CULTURE'}</small>`:n.kind==='category'?`<small class="category-en">${en?n.name:n.english}</small>`:'';
      n.el.querySelector('.node-name').innerHTML=(n.kind==='root'&&en?'Hunan<br>Culture':name(n))+subtitle;
    });
    groups.forEach(g=>g.row.querySelector('.category-select').innerHTML=`<span class="category-symbol">${g.symbol}</span>${name(g)}`);
    $('tour').innerHTML='<span>'+(state.tour?'Ⅱ':'▷')+'</span> '+t('漫游');
    if(state.selected!=='root')$('focus-caption').textContent=t('正在探索 · ')+name(nodeMap.get(state.selected));
    updateCounts();renderInspector();renderSources();doSearch();
  }
  $('language-toggle').onclick=()=>{state.lang=state.lang==='zh'?'en':'zh';try{localStorage.setItem('xiang-atlas-language',state.lang);}catch{}applyLanguage();};
  refreshHighlight();applyLanguage();requestAnimationFrame(frame);
  window.xiangAtlas={getState:()=>({lang:state.lang,layout:state.layout,selected:state.selected,visibleNodes:nodes.filter(n=>n.targetAlpha).length,totalNodes:nodes.length,totalEdges:edges.length,collapsed:[...state.collapsed],camera:{...cam},motion:{particles:state.particles,flow:state.flow,breathe:state.breathe,intensity:state.intensity}})};
})();
