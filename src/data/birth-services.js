const service = ({ name, audiences, requirement, agency, channel, action, result, sourceUrl }) => ({
  name,
  audiences,
  requirement,
  agency,
  channel,
  action,
  result,
  sourceUrl,
  status: '신청'
});

export const birthServices = [
  service({
    name: '출생신고',
    audiences: ['모든 출생가구'],
    requirement: '신고의무자가 출생 후 1개월 이내 신고',
    agency: '출생지·등록기준지 또는 신고인 주소지 관할 시청·구청·읍면사무소 가족관계등록 담당부서',
    channel: '관할 등록관서 방문·우편 또는 전자가족관계등록시스템(온라인 출생신고 대상 의료기관 이용 시)',
    action: '출생신고서와 출생증명서 제출',
    result: '가족관계등록부 기록 및 주민등록번호 부여 절차 진행',
    sourceUrl: 'https://www.gov.kr/mw/AA020InfoCappView.do?CappBizCD=12700000045'
  }),
  service({
    name: '행복출산 원스톱서비스',
    audiences: ['모든 출생가구'],
    requirement: '출생신고를 마친 뒤 통합신청 가능한 출산지원 선택',
    agency: '출생아 주민등록 주소지 읍·면·동 행정복지센터',
    channel: '행정복지센터 방문 또는 정부24 행복출산 통합신청',
    action: '첫만남이용권·부모급여·아동수당·전기요금 할인 등 해당 항목 선택',
    result: '선택한 신청이 각 제도의 심사·결정 기관으로 전달',
    sourceUrl: 'https://www.gov.kr/mw/AA020InfoCappView.do?CappBizCD=17410000001'
  }),
  service({
    name: '첫만남이용권',
    audiences: ['모든 출생가구', '둘째 이상'],
    requirement: '출생신고되어 주민등록번호를 부여받은 출생아',
    agency: '출생아 주소지 관할 시·군·구 출산지원 담당부서',
    channel: '읍·면·동 행정복지센터, 복지로 또는 행복출산 원스톱서비스',
    action: '사회보장급여 신청서와 국민행복카드 지급정보 제출',
    result: '첫째 200만 원, 둘째 이상 300만 원 이용권 지급',
    sourceUrl: 'https://www.mohw.go.kr/menu.es?mid=a10711020100'
  }),
  service({
    name: '부모급여',
    audiences: ['모든 출생가구'],
    requirement: '0~23개월 아동',
    agency: '출생아 주소지 관할 시·군·구 영아복지 담당부서',
    channel: '읍·면·동 행정복지센터, 복지로 또는 행복출산 원스톱서비스',
    action: '지급계좌와 어린이집·종일제 아이돌봄 이용 여부를 포함해 신청',
    result: '0세 월 100만 원, 1세 월 50만 원을 현금 또는 보육·돌봄 바우처로 지급',
    sourceUrl: 'https://www.mohw.go.kr/menu.es?mid=a10711030600'
  }),
  service({
    name: '아동수당',
    audiences: ['모든 출생가구'],
    requirement: '2026년 기준 만 9세 미만 아동',
    agency: '출생아 주소지 관할 시·군·구 아동수당 담당부서',
    channel: '읍·면·동 행정복지센터, 복지로 또는 행복출산 원스톱서비스',
    action: '아동·보호자 정보와 지급계좌 제출',
    result: '거주지역에 따라 아동 1명당 월 10만~13만 원 지급',
    sourceUrl: 'https://www.mohw.go.kr/menu.es?mid=a10711030100'
  }),
  service({
    name: '건강보험 자격 확인·피부양자 신고',
    audiences: ['모든 출생가구', '직장가입자 가구'],
    requirement: '출생신고 후 부모의 건강보험 가입형태에 따라 신생아 자격 반영 여부 확인; 직장가입자 피부양자로 올릴 경우 신고',
    agency: '국민건강보험공단 자격부과 담당부서',
    channel: '국민건강보험공단 지사·홈페이지·The건강보험 또는 직장 건강보험 담당자',
    action: '신생아 주민등록번호 발급 후 자격 반영을 조회하고 미반영 시 피부양자 자격취득 신고',
    result: '신생아 건강보험 자격·피부양자 취득일 확정',
    sourceUrl: 'https://www.nhis.or.kr/static/html/wbdb/f/wbdbf0301.html'
  }),
  service({
    name: '국가예방접종',
    audiences: ['모든 출생가구'],
    requirement: '국가예방접종 대상 연령·일정에 해당하는 영유아',
    agency: '질병관리청·관할 보건소',
    channel: '보건소 또는 국가예방접종 위탁의료기관',
    action: '예방접종도우미에서 일정과 위탁기관을 확인해 B형간염·BCG 등 접종',
    result: '국가예방접종 비용 지원 및 접종기록 등록',
    sourceUrl: 'https://nip.kdca.go.kr/irhp/infm/goVcntInfo.do?menuLv=1&menuCd=115'
  }),
  service({
    name: '영유아 건강검진',
    audiences: ['모든 출생가구'],
    requirement: '건강보험 영유아 검진대상; 1차 검진은 생후 14~35일',
    agency: '국민건강보험공단 건강검진 담당부서',
    channel: '전국 지정 영유아 검진기관',
    action: 'The건강보험 또는 공단 홈페이지에서 대상·기관을 확인하고 문진표 작성 후 예약',
    result: '성장·발달·청각·시각 등 검진결과와 육아상담 제공',
    sourceUrl: 'https://www.nhis.or.kr/static/html/wbma/c/wbhaca04800_2025.pdf'
  }),
  service({
    name: '어린이집 입소대기',
    audiences: ['어린이집 이용 예정'],
    requirement: '만 0~5세 아동; 미재원 아동은 최대 3개소, 재원 아동은 최대 2개소 신청',
    agency: '보건복지부 보육통합정보시스템·신청 어린이집',
    channel: '임신육아종합포털 아이사랑',
    action: '아동등록 → 어린이집 검색 → 희망 어린이집별 등록대기 신청 → 우선순위 증빙 제출',
    result: '어린이집별 대기순번 등록 및 입소대상 확정 통보',
    sourceUrl: 'https://www.childcare.go.kr/?menuno=172'
  }),
  service({
    name: '어린이집 보육료',
    audiences: ['어린이집 이용 예정'],
    requirement: '만 0~5세 어린이집 이용 아동; 가정양육·부모급여와 급여형태 변경 필요',
    agency: '출생아 주소지 관할 시·군·구 보육료 담당부서',
    channel: '읍·면·동 행정복지센터 또는 복지로',
    action: '어린이집 입소일 전에 보육료 자격으로 변경 신청하고 국민행복카드 준비',
    result: '연령·보육유형에 따른 어린이집 보육료를 국민행복카드로 지원',
    sourceUrl: 'https://www.bokjiro.go.kr/ssis-tbu/cms/pc/customer/notice/1209821_1141.html'
  }),
  service({
    name: '아이돌봄서비스',
    audiences: ['가정돌봄 필요', '저소득', '다자녀'],
    requirement: '12세 이하 아동 가정; 소득·가구특성에 따라 정부지원 비율 차등',
    agency: '성평등가족부·주소지 읍면동 정부지원 판정부서·지역 서비스제공기관',
    channel: '읍·면·동 행정복지센터 또는 복지로에서 정부지원 판정 후 아이돌봄서비스 누리집',
    action: '정부지원 자격 신청 → 판정 후 아동등록·예치금 충전 → 시간제·영아종일제 신청',
    result: '아이돌보미 연계 및 소득·가구유형별 이용요금 지원',
    sourceUrl: 'https://www.idolbom.go.kr/front/srvcUtztnGuide/govApply'
  }),
  service({
    name: '출산가구 전기요금 할인',
    audiences: ['모든 출생가구'],
    requirement: '주민등록표상 출생일로부터 3년 미만 영아가 포함된 주거용 가구',
    agency: '한국전력공사 요금복지 담당부서',
    channel: '한전ON·고객센터 123·지사·아파트 관리사무소 또는 행복출산 원스톱서비스',
    action: '전기사용 고객번호와 출생아 주민등록 정보를 제출해 할인 신청',
    result: '월 전기요금 30% 할인, 월 1만6천 원 한도',
    sourceUrl: 'https://cyber.kepco.co.kr/ckepco/front/jsp/CY/H/C/CYHCHP00209.jsp'
  }),
  service({
    name: '도시가스요금 경감',
    audiences: ['3자녀 이상', '저소득', '등록 장애인 가구'],
    requirement: '3자녀 이상 가구, 장애인, 기초생활수급자·차상위 등 도시가스사업법령상 사회적 배려대상 가구',
    agency: '거주지역 도시가스회사 요금경감 담당부서',
    channel: '지역 도시가스회사·주민센터·정부24 또는 도시가스요금 경감 대신신청',
    action: '도시가스 고객번호와 신청서를 제출하고, 다자녀는 가족관계자료·장애/저소득은 해당 자격정보로 확인',
    result: '대상 유형과 계절에 따른 정부 고시 기준으로 도시가스요금 경감',
    sourceUrl: 'https://www.kogas.or.kr/site/koGas/1020408010000'
  }),
  service({
    name: '저소득층 기저귀·조제분유 지원',
    audiences: ['저소득', '한부모', '장애가구'],
    requirement: '0~24개월 영아를 둔 기초생활·차상위·한부모 등 기준 충족 가구; 조제분유는 추가 요건',
    agency: '영아 주소지 관할 시·군·구 보건소 모자보건 담당부서',
    channel: '보건소·읍면동 행정복지센터 또는 복지로',
    action: '출생 후 60일 이내 신청하면 24개월 전 기간 지원 가능하므로 자격서류와 함께 신청',
    result: '기저귀 월 9만 원, 조제분유 월 11만 원 구매비를 국민행복카드 바우처로 지급',
    sourceUrl: 'https://www.mohw.go.kr/menu.es?mid=a10711020100'
  }),
  service({
    name: '기초생활수급자 해산급여',
    audiences: ['저소득', '기초생활수급자'],
    requirement: '생계·의료·주거급여 수급자가 출산한 경우 등 국민기초생활보장 해산급여 요건 충족',
    agency: '산모 주소지 관할 시·군·구 기초생활보장 담당부서',
    channel: '읍·면·동 행정복지센터 또는 정부24 행복출산 원스톱서비스',
    action: '해산급여 지원신청서와 출생 또는 출산예정 사실 확인자료 제출',
    result: '출산한 수급자에게 해산급여 지급; 쌍둥이 등 추가 출생아는 출생아별 산정',
    sourceUrl: 'https://www.gov.kr/mw/AA020InfoCappView.do?HighCtgCD=A05003&CappBizCD=14600000278'
  }),
  service({
    name: '여성장애인 출산비용 지원',
    audiences: ['등록 여성장애인'],
    requirement: '등록 여성장애인이 출산하거나 임신 4개월 이상 태아를 유산·사산한 경우',
    agency: '주소지 관할 시·군·구 장애인복지 담당부서',
    channel: '읍·면·동 행정복지센터 또는 복지로',
    action: '신분증·통장사본과 출산 또는 유산·사산 확인서류 제출',
    result: '태아 1명 기준 출산비용 현금 지원',
    sourceUrl: 'https://mohw.go.kr/menu.es?mid=a10710060800'
  }),
  service({
    name: '장애아동수당·장애아가족 양육지원',
    audiences: ['장애가 확인된 아동', '저소득 장애아동'],
    requirement: '출생 후 장애등록된 아동 중 장애아동수당의 소득요건 또는 장애아가족 양육지원의 장애정도·가구요건 충족',
    agency: '아동 주소지 관할 시·군·구 장애인복지 담당부서',
    channel: '읍·면·동 행정복지센터 또는 복지로',
    action: '장애등록 후 장애정도·소득·돌봄 필요에 맞춰 장애아동수당과 돌봄서비스를 각각 신청',
    result: '저소득 등록 장애아동 수당 또는 장애아 돌보미·휴식지원 서비스 제공',
    sourceUrl: 'https://mohw.go.kr/menu.es?mid=a10710030200'
  }),
  service({
    name: '한부모가족 아동양육비',
    audiences: ['한부모', '저소득'],
    requirement: '소득기준을 충족하는 한부모·조손가족의 18세 미만 아동 등',
    agency: '주소지 관할 시·군·구 한부모가족지원 담당부서',
    channel: '읍·면·동 행정복지센터 또는 복지로',
    action: '한부모가족 지원 신청서와 소득·재산 조사 동의자료 제출',
    result: '일반 저소득 한부모 아동 월 23만 원 등 가구유형별 양육비 지급',
    sourceUrl: 'https://www.mogef.go.kr/cs/opf/cs_opf_f921.do'
  }),
  service({
    name: '미숙아·선천성이상아 의료비 지원',
    audiences: ['미숙아·선천성이상아'],
    requirement: '공식 기준의 미숙아 또는 출생 후 진단·수술한 선천성이상아; 2024년부터 소득과 관계없이 지원',
    agency: '영아 주민등록 주소지 관할 시·군·구 보건소 모자보건 담당부서',
    channel: 'e보건소 공공보건포털 또는 관할 보건소',
    action: '퇴원 후 진료비 영수증·진료비 세부내역·진단서 등 제출',
    result: '미숙아는 출생체중별 상한, 선천성이상아는 공식 상한 내 전액본인부담·비급여 의료비 지원',
    sourceUrl: 'https://www.mohw.go.kr/menu.es?mid=a10711020200'
  }),
  service({
    name: '산모·신생아 건강관리 서비스',
    audiences: ['산후돌봄 필요', '저소득', '다자녀'],
    requirement: '출산가정으로 기본 소득기준 또는 지자체 예외지원 기준 충족',
    agency: '산모 주민등록 주소지 관할 시·군·구 보건소',
    channel: '관할 보건소·읍면동 행정복지센터 또는 복지로',
    action: '출산예정일·출산일과 건강보험료 자료를 제출해 바우처 신청',
    result: '건강관리사가 가정을 방문해 산모 회복·신생아 돌봄 지원',
    sourceUrl: 'https://www.gov.kr/mw/AA020InfoCappView.do?CappBizCD=13520000043'
  }),
  service({
    name: '선천성대사이상·난청 검사 및 환아관리',
    audiences: ['모든 출생가구', '검사 이상 신생아'],
    requirement: '신생아 선별검사 대상 또는 검사 결과 확진검사·환아관리 요건 충족',
    agency: '영아 주민등록 주소지 관할 시·군·구 보건소 모자보건 담당부서',
    channel: '분만·검사 의료기관, e보건소 또는 관할 보건소',
    action: '신생아 선별검사를 받고 이상 소견 시 기한 내 확진검사·보청기·환아관리 지원 신청',
    result: '검사비 본인부담 지원 및 확진 환아 의료·특수식이·보청기 등 기준별 지원',
    sourceUrl: 'https://www.mohw.go.kr/menu.es?mid=a10711020200'
  })
];
