from fastapi import APIRouter
from models.person_model import Person

person_api_router = APIRouter()
people_list: list[Person] = [] 


@person_api_router.get("/")
async def people_index():
    return people_list

@person_api_router.post("/")
async def add_person(person: Person):
        people_list.append(person)
        return person