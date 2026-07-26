package com.cryptopulse.controller;

import com.cryptopulse.dto.ApiResponse;
import com.cryptopulse.dto.CoinDetailDto;
import com.cryptopulse.dto.CoinSummaryDto;
import com.cryptopulse.service.CoinService;
import com.cryptopulse.util.AppConstants;
import jakarta.validation.constraints.Pattern;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * REST controller exposing the public CryptoPulse API.
 *
 * <p>All endpoints return {@link ApiResponse} wrappers to ensure a
 * consistent JSON contract regardless of the underlying data shape.
 *
 * <p>Base path: {@code /api}
 */
@RestController
@RequestMapping("/api")
@Validated
public class CoinController {

    private static final Logger log = LoggerFactory.getLogger(CoinController.class);

    private final CoinService coinService;

    public CoinController(CoinService coinService) {
        this.coinService = coinService;
    }

    // ─── Endpoints ────────────────────────────────────────────────────────────

    /**
     * Retrieves the top 10 cryptocurrencies ordered by market capitalisation.
     *
     * <p>Example: {@code GET /api/coins?currency=usd}
     *
     * @param currency 3-letter currency code (default: usd)
     * @return 200 OK with list of coin summaries
     */
    @GetMapping("/coins")
    public ResponseEntity<ApiResponse<List<CoinSummaryDto>>> getTopCoins(
            @RequestParam(defaultValue = "usd")
            @Pattern(regexp = "^[a-zA-Z]{2,5}$", message = "Currency must be a 2-5 letter code")
            String currency
    ) {
        log.info("GET /api/coins – currency={}", currency);

        List<CoinSummaryDto> coins = coinService.getTopCoins(currency);
        return ResponseEntity.ok(ApiResponse.success(coins,
                "Top " + coins.size() + " coins fetched successfully"));
    }

    /**
     * Retrieves full detail for a single cryptocurrency.
     *
     * <p>Example: {@code GET /api/coins/bitcoin?currency=usd}
     *
     * @param id       CoinGecko coin identifier (e.g. "bitcoin")
     * @param currency 3-letter currency code (default: usd)
     * @return 200 OK with full coin detail, or 404 if not found
     */
    @GetMapping("/coins/{id}")
    public ResponseEntity<ApiResponse<CoinDetailDto>> getCoinDetail(
            @PathVariable String id,
            @RequestParam(defaultValue = "usd")
            @Pattern(regexp = "^[a-zA-Z]{2,5}$", message = "Currency must be a 2-5 letter code")
            String currency
    ) {
        log.info("GET /api/coins/{} – currency={}", id, currency);

        CoinDetailDto detail = coinService.getCoinDetail(id, currency);
        return ResponseEntity.ok(ApiResponse.success(detail,
                "Coin detail fetched successfully for: " + id));
    }

    /**
     * Health check endpoint.
     *
     * <p>Example: {@code GET /api/health}
     *
     * @return 200 OK with status message
     */
    @GetMapping("/health")
    public ResponseEntity<ApiResponse<String>> health() {
        return ResponseEntity.ok(ApiResponse.success("CryptoPulse API is running", "OK"));
    }
}
