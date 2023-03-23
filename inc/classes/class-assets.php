<?php
/**
 * Enqueue theme assets
 *
 * @package tutorLMSCoursesModeration
 */


namespace FUTUREWORDPRESS_PROJECT_SCRATCH\Inc;

use FUTUREWORDPRESS_PROJECT_SCRATCH\Inc\Traits\Singleton;

class Assets {
	use Singleton;

	protected function __construct() {

		// load class.
		$this->setup_hooks();
	}

	protected function setup_hooks() {

		/**
		 * Actions.
		 */
		add_action( 'wp_enqueue_scripts', [ $this, 'register_styles' ] );
		add_action( 'wp_enqueue_scripts', [ $this, 'register_scripts' ] );
		// add_action( 'wp_enqueue_scripts', [ $this, 'wp_denqueue_scripts' ], 99 );
		/**
		 * The 'enqueue_block_assets' hook includes styles and scripts both in editor and frontend,
		 * except when is_admin() is used to include them conditionally
		 */
		// add_action( 'enqueue_block_assets', [ $this, 'enqueue_editor_assets' ] );
		add_action( 'admin_enqueue_scripts', [ $this, 'admin_enqueue_scripts' ], 10, 1 );
		add_action( 'admin_enqueue_scripts', [ $this, 'admin_denqueue_scripts' ], 99 );

		add_filter( 'futurewordpress/project/javascript/siteconfig', [ $this, 'siteConfig' ], 1, 1 );
	}

	public function register_styles() {
		// Register styles.
		wp_register_style( 'tutorlmscoursesmoderation-public', TUTOR_LMS_COURSES_MODERATION_SCRATCH_BUILD_CSS_URI . '/public.css', [], $this->filemtime( TUTOR_LMS_COURSES_MODERATION_SCRATCH_BUILD_CSS_DIR_PATH . '/public.css' ), 'all' );
		// Enqueue Styles.
		wp_enqueue_style( 'tutorlmscoursesmoderation-public' );
	}

	public function register_scripts() {
		// Register scripts.
		wp_register_script( 'tutorlmscoursesmoderation-public', TUTOR_LMS_COURSES_MODERATION_SCRATCH_BUILD_JS_URI . '/public.js', ['jquery'], $this->filemtime( TUTOR_LMS_COURSES_MODERATION_SCRATCH_BUILD_JS_DIR_PATH . '/public.js' ), true );

		// Enqueue Scripts.
		wp_enqueue_script( 'tutorlmscoursesmoderation-public' );

		// Inline data
		wp_localize_script( 'tutorlmscoursesmoderation-public', 'fwpSiteConfig', apply_filters( 'futurewordpress/project/javascript/siteconfig', [] ) );
	}
	private function allow_enqueue() {
		return ( isset( $_GET[ 'page' ] ) && $_GET[ 'page' ] == 'tutor' && isset( $_GET[ 'data' ] ) && $_GET[ 'data' ] == 'deletion' );
	}

	/**
	 * Enqueue editor scripts and styles.
	 */
	public function enqueue_editor_assets() {}
	public function admin_enqueue_scripts( $curr_page ) {
		if( ! $this->allow_enqueue() ) {return;}
		// global $post;if( ! in_array( $curr_page, [ 'edit.php', 'post.php' ] ) || 'shop_order' !== $post->post_type ) {return;}
		wp_register_style( 'tutorlmscoursesmoderation-admin', TUTOR_LMS_COURSES_MODERATION_SCRATCH_BUILD_CSS_URI . '/admin.css', [], $this->filemtime( TUTOR_LMS_COURSES_MODERATION_SCRATCH_BUILD_CSS_DIR_PATH . '/admin.css' ), 'all' );
		wp_register_script( 'tutorlmscoursesmoderation-admin', TUTOR_LMS_COURSES_MODERATION_SCRATCH_BUILD_JS_URI . '/admin.js', [ 'jquery' ], $this->filemtime( TUTOR_LMS_COURSES_MODERATION_SCRATCH_BUILD_JS_DIR_PATH . '/admin.js' ), true );

		wp_enqueue_style( 'tutorlmscoursesmoderation-admin' );
		wp_enqueue_script( 'tutorlmscoursesmoderation-admin' );

		wp_localize_script( 'tutorlmscoursesmoderation-admin', 'fwpSiteConfig', apply_filters( 'futurewordpress/project/javascript/siteconfig', [] ) );
	}
	private function filemtime( $file ) {
		return apply_filters( 'futurewordpress/project/filesystem/filemtime', false, $file );
	}
	public function siteConfig( $args ) {
		return wp_parse_args( [
			'ajaxUrl'    		=> admin_url( 'admin-ajax.php' ),
			'ajax_nonce' 		=> wp_create_nonce( 'futurewordpress/project/verify/nonce' ),
			'is_admin' 			=> is_admin(),
			'user_id' 			=> is_user_logged_in() ? get_current_user_id() : false,
			'buildPath'  		=> TUTOR_LMS_COURSES_MODERATION_SCRATCH_BUILD_URI,
			// 'videoClips'  		=> ( function_exists( 'WC' ) && WC()->session !== null ) ? (array) WC()->session->get( 'uploaded_files_to_archive' ) : [],
			'i18n'					=> [
				'i_confirm_it'							=> __( 'Yes I confirm it', 'tutor-lms-courses-moderation' ),
				'confirming'								=> __( 'Confirming', 'tutor-lms-courses-moderation' ),
				'successful'								=> __( 'Successful', 'tutor-lms-courses-moderation' ),
				'submit'										=> __( 'Submit', 'tutor-lms-courses-moderation' ),
				'cancel'										=> __( 'Cancel', 'tutor-lms-courses-moderation' ),
				'deletion'										=> __( 'Deletion', 'tutor-lms-courses-moderation' ),

				'delthisCourse'							=> __( 'Delete This Course?', 'tutor-lms-courses-moderation' ),
				'delthisCourseText'					=> sprintf( __( 'Are you absolutely certain that you wish to discontinue offering this course on the website? Please be aware that students who have already enrolled and have lifetime access to the course will still be able to view it. Once you confirm your decision, the course will be submitted to the administrators for final approval. For additional information, please refer to the %sTerms and Conditions.%s', 'tutor-lms-courses-moderation' ), '<a href="' . site_url( '/terms-and-conditions/' ) . '" target="_blank">', '</a>' ),
				'sent4modertion'						=> __( 'Sent for Moderation', 'tutor-lms-courses-moderation' ),
				'sent4modertionText'				=> __( 'The course is currently in pending mode and has been submitted to the administrators for review. Once reviewed, it will either be approved and made available, or deleted.', 'tutor-lms-courses-moderation' ),

				'reject'										=> __( 'Reject this deletion request.', 'tutor-lms-courses-moderation' ),
				'declain'										=> __( 'Declain!', 'tutor-lms-courses-moderation' ),
				'declainText'								=> __( 'Declain this deletion request.', 'tutor-lms-courses-moderation' ),
				'markprivate'								=> __( 'Send to Private?', 'tutor-lms-courses-moderation' ),
				'markprivateText'						=> __( "Are you sure you want to mark this course as private? Once marked as private, this course will no longer be visible to visitors.\r\nPlease note that this action is irreversible. If you change your mind, you will need to reset the course visibility from the course edit screen.\r\nAre you sure you want to proceed?", 'tutor-lms-courses-moderation' ),
			],
			'leadStatus'		=> apply_filters( 'futurewordpress/project/action/statuses', ['no-action' => __( 'No action fetched', 'tutor-lms-courses-moderation' )], false )
		], (array) $args );
	}
	public function wp_denqueue_scripts() {}
	public function admin_denqueue_scripts() {
		if( ! isset( $_GET[ 'page' ] ) ||  $_GET[ 'page' ] !='crm_dashboard' ) {return;}
		wp_dequeue_script( 'qode-tax-js' );
	}

}
