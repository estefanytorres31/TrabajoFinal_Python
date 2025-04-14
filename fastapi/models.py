from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class SistemaBase(BaseModel):
    nombre_sistema: str
    descripcion: Optional[str] = None
    estado: bool = True

class SistemaCreate(SistemaBase):
    pass

class SistemaUpdate(BaseModel):
    nombre_sistema: Optional[str] = None
    descripcion: Optional[str] = None
    estado: Optional[bool] = None

class SistemaResponse(SistemaBase):
    id_sistema: int
    creado_en: datetime
    actualizado_en: datetime

class ParteBase(BaseModel):
    nombre_parte: str
    estado: bool = True

class ParteCreate(ParteBase):
    pass

class ParteUpdate(BaseModel):
    nombre_parte: Optional[str] = None
    estado: Optional[bool] = None

class ParteResponse(ParteBase):
    id_parte: int
    creado_en: datetime
    actualizado_en: datetime

class SistemaParteBase(BaseModel):
    id_sistema: int
    id_parte: int
    estado: bool = True

class SistemaParteCreate(SistemaParteBase):
    pass

class SistemaParteUpdate(BaseModel):
    estado: bool

class SistemaParteResponse(SistemaParteBase):
    id_sistema_parte: int
    nombre_sistema: Optional[str] = None  # <- NUEVO
    nombre_parte: Optional[str] = None    # <- NUEVO
    creado_en: datetime
    actualizado_en: datetime
