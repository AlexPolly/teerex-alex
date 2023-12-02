import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { emptyCart, removeFromCart } from '../Redux/slices/cartSlice';

function Cart() {
  const cartArray = useSelector((state) => state.cartReducer);
  const dispatch = useDispatch()
  const [total,setTotal] = useState(0)
  const navigate = useNavigate()


  const getCartTotal = ()=>{
    if(cartArray.length>0){
      setTotal(cartArray.map(item=>item.price).reduce((p1,p2)=>p1+p2))
    }else{
      setTotal(0)
    }
  }
  const handleCart = ()=>{
    dispatch(emptyCart())
    alert("Order successfully Placed... Thank you for purchasing with us !!!")
    navigate('/')
  }
  useEffect(()=>{
    getCartTotal()
  },[cartArray])

  return (
    <div className='container' style={{ marginTop: '100px' }}>
      {cartArray.length > 0 ? (
        
        <div className='row mt-5 d-flex justify-content-center align-items-center'>
          <div className='col-lg-6'>
            <table className='table shadow border'>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Product Name</th>
                  <th>Image</th>
                  <th>Price</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {cartArray.map((product, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{product.title}</td>
                    <td>
                      <img width={'100px'} height={'80px'} src={product.thumbnail} alt='' />
                    </td>
                    <td>$ {product.price}</td>
                    <td>
                      <button onClick={()=>dispatch(removeFromCart(product.id))} className='btn'> <i style={{color:'red'}} className="fa-solid fa-trash fa-2x"></i></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className='col-lg-1'></div>
          <div className='col-lg-3 '>
            <div className='border p-3 rounded shadow my-5 mb-5'>
               <h1 className='text-primary'>Cart Summary</h1>
               <h4 className='mt-3'>Total Products : <span>{cartArray.length}</span></h4>
               <h4 >Total : <span className='text-danger fw-bolder fs-2'>$ {total}</span></h4>
               <div className='d-grid mt-5'>
                <button onClick={handleCart} className='btn btn-success rounded'>Ckeck Out</button>
               </div>
            </div>          
          </div>
        </div>
      ) : (
        <div
          style={{ height: '60vh' }}
          className='w-100 d-flex flex-column justify-content-center align-items-center'
        >
          <img
            height={'250px'}
            src='https://cdn.dribbble.com/users/5107895/screenshots/14532312/media/a7e6c2e9333d0989e3a54c95dd8321d7.gif'
            alt=''
          />
          <h3 className='fw-bolder mt-3 fs-1 text-warning'> Your Cart is Empty!!!</h3>
          <Link style={{ textDecoration: 'none' }} className='btn btn-success rounded mt-3' to={'/'}>
            Back to Home
          </Link>
        </div>
      )}
    </div>
  );
}

export default Cart;