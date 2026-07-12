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
