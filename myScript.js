async function loadProducts() {
    const url = 'https://fakestoreapi.com/products';
    try {
        const response = await fetch(url);  //ניגש לשרת לשלוף נתונים
        const products = await response.json();

        const tableBody = document.getElementById('productsTable');
        products.forEach(product => {
            const row = document.createElement('tr');  //מכניס את כל המוצרים לטבלה
            row.innerHTML = `  
                <td>${product.id}</td>
                <td>${product.title}</td>
                <td>${product.price}</td>
                <td>${product.description}</td>
                <td>${product.category}</td>
                <td>${getCategoryIcon(product.category)}</td>
            `;
            tableBody.appendChild(row);
        });
    } catch (error) {
        console.error('Error fetching products:', error);
    }
}

function getCategoryIcon(category) { //הופסת אייקונים
    const icons = {
        'electronics': '📱',
        "men's clothing": '👕',
        "women's clothing": '👗',
        'jewelery': '💍'
    };
    return icons[category] || '❓';  //במידה ולא מוצא אייקון תואם לקטגוריה
}

async function searchProduct() {  //פונקציית חיפוש מוצר
    const code = document.getElementById('productCode').value;
    const url = `https://fakestoreapi.com/products/${code}`;
    try {
        const response = await fetch(url);
        const product = await response.json();

        const resultDiv = document.getElementById('productResult');
        resultDiv.innerHTML = `
            <h3>Product Details</h3>
            <p><strong>Name:</strong> ${product.title}</p>
            <p><strong>Price:</strong> ${product.price}</p>
            <p><strong>Description:</strong> ${product.description}</p>
            <p><strong>Category:</strong> ${product.category}</p>
            <p><strong>Icon:</strong> ${getCategoryIcon(product.category)}</p>
        `;
    } catch (error) {
        console.error('Error fetching product:', error);
    }
}

async function searchByCategory() {  //פונקציית חיפוש קטגוריה
    const category = document.getElementById('categorySelect').value;
    if (!category) return;

    const url = `https://fakestoreapi.com/products/category/${category}`;
    try {
        const response = await fetch(url);
        const products = await response.json();

        const tableBody = document.getElementById('categoryTable');
        tableBody.innerHTML = ''; // מנקה חיפושים קודמים
        products.forEach(product => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${product.id}</td>
                <td>${product.title}</td>
                <td>${product.price}</td>
                <td>${product.description}</td>
                <td>${product.category}</td>
                <td>${getCategoryIcon(product.category)}</td>
            `;
            tableBody.appendChild(row);
        });
    } catch (error) {
        console.error('Error fetching products:', error);
    }
}


