package com.cryptopulse.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

import java.util.Arrays;
import java.util.List;

/**
 * CORS configuration for the CryptoPulse API.
 *
 * <p>Restricts cross-origin requests to trusted frontend origins only.
 * Configured via the {@code cors.allowed-origins} property so that
 * different environments (dev, staging, production) can set their own values.
 */
@Configuration
public class CorsConfig {

    @Value("${cors.allowed-origins}")
    private String allowedOriginsRaw;

    /**
     * Registers a {@link CorsFilter} that:
     * <ul>
     *   <li>Allows configured origins (localhost in dev, Vercel URL in prod)</li>
     *   <li>Allows common REST methods</li>
     *   <li>Allows Authorization and Content-Type headers</li>
     *   <li>Allows credentials (cookies / auth tokens)</li>
     *   <li>Sets pre-flight cache to 1 hour</li>
     * </ul>
     */
    @Bean
    public CorsFilter corsFilter() {
        List<String> allowedOrigins = Arrays.asList(allowedOriginsRaw.split(","));

        CorsConfiguration config = new CorsConfiguration();
        config.setAllowedOrigins(allowedOrigins);
        config.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS", "HEAD"));
        config.setAllowedHeaders(List.of(
                "Authorization",
                "Content-Type",
                "Accept",
                "Origin",
                "X-Requested-With",
                "Cache-Control"
        ));
        config.setAllowCredentials(true);
        config.setMaxAge(3600L); // 1 hour pre-flight cache

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/api/**", config);

        return new CorsFilter(source);
    }
}
