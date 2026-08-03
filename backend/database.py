import os
from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base, sessionmaker

# SQLite Relational Database file path
DB_FILE = os.path.join(os.path.dirname(__file__), "venturewing.db")
SQLALCHEMY_DATABASE_URL = f"sqlite:///{DB_FILE}"

# Engine setup with check_same_thread=False for SQLite multi-thread FastAPI support
engine = create_engine(
    SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False}
)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

# FastAPI Dependency for Database Sessions
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
