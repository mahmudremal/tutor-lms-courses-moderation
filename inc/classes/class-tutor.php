<?php
/**
 * LoadmorePosts
 *
 * @package tutorLMSCoursesModeration
 */

namespace FUTUREWORDPRESS_PROJECT_SCRATCH\Inc;
// use TUTOR\Input;
// use TUTOR\Course_List;

use FUTUREWORDPRESS_PROJECT_SCRATCH\Inc\Traits\Singleton;
use \WP_Query;

class Tutor {

	use Singleton;

	protected function __construct() {
		// load class.
		$this->setup_hooks();
	}
	protected function setup_hooks() {
		add_filter( 'tutor_course_tabs', [ $this, 'tutor_course_tabs' ], 10, 1 );
		add_action( 'pre_get_posts', [ $this, 'pre_get_posts' ], 10, 1 );
		add_action( 'tutor_admin_befor_course_list_action', [ $this, 'tutor_admin_befor_course_list_action' ], 10, 1 );
		add_action( 'tutor_admin_middle_course_list_action', [ $this, 'tutor_admin_middle_course_list_action' ], 10, 1 );

		add_action( 'wp_ajax_futurewordpress/project/action/please_deleteTutorLMSCourse', [ $this, 'please_deleteTutorLMSCourse' ], 10, 0 );
		add_action( 'wp_ajax_futurewordpress/project/action/please_undeleteTutorLMSCourse', [ $this, 'please_undeleteTutorLMSCourse' ], 10, 0 );
		add_action( 'wp_ajax_futurewordpress/project/action/please_lockTutorLMSCourse', [ $this, 'please_lockTutorLMSCourse' ], 10, 0 );

		// add_action( 'init', function() {print_r( [get_post( 1742 ), get_post_meta( 1742 )] );} );

	}
	public function tutor_course_tabs( $tabs ) {
		$args = wp_parse_args( $_GET, [
			'category'					=> '',
			'course'						=> '',
			'search'						=> '',
			'date'							=> '',
		] );
		$deletion = array(
			'key'   => 'deletion',
			'title' => __( 'Deletion', 'tutor-lms-courses-moderation' ),
			'value' => $this->count_course( 'deletion', $args[ 'category' ], $args[ 'course' ], $args[ 'date' ], $args[ 'search' ] ),
			'url'   => get_pagenum_link() . '&data=deletion',
		);
		// array_splice( $tabs, 2, 0, $deletion );
		$tabs[] = $deletion;
		return $tabs;
	}
	private function count_course( string $status, $category_slug = '', $course_id = '', $date = '', $search_term = '' ) {
		$user_id       = get_current_user_id();
		$status        = sanitize_text_field( $status );
		$course_id     = sanitize_text_field( $course_id );
		$date          = sanitize_text_field( $date );
		$search_term   = sanitize_text_field( $search_term );
		$category_slug = sanitize_text_field( $category_slug );
		$args = [
			'post_type' => tutor()->course_post_type,
			'meta_query' => [
				[
					'key'     => 'deletion_requested',
					'compare' => '==',
					'value'   => 'yes',
				]
			]
		];
		if ( 'all' === $status || 'mine' === $status ) {
			$args['post_status'] = array( 'publish', 'pending', 'draft', 'private' );
		} else {
			$args['post_status'] = array( $status );
		}
		// Author query.
		if ( 'mine' === $status || ! current_user_can( 'administrator' ) ) {
			$args['author'] = $user_id;
		}
		$date_filter = sanitize_text_field( $date );
		$year  = date( 'Y', strtotime( $date_filter ) );
		$month = date( 'm', strtotime( $date_filter ) );
		$day   = date( 'd', strtotime( $date_filter ) );
		// Add date query.
		if ( '' !== $date_filter ) {
			$args['date_query'] = array(
				array(
					'year'  => $year,
					'month' => $month,
					'day'   => $day,
				),
			);
		}
		if ( '' !== $course_id ) {
			$args['p'] = $course_id;
		}
		// Search filter.
		if ( '' !== $search_term ) {
			$args['s'] = $search_term;
		}
		// Category filter.
		if ( '' !== $category_slug ) {
			$args['tax_query'] = array(
				array(
					'taxonomy' => 'course-category',
					'field'    => 'slug',
					'terms'    => $category_slug,
				),
			);
		}
		$the_query = new \WP_Query( $args );
		return ! is_null( $the_query ) && isset( $the_query->found_posts ) ? $the_query->found_posts : $the_query;
	}
	public function pre_get_posts( $query ) {
		if( ! is_admin() ) {return;}
		if( $query->get( 'post_type' ) != tutor()->course_post_type ) {return;}
		if( ! in_array( 'deletion', (array) $query->get( 'post_status' ) ) ) {return;}
		if( ! isset( $_GET[ 'data' ] ) || $_GET[ 'data' ] != 'deletion' ) {return;}

		$meta_query = $query->get( 'meta_query' );
		$meta_query = is_array( $meta_query ) ? $meta_query : [];
		$meta_query[] = [
			'key'     => 'deletion_requested',
			'compare' => '==',
			'value'   => 'yes',
		];
		$query->set( 'meta_query', $meta_query );
		// print_r( $query->get( 'post_status' ) );
	}
	public function please_deleteTutorLMSCourse() {
		check_ajax_referer( 'futurewordpress/project/verify/nonce', '_nonce' );
		$args = wp_parse_args( $_POST, [ 'course' => '', 'userid' => '' ] );
		if( empty( $args[ 'course' ] ) || empty( $args[ 'userid' ] ) ) {
			wp_send_json_error( __( 'Invalid request sent.', 'tutor-lms-courses-moderation' ) );
		}
		$args[ 'userid' ] = is_admin() ? $args[ 'userid' ] : get_current_user_id();
		update_post_meta( $args[ 'course' ], 'deletion_requested', 'yes' );
		update_post_meta( $args[ 'course' ], 'deletion_requested_on', time() );

		$would_pending = false;
		if( $would_pending ) {$is_updated = wp_update_post( [ 'ID' => $args[ 'course' ], 'post_status' => 'pending' ] );}

		wp_send_json_success( [ 'hooks' => [ 'course-delete-request-sent4modertion', $would_pending ? 'reload' : 'no-reload' ], 'message' => $would_pending ? __( 'The course is currently in pending mode and has been submitted to the administrators for review. Once reviewed, it will either be approved and made available, or deleted.', 'tutor-lms-courses-moderation' ) : __( 'The course is currently has been submitted to the administrators for review. Once reviewed, it will either be approved and made available, or deleted.', 'tutor-lms-courses-moderation' ) ], 200 );
	}
	public function please_undeleteTutorLMSCourse() {
		check_ajax_referer( 'futurewordpress/project/verify/nonce', '_nonce' );
		$args = wp_parse_args( $_POST, [ 'course' => '', 'userid' => '' ] );
		if( empty( $args[ 'course' ] ) || empty( $args[ 'userid' ] ) ) {
			wp_send_json_error( __( 'Invalid request sent.', 'tutor-lms-courses-moderation' ) );
		}
		$args[ 'userid' ] = is_admin() ? $args[ 'userid' ] : get_current_user_id();
		delete_post_meta( $args[ 'course' ], 'deletion_requested' );
		delete_post_meta( $args[ 'course' ], 'deletion_requested_on' );

		wp_send_json_success( [ 'hooks' => [ 'course-remove-' . $args[ 'course' ] ], 'message' => __( 'Course marked as rejected for deletion.', 'tutor-lms-courses-moderation' ) ], 200 );
	}
	public function please_lockTutorLMSCourse() {
		check_ajax_referer( 'futurewordpress/project/verify/nonce', '_nonce' );
		$args = wp_parse_args( $_POST, [ 'course' => '', 'userid' => '' ] );
		if( empty( $args[ 'course' ] ) || empty( $args[ 'userid' ] ) ) {
			wp_send_json_error( __( 'Invalid request sent.', 'tutor-lms-courses-moderation' ) );
		}
		$args[ 'userid' ] = is_admin() ? $args[ 'userid' ] : get_current_user_id();
		$post = get_post( $args[ 'course' ] );
		if( $post ) {
			$update_args = array(
				'ID'						=> $args[ 'course' ],
				'post_status'		=> 'private'
			);
			wp_update_post($update_args);
			update_post_meta( $args[ 'course' ], '_visibility', 'private' );

			wp_send_json_success( [ 'hooks' => [], 'message' => __( 'Course marked as private.', 'tutor-lms-courses-moderation' ) ], 200 );
		} else {
			wp_send_json_error( __( 'Course not found or something error happen while trying to update post status.', 'tutor-lms-courses-moderation' ) );
		}
	}
	public function tutor_admin_befor_course_list_action( $post_id ) {
		if( ! isset( $_GET[ 'data' ] ) || $_GET[ 'data' ] != 'deletion' ) {return;}
		$requested = get_post_meta( $post_id, 'deletion_requested', true );
		if( $requested && ! empty( $requested ) ) {
			$requested_on = get_post_meta( $post_id, 'deletion_requested_on', true );
			// delete_post_meta( $post_id, 'deletion_requested' );
			// delete_post_meta( $post_id, 'deletion_requested_on' );
			?>
			<div class="fwp-special-hook" style="display: none;">
				<?php // echo esc_html( $requested_on ); ?>
				<div class="tutor-fw-normal">
					<div class="tutor-fs-7 tutor-mb-4"><?php echo esc_html( wp_date( 'F d, Y', $requested_on ) ); ?></div>
					<div class="tutor-fs-8 tutor-color-muted"><?php echo esc_html( wp_date( 'h:i a', $requested_on ) ); ?></div>
				</div>
			</div>
			<?php
		}
	}
	public function tutor_admin_middle_course_list_action( $post_id ) {
		if( ! isset( $_GET[ 'data' ] ) || $_GET[ 'data' ] != 'deletion' ) {return;}
		$visibility = get_post_meta( $post_id, '_visibility', true );
		if( true ) {
			// $visibility && ! empty( $visibility ) && $visibility != 'private'
			?>
			<a class="tutor-dropdown-item fwp-private-course-btn no-effect" href="#" data-course="<?php echo esc_attr( $post_id ); ?>">
				<i class=" tutor-mr-8" area-hidden="true" style="display: inline-block;"><svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 0 1024 1024" stroke="#fff" stroke-width="1.024" style="display: flex;"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><circle cx="512" cy="512" r="512" style="fill: #fff;"></circle><path data-name="PIA logo (monochrome version by krisu)" d="M486.59 371c0-15.43-18.66-23.16-29.57-12.26s-3.19 29.58 12.24 29.58a17.32 17.32 0 0 0 17.32-17.33m68.18-17.31c-15.43 0-23.18 18.65-12.26 29.57s29.58 3.17 29.57-12.26a17.31 17.31 0 0 0-17.31-17.31m-18.66 45.89a36 36 0 0 1-48.17 0c-4.37-3.69-10.12 2.53-6.09 6.6a44 44 0 0 0 60.37 0 4.5 4.5 0 0 0-6.11-6.6m159.63 67v-.25a36.09 36.09 0 0 0-26.22-34.7v-30.91A152.73 152.73 0 0 0 516.79 248h-5.84a152.73 152.73 0 0 0-152.73 152.71v30.12A36.09 36.09 0 0 0 328.59 466a51.34 51.34 0 0 0-7.09 26v195.85a51.54 51.54 0 0 0 38.1 49.74A37.7 37.7 0 0 0 394.06 760h42.84a37.69 37.69 0 0 0 33.6-20.59h78.59A37.68 37.68 0 0 0 582.66 760h42.85a37.72 37.72 0 0 0 34-21.37 51.57 51.57 0 0 0 43-50.82V492.06a51.31 51.31 0 0 0-6.78-25.49zM559.55 656.36a23.1 23.1 0 0 1-22.84 26.46H487.3a23.12 23.12 0 0 1-22.85-26.44l9.55-64.56a58.61 58.61 0 0 1 31.4-102.87A58.62 58.62 0 0 1 550 591.83zm5.58-215.88h-106A35.88 35.88 0 0 0 434 430.24h-18v-32.06a95.65 95.65 0 0 1 95.62-95.64h4.67a95.65 95.65 0 0 1 95.62 95.64v32.06h-21.6a35.89 35.89 0 0 0-25.18 10.24zm-21.94 219a5.49 5.49 0 0 1-5.37 6.89h-51.33a5.48 5.48 0 0 1-5.36-6.91l9.87-71.23a8.49 8.49 0 0 0-.44-3.13 16 16 0 0 0-3.16-3.21c-.18-.15-.31-.26-.42-.36a42.24 42.24 0 1 1 50.43-.31c0 .07-.16.28-.65.68a16 16 0 0 0-3.16 3.21 5.22 5.22 0 0 0-.32 1.42z" style="fill: #000;"></path></g></svg></i>
				<span><?php esc_html_e( 'Private', 'tutor-lms-courses-moderation' ); ?></span>
			</a>
			<?php
		}
	}

}
