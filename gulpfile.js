const BASE_URL = `./wwwroot`;
const gulp = require('gulp');


/*view server*/
const browserSync = require('browser-sync').create();
    //서버실행
browserSync.init({
    //logLevel: 'debug',
    port: 3339,
    open: false,
    directory: true,
    server: './wwwroot/',
    browser: 'google chrome',
});


// watch: 소스 옵져빙(소스변경 감지해서 task실행및 서버 재시작)
gulp.task('watch', ()=> {
    // watch html
    gulp.watch(`${BASE_URL}/**/*.html`).on('change', browserSync.reload);
    // watch css
    gulp.watch(`${BASE_URL}/assets/**/*.css`).on('change', browserSync.reload);
    // watch js
    gulp.watch(`${BASE_URL}/assets/**/*.js`).on('change', browserSync.reload);
});

// task 묶어서 실행
gulp.task(
    'default',
    gulp.series('watch')
);