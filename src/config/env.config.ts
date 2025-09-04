const config = {
  endpoints: {
    warehouse: import.meta.env.VITE_WAREHOUSE_API_URL || '/warehouse',
    merchants: import.meta.env.VITE_MERCHANTS_API_URL || '/merchants'
  },
  apiKey: 'api_cba306fa151f42006d1238b9db93fdde',
  defaultOrgId: 14791296,
}

export default config
