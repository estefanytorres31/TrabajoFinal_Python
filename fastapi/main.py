from fastapi import FastAPI
import asyncpg
import os
from dotenv import load_dotenv
from routers import sistemas_router, partes_router, sistema_partes_router
from contextlib import asynccontextmanager

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")

conn = None

# Administrador de contexto para el ciclo de vida de la aplicación
@asynccontextmanager
async def lifespan(app: FastAPI):
    global conn
    conn = await asyncpg.connect(DATABASE_URL)
    print("Conexión a la base de datos establecida")
    
    yield
    
    if conn:
        await conn.close()
        print("Conexión a la base de datos cerrada")

app = FastAPI(
    title="API de Sistemas y Partes", 
    description="API REST para gestionar Sistemas, Partes y sus relaciones",
    lifespan=lifespan
)

@app.get("/")
async def root():
    return {"message": "API de Sistema, Partes y Sistema-Partes"}

app.include_router(sistemas_router.router)
app.include_router(partes_router.router)
app.include_router(sistema_partes_router.router)

# Para obtener la conexión desde los routers
def get_db_connection():
    return conn

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)