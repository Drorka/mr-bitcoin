import axios from 'axios'
import { storageService } from './storage.service'
import { utilService } from '@/services/util.service.js'

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
		const priceHistoryByDay = storageService.load(STORAGE_KEY_HISTORY)
		if (!priceHistoryByDay || priceHistoryByDay.length === 0) {
			let { data } = await axios.get(
				'https://api.blockchain.info/charts/market-price?timespan=1months&format=json&cors=true'
			)
			storageService.save(STORAGE_KEY_HISTORY, data.values)
			return data.values
		}

		// get formatted days
		const timestamps = priceHistoryByDay.map((value) => value.x)
		const formattedDates = timestamps.map((timestamp) =>
			utilService.getFormattedDate(timestamp)
		)

		// get prices
		const prices = priceHistoryByDay.map((value) => value.y)

		// create object to send back to cmp
		const priceHistory = {
			labels: formattedDates,
			datasets: [{ data: prices }],
		}
		return priceHistory
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
				'https://api.blockchain.info/charts/avg-block-size?timespan=1months&format=json&cors=true'
			))
		storageService.save(STORAGE_KEY_SIZE, avgBlockSize)
		return avgBlockSize.data
	} catch (err) {
		console.log('Failed to get price history')
		throw err
	}
}
