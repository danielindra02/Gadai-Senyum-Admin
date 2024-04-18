import React from 'react'
import './ListProduct.css'
import { useState } from 'react'
import { useEffect } from 'react';
import cross_icon from '../../assets/cross_icon.png'

export const ListProduct = () => {

  const [allproducts,setAllProducts]=useState([]);

  // using this fetch request getting the response and converted to json and save this data using setAllProducts
  const fetchInfo = async ()=>{
    await fetch('http://localhost:4000/allproducts')
    .then((res)=>res.json())
    .then((data)=>{setAllProducts(data)});
  }

  //kita akan menjalankan fungsi ini menggunakan useEffect
  useEffect(()=>{
    fetchInfo();
  },[])//fungsi ini ingin dijalankan hanya sekali jadi tambahkan 1 kurung


  //create end point for delete, and we add 1 object {} dari object ini kita menentukan methodnya, lalu menambahkan headers, dan menambahkan body, didalam body kita menambahkan product id dimana id mengambil paramater id
  const remove_product = async (id)=>{
    await fetch('http://localhost:4000/removeproduct',{
      method:'POST',
      headers:{
        Accept:'application/json',
        'Content-Type':'application/json',
      },
      body:JSON.stringify({id:id})
    })
    await fetchInfo();
  }

  return (
    <div className='list-product'>
        <h1>All Products List</h1>
        <div className="list-product-format-main">
          <p>Products</p>
          <p>Title</p>
          <p>Old Price</p>
          <p>New Price</p>
          <p>Category</p>
          <p>Remove</p>
        </div>
        <div className="list-product-allproducts">
          {/* we will map product data, we will fetch using API */}
          <hr />
            {allproducts.map((product,index)=>{
              return <>
                <div key={index} className="list-product-format-main list-product-format">
                  <img src={product.image} alt="" className="listproduct-product-icon" />
                  <p>{product.name}</p>
                  <p>${product.old_price}</p>
                  <p>${product.new_price}</p>
                  <p>{product.category}</p>
                  <img onClick={()=>{remove_product(product.id)}} src={cross_icon} alt="" className="list-product-remove-icon" />
                </div>
                <hr />
              </>
            })}
        </div>
    </div>
  )
}
