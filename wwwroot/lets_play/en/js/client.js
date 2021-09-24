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
      if($(this).parent().hasClass('active')){
        alert('캐릭터가 활성화 되었습니다.');
        return;
      }
      const chkActive = $(this).parent().find('.questions').hasClass('active');
      const idx = $(this).parent().index();
      const that = this;
      console.log('clickIdx :', idx);

      if(chkActive) { // 정답인 경우
        UI.Async.generaterRun(
        (function*() {
          const questions = UI.playGame.state.questions
            $(that).closest('.contList').addClass('active');
            yield UI.Async.wait(500);
            questions[idx].end = true;
            //console.log(questions);
            UI.playGame.updateState({questions});
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
      UI.playGame.resetGames();
    }
  },'.complete .btnArea .replayBtn');

});



