(() => {
  'use strict';
  const data = window.RAIL_DATA;
  if (!data) return;
  const years = [1830,1840,1850,1860,1870,1880,1890,1900];
  const narratives = {
    1830:['The first experiments','Rail transport is still a novelty. The B&O begins common-carrier operation near Baltimore; earlier horse-powered freight railways also appear.'],
    1840:['Early routes connect','Boston lines radiate outward, Mohawk Valley railroads reach across New York, and railroad companies build competing port connections.'],
    1850:['The network takes shape','Railroads push inland from the Atlantic seaboard. Routes join industrial cities, canal towns and the growing manufacturing economy.'],
    1860:['The great expansion','Long corridors reach Lake Erie and the Ohio River. Through service and branch lines knit together a regional transport network.'],
    1870:['An industrial web','Coal, iron, and manufacturing traffic sustains connections. The map shows only selected links; actual railroad building was much denser.'],
    1880:['Consolidation and competition','Expensive mountain engineering and railroad consolidations reshape travel, alongside growing competition between major systems.'],
    1890:['A maturing system','The West Shore competitor and the Poughkeepsie bridge add connections to an already extensive northeastern network.'],
    1900:['The railroad century','By 1900 the Northeast is linked by a mature railway system, with branches extending to Long Island’s Montauk. These corridors are illustrative, not exhaustive.']
  };
  const colors = y => y < 1840 ? '#f2c479' : y < 1850 ? '#ec9777' : y < 1860 ? '#8dd9bc' : y < 1880 ? '#8db6ed' : '#cfaff1';
  const $ = id => document.getElementById(id);
  const svg = $('railMap');
  const NS = 'http://www.w3.org/2000/svg';
  const W=1140,H=700;
  const bounds=data.bounds;
  let index=2, region='All regions', search='', selectedId=null, playTimer=null;
  let box={x:0,y:0,w:W,h:H};
  let dragging=false, moved=false, last=null;
  const ns=(tag,props={})=>{const el=document.createElementNS(NS,tag);for(const [k,v] of Object.entries(props))el.setAttribute(k,String(v));return el;};
  const project=([lon,lat])=>[(lon-bounds.west)/(bounds.east-bounds.west)*W,(bounds.north-lat)/(bounds.north-bounds.south)*H];
  const byId = id => data.routes.find(r=>r.id===id);
  const getCoords=r=>r.via.map(k=>data.cities[k]).filter(Boolean);
  function path(coords){return coords.map((c,i)=>{const [x,y]=project(c);return `${i?'L':'M'}${x.toFixed(2)},${y.toFixed(2)}`;}).join(' ');}
  function background(){
    svg.replaceChildren();
    const defs=ns('defs');const water=ns('linearGradient',{id:'sea',x1:'0%',y1:'0%',x2:'100%',y2:'100%'});
    [['0%','#0a3038'],['100%','#071f28']].forEach(([offset,color])=>{water.append(ns('stop',{offset,'stop-color':color}));});
    defs.append(water);svg.append(defs);
    svg.append(ns('rect',{x:0,y:0,width:W,height:H,fill:'url(#sea)'}));
    for(let lon=-84;lon<=-66;lon+=2){const x=project([lon,40])[0];svg.append(ns('path',{d:`M${x},0V${H}`,stroke:'#31545a','stroke-width':'.8',opacity:'.3','stroke-dasharray':'4 9'}));}
    for(let lat=38;lat<=48;lat+=2){const y=project([-75,lat])[1];svg.append(ns('path',{d:`M0,${y}H${W}`,stroke:'#31545a','stroke-width':'.8',opacity:'.3','stroke-dasharray':'4 9'}));}
    const land=ns('g',{id:'land'});data.states.forEach(s=>{const polygon=ns('path',{d:path([...s.poly,s.poly[0]]),fill:'#244a4c',stroke:'#62817d','stroke-width':'1.15',opacity:'.85','stroke-linejoin':'round'});land.append(polygon);});svg.append(land);
    const stateLabels=ns('g',{id:'stateLabels'});
    const named={ME:[-69.2,45.5],NH:[-71.5,44.0],VT:[-72.8,44],MA:[-71.4,42.3],CT:[-72.4,41.73],NY:[-76.4,43.15],PA:[-78,40.7],NJ:[-74.66,39.99],MD:[-78,39.33],OH:[-82.7,40.5],WV:[-80.1,38.3],DE:[-75.5,39.22],RI:[-71.51,41.78]};
    for(const [id,geo] of Object.entries(named)){const [x,y]=project(geo);const t=ns('text',{x,y,fill:'#8daca4','font-size':'13','font-weight':'700','letter-spacing':'3','text-anchor':'middle',opacity:'.54'});t.textContent=id;stateLabels.append(t);}
    svg.append(stateLabels);
    const waterText=ns('g',{});for(const [label,geo,rot] of [['ATLANTIC OCEAN',[-67.9,39.6],0],['LAKE ONTARIO',[-77.1,44.9],0],['LAKE ERIE',[-81.4,42.45],0]]){const [x,y]=project(geo);const t=ns('text',{x,y,fill:'#638991','font-size':'12','font-style':'italic','letter-spacing':'3','text-anchor':'middle','transform':`rotate(${rot} ${x} ${y})`});t.textContent=label;waterText.append(t);}svg.append(waterText);
    svg.append(ns('g',{id:'routesLayer'}));svg.append(ns('g',{id:'citiesLayer'}));
  }
  function filtered(){const y=years[index];return data.routes.filter(r=>r.by<=y&&(region==='All regions'||r.region===region)&&(!search||`${r.name} ${r.title} ${r.note} ${r.via.join(' ')} ${r.region}`.toLowerCase().includes(search)));}
  function drawMap(rows){
    const layer=$('routesLayer');const cities=$('citiesLayer');layer.replaceChildren();cities.replaceChildren();
    const visible = rows.slice().sort((a,b)=>a.id===selectedId?1:b.id===selectedId?-1:a.by-b.by);
    for(const r of visible){const geo=getCoords(r);if(geo.length<2)continue;const d=path(geo),isSelected=selectedId===r.id,isNew=r.by>years[Math.max(0,index-1)],stroke=colors(r.by);
      if(isSelected)layer.append(ns('path',{d,stroke:'#f8e6b2','stroke-width':'10',opacity:'.27',fill:'none','stroke-linecap':'round','stroke-linejoin':'round','vector-effect':'non-scaling-stroke'}));
      const line=ns('path',{d,stroke,'stroke-width':isSelected?'5':'2.65',opacity:isSelected?'1':(selectedId?'.35':(isNew?'.97':'.76')),fill:'none',class:'rail-line','data-id':r.id});
      line.addEventListener('click',e=>{e.stopPropagation();if(!moved)selectRoute(r.id);});
      line.addEventListener('pointerenter',e=>showTip(r,e));line.addEventListener('pointermove',moveTip);line.addEventListener('pointerleave',hideTip);layer.append(line);
      const hit=ns('path',{d,class:'rail-hit','data-id':r.id});hit.addEventListener('click',e=>{e.stopPropagation();if(!moved)selectRoute(r.id);});hit.addEventListener('pointerenter',e=>showTip(r,e));hit.addEventListener('pointermove',moveTip);hit.addEventListener('pointerleave',hideTip);layer.append(hit);
    }
    // City markers for visible network only; labels are intentionally limited to avoid collision.
    const shown=new Set(rows.flatMap(r=>r.via));
    for(const [id,label] of Object.entries(data.labels))if(shown.has(id)){const [x,y]=project(data.cities[id]);cities.append(ns('circle',{cx:x,cy:y,r:3.5,fill:'#e1e4d1',stroke:'#123740','stroke-width':'2',class:'city-dot'}));const tx=ns('text',{x:x+7,y:y-6,fill:'#d5e4d5','font-size':'11','font-weight':'600',stroke:'#102e35','stroke-width':'2.8','paint-order':'stroke',opacity:'.94'});tx.textContent=label;cities.append(tx);}
  }
  function showTip(r,e){const el=$('mapTip');el.replaceChildren();const strong=document.createElement('strong');strong.textContent=r.name;const small=document.createElement('span');small.textContent=`${r.title} · by ${r.by}`;el.append(strong,small);el.hidden=false;moveTip(e);}
  function moveTip(e){const el=$('mapTip'),frame=$('mapFrame').getBoundingClientRect();let x=e.clientX-frame.left+16,y=e.clientY-frame.top+16;if(x>frame.width-240)x=e.clientX-frame.left-215;if(y>frame.height-85)y=e.clientY-frame.top-80;el.style.left=`${Math.max(5,x)}px`;el.style.top=`${Math.max(5,y)}px`;}
  function hideTip(){$('mapTip').hidden=true;}
  function showDetail(){const el=$('routeDetail');el.replaceChildren();const r=byId(selectedId);if(!r){const small=document.createElement('span');small.className='detail-label';small.textContent='SELECT A ROUTE';const p=document.createElement('p');p.textContent='Click a colored line on the map or choose one above to read about it.';el.append(small,p);return;}
    const cap=document.createElement('span');cap.className='detail-label';cap.textContent=`${r.region.toUpperCase()} · BY ${r.by}`;
    const title=document.createElement('h4');title.textContent=r.name;
    const subtitle=document.createElement('p');subtitle.textContent=r.title;
    const info=document.createElement('p');info.textContent=r.note;
    const a=document.createElement('a');a.href=data.sources[r.source];a.target='_blank';a.rel='noopener noreferrer';a.textContent='Explore a historical source ↗';el.append(cap,title,subtitle,info,a);
  }
  function listRows(rows){const list=$('routeList');list.replaceChildren();if(!rows.length){const p=document.createElement('p');p.className='empty-results';p.textContent='No lines match these filters for the selected year. Try another decade or a different search.';list.append(p);return;}
    const sorted=rows.slice().sort((a,b)=>b.by-a.by||a.name.localeCompare(b.name));
    const chosen=selectedId?sorted.find(r=>r.id===selectedId):null;
    const displayed=chosen&&sorted.indexOf(chosen)>11?[chosen,...sorted.filter(r=>r!==chosen).slice(0,11)]:sorted.slice(0,12);
    for(const r of displayed){const b=document.createElement('button');b.type='button';b.className='route-item'+(r.id===selectedId?' active':'');b.setAttribute('aria-pressed',String(r.id===selectedId));b.addEventListener('click',()=>selectRoute(r.id));
      const color=document.createElement('i');color.className='route-color';color.style.backgroundColor=colors(r.by);
      const content=document.createElement('span');const strong=document.createElement('strong');strong.textContent=r.name;const small=document.createElement('small');small.textContent=r.title;content.append(strong,small);
      const year=document.createElement('span');year.className='route-year';year.textContent=String(r.by);b.append(color,content,year);list.append(b);
    }
    if(rows.length>displayed.length){const end=document.createElement('p');end.className='empty-results';end.textContent=`Showing ${displayed.length} of ${rows.length}. Use search to find another corridor.`;list.append(end);}
  }
  function update(){const y=years[index];const rows=filtered();if(selectedId&&!rows.some(r=>r.id===selectedId))selectedId=null;
    $('yearDisplay').textContent=y;$('yearCaption').textContent=narratives[y][0];$('yearDescription').textContent=narratives[y][1];$('mapStatus').textContent=`RAIL NETWORK / ${y}`;
    $('routeCount').textContent=String(rows.length);$('timeTotal').textContent=`${rows.length} SELECTED CORRIDORS`;const input=$('yearSlider');input.value=String(index);input.setAttribute('aria-valuetext',String(y));input.style.background=`linear-gradient(to right,#c99460 ${index/7*100}%,#47666c ${index/7*100}%)`;
    document.querySelectorAll('.year-ticks button').forEach((b,i)=>{b.classList.toggle('current',i===index);b.setAttribute('aria-current',String(i===index));});
    listRows(rows);drawMap(rows);showDetail();
  }
  function selectRoute(id){selectedId=selectedId===id?null:id;update();}
  function stopPlay(){if(playTimer)clearInterval(playTimer);playTimer=null;$('playIcon').textContent='▶';$('playLabel').textContent='Play timeline';$('playButton').setAttribute('aria-pressed','false');}
  function startPlay(){stopPlay();if(index===years.length-1)index=0;else if(index!==0)index=0;update();$('playIcon').textContent='Ⅱ';$('playLabel').textContent='Pause timeline';$('playButton').setAttribute('aria-pressed','true');playTimer=setInterval(()=>{if(index>=years.length-1){stopPlay();return;}index++;update();},1100);}
  function applyBox(){svg.setAttribute('viewBox',`${box.x.toFixed(2)} ${box.y.toFixed(2)} ${box.w.toFixed(2)} ${box.h.toFixed(2)}`);}
  function clampBox(){box.w=Math.max(270,Math.min(W,box.w));box.h=box.w*H/W;box.x=Math.max(0,Math.min(W-box.w,box.x));box.y=Math.max(0,Math.min(H-box.h,box.y));}
  function zoom(factor,clientX,clientY){const rect=svg.getBoundingClientRect();let px=.5,py=.5;if(Number.isFinite(clientX)){px=Math.max(0,Math.min(1,(clientX-rect.left)/rect.width));py=Math.max(0,Math.min(1,(clientY-rect.top)/rect.height));}const oldW=box.w,oldH=box.h;box.w/=factor;box.h/=factor;box.x+=px*(oldW-box.w);box.y+=py*(oldH-box.h);clampBox();applyBox();}
  // Mouse, pen, and touch-friendly SVG pan/zoom (no third-party dependencies).
  svg.addEventListener('wheel',e=>{e.preventDefault();zoom(e.deltaY<0?1.18:1/1.18,e.clientX,e.clientY);},{passive:false});
  svg.addEventListener('pointerdown',e=>{if(e.button!==0)return;dragging=true;moved=false;last=[e.clientX,e.clientY];svg.classList.add('dragging');});
  svg.addEventListener('pointermove',e=>{if(!dragging||!last)return;const rect=svg.getBoundingClientRect();const dx=(e.clientX-last[0])/rect.width*box.w,dy=(e.clientY-last[1])/rect.height*box.h;if(Math.abs(e.clientX-last[0])+Math.abs(e.clientY-last[1])>3){moved=true;if(!svg.hasPointerCapture(e.pointerId))svg.setPointerCapture(e.pointerId);}box.x-=dx;box.y-=dy;last=[e.clientX,e.clientY];clampBox();applyBox();});
  const endDrag=()=>{dragging=false;last=null;svg.classList.remove('dragging');setTimeout(()=>moved=false,20);};
  svg.addEventListener('pointerup',endDrag);svg.addEventListener('pointercancel',endDrag);
  svg.addEventListener('keydown',e=>{if(e.key==='+'||e.key==='='){zoom(1.25);e.preventDefault();}if(e.key==='-'){zoom(.8);e.preventDefault();}if(['ArrowUp','ArrowDown','ArrowLeft','ArrowRight'].includes(e.key)){const delta=box.w*.075;box.x+=e.key==='ArrowLeft'?-delta:e.key==='ArrowRight'?delta:0;box.y+=e.key==='ArrowUp'?-delta:e.key==='ArrowDown'?delta:0;clampBox();applyBox();e.preventDefault();}});
  $('resetView').addEventListener('click',()=>{box={x:0,y:0,w:W,h:H};applyBox();});
  $('zoomIn').addEventListener('click',()=>zoom(1.35));$('zoomOut').addEventListener('click',()=>zoom(1/1.35));
  $('playButton').addEventListener('click',()=>{playTimer?stopPlay():startPlay();});
  $('yearSlider').addEventListener('input',e=>{stopPlay();index=Number(e.target.value);update();});
  $('regionFilter').addEventListener('change',e=>{region=e.target.value;update();});
  $('routeSearch').addEventListener('input',e=>{search=e.target.value.trim().toLowerCase();update();});
  $('mapHelp').addEventListener('click',()=>$('aboutDialog').showModal());
  const ticks=$('yearTicks');for(const [i,y] of years.entries()){const b=document.createElement('button');b.type='button';b.textContent=y;b.addEventListener('click',()=>{stopPlay();index=i;update();});ticks.append(b);}
  background();update();
})();
