package com.cryptopulse.dto;

import com.fasterxml.jackson.annotation.JsonInclude;

import java.time.Instant;

/**
 * Generic API response wrapper.
 *
 * <p>All controller endpoints return this type to ensure a consistent,
 * predictable JSON shape for the frontend regardless of the data type.
 *
 * @param <T> the payload type
 */
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ApiResponse<T> {

    private boolean success;
    private String message;
    private T data;
    private Instant timestamp = Instant.now();
    private Integer statusCode;

    public ApiResponse() {}

    public ApiResponse(boolean success, String message, T data, Instant timestamp, Integer statusCode) {
        this.success = success;
        this.message = message;
        this.data = data;
        this.timestamp = timestamp != null ? timestamp : Instant.now();
        this.statusCode = statusCode;
    }

    // ─── Getters & Setters ────────────────────────────────────────────────────

    public boolean isSuccess() { return success; }
    public void setSuccess(boolean success) { this.success = success; }

    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }

    public T getData() { return data; }
    public void setData(T data) { this.data = data; }

    public Instant getTimestamp() { return timestamp; }
    public void setTimestamp(Instant timestamp) { this.timestamp = timestamp; }

    public Integer getStatusCode() { return statusCode; }
    public void setStatusCode(Integer statusCode) { this.statusCode = statusCode; }

    // ─── Factory Helpers ──────────────────────────────────────────────────────

    public static <T> ApiResponse<T> success(T data) {
        return new ApiResponse<>(true, "Request processed successfully", data, Instant.now(), null);
    }

    public static <T> ApiResponse<T> success(T data, String message) {
        return new ApiResponse<>(true, message, data, Instant.now(), null);
    }

    public static <T> ApiResponse<T> error(String message, int statusCode) {
        return new ApiResponse<>(false, message, null, Instant.now(), statusCode);
    }

    // ─── Builder ──────────────────────────────────────────────────────────────

    public static <T> ApiResponseBuilder<T> builder() {
        return new ApiResponseBuilder<>();
    }

    public static class ApiResponseBuilder<T> {
        private boolean success;
        private String message;
        private T data;
        private Instant timestamp = Instant.now();
        private Integer statusCode;

        public ApiResponseBuilder<T> success(boolean success) { this.success = success; return this; }
        public ApiResponseBuilder<T> message(String message) { this.message = message; return this; }
        public ApiResponseBuilder<T> data(T data) { this.data = data; return this; }
        public ApiResponseBuilder<T> timestamp(Instant timestamp) { this.timestamp = timestamp; return this; }
        public ApiResponseBuilder<T> statusCode(Integer statusCode) { this.statusCode = statusCode; return this; }

        public ApiResponse<T> build() {
            return new ApiResponse<>(success, message, data, timestamp, statusCode);
        }
    }
}
