(() => {
  "use strict";

  const screens = {
    "CTR-01": {
      overview: "행복시 청년센터의 역할과 이용 가능한 서비스를 소개하고, 관련 서비스 화면으로 연결합니다.",
      specs: [
        ["대표 이미지와 소개", "콘텐츠", "센터 대표 이미지와 소개 문구", "청년센터의 역할을 소개합니다. 이미지는 가상 센터의 예시 이미지입니다."],
        ["공간 이용", "링크", "스터디실·다목적실 안내", "센터에서 이용할 수 있는 공간을 소개합니다.", "SPC-01 청년센터 공간 안내"],
        ["교육과 성장", "링크", "직무 교육·강연·워크숍 안내", "프로그램을 탐색할 수 있는 목록을 엽니다.", "PRG-01 프로그램 목록"],
        ["상담과 지원", "링크", "마음건강 상담과 청년정책 안내", "카드 제목은 상담신청으로 이동하고, 청년정책 찾아보기 버튼은 정책 목록으로 이동합니다.", "PRG-02 마음건강 상담신청 · POL-01 청년정책 목록"],
        ["배움과 교류", "콘텐츠 · 링크", "교육실 이미지와 활동 예시", "센터 공간과 교육 프로그램을 소개하고 각각의 바로가기를 제공합니다.", "SPC-01 청년센터 공간 안내 · PRG-01 프로그램 목록"],
        ["상담 및 지원사업 소개", "콘텐츠 · 링크", "센터 외관 이미지와 지원 예시", "지원사업의 대상과 접수 기간을 확인하거나 마음건강 상담 일정을 선택할 수 있는 화면으로 연결합니다.", "SUP-01 지원사업 목록 · PRG-02 마음건강 상담신청"],
        ["청년센터 방문 안내", "정보 표시", "운영시간·휴관일·가상 주소", "방문 전에 필요한 정보를 표시합니다. 방문 안내 안에 예약 또는 오시는길 버튼은 없습니다."]
      ]
    },
    "CTR-02": {
      overview: "행복시 청년지원재단의 설립 목적, 비전, 핵심 가치와 2018년부터 2026년까지의 가상 연혁을 안내합니다.",
      specs: [
        ["상단 바로가기", "버튼", "법인 소개 · 주요 연혁", "선택한 영역의 제목으로 스크롤과 키보드 초점을 이동합니다. 화면 ID는 유지합니다."],
        ["법인 소개와 대표 이미지", "콘텐츠", "청년지원재단 명칭과 소개 문구", "2018년 설립된 가상 재단의 역할을 안내합니다. 상단에는 밝은 대표 이미지를 표시합니다."],
        ["설립 목적과 비전", "정보 표시", "설립 목적 · 비전", "청년 자립과 사회참여 확대라는 설립 목적과 지역 청년의 성장 비전을 소개합니다."],
        ["핵심 가치", "정보 표시", "성장 · 연결 · 동행", "재단의 핵심 가치 세 가지를 개별 카드로 표시합니다."],
        ["연혁 연도 선택", "필터 버튼", "전체 선택", "전체 또는 2026~2018년 중 한 해를 선택합니다. 선택 상태를 표시하며 전체를 누르면 모든 연도가 다시 표시됩니다."],
        ["연혁 목록", "타임라인", "2026~2018년 전체", "가상의 주요 이력을 최신 연도와 월부터 표시합니다. 특정 연도 선택 시 해당 연도에 속한 항목만 표시합니다."]
      ]
    },
    "CTR-03": {
      overview: "행복시 청년센터의 지휘 체계와 자문 조직, 2개 본부와 6개 전담팀의 역할을 안내합니다.",
      specs: [
        ["센터장", "조직도 노드", "센터 운영 및 사업 총괄", "센터장 아래에 사무국장을 배치해 지휘 관계를 표시합니다."],
        ["사무국장과 청년운영위원회", "조직도 노드", "사업 조정·조직 관리 / 정책 제안·운영 자문", "사무국장은 두 본부를 연결합니다. 청년운영위원회는 별도의 점선으로 자문 관계를 표시합니다."],
        ["청년사업본부", "조직 그룹", "정책지원팀 · 일자리성장팀 · 문화복지팀", "청년정책, 취업·창업, 문화교류와 마음건강 등 각 팀의 주요 업무 네 가지를 표시합니다."],
        ["운영협력본부", "조직 그룹", "경영지원팀 · 공간운영팀 · 대외협력팀", "인사·예산, 시설·대관, 기관 협력과 홍보 등 각 팀의 주요 업무 네 가지를 표시합니다."],
        ["조직 규모 요약", "정보 표시", "2개 본부 · 6개 전담팀 · 1개 운영위원회 · 담당업무 24개", "조직도에 표시된 본부, 팀, 위원회 및 담당업무의 수를 집계해 표시합니다."]
      ]
    },
    "CTR-04": {
      overview: "행복시 청년센터의 가상 위치, 대중교통 경로, 운영시간과 연락처를 안내합니다.",
      specs: [
        ["센터 주소와 지도", "콘텐츠", "행복시 행복동 청년로 1 (가상 주소)", "가상 지도에 센터 위치 핀과 주변 역·정류장을 표시합니다. 지도는 정적 이미지이며 외부 지도 API나 실제 길찾기 기능을 사용하지 않습니다."],
        ["지도 확대·축소", "버튼", "1단계 · 축소 비활성", "지도 오른쪽 아래의 +와 −로 1~3단계를 조작합니다. 3단계에서는 확대, 1단계에서는 축소를 비활성화합니다."],
        ["지하철 안내", "정보 표시", "2호선 행복역 2번 출구", "2번 출구에서 센터까지 도보 약 8분으로 안내합니다. 역과 도보 시간은 예시입니다."],
        ["버스 안내", "정보 표시", "청년센터 정류장", "하차 후 도보 약 2분으로 안내하고 예시 노선을 간선 120·152번, 지선 2211·2312번, 마을 행복03번으로 구분합니다."],
        ["이용 안내", "정보 표시", "평일 09:00~21:00 · 토요일 09:00~18:00", "휴관일은 일요일과 공휴일로 표시합니다. 연락처는 가상 번호 02-000-0000이며 통화 링크를 제공하지 않습니다."]
      ]
    }
  };

  const panel = document.querySelector(".ui-spec-panel");
  if (!panel) return;

  function create(tag, text, className) {
    const element = document.createElement(tag);
    if (text) element.textContent = text;
    if (className) element.className = className;
    return element;
  }

  function render() {
    const shared = panel.querySelector("#annotation-panel");
    const screen = screens[location.hash.slice(1)];
    if (!shared || !screen || window.MOCKUP_DESCRIPTION_CONTEXT || shared.querySelector(".intro-screen-specs")) return;

    const local = create("section", "", "intro-screen-specs");
    local.setAttribute("aria-label", "기준 Description");
    const overview = create("div", "", "annotation-screen-overview");
    overview.append(create("h3", "화면 개요"), create("p", screen.overview, "annotation-text"));
    local.append(create("h3", "기준 Description"), overview);

    screen.specs.forEach(([item, type, defaultValue, detail, destination]) => {
      const card = create("article", "", "annotation-card");
      const list = create("dl", "", "annotation-spec");
      const fields = [["항목", item], ["유형", type], ["기본값", defaultValue], ["필수여부", "입력 없음"], ["기능상세", detail]];
      if (destination) fields.push(["이동·연결 대상", destination]);
      fields.forEach(([label, value]) => list.append(create("dt", label), create("dd", value)));
      card.append(list);
      local.append(card);
    });

    shared.querySelector(".annotation-screen-overview")?.after(local);
  }

  new MutationObserver(render).observe(panel, { childList: true });
  render();
})();
