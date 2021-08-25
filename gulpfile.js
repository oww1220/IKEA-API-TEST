const BASE_URL = `./wwwroot`;
const gulp = require('gulp');


/*view server*/
const browserSync = require('browser-sync').create();
    //서버실행



// watch: 소스 옵져빙(소스변경 감지해서 task실행및 서버 재시작)
gulp.task('watch', ()=> {
    browserSync.init({
        //logLevel: 'debug',
        port: 3339,
        open: false,
        directory: true,
        server: './wwwroot/',
        browser: 'google chrome',
    });
    // watch html
    gulp.watch(`${BASE_URL}/**/*.*`).on('change', browserSync.reload);
    
});

// task 묶어서 실행
gulp.task(
    'default',
    gulp.series('watch')
);