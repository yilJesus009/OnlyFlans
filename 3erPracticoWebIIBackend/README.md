# OnlyFlans API Backend

API REST para la plataforma OnlyFlans, donde creadores reciben apoyo económico de sus seguidores.

## Instalación

```bash
npm install
cp .env.example .env
npm start
```

API corre en `http://localhost:3000`

---

## Endpoints

### 🔐 Autenticación (`/api/auth`)

#### POST `/api/auth/register`
Registrar un nuevo usuario

**Body:**
```json
{
  "nombre": "Juan Pérez",
  "email": "juan@example.com",
  "password": "password123",
  "role": "creator" | "follower"
}
```

**Response (201):**
```json
{
  "token": "eyJhbGciOi...",
  "usuario": { "id": 1, "nombre": "Juan Pérez", "email": "juan@example.com", "role": "creator" }
}
```

---

#### POST `/api/auth/login`
Iniciar sesión

**Body:**
```json
{
  "email": "juan@example.com",
  "password": "password123"
}
```

**Response (200):** Token + usuario

---

#### GET `/api/auth/me`
Obtener datos del usuario autenticado

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "usuario": { "id": 1, "nombre": "Juan Pérez", "email": "juan@example.com", "role": "creator" }
}
```

---

## 👨‍🎨 Creador (`/api/creador`) - *Requiere rol: `creator`*

### Perfil

#### GET `/api/creador/perfil`
Obtener mi perfil como creador

**Response (200):**
```json
{
  "id": 1,
  "usuarioId": 1,
  "fotoPerfil": "1234567890-123.jpg",
  "banner": "banner-123.jpg",
  "descripcion": "Mi descripción"
}
```

#### PUT `/api/creador/perfil`
Actualizar mi perfil (con fotos)

**Form Data:**
- `descripcion` (text)
- `fotoPerfil` (file, opcional)
- `banner` (file, opcional)

**Response (200):** Perfil actualizado

---

### Posts

#### POST `/api/creador/posts`
Crear un nuevo post

**Form Data:**
- `texto` (text, obligatorio)
- `imagen` (file, opcional)

**Response (201):**
```json
{
  "id": 1,
  "usuarioId": 1,
  "texto": "Mi primer post",
  "imagen": "post-123.jpg"
}
```

#### GET `/api/creador/posts`
Obtener mis posts

**Response (200):** Array de posts

#### PUT `/api/creador/posts/:id`
Editar un post

**Form Data:**
- `texto` (text)
- `imagen` (file, opcional)

**Response (200):** Post actualizado

#### DELETE `/api/creador/posts/:id`
Eliminar un post

**Response (200):**
```json
{ "message": "Post eliminado" }
```

---

### Metas de Apoyo

#### POST `/api/creador/metas`
Crear una meta de apoyo

**Body:**
```json
{
  "titulo": "Comprar micrófono",
  "descripcion": "Necesito un micrófono para mejorar la calidad de mis videos"
}
```

**Response (201):** Meta creada

#### GET `/api/creador/metas`
Obtener mis metas

**Response (200):** Array de metas

#### PUT `/api/creador/metas/:id`
Editar una meta

**Body:** Mismo que POST

**Response (200):** Meta actualizada

#### DELETE `/api/creador/metas/:id`
Eliminar una meta

**Response (200):**
```json
{ "message": "Meta eliminada" }
```

---

## 📊 Donaciones (`/api/donacion`)

### Seguidor

#### POST `/api/donacion`
Realizar una donación - *Requiere rol: `follower`*

**Body:**
```json
{
  "creadorId": 1,
  "cantidad": 5
}
```

**Response (201):** Donación creada

---

#### GET `/api/donacion/historial?fechaInicio=2024-01-01&fechaFin=2024-12-31&nombreCreador=Juan`
Obtener historial de donaciones - *Requiere rol: `follower`*

Parámetros opcionales:
- `fechaInicio` (YYYY-MM-DD)
- `fechaFin` (YYYY-MM-DD)
- `nombreCreador` (string)

**Response (200):** Array de donaciones

---

#### GET `/api/donacion/creador/:creadorId/posts`
Obtener posts de un creador (solo si donaste) - *Requiere rol: `follower`*

**Response (200):** Posts + comentarios

---

#### POST `/api/donacion/comentario`
Dejar un comentario en un post - *Requiere rol: `follower`*

**Body:**
```json
{
  "postId": 1,
  "texto": "Excelente contenido!"
}
```

**Response (201):** Comentario creado

---

### Creador

#### GET `/api/donacion/posts/:postId/comentarios`
Obtener comentarios de mis posts - *Requiere rol: `creator`*

**Response (200):** Array de comentarios

---

## 👥 Seguidor (`/api/seguidor`) - *Requiere rol: `follower`*

#### GET `/api/seguidor/buscar?q=nombre`
Buscar creadores

**Response (200):**
```json
[
  {
    "id": 1,
    "nombre": "Juan Pérez",
    "email": "juan@example.com",
    "perfil": { "fotoPerfil": "...", "banner": "...", "descripcion": "..." },
    "metas": [ { "id": 1, "titulo": "...", "descripcion": "..." } ]
  }
]
```

#### GET `/api/seguidor/creador/:id`
Obtener perfil público de un creador

**Response (200):** Creador + perfil + metas

---

### Favoritos

#### POST `/api/seguidor/favoritos`
Agregar creador a favoritos

**Body:**
```json
{
  "creadorId": 1
}
```

**Response (201):** Favorito creado

#### DELETE `/api/seguidor/favoritos/:creadorId`
Remover de favoritos

**Response (200):**
```json
{ "message": "Removido de favoritos" }
```

#### GET `/api/seguidor/favoritos`
Obtener mis favoritos

**Response (200):** Array de creadores favoritos

---

### Feed

#### GET `/api/seguidor/feed`
Obtener feed de posts (creadores a los que donaste)

**Response (200):** Array de posts ordenados por fecha

---

## 📈 Reportes (`/api/reporte`) - *Requiere rol: `creator`*

#### GET `/api/reporte/ingresos?fechaInicio=2024-01-01&fechaFin=2024-12-31`
Obtener reporte de ingresos

Parámetros opcionales:
- `fechaInicio` (YYYY-MM-DD)
- `fechaFin` (YYYY-MM-DD)

**Response (200):**
```json
{
  "periodo": { "fechaInicio": "2024-01-01", "fechaFin": "2024-12-31" },
  "totalFlanes": 150,
  "cantidadDonaciones": 30,
  "historial": [
    { "id": 1, "seguidorNombre": "María", "cantidad": 5, "fecha": "2024-01-15T10:00:00Z" }
  ]
}
```

---

## Restricciones de Acceso

| Endpoint | Creator | Follower |
|----------|---------|----------|
| `/creador/*` | ✅ | ❌ |
| `/donacion` (crear) | ❌ | ✅ |
| `/donacion/historial` | ❌ | ✅ |
| `/donacion/comentario` | ❌ | ✅ |
| `/donacion/posts/:postId/comentarios` | ✅ | ❌ |
| `/seguidor/*` | ❌ | ✅ |
| `/reporte/*` | ✅ | ❌ |

---

## Variables de Entorno

```
JWT_SECRET=onlyflans_secret_key_cambiar_en_produccion
PORT=3000
```

---

## Estructura de Base de Datos

- **Usuario** - Usuarios del sistema (creadores y seguidores)
- **PerfilCreador** - Perfil público del creador (foto, banner, descripción)
- **Post** - Publicaciones de los creadores
- **Meta** - Metas de apoyo
- **Donacion** - Historial de donaciones
- **Comentario** - Comentarios en posts (solo visibles para el creador)
- **Favorito** - Creadores marcados como favoritos

---

## Notas

- El password se encripta con SHA1
- El token expira en 24 horas
- Las imágenes se guardan en `/uploads`
- Un seguidor solo ve posts si ha donado al creador
- Los comentarios solo son visibles para el creador del post
