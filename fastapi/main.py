from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import asyncpg
import os
from dotenv import load_dotenv

load_dotenv()
app = FastAPI()
DATABASE_URL = os.getenv("DATABASE_URL")    

conn= None

#Model 
class Empresa(BaseModel):
    nombre: str

@app.on_event("startup")
async def startup():
    global conn
    conn = await asyncpg.connect(DATABASE_URL)

@app.on_event("shutdown")
async def shutdown():
    await conn.close()

#GET
@app.get("/empresas")
async def get_empresas():
    try:
        empresas = await conn.fetch("SELECT * FROM empresas where estado=true")
        return [dict(empresa) for empresa in empresas]
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

#POST
@app.post("/empresas")
async def create_empresa(empresa: Empresa):
    try:
        await conn.execute("INSERT INTO empresas (nombre) VALUES ($1)", empresa.nombre)
        return {"message": "Empresa created successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

#PUT
@app.put("/empresas/{empresa_id}")
async def update_empresa(empresa_id: int, empresa: Empresa):
    try:
        await conn.execute("UPDATE empresas SET nombre = $1 WHERE id = $2", empresa.nombre, empresa_id)
        return {"message": "Empresa updated successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
#DELETE
@app.delete("/empresas/{empresa_id}")
async def delete_empresa(empresa_id: int):
    try:
        await conn.execute("UPDATE empresas SET estado = false WHERE id = $1", empresa_id)
        return {"message": "Empresa deleted successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

#GET by ID
@app.get("/empresas/{empresa_id}")
async def get_empresa(empresa_id: int):
    try:
        empresa = await conn.fetchrow("SELECT * FROM empresas WHERE id = $1 and estado=true", empresa_id)
        if not empresa:
            raise HTTPException(status_code=404, detail="Empresa not found")
        return dict(empresa)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))