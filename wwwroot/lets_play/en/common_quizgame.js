$(document).ready(function() {
  // 임시
  $(document).on({
    click : function(){
      $(this).closest('.intro').removeClass('active').siblings('.step1').addClass('active');
    }
  },'.intro .btnArea .startBtn');

  /*
  // 정답 일 경우
  $(document).on({
    click : function(){
      $(this).closest('.contList').addClass('active');
    }
  },'.step1 .chBtn'); */

  // 오답 일 경우
  $(document).on({
    click : function(){
      $(this).addClass('notAc');
      setTimeout(function(){
        $('.step1').removeClass('active').siblings('.step2').addClass('active');
      },1000);
    }
  },'.step1 .chBtn');


  // Replay 버튼 클릭 시
  $(document).on({
    click : function(){
      $(this).closest('.complete').removeClass('active').siblings('.intro').addClass('active');
    }
  },'.complete .btnArea .replayBtn');
});