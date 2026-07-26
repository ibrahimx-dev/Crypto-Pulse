# ── Build Stage ──────────────────────────────────────────────────────────────
FROM maven:3.9-eclipse-temurin-21-alpine AS build
WORKDIR /app

# Copy pom.xml and download dependencies (cached layer)
COPY pom.xml .
RUN mvn dependency:go-offline -B

# Copy source code and build package
COPY src ./src
RUN mvn clean package -DskipTests -B

# ── Run Stage ────────────────────────────────────────────────────────────────
FROM eclipse-temurin:21-jre-alpine
WORKDIR /app

# Copy the built jar from build stage
COPY --from=build /app/target/cryptopulse-backend-1.0.0.jar app.jar

# Expose default Spring Boot port
EXPOSE 8080

# Configure Spring to run on port 8080 (read from PORT env variable if set)
ENV SERVER_PORT=8080

ENTRYPOINT ["java", "-jar", "app.jar"]
