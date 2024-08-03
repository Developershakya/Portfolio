const header = document.querySelector('header');
const toggle_btn = document.querySelector('.toggle-btn');
const body = document.querySelector('body');
const first_skill = document.querySelector('.skill:first-child');
const sk_counters = document.querySelectorAll(' .counter span');
const ml_section = document.querySelector('.milestones');
const ml_counters = document.querySelectorAll('.number span');
const progress_bars = document.querySelectorAll('.skills svg circle');
const prt_section = document.querySelector('.portfolio');
const zoom_icons = document.querySelectorAll('.zoom-icon');
const modal_overlay = document.querySelector('.modal-overlay');
const images = document.querySelector('.images img');
const next_btn = document.querySelector('.next-btn');
const prev_btn = document.querySelector('.prev-btn');
const links = document.querySelectorAll('.nav-link');
const hamburger = document.querySelector('.hamburger');
let skillPlayed = false;
let mlPlayed = false;
window.addEventListener('scroll', () => {
    activeLink();
    if (!skillPlayed) skillsCounter();
   if (!mlPlayed) mlCounter();

});




/* ---------------Dark Mode--------------- */



/* --------------- Grab elements from DOM --------------- */

/* --------------- Sticky Navbar --------------- */
function stickyNavbar() {
    console.log(window.pageYOffset > 0);
    header.classList.toggle('scrolled', window.pageYOffset > 0);
}


window.addEventListener('scroll', stickyNavbar);
/* --------------- Reveal Animation --------------- */
let sr = ScrollReveal(
    {
        duration: 1500,
        distance: '60px',

    }
);
sr.reveal('.showcase-info', { delay: 600 });
sr.reveal('.showcase-image', { origin: 'top', delay: 700 });
/* --------------- Skills Progress Bar Animation --------------- */
function hasReached(el) {
    let topPosition = el.getBoundingClientRect().top;
    if (window.innerHeight >= topPosition + el.offsetHeight) return true;
    return false;

}
function updateCount(num, maxnum) {
    let currentNum = +num.innerText;
    if (currentNum < maxnum) {
        num.innerText = currentNum + 1;
        setTimeout(() => {
            updateCount(num, maxnum);
        }, 12);
    }

}


function skillsCounter() {
    let skillPlayed = true;
    if (!hasReached(first_skill)) return;

    sk_counters.forEach((counter, i) => {
        let target = +counter.dataset.target;
        let strokevalue = 427 - 427 * (--target / 100);
        progress_bars[i].style.setProperty('--target', strokevalue);

        setTimeout(() => {
            updateCount(counter, target);
        }, 400);


        progress_bars.forEach(
            (p) => (p.style.animation = "progress 2s ease-in-out forwards")
        );


    });




}

/* --------------- Services Counter Animation --------------- */

function mlCounter(){
    if(!hasReached(ml_section)) return;
    let mlPlayed = true;
    ml_counters.forEach((ctr) =>{
        let target = +ctr.dataset.target;
        setTimeout(() =>{
            updateCount(ctr,target);
        },400)

    });
}
/* --------------- Portfolio Filter Animation --------------- */
let mixer = mixitup('.portfolio-gallery',{
    selectors:{
        target:'.prt-card',
    },
    animation:{
        duration:300,
    },
});
/* --------------- Modal Pop Up Animation Animation --------------- */
let currentIndex = 0;

 zoom_icons.forEach((zoom_icons , i ) => {
  zoom_icons.addEventListener('click', () =>{
    prt_section.classList.add('open');
    body.classList.add('stopScrolling');
    currentIndex = i;
    changeImage(currentIndex);

 })
});

modal_overlay.addEventListener('click',() => {
    prt_section.classList.remove('open');
    body.classList.remove('stopScrolling');
 });

prev_btn.addEventListener('click', () => {
    if(currentIndex === 0){
        currentIndex = 5;
    }
    else{
        currentIndex--;
    }
  changeImage(currentIndex);
    
});
next_btn.addEventListener('click', () => {
    if(currentIndex === 5){
        currentIndex = 0;
    }
    else{
        currentIndex++;
    }
  changeImage(currentIndex);
    
});


 function changeImage(index){
    images.forEach(img => img.classList.remove('showImage'));
    images[index].classList.add('showImage');

 }
/* --------------- Modal Pop Up Animation Animation --------------- */
const swiper = new Swiper('.swiper',{
    loop: true,
    speed: 500,
    autoplay: true,
    pagination:{
        el:'.swiper-pagination',
        clickable:true,
    },
});
/* --------------- Change Active Link On Scroll --------------- */
function activeLink(){
    let sections = document.querySelectorAll('section[id]');
    let passedSections =  Array.from(sections).map((sct , i) => {
        return {
            y:sct.getBoundingClientRect().top - header.offsetHeight,
            id:i,


     

    }
})
    .filter((sct) => sct.y <=0);
    let currentSectionID = passedSections.at(-1).id;
    links.forEach ( l => l.classList.remove('active'));
    links[currentSectionID].classList.add('active');

}
activeLink();

/* --------------- Change Page Theme --------------- */

function changeTheme (){
    if(!document.body.classList.contains('dark')){
        document.body.classList.add('dark');
        toggle_btn.classList.replace('uil-moon','uil-sun');
        localStorage.setItem('dark',1);
    }
    else{
        document.body.classList.remove('dark');
        toggle_btn.classList.replace('uil-sun','uil-moon')
        localStorage.setItem('dark',0);
    }
}
toggle_btn.addEventListener('click',()=>{
    changeTheme();
})


/* --------------- Open & Close Navbar Menu --------------- */
hamburger.addEventListener('click', ( ) =>{
    document.body.classList.toggle('open');
    document.body.classList.toggle('stopScrolling');
})
links.forEach(link => link.addEventListener('click',() =>{
    document.body.classList.remove('open');
    document.body.classList.remove('stopScrolling');
}))