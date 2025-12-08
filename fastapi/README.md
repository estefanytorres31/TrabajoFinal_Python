# 🔧 Peru Controls System - Backend API

Backend RESTful desarrollado con FastAPI para la gestión de sistemas y partes de embarcaciones.

---

## 📋 Descripción

API robusta y escalable que proporciona endpoints para gestionar sistemas de embarcaciones, sus partes componentes y las relaciones entre ellos. Utiliza FastAPI para un rendimiento óptimo y PostgreSQL como base de datos.

## ✨ Características

- ✅ **API RESTful**: Endpoints bien estructurados y documentados
- ✅ **Asíncrono**: Operaciones de base de datos no bloqueantes con AsyncPG
- ✅ **Validación Automática**: Modelos Pydantic para validación de datos
- ✅ **Documentación Interactiva**: Swagger UI y ReDoc generados automáticamente
- ✅ **CORS Configurado**: Soporte para aplicaciones frontend
- ✅ **Gestión de Estado**: Control de estado activo/inactivo para todas las entidades

---

## 📦 Tecnologías Utilizadas

- [FastAPI](https://fastapi.tiangolo.com/) 0.115.12
- [Uvicorn](https://www.uvicorn.org/) 0.34.1 como servidor ASGI
- [PostgreSQL](https://www.postgresql.org/) como base de datos
- [asyncpg](https://magicstack.github.io/asyncpg/) 0.30.0 para la conexión async con PostgreSQL
- [Pydantic](https://docs.pydantic.dev/) 2.11.3 para validación de datos
- [Python-dotenv](https://pypi.org/project/python-dotenv/) 1.1.0 para manejar variables de entorno

---

## 📁 Estructura del Proyecto

```
fastapi/
├── main.py                    # Aplicación principal
├── models.py                  # Modelos Pydantic
├── requirements.txt           # Dependencias
├── .env                       # Variables de entorno (no incluido)
└── routers/
    ├── __init__.py
    ├── sistemas_router.py     # Endpoints de sistemas
    ├── partes_router.py       # Endpoints de partes
    └── sistema_partes_router.py  # Endpoints de relaciones
```

---

## ⚙️ Requisitos Previos

- Python 3.8 o superior
- PostgreSQL 12 o superior
- Git
- Tener configurado un archivo `.env` con tu cadena de conexión a la base de datos

---

## 🔧 Instalación

```bash
# 1. Clona el repositorio
git clone https://github.com/estefanytorres31/TrabajoFinal_Python.git
cd TrabajoFinal_Python/fastapi

# 2. Crea un entorno virtual
python -m venv venv

# 3. Activa el entorno virtual
# En Windows (PowerShell)
.\venv\Scripts\activate

# En macOS/Linux
source venv/bin/activate

# 4. Instala las dependencias
pip install -r requirements.txt
```

---

## 🚀 Configuración y Ejecución

### 1. Configurar Variables de Entorno

Crea un archivo `.env` en la carpeta `fastapi`:

```env
DATABASE_URL=postgresql://usuario:contraseña@localhost:5432/nombre_bd
```

### 2. Iniciar el Servidor

**Modo desarrollo (con recarga automática):**
```bash
uvicorn main:app --reload
```

**Modo producción:**
```bash
uvicorn main:app --host 0.0.0.0 --port 8000
```

La API estará disponible en: `http://localhost:8000`

---

## 📚 API Endpoints

### 🔷 Sistemas

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/sistemas/` | Listar todos los sistemas |
| GET | `/sistemas/{id}` | Obtener sistema por ID |
| POST | `/sistemas/` | Crear nuevo sistema |
| PUT | `/sistemas/{id}` | Actualizar sistema |
| DELETE | `/sistemas/{id}` | Eliminar sistema |

**Modelo Sistema:**
```json
{
  "nombre_sistema": "Sistema de Propulsión",
  "descripcion": "Sistema principal de propulsión",
  "estado": true
}
```

### 🔶 Partes

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/partes/` | Listar todas las partes |
| GET | `/partes/{id}` | Obtener parte por ID |
| POST | `/partes/` | Crear nueva parte |
| PUT | `/partes/{id}` | Actualizar parte |
| DELETE | `/partes/{id}` | Eliminar parte |

**Modelo Parte:**
```json
{
  "nombre_parte": "Motor Principal",
  "estado": true
}
```

### 🔗 Sistema-Partes

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/sistema-partes/` | Listar todas las relaciones |
| GET | `/sistema-partes/{id}` | Obtener relación por ID |
| POST | `/sistema-partes/` | Crear nueva relación |
| PUT | `/sistema-partes/{id}` | Actualizar relación |
| DELETE | `/sistema-partes/{id}` | Eliminar relación |

**Modelo Sistema-Parte:**
```json
{
  "id_sistema": 1,
  "id_parte": 5,
  "estado": true
}
```

---

## 📖 Documentación Interactiva

Una vez iniciado el servidor, puedes acceder a:

- **Swagger UI**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc
- **OpenAPI Schema**: http://localhost:8000/openapi.json

---

## 🗄️ Modelos de Datos

### Sistema
- `id_sistema` (int): Identificador único
- `nombre_sistema` (str): Nombre del sistema
- `descripcion` (str, opcional): Descripción detallada
- `estado` (bool): Estado activo/inactivo
- `creado_en` (datetime): Fecha de creación
- `actualizado_en` (datetime): Última actualización

### Parte
- `id_parte` (int): Identificador único
- `nombre_parte` (str): Nombre de la parte
- `estado` (bool): Estado activo/inactivo
- `creado_en` (datetime): Fecha de creación
- `actualizado_en` (datetime): Última actualización

### Sistema-Parte
- `id_sistema_parte` (int): Identificador único
- `id_sistema` (int): ID del sistema
- `id_parte` (int): ID de la parte
- `estado` (bool): Estado de la relación
- `creado_en` (datetime): Fecha de creación
- `actualizado_en` (datetime): Última actualización

---

## 🔒 CORS

El backend está configurado para aceptar peticiones desde:
- `http://localhost:5173` (Vite dev)
- `http://localhost:3000` (React dev)
- `https://estefanytorres31.github.io` (GitHub Pages)

---

## 🐛 Debugging

Para depuración detallada:

```bash
uvicorn main:app --reload --log-level debug
```

---

## 📊 Respuestas de la API

### ✅ Éxito (200/201)
```json
{
  "id_sistema": 1,
  "nombre_sistema": "Sistema de Propulsión",
  "descripcion": "Sistema principal",
  "estado": true,
  "creado_en": "2025-12-03T10:00:00",
  "actualizado_en": "2025-12-03T10:00:00"
}
```

### ❌ Error (404)
```json
{
  "detail": "Sistema no encontrado"
}
```

### ⚠️ Error de Validación (422)
```json
{
  "detail": [
    {
      "loc": ["body", "nombre_sistema"],
      "msg": "field required",
      "type": "value_error.missing"
    }
  ]
}
```

---

## 🤝 Contribuir

Consulta el README principal del proyecto para directrices de contribución.

---

## 📧 Soporte

Para reportar problemas o sugerencias, abre un issue en el repositorio principal.

---

⭐️ Desarrollado con ❤️ usando FastAPI

