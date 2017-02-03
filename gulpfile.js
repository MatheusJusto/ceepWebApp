var gulp     = require('gulp'),
    prefixer = require('gulp-autoprefixer'),
    watch    = require('gulp-watch'),
    sass     = require('gulp-sass');





gulp.task('copy', function() {
    return gulp.src('src/**/*').pipe(gulp.dest('dist'));
});


gulp.task('prefix', ['copy'],function() {
    return gulp.src('dist/css/*.css')
               .pipe(prefixer({
                  browsers: ['last 2 versions', 'IE 10']
              }))
              .pipe(gulp.dest('dist/css'));
});

gulp.task('sass', function() {
    return gulp.src('dist/sass/*sass').
                pipe(sass().on('erro', sass.logError))
                .pipe(gulp.dest('dist/css'));
})



gulp.task('watch', function() {
    watch('src/**/*', function() {
        gulp.start('prefix');
    });
});

gulp.task('default', function() {
    gulp.start(prefixer);
    gulp.start(sass);
});
