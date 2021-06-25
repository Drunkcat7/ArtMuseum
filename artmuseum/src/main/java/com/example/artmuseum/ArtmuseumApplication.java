package com.example.artmuseum;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@MapperScan("com.example.artmuseum.dao")
public class ArtmuseumApplication {

	public static void main(String[] args) {
		SpringApplication.run(ArtmuseumApplication.class, args);
	}

}
