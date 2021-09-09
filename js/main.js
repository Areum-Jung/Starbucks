// HEADER searchBox 돋보기 아이콘 클릭시에도 input CSS효과 포함시키기 ---------------------------------------------------------
const searchEl = document.querySelector('.search');
const searchInputEl = searchEl.querySelector('input');  // document.querySelector('.search input'); 와 같은 의미 => 찾아놓은 요소(searchEl)에서 최적화해서 찾는게 좋음

searchEl.addEventListener('click', function() {
  searchInputEl.focus();
});

// searchBox에 focus되었을때, placeholder 추가 --------------------------------------------------------------------------------
searchInputEl.addEventListener('focus', function() {
  searchEl.classList.add('focused');
  searchInputEl.setAttribute('placeholder', '통합검색');   // 속성을 지정(추가)할 때 사용
});

// searchBox에 focus 해제되었을때, placeholder 제거
searchInputEl.addEventListener('blur', function() {
  searchEl.classList.remove('focused');
  searchInputEl.setAttribute('placeholder', '');   // 속성을 지정(추가)할 때 사용
});


// 스크롤 조정시 오른쪽 배지 숨기기 (일정기준 초과시 사라짐) ------------------------------------------------------------------
// 스크롤을 한번 실행할 때마다 함수가 호출됨 => 많은 함수들이 동시에 실행이 가능 => 프로젝트가 무거워짐 => 화면이 버벅임 => 실행되는 함수의 수를 JS라이브러리 통해 제어해줌
const badgeEl = document.querySelector('header .badges');

 // _.throttle(함수, 시간) - loadsh에서 제공하는 기능
window.addEventListener('scroll', _.throttle(function() { // window 즉, 화면 자체에 이벤트를 부여하여 함수호출 
  console.log(window.scrollY);
  if(window.scrollY > 500) {

    // <1> 배지 숨기기- 시각적으로만 사라짐
    // 1. CSS 효과로 적용
    // badgeEl.style.display = 'none';
    // 2. gsap.to(요소, 지속시간(s단위), 옵션);
    gsap.to(badgeEl, .6, {
      // 객체 데이터
      opacity: 0,
      display: 'none'   // 문자 데이터는 ''로 표기
    });

    // <2> 위로가기 버튼 보이기
    gsap.to('#to-top', .2, {    /* 배지처럼 찾은 요소를 변수에 담아 사용할 수 있지만, 클래스 선택자로도 충분히 사용가능 */
      x: 0  /* 원래 위치 */
    });

  } else {

    // <1> 배지 보이기
    gsap.to(badgeEl, .6, {
      opacity: 1,
      display: 'block'
    });

    // <2> 위로가기 버튼 숨기기
    gsap.to('#to-top', .2, {    
      x: 100  /* 위치이동으로 숨겨짐 */
    });   

  }
}, 300));  /* 0.3초마다 부하를 주어서 한번에 많은 양이 실행되는걸 방지 (1000밀리세컨드 = 1s -> 0.3초를 의미) */

// 위로가기 버튼 누르면 맨위로 이동 -> ScrollToPlugin CDN 추가시 가능
const toTopEl = document.querySelector('#to-top');
toTopEl.addEventListener('click', function() {
  gsap.to(window, .7, {   /* window(출력되고있는 화면 자체를 의미)객체를 인수로 처리 */
    scrollTo: 0           /* 스크롤위치를 0px로 이동 */
  });        
});


// 배너 섹션부분 이미지 순차적으로 보이기 -----------------------------------------------------------------------------------
const fadeEls = document.querySelectorAll('.visual .fade-in');

fadeEls.forEach(function(fadeEl, index) {
  gsap.to(fadeEl, 1, {
    delay: (index + 1) * .7,    /* fade-in 네개의 요소의 인덱스에 따라 딜레이 적용 (0.7 1.4 2.1 2.8) */
    opacity: 1
  });
});


// 공지사항/프로모션 스와이퍼(17, 32강 참고) -----------------------------------------------------------------------------------------------
// swiper(선택자, 옵션)
new Swiper('.notice-line .swiper-container', {
  // 객체 데이터
  direction: 'vertical',
  autoplay: true,           // 자동재생여부
  loop: true                // 반복재생여부 (1-2-3-4-1-2-3-4-1 ...)
});

new Swiper('.promotion .swiper-container', {
  // direction: 'horizontal' => swiper 함수에 기본값으로 들어가있음
  slidesPerView: 3,        // 한번에 보여줄 슬라이드 개수
  spaceBetween: 10,        // 슬라이드 사이 여백
  centeredSlides: true,    // 1번 슬라이드가 가운데 보이기
  loop: true,              // 반복재생여부
  autoplay: {              // 자동재생여부 - 5s
    delay: 5000       
  },
  pagination: {
    el: '.promotion .swiper-pagination',   //페이지 번호 요소 선택자
    clickable: true   //사용자의페이지 번호 요소 제어가능 여부 (클릭가능 여부)
  },
  navigation: { // 슬라이드 이전/다음 버튼 사용 여부
    prevEl: '.promotion .swiper-prev',
    nextEl: '.promotion .swiper-next'
  }
});

// 하단 수상이력 이미지 슬라이드
new Swiper('.awards .swiper-container', {
  // direction: 'horizontal', // 수평 슬라이드
  autoplay: true, // 자동 재생 여부
  loop: true, // 반복 재생 여부
  spaceBetween: 30, // 슬라이드 사이 여백
  slidesPerView: 5, // 한 번에 보여줄 슬라이드 개수
  // slidesPerGroup: 5, // 한 번에 슬라이드 할 개수(전체 개수로 나뉘어야 함)
  navigation: { // 슬라이드 이전/다음 버튼 사용 여부
    prevEl: '.awards .swiper-prev', // 이전 버튼 선택자
    nextEl: '.awards .swiper-next' // 다음 버튼 선택자
  }
})


// 프로모션 토글 -------------------------------------------------------------------------------------------------------------
const promotionEl = document.querySelector('.promotion');  // 슬라이드 요소
const promotionToggleBtn = document.querySelector('.toggle-promotion'); // 슬라이드 토글버튼
let isHidePromotion = false;

promotionToggleBtn.addEventListener('click', function() {
  isHidePromotion = !isHidePromotion;     // 지속적으로 반대값을 전환
  if(isHidePromotion) {
    // true = 숨김처리
    promotionEl.classList.add('hide');

  } else {
    // false = 보임처리
  promotionEl.classList.remove('hide');  
  }
});


// 범위 랜덤 함수(소수점 2자리까지) - 25강 참고 ------------------------------------------------------------------------------
function random(min, max) {
  // `.toFixed()`를 통해 반환된 문자 데이터를,
  // `parseFloat()`을 통해 소수점을 가지는 숫자 데이터로 변환
  return parseFloat((Math.random() * (max - min) + min).toFixed(2))
}

// 이미지 둥둥 띄우기 애니메이션 효과 
function floatingObject(selector, delay, size) {   // selector - 매개변수(임의지정) => CSS선택자를 인수로 받을거임
  // gsap.to(요소, 시간, 옵션)
  gsap.to(selector, random(1.5, 2.5), { // 지속시간은 random함수를 이용해 랜덤한 숫자를 받음
    y: size,                            // y축 값
    repeat: -1,                         // 반복횟수를 무한반복으로 지정
    yoyo: true,                         // 재생된 애니메이션을 원위치로 돌아오는 속성
    ease: Power1.easeInOut,             // gsap easing 라이브러리 - easy out 타입 - power1 적용
    delay: random(0, delay)
  });
}

floatingObject('.floating1', 1, 15);  // 공통선택자를 인수로 지정
floatingObject('.floating2', .5, 15);
floatingObject('.floating3', 1.5, 20);



// 요소가 화면에 보여짐 여부에 따른 요소 관리 (ScrollMagic 라이브러리) ----------------------------------------------------------
// 중간 이미지 섹션에 일정기준으로 보여지는 순서를 적용하기위함
// 관리할 요소들 검색!
const spyEls = document.querySelectorAll('section.scroll-spy')
// 요소들 반복 처리!
spyEls.forEach(function (spyEl) {
  new ScrollMagic                         // 메서드 체이닝
    .Scene({                              // 감시할 장면(Scene)을 추가 
      triggerElement: spyEl,              // 보여짐 여부를 감시할 요소를 지정
      triggerHook: .8                     // 화면(뷰포트)의 80% 지점에서 보여짐 여부 판단(뷰포트 기준 맨위:0/맨아래:1이 됨)
    })
    .setClassToggle(spyEl, 'show')        // 요소가 화면에 보여진다고 판단이 되면 show 클래스 추가
    .addTo(new ScrollMagic.Controller())  // 컨트롤러에 장면을 할당(필수!)
});



// 푸터 카피라이트 부분 - 올해 년도수 계산 -----------------------------------------------------------------------------------
 const thisYear = document.querySelector('.this-year');
 thisYear.textContent = new Date().getFullYear();        // textConten - 콘텐츠를 알아내거나 지정하기 위한 속성


 // 추가기능 ===================================================================================================================
 // 플로팅 배지 닫기버튼 만들기
 const closeBtn1 = document.querySelector('header .closeBtn_1');
 const closeBtn2 = document.querySelector('header .closeBtn_2');

 closeBtn1.addEventListener('click', function() {
  document.querySelector('header .badge_1').style.display = 'none';
 });

 closeBtn2.addEventListener('click', function() {
  document.querySelector('header .badge_2').style.display = 'none';
 });

// const closeBtn = document.querySelectorAll('header .badge-close');
 
// closeBtn.addEventListener('click', function() {
//   console.log('이야호');

//   for(let i=0; i<closeBtn.length; i++) {
//     if(i=1) {
//       document.querySelector('header .badge_1').style.display = 'none';
//     } else {
//       document.querySelector('header .badge_2').style.display = 'none';
//     }
//   }
// });
