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
