  // 2. This code loads the IFrame Player API code asynchronously.
  var tag = document.createElement('script');

  tag.src = "https://www.youtube.com/iframe_api";
  var firstScriptTag = document.getElementsByTagName('script')[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

  // 3. This function creates an <iframe> (and YouTube player)
  //    after the API code downloads.
  function onYouTubeIframeAPIReady() { // 유튜브재생 라이브러리가 제공해주는 함수로 함수명 변경X
    new YT.Player('player', {     // id값이 'player'인 요소를 찾음
      videoId: 'An6LvWQuj_8',     // 최초 재생할 유튜브 영상 ID
      playerVars: {               // 영상을 재생하기위한 여러가지 변수들
        autoplay: true,           // 자동재생여부
        loop: true,               // 반복재생여부
        playlist: 'An6LvWQuj_8'   // 반복 재생할 유튜브 영상 ID목록을 명시해줘야함
      },
      events: {
        // 메소드
        // 영상이 준비되었을 때,
        onReady: function(event) {  // 함수의 event라는 인수로 영상이 재생되는 상황들을 받아서 넣음
          event.target.mute();    // 현재 재생하는 영상 음소거
        }
      }
    });
  }