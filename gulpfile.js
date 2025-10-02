import { src, dest, watch, parallel, series } from "gulp";
import gulpSass from "gulp-sass";
import * as sass from "sass";
import concat from "gulp-concat";
import uglifyEs from "gulp-uglify-es";
import browserSyncLib from "browser-sync";
import autoprefixer from "gulp-autoprefixer";
import webp from "gulp-webp";
import imagemin, { mozjpeg, optipng, svgo } from "gulp-imagemin";
import newer from "gulp-newer";
import svgSprite from "gulp-svg-sprite";
import fonter from "gulp-fonter";
import ttf2woff2 from "gulp-ttf2woff2";
import include from "gulp-include";
import { deleteAsync } from "del";
import fileInclude from "gulp-file-include";

const scss = gulpSass(sass);
const uglify = uglifyEs.default;
const browserSync = browserSyncLib.create();

export const styles = () => {
  return src("src/scss/**/*.scss", { sourcemaps: true })
    .pipe(scss({ style: "compressed" }))
    .pipe(
      autoprefixer({
        overrideBrowserslist: ["last 3 versions"],
        cascade: false,
      })
    )
    .pipe(concat("style.min.css"))
    .pipe(dest("./docs/css", { sourcemaps: "." }))
    .pipe(browserSync.stream());
};

export const scripts = () => {
  return src("src/js/**/*.js")
    .pipe(concat("main.min.js"))
    .pipe(uglify())
    .pipe(dest("docs/js"))
    .pipe(browserSync.stream());
};

export const pages = () => {
  return src("src/pages/**/*.html")
    .pipe(
      fileInclude({
        prefix: "@@",
        basepath: "@file",
      })
    )
    .pipe(dest("docs/"))
    .pipe(browserSync.stream());
};
export const components = () => {
  return src("src/components/**/*.html")
    .pipe(fileInclude({ prefix: "@@", basepath: "@file" }))
    .pipe(dest("docs/components"))
    .pipe(browserSync.stream());
};

export const images = () => {
  return src("src/images/**/*.{jpg,jpeg,png,webp}", { encoding: false })
    .pipe(newer("docs/images"))
    .pipe(webp({ quality: 50 }))
    .pipe(
      imagemin([
        mozjpeg({ quality: 50, progressive: true }),
        optipng({ optimizationLevel: 3 }),
        svgo({ plugins: [{ name: "removeViewBox", active: false }] }),
      ])
    )
    .pipe(dest("docs/images"))
    .pipe(browserSync.stream());
};

export const sprite = () => {
  return src("src/images/**/*.svg")
    .pipe(
      svgSprite({
        mode: {
          stack: {
            sprite: "../sprite.svg",
            example: true,
          },
        },
      })
    )
    .pipe(dest("docs/images/"));
};

export const fonts = () => {
  return src("src/fonts/*", { encoding: false })
    .pipe(
      fonter({
        formats: ["woff"],
      })
    )
    .pipe(dest("docs/fonts/"))

    .pipe(src("src/fonts/*", { encoding: false }))
    .pipe(ttf2woff2())
    .pipe(dest("docs/fonts/"));
};

export const reset = () => {
  return deleteAsync("./docs");
};

export const watching = () => {
  browserSync.init({
    server: {
      baseDir: "docs/",
    },
  });
  watch(["src/scss/**/*.scss"], styles);
  watch(["src/js/**/*.js"], scripts);
  watch(["src/images/**/*.{jpg,jpeg,png,webp}"], images);
  watch(["src/components/**/*.html", "src/pages/**/*.html"], pages);
  watch(["src/**/*.html"]).on("change", browserSync.reload);
};

const mainTasks = series(
  fonts,
  sprite,
  parallel(pages, components, styles, scripts, images)
);
const dev = series(reset, mainTasks, parallel(watching));
export default dev;
