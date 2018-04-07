var gulp             = require('gulp'),
    sass             = require('gulp-sass'),
    autoprefixer     = require('gulp-autoprefixer'),
    sourcemaps       = require('gulp-sourcemaps'),
    rename           = require('gulp-rename'),
    browserSync      = require('browser-sync').create();



gulp.task('sass', function(){
    // sass directory
    return gulp.src('./style/*scss')
            .pipe(sass())
            //outputstyle (nested, compact, expanded, compressed)
            .pipe(sass({outputStyle:'compact'}).on('error', sass.logError))
            // sourcemaps
            .pipe(sourcemaps.init())
            // sourcemaps output directory
            .pipe(sourcemaps.write(('./')))
            // css output directory
            .pipe(gulp.dest('./style')),
            // watch file
            gulp.watch('./style/*.scss', ['sass']);
});


// sass/css browser tracking
gulp.task('browser-sync', function(){
    browserSync.init({
        server:{
            baseDir: './'
        }
    });
    // watch html
    gulp.watch('./*.html').on('change', browserSync.reload);
});

// gulp default (sass, minify-css, browser-sync) method
gulp.task('default', ['sass', 'browser-sync']);
