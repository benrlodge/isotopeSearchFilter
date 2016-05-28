var gulp = require('gulp');
var coffee = require('gulp-coffee');

gulp.task('scripts', function() {
  console.log('do it')
  gulp.src('./src/coffee/*.coffee')
    .pipe(coffee({bare: true}))
    .pipe(gulp.dest('./dist'))
    .pipe(gulp.dest('./demo/javascripts'))
});

gulp.task('watch', function() {
  gulp.watch('./src/coffee/*.coffee', ['scripts']);
  gulp.watch('./src/sass/*.sass', ['sass']);
});

gulp.task('default', ['scripts', 'watch']);
