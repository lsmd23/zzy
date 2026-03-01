from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from sqlalchemy import or_

from database import get_db
import models
import schemas

router = APIRouter(prefix="/api/articles", tags=["articles"])

# Nav category labels that are too generic to filter by — just browse all
GENERIC_NAV_CATEGORIES = {"期刊", "博士猪论文", "会议", "学术猪圈", "年鉴", "专利", "文献"}


@router.get("/search", response_model=schemas.SearchResult)
def search_articles(
    q: str = Query(""),
    category: str = Query(""),
    page: int = Query(1, ge=1),
    page_size: int = Query(15, ge=1, le=50),
    db: Session = Depends(get_db),
):
    query = db.query(models.Article)

    # Category filter: only apply specific field filter for non-generic labels
    if category and category not in GENERIC_NAV_CATEGORIES:
        query = query.join(models.Journal).filter(
            or_(
                models.Journal.field.contains(category),
                models.Journal.title.contains(category),
            )
        )

    # Full-text search on title and authors
    if q:
        query = query.filter(
            or_(
                models.Article.title.contains(q),
                models.Article.authors.contains(q),
            )
        )

    total = query.count()
    items = query.offset((page - 1) * page_size).limit(page_size).all()

    return {"items": items, "total": total, "page": page, "page_size": page_size}

