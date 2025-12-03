# 🚢 Peru Controls System

Sistema integral de gestión de sistemas y partes para embarcaciones, desarrollado con FastAPI y React.

## 📋 Descripción

Peru Controls System es una aplicación full-stack que permite la gestión completa de sistemas de embarcaciones, sus partes componentes y las relaciones entre ellos. El sistema incluye un backend robusto con FastAPI y PostgreSQL, y un frontend moderno desarrollado en React con Vite y TailwindCSS.

## ✨ Características Principales

- ✅ **Gestión de Sistemas**: CRUD completo para sistemas de embarcaciones
- ✅ **Gestión de Partes**: Administración de componentes y partes
- ✅ **Relaciones Sistema-Parte**: Vinculación flexible entre sistemas y sus componentes
- ✅ **Interfaz Moderna**: UI responsiva con TailwindCSS
- ✅ **API RESTful**: Backend escalable con FastAPI
- ✅ **Base de Datos PostgreSQL**: Almacenamiento robusto y confiable
- ✅ **Validación de Datos**: Modelos Pydantic para validación estricta
- ✅ **CORS Configurado**: Comunicación segura entre frontend y backend

## 🛠️ Tecnologías Utilizadas

### Backend
- **FastAPI** - Framework web moderno y de alto rendimiento
- **PostgreSQL** - Base de datos relacional
- **AsyncPG** - Cliente asíncrono para PostgreSQL
- **Pydantic** - Validación de datos
- **Python-dotenv** - Gestión de variables de entorno
- **Uvicorn** - Servidor ASGI

### Frontend
- **React 19** - Biblioteca de interfaz de usuario
- **Vite** - Build tool y dev server ultra rápido
- **TailwindCSS 4** - Framework CSS utility-first
- **React Router DOM** - Enrutamiento en SPA
- **Axios** - Cliente HTTP
- **React Icons** - Iconos para la interfaz

## 📁 Estructura del Proyecto

```
TrabajoFinal_Python/
├── fastapi/                    # Backend API
│   ├── main.py                # Punto de entrada de la aplicación
│   ├── models.py              # Modelos Pydantic
│   ├── requirements.txt       # Dependencias Python
│   └── routers/               # Rutas de la API
│       ├── sistemas_router.py
│       ├── partes_router.py
│       └── sistema_partes_router.py
│
└── FrontEnd/                   # Frontend React
    ├── src/
    │   ├── api/               # Servicios API
    │   ├── components/        # Componentes reutilizables
    │   ├── pages/             # Páginas de la aplicación
    │   │   ├── Sistemas/
    │   │   ├── Partes/
    │   │   └── SistemaPartes/
    │   └── router/            # Configuración de rutas
    └── package.json
```

## 🚀 Instalación y Configuración

### Prerrequisitos

- Python 3.8+
- Node.js 16+
- PostgreSQL 12+
- npm o yarn

### Backend Setup

1. **Navegar a la carpeta del backend:**
```bash
cd fastapi
```

2. **Crear un entorno virtual:**
```bash
python -m venv venv
```

3. **Activar el entorno virtual:**
   - Windows:
   ```bash
   .\venv\Scripts\activate
   ```
   - Linux/Mac:
   ```bash
   source venv/bin/activate
   ```

4. **Instalar dependencias:**
```bash
pip install -r requirements.txt
```

5. **Configurar variables de entorno:**
Crear un archivo `.env` en la carpeta `fastapi`:
```env
DATABASE_URL=postgresql://usuario:contraseña@localhost:5432/nombre_bd
```

6. **Iniciar el servidor:**
```bash
uvicorn main:app --reload
```

El backend estará disponible en: `http://localhost:8000`

### Frontend Setup

1. **Navegar a la carpeta del frontend:**
```bash
cd FrontEnd
```

2. **Instalar dependencias:**
```bash
npm install
```

3. **Iniciar el servidor de desarrollo:**
```bash
npm run dev
```

El frontend estará disponible en: `http://localhost:5173`

## 📚 Endpoints de la API

### Sistemas
- `GET /sistemas/` - Listar todos los sistemas
- `GET /sistemas/{id}` - Obtener un sistema específico
- `POST /sistemas/` - Crear un nuevo sistema
- `PUT /sistemas/{id}` - Actualizar un sistema
- `DELETE /sistemas/{id}` - Eliminar un sistema

### Partes
- `GET /partes/` - Listar todas las partes
- `GET /partes/{id}` - Obtener una parte específica
- `POST /partes/` - Crear una nueva parte
- `PUT /partes/{id}` - Actualizar una parte
- `DELETE /partes/{id}` - Eliminar una parte

### Sistema-Partes
- `GET /sistema-partes/` - Listar todas las relaciones
- `GET /sistema-partes/{id}` - Obtener una relación específica
- `POST /sistema-partes/` - Crear una nueva relación
- `PUT /sistema-partes/{id}` - Actualizar una relación
- `DELETE /sistema-partes/{id}` - Eliminar una relación

## 📖 Documentación API

Una vez iniciado el backend, puedes acceder a:
- **Swagger UI**: `http://localhost:8000/docs`
- **ReDoc**: `http://localhost:8000/redoc`

## 🗄️ Base de Datos

El sistema utiliza PostgreSQL con las siguientes tablas principales:

- **sistemas**: Almacena información de sistemas de embarcaciones
- **partes**: Registra las partes y componentes
- **sistema_partes**: Tabla de relación muchos a muchos entre sistemas y partes

## 🎨 Características del Frontend

- **Diseño Responsivo**: Adaptable a diferentes tamaños de pantalla
- **Navegación Intuitiva**: Barra lateral con acceso rápido a todas las secciones
- **Modales Interactivos**: Para crear, editar y confirmar eliminaciones
- **Feedback Visual**: Modales de éxito y error para operaciones
- **Tablas Dinámicas**: Visualización clara de datos con opciones de acción

## 🔧 Scripts Disponibles

### Backend
```bash
uvicorn main:app --reload    # Servidor de desarrollo
uvicorn main:app             # Servidor de producción
```

### Frontend
```bash
npm run dev       # Servidor de desarrollo
npm run build     # Compilar para producción
npm run preview   # Previsualizar build de producción
npm run lint      # Verificar código con ESLint
```

## 🤝 Contribuir

Las contribuciones son bienvenidas. Por favor:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📝 Licencia

Este proyecto es de código abierto y está disponible bajo la licencia MIT.

## 👥 Autores

- **Estefany Torres** - [@estefanytorres31](https://github.com/estefanytorres31)

## 📧 Contacto

Para preguntas o sugerencias, por favor abre un issue en el repositorio.

---

⭐️ Si te ha sido útil este proyecto, ¡no olvides darle una estrella!
