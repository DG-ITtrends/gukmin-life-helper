const src = (name, url, checkedOn = '2026-07-12') => ({ name, url, checkedOn });

export const deepDives = {
  birth: {
    label: '공식문서 심화 검토',
    verificationScope: '정부24 민원안내와 국가법령정보센터 현행 법령 원문을 기준으로 신청시기·방법·처리기간·핵심 기한을 대조했습니다. 개별 급여의 소득·가구별 지급판정은 포함하지 않습니다.',
    officialCheckpoints: [
      { title: '출생신고', fact: '출생 후 1개월 이내 신고가 법정 원칙입니다.', action: '출생증명서와 신고인 신분 확인자료를 준비해 인터넷·방문·우편 가능 여부를 확인합니다.' },
      { title: '온라인 신고 가능 여부', fact: '정부24 안내상 인터넷 신청이 가능하나 출산 의료기관 등 이용조건을 확인해야 합니다.', action: '온라인 출생신고 참여 가능 여부가 불확실하면 관할 가족관계등록관서에 확인합니다.' },
      { title: '행복출산 통합신청', fact: '출생신고와 동시에 또는 출생신고 후 신청할 수 있습니다.', action: '출생자의 주민등록번호 부여 후 온라인·주민센터 통합신청 대상 서비스를 선택합니다.' },
      { title: '급여 신청시점', fact: '정부24 안내는 부모급여·아동수당·양육수당 등을 출생 후 60일까지 신청할 경우 소급지원 가능하다고 안내합니다.', action: '개별 서비스의 적용기간과 예외는 신청 화면 및 담당기관에서 최종 확인합니다.' },
      { title: '처리결과 확인', fact: '행복출산 통합신청은 접수 후 서비스별 처리결과를 확인할 수 있습니다.', action: '통합신청에 포함되지 않은 지자체 서비스가 있는지 별도로 확인합니다.' }
    ],
    deadlines: ['출생신고: 출생 후 1개월 이내', '주요 양육급여: 출생 후 60일 내 신청 시 소급지원 가능 여부 우선 확인'],
    legalBasis: ['가족관계의 등록 등에 관한 법률 제44조', '임신·출산 관련 서비스 통합처리에 관한 규정'],
    cautions: ['행복출산에 포함되는 지자체 서비스와 추가 구비서류는 주소지에 따라 다를 수 있습니다.', '온라인 출생신고는 의료기관 참여 등 이용조건을 확인해야 합니다.'],
    officialSources: [
      src('정부24 출생신고 민원안내', 'https://www.gov.kr/mw/AA020InfoCappView.do?CappBizCD=12700000045'),
      src('정부24 행복출산 통합처리 신청', 'https://www.gov.kr/mw/AA020InfoCappView.do?CappBizCD=17410000001'),
      src('정부24 행복출산 서비스 상세', 'https://www.gov.kr/portal/service/serviceInfo/174000000029'),
      src('정부24 행복출산 처리상황 확인', 'https://www.gov.kr/mw/EgovPageLink.do?link=oneStop/AA090_happy_birth_proc'),
      src('국가법령정보센터 가족관계등록법', 'https://www.law.go.kr/법령/가족관계의등록등에관한법률')
    ]
  },
  'job-loss': {
    label: '공식문서 심화 검토',
    verificationScope: '고용24·고용노동부 공식 안내와 고용보험법 원문을 기준으로 이직확인·구직신청·수급자격 신청·실업인정의 연결관계를 확인했습니다. 개인별 수급자격과 급여액 판정은 포함하지 않습니다.',
    officialCheckpoints: [
      { title: '이직확인서 처리 확인', fact: '이직확인서는 이직사유·이직일·평균임금·피보험단위기간 등 수급자격 판단에 필요한 정보입니다.', action: '고용24에서 처리 여부를 조회하고 미처리 시 사업주에게 발급·제출을 요청합니다.' },
      { title: '구직신청', fact: '실업급여 절차는 취업 의사와 능력이 있고 적극적으로 재취업활동을 하는 상태를 전제로 합니다.', action: '고용24에서 구직신청을 완료하고 구직등록 상태를 확인합니다.' },
      { title: '수급자격 교육·신청', fact: '수급자격 신청 전 교육과 신청서 인터넷 제출 기능이 제공됩니다.', action: '온라인 절차 가능 범위를 확인하고 필요한 경우 거주지 관할 고용센터를 방문합니다.' },
      { title: '수급자격 판단', fact: '가입기간과 이직사유 등 법정 요건을 고용센터가 심사합니다.', action: '자발적 이직 등 예외 인정사유가 있다면 이를 입증할 자료를 준비합니다.' },
      { title: '실업인정', fact: '수급자격 인정 후 지정된 실업인정일에 재취업활동을 신고해야 지급이 이어집니다.', action: '회차별 인정방식·활동요건·지정일을 수급자 안내에서 확인합니다.' }
    ],
    deadlines: ['구직급여 수급기간은 원칙적으로 이직 다음 날부터 12개월 범위이므로 지체 없이 절차를 시작', '실업인정: 고용센터가 지정한 회차별 인정일 준수'],
    legalBasis: ['고용보험법 제40조(구직급여의 수급 요건)', '고용보험법 제42조(실업의 신고)', '고용보험법 제48조(수급기간)'],
    cautions: ['실제 근무일수, 가입형태, 이직사유에 따라 수급자격이 달라집니다.', '자영업자·예술인·노무제공자는 적용 요건과 절차가 다를 수 있습니다.'],
    officialSources: [
      src('고용24 수급자격 확인·신청', 'https://ei.work24.go.kr/ei/eim/eg/ei/eiEminsr/retrievePb191Info.do'),
      src('고용24 이직확인서 제도안내', 'https://m.work24.go.kr/cm/c/f/1100/selecSystInfo.do?currentPageNo=1&recordCountPerPage=10&systClId=SC00000349&systId=SI00000343'),
      src('고용노동부 실업급여 신청방법 FAQ', 'https://moel.go.kr/faq/faqView.do?seqRepeat=219'),
      src('고용24 이직확인서 발급요청서', 'https://m.work24.go.kr/cm/c/b/1100/selectBbttInfo.do?currentPageNo=1&recordCountPerPage=10&polySvcFomtId=FM00000114'),
      src('국가법령정보센터 고용보험법', 'https://www.law.go.kr/법령/고용보험법')
    ]
  },
  'elder-care': {
    label: '공식문서 심화 검토',
    verificationScope: '국민건강보험공단 노인장기요양보험 공식 안내·건강Law와 국가법령정보센터 원문을 기준으로 신청대상·조사·등급판정·결과통보·이용절차를 확인했습니다. 개별 등급 및 급여비용 판정은 포함하지 않습니다.',
    officialCheckpoints: [
      { title: '신청대상 확인', fact: '65세 이상이거나 65세 미만으로 노인성 질병이 있는 장기요양보험가입자·피부양자 등이 신청대상이 됩니다.', action: '65세 미만이면 시행령 별표의 노인성 질병 해당 여부와 진단자료를 확인합니다.' },
      { title: '인정 신청', fact: '본인 외 가족·친족·이해관계인 등 법령상 대리신청이 가능하며 정보통신망 신청 규정도 마련되어 있습니다.', action: '공단 지사·우편·팩스·인터넷 등 현재 가능한 신청방법과 대리권 자료를 확인합니다.' },
      { title: '방문조사', fact: '공단 직원이 신청인의 심신상태와 일상생활 수행능력 등을 조사합니다.', action: '평소의 실제 어려움, 인지·행동 변화, 가족의 돌봄 상황을 구체적으로 정리합니다.' },
      { title: '의사소견서', fact: '등급판정에 필요한 의사소견서 제출 절차가 있으며 제출 대상·기한·면제 여부는 안내에 따릅니다.', action: '공단 안내 후 인정되는 의료기관과 제출기한을 확인합니다.' },
      { title: '등급판정과 이용', fact: '등급판정위원회 판단 후 인정서·개인별 장기요양이용계획서 등에 따라 급여 이용을 준비합니다.', action: '재가·시설급여와 기관별 계약조건·본인부담을 비교합니다.' }
    ],
    deadlines: ['법정 처리기간과 의사소견서 제출기한은 신청 접수 후 공단 안내문에서 사건별 확인', '갱신·등급변경은 인정 유효기간과 상태 변화에 맞춰 사전 확인'],
    legalBasis: ['노인장기요양보험법 제12조(장기요양인정의 신청자격)', '제13조(장기요양인정의 신청)', '제15조(등급판정 등)', '같은 법 시행령 별표 1(노인성 질병)'],
    cautions: ['장기요양 등급과 장애등록·노인맞춤돌봄 등 다른 서비스의 자격은 서로 다릅니다.', '서비스 이용 가능량과 본인부담은 인정결과·급여종류·기관에 따라 달라집니다.'],
    officialSources: [
      src('국민건강보험공단 건강Law 장기요양 시행규칙', 'https://www.nhis.or.kr/lm/lmxsrv/law/lawDetail.do?SEQ=32&LAWGROUP=2'),
      src('장기요양인정 신청·의사소견서 규정 원문', 'https://www.nhis.or.kr/lm/lmxsrv/law/lawFullContent.do?SEQ=32&SEQ_HISTORY=595274'),
      src('국민건강보험공단 건강Law 노인장기요양보험법', 'https://www.nhis.or.kr/lm/lmxsrv/law/lawDetail.do?SEQ=30&LAWGROUP=2'),
      src('국가법령정보센터 노인장기요양보험법', 'https://www.law.go.kr/법령/노인장기요양보험법'),
      src('노인성 질병의 종류', 'https://www.law.go.kr/lsBylInfoPLinkR.do?bylCls=BE&lsNm=노인장기요양보험법+시행령&bylNo=0001&bylBrNo=00')
    ]
  }
};
