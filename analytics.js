// Google Analytics (GA4). 측정 ID를 바꿀 일이 생기면 아래 한 줄만 고치면 된다 -
// 16개 HTML에 같은 코드를 복사해두면 나중에 하나씩 찾아 고쳐야 해서 이 파일로 뺐다.
(function () {
    var MEASUREMENT_ID = 'G-JEXWPKJWZ0';

    var s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + MEASUREMENT_ID;
    document.head.appendChild(s);

    window.dataLayer = window.dataLayer || [];
    function gtag() { window.dataLayer.push(arguments); }
    window.gtag = gtag;
    gtag('js', new Date());
    gtag('config', MEASUREMENT_ID);
})();
