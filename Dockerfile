# FROM ubuntu:latest AS build

# RUN apt-get update
# RUN apt-get install openjdk-17-jdk -y
# COPY . .



# FROM openjdk:17-jdk-slim



# COPY --from=build /target/deploy_render-1.0.0.jar app.jar

# ENTRYPOINT [ "java", "-jar", "app.jar" ]

FROM eclipse-temurin:17-jdk-alpine
WORKDIR /app
RUN apt-get install maven -y
RUN mvn clean install 
COPY target/deploy_render-1.0.0.jar deploy_render-1.0.0.jar
EXPOSE 25000
CMD ["java", "-jar","deploy_render-1.0.0.jar"]