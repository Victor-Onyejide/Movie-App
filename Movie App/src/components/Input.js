import React from "react";


export default function Inout({ setSearch }) {

    return (
        <div className='input'>
            <form>
                <input
                    type="text"
                    name="search"
                    onChange={(e) => setSearch(e.target.value)}

                />
            </form>

        </div>

    )
}