`use strict`;

const gulp = require(`gulp`);
const sass = require(`gulp-sass`);
const plumber = require(`gulp-plumber`);
const postcss = require(`gulp-postcss`);
const autoprefixer = require(`autoprefixer`);
const minify = require(`gulp-csso`);
const rename = require(`gulp-rename`);
const imagemin = require(`gulp-imagemin`);
const webp = require(`gulp-webp`);
const svgstore = require(`gulp-svgstore`);
const posthtml = require(`gulp-posthtml`);
const include = require(`posthtml-include`);
const del = require(`del`);
const run = require(`run-sequence`);
const server = require(`browser-sync`).create();

gulp.task(`style`, function() {
  gulp.src(`source/sass/style.scss`)
    .pipe(plumber())
    .pipe(sass())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(gulp.dest(`build/css`))
    .pipe(minify())
    .pipe(rename(`style.min.css`))
    .pipe(gulp.dest(`build/css`))
    .pipe(server.stream());
});

gulp.task(`images`, function() {
  return gulp.src(`source/img/**/*.{png,jpg,svg}`)
    .pipe(imagemin([
      imagemin.optipng({optimizationLevel: 3}),
      imagemin.jpegtran({progressive: true}),
      imagemin.svgo()
    ]))
    .pipe(gulp.dest(`source/img`))
});

gulp.task(`prepareSpriteSVGs`, function() {
  return gulp.src([
    `source/img/icon-cart.svg`,
    `source/img/icon-search.svg`,
    `source/img/icon-feature-*.svg`,
    `source/img/icon-camera.svg`,
    `source/img/icon-phone.svg`,
    `source/img/icon-mail.svg`,
    `source/img/icon-twitter.svg`,
    `source/img/icon-fb.svg`,
    `source/img/icon-insta.svg`,
    `source/img/htmlacademy.svg`,
    `source/img/logo-footer.svg`
    ])
    .pipe(imagemin([
      imagemin.svgo(
        {
          plugins: [
            {removeAttrs: {attrs:['fill']}}
          ]
        }
      )
    ]))
    .pipe(gulp.dest(`source/img`))
});

gulp.task(`webp`, function() {
  return gulp.src(`source/img/**/*.{png,jpg}`)
    .pipe(webp({quality: 90}))
    .pipe(gulp.dest(`source/img`))
});

gulp.task(`sprite`, function() {
  return gulp.src([
    `source/img/icon-cart.svg`,
    `source/img/icon-search.svg`,
    `source/img/icon-feature-*.svg`,
    `source/img/icon-camera.svg`,
    `source/img/icon-phone.svg`,
    `source/img/icon-mail.svg`,
    `source/img/icon-twitter.svg`,
    `source/img/icon-fb.svg`,
    `source/img/icon-insta.svg`,
    `source/img/htmlacademy.svg`,
    `source/img/logo-footer.svg`
  ])
    .pipe(svgstore({
      inlineSvg: true
    }))
    .pipe(rename(`sprite.svg`))
    .pipe(gulp.dest(`source/img`))
});

gulp.task(`html`, function() {
  return gulp.src(`source/*.html`)
    .pipe(posthtml([
      include()]))
    .pipe(gulp.dest(`build`))
});

gulp.task(`copy`, function() {
  return gulp.src([
      `source/fonts/**/*.{woff,woff2}`,
      `source/img/**`,
      `source/js/**`,
    ], {
      base: `source`
    })
    .pipe(gulp.dest(`build`))
});

gulp.task(`clean`, function() {
  return del(`build`);
});

gulp.task(`build`, function(done) {
  run(`clean`, `style`, `images`, `prepareSpriteSVGs`, `sprite`, `webp`, `copy`, `html`, done);
})

gulp.task(`serve`, function() {
  server.init({
    server: `build/`,
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch(`source/sass/**/*.{scss,sass}`, [`style`]);
  gulp.watch(`source/*.html`, [`html`]);
});
