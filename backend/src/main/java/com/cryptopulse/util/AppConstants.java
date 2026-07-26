package com.cryptopulse.util;

/**
 * Application-wide constants.
 *
 * <p>Centralises magic strings, default values, and configuration keys
 * to support the SOLID Open/Closed principle — changes here propagate everywhere.
 */
public final class AppConstants {

    private AppConstants() {
        // Utility class – no instantiation
    }

    // ─── CoinGecko ────────────────────────────────────────────────────────────

    /** Default number of coins returned by the list endpoint. */
    public static final int DEFAULT_COIN_LIMIT = 20;

    /** Default currency for price data. */
    public static final String DEFAULT_CURRENCY = "usd";

    /** Ordering parameter sent to CoinGecko. */
    public static final String MARKET_ORDER = "market_cap_desc";

    /** Whether to include sparkline data. */
    public static final String SPARKLINE = "true";

    /** Price change percentage window. */
    public static final String PRICE_CHANGE_PERCENTAGE = "24h";

    // ─── API Response Messages ─────────────────────────────────────────────────

    public static final String SUCCESS_MESSAGE       = "Request processed successfully";
    public static final String COIN_NOT_FOUND        = "Coin not found with id: ";
    public static final String EXTERNAL_API_ERROR    = "Failed to fetch data from CoinGecko API";
    public static final String TIMEOUT_MESSAGE       = "The upstream CoinGecko API timed out. Please try again.";
    public static final String VALIDATION_ERROR      = "Request validation failed";
    public static final String INTERNAL_SERVER_ERROR = "An unexpected error occurred. Please contact support.";
}
