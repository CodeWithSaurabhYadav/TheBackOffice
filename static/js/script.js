$(document).ready(function () {
    // Add Product Modal
    const addProductModal = $('#add-product-modal');
    const addProductForm = $('#add-product-form');
    // const addProductForm = $('#update-product-form');

    $('#add-product-button').click(function () {
        addProductModal.show();
    });

    $('.close-button').click(function () {
        addProductModal.hide();
        $('#product-details-modal').hide();
    });

    addProductForm.submit(function (e) {
        e.preventDefault();
        const formData = addProductForm.serialize();

        $.ajax({
            type: 'POST',
            url: '/api/add/',
            data: formData,
            success: function (data) {

                const productId = data.id;

                const li = $('<li>', {
                    class: 'list-group-item d-flex flex-row justify-content-between'
                });
                const container = $('<div>', {
                    class: 'container'
                });
                const row = $('<div>', {
                    class: 'row'
                });

                const nameCol = $('<div>', {
                    class: 'col',
                    text: addProductForm.find('input[name="name"]').val()
                });
                const quantityCol = $('<div>', {
                    class: 'col',
                    text: addProductForm.find('input[name="quantity"]').val()
                });
                const priceCol = $('<div>', {
                    class: 'col',
                    text: addProductForm.find('input[name="price"]').val()
                });
                row.append(nameCol, quantityCol, priceCol);
                container.append(row);
                li.append(container);

                const actionsDiv = $('<div>', {
                    class: 'd-flex flex-row-reverse'
                });
                const deleteButton = $('<button>', {
                    class: 'btn btn-danger mx-2',
                    text: 'Delete',
                    id: 'deleteButton',
                    "data-product-id": productId
                });
                const editButton = $('<button>', {
                    type: 'button',
                    class: 'btn btn-primary mx-2',
                    text: 'Edit',
                    id: "editButton",
                    'data-toggle': 'modal',
                    'data-target': '#updateProductModel',
                    'data-product-id': productId
                });

                actionsDiv.append(deleteButton, editButton);
                li.append(actionsDiv);

                // .append(productLink, deleteButton);
                $('ul#productsList').append(li);

                // Clear the form
                addProductForm.trigger('reset');

                // console.log('Product added successfully:', data);
                // Handle the response after successful product addition
            },

            error: function (error) {
                console.error('Error adding product:', error);
                console.log(error.responseText); // Log the error response text
                // Handle the error if product addition fails
            }
        });

    });

    // Product Details Modal
    const productDetailsModal = $('#product-details-modal');
    $('.product-link').click(function () {
        const productId = $(this).data('product-id');
        $.ajax({
            type: 'GET',
            url: `/products/${productId}/`,
            success: function (data) {
                $('#product-details-name').text(data.name);
                $('#product-details-description').text(data.description);
                productDetailsModal.show();
            },
            error: function () {
                alert('Error fetching product details');
            }
        });
    });
});

function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}


// Implement the logic to retrieve the CSRF token from cookies or other means
function getCSRFToken() {
    const csrfCookie = document.cookie.split(';').find(cookie => cookie.trim().startsWith('csrftoken='));
    if (csrfCookie) {
        return csrfCookie.split('=')[1];
    }
    return null; // Return null or handle the case when the CSRF token is not available
}

// Retrieve the JWT token from localStorage or any other client-side storage method you are using
function getJWTToken() {
    return localStorage.getItem('jwt_token'); // Assuming the JWT token is stored under the key 'jwt_token'
}


$(document).ready(function () {
    // Function to handle the "Delete" button click

    const csrfToken = getCSRFToken();

    $('ul').on('click', '#deleteButton', function () {

        const deleteStatus = confirm('Are you sure you want to delete this product?')

        if (!deleteStatus) {
            return;
        }
        const productId = $(this).data('product-id');

        // console.log(productId)

        $.ajax({
            type: 'DELETE',
            url: `/api/delete/${productId}/`,
            headers: {
                'X-CSRFToken': csrfToken,
                'Authorization': `Bearer ${getJWTToken()}`, // Implement the function to get JWT token from localStorage or cookies
            },
            success: function () {
                // Remove the product list item from the DOM
                $(`[data-product-id="${productId}"]`).closest('li').remove();
            },
            error: function () {
                alert('Error deleting product');
            }
        });
    });

    // Function to handle the "Edit" button click
    $('ul').on('click', '#editButton', function () {
        // const productId = $(this).data('id');

        const productId = $(this).data('product-id');

        // Fetch the product details from the API using the product ID
        $.ajax({
            type: 'GET',
            url: `/api/getData/${productId}/`,
            headers: {
                'X-CSRFToken': csrfToken,
                'Authorization': `Bearer ${getJWTToken()}`, // Implement the function to get JWT token from localStorage or cookies
            },
            success: function (data) {
                // Populate the modal form fields with the product details
                $('#updateProductModel').find('#PIdU').val(productId);
                $('#updateProductModel').find('#PNameU').val(data.name);
                $('#updateProductModel').find('#PQuantityU').val(data.quantity);
                $('#updateProductModel').find('#PPriceU').val(data.price);
            },
            error: function () {
                alert('Error fetching product details');
            }
        });
    });

    // Function to handle the form submission for updating a product
    $('#update-product-form').on('submit', function (e) {
        e.preventDefault();
        const formData = $(this).serialize();
        const productId = $('#PIdU').val();
        $.ajax({
            type: 'PUT',
            url: `/api/update/${productId}/`,
            headers: {
                'X-CSRFToken': csrfToken,
                'Authorization': `Bearer ${getJWTToken()}`, // Implement the function to get JWT token from localStorage or cookies
            },
            data: formData,
            success: function (data) {
                // Close the modal and update the product details in the UI
                $('#updateProductModel').modal('hide');
                // update the product name, quantity, and price in the list item
                $(`[data-product-id="${productId}"]`).closest('li').find('.col:eq(0)').text(data.name);
                $(`[data-product-id="${productId}"]`).closest('li').find('.col:eq(1)').text(data.quantity);
                $(`[data-product-id="${productId}"]`).closest('li').find('.col:eq(2)').text(data.price);
            },
            error: function () {
                alert('Error updating product');
            }
        });
    });
});



/* Keyboard Shortcuts */
$(document).keydown(function(event) {
    if (event.altKey && event.key.toUpperCase() === 'D') {
        event.preventDefault(); // Prevent default behavior of the keyboard shortcut
        $("#addProductBtn").click()
        // alert('Add New Item');
    }
});



