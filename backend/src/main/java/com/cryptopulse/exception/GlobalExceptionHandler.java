package com.cryptopulse.exception;

import com.cryptopulse.dto.ApiResponse;
import com.cryptopulse.util.AppConstants;
import jakarta.validation.ConstraintViolationException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.reactive.function.client.WebClientResponseException;

import java.util.concurrent.TimeoutException;

/**
 * Centralised exception handler for all REST controllers.
 *
 * <p>Intercepts specific exception types and converts them to structured
 * {@link ApiResponse} error envelopes with appropriate HTTP status codes,
 * ensuring the frontend always receives a consistent error format.
 *
 * <p>Follows the Open/Closed Principle — new exception types can be added
 * without modifying existing handlers.
 */
@RestControllerAdvice
public class GlobalExceptionHandler {

    private static final Logger log = LoggerFactory.getLogger(GlobalExceptionHandler.class);

    // ─── Application Exceptions ───────────────────────────────────────────────

    /**
     * Handles 404 when a coin ID is not found in CoinGecko.
     */
    @ExceptionHandler(CoinNotFoundException.class)
    public ResponseEntity<ApiResponse<Void>> handleCoinNotFound(CoinNotFoundException ex) {
        log.warn("Coin not found: {}", ex.getCoinId());
        return ResponseEntity
                .status(HttpStatus.NOT_FOUND)
                .body(ApiResponse.error("Coin not found with id: " + ex.getCoinId(), HttpStatus.NOT_FOUND.value()));
    }

    /**
     * Handles upstream CoinGecko API failures (502 Bad Gateway).
     */
    @ExceptionHandler(ExternalApiException.class)
    public ResponseEntity<ApiResponse<Void>> handleExternalApiException(ExternalApiException ex) {
        log.error("External API error: {} (upstream status: {})", ex.getMessage(), ex.getUpstreamStatus());
        return ResponseEntity
                .status(HttpStatus.BAD_GATEWAY)
                .body(ApiResponse.error(ex.getMessage(), HttpStatus.BAD_GATEWAY.value()));
    }

    // ─── WebClient Exceptions ─────────────────────────────────────────────────

    /**
     * Handles raw WebClient HTTP errors not already caught by the service layer.
     */
    @ExceptionHandler(WebClientResponseException.class)
    public ResponseEntity<ApiResponse<Void>> handleWebClientResponse(WebClientResponseException ex) {
        log.error("Unhandled WebClient error: HTTP {}", ex.getStatusCode());
        HttpStatus status = ex.getStatusCode() == HttpStatus.NOT_FOUND
                ? HttpStatus.NOT_FOUND
                : HttpStatus.BAD_GATEWAY;
        return ResponseEntity
                .status(status)
                .body(ApiResponse.error(AppConstants.EXTERNAL_API_ERROR, status.value()));
    }

    /**
     * Handles timeout exceptions from WebClient / Reactor.
     */
    @ExceptionHandler(TimeoutException.class)
    public ResponseEntity<ApiResponse<Void>> handleTimeout(TimeoutException ex) {
        log.error("Request timed out: {}", ex.getMessage());
        return ResponseEntity
                .status(HttpStatus.GATEWAY_TIMEOUT)
                .body(ApiResponse.error(AppConstants.TIMEOUT_MESSAGE, HttpStatus.GATEWAY_TIMEOUT.value()));
    }

    // ─── Validation Exceptions ────────────────────────────────────────────────

    /**
     * Handles bean validation failures on request bodies.
     */
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ApiResponse<Void>> handleValidation(MethodArgumentNotValidException ex) {
        String details = ex.getBindingResult().getFieldErrors().stream()
                .map(fe -> fe.getField() + ": " + fe.getDefaultMessage())
                .reduce("", (a, b) -> a.isEmpty() ? b : a + "; " + b);
        log.warn("Validation error: {}", details);
        return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .body(ApiResponse.error(AppConstants.VALIDATION_ERROR + " – " + details, HttpStatus.BAD_REQUEST.value()));
    }

    /**
     * Handles constraint violations on query/path parameters.
     */
    @ExceptionHandler(ConstraintViolationException.class)
    public ResponseEntity<ApiResponse<Void>> handleConstraintViolation(ConstraintViolationException ex) {
        log.warn("Constraint violation: {}", ex.getMessage());
        return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .body(ApiResponse.error(AppConstants.VALIDATION_ERROR + " – " + ex.getMessage(), HttpStatus.BAD_REQUEST.value()));
    }

    // ─── Fallback ─────────────────────────────────────────────────────────────

    /**
     * Catch-all handler for any unexpected exceptions.
     */
    @ExceptionHandler(Exception.class)
    public ResponseEntity<ApiResponse<Void>> handleGeneral(Exception ex) {
        log.error("Unexpected error", ex);
        return ResponseEntity
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(ApiResponse.error(AppConstants.INTERNAL_SERVER_ERROR, HttpStatus.INTERNAL_SERVER_ERROR.value()));
    }
}
