const v = (required, conditional, autoChecked, outputs, sourceUrl, verificationStatus = 'verified') => ({
  required, conditional, autoChecked, outputs, verificationStatus, sourceUrl,
});
const foodReportUrl = 'https://www.gov.kr/mw/AA020InfoCappView.do?HighCtgCD=A09006&CappBizCD=14600000021&tp_seq=02';
const businessRegistrationUrl = 'https://www.gov.kr/portal/service/serviceInfo/12100000016';
const building = () => v([], ['건축물대장', '토지이용계획확인서', '임대차계약서·평면도'], ['건축물 용도·위반건축물 여부', '용도지역·지구와 입지 제한'], ['입점 가능 여부 확인', '필요 시 용도변경 안내'], 'https://www.eais.go.kr/');
const health = () => v(['건강진단 신청서', '신분증'], ['검사기관이 요구하는 추가 확인자료'], [], ['건강진단결과서'], 'https://www.easylaw.go.kr/CSP/CnpClsMain.laf?csmSeq=839&ccfNo=4&cciNo=1&cnpClsNo=1');
const tax = () => v(['사업자등록신청서'], ['임대차계약서 사본', '영업신고증 사본', '동업계약서', '법인 등기사항증명서'], ['대표자 주민등록정보', '사업장·법인등록 정보'], ['사업자등록증'], businessRegistrationUrl);
const sign = () => v(['옥외광고물 표시 허가신청서 또는 신고서'], ['광고물 원색도안', '설명서·설계도서', '토지·건물 사용승낙서', '구조안전 확인서류'], ['건축물·토지 소유 및 인허가 정보'], ['옥외광고물 허가증 또는 신고 처리결과'], 'https://www.law.go.kr/법령/옥외광고물등의관리와옥외광고산업진흥에관한법률', 'verification-needed');
const insurance = () => v(['보험관계 성립신고서', '근로자 자격취득신고서'], ['사업자등록증 사본', '근로계약서·임금자료', '법인 등기사항증명서'], ['사업자·법인 정보', '근로자 주민등록·기존 보험자격'], ['사업장관리번호', '보험별 성립·자격취득 처리결과'], 'https://www.4insure.or.kr/', 'verification-needed');
const fire = () => v(['안전시설등 완비증명서 발급 신청서'], ['안전시설 등 설계도서', '소방시설 설치명세서', '전기안전점검확인서', '방염성능검사성적서'], ['건축물·기존 소방 인허가 정보'], ['안전시설등 완비증명서'], 'https://www.nfa.go.kr/', 'verification-needed');
const foodEducation = (audience) => v(['위생교육 수강신청 정보'], ['신분증', '영업 종류·영업자 확인자료'], [], [`${audience} 신규 위생교육 수료증`], 'https://www.foodsafetykorea.go.kr/', 'verification-needed');
const foodReport = (kind) => v(['식품 영업 신고서'], ['교육이수증', '제조방법설명서(해당 업종)', '수질검사성적서(지하수 사용 시)', '액화석유가스 사용시설 완성검사증명서(해당 시)', '안전시설등 완비증명서(다중이용업소 해당 시)', '도시철도시설 사용계약서(해당 시)'], ['건축물대장', '토지이용계획·시설기준 관련 정보'], [`${kind} 영업신고증`], foodReportUrl);
const beautyEducation = () => v(['위생교육 수강신청 정보'], ['면허증·영업 예정 업종 확인자료'], [], ['신규 위생교육 수료증'], 'https://www.easylaw.go.kr/CSP/CnpClsMain.laf?csmSeq=1009&ccfNo=2&cciNo=1&cnpClsNo=1', 'verification-needed');

export const documentRequirementsStartup01to03 = {
  'restaurant-startup': {
    '건축물 용도·입지 확인': building(),
    '식품위생교육': foodEducation('일반음식점'),
    '식품종사자 건강진단': health(),
    '일반음식점 영업신고': foodReport('일반음식점'),
    '사업자등록 신청': tax(),
    '소방안전시설 확인': fire(),
    '옥외광고물 허가·신고': sign(),
    '음식점 원산지 표시': v([], ['메뉴판·게시판의 원산지 표시', '거래명세서·원산지증명서 등 원산지 증빙'], ['품목별 원산지 단속·이력 정보'], ['법정 품목 원산지 표시·증빙 관리'], 'https://www.naqs.go.kr/', 'verification-needed'),
    '4대사회보험 사업장 성립·근로자 자격취득 신고': insurance(),
  },
  'cafe-bakery-startup': {
    '건축물 용도·입지 확인': building(),
    '식품위생교육': foodEducation('휴게음식점·제과점'),
    '식품종사자 건강진단': health(),
    '휴게음식점 또는 제과점 영업신고': foodReport('휴게음식점 또는 제과점'),
    '즉석판매제조·가공업 영업신고': foodReport('즉석판매제조·가공업'),
    '사업자등록 신청': tax(),
    '소방안전시설 확인': fire(),
    '옥외광고물 허가·신고': sign(),
    '4대사회보험 사업장 성립·근로자 자격취득 신고': insurance(),
  },
  'beauty-barber-startup': {
    '건축물 용도·입지 확인': building(),
    '이용사·미용사 면허 발급': v(['이용사·미용사 면허신청서', '최종학교 졸업증명서·학위증명서 또는 국가기술자격증', '의사진단서', '최근 6개월 이내 사진 2장'], ['외국 학교 이수자의 학력 인정서류', '기존 면허증(종별 추가 등 관할기관 요구 시)'], ['국가기술자격 취득정보(행정정보 공동이용 동의 시)', '결격사유 확인정보'], ['이용사 또는 해당 종별 미용사 면허증'], 'https://www.gov.kr/mw/AA020InfoCappView.do?HighCtgCD=A09006&CappBizCD=14600000027'),
    '공중위생영업 위생교육': beautyEducation(),
    '이용업·미용업 영업신고': v(['공중위생영업 신고서'], ['영업시설·설비 개요서', '교육수료증(미리 교육받은 경우)', '국유철도 정거장시설 사용계약서(해당 시)', '안전시설등 완비증명서(해당 시)'], ['건축물대장', '토지이용계획·시설기준 정보', '이용사·미용사 면허정보'], ['이용업 또는 해당 종별 미용업 영업신고증'], 'https://www.gov.kr/mw/AA020InfoCappView.do?CappBizCD=14600000292&HighCtgCD=A09006'),
    '사업자등록 신청': tax(),
    '옥외광고물 허가·신고': sign(),
    '4대사회보험 사업장 성립·근로자 자격취득 신고': insurance(),
    '정기 위생교육·위생관리': v(['매년 위생교육 수강신청 정보'], ['영업신고증·대표자 확인자료', '소독·기구관리·최종지불요금표 등 영업장 위생관리 기록'], ['기존 위생교육 이수·행정처분 정보'], ['연도별 위생교육 수료증', '위생관리 준수 기록'], 'https://www.law.go.kr/법령/공중위생관리법', 'verification-needed'),
  },
};
