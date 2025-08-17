import React from 'react'

const stats = [
    {
        value: "2+",
        label: "Happy Users"
    },
    {
        value: "99.69%",
        label: "Uptime"
    },
    {
        value: "2min",
        label: "Setup Time"
    },
    {
        value: "50hrs",
        label: "Saved Per Month"
    }
]

function StatsSection() {
    return (
        <section className='py-20 bg-black'>
            <div className='max-w-6xl mx-auto px-4'>
                <div className='grid md:grid-cols-4 gap-8 mb-20 pb-16'>
                    {
                        stats.map((stat, index) => (
                            <div key={index} className='text-center group'>
                                <div className='text-4xl font-bold bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600  bg-clip-text text-transparent mb-2'>
                                    {stat.value}
                                </div>
                                <p className='text-gray-400'>{stat.label}</p>
                            </div>
                        ))
                    }
                </div>

            </div>
        </section>
    )
}

export default StatsSection