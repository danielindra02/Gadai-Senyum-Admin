import React, { useState } from 'react'
import './AddProduct.css'
import upload_area from '../../assets/upload_area.svg'

export const AddProduct = () => {

    const [image,setImage]=useState(false);

    const [productDetails,setProductDetails] = useState({
        name:"",
        image:"",
        category:"kamera",
        new_price:"",
        old_price:""

    })

    const changeHandler = (e) => {
        setProductDetails({...productDetails,[e.target.name]:e.target.value})
    }

    const imageHandler = (e) => {
        setImage(e.target.files[0]);
    }

    const Add_Product = async ()=>{
        console.log(productDetails);
        let responseData;
        let product = productDetails;

        let formData= new FormData();
        formData.append('product',image);

        //hitting http endpoint using method post, header : application/json, body : formData didalamnya ada product field dan didalam product field kita parsing image
        await fetch('http://localhost:4000/upload',{
            method:'POST',
            headers:{
                Accept:'application/json',
            },
            body:formData,
        }).then((resp)=>resp.json()).then((data)=>{responseData=data});

        if(responseData.success){
            product.image = responseData.image_url;
            console.log(product);
            await fetch('http://localhost:4000/addproduct',{
                method:'POST',
                headers:{
                    Accept:'application/json',
                    'Content-Type':'application/json',
                },
                body:JSON.stringify(product),
            }).then((resp)=>resp.json()).then((data)=>{
                data.success?alert("Product Added"):alert("Failed");
            })
        }

    }

  return (
    <div className='add-product'>
        <div className="add-product-itemfield">
            <p>Product Title</p>
        <input value={productDetails.name} onChange={changeHandler} type="text" name='name' placeholder='Type Here' />
        </div>
        <div className="add-product-price">
            <div className="add-product-itemfield">
                <p>Price</p>
                <input value={productDetails.old_price} onChange={changeHandler} type="text" name='old_price' placeholder='Type Here'/>
            </div>
            <div className="add-product-itemfield">
                <p>Offer Price</p>
                <input value={productDetails.new_price} onChange={changeHandler} type="text" name='new_price' placeholder='Type Here'/>
            </div>
        </div>
        <div className="add-product-itemfield">
            <p>Product Category</p>
            <select value={productDetails.category} onChange={changeHandler} name="category" className='add-product-selector'>
                <option value="kamera">Kamera</option>
                <option value="handphone">Handphone</option>
                <option value="laptop">Laptop</option>
            </select>
        </div>
        <div className="add-product-itemfield">
            <label htmlFor="file-input">
                <img src={image?URL.createObjectURL(image):upload_area} className='add-product-thumnail-img' alt="" />
            </label>
            <input onChange={imageHandler} type="file" name='image' id='file-input' hidden/>
        </div>
        <button onClick={()=>{Add_Product()}} className='add-product-btn'> ADD </button>
    </div>
  )
}
