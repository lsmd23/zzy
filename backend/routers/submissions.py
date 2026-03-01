from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
import random

from database import get_db
import models, schemas
from auth import get_current_user

router = APIRouter(prefix="/api/submissions", tags=["submissions"])


@router.post("", response_model=schemas.SubmissionOut)
def create_submission(
    data: schemas.SubmissionCreate,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user),
):
    # Verify journal exists
    journal = db.query(models.Journal).filter(models.Journal.id == data.journal_id).first()
    if not journal:
        raise HTTPException(status_code=404, detail="目标期刊不存在，可能编辑已跑路")

    # 80% rejection rate — as per editorial policy
    status = "accepted" if random.random() > 0.8 else "rejected"

    submission = models.Submission(
        user_id=current_user.id,
        journal_id=data.journal_id,
        paper_title=data.paper_title,
        author_name=data.author_name,
        status=status,
    )
    db.add(submission)
    db.commit()
    db.refresh(submission)
    return submission


@router.get("/my", response_model=list[schemas.SubmissionOut])
def my_submissions(
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user),
):
    return (
        db.query(models.Submission)
        .filter(models.Submission.user_id == current_user.id)
        .order_by(models.Submission.created_at.desc())
        .all()
    )
