var gulp = require('gulp')
var sass = require('gulp-sass')
var postcss = require('gulp-postcss')
var autoprefixer = require('autoprefixer')
var cssnano = require('cssnano')

var postcssPlugins = [
  autoprefixer({
    browsers: ['ie > 9', 'last 2 versions'],
    cascade: false
  }),
  cssnano()
]

gulp.task('github', function () {
  return gulp.src('./scss/github.scss')
    .pipe(sass.sync())
    .pipe(postcss(postcssPlugins))
    .pipe(gulp.dest('../lib'))
})
