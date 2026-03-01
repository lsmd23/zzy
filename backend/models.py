from sqlalchemy import Column, Integer, String, Text, DateTime, ForeignKey, Enum
from sqlalchemy.orm import relationship
from datetime import datetime
from database import Base


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String(64), unique=True, index=True, nullable=False)
    email = Column(String(128), unique=True, index=True, nullable=False)
    hashed_password = Column(String(256), nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)

    submissions = relationship("Submission", back_populates="author")


class Journal(Base):
    __tablename__ = "journals"

    id = Column(String(64), primary_key=True)  # slug like 'zi-ran'
    title = Column(String(128), nullable=False)
    sub_title = Column(String(128))
    field = Column(String(64))
    impact_factor = Column(String(16))
    publisher = Column(String(128))
    frequency = Column(String(128))
    description = Column(Text)

    articles = relationship("Article", back_populates="journal")
    submissions = relationship("Submission", back_populates="journal")


class Article(Base):
    __tablename__ = "articles"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(256), nullable=False, index=True)
    authors = Column(String(256))
    journal_id = Column(String(64), ForeignKey("journals.id"))
    published_date = Column(String(16))
    citations = Column(Integer, default=0)
    downloads = Column(Integer, default=0)

    journal = relationship("Journal", back_populates="articles")


class Submission(Base):
    __tablename__ = "submissions"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    journal_id = Column(String(64), ForeignKey("journals.id"), nullable=False)
    paper_title = Column(String(256), nullable=False)
    author_name = Column(String(128), nullable=False)
    status = Column(Enum("pending", "accepted", "rejected"), default="pending")
    created_at = Column(DateTime, default=datetime.utcnow)

    author = relationship("User", back_populates="submissions")
    journal = relationship("Journal", back_populates="submissions")
