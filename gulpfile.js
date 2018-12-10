const gulp = require('gulp');
const uglify = require('gulp-uglify-es').default;
const imagemin = require('gulp-imagemin');
const babel = require('gulp-babel');
const useref = require('gulp-useref');
const browserSync = require('browser-sync').create();

gulp.task('images', () => gulp.src('app/img/**/*.+(png|jpg|jpeg|svg)')
  .pipe(imagemin())
  .pipe(gulp.dest('dist/img')));

gulp.task('copy', () => {
  gulp.src('./app/css/*')
    .pipe(gulp.dest('./dist/css'));
});

gulp.task('copy-font', () => {
  gulp.src('./app/font/*')
    .pipe(gulp.dest('./dist/font'));
});

gulp.task('useref', () => gulp.src('app/**/*.html')
  .pipe(useref())
  .pipe(gulp.dest('dist')));

gulp.task('browserSync', () => {
  browserSync.init({
    server: {
      baseDir: 'dist',
    },
  });
});

gulp.task('babel', () => gulp.src('app/**/*.js')
  .pipe(babel())
  .pipe(gulp.dest('app')));

gulp.task('watch', ['browserSync'], () => {
  gulp.watch('app/**/*.html', browserSync.reload);
  gulp.watch('app/**/*.js', browserSync.reload);
  gulp.watch('app/css/**/*.css', browserSync.reload);
});

gulp.task('default', ['copy', 'babel', 'copy-font', 'images', 'useref']);
