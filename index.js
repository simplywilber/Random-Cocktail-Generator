import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const PORT = process.env.PORT || 3000;
const API_URL =  `https://www.thecocktaildb.com/api/json/v1/1/random.php`;
const d = new Date();
const Year = d.getFullYear();

app.use(express.static("Public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.render("index.ejs", {Year: Year})
});
app.get("/generated", async (req, res) => {
try {
    const response = await axios.get(API_URL);
    const randomDrink = response.data.drinks[0];
        const randomDrinkName = randomDrink["strDrink"];
        const randomDrinkGlass = randomDrink["strGlass"];
        const randomDrinkInst = randomDrink["strInstructions"];
        const randomDrinkImg = randomDrink["strDrinkThumb"];
        const randomDrinkAlch = randomDrink["strAlcoholic"];
    res.render("generated.ejs", {Year: Year, Name: randomDrinkName, Glass: randomDrinkGlass,
        Instructions: randomDrinkInst, image: randomDrinkImg, data: randomDrink, AlcoholType: randomDrinkAlch});
} catch (error) {
    console.error("Failed to make request:", error.message);
    res.render("index.ejs", {Year: Year}, {
        error: error.message,
    });
}});

app.listen(PORT, () => {
    console.log(`Server is running on port:${PORT}...`);
});