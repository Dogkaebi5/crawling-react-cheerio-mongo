const cheerio = require("cheerio");
const axios = require("axios");
const Rating = require("./mongodb");

const log = console.log;
let mon = '02';
let day = '20';
const url1 = `https://search.naver.com/search.naver?where=nexearch&sm=tab_etc&mra=blUw&qvt=0&query=${mon}%EC%9B%94${day}%EC%9D%BC%EC%A3%BC%20%EC%98%88%EB%8A%A5%20%EC%8B%9C%EC%B2%AD%EB%A5%A0`;
const url2 = `https://search.naver.com/search.naver?where=nexearch&sm=tab_etc&mra=blUw&qvt=0&query=${mon}%EC%9B%94${day}%EC%9D%BC%EC%A3%BC%20%EC%98%88%EB%8A%A5%20%EC%A2%85%ED%95%A9%ED%8E%B8%EC%84%B1%EC%8B%9C%EC%B2%AD%EB%A5%A0`;
const url3 = `https://search.naver.com/search.naver?where=nexearch&sm=tab_etc&mra=blUw&qvt=0&query=${mon}%EC%9B%94${day}%EC%9D%BC%EC%A3%BC%20%EC%98%88%EB%8A%A5%20%EC%BC%80%EC%9D%B4%EB%B8%94%EC%8B%9C%EC%B2%AD%EB%A5%A0`;


const getHtml = async (url) => {
  try {return await axios.get(url);}
  catch (error) {console.error(error);}
};

function newListMaker(html){
  const $ = cheerio.load(html.data);
  const $bodyList = $("div.rating_cnt tbody").children("tr");
  let newList = [];
  $bodyList.each(function (i, elem) {
    newList[i] = {
      title: $(this).find("td:nth-child(2) p").text(),
      broadcast: $(this).find("td:nth-child(3) p a").text(),
      rating: $(this).find("td.ct.scroll_p p").text(),
    }
  });
  return newList;
}

async function makeRaking(){
  //지상파, 종합편성, 케이블 가져오기
  const rating1 = await getHtml(url1).then((html) => newListMaker(html))
  const rating2 = await getHtml(url2).then((html) => newListMaker(html))
  const rating3 = await getHtml(url3).then((html) => newListMaker(html))
  //3개 합하기
  let ratings =[...rating1, ...rating2, ...rating3]
  //시청률로 소팅
  ratings.sort((a, b) => {
    let numA = Number(a.rating.toString().replace('%', ''));
    let numB = Number(b.rating.toString().replace('%', ''));
    if (numA < numB) { return 1;}
    else if (numA > numB) { return -1;}
    else {return 0;}
  })
  //첫 array 랭크 1 주기
  ratings[0].rank = 1;
  //시청률이 같으면 공동'-'표기, 아니면 순차별 순위 
  for (let i = 1; i < ratings.length; i++ ) {
    if(ratings[i].rating === ratings[i-1].rating) {
      ratings[i].rank = "-"
    }else ratings[i].rank = i+1
  }
  
  let newRating = new Rating({date: mon+"/"+day, ratings: ratings});
  newRating.save().then((err) => { log(err); });
}

makeRaking();



// .then(res => log(res));
