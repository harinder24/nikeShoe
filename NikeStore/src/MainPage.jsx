import React, { useContext } from 'react'
import Context from './context';
import { Link } from 'react-router-dom';

export default function MainPage() {

    const { shoes } = useContext(Context);
    
  return (
    <div className='w-screen min-h-screen '>
        <div className='flex w-full px-2 justify-between items-center'>
          <img width="50px" src="https://th.bing.com/th/id/OIP.IGAtQ8yZOBHlpr0Yhq9PMwHaC6?w=318&h=138&c=7&r=0&o=5&dpr=1.3&pid=1.7" alt=""  />  
        <Link to="/cart"> <img width="50px" src="https://th.bing.com/th/id/R.d01f6a524827d080143ba7b6a4fd2961?rik=CTAD0k7MJtPlMA&pid=ImgRaw&r=0" alt="" /></Link> 
        </div>
        <hr />
        <div className='w-full px-2'>
            <div className='py-4'>
        <h2 className=' font-medium  text-lg'>Runners</h2>
        <div className='pt-2 pb-4 flex gap-4 overflow-auto'>
            {shoes
  .filter(item => item.type === 'runner')
  .map(i => {

    return (
        <Link to=  {"/view/"+i.id}>
        <Card key={i.id} img={i.img} name={i.name} price={i.price}/>
        </Link>
    )})}
          
            
        </div>
        </div>
        <div className='py-4'>
        <h2 className=' font-medium  text-lg'>Casual</h2>
        <div className='pt-2 pb-4 flex gap-4 overflow-auto'>
        {shoes
  .filter(item => item.type === 'casual')
  .map(i => {

    return (
        <Link to=  {"/view/"+i.id}>
        <Card key={i.id} img={i.img} name={i.name} price={i.price}/>
        </Link>
    )})}
            
        </div>
        </div>
        <div className='py-4'>
        <h2 className=' font-medium  text-lg'>Basketball</h2>
        <div className='pt-2 pb-4 flex gap-4 overflow-auto'>
        {shoes
  .filter(item => item.type === 'basketball')
  .map(i => {
 
    return (
        <Link to=  {"/view/"+i.id}>
        <Card key={i.id} img={i.img} name={i.name} price={i.price}/>
        </Link>
    )})}
        </div>
        </div>
     
        </div>
        
    </div>
  )
}

function Card({img, name , price, id}){
    return(
        <>
        <div className='w-[400px] max-[400px]:w-[200px] cursor-pointer'>
            <div className='h-[400px] max-[400px]:h-[200px] w-[400px] max-[400px]:w-[200px] object-cover'>
                <img src={img} alt="" />
            </div>
            <div className=' flex justify-between py-3'>
                <div>
                    {name}
                </div>
                <div>
                    ${price}
                </div>
            </div>
        </div>
        </>
    )
}