const puppeteer = require('puppeteer')
const express = require('express')
const app = express()
const port = 3000

app.get("/",async (req, res) => {

    const browser = await puppeteer.launch({
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox'
        ]
    })
    const page = await browser.newPage()
    await page.goto('https://www.portalinmobiliario.com/arriendo/casa/rancagua-bernardo-ohiggins');

    const data = await page.evaluate( () => {
        const $rents = document.querySelectorAll('.shops__layout-item')
        const data = []

        $rents.forEach(($rent) => {

           data.push({
              price : ( ($rent.querySelector('.price-tag-fraction').textContent < 1000)
                ? $rent.querySelector('.price-tag-fraction').textContent*35000
                : parseInt($rent.querySelector('.price-tag-fraction').textContent) ),
              size  : $rent.querySelector('.ui-search-card-attributes__attribute:nth-child(1)').textContent,
              rooms : ($rent.querySelector('.ui-search-card-attributes__attribute:nth-child(2)')
                ? $rent.querySelector('.ui-search-card-attributes__attribute:nth-child(2)').textContent
                : " " ),
              place : $rent.querySelector('.ui-search-item__location').textContent,
           })
        })
        return {
           rents: data,
        }
     })

     res.json(data)

    await browser.close()
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})