import './styles.css';
import { journeys } from './data/journeys.js';
import { deepDives } from './data/deep-dives.js';
import { filterJourneys, summarizeJourneys, toggleComparison } from './lib/catalog.js';

const root = document.querySelector('#main');
const tray = document.querySelector('#compare-tray');
const state = { query: '', category: '전체', compare: [] };
const categories = ['전체', ...new Set(journeys.map((item) => item.category))];
const stats = summarizeJourneys(journeys);
const escapeHtml = (value = '') => String(value).replace(/[&<>'"]/g, (char) => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', "'":'&#39;', '"':'&quot;' }[char]));

function renderCatalog() {
  document.title = '국민생활도우미';
  const filtered = filterJourneys(journeys, state);
  root.innerHTML = `
    <section class="hero">
      <div class="hero-grid">
        <div class="hero-copy">
          <span class="eyebrow">Public service journey registry</span>
          <h1>제도가 아니라,<br>내게 생긴 일에서 시작합니다.</h1>
          <p>출생·이사·실직·돌봄·재난 같은 생활사건을 기준으로 공공서비스, 기관, 서류와 데이터 흐름을 한 장에 연결합니다.</p>
        </div>
        <aside class="hero-side" aria-label="서비스 설계 원칙">
          <p class="question">“그래서 나는 지금<br>무엇부터 해야 하나요?”</p>
          <div class="mini-flow"><span><b>01 EVENT</b>생활사건</span><span><b>02 JOURNEY</b>행동·기관</span><span><b>03 CHANGE</b>단절 개선</span></div>
        </aside>
      </div>
    </section>
    <section class="stats" aria-label="카탈로그 통계">
      <div class="stat"><strong>${stats.journeys}</strong><span>생활사건 MVP</span></div>
      <div class="stat"><strong>${stats.services}</strong><span>연결 서비스</span></div>
      <div class="stat"><strong>${stats.agencies}</strong><span>관련 기관·창구</span></div>
      <div class="stat"><strong>${journeys.reduce((n,x)=>n+x.aiOpportunities.length,0)}</strong><span>AI·제도개선 후보</span></div>
    </section>
    <section class="catalog">
      <aside class="filters" aria-label="분야 필터">
        <h2>생활 분야</h2>
        ${categories.map((category) => `<button class="filter-button ${state.category===category?'active':''}" data-category="${category}" aria-pressed="${state.category===category}"><span>${category}</span><span>${category==='전체'?journeys.length:journeys.filter(x=>x.category===category).length}</span></button>`).join('')}
      </aside>
      <div class="catalog-main">
        <div class="search-wrap">
          <label class="search-label" for="catalog-search">사건·서비스·기관 통합검색</label>
          <div class="search-row"><input id="catalog-search" type="search" value="${escapeHtml(state.query)}" placeholder="예: 실업급여, 부모님 돌봄, 전입신고" autocomplete="off"></div>
        </div>
        <div class="result-head"><h2>생활사건 대장</h2><span>${filtered.length} / ${journeys.length} CASES</span></div>
        <div class="cards">
          ${filtered.length ? filtered.map(cardTemplate).join('') : `<div class="empty"><h3>찾는 사건이 아직 없어요.</h3><p>다른 표현으로 검색하거나 전체 분야를 선택해 주세요.</p></div>`}
        </div>
      </div>
    </section>`;
  bindCatalogEvents();
  renderTray();
}

function cardTemplate(item) {
  const selected = state.compare.includes(item.slug);
  return `<article class="card">
    <div class="card-top"><span class="card-number">CASE ${item.icon}</span><span class="tag">${item.category}</span></div>
    <h3>${item.title}</h3><p>${item.summary}</p>
    <div class="card-meta"><small>${item.services.length}개 서비스 · ${item.agencies.length}개 기관</small>
      <div class="card-actions"><button class="btn ghost compare-toggle ${selected?'selected':''}" data-slug="${item.slug}" aria-pressed="${selected}">${selected?'선택됨':'비교'}</button><a class="btn" href="#case/${item.slug}">한 장 보기 →</a></div>
    </div>
  </article>`;
}

function bindCatalogEvents() {
  document.querySelector('#catalog-search')?.addEventListener('input', (event) => { state.query = event.target.value; renderCatalog(); requestAnimationFrame(()=>{ const input=document.querySelector('#catalog-search'); input?.focus(); input?.setSelectionRange(state.query.length,state.query.length); }); });
  document.querySelectorAll('[data-category]').forEach((button) => button.addEventListener('click', () => { state.category = button.dataset.category; renderCatalog(); }));
  document.querySelectorAll('.compare-toggle').forEach((button) => button.addEventListener('click', () => { state.compare = toggleComparison(state.compare, button.dataset.slug); renderCatalog(); }));
}

function renderDetail(slug) {
  const item = journeys.find((journey) => journey.slug === slug);
  if (!item) { location.hash=''; return; }
  document.title = `${item.title} | 국민생활도우미`;
  const deepDive = deepDives[item.slug];
  root.innerHTML = `<article class="detail-shell">
    <nav class="detail-nav"><button class="back" onclick="location.hash=''">← 전체 사건</button><span>CASE ${item.icon} / 10</span></nav>
    <header class="detail-hero">
      <div><span class="eyebrow">${item.category} · LIFE EVENT</span><h1>${item.title}</h1><p>${item.summary}</p></div>
      <div class="trust-box"><b>근거 상태</b>${deepDive ? '공식문서 심화 대조 · 개인별 판정 제외' : '공식 안내 연결 · 내용 전문가 검수 전'}<br><small>기준일 ${item.asOf}</small></div>
    </header>
    <div class="detail-stats"><div><strong>${item.services.length}</strong><span>연결 서비스</span></div><div><strong>${item.steps.length}</strong><span>핵심 단계</span></div><div><strong>${item.reuseCandidates.length}</strong><span>재사용 후보정보</span></div><div><strong>${item.aiOpportunities.length}</strong><span>AI 개선기회</span></div></div>
    ${section('연결 서비스', item.slug === 'birth' ? '기본 절차와 조건부 지원을 나누고, 각 서비스의 적용조건부터 공식 원문까지 표시합니다.' : '서비스마다 책임기관·신청창구·해야 할 일·처리결과를 분리했습니다.', renderServices(item))}
    ${section('국민 여정', '기관 조직도가 아니라 당사자가 밟는 순서로 재구성했습니다.', `<div class="flow">${item.steps.map(s=>`<div class="flow-step"><span class="order">STEP ${String(s.order).padStart(2,'0')}</span><h3>${s.action}</h3><p>${s.actor}</p><small>산출 · ${s.output}</small></div>`).join('')}</div>`)}
    ${deepDive ? renderDeepDive(deepDive) : ''}
    ${section('서비스 진단', '반복 제출과 절차 단절을 데이터·AI 관점에서 봅니다.', `<div class="diagnosis"><div class="diag"><h3>↻ 다시 내는 정보</h3><ul>${item.reuseCandidates.map(x=>`<li>${x}</li>`).join('')}</ul></div><div class="diag"><h3>△ 막히는 지점</h3><ul>${item.friction.map(x=>`<li>${x}</li>`).join('')}</ul></div><div class="diag"><h3>✦ AI·제도개선 후보</h3><ul>${item.aiOpportunities.map(x=>`<li>${x}</li>`).join('')}</ul></div></div>`)}
    ${section('준비정보와 근거', '실제 신청 전에는 공식 원문에서 최신 요건을 다시 확인하세요.', `<h3>준비정보·서류</h3><ul>${item.documents.map(x=>`<li>${x}</li>`).join('')}</ul><h3>공식 출처</h3><div class="source-list">${item.sources.map(s=>`<a class="source-link" href="${s.url}" target="_blank" rel="noreferrer"><span>${s.name}</span><span>${s.status} ↗</span></a>`).join('')}</div><div class="notice"><strong>확인 필요</strong><br>${item.disclaimer}</div>`)}
  </article>`;
  tray.hidden = true;
  scrollTo(0,0);
}

function renderServices(item) {
  if (item.slug !== 'birth') {
    return `<div class="service-table-wrap"><table class="service-table detailed-services"><thead><tr><th>서비스</th><th>책임기관</th><th>신청창구</th><th>국민이 할 일</th><th>처리결과</th></tr></thead><tbody>${item.services.map(s=>`<tr><td><strong>${s.name}</strong><br><span class="tag">${s.status}</span></td><td>${s.agency}</td><td>${s.channel || '해당 서비스 공식 안내에서 확인'}</td><td>${s.action || s.note || '신청 필요 여부 확인'}</td><td>${s.result || '처리 결과 개별 확인'}</td></tr>`).join('')}</tbody></table></div>`;
  }
  const universal = item.services.filter(s => s.audiences.includes('모든 출생가구'));
  const conditional = item.services.filter(s => !s.audiences.includes('모든 출생가구'));
  const cards = (services) => `<div class="service-cards">${services.map(s=>`<article class="service-card"><div class="service-card-head"><div><span class="eyebrow">${s.status}</span><h3>${s.name}</h3></div><div class="audience-tags">${s.audiences.map(a=>`<span>${a}</span>`).join('')}</div></div><dl><div><dt>적용조건</dt><dd>${s.requirement}</dd></div><div><dt>책임기관</dt><dd>${s.agency}</dd></div><div><dt>신청창구</dt><dd>${s.channel}</dd></div><div><dt>국민이 할 일</dt><dd>${s.action}</dd></div><div><dt>처리결과</dt><dd>${s.result}</dd></div></dl><a class="official-link" href="${s.sourceUrl}" target="_blank" rel="noreferrer">공식 원문 확인 ↗</a></article>`).join('')}</div>`;
  return `<div class="service-group"><div class="group-title"><span>01</span><div><h3>모든 출생가구가 확인</h3><p>출생신고 후 기본적으로 확인할 신분·급여·건강·생활비 지원입니다.</p></div></div>${cards(universal)}</div><div class="service-group conditional"><div class="group-title"><span>02</span><div><h3>상황별 추가 확인</h3><p>어린이집 이용, 다자녀, 저소득, 장애, 한부모, 미숙아 등 해당 조건일 때 추가합니다.</p></div></div>${cards(conditional)}</div>`;
}

function section(title, intro, body) { return `<section class="section"><div class="section-grid"><div><h2>${title}</h2><p class="section-intro">${intro}</p></div><div>${body}</div></div></section>`; }

function renderDeepDive(detail) {
  return section('공식문서 심화', detail.verificationScope, `
    <div class="verified-banner"><strong>대표 사건 심화 검토 완료</strong><span>공식 원문 기준 · 개인별 판정 제외</span></div>
    <div class="checkpoint-list">${detail.officialCheckpoints.map((point, index) => `<article class="checkpoint"><span>${String(index + 1).padStart(2,'0')}</span><div><h3>확인사항 ${index + 1}</h3><p>${point}</p></div></article>`).join('')}</div>
    <div class="deep-meta"><div><h3>신청 대상·요건</h3><ul>${detail.eligibility.map(x=>`<li>${x}</li>`).join('')}</ul></div><div><h3>주요 지원·급여</h3><ul>${detail.benefits.map(x=>`<li>${x}</li>`).join('')}</ul></div></div>
    <div class="deep-meta"><div><h3>놓치면 안 되는 시점</h3><ul>${detail.deadlines.map(x=>`<li>${x}</li>`).join('')}</ul></div><div><h3>법적 근거</h3><ul>${detail.legalBasis.map(x=>`<li>${x}</li>`).join('')}</ul></div><div><h3>주의사항</h3><ul>${detail.cautions.map(x=>`<li>${x}</li>`).join('')}</ul></div></div>
    <h3>심화 검토 공식 출처</h3><div class="source-list">${detail.officialSources.map(s=>`<a class="source-link" href="${s.url}" target="_blank" rel="noreferrer"><span>${s.name}</span><span>${s.status} ↗</span></a>`).join('')}</div>`);
}

function renderTray() {
  if (!state.compare.length) { tray.hidden=true; return; }
  const selected = state.compare.map(slug=>journeys.find(x=>x.slug===slug)).filter(Boolean);
  tray.hidden=false;
  tray.innerHTML=`<div class="tray-row"><strong>비교 ${selected.length}/3</strong><div class="tray-items">${selected.map(x=>`<span class="tray-chip">${x.title}</span>`).join('')}</div><button id="clear-compare" class="btn ghost">초기화</button><button id="open-compare" class="btn" ${selected.length<2?'disabled':''}>같이 보기</button></div>`;
  tray.querySelector('#clear-compare').onclick=()=>{state.compare=[];renderCatalog();};
  tray.querySelector('#open-compare').onclick=()=>{ if(selected.length>=2) renderCompare(selected); };
}

function renderCompare(items) {
  const rows = [
    ['분야', x=>x.category], ['한 줄 설명', x=>x.summary], ['연결 서비스', x=>x.services.map(s=>s.name).join(' · ')], ['관련 기관', x=>x.agencies.join(' · ')],
    ['준비정보', x=>x.documents.join(' · ')], ['재사용 후보', x=>x.reuseCandidates.join(' · ')], ['핵심 병목', x=>x.friction.join(' · ')], ['AI 개선기회', x=>x.aiOpportunities.join(' · ')]
  ];
  const overlay=document.createElement('section'); overlay.className='compare-view'; overlay.setAttribute('role','dialog'); overlay.setAttribute('aria-modal','true'); overlay.innerHTML=`<header class="compare-head"><div><strong>생활사건 비교</strong> · ${items.length}개 사건</div><button class="btn" id="close-compare">닫기</button></header><div class="compare-grid" style="--cols:${items.length}"><div class="compare-label">비교 기준</div>${items.map(x=>`<div><strong>${x.title}</strong></div>`).join('')}${rows.map(([label,get])=>`<div class="compare-label">${label}</div>${items.map(x=>`<div>${get(x)}</div>`).join('')}`).join('')}</div>`;
  document.body.append(overlay); overlay.querySelector('#close-compare').onclick=()=>overlay.remove(); overlay.querySelector('#close-compare').focus();
}

function route() {
  const match=location.hash.match(/^#case\/(.+)$/);
  if(match) renderDetail(match[1]); else renderCatalog();
}
window.addEventListener('hashchange',route);
route();
