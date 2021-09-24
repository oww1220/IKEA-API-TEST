let UI;
(function (UI) {
    UI.$ = jQuery;
    
    UI.playGame = (()=>
    {
      const initialState = {
        start: false,
        questions: null,
      };
      const step1Length = UI.$('.step1 .contList').length;
      return {
        state: initialState,
        initState(){
          //console.log(this.getSession());
          if(!this.state.questions) this.createQuestionArray();



          if(!this.getSession()) return;
          
          //게임 스타트 유무 확인
          if(this.state.start) this.removeIntro();
          

          this.initShowQuestion();
          
          
        },

        initShowQuestion() {
          const random = Math.floor(Math.random() * step1Length);
          console.log(random);
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
          console.log(idx);
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

        // 질문 상태배열 초기화
        createQuestionArray() {
          //const length = UI.$('.step1 .contList').length;
          //console.log(step1Length)
          this.state.questions = [];
          for(let i = 0; i < step1Length; i++) {
            this.state.questions[i] = {
              end: false,
            };
          }
        },

        // 상태업데이트 
        updateState(param) {
          //console.log(param);
          this.state = {
            ...this.state,
            ...param,
          }
          console.log(initialState, this.state);
          this.updateSession(this.state);
        },

        // 세션 업데이트
        updateSession(param) {
          sessionStorage.setItem('gameState', JSON.stringify(param));
        },

        // 세션 가져오기
        getSession() {
          const data = sessionStorage.getItem('gameState');
          //console.log(data);
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