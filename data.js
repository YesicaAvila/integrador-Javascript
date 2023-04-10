const productsIndumentaria = [
    {
        id: 1,
        name: "Buzo Corto Gris Central Park",
        precio: 15000,
        categoria: "buzos",
        cardImg: "./asset/buzo central perk.jpg",


    },
    {
        id: 2,
        name: "Buzo Blanco Cuore",
        precio: 14300,
        categoria: "buzos",
        cardImg: "./asset/buzo cuore.jpg",

    },
    {
        id: 3,
        name: "Buzo Gris UFO",
        precio: 13000,
        categoria: "buzos",
        cardImg: "./asset/buzo pint.jpg",
    },
    {
        id: 4,
        name: "Buzo Bolsillos Rosa",
        precio: 15200,
        categoria: "buzos",
        cardImg: "./asset/buzo rosa.jpg",
    },
    {
        id: 5,
        name: "Buzo Azul New York",
        precio: 14700,
        categoria: "buzos",
        cardImg: "./asset/buzo.jpg",

    },
    {
        id: 6,
        name: "Remera Top Negra Galaxia",
        precio: 3000,
        categoria: "remeras",
        cardImg: "./asset/Blusas Tops negra.jpg",
    },
    {
        id: 7,
        name: "Musculosa Rose",
        precio: 2900,
        categoria: "remeras",
        cardImg: "./asset/musculosa.jpg",
    },
    {
        id: 8,
        name: "Top Verde Bertha",
        precio: 2800,
        categoria: "remeras",
        cardImg: "./asset/top verde.jpg",

    },
    {
        id: 9,
        name: "Top Marron Friday",
        precio: 3500,
        categoria: "remeras",
        cardImg: "./asset/remera marron.jpg",

    },
    {
        id: 10,
        name: "Remera Basica Gris",
        precio: 2500,
        categoria: "remeras",
        cardImg: "./asset/remera basica.jpg",
    },
    {
        id: 11,
        name: "Pantalón Asteria Marrón",
        precio: 5900,
        categoria: "jeans",
        cardImg: "./asset/pantalon marron.jpg",
    },
    {
        id: 12,
        name: "Mom Jeans Rotos",
        precio: 5990,
        categoria: "jeans",
        cardImg: "./asset/moms jeans.jpg",
    },
    {
        id: 13,
        name: "Jeans Verdes",
        precio: 6500,
        categoria: "jeans",
        cardImg: "./asset/jeans verdes.jpg",
    },
    {
        id: 14,
        name: "Jeans Mom Negro",
        precio: 6400,
        categoria: "jeans",
        cardImg: "./asset/jeans negros.jpg",
    },
    {
        id: 15,
        name: "Jeans Mom Blancos",
        precio: 7400,
        categoria: "jeans",
        cardImg: "./asset/jeans blancos.jpg",
    },
    {
        id: 16,
        name: "Campera Basica Blanca",
        precio: 8000,
        categoria: "ofertas",
        cardImg: "./asset/camperas oferta.jpg",
    },
    {
        id: 17,
        name: "Chaleco Negro",
        precio: 9900,
        categoria: "ofertas",
        cardImg: "./asset/Chaleco negro oferta.jpg",
    },
    {
        id: 18,
        name: "Chaleco Cuadrille Dark",
        precio: 6700,
        categoria: "ofertas",
        cardImg: "./asset/chaleco oferta.jpg",
    },
    {
        id: 19,
        name: "Shorts Good People",
        precio: 4500,
        categoria: "ofertas",
        cardImg: "./asset/shorts ofertas.png",
    },
    {
        id: 20,
        name: "Joggins Los Angeles",
        precio: 4620,
        categoria: "ofertas",
        cardImg: "./asset/joggins oferta.jpg",
    },
];

const splitProduct = (size) => {
    let dividedProducts = [];

    for (let i = 0; i < productsIndumentaria.length; i += size) {
        dividedProducts.push(productsIndumentaria.slice(i, i + size))
    }
    return dividedProducts;
};
const productControl = {
    dividedProducts: splitProduct(5),
    proxIndex: 1,
    prodLimit: splitProduct(5).length,

};