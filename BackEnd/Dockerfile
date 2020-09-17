FROM openjdk:8-jre-alpine
WORKDIR /app
COPY target/bookingAPI-0.0.1-SNAPSHOT.jar /app/
ENTRYPOINT ["java", "-jar", "bookingAPI-0.0.1-SNAPSHOT.jar"]
EXPOSE 8080