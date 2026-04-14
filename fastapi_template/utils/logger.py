import time

async def LogInfo(message: str):
    print(f"[INFO: {time.localtime}] {str}")

async def LogError(message: str):
    print(f"[ERROR: {time.localtime}] {str}")

async def LogWarning(message: str):
    print(f"[WARNING: {time.localtime}] {str}")