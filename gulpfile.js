const gulp = require('gulp');
const eslint = require('gulp-eslint');
const htmlhint = require('gulp-htmlhint');

gulp.task('lint', ['eslint', 'htmlhint']);

gulp.task('eslint', function() {
  return gulp.src(['webclient/**/*', 'webserver/**/*', '!node_modules/**/*', '!webclient/dist/**/*'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

gulp.task('htmlhint', function() {
  return gulp.src(['**/*.html', '!node_modules/**/*'])
  .pipe(htmlhint({htmlhintrc: '.htmlhintrc'}))
  .pipe(htmlhint.failReporter());
});
