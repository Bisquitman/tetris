// gulp
import gulp from 'gulp';
import gulpIf from 'gulp-if';
import browserSync from 'browser-sync';
import plumber from 'gulp-plumber';
import del from 'del';
import rename from 'gulp-rename';
import notify from 'gulp-notify';

// html
import htmlMin from 'gulp-htmlmin';


// css
import sass from 'sass';
import gulpSass from 'gulp-sass';
import sourcemaps from 'gulp-sourcemaps';
import autoprefixer from 'gulp-autoprefixer';
import cleanCSS from 'gulp-clean-css';
import gcmq from 'gulp-group-css-media-queries';
import { stream as critical } from 'critical';

const scss2css = gulpSass(sass);

// js
import webpack from 'webpack-stream';
import terser from 'gulp-terser';

// images
import gulpImage from 'gulp-image';

let dev = false;

const path = {
  src: {
    base: 'src/',
    html: 'src/*.html',
    scss: 'src/scss/**/*.scss',
    js: 'src/js/index.js',
    img: 'src/img/**/*.{jpg,jpeg,gif,svg,png}',
    assets: ['src/assets/**/*.*', 'src/favicon.ico']
  },
  dist: {
    base: 'dist/',
    html: 'dist/',
    css: 'dist/css/',
    js: 'dist/js/',
    img: 'dist/img/',
    cssIndex: 'dist/css/style.min.css',
  },
  watch: {
    html: 'src/*.html',
    scss: 'src/**/*.scss',
    js: 'src/js/**/*.js',
    img: 'src/img/**/*.{jpg,jpeg,gif,svg,png}',
  }
};

export const html = () => gulp
  .src(path.src.html)
  .pipe(plumber(
    notify.onError({
      title: "HTML",
      message: "Error: <%= error.message %>"
    })))
  .pipe(gulpIf(!dev, htmlMin({
    removeComments: true,
    collapseWhitespace: true
  })))
  .pipe(gulp.dest(path.dist.html))
  .pipe(browserSync.stream());

export const scss = () => gulp
  .src(path.src.scss)
  .pipe(plumber(
    notify.onError({
      title: "SCSS",
      message: "Error: <%= error.message %>"
    })))
  .pipe(gulpIf(dev, sourcemaps.init()))
  .pipe(scss2css().on('error', scss2css.logError))
  .pipe(autoprefixer({
    cascade: false,
    grid: "autoplace",
  }))
  .pipe(gcmq())
  .pipe(gulpIf(dev, gulp.dest(path.dist.css)))
  .pipe(cleanCSS({
    2: {
      specialComments: 0,
    }
  }))
  .pipe(rename({ suffix: '.min' }))
  .pipe(gulpIf(dev, sourcemaps.write()))
  .pipe(gulp.dest(path.dist.css))
  .pipe(browserSync.stream());

export const critCSS = () => gulp
  .src(path.dist.html)
  .pipe(critical({
    base: path.dist.base,
    inline: true,
    css: [path.dist.cssIndex],
  }))
  .on('error', (err) => console.error(err.message))
  .pipe(gulp.dest(path.dist.base));

const configWebpack = {
  mode: dev ? 'development' : 'production',
  devtool: dev ? 'eval-source-map' : false,
  optimization: {
    minimize: false,
  },
  output: {
    filename: 'index.js',
  },
  module: {
    rules: [],
  },
};

if (!dev) {
  configWebpack.module.rules.push({
    test: /\.(js|mjs)$/,
    exclude: /(node_modules)/,
    loader: 'babel-loader',
    options: {
      presets: ['@babel/preset-env'],
      plugins: ['@babel/plugin-transform-runtime'],
    },
  })
}

export const js = () => gulp
  .src(path.src.js)
  .pipe(plumber(
    notify.onError({
      title: "JS",
      message: "Error: <%= error.message %>"
    })))
  .pipe(webpack(configWebpack))
  .pipe(gulpIf(dev, gulp.dest(path.dist.js)))
  .pipe(terser())
  .pipe(rename({ suffix: '.min' }))
  .pipe(gulp.dest(path.dist.js))
  .pipe(browserSync.stream());

const image = () => gulp
  .src(path.src.img)
  .pipe(plumber(
    notify.onError({
      title: "IMG",
      message: "Error: <%= error.message %>"
    })))
  .pipe(gulpImage({
    optipng: ['-i 1', '-strip all', '-fix', '-o7', '-force'],
    pngquant: ['--speed=1', '--force', 256],
    zopflipng: ['-y', '--lossy_8bit', '--lossy_transparent'],
    jpegRecompress: ['--strip', '--quality', 'medium', '--min', 40, '--max', 80],
    mozjpeg: ['-optimize', '-progressive'],
    gifsicle: ['--optimize'],
    svgo: ['--enable', 'cleanupIDs', '--disable', 'convertColors']
  }))
  .pipe(gulp.dest(path.dist.img))
  .pipe(browserSync.stream({
    once: true,
  }));

const copy = () => gulp
  .src(path.src.assets, {
    base: path.src.base,
  })
  .pipe(plumber(
    notify.onError({
      title: "IMG",
      message: "Error: <%= error.message %>"
    })))
  .pipe(gulp.dest(path.dist.base))
  .pipe(browserSync.stream({
    once: true,
  }));


// server
export const server = () => {
  browserSync.init({
    ui: false,
    notify: false,
    host: 'localhost',
    tunnel: true,
    server: {
      baseDir: path.dist.base
    }
  });

  gulp.watch(path.watch.html, html)
  gulp.watch(path.watch.scss, scss)
  gulp.watch(path.watch.js, js)
  gulp.watch(path.watch.img, image)
  gulp.watch(path.src.assets, copy)
};

export const clear = () => del(path.dist.base, {
  force: true,
});

const develop = (ready) => {
  dev = true;
  ready();
};

export const base = gulp.parallel(html, scss, js, image, copy)

export const build = gulp.series(clear, base, critCSS);

export default gulp.series(develop, base, server);
