package com.cryptopulse.dto;

import java.util.List;

/**
 * Data Transfer Object for full coin detail shown in the sliding drawer.
 */
public class CoinDetailDto {

    private String id;
    private String name;
    private String symbol;
    private String image;
    private Integer marketCapRank;

    private Double currentPrice;
    private Double priceChangePercentage24h;
    private Double priceChange24h;
    private Double high24h;
    private Double low24h;

    private Double marketCap;
    private Double totalVolume;
    private Double circulatingSupply;
    private Double totalSupply;
    private Double maxSupply;

    private Double ath;
    private Double athChangePercentage;
    private String athDate;

    private Double atl;
    private Double atlChangePercentage;
    private String atlDate;

    private List<Double> sparkline7d;
    private String description;
    private String platform;
    private List<String> homepageUrls;

    public CoinDetailDto() {}

    // Getters and Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getSymbol() { return symbol; }
    public void setSymbol(String symbol) { this.symbol = symbol; }
    public String getImage() { return image; }
    public void setImage(String image) { this.image = image; }
    public Integer getMarketCapRank() { return marketCapRank; }
    public void setMarketCapRank(Integer marketCapRank) { this.marketCapRank = marketCapRank; }
    public Double getCurrentPrice() { return currentPrice; }
    public void setCurrentPrice(Double currentPrice) { this.currentPrice = currentPrice; }
    public Double getPriceChangePercentage24h() { return priceChangePercentage24h; }
    public void setPriceChangePercentage24h(Double priceChangePercentage24h) { this.priceChangePercentage24h = priceChangePercentage24h; }
    public Double getPriceChange24h() { return priceChange24h; }
    public void setPriceChange24h(Double priceChange24h) { this.priceChange24h = priceChange24h; }
    public Double getHigh24h() { return high24h; }
    public void setHigh24h(Double high24h) { this.high24h = high24h; }
    public Double getLow24h() { return low24h; }
    public void setLow24h(Double low24h) { this.low24h = low24h; }
    public Double getMarketCap() { return marketCap; }
    public void setMarketCap(Double marketCap) { this.marketCap = marketCap; }
    public Double getTotalVolume() { return totalVolume; }
    public void setTotalVolume(Double totalVolume) { this.totalVolume = totalVolume; }
    public Double getCirculatingSupply() { return circulatingSupply; }
    public void setCirculatingSupply(Double circulatingSupply) { this.circulatingSupply = circulatingSupply; }
    public Double getTotalSupply() { return totalSupply; }
    public void setTotalSupply(Double totalSupply) { this.totalSupply = totalSupply; }
    public Double getMaxSupply() { return maxSupply; }
    public void setMaxSupply(Double maxSupply) { this.maxSupply = maxSupply; }
    public Double getAth() { return ath; }
    public void setAth(Double ath) { this.ath = ath; }
    public Double getAthChangePercentage() { return athChangePercentage; }
    public void setAthChangePercentage(Double athChangePercentage) { this.athChangePercentage = athChangePercentage; }
    public String getAthDate() { return athDate; }
    public void setAthDate(String athDate) { this.athDate = athDate; }
    public Double getAtl() { return atl; }
    public void setAtl(Double atl) { this.atl = atl; }
    public Double getAtlChangePercentage() { return atlChangePercentage; }
    public void setAtlChangePercentage(Double atlChangePercentage) { this.atlChangePercentage = atlChangePercentage; }
    public String getAtlDate() { return atlDate; }
    public void setAtlDate(String atlDate) { this.atlDate = atlDate; }
    public List<Double> getSparkline7d() { return sparkline7d; }
    public void setSparkline7d(List<Double> sparkline7d) { this.sparkline7d = sparkline7d; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public String getPlatform() { return platform; }
    public void setPlatform(String platform) { this.platform = platform; }
    public List<String> getHomepageUrls() { return homepageUrls; }
    public void setHomepageUrls(List<String> homepageUrls) { this.homepageUrls = homepageUrls; }

    public static Builder builder() { return new Builder(); }

    public static class Builder {
        private final CoinDetailDto dto = new CoinDetailDto();

        public Builder id(String id) { dto.setId(id); return this; }
        public Builder name(String name) { dto.setName(name); return this; }
        public Builder symbol(String symbol) { dto.setSymbol(symbol); return this; }
        public Builder image(String image) { dto.setImage(image); return this; }
        public Builder marketCapRank(Integer rank) { dto.setMarketCapRank(rank); return this; }
        public Builder currentPrice(Double price) { dto.setCurrentPrice(price); return this; }
        public Builder priceChangePercentage24h(Double pct) { dto.setPriceChangePercentage24h(pct); return this; }
        public Builder priceChange24h(Double change) { dto.setPriceChange24h(change); return this; }
        public Builder high24h(Double high) { dto.setHigh24h(high); return this; }
        public Builder low24h(Double low) { dto.setLow24h(low); return this; }
        public Builder marketCap(Double cap) { dto.setMarketCap(cap); return this; }
        public Builder totalVolume(Double vol) { dto.setTotalVolume(vol); return this; }
        public Builder circulatingSupply(Double s) { dto.setCirculatingSupply(s); return this; }
        public Builder totalSupply(Double s) { dto.setTotalSupply(s); return this; }
        public Builder maxSupply(Double s) { dto.setMaxSupply(s); return this; }
        public Builder ath(Double ath) { dto.setAth(ath); return this; }
        public Builder athChangePercentage(Double pct) { dto.setAthChangePercentage(pct); return this; }
        public Builder athDate(String date) { dto.setAthDate(date); return this; }
        public Builder atl(Double atl) { dto.setAtl(atl); return this; }
        public Builder atlChangePercentage(Double pct) { dto.setAtlChangePercentage(pct); return this; }
        public Builder atlDate(String date) { dto.setAtlDate(date); return this; }
        public Builder sparkline7d(List<Double> spark) { dto.setSparkline7d(spark); return this; }
        public Builder description(String desc) { dto.setDescription(desc); return this; }
        public Builder platform(String p) { dto.setPlatform(p); return this; }
        public Builder homepageUrls(List<String> urls) { dto.setHomepageUrls(urls); return this; }

        public CoinDetailDto build() { return dto; }
    }
}
