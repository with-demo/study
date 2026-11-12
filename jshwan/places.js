/* Official tourism references and original Korean descriptions. No live opening-hour or price claims. */
const CITY_WIKI_TITLES={
  "TYO": "Tokyo",
  "OSA": "Osaka",
  "CJU": "Jeju Island",
  "TPE": "Taipei",
  "DAD": "Da Nang",
  "PUS": "Haeundae Beach",
  "RSU": "Yeosu",
  "FUK": "Fukuoka",
  "CTS": "Sapporo",
  "OKA": "Okinawa Island",
  "NGO": "Nagoya",
  "BKK": "Bangkok",
  "CNX": "Chiang Mai",
  "HKT": "Phuket province",
  "HAN": "Hanoi",
  "SGN": "Ho Chi Minh City",
  "CEB": "Cebu City",
  "DPS": "Seminyak",
  "SIN": "Gardens by the Bay",
  "KUL": "Kuala Lumpur",
  "HKG": "Victoria Peak",
  "MFM": "Ruins of Saint Paul's",
  "SHA": "Shanghai",
  "PEK": "Beijing",
  "PAR": "Paris",
  "LON": "London",
  "ROM": "Rome",
  "BCN": "Barcelona",
  "LAX": "Los Angeles",
  "NYC": "New York City"
};
const EXISTING_PLACE_WIKIS={
  "asakusa": "Asakusa",
  "shibuya": "Shibuya",
  "kamakura": "Kamakura",
  "dotonbori": "Dōtonbori",
  "nara": "Nara Park",
  "kyoto": "Arashiyama",
  "hamdeok": "Hamdeok",
  "forest": "Bijarim forest",
  "udo": "Udo (island)",
  "ximen": "Ximending",
  "jiufen": "Jiufen",
  "mykhe": "My Khe Beach",
  "hoian": "Hội An"
};
const PLACE_GUIDES=[
  {
    "city": "TYO",
    "name": "아사쿠사",
    "wiki": "Sensō-ji",
    "category": "문화/역사",
    "nearby": false,
    "area": "도쿄 · 다이토",
    "desc": "센소지의 큰 문과 나카미세 상점가가 이어지는 도쿄의 대표적인 역사 지구예요. 사찰 경내를 둘러본 뒤 스미다강 방향으로 걸으면 전통 거리와 강변 풍경을 함께 즐길 수 있어요.",
    "highlights": [
      "가미나리몬",
      "나카미세 골목",
      "스미다강 산책"
    ],
    "tip": "기도하는 사람과 상점 앞 대기 줄을 피해 여유 있게 걸어보세요.",
    "source": "https://www.gotokyo.org/en/spot/index.html"
  },
  {
    "city": "TYO",
    "name": "시부야",
    "wiki": "Shibuya Crossing",
    "category": "쇼핑",
    "nearby": false,
    "area": "도쿄 · 시부야",
    "desc": "스크램블 교차로를 중심으로 쇼핑몰과 음식점, 작은 골목이 모여 있는 활기찬 지역이에요. 큰길의 도시 풍경을 보고 주변 골목으로 들어가면 음반점과 카페처럼 서로 다른 취향의 공간을 발견할 수 있어요.",
    "highlights": [
      "스크램블 교차로",
      "쇼핑 거리",
      "골목 카페"
    ],
    "tip": "교차로에서 사진을 찍을 때 보행 흐름을 막지 않도록 주의하세요.",
    "source": "https://www.gotokyo.org/en/spot/index.html"
  },
  {
    "city": "TYO",
    "name": "우에노 공원",
    "wiki": "Ueno Park",
    "category": "휴식",
    "nearby": false,
    "area": "도쿄 · 우에노",
    "desc": "넓은 녹지와 연못, 여러 박물관이 모인 도심 문화 공원이에요. 산책을 중심으로 가볍게 둘러보거나 관심 있는 미술관과 박물관을 골라 문화 일정을 만들기 좋아요.",
    "highlights": [
      "시노바즈 연못",
      "박물관 지구",
      "나무 그늘 산책"
    ],
    "tip": "시설마다 쉬는 날과 입장 조건이 다르므로 방문할 곳을 먼저 정하세요.",
    "source": "https://www.gotokyo.org/en/spot/index.html"
  },
  {
    "city": "TYO",
    "name": "메이지 신궁",
    "wiki": "Meiji Shrine",
    "category": "문화/역사",
    "nearby": false,
    "area": "도쿄 · 하라주쿠",
    "desc": "하라주쿠 인근의 큰 숲 안에 자리한 신사로, 번화가와 다른 차분한 분위기를 느낄 수 있어요. 자갈길과 큰 도리이를 따라 걸으며 숲을 둘러보고 인접한 요요기공원 산책과 연결해보세요.",
    "highlights": [
      "숲길",
      "큰 도리이",
      "요요기공원 연계"
    ],
    "tip": "신사 경내의 촬영 제한과 참배 안내를 따르고 숲길에서는 편한 신발을 준비하세요.",
    "source": "https://www.gotokyo.org/en/spot/index.html"
  },
  {
    "city": "TYO",
    "name": "도쿄 스카이트리",
    "wiki": "Tokyo Skytree",
    "category": "액티비티",
    "nearby": false,
    "area": "도쿄 · 스미다",
    "desc": "스미다 지역에 솟아 있는 전파탑으로 도쿄의 도시 규모를 조망할 수 있는 장소예요. 전망대 관람과 아래쪽 상업시설 산책을 함께 계획할 수 있으며, 맑은 날과 저녁은 서로 다른 풍경을 보여줘요.",
    "highlights": [
      "도시 전망",
      "탑 아래 상업시설",
      "아사쿠사 연계"
    ],
    "tip": "전망대 입장권과 운영 상황을 확인하고, 날씨에 따라 조망이 달라질 수 있음을 고려하세요.",
    "source": "https://www.gotokyo.org/en/spot/index.html"
  },
  {
    "city": "TYO",
    "name": "신주쿠 교엔",
    "wiki": "Shinjuku Gyo-en",
    "category": "자연",
    "nearby": false,
    "area": "도쿄 · 신주쿠",
    "desc": "서로 다른 양식의 정원과 넓은 잔디 공간을 갖춘 도심 정원이에요. 신주쿠의 복잡한 거리에서 잠시 벗어나 연못과 나무를 따라 걸으며 계절에 따라 달라지는 풍경을 감상할 수 있어요.",
    "highlights": [
      "일본식 정원",
      "넓은 잔디",
      "계절 식물"
    ],
    "tip": "휴원일과 반입 제한을 확인하고, 정원 안에서는 안내된 이용 규칙을 따라주세요.",
    "source": "https://www.gotokyo.org/en/spot/index.html"
  },
  {
    "city": "TYO",
    "name": "가마쿠라",
    "wiki": "Kamakura",
    "category": "문화/역사",
    "nearby": true,
    "area": "가나가와 · 가마쿠라",
    "desc": "사찰과 신사, 해변이 가까이 모인 도쿄 근교의 역사 도시예요. 고토쿠인의 대불이나 쓰루가오카 하치만구를 중심으로 동선을 잡고 해안 산책을 더하면 도시와 바다를 함께 만날 수 있어요.",
    "highlights": [
      "가마쿠라 대불",
      "고마치도리",
      "해안 산책"
    ],
    "tip": "사찰과 해변을 모두 넣기보다 한 구역을 골라 이동 동선을 줄여보세요.",
    "source": "https://www.gotokyo.org/en/spot/index.html"
  },
  {
    "city": "TYO",
    "name": "닛코",
    "wiki": "Nikkō Tōshō-gū",
    "category": "문화/역사",
    "nearby": true,
    "area": "도치기 · 닛코",
    "desc": "도쇼구를 비롯한 역사 건축과 산림 풍경을 함께 둘러볼 수 있는 근교 여행지예요. 정교한 건축 장식을 살펴본 뒤 신쿄 주변으로 걸으면 산속 도시 특유의 분위기를 느낄 수 있어요.",
    "highlights": [
      "도쇼구 건축",
      "신쿄",
      "숲으로 둘러싸인 참배길"
    ],
    "tip": "도쿄에서의 왕복 교통과 마지막 귀환편을 먼저 확인하고 관람 구역을 정하세요.",
    "source": "https://visitnikko.jp/en/"
  },
  {
    "city": "OSA",
    "name": "도톤보리",
    "wiki": "Dōtonbori",
    "category": "음식",
    "nearby": false,
    "area": "오사카 · 난바",
    "desc": "강을 따라 큰 간판과 음식점이 이어지는 오사카의 대표적인 번화가예요. 다리 주변의 풍경을 본 뒤 골목을 걸으며 타코야키나 오코노미야키 등 지역 먹거리를 골라보세요.",
    "highlights": [
      "도톤보리강",
      "에비스바시",
      "오사카 먹거리"
    ],
    "tip": "다리 위는 혼잡할 수 있으니 사진 촬영 후에는 보행 동선을 비워주세요.",
    "source": "https://osaka-info.jp/en/"
  },
  {
    "city": "OSA",
    "name": "오사카성 공원",
    "wiki": "Osaka Castle",
    "category": "문화/역사",
    "nearby": false,
    "area": "오사카 · 주오",
    "desc": "해자와 성곽을 둘러싼 공원 안에서 오사카성의 모습을 여러 방향으로 감상할 수 있어요. 천수각 전시를 보거나 공원 산책을 중심으로 일정을 구성할 수 있어 역사와 휴식을 함께 담기 좋아요.",
    "highlights": [
      "천수각",
      "해자와 성벽",
      "공원 산책"
    ],
    "tip": "성 내부 관람과 공원 이용의 입장 조건을 구분해 확인하세요.",
    "source": "https://osaka-info.jp/en/"
  },
  {
    "city": "OSA",
    "name": "구로몬 시장",
    "wiki": "Kuromon Ichiba Market",
    "category": "음식",
    "nearby": false,
    "area": "오사카 · 닛폰바시",
    "desc": "식재료 상점과 먹거리 가게가 이어지는 아케이드 시장이에요. 상점별로 판매하는 음식과 식사 공간이 달라 천천히 비교하며 오사카의 시장 분위기를 경험할 수 있어요.",
    "highlights": [
      "아케이드 골목",
      "해산물 상점",
      "시장 간식"
    ],
    "tip": "먹는 장소와 쓰레기 처리에 관한 각 가게의 안내를 따라주세요.",
    "source": "https://osaka-info.jp/en/"
  },
  {
    "city": "OSA",
    "name": "우메다 스카이 빌딩",
    "wiki": "Umeda Sky Building",
    "category": "액티비티",
    "nearby": false,
    "area": "오사카 · 우메다",
    "desc": "두 동의 고층 건물을 연결한 독특한 구조와 전망 공간으로 알려진 건물이에요. 전망 관람 후 주변 우메다 지역의 쇼핑·식사 동선을 더하면 오사카 북부를 둘러보는 일정으로 연결할 수 있어요.",
    "highlights": [
      "공중정원 전망",
      "연결 구조",
      "우메다 거리"
    ],
    "tip": "전망 공간의 운영과 기상 안내를 확인하고 도보 접근 경로를 미리 살펴보세요.",
    "source": "https://osaka-info.jp/en/"
  },
  {
    "city": "OSA",
    "name": "신세카이",
    "wiki": "Shinsekai",
    "category": "문화/역사",
    "nearby": false,
    "area": "오사카 · 에비스초",
    "desc": "쓰텐카쿠를 중심으로 복고풍 간판과 음식점이 모인 거리예요. 주변 골목을 천천히 걷고 쿠시카쓰 등 지역 음식을 곁들이면 오사카의 또 다른 생활 풍경을 만나볼 수 있어요.",
    "highlights": [
      "쓰텐카쿠 거리",
      "복고풍 간판",
      "쿠시카쓰"
    ],
    "tip": "전망대 방문 여부와 별개로 거리 산책 동선을 정하면 시간을 조절하기 편해요.",
    "source": "https://osaka-info.jp/en/"
  },
  {
    "city": "OSA",
    "name": "가이유칸",
    "wiki": "Osaka Aquarium Kaiyukan",
    "category": "액티비티",
    "nearby": false,
    "area": "오사카 · 덴포잔",
    "desc": "태평양 주변의 해양 생태를 주제로 구성된 수족관이에요. 큰 수조와 여러 전시 구역을 따라 관람한 뒤 덴포잔 항구 주변 산책으로 일정을 이어갈 수 있어요.",
    "highlights": [
      "태평양 주제 전시",
      "대형 수조",
      "항구 풍경"
    ],
    "tip": "입장권과 관람 안내를 확인하고 전시 구역에서는 플래시 사용 규칙을 따라주세요.",
    "source": "https://osaka-info.jp/en/"
  },
  {
    "city": "OSA",
    "name": "나라 공원",
    "wiki": "Nara Park",
    "category": "자연",
    "nearby": true,
    "area": "나라 · 공원 일대",
    "desc": "넓은 공원에 역사 유적과 산책 공간이 이어지는 오사카 근교 여행지예요. 도다이지 등 주변 문화유산과 함께 둘러보며 잔디밭과 숲길 사이로 오래된 도시의 풍경을 감상할 수 있어요.",
    "highlights": [
      "넓은 공원",
      "도다이지 연계",
      "옛 도심 산책"
    ],
    "tip": "야생 사슴을 만질 때나 먹이를 줄 때는 공원에 게시된 안내를 꼭 확인하세요.",
    "source": "https://osaka-info.jp/en/"
  },
  {
    "city": "OSA",
    "name": "교토 아라시야마",
    "wiki": "Arashiyama",
    "category": "문화/역사",
    "nearby": true,
    "area": "교토 · 아라시야마",
    "desc": "대나무 숲길과 도게쓰교, 강변 산책로가 모인 교토 서쪽의 경승지예요. 숲과 강을 중심으로 걷거나 사찰 정원을 더해 자연과 전통 풍경을 함께 즐기는 근교 일정을 만들 수 있어요.",
    "highlights": [
      "대나무 숲",
      "도게쓰교",
      "강변 산책"
    ],
    "tip": "인기 구역에 일정을 몰아넣기보다 강 양쪽의 이동 경로를 먼저 정해보세요.",
    "source": "https://osaka-info.jp/en/"
  },
  {
    "city": "CJU",
    "name": "함덕 해변",
    "wiki": "Hamdeok Beach",
    "category": "휴식",
    "nearby": false,
    "area": "제주 · 조천",
    "desc": "밝은 모래사장과 바다가 이어지는 제주 동쪽의 해변이에요. 해변 산책로를 걷거나 주변 카페에서 바다를 바라보며 쉬어갈 수 있고 서우봉 방향의 풍경도 함께 살펴볼 수 있어요.",
    "highlights": [
      "해변 산책",
      "푸른 바다",
      "서우봉 풍경"
    ],
    "tip": "바람과 물때에 따라 풍경이 달라지며 해수욕 가능 여부는 현장 안내를 확인하세요.",
    "source": "https://www.visitjeju.net/kr"
  },
  {
    "city": "CJU",
    "name": "비자림",
    "wiki": "Bijarim Forest",
    "category": "자연",
    "nearby": false,
    "area": "제주 · 구좌",
    "desc": "오래된 비자나무가 모여 있는 숲으로, 나무 사이 산책로를 따라 걷는 여행지예요. 나무줄기와 숲 바닥의 식생을 살펴보며 제주 바다와는 다른 차분한 풍경 속에서 시간을 보낼 수 있어요.",
    "highlights": [
      "비자나무 숲",
      "그늘 산책로",
      "숲의 식생"
    ],
    "tip": "비가 온 뒤에는 길이 미끄러울 수 있으니 현장 탐방 안내에 맞춰 이동하세요.",
    "source": "https://www.visitjeju.net/kr"
  },
  {
    "city": "CJU",
    "name": "성산일출봉",
    "wiki": "Seongsan Ilchulbong",
    "category": "자연",
    "nearby": false,
    "area": "제주 · 성산",
    "desc": "화산 활동으로 형성된 지형과 바다 전망을 함께 볼 수 있는 제주 동부의 대표적인 장소예요. 정상 탐방 여부에 따라 동선을 정하고 아래쪽 해안에서도 봉우리의 형태와 주변 바다를 감상할 수 있어요.",
    "highlights": [
      "화산 지형",
      "정상 전망",
      "해안 풍경"
    ],
    "tip": "탐방 가능 구간과 기상 안내를 확인하고 오르막에 맞는 신발을 준비하세요.",
    "source": "https://www.visitjeju.net/kr"
  },
  {
    "city": "CJU",
    "name": "한라산",
    "wiki": "Hallasan",
    "category": "자연",
    "nearby": false,
    "area": "제주 · 한라산",
    "desc": "제주 중심에 자리한 산으로 탐방로와 계절에 따라 서로 다른 숲과 화산 풍경을 보여줘요. 정상 등반만을 목표로 하기보다 체력과 탐방 조건에 맞는 코스를 골라 제주의 산림을 경험해보세요.",
    "highlights": [
      "화산 산악 풍경",
      "탐방로",
      "계절별 숲"
    ],
    "tip": "예약 대상 코스·입산 통제·기상 정보를 공식 탐방 안내에서 먼저 확인하세요.",
    "source": "https://www.visitjeju.net/kr"
  },
  {
    "city": "CJU",
    "name": "정방폭포",
    "wiki": "Jeongbang Waterfall",
    "category": "자연",
    "nearby": false,
    "area": "제주 · 서귀포",
    "desc": "해안 가까이 떨어지는 폭포와 바다를 한자리에서 바라볼 수 있는 서귀포의 명소예요. 폭포 주변의 바위와 해안 지형을 함께 관찰하고 서귀포 시내의 다른 산책 코스와 묶어 둘러볼 수 있어요.",
    "highlights": [
      "폭포와 바다",
      "해안 암석",
      "서귀포 연계"
    ],
    "tip": "물보라가 닿는 바위와 계단은 미끄러울 수 있으니 지정 동선을 이용하세요.",
    "source": "https://www.visitjeju.net/kr"
  },
  {
    "city": "CJU",
    "name": "동문시장",
    "wiki": "Dongmun Market",
    "category": "음식",
    "nearby": false,
    "area": "제주 · 구도심",
    "desc": "식재료와 간식, 기념품 상점이 모인 제주시의 전통시장이에요. 시장 골목을 천천히 둘러보며 먹거리를 고르고 주변 구도심 산책과 연결하면 생활 속 제주 풍경을 만날 수 있어요.",
    "highlights": [
      "시장 골목",
      "제주 먹거리",
      "구도심 산책"
    ],
    "tip": "점포와 야시장 운영은 다를 수 있으니 방문하려는 가게의 안내를 확인하세요.",
    "source": "https://www.visitjeju.net/kr"
  },
  {
    "city": "CJU",
    "name": "우도",
    "wiki": "Udo (island)",
    "category": "자연",
    "nearby": true,
    "area": "제주 주변 · 우도",
    "desc": "성산 앞바다에 자리한 섬으로 해변과 마을, 해안 풍경을 둘러보는 여행지예요. 섬 안에서 이동할 방법을 정한 뒤 우도봉이나 해안 구역을 골라 제주 본섬과 다른 하루를 만들어보세요.",
    "highlights": [
      "우도봉",
      "해안 풍경",
      "섬 마을"
    ],
    "tip": "배편 운항과 마지막 귀환편을 먼저 확인하고 기상 변화에 대비해 일정을 여유 있게 잡으세요.",
    "source": "https://www.visitjeju.net/kr"
  },
  {
    "city": "CJU",
    "name": "가파도",
    "wiki": "Gapado",
    "category": "휴식",
    "nearby": true,
    "area": "제주 주변 · 가파도",
    "desc": "낮고 평탄한 지형을 따라 마을길과 해안을 걸을 수 있는 제주 남서쪽의 섬이에요. 바다 건너 본섬의 윤곽을 바라보며 느긋하게 걷는 일정에 잘 맞고 계절에 따라 들판의 풍경도 달라져요.",
    "highlights": [
      "평탄한 마을길",
      "해안 산책",
      "본섬 조망"
    ],
    "tip": "입도 전 왕복 배편을 확인하고 섬 안 주민의 생활 공간은 배려하며 둘러보세요.",
    "source": "https://www.visitjeju.net/kr"
  },
  {
    "city": "PUS",
    "name": "해운대 해변",
    "wiki": "Haeundae Beach",
    "category": "휴식",
    "nearby": false,
    "area": "부산 · 해운대",
    "desc": "도심 건물과 긴 해변이 나란히 놓인 부산의 대표적인 바닷가예요. 모래사장 산책을 중심으로 동백섬이나 주변 해안길을 더하면 도시와 바다를 함께 보는 동선을 만들 수 있어요.",
    "highlights": [
      "해변 산책",
      "동백섬 연계",
      "도시와 바다"
    ],
    "tip": "수영과 해변 시설 이용은 운영 구역과 현장 안내를 확인하세요.",
    "source": "https://www.visitbusan.net/"
  },
  {
    "city": "PUS",
    "name": "광안리 해변",
    "wiki": "Gwangalli Beach",
    "category": "휴식",
    "nearby": false,
    "area": "부산 · 수영",
    "desc": "광안대교를 바라보며 해안 산책과 카페 시간을 즐길 수 있는 도심 해변이에요. 낮의 바다와 저녁의 도시 풍경이 달라 원하는 분위기에 맞춰 방문하고 주변 골목 식사와 연결해보세요.",
    "highlights": [
      "광안대교 조망",
      "해변 카페",
      "저녁 산책"
    ],
    "tip": "행사나 조명 일정은 고정돼 있지 않을 수 있으니 별도로 확인하세요.",
    "source": "https://www.visitbusan.net/"
  },
  {
    "city": "PUS",
    "name": "감천문화마을",
    "wiki": "Gamcheon Culture Village",
    "category": "문화/역사",
    "nearby": false,
    "area": "부산 · 사하",
    "desc": "언덕의 집들과 좁은 골목, 벽화가 어우러진 부산의 마을 여행지예요. 전망 지점과 골목을 따라 걸으며 도시 지형을 살펴볼 수 있지만 주민이 생활하는 공간이라는 점도 기억해주세요.",
    "highlights": [
      "언덕 마을 풍경",
      "골목 벽화",
      "전망 지점"
    ],
    "tip": "집 안이나 주민을 무단 촬영하지 말고 안내된 관람 동선을 이용하세요.",
    "source": "https://www.visitbusan.net/"
  },
  {
    "city": "PUS",
    "name": "자갈치시장",
    "wiki": "Jagalchi Market",
    "category": "음식",
    "nearby": false,
    "area": "부산 · 남포",
    "desc": "항구 가까이 수산물 상점과 식사 공간이 모인 부산의 대표적인 시장이에요. 상점과 바닷가 주변을 둘러보며 항구의 분위기를 느끼고 남포동이나 국제시장 일정과 함께 묶기 좋아요.",
    "highlights": [
      "수산시장",
      "항구 풍경",
      "남포동 연계"
    ],
    "tip": "식사 전 메뉴 가격과 조리 비용 등 주문 조건을 가게에서 확인하세요.",
    "source": "https://www.visitbusan.net/"
  },
  {
    "city": "PUS",
    "name": "태종대",
    "wiki": "Taejongdae",
    "category": "자연",
    "nearby": false,
    "area": "부산 · 영도",
    "desc": "해안 절벽과 숲길에서 바다를 조망할 수 있는 영도 남쪽의 경승지예요. 전망 구역을 중심으로 걷거나 공원 내 이동 수단을 활용해 해안 풍경과 숲을 함께 둘러볼 수 있어요.",
    "highlights": [
      "해안 절벽",
      "전망 구역",
      "숲길"
    ],
    "tip": "해안 접근 구간과 이동 수단의 운행 여부는 날씨 및 현장 안내를 확인하세요.",
    "source": "https://www.visitbusan.net/"
  },
  {
    "city": "PUS",
    "name": "범어사",
    "wiki": "Beomeosa",
    "category": "문화/역사",
    "nearby": false,
    "area": "부산 · 금정",
    "desc": "금정산 자락의 숲과 어우러진 사찰로 번화한 해변과 다른 부산의 모습을 보여줘요. 경내의 전각과 돌길을 천천히 살펴보고 주변 숲길 산책을 더하면 조용한 문화 일정을 만들 수 있어요.",
    "highlights": [
      "산사 전각",
      "숲과 돌길",
      "금정산 풍경"
    ],
    "tip": "법회와 참배 공간의 촬영·출입 안내를 존중하며 조용히 둘러보세요.",
    "source": "https://www.visitbusan.net/"
  },
  {
    "city": "PUS",
    "name": "해동용궁사",
    "wiki": "Haedong Yonggungsa",
    "category": "문화/역사",
    "nearby": true,
    "area": "부산 주변 · 기장 해안",
    "desc": "해안 바위 위에 자리한 사찰로 건축과 바다 풍경이 함께 보이는 장소예요. 계단과 해안 구역을 따라 경내를 둘러보고 기장 지역의 다른 바닷가 산책과 연결해볼 수 있어요.",
    "highlights": [
      "바다를 향한 사찰",
      "해안 바위",
      "기장 해안"
    ],
    "tip": "계단이 많고 통로가 좁은 구간이 있으니 혼잡할 때는 이동을 서두르지 마세요.",
    "source": "https://www.visitbusan.net/"
  },
  {
    "city": "PUS",
    "name": "통도사",
    "wiki": "Tongdosa",
    "category": "문화/역사",
    "nearby": true,
    "area": "부산 근교 · 양산",
    "desc": "영축산 자락에 자리한 사찰로 긴 진입로와 여러 전각을 따라 산사 풍경을 만날 수 있어요. 부산에서 벗어나 숲과 역사 건축을 함께 둘러보는 근교 일정으로 계획하기 좋은 장소예요.",
    "highlights": [
      "산사 진입로",
      "전각 관람",
      "영축산 풍경"
    ],
    "tip": "왕복 교통을 먼저 정하고 종교 행사에 따른 관람 안내를 확인하세요.",
    "source": "https://english.visitkorea.or.kr/"
  },
  {
    "city": "RSU",
    "name": "오동도",
    "wiki": "Odongdo",
    "category": "자연",
    "nearby": false,
    "area": "여수 · 수정동",
    "desc": "방파제로 연결된 섬 안에 숲길과 해안 전망 구역이 있는 여수의 대표적인 산책지예요. 나무 그늘을 따라 걷고 바다 쪽으로 시선을 돌리면 항구와 해안 지형이 번갈아 나타나는 풍경을 즐길 수 있어요.",
    "highlights": [
      "동백 숲길",
      "해안 전망",
      "방파제 산책"
    ],
    "tip": "섬 안 동선과 기상 상황을 확인하고 해안 바위에는 임의로 내려가지 마세요.",
    "source": "https://www.yeosu.go.kr/tour/"
  },
  {
    "city": "RSU",
    "name": "진남관",
    "wiki": "Jinnamgwan",
    "category": "문화/역사",
    "nearby": false,
    "area": "여수 · 구도심",
    "desc": "조선 수군 역사와 연결되는 큰 목조 건축물로 여수 구도심에서 역사 여행을 시작하기 좋은 장소예요. 건물의 규모와 구조를 살펴본 뒤 주변 거리와 이순신광장으로 동선을 이어갈 수 있어요.",
    "highlights": [
      "목조 건축",
      "수군 역사",
      "구도심 연계"
    ],
    "tip": "보수나 관람 제한이 있을 수 있으니 방문 전 공식 공개 정보를 확인하세요.",
    "source": "https://www.yeosu.go.kr/tour/"
  },
  {
    "city": "RSU",
    "name": "이순신광장",
    "wiki": "Yi Sun-sin Square",
    "category": "문화/역사",
    "nearby": false,
    "area": "여수 · 중앙동",
    "desc": "여수 구도심과 항구 사이에 자리해 역사 기념물과 바닷가 풍경을 함께 볼 수 있는 광장이에요. 주변 먹거리 골목과 시장을 걸어보거나 해안 산책을 더해 짧은 도심 동선으로 구성할 수 있어요.",
    "highlights": [
      "역사 기념물",
      "항구 전망",
      "주변 먹거리"
    ],
    "tip": "광장 행사와 주변 주차·교통 상황에 따라 접근 동선을 조정하세요.",
    "source": "https://www.yeosu.go.kr/tour/"
  },
  {
    "city": "RSU",
    "name": "돌산공원",
    "wiki": "Dolsan Park",
    "category": "휴식",
    "nearby": false,
    "area": "여수 · 돌산",
    "desc": "돌산대교와 항구 방향을 바라볼 수 있는 공원으로 여수의 도시·해안 지형을 살펴보기 좋아요. 주변 산책과 전망 구역을 중심으로 둘러보며 낮과 저녁 중 원하는 분위기의 풍경을 골라 즐겨보세요.",
    "highlights": [
      "돌산대교 조망",
      "항구 풍경",
      "공원 산책"
    ],
    "tip": "저녁에는 귀환 교통과 공원 내 계단 동선을 미리 확인하세요.",
    "source": "https://www.yeosu.go.kr/tour/"
  },
  {
    "city": "RSU",
    "name": "여수세계박람회장",
    "wiki": "Expo 2012",
    "category": "문화/역사",
    "nearby": false,
    "area": "여수 · 엑스포역 주변",
    "desc": "바다와 가까운 옛 세계박람회장 일대에서 넓은 공간과 해양 도시의 풍경을 둘러볼 수 있어요. 엑스포역이나 오동도 일정과 묶기 쉬우며 방문할 전시·시설은 따로 골라 동선을 구성하는 편이 좋아요.",
    "highlights": [
      "해안 공간",
      "박람회장 풍경",
      "엑스포역 연계"
    ],
    "tip": "상설·기획 시설의 운영과 이용 가능한 구역을 방문 전에 확인하세요.",
    "source": "https://www.yeosu.go.kr/tour/"
  },
  {
    "city": "RSU",
    "name": "여수 해상케이블카",
    "wiki": "Yeosu Maritime Cable Car",
    "category": "액티비티",
    "nearby": false,
    "area": "여수 · 돌산–자산",
    "desc": "바다를 건너는 경로에서 항구와 섬, 다리 풍경을 다른 높이로 바라볼 수 있는 체험이에요. 이용할 탑승장과 왕복 여부를 먼저 정하면 주변 공원·산책 일정과 자연스럽게 연결할 수 있어요.",
    "highlights": [
      "바다 위 이동",
      "항구 조망",
      "공원 연계"
    ],
    "tip": "기상에 따른 운행 변경과 탑승 조건을 공식 운영 안내에서 확인하세요.",
    "source": "https://www.yeosu.go.kr/tour/"
  },
  {
    "city": "RSU",
    "name": "향일암",
    "wiki": "Hyangiram",
    "category": "문화/역사",
    "nearby": true,
    "area": "여수 주변 · 돌산 남단",
    "desc": "바위와 숲 사이의 길을 올라 바다를 바라보는 사찰로 돌산 남쪽의 풍경을 만날 수 있어요. 좁은 통로와 계단을 지나 경내를 둘러보는 과정 자체가 특징이며 해안 조망과 함께 계획하기 좋아요.",
    "highlights": [
      "바위 사이 통로",
      "해안 조망",
      "산사 분위기"
    ],
    "tip": "계단 구간을 고려해 신발을 준비하고 혼잡한 통로에서는 서로 양보해주세요.",
    "source": "https://www.yeosu.go.kr/tour/"
  },
  {
    "city": "RSU",
    "name": "금오도 비렁길",
    "wiki": "Geumodo",
    "category": "자연",
    "nearby": true,
    "area": "여수 주변 · 금오도",
    "desc": "섬의 해안 절벽과 마을을 따라 걷는 길로 여수의 섬 풍경을 더 깊게 경험할 수 있어요. 여러 구간을 한꺼번에 걷기보다 체력과 배편에 맞는 일부 코스를 골라 바다와 숲을 감상해보세요.",
    "highlights": [
      "해안 절벽길",
      "섬 마을",
      "바다 전망"
    ],
    "tip": "입도·귀환 배편과 탐방로 통제 여부를 확인하고 일정을 여유 있게 잡으세요.",
    "source": "https://www.yeosu.go.kr/tour/"
  },
  {
    "city": "FUK",
    "name": "오호리 공원",
    "wiki": "Ōhori Park",
    "category": "휴식",
    "nearby": false,
    "area": "후쿠오카 · 주오",
    "desc": "큰 연못을 중심으로 산책로와 쉼터가 이어지는 후쿠오카의 도심 공원이에요. 물가를 따라 걷고 인접한 마이즈루공원이나 미술관 관람을 더하면 차분한 반나절 일정을 만들 수 있어요.",
    "highlights": [
      "연못 산책로",
      "물가 풍경",
      "주변 문화시설"
    ],
    "tip": "공원과 별도 시설의 운영 조건을 구분하고 산책로의 보행·운동 동선을 배려하세요.",
    "source": "https://www.japan.travel/en/destinations/kyushu/fukuoka/"
  },
  {
    "city": "FUK",
    "name": "후쿠오카성 터",
    "wiki": "Fukuoka Castle",
    "category": "문화/역사",
    "nearby": false,
    "area": "후쿠오카 · 마이즈루공원",
    "desc": "돌담과 성터가 남아 있는 공원에서 후쿠오카의 역사와 도심 풍경을 함께 볼 수 있어요. 오호리공원과 인접해 두 장소를 걸어 연결할 수 있고 계절마다 다른 나무와 잔디 풍경을 즐길 수 있어요.",
    "highlights": [
      "성곽 돌담",
      "공원 전망",
      "오호리공원 연계"
    ],
    "tip": "성터의 높낮이와 계단을 고려해 산책 경로를 정해보세요.",
    "source": "https://www.japan.travel/en/destinations/kyushu/fukuoka/"
  },
  {
    "city": "FUK",
    "name": "캐널시티 하카타",
    "wiki": "Canal City Hakata",
    "category": "쇼핑",
    "nearby": false,
    "area": "후쿠오카 · 하카타",
    "desc": "수로와 곡선형 건물을 중심으로 상점과 음식점이 모인 복합 상업시설이에요. 쇼핑과 식사를 함께 해결하기 편하고 주변 나카스나 구시가지 산책 중 쉬어가는 실내 동선으로도 활용할 수 있어요.",
    "highlights": [
      "수로와 건축",
      "쇼핑",
      "식사 공간"
    ],
    "tip": "방문하려는 점포와 공연·분수 등의 운영 일정은 개별 안내를 확인하세요.",
    "source": "https://www.japan.travel/en/destinations/kyushu/fukuoka/"
  },
  {
    "city": "FUK",
    "name": "구시다 신사",
    "wiki": "Kushida Shrine",
    "category": "문화/역사",
    "nearby": false,
    "area": "후쿠오카 · 하카타 구시가지",
    "desc": "하카타의 전통과 축제 문화를 접할 수 있는 신사로 구시가지 산책과 함께 둘러보기 좋아요. 전시된 장식과 경내의 건축을 살펴본 뒤 주변 상점가로 걸으면 하카타의 생활 풍경도 이어집니다.",
    "highlights": [
      "신사 건축",
      "축제 문화",
      "구시가지 골목"
    ],
    "tip": "참배 구역과 촬영 안내를 존중하며 다른 방문객의 동선을 막지 마세요.",
    "source": "https://www.japan.travel/en/destinations/kyushu/fukuoka/"
  },
  {
    "city": "FUK",
    "name": "후쿠오카 타워",
    "wiki": "Fukuoka Tower",
    "category": "액티비티",
    "nearby": false,
    "area": "후쿠오카 · 모모치",
    "desc": "해안 쪽에 자리한 타워에서 바다와 도시가 만나는 후쿠오카의 풍경을 조망할 수 있어요. 전망 관람 전후로 모모치 해변을 걸으면 높은 곳과 물가에서 서로 다른 시선의 도시를 만날 수 있어요.",
    "highlights": [
      "도시와 바다 전망",
      "타워 외관",
      "모모치 연계"
    ],
    "tip": "관람권과 전망 조건을 확인하고 바람이 강한 날에는 해안 산책 계획을 조정하세요.",
    "source": "https://www.japan.travel/en/destinations/kyushu/fukuoka/"
  },
  {
    "city": "FUK",
    "name": "모모치 해변",
    "wiki": "Momochi Seaside Park",
    "category": "휴식",
    "nearby": false,
    "area": "후쿠오카 · 모모치",
    "desc": "후쿠오카 타워 인근의 인공 해변으로 도심에서 바다 풍경을 가볍게 즐길 수 있는 장소예요. 해변을 따라 걷거나 주변 시설에서 쉬며 도시 관광 중 여유 있는 시간을 넣기에 좋아요.",
    "highlights": [
      "해변 산책",
      "타워 조망",
      "해안 휴식"
    ],
    "tip": "해변 시설과 해양 활동은 현장 이용 규칙을 확인한 뒤 이용하세요.",
    "source": "https://www.japan.travel/en/destinations/kyushu/fukuoka/"
  },
  {
    "city": "FUK",
    "name": "다자이후 덴만구",
    "wiki": "Dazaifu Tenman-gū",
    "category": "문화/역사",
    "nearby": true,
    "area": "후쿠오카 근교 · 다자이후",
    "desc": "참배길의 상점과 다리, 신사 경내가 이어지는 후쿠오카 근교의 대표적인 문화 여행지예요. 신사와 주변 거리 산책을 중심으로 계획하거나 인근 박물관을 더해 지역의 역사와 문화를 살펴볼 수 있어요.",
    "highlights": [
      "참배 상점가",
      "신사 경내",
      "주변 박물관"
    ],
    "tip": "공사와 행사에 따른 관람 동선을 공식 안내에서 확인하고 상점별 쉬는 날도 살펴보세요.",
    "source": "https://dazaifu.org/"
  },
  {
    "city": "FUK",
    "name": "이토시마 후타미가우라",
    "wiki": "Sakurai Futamigaura",
    "category": "자연",
    "nearby": true,
    "area": "후쿠오카 근교 · 이토시마",
    "desc": "바다 위 바위와 해안 풍경으로 알려진 이토시마의 경승지예요. 도심과 다른 해안 드라이브나 산책 일정으로 연결할 수 있으며 날씨와 빛에 따라 달라지는 풍경을 감상하기 좋아요.",
    "highlights": [
      "해안 바위",
      "바다 풍경",
      "이토시마 산책"
    ],
    "tip": "대중교통 접근과 돌아오는 교통편을 미리 확인하고 해안 촬영 시 파도에 가까이 가지 마세요.",
    "source": "https://www.japan.travel/en/destinations/kyushu/fukuoka/"
  },
  {
    "city": "CTS",
    "name": "오도리 공원",
    "wiki": "Odori Park",
    "category": "휴식",
    "nearby": false,
    "area": "삿포로 · 주오",
    "desc": "도심을 길게 가로지르는 공원으로 잔디와 분수, 도시 건축을 함께 볼 수 있어요. 중심가 쇼핑이나 식사 일정 사이에 걸으며 계절별로 달라지는 삿포로의 야외 풍경을 느끼기 좋아요.",
    "highlights": [
      "도심 녹지",
      "분수와 꽃",
      "TV타워 조망"
    ],
    "tip": "축제나 행사의 일정은 별도로 확인하고 공원 내 이용 가능한 구역을 살펴보세요.",
    "source": "https://www.sapporo.travel/en/"
  },
  {
    "city": "CTS",
    "name": "삿포로 시계탑",
    "wiki": "Sapporo Clock Tower",
    "category": "문화/역사",
    "nearby": false,
    "area": "삿포로 · 중심가",
    "desc": "목조 건축과 시계가 특징인 삿포로의 역사적 건물이에요. 도심 산책 중 외관을 감상하거나 내부 전시를 통해 도시의 근대적 형성과 관련된 이야기를 살펴볼 수 있어요.",
    "highlights": [
      "목조 외관",
      "시계탑",
      "도시 역사 전시"
    ],
    "tip": "외부 촬영과 내부 관람의 조건을 구분하고 보행로에서 촬영 동선을 배려하세요.",
    "source": "https://www.sapporo.travel/en/"
  },
  {
    "city": "CTS",
    "name": "삿포로 맥주박물관",
    "wiki": "Sapporo Beer Museum",
    "category": "문화/역사",
    "nearby": false,
    "area": "삿포로 · 히가시",
    "desc": "붉은 벽돌 건물에서 삿포로의 맥주와 산업 역사를 살펴볼 수 있는 박물관이에요. 건물 외관과 전시를 함께 보고 주변 정원 공간을 둘러보면 도심 관광과 다른 분위기의 일정을 만들 수 있어요.",
    "highlights": [
      "붉은 벽돌 건축",
      "산업 역사",
      "주변 정원"
    ],
    "tip": "전시·투어·시음의 예약과 이용 조건은 각각 확인하세요.",
    "source": "https://www.sapporo.travel/en/"
  },
  {
    "city": "CTS",
    "name": "홋카이도 신궁",
    "wiki": "Hokkaidō Shrine",
    "category": "문화/역사",
    "nearby": false,
    "area": "삿포로 · 마루야마",
    "desc": "숲으로 둘러싸인 경내와 참배길에서 조용한 시간을 보낼 수 있는 신사예요. 인접한 마루야마공원 산책을 더하면 도심에서 자연과 전통 문화를 함께 접하는 코스로 연결됩니다.",
    "highlights": [
      "숲 속 참배길",
      "신사 건축",
      "마루야마공원"
    ],
    "tip": "참배와 촬영 규칙을 따르고 겨울에는 산책로 상태를 확인하세요.",
    "source": "https://www.sapporo.travel/en/"
  },
  {
    "city": "CTS",
    "name": "모이와산",
    "wiki": "Mount Moiwa",
    "category": "자연",
    "nearby": false,
    "area": "삿포로 · 모이와",
    "desc": "삿포로의 시가지와 주변 산을 조망할 수 있는 산이에요. 전망 관람을 중심으로 일정을 잡고 낮과 저녁 중 원하는 시간대를 골라 도시의 넓은 지형을 살펴볼 수 있어요.",
    "highlights": [
      "도시 전경",
      "산 전망",
      "야경"
    ],
    "tip": "로프웨이 등 이동 수단의 운행과 기상 상황을 공식 안내에서 확인하세요.",
    "source": "https://www.sapporo.travel/en/"
  },
  {
    "city": "CTS",
    "name": "니조시장",
    "wiki": "Nijō Market",
    "category": "음식",
    "nearby": false,
    "area": "삿포로 · 중심가",
    "desc": "해산물과 식재료를 파는 상점, 식당이 모인 삿포로의 시장이에요. 도심 산책 중 가게별 메뉴를 비교하며 식사를 하거나 지역 식재료를 구경하는 짧은 일정으로 들르기 좋아요.",
    "highlights": [
      "해산물 상점",
      "시장 식당",
      "중심가 연계"
    ],
    "tip": "상점마다 영업시간이 다르므로 방문할 가게와 메뉴 가격을 직접 확인하세요.",
    "source": "https://www.sapporo.travel/en/"
  },
  {
    "city": "CTS",
    "name": "오타루 운하",
    "wiki": "Otaru Canal",
    "category": "문화/역사",
    "nearby": true,
    "area": "홋카이도 · 오타루",
    "desc": "운하와 석조 창고 건물이 이어지는 오타루의 대표적인 산책 구역이에요. 운하 주변에서 옛 항구 도시의 풍경을 보고 상점가의 유리 공예나 디저트 가게로 일정을 확장할 수 있어요.",
    "highlights": [
      "운하 산책",
      "석조 창고",
      "공예 상점가"
    ],
    "tip": "삿포로 왕복 교통을 먼저 정하고 운하와 상점가를 걸어서 연결해보세요.",
    "source": "https://www.sapporo.travel/en/"
  },
  {
    "city": "CTS",
    "name": "조잔케이",
    "wiki": "Jōzankei",
    "category": "휴식",
    "nearby": true,
    "area": "삿포로 주변 · 조잔케이",
    "desc": "계곡과 온천 마을 풍경을 함께 만날 수 있는 삿포로 외곽의 여행지예요. 다리와 강변 산책을 중심으로 둘러보거나 이용 조건을 확인한 온천 시설을 더해 느긋한 하루를 보낼 수 있어요.",
    "highlights": [
      "계곡과 다리",
      "온천 마을",
      "숲길"
    ],
    "tip": "온천 시설의 당일 이용 가능 여부와 왕복 교통편을 따로 확인하세요.",
    "source": "https://www.sapporo.travel/en/"
  },
  {
    "city": "OKA",
    "name": "국제거리",
    "wiki": "Kokusai Street",
    "category": "쇼핑",
    "nearby": false,
    "area": "오키나와 · 나하",
    "desc": "기념품 상점과 음식점이 이어지는 나하 중심의 번화가예요. 큰길뿐 아니라 주변 상점가 골목을 함께 걸으며 오키나와 음식과 공예품을 살펴볼 수 있어요.",
    "highlights": [
      "기념품 상점",
      "지역 음식",
      "골목 상점가"
    ],
    "tip": "길거리와 점포의 운영 시간이 다르니 관심 있는 가게를 따로 확인하세요.",
    "source": "https://visitokinawajapan.com/"
  },
  {
    "city": "OKA",
    "name": "슈리성 공원",
    "wiki": "Shuri Castle",
    "category": "문화/역사",
    "nearby": false,
    "area": "오키나와 · 나하 슈리",
    "desc": "류큐 왕국의 역사와 연결되는 성곽·정원 구역으로 나하의 옛 중심을 살펴볼 수 있어요. 복원 상황에 따라 볼 수 있는 시설이 달라질 수 있어 공개 구역을 중심으로 역사 산책을 계획하는 것이 좋아요.",
    "highlights": [
      "류큐 왕국 역사",
      "성곽과 문",
      "슈리 마을"
    ],
    "tip": "복원 공사와 공개 구역, 입장 조건을 공식 안내에서 확인하세요.",
    "source": "https://visitokinawajapan.com/"
  },
  {
    "city": "OKA",
    "name": "쓰보야 야치문 거리",
    "wiki": "Tsuboya",
    "category": "문화/역사",
    "nearby": false,
    "area": "오키나와 · 나하 쓰보야",
    "desc": "도자기 공방과 상점이 모여 있는 거리로 오키나와의 생활 공예를 가까이 볼 수 있어요. 접시와 그릇의 형태·무늬를 비교하며 골목을 걷고 국제거리나 시장 일정과 연결하기 좋아요.",
    "highlights": [
      "도자기 공예",
      "골목 산책",
      "지역 상점"
    ],
    "tip": "공방 안 촬영과 작품 취급은 가게의 안내를 따르고 깨지기 쉬운 상품을 배려하세요.",
    "source": "https://visitokinawajapan.com/"
  },
  {
    "city": "OKA",
    "name": "나미노우에 해변",
    "wiki": "Naminoue Beach",
    "category": "휴식",
    "nearby": false,
    "area": "오키나와 · 나하 해안",
    "desc": "나하 시내에서 해변 풍경을 가볍게 접할 수 있는 장소예요. 주변 나미노우에 신사와 해안 공간을 함께 둘러보면 이동을 크게 늘리지 않고 바다와 문화를 연결할 수 있어요.",
    "highlights": [
      "시내 해변",
      "해안 풍경",
      "인근 신사"
    ],
    "tip": "물놀이 가능한 구역과 해변 운영 안내를 확인하고 지정 구역을 이용하세요.",
    "source": "https://visitokinawajapan.com/"
  },
  {
    "city": "OKA",
    "name": "오키나와 현립박물관·미술관",
    "wiki": "Okinawa Prefectural Museum",
    "category": "문화/역사",
    "nearby": false,
    "area": "오키나와 · 나하 오모로마치",
    "desc": "오키나와의 자연·역사·문화와 미술을 함께 살펴볼 수 있는 복합 문화시설이에요. 실내 관람을 중심으로 지역을 이해하는 시간을 넣고 주변 상업지구 산책과 연결하기 좋아요.",
    "highlights": [
      "자연·역사 전시",
      "미술 관람",
      "건축 외관"
    ],
    "tip": "박물관과 미술관의 전시·휴관·관람권 조건을 구분해 확인하세요.",
    "source": "https://visitokinawajapan.com/"
  },
  {
    "city": "OKA",
    "name": "후쿠슈엔",
    "wiki": "Fukushūen",
    "category": "휴식",
    "nearby": false,
    "area": "오키나와 · 나하 구메",
    "desc": "연못과 정자, 돌다리 등이 어우러진 중국식 정원이에요. 번화한 도심에서 잠시 벗어나 정원 안의 작은 풍경을 따라 걸으며 쉬어가는 일정으로 넣기 좋아요.",
    "highlights": [
      "연못과 정자",
      "중국식 정원",
      "도심 산책"
    ],
    "tip": "정원 운영시간과 행사에 따른 이용 안내를 확인하세요.",
    "source": "https://visitokinawajapan.com/"
  },
  {
    "city": "OKA",
    "name": "온나 해안 만좌모",
    "wiki": "Cape Manzamo",
    "category": "자연",
    "nearby": true,
    "area": "오키나와 본섬 주변 · 온나",
    "desc": "바다와 석회암 절벽을 바라보는 본섬 서해안의 경승지예요. 전망 구역을 따라 해안의 형태를 살펴보고 온나 지역의 해변이나 휴식 일정과 함께 구성할 수 있어요.",
    "highlights": [
      "석회암 절벽",
      "바다 전망",
      "서해안 풍경"
    ],
    "tip": "해안 난간 밖으로 나가지 말고 강풍·우천 시 현장 안내를 확인하세요.",
    "source": "https://visitokinawajapan.com/"
  },
  {
    "city": "OKA",
    "name": "오키나와 추라우미 수족관",
    "wiki": "Okinawa Churaumi Aquarium",
    "category": "액티비티",
    "nearby": true,
    "area": "오키나와 본섬 주변 · 모토부",
    "desc": "오키나와의 바다 생물을 주제로 전시하는 수족관으로 큰 수조가 대표적인 볼거리예요. 해양박공원 안의 다른 구역과 함께 방문할 수 있어 본섬 북부에서 여유 있는 관람 일정으로 계획하기 좋아요.",
    "highlights": [
      "대형 수조",
      "해양 생물 전시",
      "해양박공원"
    ],
    "tip": "나하와 거리가 있는 북부 일정이므로 왕복 이동과 관람 시간을 함께 계획하세요.",
    "source": "https://visitokinawajapan.com/"
  },
  {
    "city": "NGO",
    "name": "나고야성",
    "wiki": "Nagoya Castle",
    "category": "문화/역사",
    "nearby": false,
    "area": "나고야 · 나카",
    "desc": "성곽과 공원, 복원된 혼마루어전 등에서 나고야의 역사적 풍경을 살펴볼 수 있어요. 건물별 공개 조건을 확인한 뒤 성벽과 정원 산책을 더하면 건축과 야외 공간을 함께 즐기는 일정이 됩니다.",
    "highlights": [
      "성곽과 해자",
      "혼마루어전",
      "공원 산책"
    ],
    "tip": "천수각 등 건물별 출입 가능 여부와 공사 안내를 방문 전 확인하세요.",
    "source": "https://www.nagoya-info.jp/en/"
  },
  {
    "city": "NGO",
    "name": "아쓰타 신궁",
    "wiki": "Atsuta Shrine",
    "category": "문화/역사",
    "nearby": false,
    "area": "나고야 · 아쓰타",
    "desc": "숲으로 둘러싸인 경내와 참배길에서 전통 신사의 차분한 분위기를 느낄 수 있어요. 전각과 오래된 나무를 둘러보고 주변 식사 일정과 묶어 도심 문화 산책으로 구성하기 좋아요.",
    "highlights": [
      "신사 참배길",
      "경내 숲",
      "전통 건축"
    ],
    "tip": "참배 구역의 촬영과 출입 안내를 존중하며 조용히 둘러보세요.",
    "source": "https://www.nagoya-info.jp/en/"
  },
  {
    "city": "NGO",
    "name": "오스 상점가",
    "wiki": "Ōsu",
    "category": "쇼핑",
    "nearby": false,
    "area": "나고야 · 오스",
    "desc": "여러 아케이드에 의류·잡화·음식점이 모여 있는 나고야의 개성 있는 상점가예요. 오스칸논 주변에서 골목을 따라 걸으며 오래된 상점과 새로운 취향의 가게를 함께 찾아볼 수 있어요.",
    "highlights": [
      "아케이드 거리",
      "오스칸논 연계",
      "다양한 상점"
    ],
    "tip": "가게마다 영업일이 다르니 꼭 가고 싶은 점포는 별도로 확인하세요.",
    "source": "https://www.nagoya-info.jp/en/"
  },
  {
    "city": "NGO",
    "name": "도쿠가와 미술관·도쿠가와엔",
    "wiki": "Tokugawa Art Museum",
    "category": "문화/역사",
    "nearby": false,
    "area": "나고야 · 히가시",
    "desc": "다이묘 문화와 관련된 소장품을 살펴보는 미술관과 인접한 정원을 함께 계획할 수 있어요. 전시 관람 후 정원 산책을 더하면 무기·공예와 전통 정원이라는 서로 다른 방식으로 역사를 접할 수 있어요.",
    "highlights": [
      "다이묘 문화",
      "공예 소장품",
      "도쿠가와엔 연계"
    ],
    "tip": "미술관과 정원은 별도 시설이므로 관람권과 휴관일을 각각 확인하세요.",
    "source": "https://www.nagoya-info.jp/en/"
  },
  {
    "city": "NGO",
    "name": "나고야시 과학관",
    "wiki": "Nagoya City Science Museum",
    "category": "액티비티",
    "nearby": false,
    "area": "나고야 · 시라카와공원",
    "desc": "과학 전시와 돔 형태의 플라네타륨으로 알려진 도심 문화시설이에요. 관심 있는 전시를 골라 둘러보고 시라카와공원 산책을 더하면 실내와 야외 활동을 함께 넣을 수 있어요.",
    "highlights": [
      "과학 체험 전시",
      "플라네타륨",
      "공원 연계"
    ],
    "tip": "플라네타륨과 일반 전시의 관람권·예약 조건을 구분해 확인하세요.",
    "source": "https://www.nagoya-info.jp/en/"
  },
  {
    "city": "NGO",
    "name": "오아시스 21",
    "wiki": "Oasis 21",
    "category": "휴식",
    "nearby": false,
    "area": "나고야 · 사카에",
    "desc": "물과 유리를 활용한 지붕 구조가 특징인 사카에 지역의 공공·상업 공간이에요. 건축을 감상하며 주변을 걷고 인근 공원과 상점가를 연결하면 나고야 중심가를 가볍게 둘러볼 수 있어요.",
    "highlights": [
      "유리 지붕",
      "도심 건축",
      "사카에 산책"
    ],
    "tip": "상부 공간이나 행사 구역의 이용 가능 여부를 현장 안내에서 확인하세요.",
    "source": "https://www.nagoya-info.jp/en/"
  },
  {
    "city": "NGO",
    "name": "이누야마성",
    "wiki": "Inuyama Castle",
    "category": "문화/역사",
    "nearby": true,
    "area": "아이치 · 이누야마",
    "desc": "기소강 가까이 자리한 성과 성하마을을 함께 둘러보는 나고야 근교 여행지예요. 성의 목조 구조와 전망을 살펴본 뒤 마을 골목을 걸으며 먹거리와 옛 거리를 즐길 수 있어요.",
    "highlights": [
      "목조 천수각",
      "기소강 조망",
      "성하마을"
    ],
    "tip": "성 내부 계단과 관람 규칙을 확인하고 마을 산책에 맞는 신발을 준비하세요.",
    "source": "https://www.nagoya-info.jp/en/"
  },
  {
    "city": "NGO",
    "name": "기후 다카야마 구시가지",
    "wiki": "Takayama, Gifu",
    "category": "문화/역사",
    "nearby": true,
    "area": "기후 · 다카야마",
    "desc": "목조 상가와 전통 거리가 남아 있는 히다 지역의 도시로 나고야에서 확장 여행을 계획할 수 있어요. 구시가지 골목을 걷고 지역 공예와 음식을 살펴보며 대도시와는 다른 산간 도시 분위기를 즐길 수 있어요.",
    "highlights": [
      "목조 상가 거리",
      "히다 공예",
      "지역 음식"
    ],
    "tip": "왕복 이동이 길어질 수 있으니 당일 방문과 숙박 중 일정에 맞는 방식을 선택하세요.",
    "source": "https://www.nagoya-info.jp/en/"
  },
  {
    "city": "TPE",
    "name": "시먼딩",
    "wiki": "Ximending",
    "category": "쇼핑",
    "nearby": false,
    "area": "타이베이 · 완화",
    "desc": "보행자 거리와 의류·간식·공연 문화가 모인 활기찬 상업 지구예요. 큰길에서 골목으로 이동하며 상점과 카페를 살펴보고 홍러우 주변의 문화 공간도 함께 둘러볼 수 있어요.",
    "highlights": [
      "보행자 거리",
      "홍러우",
      "간식과 쇼핑"
    ],
    "tip": "상점별 운영시간을 확인하고 골목 교차로에서는 통행을 배려하세요.",
    "source": "https://www.travel.taipei/en/attraction"
  },
  {
    "city": "TPE",
    "name": "타이베이 101",
    "wiki": "Taipei 101",
    "category": "액티비티",
    "nearby": false,
    "area": "타이베이 · 신이",
    "desc": "도시의 스카이라인을 대표하는 고층 건물로 전망 관람과 쇼핑을 함께 계획할 수 있어요. 주변 신이 상업지구를 걷거나 전망대 관람을 더해 타이베이를 높은 곳과 거리 양쪽에서 바라볼 수 있어요.",
    "highlights": [
      "도시 전망",
      "고층 건축",
      "신이 거리"
    ],
    "tip": "전망대 이용권과 조망 조건을 확인하고 날씨에 따라 방문 순서를 조정하세요.",
    "source": "https://www.travel.taipei/en/attraction"
  },
  {
    "city": "TPE",
    "name": "국립고궁박물원",
    "wiki": "National Palace Museum",
    "category": "문화/역사",
    "nearby": false,
    "area": "타이베이 · 스린",
    "desc": "중화권의 역사·미술·공예 소장품을 관람할 수 있는 대표적인 박물관이에요. 전시실을 모두 빠르게 돌기보다 도자기나 서화 등 관심 주제를 골라 살펴보면 작품의 차이를 더 자세히 느낄 수 있어요.",
    "highlights": [
      "도자기·공예",
      "역사 소장품",
      "주제별 관람"
    ],
    "tip": "전시 교체와 촬영 규칙, 휴관 정보를 공식 관람 안내에서 확인하세요.",
    "source": "https://www.travel.taipei/en/attraction"
  },
  {
    "city": "TPE",
    "name": "용산사",
    "wiki": "Lungshan Temple",
    "category": "문화/역사",
    "nearby": false,
    "area": "타이베이 · 완화",
    "desc": "용 조각과 지붕 장식, 참배 문화가 어우러진 타이베이의 사찰이에요. 경내 건축을 살펴본 뒤 완화 지역의 오래된 거리와 시장으로 걸으면 도시의 생활 풍경을 함께 접할 수 있어요.",
    "highlights": [
      "사찰 장식",
      "참배 문화",
      "완화 골목"
    ],
    "tip": "참배하는 사람의 동선을 피하고 사진 촬영과 실내 출입 안내를 따라주세요.",
    "source": "https://www.travel.taipei/en/attraction"
  },
  {
    "city": "TPE",
    "name": "디화제",
    "wiki": "Dihua Street",
    "category": "문화/역사",
    "nearby": false,
    "area": "타이베이 · 다다오청",
    "desc": "오래된 상가 건물에 식재료·한약재·잡화 가게와 카페가 함께 있는 거리예요. 건축 외관과 상점들을 천천히 둘러보고 다다오청 강변 산책을 더해 옛 상업 지구의 분위기를 느껴보세요.",
    "highlights": [
      "옛 상가 건축",
      "전통 식재료",
      "강변 연계"
    ],
    "tip": "상업용 매장 안의 촬영은 허락을 구하고 구매 전 상품 설명을 확인하세요.",
    "source": "https://www.travel.taipei/en/attraction"
  },
  {
    "city": "TPE",
    "name": "베이터우",
    "wiki": "Beitou Hot Spring Museum",
    "category": "휴식",
    "nearby": false,
    "area": "타이베이 · 베이터우",
    "desc": "온천 문화와 공원, 역사 건축을 함께 볼 수 있는 타이베이 북쪽의 지역이에요. 박물관과 공원 산책을 중심으로 둘러보거나 이용 조건을 확인한 온천 시설에서 쉬어가는 일정을 만들 수 있어요.",
    "highlights": [
      "온천박물관",
      "공원 산책",
      "역사 건축"
    ],
    "tip": "온천 시설의 운영과 이용 규정을 확인하고 지열 구역에서는 지정 동선만 이용하세요.",
    "source": "https://www.travel.taipei/en/attraction"
  },
  {
    "city": "TPE",
    "name": "지우펀",
    "wiki": "Jiufen",
    "category": "문화/역사",
    "nearby": true,
    "area": "신베이 · 루이팡",
    "desc": "산비탈을 따라 골목과 찻집이 이어져 바다 방향의 풍경을 함께 즐길 수 있는 마을이에요. 계단과 작은 상점을 천천히 둘러보며 차를 마시거나 해안 조망을 더하는 타이베이 근교 일정으로 계획할 수 있어요.",
    "highlights": [
      "계단 골목",
      "찻집",
      "산과 바다 전망"
    ],
    "tip": "골목이 좁고 계단이 많으니 혼잡할 때 서두르지 말고 귀환 교통편을 확인하세요.",
    "source": "https://newtaipei.travel/en"
  },
  {
    "city": "TPE",
    "name": "단수이",
    "wiki": "Tamsui District",
    "category": "휴식",
    "nearby": true,
    "area": "신베이 · 단수이",
    "desc": "강 하구를 따라 산책로와 옛 거리, 역사 건물이 이어지는 타이베이 근교 지역이에요. 물가 풍경을 보며 걷고 주변 식사나 문화유산 관람을 더하면 도심과 다른 느긋한 하루를 만들 수 있어요.",
    "highlights": [
      "강변 산책",
      "옛 거리",
      "하구 풍경"
    ],
    "tip": "강변과 역사 시설을 이동할 경로를 정하고 날씨에 맞춰 야외 일정을 조정하세요.",
    "source": "https://newtaipei.travel/en"
  },
  {
    "city": "DAD",
    "name": "미케 해변",
    "wiki": "My Khe Beach",
    "category": "휴식",
    "nearby": false,
    "area": "다낭 해안",
    "desc": "긴 모래사장과 바다를 따라 산책하며 다낭의 해안 풍경을 만나는 곳입니다. 해변 뒤편의 카페와 식당을 함께 둘러보면 휴식 중심의 동선을 만들 수 있어요.",
    "highlights": [
      "해변 산책",
      "바다 풍경",
      "해안 카페"
    ],
    "tip": "모래사장 산책과 수영을 구분해 계획하고 현장 해변 안내를 확인하세요.",
    "source": "https://vietnam.travel/things-to-do/must-visit-places-in-da-nang/"
  },
  {
    "city": "DAD",
    "name": "드래곤 브리지",
    "wiki": "Dragon Bridge (Da Nang)",
    "category": "문화/역사",
    "nearby": false,
    "area": "한강 도심",
    "desc": "용을 형상화한 다리가 한강을 가로지르며 다낭의 도시 풍경을 만듭니다. 강변 보행로에서 다리의 구조를 살펴보고 반대편의 야경을 감상하는 산책 코스로 연결해보세요.",
    "highlights": [
      "용 형상 교량",
      "한강 산책",
      "도시 야경"
    ],
    "tip": "행사 관람을 원하면 공식 일정부터 확인하고 강변 이동 경로를 정하세요.",
    "source": "https://vietnam.travel/things-to-do/must-visit-places-in-da-nang/"
  },
  {
    "city": "DAD",
    "name": "참 조각 박물관",
    "wiki": "Museum of Cham Sculpture",
    "category": "문화/역사",
    "nearby": false,
    "area": "다낭 도심",
    "desc": "참 문화의 조각과 건축 장식을 통해 중부 베트남의 역사와 미술을 살펴보는 박물관입니다. 신화와 종교가 담긴 석조 작품을 보고 미선 유적 방문과 연결하면 이해가 깊어져요.",
    "highlights": [
      "참 조각",
      "종교 미술",
      "역사 전시"
    ],
    "tip": "관람 전에 공식 전시 안내를 읽고 관심 있는 작품군부터 살펴보세요.",
    "source": "https://vietnam.travel/things-to-do/must-visit-places-in-da-nang/"
  },
  {
    "city": "DAD",
    "name": "한 시장",
    "wiki": "Hàn Market",
    "category": "쇼핑",
    "nearby": false,
    "area": "다낭 도심",
    "desc": "직물과 의류, 식재료와 생활용품이 모이는 다낭의 전통 시장입니다. 관광 기념품만 보기보다 상점 사이를 걸으며 지역의 일상과 시장 풍경을 함께 관찰해보세요.",
    "highlights": [
      "전통 시장",
      "직물과 의류",
      "지역 생활"
    ],
    "tip": "구매 전에 가격과 수량을 확인하고 식품 반입 규정은 별도로 확인하세요.",
    "source": "https://vietnam.travel/things-to-do/must-visit-places-in-da-nang/"
  },
  {
    "city": "DAD",
    "name": "오행산",
    "wiki": "Marble Mountains (Vietnam)",
    "category": "자연",
    "nearby": false,
    "area": "다낭 남부",
    "desc": "석회암 산과 동굴, 사찰이 한데 이어지는 다낭 남부의 명소입니다. 계단과 동굴 길을 따라 서로 다른 전망과 종교 공간을 만날 수 있어 해변과 다른 분위기를 경험해요.",
    "highlights": [
      "석회암 지형",
      "동굴 사찰",
      "전망 산책"
    ],
    "tip": "계단과 동굴 구간을 고려해 이동 가능한 범위를 정하고 미끄럽지 않은 신발을 준비하세요.",
    "source": "https://vietnam.travel/things-to-do/must-visit-places-in-da-nang/"
  },
  {
    "city": "DAD",
    "name": "선짜 반도",
    "wiki": "Sơn Trà Peninsula",
    "category": "자연",
    "nearby": false,
    "area": "다낭 동북부",
    "desc": "도시 가까이에서 산림과 바다를 함께 만날 수 있는 반도입니다. 해안과 사찰 주변을 둘러보며 해변 휴식과는 다른 다낭의 자연 풍경을 살펴볼 수 있어요.",
    "highlights": [
      "산림 풍경",
      "해안 전망",
      "반도 탐방"
    ],
    "tip": "반도 내 통행 가능한 구간과 교통수단을 확인하고 야생동물에 먹이를 주지 마세요.",
    "source": "https://vietnam.travel/things-to-do/must-visit-places-in-da-nang/"
  },
  {
    "city": "DAD",
    "name": "호이안 구시가지",
    "wiki": "Hội An",
    "category": "문화/역사",
    "nearby": true,
    "area": "다낭 주변 · 호이안",
    "desc": "옛 상업도시의 건축과 골목이 남아 있는 호이안의 역사 지구입니다. 강변과 오래된 가옥, 상점들을 연결해 걷다 보면 다낭 도심과 다른 느린 분위기를 느낄 수 있어요.",
    "highlights": [
      "역사 골목",
      "강변 산책",
      "옛 가옥"
    ],
    "tip": "구시가지의 보행 구역과 개별 관람 시설의 이용 조건을 먼저 확인하세요.",
    "source": "https://vietnam.travel/things-to-do/must-visit-places-in-da-nang/"
  },
  {
    "city": "DAD",
    "name": "미선 유적",
    "wiki": "Mỹ Sơn",
    "category": "문화/역사",
    "nearby": true,
    "area": "다낭 주변 · 미선",
    "desc": "산과 숲 사이에 남은 참 왕국의 사원 유적을 둘러보는 역사 여행지입니다. 붉은 벽돌 건축과 조각 장식을 살펴보며 참 조각 박물관에서 본 작품의 배경을 연결해보세요.",
    "highlights": [
      "참 사원 유적",
      "벽돌 건축",
      "숲속 유적 산책"
    ],
    "tip": "유적 보존 구역을 존중하고 관람 동선과 현장 해설 제공 여부를 확인하세요.",
    "source": "https://vietnam.travel/things-to-do/must-visit-places-in-da-nang/"
  },
  {
    "city": "BKK",
    "name": "왕궁",
    "wiki": "Grand Palace",
    "category": "문화/역사",
    "nearby": false,
    "area": "방콕 구도심",
    "desc": "태국 왕실의 역사와 화려한 궁정 건축이 모여 있는 방콕의 대표 유적입니다. 같은 권역의 사원과 강변을 함께 연결하면 구도심을 이해하는 문화 탐방 동선이 됩니다.",
    "highlights": [
      "왕실 건축",
      "궁정 장식",
      "구도심 산책"
    ],
    "tip": "공식 복장 규정과 입장 가능한 구역을 확인한 뒤 방문하세요.",
    "source": "https://www.tourismthailand.org/Destinations/Provinces/Bangkok/219"
  },
  {
    "city": "BKK",
    "name": "왓 포",
    "wiki": "Wat Pho",
    "category": "문화/역사",
    "nearby": false,
    "area": "방콕 구도심",
    "desc": "와불과 섬세한 사원 장식으로 알려진 불교 사원입니다. 넓은 경내의 건물과 회랑을 천천히 둘러보며 태국 사원 건축의 다양한 요소를 비교해볼 수 있어요.",
    "highlights": [
      "와불",
      "사원 회랑",
      "전통 장식"
    ],
    "tip": "종교 공간의 복장과 촬영 안내를 따르고 신발을 벗는 구역을 확인하세요.",
    "source": "https://www.tourismthailand.org/Destinations/Provinces/Bangkok/219"
  },
  {
    "city": "BKK",
    "name": "왓 아룬",
    "wiki": "Wat Arun",
    "category": "문화/역사",
    "nearby": false,
    "area": "짜오프라야 강 서안",
    "desc": "강가에 솟은 탑과 장식이 인상적인 사원으로 방콕 강변 풍경을 대표합니다. 사원 경내 관람과 맞은편 강변에서 바라보는 풍경을 서로 다른 경험으로 계획해보세요.",
    "highlights": [
      "강변 사원",
      "도자기 장식",
      "탑의 실루엣"
    ],
    "tip": "일부 계단은 경사가 있으므로 현장 동선을 확인하고 무리한 촬영을 피하세요.",
    "source": "https://www.tourismthailand.org/Destinations/Provinces/Bangkok/219"
  },
  {
    "city": "BKK",
    "name": "짜뚜짝 시장",
    "wiki": "Chatuchak Weekend Market",
    "category": "쇼핑",
    "nearby": false,
    "area": "방콕 북부",
    "desc": "의류와 공예품, 생활 소품이 넓은 구역에 모여 있는 시장입니다. 관심 있는 품목의 구역을 먼저 정하면 복잡한 통로 사이에서도 자신만의 쇼핑 코스를 만들기 좋아요.",
    "highlights": [
      "대형 시장",
      "공예 소품",
      "지역 먹거리"
    ],
    "tip": "운영일과 원하는 상점 구역을 확인하고 출입구나 만날 장소를 정해두세요.",
    "source": "https://www.tourismthailand.org/Destinations/Provinces/Bangkok/219"
  },
  {
    "city": "BKK",
    "name": "야오와랏",
    "wiki": "Yaowarat Road",
    "category": "음식",
    "nearby": false,
    "area": "방콕 차이나타운",
    "desc": "중국계 상점과 간판, 식당이 이어지는 방콕 차이나타운의 중심 거리입니다. 골목의 시장과 사원, 음식 문화를 함께 살펴보면 도시가 형성된 여러 층위를 발견할 수 있어요.",
    "highlights": [
      "차이나타운",
      "거리 음식",
      "상점 간판"
    ],
    "tip": "식당별 영업 여부를 확인하고 혼잡한 도로에서는 보행 동선을 우선하세요.",
    "source": "https://www.tourismthailand.org/Destinations/Provinces/Bangkok/219"
  },
  {
    "city": "BKK",
    "name": "룸피니 공원",
    "wiki": "Lumphini Park",
    "category": "휴식",
    "nearby": false,
    "area": "방콕 도심",
    "desc": "도심의 빌딩 사이에서 나무와 호수를 따라 걸을 수 있는 공원입니다. 사원과 시장을 둘러보는 일정 사이에 산책을 넣어 방콕의 일상적인 여유를 경험해보세요.",
    "highlights": [
      "호수 산책",
      "도심 녹지",
      "도시 일상"
    ],
    "tip": "공원의 이용 안내를 따르고 동물과 거리를 유지하며 관찰하세요.",
    "source": "https://www.tourismthailand.org/Destinations/Provinces/Bangkok/219"
  },
  {
    "city": "BKK",
    "name": "아유타야 역사공원",
    "wiki": "Ayutthaya Historical Park",
    "category": "문화/역사",
    "nearby": true,
    "area": "방콕 근교 · 아유타야",
    "desc": "옛 수도의 사원과 불탑 유적이 넓게 흩어져 있는 역사 지역입니다. 방콕의 왕궁과 비교하며 왕조의 흐름을 살펴보고 여러 유적의 형태와 주변 풍경을 둘러볼 수 있어요.",
    "highlights": [
      "옛 수도 유적",
      "불탑과 사원",
      "역사 풍경"
    ],
    "tip": "유적 사이의 이동수단과 관람할 구역을 미리 정하고 보존 안내를 지키세요.",
    "source": "https://www.tourismthailand.org/Destinations/Provinces/Bangkok/219"
  },
  {
    "city": "BKK",
    "name": "므앙보란",
    "wiki": "Ancient Siam",
    "category": "문화/역사",
    "nearby": true,
    "area": "방콕 근교 · 사뭇쁘라깐",
    "desc": "태국 여러 지역의 건축과 유적을 재현한 야외 문화 공간입니다. 지역마다 다른 건축 형태를 비교하며 다음에 가보고 싶은 태국의 여행지를 발견하는 데도 좋아요.",
    "highlights": [
      "야외 건축 전시",
      "지역 문화 비교",
      "넓은 산책 동선"
    ],
    "tip": "재현 건축물과 실제 유적을 구분해 감상하고 내부 이동 방식을 확인하세요.",
    "source": "https://www.tourismthailand.org/Destinations/Provinces/Bangkok/219"
  },
  {
    "city": "CNX",
    "name": "왓 프라싱",
    "wiki": "Wat Phra Singh",
    "category": "문화/역사",
    "nearby": false,
    "area": "치앙마이 구시가지",
    "desc": "란나 양식의 건축과 불교 문화를 살펴볼 수 있는 구시가지 사원입니다. 주변 골목의 작은 가게와 함께 걸으며 치앙마이의 차분한 도시 분위기를 경험해보세요.",
    "highlights": [
      "란나 건축",
      "사원 경내",
      "구시가지 골목"
    ],
    "tip": "예배 공간의 복장과 촬영 규칙을 확인하고 조용히 관람하세요.",
    "source": "https://www.tourismthailand.org/Destinations/Provinces/Chiang-Mai/101"
  },
  {
    "city": "CNX",
    "name": "왓 체디루앙",
    "wiki": "Wat Chedi Luang",
    "category": "문화/역사",
    "nearby": false,
    "area": "치앙마이 구시가지",
    "desc": "큰 불탑이 중심을 이루는 치앙마이의 역사적인 사원입니다. 구시가지의 다른 사원과 형태를 비교하면 옛 도성의 종교적 중심이 어떻게 구성됐는지 살펴볼 수 있어요.",
    "highlights": [
      "대형 불탑",
      "사원 역사",
      "도성 산책"
    ],
    "tip": "의례 중인 공간을 피하고 개방된 동선 안에서 건축물을 감상하세요.",
    "source": "https://www.tourismthailand.org/Destinations/Provinces/Chiang-Mai/101"
  },
  {
    "city": "CNX",
    "name": "타패 게이트",
    "wiki": "Tha Phae Gate",
    "category": "문화/역사",
    "nearby": false,
    "area": "치앙마이 구시가지 동쪽",
    "desc": "옛 성곽과 도심이 만나는 치앙마이의 대표적인 출발점입니다. 성문 주변에서 구시가지의 길을 따라 걸으며 골목의 공예 상점과 식당을 이어서 찾아보기 좋아요.",
    "highlights": [
      "옛 성문",
      "성곽 풍경",
      "골목 탐방"
    ],
    "tip": "보행 구간과 차량 구간을 구분하고 행사 여부에 따라 동선을 조정하세요.",
    "source": "https://www.tourismthailand.org/Destinations/Provinces/Chiang-Mai/101"
  },
  {
    "city": "CNX",
    "name": "님만해민 거리",
    "wiki": "Nimmanhaemin Road",
    "category": "쇼핑",
    "nearby": false,
    "area": "치앙마이 님만",
    "desc": "카페와 디자인 상점, 갤러리가 모인 치앙마이의 현대적인 거리입니다. 전통 사원이 많은 구시가지와 대비되는 분위기 속에서 로컬 디자인과 일상적인 취향을 발견해보세요.",
    "highlights": [
      "디자인 상점",
      "카페 산책",
      "현대적 거리"
    ],
    "tip": "상점별 운영 정보를 확인하고 골목 단위로 묶어 걸으면 동선을 줄일 수 있어요.",
    "source": "https://www.tourismthailand.org/Destinations/Provinces/Chiang-Mai/101"
  },
  {
    "city": "CNX",
    "name": "도이수텝 사원",
    "wiki": "Wat Phra That Doi Suthep",
    "category": "문화/역사",
    "nearby": true,
    "area": "치앙마이 외곽 · 도이수텝",
    "desc": "산 위에 자리한 사원과 전망을 함께 만나는 치앙마이의 상징적인 장소입니다. 도심에서 벗어나 숲길을 지나 사원에 도착하는 과정도 구시가지와 다른 여행 경험이 됩니다.",
    "highlights": [
      "산 위 사원",
      "금빛 불탑",
      "도시 전망"
    ],
    "tip": "산악 도로 이동과 사원 계단을 고려해 왕복 동선을 계획하세요.",
    "source": "https://www.tourismthailand.org/Destinations/Provinces/Chiang-Mai/101"
  },
  {
    "city": "CNX",
    "name": "도이인타논 국립공원",
    "wiki": "Doi Inthanon National Park",
    "category": "자연",
    "nearby": true,
    "area": "치앙마이 근교 · 도이인타논",
    "desc": "산림과 폭포, 높은 산의 풍경을 따라 탐방하는 자연 여행지입니다. 치앙마이 도심 일정과 분리해 여러 지점 중 관심 있는 코스를 고르면 여유 있게 둘러보기 좋아요.",
    "highlights": [
      "산림 탐방",
      "폭포 풍경",
      "고산 지형"
    ],
    "tip": "탐방로 개방 여부와 현지 기상 정보를 공식 안내에서 확인하세요.",
    "source": "https://www.tourismthailand.org/Destinations/Provinces/Chiang-Mai/101"
  },
  {
    "city": "CNX",
    "name": "매깜퐁",
    "wiki": "Mae Kampong",
    "category": "휴식",
    "nearby": true,
    "area": "치앙마이 근교 · 산간 마을",
    "desc": "산속의 마을과 작은 가게, 숲 풍경이 어우러지는 주변 지역입니다. 빠르게 명소를 찍기보다 마을의 길을 천천히 걸으며 치앙마이 외곽의 다른 일상을 경험해보세요.",
    "highlights": [
      "산간 마을",
      "숲 풍경",
      "마을 산책"
    ],
    "tip": "주민의 생활 공간을 존중하고 방문객에게 열린 구역에서 둘러보세요.",
    "source": "https://www.tourismthailand.org/Destinations/Provinces/Chiang-Mai/101"
  },
  {
    "city": "CNX",
    "name": "퀸 시리킷 식물원",
    "wiki": "Queen Sirikit Botanic Garden",
    "category": "자연",
    "nearby": true,
    "area": "치앙마이 근교 · 매림",
    "desc": "식물 전시와 정원, 산림 풍경을 함께 둘러볼 수 있는 식물원입니다. 구역별로 식물의 생김새와 서식 환경을 비교하며 자연 중심의 반나절 동선을 만들기 좋아요.",
    "highlights": [
      "식물 전시",
      "정원 산책",
      "산림 풍경"
    ],
    "tip": "정원과 산책 시설의 개방 구간을 확인하고 관람 지점을 골라 방문하세요.",
    "source": "https://www.tourismthailand.org/Destinations/Provinces/Chiang-Mai/101"
  },
  {
    "city": "HKT",
    "name": "푸껫 올드타운",
    "wiki": "Old Phuket Town",
    "category": "문화/역사",
    "nearby": false,
    "area": "푸껫 타운",
    "desc": "중국계 상업 문화와 유럽풍 요소가 섞인 건물이 이어지는 구도심입니다. 건물의 색과 창문 장식을 살펴보며 카페와 작은 상점이 있는 골목을 걸어보세요.",
    "highlights": [
      "역사 건축",
      "골목 카페",
      "상점 산책"
    ],
    "tip": "건물 외관 감상과 실내 관람을 구분하고 각 상점의 운영 정보를 확인하세요.",
    "source": "https://www.tourismthailand.org/Destinations/Provinces/Phuket/350"
  },
  {
    "city": "HKT",
    "name": "빠통 해변",
    "wiki": "Patong",
    "category": "휴식",
    "nearby": false,
    "area": "푸껫 서해안",
    "desc": "해변과 상업 거리가 가까이 모여 있는 푸껫의 활기찬 해안 지역입니다. 모래사장 산책과 주변 식당 탐색을 함께 계획하면 바다와 도시적인 휴가 분위기를 모두 즐길 수 있어요.",
    "highlights": [
      "해변 산책",
      "해안 상권",
      "바다 풍경"
    ],
    "tip": "해변 이용 조건과 현장 안내를 확인하고 혼잡한 구간을 피해 동선을 정하세요.",
    "source": "https://www.tourismthailand.org/Destinations/Provinces/Phuket/350"
  },
  {
    "city": "HKT",
    "name": "카론 해변",
    "wiki": "Karon Beach",
    "category": "휴식",
    "nearby": false,
    "area": "푸껫 서해안",
    "desc": "넓게 이어지는 모래사장과 해안 풍경을 만나는 지역입니다. 해변을 따라 천천히 걷거나 주변 식당과 카페에서 쉬면서 푸껫의 바다를 다른 속도로 즐겨보세요.",
    "highlights": [
      "긴 모래사장",
      "해안 산책",
      "바다 휴식"
    ],
    "tip": "바다 이용은 당일 현장 안내에 따르고 산책과 식사 장소를 묶어 계획하세요.",
    "source": "https://www.tourismthailand.org/Destinations/Provinces/Phuket/350"
  },
  {
    "city": "HKT",
    "name": "카타 해변",
    "wiki": "Kata Beach",
    "category": "휴식",
    "nearby": false,
    "area": "푸껫 남서부",
    "desc": "굽은 해안선과 바다 풍경을 따라 휴식하기 좋은 해변 지역입니다. 주변 상점과 산책 구간을 함께 살펴보면 여러 해변의 분위기를 비교하는 일정으로 연결할 수 있어요.",
    "highlights": [
      "해안 곡선",
      "해변 휴식",
      "주변 상점"
    ],
    "tip": "기상과 파도에 따라 현장 이용 안내가 달라지므로 방문 당일 확인하세요.",
    "source": "https://www.tourismthailand.org/Destinations/Provinces/Phuket/350"
  },
  {
    "city": "HKT",
    "name": "왓 찰롱",
    "wiki": "Wat Chalong",
    "category": "문화/역사",
    "nearby": false,
    "area": "푸껫 남부",
    "desc": "푸껫의 불교 문화를 가까이에서 살펴볼 수 있는 사원입니다. 해변 중심의 일정 사이에 건축 장식과 예배 문화를 접하는 문화 탐방을 넣어보세요.",
    "highlights": [
      "불교 사원",
      "건축 장식",
      "종교 문화"
    ],
    "tip": "종교 시설의 복장과 신발 안내를 따르고 의례를 방해하지 않도록 관람하세요.",
    "source": "https://www.tourismthailand.org/Destinations/Provinces/Phuket/350"
  },
  {
    "city": "HKT",
    "name": "프롬텝 곶",
    "wiki": "Promthep Cape",
    "category": "자연",
    "nearby": false,
    "area": "푸껫 남단",
    "desc": "바다를 향해 뻗은 지형과 주변 해안을 바라보는 전망 명소입니다. 해변 가까이에서 보는 풍경과 달리 높은 시점에서 푸껫의 해안선을 감상할 수 있어요.",
    "highlights": [
      "곶 전망",
      "해안선 풍경",
      "바다 조망"
    ],
    "tip": "전망대의 지정된 구역에서 감상하고 절벽 가장자리로 벗어나지 마세요.",
    "source": "https://www.tourismthailand.org/Destinations/Provinces/Phuket/350"
  },
  {
    "city": "HKT",
    "name": "팡아만",
    "wiki": "Phang Nga Bay",
    "category": "자연",
    "nearby": true,
    "area": "푸껫 근교 · 팡아",
    "desc": "바다 위로 솟은 석회암 지형과 섬 풍경이 특징인 만입니다. 푸껫의 모래 해변과는 다른 지형을 보고 싶다면 이동과 관람 방식을 확인해 별도 일정으로 계획해보세요.",
    "highlights": [
      "석회암 섬",
      "만의 풍경",
      "수상 이동"
    ],
    "tip": "출항 지점과 운항 여부, 자연 보호 구역의 이용 조건을 공식 안내에서 확인하세요.",
    "source": "https://www.tourismthailand.org/Destinations/Provinces/Phuket/350"
  },
  {
    "city": "HKT",
    "name": "피피 제도",
    "wiki": "Phi Phi Islands",
    "category": "자연",
    "nearby": true,
    "area": "푸껫 주변 해역 · 끄라비",
    "desc": "섬과 절벽, 해변이 어우러진 안다만해의 제도입니다. 푸껫에서 이동하는 주변 여행지로 고려하되 섬마다 다른 환경과 관람 규칙을 구분해 계획하는 것이 좋아요.",
    "highlights": [
      "섬 풍경",
      "해안 절벽",
      "바다 탐방"
    ],
    "tip": "배편과 보호 구역 개방 여부를 확인하고 해양 환경을 훼손하지 않는 관람 방식을 선택하세요.",
    "source": "https://www.tourismthailand.org/Destinations/Provinces/Phuket/350"
  },
  {
    "city": "HAN",
    "name": "호안끼엠 호수",
    "wiki": "Hoàn Kiếm Lake",
    "category": "휴식",
    "nearby": false,
    "area": "하노이 도심",
    "desc": "호수와 나무, 주변 골목이 어우러진 하노이 도심의 산책 지점입니다. 구시가지나 카페 방문과 연결해 걸으며 도시의 분주함과 물가의 여유를 함께 느낄 수 있어요.",
    "highlights": [
      "호수 산책",
      "도심 풍경",
      "주변 카페"
    ],
    "tip": "보행 구간 운영 여부를 확인하고 주변 도로를 건널 때 지정된 동선을 이용하세요.",
    "source": "https://vietnam.travel/place-to-go/red-river-delta/ha-noi/"
  },
  {
    "city": "HAN",
    "name": "하노이 구시가지",
    "wiki": "Old Quarter, Hanoi",
    "category": "문화/역사",
    "nearby": false,
    "area": "하노이 구시가지",
    "desc": "좁은 거리와 상점, 오래된 건물이 이어지는 하노이의 생활 중심지입니다. 거리마다 다른 물건과 먹거리를 살펴보며 한두 골목씩 천천히 탐색하는 방식이 잘 어울려요.",
    "highlights": [
      "상업 골목",
      "옛 건물",
      "거리 먹거리"
    ],
    "tip": "관심 있는 거리와 식당을 몇 곳 골라 보행 동선을 짧게 연결해보세요.",
    "source": "https://vietnam.travel/place-to-go/red-river-delta/ha-noi/"
  },
  {
    "city": "HAN",
    "name": "문묘",
    "wiki": "Temple of Literature, Hanoi",
    "category": "문화/역사",
    "nearby": false,
    "area": "하노이 동다",
    "desc": "학문과 유교 전통을 기리는 건축과 정원을 둘러보는 역사 공간입니다. 마당과 문, 전각이 순서대로 이어지는 구조를 살펴보며 도시의 교육 문화를 이해할 수 있어요.",
    "highlights": [
      "유교 건축",
      "정원과 마당",
      "교육 역사"
    ],
    "tip": "비석과 건축물을 만지지 말고 공식 설명을 읽으며 공간의 의미를 살펴보세요.",
    "source": "https://vietnam.travel/place-to-go/red-river-delta/ha-noi/"
  },
  {
    "city": "HAN",
    "name": "탕롱 황성",
    "wiki": "Imperial Citadel of Thăng Long",
    "category": "문화/역사",
    "nearby": false,
    "area": "하노이 바딘",
    "desc": "오랜 수도의 역사가 쌓인 유적과 건축을 만날 수 있는 황성입니다. 남아 있는 시설과 발굴 흔적을 함께 보며 하노이의 도시 형성 과정을 살펴보는 코스로 좋아요.",
    "highlights": [
      "황성 유적",
      "도시 역사",
      "발굴 흔적"
    ],
    "tip": "공개 관람 구역과 전시 동선을 확인하고 유적 보존 안내를 따르세요.",
    "source": "https://vietnam.travel/place-to-go/red-river-delta/ha-noi/"
  },
  {
    "city": "HAN",
    "name": "서호",
    "wiki": "West Lake, Hanoi",
    "category": "휴식",
    "nearby": false,
    "area": "하노이 서호",
    "desc": "도심 북쪽의 큰 호수와 주변 생활 공간을 둘러보는 지역입니다. 호숫가의 사원과 카페를 선택해 연결하면 구시가지보다 넓고 느긋한 하노이의 풍경을 만날 수 있어요.",
    "highlights": [
      "호숫가 풍경",
      "주변 사원",
      "카페 휴식"
    ],
    "tip": "호수 전체를 한 번에 돌기보다 방문할 지점 몇 곳을 정해 이동하세요.",
    "source": "https://vietnam.travel/place-to-go/red-river-delta/ha-noi/"
  },
  {
    "city": "HAN",
    "name": "베트남 민족학 박물관",
    "wiki": "Vietnam Museum of Ethnology",
    "category": "문화/역사",
    "nearby": false,
    "area": "하노이 꺼우저이",
    "desc": "베트남 여러 민족의 생활 문화와 건축을 살펴보는 박물관입니다. 실내 전시와 야외 공간을 연결해 보면 의복과 도구, 주거 방식의 차이를 구체적으로 비교할 수 있어요.",
    "highlights": [
      "생활 문화 전시",
      "전통 주거",
      "민족 문화"
    ],
    "tip": "실내·야외 전시의 개방 여부를 확인하고 여유 있게 관람할 구역을 정하세요.",
    "source": "https://vietnam.travel/place-to-go/red-river-delta/ha-noi/"
  },
  {
    "city": "HAN",
    "name": "닌빈 짱안",
    "wiki": "Tràng An",
    "category": "자연",
    "nearby": true,
    "area": "하노이 근교 · 닌빈",
    "desc": "석회암 산과 물길, 동굴이 어우러진 닌빈의 경관 지역입니다. 하노이의 도심 여행과 분리해 배를 타고 보는 자연 풍경을 중심으로 하루 동선을 계획해보세요.",
    "highlights": [
      "석회암 풍경",
      "물길 탐방",
      "동굴 경관"
    ],
    "tip": "공식 보트 노선과 운항 조건을 확인하고 귀환 교통편을 함께 계획하세요.",
    "source": "https://vietnam.travel/place-to-go/red-river-delta/ha-noi/"
  },
  {
    "city": "HAN",
    "name": "하롱베이",
    "wiki": "Hạ Long Bay",
    "category": "자연",
    "nearby": true,
    "area": "하노이 주변 · 꽝닌",
    "desc": "바다 위의 수많은 석회암 섬으로 알려진 북부 베트남의 경관 지역입니다. 하노이에서의 이동과 선박 관람을 별도 일정으로 나누면 풍경을 보다 여유 있게 즐길 수 있어요.",
    "highlights": [
      "석회암 섬",
      "해상 경관",
      "만의 전망"
    ],
    "tip": "승선 항구와 운항 여부를 확인하고 방문할 수 있는 구역을 공식 안내에서 살펴보세요.",
    "source": "https://vietnam.travel/place-to-go/red-river-delta/ha-noi/"
  },
  {
    "city": "SGN",
    "name": "벤탄 시장",
    "wiki": "Bến Thành Market",
    "category": "쇼핑",
    "nearby": false,
    "area": "호찌민 1군",
    "desc": "식품과 의류, 생활 소품을 파는 상점이 모여 있는 도심 시장입니다. 시장의 건축과 통로를 살펴보고 주변 거리의 식당과 함께 연결해 호찌민의 상업 문화를 경험해보세요.",
    "highlights": [
      "전통 시장",
      "생활 소품",
      "지역 먹거리"
    ],
    "tip": "구매 전에 품목과 가격을 확인하고 시장 안팎의 이동 경로를 정해두세요.",
    "source": "https://vietnam.travel/place-to-go/southeastern-vietnam/ho-chi-minh-city/"
  },
  {
    "city": "SGN",
    "name": "전쟁증적박물관",
    "wiki": "War Remnants Museum",
    "category": "문화/역사",
    "nearby": false,
    "area": "호찌민 3군",
    "desc": "전쟁과 그 영향을 다양한 자료와 사진으로 살펴보는 박물관입니다. 호찌민의 역사적인 건물 방문과 함께 전쟁 이후의 사회를 이해하는 문화 일정으로 연결할 수 있어요.",
    "highlights": [
      "역사 자료",
      "사진 전시",
      "전쟁의 영향"
    ],
    "tip": "전시 내용 중 무거운 장면이 있을 수 있으므로 동행자의 관람 범위를 함께 정하세요.",
    "source": "https://vietnam.travel/place-to-go/southeastern-vietnam/ho-chi-minh-city/"
  },
  {
    "city": "SGN",
    "name": "통일궁",
    "wiki": "Independence Palace",
    "category": "문화/역사",
    "nearby": false,
    "area": "호찌민 1군",
    "desc": "현대 베트남의 역사를 상징하는 건축과 내부 공간을 둘러보는 장소입니다. 외관뿐 아니라 당시의 업무·접견 공간을 살펴보면 도시의 역사적 전환을 이해하는 데 도움이 돼요.",
    "highlights": [
      "현대사 건축",
      "접견 공간",
      "정원 풍경"
    ],
    "tip": "관람 가능한 내부 공간과 해설 제공 여부를 공식 안내에서 확인하세요.",
    "source": "https://vietnam.travel/place-to-go/southeastern-vietnam/ho-chi-minh-city/"
  },
  {
    "city": "SGN",
    "name": "사이공 중앙우체국",
    "wiki": "Saigon Central Post Office",
    "category": "문화/역사",
    "nearby": false,
    "area": "호찌민 1군",
    "desc": "아치형 내부와 역사적인 외관을 통해 도심 건축의 분위기를 만나는 우체국입니다. 주변의 오래된 건물과 보행 거리를 묶어 짧은 문화 산책 코스를 만들어보세요.",
    "highlights": [
      "역사 건축",
      "아치형 실내",
      "도심 산책"
    ],
    "tip": "실제 업무가 이루어지는 공간임을 고려해 통행과 촬영 안내를 지켜주세요.",
    "source": "https://vietnam.travel/place-to-go/southeastern-vietnam/ho-chi-minh-city/"
  },
  {
    "city": "SGN",
    "name": "응우옌후에 거리",
    "wiki": "Nguyễn Huệ Boulevard",
    "category": "휴식",
    "nearby": false,
    "area": "호찌민 1군",
    "desc": "보행 공간과 주변 건물, 광장이 어우러지는 도심 거리입니다. 낮의 도시 풍경과 저녁의 분위기를 비교하며 카페와 강변으로 이어지는 산책을 계획하기 좋아요.",
    "highlights": [
      "보행 거리",
      "도시 광장",
      "주변 카페"
    ],
    "tip": "행사나 교통 통제 여부에 따라 접근 경로가 달라질 수 있으니 방문 전 확인하세요.",
    "source": "https://vietnam.travel/place-to-go/southeastern-vietnam/ho-chi-minh-city/"
  },
  {
    "city": "SGN",
    "name": "사이공 오페라하우스",
    "wiki": "Municipal Theatre, Ho Chi Minh City",
    "category": "문화/역사",
    "nearby": false,
    "area": "호찌민 1군",
    "desc": "장식적인 외관과 광장으로 도심의 역사적인 분위기를 보여주는 공연장입니다. 건물 외관을 감상하는 산책과 실제 공연 관람을 구분해 여행 일정에 넣어보세요.",
    "highlights": [
      "공연장 건축",
      "도심 광장",
      "역사 거리"
    ],
    "tip": "공연과 내부 관람 가능 여부는 공식 프로그램에서 별도로 확인하세요.",
    "source": "https://vietnam.travel/place-to-go/southeastern-vietnam/ho-chi-minh-city/"
  },
  {
    "city": "SGN",
    "name": "꾸찌 터널",
    "wiki": "Củ Chi tunnels",
    "category": "문화/역사",
    "nearby": true,
    "area": "호찌민 외곽 · 꾸찌",
    "desc": "전쟁 당시의 지하 통로와 관련 시설을 통해 역사를 살펴보는 지역입니다. 도심 박물관에서 본 자료와 연결해 당시의 생활과 전쟁 환경을 구체적으로 이해할 수 있어요.",
    "highlights": [
      "지하 통로",
      "역사 해설",
      "전쟁 관련 시설"
    ],
    "tip": "공개 구역의 안내를 따르고 좁은 통로 체험 여부는 현장에서 신중히 선택하세요.",
    "source": "https://vietnam.travel/place-to-go/southeastern-vietnam/ho-chi-minh-city/"
  },
  {
    "city": "SGN",
    "name": "미토",
    "wiki": "Mỹ Tho",
    "category": "문화/역사",
    "nearby": true,
    "area": "호찌민 주변 · 메콩델타",
    "desc": "강과 운하를 중심으로 이어지는 메콩델타의 도시와 생활 풍경을 만나는 곳입니다. 호찌민의 도심과 대비되는 수변 마을과 정원을 둘러보는 주변 여행지로 계획해보세요.",
    "highlights": [
      "강변 생활",
      "메콩델타",
      "수변 풍경"
    ],
    "tip": "배 이동이 포함되는지와 실제 방문 지역을 확인하고 왕복 교통편을 함께 정하세요.",
    "source": "https://vietnam.travel/place-to-go/southeastern-vietnam/ho-chi-minh-city/"
  },
  {
    "city": "CEB",
    "name": "산토니뇨 성당",
    "wiki": "Basilica del Santo Niño",
    "category": "문화/역사",
    "nearby": false,
    "area": "세부 구도심",
    "desc": "세부의 가톨릭 신앙과 역사적인 건축을 함께 살펴보는 성당입니다. 주변의 마젤란의 십자가와 광장을 연결하면 구도심의 종교·역사 공간을 걸어서 탐색하기 좋아요.",
    "highlights": [
      "성당 건축",
      "종교 문화",
      "구도심 산책"
    ],
    "tip": "예배 일정과 관람 구역을 확인하고 복장·촬영 안내를 지켜주세요.",
    "source": "https://tourism.cebu.gov.ph/"
  },
  {
    "city": "CEB",
    "name": "마젤란의 십자가",
    "wiki": "Magellan's Cross Pavilion",
    "category": "문화/역사",
    "nearby": false,
    "area": "세부 구도심",
    "desc": "십자가를 보호하는 정자와 천장 그림이 남아 있는 세부의 역사 명소입니다. 성당과 광장 가까이에서 도시의 종교적 유산을 살펴보는 짧은 도보 코스로 연결할 수 있어요.",
    "highlights": [
      "십자가 정자",
      "천장 그림",
      "역사 광장"
    ],
    "tip": "상징물에 손대지 말고 주변 설명과 보존 안내를 함께 읽어보세요.",
    "source": "https://visitcentralvisayas.ph/destinations/magellans-cross/"
  },
  {
    "city": "CEB",
    "name": "산 페드로 요새",
    "wiki": "Fort San Pedro",
    "category": "문화/역사",
    "nearby": false,
    "area": "세부 구도심",
    "desc": "돌로 된 성벽과 내부 마당을 통해 세부의 항구 도시 역사를 살펴보는 요새입니다. 가까운 구도심 유적과 함께 관람하면 식민 시기의 방어 시설과 도시 구조를 비교할 수 있어요.",
    "highlights": [
      "석조 성벽",
      "요새 마당",
      "항구 도시 역사"
    ],
    "tip": "계단과 성벽의 관람 가능 구간을 확인하고 지정된 동선을 이용하세요.",
    "source": "https://tourism.cebu.gov.ph/"
  },
  {
    "city": "CEB",
    "name": "세부 도교 사원",
    "wiki": "Cebu Taoist Temple",
    "category": "문화/역사",
    "nearby": false,
    "area": "세부 시내 · 비벌리힐스",
    "desc": "중국계 공동체의 종교 문화와 장식적인 사원 건축을 만나는 장소입니다. 시내 중심과 다른 높은 지형에서 사원 주변의 분위기와 도시 풍경을 함께 살펴볼 수 있어요.",
    "highlights": [
      "도교 문화",
      "사원 장식",
      "도시 조망"
    ],
    "tip": "종교 의례 공간의 촬영 제한과 복장 안내를 확인하고 조용히 관람하세요.",
    "source": "https://tourism.cebu.gov.ph/"
  },
  {
    "city": "CEB",
    "name": "카사 고로르도 박물관",
    "wiki": "Casa Gorordo Museum",
    "category": "문화/역사",
    "nearby": false,
    "area": "세부 구도심 · 파리안",
    "desc": "옛 주택의 구조와 생활용품을 통해 세부의 주거 문화를 살펴보는 박물관입니다. 외관과 실내의 차이를 비교하며 구도심에 남은 상업·가족 생활의 흔적을 찾아보세요.",
    "highlights": [
      "역사 주택",
      "생활용품",
      "주거 문화"
    ],
    "tip": "가이드 동행 여부와 실내 촬영 규정을 공식 박물관 안내에서 확인하세요.",
    "source": "https://www.casagorordomuseum.org/"
  },
  {
    "city": "CEB",
    "name": "막탄섬",
    "wiki": "Mactan",
    "category": "휴식",
    "nearby": true,
    "area": "세부 주변 · 막탄섬",
    "desc": "공항과 해안 휴양 지역이 함께 자리한 세부 주변의 섬입니다. 세부시의 역사 탐방과 다른 해안 풍경을 즐기고 싶다면 실제 이용 가능한 해변과 시설을 골라 계획해보세요.",
    "highlights": [
      "섬 해안",
      "휴양 풍경",
      "주변 섬 탐색"
    ],
    "tip": "해변과 시설마다 접근 조건이 다르므로 방문할 구역을 먼저 확인하세요.",
    "source": "https://tourism.cebu.gov.ph/"
  },
  {
    "city": "CEB",
    "name": "모알보알",
    "wiki": "Moalboal",
    "category": "자연",
    "nearby": true,
    "area": "세부섬 남서부",
    "desc": "세부섬 남서쪽 해안에서 바다와 해양 생물을 만나는 지역입니다. 세부시에서 이동하는 거리를 고려해 도심 방문과 분리된 해안 중심 일정으로 계획하기 좋아요.",
    "highlights": [
      "해안 풍경",
      "해양 생물",
      "주변 마을"
    ],
    "tip": "해양 활동의 현장 규정과 운영 조건을 확인하고 생물과 산호에 손대지 마세요.",
    "source": "https://tourism.cebu.gov.ph/"
  },
  {
    "city": "CEB",
    "name": "가와산 폭포",
    "wiki": "Kawasan Falls",
    "category": "자연",
    "nearby": true,
    "area": "세부섬 남부 · 바디안",
    "desc": "숲과 물길 사이의 폭포 풍경을 둘러보는 세부섬 남부의 자연 명소입니다. 단순한 경관 관람과 별도의 수상 체험을 구분해 자신의 일정에 맞는 방문 방식을 정해보세요.",
    "highlights": [
      "폭포 경관",
      "숲속 물길",
      "자연 탐방"
    ],
    "tip": "입장과 활동의 개방 여부를 확인하고 체험은 공인 운영자의 안내를 따르세요.",
    "source": "https://tourism.cebu.gov.ph/"
  },
  {
    "city": "DPS",
    "name": "스미냑 해변",
    "wiki": "Seminyak",
    "category": "휴식",
    "nearby": false,
    "area": "발리 남부 · 스미냑",
    "desc": "해변과 카페, 상점이 가까이 모여 있는 발리 남부의 휴양 지역입니다. 바다를 바라보며 쉬는 시간과 골목의 디자인 상점을 둘러보는 동선을 함께 만들기 좋아요.",
    "highlights": [
      "해변 풍경",
      "카페 휴식",
      "디자인 상점"
    ],
    "tip": "해변 이용 안내를 확인하고 차량 이동과 보행 구간을 나누어 계획하세요.",
    "source": "https://www.indonesia.travel/id/id/destination/bali-nusa-tenggara/bali"
  },
  {
    "city": "DPS",
    "name": "사누르",
    "wiki": "Sanur, Bali",
    "category": "휴식",
    "nearby": false,
    "area": "발리 남동부 · 사누르",
    "desc": "해안 산책로와 마을 분위기를 함께 느낄 수 있는 발리의 해변 지역입니다. 바다 가까이에서 천천히 걷고 식당과 카페를 연결하는 느긋한 휴식 일정에 어울려요.",
    "highlights": [
      "해안 산책로",
      "마을 풍경",
      "카페와 식당"
    ],
    "tip": "방문할 해안 구역과 출발 지점을 정하고 현장 이용 안내를 확인하세요.",
    "source": "https://www.indonesia.travel/id/id/destination/bali-nusa-tenggara/bali"
  },
  {
    "city": "DPS",
    "name": "쿠타 해변",
    "wiki": "Kuta",
    "category": "휴식",
    "nearby": false,
    "area": "발리 남부 · 쿠타",
    "desc": "해변과 상업 거리가 이어지는 발리 남부의 활기찬 지역입니다. 모래사장 산책과 주변 쇼핑 동선을 묶어 해안 휴양과 도시적인 분위기를 함께 경험해보세요.",
    "highlights": [
      "모래사장",
      "해안 상권",
      "주변 쇼핑"
    ],
    "tip": "현장 해변 안내를 따르고 혼잡한 시간에는 만날 장소를 미리 정해두세요.",
    "source": "https://www.indonesia.travel/id/id/destination/bali-nusa-tenggara/bali"
  },
  {
    "city": "DPS",
    "name": "우붓",
    "wiki": "Ubud",
    "category": "문화/역사",
    "nearby": true,
    "area": "발리 내륙 · 우붓",
    "desc": "예술과 전통 문화, 초록빛 주변 풍경이 어우러지는 내륙 지역입니다. 해안 중심의 여행에서 벗어나 미술 공간과 마을 길을 따라 발리의 다른 분위기를 살펴볼 수 있어요.",
    "highlights": [
      "예술 공간",
      "마을 산책",
      "내륙 풍경"
    ],
    "tip": "관심 있는 미술관이나 문화 공간을 골라 넓은 지역의 이동 동선을 줄여보세요.",
    "source": "https://www.indonesia.travel/id/id/destination/bali-nusa-tenggara/bali"
  },
  {
    "city": "DPS",
    "name": "울루와투 사원",
    "wiki": "Uluwatu Temple",
    "category": "문화/역사",
    "nearby": true,
    "area": "발리 남서부 · 울루와투",
    "desc": "바다를 향한 절벽 위에 자리한 사원으로 해안 지형과 종교 문화가 만나는 곳입니다. 지정된 산책 동선을 따라 건축과 바다 풍경을 함께 감상할 수 있어요.",
    "highlights": [
      "절벽 위 사원",
      "바다 전망",
      "종교 문화"
    ],
    "tip": "사원 복장과 관람 동선을 따르고 원숭이에게 소지품이나 음식을 보이지 않도록 주의하세요.",
    "source": "https://www.indonesia.travel/id/id/destination/bali-nusa-tenggara/bali"
  },
  {
    "city": "DPS",
    "name": "타나롯 사원",
    "wiki": "Tanah Lot",
    "category": "문화/역사",
    "nearby": true,
    "area": "발리 서부 · 타바난",
    "desc": "바닷가의 바위와 사원이 어우러져 독특한 실루엣을 만드는 장소입니다. 사원을 둘러싼 해안의 시점을 바꾸며 발리의 종교 공간과 자연 지형을 함께 살펴보세요.",
    "highlights": [
      "해안 사원",
      "바위 지형",
      "바다 풍경"
    ],
    "tip": "조수와 현장 통제에 따라 접근 구역이 달라지므로 지정된 장소에서 관람하세요.",
    "source": "https://www.indonesia.travel/id/id/destination/bali-nusa-tenggara/bali"
  },
  {
    "city": "DPS",
    "name": "자틸루위 계단식 논",
    "wiki": "Jatiluwih",
    "category": "자연",
    "nearby": true,
    "area": "발리 내륙 · 타바난",
    "desc": "구릉을 따라 이어진 논과 농업 경관을 둘러보는 발리의 내륙 지역입니다. 경작지와 마을의 관계를 살펴보며 해변과 다른 섬의 생활 문화를 만날 수 있어요.",
    "highlights": [
      "계단식 논",
      "농업 경관",
      "마을 풍경"
    ],
    "tip": "논은 실제 경작 공간이므로 안내된 길만 걷고 농작물에 들어가지 마세요.",
    "source": "https://www.indonesia.travel/id/id/destination/bali-nusa-tenggara/bali"
  },
  {
    "city": "DPS",
    "name": "울룬 다누 브라탄 사원",
    "wiki": "Ulun Danu Beratan Temple",
    "category": "문화/역사",
    "nearby": true,
    "area": "발리 고지대 · 브두굴",
    "desc": "호수와 사원 건축이 어우러진 발리 고지대의 명소입니다. 물가의 풍경과 정원을 둘러보며 남부 해안과 다른 환경의 발리를 경험하는 일정으로 연결해보세요.",
    "highlights": [
      "호숫가 사원",
      "정원 산책",
      "고지대 풍경"
    ],
    "tip": "기상과 사원 행사에 따라 관람 조건이 달라질 수 있으니 공식 안내를 확인하세요.",
    "source": "https://www.indonesia.travel/id/id/destination/bali-nusa-tenggara/bali"
  },
  {
    "city": "SIN",
    "name": "가든스 바이 더 베이",
    "wiki": "Gardens by the Bay",
    "category": "자연",
    "nearby": false,
    "area": "싱가포르 마리나베이",
    "desc": "큰 정원과 슈퍼트리, 온실을 통해 도시 속 식물 풍경을 만나는 공원입니다. 야외 산책과 별도 관람 시설을 구분해 관심 있는 식물과 공간을 중심으로 둘러보세요.",
    "highlights": [
      "슈퍼트리",
      "식물 정원",
      "온실 전시"
    ],
    "tip": "온실과 공중 보행 시설은 각각의 이용 조건을 공식 홈페이지에서 확인하세요.",
    "source": "https://www.visitsingapore.com/"
  },
  {
    "city": "SIN",
    "name": "멀라이언 공원",
    "wiki": "Merlion Park",
    "category": "휴식",
    "nearby": false,
    "area": "싱가포르 마리나베이",
    "desc": "멀라이언 조각상과 마리나베이의 도시 풍경을 함께 볼 수 있는 물가 공원입니다. 주변 산책로와 다리를 연결하면 다른 각도에서 스카이라인을 감상할 수 있어요.",
    "highlights": [
      "멀라이언 조각",
      "스카이라인",
      "물가 산책"
    ],
    "tip": "촬영 지점에 오래 머무르기보다 주변 보행로의 통행 공간을 비워주세요.",
    "source": "https://www.visitsingapore.com/"
  },
  {
    "city": "SIN",
    "name": "싱가포르 식물원",
    "wiki": "Singapore Botanic Gardens",
    "category": "자연",
    "nearby": false,
    "area": "싱가포르 탕린",
    "desc": "오래된 열대 정원과 호수, 다양한 식물 구역을 둘러보는 녹지 공간입니다. 도심 관광 사이에 나무 그늘을 따라 걷고 관심 있는 정원을 골라 천천히 관찰해보세요.",
    "highlights": [
      "열대 식물",
      "정원과 호수",
      "녹지 산책"
    ],
    "tip": "공원과 개별 정원 시설의 이용 조건을 구분해 확인하세요.",
    "source": "https://www.visitsingapore.com/"
  },
  {
    "city": "SIN",
    "name": "차이나타운",
    "wiki": "Chinatown, Singapore",
    "category": "문화/역사",
    "nearby": false,
    "area": "싱가포르 차이나타운",
    "desc": "사원과 오래된 상점 건물, 음식 문화가 가까이 모여 있는 역사 지역입니다. 여러 종교 공간과 골목의 생활 문화를 함께 살펴보며 도시의 다문화 배경을 느낄 수 있어요.",
    "highlights": [
      "역사 상점 건물",
      "종교 공간",
      "거리 먹거리"
    ],
    "tip": "종교 시설에서는 각 공간의 복장과 촬영 규정을 따르세요.",
    "source": "https://www.visitsingapore.com/"
  },
  {
    "city": "SIN",
    "name": "리틀 인디아",
    "wiki": "Little India, Singapore",
    "category": "문화/역사",
    "nearby": false,
    "area": "싱가포르 리틀 인디아",
    "desc": "꽃과 향신료 상점, 사원과 식당이 이어지는 인도계 문화 지역입니다. 거리의 색과 향을 천천히 살펴보고 시장이나 식당을 골라 지역의 생활 문화를 경험해보세요.",
    "highlights": [
      "향신료 상점",
      "사원 건축",
      "시장 음식"
    ],
    "tip": "사원 의례를 존중하고 식당의 메뉴와 식재료를 확인한 뒤 주문하세요.",
    "source": "https://www.visitsingapore.com/"
  },
  {
    "city": "SIN",
    "name": "캄퐁 글램",
    "wiki": "Kampong Glam",
    "category": "문화/역사",
    "nearby": false,
    "area": "싱가포르 부기스 주변",
    "desc": "술탄 모스크와 전통 상점, 벽화와 카페가 어우러지는 역사 지역입니다. 말레이·무슬림 문화의 흔적과 현대적인 골목 상권을 함께 살펴보는 도보 코스로 좋아요.",
    "highlights": [
      "술탄 모스크",
      "하이 레인",
      "역사 상점 건물"
    ],
    "tip": "모스크의 개방 구역과 예배 시간을 확인하고 주민의 생활 공간을 존중하세요.",
    "source": "https://www.visitsingapore.com/"
  },
  {
    "city": "SIN",
    "name": "센토사",
    "wiki": "Sentosa",
    "category": "액티비티",
    "nearby": true,
    "area": "싱가포르 남부 · 센토사섬",
    "desc": "해변과 테마 시설, 해안 산책 구간이 모인 도심 주변의 섬입니다. 여러 시설을 모두 넣기보다 해변 휴식이나 체험 한 가지를 중심으로 섬 안의 동선을 구성해보세요.",
    "highlights": [
      "섬 해변",
      "체험 시설",
      "해안 산책"
    ],
    "tip": "시설별 예약과 운영 조건을 따로 확인하고 섬 안에서 이동할 방식을 정해두세요.",
    "source": "https://www.visitsingapore.com/neighbourhood/featured-neighbourhood/sentosa-island/"
  },
  {
    "city": "SIN",
    "name": "풀라우 우빈",
    "wiki": "Pulau Ubin",
    "category": "자연",
    "nearby": true,
    "area": "싱가포르 동북부 · 우빈섬",
    "desc": "도심과 다른 마을 풍경과 자연을 만날 수 있는 싱가포르 주변 섬입니다. 배를 타고 들어가 마을 길과 숲을 둘러보며 도시 관광 사이에 다른 속도의 하루를 보내보세요.",
    "highlights": [
      "섬 마을",
      "숲길 풍경",
      "자연 관찰"
    ],
    "tip": "배편과 귀환 방법, 탐방로 개방 정보를 국립공원 공식 안내에서 확인하세요.",
    "source": "https://pulau-ubin.nparks.gov.sg/cultural-heritage/places-of-interest/"
  },
  {
    "city": "KUL",
    "name": "페트로나스 트윈 타워",
    "wiki": "Petronas Towers",
    "category": "문화/역사",
    "nearby": false,
    "area": "쿠알라룸푸르 KLCC",
    "desc": "쌍둥이 고층 건축물이 도심의 스카이라인을 만드는 대표 명소입니다. 주변 공원에서 외관을 감상하는 산책과 내부 전망 시설 이용을 구분해 방문 계획을 세워보세요.",
    "highlights": [
      "쌍둥이 타워",
      "도시 스카이라인",
      "주변 공원"
    ],
    "tip": "전망 시설을 이용하려면 공식 예약과 관람 조건을 먼저 확인하세요.",
    "source": "https://www.malaysia.travel/explore/top-places-to-visit-in-kuala-lumpur"
  },
  {
    "city": "KUL",
    "name": "KLCC 공원",
    "wiki": "KLCC Park",
    "category": "휴식",
    "nearby": false,
    "area": "쿠알라룸푸르 KLCC",
    "desc": "도심 고층 건물과 녹지가 대비되는 공원으로 산책과 휴식을 연결하기 좋습니다. 호수와 보행로를 따라 시점을 바꾸며 트윈 타워의 모습을 감상해보세요.",
    "highlights": [
      "도심 녹지",
      "호수 풍경",
      "타워 전망"
    ],
    "tip": "공원 내 시설별 이용 안내를 확인하고 보행자 동선을 따라 이동하세요.",
    "source": "https://www.malaysia.travel/explore/top-places-to-visit-in-kuala-lumpur"
  },
  {
    "city": "KUL",
    "name": "메르데카 광장",
    "wiki": "Merdeka Square, Kuala Lumpur",
    "category": "문화/역사",
    "nearby": false,
    "area": "쿠알라룸푸르 구도심",
    "desc": "광장과 주변 역사 건물이 도시의 근현대사를 보여주는 장소입니다. 건물의 외관과 도로 구조를 살펴보며 인근 시장과 강변을 이어 걷는 문화 산책으로 연결해보세요.",
    "highlights": [
      "역사 광장",
      "주변 건축",
      "구도심 산책"
    ],
    "tip": "행사와 교통 통제로 접근 구간이 달라질 수 있으니 현장 안내를 확인하세요.",
    "source": "https://www.malaysia.travel/explore/top-places-to-visit-in-kuala-lumpur"
  },
  {
    "city": "KUL",
    "name": "센트럴 마켓",
    "wiki": "Central Market, Kuala Lumpur",
    "category": "쇼핑",
    "nearby": false,
    "area": "쿠알라룸푸르 구도심",
    "desc": "공예품과 기념품, 디자인 소품을 둘러볼 수 있는 역사적인 시장 건물입니다. 주변 차이나타운과 함께 걸으며 여러 문화가 섞인 도시의 상업 풍경을 살펴보세요.",
    "highlights": [
      "공예품",
      "역사 시장 건물",
      "기념품 쇼핑"
    ],
    "tip": "제품의 재료와 가격을 확인하고 상점별로 비교한 뒤 구매하세요.",
    "source": "https://www.malaysia.travel/explore/top-places-to-visit-in-kuala-lumpur"
  },
  {
    "city": "KUL",
    "name": "이슬람 예술 박물관",
    "wiki": "Islamic Arts Museum Malaysia",
    "category": "문화/역사",
    "nearby": false,
    "area": "쿠알라룸푸르 정원 권역",
    "desc": "다양한 지역의 이슬람 예술과 장식 문화를 전시하는 박물관입니다. 건축 모형과 공예품의 형태를 비교하며 종교 문화가 여러 지역에서 어떻게 표현됐는지 살펴볼 수 있어요.",
    "highlights": [
      "이슬람 예술",
      "건축 모형",
      "장식 공예"
    ],
    "tip": "공식 전시 안내에서 관심 분야를 골라 전시실 동선을 계획하세요.",
    "source": "https://www.malaysia.travel/explore/top-places-to-visit-in-kuala-lumpur"
  },
  {
    "city": "KUL",
    "name": "천후궁",
    "wiki": "Thean Hou Temple",
    "category": "문화/역사",
    "nearby": false,
    "area": "쿠알라룸푸르 로브슨힐",
    "desc": "중국계 공동체의 신앙과 건축 장식을 살펴볼 수 있는 사원입니다. 층층이 이어지는 공간과 지붕 장식, 주변 도시 풍경을 천천히 관찰해보세요.",
    "highlights": [
      "중국계 종교 문화",
      "지붕 장식",
      "도시 풍경"
    ],
    "tip": "의례 공간의 촬영과 복장 안내를 확인하고 신도들의 통행을 방해하지 마세요.",
    "source": "https://www.malaysia.travel/explore/top-places-to-visit-in-kuala-lumpur"
  },
  {
    "city": "KUL",
    "name": "바투 동굴",
    "wiki": "Batu Caves",
    "category": "문화/역사",
    "nearby": true,
    "area": "쿠알라룸푸르 근교 · 곰박",
    "desc": "석회암 동굴과 힌두교 사원이 함께 자리한 주변 지역의 명소입니다. 계단과 동굴의 공간 구조를 살펴보며 자연 지형과 종교 문화가 만나는 풍경을 경험할 수 있어요.",
    "highlights": [
      "석회암 동굴",
      "힌두교 사원",
      "계단 경관"
    ],
    "tip": "많은 계단을 고려해 방문 범위를 정하고 종교 시설의 복장 규정을 확인하세요.",
    "source": "https://www.malaysia.travel/explore/top-places-to-visit-in-kuala-lumpur"
  },
  {
    "city": "KUL",
    "name": "푸트라자야",
    "wiki": "Putrajaya",
    "category": "문화/역사",
    "nearby": true,
    "area": "쿠알라룸푸르 근교 · 푸트라자야",
    "desc": "호수와 교량, 행정 건축이 계획적으로 배치된 도시입니다. 쿠알라룸푸르의 밀집된 도심과 다른 넓은 경관을 보며 물가와 건축 중심의 주변 여행을 계획해보세요.",
    "highlights": [
      "호수와 교량",
      "계획도시 건축",
      "물가 산책"
    ],
    "tip": "도시 안에서도 지점 간 거리가 있으므로 방문 장소와 이동수단을 함께 정하세요.",
    "source": "https://www.malaysia.travel/explore/top-places-to-visit-in-kuala-lumpur"
  },
  {
    "city": "HKG",
    "name": "빅토리아 피크",
    "wiki": "Victoria Peak",
    "category": "자연",
    "nearby": false,
    "area": "홍콩섬 피크",
    "desc": "홍콩섬의 높은 지대에서 빅토리아 하버와 도시의 고층 건물을 함께 바라보는 전망 명소예요. 전망대 방문뿐 아니라 주변 산책로를 따라 걸으며 각기 다른 방향의 풍경을 찾아볼 수 있어요.",
    "highlights": [
      "하버 파노라마",
      "피크 산책로",
      "도시 스카이라인"
    ],
    "tip": "전망대와 주변 산책로는 이용 조건이 다를 수 있으니 나누어 확인하세요.",
    "source": "https://www.discoverhongkong.com/eng/explore/attractions.html"
  },
  {
    "city": "HKG",
    "name": "침사추이 해변 산책로",
    "wiki": "Tsim Sha Tsui Promenade",
    "category": "휴식",
    "nearby": false,
    "area": "주룽 침사추이",
    "desc": "빅토리아 하버를 마주한 산책로에서 홍콩섬의 스카이라인을 감상할 수 있어요. 스타의 거리와 문화시설이 이어져 있어 물가 산책과 주변 탐방을 함께 계획하기 좋아요.",
    "highlights": [
      "빅토리아 하버",
      "스타의 거리",
      "워터프런트 산책"
    ],
    "tip": "낮과 저녁의 분위기가 달라 방문 시간을 여행 동선에 맞춰 골라보세요.",
    "source": "https://www.discoverhongkong.com/eng/explore/attractions.html"
  },
  {
    "city": "HKG",
    "name": "만모 사원",
    "wiki": "Man Mo Temple",
    "category": "문화/역사",
    "nearby": false,
    "area": "홍콩섬 셩완",
    "desc": "셩완의 거리 사이에 자리한 사원으로, 문무의 신을 모시는 공간과 전통 건축을 살펴볼 수 있어요. 주변의 오래된 상점과 골목을 함께 걸으면 현대적인 도심과 다른 홍콩의 표정을 만나요.",
    "highlights": [
      "전통 사원 건축",
      "셩완 골목",
      "지역 문화"
    ],
    "tip": "예배 공간이므로 내부 사진 촬영과 관람 예절 안내를 먼저 확인하세요.",
    "source": "https://www.discoverhongkong.com/eng/explore/attractions.html"
  },
  {
    "city": "HKG",
    "name": "홍콩 공원",
    "wiki": "Hong Kong Park",
    "category": "자연",
    "nearby": false,
    "area": "홍콩섬 애드미럴티",
    "desc": "도심의 빌딩 사이에서 녹지와 물길을 따라 쉬어갈 수 있는 공원이에요. 조류 관찰 공간과 정원 등 성격이 다른 구역이 모여 있어 잠시 산책하거나 가족과 둘러보기 좋아요.",
    "highlights": [
      "도심 정원",
      "조류 관찰 공간",
      "녹지 산책"
    ],
    "tip": "공원 내부의 개별 시설은 출입 규정이 다르므로 방문할 구역의 안내를 확인하세요.",
    "source": "https://www.discoverhongkong.com/eng/explore/attractions.html"
  },
  {
    "city": "HKG",
    "name": "템플 스트리트",
    "wiki": "Temple Street, Hong Kong",
    "category": "음식",
    "nearby": false,
    "area": "주룽 야우마테이",
    "desc": "노점과 식당이 모인 거리에서 홍콩의 생활 분위기를 느껴볼 수 있어요. 시장 골목과 주변 음식점을 둘러보며 도심 관광과 다른 저녁 시간을 만들어보세요.",
    "highlights": [
      "거리 음식",
      "시장 골목",
      "저녁 거리 풍경"
    ],
    "tip": "상점마다 운영 시간이 달라 방문할 가게의 영업 여부를 따로 확인하세요.",
    "source": "https://www.discoverhongkong.com/eng/explore/attractions.html"
  },
  {
    "city": "HKG",
    "name": "홍콩 역사박물관",
    "wiki": "Hong Kong Museum of History",
    "category": "문화/역사",
    "nearby": false,
    "area": "주룽 침사추이",
    "desc": "홍콩의 역사와 생활문화를 전시를 통해 이해할 수 있는 박물관이에요. 하버와 시장을 둘러보기 전후에 방문하면 거리에서 본 풍경의 배경을 더 깊이 살펴볼 수 있어요.",
    "highlights": [
      "지역 역사",
      "생활문화 전시",
      "실내 관람"
    ],
    "tip": "전시 교체나 시설 정비에 따라 관람 범위가 달라질 수 있어 공식 안내를 확인하세요.",
    "source": "https://www.discoverhongkong.com/eng/explore/attractions.html"
  },
  {
    "city": "HKG",
    "name": "란타우섬 옹핑",
    "wiki": "Ngong Ping",
    "category": "문화/역사",
    "nearby": true,
    "area": "홍콩 외곽 란타우섬",
    "desc": "란타우섬의 산지에 있는 옹핑은 톈탄 대불과 포린 사원으로 알려진 지역이에요. 케이블카와 산 주변 풍경을 함께 즐기며 도심의 빌딩 숲에서 벗어나는 하루를 계획할 수 있어요.",
    "highlights": [
      "톈탄 대불",
      "포린 사원",
      "란타우 산지 풍경"
    ],
    "tip": "기상이나 정비에 따른 케이블카 운행 여부를 방문 전에 확인하세요.",
    "source": "https://www.discoverhongkong.com/eng/explore/attractions.html"
  },
  {
    "city": "HKG",
    "name": "타이오 어촌",
    "wiki": "Tai O",
    "category": "문화/역사",
    "nearby": true,
    "area": "홍콩 외곽 란타우섬",
    "desc": "수로를 따라 수상가옥이 이어지는 란타우섬의 어촌이에요. 시장과 골목을 천천히 둘러보며 홍콩 도심과 다른 해안 마을의 생활 풍경을 만나볼 수 있어요.",
    "highlights": [
      "수상가옥",
      "어촌 골목",
      "해산물 시장"
    ],
    "tip": "주거 지역을 지날 때 주민의 생활 공간과 촬영 사생활을 존중해주세요.",
    "source": "https://www.discoverhongkong.com/eng/explore/attractions.html"
  },
  {
    "city": "MFM",
    "name": "세나도 광장",
    "wiki": "Senado Square",
    "category": "문화/역사",
    "nearby": false,
    "area": "마카오 반도 구시가지",
    "desc": "물결무늬 포장과 유럽풍 건물이 둘러싼 마카오 구시가지의 대표 광장이에요. 인근 골목과 역사 건축물이 연결돼 있어 도보 여행의 출발점으로 삼기 좋아요.",
    "highlights": [
      "물결무늬 포장",
      "역사 건축",
      "구시가지 산책"
    ],
    "tip": "광장 주변의 여러 골목을 도보 동선으로 묶으면 되돌아가는 이동을 줄일 수 있어요.",
    "source": "https://www.macaotourism.gov.mo/en/sightseeing"
  },
  {
    "city": "MFM",
    "name": "성 바울 성당 유적",
    "wiki": "Ruins of Saint Paul's",
    "category": "문화/역사",
    "nearby": false,
    "area": "마카오 반도 구시가지",
    "desc": "계단 위에 남은 석조 정면은 마카오를 상징하는 역사 유적이에요. 장식의 세부를 살펴보고 주변 골목과 요새 방향을 함께 둘러보며 도시의 역사를 따라가보세요.",
    "highlights": [
      "석조 파사드",
      "계단 전망",
      "역사 유산"
    ],
    "tip": "계단과 주변 골목이 붐빌 수 있으니 이동 여유를 두고 방문하세요.",
    "source": "https://www.macaotourism.gov.mo/en/sightseeing"
  },
  {
    "city": "MFM",
    "name": "몬테 요새",
    "wiki": "Fortaleza do Monte",
    "category": "문화/역사",
    "nearby": false,
    "area": "마카오 반도 몬테 언덕",
    "desc": "언덕 위의 옛 방어시설에서 성벽과 포대를 살펴볼 수 있어요. 요새를 따라 걷다 보면 구시가지와 주변 도시 풍경을 내려다보는 전망도 만날 수 있어요.",
    "highlights": [
      "성벽과 포대",
      "구시가지 전망",
      "언덕 산책"
    ],
    "tip": "오르막과 계단이 있어 구시가지 산책에 체력을 배분해두면 좋아요.",
    "source": "https://www.macaotourism.gov.mo/en/sightseeing"
  },
  {
    "city": "MFM",
    "name": "아마 사원",
    "wiki": "A-Ma Temple",
    "category": "문화/역사",
    "nearby": false,
    "area": "마카오 반도 바라",
    "desc": "바닷길과 지역 신앙의 역사를 보여주는 사원이에요. 경사진 지형을 따라 여러 전각이 자리해, 건축과 바위·나무가 어우러진 공간을 차례로 둘러볼 수 있어요.",
    "highlights": [
      "전통 전각",
      "지역 신앙",
      "바라 지역 산책"
    ],
    "tip": "의례가 진행되는 공간에서는 관람 동선과 촬영 안내를 따르세요.",
    "source": "https://www.macaotourism.gov.mo/en/sightseeing"
  },
  {
    "city": "MFM",
    "name": "기아 요새와 등대",
    "wiki": "Guia Fortress",
    "category": "문화/역사",
    "nearby": false,
    "area": "마카오 반도 기아 언덕",
    "desc": "마카오의 언덕 위에 요새와 예배당, 등대가 함께 남아 있는 역사 공간이에요. 도심에서 잠시 벗어나 숲길과 성벽 주변을 걸으며 다른 높이의 도시 풍경을 볼 수 있어요.",
    "highlights": [
      "기아 등대",
      "요새 건축",
      "언덕 전망"
    ],
    "tip": "등대와 주변 부속 공간의 실제 개방 범위는 공식 안내를 확인하세요.",
    "source": "https://www.macaotourism.gov.mo/en/sightseeing"
  },
  {
    "city": "MFM",
    "name": "타이파 주택박물관",
    "wiki": "Taipa Houses–Museum",
    "category": "문화/역사",
    "nearby": false,
    "area": "타이파",
    "desc": "파스텔빛 주택들이 늘어선 공간에서 타이파의 생활문화와 건축을 살펴볼 수 있어요. 주변 산책 구역과 마을 골목을 함께 둘러보면 박물관 관람과 거리 탐방을 자연스럽게 연결할 수 있어요.",
    "highlights": [
      "파스텔 주택",
      "생활문화",
      "타이파 산책"
    ],
    "tip": "각 주택의 전시·개방 상태가 다를 수 있으니 보고 싶은 공간을 확인하세요.",
    "source": "https://www.macaotourism.gov.mo/en/sightseeing"
  },
  {
    "city": "MFM",
    "name": "콜로안 마을",
    "wiki": "Coloane",
    "category": "휴식",
    "nearby": true,
    "area": "마카오 외곽 콜로안",
    "desc": "낮은 건물과 골목, 해안 산책 구역이 이어지는 마을이에요. 마카오 반도의 번잡한 거리와 다른 속도로 주변 풍경을 둘러보고 카페나 식당에서 쉬어갈 수 있어요.",
    "highlights": [
      "마을 골목",
      "해안 산책",
      "지역 카페"
    ],
    "tip": "마을 주민이 생활하는 골목에서는 소음을 줄이고 출입 표지를 확인하세요.",
    "source": "https://www.macaotourism.gov.mo/en/sightseeing"
  },
  {
    "city": "MFM",
    "name": "학사 해변",
    "wiki": "Hac Sa Beach",
    "category": "자연",
    "nearby": true,
    "area": "마카오 외곽 콜로안 남부",
    "desc": "콜로안 남부의 해변으로 해안 풍경과 넓은 바닷가를 둘러볼 수 있어요. 마을 탐방에 해변 산책을 더하고 싶은 여행자에게 어울리는 외곽 후보예요.",
    "highlights": [
      "해변 산책",
      "콜로안 해안",
      "바다 풍경"
    ],
    "tip": "수영이나 해안 활동을 계획한다면 당일 기상과 현장 안전 안내를 확인하세요.",
    "source": "https://www.macaotourism.gov.mo/en/sightseeing"
  },
  {
    "city": "SHA",
    "name": "와이탄",
    "wiki": "The Bund",
    "category": "문화/역사",
    "nearby": false,
    "area": "상하이 황푸강 서안",
    "desc": "황푸강을 따라 역사적인 건물들이 늘어선 상하이의 대표 강변이에요. 맞은편 푸둥의 고층 건물과 함께 바라보면 도시의 서로 다른 시대가 한 풍경 안에 들어와요.",
    "highlights": [
      "역사 건축",
      "황푸강 산책",
      "푸둥 스카이라인"
    ],
    "tip": "강 양쪽의 명소를 함께 볼 계획이라면 강을 건너는 동선을 먼저 정해보세요.",
    "source": "https://www.meet-in-shanghai.net/en/"
  },
  {
    "city": "SHA",
    "name": "예원",
    "wiki": "Yu Garden",
    "category": "문화/역사",
    "nearby": false,
    "area": "상하이 구시가지",
    "desc": "연못과 누각, 인공산이 어우러진 중국식 정원이에요. 정원의 작은 공간들을 차례로 둘러본 뒤 주변 구시가지의 상점과 골목으로 산책을 이어갈 수 있어요.",
    "highlights": [
      "전통 정원",
      "누각과 연못",
      "구시가지 연결"
    ],
    "tip": "정원과 주변 상업 구역은 이용 조건이 다를 수 있어 구분해 확인하세요.",
    "source": "https://www.meet-in-shanghai.net/en/"
  },
  {
    "city": "SHA",
    "name": "상하이 타워",
    "wiki": "Shanghai Tower",
    "category": "문화/역사",
    "nearby": false,
    "area": "상하이 루자쭈이",
    "desc": "루자쭈이의 고층 건물들 사이에 솟은 초고층 건축물이에요. 건물 외관을 감상하거나 전망 공간을 방문해 황푸강과 도시의 넓은 구성을 살펴볼 수 있어요.",
    "highlights": [
      "초고층 건축",
      "도시 전망",
      "루자쭈이 풍경"
    ],
    "tip": "전망 공간의 예약·운영 여부와 당일 시야 조건을 확인하고 계획하세요.",
    "source": "https://www.meet-in-shanghai.net/en/"
  },
  {
    "city": "SHA",
    "name": "난징루 보행가",
    "wiki": "Nanjing Road",
    "category": "쇼핑",
    "nearby": false,
    "area": "상하이 도심",
    "desc": "상점과 백화점이 이어지는 상하이의 대표적인 쇼핑 거리예요. 보행 구역을 따라 걷고 와이탄 방향의 산책과 연결하면 도시의 활기와 강변 풍경을 함께 즐길 수 있어요.",
    "highlights": [
      "상점가 산책",
      "도시 거리",
      "와이탄 연결"
    ],
    "tip": "난징루는 긴 거리이므로 목적 매장과 보행 구역의 위치를 구분하세요.",
    "source": "https://www.meet-in-shanghai.net/en/"
  },
  {
    "city": "SHA",
    "name": "톈쯔팡",
    "wiki": "Tianzifang",
    "category": "쇼핑",
    "nearby": false,
    "area": "상하이 황푸구",
    "desc": "골목과 오래된 주택을 바탕으로 작은 상점과 카페가 모여 있는 지역이에요. 큰길의 도시 풍경과 다른 규모의 공간에서 공예품과 개성 있는 가게를 둘러볼 수 있어요.",
    "highlights": [
      "골목 상점",
      "카페",
      "오래된 주택 풍경"
    ],
    "tip": "좁은 골목과 생활 공간이 섞여 있으니 안내 표지와 주민의 동선을 존중하세요.",
    "source": "https://www.meet-in-shanghai.net/en/"
  },
  {
    "city": "SHA",
    "name": "상하이 박물관",
    "wiki": "Shanghai Museum",
    "category": "문화/역사",
    "nearby": false,
    "area": "상하이 인민광장 일대",
    "desc": "중국의 미술과 공예, 역사 자료를 살펴볼 수 있는 박물관이에요. 소장품을 통해 시대별 장식과 생활 문화를 보고 도심의 다른 문화 명소와 관람을 묶어볼 수 있어요.",
    "highlights": [
      "중국 미술",
      "공예 소장품",
      "역사 전시"
    ],
    "tip": "여러 관이 운영될 수 있으니 원하는 전시의 실제 개최 장소와 예약 조건을 확인하세요.",
    "source": "https://www.meet-in-shanghai.net/en/"
  },
  {
    "city": "SHA",
    "name": "주자자오 수향마을",
    "wiki": "Zhujiajiao",
    "category": "문화/역사",
    "nearby": true,
    "area": "상하이 외곽 칭푸구",
    "desc": "수로와 돌다리, 오래된 상점이 이어지는 수향마을이에요. 상하이 중심의 고층 건물과 다른 풍경을 찾아 골목과 물가를 천천히 걸어볼 수 있어요.",
    "highlights": [
      "수로와 돌다리",
      "옛 골목",
      "전통 건축"
    ],
    "tip": "마을 산책과 개별 정원·시설 관람의 이용 조건을 따로 확인하세요.",
    "source": "https://www.meet-in-shanghai.net/en/"
  },
  {
    "city": "SHA",
    "name": "서산",
    "wiki": "Sheshan",
    "category": "자연",
    "nearby": true,
    "area": "상하이 외곽 쑹장구",
    "desc": "상하이 외곽의 언덕과 녹지에서 도심과 다른 산책을 즐길 수 있는 지역이에요. 숲길과 주변 건축물을 함께 살펴보며 비교적 여유로운 외곽 일정을 계획해보세요.",
    "highlights": [
      "언덕 산책",
      "녹지",
      "외곽 풍경"
    ],
    "tip": "원하는 구역의 출입 안내와 계단·경사 구간을 확인해 동선을 고르세요.",
    "source": "https://www.meet-in-shanghai.net/en/"
  },
  {
    "city": "PEK",
    "name": "자금성",
    "wiki": "Forbidden City",
    "category": "문화/역사",
    "nearby": false,
    "area": "베이징 중심부",
    "desc": "궁전과 넓은 마당이 이어지는 황실 건축 공간이에요. 주요 전각의 배치와 장식을 살펴보며 옛 수도의 규모와 의례 문화를 느껴볼 수 있어요.",
    "highlights": [
      "궁전 건축",
      "전각과 마당",
      "황실 역사"
    ],
    "tip": "예약·신분 확인·관람 동선이 중요하므로 방문 전 공식 입장 안내를 확인하세요.",
    "source": "https://english.visitbeijing.com.cn/attraction"
  },
  {
    "city": "PEK",
    "name": "천단공원",
    "wiki": "Temple of Heaven",
    "category": "문화/역사",
    "nearby": false,
    "area": "베이징 둥청구",
    "desc": "옛 황실 제례 공간과 넓은 공원이 함께 자리한 명소예요. 대표 건축물의 형태를 살펴보고 나무가 우거진 산책 구역을 걸으며 역사 관람과 휴식을 연결해보세요.",
    "highlights": [
      "제례 건축",
      "원형 공간",
      "공원 산책"
    ],
    "tip": "공원 입장과 개별 건축물 관람의 구역·운영 조건을 구분하세요.",
    "source": "https://english.visitbeijing.com.cn/attraction"
  },
  {
    "city": "PEK",
    "name": "경산공원",
    "wiki": "Jingshan Park",
    "category": "자연",
    "nearby": false,
    "area": "베이징 자금성 북쪽",
    "desc": "자금성 북쪽 언덕에 자리한 공원으로, 도심과 궁전 지붕을 바라볼 수 있어요. 중심부의 역사 명소를 둘러본 뒤 높은 시점에서 도시의 배치를 다시 살펴보기 좋아요.",
    "highlights": [
      "자금성 조망",
      "언덕 정자",
      "도심 공원"
    ],
    "tip": "전망 구간까지 오르는 계단과 경사를 고려해 여유 있게 방문하세요.",
    "source": "https://english.visitbeijing.com.cn/attraction"
  },
  {
    "city": "PEK",
    "name": "베이하이 공원",
    "wiki": "Beihai Park",
    "category": "휴식",
    "nearby": false,
    "area": "베이징 중심부",
    "desc": "호수와 섬, 정원이 어우러진 오래된 도심 공원이에요. 물가의 산책로를 걷고 정자와 탑의 풍경을 찾아보며 역사 탐방 사이에 쉬어갈 수 있어요.",
    "highlights": [
      "호수 산책",
      "백탑 풍경",
      "정원 건축"
    ],
    "tip": "넓은 공원 안에서 보고 싶은 구역을 먼저 정하면 이동을 줄일 수 있어요.",
    "source": "https://english.visitbeijing.com.cn/attraction"
  },
  {
    "city": "PEK",
    "name": "난뤄구샹",
    "wiki": "Nanluoguxiang",
    "category": "쇼핑",
    "nearby": false,
    "area": "베이징 둥청구",
    "desc": "후퉁 골목을 따라 상점과 카페가 모여 있는 지역이에요. 큰길에서 벗어나 주변 골목의 건축과 생활 풍경을 살펴보며 도시의 작은 단위를 만나볼 수 있어요.",
    "highlights": [
      "후퉁 골목",
      "상점과 카페",
      "주거 건축"
    ],
    "tip": "관광 골목과 실제 주거 구역이 이어지므로 촬영과 출입에 주의하세요.",
    "source": "https://english.visitbeijing.com.cn/attraction"
  },
  {
    "city": "PEK",
    "name": "798 예술구",
    "wiki": "798 Art Zone",
    "category": "문화/역사",
    "nearby": false,
    "area": "베이징 차오양구",
    "desc": "옛 산업시설을 활용한 공간에 갤러리와 예술 시설이 모인 지역이에요. 공장 건축의 흔적과 현대 미술, 카페를 함께 둘러보는 도시 산책을 즐길 수 있어요.",
    "highlights": [
      "현대 미술",
      "산업 건축",
      "갤러리 산책"
    ],
    "tip": "지역 산책과 개별 전시는 운영 일정이나 입장 조건이 다를 수 있어요.",
    "source": "https://english.visitbeijing.com.cn/attraction"
  },
  {
    "city": "PEK",
    "name": "이화원",
    "wiki": "Summer Palace",
    "category": "문화/역사",
    "nearby": true,
    "area": "베이징 서부 외곽",
    "desc": "쿤밍호와 만수산을 중심으로 정원과 궁전 건축이 이어지는 황실 원림이에요. 물가와 긴 회랑을 걸으며 베이징 중심부와 다른 넓고 완만한 풍경을 만날 수 있어요.",
    "highlights": [
      "쿤밍호",
      "긴 회랑",
      "황실 정원"
    ],
    "tip": "여러 출입구와 넓은 관람 구역을 고려해 들어갈 곳과 나올 곳을 미리 정하세요.",
    "source": "https://english.visitbeijing.com.cn/attraction"
  },
  {
    "city": "PEK",
    "name": "무톈위 만리장성",
    "wiki": "Mutianyu",
    "category": "문화/역사",
    "nearby": true,
    "area": "베이징 외곽 화이러우구",
    "desc": "산 능선을 따라 성벽과 망루가 이어지는 만리장성 구간이에요. 베이징 도심에서 벗어나 방어 건축과 산지 풍경을 함께 살펴보는 외곽 일정으로 계획할 수 있어요.",
    "highlights": [
      "능선 성벽",
      "망루",
      "산지 조망"
    ],
    "tip": "계단과 경사가 있는 구간이므로 자신에게 맞는 이동 방식과 관람 범위를 고르세요.",
    "source": "https://english.visitbeijing.com.cn/attraction"
  },
  {
    "city": "PAR",
    "name": "에펠탑",
    "wiki": "Eiffel Tower",
    "category": "문화/역사",
    "nearby": false,
    "area": "파리 7구",
    "desc": "센강 가까이 솟은 철골 구조물로 파리를 상징하는 명소예요. 탑에 오르는 관람뿐 아니라 주변 공원과 강변에서 각기 다른 구도의 풍경을 찾아볼 수 있어요.",
    "highlights": [
      "철골 건축",
      "센강 풍경",
      "샹드마르스 공원"
    ],
    "tip": "탑 관람과 주변 산책의 동선을 나누고 입장 예약 조건을 확인하세요.",
    "source": "https://parisjetaime.com/eng/"
  },
  {
    "city": "PAR",
    "name": "루브르 박물관",
    "wiki": "Louvre",
    "category": "문화/역사",
    "nearby": false,
    "area": "파리 1구",
    "desc": "옛 궁전 건물 안에 다양한 시대와 지역의 미술품이 모인 박물관이에요. 관심 있는 소장품이나 전시 구역을 정해두면 큰 공간을 더 집중해서 둘러볼 수 있어요.",
    "highlights": [
      "궁전 건축",
      "미술 소장품",
      "유리 피라미드"
    ],
    "tip": "전시 규모가 커서 보고 싶은 작품과 구역을 먼저 정하는 편이 좋아요.",
    "source": "https://parisjetaime.com/eng/"
  },
  {
    "city": "PAR",
    "name": "몽마르트르",
    "wiki": "Montmartre",
    "category": "문화/역사",
    "nearby": false,
    "area": "파리 18구",
    "desc": "언덕 위 성당과 골목, 광장이 이어지는 지역이에요. 계단과 작은 길을 따라 올라가며 화가들의 거리 풍경과 파리 시내를 내려다보는 시점을 함께 찾아보세요.",
    "highlights": [
      "언덕 골목",
      "사크레쾨르",
      "도시 전망"
    ],
    "tip": "경사진 골목과 계단이 많으니 오르내릴 경로를 지도에서 살펴보세요.",
    "source": "https://parisjetaime.com/eng/"
  },
  {
    "city": "PAR",
    "name": "뤽상부르 공원",
    "wiki": "Jardin du Luxembourg",
    "category": "휴식",
    "nearby": false,
    "area": "파리 6구",
    "desc": "산책로와 잔디, 연못과 조각이 어우러진 도심 정원이에요. 주변 동네 탐방 중 의자에 앉아 쉬거나 정원의 여러 구역을 걸으며 여유로운 시간을 보낼 수 있어요.",
    "highlights": [
      "정원 산책",
      "연못과 조각",
      "도심 휴식"
    ],
    "tip": "잔디 출입 등 구역별 이용 안내를 확인하고 현지의 정원 이용 방식을 존중하세요.",
    "source": "https://parisjetaime.com/eng/"
  },
  {
    "city": "PAR",
    "name": "오르세 미술관",
    "wiki": "Musée d'Orsay",
    "category": "문화/역사",
    "nearby": false,
    "area": "파리 7구",
    "desc": "옛 기차역을 미술관으로 바꾼 공간에서 회화와 조각을 감상할 수 있어요. 전시와 함께 높은 천장과 시계 등 건물에 남은 역의 흔적을 살펴보는 재미도 있어요.",
    "highlights": [
      "옛 역 건축",
      "회화와 조각",
      "대형 시계"
    ],
    "tip": "특별전과 상설 전시의 입장 조건을 확인하고 원하는 구역에 시간을 배분하세요.",
    "source": "https://parisjetaime.com/eng/"
  },
  {
    "city": "PAR",
    "name": "마레 지구",
    "wiki": "Le Marais",
    "category": "쇼핑",
    "nearby": false,
    "area": "파리 중심부 마레",
    "desc": "오래된 저택과 작은 상점, 미술 공간이 골목 사이에 모여 있는 지역이에요. 광장과 박물관, 카페를 목적에 맞게 연결하며 파리의 동네 산책을 즐길 수 있어요.",
    "highlights": [
      "역사 골목",
      "부티크",
      "광장과 카페"
    ],
    "tip": "큰길만 걷기보다 관심 있는 상점과 작은 광장을 지도에 함께 표시해보세요.",
    "source": "https://parisjetaime.com/eng/"
  },
  {
    "city": "PAR",
    "name": "베르사유 궁전",
    "wiki": "Palace of Versailles",
    "category": "문화/역사",
    "nearby": true,
    "area": "파리 근교 베르사유",
    "desc": "궁전의 실내 장식과 넓은 정원이 함께 구성된 왕실 유산이에요. 파리 도심에서 벗어나 건축과 조경을 함께 둘러보는 근교 하루 일정으로 계획하기 좋아요.",
    "highlights": [
      "궁전 내부",
      "거울의 방",
      "정원 산책"
    ],
    "tip": "궁전·정원·부속 공간별 예약과 입장 범위를 구분해 확인하세요.",
    "source": "https://parisjetaime.com/eng/"
  },
  {
    "city": "PAR",
    "name": "퐁텐블로 궁전",
    "wiki": "Palace of Fontainebleau",
    "category": "문화/역사",
    "nearby": true,
    "area": "파리 근교 퐁텐블로",
    "desc": "여러 시대의 왕실 흔적이 이어지는 궁전과 정원을 둘러볼 수 있어요. 주변 숲으로 알려진 마을과 함께 살펴보면 도심과 다른 규모의 왕실 건축 여행이 돼요.",
    "highlights": [
      "왕실 건축",
      "정원",
      "궁전 마을"
    ],
    "tip": "관람할 궁전 구역과 정원 동선을 먼저 정하고 귀환 교통도 함께 확인하세요.",
    "source": "https://parisjetaime.com/eng/"
  },
  {
    "city": "LON",
    "name": "대영박물관",
    "wiki": "British Museum",
    "category": "문화/역사",
    "nearby": false,
    "area": "런던 블룸즈버리",
    "desc": "여러 지역과 시대의 역사·문화 자료를 모은 박물관이에요. 넓은 전시 공간 중 관심 있는 문명이나 주제를 골라 관람하면 소장품의 연결을 더 잘 살펴볼 수 있어요.",
    "highlights": [
      "세계 문화 전시",
      "그레이트 코트",
      "역사 소장품"
    ],
    "tip": "상설 전시와 특별전의 예약·입장 조건을 각각 확인하세요.",
    "source": "https://www.visitlondon.com/things-to-do/sightseeing/london-attraction"
  },
  {
    "city": "LON",
    "name": "타워 브리지",
    "wiki": "Tower Bridge",
    "category": "문화/역사",
    "nearby": false,
    "area": "런던 템스강 동부",
    "desc": "템스강 위의 두 탑과 다리 구조가 런던의 대표 풍경을 만들어요. 강변에서 외관을 감상하거나 내부 전시를 통해 다리의 구조와 역사에 대해 알아볼 수 있어요.",
    "highlights": [
      "강변 풍경",
      "교량 건축",
      "타워 전시"
    ],
    "tip": "다리를 건너는 산책과 내부 전시 관람은 이용 조건이 다르니 구분하세요.",
    "source": "https://www.visitlondon.com/things-to-do/sightseeing/london-attraction"
  },
  {
    "city": "LON",
    "name": "웨스트민스터 사원",
    "wiki": "Westminster Abbey",
    "category": "문화/역사",
    "nearby": false,
    "area": "런던 웨스트민스터",
    "desc": "영국 왕실의 의례와 오랜 역사가 이어져 온 고딕 양식의 종교 건축물이에요. 외관과 내부 공간을 살펴보며 주변의 의회 건물과 템스강 산책으로 동선을 이어갈 수 있어요.",
    "highlights": [
      "고딕 건축",
      "왕실 역사",
      "웨스트민스터 산책"
    ],
    "tip": "예배와 행사에 따라 관광 관람 범위가 달라질 수 있으니 공식 일정을 확인하세요.",
    "source": "https://www.visitlondon.com/things-to-do/sightseeing/london-attraction"
  },
  {
    "city": "LON",
    "name": "코번트 가든",
    "wiki": "Covent Garden",
    "category": "쇼핑",
    "nearby": false,
    "area": "런던 웨스트엔드",
    "desc": "시장 건물과 상점, 공연장 주변의 활기찬 거리가 모인 지역이에요. 쇼핑과 식사, 거리 풍경을 둘러보고 인근 극장가와 연결해 런던의 도심 문화를 즐길 수 있어요.",
    "highlights": [
      "시장 건물",
      "상점과 식사",
      "극장가 연결"
    ],
    "tip": "공연을 함께 볼 계획이라면 식사와 이동 시간을 넉넉하게 배분하세요.",
    "source": "https://www.visitlondon.com/things-to-do/sightseeing/london-attraction"
  },
  {
    "city": "LON",
    "name": "하이드 파크",
    "wiki": "Hyde Park, London",
    "category": "자연",
    "nearby": false,
    "area": "런던 중심부 서쪽",
    "desc": "호수와 넓은 녹지가 있는 런던의 대표적인 왕립 공원이에요. 도심 관광 사이에 산책로를 걷거나 물가에 머무르며 박물관·쇼핑가 일정의 속도를 조절할 수 있어요.",
    "highlights": [
      "녹지 산책",
      "서펜타인 호수",
      "도심 휴식"
    ],
    "tip": "넓은 공원이므로 다음 목적지에 가까운 출입구를 지도에서 골라보세요.",
    "source": "https://www.visitlondon.com/things-to-do/sightseeing/london-attraction"
  },
  {
    "city": "LON",
    "name": "버러 마켓",
    "wiki": "Borough Market",
    "category": "음식",
    "nearby": false,
    "area": "런던 사우스워크",
    "desc": "식재료와 여러 음식 상점이 모여 있는 시장이에요. 판매대와 주변 골목을 둘러보며 맛보고 싶은 음식을 찾고 인근 템스강 남안 산책과 묶을 수 있어요.",
    "highlights": [
      "식품 시장",
      "다양한 먹거리",
      "사우스뱅크 연결"
    ],
    "tip": "가게마다 영업 요일과 시간이 다를 수 있으니 방문할 상점을 확인하세요.",
    "source": "https://www.visitlondon.com/things-to-do/sightseeing/london-attraction"
  },
  {
    "city": "LON",
    "name": "그리니치",
    "wiki": "Greenwich",
    "category": "문화/역사",
    "nearby": true,
    "area": "런던 외곽 동부 그리니치",
    "desc": "해양 역사와 천문·시간을 주제로 한 시설이 모인 템스강변 지역이에요. 공원과 시장, 옛 해군 건축물을 함께 둘러보며 런던 중심부와 다른 동네 여행을 즐길 수 있어요.",
    "highlights": [
      "해양 박물관",
      "천문대 일대",
      "그리니치 공원"
    ],
    "tip": "천문대·박물관·시장 중 우선 방문할 곳을 정하고 이동 동선을 연결하세요.",
    "source": "https://www.visitlondon.com/things-to-do/sightseeing/london-attraction"
  },
  {
    "city": "LON",
    "name": "윈저성",
    "wiki": "Windsor Castle",
    "category": "문화/역사",
    "nearby": true,
    "area": "런던 근교 윈저",
    "desc": "왕실과 연결된 성과 마을을 함께 둘러보는 런던 근교 후보예요. 성의 건축과 내부 관람 후 주변 거리와 강변으로 산책을 이어갈 수 있어요.",
    "highlights": [
      "왕실 성곽",
      "윈저 마을",
      "강변 산책"
    ],
    "tip": "왕실 행사와 보안 절차에 따라 관람 조건이 바뀔 수 있으니 공식 안내를 확인하세요.",
    "source": "https://www.visitlondon.com/things-to-do/sightseeing/london-attraction"
  },
  {
    "city": "ROM",
    "name": "콜로세움",
    "wiki": "Colosseum",
    "category": "문화/역사",
    "nearby": false,
    "area": "로마 고대 유적 지구",
    "desc": "거대한 원형 경기장 건축을 통해 고대 로마의 도시 생활과 오락 문화를 살펴볼 수 있어요. 주변의 포로 로마노와 팔라티노 언덕을 함께 연결하면 유적의 관계가 더 잘 보여요.",
    "highlights": [
      "원형 경기장",
      "고대 건축",
      "유적 지구 연결"
    ],
    "tip": "티켓에 포함된 관람 구역과 시간 지정 여부를 공식 안내에서 확인하세요.",
    "source": "https://www.turismoroma.it/en"
  },
  {
    "city": "ROM",
    "name": "판테온",
    "wiki": "Pantheon, Rome",
    "category": "문화/역사",
    "nearby": false,
    "area": "로마 역사 중심부",
    "desc": "돔과 천장의 원형 개구부가 인상적인 고대 건축물이에요. 내부의 빛과 공간감을 살펴본 뒤 주변 광장과 골목으로 산책을 이어가면 중심부 도보 여행에 잘 어울려요.",
    "highlights": [
      "돔 건축",
      "천창의 빛",
      "주변 광장"
    ],
    "tip": "종교 공간의 복장·관람 안내와 실제 입장 조건을 확인하세요.",
    "source": "https://www.turismoroma.it/en"
  },
  {
    "city": "ROM",
    "name": "트레비 분수",
    "wiki": "Trevi Fountain",
    "category": "문화/역사",
    "nearby": false,
    "area": "로마 역사 중심부",
    "desc": "건물 외벽과 조각, 물이 하나의 장면을 이루는 로마의 대표 분수예요. 작은 광장에서 세부 장식을 살펴보고 주변 골목의 다른 역사 명소와 도보로 연결할 수 있어요.",
    "highlights": [
      "바로크 조각",
      "분수 풍경",
      "중심부 골목"
    ],
    "tip": "현장 통제선과 접근 안내를 따르고 분수 안으로 들어가지 마세요.",
    "source": "https://www.turismoroma.it/en"
  },
  {
    "city": "ROM",
    "name": "포로 로마노",
    "wiki": "Roman Forum",
    "category": "문화/역사",
    "nearby": false,
    "area": "로마 고대 유적 지구",
    "desc": "고대 로마의 공공 공간과 건축 흔적이 넓게 남아 있는 유적지예요. 신전과 기념물의 위치를 따라 걸으며 당시 도시의 중심이 어떤 모습이었을지 상상해볼 수 있어요.",
    "highlights": [
      "고대 공공 공간",
      "신전 유적",
      "팔라티노 연결"
    ],
    "tip": "유적의 단차와 노출된 산책 구간을 고려해 편한 신발과 방문 동선을 준비하세요.",
    "source": "https://www.turismoroma.it/en"
  },
  {
    "city": "ROM",
    "name": "나보나 광장",
    "wiki": "Piazza Navona",
    "category": "문화/역사",
    "nearby": false,
    "area": "로마 역사 중심부",
    "desc": "긴 형태의 광장에 분수와 바로크 건축물이 어우러져 있어요. 주변 카페와 골목을 연결해 천천히 걷고 각기 다른 분수의 조각을 비교하며 둘러볼 수 있어요.",
    "highlights": [
      "분수 조각",
      "바로크 건축",
      "광장 산책"
    ],
    "tip": "광장의 여러 입구를 이용해 인근 명소와 순환하는 도보 동선을 만들어보세요.",
    "source": "https://www.turismoroma.it/en"
  },
  {
    "city": "ROM",
    "name": "트라스테베레",
    "wiki": "Trastevere",
    "category": "음식",
    "nearby": false,
    "area": "로마 테베레강 서쪽",
    "desc": "좁은 골목과 광장, 식당이 이어지는 강 서쪽의 동네예요. 도심 유적 관람 후 강을 건너 생활감 있는 거리와 식사 공간을 찾아보는 일정으로 연결하기 좋아요.",
    "highlights": [
      "골목 산책",
      "광장",
      "동네 식당"
    ],
    "tip": "관광 공간과 주거지가 섞여 있으니 늦은 시간 골목에서는 소음을 줄여주세요.",
    "source": "https://www.turismoroma.it/en"
  },
  {
    "city": "ROM",
    "name": "오스티아 안티카",
    "wiki": "Ostia Antica",
    "category": "문화/역사",
    "nearby": true,
    "area": "로마 외곽 오스티아",
    "desc": "고대 항구도시의 도로와 주택, 공공 건축 흔적이 남은 유적지예요. 중심부의 기념비적인 유적과 비교하며 당시 사람들의 일상적인 도시 공간을 살펴볼 수 있어요.",
    "highlights": [
      "고대 도시 거리",
      "극장 유적",
      "생활 건축"
    ],
    "tip": "현대 해안 지역 오스티아와 고고학 유적의 위치를 구분해 교통편을 확인하세요.",
    "source": "https://www.turismoroma.it/en"
  },
  {
    "city": "ROM",
    "name": "티볼리 빌라 데스테",
    "wiki": "Villa d'Este",
    "category": "문화/역사",
    "nearby": true,
    "area": "로마 근교 티볼리",
    "desc": "테라스형 정원과 분수로 알려진 티볼리의 별장 정원이에요. 물길과 조각이 연결되는 공간을 걸으며 로마 도심과 다른 조경 중심의 근교 여행을 즐길 수 있어요.",
    "highlights": [
      "정원과 분수",
      "테라스 조경",
      "티볼리 마을"
    ],
    "tip": "정원의 계단과 경사를 고려해 이동하고 당일 개방 구역을 확인하세요.",
    "source": "https://www.turismoroma.it/en"
  },
  {
    "city": "BCN",
    "name": "사그라다 파밀리아",
    "wiki": "Sagrada Família",
    "category": "문화/역사",
    "nearby": false,
    "area": "바르셀로나 에이샴플라",
    "desc": "가우디의 설계로 알려진 대성당으로 외관의 조각과 독특한 기둥 구조가 눈길을 끌어요. 내부의 빛과 장식을 살펴보며 건축을 주제로 도시를 탐방하는 출발점으로 삼아보세요.",
    "highlights": [
      "성당 건축",
      "스테인드글라스",
      "조각 파사드"
    ],
    "tip": "성당과 탑의 관람 범위 및 예약 조건을 나누어 확인하세요.",
    "source": "https://www.barcelonaturisme.cat/wv3/en/"
  },
  {
    "city": "BCN",
    "name": "구엘 공원",
    "wiki": "Park Güell",
    "category": "문화/역사",
    "nearby": false,
    "area": "바르셀로나 그라시아 일대",
    "desc": "모자이크와 곡선 구조가 자연 지형과 어우러진 가우디의 공원이에요. 건축 장식과 산책 구역을 둘러보며 도심과 지중해 방향의 풍경을 함께 찾아볼 수 있어요.",
    "highlights": [
      "모자이크",
      "곡선 건축",
      "언덕 전망"
    ],
    "tip": "공원 구역과 입장 시간 조건을 확인하고 경사가 있는 동선에 여유를 두세요.",
    "source": "https://www.barcelonaturisme.cat/wv3/en/"
  },
  {
    "city": "BCN",
    "name": "카사 바트요",
    "wiki": "Casa Batlló",
    "category": "문화/역사",
    "nearby": false,
    "area": "바르셀로나 그라시아 거리",
    "desc": "유기적인 곡선과 색채가 돋보이는 가우디의 주택 건축이에요. 외관뿐 아니라 실내 공간의 장식과 구조를 살펴보며 주변 근대 건축물과 비교해볼 수 있어요.",
    "highlights": [
      "곡선 외관",
      "주택 내부",
      "모데르니스메"
    ],
    "tip": "거리에서 외관을 보는 것과 내부 관람의 예약 조건은 다르므로 구분하세요.",
    "source": "https://www.barcelonaturisme.cat/wv3/en/"
  },
  {
    "city": "BCN",
    "name": "고딕 지구",
    "wiki": "Gothic Quarter, Barcelona",
    "category": "문화/역사",
    "nearby": false,
    "area": "바르셀로나 구시가지",
    "desc": "좁은 골목과 광장, 오래된 종교 건축이 이어지는 구시가지예요. 큰길에서 벗어나 작은 광장을 연결해 걸으면 바르셀로나의 역사적인 거리 구조를 가까이 만날 수 있어요.",
    "highlights": [
      "중세 골목",
      "성당 주변",
      "작은 광장"
    ],
    "tip": "골목이 복잡하므로 보고 싶은 광장을 몇 곳 정해 지도로 연결해보세요.",
    "source": "https://www.barcelonaturisme.cat/wv3/en/"
  },
  {
    "city": "BCN",
    "name": "보케리아 시장",
    "wiki": "La Boqueria",
    "category": "음식",
    "nearby": false,
    "area": "바르셀로나 람블라 거리",
    "desc": "과일과 해산물 등 식재료와 음식점이 모여 있는 도심 시장이에요. 판매대의 색과 향을 살펴보고 먹거리를 골라보며 구시가지 산책 중 식사 시간을 만들 수 있어요.",
    "highlights": [
      "식재료 시장",
      "음식 판매대",
      "람블라 연결"
    ],
    "tip": "상점별 영업 여부와 먹는 공간의 이용 안내를 확인하세요.",
    "source": "https://www.barcelonaturisme.cat/wv3/en/"
  },
  {
    "city": "BCN",
    "name": "바르셀로네타 해변",
    "wiki": "Barceloneta Beach",
    "category": "휴식",
    "nearby": false,
    "area": "바르셀로나 해안",
    "desc": "도심 가까이에서 지중해와 해안 산책로를 만날 수 있는 해변이에요. 구시가지 관광에 바닷가 산책을 더하고 물가의 풍경을 바라보며 쉬어가는 일정으로 어울려요.",
    "highlights": [
      "지중해 풍경",
      "해안 산책로",
      "도시 해변"
    ],
    "tip": "수영이나 해변 활동은 당일 기상과 현장의 안전 표지를 확인한 뒤 계획하세요.",
    "source": "https://www.barcelonaturisme.cat/wv3/en/"
  },
  {
    "city": "BCN",
    "name": "몬세라트",
    "wiki": "Montserrat (mountain)",
    "category": "자연",
    "nearby": true,
    "area": "바르셀로나 근교 몬세라트",
    "desc": "독특한 암봉과 산지의 수도원이 함께 알려진 근교 여행지예요. 산의 형태와 건축을 함께 살펴보며 도시에서 벗어난 자연·문화 일정을 만들어볼 수 있어요.",
    "highlights": [
      "바위산 풍경",
      "수도원",
      "산지 전망"
    ],
    "tip": "이동 수단의 운행과 선택한 산책로의 난도를 방문 전에 확인하세요.",
    "source": "https://www.barcelonaturisme.cat/wv3/en/"
  },
  {
    "city": "BCN",
    "name": "시체스",
    "wiki": "Sitges",
    "category": "휴식",
    "nearby": true,
    "area": "바르셀로나 근교 해안",
    "desc": "바닷가와 오래된 거리 풍경이 이어지는 지중해 연안 마을이에요. 해안 산책과 미술·건축 공간을 함께 둘러보며 바르셀로나와 다른 작은 도시의 분위기를 즐길 수 있어요.",
    "highlights": [
      "해안 마을",
      "옛 거리",
      "문화 공간"
    ],
    "tip": "해변에 머무를지 문화시설을 방문할지에 따라 도보 동선을 나누어보세요.",
    "source": "https://www.barcelonaturisme.cat/wv3/en/"
  },
  {
    "city": "LAX",
    "name": "그리피스 천문대",
    "wiki": "Griffith Observatory",
    "category": "문화/역사",
    "nearby": false,
    "area": "로스앤젤레스 그리피스 공원",
    "desc": "언덕 위 천문대에서 우주 관련 전시와 도시 전망을 함께 즐길 수 있어요. 건물 주변에서는 로스앤젤레스의 넓은 시가지와 할리우드 사인 방향의 풍경도 살펴볼 수 있어요.",
    "highlights": [
      "천문 전시",
      "도시 전망",
      "그리피스 공원"
    ],
    "tip": "천문대 관람과 플라네타리움 등 개별 프로그램의 이용 조건을 따로 확인하세요.",
    "source": "https://www.discoverlosangeles.com/"
  },
  {
    "city": "LAX",
    "name": "게티 센터",
    "wiki": "Getty Center",
    "category": "문화/역사",
    "nearby": false,
    "area": "로스앤젤레스 브렌트우드",
    "desc": "유럽 미술 소장품과 현대적인 건축, 정원을 함께 감상할 수 있는 미술 공간이에요. 작품 관람 사이에 야외로 나가 건물과 도시 풍경을 둘러보는 일정으로 구성하기 좋아요.",
    "highlights": [
      "유럽 미술",
      "건축과 정원",
      "도시 조망"
    ],
    "tip": "관람 예약과 주차·이동 조건을 확인하고 전시와 정원 시간을 나누세요.",
    "source": "https://www.discoverlosangeles.com/"
  },
  {
    "city": "LAX",
    "name": "할리우드 명예의 거리",
    "wiki": "Hollywood Walk of Fame",
    "category": "문화/역사",
    "nearby": false,
    "area": "로스앤젤레스 할리우드",
    "desc": "보도에 새겨진 스타들의 이름을 따라 영화와 대중문화의 흔적을 찾아보는 거리예요. 주변 극장 건축과 상점을 함께 둘러보며 할리우드 지역의 분위기를 느껴볼 수 있어요.",
    "highlights": [
      "스타 명판",
      "극장 건축",
      "할리우드 거리"
    ],
    "tip": "거리가 길게 이어지므로 관심 있는 명판이나 극장의 위치를 먼저 확인하세요.",
    "source": "https://www.discoverlosangeles.com/"
  },
  {
    "city": "LAX",
    "name": "더 브로드",
    "wiki": "The Broad",
    "category": "문화/역사",
    "nearby": false,
    "area": "로스앤젤레스 다운타운",
    "desc": "현대 미술을 감상할 수 있는 다운타운의 미술관이에요. 특징적인 외관과 전시 공간을 둘러보고 인근 공연장·건축 명소와 연결해 문화 산책을 만들 수 있어요.",
    "highlights": [
      "현대 미술",
      "독특한 외관",
      "다운타운 문화"
    ],
    "tip": "전시와 개별 설치 작품의 예약 방식이 다를 수 있으니 공식 안내를 확인하세요.",
    "source": "https://www.discoverlosangeles.com/"
  },
  {
    "city": "LAX",
    "name": "그랜드 센트럴 마켓",
    "wiki": "Grand Central Market (Los Angeles)",
    "category": "음식",
    "nearby": false,
    "area": "로스앤젤레스 다운타운",
    "desc": "다양한 음식 가게가 한 공간에 모인 다운타운의 실내 시장이에요. 취향에 맞는 음식을 고르고 주변 역사 건물과 거리 탐방 사이에 식사 장소로 연결하기 좋아요.",
    "highlights": [
      "다양한 음식",
      "실내 시장",
      "다운타운 산책"
    ],
    "tip": "상점별 운영 시간이 달라 원하는 가게의 안내를 확인하세요.",
    "source": "https://www.discoverlosangeles.com/"
  },
  {
    "city": "LAX",
    "name": "베니스 비치",
    "wiki": "Venice, Los Angeles",
    "category": "휴식",
    "nearby": false,
    "area": "로스앤젤레스 베니스 해안",
    "desc": "해변과 보드워크, 운동·거리 문화가 모인 해안 지역이에요. 바닷가 풍경과 벽화, 인근 동네를 함께 둘러보며 로스앤젤레스의 다양한 생활 장면을 만날 수 있어요.",
    "highlights": [
      "해안 산책",
      "보드워크",
      "거리 문화"
    ],
    "tip": "해변 구역과 주거 골목의 이용 규칙을 구분하고 자전거·보행 동선을 따르세요.",
    "source": "https://www.discoverlosangeles.com/"
  },
  {
    "city": "LAX",
    "name": "산타모니카 피어",
    "wiki": "Santa Monica Pier",
    "category": "액티비티",
    "nearby": true,
    "area": "로스앤젤레스 인접 도시 산타모니카",
    "desc": "바다 위로 뻗은 부두와 해변 풍경을 함께 즐길 수 있는 인접 도시의 명소예요. 놀이시설 주변을 둘러보고 해안 산책로로 이동해 바닷가 하루 일정을 계획할 수 있어요.",
    "highlights": [
      "바다 위 부두",
      "놀이시설",
      "해변 산책"
    ],
    "tip": "부두 산책과 개별 놀이시설 이용은 운영·요금 조건이 다르니 확인하세요.",
    "source": "https://www.discoverlosangeles.com/"
  },
  {
    "city": "LAX",
    "name": "말리부 해안",
    "wiki": "Malibu, California",
    "category": "자연",
    "nearby": true,
    "area": "로스앤젤레스 근교 말리부",
    "desc": "태평양을 따라 해변과 절벽 풍경이 이어지는 해안 도시예요. 방문 가능한 해변을 골라 도심과 다른 자연 풍경을 둘러보는 외곽 일정으로 계획할 수 있어요.",
    "highlights": [
      "태평양 해안",
      "해변 풍경",
      "해안 드라이브"
    ],
    "tip": "해변별 공공 출입구와 주차·통제 안내를 확인하고 사유지 출입을 피하세요.",
    "source": "https://www.discoverlosangeles.com/"
  },
  {
    "city": "NYC",
    "name": "센트럴 파크",
    "wiki": "Central Park",
    "category": "자연",
    "nearby": false,
    "area": "뉴욕 맨해튼",
    "desc": "맨해튼의 빌딩 사이에 넓은 녹지와 호수, 산책로가 펼쳐지는 공원이에요. 관심 있는 정원과 다리, 잔디 구역을 골라 도심 관광 중 자연을 만나는 시간을 만들 수 있어요.",
    "highlights": [
      "녹지 산책",
      "호수와 다리",
      "도심 풍경"
    ],
    "tip": "공원이 넓으므로 다음 일정과 가까운 구역을 중심으로 동선을 정하세요.",
    "source": "https://www.nyctourism.com/"
  },
  {
    "city": "NYC",
    "name": "메트로폴리탄 미술관",
    "wiki": "Metropolitan Museum of Art",
    "category": "문화/역사",
    "nearby": false,
    "area": "뉴욕 맨해튼 어퍼이스트사이드",
    "desc": "세계 여러 지역과 시대의 미술품을 감상할 수 있는 대형 미술관이에요. 보고 싶은 문화권이나 작품 주제를 고르면 전시 공간을 더 집중해서 둘러볼 수 있어요.",
    "highlights": [
      "세계 미술",
      "다양한 전시실",
      "미술관 건축"
    ],
    "tip": "전시 규모가 크므로 우선 관람할 구역과 예약·입장 조건을 확인하세요.",
    "source": "https://www.nyctourism.com/"
  },
  {
    "city": "NYC",
    "name": "브루클린 브리지",
    "wiki": "Brooklyn Bridge",
    "category": "문화/역사",
    "nearby": false,
    "area": "뉴욕 맨해튼·브루클린 연결",
    "desc": "이스트강 위에서 두 지역을 연결하는 역사적인 다리예요. 보행로에서 교량의 구조와 맨해튼의 스카이라인을 보고 양쪽 강변 동네로 산책을 이어갈 수 있어요.",
    "highlights": [
      "교량 건축",
      "스카이라인",
      "강변 동네 연결"
    ],
    "tip": "보행 안내와 교통 동선을 따르고 다리를 건넌 뒤의 귀환 경로도 정해두세요.",
    "source": "https://www.nyctourism.com/"
  },
  {
    "city": "NYC",
    "name": "하이라인",
    "wiki": "High Line",
    "category": "휴식",
    "nearby": false,
    "area": "뉴욕 맨해튼 서부",
    "desc": "옛 고가 철도 구조를 활용한 공원에서 건물 사이의 도시 풍경을 다른 높이로 살펴볼 수 있어요. 식재와 야외 예술, 주변 동네의 거리를 함께 연결하는 산책에 어울려요.",
    "highlights": [
      "고가 공원",
      "도시 건축",
      "야외 예술"
    ],
    "tip": "출입구마다 계단·엘리베이터 조건이 다를 수 있으니 이용 경로를 확인하세요.",
    "source": "https://www.nyctourism.com/"
  },
  {
    "city": "NYC",
    "name": "그랜드 센트럴 터미널",
    "wiki": "Grand Central Terminal",
    "category": "문화/역사",
    "nearby": false,
    "area": "뉴욕 맨해튼 미드타운",
    "desc": "기차가 오가는 터미널에서 높은 천장과 큰 홀, 역사적인 건축을 감상할 수 있어요. 실제 교통시설의 활기와 식사·상점 공간을 함께 둘러보는 도심 방문지예요.",
    "highlights": [
      "메인 홀",
      "천장 장식",
      "역사적 교통 건축"
    ],
    "tip": "운영 중인 역이므로 승객의 이동을 방해하지 않도록 관람하세요.",
    "source": "https://www.nyctourism.com/"
  },
  {
    "city": "NYC",
    "name": "덤보",
    "wiki": "Dumbo, Brooklyn",
    "category": "쇼핑",
    "nearby": false,
    "area": "뉴욕 브루클린 강변",
    "desc": "옛 산업 건물과 상점, 공원이 이어지는 브루클린의 강변 동네예요. 다리 사이의 거리 풍경과 맨해튼 전망을 함께 찾아보며 카페와 산책을 연결할 수 있어요.",
    "highlights": [
      "다리 전망",
      "강변 공원",
      "카페와 상점"
    ],
    "tip": "사진을 찍을 때 차도와 보행 흐름을 막지 않도록 주의하세요.",
    "source": "https://www.nyctourism.com/"
  },
  {
    "city": "NYC",
    "name": "코니아일랜드 해변",
    "wiki": "Coney Island",
    "category": "휴식",
    "nearby": true,
    "area": "뉴욕 외곽 브루클린 남부",
    "desc": "뉴욕시 안의 남쪽 해안 지역으로 해변과 보드워크, 놀이시설이 모여 있어요. 맨해튼의 고층 건물과 다른 바닷가 풍경을 찾아 외곽 하루 일정을 만들 수 있어요.",
    "highlights": [
      "보드워크",
      "대서양 해변",
      "놀이시설 풍경"
    ],
    "tip": "개별 놀이시설의 계절 운영과 해변 안전 안내는 방문 전 확인하세요.",
    "source": "https://www.nyctourism.com/"
  },
  {
    "city": "NYC",
    "name": "스태튼아일랜드 세인트조지",
    "wiki": "St. George, Staten Island",
    "category": "문화/역사",
    "nearby": true,
    "area": "뉴욕 외곽 스태튼아일랜드",
    "desc": "페리 선착장 주변의 해안과 문화시설을 둘러볼 수 있는 스태튼아일랜드의 동네예요. 맨해튼에서 물길을 건너며 항구 풍경을 보고 다른 자치구의 일상을 만나볼 수 있어요.",
    "highlights": [
      "항구 풍경",
      "페리 이동",
      "동네 문화시설"
    ],
    "tip": "페리 운항과 목적 시설의 개방 여부를 확인하고 돌아오는 경로를 계획하세요.",
    "source": "https://www.nyctourism.com/"
  }
];

const placeKey=value=>String(value||'').normalize('NFKC').toLowerCase().replace(/[\s·・,._'’()–-]/g,'');
const originalPlaces=[...PLACES];
const usedOriginalPlaces=new Set();
const enhancedPlaces=PLACE_GUIDES.map((guide,index)=>{
 const existing=originalPlaces.find(p=>p.city===guide.city&&!usedOriginalPlaces.has(p.id)&&(placeKey(p.name)===placeKey(guide.name)||(Math.min(placeKey(p.name).length,placeKey(guide.name).length)>=3&&(placeKey(p.name).includes(placeKey(guide.name))||placeKey(guide.name).includes(placeKey(p.name))))||placeKey(EXISTING_PLACE_WIKIS[p.id])===placeKey(guide.wiki)));
 if(existing)usedOriginalPlaces.add(existing.id);
 return {...existing,...guide,id:existing?.id||guide.city.toLowerCase()+'-guide-'+String(index+1).padStart(3,'0'),travel:null,duration:guide.nearby?'day':'half',free:null,access:'도심 기준 경로와 교통수단은 지도를 참고해 계획해 주세요.',hours:'방문 전 공식 운영 안내 확인',cost:'시설·관람 구역별 요금 확인 필요'};
});
// Retain saved-place IDs and any different existing neighbourhood candidates.
originalPlaces.filter(p=>!usedOriginalPlaces.has(p.id)&&!enhancedPlaces.some(x=>x.city===p.city&&placeKey(x.name)===placeKey(p.name))).forEach(p=>enhancedPlaces.push({...p,wiki:EXISTING_PLACE_WIKIS[p.id]||enhancedPlaces.find(x=>x.city===p.city&&placeKey(x.name).includes(placeKey(p.name)))?.wiki,source:SOURCE_LINKS[p.city],highlights:[p.category+' 탐방','주변 거리 산책','지역 풍경 감상'],tip:'방문할 구역을 정하고 공식 안내에서 운영 상황과 동선을 확인해 보세요.'}));
PLACES.splice(0,PLACES.length,...enhancedPlaces);
SOURCE_LINKS.CEB='https://tourism.cebu.gov.ph/';
const CITY_INTRODUCTIONS={TYO:'전통 사찰의 골목과 현대적인 상업 지구가 나란히 이어지는 도시예요. 시내의 서로 다른 동네를 둘러보고 가마쿠라 같은 근교로 여행을 넓혀보세요.',OSA:'강변의 활기와 먹거리 골목, 역사 공간을 함께 즐길 수 있어요. 도심 여행에 교토와 나라 같은 주변 지역을 더해 일정을 구성해보세요.',CJU:'해변과 오름, 숲길과 작은 마을이 각기 다른 풍경을 보여줘요. 섬을 동서로 한꺼번에 이동하기보다 가까운 장소끼리 묶어 여행해보세요.',PAR:'강변 산책과 미술관, 동네의 일상이 어우러지는 도시예요. 중심부의 명소와 베르사유 같은 근교를 나누어 계획하면 서로 다른 분위기를 경험할 수 있어요.',LON:'박물관과 왕실의 흔적, 공원과 다양한 동네가 이어지는 도시예요. 중심부의 대표 명소뿐 아니라 그리니치와 주변 지역에서도 새로운 장면을 만나보세요.'};
CITIES.forEach(c=>{c.desc=CITY_INTRODUCTIONS[c.id]||c.name+'의 역사 공간과 거리, 자연 풍경을 취향에 맞게 골라보세요. 도심 명소와 주변 지역을 나누어 소개해 하루 일정부터 여유로운 근교 여행까지 계획할 수 있어요.';});
