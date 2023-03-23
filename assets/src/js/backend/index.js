// import ApexCharts from 'apexcharts';
// import flatpickr from "flatpickr";
import Swal from "sweetalert2";
// import { toast } from 'toast-notification-alert';
// import flatpickr from "flatpickr";
// import ClassicEditor from '@ckeditor5/ckeditor5-editor-classic/src/classiceditor';
// import tinymce from 'tinymce';
// import 'tinymce/themes/silver'; // you can use any theme you like
// import 'tinymce/plugins/paste'; // you can use any plugin you need
// import Quill from "quill";

( function ( $ ) {
	class FWPListivoBackendJS {
		constructor() {
			this.ajaxUrl = fwpSiteConfig?.ajaxUrl ?? '';
			this.ajaxNonce = fwpSiteConfig?.ajax_nonce ?? '';
			var i18n = fwpSiteConfig?.i18n ?? {};this.cssImported = false;
			this.user_id	 = fwpSiteConfig?.user_id ?? false;
			this.leadStatus = fwpSiteConfig?.leadStatus ?? [];
			this.i18n = {
				confirm_cancel_subscribe	: 'Do you really want to cancel this Subscription?',
				i_confirm_it							: 'Yes I confirm it',
				confirming								: 'Confirming',
				submit										: 'Submit',
				cancel										: 'Cancel',
				request_failed						: 'Request failed',
				give_your_old_password		: 'Give here your old password',
				you_paused								: 'Pause your Retainer',
				you_un_paused							: 'Your unpaused Retainer',
				are_u_sure								: 'Are you sure?',
				sure_to_delete						: 'Are you sure about this deletation.',
				sent_reg_link							: 'Registration Link sent successfully!',
				registration_link					: 'Registration link',
				password_reset						: 'Password reset',
				sent_passreset						: 'Password reset link sent Successfully!',
				retainer_zero							: 'Retainer Amount Zero',
				retainer_zerowarn					: 'You must set retainer amount before send a registration email.',
				selectcontract						: 'Select Contract',
				selectcontractwarn				: 'Please choose a contract to send the registration link. Once you have selected a contract and updated the form, you will be able to send the registration link.',
				deletion									: 'Deletion',
				reject										: 'Reject this deletion request.',
				declain										: 'Declain!',
				declainText								: 'Declain this deletion request.',
				markprivate								: 'Send to Private?',
				markprivateText						: "Are you sure you want to mark this course as private? Once marked as private, this course will no longer be visible to visitors.\r\nPlease note that this action is irreversible. If you change your mind, you will need to reset the course visibility from the course edit screen.\r\nAre you sure you want to proceed?",
				...i18n
			}
			this.initialize();
			this.setup_hooks();
		}
		initialize() {
			this.Toast = Swal.mixin({
				toast: true,
				position: 'top-end',
				showConfirmButton: false,
				timer: 3000,
				timerProgressBar: true,
				didOpen: (toast) => {
					toast.addEventListener( 'mouseenter', Swal.stopTimer )
					toast.addEventListener( 'mouseleave', Swal.resumeTimer )
				}
			})
		}
		setup_hooks() {
			// this.apex();this.flatPicker();this.Quill();
			// this.fullScreen();this.deleteLeadUser();
			// this.calendarPicker();this.switcherMenu();
			// this.sendRegLink();this.profileImgUpload();
			// this.printADiv();this.deletePayment();
			// this.deleteArchive();this.dropDownToggle();
			// this.deleteNotices();this.tinyMCE();

			this.insertTable();
		}
		apex() {
			var options = {
				chart: {
					type: 'line'
				},
				series: [{
					name: 'sales',
					data: [30,40,35,50,49,60,70,91,125]
				}],
				xaxis: {
					categories: [1991,1992,1993,1994,1995,1996,1997, 1998,1999]
				}
			}
			var chart = new ApexCharts(document.querySelector("#chart"), options);
			chart.render();
		}
		fullScreen() {
			document.querySelectorAll( '#btnFullscreen' ).forEach( ( el, ei ) => {
				el.addEventListener( 'click', ( event ) => {
					if( document.body.classList.contains( 'fwp-full-screen' ) ) {
						document.exitFullscreen();
					} else {
						document.body.requestFullscreen();
					}
					document.body.classList.toggle( 'fwp-full-screen' );document.documentElement.classList.toggle( 'wp-toolbar' );
				} );
			} );
		}
		flatPicker() {
			document.querySelectorAll( '.inline_flatpickr' ).forEach( ( el, ei ) => {
				flatpickr( el, {});
			} );
		}
		deleteLeadUser() {
			const thisClass = this;var theInterval, selector, lead;
			// theInterval = setInterval( () => {
				document.querySelectorAll( '.delete-lead-user:not([data-handled])' ).forEach( ( el, ei ) => {
					el.dataset.handled = true;
					document.body.addEventListener( 'delete-lead-' + el.dataset.id, () => {
						lead = document.querySelector( '#lead-' + el.dataset.id );
						if( lead ) {lead.remove();} else {
							console.log( el.dataset.id, lead );
						}
					} );
					el.addEventListener( 'click', ( event ) => {
						Swal.fire( {
							// title: `${result.value.login}'s avatar`,
							// imageUrl: result.value.avatar_url: 
							title: thisClass.i18n.are_u_sure,
							text: thisClass.i18n.sure_to_delete
						} ).then( (result) => {
							if (result.isConfirmed) {
								var formdata = new FormData();
								formdata.append( 'action', 'futurewordpress/project/action/deleteleadaccount' );
								formdata.append( 'lead', el.dataset.id );
								formdata.append( 'value', el.dataset.userInfo );
								formdata.append( '_nonce', thisClass.ajaxNonce );
								thisClass.sendToServer( formdata );
							}
						} );
					} );
				} );
			// }, 3000 );
		}
		deletePayment() {
			const thisClass = this;var theInterval, selector, lead;
			// theInterval = setInterval( () => {
				document.querySelectorAll( '.delete-stripe-log:not([data-handled])' ).forEach( ( el, ei ) => {
					el.dataset.handled = true;
					document.body.addEventListener( 'delete-stripe-log-' + el.dataset.id, () => {
						lead = document.querySelector( '#stripelog-' + el.dataset.id );
						if( lead ) {lead.remove();} else {console.log( el.dataset.id, lead );}
					} );
					el.addEventListener( 'click', ( event ) => {
						Swal.fire( {
							// title: `${result.value.login}'s avatar`,
							// imageUrl: result.value.avatar_url: 
							title: thisClass.i18n.are_u_sure,
							text: thisClass.i18n.sure_to_delete
						} ).then( (result) => {
							if (result.isConfirmed) {
								var formdata = new FormData();
								formdata.append( 'action', 'futurewordpress/project/action/deletepayment' );
								formdata.append( 'id', el.dataset.id );
								formdata.append( '_nonce', thisClass.ajaxNonce );
								thisClass.sendToServer( formdata );
							}
						} );
					} );
				} );
			// }, 3000 );
		}
		deleteNotices() {
			const thisClass = this;var theInterval, selector, lead;
			// theInterval = setInterval( () => {
				document.querySelectorAll( '.delete-events-log:not([data-handled])' ).forEach( ( el, ei ) => {
					el.dataset.handled = true;
					el.addEventListener( 'click', ( event ) => {
						Swal.fire( {
							title: thisClass.i18n.are_u_sure,
							text: thisClass.i18n.sure_to_delete
						} ).then( (result) => {
							if (result.isConfirmed) {
								var formdata = new FormData();
								formdata.append( 'action', 'futurewordpress/project/action/deletenotices' );
								formdata.append( 'delete', 'all' );
								formdata.append( '_nonce', thisClass.ajaxNonce );
								thisClass.sendToServer( formdata );
							}
						} );
					} );
				} );
			// }, 3000 );
		}
		sendRegLink() {
			const thisClass = this;var theInterval, selector, lead, retainer, contract;
			// theInterval = setInterval( () => {
				document.querySelectorAll( '.lead-send-registration:not([data-handled])' ).forEach( ( el, ei ) => {
					el.dataset.handled = true;
					document.body.addEventListener( 'sent-registration-' + el.dataset.id, () => {
						Swal.fire( { position: 'top-end', icon: 'success', title: thisClass.i18n.sent_reg_link, showConfirmButton: false, timer: 3500 } );
					} );
					document.body.addEventListener( 'sent-passreset-' + el.dataset.id, () => {
						Swal.fire( { position: 'top-end', icon: 'success', title: thisClass.i18n.sent_passreset, showConfirmButton: false, timer: 3500 } );
					} );
					el.addEventListener( 'click', ( event ) => {
						retainer = document.querySelector( 'input#monthly_retainer' );
						contract = document.querySelector( 'select#contract_type' );
						if( retainer && retainer.getAttribute( 'value' ) == '' || retainer.getAttribute( 'value' ) <= 0 ) {
							Swal.fire({
								title: thisClass.i18n.retainer_zero,
								text: thisClass.i18n.retainer_zerowarn,
								type: 'warn'
							})
						} else if( contract && typeof contract.dataset.current === 'undefined' || contract.dataset.current == '' ) {
							Swal.fire({
								title: thisClass.i18n.selectcontract,
								text: thisClass.i18n.selectcontractwarn,
								type: 'warn'
							})
						} else {
							Swal.fire({
								title: 'Do you want to save the changes?',
								showDenyButton: true,
								showCancelButton: true,
								confirmButtonText: thisClass.i18n.registration_link,
								denyButtonText: thisClass.i18n.password_reset,
								cancelButtonText: thisClass.i18n.cancel,
								input: 'text',
								inputValue: ( retainer && retainer.dataset.registration ) ? retainer.dataset.registration : '',
							}).then( ( result ) => {
								if( result.isDismissed ) {} else {
									var formdata = new FormData();
									if( result.isConfirmed ) {
										formdata.append( 'action', 'futurewordpress/project/action/sendregistration' );
									} else if( result.isDenied ) {
										formdata.append( 'action', 'futurewordpress/project/action/sendpasswordreset' );
									} else {}
									formdata.append( 'lead', el.dataset.id );
									formdata.append( 'value', el.dataset.userInfo );
									formdata.append( '_nonce', thisClass.ajaxNonce );
									thisClass.sendToServer( formdata );
								}
							} );
						}
					} );
				} );
			// }, 3000 );
		}
		calendarPicker() {
			const thisClass = this;var theInterval, selector;
			// theInterval = setInterval( () => {
				document.querySelectorAll( '.calendar-picker:not([data-handled])' ).forEach( ( el, ei ) => {
					el.dataset.handled = true;
					var args = {enableTime: true,dateFormat: "d-M-Y"};// noCalendar: true,
					if( el.dataset.config ) {args = JSON.parse( el.dataset.config );}
					flatpickr( el, args );
					if( ! thisClass.cssImported ) {
						var link = document.createElement( 'link' );link.rel = 'stylesheet';link.href = 'https://cdn.jsdelivr.net/npm/flatpickr/dist/flatpickr.min.css';
						document.head.appendChild( link );thisClass.cssImported = true;
					}
				} );
			// }, 3000 );
		}
		switcherMenu() {
			const thisClass = this;var theInterval, selector;var div, wrap, backdrop, elem, ul, li, a, span, ls, lead;
			theInterval = setInterval( () => {
				document.querySelectorAll( '.leadstatusswitcher:not([data-handled])' ).forEach( ( al, ai ) => {
					al.dataset.handled = true;
					Object.keys( thisClass.leadStatus ).forEach(function( lsi ) {
						document.body.addEventListener( 'lead-status-' + al.dataset.value + '-' + lsi, ( event ) => {
							lead = document.querySelector( '#lead-status-' + al.dataset.value );
							if( lead ) {
								lead.querySelectorAll( 'span.badge' ).forEach( ( span ) => span.remove() );
								span = document.createElement( 'span' );span.innerText = thisClass.leadStatus[ lsi ];
								span.classList.add( 'badge', 'bg-soft-success', 'p-2', 'text-success' );
								lead.insertBefore( span, lead.lastElementChild );
							}
						} );
					} );
					al.addEventListener( 'click', ( event ) => {
							div = document.createElement( 'div' );div.classList.add( 'popup-action-menu' );wrap = document.createElement( 'div' );wrap.classList.add( 'popup-action-wrap', 'card', 'p-2' );
							ul = document.createElement( 'ul' );ul.classList.add( 'list', 'list-none', 'list-unstyle' );
							Object.keys( thisClass.leadStatus ).forEach(function( lsi ) {
								ls = thisClass.leadStatus[ lsi ];
								li = document.createElement( 'li' );li.classList.add( 'list-item', 'p-2' );li.textContent = ls;li.dataset.value = lsi;li.dataset.lead = al.dataset.value;ul.appendChild( li );
							} );
							wrap.appendChild( ul );div.appendChild( wrap );document.body.appendChild( div );
					} );
				} );

				document.querySelectorAll( '.popup-action-menu .popup-action-wrap .list .list-item:not([data-handled])' ).forEach( ( al, ai ) => {
					al.dataset.handled = true;
					al.addEventListener( 'click', ( event ) => {
							var formdata = new FormData();
							formdata.append( 'action', 'futurewordpress/project/action/switchleadstatus' );
							formdata.append( 'lead', al.dataset.lead );
							formdata.append( 'value', al.dataset.value );
							formdata.append( '_nonce', thisClass.ajaxNonce );
							thisClass.sendToServer( formdata );
							document.querySelector( '.popup-action-menu' ).remove();
					} );
				} );
			}, 1000 );
		}
		profileImgUpload() {
			const thisClass = this;var theInterval, reader, file, preview;
			// theInterval = setInterval( () => {
				document.querySelectorAll( '.profile-image-upload:not([data-handled])' ).forEach( ( el, ei ) => {
					el.dataset.handled = true;
					el.addEventListener( 'change', ( event ) => {
						if( el.dataset.preview ) {
							preview = document.querySelector( el.dataset.preview );
							file = el.files[0];
							reader = new FileReader();
							reader.onloadend = function () {
								preview.src = reader.result;
								var formdata = new FormData();
								formdata.append( 'action', 'futurewordpress/project/filesystem/uploadavater' );
								formdata.append( 'lead', el.dataset.lead );
								formdata.append( 'avater', el.files[0] );
								formdata.append( '_nonce', thisClass.ajaxNonce );
								thisClass.sendToServer( formdata );
							}
							if (file) {
								reader.readAsDataURL(file);
							} else {
								if( preview.dataset.default ) {
									preview.src = preview.dataset.default;
								} else {
									preview.src = "";
								}
							}
						}
					} );
				} );
			// }, 3000 );
		}
		printADiv() {
			var node = document.querySelector( '.print-this-page' );
			if( ! node ) {return;}
			node.addEventListener( 'click', ( e ) => {
				var page = document.querySelector( e.target.dataset.print );
				var divToPrint = page.parentElement;page.classList.add( 'is-printing' );
				e.target.style.display = 'none';
				var newWin = window.open('', 'Print-Window');
				newWin.document.write('<html><head><link rel="stylesheet" type="text/css" href="https://wemakecontent.net/wp-content/plugins/tutor-lms-courses-moderation/assets/build/library/css/backend-library.css?ver=6.1.1" /></head><body onload="window.print()">' + divToPrint.innerHTML + '<style>.is-printing {min-height: 28cm;min-width: 20cm;max-height: 29.7cm;max-width: 21cm;}</style></body></html>');
				// newWin.document.close();newWin.close();
				e.target.style.display = 'block';page.classList.remove( 'is-printing' );
			} );
		}
		deleteArchive() {
			const thisClass = this;var el, message;
			document.querySelectorAll( '.archive-delete-btn' ).forEach( ( archive ) => {
				archive.addEventListener( 'click', ( event ) => {
					event.preventDefault();
					Swal.fire({
						icon: 'info',
						title: thisClass.i18n.are_u_sure,
						showCancelButton: true,
						showLoaderOnConfirm: true
					} ).then((result) => {
						if (result.isConfirmed ) {
							var formdata = new FormData();
								formdata.append( 'action', 'futurewordpress/project/action/deletearchives' );
								formdata.append( 'archive', archive.dataset.archive );
								formdata.append( 'userid', archive.dataset.userid );
								formdata.append( '_nonce', thisClass.ajaxNonce );
								thisClass.sendToServer( formdata );
						}
					} );
				} );
			} );
		}
		sendToServer( data ) {
			const thisClass = this;var message;
			$.ajax({
				url: thisClass.ajaxUrl,
				type: "POST",
				data: data,    
				cache: false,
				contentType: false,
				processData: false,
				success: function( json ) {
					// console.log( json );
					message = ( json.data.message ) ? json.data.message : json.data;
					if( json.success ) {
						thisClass.Toast.fire({icon: 'success',title: message})
						// toast.show({title: message, position: 'bottomright', type: 'info'});
					} else {
						thisClass.Toast.fire({icon: 'success',title: message})
						// toast.show({title: message, position: 'bottomright', type: 'warn'});
					}
					if( json.data.hooks ) {
						json.data.hooks.forEach( ( hook ) => {
							document.body.dispatchEvent( new Event( hook ) );
						} );
					}
				},
				error: function( err ) {
					thisClass.Toast.fire({icon: 'warning',title: err.responseText})
					// toast.show({title: err.responseText, position: 'bottomright', type: 'warn'});
					console.log( err.responseText );
				}
			});
		}
		dropDownToggle() {
			document.querySelectorAll( '[data-fwp-toggle]' ).forEach( ( el ) => {
				el.addEventListener( 'click', ( event ) => {
					event.preventDefault();
					event.target.classList.toggle( 'show' );
					event.target.setAttribute( 'aria-expanded', ( event.target.getAttribute( 'aria-expanded' ) === true ) );
					var target = document.querySelector( '[aria-labelledby="' + event.target.getAttribute( 'id' ) + '"]' );
					if( target ) {
							target.classList.toggle( 'show' );
							target.dataset.bsPopper = 'static';
					}
				} );
			} );
		}
		ckEditor() {
			document.querySelectorAll( '[data-ckeditor]:not([data-handled])' ).forEach( ( el ) => {
				el.dataset.handled = true;
				ClassicEditor.create( el ).catch( error => {
					console.error( error );
					toast.show({title: 'Inline Editor not properly Loaded.', position: 'bottomright', type: 'warn'});
        } );
			} );
		}
		tinyMCE() {
			document.querySelectorAll( '[data-tinymce]:not([data-handled])' ).forEach( ( el ) => {
				el.dataset.handled = true;el.id = ( el.id ) ? el.id : 'tinymce-instance' + Math.random();
				
				// tinymce.init({
				// 	selector: el.id,
				// 	// plugins: 'paste',
				// 	// toolbar: 'paste',
				// 	// paste_as_text: true, // this option removes any formatting when pasting content into the editor
				// 	// other options
				// });
			} );
		}
		Quill() {
			var nodes, css, js, textarea, options;
			nodes = document.querySelectorAll( '[data-tinymce]:not([data-handled])' );
			nodes.forEach( ( el ) => {
				el.dataset.handled = true;textarea = el.value;
				options = {
					debug: 'info',
					modules: {
						toolbar: true
					},
					placeholder: textarea,
					readOnly: false,
					theme: 'snow'
				};
				var quill = new Quill( el, options );
				quill.root.style.height = '300px';
				quill.setContents( quill.clipboard.convert( textarea ) );
			} );
			if( nodes.length >= 1 ) {
				css = document.createElement( 'link' );css.rel = 'stylesheet';css.href = 'https://cdn.quilljs.com/1.3.6/quill.snow.css';document.head.appendChild( css );
				// js = document.createElement( 'script' );js.type = 'text/javascript';js.src = 'https://cdn.quilljs.com/1.3.6/quill.core.js';document.body.appendChild( js );
			}
		}

		/**
		 * Start from here without removing necessery functions.
		 */
		insertTable() {
			const thisClass = this;var thead, tbody, th, td, p, x;

			thead = document.querySelector( '.tutor-nav-item .tutor-nav-link.is-active span:first-child' );
			if( thead && thead.innerHTML == thisClass.i18n.deletion ) {
				th = document.createElement( 'th' );th.style.width = '10%';th.innerHTML = 'Requested';
				thead = document.querySelector( '.tutor-table thead > tr' );thead.insertBefore( th, thead.children[3] );

				tbody = document.querySelectorAll( '.tutor-table tbody > tr' );
				tbody.forEach( ( tr, i ) => {
					td = document.createElement( 'td' );td.style.width = '10%';
					p = tr.querySelector( '.fwp-special-hook' );
					if( p ) {td.innerHTML = p.innerHTML;} else {td.innerHTML = '';}
					tr.insertBefore( td, tr.children[3] );

					td = tr.querySelector( '.tutor-dropdown-parent' );
					// x = document.createElement( 'a' );x.href = 'javascript:void(0)';x.title = thisClass.i18n.markprivate; x.classList.add( 'fwp-private-course-btn' );
					// x.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="30px" height="30px" viewBox="0 0 1024 1024" stroke="#000000" stroke-width="1.024"><g id="SVGRepo_bgCarrier" stroke-width="0"/><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"/><g id="SVGRepo_iconCarrier"><circle cx="512" cy="512" r="512"/><path data-name="PIA logo (monochrome version by krisu)" d="M486.59 371c0-15.43-18.66-23.16-29.57-12.26s-3.19 29.58 12.24 29.58a17.32 17.32 0 0 0 17.32-17.33m68.18-17.31c-15.43 0-23.18 18.65-12.26 29.57s29.58 3.17 29.57-12.26a17.31 17.31 0 0 0-17.31-17.31m-18.66 45.89a36 36 0 0 1-48.17 0c-4.37-3.69-10.12 2.53-6.09 6.6a44 44 0 0 0 60.37 0 4.5 4.5 0 0 0-6.11-6.6m159.63 67v-.25a36.09 36.09 0 0 0-26.22-34.7v-30.91A152.73 152.73 0 0 0 516.79 248h-5.84a152.73 152.73 0 0 0-152.73 152.71v30.12A36.09 36.09 0 0 0 328.59 466a51.34 51.34 0 0 0-7.09 26v195.85a51.54 51.54 0 0 0 38.1 49.74A37.7 37.7 0 0 0 394.06 760h42.84a37.69 37.69 0 0 0 33.6-20.59h78.59A37.68 37.68 0 0 0 582.66 760h42.85a37.72 37.72 0 0 0 34-21.37 51.57 51.57 0 0 0 43-50.82V492.06a51.31 51.31 0 0 0-6.78-25.49zM559.55 656.36a23.1 23.1 0 0 1-22.84 26.46H487.3a23.12 23.12 0 0 1-22.85-26.44l9.55-64.56a58.61 58.61 0 0 1 31.4-102.87A58.62 58.62 0 0 1 550 591.83zm5.58-215.88h-106A35.88 35.88 0 0 0 434 430.24h-18v-32.06a95.65 95.65 0 0 1 95.62-95.64h4.67a95.65 95.65 0 0 1 95.62 95.64v32.06h-21.6a35.89 35.89 0 0 0-25.18 10.24zm-21.94 219a5.49 5.49 0 0 1-5.37 6.89h-51.33a5.48 5.48 0 0 1-5.36-6.91l9.87-71.23a8.49 8.49 0 0 0-.44-3.13 16 16 0 0 0-3.16-3.21c-.18-.15-.31-.26-.42-.36a42.24 42.24 0 1 1 50.43-.31c0 .07-.16.28-.65.68a16 16 0 0 0-3.16 3.21 5.22 5.22 0 0 0-.32 1.42z"/></g></svg>';
					// x.dataset.course = tr.querySelector( 'div[id^="table-dashboard-course-list-"]' ).id.replace( 'table-dashboard-course-list-', '' );
					// td.parentElement.insertBefore( x, td );

					x = document.createElement( 'a' );x.href = 'javascript:void(0)';x.title = thisClass.i18n.reject; x.classList.add( 'fwp-remove-course-btn' );
					x.innerHTML = '<svg width="30px" height="30px" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="M105.367 18.328c23.14 15.444 46.098 31.27 68.55 47.572-45.055-20.895-94.51-35.918-149.37-44.246 46.697 26.72 91.596 55.58 135.705 85.524-37.203-18.033-77.48-32.22-121.602-41.37 58.218 34.322 109.368 72.465 154.71 114.206C136.02 227.227 86.295 284.717 45.79 354.18c27.11-24.29 54.91-47.545 82.868-70.68C81.942 339.36 45.05 405.01 20.2 482.135c20.36-24.62 40.988-48.203 61.905-70.817 44.7-67.485 89.567-147.11 148.856-170.418-29.61 30.708-63.36 75.164-98.25 118.145 40.99-40.437 83.09-77.46 126.415-111.512 61.598 70.49 110.757 149.38 152.145 235.873-6.738-44.794-16.796-87.384-30.03-127.666l46.444 65.53s-26.037-72.69-43.66-101.987c40.76 55.91 78.208 114.428 112.328 175.205-18.674-89.454-50.512-169.772-98.893-238.224 34.906 34.69 68.637 71.1 100.93 109.045C465.048 288.827 423.58 221.82 372.214 167c40.224-25.887 81.48-49.73 123.863-71.783-32.025 5.56-62.49 12.92-92.006 21.934 21.836-16.173 44.41-32.124 67.024-47.523-37.987 11.91-74.633 25.775-109.067 41.433 42.668-27.673 86.32-53.668 131.004-78.602h-.003c-67.47 18.055-130.83 42.19-188.998 73.548-56.294-41.79-122.01-71.787-198.663-87.68z"/></svg>';
					x.dataset.course = tr.querySelector( 'div[id^="table-dashboard-course-list-"]' ).id.replace( 'table-dashboard-course-list-', '' );
					td.parentElement.appendChild( x );
				} );
				setTimeout(() => {
					tbody = document.querySelectorAll( '.fwp-private-course-btn' );
					tbody.forEach( ( el, i ) => {
						// document.body.addEventListener( 'course-private-' + el.dataset.course, ( event ) => {
						// } );
						el.addEventListener( 'click', ( e ) => {
							Swal.fire({
								icon: 'info',
								title: thisClass.i18n.markprivate,
								html: thisClass.i18n.markprivateText,
								showCancelButton: true,
							} ).then((result) => {
								if( result.isConfirmed ) {
									// var course = document.querySelector( 'div[id^="table-dashboard-course-list-"]' );
									// if( course ) {course = course.id.replace( 'table-dashboard-course-list-', '' );}
									var formdata = new FormData();
										formdata.append( 'action', 'futurewordpress/project/action/please_lockTutorLMSCourse' );
										formdata.append( 'course', el.dataset.course );
										formdata.append( 'userid', thisClass.user_id );
										formdata.append( '_nonce', thisClass.ajaxNonce );
										thisClass.sendToServer( formdata );
								}
							} );
						} );
					} );
					tbody = document.querySelectorAll( '.fwp-remove-course-btn' );
					tbody.forEach( ( el, i ) => {
						document.body.addEventListener( 'course-remove-' + el.dataset.course, ( event ) => {
							el.parentElement.parentElement.parentElement.remove();
							if( document.querySelectorAll( '.tutor-dropdown-parent' ) <= 0 ) {location.reload();}
						} );
						el.addEventListener( 'click', ( e ) => {
							Swal.fire({
								icon: 'info',
								title: thisClass.i18n.declain,
								html: thisClass.i18n.declainText,
								showCancelButton: true,
							} ).then((result) => {
								if( result.isConfirmed ) {
									// var course = document.querySelector( 'div[id^="table-dashboard-course-list-"]' );
									// if( course ) {course = course.id.replace( 'table-dashboard-course-list-', '' );}
									var formdata = new FormData();
										formdata.append( 'action', 'futurewordpress/project/action/please_undeleteTutorLMSCourse' );
										formdata.append( 'course', el.dataset.course );
										formdata.append( 'userid', thisClass.user_id );
										formdata.append( '_nonce', thisClass.ajaxNonce );
										thisClass.sendToServer( formdata );
								}
							} );
						} );
					} );
				}, 1000 );
			}
		}
	}

	new FWPListivoBackendJS();
} )( jQuery );
