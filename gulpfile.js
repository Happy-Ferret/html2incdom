'use strict';

var babel = require('gulp-babel');
var concat = require('gulp-concat');
var del = require('del');
var gulp = require('gulp');
var rename = require('gulp-rename');
var minify = require('gulp-minify');

gulp.task('clean', function(done) {
	del('dist').then(function() {
		done();
	});
});

gulp.task('build:single', ['clean'], function() {
	return gulp.src('src/HTML2IncDom.js')
		.pipe(babel({
			plugins: ['transform-es2015-modules-umd'],
			presets: ['es2015']
		}))
		.pipe(rename('html2incdom.js'))
		.pipe(gulp.dest('dist'));
});

gulp.task('build:withParser', ['build:single'], function() {
	return gulp.src(['src/HTMLParser.js', 'dist/html2incdom.js'])
		.pipe(concat('html2incdom-withParser.js'))
		.pipe(gulp.dest('dist'));
});

gulp.task('build', ['build:withParser'], function() {
	return gulp.src('dist/*.js')
		.pipe(minify({
			preserveComments: 'some',
			output: {}
		}))
		.pipe(gulp.dest('dist'));
});

gulp.task('default', ['build']);
