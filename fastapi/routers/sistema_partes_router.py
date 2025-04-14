from fastapi import APIRouter, HTTPException, Depends
from typing import List
import asyncpg
from datetime import datetime
from models import SistemaParteCreate, SistemaParteResponse, SistemaParteUpdate, SistemaParteResponseFull
import main

router = APIRouter(prefix="/sistema-partes", tags=["Sistema-Partes"])

async def get_conn():
    return main.get_db_connection()

@router.get("/", response_model=List[SistemaParteResponseFull])
async def listar_sistema_partes(conn = Depends(get_conn)):
    try:
        sistema_partes = await conn.fetch("""
            SELECT 
                sp.id_sistema_parte,
                sp.id_sistema,
                s.nombre_sistema AS nombre_sistema,
                sp.id_parte,
                p.nombre_parte AS nombre_parte,
                sp.estado,
                sp.creado_en,
                sp.actualizado_en
            FROM sistema_parte sp
            JOIN sistema s ON sp.id_sistema = s.id_sistema
            JOIN parte p ON sp.id_parte = p.id_parte
            WHERE sp.estado = true
            ORDER BY sp.id_sistema_parte
        """)
        return [dict(sistema_parte) for sistema_parte in sistema_partes]
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error al obtener relaciones sistema-parte: {str(e)}")

@router.get("/{id_sistema_parte}", response_model=SistemaParteResponse)
async def obtener_sistema_parte(id_sistema_parte: int, conn = Depends(get_conn)):
    try:
        sistema_parte = await conn.fetchrow("SELECT * FROM sistema_parte WHERE id_sistema_parte = $1", id_sistema_parte)
        if sistema_parte is None:
            raise HTTPException(status_code=404, detail="Relación sistema-parte no encontrada")
        return dict(sistema_parte)
    except asyncpg.PostgresError as e:
        raise HTTPException(status_code=500, detail=f"Error de base de datos: {str(e)}")

@router.post("/", response_model=SistemaParteResponse)
async def crear_sistema_parte(sistema_parte: SistemaParteCreate, conn = Depends(get_conn)):
    try:
        sistema_existe = await conn.fetchval("SELECT EXISTS(SELECT 1 FROM sistema WHERE id_sistema = $1)", 
                                          sistema_parte.id_sistema)
        if not sistema_existe:
            raise HTTPException(status_code=404, detail="Sistema no encontrado")
        
        parte_existe = await conn.fetchval("SELECT EXISTS(SELECT 1 FROM parte WHERE id_parte = $1)", 
                                         sistema_parte.id_parte)
        if not parte_existe:
            raise HTTPException(status_code=404, detail="Parte no encontrada")
        
        relacion_existe = await conn.fetchval(
            "SELECT EXISTS(SELECT 1 FROM sistema_parte WHERE id_sistema = $1 AND id_parte = $2)",
            sistema_parte.id_sistema, sistema_parte.id_parte
        )
        if relacion_existe:
            raise HTTPException(status_code=400, detail="Ya existe una relación entre ese sistema y esa parte")
        
        now = datetime.now()
        nueva_relacion = await conn.fetchrow(
            """
            INSERT INTO sistema_parte (id_sistema, id_parte, estado, creado_en, actualizado_en)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING *
            """,
            sistema_parte.id_sistema, sistema_parte.id_parte, sistema_parte.estado, now, now
        )
        return dict(nueva_relacion)
    except asyncpg.PostgresError as e:
        raise HTTPException(status_code=500, detail=f"Error de base de datos: {str(e)}")

@router.put("/{id_sistema_parte}", response_model=SistemaParteResponse)
async def actualizar_sistema_parte(id_sistema_parte: int, sistema_parte: SistemaParteUpdate, conn = Depends(get_conn)):
    try:
        relacion_actual = await conn.fetchrow("SELECT * FROM sistema_parte WHERE id_sistema_parte = $1", id_sistema_parte)
        if not relacion_actual:
            raise HTTPException(status_code=404, detail="Relación sistema-parte no encontrada")
        
        relacion_actual = dict(relacion_actual)
        
        id_sistema = relacion_actual['id_sistema']
        id_parte = relacion_actual['id_parte']
        estado = sistema_parte.estado if hasattr(sistema_parte, 'estado') else relacion_actual['estado']
        
        if hasattr(sistema_parte, 'id_sistema') and sistema_parte.id_sistema is not None:
            sistema_existe = await conn.fetchval("SELECT EXISTS(SELECT 1 FROM sistema WHERE id_sistema = $1)", 
                                              sistema_parte.id_sistema)
            if not sistema_existe:
                raise HTTPException(status_code=404, detail="Sistema no encontrado")
            id_sistema = sistema_parte.id_sistema
            
        if hasattr(sistema_parte, 'id_parte') and sistema_parte.id_parte is not None:
            parte_existe = await conn.fetchval("SELECT EXISTS(SELECT 1 FROM parte WHERE id_parte = $1)", 
                                             sistema_parte.id_parte)
            if not parte_existe:
                raise HTTPException(status_code=404, detail="Parte no encontrada")
            id_parte = sistema_parte.id_parte
        
        if (id_sistema != relacion_actual['id_sistema'] or id_parte != relacion_actual['id_parte']):
            relacion_existe = await conn.fetchval(
                "SELECT EXISTS(SELECT 1 FROM sistema_parte WHERE id_sistema = $1 AND id_parte = $2 AND id_sistema_parte != $3)",
                id_sistema, id_parte, id_sistema_parte
            )
            if relacion_existe:
                raise HTTPException(status_code=400, detail="Ya existe una relación entre ese sistema y esa parte")
        
        now = datetime.now()
        
        relacion_actualizada = await conn.fetchrow(
            """
            UPDATE sistema_parte 
            SET id_sistema = $1, id_parte = $2, estado = $3, actualizado_en = $4
            WHERE id_sistema_parte = $5
            RETURNING *
            """,
            id_sistema, id_parte, estado, now, id_sistema_parte
        )
        return dict(relacion_actualizada)
    except asyncpg.PostgresError as e:
        raise HTTPException(status_code=500, detail=f"Error de base de datos: {str(e)}")

@router.delete("/{id_sistema_parte}")
async def eliminar_sistema_parte(id_sistema_parte: int, conn = Depends(get_conn)):
    try:
        relacion_existe = await conn.fetchval("SELECT EXISTS(SELECT 1 FROM sistema_parte WHERE id_sistema_parte = $1)", 
                                            id_sistema_parte)
        if not relacion_existe:
            raise HTTPException(status_code=404, detail="Relación sistema-parte no encontrada")
        
        # Marcamos como inactiva
        await conn.execute("UPDATE sistema_parte SET estado = false, actualizado_en = $1 WHERE id_sistema_parte = $2", 
                         datetime.now(), id_sistema_parte)
        
        return {"mensaje": "Relación sistema-parte eliminada correctamente"}
    except asyncpg.PostgresError as e:
        raise HTTPException(status_code=500, detail=f"Error de base de datos: {str(e)}")