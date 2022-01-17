const PORT = 3000

const cheerio = require('cheerio');
const express = require('express');
const axios = require('axios');

const exp = express()

const url = 'https://www.theguardian.com'

function Site(url, article_html){
    this.url = url;
    this.article_html = article_html;
}

const guardian = new Site('https://www.theguardian.com', '.fc-item__title')
const cnn = new Site('https://www.cnn.com', '.cd__headline')
const huff = new Site('https://www.huffpost.com/','.card__headline__text')


axios(huff.url)
    .then(response =>{
        const html = response.data
        const $ = cheerio.load(html)
        const articles = [];
       
        $(huff.article_html, html).each(function(){
            const title = $(this).text()
            const url = $(this).find('a').text('href')
            if(title.includes("Covid")||title.includes("vaccine")||title.includes("Coronavirus")||title.includes("corona")){
                articles.push({
                    title,
                    url
            })}else{
                articles.push({
                    title,
                    url})
            }
        })
    console.log(articles)
    }).catch(err => console.log(err))

exp.listen(PORT, () => console.log('server running on PORT' ,{PORT}))


