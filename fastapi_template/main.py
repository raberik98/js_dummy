from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse
from fastapi.exceptions import RequestValidationError
from fastapi.templating import Jinja2Templates
from fastapi.responses import HTMLResponse
from controllers.person_controller import person_api_router
from controllers.jobs_controller import job_api_router
from config.config import Configuration
from utils.logger import LogError



app = FastAPI()
templates = Jinja2Templates(directory="views")

@app.get("/", response_class=HTMLResponse)
async def home(request: Request):
      return templates.TemplateResponse(
            name="index.html",
            context={"request":request, "title":"Home page", "message":"Hello there!"}
            )


app.include_router(router=person_api_router, prefix="/api/v1/people")
app.include_router(router=job_api_router, prefix="/api/v1/job")



@app.exception_handler(RequestValidationError)
async def handle_validation_error(request: Request, exc: RequestValidationError):
      LogError(exc)
      return JSONResponse(status_code=422 ,content={
            "Success": False,
            "Message": "Incorrect data format!"
      })

