import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import {Row, Col } from 'react-bootstrap';
import { removeFromWishlist } from '../Redux/slices/wishlistSlice';
import { addToCart } from '../Redux/slices/cartSlice';



function Wishlist() {
  const wishlistArray = useSelector((state)=>state.wishlistReducer)
  const dispatch = useDispatch()
  const handleWishlistCart = (product)=>{
    dispatch(addToCart(product))
    dispatch(removeFromWishlist(product.id))
  }
  return (
    <div style={{marginTop:'100px'}}>
      <Row className='m-5'>
        {
          wishlistArray.length>0?
          wishlistArray.map((product,index)=>(
            <Col key={index} className='mb-5' sm={12} md={6} lg={4} xl={3} >
              <Card className='shadow rounded'  style={{ width: '18rem',height:'27rem' }}>
            <Card.Img style={{padding:'10px'}} height={'200px'} variant="top" src={product?.thumbnail} />
            <Card.Body>
              <Card.Title>{product?.title}</Card.Title>
              <Card.Text>
               <p>{product?.description.slice(0,55)}...</p>
               <h5>$ {product?.price}</h5>
              </Card.Text>
              <div className='d-flex justify-content-between'>
              <Button className='btn btn-light'>
                   <i style={{color:'red'}} onClick={()=>dispatch(removeFromWishlist(product.id))} className="fa-solid fa-trash fa-lg "></i>
              </Button>
              <Button onClick={()=>handleWishlistCart(product)} className='btn btn-light'>
                   <i className="fa-solid fa-cart-plus fa-lg text-success"></i>
              </Button>
              </div>
            </Card.Body>
          </Card>
          </Col>
          )): <div style={{height:'60vh'}} className='w-100 d-flex flex-column justify-content-center align-items-center'>
            <img height={'250px'} src="https://cdn.dribbble.com/users/5107895/screenshots/14532312/media/a7e6c2e9333d0989e3a54c95dd8321d7.gif" alt="" />
            <h3 className='fw-bolder mt-3 fs-1 text-warning'> Your Wishlist is Empty!!!</h3>
            <Link style={{textDecoration:'none'}} className='btn btn-success rounded mt-3' to={'/'} >Back to Home</Link>
          </div>
        }
      </Row>
    </div>
  )
}

export default Wishlist