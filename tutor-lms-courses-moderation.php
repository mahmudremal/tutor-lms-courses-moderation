<?php
/**
 * This plugin ordered by a client and done by Remal Mahmud (fiverr.com/mahmud_remal). Authority dedicated to that cient.
 *
 * @wordpress-plugin
 * Plugin Name:       Tutor LMS Courses Moderation
 * Plugin URI:        https://github.com/mahmudremal/tutor-lms-courses-moderation/
 * Description:       Tutor LMS addons to give possibility to pervent courses deletation from client or instructor side.
 * Version:           1.0.0
 * Requires at least: 5.2
 * Requires PHP:      7.2
 * Author:            Remal Mahmud
 * Author URI:        https://github.com/mahmudremal/
 * License:           GPL v2 or later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       tutor-lms-courses-moderation
 * Domain Path:       /languages
 * 
 * @package tutorLMSCoursesModeration
 * @author  Remal Mahmud (https://github.com/mahmudremal)
 * @version 1.0.2
 * @link https://github.com/mahmudremal/tutor-lms-courses-moderation/
 * @category	WooComerce Plugin
 * @copyright	Copyright (c) 2023-25
 * 
 */

/**
 * Bootstrap the plugin.
 */



defined( 'TUTOR_LMS_COURSES_MODERATION_SCRATCH__FILE__' ) || define( 'TUTOR_LMS_COURSES_MODERATION_SCRATCH__FILE__', untrailingslashit( __FILE__ ) );
defined( 'TUTOR_LMS_COURSES_MODERATION_SCRATCH_DIR_PATH' ) || define( 'TUTOR_LMS_COURSES_MODERATION_SCRATCH_DIR_PATH', untrailingslashit( plugin_dir_path( TUTOR_LMS_COURSES_MODERATION_SCRATCH__FILE__ ) ) );
defined( 'TUTOR_LMS_COURSES_MODERATION_SCRATCH_DIR_URI' ) || define( 'TUTOR_LMS_COURSES_MODERATION_SCRATCH_DIR_URI', untrailingslashit( plugin_dir_url( TUTOR_LMS_COURSES_MODERATION_SCRATCH__FILE__ ) ) );
defined( 'TUTOR_LMS_COURSES_MODERATION_SCRATCH_BUILD_URI' ) || define( 'TUTOR_LMS_COURSES_MODERATION_SCRATCH_BUILD_URI', untrailingslashit( TUTOR_LMS_COURSES_MODERATION_SCRATCH_DIR_URI ) . '/assets/build' );
defined( 'TUTOR_LMS_COURSES_MODERATION_SCRATCH_BUILD_PATH' ) || define( 'TUTOR_LMS_COURSES_MODERATION_SCRATCH_BUILD_PATH', untrailingslashit( TUTOR_LMS_COURSES_MODERATION_SCRATCH_DIR_PATH ) . '/assets/build' );
defined( 'TUTOR_LMS_COURSES_MODERATION_SCRATCH_BUILD_JS_URI' ) || define( 'TUTOR_LMS_COURSES_MODERATION_SCRATCH_BUILD_JS_URI', untrailingslashit( TUTOR_LMS_COURSES_MODERATION_SCRATCH_DIR_URI ) . '/assets/build/js' );
defined( 'TUTOR_LMS_COURSES_MODERATION_SCRATCH_BUILD_JS_DIR_PATH' ) || define( 'TUTOR_LMS_COURSES_MODERATION_SCRATCH_BUILD_JS_DIR_PATH', untrailingslashit( TUTOR_LMS_COURSES_MODERATION_SCRATCH_DIR_PATH ) . '/assets/build/js' );
defined( 'TUTOR_LMS_COURSES_MODERATION_SCRATCH_BUILD_IMG_URI' ) || define( 'TUTOR_LMS_COURSES_MODERATION_SCRATCH_BUILD_IMG_URI', untrailingslashit( TUTOR_LMS_COURSES_MODERATION_SCRATCH_DIR_URI ) . '/assets/build/src/img' );
defined( 'TUTOR_LMS_COURSES_MODERATION_SCRATCH_BUILD_CSS_URI' ) || define( 'TUTOR_LMS_COURSES_MODERATION_SCRATCH_BUILD_CSS_URI', untrailingslashit( TUTOR_LMS_COURSES_MODERATION_SCRATCH_DIR_URI ) . '/assets/build/css' );
defined( 'TUTOR_LMS_COURSES_MODERATION_SCRATCH_BUILD_CSS_DIR_PATH' ) || define( 'TUTOR_LMS_COURSES_MODERATION_SCRATCH_BUILD_CSS_DIR_PATH', untrailingslashit( TUTOR_LMS_COURSES_MODERATION_SCRATCH_DIR_PATH ) . '/assets/build/css' );
defined( 'TUTOR_LMS_COURSES_MODERATION_SCRATCH_BUILD_LIB_URI' ) || define( 'TUTOR_LMS_COURSES_MODERATION_SCRATCH_BUILD_LIB_URI', untrailingslashit( TUTOR_LMS_COURSES_MODERATION_SCRATCH_DIR_URI ) . '/assets/build/library' );
defined( 'TUTOR_LMS_COURSES_MODERATION_SCRATCH_ARCHIVE_POST_PER_PAGE' ) || define( 'TUTOR_LMS_COURSES_MODERATION_SCRATCH_ARCHIVE_POST_PER_PAGE', 9 );
defined( 'TUTOR_LMS_COURSES_MODERATION_SCRATCH_SEARCH_RESULTS_POST_PER_PAGE' ) || define( 'TUTOR_LMS_COURSES_MODERATION_SCRATCH_SEARCH_RESULTS_POST_PER_PAGE', 9 );
defined( 'FUTUREWORDPRESS_PROJECT_OPTIONS' ) || define( 'FUTUREWORDPRESS_PROJECT_OPTIONS', get_option( 'tutor-lms-courses-moderation' ) );

require_once TUTOR_LMS_COURSES_MODERATION_SCRATCH_DIR_PATH . '/inc/helpers/autoloader.php';
// require_once TUTOR_LMS_COURSES_MODERATION_SCRATCH_DIR_PATH . '/inc/helpers/template-tags.php';

if( ! function_exists( 'futurewordpressprojectscratch_get_theme_instance' ) ) {
	function futurewordpressprojectscratch_get_theme_instance() {\FUTUREWORDPRESS_PROJECT_SCRATCH\Inc\Project::get_instance();}
}
futurewordpressprojectscratch_get_theme_instance();



