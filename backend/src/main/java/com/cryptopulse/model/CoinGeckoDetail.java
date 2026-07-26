package com.cryptopulse.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.List;
import java.util.Map;

/**
 * Raw model mirroring CoinGecko's {@code GET /coins/{id}} response.
 */
@JsonIgnoreProperties(ignoreUnknown = true)
public class CoinGeckoDetail {

    private String id;
    private String symbol;
    private String name;
    private Map<String, String> description;
    private Links links;
    private Image image;

    @JsonProperty("market_cap_rank")
    private Integer marketCapRank;

    @JsonProperty("market_data")
    private MarketData marketData;

    @JsonProperty("asset_platform_id")
    private String assetPlatformId;

    public CoinGeckoDetail() {}

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    public String getSymbol() { return symbol; }
    public void setSymbol(String symbol) { this.symbol = symbol; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public Map<String, String> getDescription() { return description; }
    public void setDescription(Map<String, String> description) { this.description = description; }
    public Links getLinks() { return links; }
    public void setLinks(Links links) { this.links = links; }
    public Image getImage() { return image; }
    public void setImage(Image image) { this.image = image; }
    public Integer getMarketCapRank() { return marketCapRank; }
    public void setMarketCapRank(Integer marketCapRank) { this.marketCapRank = marketCapRank; }
    public MarketData getMarketData() { return marketData; }
    public void setMarketData(MarketData marketData) { this.marketData = marketData; }
    public String getAssetPlatformId() { return assetPlatformId; }
    public void setAssetPlatformId(String assetPlatformId) { this.assetPlatformId = assetPlatformId; }

    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class Image {
        private String thumb;
        private String small;
        private String large;
        public Image() {}
        public String getThumb() { return thumb; }
        public void setThumb(String thumb) { this.thumb = thumb; }
        public String getSmall() { return small; }
        public void setSmall(String small) { this.small = small; }
        public String getLarge() { return large; }
        public void setLarge(String large) { this.large = large; }
    }

    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class Links {
        private List<String> homepage;
        public Links() {}
        public List<String> getHomepage() { return homepage; }
        public void setHomepage(List<String> homepage) { this.homepage = homepage; }
    }

    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class MarketData {

        @JsonProperty("current_price")
        private Map<String, Double> currentPrice;

        @JsonProperty("market_cap")
        private Map<String, Double> marketCap;

        @JsonProperty("total_volume")
        private Map<String, Double> totalVolume;

        @JsonProperty("high_24h")
        private Map<String, Double> high24h;

        @JsonProperty("low_24h")
        private Map<String, Double> low24h;

        @JsonProperty("price_change_24h")
        private Double priceChange24h;

        @JsonProperty("price_change_percentage_24h")
        private Double priceChangePercentage24h;

        @JsonProperty("circulating_supply")
        private Double circulatingSupply;

        @JsonProperty("total_supply")
        private Double totalSupply;

        @JsonProperty("max_supply")
        private Double maxSupply;

        @JsonProperty("ath")
        private Map<String, Double> ath;

        @JsonProperty("ath_change_percentage")
        private Map<String, Double> athChangePercentage;

        @JsonProperty("ath_date")
        private Map<String, String> athDate;

        @JsonProperty("atl")
        private Map<String, Double> atl;

        @JsonProperty("atl_change_percentage")
        private Map<String, Double> atlChangePercentage;

        @JsonProperty("atl_date")
        private Map<String, String> atlDate;

        @JsonProperty("sparkline_7d")
        private SparklineData sparkline7d;

        public MarketData() {}

        public Map<String, Double> getCurrentPrice() { return currentPrice; }
        public void setCurrentPrice(Map<String, Double> currentPrice) { this.currentPrice = currentPrice; }
        public Map<String, Double> getMarketCap() { return marketCap; }
        public void setMarketCap(Map<String, Double> marketCap) { this.marketCap = marketCap; }
        public Map<String, Double> getTotalVolume() { return totalVolume; }
        public void setTotalVolume(Map<String, Double> totalVolume) { this.totalVolume = totalVolume; }
        public Map<String, Double> getHigh24h() { return high24h; }
        public void setHigh24h(Map<String, Double> high24h) { this.high24h = high24h; }
        public Map<String, Double> getLow24h() { return low24h; }
        public void setLow24h(Map<String, Double> low24h) { this.low24h = low24h; }
        public Double getPriceChange24h() { return priceChange24h; }
        public void setPriceChange24h(Double priceChange24h) { this.priceChange24h = priceChange24h; }
        public Double getPriceChangePercentage24h() { return priceChangePercentage24h; }
        public void setPriceChangePercentage24h(Double priceChangePercentage24h) { this.priceChangePercentage24h = priceChangePercentage24h; }
        public Double getCirculatingSupply() { return circulatingSupply; }
        public void setCirculatingSupply(Double circulatingSupply) { this.circulatingSupply = circulatingSupply; }
        public Double getTotalSupply() { return totalSupply; }
        public void setTotalSupply(Double totalSupply) { this.totalSupply = totalSupply; }
        public Double getMaxSupply() { return maxSupply; }
        public void setMaxSupply(Double maxSupply) { this.maxSupply = maxSupply; }
        public Map<String, Double> getAth() { return ath; }
        public void setAth(Map<String, Double> ath) { this.ath = ath; }
        public Map<String, Double> getAthChangePercentage() { return athChangePercentage; }
        public void setAthChangePercentage(Map<String, Double> athChangePercentage) { this.athChangePercentage = athChangePercentage; }
        public Map<String, String> getAthDate() { return athDate; }
        public void setAthDate(Map<String, String> athDate) { this.athDate = athDate; }
        public Map<String, Double> getAtl() { return atl; }
        public void setAtl(Map<String, Double> atl) { this.atl = atl; }
        public Map<String, Double> getAtlChangePercentage() { return atlChangePercentage; }
        public void setAtlChangePercentage(Map<String, Double> atlChangePercentage) { this.atlChangePercentage = atlChangePercentage; }
        public Map<String, String> getAtlDate() { return atlDate; }
        public void setAtlDate(Map<String, String> atlDate) { this.atlDate = atlDate; }
        public SparklineData getSparkline7d() { return sparkline7d; }
        public void setSparkline7d(SparklineData sparkline7d) { this.sparkline7d = sparkline7d; }
    }

    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class SparklineData {
        private List<Double> price;
        public SparklineData() {}
        public List<Double> getPrice() { return price; }
        public void setPrice(List<Double> price) { this.price = price; }
    }
}
