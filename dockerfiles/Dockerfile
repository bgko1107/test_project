FROM openjdk:8-jdk-alpine

#ARG JAR_FILE=target/app.war
#COPY ${JAR_FILE} app.war
RUN mkdir /app \
    && cp /usr/share/zoneinfo/Asia/Seoul /etc/localtime  \
    && echo "Asia/Seoul" > /etc/timezone
ENV TZ=Asia/Seoul
#COPY . /app
ENTRYPOINT ["java","-jar","/app/app.war"]