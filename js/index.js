const store = new Vuex.Store({
	state: {
		messages: [],
		name_bot: 'Angela',
		writing: false,
		urlBot:
			'https://account.snatchbot.me/channels/api/api/id124889/appchatbot_angela/apschatbot_angela?user_id=chatbot_angela',
		imageAgent: 'chatbot-angela/images/angela.jpeg',
		imageUser: 'chatbot-angela/images/1.jpg',
	},
	mutations: {
		ADD_MESSAGE_USER(state, message) {
			state.messages.push({
				text: message,
				type: 'user',
			});
		},
		ADD_MESSAGE_AGENT(state, data) {
			data.forEach((element) => {
				state.messages.push({
					text: element.message,
					type: 'agent',
				});
			});
		},
		ADD_MESSAGE_OPT_PRINCIPALES(state) {
			state.messages.push({
				text: '',
				type: 'opciones',
			});
		},
		ADD_MESSAGE_FORM_MUESTRAS(state) {
			state.messages.push({
				text: '',
				type: 'muestras',
			});
		},
		ADD_MESSAGE_FORM_RESULTADOS(state) {
			state.messages.push({
				text: '',
				type: 'resultados',
			});
		},
		ADD_MESSAGE_FORM_CITAS(state) {
			state.messages.push({
				text: '',
				type: 'citas',
			});
		},
	},
	actions: {
		sendMessageReset({ state, commit }) {
			axios
				.post(state.urlBot, {
					message: 'reiniciar',
				})
				.then((res) => {
					commit('ADD_MESSAGE_AGENT', res.data.messages);
				})
				.then(() => {
					axios
						.post(state.urlBot, {
							message: 'hola angela',
						})
						.then((res) => {
							commit('ADD_MESSAGE_AGENT', res.data.messages);
						});
				});
		},
		sendMessageUser({ state, commit }, message) {
			if (
				message !== 'Muestras' &&
				message !== 'Resultados' &&
				message !== 'Citas' &&
				message !== 'enviado' &&
				message !== 'hola angela'
			) {
				commit('ADD_MESSAGE_USER', message);
			}
			state.writing = true;
			axios
				.post(state.urlBot, {
					message: message,
				})
				.then((res) => {
					commit('ADD_MESSAGE_AGENT', res.data.messages);
					state.writing = false;
					if (res.data.cards.length > 0) {
						if (res.data.cards[0].value == 'opciones_principales') {
							commit('ADD_MESSAGE_OPT_PRINCIPALES');
						}
					}
					if (message == 'Muestras') {
						commit('ADD_MESSAGE_FORM_MUESTRAS');
						return;
					}
					if (message == 'Resultados') {
						commit('ADD_MESSAGE_FORM_RESULTADOS');
						return;
					}
					if (message == 'Citas') {
						commit('ADD_MESSAGE_FORM_CITAS');
						return;
					}
				});
		},
	},
});
//Fin Vuex

const app = new Vue({
	el: '#app',
	store,
	data: {
		userMessage: '',
	},
	computed: {
		...Vuex.mapState(['messages', 'name_bot', 'writing']),
	},
	mounted() {
		this.sendMessageReset();
	},
	updated() {
		$('#scroll').scrollTop(1000000);
	},
	methods: {
		...Vuex.mapActions(['sendMessageReset', 'sendMessageUser']),
		enviar() {
			this.sendMessageUser(this.userMessage);
			this.userMessage = '';
		},
		abrirChat() {
			console.log('open');
			document.getElementById('chat').classList.remove('chatClose');
			document.getElementById('chat').classList.add('open');
		},
		cerrarChat() {
			console.log('close');
			document.getElementById('chat').classList.remove('open');
			document.getElementById('chat').classList.add('chatClose');
		},
	},
});
