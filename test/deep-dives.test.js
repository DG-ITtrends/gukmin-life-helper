import test from 'node:test';
import assert from 'node:assert/strict';
import { deepDives } from '../src/data/deep-dives.js';

test('50개 사건에 공식문서 기반 심화정보가 있다', () => {
  assert.equal(Object.keys(deepDives).length, 50);
  for (const detail of Object.values(deepDives)) {
    assert.ok(detail.officialCheckpoints.length >= 4);
    assert.ok(detail.deadlines.length >= 1);
    assert.ok(detail.legalBasis.length >= 1);
    assert.ok(detail.officialSources.length >= 2);
    for (const source of detail.officialSources) assert.match(source.url, /^https:\/\//);
  }
});

test('심화정보는 확인범위를 명시해 조문 존재확인과 내용검수를 구분한다', () => {
  for (const detail of Object.values(deepDives)) {
    assert.match(detail.verificationScope, /공식|원문/);
    assert.ok(detail.cautions.length >= 1);
  }
});
