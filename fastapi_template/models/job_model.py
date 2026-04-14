from pydantic import BaseModel

class Job(BaseModel):
    title: str
    desc: str

class Employee(BaseModel):
    name: str
    age: str
