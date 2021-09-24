$(()=>{

  UI.playGame.initState();

  // 임시
  $(document).on({
    click : function(){
      UI.playGame.removeIntro();
      UI.playGame.initShowQuestion();
      UI.playGame.updateState({start: true});
    }
  },'.intro .btnArea .startBtn');
  
  // 정답, 오답일 경우
  $(document).on({
    click : function(){
      const chkActive = $(this).parent().find('.questions').hasClass('active');
      const idx = $(this).parent().index();
      const that = this;
      console.log(idx, '???');

      if(chkActive) { // 정답인 경우
        UI.Async.generaterRun(
        (function*() {
            $(that).closest('.contList').addClass('active');
            yield UI.Async.wait(500);
            alert('정답입니다.');
            UI.playGame.initShowQuestion();
        })());
      }
      else {
        
        UI.Async.generaterRun(
        (function*() {
          $(that).addClass('notAc');
          yield UI.Async.wait(1000);
          UI.playGame.upstairStep(idx);
          $(that).removeClass('notAc');
          yield UI.Async.wait(3000);
          UI.playGame.downstairStep();
        })());

        
        
      }

    }
  },'.step1 .chBtn'); 



  // Replay 버튼 클릭 시
  $(document).on({
    click : function(){
      $(this).closest('.complete').removeClass('active').siblings('.intro').addClass('active');
    }
  },'.complete .btnArea .replayBtn');

});



