/**
 * Na versão mobile, scrolla a div de depoimentos até o card do meio
 */
function scrollMiddleTestimonialsOnMobile() {
    const testimonials = document.querySelector('.testimonials .wrapper');
    testimonials.scrollLeft = (testimonials.scrollWidth - testimonials.clientWidth) / 2;
}
window.addEventListener('load', () => {
    scrollMiddleTestimonialsOnMobile();
});

/*
    * Se a div de estatísticas estiver totalmente visível na tela,
    * executa uma animação em cada estatística numérica, iniciando
    * ela em 0 e somando de 1 em 1 (ou 0.1 em 0.1 se for decimal)
    * até chegar no seu valor real. Esta animação só é executada
    * uma vez enquanto estiver na página.
    */
let firstTime = true;
function statisticsAnimation() {
    const statistics = document.querySelectorAll(".banner-2 .statistic");

    statistics.forEach(statistic => {
        const span = statistic.querySelector("span");
        const number = Number(span.getAttribute('aria-value'));
        const containsK = span.innerHTML.includes("k");

        const isDecimal = !Number.isInteger(number);
        const increment = isDecimal ? 0.1 : 1;
        const decimalPlaces = isDecimal ? 1 : 0;

        let current = 0;

        const milliseconds = 800 / (number / increment);

        const interval = setInterval(() => {
            current += increment;
            if (current >= number) {
                current = number;
                clearInterval(interval);
            }
            span.innerHTML = `+${current.toFixed(decimalPlaces)}${containsK ? "k" : ""}`;
        }, milliseconds);
    });

    firstTime = false;
}
function statisticsIsVisible() {
    const rect = document.querySelector(".banner-2").getBoundingClientRect();
    const viewHeight = window.innerHeight || document.documentElement.clientHeight;
    return (rect.top >= 0 && rect.bottom <= viewHeight);
}
function allInView() {
    if (statisticsIsVisible() && firstTime) {
        statisticsAnimation();
    }
}
document.addEventListener("DOMContentLoaded", allInView);
document.addEventListener("scroll", allInView);