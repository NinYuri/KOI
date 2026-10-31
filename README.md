# KOI - COCINA JAPONESA
Aplicación web full-stack para un restaurante de sushi, inspirada en el minimalismo japonés. KOI ofrece una experiencia interactiva para explorar el menú, consultar reseñas de clientes y administrar el contenido del restaurante mediante un sistema de autenticación y control de acceso basado en roles.

## Tabla de Contenido
- Acerca del proyecto
- Características
- Tecnologías utilizadas
- Estructura del proyecto
- Requisitos del sistema
- Instalación
- Variables de entorno
- Configuración de la base de datos
- Ejecución del proyecto
- Documentación de la API
- Autenticación y seguridad

## Acerca del Proyecto
KOI es una aplicación web diseñada para presentar la oferta gastronómica de un restaurante de sushi mediante una interfaz minimalista, intuitiva y adaptable a diferentes dispositivos.

El proyecto utiliza una arquitectura cliente-servidor, separando las responsabilidades del frontend, el backend y la base de datos.

La aplicación permite a los visitantes explorar el menú por categorías y consultar reseñas publicadas. Por otra parte, los administradores pueden gestionar los productos, cargar imágenes y moderar las reseñas mediante endpoints protegidos.

## Características
### Experiencia de Usuario
- Página principal adaptable a dispositivos móviles y escritorio.
- Catálogo dinámico de platillos organizado por categorías.
- Consulta de productos mediante una API REST.
- Paginación para cargar productos progresivamente.
- Cambio dinámico entre categorías del menú.
- Secciones informativas sobre el restaurante y sus sucursales.
- Visualización de reseñas publicadas.
- Registro de usuarios e inicio de sesión.

### Administración
- Autenticación segura para administradores.
- Creación de productos mediante formularios.
- Actualización de información y disponibilidad de productos.
- Desactivación lógica de productos sin eliminarlos físicamente de la base de datos.
- Eliminación física disponible mediante el procedimiento almacenado correspondiente.
- Carga y almacenamiento de imágenes mediante Cloudinary.
- Consulta de usuarios registrados.
- Moderación de reseñas mediante su publicación o despublicación.
- Control de acceso basado en roles.

### Gestión de reseñas
- Registro de reseñas asociado al usuario autenticado.
- Validación de comentarios y calificaciones.
- Calificaciones de 1 a 5 estrellas.
- Publicación de reseñas mediante autorización administrativa.
- Consulta pública de reseñas publicadas.

### Backend
- API REST desarrollada con Node.js y Express.
- Operaciones CRUD para la gestión de productos.
- Gestión de usuarios y autenticación.
- Creación, consulta y moderación de reseñas.
- Integración con PostgreSQL.
- Procedimientos almacenados para las operaciones de base de datos.
- Integración con Prisma ORM.
- Autenticación mediante JSON Web Tokens (JWT).
- Validación de datos y middleware de seguridad.
- Manejo de imágenes mediante Multer y Cloudinary.

## Tecnologías utilizadas
| Área | Tecnologías |
|---|---|
| Frontend | React, JavaScript, Vite, CSS |
| Backend | Node.js, Express |
| Base de datos | PostgreSQL |
| ORM | Prisma |
| Autenticación | JSON Web Tokens (JWT) |
| Hash de contraseñas | PostgreSQL crypt() |
| Almacenamiento de imágenes | Cloudinary |
| Procesamiento de archivos | Multer |
| Seguridad | Helmet, CORS |
| Control de versiones | Git, GitHub |

## Estructura del proyecto
```text
KOI/
├── client/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── sections/
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── index.css
│   │   └── main.jsx
│   └── package.json
│
├── database/
|
├── server/
│   ├── prisma/
│   │   └── schema.prisma
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── generated/
│   │   ├── middlewares/
│   │   ├── routes/
│   │   ├── app.js
│   │   └── server.js
│   ├── .env.example
│   └── package.json
│
├── .gitignore
└── README.md
```

## Requisitos del sistema
Antes de ejecutar el proyecto, asegúrate de contar con las siguientes herramientas:

- **Node.js**: versión 24.x o compatible.
- **npm**: incluido con Node.js.
- **PostgreSQL**: servidor de base de datos local.
- **Git**: para clonar el repositorio.
- **Cuenta de Cloudinary**: necesaria para cargar imágenes de productos.

## Instalación
**1. Clonar el repositorio**
```bash
git clone https://github.com/NinYuri/KOI.git
cd KOI
```

**2. Instalar las dependencias del frontend**
```bash
cd client
npm install
```

**3. Instalar las dependencias del backend**

Abre una segunda terminal y ejecuta:
```bash
cd server
npm install
```

## Variables de entorno
El backend requiere variables de entorno para establecer la conexión con la base de datos, configurar la autenticación y gestionar el almacenamiento de imágenes.

Crea un archivo *.env* dentro de la carpeta *server/*.

Utiliza la siguiente plantilla, sustituyendo los valores de ejemplo por tus propias credenciales:

```text
# Servidor
PORT=3000

# PostgreSQL
DATABASE_URL="postgresql://USUARIO:CONTRASEÑA@localhost:5432/koi_db?schema=public"

# JWT
JWT_SECRET=TU_CLAVE_SECRETA
JWT_EXPIRES_IN=1h

# Cloudinary
CLOUDINARY_CLOUD_NAME=TU_CLOUD_NAME
CLOUDINARY_API_KEY=TU_API_KEY
CLOUDINARY_API_SECRET=TU_API_SECRET
```

Para el frontend, crea un archivo *.env* dentro de la carpeta *client/*:
```text
VITE_API_URL=http://localhost:3000
```

Después de modificar las variables de entorno del frontend, reinicia el servidor de Vite para aplicar los cambios.

## Configuración de la base de datos
**1. Crear la base de datos**

Crea una base de datos en PostgreSQL con el siguiente nombre:
```bash
CREATE DATABASE koi_db;
```

**2. Crear las tablas y procedimientos almacenados**

Ejecuta los scripts SQL correspondientes a la estructura de la base de datos y sus procedimientos almacenados.

La base de datos está compuesta por cuatro tablas principales:

- **CLIENT**: Almacena la información de los usuarios, sus credenciales, fotografías de perfil y roles.
- **CATEGORY**: Almacena las categorías disponibles en el menú.
- **PRODUCT**: Almacena los productos del restaurante, incluyendo su descripción, precio, imagen y disponibilidad.
- **REVIEW**: Almacena las reseñas de los clientes, sus calificaciones y estado de publicación.

Las relaciones entre las tablas permiten asociar cada producto con su categoría y cada reseña con el usuario que la registró.

**3. Configurar Prisma**

Verifica que la variable *DATABASE_URL* apunte correctamente a la base de datos.

Desde la carpeta *server/*, ejecuta:
```bash
npx prisma generate
```

Este comando genera Prisma Client, utilizado por el backend para interactuar con PostgreSQL.

**Nota**: Las tablas y los procedimientos almacenados deben estar creados previamente. La generación de Prisma Client no crea los procedimientos almacenados.

## Ejecución del proyecto
El frontend y el backend deben ejecutarse simultáneamente en terminales independientes.

### Iniciar el backend
```bash
cd server
npm run dev
```

La API estará disponible en:
```bash
http://localhost:3000
```

### Iniciar el frontend
```bash
cd client
npm run dev
```

Vite mostrará en la terminal la dirección local de la aplicación, generalmente:
```bash
http://localhost:5173
```

## Documentación de la API
La API utiliza el formato JSON para el intercambio de información, excepto en las operaciones que requieren la carga de imágenes, las cuales utilizan *multipart/form-data*.

URL base:
```bash
http://localhost:3000/api
```

### Autenticación y usuarios
| Método | Endpoint | Descripción | Acceso |
|---|---|---|---|
| POST | `/auth/register` | Registrar un usuario | Público |
| POST | `/auth/login` | Iniciar sesión | Público |
| GET | `/auth` | Consultar todos los usuarios registrados | Administrador |

#### **Registro de usuarios**
**Endpoint**:
```bash
POST /api/clients/register
```
Permite registrar nuevos usuarios. El rol se asigna desde el servidor y, durante el registro público, se establece automáticamente como User.

#### **Inicio de sesión**
**Endpoint**:
```bash
POST /api/clients/login
```
Verifica las credenciales del usuario y devuelve un JWT junto con la información necesaria para identificar su sesión y rol.

#### **Consulta de usuarios**
**Endpoint**:
```bash
GET /api/clients
```
Permite consultar los usuarios registrados. Requiere autenticación y autorización con rol Admin.

### Productos
| Método | Endpoint | Descripción | Acceso |
|---|---|---|---|
| GET | `/products` | Consultar productos | Público |
| POST | `/products` | Crear un producto | Administrador |
| PUT | `/products/:id` | Actualizar un producto | Administrador |
| DELETE | `/products/:id` | Eliminar un producto | Administrador |

#### **Consultar productos**
**Endpoint**:
```bash
GET /api/products?category=Rolls&page=1
```
Permite consultar los productos disponibles de una categoría específica.

La API admite los siguientes parámetros:

- **category**: nombre de la categoría.
- **page**: número de página que se desea consultar.

La paginación devuelve hasta ocho productos por página e incluye la propiedad *hasMore*, que indica si existen más productos disponibles.

#### **Crear un producto**
**Endpoint**:
```bash
POST /api/products
```
Registra un nuevo producto en la base de datos.

La solicitud utiliza *multipart/form-data* e incluye los siguientes campos:

| Campo | Descripción |
|---|---|
| name | Nombre del producto |
| description | Descripción del producto |
| price | Precio del producto |
| category | Categoría del producto |
| image | Archivo de imagen |

La imagen se carga en Cloudinary y su URL se almacena en PostgreSQL.

#### **Actualizar un producto**
**Endpoint**:
```bash
PUT /api/products/:id
```
Permite modificar la información de un producto existente. Los campos pueden actualizarse individualmente y la imagen puede reemplazarse mediante una nueva carga.

#### **Eliminar un producto**
**Endpoint**:
```bash
DELETE /api/products/:id
```
Realiza la eliminación del producto en la base de datos.

### Reseñas
| Método | Endpoint | Descripción | Acceso |
|---|---|---|---|
| GET | `/reviews` | Consultar reseñas publicadas | Público |
| POST | `/reviews` | Registrar una reseña | Usuario autenticado |
| PUT | `/reviews/:id/publish` | Publicar o despublicar una reseña | Administrador |

#### **Consultar reseñas publicadas**
**Endpoint**:
```bash
GET /api/reviews
```
Devuelve las reseñas cuyo estado de publicación es *TRUE*, incluyendo la información del usuario asociado.

#### **Registrar una reseña**
**Endpoint**:
```bash
POST /api/reviews
```
Permite a los usuarios autenticados registrar una reseña.

Ejemplo del cuerpo de la solicitud:
```bash
{
  "comment": "Excelente comida y atención.",
  "rating": 5
}
```
El identificador del usuario se obtiene directamente del *JWT*. Las reseñas se registran inicialmente como pendientes de publicación.

#### **Publicar o despublicar una reseña**
**Endpoint**:
```bash
PUT /api/reviews/:id/publish
```
Permite que un administrador controle la visibilidad de una reseña.

Ejemplo del cuerpo de la solicitud:
```bash
{
  "isPublished": true
}
```

### Autenticación de rutas protegidas
Los endpoints que requieren autenticación necesitan un JWT válido en el encabezado Authorization:
```bash
Authorization: Bearer TU_TOKEN
```
Los endpoints administrativos requieren adicionalmente que el usuario autenticado tenga el rol Admin.

### Carga de imágenes
La creación y actualización de productos utiliza *multipart/form-data*.

El campo destinado a la imagen debe llamarse:
```text
image
```
Las imágenes se procesan mediante *Multer* y se almacenan en Cloudinary. PostgreSQL conserva únicamente la URL de la imagen, evitando almacenar archivos binarios directamente en la base de datos.

### Procedimientos almacenados
Las operaciones principales de la base de datos se realizan mediante procedimientos almacenados y funciones de PostgreSQL.

Entre ellos se encuentran:

- **sp_login**: Verifica las credenciales y devuelve el identificador y rol del usuario.
- **sp_create_client**: Registra nuevos usuarios.
- **sp_get_products**: Consulta productos por categoría y página.
- **sp_create_product**: Registra productos.
- **sp_update_product**: Actualiza la información y disponibilidad de productos.
- **sp_delete_product**: Realiza la eliminación física de productos.
- **sp_create_review**: Registra reseñas.
- **sp_post_review**: Controla la publicación de reseñas.
- **sp_get_published_reviews**: Obtiene las reseñas publicadas.

La API utiliza estos procedimientos para centralizar validaciones y operaciones de negocio en PostgreSQL.

## Autenticación y seguridad
KOI incorpora diferentes medidas de seguridad para proteger la información y controlar el acceso a las funcionalidades administrativas:

- Autenticación mediante JSON Web Tokens (JWT).
- Control de acceso basado en roles (Admin y User).
- Hash de contraseñas mediante PostgreSQL pgcrypto, utilizando crypt() y el algoritmo Blowfish.
- Protección de endpoints administrativos mediante middleware de autenticación y autorización.
- Validación de datos de entrada.
- Protección de encabezados HTTP mediante Helmet.
- Configuración de CORS.
- Uso de variables de entorno para proteger credenciales y claves secretas.
- Restricción del acceso a operaciones administrativas.
- Validación del tipo y tamaño de las imágenes cargadas.

El registro público asigna automáticamente el rol User, evitando que los usuarios puedan obtener privilegios administrativos mediante el envío de datos desde el cliente.

---
KOI - Cocina Japonesa

*Inspirado en la simplicidad japonesa. Creado con pasión por la gastronomía y las experiencias digitales.*