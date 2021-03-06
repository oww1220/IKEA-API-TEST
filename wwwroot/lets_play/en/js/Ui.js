let UI;
(function (UI) {
    UI.$ = jQuery;
    
    UI.playGame = (()=>
    {
      const initialState = {
        start: false,
        questions: null,
        complete: false,
      };
      const step1Length = UI.$('.step1 .contList').length;
      return {
        state: initialState,
        initState(){
          console.log('arr??', this.state.questions, initialState.questions);
          if(!this.state.questions) this.createQuestionArray();
          const chkSession = this.getSession();
          if(!chkSession) return;
          
          //게임 스타트 유무 확인
          if(this.state.start) {
            this.removeIntro();
            this.checkEndQuestion();
            this.initShowQuestion();
          }
        },

        // 이미 선택완료한 캐릭터체크
        checkEndQuestion() {
          if(!this.state.questions) return;
          let completeChk = 0;
          this.state.questions.forEach(({end}, idx)=>{
            //console.log(end , idx);
            if(end) {
              UI.$('.quizGame .step1 .contList').eq(idx).addClass('active');
              completeChk++;
            }
          });

          if(step1Length === completeChk) {
            //console.log(completeChk);
            this.state.complete = true;
            this.updateState({complete: true});
            this.goComplete();
          }
        },

        calcRandom() {
          console.log(this.state.complete);
          if(this.state.complete) return;
          const random = Math.floor(Math.random() * step1Length);
          const chkRandom = this.state.questions[random].end;
          console.log('randomCurrent :', random, chkRandom);

          if(chkRandom) {
            return this.calcRandom();
          }

          return random;
        },


        initShowQuestion() {
          const random = this.calcRandom();
          UI.$('.quizGame .step1 .questions').removeClass('active');
          UI.$('.quizGame .step1 .contList').eq(random).find('.questions').addClass('active');
        },

        // 인트로 제거
        removeIntro() {
          UI.$('.quizGame .intro').removeClass('active');
          UI.$('.quizGame .step1').addClass('active');
        },
        
        // step1-->step2
        upstairStep(idx) {
          console.log('failureArea :', idx);
          UI.$('.quizGame .step1').removeClass('active');
          UI.$('.quizGame .step2').addClass('active');
          UI.$('.quizGame .step2 .failureArea .characterSection > div').eq(idx).addClass('active');
        
        },

        // step2-->step1
        downstairStep() {
          UI.$('.quizGame .step2').removeClass('active');
          UI.$('.quizGame .step1').addClass('active');
          UI.$('.quizGame .step2 .failureArea .characterSection > div').removeClass('active');
        },

        // 완료페이지로
        goComplete() {
          UI.$('.quizGame .step1').removeClass('active');
          UI.$('.quizGame .step2').removeClass('active');
          UI.$('.quizGame .complete').addClass('active');
        },

        resetGames() {
          UI.$('.quizGame .step1 .contList').removeClass('active');
          UI.$('.quizGame .complete').removeClass('active');
          UI.$('.quizGame .intro').addClass('active');
          this.resetState()
        },

        // 질문 상태배열 초기화
        createQuestionArray() {
          initialState.questions = [];
          for(let i = 0; i < step1Length; i++) {
            initialState.questions[i] = {
              end: false,
            };
          }
        },
        
        //reset상태
        resetState() {
          this.state = initialState;
          //sessionStorage.removeItem('gameState');
          this.updateState(initialState);
          console.log('reset :', this.state);
        },

        // 상태업데이트 
        updateState(param) {
          //console.log(param);
          this.state = {
            ...this.state,
            ...param,
          }
          console.log('updateState :', initialState, this.state);
          this.updateSession(this.state);
        },

        // 세션 업데이트
        updateSession(param) {
          sessionStorage.setItem('gameState', JSON.stringify(param));
        },

        // 세션 가져오기
        getSession() {
          const data = sessionStorage.getItem('gameState');
          //console.log('data', data);
          if(data) {
            this.state = JSON.parse(data);
            return true;
          }
          else {
            return false;
          }
        },


      }
  })(),


    UI.Async = {
        generaterRun(iter) {
            return (function iterate({ value, done }) {
                if (done)
                    return value;
                if (value.constructor === Promise) {
                    return value.then((data) => iterate(iter.next(data))).catch((err) => iter.throw(err));
                }
                else {
                    return iterate(iter.next(value));
                }
            })(iter.next());
        },
        wait(ms, value) {
            return new Promise((resolve) => setTimeout(resolve, ms, value));
        },
        promise(callback) {
            return new Promise((resolve, reject) => {
                callback(resolve, reject);
            });
        },
        debounce(f, interval) {
            let timer = null;
            return (...args) => {
                clearTimeout(timer);
                return new Promise((resolve) => {
                    timer = setTimeout(() => resolve(f(...args)), interval);
                });
            };
        },
        throttling(f, interval) {
            let timer = null;
            return (...args) => {
                return new Promise((resolve) => {
                    if (!timer) {
                        timer = setTimeout(() => {
                            resolve(f(...args));
                            timer = null;
                        }, interval);
                    }
                });
            };
        },
    };
    UI.Fn = {
        filter: function* (f, iter) {
            for (const a of iter) {
                if (f(a))
                    yield a;
            }
        },
        map: function* (f, iter) {
            for (const a of iter) {
                yield f(a);
            }
        },
        take: function (length, iter) {
            let res = [];
            for (const a of iter) {
                res.push(a);
                if (res.length === length)
                    return res;
            }
            return res;
        },
        reduce: function (f, acc, iter) {
            for (const a of iter) {
                acc = f(acc, a);
            }
            return acc;
        },
    };
})(UI || (UI = {}));