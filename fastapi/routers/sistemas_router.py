from fastapi import APIRouter, HTTPException, Depends
from typing import List
import asyncpg
from datetime import datetime
from models import SistemaCreate, SistemaResponse, SistemaUpdate
import main

router = APIRouter(prefix="/sistemas", tags=["Sistemas"])

async def get_conn():
    return main.get_db_connection()

@router.get("/", response_model=List[SistemaResponse])
async def listar_sistemas(conn = Depends(get_conn)):
    try:
        sistemas = await conn.fetch("SELECT * FROM sistema WHERE estado = true ORDER BY id_sistema")
        return [dict(sistema) for sistema in sistemas]
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error al obtener sistemas: {str(e)}")

@router.get("/{id_sistema}", response_model=SistemaResponse)
async def obtener_sistema(id_sistema: int, conn = Depends(get_conn)):
    try:
        sistema = await conn.fetchrow("SELECT * FROM sistema WHERE id_sistema = $1", id_sistema)
        if sistema is None:
            raise HTTPException(status_code=404, detail="Sistema no encontrado")
        return dict(sistema)
    except asyncpg.PostgresError as e:
        raise HTTPException(status_code=500, detail=f"Error de base de datos: {str(e)}")

@router.post("/", response_model=SistemaResponse)
async def crear_sistema(sistema: SistemaCreate, conn = Depends(get_conn)):
    try:
        existe = await conn.fetchval("SELECT EXISTS(SELECT 1 FROM sistema WHERE nombre_sistema = $1)", sistema.nombre_sistema)
        if existe:
            raise HTTPException(status_code=400, detail="Ya existe un sistema con ese nombre")
        
        now = datetime.now()
        nuevo_sistema = await conn.fetchrow(
            """
            INSERT INTO sistema (nombre_sistema, descripcion, estado, creado_en, actualizado_en)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING *
            """,
            sistema.nombre_sistema, sistema.descripcion, sistema.estado, now, now
        )
        return dict(nuevo_sistema)
    except asyncpg.PostgresError as e:
        raise HTTPException(status_code=500, detail=f"Error de base de datos: {str(e)}")

@router.put("/{id_sistema}", response_model=SistemaResponse)
async def actualizar_sistema(id_sistema: int, sistema: SistemaUpdate, conn = Depends(get_conn)):
    try:
        existe = await conn.fetchval("SELECT EXISTS(SELECT 1 FROM sistema WHERE id_sistema = $1)", id_sistema)
        if not existe:
            raise HTTPException(status_code=404, detail="Sistema no encontrado")
        
        # Construir la consulta de actualización dinámicamente
        update_fields = []
        values = []
        params = {}
        
        if sistema.nombre_sistema is not None:
            if await conn.fetchval("SELECT EXISTS(SELECT 1 FROM sistema WHERE nombre_sistema = $1 AND id_sistema != $2)", 
                                  sistema.nombre_sistema, id_sistema):
                raise HTTPException(status_code=400, detail="Ya existe otro sistema con ese nombre")
            update_fields.append("nombre_sistema = :nombre_sistema")
            params["nombre_sistema"] = sistema.nombre_sistema
        
        if sistema.descripcion is not None:
            update_fields.append("descripcion = :descripcion")
            params["descripcion"] = sistema.descripcion
        
        if sistema.estado is not None:
            update_fields.append("estado = :estado")
            params["estado"] = sistema.estado
        
        update_fields.append("actualizado_en = :actualizado_en")
        params["actualizado_en"] = datetime.now()
        params["id_sistema"] = id_sistema
        
        if not update_fields:
            sistema_actual = await conn.fetchrow("SELECT * FROM sistema WHERE id_sistema = $1", id_sistema)
            return dict(sistema_actual)
        
        query = f"UPDATE sistema SET {', '.join(update_fields)} WHERE id_sistema = :id_sistema RETURNING *"
        
        sistema_actualizado = await conn.fetchrow(query, **params)
        return dict(sistema_actualizado)
    except asyncpg.PostgresError as e:
        raise HTTPException(status_code=500, detail=f"Error de base de datos: {str(e)}")

@router.delete("/{id_sistema}")
async def eliminar_sistema(id_sistema: int, conn = Depends(get_conn)):
    try:
        existe = await conn.fetchval("SELECT EXISTS(SELECT 1 FROM sistema WHERE id_sistema = $1)", id_sistema)
        if not existe:
            raise HTTPException(status_code=404, detail="Sistema no encontrado")
        
        await conn.execute("UPDATE sistema SET estado = false, actualizado_en = $1 WHERE id_sistema = $2", 
                         datetime.now(), id_sistema)
        
        return {"mensaje": "Sistema eliminado correctamente"}
    except asyncpg.PostgresError as e:
        raise HTTPException(status_code=500, detail=f"Error de base de datos: {str(e)}")

@router.get("/{id_sistema}/partes")
async def obtener_partes_por_sistema(id_sistema: int, conn = Depends(get_conn)):
    try:
        sistema_existe = await conn.fetchval("SELECT EXISTS(SELECT 1 FROM sistema WHERE id_sistema = $1)", id_sistema)
        if not sistema_existe:
            raise HTTPException(status_code=404, detail="Sistema no encontrado")
        
        partes = await conn.fetch(
            """
            SELECT p.* FROM parte p
            JOIN sistema_parte sp ON p.id_parte = sp.id_parte
            WHERE sp.id_sistema = $1 AND sp.estado = true AND p.estado = true
            """,
            id_sistema
        )
        return [dict(parte) for parte in partes]
    except asyncpg.PostgresError as e:
        raise HTTPException(status_code=500, detail=f"Error de base de datos: {str(e)}")