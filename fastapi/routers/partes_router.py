from fastapi import APIRouter, HTTPException, Depends
from typing import List
import asyncpg
from datetime import datetime
from models import ParteCreate, ParteResponse, ParteUpdate
import main

router = APIRouter(prefix="/partes", tags=["Partes"])

async def get_conn():
    return main.get_db_connection()

@router.get("/", response_model=List[ParteResponse])
async def listar_partes(conn = Depends(get_conn)):
    try:
        partes = await conn.fetch("SELECT * FROM parte WHERE estado = true ORDER BY id_parte")
        return [dict(parte) for parte in partes]
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error al obtener partes: {str(e)}")

@router.get("/{id_parte}", response_model=ParteResponse)
async def obtener_parte(id_parte: int, conn = Depends(get_conn)):
    try:
        parte = await conn.fetchrow("SELECT * FROM parte WHERE id_parte = $1", id_parte)
        if parte is None:
            raise HTTPException(status_code=404, detail="Parte no encontrada")
        return dict(parte)
    except asyncpg.PostgresError as e:
        raise HTTPException(status_code=500, detail=f"Error de base de datos: {str(e)}")

@router.post("/", response_model=ParteResponse)
async def crear_parte(parte: ParteCreate, conn = Depends(get_conn)):
    try:
        existe = await conn.fetchval("SELECT EXISTS(SELECT 1 FROM parte WHERE nombre_parte = $1)", parte.nombre_parte)
        if existe:
            raise HTTPException(status_code=400, detail="Ya existe una parte con ese nombre")
        
        now = datetime.now()
        nueva_parte = await conn.fetchrow(
            """
            INSERT INTO parte (nombre_parte, estado, creado_en, actualizado_en)
            VALUES ($1, $2, $3, $4)
            RETURNING *
            """,
            parte.nombre_parte, parte.estado, now, now
        )
        return dict(nueva_parte)
    except asyncpg.PostgresError as e:
        raise HTTPException(status_code=500, detail=f"Error de base de datos: {str(e)}")

@router.put("/{id_parte}", response_model=ParteResponse)
async def actualizar_parte(id_parte: int, parte: ParteUpdate, conn = Depends(get_conn)):
    try:
        existe = await conn.fetchval("SELECT EXISTS(SELECT 1 FROM parte WHERE id_parte = $1)", id_parte)
        if not existe:
            raise HTTPException(status_code=404, detail="Parte no encontrada")
        
        update_fields = []
        param_values = []
        param_counter = 1
        
        if parte.nombre_parte is not None:
            if await conn.fetchval("SELECT EXISTS(SELECT 1 FROM parte WHERE nombre_parte = $1 AND id_parte != $2)", 
                                  parte.nombre_parte, id_parte):
                raise HTTPException(status_code=400, detail="Ya existe otra parte con ese nombre")
            update_fields.append(f"nombre_parte = ${param_counter}")
            param_values.append(parte.nombre_parte)
            param_counter += 1
        
        if parte.estado is not None:
            update_fields.append(f"estado = ${param_counter}")
            param_values.append(parte.estado)
            param_counter += 1
        
        update_fields.append(f"actualizado_en = ${param_counter}")
        param_values.append(datetime.now())
        param_counter += 1
        
        if not update_fields:
            parte_actual = await conn.fetchrow("SELECT * FROM parte WHERE id_parte = $1", id_parte)
            return dict(parte_actual)
        
        query = f"UPDATE parte SET {', '.join(update_fields)} WHERE id_parte = ${param_counter} RETURNING *"
        param_values.append(id_parte)
        
        parte_actualizada = await conn.fetchrow(query, *param_values)
        return dict(parte_actualizada)
    except asyncpg.PostgresError as e:
        raise HTTPException(status_code=500, detail=f"Error de base de datos: {str(e)}")
    
@router.delete("/{id_parte}")
async def eliminar_parte(id_parte: int, conn = Depends(get_conn)):
    try:
        existe = await conn.fetchval("SELECT EXISTS(SELECT 1 FROM parte WHERE id_parte = $1)", id_parte)
        if not existe:
            raise HTTPException(status_code=404, detail="Parte no encontrada")
        
        await conn.execute("UPDATE parte SET estado = false, actualizado_en = $1 WHERE id_parte = $2", 
                         datetime.now(), id_parte)
        
        return {"mensaje": "Parte eliminada correctamente"}
    except asyncpg.PostgresError as e:
        raise HTTPException(status_code=500, detail=f"Error de base de datos: {str(e)}")

@router.get("/{id_parte}/sistemas")
async def obtener_sistemas_por_parte(id_parte: int, conn = Depends(get_conn)):
    try:
        parte_existe = await conn.fetchval("SELECT EXISTS(SELECT 1 FROM parte WHERE id_parte = $1)", id_parte)
        if not parte_existe:
            raise HTTPException(status_code=404, detail="Parte no encontrada")
        
        sistemas = await conn.fetch(
            """
            SELECT s.* FROM sistema s
            JOIN sistema_parte sp ON s.id_sistema = sp.id_sistema
            WHERE sp.id_parte = $1 AND sp.estado = true AND s.estado = true
            """,
            id_parte
        )
        return [dict(sistema) for sistema in sistemas]
    except asyncpg.PostgresError as e:
        raise HTTPException(status_code=500, detail=f"Error de base de datos: {str(e)}")