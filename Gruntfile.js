/*
 * node-rdw
 * https://github.com/j3lte/node-rdw
 *
 * Copyright (c) 2014 Jelte Lagendijk
 * Licensed under the MIT license.
 */
'use strict';
module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        jsdoc2md: {
            build: {
                options: {
                    index: true
                },
                src: "lib/*.js",
                dest: "Documentation.md"
            }
        },
        jshint: {
            all: [
                "Gruntfile.js",
                "index.js",
                "bin/*.js",
                "lib/*.js"
            ],
            options: {
                jshintrc : '.jshintrc',
                reporter: require('jshint-stylish'),
                force: false
            }
        },
        watch : {
            jshint : {
                files : '<%= jshint.all %>',
                tasks: ['jshint']
            }
        },
        simplemocha: {
            options: {
                globals: ['expect'],
                timeout: 3000,
                ignoreLeaks: false,
                ui: 'bdd',
                reporter: 'tap'
            },
            all: { src: ['tests/*.js'] }
        }
    });

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-jsdoc-to-markdown');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-simple-mocha');

    // Default task.
    grunt.registerTask('default', ['jshint']);

    grunt.registerTask('test', ['jshint', 'simplemocha']);

    grunt.registerTask('dev', ['jshint', 'watch']);

    grunt.registerTask('build', ['jshint', 'jsdoc2md']);
};
