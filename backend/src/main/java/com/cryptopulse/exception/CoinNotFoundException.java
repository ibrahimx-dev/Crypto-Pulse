package com.cryptopulse.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

/**
 * Thrown when a coin with a given ID cannot be found in CoinGecko.
 * Maps to HTTP 404 Not Found.
 */
@ResponseStatus(HttpStatus.NOT_FOUND)
public class CoinNotFoundException extends RuntimeException {

    private final String coinId;

    public CoinNotFoundException(String coinId) {
        super("Coin not found with id: " + coinId);
        this.coinId = coinId;
    }

    public String getCoinId() {
        return coinId;
    }
}
