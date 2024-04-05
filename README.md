# Tugas Besar Grafkom 1 PixelGraph

- Nigel Sahl (13521043)
- Muhammad Equilibrie Fajria (13521047)
- Ghazi Akmal Fauzan (13521058)

![Masterpiece screenshot](./doc/pictures/masterpiece.png)

## Table of Contents

- [Tugas Besar Grafkom 1 PixelGraph](#tugas-besar-grafkom-1-pixelgraph)
  - [Table of Contents](#table-of-contents)
  - [General Information](#general-information)
  - [Technologies Used](#technologies-used)
  - [Features](#features)
  - [Screenshots](#screenshots)
  - [How to Run](#how-to-run)
  - [Project Status](#project-status)
  - [Room for Improvement](#room-for-improvement)

## General Information

WebGL is a JavaScript API for rendering interactive 2D and 3D graphics within any compatible web browser without the use of plug-ins. WebGL does so by introducing an API that closely conforms to OpenGL ES 2.0 that can be used in HTML5 `<canvas>` elements. This conformance to OpenGL ES 2.0 allows for the porting of applications that make use of the API to the web platform. WebGL is widely supported in modern browsers, including Google Chrome, Mozilla Firefox, Apple Safari, and Microsoft Edge. The API is also supported on mobile devices, including those running Android and iOS.


## Technologies Used

- WebGL
- HTML
- CSS
- JavaScript
- Tailwind CSS

## Features

These are the app's features:
1. Model
    - Line
    - Square
    - Rectangle
    - Polygon
2. Function
    - Transformation
        - Translation
        - Rotation
        - Dilatation
        - Shear
    - Adding vertex to a polygon model
    - Moving the vertex of a model
    - Changing the color of a model
    - Save the model
    - Load the model
    - Clear the model

| Feature           | Description                                                                                     |
|:------------------|:------------------------------------------------------------------------------------------------|
| Garis             | Menyediakan fungsi untuk menggambar garis dan mengubah panjangnya.                               |
| Persegi           | Menyediakan fungsi untuk menggambar persegi dan mengubah panjang sisinya.                         |
| Persegi Panjang   | Menyediakan fungsi untuk menggambar persegi panjang dan mengubah panjang dan lebar sisi-sisinya. |
| Polygon           | Menyediakan fungsi untuk menggambar polygon, mengubah panjang sisi, serta menambah dan mengurangi jumlah titik sudut. |
| Transformasi      | Menyediakan fungsi untuk melakukan translasi, dilatasi, rotasi, dan shear pada model.             |
| Free Interaction  | Memungkinkan pengguna untuk menggerakkan salah satu titik sudut dengan drag and drop.             |
| Warna             | Memungkinkan pengguna untuk mengubah warna dari model.                                           |
| Save              | Memungkinkan pengguna untuk menyimpan model ke sebuah file .json.                                 |
| Load              | Memungkinkan pengguna untuk memuat (load) model dari file .json.                                  |
| Clear             | Memungkinkan pengguna untuk membersihkan canvas dan daftar model.                                 |
| Convex Hull       | Meskipun urutan penambahan titik berubah, gambar akhir polygon tetap sama yang merupakan convex hull dari titik-titiknya. |
| Lock              | Memungkinkan pengguna mengunci kesebangunan saat dilakukan dilatasi.                               |


## Screenshots

1. Main Page
![Web Page screenshot](./doc/pictures/main.png)

2. Models
![Models screenshot](./doc/pictures/models.png)

3. Abstract
![Abstract screenshot](./doc/pictures/abstract.png)

## How to Run

If you want to run the app, you only need to open ```index.html``` on folder ```src``` on your browser

If you want to develop the app, you can follow these step:

1. Clone this repository

2. Open the terminal and go to the project directory

3. Run the following command to install and start the tailwind css. Don't close the terminal after starting the tailwind until you finish using the application.

    ```bash
    npm install
    ```
    ```bash
    npm start
    ```

4. Open other terminal on the root project, then go to the src directory on your terminal
    ```bash
    cd src
    ```

5. Open the index.html file on your browser and it could be done with this command:
    ```bash
    .\index.html
    ```

6. Enjoy the application in your browser

## Project Status

Project is: _complete_

## Room for Improvement

Room for improvement:

- Speed up algorithm
- Make the application more user-friendly
- Add more features
