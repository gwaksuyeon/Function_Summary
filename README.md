## 기능 정리
- 직접 만들어 본 기능 구현
- https://gwaksuyeon.github.io/Function_Summary/

1. 룰렛
  - react-custom-roulette 라이브러리 사용 및 커스텀
  - 룰렛 버튼을 누를 때 미리 당첨결과를 서버에서 정한 후, 룰렛 돌림

2. 공유하기
  - kakao, facebook, twitter, kakaostory, naver, url복사

3. 테이블
  - 리스트 pagination 구현
  - 한 페이지당 몇 개 보일지, 페이지네이션 개수는 몇 개 보일지 설정 가능

4. 무한스크롤
  - scroll값을 계산하여 사용하기엔 너무 많은 호출 필요
  - IntersectionObserver로 감시하여 호출
  - LazyImage로 이미지 최적화

5. 무한페이징
  - 더보기 버튼을 클릭하여 다음 데이터 호출

6. 접속권한
  - 체크박스로 권한 설정

7. 에디터
  - toast-ui/react-editor 사용
  - 미리보기 기능 추가

8. 순서변경
  - react-beautiful-dnd 사용
  - json파일을 지원해줌, 기능 많음
  - 가로 / 세로 순서 변경 가능

9. CSV
  - react-csv 사용
  - json데이터를 가공하여 csv파일로 다운

10. Chart
  - @nivo/pie, @nivo/line 사용
  - 커스텀 용이

11. 팝업공지
  - localStorage를 사용해 현재시간이 보지않겠다는 시간 이전이면 보이지 않도록 설정

12. 상품옵션
  - 조합형, 분리형, 비옵션으로 상품 옵션 선택 및 수량, 금액 계산
  - 조함형
    - 색상 선택 + 사이즈 선택하여 하나의 상품선택
  - 분리형
    - 개별 상품 선택 + 개별 상품 선택하여 두가지의 상품으로 세트 생성
    - 옵션을 1개만 설정하면 1개의 옵션만 선택
  - 비옵션
    - 옵션 없이 선택

