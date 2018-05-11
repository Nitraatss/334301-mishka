"use strict";

let gulp = require("gulp");
let sass = require("gulp-sass");
let plumber = require("gulp-plumber");
let postcss = require("gulp-postcss");
let autoprefixer = require("autoprefixer");
let minify = require("gulp-csso");
let rename = require("gulp-rename");
let imagemin = require("gulp-imagemin");
let webp = require("gulp-webp");
let svgstore = require("gulp-svgstore");
let htmlmin = require("gulp-htmlmin");
let posthtml = require("gulp-posthtml");
let include = require("posthtml-include");
let babel = require("gulp-babel");
let uglify = require("gulp-uglify");
let del = require("del");
let run = require("run-sequence");
let server = require("browser-sync").create();

gulp.task("style", function() {
  gulp.src("source/sass/style.scss")
    .pipe(plumber())
    .pipe(sass())
    .pipe(postcss([
      autoprefixer({
        browsers: [
          "last 1 version",
          "last 2 Chrome versions",
          "last 2 Firefox versions",
          "last 2 Opera versions",
          "last 2 Edge versions"
        ]}
      )
    ]))
    .pipe(gulp.dest("build/css"))
    .pipe(minify())
    .pipe(rename("style.min.css"))
    .pipe(gulp.dest("build/css"))
    .pipe(server.stream());
});

gulp.task("images", function() {
  return gulp.src("source/img/**/*.{png,jpg,svg}")
    .pipe(imagemin([
      imagemin.optipng({optimizationLevel: 3}),
      imagemin.jpegtran({progressive: true}),
      imagemin.svgo()
    ]))
    .pipe(gulp.dest("source/img"))
});

gulp.task("prepareSpriteSVGs", function() {
  return gulp.src([
    "source/img/icon-cart.svg",
    "source/img/icon-search.svg",
    "source/img/icon-feature-*.svg",
    "source/img/icon-camera.svg",
    "source/img/icon-phone.svg",
    "source/img/icon-mail.svg",
    "source/img/icon-twitter.svg",
    "source/img/icon-fb.svg",
    "source/img/icon-insta.svg",
    "source/img/htmlacademy.svg",
    "source/img/logo-footer.svg"
    ])
    .pipe(imagemin([
      imagemin.svgo(
        {
          plugins: [
            {removeAttrs: {attrs:["fill"]}}
          ]
        }
      )
    ]))
    .pipe(gulp.dest("source/img"))
});

gulp.task("webp", function() {
  return gulp.src("source/img/**/*.{png,jpg}")
    .pipe(webp({quality: 90}))
    .pipe(gulp.dest("build/img"))
});

gulp.task("sprite", function() {
  return gulp.src([
    "source/img/icon-cart.svg",
    "source/img/icon-search.svg",
    "source/img/icon-feature-*.svg",
    "source/img/icon-video.svg",
    "source/img/icon-phone.svg",
    "source/img/icon-mail.svg",
    "source/img/icon-twitter.svg",
    "source/img/icon-fb.svg",
    "source/img/icon-insta.svg",
    "source/img/htmlacademy.svg",
    "source/img/logo-footer.svg"
  ])
    .pipe(svgstore({
      inlineSvg: true
    }))
    .pipe(rename("sprite.svg"))
    .pipe(gulp.dest("source/img"))
});


gulp.task("html", function() {
  return gulp.src("source/*.html")
    .pipe(posthtml([
      include()]))
    .pipe(gulp.dest("build"))
});

gulp.task("minifyHTML", function() {
  return gulp.src("build/*.html")
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest("build"));
});

gulp.task("minifyJS", () => {
  return gulp.src([
    "source/js/catalog-modal.js",
    "source/js/index-modal.js",
    "source/js/mobile-menu.js"
  ])
    .pipe(babel({
      presets: ["env"]
    }))
    .pipe(uglify())
    .pipe(rename({suffix: ".min" }))
    .pipe(gulp.dest("build/js/"));
});

gulp.task("copy", function() {
  return gulp.src([
      "source/fonts/**/*.{woff,woff2}",
      "source/img/**",
      "source/js/**",
    ], {
      base: "source"
    })
    .pipe(gulp.dest("build"))
});

gulp.task("clean", function() {
  return del("build");
});

gulp.task("build", function(done) {
  run("clean", "style", "images", "prepareSpriteSVGs", "sprite", "webp", "minifyJS", "copy", "html", "minifyHTML", done);
})

gulp.task("serve", function() {
  server.init({
    server: "build/",
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch("source/sass/**/*.{scss,sass}", ["style"]);
  gulp.watch("source/*.html", ["html"]);
});
