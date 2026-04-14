from pydantic import BaseModel, EmailStr

from models.job_model import Job

class Person(BaseModel):
    name: str
    age: int
    email: EmailStr
    job: Job


