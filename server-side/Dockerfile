# Image with Java 17 and Maven
FROM maven:3.8.5-openjdk-17

# Set working directory inside the container
WORKDIR /app

# Copy pom.xml and source code
COPY pom.xml .
COPY src ./src

# Build the project
RUN mvn clean install

# Run the app
CMD ["java", "-jar", "target/demo-0.0.1-SNAPSHOT.jar"]
