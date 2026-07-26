package com.cryptopulse.service;

import com.cryptopulse.dto.CoinDetailDto;
import com.cryptopulse.dto.CoinSummaryDto;

import java.util.List;

/**
 * Service contract for coin-related business operations.
 *
 * <p>Programming to an interface (Dependency Inversion Principle) allows
 * the implementation to be swapped without modifying clients.
 */
public interface CoinService {

    /**
     * Retrieves the top {@code limit} coins ordered by market cap.
     *
     * @param currency the target currency code (e.g. "usd", "inr")
     * @return ordered list of coin summaries
     */
    List<CoinSummaryDto> getTopCoins(String currency);

    /**
     * Retrieves full detail for a single coin.
     *
     * @param coinId   the CoinGecko coin ID (e.g. "bitcoin")
     * @param currency the target currency code
     * @return detailed coin data for the drawer view
     */
    CoinDetailDto getCoinDetail(String coinId, String currency);
}
