import test from 'node:test';
import assert from 'node:assert/strict';
import { journeys } from '../src/data/journeys.js';

test('MVP는 서로 다른 10개 생활사건을 제공한다', () => {
  assert.equal(journeys.length, 10);
  assert.equal(new Set(journeys.map(x => x.slug)).size, 10);
});

test('모든 사건은 서비스·단계·진단·공식 출처를 가진다', () => {
  for (const item of journeys) {
    assert.ok(item.title && item.summary && item.category && item.asOf);
    assert.ok(item.services.length >= 3, item.slug);
    assert.ok(item.steps.length >= 3, item.slug);
    assert.ok(item.friction.length >= 1, item.slug);
    assert.ok(item.reuseCandidates.length >= 1, item.slug);
    assert.ok(item.aiOpportunities.length >= 1, item.slug);
    assert.ok(item.sources.length >= 1, item.slug);
    for (const source of item.sources) assert.match(source.url, /^https:\/\//);
  }
});

test('단계 순서는 1부터 연속되고 서비스 상태는 허용값만 사용한다', () => {
  const allowed = new Set(['확인', '신청', '연계']);
  for (const item of journeys) {
    assert.deepEqual(item.steps.map(x => x.order), item.steps.map((_, i) => i + 1));
    for (const service of item.services) assert.ok(allowed.has(service.status));
  }
});

test('대표 3개 사건은 공식문서 기반 심층 안내를 제공한다', () => {
  const featured = ['birth', 'job-loss', 'elder-care'];
  for (const slug of featured) {
    const item = journeys.find(x => x.slug === slug);
    assert.ok(item, slug);
    assert.equal(item.depth, 'official-deep-dive', slug);
    assert.ok(item.eligibility.length >= 3, slug);
    assert.ok(item.deadlines.length >= 2, slug);
    assert.ok(item.benefits.length >= 3, slug);
    assert.ok(item.sources.length >= 5, slug);
    assert.ok(item.sources.every(x => x.url.startsWith('https://')), slug);
  }
});

test('대표 사건의 공식 근거는 일반 포털 홈이 아니라 구체 안내 또는 법령을 가리킨다', () => {
  const featured = journeys.filter(x => x.depth === 'official-deep-dive');
  const genericHomes = new Set([
    'https://www.bokjiro.go.kr/',
    'https://www.work24.go.kr/',
    'https://www.longtermcare.or.kr/'
  ]);
  assert.equal(featured.length, 3);
  for (const item of featured) {
    assert.ok(item.sources.every(source => !genericHomes.has(source.url)), item.slug);
  }
});

test('출생 사건은 국민에게 관계기관·개별서비스를 다시 찾게 하지 않는다', () => {
  const birth = journeys.find(x => x.slug === 'birth');
  const forbidden = /관계기관|기관별|개별\s*서비스|서비스별|아동·양육 지원 확인/;
  const visibleText = JSON.stringify({
    agencies: birth.agencies,
    services: birth.services,
    steps: birth.steps,
    documents: birth.documents,
    friction: birth.friction
  });
  assert.doesNotMatch(visibleText, forbidden);

  const serviceNames = new Set(birth.services.map(x => x.name));
  for (const name of ['출생신고', '행복출산 원스톱서비스', '첫만남이용권', '부모급여', '아동수당']) {
    assert.ok(serviceNames.has(name), name);
  }
  for (const entry of birth.services) {
    assert.ok(entry.agency && entry.channel && entry.action && entry.result, entry.name);
  }
  assert.ok(birth.steps.length >= 6);
});

test('출생 사건은 보편 서비스와 조건부 지원을 공식 근거와 함께 분기한다', () => {
  const birth = journeys.find(x => x.slug === 'birth');
  assert.ok(birth.services.length >= 14);

  const requiredNames = [
    '건강보험 자격 확인·피부양자 신고',
    '국가예방접종',
    '영유아 건강검진',
    '어린이집 입소대기',
    '어린이집 보육료',
    '아이돌봄서비스',
    '출산가구 전기요금 할인',
    '도시가스요금 경감',
    '저소득층 기저귀·조제분유 지원',
    '여성장애인 출산비용 지원',
    '한부모가족 아동양육비',
    '미숙아·선천성이상아 의료비 지원'
  ];
  const names = new Set(birth.services.map(x => x.name));
  for (const name of requiredNames) assert.ok(names.has(name), name);

  const audiences = new Set(birth.services.flatMap(x => x.audiences || []));
  for (const audience of ['모든 출생가구', '둘째 이상', '3자녀 이상', '저소득', '등록 여성장애인', '한부모', '미숙아·선천성이상아']) {
    assert.ok(audiences.has(audience), audience);
  }

  for (const entry of birth.services) {
    assert.ok(entry.requirement, `${entry.name}: requirement`);
    assert.ok(entry.deadline, `${entry.name}: deadline`);
    assert.match(entry.sourceUrl, /^https:\/\//, `${entry.name}: sourceUrl`);
  }
});

test('출생 사건은 저소득·장애 조건을 부모와 아동 단위로 구분한다', () => {
  const birth = journeys.find(x => x.slug === 'birth');
  const byName = new Map(birth.services.map(x => [x.name, x]));
  assert.ok(byName.has('기초생활수급자 해산급여'));
  assert.ok(byName.has('장애아동수당·장애아가족 양육지원'));
  const gas = byName.get('도시가스요금 경감');
  assert.ok(gas);
  for (const audience of ['3자녀 이상', '저소득', '등록 장애인 가구']) {
    assert.ok(gas.audiences.includes(audience), audience);
  }
});

test('출생 사건은 신생아 검사와 고위험 임산부 지원을 별도 서비스로 구분한다', () => {
  const names = new Set(journeys.find(x => x.slug === 'birth').services.map(x => x.name));
  assert.ok(names.has('선천성대사이상 검사·환아관리'));
  assert.ok(names.has('선천성 난청검사·보청기 지원'));
  assert.ok(names.has('고위험 임산부 의료비 지원'));
  assert.ok(!names.has('선천성대사이상·난청 검사 및 환아관리'));
});
