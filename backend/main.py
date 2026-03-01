from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from database import engine
import models
from routers import auth, journals, articles, submissions
from seed import seed

# Create all tables
models.Base.metadata.create_all(bind=engine)

# Seed initial data
seed()

app = FastAPI(
    title="汁网 API",
    description="国际顶级整活学术平台后端 API",
    version="1.0.0",
)

# CORS - allow Vite dev server and production origins
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:4173", "http://localhost:80"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router)
app.include_router(journals.router)
app.include_router(articles.router)
app.include_router(submissions.router)


@app.get("/")
def root():
    return {"message": "欢迎来到汁网后端！猪脑服务器运行中..."}
