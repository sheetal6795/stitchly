# Build stage
FROM maven:3.9.6-eclipse-temurin-17 AS build
WORKDIR /app

# Copy pom.xml and settings.xml
COPY pom.xml settings.xml ./

# Pre-fetch dependencies using the mirror
RUN mvn dependency:go-offline -B --settings settings.xml

# Copy source code and build package
COPY src ./src
RUN mvn package -DskipTests --settings settings.xml

# Run stage
FROM eclipse-temurin:17-jre-alpine
WORKDIR /app
COPY --from=build /app/target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]