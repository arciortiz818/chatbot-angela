Vue.component('message-agent', {
	props: ['text'],
	template: `
      <div class="row row-message">
        <div class="col-2">
          <img :src="imageAgent" alt="" class="rounded-circle" height="50" width="50" />
        </div>
        <div class="col-10 alert alert-secondary message-agent">
          <p class="card-text"> {{ text }} </p>
        </div>
      </div>
  `,
	computed: {
		...Vuex.mapState(['imageAgent']),
	},
});

Vue.component('message-user', {
	props: ['text'],
	template: `
    <div class="row row-message">
      <div class="col-10 alert alert-primary message-user">
        <p class="card-text"> {{ text }} </p>
      </div>
      <div class="col-2">
        <img :src="imageUser" alt="" class="rounded-circle" height="50" width="50" />
      </div>
    </div>
  `,
	computed: {
		...Vuex.mapState(['imageUser']),
	},
});

Vue.component('opciones-principales', {
	template: `
    <div class="row row-message text-center">
      <div class="container">
        <div class="row mb-3">
          <div class="col-8 offset-2">
            <button class="btn btn-success" @click="sendMessageUser('Muestras')">Toma de Muestras a Domicilio</button>
          </div>
        </div>
        <div class="row mb-3">
          <div class="col-8 offset-2">
            <button class="btn btn-success" @click="sendMessageUser('Resultados')">Entrega de Resultados a Domicilio</button>
          </div>
        </div>
        <div class="row mb-3">
          <div class="col-8 offset-2">
            <button class="btn btn-success" @click="sendMessageUser('Citas')">Programación de Citas</button>
          </div>
        </div>
      </div>
    </div>
  `,
	methods: {
		...Vuex.mapActions(['sendMessageUser']),
	},
});

Vue.component('message-form-muestras', {
	template: `
    <div class="row row-message">
      <div class="form alert alert-secondary col">
        <div class="form-group">
          <h5 class="text-center">Solicitud de Toma de Muestras a Domicilio</h5>
        </div>
        <div class="form-group">
          <input type="text" class="form-control" v-model="datos.nombre" placeholder="Nombre Completo" />
        </div>
        <div class="form-group">
          <input type="text" class="form-control" v-model="datos.documento" placeholder="Documento de Identidad" />
        </div>
        <div class="form-group">
          <input type="text" class="form-control" v-model="datos.telefono" placeholder="Teléfono de Contacto" />
        </div>
        <div class="form-group">
          <input type="text" class="form-control" v-model="datos.direccion" placeholder="Dirección" />
        </div>
        <div class="form-group">
          <input type="text" class="form-control" v-model="datos.entidad_salud" placeholder="Entidad de Salud que lo remite" />
        </div>
        <div class="form-group">
          <input type="text" class="form-control" v-model="datos.examenes_realizar" placeholder="Exámenes a realizar" />
        </div>
        <div class="form-group">
          <button class="btn btn-block btn-success" @click="solicitarTomaMuestras()">Solicitar</button>
        </div>
      </div>
    </div>
  `,
	data() {
		return {
			datos: {
				nombre: '',
				documento: '',
				telefono: '',
				direccion: '',
				entidad_salud: '',
				examenes_realizar: '',
			},
		};
	},
	computed: {
		...Vuex.mapState(['imageAgent']),
	},
	methods: {
		...Vuex.mapActions(['sendMessageUser']),
		solicitarTomaMuestras() {
			const datosEmail = `
        <div>
          <table>
            <tbody>
              <tr>
                <td><b>Nombre Completo</b></td>
                <td>${this.datos.nombre}</td>
              </tr>
              <tr>
                <td><b>Documento de Identificación</b></td>
                <td>${this.datos.documento}</td>
              </tr>
              <tr>
                <td><b>Teléfono</b></td>
                <td>${this.datos.telefono}</td>
              </tr>
              <tr>
                <td><b>Dirección</b></td>
                <td>${this.datos.direccion}</td>
              </tr>
              <tr>
                <td><b>Entidad de Salud que lo remite</b></td>
                <td>${this.datos.entidad_salud}</td>
              </tr>
              <tr>
                <td><b>Exámenes a realizar</b></td>
                <td>${this.datos.examenes_realizar}</td>
              </tr>
            </tbody>
          </table>
        </div>
      `;
			axios
				.post('https://us-central1-mailer-bbdb3.cloudfunctions.net/mailer', {
					to: 'arciniegas.ortiz818@gmail.com',
					message: datosEmail,
					subject: 'Solicitud Toma de Muestras a Domicilio',
				})
				.then((res) => {
					this.sendMessageUser('enviado');
				});
		},
	},
});

Vue.component('message-form-resultados', {
	template: `
    <div class="row row-message text-center">
      <div class="form alert alert-secondary col">
        <div class="form-group">
          <h5 class="text-center">Solicitud de Entrega de Resultados a Domicilio</h5>
        </div>
        <div class="form-group">
          <input type="text" class="form-control" v-model="datos.nombre" placeholder="Nombre Completo" />
        </div>
        <div class="form-group">
          <input type="text" class="form-control" v-model="datos.documento" placeholder="Documento de Identidad" />
        </div>
        <div class="form-group">
          <input type="text" class="form-control" v-model="datos.telefono" placeholder="Teléfono de Contacto" />
        </div>
        <div class="form-group">
          <input type="text" class="form-control" v-model="datos.email" placeholder="Email" />
        </div>
        <div class="form-group">
          <input type="text" class="form-control" v-model="datos.fecha_examenes" placeholder="Fecha en que se realizó el (los) exámen (es)" />
        </div>
        <div class="form-group">
          <input type="text" class="form-control" v-model="datos.fecha_entrega" placeholder="Fecha de entrega" />
        </div>
        <div class="form-group">
          <input type="text" class="form-control" v-model="datos.direccion" placeholder="Dirección de entrega" />
        </div>
        <div class="form-group">
          <input type="text" class="form-control" v-model="datos.ciudad" placeholder="Ciudad de Entrega" />
        </div>
        <div class="form-group">
          <input type="text" class="form-control" v-model="datos.examenes_realizados" placeholder="Exámen(es) realizado(s)" />
        </div>
        <div class="form-group">
          <button class="btn btn-block btn-success" @click="solicitarEntregaResultados()">Solicitar</button>
        </div>
      </div>
    </div>
  `,
	data() {
		return {
			datos: {
				nombre: '',
				documento: '',
				telefono: '',
				email: '',
				fecha_examenes: '',
				fecha_entrega: '',
				direccion: '',
				ciudad: '',
				examenes_realizados: '',
			},
		};
	},
	computed: {
		...Vuex.mapState(['imageAgent']),
	},
	methods: {
		...Vuex.mapActions(['sendMessageUser']),
		solicitarEntregaResultados() {
			const datosEmail = `
        <div>
          <table>
            <tbody>
              <tr>
                <td><b>Nombre Completo</b></td>
                <td>${this.datos.nombre}</td>
              </tr>
              <tr>
                <td><b>Documento de Identificación</b></td>
                <td>${this.datos.documento}</td>
              </tr>
              <tr>
                <td><b>Teléfono</b></td>
                <td>${this.datos.telefono}</td>
              </tr>
              <tr>
                <td><b>Email</b></td>
                <td>${this.datos.email}</td>
              </tr>
              <tr>
                <td><b>Fecha Toma Exámenes</b></td>
                <td>${this.datos.fecha_examenes}</td>
              </tr>
              <tr>
                <td><b>Fecha Entrega Exámenes</b></td>
                <td>${this.datos.fecha_entrega}</td>
              </tr>
              <tr>
                <td><b>Dirección de Entrega</b></td>
                <td>${this.datos.direccion}</td>
              </tr>
              <tr>
                <td><b>Ciudad de Entrega</b></td>
                <td>${this.datos.ciudad}</td>
              </tr>
              <tr>
                <td><b>Exámenes Realizados</b></td>
                <td>${this.datos.examenes_realizados}</td>
              </tr>
            </tbody>
          </table>
        </div>
      `;
			axios
				.post('https://us-central1-mailer-bbdb3.cloudfunctions.net/mailer', {
					to: 'arciniegas.ortiz818@gmail.com',
					message: datosEmail,
					subject: 'Solicitud Entrega Resultados a Domicilio',
				})
				.then((res) => {
					this.sendMessageUser('enviado');
				});
		},
	},
});
