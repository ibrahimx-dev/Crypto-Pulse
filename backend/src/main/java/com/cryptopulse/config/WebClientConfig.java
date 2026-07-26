package com.cryptopulse.config;

import com.cryptopulse.util.AppConstants;
import io.netty.channel.ChannelOption;
import io.netty.handler.timeout.ReadTimeoutHandler;
import io.netty.handler.timeout.WriteTimeoutHandler;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.client.reactive.ReactorClientHttpConnector;
import org.springframework.web.reactive.function.client.ExchangeFilterFunction;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;
import reactor.netty.http.client.HttpClient;

import java.time.Duration;
import java.util.concurrent.TimeUnit;

/**
 * WebClient configuration for CoinGecko API communication.
 *
 * <p>Configures connection and read timeouts, default headers,
 * and optional request/response logging for debugging.
 */
@Configuration
public class WebClientConfig {

    private static final Logger log = LoggerFactory.getLogger(WebClientConfig.class);

    @Value("${coingecko.api.base-url}")
    private String baseUrl;

    @Value("${coingecko.api.timeout.connect:5000}")
    private int connectTimeoutMs;

    @Value("${coingecko.api.timeout.read:10000}")
    private int readTimeoutMs;

    /**
     * Configures a WebClient bean with:
     * <ul>
     *   <li>Base URL pointing to CoinGecko</li>
     *   <li>Connection timeout (Netty channel option)</li>
     *   <li>Read/write timeout handlers</li>
     *   <li>Accept JSON header</li>
     *   <li>Request/response logging filter</li>
     * </ul>
     */
    @Bean
    public WebClient coinGeckoWebClient() {
        HttpClient httpClient = HttpClient.create()
                .compress(true)
                .option(ChannelOption.CONNECT_TIMEOUT_MILLIS, connectTimeoutMs)
                .responseTimeout(Duration.ofMillis(readTimeoutMs))
                .doOnConnected(conn ->
                        conn.addHandlerLast(new ReadTimeoutHandler(readTimeoutMs, TimeUnit.MILLISECONDS))
                                .addHandlerLast(new WriteTimeoutHandler(readTimeoutMs, TimeUnit.MILLISECONDS))
                );

        return WebClient.builder()
                .baseUrl(baseUrl)
                .clientConnector(new ReactorClientHttpConnector(httpClient))
                .defaultHeader(HttpHeaders.ACCEPT, MediaType.APPLICATION_JSON_VALUE)
                .defaultHeader("User-Agent", "CryptoPulse/1.0")
                .filter(logRequest())
                .filter(logResponse())
                .build();
    }

    // ─── Logging Filters ──────────────────────────────────────────────────────

    private ExchangeFilterFunction logRequest() {
        return ExchangeFilterFunction.ofRequestProcessor(request -> {
            log.debug("[WebClient] → {} {}", request.method(), request.url());
            return Mono.just(request);
        });
    }

    private ExchangeFilterFunction logResponse() {
        return ExchangeFilterFunction.ofResponseProcessor(response -> {
            log.debug("[WebClient] ← HTTP {}", response.statusCode());
            return Mono.just(response);
        });
    }
}
