import { expandedDeepDives } from './expanded-cases.js';
import { additionalDeepDives } from './additional-cases.js';
import { deep31to50 } from './cases-31-50.js';

const official = (name, url) => ({ name, url, status: '공식 원문 확인' });

const baseDeepDives = {
  birth: {
    depth: 'official-deep-dive',
    verificationScope: '2026-07-12 기준 정부24·보건복지부·국가법령정보센터 공식 원문과 안내에서 대상·기한·지원수준을 확인했습니다.',
    eligibility: [
      '출생신고는 신고의무자가 출생 후 1개월 이내에 해야 합니다.',
      '부모급여는 0~23개월 아동이 대상입니다.',
      '아동수당은 2026년 현재 만 9세 미만 아동이 대상이며 지역에 따라 지급액이 달라집니다.'
    ],
    deadlines: [
      '출생신고: 출생 후 1개월 이내',
      '행복출산 통합신청: 출생신고와 동시에 또는 출생신고 후 신청',
      '급여별 소급·사용기한은 신청 시 해당 공식 안내에서 다시 확인'
    ],
    benefits: [
      '첫만남이용권: 출생아에게 200만 원 이상 이용권 지원(출생순위 등 세부기준 확인)',
      '부모급여: 0세 월 100만 원, 1세 월 50만 원',
      '아동수당: 아동 1명당 월 10만~13만 원(거주지역·지급방식에 따라 차등)'
    ],
    officialCheckpoints: [
      '출생증명서의 성명·출생일시와 신고내용을 대조합니다.',
      '출생신고 완료 후 행복출산 원스톱서비스 신청 여부를 확인합니다.',
      '부모급여·아동수당 지급계좌와 보호자 정보를 확인합니다.',
      '지자체 자체 출산지원은 거주지 기준을 별도로 확인합니다.'
    ],
    legalBasis: ['가족관계의 등록 등에 관한 법률 제44조', '아동수당법'],
    cautions: ['어린이집 이용 여부에 따라 부모급여 지급방식이 달라질 수 있고, 지자체 사업은 거주요건·금액이 서로 다릅니다.'],
    officialSources: [
      official('정부24 출생신고', 'https://www.gov.kr/mw/AA020InfoCappView.do?CappBizCD=12700000045'),
      official('정부24 행복출산 통합처리 신청', 'https://www.gov.kr/mw/AA020InfoCappView.do?CappBizCD=17410000001'),
      official('보건복지부 임신·출산 지원(첫만남이용권)', 'https://www.mohw.go.kr/menu.es?mid=a10711020100'),
      official('보건복지부 부모급여', 'https://www.mohw.go.kr/menu.es?mid=a10711030600'),
      official('보건복지부 아동수당', 'https://www.mohw.go.kr/menu.es?mid=a10711030100'),
      official('가족관계등록법 제44조', 'https://law.go.kr/법령/가족관계의등록등에관한법률/제44조')
    ]
  },
  'job-loss': {
    depth: 'official-deep-dive',
    verificationScope: '2026-07-12 기준 고용24·찾기쉬운 생활법령정보·국가법령정보센터 공식 원문에서 수급요건·기간·산정원칙을 확인했습니다.',
    eligibility: [
      '일반 근로자는 원칙적으로 이직 전 18개월 동안 피보험단위기간 180일 이상이어야 합니다.',
      '근로 의사와 능력이 있는데도 취업하지 못한 상태여야 합니다.',
      '이직사유가 수급 제한사유에 해당하지 않고 적극적으로 재취업활동을 해야 합니다.'
    ],
    deadlines: [
      '구직급여 수급기간: 원칙적으로 이직일 다음 날부터 12개월',
      '회사 이직확인서 처리와 구직신청을 확인한 뒤 지체하지 말고 수급자격 절차 진행',
      '실업인정일마다 지정된 방식으로 재취업활동을 신고'
    ],
    benefits: [
      '구직급여일액: 원칙적으로 기초일액의 60%를 기준으로 산정',
      '소정급여일수: 연령과 피보험기간에 따라 일반적으로 120~270일',
      '수급자격이 없거나 종료된 경우에도 국민취업지원제도 등 별도 취업지원을 확인'
    ],
    officialCheckpoints: [
      '고용보험 피보험자격과 사업주 이직확인서 처리 여부를 확인합니다.',
      '고용24에서 구직신청 및 수급자격 관련 온라인 교육·절차를 확인합니다.',
      '관할 고용센터의 수급자격 인정 절차를 진행합니다.',
      '지정된 실업인정일과 재취업활동 증빙을 관리합니다.'
    ],
    legalBasis: ['고용보험법 제40조', '고용보험법 제48조', '고용보험법 제50조 및 별표 1'],
    cautions: ['자발적 이직도 법정 정당사유가 인정되는 경우가 있으므로 사유를 임의 판단하지 말고 고용센터에 증빙과 함께 확인해야 합니다.'],
    officialSources: [
      official('고용24 개인 실업급여 안내', 'https://ei.work24.go.kr/ei/eih/cm/hm/main.do'),
      official('고용24 구직급여 모의계산', 'https://www.work24.go.kr/cm/c/f/1100/selecSimulate.do?currentPageNo=1&recordCountPerPage=10&upprSystClId=SC00000001&systClId=SC00000010&systId=SI00000001&systCnntId=CI00000004'),
      official('찾기쉬운 생활법령정보 수급대상', 'https://www.easylaw.go.kr/CSP/CnpClsMainBtr.laf?csmSeq=722&ccfNo=2&cciNo=1&cnpClsNo=1'),
      official('찾기쉬운 생활법령정보 수급일수', 'https://www.easylaw.go.kr/CSP/CnpClsMain.laf?popMenu=ov&csmSeq=722&ccfNo=2&cciNo=3&cnpClsNo=1'),
      official('찾기쉬운 생활법령정보 수급액', 'https://www.easylaw.go.kr/CSP/CnpClsMainBtr.laf?csmSeq=722&ccfNo=2&cciNo=3&cnpClsNo=2'),
      official('고용보험법', 'https://law.go.kr/법령/고용보험법')
    ]
  },
  'elder-care': {
    depth: 'official-deep-dive',
    verificationScope: '2026-07-12 기준 국민건강보험공단·장기요양보험·국가법령정보센터 공식 원문에서 신청자격·조사·판정기한·급여구조를 확인했습니다.',
    eligibility: [
      '65세 이상 또는 65세 미만으로 노인성 질병이 있는 사람 중 6개월 이상 혼자 일상생활을 수행하기 어렵다고 인정되는 경우를 중심으로 신청합니다.',
      '본인뿐 아니라 가족·친족·이해관계인 등이 법정 범위에서 대리 신청할 수 있습니다.',
      '장기요양과 별도로 치매안심센터·노인맞춤돌봄 등 지역서비스의 대상 여부를 확인할 수 있습니다.'
    ],
    deadlines: [
      '등급판정위원회는 원칙적으로 신청일부터 30일 이내 판정을 완료하며 부득이한 경우 30일 범위에서 연장할 수 있습니다.',
      '의사소견서는 원칙적으로 제출해야 하며 65세 이상은 등급판정위원회 심의자료 제출 전까지 제출할 수 있습니다.',
      '인정 유효기간과 갱신 신청 시기는 인정서에서 개별 확인'
    ],
    benefits: [
      '재가급여: 방문요양·방문목욕·방문간호·주야간보호·단기보호 등',
      '시설급여: 노인요양시설 등 입소 서비스',
      '특별현금급여: 법정 요건에 해당할 때 가족요양비 등 지급'
    ],
    officialCheckpoints: [
      '공단에 장기요양인정신청서와 신분·대리관계 자료를 제출합니다.',
      '공단 직원의 인정조사에서 실제 일상생활 수행상태를 설명합니다.',
      '의사소견서 제출대상·기한을 확인합니다.',
      '등급판정 후 장기요양인정서와 개인별장기요양이용계획서를 바탕으로 기관을 비교·계약합니다.'
    ],
    legalBasis: ['노인장기요양보험법 제12조~제15조', '노인장기요양보험법 제16조', '노인장기요양보험법 제40조'],
    cautions: ['장기요양등급은 질병명만으로 정하지 않고 심신상태와 일상생활 수행 필요도를 조사해 판정합니다. 비급여 항목과 감경 여부도 계약 전에 확인해야 합니다.'],
    officialSources: [
      official('국민건강보험 장기요양보험 개요', 'https://www.nhis.or.kr/static/html/wbda/c/wbdac01.html'),
      official('국민건강보험 장기요양 인정신청', 'https://www.nhis.or.kr/static/html/wbda/c/wbdac02.html'),
      official('국민건강보험 장기요양 등급판정', 'https://www.nhis.or.kr/static/html/wbda/c/wbdac03.html'),
      official('노인장기요양보험법', 'https://law.go.kr/법령/노인장기요양보험법'),
      official('노인장기요양보험법 시행령', 'https://law.go.kr/법령/노인장기요양보험법시행령'),
      official('노인장기요양보험법 시행규칙', 'https://law.go.kr/법령/노인장기요양보험법시행규칙')
    ]
  }
};

export const deepDives = { ...expandedDeepDives, ...additionalDeepDives, ...deep31to50, ...baseDeepDives };
