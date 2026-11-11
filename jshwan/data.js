/* 실제 서비스에서는 이 예시 데이터를 서버의 API 응답으로 교체합니다. */
const CITIES = [
 {id:'TYO',name:'도쿄',country:'일본',airport:'NRT',base:168000,minutes:150,theme:'city',desc:'골목의 오래된 풍경과 새로운 취향이 공존하는 도시.',aliases:['도쿄','동경','tokyo','나리타']},
 {id:'OSA',name:'오사카',country:'일본',airport:'KIX',base:145000,minutes:110,theme:'city',desc:'맛있는 한 끼와 활기찬 거리, 가까운 교토까지.',aliases:['오사카','osaka','간사이']},
 {id:'CJU',name:'제주',country:'대한민국',airport:'CJU',base:68000,minutes:70,theme:'island',desc:'바람을 따라 걷다 만나는 바다와 숲의 시간.',aliases:['제주','제주도','jeju']},
 {id:'TPE',name:'타이베이',country:'대만',airport:'TPE',base:205000,minutes:165,theme:'city',desc:'찻집에서 야시장까지, 천천히 즐기는 도시 여행.',aliases:['타이베이','타이페이','taipei']},
 {id:'DAD',name:'다낭',country:'베트남',airport:'DAD',base:248000,minutes:290,theme:'island',desc:'긴 해변과 근교의 옛 마을에서 보내는 느긋한 휴식.',aliases:['다낭','danang','da nang']}
];
const PLACES = [
 ['asakusa','TYO','아사쿠사','문화/역사','도쿄 시내',false,35,'half',true,'센소지와 주변 골목을 걸으며 도쿄의 옛 풍경을 만나요.','도쿄역 → 아사쿠사역, 철도 이용','사찰과 상점은 운영 시간이 다릅니다.','산책 구역 무료, 개별 시설 별도'],
 ['shibuya','TYO','시부야','쇼핑','도쿄 시내',false,30,'short',true,'교차로와 상점, 카페를 따라 도시의 리듬을 느껴보세요.','도쿄역 → 시부야역, 철도 이용','매장·전망대별 확인 필요','거리 산책 무료, 쇼핑·전망대 별도'],
 ['kamakura','TYO','가마쿠라','자연','도쿄 근교',true,65,'day',false,'바다와 사찰을 함께 둘러보는 근교 여행지예요.','도쿄역 → 가마쿠라역, 철도 이용','사찰·시설별 확인 필요','사찰·교통 등 개별 비용 발생'],
 ['dotonbori','OSA','도톤보리','음식','오사카 시내',false,20,'half',false,'강변의 간판과 골목을 따라 오사카의 먹거리를 찾아요.','오사카역 → 난바역, 철도 이용','음식점별 확인 필요','식사·체험 비용 별도'],
 ['nara','OSA','나라 공원','자연','오사카 근교',true,60,'day',true,'넓은 공원과 역사 유적을 천천히 둘러보세요.','오사카역 → 긴테쓰나라역, 철도 이용','주변 시설별 확인 필요','공원 산책 무료, 주변 사찰 별도'],
 ['kyoto','OSA','교토 아라시야마','문화/역사','오사카 근교',true,90,'day',true,'대나무 숲과 강변 풍경이 이어지는 산책 코스예요.','오사카역 → 아라시야마 지역, 철도 이용','개별 시설 확인 필요','산책 구역 무료, 사찰·체험 별도'],
 ['hamdeok','CJU','함덕 해변','휴식','제주 동부',false,45,'half',true,'맑은 바다와 해변 산책로에서 쉬어가세요.','제주공항 → 함덕, 차량 기준','해수욕장 운영·기상 확인 필요','해변 산책 무료, 주차·시설 별도'],
 ['forest','CJU','비자림','자연','제주 동부',false,65,'half',false,'오래된 비자나무 사이를 걷는 숲 산책이에요.','제주공항 → 비자림, 차량 기준','방문 전 공식 운영시간 확인','입장료 있음, 공식 요금 확인'],
 ['udo','CJU','우도','액티비티','제주 근교',true,110,'day',false,'배를 타고 들어가 해안 풍경과 작은 마을을 둘러봐요.','제주공항 → 성산항 → 우도, 차량·배 기준','배편·기상에 따라 입도 제한 가능','왕복 배편·현지 교통 비용 별도'],
 ['ximen','TPE','시먼딩','쇼핑','타이베이 시내',false,15,'half',true,'상점과 간식 가게가 모인 활기찬 거리를 걸어요.','타이베이역 → 시먼역, 지하철 이용','매장별 확인 필요','거리 산책 무료, 소비 비용 별도'],
 ['jiufen','TPE','지우펀','문화/역사','타이베이 근교',true,80,'day',true,'언덕의 골목과 찻집에서 근교의 풍경을 즐겨요.','타이베이역 → 지우펀, 대중교통 기준','상점·찻집별 확인 필요','골목 산책 무료, 교통·식음료 별도'],
 ['mykhe','DAD','미케 해변','휴식','다낭 시내',false,20,'half',true,'긴 해변에서 산책과 휴식으로 하루를 채워요.','다낭 도심 → 미케 해변, 차량 기준','수영 가능 여부·기상 확인 필요','해변 산책 무료, 시설 이용 별도'],
 ['hoian','DAD','호이안 구시가지','문화/역사','다낭 근교',true,50,'day',false,'옛 건물과 강변이 이어지는 근교 마을을 탐색해요.','다낭 도심 → 호이안, 차량 기준','관람 시설별 확인 필요','일부 유적 관람권·교통 비용 별도']
].map(([id,city,name,category,area,nearby,travel,duration,free,desc,access,hours,cost])=>({id,city,name,category,area,nearby,travel,duration,free,desc,access,hours,cost}));
const CARRIERS = ['틈항공','구름에어','바람항공','별빛항공','여유에어'];
const SOURCE_LINKS = {TYO:'https://www.gotokyo.org/kr/',OSA:'https://osaka-info.jp/ko/',CJU:'https://www.visitjeju.net/kr',TPE:'https://www.travel.taipei/ko',DAD:'https://danangfantasticity.com/'};
