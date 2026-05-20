async function createProduct(productData) {
    const formData = new FormData();
    
    // Agregar campos al FormData
    Object.keys(productData).forEach(key => {
        if (key === 'photos') {
            productData.photos.forEach(photo => {
                formData.append('photos', photo);
            });
        } else if (key !== 'history') {
            formData.append(key, JSON.stringify(productData[key]));
        }
    });
    
    const response = await fetch('http://localhost:3000/api/products', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: formData
    });
    
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error);
    }
    
    return await response.json();
}