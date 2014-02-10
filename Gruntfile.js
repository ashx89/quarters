module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        // Tasks configuration
        clean: ['dist'],

        requirejs: {
            js: {
                options: {
                    baseUrl:        'public/js',
                    name:           'main',
                    optimize:       'uglify',
                    paths:          {'req': 'libs/require'},
                    mainConfigFile: 'public/js/main.js',
                    include:        ['req'],
                    out:            'public/js/app.min.js'
                }
            },
            css: {
                options: {
                    cssIn:          'public/css/global.css',
                    out:            'dist/css/global.css'
                }
            }
        },

        watch: {
            options: {
                livereload: 4000,
                nospawn: true
            },
            html: {
                files: ['views/**/*.ejs']
            },
            css: { 
                files: ['public/css/*.css']
            },
            js: {
                files: ['public/js/**/*.js']
            },
            scss: {
                files: ['public/scss/**/*.scss'],
                tasks: ['compass']
            }
        },

        compass: {
            public: {
                options: {
                    sassDir:        'public/scss',
                    cssDir:         'public/css',
                    fontsDir:       'public/fonts',
                    imagesDir:      'public/images',
                    javascriptsDir: 'public/js',
                    outputStyle:    'compressed',
                    force: true
                }
            },
            prod: {
                options: {
                    sassDir:        'dist/scss',
                    cssDir:         'dist/css',
                    fontsDir:       'dist/fonts',
                    imagesDir:      'dist/images',
                    javascriptsDir: 'dist/js',
                    outputStyle:    'compressed',
                    force: true
                }
            }
        }

    });

    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-uglify');
   
    grunt.registerTask('build', [
        'clean',
        'requirejs',
        'watch'
    ]);

};
