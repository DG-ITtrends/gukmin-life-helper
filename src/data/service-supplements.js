// 사건별로 독립된 신청·신고·조회 단위를 보강한다. URL은 정부·법원·공공기관 원문만 사용한다.
const G='https://www.gov.kr/portal/main/nologin';
const B='https://www.bokjiro.go.kr/ssis-tbu/index.do';
const W='https://www.work24.go.kr/cm/main.do';
const N='https://www.nhis.or.kr/';
const spec=(name,agency,url=G,status='조건부',deadline='사유 발생 후 지체 없이')=>({name,agency,url,status,deadline});
export const supplements={
 move:[spec('확정일자 부여 신청','시군구·등기소','https://rtms.molit.go.kr/','조건부','계약 체결 후 즉시'),spec('수도요금 정산·명의변경','지방상수도사업본부',G),spec('도로명주소 변경 알림서비스','행정안전부','https://www.juso.go.kr/','정보조회')],
 'business-close':[spec('인허가 영업 폐업신고','소관 인허가관청',G,'필수'),spec('종합소득세·법인세 신고','국세청','https://www.hometax.go.kr/','필수','법정 신고기간'),spec('노란우산 공제금 청구','중소기업중앙회','https://www.8899.or.kr/','조건부')],
 disability:[spec('장애인연금','보건복지부·시군구',B),spec('장애수당·장애아동수당','보건복지부·시군구',B),spec('국민연금 장애연금','국민연금공단','https://www.nps.or.kr/'),spec('장애인 복지카드 발급','시군구',B),spec('장애인 보조기기 지원','국립재활원','https://knat.go.kr/'),spec('교통약자 이동지원','시군구',G)],
 death:[spec('상속포기·한정승인 신청','가정법원','https://help.scourt.go.kr/nm/min_9/min_9_2/index.html','조건부','상속개시를 안 날부터 3개월 이내'),spec('국민연금 유족연금','국민연금공단','https://www.nps.or.kr/'),spec('국민연금 반환일시금·사망일시금','국민연금공단','https://www.nps.or.kr/'),spec('상속세 신고·납부','국세청','https://www.nts.go.kr/','조건부','상속개시일이 속한 달 말일부터 6개월 이내'),spec('사망자 금융거래 조회','금융감독원','https://fine.fss.or.kr/','정보조회'),spec('장례식장·화장시설 예약','보건복지부','https://www.15774129.go.kr/','정보조회')],
 'jeonse-damage':[spec('지급명령·보증금반환소송','대한민국 법원','https://ecfs.scourt.go.kr/','사후구제'),spec('배당요구','대한민국 법원','https://www.courtauction.go.kr/','사후구제','법원이 정한 배당요구 종기까지'),spec('전세피해 긴급주거지원','HUG·LH','https://www.khug.or.kr/jeonse/'),spec('저리 대환·최우선변제금 대출','주택도시기금','https://enhuf.molit.go.kr/','대체상품')],
 disaster:[spec('재난심리회복지원','행정안전부·대한적십자사','https://www.safekorea.go.kr/'),spec('국세·지방세 납부기한 연장','국세청·지방자치단체','https://www.nts.go.kr/'),spec('재해 중소기업·소상공인 긴급자금','중소벤처기업부','https://www.sbiz24.kr/','대체상품')],
 'overseas-emergency':[spec('여행증명서 발급','외교부·재외공관','https://www.passport.go.kr/','조건부','귀국 일정 전 공관에 즉시 신청'),spec('여권 분실신고','외교부·재외공관','https://www.passport.go.kr/','필수','분실 인지 즉시'),spec('해외안전여행 동행서비스','외교부','https://www.0404.go.kr/','정보조회')],
 marriage:[spec('부부 공동명의·재산등기','대한민국 법원','https://www.iros.go.kr/'),spec('혼인세액공제 확인','국세청','https://www.nts.go.kr/','정보조회'),spec('난임부부 지원','보건소','https://www.e-health.go.kr/')],
 divorce:[spec('재판상 이혼 청구','가정법원','https://help.scourt.go.kr/','사후구제'),spec('재산분할 청구','가정법원','https://help.scourt.go.kr/','사후구제','이혼한 날부터 2년 이내'),spec('친권자·양육자 변경신고','시구읍면',G,'조건부')],
 pregnancy:[spec('출산전후휴가','사업주·고용노동부','https://www.moel.go.kr/policy/policyinfo/woman/list.do','필수','휴가 개시 전 사업주에게 신청'),spec('출산전후휴가급여','고용노동부',W,'조건부','휴가 시작 1개월 후부터 종료 후 12개월 이내'),spec('난임치료휴가','사업주·고용노동부','https://www.moel.go.kr/policy/policyinfo/woman/list.do')],
 'school-entry':[spec('예방접종 내역 확인','질병관리청','https://nip.kdca.go.kr/','정보조회'),spec('학교급식·알레르기 정보 제출','학교','https://www.moe.go.kr/'),spec('특수교육대상자 선정·배치','교육지원청','https://www.moe.go.kr/')],
 hospitalization:[spec('건강보험 요양비·보조기기 급여','국민건강보험공단',N),spec('상병수당 확인','국민건강보험공단',N),spec('의료급여·긴급의료지원','시군구',B)],
 retirement:[spec('퇴직금 수령','사업주·고용노동부','https://www.moel.go.kr/pension/','필수','퇴직일부터 14일 이내'),spec('퇴직연금·IRP 이전','퇴직연금사업자·금융감독원','https://100lifeplan.fss.or.kr/','조건부','퇴직급여 지급 시'),spec('고용보험 피보험자격 상실 확인','근로복지공단','https://total.comwel.or.kr/','정보조회')],
 'new-job':[spec('청년내일저축계좌 확인','보건복지부',B),spec('근로장려금 반기신청','국세청','https://www.nts.go.kr/'),spec('경력증명서 발급·보관','사업주·고용노동부','https://labor.moel.go.kr/','정보조회')],
 'home-purchase':[spec('자금조달계획서 제출','국토교통부·시군구','https://rtms.molit.go.kr/','조건부','실거래 신고기한 내'),spec('주택담보대출 비교·신청','한국주택금융공사','https://www.hf.go.kr/','대체상품'),spec('주민등록 전입신고','행정안전부·시군구',G,'조건부','전입일부터 14일 이내')],
 'debt-crisis':[spec('개인회생 신청','관할 회생법원','https://help.scourt.go.kr/nm/min_4/min_4_1/index.html','사후구제'),spec('개인파산·면책 신청','관할 회생법원','https://help.scourt.go.kr/nm/min_4/min_4_1/index.html','사후구제'),spec('서민금융 통합상담','서민금융진흥원','https://www.kinfa.or.kr/','대체상품')],
 'crime-victim':[spec('법률구조 신청','대한법률구조공단','https://www.klac.or.kr/','사후구제'),spec('피해자 국선변호사 지원','검찰청','https://www.spo.go.kr/','사후구제'),spec('긴급복지지원','시군구',B)],
 adoption:[spec('국내입양 상담·신청','보건복지부·아동권리보장원','https://www.ncrc.or.kr/','필수','2025년 7월 19일 이후 공적 입양절차에 따라 신청'),spec('예비양부모 적격심사·가정조사','보건복지부·아동권리보장원','https://www.ncrc.or.kr/','필수'),spec('아동 결연·적응 지원','보건복지부·아동권리보장원','https://www.ncrc.or.kr/','필수'),spec('입양 후 적응지원·사후서비스','아동권리보장원','https://www.ncrc.or.kr/','사후구제')],
 'foster-care':[spec('아동수당·급식 지원','시군구',B),spec('후견인 선임 지원','가정법원·아동권리보장원','https://help.scourt.go.kr/'),spec('자립정착금 신청','시군구','https://jaripon.ncrc.or.kr/')],
 'multicultural-settlement':[spec('사회통합프로그램','법무부','https://www.socinet.go.kr/'),spec('국적취득·귀화 신청','법무부','https://www.hikorea.go.kr/'),spec('결혼이민자 취업지원','고용노동부',W)],
 'military-enlistment':[spec('나라사랑카드 발급','병무청','https://www.mma.go.kr/'),spec('병역진로설계','병무청','https://www.mma.go.kr/','정보조회'),spec('군 적금·장병내일준비적금','국방부','https://www.mnd.go.kr/')],
 'living-alone':[spec('주거급여 신청','시군구','https://www.myhome.go.kr/'),spec('전월세 정책대출','주택도시기금','https://enhuf.molit.go.kr/','대체상품'),spec('우편물 주거이전서비스','우정사업본부','https://www.epost.go.kr/')],
 'kindergarten-entry':[spec('유치원 통학차량 안전정보 확인','교육부','https://e-childschoolinfo.moe.go.kr/','정보조회'),spec('예방접종 확인','질병관리청','https://nip.kdca.go.kr/','정보조회'),spec('특수교육 유아 지원','교육지원청','https://www.moe.go.kr/')],
 'school-transfer':[spec('교과서 무상 배부·반납','전출입 학교','https://www.moe.go.kr/'),spec('방과후·늘봄 재신청','전입 학교','https://www.moe.go.kr/'),spec('특수교육 배치 변경','교육지원청','https://www.moe.go.kr/')],
 'college-entry':[spec('학자금 지원구간 산정·가구원동의','한국장학재단','https://www.kosaf.go.kr/','필수'),spec('국가근로장학금 신청','한국장학재단','https://www.kosaf.go.kr/'),spec('청년 주거지원 확인','국토교통부','https://www.myhome.go.kr/')],
 'student-finance':[spec('등록금 분할납부·교내장학 상담','대학','https://www.academyinfo.go.kr/','대체상품'),spec('생활비대출 신청','한국장학재단','https://www.kosaf.go.kr/','대체상품'),spec('지자체 학자금 이자지원','한국장학재단','https://www.kosaf.go.kr/')],
 'school-violence':[spec('피해학생 긴급보호조치','학교장·교육청','https://www.moe.go.kr/','필수','신고 즉시'),spec('행정심판·행정소송','교육청·법원','https://www.simpan.go.kr/','사후구제'),spec('범죄피해 신고','경찰청','https://www.safe182.go.kr/','조건부','범죄·긴급위험 시 즉시')],
 'rental-signing':[]
};

Object.assign(supplements,{
 'mental-health-crisis':[spec('자살예방 상담전화 109','보건복지부·한국생명존중희망재단','https://www.129.go.kr/109/','조건부','즉시·24시간')],
 'infectious-disease':[spec('감염병 발생 신고','의료기관·보건소','https://www.kdca.go.kr/','필수','법정 감염병 확인 즉시')],
 'industrial-accident':[spec('산재 불승인 심사청구','근로복지공단','https://www.comwel.or.kr/','사후구제')],
 'traffic-accident':[spec('자동차손해배상 정부보장사업','자동차손해배상진흥원','https://www.tacss.or.kr/','조건부'),spec('교통사고 피해가족 지원','자동차손해배상진흥원','https://tvsis.tacss.or.kr/','조건부')],
 'rare-disease':[spec('재난적의료비 지원','국민건강보험공단',N)],startup:[spec('정책자금 융자','중소벤처기업진흥공단','https://www.kosmes.or.kr/','대체상품')],
 'wage-arrears':[spec('민사소송·강제집행','대한민국 법원','https://ecfs.scourt.go.kr/','사후구제')],
 'workplace-harassment':[spec('국가인권위원회 진정','국가인권위원회','https://www.humanrights.go.kr/','사후구제')],
 'parental-leave':[spec('육아기 근로시간 단축급여','고용노동부',W)],'career-return':[spec('국민취업지원제도','고용노동부',W)],
 'public-rental':[spec('마이홈 주거상담','국토교통부·LH','https://www.myhome.go.kr/','정보조회')],
 'eviction-crisis':[spec('임차권등기명령','대한민국 법원','https://ecfs.scourt.go.kr/','사후구제')],
 'house-fire':[spec('사유재산 피해신고','시군구·행정안전부','https://www.safekorea.go.kr/')],
 'financial-fraud':[spec('본인계좌 일괄지급정지','금융결제원 AccountInfo','https://www.accountinfo.or.kr/','필수','피해 인지 즉시'),spec('대출 명의도용 조회','한국신용정보원 Credit4U','https://www.credit4u.or.kr/','정보조회'),spec('통신가입 명의도용 조회·제한','한국정보통신진흥협회 M-Safer','https://www.msafer.or.kr/','정보조회')],
 'income-tax':[spec('기한후신고','국세청','https://www.hometax.go.kr/','사후구제')],
 'id-loss':[spec('여권 분실신고','외교부','https://www.passport.go.kr/home/kor/contents.do?menuPos=26','필수','분실 인지 즉시'),spec('분실 여권 재발급','외교부','https://www.passport.go.kr/home/kor/contents.do?menuPos=9','조건부'),spec('긴급여권·여행증명서 발급','외교부·재외공관','https://www.passport.go.kr/','대체상품'),spec('명의도용 통신서비스 조회','한국정보통신진흥협회','https://www.msafer.or.kr/','정보조회')],
 'missing-family':[spec('실종경보문자·공개수배 동의','경찰청','https://www.safe182.go.kr/')],
 'consumer-dispute':[spec('전자상거래 분쟁조정','전자문서·전자거래분쟁조정위원회','https://www.ecmc.or.kr/','사후구제')],
 'emigration-return':[spec('재외국민 변경·이동신고','외교부·재외공관','https://consul.mofa.go.kr/','사후구제'),spec('해외체류신고','행정안전부·시군구',G,'대체상품'),spec('재외국민등록 귀국신고','재외공관·외교부','https://consul.mofa.go.kr/','조건부','90일을 초과해 국내 거주할 의사로 귀국한 때'),spec('해외체류자 귀국신고','행정안전부·시군구',G,'조건부'),spec('귀국 후 전입신고','행정안전부·시군구',G,'조건부','새 국내 거주지로 전입한 날부터 14일 이내')]
});

const removeBySlug={
 disability:['장애인연금·장애수당'],
 death:['상속 승인·한정승인·포기','국민연금 유족연금·사망일시금'],
 adoption:['입양상담·자격조사'],
 'traffic-accident':['자동차손해배상 보장사업'],
 'financial-fraud':['명의도용 계좌·대출 조회'],
 'id-loss':['여권 분실신고·재발급'],
 'emigration-return':['귀국 전입신고·생활정착']
};

export function normalizeServices(services,slug){
 const removed=new Set(removeBySlug[slug]||[]);
 const seen=new Set();
 return services.filter(s=>!removed.has(s.name)).filter(s=>{const key=s.name.trim();if(seen.has(key))return false;seen.add(key);return true;});
}

export function materialize(s,slug){
 const audience='해당 요건을 충족하는 국민';
 return {name:s.name,audiences:[audience],requirement:`${s.name} 공식 대상·자격 요건을 충족하는 경우`,deadline:s.deadline,agency:s.agency,channel:`${s.agency} 공식 누리집·담당 창구`,action:`공식 안내에서 대상과 구비서류를 확인해 ${s.name} 절차 진행`,result:`${s.name} 처리·심사 결과 확인`,sourceUrl:s.url,status:s.status};
}
