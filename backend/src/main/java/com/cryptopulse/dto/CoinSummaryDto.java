package com.cryptopulse.dto;

import java.util.List;

/**
 * Data Transfer Object representing a summarised coin entry for the dashboard table.
 */
public class CoinSummaryDto {

    private String id;
    private Integer marketCapRank;
    private String name;
    private String symbol;
    private String image;
    private Double currentPrice;
    private Double priceChangePercentage24h;
    private Double priceChange24h;
    private Double marketCap;
    private Double totalVolume;
    private Double high24h;
    private Double low24h;
    private Double circulatingSupply;
    private Double totalSupply;
    private List<Double> sparkline7d;

    public CoinSummaryDto() {}

    public CoinSummaryDto(String id, Integer marketCapRank, String name, String symbol, String image,
                          Double currentPrice, Double priceChangePercentage24h, Double priceChange24h,
                          Double marketCap, Double totalVolume, Double high24h, Double low24h,
                          Double circulatingSupply, Double totalSupply, List<Double> sparkline7d) {
        this.id = id;
        this.marketCapRank = marketCapRank;
        this.name = name;
        this.symbol = symbol;
        this.image = image;
        this.currentPrice = currentPrice;
        this.priceChangePercentage24h = priceChangePercentage24h;
        this.priceChange24h = priceChange24h;
        this.marketCap = marketCap;
        this.totalVolume = totalVolume;
        this.high24h = high24h;
        this.low24h = low24h;
        this.circulatingSupply = circulatingSupply;
        this.totalSupply = totalSupply;
        this.sparkline7d = sparkline7d;
    }

    // Getters & Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    public Integer getMarketCapRank() { return marketCapRank; }
    public void setMarketCapRank(Integer marketCapRank) { this.marketCapRank = marketCapRank; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getSymbol() { return symbol; }
    public void setSymbol(String symbol) { this.symbol = symbol; }
    public String getImage() { return image; }
    public void setImage(String image) { this.image = image; }
    public Double getCurrentPrice() { return currentPrice; }
    public void setCurrentPrice(Double currentPrice) { this.currentPrice = currentPrice; }
    public Double getPriceChangePercentage24h() { return priceChangePercentage24h; }
    public void setPriceChangePercentage24h(Double priceChangePercentage24h) { this.priceChangePercentage24h = priceChangePercentage24h; }
    public Double getPriceChange24h() { return priceChange24h; }
    public void setPriceChange24h(Double priceChange24h) { this.priceChange24h = priceChange24h; }
    public Double getMarketCap() { return marketCap; }
    public void setMarketCap(Double marketCap) { this.marketCap = marketCap; }
    public Double getTotalVolume() { return totalVolume; }
    public void setTotalVolume(Double totalVolume) { this.totalVolume = totalVolume; }
    public Double getHigh24h() { return high24h; }
    public void setHigh24h(Double high24h) { this.high24h = high24h; }
    public Double getLow24h() { return low24h; }
    public void setLow24h(Double low24h) { this.low24h = low24h; }
    public Double getCirculatingSupply() { return circulatingSupply; }
    public void setCirculatingSupply(Double circulatingSupply) { this.circulatingSupply = circulatingSupply; }
    public Double getTotalSupply() { return totalSupply; }
    public void setTotalSupply(Double totalSupply) { this.totalSupply = totalSupply; }
    public List<Double> getSparkline7d() { return sparkline7d; }
    public void setSparkline7d(List<Double> sparkline7d) { this.sparkline7d = sparkline7d; }

    public static Builder builder() { return new Builder(); }

    public static class Builder {
        private String id;
        private Integer marketCapRank;
        private String name;
        private String symbol;
        private String image;
        private Double currentPrice;
        private Double priceChangePercentage24h;
        private Double priceChange24h;
        private Double marketCap;
        private Double totalVolume;
        private Double high24h;
        private Double low24h;
        private Double circulatingSupply;
        private Double totalSupply;
        private List<Double> sparkline7d;

        public Builder id(String id) { this.id = id; return this; }
        public Builder marketCapRank(Integer rank) { this.marketCapRank = rank; return this; }
        public Builder name(String name) { this.name = name; return this; }
        public Builder symbol(String symbol) { this.symbol = symbol; return this; }
        public Builder image(String image) { this.image = image; return this; }
        public Builder currentPrice(Double price) { this.currentPrice = price; return this; }
        public Builder priceChangePercentage24h(Double pct) { this.priceChangePercentage24h = pct; return this; }
        public Builder priceChange24h(Double change) { this.priceChange24h = change; return this; }
        public Builder marketCap(Double cap) { this.marketCap = cap; return this; }
        public Builder totalVolume(Double vol) { this.totalVolume = vol; return this; }
        public Builder high24h(Double high) { this.high24h = high; return this; }
        public Builder low24h(Double low) { this.low24h = low; return this; }
        public Builder circulatingSupply(Double s) { this.circulatingSupply = s; return this; }
        public Builder totalSupply(Double s) { this.totalSupply = s; return this; }
        public Builder sparkline7d(List<Double> spark) { this.sparkline7d = spark; return this; }

        public CoinSummaryDto build() {
            return new CoinSummaryDto(id, marketCapRank, name, symbol, image, currentPrice,
                    priceChangePercentage24h, priceChange24h, marketCap, totalVolume,
                    high24h, low24h, circulatingSupply, totalSupply, sparkline7d);
        }
    }
}
