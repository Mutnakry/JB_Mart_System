import React from 'react'
import { motion } from "framer-motion";
import { MdClose } from "react-icons/md";

function NodePayManey({ setIsModalCustomer }) {
    return (
        <div>
            <motion.div
                className="fixed top-0 left-0 right-0 z-50 flex items-start justify-center w-full h-full bg-black bg-opacity-30"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.2 }}
            >
                <div className="relative w-full bg-white shadow mt-10 dark:bg-gray-700 max-w-xl">
                    <div className="modal_title">
                        <h3 className="">អតិជន</h3>
                        <MdClose className='text-2xl cursor-pointer' onClick={() => setIsModalCustomer(false)} />
                    </div>
                    <div className="modal_form">

                    </div>
                </div>
            </motion.div>
        </div>
    )
}

export default NodePayManey