import React, { useState, useCallback } from 'react'
import { ExternalLink, TrendingUp, MoreHorizontal } from 'lucide-react'
import { Button } from '@shared/components/ui/button'
import { Carousel } from '@shared/components/ui/carousel'
import { cn } from '@shared/lib/utils'
import { BALANCE_DATA, type BalanceData } from '../constants/customer-data'

export const BalanceSection = React.memo(() => {
  const [balances, setBalances] = useState<BalanceData[]>(BALANCE_DATA)

  const handleAddNewBalance = useCallback(() => {
    const newBalance: BalanceData = {
      id: `new_balance_${Date.now()}`,
      label: 'New Balance',
      totalBalance: '$0.00',
      balances: [
        { currency: 'USD', amount: 0, formatted: '$0.00' },
        { currency: 'EUR', amount: 0, formatted: '€0.00' }
      ],
      status: 'new_balance',
      bgColor: 'bg-green-50',
      textColor: 'text-green-900'
    }
    
    setBalances(prev => [...prev, newBalance])
    
    // Force carousel to recalculate scrollability after DOM update
    setTimeout(() => {
      window.dispatchEvent(new Event('resize'))
    }, 100)
  }, [])

  return (
    <Carousel
      className="w-full mb-6"
      itemWidth="280px"
      gap="1rem"
      showNavigation
    >
        {/* Balance Cards */}
        {balances.map((balance) => (
          <div
            key={balance.id}
            className={cn(
              "group transition-all duration-200 hover:opacity-90 rounded-lg p-5 h-[190px] flex flex-col relative",
              balance.bgColor
            )}
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-3">
              <h3 className={cn("font-medium text-xs", balance.textColor)}>
                {balance.label}
              </h3>
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-5 w-5 -mt-1 -mr-1 opacity-50 hover:opacity-80 transition-opacity"
                aria-label={`More options for ${balance.label}`}
              >
                <MoreHorizontal className="h-2.5 w-2.5" />
              </Button>
            </div>

            {/* Main Balance */}
            <div className="mb-2">
              <div className={cn("text-xl font-bold", balance.textColor)}>
                {balance.totalBalance}
              </div>
              <div className="text-xs text-gray-600 mt-0.5">
                Total Balance
              </div>
            </div>

            {/* Currency Breakdown - Fixed Height */}
            <div className="h-[50px] mb-2">
              <div className="grid grid-cols-2 gap-x-2 gap-y-0">
                {/* Always render 4 slots for consistent layout */}
                {[0, 1, 2, 3].map((index) => {
                  const curr = balance.balances[index];
                  return (
                    <div key={index} className="flex items-center gap-1.5 h-5">
                      {curr ? (
                        <>
                          <span className="text-[11px] font-medium text-gray-600">{curr.currency}</span>
                          <span className={cn("text-[11px] font-semibold", balance.textColor)}>
                            {curr.formatted}
                          </span>
                        </>
                      ) : (
                        <span className="h-3" />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-1.5 absolute bottom-5 left-5">
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-5 w-5 p-0 bg-black/10 hover:bg-black/20 border border-black/15 transition-all duration-200 rounded-md flex items-center justify-center shrink-0"
                aria-label={`External link for ${balance.label}`}
              >
                <ExternalLink className={cn("!w-3 !h-3 opacity-60 hover:opacity-80", balance.textColor)} />
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-5 w-5 p-0 bg-black/10 hover:bg-black/20 border border-black/15 transition-all duration-200 rounded-md flex items-center justify-center shrink-0"
                aria-label={`View trends for ${balance.label}`}
              >
                <TrendingUp className={cn("!w-3 !h-3 opacity-60 hover:opacity-80", balance.textColor)} />
              </Button>
            </div>
          </div>
        ))}
        
        {/* Add Balance Card */}
        <div 
          className="group cursor-pointer transition-all duration-200 hover:bg-accent/20 border-2 border-dashed border-gray-300 rounded-lg p-5 h-[190px] flex flex-col items-center justify-center bg-gray-50/30"
          onClick={handleAddNewBalance}
        >
          {/* Plus Icon in Circle */}
          <div className="bg-white rounded-full w-12 h-12 flex items-center justify-center mb-4 shadow-sm">
            <div className="text-2xl font-light text-gray-600">+</div>
          </div>

          {/* Text Content */}
          <div className="text-center">
            <div className="text-sm font-medium text-gray-900 mb-1">Add new balance</div>
            <div className="text-xs text-gray-600">
              Create a new balance<br />account for your funds
            </div>
          </div>
        </div>
      </Carousel>
  )
})

BalanceSection.displayName = 'BalanceSection'
