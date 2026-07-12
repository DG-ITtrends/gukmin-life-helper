import test from 'node:test';
import assert from 'node:assert/strict';
import { filterJourneys, summarizeJourneys, toggleComparison } from '../src/lib/catalog.js';

const sample = [
  { slug: 'birth', title: '아이가 태어났어요', category: '가족', summary: '출생신고와 첫 지원', services: [{ name: '출생신고' }], agencies: ['주민센터'] },
  { slug: 'job-loss', title: '일자리를 잃었어요', category: '일자리', summary: '실업급여와 재취업', services: [{ name: '구직급여' }, { name: '취업지원' }], agencies: ['고용센터'] }
];

test('검색어는 제목·요약·서비스·기관을 함께 찾는다', () => {
  assert.deepEqual(filterJourneys(sample, { query: '고용센터', category: '전체' }).map(x => x.slug), ['job-loss']);
  assert.deepEqual(filterJourneys(sample, { query: '출생신고', category: '전체' }).map(x => x.slug), ['birth']);
});

test('분야 필터와 검색어를 동시에 적용한다', () => {
  assert.deepEqual(filterJourneys(sample, { query: '지원', category: '가족' }).map(x => x.slug), ['birth']);
  assert.equal(filterJourneys(sample, { query: '지원', category: '일자리' }).length, 1);
});

test('카탈로그 통계를 계산한다', () => {
  assert.deepEqual(summarizeJourneys(sample), { journeys: 2, services: 3, agencies: 2 });
});

test('비교 선택은 최대 3개이며 다시 누르면 해제된다', () => {
  assert.deepEqual(toggleComparison(['a', 'b'], 'a'), ['b']);
  assert.deepEqual(toggleComparison(['a', 'b'], 'c'), ['a', 'b', 'c']);
  assert.deepEqual(toggleComparison(['a', 'b', 'c'], 'd'), ['a', 'b', 'c']);
});
