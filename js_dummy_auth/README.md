This is just a dummy microservice that was meant to be used for testing.
It was created for my students to use this as they build a microservices infrastructure in EKS.

docker run -e MONGO_INITDB_ROOT_USERNAME=username -e MONGO_INITDB_ROOT_PASSWORD=password -p 27017:27017 mongo:8.0-rc-noble
