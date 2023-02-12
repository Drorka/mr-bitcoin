import axios from 'axios'
import { storageService } from '@/services/storage.service.js'

export const bitcoinService = {
	getRate,
	getMarketPriceHistory,
	getAvgBlockSize,
}

const STORAGE_KEY_RATE = 'rate'
const STORAGE_KEY_HISTORY = 'history'
const STORAGE_KEY_SIZE = 'size'

async function getRate() {
	try {
		const currRate =
			storageService.load(STORAGE_KEY_RATE) ||
			(await axios.get('https://blockchain.info/tobtc?currency=USD&value=1'))
		storageService.save(STORAGE_KEY_RATE, currRate)
		return currRate.data
	} catch (err) {
		console.log('Failed to get rate')
		throw err
	}
}

async function getMarketPriceHistory() {
	try {
		const priceHistory =
			storageService.load(STORAGE_KEY_HISTORY) ||
			(await axios.get(
				'https://api.blockchain.info/charts/market-price?timespan=5months&format=json&cors=true'
			))
		storageService.save(STORAGE_KEY_HISTORY, priceHistory)
		return priceHistory.data
	} catch (err) {
		console.log('Failed to get price history')
		throw err
	}
}

async function getAvgBlockSize() {
	try {
		const avgBlockSize =
			storageService.load(STORAGE_KEY_SIZE) ||
			(await axios.get(
				'https://api.blockchain.info/charts/avg-block-size?timespan=5months&format=json&cors=true'
			))
		storageService.save(STORAGE_KEY_SIZE, avgBlockSize)
		return avgBlockSize.data
	} catch (err) {
		console.log('Failed to get price history')
		throw err
	}
}
