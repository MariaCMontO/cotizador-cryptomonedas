import { create } from 'zustand';
import { devtools } from 'zustand/middleware'
import type { CryptoCurrencyResponseSchema, CryptoPrice, Pair } from './types/index'
import { getCryptos, fetchCurrentCryptoPrice } from './services/CryptoService'

type CryptoStore = {
    cryptoCurrencies: CryptoCurrencyResponseSchema[],
    result: CryptoPrice,
    loading: boolean,
    fetchCryptos: () => Promise<void>,
    fetchData: (pair: Pair) => Promise<void>
}

export const useCryptoStore = create<CryptoStore>()(devtools((set) => ({
    //state
    cryptoCurrencies: [],
    result: {} as CryptoPrice,
    loading: false,

    //Acciones
    fetchCryptos: async () => {
        const cryptoCurrencies = await getCryptos();
        set(() => ({
            cryptoCurrencies
        }))
    },
    fetchData: async (pair) => {
        set(() => ({
            loading: true
        }))
        const result = await fetchCurrentCryptoPrice(pair)
        set(() => ({
            result,
            loading:false
        }))
    }
})))