import { deepDives } from './deep-dives.js';
import { birthServices } from './birth-services.js';
import { jobLossServices } from './job-loss-services.js';
import { elderCareServices } from './elder-care-services.js';
import { expandedCases, expandedBySlug } from './expanded-cases.js';
import { additionalCases } from './additional-cases.js';
import { cases31to50 } from './cases-31-50.js';
import { attachDocumentRequirements } from './document-requirements.js';
import { startupCases01to03 } from './startup-cases-01-03.js';
import { startupCases04to07 } from './startup-cases-04-07.js';
import { startupCases08to10 } from './startup-cases-08-10.js';

const source = (name, url) => ({ name, url, status: '공식 원문 연결' });
const service = (name, agency, status = '확인', note = '') => ({ name, agency, status, note });
const step = (order, actor, action, output) => ({ order, actor, action, output });

const baseJourneys = [
  {
    slug: 'birth', icon: '01', title: '아이가 태어났어요', category: '가족·돌봄', summary: '출생신고부터 첫만남이용권·부모급여·아동수당까지 담당기관과 신청 결과를 서비스별로 안내합니다.',
    asOf: '2026-07-12',
    agencies: [
      '출생지·등록기준지 또는 신고인 주소지 관할 시청·구청·읍면사무소 가족관계등록 담당부서',
      '출생아 주민등록 주소지 읍·면·동 행정복지센터',
      '출생아 주민등록 주소지 관할 시·군·구 아동·출산지원 담당부서'
    ],
    keywords: ['출생', '출생신고', '행복출산', '첫만남이용권', '아동수당', '부모급여'],
    services: birthServices,
    steps: [
      step(1, '출산 의료기관', '부모에게 출생증명서를 발급하고 온라인 신고 이용 시 출생정보 전송 여부 안내', '출생증명서'),
      step(2, '부모 또는 법정 신고의무자', '출생 후 1개월 이내 관할 등록관서 또는 전자가족관계등록시스템에 출생신고', '출생신고 접수'),
      step(3, '관할 시청·구청·읍면사무소 가족관계등록 담당부서', '출생신고를 심사해 가족관계등록부에 기록', '가족관계등록 및 주민등록번호 부여 절차'),
      step(4, '출생아 주소지 읍·면·동 행정복지센터 또는 정부24', '행복출산 통합신청에서 첫만남이용권·부모급여·아동수당을 각각 선택', '급여별 신청 접수번호'),
      step(5, '관할 시·군·구 출산지원 담당부서', '첫만남이용권 대상과 지급정보를 확인', '국민행복카드 이용권 지급 결정'),
      step(6, '관할 시·군·구 영아복지 담당부서', '부모급여 대상·보육서비스 이용 여부·계좌를 확인', '부모급여 지급 결정'),
      step(7, '관할 시·군·구 아동수당 담당부서', '아동수당 대상·거주지역·지급계좌를 확인', '아동수당 지급 결정')
    ],
    documents: ['출생증명서', '신고인 신분증', '출생신고서', '보호자 명의 지급계좌 정보', '첫만남이용권 지급용 국민행복카드 정보'],
    reuseCandidates: ['출생신고로 생성된 가족관계·주민등록 정보', '보호자와 아동의 주소·관계 정보', '통합신청에 입력한 지급계좌'],
    friction: ['하나의 행복출산 신청서로 접수해도 첫만남이용권·부모급여·아동수당은 서로 다른 시·군·구 담당부서가 각각 결정하므로 급여별 처리결과 확인이 필요함'],
    aiOpportunities: ['출생신고 완료정보를 바탕으로 신청 가능한 3개 급여를 미리 채운 통합신청 제공', '급여별 접수·결정·지급 상태를 하나의 화면에서 추적'],
    sources: [source('정부24 행복출산 원스톱서비스', 'https://www.gov.kr/portal/onestopSvc/happyBirth')],
    disclaimer: '첫만남이용권·부모급여·아동수당 외 지자체 자체 출산지원은 출생아 주소지 시·군·구의 별도 기준을 확인해야 합니다.'
  },
  {
    slug: 'move', icon: '02', title: '이사를 했어요', category: '주거·재산', summary: '전입신고, 우편물 주소 변경, 학교·차량·공공요금 관련 후속조치를 연결합니다.',
    asOf: '2026-07-12', agencies: ['시·군·구', '정부24', '한국전력'], keywords: ['전입신고', '주소변경', '확정일자'],
    services: [service('전입신고', '정부24·주민센터', '신청'), service('주택 임대차 신고·확정일자 확인', '시·군·구'), service('우편물 주소 이전', '우정사업본부', '연계'), service('공공요금 명의·사용지 변경', '서비스 기관')],
    steps: [step(1, '세대주·세대원', '새 주소와 계약정보 확인', '임대차계약서'), step(2, '시·군·구', '전입신고 처리', '주민등록 주소 변경'), step(3, '관련기관', '주소정보 반영 및 부가서비스 신청', '기관별 변경 결과')],
    documents: ['신분증', '임대차계약서(해당 시)'], reuseCandidates: ['주민등록 주소', '세대관계', '부동산 계약정보'], friction: ['한 번 바뀐 주소가 모든 공공·민간 서비스에 자동 반영되지는 않음'], aiOpportunities: ['주거형태별 후속조치 자동 체크리스트', '미변경 기관 탐지'],
    sources: [source('정부24 전입신고 안내', 'https://www.gov.kr/'), source('찾기쉬운 생활법령정보', 'https://www.easylaw.go.kr/')], disclaimer: '임대차 신고와 확정일자 적용 여부는 계약 형태와 지역 등을 확인해야 합니다.'
  },
  {
    slug: 'job-loss', icon: '03', title: '일자리를 잃었어요', category: '일자리·사업', summary: '퇴직정산과 고용보험 확인부터 구직급여·재취업·사회보험·긴급생계까지 조건별로 안내합니다.',
    asOf: '2026-07-12', agencies: ['고용24·고용복지플러스센터', '국민건강보험공단', '국민연금공단', '시·군·구 긴급복지 담당'], keywords: ['실업급여', '구직급여', '퇴직', '임의계속가입', '실업크레딧', '긴급복지'],
    services: jobLossServices,
    steps: [step(1, '퇴직자', '이직사유·피보험기간 확인', '이직확인 정보'), step(2, '퇴직자', '구직등록과 교육 이수', '구직등록'), step(3, '고용센터', '수급자격 심사', '인정·불인정'), step(4, '수급자', '재취업활동 및 실업인정', '급여·취업지원')],
    documents: ['이직확인 관련 정보', '신분증', '본인계좌'], reuseCandidates: ['고용보험 가입이력', '이직정보', '소득정보'], friction: ['회사 제출정보와 신청인의 인식이 다르면 초기 처리가 지연될 수 있음'], aiOpportunities: ['이직 사유별 준비사항 설명', '실업인정 일정·활동 증빙 점검'],
    sources: [source('고용24', 'https://www.work24.go.kr/'), source('고용보험법', 'https://www.law.go.kr/법령/고용보험법')], disclaimer: '수급자격과 기간은 가입이력·이직사유·재취업활동에 따라 달라집니다.'
  },
  {
    slug: 'business-close', icon: '04', title: '사업을 접게 됐어요', category: '일자리·사업', summary: '폐업신고부터 세금, 사회보험, 근로자, 재기지원 후속업무를 놓치지 않게 정리합니다.',
    asOf: '2026-07-12', agencies: ['국세청', '4대사회보험 정보연계센터', '소상공인시장진흥공단'], keywords: ['폐업', '사업자', '재기지원'],
    services: [service('사업자 폐업신고', '국세청', '신청'), service('사회보험 사업장 탈퇴·상실', '사회보험기관', '신청'), service('근로관계 정산', '사업주'), service('희망리턴패키지 등 재기지원 확인', '소상공인시장진흥공단')],
    steps: [step(1, '사업자', '채무·계약·근로관계 현황 정리', '폐업 체크리스트'), step(2, '국세청', '폐업신고와 세무 후속 처리', '폐업사실'), step(3, '사회보험기관', '사업장·가입자 자격 정리', '상실 처리'), step(4, '지원기관', '재취업·재창업 지원 연계', '지원계획')],
    documents: ['사업자등록 관련 정보', '매출·매입 자료', '근로자·보험 정보'], reuseCandidates: ['사업자 상태', '매출정보', '고용·보험 가입정보'], friction: ['세무·보험·인허가·근로관계 종료가 기관별로 분절됨'], aiOpportunities: ['업종별 폐업 의무 자동 체크', '미처리 신고·계약 위험 알림'],
    sources: [source('국세청 홈택스', 'https://www.hometax.go.kr/'), source('희망리턴패키지', 'https://hope.sbiz.or.kr/')], disclaimer: '부가가치세·소득세 신고와 인허가 폐업은 업종과 시점별 확인이 필요합니다.'
  },
  {
    slug: 'disability', icon: '05', title: '장애가 생겼어요', category: '건강·복지', summary: '진단 이후 장애등록, 소득·활동·고용·이동 지원을 개인 상황에 맞춰 연결합니다.',
    asOf: '2026-07-12', agencies: ['시·군·구', '국민연금공단', '복지로'], keywords: ['장애등록', '활동지원', '연금'],
    services: [service('장애인 등록 신청', '시·군·구', '신청'), service('장애정도 심사', '국민연금공단', '연계'), service('장애인 활동지원 확인', '복지로'), service('소득·고용·이동 지원 확인', '관계기관')],
    steps: [step(1, '본인·가족', '진단과 생활상 어려움 정리', '진단서류'), step(2, '시·군·구', '등록 신청 접수', '심사 의뢰'), step(3, '심사기관', '장애정도 심사', '심사 결과'), step(4, '관계기관', '개별 서비스 자격 확인·신청', '지원 결정')],
    documents: ['장애유형별 진단서·검사자료', '신분증', '서비스별 소득·생활환경 정보'], reuseCandidates: ['장애등록 정보', '소득·재산', '건강보험 자격'], friction: ['등록 이후 지원제도를 다시 찾아 각각 신청해야 하는 부담'], aiOpportunities: ['장애유형·연령·생활상황별 서비스 추천', '진단서류 누락 점검'],
    sources: [source('복지로 장애인 서비스', 'https://www.bokjiro.go.kr/'), source('국민연금공단 장애등록심사', 'https://www.nps.or.kr/')], disclaimer: '장애등록과 개별 급여·서비스의 자격 기준은 서로 다릅니다.'
  },
  {
    slug: 'elder-care', icon: '06', title: '부모님 돌봄이 필요해졌어요', category: '가족·돌봄', summary: '장기요양 판정 전후, 재가·시설·치매·안전·의료비·가족돌봄을 상황별로 연결합니다.',
    asOf: '2026-07-12', agencies: ['국민건강보험공단', '시·군·구 통합돌봄 담당', '치매안심센터', '고용노동부'], keywords: ['장기요양', '노인돌봄', '요양', '치매', '통합돌봄', '가족돌봄휴가'],
    services: elderCareServices,
    steps: [step(1, '본인·가족', '일상생활 수행 어려움과 건강상태 확인', '돌봄 필요 목록'), step(2, '공단', '신청 접수·방문조사', '인정조사'), step(3, '등급판정위원회', '등급 및 급여 여부 결정', '인정서·이용계획'), step(4, '가족·기관', '서비스 선택·계약·이용', '돌봄 제공')],
    documents: ['장기요양 신청서', '의사소견서(대상에 따라)', '신분·건강보험 정보'], reuseCandidates: ['건강보험 자격', '건강·진료 정보', '가구·주소 정보'], friction: ['장기요양과 지자체 돌봄서비스의 차이를 가족이 직접 구분해야 함'], aiOpportunities: ['돌봄 필요도 기반 제도 구분 설명', '기관 비교 체크리스트 생성'],
    sources: [source('노인장기요양보험', 'https://www.longtermcare.or.kr/'), source('복지로', 'https://www.bokjiro.go.kr/')], disclaimer: '등급판정과 본인부담, 이용가능 서비스는 개인별 결과에 따릅니다.'
  },
  {
    slug: 'death', icon: '07', title: '가족이 사망했어요', category: '가족·돌봄', summary: '사망신고, 재산·채무 조회, 상속, 연금과 각종 계약 정리를 한 흐름으로 봅니다.',
    asOf: '2026-07-12', agencies: ['시·군·구', '정부24', '금융감독원'], keywords: ['사망신고', '안심상속', '상속'],
    services: [service('사망신고', '시·군·구', '신청'), service('안심상속 원스톱서비스', '정부24·주민센터', '연계'), service('상속재산·채무 확인', '관계기관'), service('연금·보험·계약 후속처리', '기관별')],
    steps: [step(1, '가족', '사망 관련 증명과 가족관계 확인', '사망진단서 등'), step(2, '시·군·구', '사망신고와 통합조회 신청', '등록·조회 접수'), step(3, '관계기관', '재산·채무 정보 회신', '통합조회 결과'), step(4, '상속인', '승인·한정승인·포기 등 후속 판단', '법적·재산상 처리')],
    documents: ['사망진단서 또는 검안서', '신고인 신분증', '가족관계 확인정보'], reuseCandidates: ['가족관계', '재산·세금·연금 정보', '금융·보험 정보'], friction: ['슬픔과 시간 압박 속에서 법정기간과 기관별 후속조치를 놓치기 쉬움'], aiOpportunities: ['관계·재산상황별 기한 중심 체크리스트', '미완료 계약·급여 정리 알림'],
    sources: [source('안심상속 원스톱서비스', 'https://www.gov.kr/portal/onestopSvc/safeInheritance'), source('찾기쉬운 생활법령정보 상속', 'https://www.easylaw.go.kr/')], disclaimer: '상속 승인·포기와 세금 문제는 법정기간이 있으므로 전문상담이 필요할 수 있습니다.'
  },
  {
    slug: 'jeonse-damage', icon: '08', title: '전세보증금을 돌려받지 못했어요', category: '주거·재산', summary: '권리보전, 피해상담·결정, 주거·금융·법률지원을 긴급도 순으로 정리합니다.',
    asOf: '2026-07-12', agencies: ['전세피해지원센터', 'HUG', '법률구조공단'], keywords: ['전세사기', '보증금', '임차권'],
    services: [service('전세피해 상담', '전세피해지원센터'), service('전세사기피해자 결정 신청', '관할기관', '신청'), service('임차권·경공매 등 권리구제 확인', '법률지원기관'), service('긴급주거·금융지원 확인', '지원기관')],
    steps: [step(1, '임차인', '계약·등기·보증·연락내역 보존', '증거 묶음'), step(2, '상담기관', '긴급도와 권리보전 수단 안내', '대응 계획'), step(3, '관할기관', '피해자 결정·지원요건 심사', '결정 결과'), step(4, '지원기관', '법률·주거·금융 지원 연계', '지원 실행')],
    documents: ['임대차계약서', '등기사항증명서', '보증금 지급내역', '임대인 연락·통지 자료'], reuseCandidates: ['임대차 신고정보', '등기정보', '보증가입·경공매 정보'], friction: ['법률절차와 지원절차가 병행되어 피해자가 순서를 판단하기 어려움'], aiOpportunities: ['상황별 긴급 권리보전 안내', '서류·기한 누락 경고'],
    sources: [source('HUG 전세피해지원', 'https://www.khug.or.kr/'), source('대한법률구조공단', 'https://www.klac.or.kr/')], disclaimer: '권리보전과 소송·경공매 대응은 계약과 등기 상태에 따라 달라지므로 즉시 전문상담을 권합니다.'
  },
  {
    slug: 'disaster', icon: '09', title: '재난 피해를 입었어요', category: '안전·긴급', summary: '신고·대피부터 피해사실 확인, 복구·구호·보험 지원까지 단계별로 연결합니다.',
    asOf: '2026-07-12', agencies: ['시·군·구', '국민재난안전포털', '보험기관'], keywords: ['재난', '피해신고', '복구'],
    services: [service('긴급 신고·대피', '112·119·지자체', '신청'), service('사유재산 피해신고', '시·군·구', '신청'), service('구호·복구 지원 확인', '관계기관'), service('보험·융자·세제지원 확인', '기관별')],
    steps: [step(1, '피해자', '생명안전 확보와 긴급 신고', '신고 기록'), step(2, '피해자·지자체', '사진·목록 등 피해사실 접수', '피해 신고'), step(3, '조사기관', '현장 확인과 지원대상 판단', '확인 결과'), step(4, '관계기관', '구호·복구·보험 지원 집행', '지원 내역')],
    documents: ['피해 현장 사진·영상', '소유·사용 관계 자료', '피해품목·금액 자료'], reuseCandidates: ['주소·가구정보', '재난지역·피해조사 정보', '보험가입 정보'], friction: ['정신없는 초기 상황에서 증빙을 확보하고 여러 기관에 반복 설명해야 함'], aiOpportunities: ['사진 기반 피해목록 초안', '재난유형·지역별 지원 자동 매칭'],
    sources: [source('국민재난안전포털', 'https://www.safekorea.go.kr/'), source('국민안전24', 'https://www.safetyreport.go.kr/')], disclaimer: '지원 범위와 신고기한은 재난 유형·지역·정부 결정에 따라 달라질 수 있습니다.'
  },
  {
    slug: 'overseas-emergency', icon: '10', title: '해외에서 긴급상황이 생겼어요', category: '안전·긴급', summary: '여권 분실, 사건·사고, 체포·입원 등 상황에서 영사조력과 현지 대응을 찾습니다.',
    asOf: '2026-07-12', agencies: ['외교부 영사콜센터', '재외공관', '현지기관'], keywords: ['해외', '여권분실', '영사조력'],
    services: [service('영사콜센터 긴급상담', '외교부', '신청'), service('재외공관 영사조력', '재외공관'), service('긴급여권 등 여행문서 확인', '재외공관', '신청'), service('신속해외송금·가족연락 등 가능수단 확인', '외교부')],
    steps: [step(1, '여행자', '신변안전 확보·현지 긴급번호 신고', '신고번호'), step(2, '영사콜센터·공관', '위치·신원·상황 확인', '조력 계획'), step(3, '현지기관', '수사·의료·출입국 절차 처리', '현지 절차 결과'), step(4, '공관·가족', '귀국·연락·문서 후속 지원', '귀국 또는 현지 안정')],
    documents: ['여권 사본·신원정보', '현지 신고번호', '항공·숙소·보험 정보'], reuseCandidates: ['여권·출입국 정보', '여행자보험 정보', '긴급연락처'], friction: ['시차·언어·관할 공관을 모르는 상태에서 초기 대응이 지연될 수 있음'], aiOpportunities: ['현재 위치 기반 공관·긴급번호 안내', '다국어 상황 설명문 생성'],
    sources: [source('외교부 해외안전여행', 'https://www.0404.go.kr/'), source('영사민원24', 'https://consul.mofa.go.kr/')], disclaimer: '영사조력에는 현지 법령과 국제관계에 따른 범위·한계가 있습니다.'
  }
];

const existingSlugs = new Set(baseJourneys.map(item => item.slug));
const assembledJourneys = [
  ...baseJourneys.map(item => expandedBySlug[item.slug] ? { ...item, ...expandedBySlug[item.slug] } : item),
  ...expandedCases.filter(item => !existingSlugs.has(item.slug)),
  ...additionalCases,
  ...cases31to50
];

const startupSubcases = [...startupCases01to03, ...startupCases04to07, ...startupCases08to10];
const journeysWithStartupSubcases = assembledJourneys.flatMap(item => item.slug === 'startup' ? [item, ...startupSubcases] : [item]);

const canonicalCategory = (category) => {
  if (/교육|청년/.test(category)) return '교육·청년';
  if (/주거|재산/.test(category)) return '주거·재산';
  if (/금융|세금/.test(category)) return '금융·세금';
  if (/일자리|사업|노후/.test(category)) return '일자리·사업';
  if (/건강|복지/.test(category)) return '건강·복지';
  if (/안전|권리|국방|보훈/.test(category)) return '안전·권리';
  if (/행정|해외/.test(category)) return '행정·해외';
  return '가족·돌봄';
};

export const journeys = journeysWithStartupSubcases.map(item => attachDocumentRequirements({
  ...item,
  category: canonicalCategory(item.category),
  sources: item.sources || item.deepDive?.officialSources || [],
}));

for (const item of journeys) {
  const detail = deepDives[item.slug];
  if (!detail) continue;
  item.depth = detail.depth;
  item.eligibility = detail.eligibility;
  item.deadlines = detail.deadlines;
  item.benefits = detail.benefits;
  item.sources = detail.officialSources.map((entry) => ({
    name: entry.name,
    url: entry.url,
    status: entry.status
  }));
}
