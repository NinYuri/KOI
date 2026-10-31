# KOI - COCINA JAPONESA
Aplicación web full-stack para un restaurante de sushi, inspirada en el minimalismo japonés. KOI ofrece una experiencia interactiva para explorar el menú, consultar reseñas de clientes y administrar el contenido del restaurante mediante un sistema de autenticación.

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

## Características
### Experiencia de Usuario
- Página principal adaptable a dispositivos móviles y escritorio.
- Catálogo de platillos organizado por categorías.
- Carga dinámica de productos mediante paginación.
- Secciones informativas sobre el restaurante y sus sucursales.
- Registro de usuarios e inicio de sesión.

### Administración
- Autenticación segura para administradores.
- Creación y actualización de productos.
- Desactivación de productos sin eliminarlos físicamente de la base de datos.
- Eliminación de productos.
- Carga y almacenamiento de imágenes mediante Cloudinary.
- Control de acceso basado en roles.

### Backend
- API REST.
- Operaciones CRUD para la gestión de productos, reseñas y categorías.
- Integración con PostgreSQL.
- Procedimientos almacenados para las operaciones de base de datos.
- Autenticación mediante JSON Web Tokens (JWT).
- Validación de datos y middleware de seguridad.

## Tecnologías utilizadas
| Área | Tecnologías |
|---|---|
| Frontend | React, JavaScript, Vite, CSS |
| Backend | Node.js, Express |
| Base de datos | PostgreSQL |
| ORM | Prisma |
| Autenticación | JWT |
| Hash de contraseñas | PostgreSQL crypt() |
| Almacenamiento de imágenes | Cloudinary |
| Middleware | Helmet, CORS

## Estructura del proyecto
```text
KOI/
├── client/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── sections/
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── index.css
│   │   └── main.jsx
│   └── package.json
│
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

## Configuración de la base de datos
**1. Crear la base de datos**

Crea una base de datos en PostgreSQL con el siguiente nombre:
```bash
CREATE DATABASE koi_db;
```

**2. Crear las tablas y procedimientos almacenados**

Ejecuta los scripts SQL correspondientes a la estructura de la base de datos y sus procedimientos almacenados.

La base de datos está compuesta por las siguientes tablas principales:

- **CLIENT**: almacena la información de los usuarios, sus credenciales y roles.
- **CATEGORY**: almacena las categorías del menú.
- **PRODUCT**: almacena los productos del restaurante.
- **REVIEW**: almacena las reseñas de los clientes.

**3. Configurar Prisma**

Verifica que la variable *DATABASE_URL* apunte correctamente a tu base de datos.

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
URL base:
```bash
http://localhost:3000/api
```

### Autenticación
| Método | Endpoint | Descripción | Acceso |
|---|---|---|---|
| POST | `/auth/register` | Registrar un usuario | Público |
| POST | `/auth/login` | Iniciar sesión | Público |

### Productos
| Método | Endpoint | Descripción | Acceso |
|---|---|---|---|
| GET | `/products` | Consultar productos | Público |
| POST | `/products` | Crear un producto | Administrador |
| PUT | `/products/:id` | Actualizar un producto | Administrador |
| DELETE | `/products/:id` | Desactivar un producto | Administrador |

### Autenticación de rutas protegidas
Los endpoints que requieren autenticación necesitan un JWT válido en el encabezado Authorization:
```bash
Authorization: Bearer TU_TOKEN
```

### Paginación de productos
Los productos pueden consultarse mediante parámetros de categoría y página:
```bash
GET /api/products?category=Rolls&page=1
```
La API devuelve hasta ocho productos por página e incluye la propiedad *hasMore*, que indica si existen más productos disponibles.

### Carga de imágenes
La creación y actualización de productos utiliza *multipart/form-data*.

El campo destinado a la imagen debe llamarse:
```text
image
```
Las imágenes se almacenan en Cloudinary y sus respectivas URL se guardan en PostgreSQL.

## Autenticación y seguridad
KOI incorpora diferentes medidas de seguridad para proteger la información y controlar el acceso a las funcionalidades administrativas:

- Autenticación mediante JWT.
- Control de acceso basado en roles (*Admin* y *User*).
- Hash de contraseñas mediante PostgreSQL *crypt()* con el algoritmo *Blowfish*.
- Protección de endpoints administrativos mediante middleware.
- Validación de datos de entrada.
- Encabezados de seguridad mediante Helmet.
- Configuración de CORS.
- Uso de variables de entorno para proteger credenciales.
- Asignación de roles desde el servidor durante el registro público.

El registro público asigna automáticamente el rol *User*, evitando que los usuarios puedan obtener privilegios administrativos mediante el envío de datos desde el cliente.

---
KOI - Cocina Japonesa

*Inspirado en la simplicidad japonesa. Creado con pasión por la gastronomía y las experiencias digitales.*