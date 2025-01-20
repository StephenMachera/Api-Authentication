import express from "express";
import axios from "axios";

const app = express();
const port = 3000;
const API_URL = "https://secrets-api.appbrewery.com/";

//TODO 1: Fill in your values for the 3 types of auth.
const yourUsername = "june";
const yourPassword = "123456789";
const yourAPIKey = "9baa6c05-8dd9-46fb-b041-9a6d5c2c080a";
const yourBearerToken = "";

app.get("/", (req, res) => {
  res.render("index.ejs", { content: "API Response." });
});

app.get("/noAuth", async(req, res) => {
  try {
    const response= await axios.get("https://secrets-api.appbrewery.com/random");
    const result=response.data;
    let contentData=JSON.stringify(result);
    res.render("index.ejs",{content:contentData});
  } catch (error) {
    console.log(error);
    res.status(404).send("the api is not reachable");
  }
});

app.get("/basicAuth",async (req, res) => {
  
    try {
      const response = await axios.get('https://secrets-api.appbrewery.com/all?page=2', {
        auth: {
          username: yourUsername,
          password: yourPassword
        },
      });
      const result = response.data;
      let contentData=JSON.stringify(result);
      res.render("index.ejs",{content:contentData});
    } catch (error) {
      console.log(error);
    }
});

app.get("/apiKey",async (req, res) => {
  try {
    const response=await axios.get(`https://secrets-api.appbrewery.com/filter?score=5&apiKey=${yourAPIKey}`);
    const result=response.data;
    let contentData=JSON.stringify(result);
    console.log(contentData);
    res.render("index.ejs",{content:contentData});
  } catch (error) {
    console.log(error);
  }
});

const config={
  headers:{
    Authorization:`Bearer ${yourBearerToken}`
  }
}
app.get("/bearerToken", async(req, res) => {
    try {
      const response=await axios.get("https://secrets-api.appbrewery.com/secrets/1",config);
      const result=response.data;
    let contentData=JSON.stringify(result);
    console.log(contentData);
    res.render("index.ejs",{content:contentData});
    } catch (error) {
      res.status(404).send(error.message);
    }
  
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
