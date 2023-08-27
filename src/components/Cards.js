import React, { useEffect } from 'react'
import { useState } from 'react';
import { Audio,ThreeDots} from 'react-loader-spinner';
import ReactStars from 'react-stars';
import { getDocs } from 'firebase/firestore'
import { movieRef } from '../firebase/firebase'
import { Link } from 'react-router-dom';

const altfn = 'https://th.bing.com/th/id/R.4f23cc00214033cfd763a8758c308563?rik=g34m7WH166P%2fJA&riu=http%3a%2f%2fbra3.org%2fnot_found.png&ehk=mdYHaauK3wGDbbLzjetxPm8406z2bbrqp5bhz%2b0CKWA%3d&risl=&pid=ImgRaw&r=0"
const Cards = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        async function getData() {
            setLoading(true);
            const _data = await getDocs(movieRef);
            _data.forEach((doc) => {
                setData((prv) => [...prv, {...(doc.data()),id: doc.id}])
            })
            setLoading(false);
        }
        getData();
    }, [])

    return (
        <div className='flex flex-wrap justify-between p-3 mt-2'>
            {loading ? <div className='w-full flex justify-center items-center h-96'><ThreeDots height={40} color='white' /></div> :
                data.map((e, i) => {
                    return (
                        <Link to={`/detail/${e.id}`}>
                        <div key={i} className='card font-medium shadow-lg p-2 hover:-translate-y-3 cursor-pointer mt-6 transition-all duration-500'>
                            <div className='image'><img className='h-60 md:h-72' alt={ altfn } src={e.image} /></div>
                            <h1>{e.title}</h1>
                            <h1 className='flex itme-center mr-2'><span className='text-gray-500 mt-1 mr-1'>Rating:</span>
                                <ReactStars
                                    size={20}
                                    half={true}
                                    value={e.rating/e.rated}
                                    edit={false}
                                />
                            </h1>
                            <h1><span className='text-gray-500'>Year:</span> {e.year}</h1>
                        </div>
                        </Link>
                    )
                })
            }
        </div>
    )
}

export default Cards
