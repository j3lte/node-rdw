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
                force: true
            }
        },
        watch : {
            jshint : {
                files : '<%= jshint.all %>',
                tasks: ['jshint']
            }
        }
    });

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-jsdoc-to-markdown');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');

    // Default task.
    grunt.registerTask('default', ['jshint']);

    grunt.registerTask('dev', ['jshint', 'watch']);

    grunt.registerTask('build', ['jshint', 'jsdoc2md']);
};
