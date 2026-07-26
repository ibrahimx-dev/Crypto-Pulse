package com.cryptopulse.mapper;

import com.cryptopulse.dto.CoinDetailDto;
import com.cryptopulse.dto.CoinSummaryDto;
import com.cryptopulse.model.CoinGeckoDetail;
import com.cryptopulse.model.CoinGeckoMarket;
import org.springframework.stereotype.Component;

import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.Optional;

/**
 * Mapper responsible for converting raw CoinGecko models into clean DTOs.
 *
 * <p>Following the Single Responsibility Principle, all field-mapping logic
 * lives here — keeping service and controller classes free from transformation noise.
 */
@Component
public class CoinMapper {

    // ─── Market → Summary ─────────────────────────────────────────────────────

    /**
     * Maps a {@link CoinGeckoMarket} response object to a {@link CoinSummaryDto}.
     *
     * @param market the raw CoinGecko market data
     * @return a clean summary DTO for the dashboard table
     */
    public CoinSummaryDto toSummaryDto(CoinGeckoMarket market) {
        if (market == null) return null;

        List<Double> sparkline = Optional.ofNullable(market.getSparklineIn7d())
                .map(CoinGeckoMarket.SparklineData::getPrice)
                .orElse(Collections.emptyList());

        return CoinSummaryDto.builder()
                .id(market.getId())
                .name(market.getName())
                .symbol(toUpperCase(market.getSymbol()))
                .image(market.getImage())
                .marketCapRank(market.getMarketCapRank())
                .currentPrice(market.getCurrentPrice())
                .priceChangePercentage24h(market.getPriceChangePercentage24h())
                .priceChange24h(market.getPriceChange24h())
                .marketCap(market.getMarketCap())
                .totalVolume(market.getTotalVolume())
                .high24h(market.getHigh24h())
                .low24h(market.getLow24h())
                .circulatingSupply(market.getCirculatingSupply())
                .totalSupply(market.getTotalSupply())
                .sparkline7d(sparkline)
                .build();
    }

    // ─── Detail → DetailDto ───────────────────────────────────────────────────

    /**
     * Maps a {@link CoinGeckoDetail} response to a {@link CoinDetailDto}.
     *
     * @param detail   the raw CoinGecko detail data
     * @param currency the requested currency (e.g. "usd")
     * @return a clean detail DTO for the sliding drawer
     */
    public CoinDetailDto toDetailDto(CoinGeckoDetail detail, String currency) {
        if (detail == null) return null;

        CoinGeckoDetail.MarketData md = detail.getMarketData();

        String description = Optional.ofNullable(detail.getDescription())
                .map(d -> d.getOrDefault("en", ""))
                .map(this::stripHtml)
                .orElse("");

        List<String> homepages = Optional.ofNullable(detail.getLinks())
                .map(CoinGeckoDetail.Links::getHomepage)
                .orElse(Collections.emptyList())
                .stream()
                .filter(url -> url != null && !url.isBlank())
                .limit(3)
                .toList();

        String imageUrl = Optional.ofNullable(detail.getImage())
                .map(CoinGeckoDetail.Image::getLarge)
                .orElse("");

        List<Double> sparkline = Collections.emptyList();
        if (md != null && md.getSparkline7d() != null) {
            sparkline = Optional.ofNullable(md.getSparkline7d().getPrice())
                    .orElse(Collections.emptyList());
        }

        return CoinDetailDto.builder()
                .id(detail.getId())
                .name(detail.getName())
                .symbol(toUpperCase(detail.getSymbol()))
                .image(imageUrl)
                .marketCapRank(detail.getMarketCapRank())
                .description(description)
                .homepageUrls(homepages)
                .platform(detail.getAssetPlatformId())
                .sparkline7d(sparkline)
                // Pricing (currency-aware)
                .currentPrice(getFromMap(md != null ? md.getCurrentPrice() : null, currency))
                .priceChange24h(md != null ? md.getPriceChange24h() : null)
                .priceChangePercentage24h(md != null ? md.getPriceChangePercentage24h() : null)
                .high24h(getFromMap(md != null ? md.getHigh24h() : null, currency))
                .low24h(getFromMap(md != null ? md.getLow24h() : null, currency))
                // Market
                .marketCap(getFromMap(md != null ? md.getMarketCap() : null, currency))
                .totalVolume(getFromMap(md != null ? md.getTotalVolume() : null, currency))
                .circulatingSupply(md != null ? md.getCirculatingSupply() : null)
                .totalSupply(md != null ? md.getTotalSupply() : null)
                .maxSupply(md != null ? md.getMaxSupply() : null)
                // ATH / ATL
                .ath(getFromMap(md != null ? md.getAth() : null, currency))
                .athChangePercentage(getFromMap(md != null ? md.getAthChangePercentage() : null, currency))
                .athDate(getStringFromMap(md != null ? md.getAthDate() : null, currency))
                .atl(getFromMap(md != null ? md.getAtl() : null, currency))
                .atlChangePercentage(getFromMap(md != null ? md.getAtlChangePercentage() : null, currency))
                .atlDate(getStringFromMap(md != null ? md.getAtlDate() : null, currency))
                .build();
    }

    // ─── Private Helpers ──────────────────────────────────────────────────────

    private Double getFromMap(Map<String, Double> map, String key) {
        if (map == null || key == null) return null;
        return map.get(key.toLowerCase());
    }

    private String getStringFromMap(Map<String, String> map, String key) {
        if (map == null || key == null) return null;
        return map.get(key.toLowerCase());
    }

    private String toUpperCase(String value) {
        return value != null ? value.toUpperCase() : null;
    }

    /** Strips basic HTML tags from CoinGecko description text. */
    private String stripHtml(String html) {
        if (html == null || html.isBlank()) return "";
        return html.replaceAll("<[^>]*>", "").trim();
    }
}
