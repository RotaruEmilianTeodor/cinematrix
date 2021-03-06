import React, { useState } from 'react'
import { FaRegStar } from 'react-icons/fa'

const StarRating = () => {
    const [hover, setHover] = useState(null)
    const [ratingValue2, setRatingValue2] = useState(null)
    const [voted, setVoted] = useState(false)

    const userJSON = localStorage.getItem('user')
    const userJSONParsed = JSON.parse(userJSON)

    const PostData = (newRatingValue) => {
        setVoted(true)
        fetch('/updateRatingValue', {
            method: 'put',
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem('jwt')
            },
            body: JSON.stringify({
                ratingValue2: ratingValue2,
                newRatingValue: newRatingValue
            })
        }).then(
            res => res.json()
        ).then(
            result => console.log(result)
        ).then(
            localStorage.setItem('NewRatingValue', newRatingValue)
        )
    }

    return (
        <div>
            {[...Array(5)].map((star, i) => {
                const ratingValue = i + 1
                return (
                <label>
                <input type="radio" name="rating" value = {ratingValue} onClick = {() => PostData(ratingValue)}/>
                <FaRegStar className = 'star' color = {ratingValue <= (hover || userJSONParsed.ratingValue) ? 'ffc107' : 'white'} size ={30} onMouseEnter = {() => setHover(ratingValue)} onMouseLeave = {() => setHover(localStorage.getItem('NewRatingValue'))}></FaRegStar>
                </label> 
                )
            })}
        </div>
    )
}

export default StarRating
