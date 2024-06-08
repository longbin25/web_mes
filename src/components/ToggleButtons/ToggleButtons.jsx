import React from "react"

function ToggleButtons({ titles, onClick, active, width = "300px" }) {
    return (
        <>
            <div className="toggle-buttons-container flex flex-row items-center justify-center ">
                {titles.map((item, index) => {
                    return (
                        <div
                            type="button"
                            key={index}
                            className={`toggle-buttons-button first:rounded-l-lg last:rounded-r-lg ${
                                active === index ? "bg-primary-1 text-neutron-4" : "bg-neutron-4 text-primary-1"
                            } first-child:rounded-xl text-2.4rem  toggle-buttons-button flex  h-[40px] w-[${width}] cursor-pointer list-none flex-row items-center justify-center overflow-hidden  !border !border-primary-1 px-4  text-xl  shadow-none transition-all duration-100 ease-in-out hover:bg-neutron-2 hover:text-primary-2 active:bg-primary-1`}
                            onClick={() => onClick(index)}
                        >
                            {item}
                        </div>
                    )
                })}
            </div>
        </>
    )
}

export default ToggleButtons
