import React, { useState } from 'react'
import BlurCircle from '../Components/BlurCircle'
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

const DateSelect = ({ dateTime, id }) => {
  const navigate = useNavigate()
  const [selected, setSelected] = useState(null)

  const onBookHandler = () => {
    if (!selected) {
      toast.error('Please select a date') // corrected to show error toast
      return
    }
    navigate(`/movies/${id}/${selected}`)
    scrollTo(0, 0)
  }

  return (
    <div id="dateSelect" className="pt-30">
      <div className="flex flex-col md:flex-row items-center justify-between relative p-8 bg-primary/10 border border-primary/20 rounded-lg">
        
        <BlurCircle top="-100px" left="-100px" />
        <BlurCircle top="100px" right="0px" />

        <div className="w-full md:flex md:items-center md:justify-between gap-6">
          {/* Left: Date Selector */}
          <div>
            <p className="text-lg font-semibold mb-3">Choose Date</p>
            
            <div className="flex items-center gap-4 text-sm">
              <ChevronLeftIcon width={28} className="cursor-pointer" />

              <div className="grid grid-cols-3 md:flex flex-wrap md:max-w-lg gap-4">
                {Object.keys(dateTime).map((date) => {
                  const isSelected = selected === date
                  return (
                    <button
                      key={date}
                      onClick={() => setSelected(date)} // Correct React onClick
                      className={`flex flex-col items-center justify-center h-14 w-14 aspect-square rounded cursor-pointer transition
                        ${isSelected ? "bg-red-500 text-white border-none" : "bg-gray-800 hover:bg-gray-700 text-white border border-primary/70"}`}
                    >
                      <span>{new Date(date).getDate()}</span>
                      <span>{new Date(date).toLocaleDateString("en-US", { month: "short" })}</span>
                    </button>
                  )
                })}
              </div>

              <ChevronRightIcon width={28} className="cursor-pointer" />
            </div>
          </div>

          {/* Right: Book Now */}
          <div className="mt-4 md:mt-0">
            <button
              onClick={onBookHandler} // Correct React onClick
              className="bg-red-500 text-white px-6 py-3 rounded hover:bg-red-600 transition-all cursor-pointer"
            >
              Book Now
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DateSelect
