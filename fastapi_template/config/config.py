from pydantic import BaseModel

class Configuration(BaseModel):
    PORT: int
    HOST: str
    DB_URL: str