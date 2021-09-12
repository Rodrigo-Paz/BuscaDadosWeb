const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto('https://tpns.com.br');

    const imgList = await page.evaluate(() => {
        //toda essa função será executada no browser
        //pegando imagens na parte de posts
        const nodeList = document.querySelectorAll(' img')
        //transformando o nodelist em arquivos
        const imgArray = [...nodeList]
        // transformando os nodes html em objetos js
        const imgList = imgArray.map(({ src }) => ({
            src
        }))
        //console.log(list)
        return imgList
        //colocar para fora da função
    });

        //await page.screenshot({ path: 'example.png' });
        // escrevendo os dados em um arquivo local
        fs.writeFile('instagram.json', JSON.stringify(imgList, null, 2), err => {
        if(err) throw new Error('something went wrong')
        console.log('well done!')
      })
    await browser.close();
})();
