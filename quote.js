const quotes = [
    {
        text: "Actions speak louder than words.",
        meaning: "Hành động có giá trị hơn lời nói. Những gì bạn làm quan trọng và ý nghĩa hơn những gì bạn nói bạn sẽ làm."
    },
    {
        text: "A blessing in disguise.",
        meaning: "Trong cái rủi có cái may. Một điều gì đó ban đầu có vẻ tồi tệ nhưng sau đó lại mang đến kết quả tốt."
    },
    {
        text: "Beat around the bush.",
        meaning: "Nói vòng vo tam quốc. Tránh đề cập trực tiếp đến vấn đề chính."
    },
    {
        text: "The best of both worlds.",
        meaning: "Vẹn cả đôi đường. Tận hưởng những lợi thế của hai tình huống khác nhau cùng một lúc."
    },
    {
        text: "Cross that bridge when you come to it.",
        meaning: "Đến đâu hay đến đó. Giải quyết vấn đề khi nó thực sự xảy ra, không phải trước đó."
    },
    {
        text: "Curiosity killed the cat.",
        meaning: "Tính tò mò hại thân. Quá tò mò có thể dẫn đến những tình huống nguy hiểm."
    },
    {
        text: "Cut corners.",
        meaning: "Ăn bớt làm xén. Làm điều gì đó theo cách dễ nhất hoặc rẻ nhất, thường dẫn đến chất lượng kém."
    },
    {
        text: "Once in a blue moon.",
        meaning: "Hiếm có khó tìm. Rất hiếm khi xảy ra."
    },
    {
        text: "Piece of cake.",
        meaning: "Dễ như ăn bánh. Một việc gì đó rất dễ thực hiện."
    },
    {
        text: "Hit the nail on the head.",
        meaning: "Nói trúng tim đen. Mô tả chính xác nguyên nhân của một tình huống hoặc vấn đề."
    },
    {
        text: "Life is a wilderness. It is not a track",
        meaning: "Cuộc đời là một vùng hoang dã, không phải là một con đường thẳng tắp. Cuộc sống khó đoán và đầy bất ngờ."
    },
    {
        text: "Cuộc tình anh như một bàn cờ nhưng tiếc là không có Hậu",
        meaning: "Một cuộc tình đẹp nhưng không có người con gái ấy và cũng không có kết thúc tốt đẹp."
    },
    {
        text : "Keep loving and go to the mountains and seas",
        meaning : "Hãy cứ yêu và xông pha đến những chân trời mới."
    },
    {
        text : "Don't be tired up by yourself. Freedom in the wind",
        meaning : "Đừng tự trói buộc mình. Hãy để bản thân được tự do như gió."
    },
    {
        text : "Quyết tâm anh như là biển dù có ra sao cũng không cạn",
        meaning : "Quyết tâm của anh lớn lao và không bao giờ thay đổi dù có chuyện gì xảy ra."
    },
    {
        text : "Từ bao giờ chỉ cần bạn có ngoại hình tốt. Người ta sẽ tưởng tượng nốt ra những lý do khiến bạn hoàn hảo?",
        meaning : "Ngày nay, chỉ cần có vẻ ngoài ưa nhìn, người khác sẽ tự vẽ ra những lý do để cho rằng bạn hoàn hảo."
    },
    {
        text : "Hối hận là người bạn già chỉ đến thăm trên giường bệnh. Mong thành công không mất kiên nhẫn vì tao đang trên đường đến",
        meaning : "Sự hối tiếc thường chỉ xuất hiện khi ta già yếu và bệnh tật. Mong thành công hãy kiên nhẫn chờ đợi vì tôi đang cố gắng để đạt được nó."
    },
    {
        text: "Anh đã quá quen từng ánh nhìn của người lạ và anh cũng chẳng lạ cách hành xử của vài người quen",
        meaning : "Anh đã quen với sự xa lạ từ người ngoài và cũng không còn ngạc nhiên trước cách cư xử của một vài người thân quen."
    },
    {
        text : "If I'm being truthful, I'm not who I'm used to. Họ nói là tao thay đổi, tao chỉ nói là you too !",
        meaning: "Thật lòng mà nói, tôi không còn là người mà tôi từng quen. Họ nói tôi đã thay đổi, tôi chỉ đáp lại rằng bạn cũng vậy!"
    },
    {
        text: "Dựa vào núi, núi sẽ đổ. Dựa vào đá đá sẽ mòn. Dựa vào người, người sẽ đi. Dựa vào chính mình thì mới là vĩnh cửu",
        meaning: "Đừng quá dựa dẫm, chỉ có tự lực mới bền vững."
    },
    {
        text: "Dạo này muốn đi xăm ... Xăm time I miss her",
        meaning: "Chơi chữ 'xăm' và 'some time' để nói về nỗi nhớ."
    },
    {
        text: "Anh uống hết chai dầu gội Dove, bởi vì nó ghi giúp phục hồi hư tổn từ sâu bên trong",
        meaning: "Hiểu sai hài hước về công dụng dầu gội."
    },
    {
        text: "Thương nhiều hơn là nói nhưng khi anh đã nói là thương thì, như là kiến về tổ cho dù thế nào anh cũng tìm ĐƯỜNG",
        meaning: "Yêu âm thầm nhưng quyết tâm theo đuổi."
    },
    {
        text: "Tình yêu anh như biển lớn bởi vì nó không bao giờ hết mặn.",
        meaning: "Tình yêu trải qua nhiều cay đắng nhưng không phai nhạt."
    },
    {
        text: "Tại sao cậu không quay lại với người yêu cũ ? Bởi vì nếu cậu thấy cùng một cái cây hai lần trong khu rừng, nghĩa là cậu đã bị lạc",
        meaning: "Việc quay lại với người yêu cũ có thể giống như đi lạc trong rừng, lặp lại những vấn đề cũ mà không tìm được lối thoát."
    },
    {
        text: "There's no one to love you when you build your walls too high !",
        meaning: "Khi bạn tạo ra quá nhiều rào cản và khép kín, sẽ rất khó để người khác có thể yêu thương bạn."
    }
];




const quoteText = document.getElementById('quote-text'); 
const quoteMeaning = document.getElementById('quote-meaning'); 
const newQuoteBtn = document.getElementById('new-quote-btn'); 

let Index = Math.floor(Math.random() * quotes.length); 

quoteText.textContent = `"${quotes[Index].text}"`;
quoteMeaning.textContent = quotes[Index].meaning; 


function getRandomQuote(){
    let randomIndex = Math.floor(Math.random() * quotes.length); 
    let currentText = quoteText.textContent.slice(1, -1);

    do {
        randomIndex = Math.floor(Math.random() * quotes.length);
    } while (quotes[randomIndex].text === currentText);

    const randomQuote = quotes[randomIndex]; 

    quoteText.style.opacity = 0; 
    quoteMeaning.style.opacity = 0; 

    setTimeout(() =>{
        quoteText.textContent = `"${randomQuote.text}"`;
        quoteMeaning.textContent = randomQuote.meaning; 
        
        quoteText.style.opacity = 1; 
        quoteMeaning.style.opacity = 1; 

    }, 300); 
}

quoteText.style.transition = 'opacity 0.3s ease-in-out'; 
quoteMeaning.style.transition = 'opacity 0.3s ease-in-out'; 

newQuoteBtn.addEventListener('click', getRandomQuote); 