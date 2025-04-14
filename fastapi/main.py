from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import asyncpg
import os
from dotenv import load_dotenv
from routers import sistemas_router, partes_router, sistema_partes_router
from contextlib import asynccontextmanager

load_dotenv()
DATABASE_URL = os.getenv("DATABASE_URL")

conn = None

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

origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "https://tudominio.com"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {"message": "API de Sistema, Partes y Sistema-Partes"}

app.include_router(sistemas_router.router)
app.include_router(partes_router.router)
app.include_router(sistema_partes_router.router)

def get_db_connection():
    return conn

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
