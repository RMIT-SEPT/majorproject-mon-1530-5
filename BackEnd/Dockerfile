FROM openjdk:8-jre-alpine
MAINTAINER Daniel Bound
VOLUME /tmp
EXPOSE 8080
ADD target/bookingAPI-0.0.1-SNAPSHOT.jar bookingAPI-0.0.1-SNAPSHOT.jar
ENTRYPOINT ["java", "-jar", "bookingAPI-0.0.1-SNAPSHOT.jar"]