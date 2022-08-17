var abierto = false;
function chatbot_abrirChat() {
	if (!abierto) {
		abierto = true;
		var chatElement = `
		<div id="chatbot_chat" class="wcs_fixed_right">
			<div class="card chatbot_header">
				<div class="card-body">
					<div class="card-title">
						<div class="chatbot_circleGreen mt-2"></div>
						<div>
							<h5 style="color: white;">Angela</h5>
						</div>
						<div class="ml-auto mt-0" onclick="chatbot_cerrarChat();" style="cursor:pointer;">
							<span class="fa fa-close" style="font-size:24px;"></span>
						</div>
					</div>
				</div>
			</div>
			<div class="card chatbot_content">
				<div class="card-body">
					<iframe
						frameborder="0"
						scrolling="no"
						id="chatbot_iframe"
						height="90%"
						width="100%"
						src="https://arciortiz818.github.io/chatbot-angela"
					></iframe>
				</div>
			</div>
		</div>
	`;
		$('#chatbot_btnAbrirChat').before(chatElement);
	} else {
		$('#chatbot_chat').addClass('wcs_fixed_right');
		$('#chatbot_chat').css('display', 'block');
	}
	$('#chatbot_btnAbrirChat').css('display', 'none');
}

function chatbot_cerrarChat() {
	$('#chatbot_btnAbrirChat').css('display', 'block');
	$('#chatbot_chat').removeClass('wcs_fixed_right');
	$('#chatbot_chat').css('display', 'none');
	// abierto = false;
}

function addStyles() {
	var css = `
			@media only screen and (min-width: 1367px) {
				#chatbot_chat {
					width: 25%;
					right: 30px;
				}
			}

			/* Para 960px */
			@media only screen and (max-width: 1366px) and (min-width: 1025px) {
				#chatbot_chat {
					width: 30%;
					right: 30px;
				}
			}

			/* Para 960px */
			@media only screen and (max-width: 1024px) and (min-width: 821px) {
				#chatbot_chat {
					width: 40%;
					right: 30px;
				}
			}

			/* Para 800px */
			@media only screen and (max-width: 820px) and (min-width: 621px) {
				#chatbot_chat {
					width: 50%;
					right: 30px;
				}
			}

			/* Para 600px */
			@media only screen and (max-width: 620px) and (min-width: 501px) {
				#chatbot_chat {
					width: 70%;
					right: 0px;
				}
			}

			/* Para 480px */
			@media only screen and (max-width: 500px) and (min-width: 5px) {
				#chatbot_chat {
					width: 100%;
					right: 0px;
				}
			}

			/* Para 320px
			@media only screen and (max-width: 340px) and (min-width: 5px) {
				#chatbot_chat {
					width: 100%;
					right: 0px;
				}
			}*/

			/* Altura mínima */
			@media only screen and (min-height: 501px) {
				#chatbot_chat {
					height: 70%;
					min-height: 400px;
				}
			}

			@media only screen and (max-height: 500px)  and (min-height: 5px) {
				#chatbot_chat {
					height: 100%;
				}
			}



			/* Boton Abrir Chat */
			#chatbot_btnAbrirChat {
				right: 10px;
				bottom: 70px;
				position: fixed;
				border-color: #0049aa;
				border-radius: 100%;
				background-image: url('https://arciortiz818.github.io/chatbot-angela/images/img-angela.jpeg');
				height: 100px;
				width: 100px;
				background-repeat: no-repeat;
				background-position: center;
				background-size: cover;
			}

			#chatbot_chat {
				bottom: 0px;
				position: fixed;
			}

			#chatbot_iframe {
				overflow: hidden;
				border: none;
				height: 100%;
				width: 100%;
			}

			.chatbot_header {
				background-color: #0049aa;
				color: white;
				height: 60px;
				width: 100%;
			}

			.chatbot_header > div {
				padding-top: 15px;
			}

			.chatbot_header > div > div {
				display: flex;
			}

			.chatbot_content {
				height: 90%;
				width: 100%;
			}

			.chatbot_circleGreen {
				background-color: rgb(0, 255, 0);
				border-radius: 100%;
				height: 10px;
				width: 10px;
				margin-right: 10px;
			}


          `;
	var head = document.head || document.getElementsByTagName('head')[0];
	var style = document.createElement('style');

	head.appendChild(style);

	style.type = 'text/css';
	if (style.styleSheet) {
		// This is required for IE8 and below.
		style.styleSheet.cssText = css;
	} else {
		style.appendChild(document.createTextNode(css));
	}
}

function addButtonChat() {
	var div = document.createElement('div');
	var newContent = `
		<button onclick="chatbot_abrirChat();" id="chatbot_btnAbrirChat" class="rounded-circle wcs_fixed_right"></button>
              `;
	div.innerHTML = newContent;
	document.body.appendChild(div);
}

addStyles();
addButtonChat();
