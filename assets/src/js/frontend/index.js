/**
 * Frontend Script.
 * 
 * @package tutorLMSCoursesModeration
 */

import Swal from "sweetalert2"; // "success", "error", "warning", "info" or "question"

( function ( $ ) {
	class FutureWordPress_Frontend {
		/**
		 * Constructor
		 */
		constructor() {
			this.ajaxUrl = fwpSiteConfig?.ajaxUrl ?? '';
			this.ajaxNonce = fwpSiteConfig?.ajax_nonce ?? '';
			this.lastAjax	 = false;this.profile	 = fwpSiteConfig?.profile ?? false;
			this.user_id	 = fwpSiteConfig?.user_id ?? false;
			this.wouldpending	 = fwpSiteConfig?.wouldpending ?? false;
			var i18n = fwpSiteConfig?.i18n ?? {};this.noToast	 = true;
			this.i18n = {
				delthisCourse							: 'Delete This Course?',
				delthisCourseText					: 'Are you absolutely certain that you wish to discontinue offering this course on the website? Please be aware that students who have already enrolled and have lifetime access to the course will still be able to view it. Once you confirm your decision, the course will be submitted to the administrators for final approval. For additional information, please refer to the <a href="https://cozyx.org/terms-and-conditions/" target="_blank">Terms and Conditions</a>.',
				sent4modertion						: 'Sent for Moderation',
				sent4modertionText				: 'The course is currently in pending mode and has been submitted to the administrators for review. Once reviewed, it will either be approved and made available, or deleted.',
				i_confirm_it							: 'Yes I confirm it',
				confirming								: 'Confirming',
				successful								: 'Successful',
				submit										: 'Submit',
				...i18n
			}
			this.i18n.sent4modertionText = this.wouldpending ? this.i18n.sent4modertionText : 'The course is currently has been submitted to the administrators for review. Once reviewed, it will either be approved and made available, or deleted.';
			this.setup_hooks();
		}
		setup_hooks() {
			this.createDelonTutorCard();
			this.event_hooks();
		}
		createDelonTutorCard() {
			const thisClass = this;var a, i, s, del, theInterval;
			theInterval = setInterval(() => {
				del = document.querySelectorAll( '.tutor-admin-course-delete:not([data-handled])' );
				del.forEach( ( el ) => {
					el.dataset.handled = true;
					a = document.createElement( 'a' );a.href = '#';a.dataset.course = el.dataset.tutorModalTarget.replace( 'tutor_my_courses_delete_', '' );
					a.classList.add( 'tutor-dropdown-item', 'tutor-admin-course-delete', 'fwp-course-delete' );
					i = document.createElement( 'a' );i.classList.add( 'tutor-icon-trash-can-bold', 'tutor-mr-8' );
					i.setAttribute( 'area-hidden', 'true' );a.appendChild( i );
					s = document.createElement( 'span' );s.innerText = 'Delete';a.appendChild( s );
					el.parentElement.insertBefore( a, el );el.remove();
				} );
				del = document.querySelectorAll( '.tutor-admin-course-delete.fwp-course-delete:not([data-handled])' );
				del.forEach( ( el ) => {
					el.dataset.handled = true;
					el.addEventListener( 'click', ( e ) => {
						Swal.fire({
							icon: 'warning',
							title: thisClass.i18n.delthisCourse,
							html: thisClass.i18n.delthisCourseText,
							focusConfirm: false,
							showCancelButton: true,
							confirmButtonText: thisClass.i18n.i_confirm_it,
						} ).then((result) => {
							if( result.isConfirmed ) {
								var formdata = new FormData();
									formdata.append( 'action', 'futurewordpress/project/action/please_deleteTutorLMSCourse' );
									formdata.append( 'course', el.dataset.course );
									formdata.append( 'userid', thisClass.user_id );
									formdata.append( '_nonce', thisClass.ajaxNonce );
									thisClass.sendToServer( formdata );
							}
						} );
					} );
				} );
			}, 500 );
		}
		sendToServer( data, i = false ) {
			const thisClass = this;var message;
			$.ajax({
				url: thisClass.ajaxUrl,
				type: "POST",
				data: data,    
				cache: false,
				contentType: false,
				processData: false,
				success: function( json ) {
					thisClass.lastAjax = json;
					message = ( json.data.message ) ? json.data.message : json.data;
					if( json.success ) {
						if( typeof message === 'string' ) {
							if( thisClass.noToast ) {Swal.fire( { position: 'center', icon: 'success', text: message, showConfirmButton: false, timer: 3000 } );} else {toast.show({title: message, position: 'bottomright', type: 'info'});}
						}
						if( i ) {i.classList.remove( 'fa-spinner', 'fa-spin' );i.classList.add( 'fa-check' );}
					} else {
						if( typeof message === 'string' ) {
							if( thisClass.noToast ) {Swal.fire( { position: 'center', icon: 'error', text: message, showConfirmButton: false, timer: 3000 } );} else {toast.show({title: message, position: 'bottomright', type: 'warn'});}
						}
						if( i ) {i.classList.remove( 'fa-spinner', 'fa-spin' );i.classList.add( 'fa-times' );}
					}
					if( json.data.hooks ) {
						json.data.hooks.forEach( ( hook ) => {
							document.body.dispatchEvent( new Event( hook ) );
						} );
					}
				},
				error: function( err ) {
					console.log( err.responseText );toast.show({title: err.responseText, position: 'bottomright', type: 'alert'});
					if( i ) {i.classList.remove( 'fa-spinner', 'fa-spin' );i.classList.add( 'fa-times' );}
				}
			});
		}
		event_hooks() {
			const thisClass = this;
			document.body.addEventListener( 'course-delete-request-sent4modertion', () => {
				Swal.fire( { position: 'top-end', icon: 'success', title: thisClass.i18n.sent4modertion, text: thisClass.i18n.sent4modertionText, showConfirmButton: false, timer: 10000 } );
			} );
			document.body.addEventListener( 'reload', () => {location.reload();} );
		}
	}
	new FutureWordPress_Frontend();
} )( jQuery );
