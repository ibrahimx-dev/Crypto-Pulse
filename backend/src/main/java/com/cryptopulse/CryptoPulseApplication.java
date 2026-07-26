package com.cryptopulse;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * CryptoPulse – Enterprise Cryptocurrency Dashboard
 *
 * <p>Entry point for the Spring Boot 3 backend application.
 * This service acts as a proxy between the React frontend and the
 * CoinGecko public API, ensuring the API key is never exposed to clients.
 *
 * @author CryptoPulse Team
 * @version 1.0.0
 */
@SpringBootApplication
public class CryptoPulseApplication {

    public static void main(String[] args) {
        SpringApplication.run(CryptoPulseApplication.class, args);
    }
}
