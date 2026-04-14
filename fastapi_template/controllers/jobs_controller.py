from fastapi import APIRouter
from models.job_model import Job

job_api_router = APIRouter()
job_list: list[Job] = [] 

@job_api_router.get("/")
async def people_index():
    return job_list

@job_api_router.post("/")
async def add_person(job: Job):
        job_list.append(job)
        return job