from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session

from database import get_db
import models, schemas

router = APIRouter(prefix="/api/journals", tags=["journals"])


@router.get("", response_model=list[schemas.JournalOut])
def list_journals(db: Session = Depends(get_db)):
    return db.query(models.Journal).all()


@router.get("/{journal_id}", response_model=schemas.JournalDetailOut)
def get_journal(journal_id: str, db: Session = Depends(get_db)):
    journal = db.query(models.Journal).filter(models.Journal.id == journal_id).first()
    if not journal:
        raise HTTPException(status_code=404, detail="此刊已卷铺盖跑路，找不到了")
    return journal
