var gulp = require("gulp");
var less = require("gulp-less");
var plumber = require("gulp-plumber"); // для вывода ошибок в консоль, чтобы автоматизация не останавливалась из-за ошибок
var postcss = require("gulp-postcss"); // нужен для работы autoprefixer'а
var autoprefixer = require("autoprefixer");

var server = require("browser-sync").create(); // позволяет запустить у себя локально быстрый сервер

var minify = require("gulp-csso"); // минификация CSS
var uglify = require("gulp-uglify"); // минификация JS

var rename = require("gulp-rename"); // чтобы переимновать файл
var imagemin = require("gulp-imagemin"); // минимизация изображений
// var webp = require("gulp-webp"); // создание webp-формата изображения
var webp = require("imagemin-webp"); // создание webp-формата изображения
var extReplace = require("gulp-ext-replace"); // заменяет расширение файла
var svgstore = require("gulp-svgstore"); // собирает SVG-спрайт
var posthtml = require("gulp-posthtml");
var include = require("posthtml-include"); // нужно ставить вместе с gulp-posthtml
var run = require("run-sequence"); // нужно ставить вместе с gulp-posthtml
var del = require("del"); // библиотека для удаления папок и файлов


gulp.task("style", function() {
	gulp.src("source/less/style.less")
		.pipe(plumber()) //показывает ошибку в консоли, но автоматизация продолжает работать
		.pipe(less())
		.pipe(postcss([
			autoprefixer({
					overrideBrowserslist:  ['last 10 versions'] // поддержка скольких версий назад
				})
		]))
		.pipe(gulp.dest("build/css"))
		.pipe(minify())
		.pipe(rename("style.min.css"))
		.pipe(gulp.dest("build/css"));
		// .pipe(server.stream());  // перерисовка страницы (при изменении файлов)
});

gulp.task("js", function() {
	gulp.src("source/js/**/*.js")
		.pipe(plumber()) //показывает ошибку в консоли, но автоматизация продолжает работать
		.pipe(uglify())
		.pipe(rename({suffix: ".min"})) // название каждого файла изменяем, прописывая ему суффис .min
		.pipe(gulp.dest("build/js"));
});

gulp.task("sprite", function() {
	return gulp.src("source/img/icon-*.svg") // поэтому все SVG-иконки должны начинаться с icon-
		.pipe(svgstore({
			inlineSvg: true
		}))
		.pipe(rename("sprite.svg"))
		.pipe(gulp.dest("build/img"));
});

gulp.task("html", function() {
	return gulp.src("source/*.html")
		.pipe(posthtml([
			include()
		]))
		.pipe(gulp.dest("build"));
});

gulp.task("images", function() {
	return gulp.src("source/img/**/*.{png,jpg,svg}")
		.pipe(imagemin([
			imagemin.optipng({optimizationLevel: 3}),
			imagemin.jpegtran({progressive: true}),
			imagemin.svgo()
		]))
		.pipe(gulp.dest("source/img"));
		// .pipe(gulp.dest("img")); // для теста
});

gulp.task("webp", function() {
	return gulp.src("source/img/**/*.{png,jpg}")
		.pipe(
			imagemin([
				webp({quality: 90})
			])
		)
		.pipe(extReplace(".webp"))
		// .pipe(webp({quality: 90}))
		.pipe(gulp.dest("source/img"));
		// .pipe(gulp.dest("img")); // для теста
});

gulp.task("copy", function() {
	return gulp.src([
			"source/fonts/**/*.{woff,woff2}",
			"source/img/**"			
		], {
			base: "source" // указываем для того, чтобы Gulp не "терял" нужные нам папки (fonts/, img, js/)
		})
		
		.pipe(gulp.dest("build")); // положить всё в папку build/
});

gulp.task("clean", function() {
	return del("build");
});

gulp.task("serve", ["build"], function() {
	server.init({
		server: "build/"//, // указываем, где будет находится корень наших файлов. Берем уже файл в продакшене
		// notify: false,
		// open: true,
		// cors: true,
		// ui: false
	});

	gulp.watch("source/less/**/*.less", ["style"]).on("change", server.reload); // следим за изменением файлов .less и выполняем задачу "style"	
	gulp.watch("source/*.html", ["html"]).on("change", server.reload); // следим за изменением html-файлов
	gulp.watch("source/js/**/*.js", ["js"]).on("change", server.reload); // следим за изменением js-файлов
	gulp.watch("source/img/icon-*.svg", ["sprite", "html"]).on("change", server.reload); // следим за изменением SVG-файлов для спрайта

	// gulp.watch("source/less/**/*.less", ["style"]); // следим за изменением файлов .less и выполняем задачу "style"
	// gulp.watch("source/*.html", ["html"]);
	// gulp.watch("source/*.html").on("change", server.reload); // перезагружаем страницу при изменениии html-файлов. Такие штуки можно писать для любых файлов (js-Файлы и т.д.)
	
});

// gulp.task("serve", function() {
// 	server.init({
// 		server: "build/"//, // указываем, где будет находится корень наших файлов
// 		// notify: false,
// 		// open: true,
// 		// cors: true,
// 		// ui: false
// 	});
// 	gulp.watch("source/less/**/*.less", ["style"]); // следим за изменением файлов .less и выполняем задачу "style"
// 	gulp.watch("source/*.html", ["html"]);
// 	// gulp.watch("source/*.html").on("change", server.reload); // перезагружаем страницу при изменениии html-файлов. Такие штуки можно писать для любых файлов (js-Файлы и т.д.)	
// });

gulp.task("build", function(done) {
	run(
		"clean",
		"copy",
		"style",
		"js",
		"sprite",
		"html", 
		done
	);
});