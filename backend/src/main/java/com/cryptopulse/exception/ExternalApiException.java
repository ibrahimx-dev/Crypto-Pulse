package com.cryptopulse.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

/**
 * Thrown when the upstream CoinGecko API returns an error or is unreachable.
 * Maps to HTTP 502 Bad Gateway.
 */
@ResponseStatus(HttpStatus.BAD_GATEWAY)
public class ExternalApiException extends RuntimeException {

    private final int upstreamStatus;

    public ExternalApiException(String message, int upstreamStatus) {
        super(message);
        this.upstreamStatus = upstreamStatus;
    }

    public ExternalApiException(String message, Throwable cause) {
        super(message, cause);
        this.upstreamStatus = 502;
    }

    public int getUpstreamStatus() {
        return upstreamStatus;
    }
}
