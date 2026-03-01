from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import datetime


# ===== Auth Schemas =====

class UserRegister(BaseModel):
    username: str
    email: str
    password: str


class UserLogin(BaseModel):
    username: str
    password: str


class Token(BaseModel):
    access_token: str
    token_type: str


class UserOut(BaseModel):
    id: int
    username: str
    email: str
    created_at: datetime

    class Config:
        from_attributes = True


# ===== Article Schemas =====

class ArticleOut(BaseModel):
    id: int
    title: str
    authors: Optional[str]
    journal_id: Optional[str]
    published_date: Optional[str]
    citations: int
    downloads: int

    class Config:
        from_attributes = True


# ===== Journal Schemas =====

class JournalOut(BaseModel):
    id: str
    title: str
    sub_title: Optional[str]
    field: Optional[str]
    impact_factor: Optional[str]
    publisher: Optional[str]
    frequency: Optional[str]
    description: Optional[str]

    class Config:
        from_attributes = True


class JournalDetailOut(JournalOut):
    articles: list[ArticleOut] = []

    class Config:
        from_attributes = True


# ===== Submission Schemas =====

class SubmissionCreate(BaseModel):
    journal_id: str
    paper_title: str
    author_name: str


class SubmissionOut(BaseModel):
    id: int
    journal_id: str
    paper_title: str
    author_name: str
    status: str
    created_at: datetime

    class Config:
        from_attributes = True


# ===== Search Result =====

class SearchResult(BaseModel):
    items: list[ArticleOut]
    total: int
    page: int
    page_size: int
