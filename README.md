## Introduction

This application is built using Django, a powerful web framework in Python. This README file aims to provide information on how to set up and run the application.

## Installation

### Prerequisites

Before running the application, make sure you have the following prerequisites installed:

- Python (version 3.11 or higher)
- Django (version 4.2.3 or higher)
- PostgreSQL 14

### Setting Up the Environment

1. Clone the repository from `https://github.com/CodeWithSaurabhYadav/TheBackOffice`.
```
git clone https://github.com/CodeWithSaurabhYadav/TheBackOffice
```
2. Navigate to the project root directory using the terminal or command prompt.
```
cd TheBackOffice
```

### Install Dependencies

To install the required Python packages, use the following command:

```
pip install -r requirements.txt
```
For MacX and Linux
```
pip3 install -r requirements.txt
```

This command will read the `requirements.txt` file and install all the necessary packages for the application to run.

### Database Configuration

Before running the application, make sure to configure the database settings in the `settings.py` file. By default, the application uses PostgreSQL as the database. However, you can use other databases like SQL, MySQL, etc., based on your requirements.

### Apply Migrations

To create the necessary database tables, run the following command:
Please not if `python` doesn't work on your system try using `python3`

```
python manage.py makemigrations
```
```
python manage.py migrate
```

### Create a Superuser

Note this superuser will be used to `Log In` into the application

```bash
python manage.py createsuperuser
```

### Running the Application

To run the application locally, use the following command:

```bash
python manage.py runserver
```

Once the server is running, open your web browser and go to `http://127.0.0.1:8000/` to access the application.

## Features

- Login by username / password
- Logout
- Create a Product
    - ID
    - Name
    - Quantity
    - Price
- Delete a Product
- Edit a Product
- List All Products
- View a Product by ID

## API Documentation

[If your application has an API, provide the documentation here.]


Certainly! Below is the updated API documentation with the URL patterns and their corresponding views:

## API Documentation

### Endpoints

1. **Add Item**
   - URL: `/add/`
   - View: `views.addItem`
   - Name: `'add_item'`
   - Description: This endpoint allows users to add a new item to the database.

2. **Get Item**
   - URL: `/getData/<int:id>/`
   - View: `views.getItem`
   - Name: `'get_item'`
   - Description: This endpoint allows users to retrieve details of a specific item from the database. Users need to provide the `id` of the item in the URL to get information about a specific item.

3. **Delete Item**
   - URL: `/delete/<int:id>/`
   - View: `views.deleteItem`
   - Name: `'delete_item'`
   - Description: This endpoint allows users to delete a specific item from the database. Users need to provide the `id` of the item in the URL to delete a specific item.

4. **Update Item**
   - URL: `/update/<int:id>/`
   - View: `views.updateItem`
   - Name: `'update_item'`
   - Description: This endpoint allows users to update the details of a specific item in the database. Users need to provide the `id` of the item in the URL to update a specific item.

5. **GetItem**

    - URL: `/api/getItem/<int:id>/`
    - Method: GET
    - Name: `'getItem'`
    - Description: Get details of a specific item by its primary key (ID).
Authentication: Not required

### View Functions

1. **`views.addItem(request)`**
   - Description: This view function handles the logic for adding a new item to the database.
   - Method: POST
   - Response: JSON response indicating the success or failure of adding the item.

2. **`views.getItem(request, id)`**
   - Description: This view function handles the logic for retrieving details of a specific item from the database.
   - Method: GET
   - Parameters: `id` (int) - The primary key of the item to retrieve.
   - Response: JSON response containing the details of the item.

3. **`views.deleteItem(request, id)`**
   - Description: This view function handles the logic for deleting a specific item from the database.
   - Method: DELETE
   - Parameters: `id` (int) - The primary key of the item to delete.
   - Response: JSON response indicating the success or failure of the deletion.

4. **`views.updateItem(request, id)`**
   - Description: This view function handles the logic for updating the details of a specific item in the database.
   - Method: PUT
   - Parameters: `id` (int) - The primary key of the item to update.
   - Response: JSON response indicating the success or failure of the update.