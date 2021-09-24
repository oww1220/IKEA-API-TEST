const BASE_URL = `./wwwroot`;
const gulp = require('gulp');


/*view server*/
const browserSync = require('browser-sync').create();
    //서버실행

/*scss, css*/
const sass = require('gulp-sass');
sass.compiler = require('node-sass');
const autoprefixer = require('gulp-autoprefixer');
const modifyCssUrls = require('gulp-modify-css-urls');
const pxtorem = require('gulp-pxtorem');
const cssnano = require('gulp-cssnano');
const sourcemaps = require('gulp-sourcemaps');

/* babel */
const concat = require('gulp-concat');
const changed = require('gulp-changed');
const babel = require('gulp-babel');
const babel_polyfill_url = './node_modules/@babel/polyfill/browser.js';

/*오류 처리*/
const plumber = require('gulp-plumber');

const errorHandler = (error)=>{
    console.error(error.message);
    this.emit('end');
};
const plumberOption = {
    errorHandler: errorHandler,
};

const URL = 'posfeed';
const TASK_BASE_URL = `./wwwroot/${URL}/assets`;


gulp.task('babel', ()=> 
    gulp
    .src([babel_polyfill_url, './wwwroot/lets_play/en/js/**/*.js' ], {
        sourcemaps: true
    })
    .pipe(
        babel()
    )
    .pipe(concat('common_quizgame.js'))
    .pipe(
        gulp.dest('./wwwroot/lets_play/en/', {
            sourcemaps: './maps'
        })
    )
    .pipe(browserSync.reload({ stream: true }))
);

gulp.task('sass', ()=>
    gulp
    .src(`${TASK_BASE_URL}/scss/**/*.scss`)
    .pipe(plumber(plumberOption))
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(
        sass({
            outputStyle: 'compressed', //[nested, compact, expanded, compressed]
            //indentType: 'tab',
            //indentWidth: 1,
        }).on('error', sass.logError)
    )
    .pipe(cssnano({zindex: false}))
    .pipe(
        autoprefixer({
            cascade: true,
        })
	)
    .pipe(sourcemaps.write('./maps'))
    .pipe(gulp.dest(`${TASK_BASE_URL}/styles`))
    .pipe(browserSync.reload({ stream: true }))
);


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

    // watch sass
    gulp.watch(
        `${TASK_BASE_URL}/scss/**/*.scss`,
        gulp.series('sass')
    );

    // watch babel
    gulp.watch(
        `./wwwroot/lets_play/en/js/**/*.js`,
        gulp.series('babel')
    );
    
});

// task 묶어서 실행
gulp.task(
    'default',
    gulp.series('sass','babel', 'watch')
);